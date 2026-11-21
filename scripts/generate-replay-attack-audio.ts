import { generateTopicVoices } from "./generate-tts";
import { toSpeech } from "./replay-attack-pronunciation";

// Lời thoại giữ nguyên thuật ngữ gốc; cách đọc chỉnh ở replay-attack-pronunciation.ts.
const speed = 1.05;
const scenes = [
  { id: "01_hook", text: "Hacker không cần đoán mật khẩu, cũng chẳng cần giả mạo chữ ký. Chỉ cần bắt được một request hợp lệ, rồi gửi lại. Thế là tiền bị chuyển đi nhiều lần. Đó chính là Replay Attack." },
  { id: "02_replay", text: "Giả sử bạn chuyển một triệu đồng. Request này hoàn toàn hợp lệ, có đủ token đăng nhập. Hacker chặn được, rồi gửi lại bốn lần. Nếu server không chống, giao dịch chạy cả bốn lần." },
  { id: "03_forgery", text: "Vậy nó khác giả mạo ở đâu? Giả mạo thì chữ ký sai, server từ chối ngay. Còn replay thì chữ ký vẫn đúng, vì là request thật. Server không biết nó mới hay cũ. Đăng nhập đúng chưa chắc chống được replay." },
  { id: "04_hmac", text: "API dùng HMAC thì chữ ký được tính từ secret và nội dung request. Hacker không biết secret nên không làm giả được chữ ký. Nhưng chỉ cần chụp lại request kèm chữ ký hợp lệ, rồi gửi nguyên xi." },
  { id: "05_https", text: "Nhiều người nghĩ có HTTPS là đủ. Nhưng HTTPS chỉ bảo vệ đường truyền. Server có nhận request thêm lần nữa hay không là chuyện của tầng ứng dụng. Nên backend vẫn phải tự chống replay." },
  { id: "06_danger", text: "Mức độ nguy hiểm tùy endpoint. Xem hồ sơ mà bị gửi lại thì chẳng sao. Nhưng chuyển tiền, thanh toán, rút tiền, đổi mã khuyến mãi, đặt lại mật khẩu, đặt hàng thì hậu quả rất lớn." },
  { id: "07_nonce", text: "Cách đầu tiên là timestamp. Request quá năm phút thì từ chối. Nhưng gửi lại trong năm phút vẫn qua, nên cần thêm nonce, giá trị chỉ dùng một lần. Server lưu nonce đã dùng, thấy lại là từ chối." },
  { id: "08_idempotency", text: "Idempotency key thì khác. Nó lo cho client gửi lại hợp lệ khi mạng lỗi, để không trừ tiền hai lần. Hãy đặt thêm ràng buộc duy nhất trong database, để hai request cùng lúc vẫn chỉ tạo một bản ghi." },
  { id: "09_combine", text: "Mạnh nhất là kết hợp. Chữ ký tính trên method, đường dẫn, nội dung, timestamp và nonce. Server kiểm tra chữ ký, thời gian, nonce rồi mới xử lý." },
  { id: "10_jwt", text: "Còn JWT thì sao? JWT có thời hạn, nhưng đó không phải là chống replay. Trong lúc còn hiệu lực, token bị đánh cắp vẫn dùng được nhiều lần. Thao tác nhạy cảm cần token ngắn hạn, và cơ chế chống replay." },
  { id: "11_summary", text: "Tóm lại, cần trả lời năm câu hỏi. Xác thực: request đến từ ai? Phân quyền: có quyền làm không? Toàn vẹn: có bị sửa không? Chống replay: có bị dùng lại không? Idempotency: retry có bị làm hai lần không?" },
  { id: "12_outro", text: "Hãy tự hỏi: nếu hacker gửi lại đúng request này một trăm lần, hệ thống sẽ làm gì? Nếu hệ thống vẫn thực hiện đúng một trăm lần mà không chặn lần nào, nghĩa là API đang có lỗ hổng. Thấy hay thì theo dõi kênh mình nhé." },
].map((s) => ({ ...s, text: toSpeech(s.text), speed }));

generateTopicVoices("ReplayAttack", scenes).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
