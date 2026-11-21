"""Cut a slice of a screen recording and retime it to exactly N frames at 30fps, smoothly (OpenCV + NumPy only).

Why: screen recordings are often 15fps and scroll in big steps (50-130px per frame), and Remotion resamples a clip unevenly
when the playback rate is not 1 (it repeats or skips frames), which looks like lag. Cutting each scene's clip offline at the exact length avoids both.

Output frame j shows source time t0 + (t1 - t0) * j / N. Between two source frames a page is a pure vertical scroll, so the frame at
fraction f is the earlier frame shifted by f*dy blended with the later one shifted by -(1-f)*dy (dy from phase correlation).
Fixed bars (top nav, sidebar) stay put because only the scroll region is shifted.
The mouse highlight (a yellow circle with an arrow) stays still on screen while the page scrolls, so it is cut out of both frames
(inpainted), and drawn back at the position interpolated between its two source positions. Without this it wobbles with the scroll.
When there is no clean scroll (page change, typing) the nearest source frame is used, with the cursor still interpolated.
Reads WMV, MP4 and anything else OpenCV opens.

Usage: python retime.py <input> <t0_sec> <t1_sec> <N_frames> <out.mp4> [x0 y0 x1 y1]
  [x0 y0 x1 y1] is the scrolling region in source pixels (default: x 0..width-60, y 90..height: a 90px fixed top bar, scrollbar excluded).
  Keep floating widgets (a round "help" button, a "back to top" arrow) outside it, e.g. a smaller x1, or they shift with the page.
Then encode for Remotion: npx remotion ffmpeg -y -i out.mp4 -c:v libx264 -pix_fmt yuv420p -crf 20 -an public/content/<TopicName>/scene<N>.mp4
Slowing or speeding the footage is the caller's choice: the effective speed is (t1 - t0) * 30 / N. Play the clip at rate 1 in <VideoShot toSec={N / 30} />.
"""
import sys

import cv2
import numpy as np

KERNEL = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (11, 11))
CLOSE = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (31, 31))


def shift_y(img, ty):
    m = np.float32([[1, 0, 0], [0, 1, ty]])
    return cv2.warpAffine(img, m, (img.shape[1], img.shape[0]), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REPLICATE)


def find_cursor(img):
    """Yellow highlight circle: (mask, (cx, cy), (x0, y0, x1, y1)) or None."""
    b, g, r = cv2.split(img)
    m = ((r > 215) & (g > 215) & (b < 120)).astype(np.uint8) * 255
    if int(m.sum()) < 255 * 300:
        return None
    m = cv2.morphologyEx(cv2.dilate(m, KERNEL), cv2.MORPH_CLOSE, CLOSE)
    n, lab, stats, cent = cv2.connectedComponentsWithStats(m)
    if n < 2:
        return None
    k = 1 + int(np.argmax(stats[1:, cv2.CC_STAT_AREA]))
    if stats[k, cv2.CC_STAT_AREA] < 600 or stats[k, cv2.CC_STAT_AREA] > 12000:
        return None
    mask = (lab == k).astype(np.uint8) * 255
    x, y, w, h = stats[k, 0], stats[k, 1], stats[k, 2], stats[k, 3]
    return mask, (float(cent[k][0]), float(cent[k][1])), (int(x), int(y), int(x + w), int(y + h))


class Source:
    """A source frame with its cursor cut out (inpainted) and remembered."""

    def __init__(self, img):
        self.img = img
        self.cursor = find_cursor(img)
        if self.cursor is None:
            self.clean = img
        else:
            self.clean = cv2.inpaint(img, self.cursor[0], 4, cv2.INPAINT_TELEA)


def scroll_between(a, b, region):
    """Vertical scroll dy of b relative to a, or None when the change is not a clean scroll."""
    x0, y0, x1, y1 = region
    gp = cv2.cvtColor(a.clean[y0:y1, x0:x1], cv2.COLOR_BGR2GRAY).astype(np.float32)
    gn = cv2.cvtColor(b.clean[y0:y1, x0:x1], cv2.COLOR_BGR2GRAY).astype(np.float32)
    win = cv2.createHanningWindow((gp.shape[1], gp.shape[0]), cv2.CV_32F)
    (dx, dy), resp = cv2.phaseCorrelate(gp, gn, win)
    if abs(dy) < 1.5 or abs(dy) > 420 or abs(dx) > 3 or resp < 0.05:
        return None
    return dy


