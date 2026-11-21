// Cách đọc từ tiếng Anh cho giọng CIT. Lời thoại giữ nguyên thuật ngữ gốc, chỉ đổi cách viết khi gửi cho TTS.
// Từ dài/cụm từ đứng trước để không bị thay dở.
export const pronunciation: [string, string][] = [
  ["Replay Attack", "Replay Attack"],
  ["replay", "replay"],
  ["nonce", "nonce"],
  ["timestamp", "timestamp"],
  ["Idempotency", "Idempotency"],
  ["HTTPS", "HTTPS"],
  ["JWT", "JWT"],
  ["API", "API"],
];

export const toSpeech = (text: string) => pronunciation.reduce((t, [from, to]) => t.split(from).join(to), text);
