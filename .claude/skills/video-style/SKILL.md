---
name: video-style
description: Phong cách hình ảnh, chuyển động, phụ đề và quy tắc hook/lời thoại dùng chung cho các skill làm video dọc (repo-to-video, comparison-video, content-to-video, remotion-topic-explainer). Dùng khi dựng hoặc chỉnh giao diện video dọc 1080x1920, không dùng một mình. Shared visual style, motion, caption and hook rules for the vertical-video skills.
---

# Video Style

Quy tắc chung cho mọi video dọc (1080x1920, 30fps, gần 1 phút 30) làm bằng Remotion trong repo này. Mỗi skill làm video chỉ giữ phần riêng của nó (kịch bản, dữ kiện, hình đặc thù) và tham chiếu về đây cho phần phong cách.

Mẫu chạy được nằm ở `src/ClaudeBugHunterRepo/`. Khi làm video mới, sao chép `theme.ts` và `components/` (`Backdrop`, `BrandHeader`, `SceneShell` gồm `Reveal`, `SubtitleBox`, `Motion`) từ đó rồi đổi tên thư mục. Tham khảo thêm skill `remotion-markup` về `interpolate`, `spring`, chuyển cảnh và hiệu ứng.

## Thời lượng

- Video dài gần 1 phút 30 (80-90s), lời thoại khoảng 330-360 từ. Với `TTS_PROVIDER=cit` đọc khoảng 4 từ mỗi giây: 330 từ ra khoảng 83s, 360 từ ra khoảng 90s.
- Mỗi cảnh 6-13s (30-50 từ). Cảnh nào quá 13s thì tách đôi.
- Dưới 80s thì viết thêm lời thoại, trên 92s thì rút ngắn, rồi sinh lại giọng.

## Hook (cảnh 1, 5-7 giây)

- Câu đầu tiên là lời hứa hoặc kết quả cụ thể kèm con số thật, nói ngay trong 2 giây đầu (ví dụ "Chỉ hai lệnh, Claude Code thành thợ săn lỗi bảo mật"). Không mở bằng lời chào, tên kênh hay mô tả chung chung. Tên chủ đề hoặc tên repo đến sau lời hứa.
- Frame 0 là thumbnail trên các nền tảng: cảnh 1 phải đủ nội dung ngay từ frame 0, không chữ nào hiện dần. Sức mạnh của hook đến từ chuyển động: khung đầu phóng 1,12 về 1,0 trong 9 frame, chớp sáng ở frame 2-10 (frame 0 không chớp), nhiễu màu đỏ-lam 4 frame mỗi 48 frame, viền neon nhấp nháy, tia sáng quét dọc.

## Lời thoại

- Nói với người xem, không nói với người đọc tài liệu. Không nói "theo README", "trong README", tên file hay tên mục của nguồn. Nêu thẳng thông tin, hoặc dùng "tác giả" khi đó là nhận định của tác giả, và "minh họa" cho ví dụ do tác giả đưa ra. Chữ trên màn hình cũng theo quy tắc này.
- Nhận định, số liệu và lời hứa của bên đăng phải gắn tên bên đó ("theo <tên>"), không nói như sự thật đã kiểm chứng.
- Số viết bằng chữ trong lời thoại (`tám mươi ba`), phụ đề và màn hình hiện chữ số (`83`).
- Không dùng thuật ngữ hay ẩn dụ người xem phổ thông không hiểu ("date picker" thành "ô chọn ngày"). Cảnh liệt kê nhiều mục thì lời thoại đọc từng mục, mỗi mục hiện đúng lúc được đọc. Giọng `cit` mặc định tốc độ 1,05 (1,15 bị chê nhanh).
- Từ tiếng Anh chưa có trong từ điển phát âm của app (ví dụ `API`) thì viết sẵn cách đọc trong lời thoại ("ây pi ai"), còn phụ đề giữ nguyên dạng gốc.

## Giao diện

