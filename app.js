// 전역 변수 및 상태 객체
let currentTab = 'theory';
let currentQuiz = 0;
let quizAnswers = [];
let currentScenario = null;
let currentStep = 1;
let scenarioData = {};
let appState = {
    currentCourse: null,
    currentStage: 1,
    unlockedTabs: [], // Track unlocked tabs for the current course
    evaluationData: {},
    customKpis: {},
    courseProgress: {}
};

// DOM 요소 중앙 관리 객체
const elements = {};

// 통합된 데이터 객체
const appData = {
    courses: [
        {
            id: "elderly_protection_counselor",
            name: "노인보호전문상담원역량강화과정",
            emoji: "👵",
            styleId: 1,
            description: "노인학대 예방 및 상담 전문역량 강화를 통해 노인 인권을 보호하고, 현장 대응 능력을 향상시키는 것을 목표로 합니다.",
            kpis: [
                { stage: "1단계", name: "교육 만족도", target: "4.5점 이상", method: "5점 척도 설문", timing: "교육 직후" },
                { stage: "2단계", name: "상담기법 이해도", target: "80점 이상", method: "사례 기반 지식 테스트", timing: "교육 종료 시" },
                { stage: "3단계", name: "현장 적용률", target: "70% 이상", method: "동료/상사 관찰 체크리스트", timing: "교육 후 1개월" },
                { stage: "4단계", name: "신고접수 초기대응 성공률", target: "15% 향상", method: "업무 데이터 통계 분석", timing: "교육 후 3개월" }
            ],
            scenarios: [
                { title: "위기상황 개입 시뮬레이션", description: "고위험 학대 사례 발견 시, 유관기관(경찰, 의료기관)과 공조하여 신속하고 안전하게 개입하는 절차를 시뮬레이션하고 평가합니다.", details: "참가자는 시나리오 카드를 받아 위기 상황을 인지하고, 단계별 행동 지침에 따라 역할을 수행합니다. 평가는 대응의 신속성, 절차의 정확성, 협업의 효율성을 기준으로 이루어집니다." },
                { title: "법률 및 행정 절차 이해", description: "노인보호 관련 법률(노인복지법 등)에 근거하여 행정조치를 요청하고, 피해자 보호명령을 신청하는 과정을 문서 작성 중심으로 실습합니다.", details: "실제 사례와 유사한 서식을 제공하여, 법적 효력을 갖춘 문서를 작성하는 능력을 평가합니다. 주요 평가 항목은 필수 정보 기입 여부, 법적 근거의 명확성입니다." }
            ]
        },
        {
            id: "visiting_welfare_worker",
            name: "찾아가는복지실무자과정",
            emoji: "🤝",
            styleId: 2,
            description: "정보 접근성이 낮은 위기 가구를 직접 발굴하고, 개인별 맞춤형 복지 서비스를 기획 및 연계하는 현장 중심의 역량을 강화합니다.",
            kpis: [
                { stage: "1단계", name: "교육 만족도", target: "4.3점 이상", method: "5점 척도 설문", timing: "교육 직후" },
                { stage: "2단계", name: "사례관리 지식 습득도", target: "75점 이상", method: "필기시험", timing: "교육 종료 시" },
                { stage: "3단계", name: "사례관리 도구 활용률", target: "85% 이상", method: "실무 적용 보고서 검토", timing: "교육 후 1개월" },
                { stage: "4단계", name: "서비스 연계 성공률", target: "10% 향상", method: "사례관리 시스템 데이터 분석", timing: "교육 후 3개월" }
            ],
            scenarios: [
                { title: "위기 가구 발굴 및 초기 상담", description: "지역 내 위기 징후(공과금 체납, 건강보험료 체납 등) 데이터를 분석하여 지원 대상을 발굴하고, 첫 방문 상담을 통해 신뢰 관계를 형성하는 과정을 실습합니다.", details: "초기 상담 시뮬레이션에서 공감적 경청, 라포 형성 기술을 평가하고, 상담일지 작성의 충실도를 검토합니다." },
                { title: "자원 연계 및 통합사례회의", description: "발굴된 위기 가구에 필요한 공공 및 민간 자원을 연계하고, 복합적인 문제 해결을 위한 통합사례회의를 직접 주관하고 진행하는 역할을 수행합니다.", details: "모의 통합사례회의를 통해 회의록을 작성하고, 회의 진행 능력(목표 설정, 의견 조율, 역할 분담)을 종합적으로 평가합니다." }
            ]
        },
        {
            id: "dreamstart_supervisor",
            name: "드림스타트특성화과정(수퍼바이저-2단계)",
            emoji: "✨",
            styleId: 3,
            description: "드림스타트 사업의 핵심 인력인 수퍼바이저가 팀원의 전문성을 강화하고, 사업 성과를 체계적으로 관리하는 리더십과 수퍼비전 역량을 함양합니다.",
            kpis: [
                { stage: "1단계", name: "교육 내용 현업 적용도", target: "4.4점 이상", method: "5점 척도 설문", timing: "교육 후 2개월" },
                { stage: "2단계", name: "슈퍼비전 기법 이해도", target: "80점 이상", method: "사례 기반 역할극 평가", timing: "교육 중" },
                { stage: "3단계", name: "팀원 코칭 및 피드백 역량", target: "80% 이상", method: "360도 다면평가", timing: "교육 후 2개월" },
                { stage: "4단계", name: "팀 성과 개선률", target: "15% 향상", method: "팀별 성과 지표 비교 분석", timing: "교육 후 6개월" }
            ],
            scenarios: [
                { title: "저성과 팀원 대상 슈퍼비전", description: "업무에 어려움을 겪는 팀원을 대상으로 강점 기반 슈퍼비전을 제공하여, 동기를 부여하고 구체적인 역량 개발 계획을 함께 수립합니다.", details: "슈퍼비전 시뮬레이션에서 참가자의 질문 기술, 성장 촉진 피드백, 목표 설정의 구체성을 평가합니다." },
                { title: "드림스타트 사업 신규 기획", description: "지역사회 특성과 아동 수요 분석을 바탕으로 신규 프로그램을 기획하고, 예산 확보를 위한 사업계획서를 작성하여 발표합니다.", details: "사업계획서의 논리성, 실현가능성, 기대효과와 발표의 설득력을 중심으로 평가가 진행됩니다." }
            ]
        },
        {
            id: "ai_iot_health_management",
            name: "방문건강관리(AI·IoT)사업관리과정",
            emoji: "❤️‍🩹",
            styleId: 4,
            description: "AI 및 IoT 기술을 활용한 비대면 건강관리 서비스를 효과적으로 운영하고, 데이터를 기반으로 사업 성과를 분석하는 능력을 배양합니다.",
            kpis: [
                { stage: "1단계", name: "교육 만족도", target: "4.2점 이상", method: "5점 척도 설문", timing: "교육 직후" },
                { stage: "2단계", name: "AI·IoT 기술 이해도", target: "75점 이상", method: "기술 보고서 요약 및 발표", timing: "교육 중" },
                { stage: "3단계", name: "AI·IoT 도구 활용률", target: "20% 증가", method: "시스템 활용 로그 데이터 분석", timing: "교육 후 1개월" },
                { stage: "4단계", name: "대상자 건강지표 개선율", target: "15% 향상", method: "서비스 전후 건강 데이터 비교", timing: "교육 후 6개월" }
            ],
            scenarios: [
                { title: "데이터 기반 고위험군 예측", description: "IoT 기기에서 수집된 생활 습관 및 건강 데이터를 분석하여 건강 악화 가능성이 높은 고위험군을 예측하고, 우선순위에 따라 예방적 개입 계획을 수립합니다.", details: "데이터 분석 툴(예: Excel, Tableau)을 활용하여 주어진 데이터셋에서 유의미한 패턴을 발견하고, 분석 결과를 시각화하여 보고하는 능력을 평가합니다." },
                { title: "비대면 건강상담 서비스 기획", description: "화상회의 시스템과 모바일 앱을 활용한 비대면 건강상담 서비스를 기획하고, 사용자 경험(UX)을 고려한 서비스 시나리오를 설계합니다.", details: "서비스 기획안과 사용자 시나리오의 구체성, 편의성, 효과성을 평가합니다." }
            ]
        },
        {
            id: "addiction_management",
            name: "중독관리직무심화과정",
            emoji: "🧘",
            styleId: 5,
            description: "다양한 중독(알코올, 약물, 도박 등) 문제에 대한 깊이 있는 이해를 바탕으로, 근거 기반의 상담 및 치료 프로그램을 운영하는 전문성을 강화합니다.",
            kpis: [
                { stage: "1단계", name: "교육 만족도", target: "4.4점 이상", method: "5점 척도 설문", timing: "교육 직후" },
                { stage: "2단계", name: "중독 상담 기법 습득도", target: "78점 이상", method: "사례 기반 실습 평가", timing: "교육 중" },
                { stage: "3단계", name: "상담 프로그램 적용률", target: "85% 이상", method: "프로그램 운영 현황 보고서", timing: "교육 후 1개월" },
                { stage: "4단계", name: "내담자 회복 및 유지율", target: "70% 이상", method: "장기 추적 데이터 분석", timing: "교육 후 6개월" }
            ],
            scenarios: [
                { title: "동기강화상담(Motivational Interviewing) 적용", description: "변화의지가 낮은 내담자를 대상으로 동기강화상담 기법을 적용하여, 스스로 변화의 필요성을 인식하고 목표를 설정하도록 돕는 상담 과정을 실습합니다.", details: "상담 시뮬레이션에서 내담자의 양가감정을 다루고, 변화 대화를 유도하는 상담자의 역량을 평가합니다." },
                { title: "가족 중재 프로그램 운영", description: "중독자 가족을 대상으로 가족의 역할을 교육하고, 효과적인 대처 방법을 훈련하는 가족 중재 프로그램을 기획하고 모의 운영합니다.", details: "프로그램 구성의 체계성, 교육 내용의 전문성, 참가자 상호작용 촉진 능력을 평가합니다." }
            ]
        },
        {
            id: "overseas_medical_product",
            name: "해외의료상품기획전략과정",
            emoji: "✈️",
            styleId: 6,
            description: "성공적인 글로벌 의료시장 진출을 위해, 목표 국가의 문화와 규제 환경을 분석하고 경쟁력 있는 의료상품 및 서비스를 기획하는 전략적 역량을 강화합니다.",
            kpis: [
                { stage: "1단계", name: "교육 만족도", target: "4.3점 이상", method: "5점 척도 설문", timing: "교육 직후" },
                { stage: "2단계", name: "시장분석 보고서 완성도", target: "80점 이상", method: "프로젝트 기반 평가(PBL)", timing: "교육 중" },
                { stage: "3단계", name: "전략 수립 및 실행 계획의 타당성", target: "80% 이상", method: "동료 및 전문가 평가", timing: "교육 후 2개월" },
                { stage: "4단계", name: "해외진출 성과(계약 등)", target: "신규 계약 1건 이상", method: "사업 성과 보고서 분석", timing: "교육 후 1년" }
            ],
            scenarios: [
                { title: "타겟 국가 시장 분석", description: "특정 국가(예: UAE, 베트남)를 선정하여 의료 시장 규모, 경쟁 환경, 규제, 문화적 특성을 분석하고, 시장 진출 기회와 위협 요인을 도출하는 보고서를 작성합니다.", details: "보고서의 데이터 정확성, 분석의 깊이, 전략적 시사점 도출 능력을 평가합니다." },
                { title: "의료상품 현지화 전략 수립", description: "국내의 우수한 의료 기술이나 서비스를 타겟 국가에 맞게 현지화하는 전략을 수립합니다. 가격, 상품 구성, 마케팅 채널 등을 포함한 구체적인 실행 계획을 제시합니다.", details: "현지화 전략의 창의성과 실현가능성, 그리고 기대 ROI(투자수익률) 예측의 합리성을 평가합니다." }
            ]
        },
        {
            id: "international_health_consultant",
            name: "국제개발협력보건컨설턴트내사업계획하기",
            emoji: "🌍",
            styleId: 7,
            description: "국제개발협력(ODA) 보건사업의 특수성을 이해하고, 사업 발굴부터 기획, 제안서 작성, 성과 관리에 이르는 전 과정을 관리하는 PM(Project Management) 역량을 강화합니다.",
            kpis: [
                { stage: "1단계", name: "교육 만족도", target: "4.4점 이상", method: "5점 척도 설문", timing: "교육 직후" },
                { stage: "2단계", name: "사업기획서(프로젝트 제안서) 완성도", target: "85점 이상", method: "PPCM(Project Cycle Management) 기반 평가", timing: "교육 중" },
                { stage: "3단계", name: "프로젝트 관리 도구 적용률", target: "90% 이상", method: "실무 적용 보고서 검토", timing: "교육 후 1개월" },
                { stage: "4단계", name: "제안서 기반 사업 성공률(수주 등)", target: "80% 이상", method: "프로젝트 성과 추적", timing: "교육 후 1년" }
            ],
            scenarios: [
                { title: "문제분석 및 해결방안 도출", description: "개발도상국의 특정 보건 문제(예: 모자보건, 감염병)에 대해 원인-결과를 분석하는 문제나무(Problem Tree)를 작성하고, 이를 해결방안나무(Solution Tree)로 전환하여 사업 아이템을 구체화합니다.", details: "문제 분석의 논리적 타당성과 해결방안의 창의성 및 적절성을 평가합니다." },
                { title: "성과관리 프레임워크 설계", description: "선택된 사업 아이템에 대해 투입(Input), 활동(Activity), 산출물(Output), 결과(Outcome), 영향(Impact)을 포함하는 논리모델(Logic Model)을 수립하고, 각 단계별 성과지표를 설정합니다.", details: "논리모델의 인과관계 명확성 및 성과지표의 SMART 원칙 부합 여부를 평가합니다." }
            ]
        },
        {
            id: "social_service_instructor",
            name: "사회복무신규강사양성과정",
            emoji: "🧑‍🏫",
            styleId: 8,
            description: "사회복무요원 교육을 담당할 신규 강사를 대상으로, 성인학습 원리에 기반한 교수설계, 강의 기법, 학습자 상호작용 촉진 기술을 체계적으로 훈련합니다.",
            kpis: [
                { stage: "1단계", name: "교육 만족도", target: "4.5점 이상", method: "5점 척도 설문", timing: "교육 직후" },
                { stage: "2단계", name: "강의 시연 평가 점수", target: "80점 이상", method: "동료 및 전문가 관찰 평가", timing: "교육 중" },
                { stage: "3단계", name: "교수설계안 완성도", target: "85% 이상", method: "ADDIE 모형 기반 평가", timing: "교육 중" },
                { stage: "4단계", name: "담당 강의 수강생 만족도", target: "4.3점 이상", method: "강의 후 수강생 설문", timing: "강의 후" }
            ],
            scenarios: [
                { title: "모의 강의 시연 및 피드백", description: "자신이 설계한 교수설계안을 바탕으로 15분 분량의 모의 강의를 시연합니다. 동료 학습자들은 관찰 체크리스트를 기반으로 상호 피드백을 제공합니다.", details: "강의 내용 전달력, 학습자 참여 유도, 시간 관리 능력, 매체 활용 능력을 종합적으로 평가합니다." },
                { title: "문제 학습자 대응", description: "강의 중 발생할 수 있는 다양한 유형의 문제 학습자(예: 비협조적, 무기력, 공격적)에 대응하는 역할극을 수행하고, 효과적인 해결 전략을 토론합니다.", details: "상황 분석 능력, 공감적 소통 능력, 긍정적 학습 분위기 조성 능력을 중심으로 평가합니다." }
            ]
        }
    ],
    kirkpatrickStages: [{"stage": 1, "name": "반응평가", "description": "교육에 대한 참가자의 만족도와 반응을 측정", "measures": ["만족도", "유용성 인식", "학습 환경", "강사 평가"], "timing": "교육 직후", "methods": ["설문조사", "인터뷰", "관찰"]}, {"stage": 2, "name": "학습평가", "description": "지식, 기술, 태도의 변화 정도를 측정", "measures": ["지식 습득", "기술 향상", "태도 변화"], "timing": "교육 전후", "methods": ["사전-사후 테스트", "실기 평가", "포트폴리오"]}, {"stage": 3, "name": "행동평가", "description": "실제 업무에서의 행동 변화를 확인", "measures": ["업무 적용", "행동 변화", "스킬 활용"], "timing": "교육 후 1-3개월", "methods": ["현장 관찰", "상사 평가", "360도 피드백"]}, {"stage": 4, "name": "결과평가", "description": "조직 성과에 미친 최종 영향을 측정", "measures": ["성과 향상", "비용 절감", "품질 개선"], "timing": "교육 후 3-6개월", "methods": ["성과 지표 분석", "ROI 계산", "비교 분석"]}],
    smartCriteria: [{"letter": "S", "name": "Specific", "description": "구체적", "details": "명확하고 구체적인 목표를 설정하세요."}, {"letter": "M", "name": "Measurable", "description": "측정가능", "details": "수치나 데이터로 측정할 수 있어야 합니다."}, {"letter": "A", "name": "Achievable", "description": "달성가능", "details": "현실적으로 달성 가능한 수준이어야 합니다."}, {"letter": "R", "name": "Relevant", "description": "관련성", "details": "교육 목표와 조직 목표에 부합해야 합니다."}, {"letter": "T", "name": "Time-bound", "description": "시한성", "details": "명확한 달성 기한을 설정해야 합니다."}],
    scenarios: {
        1: {
            title: "신규 직원 온보딩 교육",
            description: "보건복지인재개발원에 신입 직원 50명을 대상으로 한 온보딩 교육과정의 성과기여도를 평가하는 시나리오",
            steps: [
                {
                    title: "교육목표 설정",
                    content: "신규 직원 온보딩 교육의 목표를 설정하세요. 다음 중 가장 적절한 목표를 선택하세요.",
                    type: "multiple_choice",
                    options: [
                        "신입 직원의 업무 적응도 향상",
                        "조직 문화 이해 및 소속감 증진",
                        "기본 업무 역량 습득",
                        "모든 위 항목"
                    ],
                    correct: 3,
                    explanation: "온보딩 교육은 신입 직원이 조직에 빠르게 적응하고 기본 업무 역량을 습득하며, 조직 문화를 이해하여 소속감을 가질 수 있도록 하는 종합적인 목표를 가져야 합니다."
                },
                {
                    title: "KPI 선정",
                    content: "다음 중 신규 직원 온보딩 교육에 가장 적절한 KPI를 선택하세요.",
                    type: "multiple_choice",
                    options: [
                        "교육 만족도 4.0점 이상",
                        "업무 적응 기간 단축 20%",
                        "이직률 감소 15%",
                        "모든 위 항목"
                    ],
                    correct: 3,
                    explanation: "온보딩 교육의 성공은 교육 만족도, 업무 적응 기간 단축, 이직률 감소 등 여러 지표를 종합적으로 평가해야 합니다."
                },
                {
                    title: "측정 계획 수립",
                    content: "측정 계획을 수립하세요. 다음 중 가장 적절한 측정 시점을 선택하세요.",
                    type: "multiple_choice",
                    options: [
                        "교육 직후만",
                        "교육 직후 + 1개월 후",
                        "교육 직후 + 3개월 후 + 6개월 후",
                        "교육 직후 + 1개월 후 + 3개월 후 + 6개월 후"
                    ],
                    correct: 3,
                    explanation: "온보딩 교육의 효과는 단기(교육 직후), 중기(1개월, 3개월), 장기(6개월)에 걸쳐 종합적으로 측정해야 합니다."
                },
                {
                    title: "결과 분석 및 개선방안",
                    content: "평가 결과를 바탕으로 개선방안을 도출하세요. 다음 중 가장 우선순위가 높은 개선방안은 무엇인가요?",
                    type: "multiple_choice",
                    options: [
                        "교육 시간 단축",
                        "멘토링 프로그램 강화",
                        "교육 자료 개선",
                        "실무 중심 교육 내용 확대"
                    ],
                    correct: 1,
                    explanation: "신규 직원의 성공적인 적응을 위해서는 체계적인 멘토링 프로그램이 가장 중요합니다. 이는 이론 교육과 실무 적용을 연결하는 핵심 요소입니다."
                }
            ]
        },
        2: {
            title: "리더십 역량 강화 교육",
            description: "중간관리자 30명을 대상으로 한 리더십 교육과정의 ROI를 계산하는 시나리오",
            steps: [
                {
                    title: "데이터 수집 계획",
                    content: "ROI 계산을 위한 데이터 수집 계획을 수립하세요. 다음 중 가장 중요한 데이터는 무엇인가요?",
                    type: "multiple_choice",
                    options: [
                        "교육 비용",
                        "팀 성과 향상도",
                        "직원 만족도",
                        "모든 위 항목"
                    ],
                    correct: 3,
                    explanation: "ROI 계산을 위해서는 교육 비용, 팀 성과 향상도, 직원 만족도 등 모든 관련 데이터를 종합적으로 수집해야 합니다."
                },
                {
                    title: "비용 산정",
                    content: "교육 비용을 산정하세요. 다음 중 포함되어야 할 비용은 무엇인가요?",
                    type: "multiple_choice",
                    options: [
                        "강사비만",
                        "강사비 + 교육자료비",
                        "강사비 + 교육자료비 + 운영비",
                        "강사비 + 교육자료비 + 운영비 + 참여자 시간비용"
                    ],
                    correct: 3,
                    explanation: "정확한 ROI 계산을 위해서는 강사비, 교육자료비, 운영비뿐만 아니라 참여자의 시간비용까지 포함한 총 비용을 산정해야 합니다."
                },
                {
                    title: "효과 측정",
                    content: "교육 효과를 측정하세요. 다음 중 가장 객관적인 효과 측정 방법은 무엇인가요?",
                    type: "multiple_choice",
                    options: [
                        "참여자 설문조사",
                        "상사 평가",
                        "팀 성과 지표 비교",
                        "모든 위 항목의 종합"
                    ],
                    correct: 3,
                    explanation: "교육 효과는 참여자 설문조사, 상사 평가, 팀 성과 지표 비교 등 다양한 방법을 종합하여 측정해야 객관적이고 신뢰할 수 있는 결과를 얻을 수 있습니다."
                },
                {
                    title: "ROI 해석",
                    content: "계산된 ROI를 해석하세요. ROI가 150%라면 이는 무엇을 의미하나요?",
                    type: "multiple_choice",
                    options: [
                        "교육 비용의 1.5배만큼 손실",
                        "교육 비용의 1.5배만큼 수익",
                        "교육 비용의 2.5배만큼 수익",
                        "교육 비용의 0.5배만큼 수익"
                    ],
                    correct: 2,
                    explanation: "ROI 150%는 교육 비용의 1.5배만큼 순편익이 발생했다는 의미입니다. 즉, 교육 비용의 2.5배만큼의 수익을 얻었다는 뜻입니다."
                }
            ]
        }
    }
};

