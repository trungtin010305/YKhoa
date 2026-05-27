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

**Hệ Thống Chẩn Đoán Y Khoa AI** là một giải pháp phần mềm y tế thông minh kỹ thuật số được nghiên cứu và phát triển bởi **nhóm DaTai**. Hệ thống tích hợp các công nghệ tiên tiến nhằm tối ưu hóa quy trình khai thác bệnh sử, số hóa dữ liệu xét nghiệm lâm sàng/cận lâm sàng và đưa ra các định hướng chẩn đoán với độ chính xác cao.

Điểm đột phá của hệ thống là việc ứng dụng mô hình học máy lai (**Hybrid AI Model**):
*   **Hệ chuyên gia cổ điển (Classic Expert System):** Khai thác cơ sở tri thức cứng bằng các thuật toán suy luận toán học lâm sàng chặt chẽ (`Forward/Backward Chaining`), đảm bảo tính minh bạch và có thể giải trình logic y khoa (Explainable AI).
*   **Trí tuệ nhân tạo tạo sinh hiện đại (Generative AI & Edge Deep Learning):** Xử lý ngôn ngữ tự nhiên (NLP) từ các đoạn hội thoại, tường thuật bệnh sử tự do của bệnh nhân và phân tích sâu các chỉ số sinh hiệu nâng cao.

Toàn bộ nền tảng được vận hành trên giao diện **Glassmorphism** sang trọng, trực quan, hỗ trợ tối ưu hiển thị đa ngôn ngữ và tối ưu hóa hiệu năng vượt trội trực tiếp ở phía client (Client-side).

---

## 🛠️ Kiến Trúc Hệ Thống (System Architecture)

Dự án tuân thủ nghiêm ngặt nguyên lý thiết kế **Separation of Concerns (SoC)** và kiến trúc hướng mô-đun (Modular Architecture). Toàn bộ luồng tính toán suy luận nặng đều được thực thi cục bộ (**Edge Inference**) trực tiếp trên trình duyệt web của người dùng, giúp loại bỏ độ trễ mạng và bảo vệ tuyệt đối quyền riêng tư dữ liệu y tế theo chuẩn quốc tế.
✨ Tính Năng Cốt Lõi (Key Features)
1. Động Cơ Suy Luận Lai (Hybrid Inference Engine)
Forward Chaining (Suy luận tiến): Quét toàn bộ cơ sở tri thức dựa trên các triệu chứng hiện tại để tìm các kết quả bệnh lý phù hợp.
Backward Chaining (Suy luận lùi): Khi phát hiện nguy cơ bệnh lý nghiêm trọng, hệ thống sẽ tự động đi ngược lại, đặt ra các câu hỏi lâm sàng thông minh để xác minh hoặc loại trừ chẩn đoán.
Certainty Factor (Hệ số tin cậy $CF$): Áp dụng công thức tính toán độ tin cậy kết hợp lý thuyết xác suất để định lượng khả năng mắc bệnh:
2. Trợ Lý Ngôn Ngữ Tự Nhiên Y Khoa (Medical NLP)
Tích hợp mô hình Gemini 2.5 Flash API được tối ưu hóa cấu trúc câu lệnh prompt chuyên biệt.
Tự động bóc tách và chuẩn hóa các văn bản thô, lời kể không cấu trúc của bệnh nhân thành các cặp giá trị Key-Value (Triệu chứng - Mức độ) tương thích với hệ thống mà không cần nhập liệu thủ công.

3. Vận Hành Edge AI Siêu Tốc
Tích hợp nền tảng toán học TensorFlow.js cho phép chạy các mô hình phân tích phân loại cục bộ.
Tốc độ phản hồi tức thì ($\approx 0\text{ms}$ độ trễ xử lý logic), hoạt động ổn định kể cả trong điều kiện mất kết nối mạng (Offline Mode).
Cấu Trúc Mã Nguồn (Project Structure)
├── index.html          # Khung kiến trúc giao diện chính, tối ưu SEO và cấu trúc ngữ nghĩa HTML5
├── style.css           # Định hình phong cách thiết kế Glassmorphic UI, xử lý responsive và hiệu ứng mờ
├── app.js              # Khởi tạo ứng dụng, quản lý trạng thái, luồng sự kiện và điều phối API Gemini
├── inferenceEngine.js  # Lõi thuật toán suy luận lâm sàng logic (Forward/Backward Chaining), tính toán CF
└── knowledgeBase.js    # Cơ sở dữ liệu tri thức y khoa (Danh mục bệnh lý, triệu chứng định danh, ngưỡng sinh hiệu)