def draw_cursor(base, a, b, f):
    """Paste the cursor sprite at the position interpolated between its source positions."""
    src, ca, cb = (a, a.cursor, b.cursor)[0], a.cursor, b.cursor
    if ca is None and cb is None:
        return
    if ca is not None and cb is not None:
        pos = (ca[1][0] * (1 - f) + cb[1][0] * f, ca[1][1] * (1 - f) + cb[1][1] * f)
        mask, centre, box = ca
        sprite_img = a.img
    else:  # cursor only in one frame: keep it where it was seen, for the nearer frame
        owner = a if ca is not None else b
        if (ca is not None and f >= 0.5) or (cb is not None and f < 0.5):
            return
        mask, centre, box = owner.cursor
        pos = centre
        sprite_img = owner.img
    x0, y0, x1, y1 = box
    sprite = sprite_img[y0:y1, x0:x1]
    alpha = cv2.GaussianBlur(mask[y0:y1, x0:x1], (7, 7), 0).astype(np.float32)[..., None] / 255.0
    ox, oy = int(round(pos[0] - centre[0])), int(round(pos[1] - centre[1]))
    h, w = sprite.shape[:2]
    tx0, ty0 = x0 + ox, y0 + oy
    cx0, cy0, cx1, cy1 = max(0, tx0), max(0, ty0), min(base.shape[1], tx0 + w), min(base.shape[0], ty0 + h)
    if cx1 <= cx0 or cy1 <= cy0:
        return
    sx0, sy0 = cx0 - tx0, cy0 - ty0
    sp = sprite[sy0:sy0 + (cy1 - cy0), sx0:sx0 + (cx1 - cx0)].astype(np.float32)
    al = alpha[sy0:sy0 + (cy1 - cy0), sx0:sx0 + (cx1 - cx0)]
    roi = base[cy0:cy1, cx0:cx1].astype(np.float32)
    base[cy0:cy1, cx0:cx1] = (sp * al + roi * (1 - al)).astype(np.uint8)
    del src


def make_frame(a, b, f, dy, region):
    if dy is None:  # no clean scroll: nearest frame, cursor interpolated
        base = (a if f < 0.5 else b).clean.copy()
    else:
        x0, y0, x1, y1 = region
        base = a.clean.copy()
        pa = shift_y(a.clean[y0:y1, x0:x1], f * dy)
        pb = shift_y(b.clean[y0:y1, x0:x1], -(1 - f) * dy)
        base[y0:y1, x0:x1] = cv2.addWeighted(pa, 1 - f, pb, f, 0)
    draw_cursor(base, a, b, f)
    return base


def main(src, t0, t1, n, out, region=None):
    c = cv2.VideoCapture(src)
    fps = c.get(cv2.CAP_PROP_FPS)
    width, height = int(c.get(cv2.CAP_PROP_FRAME_WIDTH)), int(c.get(cv2.CAP_PROP_FRAME_HEIGHT))
    total = int(c.get(cv2.CAP_PROP_FRAME_COUNT))
    region = region or (0, 90, width - 60, height)
    first = int(t0 * fps)
    c.set(cv2.CAP_PROP_POS_FRAMES, first)
    ok, img = c.read()
    cur, cur_i = Source(img), first
    ok2, img2 = c.read()
    nxt = Source(img2) if ok2 else None
    cache_i, cache_dy = -1, None
    w = cv2.VideoWriter(out, cv2.VideoWriter_fourcc(*"mp4v"), 30, (width, height))
    for j in range(n):
        s = min(t0 * fps + (t1 - t0) * fps * j / n, total - 2 + 0.999)
        i, f = int(s), s - int(s)
        while cur_i < i and ok2:  # advance the sliding pair of source frames
            cur, cur_i = nxt, cur_i + 1
            ok2, img2 = c.read()
            nxt = Source(img2) if ok2 else None
        if f < 1e-3 or not ok2:
            w.write(cur.img)
            continue
        if cache_i != cur_i:
            cache_dy, cache_i = scroll_between(cur, nxt, region), cur_i
        w.write(make_frame(cur, nxt, f, cache_dy, region))
    w.release()
    print(out, n)


if __name__ == "__main__":
    args = sys.argv[1:]
    reg = tuple(int(v) for v in args[5:9]) if len(args) >= 9 else None
    main(args[0], float(args[1]), float(args[2]), int(args[3]), args[4], reg)