- Nền `components/Backdrop.tsx`: gần như đen (`#04080f`), hai quầng sáng xanh mờ ở trên và dưới, 40 hạt sáng trôi chậm. Vị trí hạt lấy từ `random()` của Remotion để mỗi lần render giống nhau. Không dùng ảnh nền nặng.
- Màu và kiểu thẻ nằm trong `theme.ts`: `accent`, `cyan`, `orange` (chỉ để nhấn từ khoá), `glass` (thẻ kính mờ: nền trắng 6%, viền trắng 13%, bo 32px), `gradientText()` cho số lớn. Muốn đổi thương hiệu thì chỉ đổi ở đây.
- Thương hiệu: có `public/brand/logo-white.png` (logo chữ trắng, đọc được trên nền tối) thì đặt ở `top: 100`, `left: 88`, cao 120px, không bo nền. Chỉ có logo chữ đen thì đặt trên tấm nền trắng bo góc. Không có logo thì dùng huy hiệu chữ `{channelName}` lấy từ `process.env.CHANNEL_NAME`. Không dùng emoji hay icon trang trí trong chữ.
- Vùng nội dung: `left: 88`, `right: 88`, `top: 380`, cao 1090px, căn giữa theo chiều dọc. Mỗi cảnh có một nhãn dạng viên thuốc ở giữa, `top: 290`, thay cho tiêu đề cảnh.
- `SceneShell`: nhận `label`, `caption`, `audioPath`, `duration`, `speechFrames`, `animateIn` và `children`. Gồm `<Audio>`, nhãn, vùng nội dung (phóng chậm từ 1,0 lên 1,035 suốt cảnh), `SubtitleBox`, và một vệt sáng chéo quét ngang trong 14 frame đầu để đánh dấu chuyển cảnh. Mờ dần trong 6 frame cuối. Cảnh 1 đặt `animateIn={false}`. Không có bộ đếm số cảnh.
- `Reveal`: `spring()` có độ nảy (`damping: 12`, `stiffness: 150`), vào từ dưới lên và phóng từ 0,92 lên 1. Đặt `fromX` để trượt vào từ hai bên.
- `components/Motion.tsx`: `Typewriter` (gõ từng ký tự, phần chưa gõ vẫn giữ chỗ để dòng không xô lệch) và `CountUp` (đếm từ 0, chậm dần ở cuối).
- Thanh tiến trình mảnh ở mép trên (`top: 0`, cao 8px, gradient), vì mép dưới bị nút của TikTok và Reels che.
- Cỡ chữ: tiêu đề 60-90px, nội dung 36-56px, phụ 26-32px. `nowrap` không tự co chữ: Be Vietnam Pro Black rộng khoảng 0,6 lần cỡ chữ mỗi ký tự, vùng nội dung rộng 904px, nên cỡ tối đa = 904 / (số ký tự x 0,6). Mở ảnh kiểm tra mép phải.

## Phụ đề

Phụ đề viết riêng ở `src/<TopicName>/captions.ts`, mỗi cảnh một dòng, ngắt cụm bằng `|`. Lời đọc giữ nguyên trong script âm thanh, dấu `|` không đưa vào đó.

```typescript
export const sceneCaptions: string[] = [
  "Chỉ *hai lệnh*, | Claude Code thành | thợ săn *lỗi* bảo mật.",
  // mỗi cảnh một dòng
];
```

- Cùng nội dung với lời đọc, nhưng số hiện bằng chữ số.
- Mỗi cụm tối đa 28 ký tự (chữ 56px), thường 2-5 từ, ngắt ở chỗ hợp nghĩa, không cắt đôi từ ghép hay số.
- Bọc một từ khoá mỗi cụm trong `*dấu sao*` để tô cam (`*hai lệnh*`). Chọn từ mang ý chính hoặc con số, không tô cả cụm.
- Phụ đề đặt ở `top: 1480`. Không đặt nội dung thấp hơn `top: 1470`, vì nút của TikTok và Reels che phần dưới.

`components/SubtitleBox.tsx`:

```tsx
import React from "react";
import { useCurrentFrame } from "remotion";
import { orange } from "../theme";

// A digit takes about five letters to say aloud, so "720p" lasts longer than it looks.
const speechWeight = (chunk: string) => {
  const plain = chunk.replace(/\*/g, "");
  return plain.length + 5 * (plain.match(/\d/g)?.length ?? 0);
};

// Caption format: chunks split by "|", at most 28 characters each. Wrap one keyword per chunk in *asterisks* to highlight it.
export const SubtitleBox: React.FC<{ caption: string; speechFrames: number }> = ({ caption, speechFrames }) => {
  const frame = useCurrentFrame();
  const chunks = caption.split("|").map((chunk) => chunk.trim());
  const total = chunks.reduce((sum, chunk) => sum + speechWeight(chunk), 0);
  const position = (frame / Math.max(1, speechFrames)) * total;
  let elapsed = 0;
  let active = chunks[chunks.length - 1];
  for (const chunk of chunks) {
    elapsed += speechWeight(chunk);
    if (position < elapsed) {
      active = chunk;
      break;
    }
  }
  const parts = active.split("*");
  return (
    <div style={{ position: "absolute", top: 1480, left: 45, right: 45, textAlign: "center" }}>
      <div style={{ display: "inline-block", whiteSpace: "nowrap", fontSize: 56, fontWeight: 800, color: "#ffffff", textShadow: "0 4px 24px #000c, 0 0 8px #000a" }}>
        {parts.map((part, i) => (i % 2 === 1 ? <span key={i} style={{ color: orange }}>{part}</span> : part))}
      </div>
    </div>
  );
};
```

## Chuyển động

- Dùng `spring()` và `interpolate()` cho mọi hiệu ứng, không dùng CSS transition hay animation. `interpolate()` luôn kèm `extrapolateLeft: "clamp"` và `extrapolateRight: "clamp"`.
- Dùng thuộc tính CSS `scale` và `translate` thay cho chuỗi `transform`.
- Mỗi cảnh phải có thứ chuyển động liên tục (phóng chậm, đếm số, gõ chữ, thanh chạy). Không để hình đứng yên quá 2 giây.
- Lệnh trong terminal gõ bằng `Typewriter`. Số liệu đếm lên bằng `CountUp`, trừ cảnh 1.
- Chip hoặc mục trong cùng một nhóm hiện lần lượt, cách nhau khoảng 4 frame.
- Hai ý đối lập (vấn đề A, vấn đề B) trượt vào từ hai phía đối diện.
