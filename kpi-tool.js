document.addEventListener('DOMContentLoaded', () => {
    // 성과 관리 도구 관련 함수들
    window.openKpiTool = function() {
        closeAllToolSections();
        const kpiTool = document.getElementById('kpiToolSection');
        if (kpiTool) {
            document.getElementById('management-main-view').style.display = 'none';
            kpiTool.style.display = 'block';
        }
    }

    window.openRoiCalculator = function() {
        closeAllToolSections();
        const roiCalculator = document.getElementById('roiCalculatorSection');
        if (roiCalculator) {
            document.getElementById('management-main-view').style.display = 'none';
            roiCalculator.style.display = 'block';
        }
    }

    window.openPracticeModule = function() {
        closeAllToolSections();
        const practiceModule = document.getElementById('practiceModuleSection');
        if (practiceModule) {
            document.getElementById('management-main-view').style.display = 'none';
            practiceModule.style.display = 'block';
        }
    }

    window.openReportGenerator = function() {
        closeAllToolSections();
        const reportGenerator = document.getElementById('reportGeneratorSection');
        if (reportGenerator) {
            document.getElementById('management-main-view').style.display = 'none';
            reportGenerator.style.display = 'block';
        }
    }

    window.closeAllToolSections = function() {
        const toolSections = document.querySelectorAll('.tool-section');
        toolSections.forEach(section => {
            section.style.display = 'none';
        });
        const managementMainView = document.getElementById('management-main-view');
        if (managementMainView) {
            managementMainView.style.display = 'block';
        }
    }

    // ROI Calculator Logic
    const costInputs = {
        instructor: document.getElementById('tool-cost-instructor'),
        materials: document.getElementById('tool-cost-materials'),
        operation: document.getElementById('tool-cost-operation'),
        participant: document.getElementById('tool-cost-participant'),
    };

    const benefitInputs = {
        productivity: document.getElementById('tool-benefit-productivity'),
        quality: document.getElementById('tool-benefit-quality'),
        saving: document.getElementById('tool-benefit-saving'),
        other: document.getElementById('tool-benefit-other'),
    };

    const totalCostEl = document.getElementById('tool-total-cost');
    const totalBenefitEl = document.getElementById('tool-total-benefit');

    const resultOutputs = {
        netBenefit: document.getElementById('tool-net-benefit'),
        roiPercentage: document.getElementById('tool-roi-percentage'),
        paybackPeriod: document.getElementById('tool-payback-period'),
    };

    const calculateRoiBtn = document.getElementById('tool-calculate-roi-btn');

    function formatNumber(num) {
        return new Intl.NumberFormat('ko-KR').format(num);
    }

    function updateTotals() {
        let totalCost = 0;
        for (const key in costInputs) {
            if (costInputs[key]) {
                totalCost += Number(costInputs[key].value) || 0;
            }
        }
        if (totalCostEl) {
            totalCostEl.textContent = formatNumber(totalCost);
        }

        let totalBenefit = 0;
        for (const key in benefitInputs) {
            if (benefitInputs[key]) {
                totalBenefit += Number(benefitInputs[key].value) || 0;
            }
        }
        if (totalBenefitEl) {
            totalBenefitEl.textContent = formatNumber(totalBenefit);
        }
    }

    function calculateRoiResults() {
        const totalCost = Object.values(costInputs).reduce((sum, input) => sum + (Number(input.value) || 0), 0);
        const totalBenefit = Object.values(benefitInputs).reduce((sum, input) => sum + (Number(input.value) || 0), 0);

        if (totalCost === 0) {
            if(resultOutputs.netBenefit) resultOutputs.netBenefit.textContent = formatNumber(totalBenefit);
            if(resultOutputs.roiPercentage) resultOutputs.roiPercentage.textContent = '∞'; // Can't divide by zero
            if(resultOutputs.paybackPeriod) resultOutputs.paybackPeriod.textContent = '0';
            return;
        }

        const netBenefit = totalBenefit - totalCost;
        const roi = (netBenefit / totalCost) * 100;
        const paybackPeriod = totalBenefit > 0 ? (totalCost / totalBenefit) * 12 : 0;

        if (resultOutputs.netBenefit) {
            resultOutputs.netBenefit.textContent = formatNumber(parseFloat(netBenefit.toFixed(0)));
        }
        if (resultOutputs.roiPercentage) {
            resultOutputs.roiPercentage.textContent = formatNumber(parseFloat(roi.toFixed(1)));
        }
        if (resultOutputs.paybackPeriod) {
            resultOutputs.paybackPeriod.textContent = formatNumber(parseFloat(paybackPeriod.toFixed(1)));
        }
    }

    // Add event listeners if the elements exist
    if (calculateRoiBtn) {
        Object.values(costInputs).forEach(input => {
            if(input) input.addEventListener('input', updateTotals);
        });
        Object.values(benefitInputs).forEach(input => {
            if(input) input.addEventListener('input', updateTotals);
        });

        calculateRoiBtn.addEventListener('click', calculateRoiResults);

        // Initial calculation on page load
        updateTotals();
        calculateRoiResults(); // Also calculate results on load
    }

    function setupKpiToolTabs() {
        const kpiNavTabs = document.querySelectorAll('.kpi-nav-tab');
        const kpiTabContents = document.querySelectorAll('.kpi-tab-content');

        if (kpiNavTabs.length === 0) return;

        kpiNavTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                kpiNavTabs.forEach(t => t.classList.remove('active'));
                kpiTabContents.forEach(c => {
                    c.classList.remove('active');
                    c.style.display = 'none'; // Ensure content is hidden
                });

                tab.classList.add('active');
                const targetContentId = tab.dataset.tab;
                const targetContent = document.getElementById(targetContentId);
                if (targetContent) {
                    targetContent.classList.add('active');
                    targetContent.style.display = 'block'; // Ensure content is shown
                }
            });
        });
        
        // 초기 상태 설정
        const initialActiveTab = document.querySelector('.kpi-nav-tab.active');
        if (initialActiveTab) {
            const targetContentId = initialActiveTab.dataset.tab;
            const targetContent = document.getElementById(targetContentId);
            if (targetContent) {
                kpiTabContents.forEach(c => {
                    c.classList.remove('active');
                    c.style.display = 'none';
                });
                targetContent.classList.add('active');
                targetContent.style.display = 'block';
            }
        }
    }

    setupKpiToolTabs();
}); 