const quizData = [
    {"question": "커크패트릭 4단계 평가 모델에서 1단계는 무엇인가요?", "options": ["학습평가", "반응평가", "행동평가", "결과평가"], "correct": 1, "explanation": "1단계 반응평가는 교육에 대한 참가자의 만족도와 반응을 측정하는 단계입니다. 교육 직후 실시되며 설문조사, 인터뷰, 관찰 등을 통해 측정합니다."}, 
    {"question": "SMART 원칙에서 'M'은 무엇을 의미하나요?", "options": ["Measurable (측정가능)", "Manageable (관리가능)", "Meaningful (의미있는)", "Maintainable (유지가능)"], "correct": 0, "explanation": "SMART 원칙의 'M'은 Measurable(측정가능)을 의미합니다. 목표가 수치로 측정 가능해야 하며, 구체적인 지표를 통해 성과를 확인할 수 있어야 합니다."}, 
    {"question": "교육투자수익률(ROI) 계산 공식은 무엇인가요?", "options": ["(교육 효과 + 교육 비용) ÷ 교육 비용 × 100", "(교육 효과 - 교육 비용) ÷ 교육 비용 × 100", "(교육 효과 × 교육 비용) ÷ 100", "(교육 효과 ÷ 교육 비용) × 100"], "correct": 1, "explanation": "ROI = (교육 효과 - 교육 비용) ÷ 교육 비용 × 100입니다. 교육 투자 대비 얻은 순편익을 계산하여 교육의 경제적 효과를 측정합니다."}, 
    {"question": "성과기여도 평가의 주요 목적은 무엇인가요?", "options": ["교육 비용 절감", "교육의 효과성과 효율성 확인", "참가자 수 증가", "교육 시간 단축"], "correct": 1, "explanation": "성과기여도 평가의 주요 목적은 교육의 효과성과 효율성을 확인하는 것입니다. 교육이 조직의 목표 달성과 성과 향상에 얼마나 기여하는지를 측정합니다."}, 
    {"question": "3단계 행동평가는 언제 실시하나요?", "options": ["교육 직후", "교육 전후 비교", "교육 후 1-3개월", "교육 후 6개월-1년"], "correct": 2, "explanation": "3단계 행동평가는 교육 후 1-3개월에 실시합니다. 이 시점에서 학습한 내용이 실제 업무에 적용되고 있는지를 확인할 수 있습니다."}
];

