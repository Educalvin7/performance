// ?꾩뿭 蹂??諛??곹깭 媛앹껜
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

// DOM ?붿냼 以묒븰 愿由?媛앹껜
const elements = {};

// ?듯빀???곗씠??媛앹껜
const appData = {
    courses: [
        {
            id: "elderly_protection_counselor",
            name: "?몄씤蹂댄샇?꾨Ц?곷떞?먯뿭?됯컯?붽낵??,
            emoji: "?뫓",
            styleId: 1,
            description: "?몄씤?숇? ?덈갑 諛??곷떞 ?꾨Ц??웾 媛뺥솕瑜??듯빐 ?몄씤 ?멸텒??蹂댄샇?섍퀬, ?꾩옣 ????λ젰???μ긽?쒗궎??寃껋쓣 紐⑺몴濡??⑸땲??",
            kpis: [
                { stage: "1?④퀎", name: "援먯쑁 留뚯”??, target: "4.5???댁긽", method: "5??泥숇룄 ?ㅻЦ", timing: "援먯쑁 吏곹썑" },
                { stage: "2?④퀎", name: "?곷떞湲곕쾿 ?댄빐??, target: "80???댁긽", method: "?щ? 湲곕컲 吏???뚯뒪??, timing: "援먯쑁 醫낅즺 ?? },
                { stage: "3?④퀎", name: "?꾩옣 ?곸슜瑜?, target: "70% ?댁긽", method: "?숇즺/?곸궗 愿李?泥댄겕由ъ뒪??, timing: "援먯쑁 ??1媛쒖썡" },
                { stage: "4?④퀎", name: "?좉퀬?묒닔 珥덇린????깃났瑜?, target: "15% ?μ긽", method: "?낅Т ?곗씠???듦퀎 遺꾩꽍", timing: "援먯쑁 ??3媛쒖썡" }
            ],
            scenarios: [
                { title: "?꾧린?곹솴 媛쒖엯 ?쒕??덉씠??, description: "怨좎쐞???숇? ?щ? 諛쒓껄 ?? ?좉?湲곌?(寃쎌같, ?섎즺湲곌?)怨?怨듭“?섏뿬 ?좎냽?섍퀬 ?덉쟾?섍쾶 媛쒖엯?섎뒗 ?덉감瑜??쒕??덉씠?섑븯怨??됯??⑸땲??", details: "李멸??먮뒗 ?쒕굹由ъ삤 移대뱶瑜?諛쏆븘 ?꾧린 ?곹솴???몄??섍퀬, ?④퀎蹂??됰룞 吏移⑥뿉 ?곕씪 ??븷???섑뻾?⑸땲?? ?됯?????묒쓽 ?좎냽?? ?덉감???뺥솗?? ?묒뾽???⑥쑉?깆쓣 湲곗??쇰줈 ?대（?댁쭛?덈떎." },
                { title: "踰뺣쪧 諛??됱젙 ?덉감 ?댄빐", description: "?몄씤蹂댄샇 愿??踰뺣쪧(?몄씤蹂듭?踰?????洹쇨굅?섏뿬 ?됱젙議곗튂瑜??붿껌?섍퀬, ?쇳빐??蹂댄샇紐낅졊???좎껌?섎뒗 怨쇱젙??臾몄꽌 ?묒꽦 以묒떖?쇰줈 ?ㅼ뒿?⑸땲??", details: "?ㅼ젣 ?щ?? ?좎궗???쒖떇???쒓났?섏뿬, 踰뺤쟻 ?⑤젰??媛뽰텣 臾몄꽌瑜??묒꽦?섎뒗 ?λ젰???됯??⑸땲?? 二쇱슂 ?됯? ??ぉ? ?꾩닔 ?뺣낫 湲곗엯 ?щ?, 踰뺤쟻 洹쇨굅??紐낇솗?깆엯?덈떎." }
            ]
        },
        {
            id: "visiting_welfare_worker",
            name: "李얠븘媛?붾났吏?ㅻТ?먭낵??,
            emoji: "?쩃",
            styleId: 2,
            description: "?뺣낫 ?묎렐?깆씠 ??? ?꾧린 媛援щ? 吏곸젒 諛쒓뎬?섍퀬, 媛쒖씤蹂?留욎땄??蹂듭? ?쒕퉬?ㅻ? 湲고쉷 諛??곌퀎?섎뒗 ?꾩옣 以묒떖????웾??媛뺥솕?⑸땲??",
            kpis: [
                { stage: "1?④퀎", name: "援먯쑁 留뚯”??, target: "4.3???댁긽", method: "5??泥숇룄 ?ㅻЦ", timing: "援먯쑁 吏곹썑" },
                { stage: "2?④퀎", name: "?щ?愿由?吏???듬뱷??, target: "75???댁긽", method: "?꾧린?쒗뿕", timing: "援먯쑁 醫낅즺 ?? },
                { stage: "3?④퀎", name: "?щ?愿由??꾧뎄 ?쒖슜瑜?, target: "85% ?댁긽", method: "?ㅻТ ?곸슜 蹂닿퀬??寃??, timing: "援먯쑁 ??1媛쒖썡" },
                { stage: "4?④퀎", name: "?쒕퉬???곌퀎 ?깃났瑜?, target: "10% ?μ긽", method: "?щ?愿由??쒖뒪???곗씠??遺꾩꽍", timing: "援먯쑁 ??3媛쒖썡" }
            ],
            scenarios: [
                { title: "?꾧린 媛援?諛쒓뎬 諛?珥덇린 ?곷떞", description: "吏?????꾧린 吏뺥썑(怨듦낵湲?泥대궔, 嫄닿컯蹂댄뿕猷?泥대궔 ?? ?곗씠?곕? 遺꾩꽍?섏뿬 吏????곸쓣 諛쒓뎬?섍퀬, 泥?諛⑸Ц ?곷떞???듯빐 ?좊ː 愿怨꾨? ?뺤꽦?섎뒗 怨쇱젙???ㅼ뒿?⑸땲??", details: "珥덇린 ?곷떞 ?쒕??덉씠?섏뿉??怨듦컧??寃쎌껌, ?쇳룷 ?뺤꽦 湲곗닠???됯??섍퀬, ?곷떞?쇱? ?묒꽦??異⑹떎?꾨? 寃?좏빀?덈떎." },
                { title: "?먯썝 ?곌퀎 諛??듯빀?щ??뚯쓽", description: "諛쒓뎬???꾧린 媛援ъ뿉 ?꾩슂??怨듦났 諛?誘쇨컙 ?먯썝???곌퀎?섍퀬, 蹂듯빀?곸씤 臾몄젣 ?닿껐???꾪븳 ?듯빀?щ??뚯쓽瑜?吏곸젒 二쇨??섍퀬 吏꾪뻾?섎뒗 ??븷???섑뻾?⑸땲??", details: "紐⑥쓽 ?듯빀?щ??뚯쓽瑜??듯빐 ?뚯쓽濡앹쓣 ?묒꽦?섍퀬, ?뚯쓽 吏꾪뻾 ?λ젰(紐⑺몴 ?ㅼ젙, ?섍껄 議곗쑉, ??븷 遺꾨떞)??醫낇빀?곸쑝濡??됯??⑸땲??" }
            ]
        },
        {
            id: "dreamstart_supervisor",
            name: "?쒕┝?ㅽ??명듅?깊솕怨쇱젙(?섑띁諛붿씠?-2?④퀎)",
            emoji: "??,
            styleId: 3,
            description: "?쒕┝?ㅽ????ъ뾽???듭떖 ?몃젰???섑띁諛붿씠?媛 ??먯쓽 ?꾨Ц?깆쓣 媛뺥솕?섍퀬, ?ъ뾽 ?깃낵瑜?泥닿퀎?곸쑝濡?愿由ы븯??由щ뜑??낵 ?섑띁鍮꾩쟾 ??웾???⑥뼇?⑸땲??",
            kpis: [
                { stage: "1?④퀎", name: "援먯쑁 ?댁슜 ?꾩뾽 ?곸슜??, target: "4.4???댁긽", method: "5??泥숇룄 ?ㅻЦ", timing: "援먯쑁 ??2媛쒖썡" },
                { stage: "2?④퀎", name: "?덊띁鍮꾩쟾 湲곕쾿 ?댄빐??, target: "80???댁긽", method: "?щ? 湲곕컲 ??븷洹??됯?", timing: "援먯쑁 以? },
                { stage: "3?④퀎", name: "???肄붿묶 諛??쇰뱶諛???웾", target: "80% ?댁긽", method: "360???ㅻ㈃?됯?", timing: "援먯쑁 ??2媛쒖썡" },
                { stage: "4?④퀎", name: "? ?깃낵 媛쒖꽑瑜?, target: "15% ?μ긽", method: "?蹂??깃낵 吏??鍮꾧탳 遺꾩꽍", timing: "援먯쑁 ??6媛쒖썡" }
            ],
            scenarios: [
                { title: "??깃낵 ???????덊띁鍮꾩쟾", description: "?낅Т???대젮???寃る뒗 ??먯쓣 ??곸쑝濡?媛뺤젏 湲곕컲 ?덊띁鍮꾩쟾???쒓났?섏뿬, ?숆린瑜?遺?ы븯怨?援ъ껜?곸씤 ??웾 媛쒕컻 怨꾪쉷???④퍡 ?섎┰?⑸땲??", details: "?덊띁鍮꾩쟾 ?쒕??덉씠?섏뿉??李멸??먯쓽 吏덈Ц 湲곗닠, ?깆옣 珥됱쭊 ?쇰뱶諛? 紐⑺몴 ?ㅼ젙??援ъ껜?깆쓣 ?됯??⑸땲??" },
                { title: "?쒕┝?ㅽ????ъ뾽 ?좉퇋 湲고쉷", description: "吏??궗???뱀꽦怨??꾨룞 ?섏슂 遺꾩꽍??諛뷀깢?쇰줈 ?좉퇋 ?꾨줈洹몃옩??湲고쉷?섍퀬, ?덉궛 ?뺣낫瑜??꾪븳 ?ъ뾽怨꾪쉷?쒕? ?묒꽦?섏뿬 諛쒗몴?⑸땲??", details: "?ъ뾽怨꾪쉷?쒖쓽 ?쇰━?? ?ㅽ쁽媛?μ꽦, 湲곕??④낵? 諛쒗몴???ㅻ뱷?μ쓣 以묒떖?쇰줈 ?됯?媛 吏꾪뻾?⑸땲??" }
            ]
        },
        {
            id: "ai_iot_health_management",
            name: "諛⑸Ц嫄닿컯愿由?AI쨌IoT)?ъ뾽愿由ш낵??,
            emoji: "?ㅿ툘?랅윪?,
            styleId: 4,
            description: "AI 諛?IoT 湲곗닠???쒖슜??鍮꾨?硫?嫄닿컯愿由??쒕퉬?ㅻ? ?④낵?곸쑝濡??댁쁺?섍퀬, ?곗씠?곕? 湲곕컲?쇰줈 ?ъ뾽 ?깃낵瑜?遺꾩꽍?섎뒗 ?λ젰??諛곗뼇?⑸땲??",
            kpis: [
                { stage: "1?④퀎", name: "援먯쑁 留뚯”??, target: "4.2???댁긽", method: "5??泥숇룄 ?ㅻЦ", timing: "援먯쑁 吏곹썑" },
                { stage: "2?④퀎", name: "AI쨌IoT 湲곗닠 ?댄빐??, target: "75???댁긽", method: "湲곗닠 蹂닿퀬???붿빟 諛?諛쒗몴", timing: "援먯쑁 以? },
                { stage: "3?④퀎", name: "AI쨌IoT ?꾧뎄 ?쒖슜瑜?, target: "20% 利앷?", method: "?쒖뒪???쒖슜 濡쒓렇 ?곗씠??遺꾩꽍", timing: "援먯쑁 ??1媛쒖썡" },
                { stage: "4?④퀎", name: "??곸옄 嫄닿컯吏??媛쒖꽑??, target: "15% ?μ긽", method: "?쒕퉬???꾪썑 嫄닿컯 ?곗씠??鍮꾧탳", timing: "援먯쑁 ??6媛쒖썡" }
            ],
            scenarios: [
                { title: "?곗씠??湲곕컲 怨좎쐞?섍뎔 ?덉륫", description: "IoT 湲곌린?먯꽌 ?섏쭛???앺솢 ?듦? 諛?嫄닿컯 ?곗씠?곕? 遺꾩꽍?섏뿬 嫄닿컯 ?낇솕 媛?μ꽦???믪? 怨좎쐞?섍뎔???덉륫?섍퀬, ?곗꽑?쒖쐞???곕씪 ?덈갑??媛쒖엯 怨꾪쉷???섎┰?⑸땲??", details: "?곗씠??遺꾩꽍 ???? Excel, Tableau)???쒖슜?섏뿬 二쇱뼱吏??곗씠?곗뀑?먯꽌 ?좎쓽誘명븳 ?⑦꽩??諛쒓껄?섍퀬, 遺꾩꽍 寃곌낵瑜??쒓컖?뷀븯??蹂닿퀬?섎뒗 ?λ젰???됯??⑸땲??" },
                { title: "鍮꾨?硫?嫄닿컯?곷떞 ?쒕퉬??湲고쉷", description: "?붿긽?뚯쓽 ?쒖뒪?쒓낵 紐⑤컮???깆쓣 ?쒖슜??鍮꾨?硫?嫄닿컯?곷떞 ?쒕퉬?ㅻ? 湲고쉷?섍퀬, ?ъ슜??寃쏀뿕(UX)??怨좊젮???쒕퉬???쒕굹由ъ삤瑜??ㅺ퀎?⑸땲??", details: "?쒕퉬??湲고쉷?덇낵 ?ъ슜???쒕굹由ъ삤??援ъ껜?? ?몄쓽?? ?④낵?깆쓣 ?됯??⑸땲??" }
            ]
        },
        {
            id: "addiction_management",
            name: "以묐룆愿由ъ쭅臾댁떖?붽낵??,
            emoji: "?쭣",
            styleId: 5,
            description: "?ㅼ뼇??以묐룆(?뚯퐫?? ?쎈Ъ, ?꾨컯 ?? 臾몄젣?????源딆씠 ?덈뒗 ?댄빐瑜?諛뷀깢?쇰줈, 洹쇨굅 湲곕컲???곷떞 諛?移섎즺 ?꾨줈洹몃옩???댁쁺?섎뒗 ?꾨Ц?깆쓣 媛뺥솕?⑸땲??",
            kpis: [
                { stage: "1?④퀎", name: "援먯쑁 留뚯”??, target: "4.4???댁긽", method: "5??泥숇룄 ?ㅻЦ", timing: "援먯쑁 吏곹썑" },
                { stage: "2?④퀎", name: "以묐룆 ?곷떞 湲곕쾿 ?듬뱷??, target: "78???댁긽", method: "?щ? 湲곕컲 ?ㅼ뒿 ?됯?", timing: "援먯쑁 以? },
                { stage: "3?④퀎", name: "?곷떞 ?꾨줈洹몃옩 ?곸슜瑜?, target: "85% ?댁긽", method: "?꾨줈洹몃옩 ?댁쁺 ?꾪솴 蹂닿퀬??, timing: "援먯쑁 ??1媛쒖썡" },
                { stage: "4?④퀎", name: "?대떞???뚮났 諛??좎???, target: "70% ?댁긽", method: "?κ린 異붿쟻 ?곗씠??遺꾩꽍", timing: "援먯쑁 ??6媛쒖썡" }
            ],
            scenarios: [
                { title: "?숆린媛뺥솕?곷떞(Motivational Interviewing) ?곸슜", description: "蹂?붿쓽吏媛 ??? ?대떞?먮? ??곸쑝濡??숆린媛뺥솕?곷떞 湲곕쾿???곸슜?섏뿬, ?ㅼ뒪濡?蹂?붿쓽 ?꾩슂?깆쓣 ?몄떇?섍퀬 紐⑺몴瑜??ㅼ젙?섎룄濡??뺣뒗 ?곷떞 怨쇱젙???ㅼ뒿?⑸땲??", details: "?곷떞 ?쒕??덉씠?섏뿉???대떞?먯쓽 ?묎?媛먯젙???ㅻ（怨? 蹂????붾? ?좊룄?섎뒗 ?곷떞?먯쓽 ??웾???됯??⑸땲??" },
                { title: "媛議?以묒옱 ?꾨줈洹몃옩 ?댁쁺", description: "以묐룆??媛議깆쓣 ??곸쑝濡?媛議깆쓽 ??븷??援먯쑁?섍퀬, ?④낵?곸씤 ?泥?諛⑸쾿???덈젴?섎뒗 媛議?以묒옱 ?꾨줈洹몃옩??湲고쉷?섍퀬 紐⑥쓽 ?댁쁺?⑸땲??", details: "?꾨줈洹몃옩 援ъ꽦??泥닿퀎?? 援먯쑁 ?댁슜???꾨Ц?? 李멸????곹샇?묒슜 珥됱쭊 ?λ젰???됯??⑸땲??" }
            ]
        },
        {
            id: "overseas_medical_product",
            name: "?댁쇅?섎즺?곹뭹湲고쉷?꾨왂怨쇱젙",
            emoji: "?덌툘",
            styleId: 6,
            description: "?깃났?곸씤 湲濡쒕쾶 ?섎즺?쒖옣 吏꾩텧???꾪빐, 紐⑺몴 援????臾명솕? 洹쒖젣 ?섍꼍??遺꾩꽍?섍퀬 寃쎌웳???덈뒗 ?섎즺?곹뭹 諛??쒕퉬?ㅻ? 湲고쉷?섎뒗 ?꾨왂????웾??媛뺥솕?⑸땲??",
            kpis: [
                { stage: "1?④퀎", name: "援먯쑁 留뚯”??, target: "4.3???댁긽", method: "5??泥숇룄 ?ㅻЦ", timing: "援먯쑁 吏곹썑" },
                { stage: "2?④퀎", name: "?쒖옣遺꾩꽍 蹂닿퀬???꾩꽦??, target: "80???댁긽", method: "?꾨줈?앺듃 湲곕컲 ?됯?(PBL)", timing: "援먯쑁 以? },
                { stage: "3?④퀎", name: "?꾨왂 ?섎┰ 諛??ㅽ뻾 怨꾪쉷????뱀꽦", target: "80% ?댁긽", method: "?숇즺 諛??꾨Ц媛 ?됯?", timing: "援먯쑁 ??2媛쒖썡" },
                { stage: "4?④퀎", name: "?댁쇅吏꾩텧 ?깃낵(怨꾩빟 ??", target: "?좉퇋 怨꾩빟 1嫄??댁긽", method: "?ъ뾽 ?깃낵 蹂닿퀬??遺꾩꽍", timing: "援먯쑁 ??1?? }
            ],
            scenarios: [
                { title: "?寃?援?? ?쒖옣 遺꾩꽍", description: "?뱀젙 援??(?? UAE, 踰좏듃??瑜??좎젙?섏뿬 ?섎즺 ?쒖옣 洹쒕え, 寃쎌웳 ?섍꼍, 洹쒖젣, 臾명솕???뱀꽦??遺꾩꽍?섍퀬, ?쒖옣 吏꾩텧 湲고쉶? ?꾪삊 ?붿씤???꾩텧?섎뒗 蹂닿퀬?쒕? ?묒꽦?⑸땲??", details: "蹂닿퀬?쒖쓽 ?곗씠???뺥솗?? 遺꾩꽍??源딆씠, ?꾨왂???쒖궗???꾩텧 ?λ젰???됯??⑸땲??" },
                { title: "?섎즺?곹뭹 ?꾩????꾨왂 ?섎┰", description: "援?궡???곗닔???섎즺 湲곗닠?대굹 ?쒕퉬?ㅻ? ?寃?援????留욊쾶 ?꾩??뷀븯???꾨왂???섎┰?⑸땲?? 媛寃? ?곹뭹 援ъ꽦, 留덉???梨꾨꼸 ?깆쓣 ?ы븿??援ъ껜?곸씤 ?ㅽ뻾 怨꾪쉷???쒖떆?⑸땲??", details: "?꾩????꾨왂??李쎌쓽?깃낵 ?ㅽ쁽媛?μ꽦, 洹몃━怨?湲곕? ROI(?ъ옄?섏씡瑜? ?덉륫???⑸━?깆쓣 ?됯??⑸땲??" }
            ]
        },
        {
            id: "international_health_consultant",
            name: "援?젣媛쒕컻?묐젰蹂닿굔而⑥꽕?댄듃?댁궗?낃퀎?랁븯湲?,
            emoji: "?뙇",
            styleId: 7,
            description: "援?젣媛쒕컻?묐젰(ODA) 蹂닿굔?ъ뾽???뱀닔?깆쓣 ?댄빐?섍퀬, ?ъ뾽 諛쒓뎬遺??湲고쉷, ?쒖븞???묒꽦, ?깃낵 愿由ъ뿉 ?대Ⅴ????怨쇱젙??愿由ы븯??PM(Project Management) ??웾??媛뺥솕?⑸땲??",
            kpis: [
                { stage: "1?④퀎", name: "援먯쑁 留뚯”??, target: "4.4???댁긽", method: "5??泥숇룄 ?ㅻЦ", timing: "援먯쑁 吏곹썑" },
                { stage: "2?④퀎", name: "?ъ뾽湲고쉷???꾨줈?앺듃 ?쒖븞?? ?꾩꽦??, target: "85???댁긽", method: "PPCM(Project Cycle Management) 湲곕컲 ?됯?", timing: "援먯쑁 以? },
                { stage: "3?④퀎", name: "?꾨줈?앺듃 愿由??꾧뎄 ?곸슜瑜?, target: "90% ?댁긽", method: "?ㅻТ ?곸슜 蹂닿퀬??寃??, timing: "援먯쑁 ??1媛쒖썡" },
                { stage: "4?④퀎", name: "?쒖븞??湲곕컲 ?ъ뾽 ?깃났瑜??섏＜ ??", target: "80% ?댁긽", method: "?꾨줈?앺듃 ?깃낵 異붿쟻", timing: "援먯쑁 ??1?? }
            ],
            scenarios: [
                { title: "臾몄젣遺꾩꽍 諛??닿껐諛⑹븞 ?꾩텧", description: "媛쒕컻?꾩긽援?쓽 ?뱀젙 蹂닿굔 臾몄젣(?? 紐⑥옄蹂닿굔, 媛먯뿼蹂???????먯씤-寃곌낵瑜?遺꾩꽍?섎뒗 臾몄젣?섎Т(Problem Tree)瑜??묒꽦?섍퀬, ?대? ?닿껐諛⑹븞?섎Т(Solution Tree)濡??꾪솚?섏뿬 ?ъ뾽 ?꾩씠?쒖쓣 援ъ껜?뷀빀?덈떎.", details: "臾몄젣 遺꾩꽍???쇰━????뱀꽦怨??닿껐諛⑹븞??李쎌쓽??諛??곸젅?깆쓣 ?됯??⑸땲??" },
                { title: "?깃낵愿由??꾨젅?꾩썙???ㅺ퀎", description: "?좏깮???ъ뾽 ?꾩씠?쒖뿉 ????ъ엯(Input), ?쒕룞(Activity), ?곗텧臾?Output), 寃곌낵(Outcome), ?곹뼢(Impact)???ы븿?섎뒗 ?쇰━紐⑤뜽(Logic Model)???섎┰?섍퀬, 媛??④퀎蹂??깃낵吏?쒕? ?ㅼ젙?⑸땲??", details: "?쇰━紐⑤뜽???멸낵愿怨?紐낇솗??諛??깃낵吏?쒖쓽 SMART ?먯튃 遺???щ?瑜??됯??⑸땲??" }
            ]
        },
        {
            id: "social_service_instructor",
            name: "?ы쉶蹂듬Т?좉퇋媛뺤궗?묒꽦怨쇱젙",
            emoji: "?쭛?랅윆?,
            styleId: 8,
            description: "?ы쉶蹂듬Т?붿썝 援먯쑁???대떦???좉퇋 媛뺤궗瑜???곸쑝濡? ?깆씤?숈뒿 ?먮━??湲곕컲??援먯닔?ㅺ퀎, 媛뺤쓽 湲곕쾿, ?숈뒿???곹샇?묒슜 珥됱쭊 湲곗닠??泥닿퀎?곸쑝濡??덈젴?⑸땲??",
            kpis: [
                { stage: "1?④퀎", name: "援먯쑁 留뚯”??, target: "4.5???댁긽", method: "5??泥숇룄 ?ㅻЦ", timing: "援먯쑁 吏곹썑" },
                { stage: "2?④퀎", name: "媛뺤쓽 ?쒖뿰 ?됯? ?먯닔", target: "80???댁긽", method: "?숇즺 諛??꾨Ц媛 愿李??됯?", timing: "援먯쑁 以? },
                { stage: "3?④퀎", name: "援먯닔?ㅺ퀎???꾩꽦??, target: "85% ?댁긽", method: "ADDIE 紐⑦삎 湲곕컲 ?됯?", timing: "援먯쑁 以? },
                { stage: "4?④퀎", name: "?대떦 媛뺤쓽 ?섍컯??留뚯”??, target: "4.3???댁긽", method: "媛뺤쓽 ???섍컯???ㅻЦ", timing: "媛뺤쓽 ?? }
            ],
            scenarios: [
                { title: "紐⑥쓽 媛뺤쓽 ?쒖뿰 諛??쇰뱶諛?, description: "?먯떊???ㅺ퀎??援먯닔?ㅺ퀎?덉쓣 諛뷀깢?쇰줈 15遺?遺꾨웾??紐⑥쓽 媛뺤쓽瑜??쒖뿰?⑸땲?? ?숇즺 ?숈뒿?먮뱾? 愿李?泥댄겕由ъ뒪?몃? 湲곕컲?쇰줈 ?곹샇 ?쇰뱶諛깆쓣 ?쒓났?⑸땲??", details: "媛뺤쓽 ?댁슜 ?꾨떖?? ?숈뒿??李몄뿬 ?좊룄, ?쒓컙 愿由??λ젰, 留ㅼ껜 ?쒖슜 ?λ젰??醫낇빀?곸쑝濡??됯??⑸땲??" },
                { title: "臾몄젣 ?숈뒿?????, description: "媛뺤쓽 以?諛쒖깮?????덈뒗 ?ㅼ뼇???좏삎??臾몄젣 ?숈뒿???? 鍮꾪삊議곗쟻, 臾닿린?? 怨듦꺽??????묓븯????븷洹뱀쓣 ?섑뻾?섍퀬, ?④낵?곸씤 ?닿껐 ?꾨왂???좊줎?⑸땲??", details: "?곹솴 遺꾩꽍 ?λ젰, 怨듦컧???뚰넻 ?λ젰, 湲띿젙???숈뒿 遺꾩쐞湲?議곗꽦 ?λ젰??以묒떖?쇰줈 ?됯??⑸땲??" }
            ]
        }
    ],
    kirkpatrickStages: [{"stage": 1, "name": "諛섏쓳?됯?", "description": "援먯쑁?????李멸??먯쓽 留뚯”?꾩? 諛섏쓳??痢≪젙", "measures": ["留뚯”??, "?좎슜???몄떇", "?숈뒿 ?섍꼍", "媛뺤궗 ?됯?"], "timing": "援먯쑁 吏곹썑", "methods": ["?ㅻЦ議곗궗", "?명꽣酉?, "愿李?]}, {"stage": 2, "name": "?숈뒿?됯?", "description": "吏?? 湲곗닠, ?쒕룄??蹂???뺣룄瑜?痢≪젙", "measures": ["吏???듬뱷", "湲곗닠 ?μ긽", "?쒕룄 蹂??], "timing": "援먯쑁 ?꾪썑", "methods": ["?ъ쟾-?ы썑 ?뚯뒪??, "?ㅺ린 ?됯?", "?ы듃?대━??]}, {"stage": 3, "name": "?됰룞?됯?", "description": "?ㅼ젣 ?낅Т?먯꽌???됰룞 蹂?붾? ?뺤씤", "measures": ["?낅Т ?곸슜", "?됰룞 蹂??, "?ㅽ궗 ?쒖슜"], "timing": "援먯쑁 ??1-3媛쒖썡", "methods": ["?꾩옣 愿李?, "?곸궗 ?됯?", "360???쇰뱶諛?]}, {"stage": 4, "name": "寃곌낵?됯?", "description": "議곗쭅 ?깃낵??誘몄튇 理쒖쥌 ?곹뼢??痢≪젙", "measures": ["?깃낵 ?μ긽", "鍮꾩슜 ?덇컧", "?덉쭏 媛쒖꽑"], "timing": "援먯쑁 ??3-6媛쒖썡", "methods": ["?깃낵 吏??遺꾩꽍", "ROI 怨꾩궛", "鍮꾧탳 遺꾩꽍"]}],
    smartCriteria: [{"letter": "S", "name": "Specific", "description": "援ъ껜??, "details": "紐낇솗?섍퀬 援ъ껜?곸씤 紐⑺몴瑜??ㅼ젙?섏꽭??"}, {"letter": "M", "name": "Measurable", "description": "痢≪젙媛??, "details": "?섏튂???곗씠?곕줈 痢≪젙?????덉뼱???⑸땲??"}, {"letter": "A", "name": "Achievable", "description": "?ъ꽦媛??, "details": "?꾩떎?곸쑝濡??ъ꽦 媛?ν븳 ?섏??댁뼱???⑸땲??"}, {"letter": "R", "name": "Relevant", "description": "愿?⑥꽦", "details": "援먯쑁 紐⑺몴? 議곗쭅 紐⑺몴??遺?⑺빐???⑸땲??"}, {"letter": "T", "name": "Time-bound", "description": "?쒗븳??, "details": "紐낇솗???ъ꽦 湲고븳???ㅼ젙?댁빞 ?⑸땲??"}],
    scenarios: {
        1: {
            title: "?좉퇋 吏곸썝 ?⑤낫??援먯쑁",
            description: "蹂닿굔蹂듭??몄옱媛쒕컻?먯뿉 ?좎엯 吏곸썝 50紐낆쓣 ??곸쑝濡????⑤낫??援먯쑁怨쇱젙???깃낵湲곗뿬?꾨? ?됯??섎뒗 ?쒕굹由ъ삤",
            steps: [
                {
                    title: "援먯쑁紐⑺몴 ?ㅼ젙",
                    content: "?좉퇋 吏곸썝 ?⑤낫??援먯쑁??紐⑺몴瑜??ㅼ젙?섏꽭?? ?ㅼ쓬 以?媛???곸젅??紐⑺몴瑜??좏깮?섏꽭??",
                    type: "multiple_choice",
                    options: [
                        "?좎엯 吏곸썝???낅Т ?곸쓳???μ긽",
                        "議곗쭅 臾명솕 ?댄빐 諛??뚯냽媛?利앹쭊",
                        "湲곕낯 ?낅Т ??웾 ?듬뱷",
                        "紐⑤뱺 ????ぉ"
                    ],
                    correct: 3,
                    explanation: "?⑤낫??援먯쑁? ?좎엯 吏곸썝??議곗쭅??鍮좊Ⅴ寃??곸쓳?섍퀬 湲곕낯 ?낅Т ??웾???듬뱷?섎ŉ, 議곗쭅 臾명솕瑜??댄빐?섏뿬 ?뚯냽媛먯쓣 媛吏????덈룄濡??섎뒗 醫낇빀?곸씤 紐⑺몴瑜?媛?몄빞 ?⑸땲??"
                },
                {
                    title: "KPI ?좎젙",
                    content: "?ㅼ쓬 以??좉퇋 吏곸썝 ?⑤낫??援먯쑁??媛???곸젅??KPI瑜??좏깮?섏꽭??",
                    type: "multiple_choice",
                    options: [
                        "援먯쑁 留뚯”??4.0???댁긽",
                        "?낅Т ?곸쓳 湲곌컙 ?⑥텞 20%",
                        "?댁쭅瑜?媛먯냼 15%",
                        "紐⑤뱺 ????ぉ"
                    ],
                    correct: 3,
                    explanation: "?⑤낫??援먯쑁???깃났? 援먯쑁 留뚯”?? ?낅Т ?곸쓳 湲곌컙 ?⑥텞, ?댁쭅瑜?媛먯냼 ???щ윭 吏?쒕? 醫낇빀?곸쑝濡??됯??댁빞 ?⑸땲??"
                },
                {
                    title: "痢≪젙 怨꾪쉷 ?섎┰",
                    content: "痢≪젙 怨꾪쉷???섎┰?섏꽭?? ?ㅼ쓬 以?媛???곸젅??痢≪젙 ?쒖젏???좏깮?섏꽭??",
                    type: "multiple_choice",
                    options: [
                        "援먯쑁 吏곹썑留?,
                        "援먯쑁 吏곹썑 + 1媛쒖썡 ??,
                        "援먯쑁 吏곹썑 + 3媛쒖썡 ??+ 6媛쒖썡 ??,
                        "援먯쑁 吏곹썑 + 1媛쒖썡 ??+ 3媛쒖썡 ??+ 6媛쒖썡 ??
                    ],
                    correct: 3,
                    explanation: "?⑤낫??援먯쑁???④낵???④린(援먯쑁 吏곹썑), 以묎린(1媛쒖썡, 3媛쒖썡), ?κ린(6媛쒖썡)??嫄몄퀜 醫낇빀?곸쑝濡?痢≪젙?댁빞 ?⑸땲??"
                },
                {
                    title: "寃곌낵 遺꾩꽍 諛?媛쒖꽑諛⑹븞",
                    content: "?됯? 寃곌낵瑜?諛뷀깢?쇰줈 媛쒖꽑諛⑹븞???꾩텧?섏꽭?? ?ㅼ쓬 以?媛???곗꽑?쒖쐞媛 ?믪? 媛쒖꽑諛⑹븞? 臾댁뾿?멸???",
                    type: "multiple_choice",
                    options: [
                        "援먯쑁 ?쒓컙 ?⑥텞",
                        "硫섑넗留??꾨줈洹몃옩 媛뺥솕",
                        "援먯쑁 ?먮즺 媛쒖꽑",
                        "?ㅻТ 以묒떖 援먯쑁 ?댁슜 ?뺣?"
                    ],
                    correct: 1,
                    explanation: "?좉퇋 吏곸썝???깃났?곸씤 ?곸쓳???꾪빐?쒕뒗 泥닿퀎?곸씤 硫섑넗留??꾨줈洹몃옩??媛??以묒슂?⑸땲?? ?대뒗 ?대줎 援먯쑁怨??ㅻТ ?곸슜???곌껐?섎뒗 ?듭떖 ?붿냼?낅땲??"
                }
            ]
        },
        2: {
            title: "由щ뜑????웾 媛뺥솕 援먯쑁",
            description: "以묎컙愿由ъ옄 30紐낆쓣 ??곸쑝濡???由щ뜑??援먯쑁怨쇱젙??ROI瑜?怨꾩궛?섎뒗 ?쒕굹由ъ삤",
            steps: [
                {
                    title: "?곗씠???섏쭛 怨꾪쉷",
                    content: "ROI 怨꾩궛???꾪븳 ?곗씠???섏쭛 怨꾪쉷???섎┰?섏꽭?? ?ㅼ쓬 以?媛??以묒슂???곗씠?곕뒗 臾댁뾿?멸???",
                    type: "multiple_choice",
                    options: [
                        "援먯쑁 鍮꾩슜",
                        "? ?깃낵 ?μ긽??,
                        "吏곸썝 留뚯”??,
                        "紐⑤뱺 ????ぉ"
                    ],
                    correct: 3,
                    explanation: "ROI 怨꾩궛???꾪빐?쒕뒗 援먯쑁 鍮꾩슜, ? ?깃낵 ?μ긽?? 吏곸썝 留뚯”????紐⑤뱺 愿???곗씠?곕? 醫낇빀?곸쑝濡??섏쭛?댁빞 ?⑸땲??"
                },
                {
                    title: "鍮꾩슜 ?곗젙",
                    content: "援먯쑁 鍮꾩슜???곗젙?섏꽭?? ?ㅼ쓬 以??ы븿?섏뼱????鍮꾩슜? 臾댁뾿?멸???",
                    type: "multiple_choice",
                    options: [
                        "媛뺤궗鍮꾨쭔",
                        "媛뺤궗鍮?+ 援먯쑁?먮즺鍮?,
                        "媛뺤궗鍮?+ 援먯쑁?먮즺鍮?+ ?댁쁺鍮?,
                        "媛뺤궗鍮?+ 援먯쑁?먮즺鍮?+ ?댁쁺鍮?+ 李몄뿬???쒓컙鍮꾩슜"
                    ],
                    correct: 3,
                    explanation: "?뺥솗??ROI 怨꾩궛???꾪빐?쒕뒗 媛뺤궗鍮? 援먯쑁?먮즺鍮? ?댁쁺鍮꾨퓧留??꾨땲??李몄뿬?먯쓽 ?쒓컙鍮꾩슜源뚯? ?ы븿??珥?鍮꾩슜???곗젙?댁빞 ?⑸땲??"
                },
                {
                    title: "?④낵 痢≪젙",
                    content: "援먯쑁 ?④낵瑜?痢≪젙?섏꽭?? ?ㅼ쓬 以?媛??媛앷??곸씤 ?④낵 痢≪젙 諛⑸쾿? 臾댁뾿?멸???",
                    type: "multiple_choice",
                    options: [
                        "李몄뿬???ㅻЦ議곗궗",
                        "?곸궗 ?됯?",
                        "? ?깃낵 吏??鍮꾧탳",
                        "紐⑤뱺 ????ぉ??醫낇빀"
                    ],
                    correct: 3,
                    explanation: "援먯쑁 ?④낵??李몄뿬???ㅻЦ議곗궗, ?곸궗 ?됯?, ? ?깃낵 吏??鍮꾧탳 ???ㅼ뼇??諛⑸쾿??醫낇빀?섏뿬 痢≪젙?댁빞 媛앷??곸씠怨??좊ː?????덈뒗 寃곌낵瑜??살쓣 ???덉뒿?덈떎."
                },
                {
                    title: "ROI ?댁꽍",
                    content: "怨꾩궛??ROI瑜??댁꽍?섏꽭?? ROI媛 150%?쇰㈃ ?대뒗 臾댁뾿???섎??섎굹??",
                    type: "multiple_choice",
                    options: [
                        "援먯쑁 鍮꾩슜??1.5諛곕쭔???먯떎",
                        "援먯쑁 鍮꾩슜??1.5諛곕쭔???섏씡",
                        "援먯쑁 鍮꾩슜??2.5諛곕쭔???섏씡",
                        "援먯쑁 鍮꾩슜??0.5諛곕쭔???섏씡"
                    ],
                    correct: 2,
                    explanation: "ROI 150%??援먯쑁 鍮꾩슜??1.5諛곕쭔???쒗렪?듭씠 諛쒖깮?덈떎???섎??낅땲?? 利? 援먯쑁 鍮꾩슜??2.5諛곕쭔?쇱쓽 ?섏씡???살뿀?ㅻ뒗 ?살엯?덈떎."
                }
            ]
        }
    }
};

const quizData = [
    {"question": "而ㅽ겕?⑦듃由?4?④퀎 ?됯? 紐⑤뜽?먯꽌 1?④퀎??臾댁뾿?멸???", "options": ["?숈뒿?됯?", "諛섏쓳?됯?", "?됰룞?됯?", "寃곌낵?됯?"], "correct": 1, "explanation": "1?④퀎 諛섏쓳?됯???援먯쑁?????李멸??먯쓽 留뚯”?꾩? 諛섏쓳??痢≪젙?섎뒗 ?④퀎?낅땲?? 援먯쑁 吏곹썑 ?ㅼ떆?섎ŉ ?ㅻЦ議곗궗, ?명꽣酉? 愿李??깆쓣 ?듯빐 痢≪젙?⑸땲??"}, 
    {"question": "SMART ?먯튃?먯꽌 'M'? 臾댁뾿???섎??섎굹??", "options": ["Measurable (痢≪젙媛??", "Manageable (愿由ш???", "Meaningful (?섎??덈뒗)", "Maintainable (?좎?媛??"], "correct": 0, "explanation": "SMART ?먯튃??'M'? Measurable(痢≪젙媛?????섎??⑸땲?? 紐⑺몴媛 ?섏튂濡?痢≪젙 媛?ν빐???섎ŉ, 援ъ껜?곸씤 吏?쒕? ?듯빐 ?깃낵瑜??뺤씤?????덉뼱???⑸땲??"}, 
    {"question": "援먯쑁?ъ옄?섏씡瑜?ROI) 怨꾩궛 怨듭떇? 臾댁뾿?멸???", "options": ["(援먯쑁 ?④낵 + 援먯쑁 鍮꾩슜) 첨 援먯쑁 鍮꾩슜 횞 100", "(援먯쑁 ?④낵 - 援먯쑁 鍮꾩슜) 첨 援먯쑁 鍮꾩슜 횞 100", "(援먯쑁 ?④낵 횞 援먯쑁 鍮꾩슜) 첨 100", "(援먯쑁 ?④낵 첨 援먯쑁 鍮꾩슜) 횞 100"], "correct": 1, "explanation": "ROI = (援먯쑁 ?④낵 - 援먯쑁 鍮꾩슜) 첨 援먯쑁 鍮꾩슜 횞 100?낅땲?? 援먯쑁 ?ъ옄 ?鍮??살? ?쒗렪?듭쓣 怨꾩궛?섏뿬 援먯쑁??寃쎌젣???④낵瑜?痢≪젙?⑸땲??"}, 
    {"question": "?깃낵湲곗뿬???됯???二쇱슂 紐⑹쟻? 臾댁뾿?멸???", "options": ["援먯쑁 鍮꾩슜 ?덇컧", "援먯쑁???④낵?깃낵 ?⑥쑉???뺤씤", "李멸?????利앷?", "援먯쑁 ?쒓컙 ?⑥텞"], "correct": 1, "explanation": "?깃낵湲곗뿬???됯???二쇱슂 紐⑹쟻? 援먯쑁???④낵?깃낵 ?⑥쑉?깆쓣 ?뺤씤?섎뒗 寃껋엯?덈떎. 援먯쑁??議곗쭅??紐⑺몴 ?ъ꽦怨??깃낵 ?μ긽???쇰쭏??湲곗뿬?섎뒗吏瑜?痢≪젙?⑸땲??"}, 
    {"question": "3?④퀎 ?됰룞?됯????몄젣 ?ㅼ떆?섎굹??", "options": ["援먯쑁 吏곹썑", "援먯쑁 ?꾪썑 鍮꾧탳", "援먯쑁 ??1-3媛쒖썡", "援먯쑁 ??6媛쒖썡-1??], "correct": 2, "explanation": "3?④퀎 ?됰룞?됯???援먯쑁 ??1-3媛쒖썡???ㅼ떆?⑸땲?? ???쒖젏?먯꽌 ?숈뒿???댁슜???ㅼ젣 ?낅Т???곸슜?섍퀬 ?덈뒗吏瑜??뺤씤?????덉뒿?덈떎."}
];

// ??珥덇린??諛?吏꾩엯??document.addEventListener('DOMContentLoaded', () => {
    // 1. DOM ?붿냼?ㅼ쓣 李얠븘??elements 媛앹껜???좊떦
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
    
    // 2. ??珥덇린??    initializeApp();
    
    // 3. ?꾩뿭 ?⑥닔濡??깅줉
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

// ??珥덇린???⑥닔
function initializeApp() {
    // 3. ?대깽??由ъ뒪??諛붿씤??    bindEvents();
    
    // 4. 珥덇린 ?붾㈃ ?뚮뜑留?    renderTheoryCourseCards();
    renderCourseExamples();
    renderCourses();
    renderSmartCriteria();
    updateDashboardStats();
    showDashboard();
    
    initLearningFeatures();
}

// ?대깽??由ъ뒪??諛붿씤???⑥닔
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

    // ?꾨즺 諛??ㅼ쓬 ?④퀎濡?踰꾪듉 ?대깽??由ъ뒪??異붽?
    if (elements.completeKpiBtn) {
        elements.completeKpiBtn.addEventListener('click', completeKpiStep);
    }
    
    if (elements.completeRoiBtn) {
        elements.completeRoiBtn.addEventListener('click', completeRoiStep);
    }

    // KPI ?꾧뎄 ???대깽??由ъ뒪??    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('kpi-nav-tab')) {
            const tabName = e.target.dataset.tab;
            document.querySelectorAll('.kpi-nav-tab').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.kpi-tab-content').forEach(content => content.classList.remove('active'));
            
            e.target.classList.add('active');
            document.getElementById(tabName).classList.add('active');
        }
    });

    // KPI ?앹꽦 ???쒖텧 ?대깽??    const kpiForm = document.querySelector('.kpi-generator-form');
    if (kpiForm) {
        kpiForm.addEventListener('submit', function(e) {
            e.preventDefault();
            createKPI();
        });
    }

    // ROI 怨꾩궛 踰꾪듉 ?대깽??(?대깽???꾩엫 ?ъ슜)
    document.addEventListener('click', function(e) {
        console.log('?대┃???붿냼:', e.target);
        console.log('?대┃???붿냼 ID:', e.target.id);
        console.log('?대┃???붿냼 ?대옒??', e.target.className);
        
        // ?ㅼ뒿 ??쓽 ROI 怨꾩궛 踰꾪듉
        if (e.target.id === 'calculateRoi' || e.target.classList.contains('roi-calculate-btn')) {
            console.log('ROI 怨꾩궛 踰꾪듉 ?대┃??);
            e.preventDefault();
            e.stopPropagation();
            calculateROI();
        }
        
        // ?꾧뎄 ?뱀뀡??ROI 怨꾩궛 踰꾪듉
        if (e.target.id === 'tool-calculate-roi-btn') {
            console.log('?꾧뎄 ROI 怨꾩궛 踰꾪듉 ?대┃??);
            e.preventDefault();
            e.stopPropagation();
            calculateToolROI();
        }
    });

    // ?ㅼ뒿 ??쓽 ??踰꾪듉 ?대깽??由ъ뒪??    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('tab-btn') && e.target.closest('#courseDetail')) {
            const tabName = e.target.dataset.tab;
            switchPracticeTab(tabName);
        }
    });

    // KPI ???쒖텧 ?대깽??    const newKpiForm = document.getElementById('newKpiForm');
    if (newKpiForm) {
        newKpiForm.addEventListener('submit', handleAddKpi);
    }

    // 蹂닿퀬???앹꽦 踰꾪듉 ?대깽??    const generateReportBtn = document.getElementById('generateReport');
    if (generateReportBtn) {
        generateReportBtn.addEventListener('click', generatePracticeReport);
    }
}

// ---- ?뚮뜑留??⑥닔 ----

// ?대줎 ?숈뒿 移대뱶 ?뚮뜑留?function renderTheoryCourseCards() {
    const grid = document.getElementById('theory-courses-grid');
    if (!grid) return;
    grid.innerHTML = appData.courses.map(course => `
        <div class="card course-card" data-style-id="${course.styleId || 1}">
            <div class="card__body">
                <div class="course-header">
                    <span class="course-emoji">${course.emoji || '?뱞'}</span>
                    <h4>${course.name}</h4>
                </div>
                <p>${course.description}</p>
            </div>
        </div>
    `).join('');
}

// 怨쇱젙蹂??덉떆 ?뚮뜑留?function renderCourseExamples() {
    const container = document.getElementById('course-examples-container');
    if (container) {
        container.innerHTML = generateCourseExamples();
    }
}

// 怨쇱젙蹂??덉떆 HTML ?앹꽦
function generateCourseExamples() {
    return appData.courses.map(course => `
        <div class="course-example">
            <div class="course-example-header">
                <h3><span class="course-emoji">${course.emoji || '?뱞'}</span> ${course.name}</h3>
            </div>
            <div class="course-example-content">
                <p><strong>怨쇱젙 紐⑺몴:</strong> ${course.description}</p>
                
                <h4>二쇱슂 ?깃낵 吏??(KPI)</h4>
                <div class="kpi-examples">
                    ${course.kpis.map(kpi => `
                        <div class="kpi-example">
                            <h5>${kpi.name}</h5>
                            <p><strong>紐⑺몴:</strong> ${kpi.target}</p>
                            <p><small><strong>痢≪젙 諛⑸쾿:</strong> ${kpi.method} | <strong>痢≪젙 ?쒓린:</strong> ${kpi.timing}</small></p>
                        </div>
                    `).join('')}
                </div>

                <h4>二쇱슂 ?됯? ?쒕굹由ъ삤</h4>
                <div class="scenarios-list">
                    ${(course.scenarios || []).map((scenario, index) => `
                        <div class="scenario-item">
                            <h6>${index + 1}. ${scenario.title}</h6>
                            <p>${scenario.description}</p>
                            <p><strong>?몃? ?됯? ?댁슜:</strong> ${scenario.details}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// ?ㅼ뒿 怨쇱젙 移대뱶 ?뚮뜑留?function renderCourses() {
    if (!elements.coursesContainer) return;
    elements.coursesContainer.innerHTML = '';
    elements.coursesContainer.className = 'courses-container grid grid--2';
    appData.courses.forEach(course => {
        const courseCard = createCourseCard(course);
        elements.coursesContainer.appendChild(courseCard);
    });
}

// SMART ?먯튃 ?뚮뜑留?function renderSmartCriteria() {
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

// ---- ?듭떖 濡쒖쭅 ?⑥닔 ----

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

// 援먯쑁怨쇱젙 移대뱶 ?앹꽦 (?ㅼ뒿??
function createCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'card course-card';
    card.dataset.courseId = course.id;
    card.dataset.styleId = course.styleId;

    const progress = appState.courseProgress[course.id] || 0;
    const status = progress === 100 ? 'completed' : progress > 0 ? 'in-progress' : 'not-started';
    card.dataset.status = status;

    const statusText = status === 'completed' ? '?꾨즺' : status === 'in-progress' ? '吏꾪뻾以? : '?쒖옉 ??;
    const statusClass = status === 'completed' ? 'success' : status === 'in-progress' ? 'warning' : 'info';
    const buttonText = status === 'completed' ? '寃곌낵 蹂닿린' : progress > 0 ? '?댁뼱???됯?' : '?됯? ?쒖옉';

    card.innerHTML = `
        <div class="card__body">
            <div class="course-card__header-flex">
                <div class="course-header">
                    <span class="course-emoji">${course.emoji || '?뱞'}</span>
                    <h4 class="course-card__title">${course.name}</h4>
                </div>
                <div class="course-card__status">
                    <span class="status status--${statusClass}">${statusText}</span>
                </div>
            </div>
            
            <p class="course-card__description">${course.description}</p>
            
            <div class="course-card__footer">
                <div class="course-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                    </div>
                    <span class="progress-text">吏꾪뻾瑜? ${progress}%</span>
                </div>
                <button class="btn btn--primary btn--sm course-card__button">${buttonText}</button>
            </div>
        </div>
    `;

    const button = card.querySelector('.course-card__button');
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
    console.log('?ㅼ뒿 ???꾪솚:', tabName);
    
    elements.practiceTabBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    elements.practiceTabContents.forEach(content => {
        if (content.closest('#courseDetail')) {
            content.classList.toggle('active', content.id === tabName);
        }
    });
    
    // ??퀎 ?밸퀎 泥섎━
    if (tabName === 'evaluation') {
        switchStage(appState.currentStage);
    } else if (tabName === 'kpi') {
        renderKpiList();
    } else if (tabName === 'roi') {
        // ROI ???꾪솚 ???대깽???щ컮?몃뵫
        console.log('ROI ??쑝濡??꾪솚??);
        
        // ROI 怨꾩궛 踰꾪듉??議댁옱?섎뒗吏 ?뺤씤?섍퀬 ?대깽??由ъ뒪???ъ꽕??        setTimeout(() => {
            const roiBtn = document.getElementById('calculateRoi');
            console.log('ROI 踰꾪듉 李얘린:', roiBtn);
            
            if (roiBtn) {
                console.log('ROI 踰꾪듉 諛쒓껄, ?대깽??由ъ뒪???ъ꽕??);
                
                // 湲곗〈 ?대깽??由ъ뒪???쒓굅
                roiBtn.removeEventListener('click', calculateROI);
                
                // ?덈줈???대깽??由ъ뒪??異붽?
                roiBtn.addEventListener('click', function(e) {
                    console.log('ROI 踰꾪듉 吏곸젒 ?대┃??);
                    e.preventDefault();
                    e.stopPropagation();
                    calculateROI();
                });
                
                console.log('ROI 踰꾪듉 ?대깽??由ъ뒪???ъ꽕???꾨즺');
            } else {
                console.log('ROI 踰꾪듉??李얠쓣 ???놁쓬');
            }
        }, 100);
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
    const courseKpi = appState.currentCourse.kpis.find(k => k.stage === `${stage}?④퀎`) || {};

    elements.stageContent.innerHTML = `
        <div class="stage-form">
            <h4>${stage}?④퀎: ${stageInfo.name}</h4>
            <p>${stageInfo.description}</p>
            <div class="kpi-item">
                <div class="kpi-item__name">${courseKpi.name}</div>
                <div><strong>紐⑺몴:</strong> ${courseKpi.target} | <strong>諛⑸쾿:</strong> ${courseKpi.method} | <strong>?쒓린:</strong> ${courseKpi.timing}</div>
            </div>
            <div class="form-group"><label class="form-label">?ㅼ젣 ?ъ꽦媛?/label><input type="text" class="form-control" id="actualValue" placeholder="?ㅼ젣 ?ъ꽦媛??낅젰"></div>
            <div class="form-group"><label class="form-label">?됯? ?섍껄</label><textarea class="form-control" id="evaluationComment" rows="3" placeholder="?섍껄 ?낅젰"></textarea></div>
            <div class="form-actions">
                <button class="btn btn--outline" id="prevStage" ${stage === 1 ? 'disabled' : ''}>?댁쟾 ?④퀎</button>
                <button class="btn btn--secondary" id="saveStage">?꾩떆 ???/button>
                <button class="btn btn--primary" id="nextStage">${stage === 4 ? '?됯? ?꾨즺' : '?ㅼ쓬 ?④퀎'}</button>
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
        alert('?꾩떆 ??λ릺?덉뒿?덈떎.');
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
    alert('紐⑤뱺 ?④퀎???됯?媛 ?꾨즺?섏뿀?듬땲?? 蹂닿퀬????뿉??寃곌낵瑜??뺤씤?섏꽭??');
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
        elements.kpiList.innerHTML = `<p class="empty-list-message">?ㅼ젙??KPI媛 ?놁뒿?덈떎. ?꾨옒 ?묒떇???ъ슜?섏뿬 ??KPI瑜?異붽??섏꽭??</p>`;
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
            ${isCustom ? `<button class="btn btn--danger btn--sm remove-kpi-btn">&times; ??젣</button>` : ''}
            ${canBeEdited ? `<button class="btn btn--outline btn--sm edit-kpi-btn">?섏젙</button>` : ''}
        </div>
    `;

    kpiCard.innerHTML = `
        <div class="card__body">
            <div class="kpi-card__header">
                <span class="kpi-card__stage">${kpi.stage}</span>
                <h5 class="kpi-card__name">${kpi.name}</h5>
            </div>
            <div class="kpi-card__details">
                <p><strong>紐⑺몴:</strong> ${kpi.target}</p>
                <p><strong>諛⑸쾿:</strong> ${kpi.method}</p>
                <p><strong>?쒓린:</strong> ${kpi.timing}</p>
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
                    <label class="form-label">?쒕ぉ</label>
                    <input type="text" class="form-control" id="edit-kpi-name" value="${kpi.name}">
                </div>
                <div class="form-group">
                    <label class="form-label">紐⑺몴</label>
                    <input type="text" class="form-control" id="edit-kpi-target" value="${kpi.target}">
                </div>
                <div class="form-group">
                    <label class="form-label">諛⑸쾿</label>
                    <input type="text" class="form-control" id="edit-kpi-method" value="${kpi.method}">
                </div>
                <div class="form-group">
                    <label class="form-label">?쒓린</label>
                    <input type="text" class="form-control" id="edit-kpi-timing" value="${kpi.timing}">
                </div>
                <div class="form-actions">
                    <button class="btn btn--outline cancel-kpi-changes-btn">痍⑥냼</button>
                    <button class="btn btn--primary apply-kpi-changes-btn">?곸슜</button>
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
        alert('?됯? ?④퀎, KPI 紐? 紐⑺몴移섎뒗 ?꾩닔 ??ぉ?낅땲??');
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
    alert('KPI媛 ??젣?섏뿀?듬땲??');
}

function calculateROI() {
    function safeParse(id) {
        const el = document.getElementById(id);
        if (!el) {
            console.warn(`?낅젰 ?꾨뱶 #${id}瑜?李얠쓣 ???놁뒿?덈떎.`);
            return 0;
        }
        return parseFloat(el.value) || 0;
    }

    // ?곸꽭 鍮꾩슜 ?낅젰媛믩뱾 媛?몄삤湲?    const costInstructor = safeParse('cost-instructor');
    const costMaterials = safeParse('cost-materials');
    const costOperation = safeParse('cost-operation');
    const costParticipant = safeParse('cost-participant');
    
    // ?곸꽭 ?몄씡 ?낅젰媛믩뱾 媛?몄삤湲?    const benefitProductivity = safeParse('benefit-productivity');
    const benefitQuality = safeParse('benefit-quality');
    const benefitSaving = safeParse('benefit-saving');
    const benefitOther = safeParse('benefit-other');
    
    // 湲곗〈 ?⑥닚 ?낅젰媛믩뱾???뺤씤 (?섏쐞 ?명솚??
    const simpleCost = safeParse('trainingCost');
    const simpleBenefit = safeParse('trainingBenefit');
    
    // 珥?鍮꾩슜怨?珥??몄씡 怨꾩궛
    const totalCost = costInstructor + costMaterials + costOperation + costParticipant + simpleCost;
    const totalBenefit = benefitProductivity + benefitQuality + benefitSaving + benefitOther + simpleBenefit;
    
    console.log('?낅젰媛믩뱾:', {
        costInstructor, costMaterials, costOperation, costParticipant,
        benefitProductivity, benefitQuality, benefitSaving, benefitOther,
        simpleCost, simpleBenefit,
        totalCost, totalBenefit
    });
    
    // ?낅젰媛?寃利?    if (totalCost <= 0) {
        alert('珥?援먯쑁 鍮꾩슜? 0蹂대떎 而ㅼ빞 ?⑸땲?? 鍮꾩슜 ?낅젰媛믪쓣 ?뺤씤?댁＜?몄슂.');
        return;
    }
    
    // ROI 怨꾩궛: (珥앺렪??- 珥앸퉬?? / 珥앸퉬??* 100
    const roi = ((totalBenefit - totalCost) / totalCost) * 100;
    const netBenefit = totalBenefit - totalCost;
    const paybackPeriod = totalCost > 0 ? (totalCost / (totalBenefit / 12)).toFixed(1) : 0;
    
    console.log('怨꾩궛 寃곌낵:', {
        roi: roi.toFixed(1) + '%',
        netBenefit: netBenefit.toLocaleString() + '??,
        paybackPeriod: paybackPeriod + '媛쒖썡'
    });
    
    // 寃곌낵瑜?DOM ?붿냼???쒖떆
    const netBenefitElement = document.getElementById('net-benefit');
    const roiPercentageElement = document.getElementById('roi-percentage');
    const paybackPeriodElement = document.getElementById('payback-period');
    
    // 湲곗〈 寃곌낵 ?붿냼?ㅻ룄 ?낅뜲?댄듃 (?섏쐞 ?명솚??
    const totalCostElement = document.getElementById('totalCost');
    const totalBenefitElement = document.getElementById('totalBenefit');
    const roiValueElement = document.getElementById('roiValue');
    
    // ?덈줈??寃곌낵 ?붿냼???낅뜲?댄듃
    if (netBenefitElement) {
        netBenefitElement.textContent = netBenefit.toLocaleString();
    }
    if (roiPercentageElement) {
        roiPercentageElement.textContent = roi.toFixed(1);
    }
    if (paybackPeriodElement) {
        paybackPeriodElement.textContent = paybackPeriod;
    }
    
    // 湲곗〈 寃곌낵 ?붿냼???낅뜲?댄듃 (?섏쐞 ?명솚??
    if (totalCostElement) {
        totalCostElement.textContent = `${totalCost.toLocaleString()}??;
    }
    if (totalBenefitElement) {
        totalBenefitElement.textContent = `${totalBenefit.toLocaleString()}??;
    }
    if (roiValueElement) {
        roiValueElement.textContent = `${roi.toFixed(1)}%`;
    }
    
    // ROI ?댁꽍 ?쒖떆
    const interpretationEl = document.getElementById('roiInterpretation');
    if (interpretationEl) {
        if (roi > 0) {
            interpretationEl.innerHTML = `<strong>?댁꽍:</strong> ?ъ옄??鍮꾩슜 ?鍮?<strong>${roi.toFixed(1)}%</strong>??湲띿젙?곸씤 ?섏씡??李쎌텧?덉뒿?덈떎. ?깃났?곸씤 援먯쑁 ?ъ옄濡??됯??⑸땲??`;
        } else if (roi === 0) {
            interpretationEl.innerHTML = `<strong>?댁꽍:</strong> ?ъ옄??鍮꾩슜怨??섏씡???숈씪?섏뿬 ?먯씡遺꾧린?먯뿉 ?꾨떖?덉뒿?덈떎.`;
        } else {
            interpretationEl.innerHTML = `<strong>?댁꽍:</strong> ?ъ옄??鍮꾩슜蹂대떎 ??? ?섏씡??湲곕줉?덉뒿?덈떎. 援먯쑁???④낵???먮뒗 鍮꾩슜 援ъ“瑜??ш??좏븷 ?꾩슂媛 ?덉뒿?덈떎.`;
        }
    }
    
    // 寃곌낵 而⑦뀒?대꼫 ?쒖떆
    const resultContainer = document.getElementById('roiResult');
    if (resultContainer) {
        resultContainer.classList.remove('hidden');
    }
    
    console.log('ROI 怨꾩궛 ?꾨즺');
}

function generatePracticeReport() {
    if (!elements.reportContent || !appState.currentCourse) return;

    const course = appState.currentCourse;
    const courseId = course.id;
    const evaluation = appState.evaluationData[courseId] || {};
    const progress = appState.courseProgress[courseId] || 0;

    if (progress < 100) {
        alert(`?됯?媛 ?꾩쭅 ?꾨즺?섏? ?딆븯?듬땲?? (?꾩옱 吏꾪뻾瑜? ${progress}%)\n紐⑤뱺 ?됯? ?④퀎瑜??꾨즺?댁빞 理쒖쥌 蹂닿퀬?쒕? ?앹꽦?????덉뒿?덈떎.`);
        return;
    }

    // --- Report Generation Logic ---
    let stageHtml = '';
    appData.kirkpatrickStages.forEach(stageInfo => {
        const stageData = evaluation[stageInfo.stage] || {};
        const kpiData = course.kpis.find(k => k.stage === `${stageInfo.stage}?④퀎`) || {};
        stageHtml += `
            <div class="report-stage-card">
                <div class="report-stage-card__header">${stageInfo.stage}?④퀎: ${stageInfo.name}</div>
                <div class="report-stage-card__body">
                    <p class="kpi-info"><strong>KPI:</strong> ${kpiData.name || 'N/A'}</p>
                    <div class="report-metrics">
                        <div class="metric-item"><strong>紐⑺몴</strong><span>${kpiData.target || 'N/A'}</span></div>
                        <div class="metric-item"><strong>寃곌낵</strong><span>${stageData.actualValue || '誘몄엯??}</span></div>
                    </div>
                    <div class="comment-section">
                        <strong>醫낇빀 ?섍껄:</strong>
                        <p>${stageData.comment || '?낅젰???섍껄???놁뒿?덈떎.'}</p>
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
                <h3>?깃낵湲곗뿬??理쒖쥌 ?됯? 蹂닿퀬?? ${course.name}</h3>
                <div class="report-actions">
                    <button class="btn btn--secondary btn--sm">?몄뇙?섍린</button>
                    <button class="btn btn--primary btn--sm">PDF濡??대낫?닿린</button>
                </div>
            </div>
            
            ${stageHtml}

            <div class="report-stage-card">
                <div class="report-stage-card__header">ROI 遺꾩꽍 寃곌낵</div>
                <div class="report-stage-card__body">
                    <div class="report-metrics">
                        <div class="metric-item"><strong>珥?援먯쑁 鍮꾩슜</strong><span>${cost.toLocaleString()}??/span></div>
                        <div class="metric-item"><strong>援먯쑁 珥??몄씡</strong><span>${benefit.toLocaleString()}??/span></div>
                        <div class="metric-item"><strong>ROI</strong><span class="roi-value ${roi > 0 ? 'success' : 'danger'}">${roi}%</span></div>
                    </div>
                </div>
            </div>

            <div class="report-stage-card">
                 <div class="report-stage-card__header">理쒖쥌 沅뚭퀬 ?ы빆</div>
                 <div class="report-stage-card__body">
                    <p><strong>${course.name}</strong> 怨쇱젙?????醫낇빀 ?됯?媛 ?꾨즺?섏뿀?듬땲?? 媛??④퀎蹂?寃곌낵? ROI 遺꾩꽍??諛뷀깢?쇰줈, 蹂?援먯쑁 怨쇱젙???④낵?깆쓣 ?먮떒?섍퀬 ?ν썑 媛쒖꽑 諛⑺뼢???섎┰?섎뒗 寃껋쓣 沅뚭퀬?⑸땲?? ?곸꽭 ?댁슜? ?곷떒???④퀎蹂?遺꾩꽍??李멸퀬?섏떗?쒖삤.</p>
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
                filename:     `${course.name}_?깃낵湲곗뿬??蹂닿퀬??pdf`,
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

// ---- ?대줎 ?숈뒿 愿??湲곕뒫 ----

function initLearningFeatures() {
    // ?대줎 ?숈뒿 ??쓽 ?섏쐞 ?ㅻ퉬寃뚯씠??    document.querySelectorAll('.learning-nav-btn').forEach(button => {
        button.addEventListener('click', () => {
            const targetSectionId = button.dataset.section;
            document.querySelectorAll('.learning-nav-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            document.querySelectorAll('.learning-section').forEach(section => {
                section.classList.toggle('active', section.id === targetSectionId);
            });
        });
    });

    // ?대줎 ?숈뒿 KPI ?쒕??덉씠??怨쇱젙 ?좏깮
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
                           <p><strong>紐⑺몴:</strong> ${kpi.target}</p>
                           <p><small><strong>痢≪젙 諛⑸쾿:</strong> ${kpi.method} | <strong>痢≪젙 ?쒓린:</strong> ${kpi.timing}</small></p>
                         </div>`
                    ).join('');
                    kpiTemplate.classList.remove('hidden');
                }
            } else {
                kpiTemplate.classList.add('hidden');
            }
        });
    }

    // ?대줎 ?숈뒿 ROI 怨꾩궛
    const calculateTheoryRoiBtn = document.getElementById('calculate-theory-roi');
    if (calculateTheoryRoiBtn) {
        calculateTheoryRoiBtn.addEventListener('click', () => {
            const cost = parseFloat(document.getElementById('theory-training-cost').value) || 0;
            const benefit = parseFloat(document.getElementById('theory-training-benefit').value) || 0;
            const resultDiv = document.getElementById('theory-roi-result');
            
            if (cost > 0) {
                const roi = ((benefit - cost) / cost) * 100;
                document.getElementById('theory-roi-value').textContent = `${roi.toFixed(1)}%`;
                document.getElementById('theory-roi-interpretation').textContent = `援먯쑁 ?ъ옄 ?鍮?${roi.toFixed(1)}%???섏씡瑜좎쓣 ?ъ꽦?덉뒿?덈떎.`;
                resultDiv.classList.remove('hidden');
            }
        });
    }
    
    // ?댁쫰 珥덇린??    initQuiz();
}

// ?댁쫰 愿???⑥닔??function initQuiz() {
    currentQuiz = 0;
    quizAnswers = [];
    
    // quizActions瑜??ㅼ떆 ?쒖떆
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
    // 湲곗〈 ?좏깮 ?쒓굅
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // ???좏깮 異붽?
    document.querySelectorAll('.quiz-option')[answerIndex].classList.add('selected');
    
    // ?듭븞 ???    quizAnswers[currentQuiz] = answerIndex;
}

function nextQuestion() {
    if (quizAnswers[currentQuiz] === undefined) {
        alert('?듭쓣 ?좏깮?댁＜?몄슂.');
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
    nextBtn.textContent = currentQuiz === quizData.length - 1 ? '寃곌낵 蹂닿린' : '?ㅼ쓬';
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
            <h4>?댁쫰 ?꾨즺!</h4>
            <div class="score-value">${score}??/div>
            <p>${correctCount}/${quizData.length} 臾몄젣瑜?留욏삍?듬땲??</p>
            
            <div class="quiz-feedback">
                ${quizData.map((question, index) => `
                    <div class="result-item ${quizAnswers[index] === question.correct ? 'correct' : 'incorrect'}">
                        <h5>臾몄젣 ${index + 1}: ${question.question}</h5>
                        <p><strong>???듬?:</strong> ${question.options[quizAnswers[index]]}</p>
                        <p><strong>?뺣떟:</strong> ${question.options[question.correct]}</p>
                        <p><strong>?ㅻ챸:</strong> ${question.explanation}</p>
                    </div>
                `).join('')}
            </div>
            
            <button class="btn btn--primary" onclick="initQuiz()">?ㅼ떆 ?쒕룄</button>
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
    
    // ROI 怨꾩궛???꾨즺?섏뿀?붿? ?뺤씤
    if (!costInput || !benefitInput) {
        alert('ROI 怨꾩궛??癒쇱? ?꾨즺?댁빞 ?⑸땲??\n鍮꾩슜怨??몄씡 媛믪쓣 紐⑤몢 ?낅젰?섍퀬 "ROI 怨꾩궛" 踰꾪듉???뚮윭二쇱꽭??');
        return;
    }
    
    // ROI 怨꾩궛 寃곌낵媛 ?쒖떆?섏뼱 ?덈뒗吏 ?뺤씤
    if (resultContainer && resultContainer.classList.contains('hidden')) {
        alert('ROI 怨꾩궛??癒쇱? ?꾨즺?댁빞 ?⑸땲??\n鍮꾩슜怨??몄씡 媛믪쓣 紐⑤몢 ?낅젰?섍퀬 "ROI 怨꾩궛" 踰꾪듉???뚮윭二쇱꽭??');
        return;
    }
    
    if (parseFloat(costInput.value) <= 0) {
        alert('珥?援먯쑁 鍮꾩슜? 0蹂대떎 而ㅼ빞 ?⑸땲??');
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

// ?깃낵 愿由??꾧뎄 愿???⑥닔??function showManagementMain() {
    // ?깃낵 愿由??꾧뎄 硫붿씤 ?붾㈃ ?쒖떆
    document.querySelectorAll('.tool-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById('managementMain').style.display = 'block';
}

function openKpiTool() {
    // KPI ?ㅼ젙 ?꾧뎄 ?뱀뀡 ?쒖떆
    document.querySelectorAll('.tool-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById('kpiToolSection').style.display = 'block';
    
    // KPI ?꾧뎄 ??珥덇린??    setupKpiToolTabs();
}

function openRoiCalculator() {
    // ROI 怨꾩궛湲??뱀뀡 ?쒖떆
    document.querySelectorAll('.tool-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById('roiCalculatorSection').style.display = 'block';
    
    // 珥덇린媛?怨꾩궛
    calculateToolROI();
}

function openPracticeModule() {
    // ?ㅼ뒿 紐⑤뱢 ?뱀뀡 ?쒖떆
    document.querySelectorAll('.tool-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById('practiceModuleSection').style.display = 'block';
}

function openReportGenerator() {
    // 蹂닿퀬???앹꽦 ?뱀뀡 ?쒖떆
    document.querySelectorAll('.tool-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById('reportGeneratorSection').style.display = 'block';
}

function closeAllToolSections() {
    // 紐⑤뱺 ?꾧뎄 ?뱀뀡 ?④린怨?硫붿씤 ?붾㈃ ?쒖떆
    document.querySelectorAll('.tool-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById('managementMain').style.display = 'block';
}

function setupKpiToolTabs() {
    // KPI ?꾧뎄 ??珥덇린??    const tabs = document.querySelectorAll('.kpi-nav-tab');
    const contents = document.querySelectorAll('.kpi-tab-content');
    
    // 泥?踰덉㎏ ??쓣 湲곕낯?쇰줈 ?쒖꽦??    tabs.forEach(tab => tab.classList.remove('active'));
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

// ?꾧뎄??ROI 怨꾩궛 ?⑥닔
function calculateToolROI() {
    // 援먯쑁 鍮꾩슜 怨꾩궛
    const instructorCost = parseFloat(document.getElementById('tool-cost-instructor')?.value) || 0;
    const materialsCost = parseFloat(document.getElementById('tool-cost-materials')?.value) || 0;
    const operationCost = parseFloat(document.getElementById('tool-cost-operation')?.value) || 0;
    const participantCost = parseFloat(document.getElementById('tool-cost-participant')?.value) || 0;
    
    const totalCost = instructorCost + materialsCost + operationCost + participantCost;
    
    // ?몄씡 怨꾩궛
    const productivityBenefit = parseFloat(document.getElementById('tool-benefit-productivity')?.value) || 0;
    const qualityBenefit = parseFloat(document.getElementById('tool-benefit-quality')?.value) || 0;
    const savingBenefit = parseFloat(document.getElementById('tool-benefit-saving')?.value) || 0;
    const otherBenefit = parseFloat(document.getElementById('tool-benefit-other')?.value) || 0;
    
    const totalBenefit = productivityBenefit + qualityBenefit + savingBenefit + otherBenefit;
    
    // ROI 怨꾩궛
    const netBenefit = totalBenefit - totalCost;
    const roiPercentage = totalCost > 0 ? (netBenefit / totalCost) * 100 : 0;
    const paybackPeriod = totalBenefit > 0 ? (totalCost / totalBenefit) * 12 : 0; // 媛쒖썡 ?⑥쐞
    
    // 寃곌낵 ?낅뜲?댄듃
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

// ?쒕굹由ъ삤 愿???⑥닔??function startScenario(scenarioId) {
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
        resultMessage = '?럦 ?곗닔???깃낵?낅땲??';
        resultClass = 'excellent';
    } else if (score >= 60) {
        resultMessage = '?몟 ?묓샇???깃낵?낅땲??';
        resultClass = 'good';
    } else {
        resultMessage = '?뱴 ??留롮? ?숈뒿???꾩슂?⑸땲??';
        resultClass = 'needs-improvement';
    }
    
    resultContainer.innerHTML = `
        <div class="scenario-result ${resultClass}">
            <h3>?쒕굹由ъ삤 ?됯? 寃곌낵</h3>
            <div class="result-score">
                <span class="score-number">${score}??/span>
                <span class="score-message">${resultMessage}</span>
            </div>
            <div class="result-details">
                <p>珥?${scenario.steps.length}臾몄젣 以?${correctAnswers}臾몄젣 ?뺣떟</p>
                <p>?뺣떟瑜? ${Math.round((correctAnswers / scenario.steps.length) * 100)}%</p>
            </div>
            <div class="result-actions">
                <button class="btn btn--primary" onclick="exitScenario()">??쒕낫?쒕줈 ?뚯븘媛湲?/button>
                <button class="btn btn--secondary" onclick="startScenario(${currentScenario})">?ㅼ떆 ?쒕룄?섍린</button>
            </div>
        </div>
    `;
    
    document.getElementById('scenarioContainer').style.display = 'none';
    document.getElementById('scenarioResult').style.display = 'block';
}

// ROI 怨꾩궛 ?⑥닔
function calculateROI() {
    function safeParse(id) {
        const el = document.getElementById(id);
        if (!el) {
            console.warn(`?낅젰 ?꾨뱶 #${id}瑜?李얠쓣 ???놁뒿?덈떎.`);
            return 0;
        }
        return parseFloat(el.value) || 0;
    }

    const trainingCost = safeParse('trainingCost');
    const productivityGain = safeParse('productivityGain');
    const costSaving = safeParse('costSaving');
    
    const totalBenefit = productivityGain + costSaving;
    const netBenefit = totalBenefit - trainingCost;
    const roiPercentage = trainingCost > 0 ? (netBenefit / trainingCost) * 100 : 0;
    
    const totalBenefitEl = document.getElementById('totalBenefit');
    const netBenefitEl = document.getElementById('netBenefit');
    const roiPercentageEl = document.getElementById('roiPercentage');
    const roiResultEl = document.getElementById('roiResult');
    
    if (totalBenefitEl) totalBenefitEl.textContent = totalBenefit.toLocaleString() + '??;
    if (netBenefitEl) netBenefitEl.textContent = netBenefit.toLocaleString() + '??;
