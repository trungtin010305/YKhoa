# 🩺 Advanced Medical Diagnosis System (Hệ Thống Chẩn Đoán Y Khoa AI)

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML-5-orange.svg)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS-3-blue.svg)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![TensorFlow.js](https://img.shields.io/badge/AI-TensorFlow.js-orange.svg)](https://www.tensorflow.org/js)
[![Gemini API](https://img.shields.io/badge/AI-Gemini%202.0-blue.svg)](https://aistudio.google.com/)

**Hệ Thống Chẩn Đoán Y Khoa AI** là một ứng dụng web y tế thông minh, tích hợp Trí tuệ Nhân tạo (AI) và hệ thống suy luận logic lâm sàng (Expert System) với giao diện Glassmorphism hiện đại. Dự án hỗ trợ thu thập sinh hiệu, khai báo triệu chứng, phân tích cận lâm sàng và đề xuất hướng điều trị sơ bộ.

![Giao diện chính](https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80)

---

## ✨ Tính Năng Cốt Lõi
*   **Quản Lý EMR**: Lưu trữ bệnh án cục bộ, xuất file CSV.
*   **Suy luận Kép (Hybrid Inference)**: Sử dụng kết hợp *Forward Chaining* (định lượng trọng số) và *Backward Chaining* (hỏi vặn thông minh) để tối ưu độ chính xác.
*   **Thị giác Máy tính (CV)**: Sử dụng TensorFlow.js + MobileNet để phân tích X-Quang, siêu âm trực tiếp tại Client-side.
*   **Trợ lý AI (Gemini)**: Tích hợp NLP phân tích lời khai bệnh nhân qua giọng nói và chatbot tư vấn chuyên sâu.
*   **Cảnh báo Đa tầng**: Kiểm tra tương tác thuốc, dị ứng và các dấu hiệu nguy cấp (Critical Diseases).

## 🛠️ Công Nghệ Sử Dụng
*   **Front-end**: HTML5, Vanilla CSS3 (Glassmorphism), Vanilla JavaScript (ES6+).
*   **AI/ML**: TensorFlow.js (MobileNet), Google Gemini API (`gemini-2.0-flash`).
*   **Web APIs**: Web Speech API, Local Storage API, Window Print API.

## 🚀 Hướng Dẫn Cài Đặt
Dự án chạy hoàn toàn thuần túy, không cần Node.js build step:
1. Clone dự án: `git clone https://github.com/your-username/advanced-medical-diagnosis.git`
2. Mở `index.html` bằng trình duyệt (hoặc dùng Live Server trong VS Code).
3. Cấu hình API Key Gemini tại mục **⚙️ Cài đặt** trong ứng dụng.

## 🔒 Tuyên Bố Miễn Trừ Trách Nhiệm
Dự án được xây dựng cho **mục đích giáo dục và nghiên cứu**. Mọi kết quả phân tích chỉ mang tính chất tham khảo, **không thay thế** cho chẩn đoán chuyên môn từ bác sĩ.

---
*Phát triển bởi: Nhóm DaTai