// 앱 초기화 및 진입점
document.addEventListener('DOMContentLoaded', () => {
    // 1. DOM 요소들을 찾아서 elements 객체에 할당
    elements.dashboard = document.getElementById('dashboard');
    elements.courseDetail = document.getElementById('courseDetail');
    elements.coursesContainer = document.getElementById('coursesContainer');
    elements.courseTitle = document.getElementById('courseTitle');
    elements.courseDescription = document.getElementById('courseDescription');
    elements.stageContent = document.getElementById('stageContent');
    elements.kpiList = document.getElementById('kpiList');
    elements.smartCriteria = document.getElementById('smartCriteria');
    elements.roiResult = document.getElementById('roiResult');
    elements.reportContent = document.getElementById('reportContent');
    elements.guideModal = document.getElementById('guideModal');
    elements.totalCourses = document.getElementById('totalCourses');
    elements.evaluatedCourses = document.getElementById('evaluatedCourses');
    elements.inProgressCourses = document.getElementById('inProgressCourses');
    elements.backToDashboardBtn = document.getElementById('backToDashboard');
    elements.closeGuideBtn = document.getElementById('closeGuide');
    elements.navTabs = document.querySelectorAll('.nav-tab');
    elements.tabContents = document.querySelectorAll('.tab-content');
    elements.practiceTabBtns = document.querySelectorAll('#courseDetail .tab-btn');
    elements.practiceTabContents = document.querySelectorAll('#courseDetail .tab-content');
    elements.newKpiForm = document.getElementById('newKpiForm');
    elements.calculateRoiBtn = document.getElementById('calculateRoi');
    elements.generateReportBtn = document.getElementById('generateReport');
    elements.completeKpiBtn = document.getElementById('completeKpiBtn');
    elements.completeRoiBtn = document.getElementById('completeRoiBtn');
    
    // 2. 앱 초기화
    initializeApp();
    
    // 3. 전역 함수로 등록
    window.openKpiTool = openKpiTool;
    window.openRoiCalculator = openRoiCalculator;
    window.openPracticeModule = openPracticeModule;
    window.openReportGenerator = openReportGenerator;
    window.closeAllToolSections = closeAllToolSections;
    window.startScenario = startScenario;
    window.nextStep = nextStep;
    window.previousStep = previousStep;
    window.exitScenario = exitScenario;
    window.calculateROI = calculateROI;
    window.selectScenarioOption = selectScenarioOption;
    window.showManagementMain = showManagementMain;
    window.calculateToolROI = calculateToolROI;
    window.createKPI = createKPI;
    window.downloadKPI = downloadKPI;
    window.resetKpiForm = resetKpiForm;
    window.downloadPDF = downloadPDF;
});

// 앱 초기화 함수
function initializeApp() {
    // 3. 이벤트 리스너 바인딩
    bindEvents();
    
    // 4. 초기 화면 렌더링
    renderTheoryCourseCards();
    renderCourseExamples();
    renderCourses();
    renderSmartCriteria();
    updateDashboardStats();
    showDashboard();
    
    initLearningFeatures();
}

