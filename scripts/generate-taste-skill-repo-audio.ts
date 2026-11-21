import { generateTopicVoices } from "./generate-tts";

const speed = 1.05;
const scenes = [
  { id: "01_hook", text: "Nhờ AI làm website, sao trang nào ra cũng nhìn là biết do AI?" },
  { id: "02_pain", text: "Ây giần viết code web rất nhanh, nhưng thiếu gu. Bố cục giống nhau, font giống nhau, ảnh thì chung chung. Làm xong vẫn phải ngồi sửa cả buổi." },
  { id: "03_intro", text: "Taste Skill là một Ây giần Skill cho Claude Code và Codex, giúp ây giần xây website doanh nghiệp có định hướng thẩm mỹ, thay vì landing page chung chung. Theo tác giả, mục tiêu là giao diện ngang trang figma chấm com. Giấy phép em ai ti." },
  { id: "04_result", text: "Đây là các trang dựng từ một brief ngắn. Một quán cà phê, một đêm techno. Hai phong cách hoàn toàn khác nhau, không cái nào na ná mẫu AI quen thuộc. Ảnh chụp trong trang là ảnh thật, tìm trong kho mở và có ghi nguồn." },
  { id: "05_classify", text: "Trước hết ây giần phân loại doanh nghiệp thành một trong sáu loại: phần mềm, game, công nghệ, sản phẩm, dịch vụ hoặc địa điểm. Rồi mới chọn bảng màu và cặp font phù hợp. Quán cà phê và công ty phần mềm không dùng chung một kiểu." },
  { id: "06_hero", text: "Hi rô chọn từ mười một bố cục đã kiểm thử, mỗi màn hình một section, thanh điều hướng cố định. Ưu tiên ảnh thật, icon thương hiệu thật và giao diện sản phẩm thật, không nhồi ảnh stock." },
  { id: "07_browser", text: "Điểm mình thấy đáng giá nhất: trước khi giao, nó chạy trình duyệt Chrome ngầm ở bốn độ rộng, từ máy tính đến điện thoại, rồi kiểm tra ô ảnh trống, chữ khó đọc, cột bị lệch. Có cổng hoàn tất, lặp tối đa ba vòng nếu chưa đạt. Ây giần không chỉ viết, mà tự nhìn lại kết quả." },
  { id: "08_effects", text: "Hiệu ứng shader và cảnh cuộn chỉ dùng cho trang phần mềm, công nghệ và game. Quán cà phê hay khách sạn thì giữ yên tĩnh: ảnh, chữ sắc nét, màu phẳng. Không phải trang nào cũng nháy nháy." },
  { id: "09_outro", text: "Cài bằng hai lệnh trong Claude Code. Cần Node hai mươi hai trở lên và trình duyệt Chrome, không cần ây pi ai ki. Link repo ở phần mô tả, thấy hay thì theo dõi kênh mình nhé. Lần sau web AI làm, đừng để nhìn là biết do AI." },
].map((s) => ({ ...s, speed }));

generateTopicVoices("TasteSkillRepo", scenes).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
