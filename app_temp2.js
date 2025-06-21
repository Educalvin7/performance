        // ?덈줈??onclick ?몃뱾?щ? ?좊떦?⑸땲??
        btn.onclick = function() {
            kpiTabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            btn.classList.add('active');
            document.querySelector(`#kpiToolSection #${btn.dataset.tab}`).classList.add('active');
        };
    });
    // ?꾧뎄媛 ?대┫ ????긽 泥?踰덉㎏ ??씠 ?쒖꽦?붾릺?꾨줉 ?⑸땲??
    if (kpiTabBtns.length > 0) {
        kpiTabBtns[0].click();
    }
}

// KPI ?앹꽦 湲곕뒫
function createKPI() {
    // ???곗씠???섏쭛
    const kpiName = document.getElementById('kpiName')?.value;
    const kpiCategory = document.getElementById('kpiCategorySelect')?.value;
    const kpiMeasureMethod = document.getElementById('kpiMeasureMethod')?.value;
    const kpiTargetValue = document.getElementById('kpiTargetValue')?.value;
    const kpiMeasureCycle = document.getElementById('kpiMeasureCycle')?.value;
    
    // ?좏슚??寃??    if (!kpiName || !kpiCategory || !kpiMeasureMethod || !kpiTargetValue || !kpiMeasureCycle) {
        alert('紐⑤뱺 ?꾨뱶瑜??낅젰?댁＜?몄슂.');
        return;
    }
    
    // KPI 媛앹껜 ?앹꽦
    const newKPI = {
        id: Date.now(),
        name: kpiName,
        category: kpiCategory,
        measureMethod: kpiMeasureMethod,
        targetValue: kpiTargetValue,
        measureCycle: kpiMeasureCycle,
        createdAt: new Date().toLocaleDateString()
    };
    
    // 寃곌낵 ?쒖떆
    const resultHTML = `
        <div class="kpi-result">
            <h4>??KPI媛 ?깃났?곸쑝濡??앹꽦?섏뿀?듬땲??</h4>
            <div class="kpi-details">
                <p><strong>KPI 紐낆묶:</strong> ${newKPI.name}</p>
                <p><strong>移댄뀒怨좊━:</strong> ${getCategoryName(newKPI.category)}</p>
                <p><strong>痢≪젙 諛⑸쾿:</strong> ${newKPI.measureMethod}</p>
                <p><strong>紐⑺몴媛?</strong> ${newKPI.targetValue}</p>
                <p><strong>痢≪젙 二쇨린:</strong> ${getCycleName(newKPI.measureCycle)}</p>
                <p><strong>?앹꽦??</strong> ${newKPI.createdAt}</p>
            </div>
            <div class="kpi-actions">
                <button class="btn btn--primary" onclick="downloadKPI(${newKPI.id})">KPI ?ㅼ슫濡쒕뱶</button>
                <button class="btn btn--secondary" onclick="resetKpiForm()">??KPI ?앹꽦</button>
            </div>
        </div>
    `;
    
    // 寃곌낵瑜?KPI ?앹꽦湲???뿉 ?쒖떆
    const kpiGeneratorContent = document.getElementById('kpi-generator');
    if (kpiGeneratorContent) {
        const form = kpiGeneratorContent.querySelector('.kpi-generator-form');
        if (form) {
            form.style.display = 'none';
        }
        
        const resultDiv = document.createElement('div');
        resultDiv.innerHTML = resultHTML;
        kpiGeneratorContent.appendChild(resultDiv);
    }
}

// 移댄뀒怨좊━ ?대쫫 蹂???⑥닔
function getCategoryName(category) {
    const categories = {
        'participation': '李몄뿬??吏??,
        'learning': '?숈뒿?깃낵 吏??,
        'behavior': '?됰룞蹂??吏??,
        'organizational': '議곗쭅?깃낵 吏??,
        'financial': '?щТ?깃낵 吏??
    };
    return categories[category] || category;
}

// 痢≪젙 二쇨린 ?대쫫 蹂???⑥닔
function getCycleName(cycle) {
    const cycles = {
        'quarterly': '遺꾧린蹂?,
        'half-yearly': '諛섍린蹂?,
        'yearly': '?곌컙'
    };
    return cycles[cycle] || cycle;
}

// KPI ??珥덇린???⑥닔
function resetKpiForm() {
    const kpiGeneratorContent = document.getElementById('kpi-generator');
    if (kpiGeneratorContent) {
        // ???ㅼ떆 ?쒖떆
        const form = kpiGeneratorContent.querySelector('.kpi-generator-form');
        if (form) {
            form.style.display = 'block';
            form.reset();
        }
        
        // 寃곌낵 ?쒓굅
        const resultDiv = kpiGeneratorContent.querySelector('.kpi-result');
        if (resultDiv) {
            resultDiv.remove();
        }
    }
}

