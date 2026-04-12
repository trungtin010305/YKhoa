document.addEventListener('DOMContentLoaded', () => {
    let engine;
    let patientData = {};
    let topDiagnosisContext = null;
    let savedHistory = JSON.parse(localStorage.getItem('patientHistory')) || [];
    
    // Lưu các biến của Cận lâm sàng AI Hình Ảnh sinh ra
    let paraclinicalSymptomFound = null; 

    // DOM Cột Trái (Sidebar Navigation)
    const navSymptomsContainer = document.getElementById('nav-symptoms');
    const allNavItems = document.querySelectorAll('.sidebar-panel .nav-item'); // Chưa bao gồm mảng Động
    const btnAnalyze = document.getElementById('btn-analyze');

    // DOM Cột Phải (Panes Container)
    const symptomsPanesContainer = document.getElementById('symptoms-panes-container');
    
    // DOM Khác để tính toán
    const docVitalBp = document.getElementById('vitals-bp');
    const docVitalBs = document.getElementById('vitals-bs');
    
    // DOM Image Scanner
    const imageUpload = document.getElementById('image-upload');
    const imagePreview = document.getElementById('image-preview');
    const placeholderText = document.getElementById('placeholder-text');
    const btnScan = document.getElementById('btn-scan');
    const scannerLaser = document.getElementById('scanner-laser');
    const aiScanLog = document.getElementById('ai-scan-log');
    const aiModelType = document.getElementById('ai-model-type');

    // DOM Báo cáo KQ
    const aiResultsContainer = document.getElementById('ai-results-container');
    const uiUnknownScreen = document.getElementById('result-unknown');

    const CRITICAL_DISEASES = ['heart_attack', 'hypertension_urgency', 'stroke', 'kidney_failure', 'breast_cancer', 'colon_cancer', 'hfm_disease', 'pneumonia'];

    function init() {
        paraclinicalSymptomFound = null;
        buildTabSystem();
        bindGlobalNavLinks();
        
        const btnApiSettings = document.getElementById('btn-api-settings');
        if (btnApiSettings) {
            btnApiSettings.addEventListener('click', () => {
                const currentKey = localStorage.getItem('geminiApiKey') || '';
                const newKey = prompt('CẤU HÌNH API LLM OFFLINE\n\nVui lòng dán khóa Google Gemini API Key tại đây:', currentKey);
                if (newKey !== null && newKey.trim() !== '') {
                    localStorage.setItem('geminiApiKey', newKey.trim());
                    alert('Lưu API Key thành công!');
                }
            });
        }
        
        renderEMRTable();
    }

    // -- V11: TÍNH NĂNG VOICE RECOGNITION --
    const btnMic = document.getElementById('btn-mic');
    const micStatus = document.getElementById('mic-status');
    const nlpTextInput = document.getElementById('nlp-text');

    if (btnMic && ('webkitSpeechRecognition' in window)) {
        const recognition = new webkitSpeechRecognition();
        recognition.lang = 'vi-VN';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = function() {
            btnMic.classList.add('mic-active');
            btnMic.innerText = '🎙️ Đang Thu...';
            micStatus.style.display = 'block';
        };

        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            nlpTextInput.value += (nlpTextInput.value ? ' ' : '') + transcript;
        };

        recognition.onend = function() {
            btnMic.classList.remove('mic-active');
            btnMic.innerText = '🎙️ Bật Mic Thu Âm';
            micStatus.style.display = 'none';
        };

        btnMic.addEventListener('click', () => {
            recognition.start();
        });
    }

    // -- V11: Tính năng IN PDF --
    const btnPrintPdf = document.getElementById('btn-print-pdf');
    if (btnPrintPdf) {
        btnPrintPdf.addEventListener('click', () => {
            window.print();
        });
    }
    
    // -- V11: RENDERING BẢNG EMR --
    function renderEMRTable() {
        const tbody = document.getElementById('emr-tbody');
        if (!tbody) return;
        tbody.innerHTML = '';
        if (savedHistory.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 30px; color: #94a3b8; font-style:italic;">Hệ thống chưa lưu trữ bệnh án nào.</td></tr>';
            return;
        }
        savedHistory.forEach((record, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${record.date}</td>
                <td><span style="background:#eef2ff; color:#4f46e5; padding:2px 6px; border-radius:4px; font-weight:600; font-size:0.8rem;">${record.pid || 'N/A'}</span></td>
                <td style="font-weight:600; color:#0369a1;">${record.name}</td>
                <td>${record.disease}</td>
                <td><span class="badge ${record.certainty > 80 ? 'badge-warning' : 'badge-blue'}">${record.certainty}%</span></td>
                <td style="text-align:center;">
                    <button class="btn-delete-record" data-index="${index}" style="background:none; border:none; color:#ef4444; font-size:1.3rem; padding:0 10px; cursor:pointer; line-height:1; transition: transform 0.1s;" title="Xóa Bệnh Án Này">&times;</button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        // Đăng ký sự kiện Click Xóa
        document.querySelectorAll('.btn-delete-record').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.currentTarget.getAttribute('data-index'));
                if(confirm('Bạn có chắc chắn muốn XÓA VĨNH VIỄN hồ sơ bệnh án này khỏi máy trạm EMR không?')) {
                    savedHistory.splice(idx, 1);
                    localStorage.setItem('patientHistory', JSON.stringify(savedHistory));
                    renderEMRTable();
                }
            });
        });
    }

    // -- V12: XUẤT EMR RA CSV --
    const btnExportCSV = document.getElementById('btn-export-csv');
    if(btnExportCSV) {
        btnExportCSV.addEventListener('click', () => {
            if(savedHistory.length === 0) return alert('Chưa có dữ liệu bệnh án nào để xuất.');
            let csvContent = "data:text/csv;charset=utf-8,\uFEFF";
            csvContent += "Ngày Khám,Mã Bệnh Nhân,Họ Và Tên,Chẩn Đoán Sơ Bộ,Mức Độ Khớp\r\n";
            savedHistory.forEach(record => {
                let row = `"${record.date}","${record.pid||'N/A'}","${record.name}","${record.disease}","${record.certainty}%"`;
                csvContent += row + "\r\n";
            });
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `BaoCao_EMR_${new Date().getTime()}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    // -- V12: DARK MODE TOGGLE --
    const btnDarkMode = document.getElementById('btn-dark-mode');
    if(btnDarkMode) {
        btnDarkMode.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            btnDarkMode.innerHTML = isDark 
                ? `<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg> <span>Chế độ sáng</span>`
                : `<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg> <span>Chế độ tối</span>`;
        });
        
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            btnDarkMode.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg> <span>Chế độ sáng</span>`;
        }
    }

    // 1. Sinh cấu trúc Tab Động cho Triệu chứng
    function buildTabSystem() {
        navSymptomsContainer.innerHTML = '';
        symptomsPanesContainer.innerHTML = '';
        
        let index = 0;
        for (const [groupName, symptomsArray] of Object.entries(symptomGroups)) {
            if (groupName.includes('Hidden')) continue;
            
            const tabTargetId = `pane-sym-${index}`;

            // Tạo Nút Nav nằm bên trái
            const navBtn = document.createElement('button');
            navBtn.className = 'nav-item';
            navBtn.setAttribute('data-target', tabTargetId);
            
            let iconSvg = '';
            if (groupName.includes('Sinh Hiệu')) iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>';
            else if (groupName.includes('Thần Kinh')) iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>';
            else if (groupName.includes('Tai Mũi')) iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"></path></svg>';
            else if (groupName.includes('Mắt')) iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
            else if (groupName.includes('Hô Hấp')) iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>';
            else if (groupName.includes('Tiêu Hóa')) iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path></svg>';
            else if (groupName.includes('Thận Niệu')) iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"></path></svg>';
            else if (groupName.includes('Cơ Xương Khớp')) iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l-5.5 3.5v7L12 22l5.5-3.5v-7L12 2z"></path></svg>';
            else iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 12 12 12 8"></polyline><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';

            navBtn.style.display = 'flex';
            navBtn.style.alignItems = 'center';
            navBtn.style.gap = '8px';
            navBtn.innerHTML = `${iconSvg} <span>${groupName}</span>`;
            
            navSymptomsContainer.appendChild(navBtn);

            // Tạo Khung hiển thị Div nằm bên phải cho Nhóm này
            const paneDiv = document.createElement('div');
            paneDiv.id = tabTargetId;
            paneDiv.className = 'tab-pane fade-in hidden';

            const cardHtml = document.createElement('div');
            cardHtml.className = 'card';
            
            const titleH3 = document.createElement('h3');
            titleH3.className = 'section-title';
            titleH3.innerText = groupName;
            cardHtml.appendChild(titleH3);

            const gridDiv = document.createElement('div');
            gridDiv.className = 'symptoms-grid';

            symptomsArray.forEach(sym => {
                const labelWrap = document.createElement('label');
                labelWrap.className = 'custom-checkbox-wrapper';
                
                const inputChk = document.createElement('input');
                inputChk.type = 'checkbox';
                inputChk.value = sym.id;
                inputChk.classList.add('clinical-chk');
                
                const spanTxt = document.createElement('span');
                spanTxt.className = 'checkbox-label';
                spanTxt.innerText = sym.label;

                labelWrap.appendChild(inputChk);
                labelWrap.appendChild(spanTxt);

                gridDiv.appendChild(labelWrap);
            });
            
            cardHtml.appendChild(gridDiv);
            paneDiv.appendChild(cardHtml);
            symptomsPanesContainer.appendChild(paneDiv);

            index++;
        }
    }

    // 2. Liên kết toàn bộ Nút Bên Trái => Đổi Tab bên Phải
    function bindGlobalNavLinks() {
        const fullNavItems = document.querySelectorAll('.sidebar-panel .nav-item');
        
        fullNavItems.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Xoá mọi trạng thái Active ở Menu Trái
                fullNavItems.forEach(b => b.classList.remove('active'));
                 // Xoá mọi Tab đang mở ở Cột Phải
                document.querySelectorAll('.tab-pane').forEach(p => {
                    p.classList.remove('active');
                    p.classList.add('hidden');
                });

                // Bật Active của Nút hiện tại
                const targetId = btn.getAttribute('data-target');
                btn.classList.add('active');

                // Mở Pane Cột Phải tương ứng (Nút Xuất báo cáo ko có Target thì ko cần mở Pane này ở đây vì sẽ được override)
                if (targetId) {
                    const targetPane = document.getElementById(targetId);
                    if(targetPane) {
                        targetPane.classList.add('active');
                        targetPane.classList.remove('hidden');
                    }
                }
            });
        });
    }

    // 3. Xử lý Image Upload FileReader
    imageUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                imagePreview.classList.remove('hidden');
                placeholderText.classList.add('hidden');
                
                btnScan.disabled = false;
                aiScanLog.innerText = 'Trạng thái: Máy ảnh sẵn sàng quét.';
                aiScanLog.className = 'scan-log-text';
                paraclinicalSymptomFound = null; 
            }
            reader.readAsDataURL(file);
        }
    });

    // 4. Scanner Mô Phỏng
    btnScan.addEventListener('click', () => {
        btnScan.disabled = true; 
        aiScanLog.innerText = 'Bắt đầu dùng AI Machine Vision nhận diện...';
        aiScanLog.className = 'scan-log-text';

        scannerLaser.classList.remove('hidden');
        scannerLaser.classList.remove('anim-sweep');
        void scannerLaser.offsetWidth; 
        scannerLaser.classList.add('anim-sweep');

        setTimeout(() => {
            scannerLaser.classList.add('hidden');
            let modelId = aiModelType.value; 
            paraclinicalSymptomFound = modelId; 
            
            let findingText = '';
            if(modelId === 'xray_lung_opacity') findingText = 'Có tổn thương rọi bóng mờ nhu mô phổi.';
            if(modelId === 'scan_skin_lesion') findingText = 'Xuất hiện hồng ban rộp da bọng nước.';
            if(modelId === 'scan_tumor_mass') findingText = 'Tân sinh khôi u mô sụn mờ ác tính.';

            aiScanLog.innerText = `[KẾT QUẢ QUÉT]: ${findingText} Đã nạp thành công vào Hồ Sơ.`;
            aiScanLog.classList.add('success');
            
        }, 2000); 
    });


    // 5. Nút Khổng Lồ Xuất Báo Cáo Tại Left Column
    btnAnalyze.addEventListener('click', async () => {
        let selectedSymptomsArray = [];
        
        // 5.1. Lấy tất cả các checkbox đã tích trong Cột phải
        document.querySelectorAll('.clinical-chk:checked').forEach(chk => {
            selectedSymptomsArray.push(chk.value);
        });

        // 5.2. Nạp thêm Dữ kiện Hình ảnh (Nếu có scan)
        if (paraclinicalSymptomFound) {
            selectedSymptomsArray.push(paraclinicalSymptomFound);
        }

        // 5.3. Sinh hiệu
        let sysBP = parseInt(docVitalBp.value);
        if (!isNaN(sysBP) && sysBP > 140) selectedSymptomsArray.push('high_blood_pressure');

        let sysBSugar = parseInt(docVitalBs.value);
        if (!isNaN(sysBSugar) && sysBSugar > 126) selectedSymptomsArray.push('high_blood_sugar');

        // ==== 5.4. LÕI NLP AI BẢN QUYỀN (GEMINI API) ====
        const apiKey = localStorage.getItem('geminiApiKey') || '';
        const nlpText = document.getElementById('nlp-text').value.trim();
        
        if (nlpText.length > 5) {
            btnAnalyze.innerText = 'ĐANG GỌI API GEMINI...';
            btnAnalyze.disabled = true;

            if (apiKey) {
                // Gọi API Thực tế
                const systemPrompt = `Tao có danh sách các thẻ triệu chứng Y khoa định dạng [ID: Label] như sau:\n${JSON.stringify(allSymptomsMap, null, 2)}\n\nNhiệm vụ: Đọc kỹ câu bệnh sử của bệnh nhân, suy luận và bóc tách ra các dấu hiệu lâm sàng tương đồng nhất. Trả về DUY NHẤT một mảng JSON chứa các chuỗi ID. Ví dụ: ["fever", "cough"]\n\nCâu bệnh sử: "${nlpText}"`;
                
                try {
                    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            contents: [{ parts: [{ text: systemPrompt }] }],
                            generationConfig: { response_mime_type: "application/json" }
                        })
                    });
                    const data = await response.json();
                    
                    if (!response.ok) {
                        alert('API Key lỗi: ' + (data.error ? data.error.message : 'Invalid API Key'));
                        btnAnalyze.innerText = 'XÁC NHẬN CHẨN ĐOÁN';
                        btnAnalyze.disabled = false;
                        return;
                    }

                    if (data.candidates && data.candidates.length > 0) {
                        try {
                            let resultText = data.candidates[0].content.parts[0].text;
                            // Clean up Markdown backticks if any
                            resultText = resultText.replace(/```json/g, '').replace(/```/g, '').trim();
                            
                            const aiMatchedArray = JSON.parse(resultText);
                            if(Array.isArray(aiMatchedArray)) {
                                selectedSymptomsArray = selectedSymptomsArray.concat(aiMatchedArray);
                            }
                        } catch(e) { console.error("JSON parse LLM error", e); }
                    }
                } catch(error) {
                    alert('Lỗi Cấp Mạng: Không thể kết nối tới Google API.');
                    btnAnalyze.innerText = 'XÁC NHẬN CHẨN ĐOÁN';
                    btnAnalyze.disabled = false;
                    return;
                }
            } else {
                // Thuật toán đối chiếu thô vớt vát (Mock NLP) nếu chưa nhập Key
                for (let key in allSymptomsMap) {
                    if (nlpText.toLowerCase().includes(allSymptomsMap[key].toLowerCase().split('/')[0].trim())) {
                        selectedSymptomsArray.push(key);
                    }
                }
            }

            btnAnalyze.innerText = 'XÁC NHẬN CHẨN ĐOÁN';
            btnAnalyze.disabled = false;
        }

        // Lọc trùng ID Triệu chứng
        selectedSymptomsArray = [...new Set(selectedSymptomsArray)];

        if (selectedSymptomsArray.length === 0) {
            btnAnalyze.innerText = 'XÁC NHẬN CHẨN ĐOÁN';
            btnAnalyze.disabled = false;
            alert('Cảnh báo: Không thể trích xuất được triệu chứng từ văn bản của bạn. Hãy ghi từ khóa cụ thể hơn như "Sốt, Ho khan", hoặc bạn chưa tích ô nào cả!');
            return;
        }

        patientData = {
            name: document.getElementById('p-name').value.trim() || 'Hồ sơ Ẩn danh',
            ageGroup: document.getElementById('p-age').value,
            gender: document.getElementById('p-gender').value,
            underlyingDisease: document.getElementById('p-disease').value,
            allergies: document.getElementById('p-allergies').value.trim(),
            medications: document.getElementById('p-medications').value.trim()
        };

        engine = new InferenceEngine();
        const topResults = engine.evaluateOneShot(selectedSymptomsArray, patientData);

        // Render ra HTML Cột thẻ Báo cáo
        renderReports(topResults);
        
        // Auto bẻ luồng sang mở Tab Results
        document.querySelectorAll('.tab-pane').forEach(p => {
            p.classList.remove('active');
            p.classList.add('hidden');
        });
        const resultsPane = document.getElementById('pane-results');
        resultsPane.classList.add('active');
        resultsPane.classList.remove('hidden');
    });

    function renderReports(topResults) {
        aiResultsContainer.innerHTML = '';
        document.querySelector('.report-header').style.display = 'block';
        
        if (topResults.length === 0) {
            uiUnknownScreen.classList.remove('hidden');
        } else {
            uiUnknownScreen.classList.add('hidden');
            
            topDiagnosisContext = topResults[0];
            
            // LƯU LỊCH SỬ EMR LẦN ĐẦU (Tạo Mới + Tìm kiếm PID)
            const dateStr = new Date().toLocaleString('vi-VN');
            let matchedPID = 'PID-' + Math.floor(1000 + Math.random() * 9000);
            if (patientData.name !== 'Hồ sơ Ẩn danh') {
                const exist = savedHistory.find(h => h.name.toLowerCase() === patientData.name.toLowerCase());
                if (exist && exist.pid) matchedPID = exist.pid;
            }

            savedHistory.unshift({
                pid: matchedPID,
                date: dateStr,
                name: patientData.name,
                disease: topDiagnosisContext.rule.disease,
                certainty: topDiagnosisContext.certainty
            });
            if (savedHistory.length > 30) savedHistory.pop(); // Giữ giới hạn 30 ca
            localStorage.setItem('patientHistory', JSON.stringify(savedHistory));
            renderEMRTable();
            
            
            const chatbotContainer = document.getElementById('chatbot-container');
            if (chatbotContainer) {
                chatbotContainer.classList.remove('hidden');
                chatbotContainer.style.display = 'flex';
            }
            document.getElementById('chat-history').innerHTML = `<div style="color:#64748b; font-style:italic; margin-bottom:10px;">Khởi tạo tuyến tư vấn cơ sở với AI Bác Sĩ...</div>`;
            
            const insightBlock = document.createElement('div');
            insightBlock.className = 'ai-block';
            insightBlock.innerHTML = `<strong>💡 TIẾN TRÌNH SUY LUẬN AI TỔNG HỢP:</strong><br>${topResults[0].explanation}`;
            aiResultsContainer.appendChild(insightBlock);

            topResults.forEach((res, index) => {
                const isCritical = CRITICAL_DISEASES.includes(res.rule.id) && index === 0;
                const card = document.createElement('div');
                card.className = `disease-card d-top-${index + 1} ${isCritical ? 'critical' : ''}`;

                const rankLabel = index === 0 ? 'CHẨN ĐOÁN SƠ BỘ' : `CHẨN ĐOÁN PHÂN BIỆT #${index}`;

                // Tính toán Mức độ Nguy hiểm (Thanh màu Gradient)
                let barColor = 'linear-gradient(90deg, #10b981, #34d399)'; // Xanh
                let dangerText = 'Thấp';
                let alertColor = '#10b981';
                
                if (res.certainty >= 75 || isCritical) {
                    barColor = 'linear-gradient(90deg, #ef4444, #f87171)'; // Đỏ
                    dangerText = 'Khẩn Cấp / Nguy Hiểm';
                    alertColor = '#ef4444';
                } else if (res.certainty >= 40) {
                    barColor = 'linear-gradient(90deg, #f59e0b, #fbbf24)'; // Vàng
                    dangerText = 'Theo Dõi Cao';
                    alertColor = '#f59e0b';
                }

                const severityBarHtml = `
                    <div style="margin-bottom: 20px;">
                        <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.85rem; font-weight:700; color:#475569;">
                            <span>MỨC ĐỘ CẢNH BÁO BỆNH: <span style="color:${alertColor}">${dangerText.toUpperCase()}</span></span>
                            <span>${res.certainty}%</span>
                        </div>
                        <div style="width:100%; background:#e2e8f0; height:10px; border-radius:5px; overflow:hidden;">
                            <div style="width:${res.certainty}%; height:100%; background: ${barColor}; border-radius:5px; transition: width 1s ease-in-out;"></div>
                        </div>
                    </div>
                `;

                // In Ra Các Triệu chứng Đã Chọn Khớp Dữ Liệu
                const matchedSymptomsHtml = `
                    <div style="background: #f1f5f9; padding: 12px; border-left: 3px solid #0284c7; margin-bottom: 20px; border-radius: 4px;">
                        <h4 style="font-size: 0.85rem; color:#0369a1; margin-bottom: 8px;">THẺ BẰNG CHỨNG (Triệu chứng / Cận Lâm Sàng):</h4>
                        <p style="font-size: 0.95rem; margin:0; color:#334155; font-weight:500;">🔹 ${res.matchedSymptomsText}</p>
                    </div>
                `;

                let drugWarningsHtml = '';
                if(res.drugWarnings && res.drugWarnings.length > 0) {
                    drugWarningsHtml = `<div class="chat-alert" style="margin-bottom:15px;">⚠️ ${res.drugWarnings.join(' ')}</div>`;
                }

                card.innerHTML = `
                    <div class="d-header">
                        <div>
                            <span class="badge ${index === 0 ? (isCritical ? 'badge-warning' : 'badge-blue') : ''}">${rankLabel}</span>
                            <div class="d-name">${res.rule.disease} <span style="font-size:0.85rem; color:#64748b; font-weight:normal; margin-left:8px;">[MÃ KHÁM: ${res.rule.icdCode || 'N/A'}]</span></div>
                        </div>
                        <div class="d-score" style="color: ${index === 0 ? (isCritical ? '#dc2626' : '#059669') : '#d97706'}">${res.certainty}% KHỚP</div>
                    </div>
                    
                    ${severityBarHtml}

                    ${drugWarningsHtml}

                    ${matchedSymptomsHtml}

                    <div class="d-desc">${res.rule.message}</div>
                    
                    ${index === 0 ? `
                        <div class="d-tx-grid">
                            <div class="d-rx-block">
                                <h4>Phác Đồ Cấp Cứu & Điều Trị</h4>
                                <p>${res.rule.treatment}</p>
                            </div>
                            <div class="d-rx-block">
                                <h4>Khuyến Cáo Dịch Tễ / Phục Hồi</h4>
                                <p>${res.rule.prevention}</p>
                            </div>
                        </div>
                    ` : ''}
                `;
                aiResultsContainer.appendChild(card);
            });
        }
    }

    // V11: CHATBOT AI CHUYÊN SÂU
    const btnChatSend = document.getElementById('btn-chat-send');
    const chatInput = document.getElementById('chat-input');
    const chatHistory = document.getElementById('chat-history');

    if (btnChatSend) {
        btnChatSend.addEventListener('click', async () => {
            const msg = chatInput.value.trim();
            if(!msg) return;

            if(!topDiagnosisContext) {
                chatHistory.innerHTML += `<div class="chat-bubble chat-user"><strong>Bạn:</strong> ${msg}</div>`;
                chatHistory.innerHTML += `<div class="chat-bubble chat-bot chat-alert">⚠️ Hệ thống AI lồng ghép chưa có Context Bệnh lý. Vui lòng tick chọn triệu chứng và bấm "Xác Nhận Chẩn Đoán" ở cột trái trước khi Thảo luận cùng Bác sĩ!</div>`;
                chatInput.value = '';
                chatHistory.scrollTop = chatHistory.scrollHeight;
                return;
            }
            
            const apiKey = localStorage.getItem('geminiApiKey');
            if(!apiKey) {
                alert('Hệ thống chưa liên kết API. Vui lòng bấm Cài Đặt (Bánh răng phía trên Menu) để chèn mã Google Gemini.');
                return;
            }

            chatHistory.innerHTML += `<div class="chat-bubble chat-user"><strong>Bạn:</strong> ${msg}</div>`;
            chatInput.value = '';
            chatHistory.scrollTop = chatHistory.scrollHeight;

            const systemPrompt = `Bệnh nhân được chẩn đoán mắc: "${topDiagnosisContext.rule.disease}".\nPhác đồ: ${topDiagnosisContext.rule.treatment}\nDựa vào đó, hãy đóng vai 1 bác sĩ tận tâm trả lời câu hỏi: "${msg}". Trả lời NGẮN MỘT MÌNH NÓ RÕ RÀNG (tối đa 3 dòng), không dùng Markdown rườm rà.`;

            chatHistory.innerHTML += `<div class="chat-bubble chat-bot" id="bot-typing"><span style="color:#64748b;">AI Đang gõ phím...</span></div>`;
            chatHistory.scrollTop = chatHistory.scrollHeight;

            try {
                const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ contents: [{ parts: [{ text: systemPrompt }] }] })
                });
                const data = await res.json();
                document.getElementById('bot-typing').remove();
                
                if(data.candidates && data.candidates[0].content.parts[0].text) {
                    let aiMsg = data.candidates[0].content.parts[0].text;
                    aiMsg = aiMsg.replace(/\n/g, '<br>');
                    chatHistory.innerHTML += `<div class="chat-bubble chat-bot"><strong>Bác Sĩ AI:</strong> ${aiMsg}</div>`;
                } else {
                    chatHistory.innerHTML += `<div class="chat-bubble chat-bot">Lỗi phản hồi tử Google AI.</div>`;
                }
            } catch(e) {
                if(document.getElementById('bot-typing')) document.getElementById('bot-typing').remove();
                chatHistory.innerHTML += `<div class="chat-bubble chat-bot chat-alert">Kết nối API gián đoạn. Không phản hồi.</div>`;
            }
            chatHistory.scrollTop = chatHistory.scrollHeight;
        });
        
        chatInput.addEventListener("keyup", function(event) {
            if (event.key === "Enter") {
                btnChatSend.click();
            }
        });
    }

    // V11: TOGGLE FLOATING CHAT WIDGET
    const floatingBtn = document.getElementById('floating-chat-btn');
    const chatbotContainer = document.getElementById('chatbot-container');
    const closeChatBtn = document.getElementById('btn-close-chat');

    if (floatingBtn && chatbotContainer && closeChatBtn) {
        floatingBtn.addEventListener('click', () => {
            if (chatbotContainer.classList.contains('hidden')) {
                chatbotContainer.classList.remove('hidden');
                chatbotContainer.style.display = 'flex';
            } else {
                chatbotContainer.classList.add('hidden');
                chatbotContainer.style.display = 'none';
            }
        });

        closeChatBtn.addEventListener('click', () => {
            chatbotContainer.classList.add('hidden');
            chatbotContainer.style.display = 'none';
        });
    }

    init();
});
