# 🩺 Hệ Thống Chẩn Đoán Y Khoa AI (Advanced Medical Diagnosis System)

> **Dự án được nghiên cứu và phát triển bởi nhóm DaTai** 🚀

Chào mừng bạn đến với **Hệ Thống Chẩn Đoán Y Khoa AI** - một ứng dụng web y tế thông minh tích hợp Trí tuệ Nhân tạo hiện đại, hệ thống suy luận logic lâm sàng (Expert System) và giao diện Glassmorphism đỉnh cao. Hệ thống được thiết kế để hỗ trợ bác sĩ và bệnh nhân thu thập sinh hiệu, khai báo triệu chứng, phân tích hình ảnh cận lâm sàng và đề xuất phác đồ điều trị an toàn.

![Giao diện chính](https://cdn.fpt-is.com/vi/AI-trong-y-te-FPT-IS-1743578295.png)

---

1. ✨ Các Tính Năng Nổi Bật
1.1. 🗂️ Quản Lý Hồ Sơ Bệnh Án Điện Tử (EMR)
Định danh Y tế Toàn diện: Khai báo và cấu trúc hóa thông tin hành chính của bệnh nhân bao gồm: Họ tên, nhóm tuổi lâm sàng (Nhi khoa, Thành niên, Lão khoa), giới tính sinh học và tiền sử bệnh lý nền.

Hệ thống Kiểm tra Tương tác Thuốc (DDI Engine): Tích hợp thuật toán tự động đối chiếu đơn thuốc chỉ định với tiền sử bệnh lý. AI tự động phát hiện các tương tác thuốc nguy hiểm (Ví dụ: Corticoid + NSAID gây nguy cơ xuất huyết tiêu hóa, Paracetamol + Rượu/Bia gây hoại tử tế bào gan) và đưa ra cảnh báo dị ứng mạnh.

Đồng bộ Smartwatch (IoT Biometric Simulation): Thiết lập cổng giao tiếp giả lập thiết bị đeo thông minh, cho phép trích xuất các chỉ số sinh hiệu cốt lõi bao gồm Huyết áp, Nhịp tim, Đường huyết và nồng độ oxy trong máu (SpO2) chỉ với 1-click.

Data Persistence & I/O Subsystem: Toàn bộ lịch sử khám bệnh được lưu trữ cục bộ an toàn tại trình duyệt thông qua localStorage, hỗ trợ cơ chế xóa hồ sơ bảo mật và tích hợp module kết xuất, Xuất Báo Cáo EMR ra file CSV theo tiêu chuẩn chuyên nghiệp.

1.2. 🔍 Khảo Sát Lâm Sàng & Động Cơ Suy Luận (Inference Engine)
Phân nhóm Triệu chứng Sinh động: Hệ thống quản lý cơ sở tri thức gồm hơn 100+ triệu chứng lâm sàng được phân loại khoa học theo 8 nhóm chuyên khoa mũi nhọn: Thần kinh, Tai Mũi Họng, Mắt, Hô hấp - Tim mạch, Tiêu hóa - Gan mật, Thận niệu, Cơ xương khớp & Da liễu.

Động Cơ Suy Luận Kép (Hybrid Inference System):

Forward Chaining (Suy luận tiến): Định lượng tổng trọng số của các triệu chứng hiện tại, kết hợp logic với các biến nhân khẩu học (Tuổi tác, giới tính) và bệnh lý nền để tính toán phân vị xác suất và đưa ra kết luận chẩn đoán sơ bộ.

Backward Chaining (Suy luận lùi): Tự động kích hoạt khi hệ thống phát hiện nguy cơ cao của các bệnh lý nguy kịch. Động cơ tự động đảo ngược quy trình ("hỏi vặn") và gợi ý các triệu chứng còn thiếu trên UI nhằm thu thập thêm dữ liệu, giúp loại trừ rủi ro bỏ sót bệnh (False Negative).

1.3. 📸 Trung Tâm Cận Lâm Sàng & Phân Tích Hình Ảnh (Computer Vision)
AI Phân Tích Hình Ảnh Cục Bộ (TensorFlow.js + MobileNet): Cho phép người dùng quét và phân tích phim X-quang phổi (phát hiện tổn thương), tổn thương da liễu hoặc ảnh siêu âm khối u. Module sử dụng mạng nơ-ron tích chập (CNN) MobileNet đã lượng tử hóa, chạy hoàn toàn độc lập ở Client-side không phụ thuộc server backend.

AI OCR & NLP Xét Nghiệm: Module tích hợp thuật toán nhận diện ký tự quang học (OCR) để đọc hiểu chỉ số xét nghiệm từ file PDF hoặc ảnh chụp sinh hóa máu, tự động phân tích các chỉ số vượt ngưỡng và đưa ra lời khuyên y khoa hữu ích.

1.4. 🤖 Trợ Lý Bác Sĩ AI & Chatbot Gemini
Phân tích Bệnh sử Tự động (Voice & Text NLP): Bệnh nhân có thể mô tả trạng thái sức khỏe bằng văn bản tự do hoặc giọng nói trực tiếp qua Web Speech API. AI sẽ tiến hành phân tích cú pháp NLP ngữ nghĩa để bóc tách triệu chứng và tự động tick chọn các checkbox triệu chứng y khoa tương ứng trên hệ thống.

Tư vấn Hỏi đáp sau Chẩn đoán: Chatbot AI tích hợp trực tiếp Google Gemini API (gemini-2.0-flash). Hệ thống áp dụng kỹ thuật Prompt Engineering để đóng gói toàn bộ ngữ cảnh bệnh án hiện tại, sẵn sàng giải thích cơ chế bệnh lý, trả lời câu hỏi và tư vấn chuyên sâu theo thời gian thực.

1.5. 📞 Tính Năng Hỗ Trợ Chăm Sóc Sức Khỏe & Từ Xa
Sơ đồ Suy luận AI (Decision Tree Visualizer): Hiển thị trực quan và minh bạch tiến trình cây quyết định của AI, giúp người dùng và bác sĩ theo dõi được logic dẫn đến kết luận chẩn đoán.

Đặt lịch Theo dõi (Follow-up Scheduler): Hệ thống quản lý lịch hẹn tái khám và đăng ký dịch vụ SMS nhắc nhở uống thuốc tự động theo chu kỳ phác đồ.

Khám bệnh Từ xa (Telemedicine Simulation): Giả lập kênh truyền dữ liệu media stream độ phân giải cao, thiết lập giao diện cuộc gọi Video Call kết nối trực tiếp Bệnh nhân với Bác sĩ chuyên khoa.

🛠️ Công Nghệ Sử Dụng (Tech Stack)
Giao diện người dùng (Front-end Layer): HTML5 Semantic, Vanilla CSS3 chuyên sâu (Custom Properties/Variables, Flexbox, CSS Grid), ngôn ngữ thiết kế hiệu ứng kính kỹ thuật số (Glassmorphism Design Language).

Logic Core (Controller Layer): Javascript hiện đại (ES6+), Kiến trúc lập trình bất đồng bộ (Async/Await), Module hóa mã nguồn, Hệ thống Web APIs native.

Trí tuệ nhân tạo và Học máy (AI & Machine Learning):

TensorFlow.js & MobileNet: Bộ thư viện toán học và mô hình CNN tiền huấn luyện chạy ngoại tuyến (Offline Edge Computing) phục vụ phân loại hình ảnh lâm sàng.

Google Gemini API (gemini-2.0-flash): Đóng vai trò hạt nhân xử lý ngôn ngữ tự nhiên (NLP) ngữ cảnh và vận hành Chatbot hội thoại y tế.

API Dịch thuật: Google Translate API (Hỗ trợ bản địa hóa dữ liệu báo cáo).

Hệ thống Tiện ích Native: Web Speech API (Nhận diện giọng nói theo thời gian thực), Local Storage API (Lưu trữ trạng thái và persist data), Window Print (Xuất bản in hồ sơ).

🚀 Hướng Dẫn Cài Đặt & Chạy Dự Án
Cách 1: Chạy nhanh (Không cần cài đặt hạ tầng)
Dự án được xây dựng thuần túy bằng kiến trúc Native Web (HTML/CSS/JS) không phụ thuộc vào bất kỳ Node.js build step hay trình đóng gói (Bundler) nào, giúp bạn triển khai cực kỳ dễ dàng:

Tải toàn bộ mã nguồn của dự án về máy tính.

Khởi chạy file index.html trực tiếp bằng trình duyệt (Double-click) hoặc sử dụng extension Live Server trong VS Code để tạo môi trường local server (khuyến nghị cách này để các Web API hoạt động chính xác nhất).

Cách 2: Cài đặt nâng cao và cấu hình khóa API Gemini
Để kích hoạt toàn diện tính năng Nhận diện giọng nói NLP và Trợ lý Bác sĩ AI thông minh:

Đăng ký và khởi tạo khóa API cá nhân miễn phí từ Google AI Studio.

Trên giao diện ứng dụng AMDS, bấm vào nút biểu tượng ⚙️ Cài đặt ở góc trên menu bên trái.

Dán khóa API của bạn vào trường dữ liệu và bấm Lưu. Khóa sẽ được lưu trữ biệt lập và an toàn trong localStorage của riêng trình duyệt thuộc quyền sở hữu của bạn.

📂 Cấu Trúc Thư Mục Dự Án
Mã nguồn được tổ chức theo nguyên lý độc lập và module hóa rõ ràng (Separation of Concerns):
📂 advanced-medical-diagnosis-system
├── 📄 index.html            # Tầng View: Giao diện chính của ứng dụng và các Modals UI cấu trúc
├── 📄 app.js                # Tầng Controller: Xử lý sự kiện DOM, điều phối UI, tích hợp TensorFlow & APIs
├── 📄 style.css             # Tầng Style: Hệ thống CSS variables, hiệu ứng Glassmorphism, Dark mode & Responsive
├── 📄 inferenceEngine.js    # Tầng Logic Core: Động cơ suy luận lâm sàng (Forward & Backward Chaining)
├── 📄 knowledgeBase.js      # Tầng Model Data: Cơ sở tri thức (Triệu chứng, Luật chẩn đoán, Phác đồ & Modifier)
└── 📄 README.md             # Tài liệu hướng dẫn đặc tả hệ thống dự án (File này)
🔒 Tuyên Bố Miễn Trừ Trách Nhiệm (Medical Disclaimer)
Hệ thống này được nghiên cứu và phát triển cho mục đích giáo dục, đào tạo, nghiên cứu công nghệ và hỗ trợ định hướng tiền sàng lọc sơ bộ trong y tế. Mọi thông tin liên quan đến chẩn đoán xác xuất, phác đồ điều trị gợi ý, phân tích hình ảnh học máy hay cảnh báo tương tác thuốc từ AI chỉ mang tính chất tham khảo học thuật và không thay thế cho ý kiến chuyên môn lâm sàng, chẩn đoán xác định hoặc chỉ định y khoa từ bác sĩ có chứng chỉ hành nghề hợp pháp.

Chúc bạn có những trải nghiệm tuyệt vời với ứng dụng! Nếu thấy dự án hữu ích, hãy tặng 1 ⭐ Star trên Github cho nhóm nhé! 💖
