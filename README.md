# 🩺 Hệ Thống Chẩn Đoán Y Khoa AI (Advanced Medical Diagnosis System)

> **Dự án được nghiên cứu và phát triển bởi nhóm DaTai** 🚀

Chào mừng bạn đến với **Hệ Thống Chẩn Đoán Y Khoa AI** - một ứng dụng web y tế thông minh tích hợp Trí tuệ Nhân tạo hiện đại, hệ thống suy luận logic lâm sàng (Expert System) và giao diện Glassmorphism đỉnh cao. Hệ thống được thiết kế để hỗ trợ bác sĩ và bệnh nhân thu thập sinh hiệu, khai báo triệu chứng, phân tích hình ảnh cận lâm sàng và đề xuất phác đồ điều trị an toàn.

![Giao diện chính](https://cdn.fpt-is.com/vi/AI-trong-y-te-FPT-IS-1743578295.png)

---

## ✨ Các Tính Năng Nổi Bật123

### 1. 🗂️ Quản Lý Hồ Sơ Bệnh Án Điện Tử (EMR)
*   **Định danh Y tế**: Khai báo thông tin bệnh nhân, độ tuổi (Nhi khoa, Thành niên, Lão khoa), giới tính và bệnh lý nền.
*   **Kiểm tra Tương tác Thuốc**: AI tự động phát hiện các tương tác thuốc nguy hiểm (Ví dụ: Corticoid + NSAID, Paracetamol + Rượu) và cảnh báo dị ứng mạnh.
*   **Đồng bộ Smartwatch**: Lấy chỉ số sinh hiệu (Huyết áp, Nhịp tim, Đường huyết, SpO2) chỉ với 1-click thông qua giả lập kết nối thiết bị đeo.
*   **Lịch sử Khám Bệnh**: Lưu trữ cục bộ (`localStorage`), hỗ trợ xóa hồ sơ và **Xuất Báo Cáo EMR ra file CSV** chuyên nghiệp.

### 2. 🔍 Khảo Sát Lâm Sàng & Động Cơ Suy Luận (Inference Engine)
*   **Phân nhóm Triệu chứng Sinh động**: Hơn 100+ triệu chứng được phân loại khoa học theo các nhóm chuyên khoa: Thần kinh, Tai Mũi Họng, Mắt, Hô hấp - Tim mạch, Tiêu hóa - Gan mật, Thận niệu, Cơ xương khớp & Da liễu.
*   **Động Cơ Suy Luận Kép (Hybrid Inference)**:
    *   **Forward Chaining (Suy luận tiến)**: Định lượng tổng trọng số của triệu chứng kết hợp tuổi tác, giới tính và bệnh nền để đưa ra chẩn đoán sơ bộ.
    *   **Backward Chaining (Suy luận lùi)**: Tự động "hỏi vặn" và gợi ý các triệu chứng còn thiếu khi phát hiện nguy cơ cao của các bệnh lý nguy kịch, giúp loại trừ rủi ro bỏ sót bệnh.

### 3. 📸 Trung Tâm Cận Lâm Sàng & Phân Tích Hình Ảnh (Computer Vision)
*   **AI Phân Tích Hình Ảnh (TensorFlow.js + MobileNet)**: Cho phép quét phim X-quang phổi, tổn thương da liễu hoặc siêu âm khối u bằng mạng nơ-ron tích chập chạy hoàn toàn ở Client-side.
*   **AI OCR & NLP Xét Nghiệm**: Đọc hiểu chỉ số xét nghiệm từ file PDF hoặc ảnh chụp sinh hóa máu, tự động phân tích và đưa ra lời khuyên y khoa hữu ích.

### 4. 🤖 Trợ Lý Bác Sĩ AI & Chatbot Gemini
*   **Phân tích Bệnh sử tự động (Voice & Text NLP)**: Bệnh nhân có thể mô tả triệu chứng bằng văn bản hoặc giọng nói (Web Speech API). AI sẽ tự động phân tích và tick chọn các triệu chứng y khoa tương ứng trên hệ thống.
*   **Tư vấn Hỏi đáp sau Chẩn đoán**: Chatbot AI tích hợp Google Gemini API sẵn sàng giải thích bệnh lý, trả lời câu hỏi và tư vấn chuyên sâu theo ngữ cảnh bệnh án hiện tại.

### 5. 📞 Tính Năng Hỗ Trợ Chăm Sóc Sức Khỏe
*   **Sơ đồ Suy luận AI (Decision Tree)**: Hiển thị trực quan tiến trình đưa ra kết luận của AI.
*   **Đặt lịch Theo dõi (Follow-up)**: Đăng ký SMS nhắc nhở uống thuốc tự động.
*   **Khám bệnh Từ xa (Telemedicine)**: Giả lập cuộc gọi Video Call độ phân giải cao kết nối trực tiếp với Bác sĩ chuyên khoa.

---

## 🛠️ Công Nghệ Sử Dụng

*   **Front-end**: HTML5 Semantic, Vanilla CSS3 (Custom Properties, Flexbox, CSS Grid, Glassmorphism).
*   **Logic Core**: Modern Javascript (ES6+, Async/Await, Web APIs).
*   **AI & Machine Learning**: 
    *   **TensorFlow.js** & **MobileNet** (Quét và phân tích hình ảnh ngoại tuyến).
    *   **Google Gemini API** (`gemini-2.0-flash`) (Xử lý ngôn ngữ tự nhiên NLP và Chatbot tư vấn).
*   **API Dịch thuật**: Google Translate API.
*   **Tiện ích**: Web Speech API (Nhận diện giọng nói), Local Storage API, Window Print.

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Dự Án

### Cách 1: Chạy nhanh (Không cần cài đặt)
Dự án được xây dựng thuần túy bằng HTML/CSS/JS không phụ thuộc vào Node.js build step, giúp bạn chạy cực kỳ dễ dàng:
1. Tải toàn bộ mã nguồn về máy tính.
2. Mở file `index.html` trực tiếp bằng trình duyệt (Double-click) hoặc sử dụng extension **Live Server** trong VS Code để chạy.

### Cách 2: Cài đặt và cấu hình khóa API Gemini
Để kích hoạt tính năng **Nhận diện giọng nói NLP** và **Trợ lý Bác sĩ AI**:
1. Đăng ký và lấy khóa API miễn phí từ [Google AI Studio](https://aistudio.google.com/).
2. Trên giao diện ứng dụng, bấm vào nút biểu tượng **⚙️ Cài đặt** ở góc trên menu trái.
3. Dán khóa API của bạn vào và bấm Lưu. Khóa sẽ được lưu trữ an toàn trong `localStorage` của trình duyệt của riêng bạn.

---

## 📂 Cấu Trúc Thư Mục Dự Án

```text
├── index.html            # Giao diện chính của ứng dụng và các Modals UI
├── app.js                # Xử lý các sự kiện DOM, điều phối UI, tích hợp TensorFlow & APIs
├── style.css             # Hệ thống CSS variables, Glassmorphism, Dark mode & Responsive
├── inferenceEngine.js    # Động cơ suy luận lâm sàng (Forward & Backward Chaining)
├── knowledgeBase.js      # Cơ sở tri thức (Triệu chứng, Luật chẩn đoán, Phác đồ & Modifier)
└── README.md             # Tài liệu hướng dẫn dự án (File này)
```

---

## 🔒 Tuyên Bố Miễn Trừ Trách Nhiệm (Disclaimer)
*Hệ thống này được phát triển cho mục đích giáo dục, nghiên cứu công nghệ và hỗ trợ định hướng sơ bộ. Mọi thông tin chẩn đoán, phác đồ điều trị và cảnh báo thuốc từ AI chỉ mang tính chất tham khảo và **không thay thế** cho ý kiến chuyên môn, chẩn đoán hay chỉ định y khoa từ bác sĩ có chứng chỉ hành nghề.*

---
hello bro buổi tối vui vẻ 
:))))))))))))))))))))))
))))))))))))))))))))))

Chúc bạn có những trải nghiệm tuyệt vời với ứng dụng! Nếu thấy dự án hữu ích, hãy tặng **1 ⭐ Star** trên Github nhé! 💖
