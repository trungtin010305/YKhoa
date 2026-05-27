# 🩺 Hệ Thống Chẩn Đoán Y Khoa AI
### *Advanced Hybrid Medical Diagnosis System*

<p align="center">
  <img src="[https://citgroup.vn/wp-content/uploads/2025/03/Ung-dung-cong-nghe-tri-tue-nhan-tao-AI-trong-chuan-doan-hinh-anh-y-khoa.jpg](https://citgroup.vn/wp-content/uploads/2025/03/Ung-dung-cong-nghe-tri-tue-nhan-tao-AI-trong-chuan-doan-hinh-anh-y-khoa.jpg)" alt="Ứng dụng công nghệ trí tuệ nhân tạo AI trong chẩn đoán hình ảnh y khoa" width="100%" style="border-radius: 12px;" />
</p>

<p align="center">
  <a href="[https://github.com/trungtin010305/YKhoa](https://github.com/trungtin010305/YKhoa)">
    <img src="[https://img.shields.io/badge/Version-1.5.0-007acc?style=flat-square&logo=semver](https://img.shields.io/badge/Version-1.5.0-007acc?style=flat-square&logo=semver)" alt="Version" />
  </a>
  <img src="[https://img.shields.io/badge/JavaScript-ES6%2B-f7df1e?style=flat-square&logo=javascript&logoColor=black](https://img.shields.io/badge/JavaScript-ES6%2B-f7df1e?style=flat-square&logo=javascript&logoColor=black)" alt="JavaScript" />
  <img src="[https://img.shields.io/badge/TensorFlow.js-4.20-ff6f00?style=flat-square&logo=tensorflow](https://img.shields.io/badge/TensorFlow.js-4.20-ff6f00?style=flat-square&logo=tensorflow)" alt="TensorFlow.js" />
  <img src="[https://img.shields.io/badge/Gemini_API-2.5_Flash-9b51e0?style=flat-square&logo=google-gemini](https://img.shields.io/badge/Gemini_API-2.5_Flash-9b51e0?style=flat-square&logo=google-gemini)" alt="Gemini API" />
  <img src="[https://img.shields.io/badge/Design-Glassmorphism-00c6ff?style=flat-square&logo=css3](https://img.shields.io/badge/Design-Glassmorphism-00c6ff?style=flat-square&logo=css3)" alt="Design Glassmorphism" />
</p>

---

## 🚀 Giới Thiệu Dự Án

> 💡 **Tổng quan:** **Hệ Thống Chẩn Đoán Y Khoa AI** là giải pháp phần mềm y tế kỹ thuật số đột phá được nghiên cứu và phát triển bởi **nhóm DaTai**. Hệ thống hỗ trợ tối ưu hóa quy trình khai thác bệnh sử, số hóa dữ liệu xét nghiệm lâm sàng và định hướng chẩn đoán với độ chính xác cao.

Hệ thống vận hành dựa trên cơ chế học máy lai (**Hybrid AI Model**):
*   **Hệ chuyên gia cổ điển (Classic Expert System):** Khai thác cơ sở tri thức bằng các thuật toán suy luận toán học chặt chẽ (`Forward/Backward Chaining`), đảm bảo tính minh bạch và có khả năng giải trình logic y khoa.
*   **Trí tuệ nhân tạo tạo sinh (Generative AI):** Tích hợp xử lý ngôn ngữ tự nhiên (NLP) để bóc tách thực thể lâm sàng từ các đoạn hội thoại tự do của bệnh nhân.

---

## 🛠️ Kiến Trúc Hệ Thống

Để đảm bảo tính toàn vẹn và bảo mật dữ liệu y tế nhạy cảm, hệ thống áp dụng nguyên lý **Separation of Concerns (SoC)** và thực thi toán học cục bộ (**Edge Inference**) trực tiếp ở phía Client.

```mermaid
graph TD
    A[Bệnh nhân / Bác sĩ] -->|1. Khai báo Triệu chứng & Sinh hiệu| B(Giao diện Glassmorphism UI)
    A -->|2. Tường thuật giọng nói / Bệnh sử tự do| C(NLP Processing - Gemini 2.5 Flash API)
    C -->|Bóc tách thực thể lâm sàng cấu trúc| B
    B -->|3. Nạp tập hợp dữ kiện đầu vào| D{Động cơ Suy luận Lâm sàng}
    D -->|Suy luận tiến - Forward Chaining| E[Xác định trọng số & Tính điểm tin cậy CF]
    D -->|Suy luận lùi - Backward Chaining| F[Khai thác câu hỏi loại trừ nguy kịch]
    F -.->|Bác sĩ cập nhật phản hồi| D
    E --> G[Báo cáo Chẩn đoán Sơ bộ]
