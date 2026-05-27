# 🩺 Hệ Thống Chẩn Đoán Y Khoa AI (Advanced Hybrid Medical Diagnosis System)

<p align="center">
  <img src="https://citgroup.vn/wp-content/uploads/2025/03/Ung-dung-cong-nghe-tri-tue-nhan-tao-AI-trong-chuan-doan-hinh-anh-y-khoa.jpg" alt="Ứng dụng công nghệ trí tuệ nhân tạo AI trong chẩn đoán hình ảnh y khoa" width="100%" style="border-radius: 16px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);" />
</p>

<p align="center">
  <a href="https://github.com/trungtin010305/YKhoa">
    <img src="https://img.shields.io/badge/Version-1.5.0-blue?style=for-the-badge&logo=semver" alt="Version" />
  </a>
  <img src="https://img.shields.io/badge/JavaScript-ES6%2B-yellow?style=for-the-badge&logo=javascript" alt="JavaScript" />
  <img src="https://img.shields.io/badge/TensorFlow.js-4.20-orange?style=for-the-badge&logo=tensorflow" alt="TensorFlow.js" />
  <img src="https://img.shields.io/badge/Gemini_API-2.5_Flash-blueviolet?style=for-the-badge&logo=google-gemini" alt="Gemini API" />
  <img src="https://img.shields.io/badge/Design-Glassmorphism-00c6ff?style=for-the-badge&logo=css3" alt="Design Glassmorphism" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

---

## 🚀 Giới Thiệu Dự Án (Project Overview)

**Hệ Thống Chẩn Đoán Y Khoa AI** là giải pháp phần mềm y tế thông minh, được nghiên cứu và phát triển bởi **nhóm DaTai**. Hệ thống tích hợp các công nghệ tiên tiến nhằm hỗ trợ tối ưu hóa quy trình khai thác bệnh sử, số hóa dữ liệu xét nghiệm lâm sàng/cận lâm sàng và đưa ra các định hướng chẩn đoán với độ chính xác cao.

Điểm đột phá của hệ thống là sự kết hợp mô hình học máy lai (**Hybrid Model**):
*   **Hệ chuyên gia cổ điển (Classic Expert System):** Dựa trên các luật lập luận lâm sàng chặt chẽ (Forward/Backward Chaining) để đảm bảo tính logic y khoa.
*   **Trí tuệ nhân tạo hiện đại (Generative AI & Edge Deep Learning):** Xử lý ngôn ngữ tự nhiên từ tường thuật của bệnh nhân và phân tích dữ liệu chuyên sâu.

Toàn bộ nền tảng được vận hành trên giao diện **Glassmorphism** hiện đại, trực quan, hỗ trợ đa ngôn ngữ và tối ưu hóa hiệu năng vượt trội trực tiếp ở phía client (Client-side).

---

## 🛠️ Kiến Trúc Hệ Thống (System Architecture)

Dự án được xây dựng dựa trên nguyên lý **Separation of Concerns (SoC)**, giúp giảm thiểu tải xử lý phía máy chủ bằng cách thực hiện tính toán suy luận cục bộ (**Edge Inference**) ngay trên thiết bị của người dùng. Kiến trúc này đảm bảo tính toàn vẹn và bảo mật tuyệt đối cho dữ liệu y tế nhạy cảm.

```mermaid
graph TD
    A[Bệnh nhân / Bác sĩ] -->|1. Khai báo Triệu chứng & Sinh hiệu| B(Giao diện Glassmorphism UI)
    A -->|2. Tường thuật giọng nói / Bệnh sử tự do| C(NLP Processing - Gemini 2.5 Flash API)
    C -->|Bóc tách thực thể lâm sàng chuẩn y học| B
    B -->|3. Nạp dữ kiện đầu vào| D{Động cơ Suy luận Lâm sàng - Inference Engine}
    D -->|Forward Chaining| E[Xác định trọng số & CF Chẩn đoán sơ bộ]
    D -->|Backward Chaining| F[Hỏi vặn lâm sàng loại trừ nguy kịch]
    F -.->|Phản hồi của Bác sĩ| D
✨ Tính Năng Cốt Lõi (Key Features)
⚡ Edge AI Inference: Thực hiện suy luận chẩn đoán bằng mô hình phân tích ngay trên trình duyệt thông qua TensorFlow.js, giảm độ trễ về 0 và hoạt động offline.

🧠 Hybrid Reasoning Engine: Kết hợp giữa cơ sở tri thức cứng (knowledgeBase.js) và trí tuệ nhân tạo tạo sinh để đưa ra điểm số tin cậy (Certainty Factor - CF) chính xác nhất.

🗣️ Y Khoa NLP (Natural Language Processing): Tích hợp Gemini 2.5 Flash để tự động bóc tách thông tin triệu chứng từ văn bản tự do hoặc lời thoại của bệnh nhân sang định dạng dữ liệu cấu trúc lâm sàng.

🎨 UI/UX Cao Cấp: Trải nghiệm mượt mà với ngôn ngữ thiết kế Glassmorphism (hiệu ứng kính mờ), tương thích hoàn hảo trên các thiết bị di động và máy tính bảng của bác sĩ.

📂 Cấu Trúc Thư Mục (Project Structure)
Plaintext
├── index.html          # Giao diện chính của hệ thống (HTML5 cấu trúc chuẩn)
├── style.css           # Định hình phong cách thiết kế Glassmorphic UI & hiệu ứng
├── app.js              # Luồng xử lý sự kiện chính, điều hướng dữ liệu & tích hợp API
├── inferenceEngine.js  # Bộ suy luận logic (Forward/Backward Chaining) tính toán trọng số CF
└── knowledgeBase.js    # Cơ sở dữ liệu tri thức y khoa (Triệu chứng, Bệnh học, Chỉ số sinh hiệu)
💻 Hướng Dẫn Cài Đặt & Khởi Chạy (Installation & Setup)
Để triển khai và chạy thử nghiệm hệ thống tại môi trường cục bộ (Local Environment), vui lòng thực hiện các bước sau:

Sao chép kho lưu trữ về máy:

Bash
   git clone [https://github.com/trungtin010305/YKhoa.git](https://github.com/trungtin010305/YKhoa.git)
   cd YKhoa
Cấu hình API Key:

Mở file app.js.

Cấu hình biến môi trường hoặc thay thế phần GEMINI_API_KEY bằng mã khóa API được cấp từ Google AI Studio của bạn.

Khởi chạy ứng dụng:

Do hệ thống vận hành hoàn toàn ở phía Client, bạn chỉ cần mở file index.html trên bất kỳ trình duyệt hiện đại nào (Chrome, Edge, Safari, Firefox).

Khuyến khích sử dụng extension Live Server trên VS Code để có trải nghiệm hot-reload tốt nhất.

🤝 Đóng Góp Phát Triển (Contributing)
Mọi đóng góp nhằm tối ưu thuật toán suy luận hoặc làm phong phú thêm cơ sở dữ liệu tri thức y khoa (knowledgeBase.js) đều được trân trọng.

Fork dự án này.

Tạo nhánh tính năng mới (git checkout -b feature/AmazingFeature).

Commit các thay đổi của bạn (git commit -m 'Add some AmazingFeature').

Push nhánh tính năng lên GitHub (git push origin feature/AmazingFeature).

Mở một Pull Request để nhóm kiểm duyệt kiểm tra chất lượng mã nguồn.

📄 Giấy Phép (License)
Dự án này được bảo hộ và phân phối dưới dạng mã nguồn mở theo MIT License - Xem file LICENSE để biết thêm chi tiết.