// 이벤트 리스너 바인딩 함수
function bindEvents() {
    document.querySelectorAll('.nav-tab').forEach(button => {
        button.addEventListener('click', () => {
            switchTab(button.dataset.tab);
        });
    });

    document.querySelectorAll('.learning-nav-btn').forEach(button => {
        button.addEventListener('click', () => {
            const sectionId = button.dataset.section;
            document.querySelectorAll('.learning-section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(sectionId).classList.add('active');

            document.querySelectorAll('.learning-nav-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
        });
    });

    const backToDashboardBtn = document.getElementById('backToDashboard');
    if (backToDashboardBtn) {
        backToDashboardBtn.addEventListener('click', showDashboard);
    }

    // 완료 및 다음 단계로 버튼 이벤트 리스너 추가
    if (elements.completeKpiBtn) {
        elements.completeKpiBtn.addEventListener('click', completeKpiStep);
    }
    
    if (elements.completeRoiBtn) {
        elements.completeRoiBtn.addEventListener('click', completeRoiStep);
    }

    // KPI 도구 탭 이벤트 리스너
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('kpi-nav-tab')) {
            const tabName = e.target.dataset.tab;
            document.querySelectorAll('.kpi-nav-tab').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.kpi-tab-content').forEach(content => content.classList.remove('active'));
            
            e.target.classList.add('active');
            document.getElementById(tabName).classList.add('active');
        }
    });

    // KPI 생성 폼 제출 이벤트
    const kpiForm = document.querySelector('.kpi-generator-form');
    if (kpiForm) {
        kpiForm.addEventListener('submit', function(e) {
            e.preventDefault();
            createKPI();
        });
    }

    // ROI 계산 버튼 이벤트 (이벤트 위임 사용)
    document.addEventListener('click', function(e) {
        console.log('클릭된 요소:', e.target);
        console.log('클릭된 요소 ID:', e.target.id);
        console.log('클릭된 요소 클래스:', e.target.className);
        
        // 실습 탭의 ROI 계산 버튼
        if (e.target.id === 'calculateRoi' || e.target.classList.contains('roi-calculate-btn')) {
            console.log('ROI 계산 버튼 클릭됨');
            e.preventDefault();
            e.stopPropagation();
            
            // 중복 호출 방지
            if (e.target.dataset.processing === 'true') {
                console.log('이미 처리 중입니다.');
                return;
            }
            
            e.target.dataset.processing = 'true';
            
            // 실제 ROI 계산 함수 호출
            try {
                // 상세 비용 입력값들 가져오기
                const costInstructor = parseFloat(document.getElementById('cost-instructor')?.value) || 0;
                const costMaterials = parseFloat(document.getElementById('cost-materials')?.value) || 0;
                const costOperation = parseFloat(document.getElementById('cost-operation')?.value) || 0;
                const costParticipant = parseFloat(document.getElementById('cost-participant')?.value) || 0;
                
                // 상세 편익 입력값들 가져오기
                const benefitProductivity = parseFloat(document.getElementById('benefit-productivity')?.value) || 0;
                const benefitQuality = parseFloat(document.getElementById('benefit-quality')?.value) || 0;
                const benefitSaving = parseFloat(document.getElementById('benefit-saving')?.value) || 0;
                const benefitOther = parseFloat(document.getElementById('benefit-other')?.value) || 0;
                
                // 기존 단순 입력값들도 확인 (하위 호환성)
                const simpleCost = parseFloat(document.getElementById('trainingCost')?.value) || 0;
                const simpleBenefit = parseFloat(document.getElementById('trainingBenefit')?.value) || 0;
                
                // 총 비용과 총 편익 계산
                const totalCost = costInstructor + costMaterials + costOperation + costParticipant + simpleCost;
                const totalBenefit = benefitProductivity + benefitQuality + benefitSaving + benefitOther + simpleBenefit;
                
                console.log('입력값들:', {
                    costInstructor, costMaterials, costOperation, costParticipant,
                    benefitProductivity, benefitQuality, benefitSaving, benefitOther,
                    simpleCost, simpleBenefit,
                    totalCost, totalBenefit
                });
                
                // 입력값 검증
                if (totalCost <= 0) {
                    alert('총 교육 비용은 0보다 커야 합니다. 비용 입력값을 확인해주세요.');
                    return;
                }
                
                // ROI 계산: (총편익 - 총비용) / 총비용 * 100
                const roi = ((totalBenefit - totalCost) / totalCost) * 100;
                const netBenefit = totalBenefit - totalCost;
                const paybackPeriod = totalCost > 0 ? (totalCost / (totalBenefit / 12)).toFixed(1) : 0;
                
                console.log('계산 결과:', {
                    roi: roi.toFixed(1) + '%',
                    netBenefit: netBenefit.toLocaleString() + '원',
                    paybackPeriod: paybackPeriod + '개월'
                });
                
                // 결과를 DOM 요소에 표시
                const netBenefitElement = document.getElementById('net-benefit');
                const roiPercentageElement = document.getElementById('roi-percentage');
                const paybackPeriodElement = document.getElementById('payback-period');
                
                // 기존 결과 요소들도 업데이트 (하위 호환성)
                const totalCostElement = document.getElementById('totalCost');
                const totalBenefitElement = document.getElementById('totalBenefit');
                const roiValueElement = document.getElementById('roiValue');
                
                // 새로운 결과 요소들 업데이트
                if (netBenefitElement) {
                    netBenefitElement.textContent = netBenefit.toLocaleString();
                }
                if (roiPercentageElement) {
                    roiPercentageElement.textContent = roi.toFixed(1);
                }
                if (paybackPeriodElement) {
                    paybackPeriodElement.textContent = paybackPeriod;
                }
                
                // 기존 결과 요소들 업데이트 (하위 호환성)
                if (totalCostElement) {
                    totalCostElement.textContent = `${totalCost.toLocaleString()}원`;
                }
                if (totalBenefitElement) {
                    totalBenefitElement.textContent = `${totalBenefit.toLocaleString()}원`;
                }
                if (roiValueElement) {
                    roiValueElement.textContent = `${roi.toFixed(1)}%`;
                }
                
                // ROI 해석 표시
                const interpretationEl = document.getElementById('roiInterpretation');
                if (interpretationEl) {
                    if (roi > 0) {
                        interpretationEl.innerHTML = `<strong>해석:</strong> 투자한 비용 대비 <strong>${roi.toFixed(1)}%</strong>의 긍정적인 수익을 창출했습니다. 성공적인 교육 투자로 평가됩니다.`;
                    } else if (roi === 0) {
                        interpretationEl.innerHTML = `<strong>해석:</strong> 투자한 비용과 수익이 동일하여 손익분기점에 도달했습니다.`;
                    } else {
                        interpretationEl.innerHTML = `<strong>해석:</strong> 투자한 비용보다 낮은 수익을 기록했습니다. 교육의 효과성 또는 비용 구조를 재검토할 필요가 있습니다.`;
                    }
                }
                
                // 결과 컨테이너 표시
                const resultContainer = document.getElementById('roiResult');
                if (resultContainer) {
                    resultContainer.classList.remove('hidden');
                }
                
                console.log('ROI 계산 완료');
                
            } catch (error) {
                console.error('ROI 계산 중 오류 발생:', error);
                alert('ROI 계산 중 오류가 발생했습니다. 입력값을 확인해주세요.');
            } finally {
                // 처리 완료 표시 제거
                e.target.dataset.processing = 'false';
            }
        }
        
        // 도구 섹션의 ROI 계산 버튼
        if (e.target.id === 'tool-calculate-roi-btn') {
            console.log('도구 ROI 계산 버튼 클릭됨');
            e.preventDefault();
            e.stopPropagation();
            calculateToolROI();
        }
    });

    // 실습 탭의 탭 버튼 이벤트 리스너
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('tab-btn') && e.target.closest('#courseDetail')) {
            const tabName = e.target.dataset.tab;
            switchPracticeTab(tabName);
        }
    });

    // KPI 폼 제출 이벤트
    const newKpiForm = document.getElementById('newKpiForm');
    if (newKpiForm) {
        newKpiForm.addEventListener('submit', handleAddKpi);
    }

    // 보고서 생성 버튼 이벤트
    const generateReportBtn = document.getElementById('generateReport');
    if (generateReportBtn) {
        generateReportBtn.addEventListener('click', generatePracticeReport);
    }
}

// ---- 렌더링 함수 ----

// 이론 학습 카드 렌더링
function renderTheoryCourseCards() {
    const grid = document.getElementById('theory-courses-grid');
    if (!grid) return;
    grid.innerHTML = appData.courses.map(course => `
        <div class="card course-card" data-style-id="${course.styleId || 1}">
            <div class="card__body">
                <div class="course-header">
                    <span class="course-emoji">${course.emoji || '📄'}</span>
                    <h4>${course.name}</h4>
                </div>
                <p>${course.description}</p>
            </div>
        </div>
    `).join('');
}

// 과정별 예시 렌더링
function renderCourseExamples() {
    const container = document.getElementById('course-examples-container');
    if (container) {
        container.innerHTML = generateCourseExamples();
    }
}

// 과정별 예시 HTML 생성
function generateCourseExamples() {
    return appData.courses.map(course => `
        <div class="course-example">
            <div class="course-example-header">
                <h3><span class="course-emoji">${course.emoji || '📄'}</span> ${course.name}</h3>
            </div>
            <div class="course-example-content">
                <p><strong>과정 목표:</strong> ${course.description}</p>
                
                <h4>주요 성과 지표 (KPI)</h4>
                <div class="kpi-examples">
                    ${course.kpis.map(kpi => `
                        <div class="kpi-example">
                            <h5>${kpi.name}</h5>
                            <p><strong>목표:</strong> ${kpi.target}</p>
                            <p><small><strong>측정 방법:</strong> ${kpi.method} | <strong>측정 시기:</strong> ${kpi.timing}</small></p>
                        </div>
                    `).join('')}
                </div>

                <h4>주요 평가 시나리오</h4>
                <div class="scenarios-list">
                    ${(course.scenarios || []).map((scenario, index) => `
                        <div class="scenario-item">
                            <h6>${index + 1}. ${scenario.title}</h6>
                            <p>${scenario.description}</p>
                            <p><strong>세부 평가 내용:</strong> ${scenario.details}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// 실습 과정 카드 렌더링
function renderCourses() {
    if (!elements.coursesContainer) return;
    elements.coursesContainer.innerHTML = '';
    elements.coursesContainer.className = 'courses-container grid grid--2';
    appData.courses.forEach(course => {
        const courseCard = createCourseCard(course);
        elements.coursesContainer.appendChild(courseCard);
    });
}

// SMART 원칙 렌더링
function renderSmartCriteria() {
    if (!elements.smartCriteria) return;
    elements.smartCriteria.className = 'smart-criteria smart-grid';
    elements.smartCriteria.innerHTML = appData.smartCriteria.map(c => `
        <div class="smart-item">
            <h3>${c.letter} - ${c.name}</h3>
            <p>${c.description}</p>
            <span>${c.details}</span>
        </div>
    `).join('');
}

// ---- 핵심 로직 함수 ----

function switchTab(tabName) {
    currentTab = tabName;
    elements.tabContents.forEach(content => {
        content.classList.toggle('active', content.id === tabName);
    });
    elements.navTabs.forEach(tab => {
        tab.classList.toggle('active', tab.dataset.tab === tabName);
    });
}

function showDashboard() {
    if (elements.dashboard) elements.dashboard.classList.remove('hidden');
    if (elements.courseDetail) elements.courseDetail.classList.add('hidden');
    renderCourses(); // Re-render cards to show updated progress
}

// 교육과정 카드 생성 (실습용)
function createCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'card course-card';
    card.dataset.courseId = course.id;
    card.dataset.styleId = course.styleId;

    const progress = appState.courseProgress[course.id] || 0;
    const status = progress === 100 ? 'completed' : progress > 0 ? 'in-progress' : 'not-started';
    card.dataset.status = status;

    const statusText = status === 'completed' ? '완료' : status === 'in-progress' ? '진행중' : '시작 전';
    const statusClass = status === 'completed' ? 'success' : status === 'in-progress' ? 'warning' : 'info';
    const buttonText = status === 'completed' ? '결과 보기' : progress > 0 ? '이어서 평가' : '평가 시작';

    card.innerHTML = `
        <div class="card__body">
            <div class="course-card__header-flex">
                <div class="course-header">
                    <span class="course-emoji">${course.emoji || '📄'}</span>
                    <h4 class="course-card__title">${course.name}</h4>
                </div>
                <div class="course-card__status">
                    <span class="status status--${statusClass}">${statusText}</span>
                </div>
            </div>
            
            <p class="course-card__description">${course.description}</p>
            
            <div class="card-bottom">
              <div class="progress-section">
                <div class="progress-bar-container">
                  <div class="progress-bar" style="width: ${progress}%"></div>
                </div>
                <div class="progress-text">진행률: ${progress}%</div>
              </div>
              <button class="action-button">${buttonText}</button>
            </div>
        </div>
    `;

    const button = card.querySelector('.action-button');
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        showCourseDetail(course);
        if (status === 'completed') {
            switchPracticeTab('report');
        }
    });

    card.addEventListener('click', () => {
        showCourseDetail(course);
    });

    return card;
}

