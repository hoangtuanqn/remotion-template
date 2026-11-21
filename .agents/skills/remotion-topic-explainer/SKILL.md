---
name: remotion-topic-explainer
description: >-
  Creates professional 60-90s vertical explainer videos (9:16 format, 1080x1920 @ 30fps) for any given topic using Remotion, styled with modern aesthetics and narrated by natural voiceover using edge-tts-universal or CIT Voice Studio (selected via TTS_PROVIDER in .env). Follows remotion-dev/skills best practices for smooth springs, typography, sequence timing, and visual engagement.
---

# Remotion Topic Explainer Video Skill (60-90s)

This skill guides you in creating high-quality, 60–90 second short-form explainer videos (TikTok / YouTube Shorts / Reels format: 1080x1920 @ 30fps) from any given topic.

It combines:
1. **Visual Best Practices** from `remotion-dev/skills` (frame-accurate springs, clamping interpolations, sequence composition, typography hierarchy).
2. **AI Voiceover Synthesis** via `TTS_PROVIDER` in `.env`: `edge` (`edge-tts-universal`, online, free) or `cit` (**CIT Voice Studio**, offline Vietnamese studio voices - download at [github.com/Cuongyd196/cit-voice-studio](https://github.com/Cuongyd196/cit-voice-studio), API docs: `docs/cit-voice-studio.md`).
3. **Exact Timing Synchronization** mapping audio voiceover lengths directly into Remotion frame sequences.

---

## 1. Video Structure & Timing (60-90s / 1800-2700 frames @ 30fps)

A captivating short video follows the **Hook-Problem-Solution-Value-Outro** framework:

| Scene | Name | Time | Frame Range (@ 30fps) | Purpose & Visuals |
| :--- | :--- | :--- | :--- | :--- |
| **1** | **Hook** | 0s – 6s | ~180 frames | Lời hứa hoặc câu hỏi gây tò mò kèm con số, nói trong 2 giây đầu. Tiêu đề lớn, hiệu ứng hook của `video-style`. |
| **2** | **Context / Pain Point** | 6s – 17s | ~330 frames | Nêu vấn đề hoặc bối cảnh vì sao chủ đề này quan trọng. Hai thẻ đối lập trượt vào từ hai phía. |
| **3** | **Core Concept Part 1** | 17s – 32s | ~450 frames | Nguyên lý cốt lõi thứ 1: thẻ kính mờ, từ khóa nổi bật. |
| **4** | **Core Concept Part 2** | 32s – 48s | ~480 frames | Cơ chế hoạt động: quy trình 3 bước, đường nối chạy dần. |
| **5** | **Real-World Impact** | 48s – 64s | ~480 frames | Ứng dụng thực tế, lời khuyên hoặc số liệu đếm lên. |
| **6** | **Outro & CTA** | 64s – 75s | ~330 frames | Đúc kết 1 câu đắt giá, nút theo dõi kênh. |

Cần dài tới 90s thì thêm 1-2 cảnh phụ (ví dụ cụ thể, lưu ý) trước Outro. Cảnh nào quá 13s thì tách đôi.

**Tổng thời lượng:** 1800 – 2700 frames (khoảng 60 – 90 giây).

---

## 2. TTS Voiceover Generation (`edge` | `cit`)

### 2.1 Cấu hình Voice qua `.env`
Đảm bảo file `.env` đã được cấu hình (đầy đủ xem `.env.example`):
```env
TTS_PROVIDER=edge                    # edge | cit
TTS_OUTPUT_DIR=public/audio

# Edge TTS (TTS_PROVIDER=edge)
EDGE_TTS_VOICE=vi-VN-HoaiMyNeural    # hoặc vi-VN-NamMinhNeural, en-US-ChristopherNeural
EDGE_TTS_RATE=+10%                   # +10% đến +15% giúp video ngắn nhịp độ nhanh cuốn hút

# CIT Voice Studio (TTS_PROVIDER=cit)
CIT_TTS_BASE_URL=http://127.0.0.1:8001
CIT_TTS_VOICE=Hải Đăng               # danh sách giọng: docs/cit-voice-studio.md hoặc GET /voices
CIT_TTS_SPEED=1.1                    # 0.5 - 2.0
```

**Khi `TTS_PROVIDER=cit`**:
- App CIT Voice Studio phải đang mở. Script tự gọi `GET /health` trước khi sinh audio; nếu báo không kết nối được, nhắc người dùng mở app (hoặc tải tại [github.com/Cuongyd196/cit-voice-studio](https://github.com/Cuongyd196/cit-voice-studio)).
- Lời thoại có thể chèn thẻ cảm xúc `[cười]`, `[thở dài]`, `[hắng giọng]` và thẻ nghỉ `[nghỉ 0.5s]` (không bị đọc thành tiếng). Không lạm dụng: tối đa 1 thẻ/cảnh.
- Lỗi `400 Voice not found` = sai tên giọng (phân biệt dấu). Kiểm tra `CIT_TTS_VOICE`.

### 2.2 Quy trình sinh file Audio
Khi nhận chủ đề, tạo thư mục `src/<TopicName>/` trước, vì `src/<TopicName>/audioData.ts` chỉ được sinh khi thư mục này đã tồn tại. Sau đó tạo `scripts/generate-<topic>-audio.ts` và chạy để sinh audio:

```typescript
import { generateTopicVoices } from "./generate-tts";

const scenes = [
  {
    id: "scene1_hook",
    text: "Bạn có biết Docker thực chất là gì và tại sao mọi lập trình viên đều cần nó?",
  },
  {
    id: "scene2_problem",
    text: "Trước đây, câu nói 'trên máy tôi vẫn chạy được' luôn là cơn ác mộng khi bàn giao sản phẩm.",
  },
  {
    id: "scene3_concept1",
    text: "Docker giải quyết việc này bằng Container - đóng gói toàn bộ code và môi trường vào một khối duy nhất.",
  },
  {
    id: "scene4_concept2",
    text: "Khác với máy ảo nặng nề, Docker chia sẻ chung nhân hệ điều hành, giúp khởi động chỉ trong tích tắc.",
  },
  {
    id: "scene5_impact",
    text: "Nhờ đó, bạn deploy ứng dụng mượt mà trên mọi máy chủ từ AWS, GCP cho đến VPS giá rẻ.",
  },
  {
    id: "scene6_outro",
    text: "Follow kênh để nắm trọn các kiến thức công nghệ ngắn gọn mỗi ngày nhé!",
  },
];

generateTopicVoices("DockerShort", scenes).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

File âm thanh sẽ được lưu tự động vào `public/audio/<TopicName>/<sceneId>.<ext>` (`.mp3` với edge, `.wav` với cit) kèm file `manifest.json` ghi lại chính xác số frame (`durationInFrames`) và `audioPath` cho từng phân cảnh.

- Tuỳ chọn mỗi cảnh: `voice` (giọng của provider đang chọn), `rate`/`pitch`/`volume` (chỉ edge), `speed` 0.5-2.0 (chỉ cit).
- File đã tồn tại được dùng lại (cache). Muốn sinh lại sau khi sửa lời thoại hoặc đổi giọng, xoá file audio tương ứng trước.

---

## 3. Remotion Coding Rules (from `remotion-dev/skills`)

Khi viết mã nguồn Remotion, BẮT BUỘC tuân thủ các nguyên tắc sau:

### 3.1 Sử dụng Spring Animations
Không dùng CSS keyframes/transitions hay linear easing vô hồn. Dùng `spring()`:
```tsx
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

const frame = useCurrentFrame();
const { fps } = useVideoConfig();

// Spring nảy mượt mà cho Card/Icon
const scale = spring({
  frame,
  fps,
  config: {
    damping: 12,    // Dưới 15 tạo độ nảy đàn hồi tự nhiên
    stiffness: 100,  // Độ căng
    mass: 0.8,
  },
});

const entrance = spring({
  frame: frame - 10, // Delay 10 frames
  fps,
  from: 50,
  to: 0,
});
```

### 3.2 Interpolation An toàn (Always Clamp)
Luôn luôn cung cấp `extrapolateLeft: "clamp"` và `extrapolateRight: "clamp"` để tránh tràn giá trị khi timeline chạy ngoài phạm vi:
```tsx
import { interpolate } from "remotion";

const opacity = interpolate(frame, [0, 15], [0, 1], {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
});
```

### 3.3 Nhúng Audio và Đồng bộ Sequence
Mỗi scene trong Composition dùng `<Sequence>` hoặc `<Series>` để quản lý timing chính xác:
```tsx
import { Audio, staticFile, Sequence } from "remotion";

// Trong Scene component - lấy đường dẫn từ manifest, KHÔNG hardcode đuôi .mp3 (provider cit xuất .wav):
<Sequence from={0} durationInFrames={sceneDuration}>
  <Audio src={staticFile(audioManifest.scenes[0].audioPath)} />
  <SceneContent />
</Sequence>
```

4. **Buffer Chuyển cảnh Tinh gọn (Snappy Transition Buffer)**:
   - Khoảng đệm giữa các cảnh chỉ nên để **+3 đến +4 frames** (khoảng 0.1s) sau khi giọng đọc kết thúc.
   - Tránh để buffer quá dài (+15 đến +20 frames) gây ra khoảng lặng/chết nhịp giữa các phân cảnh. Cảnh tiếp theo cần xuất hiện ngay khi câu trước vừa dứt để duy trì nhịp độ dồn dập, hấp dẫn cho video ngắn.

```tsx
// Ví dụ tính thời lượng các cảnh trong Series
// Giá trị trong manifest đã gồm 10 frame đệm, nên trừ đi trước khi cộng buffer.
const d1 = audioManifest.scenes[0].durationInFrames - 10 + 3;
const d2 = audioManifest.scenes[1].durationInFrames - 10 + 3;
// ...
```


### 3.4 Quy chuẩn Thiết kế Visual (Vertical 1080x1920)
Toàn bộ phong cách (nền, thẻ kính mờ, thương hiệu, cỡ chữ, bố cục, phụ đề, chuyển động, hook) theo skill `video-style`. Sao chép `theme.ts` và `components/` từ `src/ClaudeBugHunterRepo/`. Không dùng emoji hay icon trang trí trong chữ.

---

## 4. Quy trình Tạo Video Từng Bước cho Antigravity / Codex

Khi nhận được yêu cầu: *"Tạo video giải thích về [Chủ đề X]"*:

### Bước 1: Soạn Kịch bản (Scripting)
1. Xác định 6 phân cảnh (Hook, Problem, Concept 1, Concept 2, Impact, Outro).
2. Viết lời thoại tiếng Việt tự nhiên, súc tích, câu ngắn (tổng 260-330 từ, mỗi cảnh 35-50 từ). Cảnh 1 mở bằng lời hứa hoặc kết quả cụ thể; xem phần Hook và Lời thoại của `video-style`.

### Bước 2: Sinh Giọng Đọc (TTS Generation)
1. Đọc `TTS_PROVIDER` trong `.env` để biết đang dùng edge hay cit.
2. Tạo thư mục `src/<TopicName>/`, rồi tạo script `scripts/generate-<topic>-audio.ts` gọi `generateTopicVoices`, chạy `npx tsx scripts/generate-<topic>-audio.ts`.
3. Lấy danh sách thời lượng frame thực tế từ `manifest.json` / `src/<TopicName>/audioData.ts`.

### Bước 3: Tạo Thư mục Code `src/<TopicName>/`
Cấu trúc thư mục chuẩn:
```text
src/<TopicName>/
├── <TopicName>.tsx          # Main composition tập hợp các Series.Sequence
├── types.ts                 # Schema & Props
├── audioData.ts             # Metadata thời lượng audio
└── scenes/
    ├── Scene1Hook.tsx
    ├── Scene2Problem.tsx
    ├── Scene3Concept1.tsx
    ├── Scene4Concept2.tsx
    ├── Scene5Impact.tsx
    └── Scene6Outro.tsx
```

Hiệu ứng âm thanh: dùng `<SfxTrack cues={...} />` từ `src/sfx/SfxTrack.tsx`, đặt trong component chính. File âm thanh ở `public/sfx/`, tạo lại bằng `npx tsx scripts/generate-sfx.ts`.

| Lúc nào | Âm thanh |
| :--- | :--- |
| Đầu mỗi cảnh, sớm 3 frame để rơi vào khoảng lặng trước câu mới (cảnh 1 ở frame 0) | `mallet` |
| Thẻ hoặc mục xuất hiện | `pop` hoặc `tick` |
| Điểm nhấn, kết luận | `ding` |
| Lời kêu gọi theo dõi | `chime` |

- `frame` của mỗi cue là số frame tính từ đầu video, khớp với lúc thành phần đó xuất hiện.
- Không cần tự tránh chồng tiếng: `SfxTrack` tự bỏ cue cách cue trước dưới 0,4s, và giảm âm lượng khi một âm thanh lặp ngay sau chính nó.
- Không tải âm thanh từ myinstants hay trang không rõ giấy phép. Cần âm mới thì thêm vào `scripts/generate-sfx.ts`.

### Bước 4: Đăng ký Composition vào `src/Root.tsx`
Thêm Composition mới vào `src/Root.tsx`:
```tsx
<Composition
  id="<TopicName>"
  component={<TopicName>}
  durationInFrames={totalFrames}
  fps={30}
  width={1080}
  height={1920}
  defaultProps={{}}
/>
```

### Bước 5: Kiểm tra và Báo cáo
1. Chạy `npm run lint` để kiểm tra lỗi TypeScript/ESLint.
2. Báo cáo cho người dùng link mở Composition trên Remotion Studio (`http://localhost:3000`) hoặc lệnh render MP4:
   ```bash
   npx remotion render <TopicName> out/<TopicName>.mp4
   ```
