// Thư viện triệu chứng nay hỗ trợ Cận Lâm Sàng & Hình Ảnh & Các Danh mục Bệnh Nhiệt Đới
const symptomGroups = {
    'Sinh Hiệu Toàn Thân': [
        { id: 'fever', label: 'Sốt / Tăng thân nhiệt', desc: 'Nhiệt độ cơ thể cao hơn 37.5°C, thường kèm mệt mỏi.' },
        { id: 'high_fever', label: 'Sốt cao kịch phát (>39°C)', desc: 'Sốt rất cao, có thể kèm co giật, run rẩy.' },
        { id: 'fatigue', label: 'Suy nhược cơ thể', desc: 'Cảm giác kiệt sức kéo dài, không muốn vận động.' },
        { id: 'weight_loss', label: 'Sụt cân bất thường', desc: 'Sụt hơn 5% trọng lượng cơ thể nhanh chóng không do ăn kiêng.' },
        { id: 'night_sweats', label: 'Đổ mồ hôi trộm ban đêm', desc: 'Vã mồ hôi ướt sũng quần áo khi đang ngủ.' },
        { id: 'unexplained_bleeding', label: 'Xuất huyết / Nổi mảng bầm', desc: 'Dễ bầm tím da, chảy máu cam hoặc chân răng vô cớ.' },
        { id: 'chills', label: 'Ớn lạnh / Rét run', desc: 'Cảm thấy lạnh từ bên trong, nổi gai ốc kèm rùng mình.' },
        { id: 'loss_of_appetite', label: 'Chán ăn / Đắng miệng', desc: 'Mất cảm giác thèm ăn, ăn vào thấy nhạt nhẽo buồn nôn.' },
        { id: 'polydipsia', label: 'Khát nước liên tục', desc: 'Lúc nào cũng thấy khát khô họng dù uống rất nhiều nước.' },
        { id: 'swollen_lymph_nodes', label: 'Sưng nổi hạch bạch huyết', desc: 'Nổi cục sưng đau ở cổ, nách, hoặc bẹn.' },
        { id: 'dehydration', label: 'Mất nước trầm trọng', desc: 'Khô nứt nẻ môi, mắt trũng sâu, tiểu ít.' },
        { id: 'insomnia', label: 'Mất ngủ kéo dài', desc: 'Khó vào giấc, hay giật mình, thức trắng đêm.' },
        { id: 'lethargy', label: 'Lơ mơ / Thiếu tỉnh táo', desc: 'Phản ứng chậm chạp, hay ngủ gà ngủ gật ban ngày.' }
    ],
    'Thần Kinh': [
        { id: 'headache', label: 'Đau đầu / Cứng gáy', desc: 'Cơn đau nhức âm ỉ hoặc dữ dội vùng đầu, gáy, thái dương.' },
        { id: 'dizziness', label: 'Chóng mặt / Rối loạn tiền đình', desc: 'Cảm giác trời đất quay cuồng, mất thăng bằng khi đứng lên.' },
        { id: 'numbness', label: 'Tê bì tay chân', desc: 'Cảm giác châm chích, tê rần như kiến bò ở các đầu ngón tay chân.' },
        { id: 'memory_loss', label: 'Suy giảm trí nhớ', desc: 'Hay quên những sự kiện vừa xảy ra, nhầm lẫn người quen.' },
        { id: 'tremor', label: 'Run rẩy tay chân', desc: 'Chân tay run rẩy khi ngồi nghỉ hoặc khi cầm nắm đồ vật.' },
        { id: 'fainting', label: 'Ngất xỉu / Choáng váng', desc: 'Đột ngột mất đi nhận thức và ngã gục, lu mờ thị giác.' },
        { id: 'seizure', label: 'Ngưng thở dài / Co giật', desc: 'Giật các cơ liên hồi, cứng hàm, trợn ngược mắt.' },
        { id: 'confusion', label: 'Lú lẫn / Mất phương hướng', desc: 'Không biết mình đang ở đâu, hiện là ngày tháng nào.' },
        { id: 'muscle_spasm', label: 'Bị chuột rút / Co thắt cơ', desc: 'Cơ bắp chân co kéo đột ngột gây đau đớn dữ dội.' },
        { id: 'loss_of_balance', label: 'Thường xuyên vấp ngã', desc: 'Đi đứng lảo đảo, tay chân luống cuống dễ ngã té.' },
        { id: 'vision_changes_neuro', label: 'Ảo giác thị giác', desc: 'Nhìn 1 vật hóa 2 vật, hoặc thấy ánh chớp chói lóa.' },
        { id: 'speech_difficulty', label: 'Khó nói / Líu lưỡi', desc: 'Nói đờ đẫn, ngọng nghịu, khó diễn đạt thành lời.' }
    ],
    'Tai Mũi Họng': [
        { id: 'sore_throat', label: 'Đau rát họng / Nuốt vướng', desc: 'Cảm giác vướng cộm, nuốt nước bọt đau rát cổ họng.' },
        { id: 'hoarseness', label: 'Khàn tiếng / Tắt tiếng', desc: 'Giọng ồm ồm, khàn đặc hoặc mất giọng hoàn toàn.' },
        { id: 'ear_pain', label: 'Đau nhức bên trong tai', desc: 'Ong nhức, rát buốt tận sâu trong màng nhĩ.' },
        { id: 'tinnitus', label: 'Ù tai / Có tiếng ve kêu', desc: 'Luôn nghe thấy âm thanh u uẩn hoặc tiếng rít trong tai.' },
        { id: 'nasal_congestion', label: 'Nghẹt mũi / Tịt mũi', desc: 'Tắc nghẹt đường thở, phải thở khò khè bằng miệng.' },
        { id: 'loss_of_smell', label: 'Mất khứu giác', desc: 'Mũi điếc hoàn toàn, không ngửi thấy mùi thức ăn.' },
        { id: 'sneezing', label: 'Hắt xì hơi liên tục', desc: 'Hắt xì hơi thành từng tràng không ngớt mỗi khi sáng dậy.' },
        { id: 'epistaxis', label: 'Chảy máu cam', desc: 'Tuyển máu tươi chảy từ mũi xuống họng không tự cầm được.' },
        { id: 'ear_discharge', label: 'Chảy mủ tai / Nước vàng', desc: 'Tai rỉ ra chất dịch nhầy dính có mùi hôi.' },
        { id: 'tonsil_swelling', label: 'Sưng amidan / Viêm amidan mủ', desc: 'Cục amidan sưng to hai bên, bề mặt có đốm mủ trắng.' }
    ],
    'Mắt': [
        { id: 'red_eye', label: 'Đau mắt đỏ / Nhiều ghèn', desc: 'Lòng trắng mắt nổi vằn đỏ, sáng dậy đổ ghèn dính chặt mi.' },
        { id: 'itchy_eye', label: 'Ngứa cộm mắt', desc: 'Cảm giác vướng bận như có hạt bụi, hạt cát trong mắt.' },
        { id: 'blurred_vision', label: 'Mắt mờ / Yếu thị lực', desc: 'Tầm nhìn bỗng nhòe đi, không đọc được chữ khoảng cách gần.' },
        { id: 'eye_pain', label: 'Đau tức hốc mắt', desc: 'Cảm giác nhức mỏi, căm tức đẩy lồi con ngươi ra ngoài.' },
        { id: 'photophobia', label: 'Sợ ánh sáng / Chói mắt', desc: 'Chói chang, phải nheo chặt mắt khi bước ra nắng.' },
        { id: 'watery_eyes', label: 'Chảy nước mắt sống', desc: 'Nước mắt tự ứa ra liên tục mà không có tác động cảm xúc.' },
        { id: 'dry_eyes', label: 'Khô mắt / Rát mắt', desc: 'Mắt luôn khô khốc, nóng rát khi nhìn màn hình lâu.' },
        { id: 'swollen_eyelid', label: 'Sưng húp mi mắt', desc: 'Mi mắt phù nề mọng nước, sập xuống che khuất tầm nhìn.' },
        { id: 'halo_vision', label: 'Nhìn thấy quầng sáng', desc: 'Thấy quầng hào quang cầu vồng khi nhìn thẳng vào bóng đèn.' }
    ],
    'Hô Hấp - Tim Mạch': [
        { id: 'cough', label: 'Ho khan / Ho ngứa cổ', desc: 'Ho từng cơn nhưng không khạc ra đờm, rát xước cổ họng.' },
        { id: 'productive_cough', label: 'Ho có đờm đặc đục', desc: 'Ho từ sâu lồng ngực văng ra đờm xanh, đờm vàng nhớt.' },
        { id: 'coughing_blood', label: 'Ho khạc ra máu', desc: 'Ho sặc sụa văng ra tia máu hoặc cục máu đông tươi.' },
        { id: 'shortness_of_breath', label: 'Khó thở / Tức ngực', desc: 'Cảm giác hụt hơi, ngột ngạt không đủ oxy để thở.' },
        { id: 'chest_pain', label: 'Nhói tim / Đau thắt ngực', desc: 'Đau xiết nghẹt lồng ngực trái như có đá tảng đè ép.' },
        { id: 'runny_nose', label: 'Sổ mũi / Chảy nước mũi', desc: 'Dịch mũi loãng chảy ròng ròng kéo dài.' },
        { id: 'palpitation', label: 'Đánh trống ngực / Hồi hộp', desc: 'Tim đập thình thịch vội vã, lúc nhanh lúc chậm.' },
        { id: 'wheezing', label: 'Thở khò khè / Rít cuống họng', desc: 'Phát ra tiếng rít cò cử mỗi lần hít vào hay thở ra.' },
        { id: 'cyanosis', label: 'Tím tái môi và móng tay', desc: 'Môi và đầu các ngón tay nhợt nhạt, thâm tím ngắt.' },
        { id: 'orthopnea', label: 'Nằm xuống là ngộp thở', desc: 'Hễ nằm phẳng là nghẹt thở, bắt buộc phải ngồi dậy.' },
        { id: 'fast_heart_rate', label: 'Nhịp tim nhanh (>100 nhịp/phút)', desc: 'Tim nhảy liên hồi, trống ngực rộn ràng ngay cả lúc nghỉ ngơi.' },
        { id: 'swollen_legs_heart', label: 'Phù cứng hai mắt cá chân', desc: 'Chân sưng to phù nề, lấy ngón tay ấn xuống để lại vết lõm sâu.' }
    ],
    'Tiêu Hóa - Gan Mật': [
        { id: 'nausea', label: 'Buồn nôn / Nôn ói', desc: 'Trào ngược dịch dạ dày vọt ra ngoài đường miệng.' },
        { id: 'diarrhea', label: 'Tiêu chảy / Cấp tính', desc: 'Đi ngoài phân xối xả dạng nước ráo nhiều lần trong ngày.' },
        { id: 'stomach_ache', label: 'Đau râm ran quanh rốn', desc: 'Đau bụng âm ỉ, nóng rát khó chịu vùng bụng trên.' },
        { id: 'stomach_cramp', label: 'Đau quặn thắt ruột', desc: 'Bụng đau gồng cứng từng cơn, mót rặn dữ dội.' },
        { id: 'jaundice', label: 'Vàng da / Vàng mắt', desc: 'Tròng trắng mắt và màu da cơ thể đổi vàng vọt.' },
        { id: 'bloody_stool', label: 'Đi ngoài ra máu', desc: 'Phân đen kịt mùi tanh khẳm hoặc có lẫn máu đỏ tươi.' },
        { id: 'constipation', label: 'Táo bón nặng', desc: 'Phân khô cứng tảng đá, đi ngoài đau rát nứt kẽ hậu môn.' },
        { id: 'heartburn', label: 'Ợ chua / Trào ngược dạ dày', desc: 'Ợ hơi liên tục kèm dịch chua chát bỏng rát lên cuống họng.' },
        { id: 'bloating', label: 'Đầy bụng / Ấm ách', desc: 'Bụng phình to chướng khí, ăn không tiêu.' },
        { id: 'pale_stool', label: 'Phân nhạt màu bạc phếch', desc: 'Phân có màu xám trắng như bột bả đất sét.' },
        { id: 'dark_urine_liver', label: 'Nước tiểu sậm màu', desc: 'Tiểu ra màu vàng đậm đặc hoặc đỏ sẫm như nước chè.' },
        { id: 'vomiting_blood', label: 'Nôn ộc ra máu', desc: 'Nôn mửa ra dịch đen lẫn máu tươi rùng rợn.' }
    ],
    'Thận Niệu - Sinh Dục': [
        { id: 'back_pain', label: 'Đau buốt vùng thắt lưng', desc: 'Đau quặn từng hốc lan dọc xuống bẹn hoặc xương mu.' },
        { id: 'frequent_urination', label: 'Tiểu đêm / Tiểu rắt', desc: 'Buồn đi vệ sinh liên tục đêm ngày nhưng tiểu rất ít.' },
        { id: 'painful_urination', label: 'Tiểu buốt / Tiểu rát', desc: 'Đau xé, nhói như kim châm dọc lỗ niệu đạo khi đi tiểu.' },
        { id: 'erectile_dysfunction', label: 'Rối loạn cương dương / Yếu sinh lý', desc: 'Mất khả năng sinh lý tình dục ở nam giới.' },
        { id: 'menstrual_irregularity', label: 'Rối loạn kinh nguyệt / Đau bụng kinh', desc: 'Trễ kinh, rong kinh hoặc đau quằn quại mỗi lần tới tháng.' },
        { id: 'breast_lump', label: 'Cục u ở ngực', desc: 'Tự sờ thấy cục hạch cứng cộm bên trong vùng ngực.' },
        { id: 'hematuria', label: 'Tiểu ra máu', desc: 'Nước tiểu hòa sắc hồng nhạt hoặc đỏ bầm sủi bọt.' },
        { id: 'cloudy_urine', label: 'Nước tiểu đục lờ đờ', desc: 'Tiểu ra màu nước trong vắt lờ đờ hơi có lắng cặn mủ.' },
        { id: 'foul_smelling_urine', label: 'Nước tiểu lợ mùi', desc: 'Mùi hôi khai khẳm bẩn thỉu bốc lên xốc mũi.' },
        { id: 'pelvic_pain', label: 'Đau tức hố chậu', desc: 'Đau buốt vùng xương chậu kèm nặng trĩu cửa mình dưới.' },
        { id: 'vaginal_discharge', label: 'Khí hư bất thường', desc: 'Tiết dịch âm đạo vón bã đậu, màu xanh lục có mùi hôi hám.' },
        { id: 'incontinence', label: 'Són tiểu không kiểm soát', desc: 'Rò rỉ nước tiểu ra quần ngoài ý muốn khi hắt xì, ho rặn.' }
    ],
    'Cơ Xương Khớp - Da Liễu': [
        { id: 'muscle_ache', label: 'Đau nhức mỏi toàn thân', desc: 'Cơ bắp nhức mỏi rã rời e ẩm, xoa bóp mãi không đỡ.' },
        { id: 'joint_pain', label: 'Sưng nóng đỏ các khớp', desc: 'Khớp gối, cổ tay, mắt cá chân sưng to vù vù, tấy đỏ đau nhức.' },
        { id: 'rash', label: 'Phát ban đỏ / Nổi mẩn', desc: 'Da đỏ ửng lan tỏa từng mảng trên mặt, lưng bụng.' },
        { id: 'rash_hand_foot', label: 'Hồng ban lở loét', desc: 'Mụn nước lấm tấm mọc ở tay, chân và khoang miệng trẻ.' },
        { id: 'crying_inconsolably', label: 'Trẻ nhỏ quấy khóc không dứt', desc: 'Bé rướn người khóc thét, dỗ ẵm cách mấy cũng không nín.' },
        { id: 'back_stiffness', label: 'Cứng khớp buổi sáng', desc: 'Sáng ngủ dậy xương khớp cứng ngắc, vận động 1 lúc mới dãn ra.' },
        { id: 'bone_pain', label: 'Đau nhức trong xương tủy', desc: 'Đau buốt giá ê ẩm rỉ bóc ra từ trong thâm tâm tủy xương.' },
        { id: 'itchy_skin', label: 'Ngứa ngáy / Nổi mề đay', desc: 'Gãi trầy cả da nhưng ngứa vẫn hoàn ngứa, càng gãi càng sưng mụn.' },
        { id: 'skin_ulcer', label: 'Vết lở loét khó lành', desc: 'Thủng lủng rỉ nước vàng dính máu mãi không khép mài được.' },
        { id: 'hair_loss', label: 'Rụng tóc từng mảng lớn', desc: 'Vuốt tóc lả tả rụng rời trơ cả mảng da đầu trắng hếu phía sau.' },
        { id: 'nail_changes', label: 'Móng tay dễ sứt gãy', desc: 'Móng khô giòn, đổi màu ố vàng, sần sùi bong tróc.' }
    ],
    'Cận Lâm Sàng (Hidden)': [
        { id: 'xray_lung_opacity', label: '[Phiếu Khám] Bóng mờ Đông đặc Phổi', desc: 'AI phân tích phim XQ thấy phổi bị thâm nhiễm trắng mờ.' },
        { id: 'scan_skin_lesion', label: '[Phiếu Khám] Viêm loét da bất thường', desc: 'AI định hình đây là cấu trúc da lở loét bệnh lý.' },
        { id: 'scan_tumor_mass', label: '[Phiếu Khám] Hình bóng Khối u', desc: 'Mô sinh hình thù dị dạng tế bào sùi cộm.' },
        { id: 'high_blood_pressure', label: '[Hiện Trường] Huyết áp tăng vọt', desc: 'Mức áp suất kịch trần tiền đột quỵ não.' },
        { id: 'high_blood_sugar', label: '[Hiện Trường] Đường huyết tăng cao', desc: 'Đường huyết bỏ mốc an toàn, có khả năng biến chứng.' }
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