function showCourseDetail(course) {
    appState.currentCourse = course;
    if(elements.courseTitle) elements.courseTitle.textContent = course.name;
    if(elements.courseDescription) elements.courseDescription.textContent = course.description;
    
    // Reset and initialize state for the new course
    appState.unlockedTabs = ['kpi']; 
    
    if(elements.dashboard) elements.dashboard.classList.add('hidden');
    if(elements.courseDetail) elements.courseDetail.classList.remove('hidden');
    
    updateTabLocks();
    renderKpiList();
    // Default to KPI tab instead of evaluation
    switchPracticeTab('kpi'); 
}

function switchPracticeTab(tabName) {
    console.log('실습 탭 전환:', tabName);
    
    elements.practiceTabBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    elements.practiceTabContents.forEach(content => {
        if (content.closest('#courseDetail')) {
            content.classList.toggle('active', content.id === tabName);
        }
    });
    
    // 탭별 특별 처리
    if (tabName === 'evaluation') {
        switchStage(appState.currentStage);
    } else if (tabName === 'kpi') {
        renderKpiList();
    } else if (tabName === 'roi') {
        // ROI 탭 전환 시 로그만 출력 (이벤트 위임으로 처리됨)
        console.log('ROI 탭으로 전환됨');
    } else if (tabName === 'report') {
        generatePracticeReport();
    }
}

function switchStage(stage) {
    appState.currentStage = stage;
    document.querySelectorAll('.stage-step').forEach(step => {
        const stepNum = parseInt(step.dataset.stage);
        step.classList.toggle('active', stepNum === stage);
        step.classList.toggle('completed', stepNum < stage && appState.evaluationData[appState.currentCourse.id]?.[stepNum]);
    });
    renderStageContent(stage);
}


function renderStageContent(stage) {
    if (!elements.stageContent) return;
    const stageInfo = appData.kirkpatrickStages.find(s => s.stage === stage);
    const courseKpi = appState.currentCourse.kpis.find(k => k.stage === `${stage}단계`) || {};

    elements.stageContent.innerHTML = `
        <div class="stage-form">
            <h4>${stage}단계: ${stageInfo.name}</h4>
            <p>${stageInfo.description}</p>
            <div class="kpi-item">
                <div class="kpi-item__name">${courseKpi.name}</div>
                <div><strong>목표:</strong> ${courseKpi.target} | <strong>방법:</strong> ${courseKpi.method} | <strong>시기:</strong> ${courseKpi.timing}</div>
            </div>
            <div class="form-group"><label class="form-label">실제 달성값</label><input type="text" class="form-control" id="actualValue" placeholder="실제 달성값 입력"></div>
            <div class="form-group"><label class="form-label">평가 의견</label><textarea class="form-control" id="evaluationComment" rows="3" placeholder="의견 입력"></textarea></div>
            <div class="form-actions">
                <button class="btn btn--outline" id="prevStage" ${stage === 1 ? 'disabled' : ''}>이전 단계</button>
                <button class="btn btn--secondary" id="saveStage">임시 저장</button>
                <button class="btn btn--primary" id="nextStage">${stage === 4 ? '평가 완료' : '다음 단계'}</button>
            </div>
        </div>
    `;

    loadStageData(stage);

    document.getElementById('prevStage').addEventListener('click', () => stage > 1 && switchStage(stage - 1));
    document.getElementById('nextStage').addEventListener('click', () => {
        saveStageData(stage);
        if (stage < 4) switchStage(stage + 1);
        else completeEvaluation();
    });
    document.getElementById('saveStage').addEventListener('click', () => {
        saveStageData(stage);
        alert('임시 저장되었습니다.');
    });
}

function loadStageData(stage) {
    const data = appState.evaluationData[appState.currentCourse.id]?.[stage];
    if (data) {
        document.getElementById('actualValue').value = data.actualValue || '';
        document.getElementById('evaluationComment').value = data.comment || '';
    }
}

function saveStageData(stage) {
    const courseId = appState.currentCourse.id;
    if (!appState.evaluationData[courseId]) appState.evaluationData[courseId] = {};
    appState.evaluationData[courseId][stage] = {
        actualValue: document.getElementById('actualValue').value,
        comment: document.getElementById('evaluationComment').value,
        timestamp: new Date().toISOString()
    };
    // The old progress update is removed as it's now handled by main step completion.
}

function updateCourseProgress(courseId) {
    const stageCount = Object.keys(appState.evaluationData[courseId] || {}).length;
    appState.courseProgress[courseId] = Math.round((stageCount / 4) * 100);
}

function completeEvaluation() {
    alert('모든 단계의 평가가 완료되었습니다! 보고서 탭에서 결과를 확인하세요.');
    appState.courseProgress[appState.currentCourse.id] = 100; // Set progress to 100%
    
    // Unlock the report tab
    if (!appState.unlockedTabs.includes('report')) {
        appState.unlockedTabs.push('report');
        updateTabLocks();
    }
    
    updateDashboardStats();
    switchPracticeTab('report');
}

function renderKpiList() {
    if (!elements.kpiList) return;
    const course = appState.currentCourse;
    if (!course) return;

    elements.kpiList.innerHTML = '';
    elements.kpiList.className = 'kpi-list grid';

    let allKpis = [...course.kpis, ...(appState.customKpis[course.id] || [])];
    
    // Sort all KPIs by stage number
    allKpis.sort((a, b) => {
        const stageNumA = parseInt(a.stage.charAt(0), 10);
        const stageNumB = parseInt(b.stage.charAt(0), 10);
        return stageNumA - stageNumB;
    });
    
    if (allKpis.length > 0) {
        // Dynamically set columns to prevent wrapping and ensure a single row
        elements.kpiList.style.gridTemplateColumns = `repeat(${allKpis.length}, 1fr)`;
        allKpis.forEach(kpi => {
            // Use the isCustom flag to determine if a KPI is custom, which is reliable after sorting
            const isCustom = !!kpi.isCustom;
            elements.kpiList.appendChild(createKpiElement(kpi, isCustom));
        });
    } else {
        // Handle case with no KPIs
        elements.kpiList.style.gridTemplateColumns = '1fr';
        elements.kpiList.innerHTML = `<p class="empty-list-message">설정된 KPI가 없습니다. 아래 양식을 사용하여 새 KPI를 추가하세요.</p>`;
    }
}

function createKpiElement(kpi, isCustom = false) {
    const kpiCard = document.createElement('div');
    const stageNum = parseInt(kpi.stage.charAt(0), 10);
    
    kpiCard.className = 'card kpi-card';
    if(isCustom) kpiCard.classList.add('custom');
    kpiCard.dataset.stage = stageNum;

    const canBeEdited = !isCustom && stageNum >= 2;
    const actionsHtml = `
        <div class="kpi-card__actions">
            ${isCustom ? `<button class="btn btn--danger btn--sm remove-kpi-btn">&times; 삭제</button>` : ''}
            ${canBeEdited ? `<button class="btn btn--outline btn--sm edit-kpi-btn">수정</button>` : ''}
        </div>
    `;

    kpiCard.innerHTML = `
        <div class="card__body">
            <div class="kpi-card__header">
                <span class="kpi-card__stage">${kpi.stage}</span>
                <h5 class="kpi-card__name">${kpi.name}</h5>
            </div>
            <div class="kpi-card__details">
                <p><strong>목표:</strong> ${kpi.target}</p>
                <p><strong>방법:</strong> ${kpi.method}</p>
                <p><strong>시기:</strong> ${kpi.timing}</p>
            </div>
            ${isCustom || canBeEdited ? actionsHtml : ''}
        </div>
    `;

    if (isCustom) {
        kpiCard.querySelector('.remove-kpi-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            removeCustomKpi(kpi);
        });
    }

    if (canBeEdited) {
        kpiCard.querySelector('.edit-kpi-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            openKpiEditForm(kpi, e.currentTarget);
        });
    }
    
    return kpiCard;
}

function openKpiEditForm(kpi, buttonElement) {
    const editContainer = document.getElementById('kpiEditContainer');
    
    // Deactivate any other active button
    document.querySelectorAll('.edit-kpi-btn.active').forEach(b => b.classList.remove('active'));
    
    // If the form for this KPI is already open, close it and return
    if (editContainer.dataset.editingFor === kpi.name && !editContainer.classList.contains('hidden')) {
        editContainer.classList.add('hidden');
        return;
    }
    
    buttonElement.classList.add('active');

    editContainer.innerHTML = createKpiEditFormHtml(kpi);
    editContainer.dataset.editingFor = kpi.name;
    editContainer.classList.remove('hidden');

    editContainer.querySelector('.apply-kpi-changes-btn').addEventListener('click', () => {
        const originalKpi = appState.currentCourse.kpis.find(k => k.stage === kpi.stage);
        if (originalKpi) {
            originalKpi.name = editContainer.querySelector('#edit-kpi-name').value;
            originalKpi.target = editContainer.querySelector('#edit-kpi-target').value;
            originalKpi.method = editContainer.querySelector('#edit-kpi-method').value;
            originalKpi.timing = editContainer.querySelector('#edit-kpi-timing').value;
        }
        renderKpiList();
        editContainer.classList.add('hidden');
    });

    editContainer.querySelector('.cancel-kpi-changes-btn').addEventListener('click', () => {
        editContainer.classList.add('hidden');
        buttonElement.classList.remove('active');
    });
}

function createKpiEditFormHtml(kpi) {
    return `
        <div class="card kpi-edit-card" data-stage="${kpi.stage.charAt(0)}">
            <div class="card__body">
                <div class="form-group">
                    <label class="form-label">제목</label>
                    <input type="text" class="form-control" id="edit-kpi-name" value="${kpi.name}">
                </div>
                <div class="form-group">
                    <label class="form-label">목표</label>
                    <input type="text" class="form-control" id="edit-kpi-target" value="${kpi.target}">
                </div>
                <div class="form-group">
                    <label class="form-label">방법</label>
                    <input type="text" class="form-control" id="edit-kpi-method" value="${kpi.method}">
                </div>
                <div class="form-group">
                    <label class="form-label">시기</label>
                    <input type="text" class="form-control" id="edit-kpi-timing" value="${kpi.timing}">
                </div>
                <div class="form-actions">
                    <button class="btn btn--outline cancel-kpi-changes-btn">취소</button>
                    <button class="btn btn--primary apply-kpi-changes-btn">적용</button>
                </div>
            </div>
        </div>
    `;
}