// KPI 誘몃━蹂닿린 ?쒖떆
function showKPIPreview(kpi) {
    const categoryNames = {
        participation: '李몄뿬??吏??,
        learning: '?숈뒿?깃낵 吏??,
        behavior: '?됰룞蹂??吏??,
        organization: '議곗쭅?깃낵 吏??,
        financial: '?щТ?깃낵 吏??
    };
    
    const frequencyNames = {
        daily: '?쇰퀎',
        weekly: '二쇰퀎',
        monthly: '?붾퀎',
        quarterly: '遺꾧린蹂?,
        yearly: '?곕퀎'
    };
    
    const previewContent = `
        <h5>${kpi.name}</h5>
        <p><strong>移댄뀒怨좊━:</strong> ${categoryNames[kpi.category]}</p>
        <p><strong>痢≪젙 諛⑸쾿:</strong> ${kpi.method}</p>
        <p><strong>紐⑺몴媛?</strong> ${kpi.target}</p>
        <p><strong>痢≪젙 二쇨린:</strong> ${frequencyNames[kpi.frequency]}</p>
        <p><strong>?앹꽦??</strong> ${kpi.createdAt}</p>
        <button class="btn btn--outline btn--sm" onclick="downloadKPI(${kpi.id})">?ㅼ슫濡쒕뱶</button>
    `;
    
    document.getElementById('kpiPreviewContent').innerHTML = previewContent;
    document.getElementById('kpiPreview').style.display = 'block';
}

// KPI ?ㅼ슫濡쒕뱶 (?쒕??덉씠??
function downloadKPI(kpiId) {
    // KPI ?곗씠???앹꽦 (?ㅼ젣濡쒕뒗 ??λ맂 ?곗씠?곕? ?ъ슜?댁빞 ??
    const kpi = {
        id: kpiId,
        name: "?섑뵆 KPI",
        category: "?숈뒿?깃낵 吏??,
        measureMethod: "?ъ쟾-?ы썑 ?뚯뒪??,
        targetValue: "80???댁긽",
        measureCycle: "遺꾧린蹂?,
        createdAt: new Date().toLocaleDateString()
    };
    
    // KPI ?곗씠?곕? JSON ?뺥깭濡?蹂??    const kpiData = JSON.stringify(kpi, null, 2);
    
    // ?ㅼ슫濡쒕뱶 留곹겕 ?앹꽦
    const blob = new Blob([kpiData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `KPI_${kpi.name}_${kpiId}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('KPI媛 ?깃났?곸쑝濡??ㅼ슫濡쒕뱶?섏뿀?듬땲??');
}

// ?꾩뿭 ?⑥닔濡??깅줉
window.createKPI = createKPI;
window.downloadKPI = downloadKPI;

// PDF 酉곗뼱 愿???⑥닔??function previousPage() {
    // Google Drive PDF 酉곗뼱???먯껜 ?ㅻ퉬寃뚯씠?섏쓣 ?ъ슜?섎?濡??뚮┝留??쒖떆
    alert('Google Drive PDF 酉곗뼱?먯꽌 醫뚯륫 ?섎떒???붿궡??踰꾪듉???ъ슜?섏뿬 ?댁쟾 ?섏씠吏濡??대룞?섏꽭??');
}

function nextPage() {
    // Google Drive PDF 酉곗뼱???먯껜 ?ㅻ퉬寃뚯씠?섏쓣 ?ъ슜?섎?濡??뚮┝留??쒖떆
    alert('Google Drive PDF 酉곗뼱?먯꽌 ?곗륫 ?섎떒???붿궡??踰꾪듉???ъ슜?섏뿬 ?ㅼ쓬 ?섏씠吏濡??대룞?섏꽭??');
}

function downloadPDF() {
    // PDF ?ㅼ슫濡쒕뱶 ?쒕??덉씠??    alert('PDF ?ㅼ슫濡쒕뱶媛 ?쒖옉?⑸땲?? ?좎떆留?湲곕떎?ㅼ＜?몄슂...');
    
    // ?ㅼ젣 PDF ?ㅼ슫濡쒕뱶 留곹겕 ?앹꽦 (?쒕??덉씠??
    setTimeout(() => {
        const link = document.createElement('a');
        link.href = 'https://drive.google.com/uc?export=download&id=1PH-spz8-94_k2N14yIhZnfk201sVo-1M';
        link.download = '?깃낵湲곗뿬???됯?_醫낇빀_?덈궡?먮즺.pdf';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        alert('PDF ?ㅼ슫濡쒕뱶媛 ?꾨즺?섏뿀?듬땲??');
    }, 2000);
}

// ?꾩뿭 ?⑥닔?ㅼ쓣 window 媛앹껜??諛붿씤??(HTML?먯꽌 onclick?쇰줈 ?몄텧?섍린 ?꾪빐)
window.createKPI = createKPI;
window.downloadKPI = downloadKPI;
window.calculateROI = calculateROI;
window.startScenario = startScenario;
window.nextStep = nextStep;
window.previousStep = previousStep;
window.exitScenario = exitScenario;
window.previousPage = previousPage;
window.nextPage = nextPage;
window.downloadPDF = downloadPDF;
