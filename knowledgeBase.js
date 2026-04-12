// Thư viện triệu chứng nay hỗ trợ Cận Lâm Sàng & Hình Ảnh & Các Danh mục Bệnh Nhiệt Đới
const symptomGroups = {
    'Sinh Hiệu Toàn Thân': [
        { id: 'fever', label: 'Tăng thân nhiệt / Sốt (Pyrexia)' },
        { id: 'high_fever', label: 'Sốt cao kịch phát (>39°C)' },
        { id: 'fatigue', label: 'Suy nhược cơ thể (Asthenia)' },
        { id: 'weight_loss', label: 'Sụt cân không chủ ý' },
        { id: 'night_sweats', label: 'Tăng tiết mồ hôi ban đêm' },
        { id: 'unexplained_bleeding', label: 'Xuất huyết bất thường / Mảng bầm da' },
        { id: 'chills', label: 'Ớn lạnh / Rét run' },
        { id: 'loss_of_appetite', label: 'Chán ăn / Ăn không ngon' },
        { id: 'polydipsia', label: 'Khát nước liên tục' },
        { id: 'swollen_lymph_nodes', label: 'Sưng hạch bạch huyết tản mạn' },
        { id: 'dehydration', label: 'Dấu hiệu mất nước / Khô môi' },
        { id: 'insomnia', label: 'Mất ngủ kéo dài' },
        { id: 'lethargy', label: 'Lơ mơ / Thiếu tỉnh táo' }
    ],
    'Thần Kinh': [
        { id: 'headache', label: 'Đau đầu / Cứng gáy (Cephalalgia)' },
        { id: 'dizziness', label: 'Chóng mặt / Rối loạn tiền đình (Vertigo)' },
        { id: 'numbness', label: 'Tê bì / Yếu liệt chi (Paresis)' },
        { id: 'memory_loss', label: 'Suy giảm trí nhớ / Lú lẫn (Dementia)' },
        { id: 'tremor', label: 'Run rẩy không tự chủ (Tremor)' },
        { id: 'fainting', label: 'Ngất xỉu / Mất ý thức (Syncope)' },
        { id: 'seizure', label: 'Co giật / Động kinh cục bộ' },
        { id: 'confusion', label: 'Lú lẫn / Rối loạn định hướng' },
        { id: 'muscle_spasm', label: 'Co thắt cơ / Chuột rút' },
        { id: 'loss_of_balance', label: 'Mất thăng bằng / Loạng choạng' },
        { id: 'vision_changes_neuro', label: 'Nhìn đôi / Gắn quầng sáng do TK' },
        { id: 'speech_difficulty', label: 'Khó nói / Đớ lưỡi / Thất ngôn' }
    ],
    'Tai Mũi Họng': [
        { id: 'sore_throat', label: 'Đau rát hầu họng / Nuốt vướng' },
        { id: 'hoarseness', label: 'Khàn tiếng / Mất giọng kéo dài' },
        { id: 'ear_pain', label: 'Đau nhức trong ống tai' },
        { id: 'tinnitus', label: 'Ù tai / Tiếng ve kêu trong tai' },
        { id: 'nasal_congestion', label: 'Nghẹt mũi / Tắc nghẽn hô hấp trên' },
        { id: 'loss_of_smell', label: 'Mất khứu giác / Giảm ngửi (Anosmia)' },
        { id: 'sneezing', label: 'Hắt hơi liên tục do dị ứng' },
        { id: 'epistaxis', label: 'Chảy máu cam (Epistaxis)' },
        { id: 'ear_discharge', label: 'Chảy mủ tai / Dịch vàng' },
        { id: 'tonsil_swelling', label: 'Sưng amydal / Cổ họng có mủ trắng' }
    ],
    'Mắt': [
        { id: 'red_eye', label: 'Mắt đỏ / Rỉ dịch ghèn liên tục' },
        { id: 'itchy_eye', label: 'Ngứa cộm mắt khó chịu' },
        { id: 'blurred_vision', label: 'Nhìn mờ / Giảm thị lực đột ngột' },
        { id: 'eye_pain', label: 'Đau nhức sâu trong hốc mắt' },
        { id: 'photophobia', label: 'Sợ ánh sáng / Chói mắt' },
        { id: 'watery_eyes', label: 'Chảy nước mắt sống liên tục' },
        { id: 'dry_eyes', label: 'Khô mắt / Cảm giác vướng như có cát' },
        { id: 'swollen_eyelid', label: 'Sưng phù mi mắt / Sụp mi' },
        { id: 'halo_vision', label: 'Nhìn thấy quầng sáng quanh đèn' }
    ],
    'Hô Hấp - Tim Mạch': [
        { id: 'cough', label: 'Ho khan / Ho kích ứng thông thường' },
        { id: 'productive_cough', label: 'Ho khạc đờm đặc đục (Productive cough)' },
        { id: 'coughing_blood', label: 'Ho ra máu tươi bọt (Hemoptysis)' },
        { id: 'shortness_of_breath', label: 'Khó thở / Tức ngực (Dyspnea)' },
        { id: 'chest_pain', label: 'Đau thắt ngực (Angina Pectoris)' },
        { id: 'runny_nose', label: 'Sổ mũi / Xung huyết mũi' },
        { id: 'palpitation', label: 'Đánh trống ngực / Tim đập bấn loạn' },
        { id: 'wheezing', label: 'Thở khò khè / Rít thanh quản' },
        { id: 'cyanosis', label: 'Tím tái môi / Đầu ngón tay ngón chân' },
        { id: 'orthopnea', label: 'Khó thở khi nằm phẳng phải ngồi dậy' },
        { id: 'fast_heart_rate', label: 'Nhịp tim nhanh hồi hộp (>100 l/p)' },
        { id: 'swollen_legs_heart', label: 'Phù cứng hai chi dưới do suy tim' }
    ],
    'Tiêu Hóa - Gan Mật': [
        { id: 'nausea', label: 'Buồn nôn / Nôn chớ (Nausea & Vomiting)' },
        { id: 'diarrhea', label: 'Tiêu chảy cấp / Đi ngoài phân lỏng' },
        { id: 'stomach_ache', label: 'Đau co thắt vùng bụng / Thượng vị' },
        { id: 'stomach_cramp', label: 'Bụng sôi đau quặn từng cơn co thắt' },
        { id: 'jaundice', label: 'Vàng da / Vàng củng mạc mắt (Jaundice)' },
        { id: 'bloody_stool', label: 'Đại tiện phân đen / Máu đỏ tươi (Melena)' },
        { id: 'constipation', label: 'Táo bón dai dẳng kéo dài' },
        { id: 'heartburn', label: 'Ợ nóng / Trào ngược dạ dày thực quản' },
        { id: 'bloating', label: 'Đầy hơi / Chướng bụng / Khó tiêu' },
        { id: 'pale_stool', label: 'Phân nhạt màu / Bạc màu sống phân' },
        { id: 'dark_urine_liver', label: 'Nước tiểu sậm màu như trà đặc' },
        { id: 'vomiting_blood', label: 'Nôn ra máu tươi / Dịch vị đen thẫm' }
    ],
    'Thận Niệu - Sinh Dục': [
        { id: 'back_pain', label: 'Đau quặn thắt lưng hông đổ xuống' },
        { id: 'frequent_urination', label: 'Tiểu đêm (Nocturia) / Đa niệu lắt nhắt' },
        { id: 'painful_urination', label: 'Tiểu buốt (Dysuria) / Tiểu gắt' },
        { id: 'erectile_dysfunction', label: 'Rối loạn cương dương / Yếu sinh lý' },
        { id: 'menstrual_irregularity', label: 'Rối loạn kinh nguyệt / Thống kinh' },
        { id: 'breast_lump', label: 'Tự sờ thấy khối u vùng vú' },
        { id: 'hematuria', label: 'Tiểu ra tiểu máu (Hematuria)' },
        { id: 'cloudy_urine', label: 'Nước tiểu đục lờ đờ / Có cặn bám' },
        { id: 'foul_smelling_urine', label: 'Nước tiểu nặng mùi hôi rát' },
        { id: 'pelvic_pain', label: 'Đau tức vùng chậu hố chậu dưới' },
        { id: 'vaginal_discharge', label: 'Khí hư bất thường / Có mùi huyết trắng' },
        { id: 'incontinence', label: 'Són tiểu / Không nhịn được tiểu' }
    ],
    'Cơ Xương Khớp - Da Liễu': [
        { id: 'muscle_ache', label: 'Đau nhức sưng mỏi toàn cơ (Myalgia)' },
        { id: 'joint_pain', label: 'Viêm sưng nóng đỏ tại khớp (Arthralgia)' },
        { id: 'rash', label: 'Ban đỏ / Tổn thương loét da (Erythema)' },
        { id: 'rash_hand_foot', label: 'Hồng ban bóng nước (Tay-Chân-Miệng)' },
        { id: 'crying_inconsolably', label: 'Trẻ kích thích, quấy khóc liên tục' },
        { id: 'back_stiffness', label: 'Cứng khớp buổi sáng kéo dài > 30p' },
        { id: 'bone_pain', label: 'Đau nhức sâu trong tủy xương khớp' },
        { id: 'itchy_skin', label: 'Ngứa da / Nổi mề đay dị ứng diện rộng' },
        { id: 'skin_ulcer', label: 'Vết loét da khó lành chảy dịch' },
        { id: 'hair_loss', label: 'Rụng tóc nhiều mảng bất thường' },
        { id: 'nail_changes', label: 'Móng tay đổi màu / Sần sùi dễ gãy' }
    ],
    // HỆ THỐNG TRIỆU CHỨNG ẨN - SINH RA TỪ AI VÀ CÁC THIẾT BỊ ĐO
    'Cận Lâm Sàng (Hidden)': [
        { id: 'xray_lung_opacity', label: '[Cận Lâm Sàng] Bóng mờ / Tổn thương đông đặc trên X-Quang Phổi' },
        { id: 'scan_skin_lesion', label: '[Cận Lâm Sàng] Viêm loét / Nổi mẩn đỏ đa dạng trên da' },
        { id: 'scan_tumor_mass', label: '[Cận Lâm Sàng] Hình ảnh khối u tân sinh ranh giới không rõ' },
        { id: 'high_blood_pressure', label: '[Máy đo] Huyết áp tâm thu > 140 mmHg (Tăng Huyết Áp)' },
        { id: 'high_blood_sugar', label: '[Máy đo] Đường huyết đói > 126 mg/dL (Tăng Đường Huyết)' }
    ]
};