function handleAddKpi(e) {
    e.preventDefault();
    const courseId = appState.currentCourse.id;
    if (!appState.customKpis[courseId]) {
        appState.customKpis[courseId] = [];
    }
    
    const newKpi = {
        stage: document.getElementById('kpiStage').value,
        name: document.getElementById('kpiName').value,
        target: document.getElementById('kpiTarget').value,
        method: document.getElementById('kpiMethod').value,
        timing: document.getElementById('kpiTiming').value,
        isCustom: true // Mark as custom
    };
    
    // Simple validation
    if (!newKpi.stage || !newKpi.name || !newKpi.target) {
        alert('평가 단계, KPI 명, 목표치는 필수 항목입니다.');
        return;
    }

    appState.customKpis[courseId].push(newKpi);
    renderKpiList(); // This will re-render with the new, sorted list
    e.target.reset();
}

function removeCustomKpi(kpiToRemove) {
    const courseId = appState.currentCourse.id;
    appState.customKpis[courseId] = appState.customKpis[courseId].filter(kpi => kpi.name !== kpiToRemove.name);
    renderKpiList();
    alert('KPI가 삭제되었습니다.');
}

function generatePracticeReport() {
    if (!elements.reportContent || !appState.currentCourse) return;

    const course = appState.currentCourse;
    const courseId = course.id;
    const evaluation = appState.evaluationData[courseId] || {};
    const progress = appState.courseProgress[courseId] || 0;

    if (progress < 100) {
        alert(`평가가 아직 완료되지 않았습니다. (현재 진행률: ${progress}%)\n모든 평가 단계를 완료해야 최종 보고서를 생성할 수 있습니다.`);
        return;
    }

    // --- Report Generation Logic ---
    let stageHtml = '';
    appData.kirkpatrickStages.forEach(stageInfo => {
        const stageData = evaluation[stageInfo.stage] || {};
        const kpiData = course.kpis.find(k => k.stage === `${stageInfo.stage}단계`) || {};
        stageHtml += `
            <div class="report-stage-card">
                <div class="report-stage-card__header">${stageInfo.stage}단계: ${stageInfo.name}</div>
                <div class="report-stage-card__body">
                    <p class="kpi-info"><strong>KPI:</strong> ${kpiData.name || 'N/A'}</p>
                    <div class="report-metrics">
                        <div class="metric-item"><strong>목표</strong><span>${kpiData.target || 'N/A'}</span></div>
                        <div class="metric-item"><strong>결과</strong><span>${stageData.actualValue || '미입력'}</span></div>
                    </div>
                    <div class="comment-section">
                        <strong>종합 의견:</strong>
                        <p>${stageData.comment || '입력된 의견이 없습니다.'}</p>
                    </div>
                </div>
            </div>
        `;
    });

    const cost = parseFloat(document.getElementById('trainingCost').value) || 0;
    const benefit = parseFloat(document.getElementById('trainingBenefit').value) || 0;
    const roi = cost > 0 ? (((benefit - cost) / cost) * 100).toFixed(1) : "N/A";

    elements.reportContent.innerHTML = `
        <div class="report-container">
            <div class="report-final-header">
                <h3>성과기여도 최종 평가 보고서: ${course.name}</h3>
                <div class="report-actions">
                    <button class="btn btn--secondary btn--sm">인쇄하기</button>
                    <button class="btn btn--primary btn--sm">PDF로 내보내기</button>
                </div>
            </div>
            
            ${stageHtml}

            <div class="report-stage-card">
                <div class="report-stage-card__header">ROI 분석 결과</div>
                <div class="report-stage-card__body">
                    <div class="report-metrics">
                        <div class="metric-item"><strong>총 교육 비용</strong><span>${cost.toLocaleString()}원</span></div>
                        <div class="metric-item"><strong>교육 총 편익</strong><span>${benefit.toLocaleString()}원</span></div>
                        <div class="metric-item"><strong>ROI</strong><span class="roi-value ${roi > 0 ? 'success' : 'danger'}">${roi}%</span></div>
                    </div>
                </div>
            </div>

            <div class="report-stage-card">
                 <div class="report-stage-card__header">최종 권고 사항</div>
                 <div class="report-stage-card__body">
                    <p><strong>${course.name}</strong> 과정에 대한 종합 평가가 완료되었습니다. 각 단계별 결과와 ROI 분석을 바탕으로, 본 교육 과정의 효과성을 판단하고 향후 개선 방향을 수립하는 것을 권고합니다. 상세 내용은 상단의 단계별 분석을 참고하십시오.</p>
                 </div>
            </div>
        </div>
    `;

    // Add event listeners to the newly created buttons
    const printBtn = elements.reportContent.querySelector('.report-actions .btn--secondary');
    const pdfBtn = elements.reportContent.querySelector('.report-actions .btn--primary');
    
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }

    if (pdfBtn) {
        pdfBtn.addEventListener('click', () => {
            const reportContainer = elements.reportContent.querySelector('.report-container');
            const options = {
                margin:       1,
                filename:     `${course.name}_성과기여도_보고서.pdf`,
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2, useCORS: true },
                jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
            };
            html2pdf().set(options).from(reportContainer).save();
        });
    }
}

function updateDashboardStats() {
    if (!elements.totalCourses) return;
    const total = appData.courses.length;
    const completed = Object.values(appState.courseProgress).filter(p => p === 100).length;
    const inProgress = Object.values(appState.courseProgress).filter(p => p > 0 && p < 100).length;
    elements.totalCourses.textContent = total;
    elements.evaluatedCourses.textContent = completed;
    elements.inProgressCourses.textContent = inProgress;
}

// ---- 이론 학습 관련 기능 ----

function initLearningFeatures() {
    // 이론 학습 탭의 하위 네비게이션
    document.querySelectorAll('.learning-nav-btn').forEach(button => {
        button.addEventListener('click', () => {
            const targetSectionId = button.dataset.section;
            document.querySelectorAll('.learning-nav-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            document.querySelectorAll('.learning-section').forEach(section => {
                section.classList.toggle('active', section.id === targetSectionId);
            });
        });
    });

    // 이론 학습 KPI 시뮬레이터 과정 선택
    const theoryCourseSelect = document.getElementById('theory-course-select');
    if (theoryCourseSelect) {
        // Populate dropdown
        appData.courses.forEach(course => {
            theoryCourseSelect.add(new Option(course.name, course.id));
        });
        theoryCourseSelect.addEventListener('change', function() {
            const selectedId = this.value;
            const kpiTemplate = document.getElementById('kpi-template');
            const kpiExamples = document.getElementById('kpi-examples');
            if (selectedId) {
                const selectedCourse = appData.courses.find(course => course.id === selectedId);
                if (selectedCourse) {
                    kpiExamples.innerHTML = selectedCourse.kpis.map(kpi => 
                        `<div class="kpi-example">
                           <h4>${kpi.name}</h4>
                           <p><strong>목표:</strong> ${kpi.target}</p>
                           <p><small><strong>측정 방법:</strong> ${kpi.method} | <strong>측정 시기:</strong> ${kpi.timing}</small></p>
                         </div>`
                    ).join('');
                    kpiTemplate.classList.remove('hidden');
                }
            } else {
                kpiTemplate.classList.add('hidden');
            }
        });
    }

    // 이론 학습 ROI 계산
    const calculateTheoryRoiBtn = document.getElementById('calculate-theory-roi');
    if (calculateTheoryRoiBtn) {
        calculateTheoryRoiBtn.addEventListener('click', () => {
            const cost = parseFloat(document.getElementById('theory-training-cost').value) || 0;
            const benefit = parseFloat(document.getElementById('theory-training-benefit').value) || 0;
            const resultDiv = document.getElementById('theory-roi-result');
            
            if (cost > 0) {
                const roi = ((benefit - cost) / cost) * 100;
                document.getElementById('theory-roi-value').textContent = `${roi.toFixed(1)}%`;
                document.getElementById('theory-roi-interpretation').textContent = `교육 투자 대비 ${roi.toFixed(1)}%의 수익률을 달성했습니다.`;
                resultDiv.classList.remove('hidden');
            }
        });
    }
    
    // 퀴즈 초기화
    initQuiz();
}

// 퀴즈 관련 함수들
function initQuiz() {
    currentQuiz = 0;
    quizAnswers = [];
    
    // quizActions를 다시 표시
    const quizActions = document.getElementById('quizActions');
    if (quizActions) {
        quizActions.style.display = 'flex';
    }
    
    updateQuizProgress();
    displayQuestion();
}

function displayQuestion() {
    const quizContent = document.getElementById('quizContent');
    const question = quizData[currentQuiz];
    
    quizContent.innerHTML = `
        <div class="quiz-question">
            <h3>${question.question}</h3>
            <div class="quiz-options">
                ${question.options.map((option, index) => `
                    <div class="quiz-option" onclick="selectAnswer(${index})">
                        ${option}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    updateQuizButtons();
}

function selectAnswer(answerIndex) {
    // 기존 선택 제거
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // 새 선택 추가
    document.querySelectorAll('.quiz-option')[answerIndex].classList.add('selected');
    
    // 답안 저장
    quizAnswers[currentQuiz] = answerIndex;
}

function nextQuestion() {
    if (quizAnswers[currentQuiz] === undefined) {
        alert('답을 선택해주세요.');
        return;
    }
    
    if (currentQuiz < quizData.length - 1) {
        currentQuiz++;
        updateQuizProgress();
        displayQuestion();
    } else {
        showQuizResult();
    }
}

function previousQuestion() {
    if (currentQuiz > 0) {
        currentQuiz--;
        updateQuizProgress();
        displayQuestion();
    }
}

function updateQuizProgress() {
    document.getElementById('currentQuestion').textContent = currentQuiz + 1;
    document.getElementById('totalQuestions').textContent = quizData.length;
    
    const progress = ((currentQuiz + 1) / quizData.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
}

function updateQuizButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.style.display = currentQuiz > 0 ? 'block' : 'none';
    nextBtn.textContent = currentQuiz === quizData.length - 1 ? '결과 보기' : '다음';
}

