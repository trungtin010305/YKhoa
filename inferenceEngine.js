class InferenceEngine {
    constructor() {}

    /**
     * @param {Array} selectedSymptoms Array các ID triệu chứng đã tick
     * @param {Object} patientProfile { ageGroup, gender, underlyingDisease }
     */
    evaluateOneShot(selectedSymptoms, patientProfile) {
        // Fallback an toàn nếu patientProfile vô tình bị null hoặc undefined
        patientProfile = patientProfile || {};
        selectedSymptoms = selectedSymptoms || [];
        
        let results = [];

        for (let rule of rules) {
            let currentScore = 0;
            let matchingSymptomNames = [];

            // Điểm từ Symptoms - Bảo vệ chống crash nếu bệnh chưa định nghĩa symptom
            if (rule.symptoms) {
                for (let [symptomId, weight] of Object.entries(rule.symptoms)) {
                    if (selectedSymptoms.includes(symptomId)) {
                        currentScore += weight;
                        matchingSymptomNames.push(allSymptomsMap[symptomId]);
                    }
                }
            }

            // Điểm từ Demographic Modifiers
            let modScore = 0;
            let appliedModifiersText = [];
            let genderContradiction = false;

            if (rule.modifiers) {
                if (rule.modifiers.ageGroup && patientProfile.ageGroup && rule.modifiers.ageGroup[patientProfile.ageGroup]) {
                    modScore += rule.modifiers.ageGroup[patientProfile.ageGroup];
                    let ageTextVn = patientProfile.ageGroup === 'adult' ? 'thanh trung niên' : (patientProfile.ageGroup === 'child' ? 'trẻ nhỏ' : 'người cao tuổi');
                    appliedModifiersText.push(`tuổi tác (${ageTextVn})`);
                }
                
                if (rule.modifiers.gender) {
                    if (patientProfile.gender && rule.modifiers.gender[patientProfile.gender]) {
                        modScore += rule.modifiers.gender[patientProfile.gender];
                        let genderTextVn = patientProfile.gender === 'male' ? 'nam giới' : 'nữ giới';
                        appliedModifiersText.push(`đặc trưng giới tính (${genderTextVn})`);
                    } else if (patientProfile.gender) {
                        // Bệnh này có trọng số giới tính, nhưng bệnh nhân KHÔNG thuộc giới tính đó -> Xung đột giới tính
                        genderContradiction = true;
                    }
                }

                if (rule.modifiers.underlyingDisease && patientProfile.underlyingDisease === 'yes' && rule.modifiers.underlyingDisease['yes']) {
                    modScore += rule.modifiers.underlyingDisease['yes'];
                    appliedModifiersText.push(`có tiền sử bệnh nền`);
                }
            }
            
            // Xung đột giới tính thì chặn tuyệt đối không cho ra phân tích
            if (genderContradiction) continue;

            // Tính độ tự tin
            let finalScore = currentScore + modScore;
            let certainty = Math.round((finalScore / rule.maxScore) * 100);
            if (certainty > 99) certainty = 99; // Không bao giờ chắc 100%

            // Chỉ đưa vào vòng xếp hạng nếu có ít nhất 1 triệu chứng bệnh
            if (matchingSymptomNames.length > 0) {
                
                // Giải thích AI chuẩn Y Khoa
                let explHtml = `Hệ chuyên gia ghi nhận bệnh nhân có <strong>${matchingSymptomNames.length} dấu hiệu lâm sàng/cận lâm sàng</strong> trùng khớp với bệnh lý này: <span style="color:#0369a1;">${matchingSymptomNames.join(', ')}</span>.<br>`;
                
                if (modScore > 0) {
                    explHtml += `Đồng thời, hệ thống phân tích thấy yếu tố tiền sử (<span style="color:#b45309; font-weight:600;">${appliedModifiersText.join(' + ')}</span>) đang làm <strong>tăng mạnh mức độ rủi ro</strong> tiến triển bệnh.<br>`;
                }
                
                explHtml += `=> <strong>Tổng trọng số chẩn đoán định lượng:</strong> ${finalScore} / ${rule.maxScore} (Bậc Cảnh Báo: ${certainty}%).`;

                // Tính cảnh báo tương tác thuốc
                let drugWarnings = [];
                if (rule.contraindications && patientProfile.underlyingDisease) {
                    rule.contraindications.forEach(contra => {
                        if (contra.condition === patientProfile.underlyingDisease) {
                            drugWarnings.push(contra.warning);
                        }
                    });
                }
                if (patientProfile.allergies) {
                    drugWarnings.push(`CẢNH BÁO DỊ ỨNG MẠNH: Bệnh nhân có tiền sử dị ứng với "${patientProfile.allergies}". Yêu cầu Bác sĩ rà soát kỹ bảng thành phần thuốc, tuyệt đối tránh kê đơn chéo!`);
                }
                if (patientProfile.medications) {
                    drugWarnings.push(`CẢNH BÁO TƯƠNG TÁC: Bệnh nhân đang sử dụng "${patientProfile.medications}". Chú ý nguy cơ tương tác (Cytochrome P450) với phác đồ mới.`);
                }

                results.push({
                    rule: rule,
                    certainty: certainty,
                    explanation: explHtml,
                    matchedSymptomsText: matchingSymptomNames.length > 0 ? matchingSymptomNames.join('; ') : 'Dựa trên Chỉ số mạn tính / Thông số đo',
                    drugWarnings: drugWarnings
                });
            }
        } // Đóng vòng lặp for (let rule of rules)

        // Sắp xếp theo tỷ lệ chắc chắn giảm dần
        results.sort((a, b) => b.certainty - a.certainty);

        // Trả về Top 3 kết quả đáng tin nhất (Trên 10%)
        return results.filter(r => r.certainty >= 10).slice(0, 3);
    }

    /**
     * @param {Array} selectedSymptoms Danh sách ID triệu chứng hiện tại
     * @param {Object} patientProfile
     * @param {Boolean} forceSkip Nếu true, ép buộc không chạy Backward Chaining
     */
    evaluateWithBackwardChaining(selectedSymptoms, patientProfile, forceSkip = false) {
        patientProfile = patientProfile || {};
        selectedSymptoms = selectedSymptoms || [];
        
        const topResults = this.evaluateOneShot(selectedSymptoms, patientProfile);

        if (!forceSkip && topResults.length > 0) {
            const topMatch = topResults[0];
            
            // Nới rộng vòng kiềm tỏa: Bất kỳ triệu chứng nào ráp ra bệnh (từ 10% đến 99%) đều gọi hỏi vặn
            if (topMatch.certainty >= 10 && topMatch.certainty <= 99) {
                // Rút trích các triệu chứng của bệnh này mà bệnh nhân CHƯA chọn
                let missingSymptoms = [];
                if (topMatch.rule.symptoms) {
                    for (let symptomId in topMatch.rule.symptoms) {
                        if (!selectedSymptoms.includes(symptomId)) {
                            missingSymptoms.push({
                                id: symptomId,
                                label: allSymptomsMap[symptomId] || symptomId
                            });
                        }
                    }
                }

                // Nếu có triệu chứng thiếu để hỏi, bật cờ backward
                if (missingSymptoms.length > 0) {
                    return {
                        mode: 'backward',
                        suspectedDisease: topMatch.rule.disease,
                        missingSymptoms: missingSymptoms
                    };
                }
            }
        }

        // Trả về báo cáo Forward thông thường
        return {
            mode: 'forward',
            results: topResults
        };
    }
}