const allSymptomsMap = {};
for (const group in symptomGroups) {
    symptomGroups[group].forEach(s => {
         allSymptomsMap[s.id] = s.label;
    });
}

// CƠ SỞ TRI THỨC VỚI TRỌNG SỐ SIÊU VIỆT CỦA CẬN LÂM SÀNG
const rules = [
    // --- BỆNH NHI KHOA & CẤP TÍNH LÂY NHIỄM ---
    { id: 'dengue_fever', disease: 'Sốt Xuất Huyết (Dengue)', 
        symptoms: { 'high_fever': 5, 'muscle_ache': 4, 'headache': 3, 'rash': 3, 'unexplained_bleeding': 5 }, modifiers: { ageGroup: { 'child': 2 } }, threshold: 8, 
        message: 'Nhiễm virus Dengue lây lan qua muỗi vằn, có nguy cơ sốc do thoát huyết tương.',
        treatment: 'Uống Oresol bù dịch tích cực. Tuyệt đối KHÔNG dùng Aspirin/Ibuprofen gây xuất huyết thêm. Đến viện theo dõi tiểu cầu.', 
        prevention: 'Ngủ mùng, diệt lăng quăng, phối hợp xịt muỗi cục bộ định kỳ.' },
    { id: 'pink_eye', disease: 'Viêm Kết Mạc (Đau mắt đỏ)', 
        symptoms: { 'red_eye': 5, 'itchy_eye': 4, 'runny_nose': 1 }, modifiers: {}, threshold: 6, 
        message: 'Nhiễm trùng niêm mạc mắt chéo lây lan dạng dịch lưu hành.',
        treatment: 'Nhỏ nước muối sinh lý rửa sạch rỉ mắt. Dùng thuốc nhỏ chứa Tobramycin theo toa bác sĩ. Không dụi mắt.', 
        prevention: 'Cách ly giặt riêng khăn mặt. Thường xuyên sát khuẩn rửa tay bằng xà bông.' },
    { id: 'food_poisoning', disease: 'Ngộ độc thực phẩm rủi ro cấp', 
        symptoms: { 'nausea': 5, 'stomach_cramp': 4, 'stomach_ache': 2, 'diarrhea': 4, 'fatigue': 2, 'fever': 1 }, modifiers: {}, threshold: 8, 
        message: 'Hội chứng viêm dạ dày ruột cấp do độc tố vi khuẩn (Salmonella/E.coli...).',
        treatment: 'Bù nước Oresol liên tục. Nếu đi ngoài ra máu hoặc mất nước nặng nhãn cầu trụng cần nhập viện truyền dịch viện.', 
        prevention: 'Ăn chín uống sôi. Loại bỏ thực phẩm có mùi ôi thiu lưu cữu tủ lạnh.' },
    { id: 'peptic_ulcer', disease: 'Viêm loét Dạ dày - Tá tràng', 
        symptoms: { 'stomach_ache': 5, 'stomach_cramp': 2, 'nausea': 3, 'fatigue': 2, 'weight_loss': 2 }, modifiers: { ageGroup: { 'adult': 2, 'elderly': 2 } }, threshold: 7, 
        message: 'Tổn thương viêm trợt rách niêm mạc dạ dày do acid hoặc vi khuẩn HP.',
        treatment: 'Uống thuốc bọc dạ dày Phosphalugel, sử dụng thuốc giảm tiết acid PPI (Omeprazole). Giảm stress mệt mỏi.', 
        prevention: 'Không bỏ bữa hay luân phiên thức khuya. Hạn chế bia rượu và cà phê chua.' },
    { id: 'hfm_disease', disease: 'Bệnh Tay Chân Miệng (HFMD)',  
        symptoms: { 'rash_hand_foot': 5, 'fever': 2, 'crying_inconsolably': 3, 'scan_skin_lesion': 6 }, modifiers: { ageGroup: { 'child': 5 } }, threshold: 8, 
        message: 'Bệnh truyền nhiễm do Enterovirus, đặc trưng bởi hồng ban nốt phỏng.',
        treatment: 'Hạ sốt bằng Paracetamol. Vệ sinh sang thương bằng Xanh Methylen. Nhập viện ngay nếu trẻ giật mình, run chi.', 
        prevention: 'Tuân thủ vệ sinh dịch tễ: Rửa tay sát khuẩn, khử khuẩn lớp học.' },
    
    // --- LÃO KHOA ---
    { id: 'alzheimer', disease: 'Sa sút trí tuệ (Alzheimer\'s)', 
        symptoms: { 'memory_loss': 5, 'fainting': 1, 'fatigue': 2 }, modifiers: { ageGroup: { 'elderly': 4 } }, threshold: 7, 
        message: 'Thoái hóa thần kinh mạn tính gây suy giảm nhận thức.',
        treatment: 'Dùng thuốc kháng Cholinesterase (Donepezil) để làm chậm mất mảng thần kinh.', 
        prevention: 'Chế độ ăn kiêng MIND, rèn luyện não bộ, kiểm soát đường huyết trung niên.' },
    { id: 'parkinson', disease: 'Bệnh Parkinson', 
        symptoms: { 'tremor': 5, 'fatigue': 2, 'muscle_ache': 2, 'memory_loss': 2 }, modifiers: { ageGroup: { 'elderly': 3 } }, threshold: 7, 
        message: 'Hội chứng ngoại tháp do suy giảm Dopamine tại não bộ.',
        treatment: 'Dùng thuốc Levodopa. Phẫu thuật Kích thích não sâu (DBS) khi trơ với thuốc.', 
        prevention: 'Tập thể dục cường độ vừa phải, sử dụng trà xanh chứa chất chống lão hóa.' },
    { id: 'osteoarthritis', disease: 'Thoái hóa khớp (Osteoarthritis)', 
        symptoms: { 'joint_pain': 5, 'numbness': 2, 'fatigue': 1 }, modifiers: { ageGroup: { 'elderly': 3, 'adult': 1 } }, threshold: 6, 
        message: 'Mòn sụn khớp cơ học theo thời gian ảnh hưởng sụn chêm.',
        treatment: 'Sử dụng thuốc NSAIDs. Tiêm chất nhờn Axit Hyaluronic hoặc Corticosteroid nội khớp.', 
        prevention: 'Hạn chế tăng cân, thay đổi cường độ hoạt động thể thao mạnh.' },

    // --- NAM/NỮ KHOA & THẬN NIỆU ---
    { id: 'kidney_failure', disease: 'Bệnh thận mạn / Suy thận', 
        symptoms: { 'painful_urination': 3, 'back_pain': 4, 'fatigue': 3, 'frequent_urination': 3, 'high_blood_pressure': 4 }, modifiers: { underlyingDisease: { 'yes': 3 } }, threshold: 9, 
        message: 'Suy giảm độ lọc tĩnh mạch cầu thận dần dần.',
        treatment: 'Ăn nhạt, dùng thuốc lợi tiểu. Nặng phải lọc máu (Chạy thận) hoặc ghép thận.', 
        prevention: 'Không lạm dụng kháng sinh/thuốc giảm đau NSAID lâu ngày vô tội vạ.',
        contraindications: [{ condition: 'renal', warning: 'CHỐNG CHỈ ĐỊNH: Bệnh nhân có tiền sử Thận không được tự ý dùng thuốc NSAID (Ibuprofen/Naproxen) vì gây suy thận cấp!' }]
    },
    { id: 'prostate_bph', disease: 'Phì đại Tuyến Tiền liệt', 
        symptoms: { 'frequent_urination': 4, 'painful_urination': 2, 'erectile_dysfunction': 4, 'back_pain': 2 }, modifiers: { gender: { 'male': 4 }, ageGroup: { 'elderly': 3 } }, threshold: 8, 
        message: 'Tăng sinh nhu mô tuyến tiền liệt chèn niệu đạo.',
        treatment: 'Uống thuốc chẹn Alpha. Cắt nạo tiền liệt tuyến qua ngả nội soi nếu gây bí tiểu nguy kịch.', prevention: 'Không nhịn tiểu, kiêng thức uống chứa cồn ban đêm.' },

    { id: 'endometriosis', disease: 'Lạc nội mạc tử cung', 
        symptoms: { 'menstrual_irregularity': 5, 'back_pain': 3, 'fatigue': 2, 'stomach_ache': 3 }, modifiers: { gender: { 'female': 5 }, ageGroup: { 'adult': 2 } }, threshold: 8, 
        message: 'Mô nội mạc phát triển ngoài buồng tử cung gây viêm chảy máu chu kỳ.',
        treatment: 'Sử dụng Hormone / Thuốc tránh thai ức chế tiết dịch. Mổ nội soi bóc tách màng bao.', prevention: 'Tầm soát siêu âm tử cung - buồng trứng 6 tháng/lần.' },
    
    // --- UNG THƯ ĐỘT PHÁ Ở CẬN LÂM SÀNG ---
    { id: 'breast_cancer', disease: 'Ung thư Vú ác tính', 
        symptoms: { 'breast_lump': 5, 'weight_loss': 4, 'scan_tumor_mass': 10 }, modifiers: { gender: { 'female': 4 }, ageGroup: { 'elderly': 2 } }, threshold: 9, 
        message: 'Tân sinh tế bào ung thư lây lan hạch bạch huyết. Cảnh báo mức độ T3 trên hình siêu âm AI.',
        treatment: 'Sinh thiết chọc hút bằng kim nhỏ. Cắt bỏ khối u và nạo vét hạch -> Hóa trị / Xạ trị.', 
        prevention: 'Chụp Mammogram nhũ ảnh cho mọi phụ nữ > 45 tuổi định kỳ hằng năm.' },
    { id: 'colon_cancer', disease: 'Ung thư Đại trực tràng', 
        symptoms: { 'bloody_stool': 5, 'weight_loss': 4, 'diarrhea': 2, 'scan_tumor_mass': 10 }, modifiers: { ageGroup: { 'elderly': 3 } }, threshold: 9, 
        message: 'Polyp đường ruột ác tính lở loét gây xuất huyết tái diễn.',
        treatment: 'Phẫu thuật mổ nội soi cắt đứt đoạn đại tràng mang khối u. Lập hậu môn nhân tạo vĩnh viễn nếu lây lan nách.', 
        prevention: 'Nội soi đường tiêu hóa từ 40 tuổi và tầm soát máu sinh hoá phân.' },
    
    // --- TIM MẠCH, HÔ HẤP, NỘI TIẾT ---
    { id: 'hypertension_urgency', disease: 'Cơn Tăng Huyết Áp Khẩn Cấp', 
        symptoms: { 'headache': 3, 'dizziness': 4, 'chest_pain': 2, 'high_blood_pressure': 10 }, modifiers: { ageGroup: { 'elderly': 2 } }, threshold: 10,
        message: 'Áp lực tuôn máu đôn lên thành động mạch quá căng. Dấu hiệu đứt mạch máu não kề cận.',
        treatment: 'Dùng ngay Captopril hoặc Nifedipine nhỏ dưới lưỡi. Nếu yếu liệt nửa chi cần Gọi 115.', prevention: 'Ăn lạt tuyệt đối, uống thuốc Canxi chẹn kênh.' },
    { id: 'diabetes', disease: 'Đái tháo đường (Diabetes Mellitus)', 
        symptoms: { 'frequent_urination': 5, 'weight_loss': 4, 'fatigue': 2, 'high_blood_sugar': 10 }, modifiers: { ageGroup: { 'elderly': 2 } }, threshold: 10,
        message: 'Rối loạn dung nạp mạn tính do tuyến tuỵ kiệt quệ tiết Insulin.',
        treatment: 'Sử dụng Metformin hoặc cấp thêm mũi tiêm nhả chậm Insulin hạ glucose lập tức.', prevention: 'Giảm khối lượng tinh bột nạp mâm cơm.' },

    // --- CẤP CỨU MÀU ĐỎ ---
    { id: 'heart_attack', disease: 'Nhồi máu cơ tim cấp', 
        symptoms: { 'chest_pain': 5, 'shortness_of_breath': 4, 'fainting': 3, 'numbness': 3, 'palpitation': 3 }, modifiers: { ageGroup: { 'elderly': 4 }, underlyingDisease: { 'yes': 3 } }, threshold: 10,
        message: 'Thiếu máu cơ tim trầm trọng do huyết khối. KHẨN CẤP NHẬP VIỆN TRONG CỬA SỔ VÀNG!',
        treatment: 'CẤP CỨU MÀU ĐỎ: Gọi 115 TRONG TÍCH TẮC. Nhai 1 viên Aspirin hoặc Clopidogrel (Nếu ko bị xuất huyết dạ dày). Mở luồng can thiệp đặt stent PCI.', prevention: 'Xét nghiệm chẩn đoán chức năng và đo Mỡ và Lipid toàn phần.',
        contraindications: [{ condition: 'stomach', warning: 'CẢNH BÁO TỬ VONG: Bệnh nhân có tiền sử Loét Dạ Dày. CHỐNG CHỈ ĐỊNH nhai Aspirin cấp cứu vì nguy cơ thủng dạ dày / xuất huyết ồ ạt! Dùng Clopidogrel thay thế và hội chẩn gấp!' }]
    },
    { id: 'stroke', disease: 'Đột quỵ não cấp (Tai biến Nhồi máu/Xuất huyết)', 
        symptoms: { 'numbness': 5, 'dizziness': 4, 'fainting': 5, 'high_blood_pressure': 4 }, modifiers: { ageGroup: { 'elderly': 4 }, underlyingDisease: { 'yes': 3, 'cardio': 4 } }, threshold: 10,
        message: 'Đứt lưu lượng máu đến vùng tuỷ não làm mô chết gục diện rộng. TIÊN LƯỢNG RẤT TRẦM TRỌNG.', 
        treatment: 'Tranh thủ đến viện khẩn có buồng cấp cứu đột quỵ (Stroke Unit) để truyền rTPA tan máu đông. VẬN CHUYỂN NẰM ÊM.', prevention: 'Theo dõi nhịp tim.' },
    { id: 'pneumonia', disease: 'Viêm phổi phế nang / Lao (TB)', 
        symptoms: { 'high_fever': 4, 'productive_cough': 3, 'coughing_blood': 4, 'shortness_of_breath': 4, 'xray_lung_opacity': 10 }, modifiers: { ageGroup: { 'child': 3, 'elderly': 3 } }, threshold: 10, 
        message: 'Nhiễm trùng rộp mủ túi khí phổi. Xác suất viêm cực cao trên cấu trúc phim AI đọc ra.',
        treatment: 'Bơm Kháng sinh liệu pháp ban đầu (Amoxicillin/Macrolide). Nếu quá khó thở hỗ trợ chỉ định thở Oxy mask túi lưu.', prevention: 'Tiêm chủng Phế cầu khuẩn định kỳ với người nhạy cảm.' }
];

rules.forEach(rule => {
    let baseScore = Object.values(rule.symptoms).reduce((sum, weight) => sum + weight, 0);
    let maxModScore = 0;
    if (rule.modifiers) {
        if (rule.modifiers.ageGroup) maxModScore += Math.max(...Object.values(rule.modifiers.ageGroup));
        if (rule.modifiers.gender) maxModScore += Math.max(...Object.values(rule.modifiers.gender));
        if (rule.modifiers.underlyingDisease) maxModScore += Math.max(...Object.values(rule.modifiers.underlyingDisease));
    }
    rule.maxScore = baseScore + maxModScore;
});