function showQuizResult() {
    let correctCount = 0;
    
    quizAnswers.forEach((answer, index) => {
        if (answer === quizData[index].correct) {
            correctCount++;
        }
    });
    
    const score = Math.round((correctCount / quizData.length) * 100);
    
    const quizContent = document.getElementById('quizContent');
    quizContent.innerHTML = `
        <div class="quiz-result">
            <h4>퀴즈 완료!</h4>
            <div class="score-value">${score}점</div>
            <p>${correctCount}/${quizData.length} 문제를 맞혔습니다.</p>
            
            <div class="quiz-feedback">
                ${quizData.map((question, index) => `
                    <div class="result-item ${quizAnswers[index] === question.correct ? 'correct' : 'incorrect'}">
                        <h5>문제 ${index + 1}: ${question.question}</h5>
                        <p><strong>내 답변:</strong> ${question.options[quizAnswers[index]]}</p>
                        <p><strong>정답:</strong> ${question.options[question.correct]}</p>
                        <p><strong>설명:</strong> ${question.explanation}</p>
                    </div>
                `).join('')}
            </div>
            
            <button class="btn btn--primary" onclick="initQuiz()">다시 시도</button>
        </div>
    `;
    
    document.getElementById('quizActions').style.display = 'none';
}

// ---- New Functions for Step-by-Step Flow ----

function updateTabLocks() {
    elements.practiceTabBtns.forEach(btn => {
        const tab = btn.dataset.tab;
        if (appState.unlockedTabs.includes(tab)) {
            btn.disabled = false;
            btn.classList.remove('disabled');
        } else {
            btn.disabled = true;
            btn.classList.add('disabled');
        }
    });
}

function completeKpiStep() {
    // No specific validation for KPI step, just proceed
    if (!appState.unlockedTabs.includes('roi')) {
        appState.unlockedTabs.push('roi');
        updateTabLocks();
    }
    appState.courseProgress[appState.currentCourse.id] = 25;
    switchPracticeTab('roi');
}

function completeRoiStep() {
    const costInput = document.getElementById('trainingCost');
    const benefitInput = document.getElementById('trainingBenefit');
    const resultContainer = document.getElementById('roiResult');
    
    // ROI 계산이 완료되었는지 확인
    if (!costInput || !benefitInput) {
        alert('ROI 계산을 먼저 완료해야 합니다.\n비용과 편익 값을 모두 입력하고 "ROI 계산" 버튼을 눌러주세요.');
        return;
    }
    
    // ROI 계산 결과가 표시되어 있는지 확인
    if (resultContainer && resultContainer.classList.contains('hidden')) {
        alert('ROI 계산을 먼저 완료해야 합니다.\n비용과 편익 값을 모두 입력하고 "ROI 계산" 버튼을 눌러주세요.');
        return;
    }
    
    if (parseFloat(costInput.value) <= 0) {
        alert('총 교육 비용은 0보다 커야 합니다.');
        return;
    }

    if (!appState.unlockedTabs.includes('evaluation')) {
        appState.unlockedTabs.push('evaluation');
        updateTabLocks();
    }
    appState.courseProgress[appState.currentCourse.id] = 50;
    switchPracticeTab('evaluation');
    // Start the evaluation process at stage 1
    switchStage(1); 
}

