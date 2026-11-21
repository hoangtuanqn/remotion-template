import { generateTopicVoices } from "./generate-tts";

const speed = 1.05;
const scenes = [
  { id: "01_hook", text: "Nhờ AI chặn đăng nhập sai nhiều lần, nó viết cả trăm rưỡi dòng. Repo này khiến nó còn vài dòng." },
  { id: "02_pain", text: "AI hay tự dựng cả hệ thống dù framework đã có sẵn. Code dài, khó review, và với bảo mật thì càng nhiều code càng nhiều chỗ hở." },
  { id: "03_intro", text: "Ponytail là skill bắt AI ây giần nghĩ như ông senior lười nhất team: đọc code trước, tìm giải pháp có sẵn, rồi mới viết. Chỉ là một prompt duy nhất, nạp vào từng ây giần, và không cần file cấu hình." },
  { id: "04_ladder", text: "Cốt lõi là một cái thang quyết định. Ây giần đi từ trên xuống: cần tồn tại không, codebase có sẵn chưa, thư viện chuẩn, tính năng nền tảng, dependency đã cài, một dòng code, và cuối cùng là code tối thiểu. Dừng ở bậc đầu tiên giải quyết được, chỉ khi hết cách mới viết code mới." },
  { id: "05_demo", text: "Cùng yêu cầu khóa sau năm lần sai. Bên trái nó tự dựng cả hệ thống đếm. Bên phải Ponytail nhận ra đây là Laravel và dùng luôn rate limiter có sẵn." },
  { id: "06_safe", text: "Ngắn không có nghĩa là cắt. Mục tiêu không phải ít token nhất. Validation, xử lý lỗi, bảo mật, accessibility đều giữ nguyên. Code ngắn vì đó là phần cần thiết, không phải vì bị cắt." },
  { id: "07_test", text: "Logic có nhánh, vòng lặp, tiền hay bảo mật sẽ được kèm test nhỏ. Theo tác giả, tỷ lệ này đạt chín mươi tám phần trăm, so với sáu mươi tám phần trăm khi không dùng skill. Mỗi câu trả lời đều kết thúc bằng việc đã bỏ qua gì và rủi ro cần biết." },
  { id: "08_commands", text: "Có cả bộ lệnh. Review diff, từng bắt được lỗi ở file không nằm trong diff. Audit quét cả repo, lập bản đồ code trước, rồi xếp hạng nên sửa cái nào trước. Debt gom các chỗ đi tắt, gain cho bạn số liệu." },
  { id: "09_platform", text: "Trên Claude Code có band hiển thị chi phí, token, tỷ lệ tái sử dụng code. Hỗ trợ cả Codex và khoảng hai mươi ây giần khác. Còn có trang board xem chi phí và thời gian theo từng dự án, dữ liệu mặc định nằm trên máy bạn." },
  { id: "10_outro", text: "Cài chỉ hai lệnh: lệnh đầu thêm kho plugin, lệnh sau cài vào. Link repo ở phần mô tả, thấy hay thì theo dõi kênh mình nhé." },
].map((s) => ({ ...s, speed }));

generateTopicVoices("PonytailRepo", scenes).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