// 성과 관리 도구 관련 함수들
function showManagementMain() {
    // 성과 관리 도구 메인 화면 표시
    document.querySelectorAll('.tool-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById('managementMain').style.display = 'block';
}

function openKpiTool() {
    // KPI 설정 도구 섹션 표시
    document.querySelectorAll('.tool-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById('kpiToolSection').style.display = 'block';
    
    // KPI 도구 탭 초기화
    setupKpiToolTabs();
}

function openRoiCalculator() {
    // ROI 계산기 섹션 표시
    document.querySelectorAll('.tool-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById('roiCalculatorSection').style.display = 'block';
    
    // 초기값 계산
    calculateToolROI();
}

function openPracticeModule() {
    // 실습 모듈 섹션 표시
    document.querySelectorAll('.tool-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById('practiceModuleSection').style.display = 'block';
}

function openReportGenerator() {
    // 보고서 생성 섹션 표시
    document.querySelectorAll('.tool-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById('reportGeneratorSection').style.display = 'block';
}

function closeAllToolSections() {
    // 모든 도구 섹션 숨기고 메인 화면 표시
    document.querySelectorAll('.tool-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById('managementMain').style.display = 'block';
}

function setupKpiToolTabs() {
    // KPI 도구 탭 초기화
    const tabs = document.querySelectorAll('.kpi-nav-tab');
    const contents = document.querySelectorAll('.kpi-tab-content');
    
    // 첫 번째 탭을 기본으로 활성화
    tabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));
    
    if (tabs.length > 0) {
        tabs[0].classList.add('active');
        const firstTabId = tabs[0].dataset.tab;
        const firstContent = document.getElementById(firstTabId);
        if (firstContent) {
            firstContent.classList.add('active');
        }
    }
}

// 도구용 ROI 계산 함수
function calculateToolROI() {
    // 교육 비용 계산
    const instructorCost = parseFloat(document.getElementById('tool-cost-instructor')?.value) || 0;
    const materialsCost = parseFloat(document.getElementById('tool-cost-materials')?.value) || 0;
    const operationCost = parseFloat(document.getElementById('tool-cost-operation')?.value) || 0;
    const participantCost = parseFloat(document.getElementById('tool-cost-participant')?.value) || 0;
    
    const totalCost = instructorCost + materialsCost + operationCost + participantCost;
    
    // 편익 계산
    const productivityBenefit = parseFloat(document.getElementById('tool-benefit-productivity')?.value) || 0;
    const qualityBenefit = parseFloat(document.getElementById('tool-benefit-quality')?.value) || 0;
    const savingBenefit = parseFloat(document.getElementById('tool-benefit-saving')?.value) || 0;
    const otherBenefit = parseFloat(document.getElementById('tool-benefit-other')?.value) || 0;
    
    const totalBenefit = productivityBenefit + qualityBenefit + savingBenefit + otherBenefit;
    
    // ROI 계산
    const netBenefit = totalBenefit - totalCost;
    const roiPercentage = totalCost > 0 ? (netBenefit / totalCost) * 100 : 0;
    const paybackPeriod = totalBenefit > 0 ? (totalCost / totalBenefit) * 12 : 0; // 개월 단위
    
    // 결과 업데이트
    const totalCostElement = document.getElementById('tool-total-cost');
    const totalBenefitElement = document.getElementById('tool-total-benefit');
    const netBenefitElement = document.getElementById('tool-net-benefit');
    const roiPercentageElement = document.getElementById('tool-roi-percentage');
    const paybackPeriodElement = document.getElementById('tool-payback-period');
    
    if (totalCostElement) totalCostElement.textContent = totalCost.toLocaleString();
    if (totalBenefitElement) totalBenefitElement.textContent = totalBenefit.toLocaleString();
    if (netBenefitElement) netBenefitElement.textContent = netBenefit.toLocaleString();
    if (roiPercentageElement) roiPercentageElement.textContent = roiPercentage.toFixed(1);
    if (paybackPeriodElement) paybackPeriodElement.textContent = paybackPeriod.toFixed(1);
}

// 시나리오 관련 함수들
function startScenario(scenarioId) {
    currentScenario = scenarioId;
    currentStep = 1;
    scenarioData = {};
    
    document.querySelector('.practice-scenarios').style.display = 'none';
    document.getElementById('scenarioInterface').style.display = 'block';
    
    const scenario = appData.scenarios[scenarioId];
    document.getElementById('scenarioTitle').textContent = scenario.title;
    
    loadScenarioStep();
}

function loadScenarioStep() {
    const scenario = appData.scenarios[currentScenario];
    const step = scenario.steps[currentStep - 1];
    
    let content = `
        <div class="scenario-step">
            <h4>${step.title}</h4>
            <p>${step.content}</p>
    `;
    
    if (step.type === 'multiple_choice') {
        content += '<div class="scenario-options">';
        step.options.forEach((option, index) => {
            content += `
                <div class="scenario-option" onclick="selectScenarioOption(${index})">
                    ${option}
                </div>
            `;
        });
        content += '</div>';
    }
    
    content += '</div>';
    
    document.getElementById('scenarioContent').innerHTML = content;
    updateScenarioProgress();
}

function updateScenarioProgress() {
    const steps = document.querySelectorAll('.progress-steps .step');
    steps.forEach((step, index) => {
        step.classList.remove('active', 'completed');
        if (index + 1 < currentStep) {
            step.classList.add('completed');
        } else if (index + 1 === currentStep) {
            step.classList.add('active');
        }
    });
}

function selectScenarioOption(optionIndex) {
    const options = document.querySelectorAll('.scenario-option');
    options.forEach(option => option.classList.remove('selected'));
    options[optionIndex].classList.add('selected');
    
    scenarioData[`step${currentStep}`] = optionIndex;
}

function nextStep() {
    const scenario = appData.scenarios[currentScenario];
    
    if (currentStep < scenario.steps.length) {
        currentStep++;
        loadScenarioStep();
    } else {
        showScenarioResult();
    }
}

function previousStep() {
    if (currentStep > 1) {
        currentStep--;
        loadScenarioStep();
    }
}

function exitScenario() {
    document.getElementById('scenarioInterface').style.display = 'none';
    document.querySelector('.practice-scenarios').style.display = 'grid';
    document.getElementById('scenarioContent').innerHTML = '';
}

function showScenarioResult() {
    if (!currentScenario) return;
    
    const scenario = appData.scenarios[currentScenario];
    const correctAnswers = scenario.steps.filter((step, index) => 
        quizAnswers[index] === step.correct
    ).length;
    
    const score = Math.round((correctAnswers / scenario.steps.length) * 100);
    const resultContainer = document.getElementById('scenarioResult');
    
    let resultMessage = '';
    let resultClass = '';
    
    if (score >= 80) {
        resultMessage = '🎉 우수한 성과입니다!';
        resultClass = 'excellent';
    } else if (score >= 60) {
        resultMessage = '👍 양호한 성과입니다.';
        resultClass = 'good';
    } else {
        resultMessage = '📚 더 많은 학습이 필요합니다.';
        resultClass = 'needs-improvement';
    }
    
    resultContainer.innerHTML = `
        <div class="scenario-result ${resultClass}">
            <h3>시나리오 평가 결과</h3>
            <div class="result-score">
                <span class="score-number">${score}점</span>
                <span class="score-message">${resultMessage}</span>
            </div>
            <div class="result-details">
                <p>총 ${scenario.steps.length}문제 중 ${correctAnswers}문제 정답</p>
                <p>정답률: ${Math.round((correctAnswers / scenario.steps.length) * 100)}%</p>
            </div>
            <div class="result-actions">
                <button class="btn btn--primary" onclick="exitScenario()">대시보드로 돌아가기</button>
                <button class="btn btn--secondary" onclick="startScenario(${currentScenario})">다시 시도하기</button>
            </div>
        </div>
    `;
    
    document.getElementById('scenarioContainer').style.display = 'none';
    document.getElementById('scenarioResult').style.display = 'block';
}

// ROI 계산 함수
function calculateROI() {
    console.log('=== calculateROI 함수 시작 ===');
    
    // 안전한 입력값 처리 함수
    function safeGetValue(elementId) {
        const element = document.getElementById(elementId);
        if (!element) {
            console.warn(`입력 필드 #${elementId}를 찾을 수 없습니다`);
            return 0;
        }
        const value = parseFloat(element.value) || 0;
        console.log(`${elementId}: ${value}`);
        return value;
    }
    
    // 안전한 결과 표시 함수
    function safeSetText(elementId, text) {
        const element = document.getElementById(elementId);
        if (!element) {
            console.warn(`결과 필드 #${elementId}를 찾을 수 없습니다`);
            return;
        }
        element.textContent = text;
    }
    
    // 안전한 스타일 변경 함수
    function safeSetDisplay(elementId, display) {
        const element = document.getElementById(elementId);
        if (!element) {
            console.warn(`결과 컨테이너 #${elementId}를 찾을 수 없습니다`);
            return;
        }
        element.style.display = display;
    }
    
    // 입력값 가져오기
    const trainingCost = safeGetValue('trainingCost');
    const productivityGain = safeGetValue('productivityGain');
    const costSaving = safeGetValue('costSaving');
    
    // ROI 계산
    const totalBenefit = productivityGain + costSaving;
    const netBenefit = totalBenefit - trainingCost;
    const roiPercentage = trainingCost > 0 ? (netBenefit / trainingCost) * 100 : 0;
    
    console.log('계산 결과:', {
        trainingCost,
        productivityGain,
        costSaving,
        totalBenefit,
        netBenefit,
        roiPercentage
    });
    
    // 결과 표시
    safeSetText('totalBenefit', totalBenefit.toLocaleString() + '원');
    safeSetText('netBenefit', netBenefit.toLocaleString() + '원');
    safeSetText('roiPercentage', roiPercentage.toFixed(1) + '%');
    safeSetDisplay('roiResult', 'block');
    
    console.log('=== calculateROI 함수 완료 ===');
}

// 전역 함수로 등록
window.openKpiTool = openKpiTool;
window.openRoiCalculator = openRoiCalculator;
window.openPracticeModule = openPracticeModule;
window.openReportGenerator = openReportGenerator;
window.closeAllToolSections = closeAllToolSections;
window.startScenario = startScenario;
window.nextStep = nextStep;
window.previousStep = previousStep;
window.exitScenario = exitScenario;
window.calculateROI = calculateROI; 

// KPI 탭 전환 기능 (이벤트 중복 방지)
function setupKpiTabs() {
    const kpiTabBtns = document.querySelectorAll('#kpiToolSection .tab-btn');
    const tabPanes = document.querySelectorAll('#kpiToolSection .tab-pane');
    kpiTabBtns.forEach(btn => {
        // 기존의 onclick 핸들러를 제거합니다.
        btn.onclick = null;
        // 새로운 onclick 핸들러를 할당합니다.
        btn.onclick = function() {
            kpiTabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            btn.classList.add('active');
            document.querySelector(`#kpiToolSection #${btn.dataset.tab}`).classList.add('active');
        };
    });
    // 도구가 열릴 때 항상 첫 번째 탭이 활성화되도록 합니다.
    if (kpiTabBtns.length > 0) {
        kpiTabBtns[0].click();
    }
}

// KPI 생성 기능
function createKPI() {
    // 폼 데이터 수집
    const kpiName = document.getElementById('kpiName')?.value;
    const kpiCategory = document.getElementById('kpiCategorySelect')?.value;
    const kpiMeasureMethod = document.getElementById('kpiMeasureMethod')?.value;
    const kpiTargetValue = document.getElementById('kpiTargetValue')?.value;
    const kpiMeasureCycle = document.getElementById('kpiMeasureCycle')?.value;
    
    // 유효성 검사
    if (!kpiName || !kpiCategory || !kpiMeasureMethod || !kpiTargetValue || !kpiMeasureCycle) {
        alert('모든 필드를 입력해주세요.');
        return;
    }
    
    // KPI 객체 생성
    const newKPI = {
        id: Date.now(),
        name: kpiName,
        category: kpiCategory,
        measureMethod: kpiMeasureMethod,
        targetValue: kpiTargetValue,
        measureCycle: kpiMeasureCycle,
        createdAt: new Date().toLocaleDateString()
    };
    
    // 결과 표시
    const resultHTML = `
        <div class="kpi-result">
            <h4>✅ KPI가 성공적으로 생성되었습니다!</h4>
            <div class="kpi-details">
                <p><strong>KPI 명칭:</strong> ${newKPI.name}</p>
                <p><strong>카테고리:</strong> ${getCategoryName(newKPI.category)}</p>
                <p><strong>측정 방법:</strong> ${newKPI.measureMethod}</p>
                <p><strong>목표값:</strong> ${newKPI.targetValue}</p>
                <p><strong>측정 주기:</strong> ${getCycleName(newKPI.measureCycle)}</p>
                <p><strong>생성일:</strong> ${newKPI.createdAt}</p>
            </div>
            <div class="kpi-actions">
                <button class="btn btn--primary" onclick="downloadKPI(${newKPI.id})">KPI 다운로드</button>
                <button class="btn btn--secondary" onclick="resetKpiForm()">새 KPI 생성</button>
            </div>
        </div>
    `;
    
    // 결과를 KPI 생성기 탭에 표시
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

// 카테고리 이름 변환 함수
function getCategoryName(category) {
    const categories = {
        'participation': '참여도 지표',
        'learning': '학습성과 지표',
        'behavior': '행동변화 지표',
        'organizational': '조직성과 지표',
        'financial': '재무성과 지표'
    };
    return categories[category] || category;
}

// 측정 주기 이름 변환 함수
function getCycleName(cycle) {
    const cycles = {
        'quarterly': '분기별',
        'half-yearly': '반기별',
        'yearly': '연간'
    };
    return cycles[cycle] || cycle;
}

// KPI 폼 초기화 함수
function resetKpiForm() {
    const kpiGeneratorContent = document.getElementById('kpi-generator');
    if (kpiGeneratorContent) {
        // 폼 다시 표시
        const form = kpiGeneratorContent.querySelector('.kpi-generator-form');
        if (form) {
            form.style.display = 'block';
            form.reset();
        }
        
        // 결과 제거
        const resultDiv = kpiGeneratorContent.querySelector('.kpi-result');
        if (resultDiv) {
            resultDiv.remove();
        }
    }
}

// KPI 미리보기 표시
function showKPIPreview(kpi) {
    const categoryNames = {
        participation: '참여도 지표',
        learning: '학습성과 지표',
        behavior: '행동변화 지표',
        organization: '조직성과 지표',
        financial: '재무성과 지표'
    };
    
    const frequencyNames = {
        daily: '일별',
        weekly: '주별',
        monthly: '월별',
        quarterly: '분기별',
        yearly: '연별'
    };
    
    const previewContent = `
        <h5>${kpi.name}</h5>
        <p><strong>카테고리:</strong> ${categoryNames[kpi.category]}</p>
        <p><strong>측정 방법:</strong> ${kpi.method}</p>
        <p><strong>목표값:</strong> ${kpi.target}</p>
        <p><strong>측정 주기:</strong> ${frequencyNames[kpi.frequency]}</p>
        <p><strong>생성일:</strong> ${kpi.createdAt}</p>
        <button class="btn btn--outline btn--sm" onclick="downloadKPI(${kpi.id})">다운로드</button>
    `;
    
    document.getElementById('kpiPreviewContent').innerHTML = previewContent;
    document.getElementById('kpiPreview').style.display = 'block';
}

// KPI 다운로드 (시뮬레이션)
function downloadKPI(kpiId) {
    // KPI 데이터 생성 (실제로는 저장된 데이터를 사용해야 함)
    const kpi = {
        id: kpiId,
        name: "샘플 KPI",
        category: "학습성과 지표",
        measureMethod: "사전-사후 테스트",
        targetValue: "80점 이상",
        measureCycle: "분기별",
        createdAt: new Date().toLocaleDateString()
    };
    
    // KPI 데이터를 JSON 형태로 변환
    const kpiData = JSON.stringify(kpi, null, 2);
    
    // 다운로드 링크 생성
    const blob = new Blob([kpiData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `KPI_${kpi.name}_${kpiId}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('KPI가 성공적으로 다운로드되었습니다!');
}

// 전역 함수로 등록
window.createKPI = createKPI;
window.downloadKPI = downloadKPI;

// PDF 뷰어 관련 함수들
function previousPage() {
    // Google Drive PDF 뷰어는 자체 네비게이션을 사용하므로 알림만 표시
    alert('Google Drive PDF 뷰어에서 좌측 하단의 화살표 버튼을 사용하여 이전 페이지로 이동하세요.');
}

function nextPage() {
    // Google Drive PDF 뷰어는 자체 네비게이션을 사용하므로 알림만 표시
    alert('Google Drive PDF 뷰어에서 우측 하단의 화살표 버튼을 사용하여 다음 페이지로 이동하세요.');
}

function downloadPDF() {
    // PDF 다운로드 시뮬레이션
    alert('PDF 다운로드가 시작됩니다. 잠시만 기다려주세요...');
    
    // 실제 PDF 다운로드 링크 생성 (시뮬레이션)
    setTimeout(() => {
        const link = document.createElement('a');
        link.href = 'https://drive.google.com/uc?export=download&id=1PH-spz8-94_k2N14yIhZnfk201sVo-1M';
        link.download = '성과기여도_평가_종합_안내자료.pdf';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        alert('PDF 다운로드가 완료되었습니다!');
    }, 2000);
}

// 전역 함수들을 window 객체에 바인딩 (HTML에서 onclick으로 호출하기 위해)
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

function setProgress(percent) {
  document.querySelector('.progress-bar').style.width = percent + '%';
  document.querySelector('.progress-text').textContent = '진행률: ' + percent + '%';
}
// 예시: setProgress(70);