// ── 카테고리 정의 ──
const CATEGORIES = {
  all:{label:"전체",label_en:"All",emoji:"📋",img:"https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"},
  meat:{label:"육류",label_en:"Meat",emoji:"🥩",img:"https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"},
  seafood:{label:"해산물",label_en:"Seafood",emoji:"🐟",img:"https://images.pexels.com/photos/3296279/pexels-photo-3296279.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"},
  veg:{label:"채소",label_en:"Vegetables",emoji:"🥬",img:"https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"},
  fruit:{label:"과일",label_en:"Fruit",emoji:"🍎",img:"https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"},
  grain:{label:"곡물·면",label_en:"Grains",emoji:"🌾",img:"https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"},
  dairy:{label:"유제품",label_en:"Dairy",emoji:"🧀",img:"https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"},
  egg:{label:"달걀",label_en:"Eggs",emoji:"🥚",img:"https://images.pexels.com/photos/824635/pexels-photo-824635.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"},
  nut:{label:"견과·씨앗",label_en:"Nuts & Seeds",emoji:"🥜",img:"https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"},
  mushroom:{label:"버섯",label_en:"Mushroom",emoji:"🍄",img:"https://images.pexels.com/photos/1643403/pexels-photo-1643403.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"},
  legume:{label:"콩류",label_en:"Legumes",emoji:"🫘",img:"https://images.pexels.com/photos/6316673/pexels-photo-6316673.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"},
  herb:{label:"허브·향신료",label_en:"Herbs & Spices",emoji:"🌿",img:"https://images.pexels.com/photos/1340116/pexels-photo-1340116.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"},
  sauce:{label:"조미료·소스",label_en:"Sauces",emoji:"🫗",img:"https://images.pexels.com/photos/5908226/pexels-photo-5908226.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"},
  oil:{label:"기름",label_en:"Oil",emoji:"🫒",img:"https://images.pexels.com/photos/1022385/pexels-photo-1022385.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"},
  beverage:{label:"음료",label_en:"Beverages",emoji:"☕",img:"https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"},
  processed:{label:"가공식품",label_en:"Processed",emoji:"🥫",img:"https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"},
};

// ── 식재료 DB (350+ 재료, 15개 카테고리) ──
const DB = {
  "소고기":{cat:"meat",en:"Beef",emoji:"🥩",defaultG:200,comp:{protein:26,fat:15,carbs:0,water:59,fiber:0},amino:["글루탐산","리신","류신","이소류신","발린"],vit:{B12:2.6,B6:0.4,niacin:5.1,iron:2.6,zinc:4.8,phosphorus:198,selenium:18.2,magnesium:21},compounds:["미오글로빈","콜라겐","크레아틴","카르노신"],flavor:{umami:80,sweet:10,salty:5,sour:0,bitter:5},sci:{glu:3.3,imp:230,asparagine:0.04,free_glu:33}},
  "돼지고기":{cat:"meat",en:"Pork",emoji:"🥓",defaultG:200,comp:{protein:27,fat:14,carbs:0,water:58,fiber:0},amino:["글루탐산","리신","류신","이소류신"],vit:{B1:0.73,B6:0.5,niacin:8.9,iron:2.2,zinc:2.8,phosphorus:210,selenium:28,magnesium:22},compounds:["미오글로빈","카르니틴","크레아틴"],flavor:{umami:75,sweet:8,salty:5,sour:0,bitter:5},sci:{glu:2.8,imp:200,asparagine:0.03}},
  "닭가슴살":{cat:"meat",en:"Chicken Breast",emoji:"🍗",defaultG:200,comp:{protein:31,fat:3.6,carbs:0,water:65,fiber:0},amino:["류신","리신","메티오닌","트립토판"],vit:{B6:0.88,niacin:9.9,selenium:27.4,phosphorus:228,magnesium:29},compounds:["미오글로빈","카르노신","안세린"],flavor:{umami:60,sweet:5,salty:5,sour:0,bitter:5},sci:{glu:3.0,imp:280,asparagine:0.03}},
  "닭다리":{cat:"meat",en:"Chicken Leg",emoji:"🍗",defaultG:200,comp:{protein:26,fat:8,carbs:0,water:65,fiber:0},amino:["류신","리신"],vit:{B6:0.4,niacin:6.2,iron:1.4,zinc:2.8},compounds:["미오글로빈","콜라겐"],flavor:{umami:65,sweet:6,salty:5,sour:0,bitter:5}},
  "양고기":{cat:"meat",en:"Lamb",emoji:"🐑",defaultG:200,comp:{protein:25,fat:16,carbs:0,water:58,fiber:0},amino:["글루탐산","류신","리신"],vit:{B12:2.4,B6:0.3,iron:2.3},compounds:["미오글로빈","카르노신","카르니틴"],flavor:{umami:78,sweet:10,salty:6,sour:0,bitter:6}},
  "오리고기":{cat:"meat",en:"Duck",emoji:"🦆",defaultG:200,comp:{protein:19,fat:28,carbs:0,water:52,fiber:0},amino:["글루탐산","류신"],vit:{B12:2.8,iron:3.8,zinc:3.2},compounds:["미오글로빈","철분"],flavor:{umami:70,sweet:8,salty:5,sour:0,bitter:8}},
  "베이컨":{cat:"meat",en:"Bacon",emoji:"🥓",defaultG:30,comp:{protein:37,fat:61,carbs:0,water:1,fiber:0},amino:["류신","리신"],vit:{B1:0.62,B6:0.5,niacin:6.8},compounds:["니트로사민","스모키 향료"],flavor:{umami:85,sweet:5,salty:85,sour:0,bitter:5}},
  "소시지":{cat:"meat",en:"Sausage",emoji:"🌭",defaultG:50,comp:{protein:12,fat:28,carbs:4,water:55,fiber:0},amino:["류신","리신"],vit:{sodium:1100,iron:0.9},compounds:["니트라이트","타우린"],flavor:{umami:75,sweet:10,salty:75,sour:5,bitter:5}},
  "햄":{cat:"meat",en:"Ham",emoji:"🍖",defaultG:50,comp:{protein:13,fat:6.5,carbs:1.5,water:79,fiber:0},amino:["류신","리신"],vit:{B1:0.53,iron:0.8},compounds:["니트라이트","글루탐산"],flavor:{umami:70,sweet:8,salty:70,sour:3,bitter:5}},

  "연어":{cat:"seafood",en:"Salmon",emoji:"🐟",defaultG:150,comp:{protein:25,fat:11,carbs:0,water:63,fiber:0},amino:["류신","리신","메티오닌","트립토판"],vit:{D:12.5,B12:3.2,selenium:36,omega3:2.3,phosphorus:240,magnesium:29},compounds:["아스타잔틴","오메가-3","카르노신"],flavor:{umami:70,sweet:8,salty:5,sour:5,bitter:5},sci:{glu:2.1,imp:290,free_glu:20}},
  "참치":{cat:"seafood",en:"Tuna",emoji:"🐟",defaultG:150,comp:{protein:29,fat:1.3,carbs:0,water:69,fiber:0},amino:["류신","리신"],vit:{B12:9.3,niacin:7.2,selenium:90,omega3:0.2},compounds:["미오글로빈","아스타잔틴","타우린"],flavor:{umami:80,sweet:10,salty:5,sour:5,bitter:3}},
  "새우":{cat:"seafood",en:"Shrimp",emoji:"🦐",defaultG:100,comp:{protein:24,fat:0.3,carbs:0,water:75,fiber:0},amino:["류신","리신","메티오닌","글리신"],vit:{B12:1.68,selenium:38,calcium:52,iodine:150,phosphorus:205,magnesium:37},compounds:["아스타잔틴","타우린","퀵토산"],flavor:{umami:75,sweet:8,salty:5,sour:5,bitter:3},sci:{glu:1.5,imp:180,free_glu:45}},
  "고등어":{cat:"seafood",en:"Mackerel",emoji:"🐟",defaultG:150,comp:{protein:20,fat:13,carbs:0,water:66,fiber:0},amino:["류신","리신"],vit:{B12:10,D:17.6,selenium:44,omega3:2.6},compounds:["아스타잔틴","오메가-3"],flavor:{umami:75,sweet:8,salty:5,sour:5,bitter:5}},
  "오징어":{cat:"seafood",en:"Squid",emoji:"🦑",defaultG:100,comp:{protein:15,fat:0.4,carbs:3,water:81,fiber:0},amino:["류신","리신"],vit:{B12:0.48,selenium:23,iodine:100},compounds:["타우린","키토산","글루탐산"],flavor:{umami:75,sweet:5,salty:5,sour:5,bitter:3}},
  "조개":{cat:"seafood",en:"Clam",emoji:"🦪",defaultG:100,comp:{protein:12,fat:0.5,carbs:4.5,water:82,fiber:0},amino:["류신","리신"],vit:{B12:24,iron:28,selenium:63,zinc:9.2},compounds:["타우린","글리신"],flavor:{umami:80,sweet:15,salty:5,sour:10,bitter:3}},
  "게":{cat:"seafood",en:"Crab",emoji:"🦀",defaultG:100,comp:{protein:19,fat:1,carbs:0,water:79,fiber:0},amino:["류신","리신","메티오닌"],vit:{B12:9.8,calcium:278,zinc:4.1},compounds:["키토산","타우린"],flavor:{umami:80,sweet:10,salty:8,sour:5,bitter:3}},
  "문어":{cat:"seafood",en:"Octopus",emoji:"🐙",defaultG:100,comp:{protein:18,fat:0.8,carbs:0,water:80,fiber:0},amino:["류신","리신"],vit:{B12:17.66,selenium:78},compounds:["타우린","폴리아민"],flavor:{umami:78,sweet:5,salty:5,sour:5,bitter:3}},
  "꽁치":{cat:"seafood",en:"Pacific Saury",emoji:"🐟",defaultG:150,comp:{protein:19,fat:13,carbs:0,water:67,fiber:0},amino:["류신","리신"],vit:{B12:9.9,D:13,omega3:2.1},compounds:["오메가-3","아스타잔틴"],flavor:{umami:72,sweet:8,salty:5,sour:5,bitter:5}},
  "대구":{cat:"seafood",en:"Cod",emoji:"🐟",defaultG:150,comp:{protein:17,fat:0.7,carbs:0,water:82,fiber:0},amino:["류신","리신"],vit:{B12:1.6,selenium:32},compounds:["타우린","글리신"],flavor:{umami:70,sweet:5,salty:5,sour:5,bitter:3}},
  "광어":{cat:"seafood",en:"Halibut",emoji:"🐟",defaultG:150,comp:{protein:20,fat:1.5,carbs:0,water:78,fiber:0},amino:["류신","리신"],vit:{B12:1.8,selenium:36,D:5.1},compounds:["타우린","글리신"],flavor:{umami:75,sweet:5,salty:5,sour:5,bitter:3}},
  "멸치":{cat:"seafood",en:"Anchovy",emoji:"🐟",defaultG:30,comp:{protein:66,fat:3,carbs:0,water:17,fiber:0},amino:["류신","리신"],vit:{B12:51,calcium:520,iron:18},compounds:["타우린","칼슘"],flavor:{umami:90,sweet:5,salty:60,sour:5,bitter:3}},
  "전복":{cat:"seafood",en:"Abalone",emoji:"🐚",defaultG:100,comp:{protein:19,fat:1,carbs:2,water:77,fiber:0},amino:["글리신","류신"],vit:{B12:5.7,calcium:166,iron:4},compounds:["타우린","키토산"],flavor:{umami:80,sweet:15,salty:5,sour:8,bitter:3}},

  "양파":{cat:"veg",en:"Onion",emoji:"🧅",defaultG:150,comp:{protein:1.1,fat:0.1,carbs:9.3,water:89,fiber:1.7},amino:["시스테인"],vit:{C:7.4,B6:0.12,folate:19,potassium:146},compounds:["알리신","퀘르세틴","프로필 설파이드","프럭토올리고당"],flavor:{umami:20,sweet:40,salty:0,sour:5,bitter:15}},
  "마늘":{cat:"veg",en:"Garlic",emoji:"🧄",defaultG:10,comp:{protein:6.4,fat:0.5,carbs:33,water:59,fiber:2.1},amino:["시스테인","메티오닌","글루탐산"],vit:{C:31,B6:1.24,manganese:1.67,selenium:14.2,phosphorus:153,calcium:181},compounds:["알리신","알리인","디알릴 설파이드","아조엔","폴리페놀"],flavor:{umami:30,sweet:10,salty:0,sour:5,bitter:20},sci:{allicin:4.4,free_glu:100}},
  "감자":{cat:"veg",en:"Potato",emoji:"🥔",defaultG:200,comp:{protein:2,fat:0.1,carbs:17,water:79,fiber:2.2},amino:["아스파르트산","글루탐산"],vit:{C:19.7,B6:0.3,potassium:425,magnesium:23,phosphorus:57},compounds:["전분(아밀로스)","솔라닌","클로로겐산","아스파라긴","폴리페놀"],flavor:{umami:10,sweet:15,salty:0,sour:0,bitter:5},sci:{asparagine:0.3,free_glu:18}},
  "토마토":{cat:"veg",en:"Tomato",emoji:"🍅",defaultG:150,comp:{protein:0.9,fat:0.2,carbs:3.9,water:94,fiber:1.2},amino:["글루탐산"],vit:{C:14,A:42,K:7.9,potassium:237,lycopene:2573,magnesium:11,phosphorus:24},compounds:["리코펜","글루탐산","시트르산","나린게닌","폴리페놀","카로티노이드"],flavor:{umami:60,sweet:25,salty:0,sour:40,bitter:5},sci:{glu:0.14,free_glu:246}},
  "고추":{cat:"veg",en:"Chili Pepper",emoji:"🌶️",defaultG:15,comp:{protein:1.9,fat:0.4,carbs:8.8,water:88,fiber:1.5},amino:["글루탐산"],vit:{C:144,A:48,B6:0.51,potassium:322},compounds:["캡사이신","디하이드로캡사이신","카로티노이드","폴리페놀"],flavor:{umami:5,sweet:15,salty:0,sour:5,bitter:10},sci:{capsaicin:0.2}},
  "브로콜리":{cat:"veg",en:"Broccoli",emoji:"🥦",defaultG:100,comp:{protein:2.8,fat:0.4,carbs:7,water:89,fiber:2.4},amino:["글루탐산","아스파르트산"],vit:{C:89,K:102,folate:63,calcium:47,magnesium:21,phosphorus:66,iron:0.73},compounds:["설포라판","인돌","캐롤","클로로필","글루코시놀레이트","카로티노이드","폴리페놀"],flavor:{umami:25,sweet:10,salty:0,sour:5,bitter:25}},
  "당근":{cat:"veg",en:"Carrot",emoji:"🥕",defaultG:100,comp:{protein:0.9,fat:0.2,carbs:10,water:88,fiber:2.8},amino:["글루탐산"],vit:{A:835,K:13.2,potassium:320,C:5.9,phosphorus:35,magnesium:12},compounds:["베타카로틴","리코펜","루테올린","카로티노이드","폴리페놀"],flavor:{umami:10,sweet:35,salty:0,sour:5,bitter:5}},
  "시금치":{cat:"veg",en:"Spinach",emoji:"🥬",defaultG:100,comp:{protein:2.7,fat:0.4,carbs:3.6,water:91,fiber:2.2},amino:["글루탐산"],vit:{K:483,A:469,C:28,folate:194,iron:2.7,calcium:99,magnesium:79,phosphorus:49},compounds:["루테인","비올란틴","클로로필","폴리페놀","옥살산","베타카로틴"],flavor:{umami:30,sweet:5,salty:0,sour:5,bitter:20}},
  "배추":{cat:"veg",en:"Napa Cabbage",emoji:"🥬",defaultG:100,comp:{protein:1.2,fat:0.2,carbs:3.2,water:95,fiber:1},amino:[],vit:{C:21,K:63,calcium:77},compounds:["카로틴","클로로필","설포라판"],flavor:{umami:15,sweet:10,salty:0,sour:5,bitter:10}},
  "파프리카":{cat:"veg",en:"Bell Pepper",emoji:"🫑",defaultG:100,comp:{protein:0.9,fat:0.3,carbs:6,water:92,fiber:2},amino:[],vit:{C:80,A:314,B6:0.3,potassium:211},compounds:["캡산토인","카로티노이드"],flavor:{umami:15,sweet:45,salty:0,sour:10,bitter:5}},
  "양배추":{cat:"veg",en:"Cabbage",emoji:"🥬",defaultG:100,comp:{protein:1.3,fat:0.1,carbs:5.2,water:92,fiber:2.4},amino:["글루탐산"],vit:{C:36.6,K:101,folate:43,calcium:40,magnesium:12,phosphorus:26},compounds:["설포라판","인돌","카로티노이드","글루코시놀레이트","클로로필","폴리페놀"],flavor:{umami:15,sweet:15,salty:0,sour:5,bitter:15}},
  "오이":{cat:"veg",en:"Cucumber",emoji:"🥒",defaultG:150,comp:{protein:0.7,fat:0.2,carbs:3.6,water:95,fiber:0.5},amino:[],vit:{C:2.8,K:16.4,potassium:147},compounds:["큐커비타신","클로로필"],flavor:{umami:5,sweet:5,salty:0,sour:10,bitter:10}},
  "호박":{cat:"veg",en:"Squash",emoji:"🎃",defaultG:100,comp:{protein:1,fat:0.1,carbs:5,water:94,fiber:0.5},amino:[],vit:{A:426,C:12,potassium:340},compounds:["베타카로틴","루테인"],flavor:{umami:10,sweet:20,salty:0,sour:5,bitter:5}},
  "가지":{cat:"veg",en:"Eggplant",emoji:"🍆",defaultG:100,comp:{protein:1.1,fat:0.2,carbs:5.2,water:92,fiber:3},amino:[],vit:{C:3.5,K:29,potassium:229},compounds:["알카로이드","안토시아닌"],flavor:{umami:15,sweet:5,salty:0,sour:5,bitter:15}},
  "셀러리":{cat:"veg",en:"Celery",emoji:"🌿",defaultG:100,comp:{protein:0.7,fat:0.1,carbs:3.7,water:95,fiber:1.6},amino:[],vit:{C:3.1,K:29.3,potassium:260},compounds:["3-n-부틸프탈라이드","루테올린"],flavor:{umami:10,sweet:5,salty:0,sour:10,bitter:15}},
  "아스파라거스":{cat:"veg",en:"Asparagus",emoji:"🥒",defaultG:100,comp:{protein:2.2,fat:0.1,carbs:3.7,water:93,fiber:2.1},amino:["글루탐산"],vit:{K:91.5,folate:52,C:5.6,A:38},compounds:["루틴","글루타치온"],flavor:{umami:25,sweet:5,salty:0,sour:5,bitter:10}},
  "무":{cat:"veg",en:"Daikon",emoji:"🌰",defaultG:100,comp:{protein:0.7,fat:0.1,carbs:3.4,water:95,fiber:1.6},amino:[],vit:{C:25,K:1.3,potassium:233},compounds:["미로시나아제","글루코시놀레이트"],flavor:{umami:5,sweet:5,salty:0,sour:20,bitter:10}},
  "콩나물":{cat:"veg",en:"Bean Sprouts",emoji:"🌱",defaultG:100,comp:{protein:3.1,fat:0.2,carbs:6,water:90,fiber:1},amino:["류신","리신"],vit:{C:20,K:34,folate:95},compounds:["사포닌","이소플라본"],flavor:{umami:10,sweet:10,salty:0,sour:5,bitter:5}},
  "부추":{cat:"veg",en:"Asian Chives",emoji:"🌿",defaultG:100,comp:{protein:2.4,fat:0.4,carbs:6.2,water:90,fiber:1.3},amino:[],vit:{C:23,K:213,A:77},compounds:["알리신","퀘르세틴"],flavor:{umami:20,sweet:10,salty:0,sour:5,bitter:15}},
  "파":{cat:"veg",en:"Green Onion",emoji:"🌿",defaultG:100,comp:{protein:1.9,fat:0.3,carbs:7.3,water:89,fiber:1.4},amino:[],vit:{C:18,K:103,A:110},compounds:["알리신","퀘르세틴"],flavor:{umami:15,sweet:15,salty:0,sour:5,bitter:15}},
  "미나리":{cat:"veg",en:"Water Parsley",emoji:"🌿",defaultG:100,comp:{protein:2.1,fat:0.1,carbs:4.1,water:93,fiber:1},amino:[],vit:{A:337,C:41,K:145},compounds:["데카날데하이드","데카놀"],flavor:{umami:10,sweet:5,salty:0,sour:5,bitter:15}},
  "피망":{cat:"veg",en:"Green Pepper",emoji:"🫑",defaultG:100,comp:{protein:0.9,fat:0.3,carbs:6,water:92,fiber:2},amino:[],vit:{C:80,A:314,K:49},compounds:["캡산토인","카로티노이드"],flavor:{umami:15,sweet:40,salty:0,sour:10,bitter:5}},
  "비트":{cat:"veg",en:"Beet",emoji:"🥗",defaultG:100,comp:{protein:1.6,fat:0.2,carbs:9.6,water:88,fiber:2.8},amino:["베타인"],vit:{C:4.9,folate:109,K:0.5,potassium:325},compounds:["베타인","베타라닌","안토시아닌"],flavor:{umami:15,sweet:30,salty:0,sour:10,bitter:5}},
  "케일":{cat:"veg",en:"Kale",emoji:"🥬",defaultG:100,comp:{protein:3.3,fat:0.7,carbs:6.6,water:84,fiber:1.3},amino:["글루탐산","알라닌"],vit:{K:704,A:478,C:120,calcium:254,magnesium:34,iron:1.6,phosphorus:55},compounds:["설포라판","루테인","루틴","글루코시놀레이트","클로로필","베타카로틴","폴리페놀"],flavor:{umami:25,sweet:5,salty:0,sour:5,bitter:30}},
  "고구마":{cat:"veg",en:"Sweet Potato",emoji:"🍠",defaultG:100,comp:{protein:1.6,fat:0.1,carbs:20,water:77,fiber:3},amino:[],vit:{A:961,C:8.8,B6:0.28,potassium:337},compounds:["베타카로틴","안토시아닌"],flavor:{umami:5,sweet:40,salty:0,sour:5,bitter:5}},
  "옥수수":{cat:"veg",en:"Corn",emoji:"🌽",defaultG:100,comp:{protein:3.2,fat:1.2,carbs:19,water:76,fiber:2.7},amino:["루신"],vit:{B1:0.39,B5:0.42,C:6.8},compounds:["루테인","지아잔틴"],flavor:{umami:10,sweet:25,salty:0,sour:0,bitter:5}},

  "사과":{cat:"fruit",en:"Apple",emoji:"🍎",defaultG:150,comp:{protein:0.3,fat:0.2,carbs:14,water:85,fiber:2.4},amino:[],vit:{C:5.7,K:3.7,potassium:195,magnesium:5},compounds:["퀘르세틴","클로로겐산","프로시아니딘","폴리페놀","카테킨"],flavor:{umami:5,sweet:45,salty:0,sour:15,bitter:5}},
  "바나나":{cat:"fruit",en:"Banana",emoji:"🍌",defaultG:100,comp:{protein:1.1,fat:0.3,carbs:23,water:75,fiber:2.6},amino:["트립토판","세로토닌"],vit:{B6:0.4,C:8.7,potassium:358},compounds:["푼오이신","세로토닌"],flavor:{umami:5,sweet:50,salty:0,sour:5,bitter:3}},
  "딸기":{cat:"fruit",en:"Strawberry",emoji:"🍓",defaultG:100,comp:{protein:0.7,fat:0.3,carbs:8,water:91,fiber:2},amino:[],vit:{C:58.8,K:2.2,folate:25},compounds:["엘라그산","안토시아닌","카테킨"],flavor:{umami:5,sweet:40,salty:0,sour:20,bitter:5}},
  "블루베리":{cat:"fruit",en:"Blueberry",emoji:"🫐",defaultG:100,comp:{protein:0.7,fat:0.3,carbs:14,water:84,fiber:2.4},amino:[],vit:{C:9.7,K:19.3,E:0.57,manganese:0.34,magnesium:6},compounds:["안토시아닌","카테킨","리사린","폴리페놀","프로안토시아니딘"],flavor:{umami:5,sweet:35,salty:0,sour:15,bitter:10}},
  "아보카도":{cat:"fruit",en:"Avocado",emoji:"🥑",defaultG:100,comp:{protein:2,fat:15,carbs:9,water:73,fiber:7},amino:["글루탐산"],vit:{K:21,C:10,B5:1.4,potassium:485},compounds:["글루타치온","카로티노이드"],flavor:{umami:15,sweet:5,salty:0,sour:5,bitter:5}},
  "포도":{cat:"fruit",en:"Grape",emoji:"🍇",defaultG:100,comp:{protein:0.7,fat:0.4,carbs:17,water:81,fiber:0.9},amino:[],vit:{C:3.2,K:191,potassium:191},compounds:["레스베라트롤","탄닌","안토시아닌"],flavor:{umami:5,sweet:50,salty:0,sour:10,bitter:5}},
  "수박":{cat:"fruit",en:"Watermelon",emoji:"🍉",defaultG:150,comp:{protein:0.6,fat:0.2,carbs:12,water:87,fiber:0.4},amino:[],vit:{C:8.1,A:28,lycopene:4532},compounds:["시트룰린","리코펜"],flavor:{umami:5,sweet:40,salty:0,sour:10,bitter:3}},
  "키위":{cat:"fruit",en:"Kiwi",emoji:"🥝",defaultG:100,comp:{protein:1.1,fat:0.5,carbs:15,water:83,fiber:3},amino:["글루탐산"],vit:{C:92.7,K:312,potassium:312},compounds:["악티니딘","플라보노이드"],flavor:{umami:5,sweet:40,salty:0,sour:25,bitter:5}},
  "레몬":{cat:"fruit",en:"Lemon",emoji:"🍋",defaultG:30,comp:{protein:1.1,fat:0.3,carbs:9.3,water:89,fiber:2.8},amino:[],vit:{C:53,folate:11,potassium:138},compounds:["시트르산","리모넨","아스코르브산","헤스페리딘"],flavor:{umami:0,sweet:10,salty:0,sour:90,bitter:15}},
  "오렌지":{cat:"fruit",en:"Orange",emoji:"🍊",defaultG:100,comp:{protein:0.7,fat:0.2,carbs:12,water:87,fiber:2.4},amino:[],vit:{C:53.2,folate:30,potassium:181},compounds:["플라보노이드","나린게닌","헤스페리딘"],flavor:{umami:5,sweet:45,salty:0,sour:15,bitter:5}},
  "자몽":{cat:"fruit",en:"Grapefruit",emoji:"🍊",defaultG:100,comp:{protein:0.8,fat:0.1,carbs:13,water:86,fiber:1.6},amino:[],vit:{C:33.3,potassium:135},compounds:["나린진","푸라노쿠마린","리모노이드"],flavor:{umami:5,sweet:35,salty:0,sour:35,bitter:20}},
  "망고":{cat:"fruit",en:"Mango",emoji:"🥭",defaultG:100,comp:{protein:0.7,fat:0.3,carbs:15,water:84,fiber:1.6},amino:[],vit:{A:765,C:36.4,potassium:168},compounds:["망기페린","안토시아닌"],flavor:{umami:5,sweet:55,salty:0,sour:10,bitter:3}},
  "파인애플":{cat:"fruit",en:"Pineapple",emoji:"🍍",defaultG:100,comp:{protein:0.5,fat:0.1,carbs:13,water:86,fiber:1.4},amino:[],vit:{C:47.8,B6:0.11,potassium:109},compounds:["브로멜라인","프로산토시아니딘"],flavor:{umami:5,sweet:45,salty:0,sour:30,bitter:5}},
  "복숭아":{cat:"fruit",en:"Peach",emoji:"🍑",defaultG:100,comp:{protein:0.9,fat:0.3,carbs:10,water:89,fiber:1.5},amino:[],vit:{C:6.6,A:16,potassium:190},compounds:["엘라그산","클로로겐산"],flavor:{umami:5,sweet:45,salty:0,sour:10,bitter:5}},
  "배":{cat:"fruit",en:"Pear",emoji:"🍐",defaultG:100,comp:{protein:0.4,fat:0.1,carbs:15,water:84,fiber:3.1},amino:[],vit:{C:4.6,K:1.6,potassium:116},compounds:["아라분","클로로겐산"],flavor:{umami:5,sweet:40,salty:0,sour:10,bitter:5}},
  "감":{cat:"fruit",en:"Persimmon",emoji:"🍂",defaultG:100,comp:{protein:0.8,fat:0.3,carbs:19,water:80,fiber:1.6},amino:[],vit:{A:81,C:7.5,potassium:161},compounds:["탄닌","카로티노이드"],flavor:{umami:5,sweet:55,salty:0,sour:5,bitter:10}},

  "밀가루":{cat:"grain",en:"Flour",emoji:"🌾",defaultG:30,comp:{protein:10,fat:1,carbs:76,water:11,fiber:2.7},amino:["글루텐","글리아딘"],vit:{B1:0.12,B2:0.07,niacin:0.6,iron:4.6},compounds:["글루텐","카로티노이드"],flavor:{umami:10,sweet:15,salty:0,sour:0,bitter:0}},
  "파스타":{cat:"grain",en:"Pasta",emoji:"🍝",defaultG:100,comp:{protein:13,fat:1.1,carbs:75,water:10,fiber:1.8},amino:["글루탐산"],vit:{B1:0.28,B2:0.1,niacin:2,iron:1.3},compounds:["글루텐","전분"],flavor:{umami:15,sweet:10,salty:0,sour:0,bitter:0}},
  "귀리":{cat:"grain",en:"Oats",emoji:"🌾",defaultG:50,comp:{protein:17,fat:7,carbs:66,water:8,fiber:10.6},amino:["글루탐산"],vit:{B1:0.76,B5:1.35,iron:4.7},compounds:["베타글루칸","아베나안토사이드"],flavor:{umami:15,sweet:15,salty:0,sour:0,bitter:10}},
  "메밀":{cat:"grain",en:"Buckwheat",emoji:"🌾",defaultG:30,comp:{protein:13,fat:3,carbs:71,water:12,fiber:10},amino:["글루탐산"],vit:{B1:0.10,B2:0.44,rutin:30},compounds:["루틴","플라보노이드"],flavor:{umami:10,sweet:10,salty:0,sour:0,bitter:5}},
  "현미":{cat:"grain",en:"Brown Rice",emoji:"🍚",defaultG:150,comp:{protein:3,fat:1,carbs:28,water:68,fiber:0.8},amino:["글루탐산"],vit:{B1:0.12,B3:1.5,manganese:1.3,magnesium:84},compounds:["감마오리자놀","토코트리에놀"],flavor:{umami:10,sweet:20,salty:0,sour:0,bitter:5}},
  "쌀":{cat:"grain",en:"Rice",emoji:"🍚",defaultG:150,comp:{protein:2.7,fat:0.3,carbs:28,water:69,fiber:0.4},amino:["글루탐산"],vit:{B1:0.02,B3:0.4,iron:0.2},compounds:["아밀로스","아밀로펙틴","감마오리자놀"],flavor:{umami:10,sweet:20,salty:0,sour:0,bitter:0}},
  "식빵":{cat:"grain",en:"White Bread",emoji:"🍞",defaultG:30,comp:{protein:8,fat:2,carbs:49,water:38,fiber:2.4},amino:["글루텐"],vit:{B1:0.12,B2:0.07,folate:32},compounds:["글루텐","몰드","효모"],flavor:{umami:15,sweet:15,salty:10,sour:5,bitter:0}},
  "우동면":{cat:"grain",en:"Udon Noodles",emoji:"🍜",defaultG:100,comp:{protein:9,fat:0.3,carbs:62,water:28,fiber:1.8},amino:["글루탐산"],vit:{B1:0.14,B2:0.08,niacin:1.2},compounds:["글루텐","전분"],flavor:{umami:20,sweet:10,salty:15,sour:0,bitter:0}},
  "라면(건면)":{cat:"grain",en:"Instant Ramen",emoji:"🍜",defaultG:100,comp:{protein:8,fat:3,carbs:65,water:13,fiber:2},amino:["글루탐산"],vit:{B1:0.12,B2:0.07},compounds:["글루텐","전분"],flavor:{umami:25,sweet:10,salty:50,sour:5,bitter:0}},

  "우유":{cat:"dairy",en:"Milk",emoji:"🥛",defaultG:200,comp:{protein:3.2,fat:3.6,carbs:4.8,water:87,fiber:0},amino:["류신","리신","메티오닌"],vit:{A:28,D:0.06,B12:0.4,calcium:113,phosphorus:84},compounds:["카제인","유청","락토스"],flavor:{umami:20,sweet:20,salty:10,sour:5,bitter:0}},
  "치즈":{cat:"dairy",en:"Cheese",emoji:"🧀",defaultG:30,comp:{protein:25,fat:33,carbs:1,water:37,fiber:0},amino:["류신","리신"],vit:{A:721,B12:1.3,calcium:721,phosphorus:456},compounds:["카제인","지방","락토스"],flavor:{umami:65,sweet:5,salty:50,sour:10,bitter:5}},
  "크림":{cat:"dairy",en:"Cream",emoji:"🍶",defaultG:30,comp:{protein:2.3,fat:34,carbs:3,water:61,fiber:0},amino:["류신"],vit:{A:1000,D:0.3,B12:0.2},compounds:["지방","카제인"],flavor:{umami:10,sweet:15,salty:10,sour:5,bitter:0}},
  "요거트":{cat:"dairy",en:"Yogurt",emoji:"🥛",defaultG:150,comp:{protein:3.5,fat:0.4,carbs:4,water:88,fiber:0},amino:["류신","리신"],vit:{B12:0.3,calcium:121,phosphorus:95},compounds:["프로바이오틱스","락토스"],flavor:{umami:15,sweet:15,salty:5,sour:30,bitter:0}},
  "생크림":{cat:"dairy",en:"Heavy Cream",emoji:"🍶",defaultG:30,comp:{protein:2,fat:35,carbs:2.8,water:60,fiber:0},amino:[],vit:{A:1200,D:0.4},compounds:["지방","카제인"],flavor:{umami:5,sweet:15,salty:10,sour:5,bitter:0}},
  "모짜렐라":{cat:"dairy",en:"Mozzarella",emoji:"🧀",defaultG:30,comp:{protein:28,fat:17,carbs:3.1,water:51,fiber:0},amino:["류신","리신"],vit:{calcium:505,phosphorus:390},compounds:["카제인"],flavor:{umami:45,sweet:5,salty:40,sour:10,bitter:0}},
  "파르메산":{cat:"dairy",en:"Parmesan",emoji:"🧀",defaultG:10,comp:{protein:38,fat:29,carbs:4,water:27,fiber:0},amino:["글루탐산"],vit:{calcium:1109,phosphorus:738},compounds:["글루탐산나트륨","카제인"],flavor:{umami:80,sweet:0,salty:60,sour:10,bitter:3}},

  "계란":{cat:"egg",en:"Egg",emoji:"🥚",defaultG:60,comp:{protein:13,fat:11,carbs:1.1,water:75,fiber:0},amino:["류신","리신","메티오닌","트립토판","시스테인"],vit:{A:160,D:2.0,B12:0.89,selenium:30.7,choline:294,phosphorus:198,iron:1.75,zinc:1.29,folate:47,K:0.3},compounds:["오보알부민","오보뮤코이드","레시틴","루테인"],flavor:{umami:30,sweet:5,salty:5,sour:0,bitter:0},sci:{lecithin:1500,glu:1.7,free_glu:23}},
  "메추리알":{cat:"egg",en:"Quail Egg",emoji:"🥚",defaultG:10,comp:{protein:13,fat:11,carbs:0.4,water:74,fiber:0},amino:["류신","리신"],vit:{B12:0.64,selenium:32,choline:210},compounds:["오보알부민"],flavor:{umami:25,sweet:5,salty:5,sour:0,bitter:0}},
  "오리알":{cat:"egg",en:"Duck Egg",emoji:"🥚",defaultG:70,comp:{protein:13,fat:14,carbs:0.9,water:72,fiber:0},amino:["류신","리신"],vit:{B12:0.92,selenium:37},compounds:["오보알부민"],flavor:{umami:30,sweet:5,salty:5,sour:0,bitter:0}},
  "달걀흰자":{cat:"egg",en:"Egg White",emoji:"🥚",defaultG:50,comp:{protein:10.9,fat:0.2,carbs:0.7,water:88,fiber:0},amino:["알부민","오보무신","오보트랜스페린"],vit:{B2:0.44,B5:0.19,selenium:20},compounds:["오보알부민","리소자임","아비딘"],flavor:{umami:15,sweet:3,salty:3,sour:3,bitter:3}},
  "달걀노른자":{cat:"egg",en:"Egg Yolk",emoji:"🟡",defaultG:20,comp:{protein:15.9,fat:26.5,carbs:3.6,water:52,fiber:0},amino:["류신","리신","메티오닌"],vit:{D:3.7,B12:1.95,A:381,choline:820},compounds:["레시틴","루테인","제아잔틴","콜레스테롤"],flavor:{umami:35,sweet:8,salty:5,sour:3,bitter:3}},
  "온센달걀":{cat:"egg",en:"Onsen Egg",emoji:"🥚",defaultG:60,comp:{protein:12.5,fat:10.6,carbs:0.7,water:75,fiber:0},amino:["오보알부민","아포비텔레닌"],vit:{D:2.0,B12:1.11,choline:294},compounds:["루테인","레시틴"],flavor:{umami:30,sweet:8,salty:5,sour:3,bitter:3}},
  "피단(세기란)":{cat:"egg",en:"Century Egg",emoji:"🥚",defaultG:50,comp:{protein:13.7,fat:10.7,carbs:1.2,water:72,fiber:0},amino:["글루탐산","알라닌"],vit:{B12:0.7,iron:3.3},compounds:["암모니아","황화수소","멜라노이딘"],flavor:{umami:50,sweet:3,salty:12,sour:3,bitter:15}},

  "아몬드":{cat:"nut",en:"Almond",emoji:"🥜",defaultG:30,comp:{protein:21,fat:50,carbs:22,water:4,fiber:12.5},amino:["글루탐산"],vit:{E:25.6,B2:1.14,magnesium:270},compounds:["플라보노이드","폴리페놀"],flavor:{umami:25,sweet:10,salty:0,sour:0,bitter:5}},
  "호두":{cat:"nut",en:"Walnut",emoji:"🥜",defaultG:30,comp:{protein:9,fat:65,carbs:14,water:4,fiber:6.7},amino:["글루탐산"],vit:{copper:1.6,manganese:3.4,omega3:9.08},compounds:["폴리페놀","탄닌"],flavor:{umami:20,sweet:5,salty:0,sour:0,bitter:10}},
  "땅콩":{cat:"nut",en:"Peanut",emoji:"🥜",defaultG:30,comp:{protein:26,fat:49,carbs:20,water:3,fiber:6},amino:["글루탐산","아르기닌"],vit:{E:8.3,B1:0.64,magnesium:176},compounds:["리놀레산","폴리페놀"],flavor:{umami:25,sweet:15,salty:0,sour:0,bitter:3}},
  "캐슈넛":{cat:"nut",en:"Cashew",emoji:"🥜",defaultG:30,comp:{protein:18,fat:49,carbs:30,water:2,fiber:3.3},amino:["글루탐산"],vit:{copper:2.2,manganese:1.7,magnesium:240},compounds:["탄닌","플라보노이드"],flavor:{umami:20,sweet:20,salty:0,sour:0,bitter:3}},
  "잣":{cat:"nut",en:"Pine Nut",emoji:"🥜",defaultG:30,comp:{protein:14,fat:68,carbs:13,water:2,fiber:3.7},amino:["글루탐산"],vit:{copper:1.4,magnesium:251,manganese:7.7},compounds:["폴리페놀"],flavor:{umami:25,sweet:15,salty:0,sour:0,bitter:5}},
  "참깨":{cat:"nut",en:"Sesame",emoji:"🥜",defaultG:15,comp:{protein:18,fat:52,carbs:23,water:5,fiber:11.8},amino:["메티오닌"],vit:{calcium:975,copper:4.1,magnesium:351},compounds:["리그난","세사몰"],flavor:{umami:20,sweet:10,salty:0,sour:0,bitter:10}},
  "들깨":{cat:"nut",en:"Perilla Seed",emoji:"🥜",defaultG:15,comp:{protein:19,fat:45,carbs:26,water:4,fiber:27.3},amino:["글루탐산"],vit:{magnesium:432,copper:0.9,manganese:3},compounds:["리그난"],flavor:{umami:25,sweet:10,salty:0,sour:0,bitter:15}},
  "해바라기씨":{cat:"nut",en:"Sunflower Seed",emoji:"🥜",defaultG:30,comp:{protein:20,fat:51,carbs:20,water:4,fiber:8.6},amino:["글루탐산"],vit:{E:41.1,B1:1.5,magnesium:325},compounds:["리놀레산"],flavor:{umami:20,sweet:10,salty:0,sour:0,bitter:5}},

  "표고버섯":{cat:"mushroom",en:"Shiitake",emoji:"🍄",defaultG:100,comp:{protein:2.2,fat:0.3,carbs:7.3,water:89,fiber:1},amino:["글루탐산"],vit:{D:0.81,B5:1.5,copper:0.32,selenium:5.7,phosphorus:112,potassium:304},compounds:["에르고티오네인","렌티난","폴리페놀"],flavor:{umami:45,sweet:5,salty:0,sour:5,bitter:5},sci:{gmp:150,free_glu:72}},
  "양송이":{cat:"mushroom",en:"Button Mushroom",emoji:"🍄",defaultG:100,comp:{protein:3.3,fat:0.3,carbs:3.3,water:92,fiber:1},amino:["글루탐산"],vit:{B2:0.4,B5:1.4,niacin:3.6},compounds:["에르고티오네인"],flavor:{umami:35,sweet:5,salty:0,sour:5,bitter:5}},
  "팽이버섯":{cat:"mushroom",en:"Enoki",emoji:"🍄",defaultG:100,comp:{protein:2.7,fat:0.3,carbs:6.9,water:89,fiber:2},amino:["글루탐산"],vit:{B1:0.04,B2:0.22,niacin:3.9},compounds:["렌티난","베타글루칸"],flavor:{umami:35,sweet:5,salty:0,sour:5,bitter:5}},
  "새송이":{cat:"mushroom",en:"King Oyster Mushroom",emoji:"🍄",defaultG:100,comp:{protein:3.4,fat:0.5,carbs:5.7,water:90,fiber:1},amino:["글루탐산"],vit:{B5:1.5,niacin:4.7,copper:0.25},compounds:["렌티난"],flavor:{umami:40,sweet:5,salty:0,sour:5,bitter:5}},
  "목이버섯":{cat:"mushroom",en:"Wood Ear",emoji:"🍄",defaultG:100,comp:{protein:8.8,fat:0.2,carbs:65,water:12,fiber:6.6},amino:["글루탐산"],vit:{iron:185,magnesium:19},compounds:["다당류"],flavor:{umami:30,sweet:5,salty:0,sour:5,bitter:3}},
  "느타리":{cat:"mushroom",en:"Oyster Mushroom",emoji:"🍄",defaultG:100,comp:{protein:3.3,fat:0.2,carbs:7,water:88,fiber:1.1},amino:["글루탐산"],vit:{B5:1.3,niacin:3.5,copper:0.2},compounds:["렌티난"],flavor:{umami:40,sweet:5,salty:0,sour:5,bitter:5}},

  "검은콩":{cat:"legume",en:"Black Bean",emoji:"🫘",defaultG:100,comp:{protein:9,fat:1,carbs:17,water:71,fiber:6},amino:["글루탐산","리신","류신"],vit:{folate:44,manganese:1.8,magnesium:70},compounds:["안토시아닌","이소플라본"],flavor:{umami:25,sweet:5,salty:0,sour:0,bitter:5}},
  "렌틸콩":{cat:"legume",en:"Lentil",emoji:"🫘",defaultG:100,comp:{protein:25,fat:0.4,carbs:20,water:11,fiber:8},amino:["리신","류신","글루탐산"],vit:{folate:181,iron:6.5,magnesium:47},compounds:["폴리페놀","사포닌"],flavor:{umami:30,sweet:5,salty:0,sour:0,bitter:5}},
  "병아리콩":{cat:"legume",en:"Chickpea",emoji:"🫘",defaultG:100,comp:{protein:19,fat:6,carbs:27,water:11,fiber:6},amino:["글루탐산","리신"],vit:{folate:172,magnesium:79,iron:4.3},compounds:["이소플라본","사포닌"],flavor:{umami:25,sweet:10,salty:0,sour:0,bitter:5}},
  "팥":{cat:"legume",en:"Red Bean",emoji:"🫘",defaultG:100,comp:{protein:9,fat:0.3,carbs:20,water:71,fiber:5},amino:["글루탐산","리신"],vit:{folate:159,iron:5.5,manganese:0.8},compounds:["안토시아닌","폴리페놀"],flavor:{umami:20,sweet:10,salty:0,sour:0,bitter:5}},
  "흰강낭콩":{cat:"legume",en:"White Kidney Bean",emoji:"🫘",defaultG:100,comp:{protein:17,fat:0.6,carbs:40,water:40,fiber:11},amino:["라이신","류신","이소류신"],vit:{folate:388,B1:0.47,iron:5.5},compounds:["이소플라본","피트산","렉틴"],flavor:{umami:20,sweet:10,salty:0,sour:5,bitter:8}},
  "핀토빈":{cat:"legume",en:"Pinto Bean",emoji:"🫘",defaultG:100,comp:{protein:21,fat:1.2,carbs:63,water:10,fiber:15.5},amino:["라이신","트레오닌"],vit:{folate:525,B1:0.84,iron:5},compounds:["안토시아닌","이소플라본","피트산"],flavor:{umami:20,sweet:8,salty:0,sour:5,bitter:8}},
  "블랙빈":{cat:"legume",en:"Black Bean",emoji:"🫘",defaultG:100,comp:{protein:22,fat:1.4,carbs:62,water:11,fiber:15.5},amino:["라이신","류신"],vit:{folate:444,B1:0.9,iron:5.02},compounds:["안토시아닌","이소플라본","탄닌"],flavor:{umami:20,sweet:8,salty:0,sour:5,bitter:10}},
  "그린렌틸":{cat:"legume",en:"Green Lentil",emoji:"🫘",defaultG:100,comp:{protein:25,fat:0.8,carbs:64,water:8,fiber:10.7},amino:["라이신","이소류신","트레오닌"],vit:{folate:479,B1:0.87,iron:7.54},compounds:["이소플라본","폴리페놀","피트산"],flavor:{umami:20,sweet:8,salty:0,sour:5,bitter:10}},
  "레드렌틸":{cat:"legume",en:"Red Lentil",emoji:"🫘",defaultG:100,comp:{protein:26,fat:0.6,carbs:60,water:10,fiber:4.9},amino:["라이신","류신"],vit:{folate:433,B1:0.87,iron:7.0},compounds:["카로티노이드","폴리페놀"],flavor:{umami:18,sweet:8,salty:0,sour:5,bitter:8}},
  "모로코렌틸(검정)":{cat:"legume",en:"Black Lentil",emoji:"🫘",defaultG:100,comp:{protein:24,fat:0.9,carbs:62,water:11,fiber:11.5},amino:["라이신","트레오닌"],vit:{folate:479,iron:7.54,B1:0.87},compounds:["안토시아닌","폴리페놀","이소플라본"],flavor:{umami:22,sweet:8,salty:0,sour:5,bitter:10}},
  "녹두":{cat:"legume",en:"Mung Bean",emoji:"🫘",defaultG:100,comp:{protein:23.9,fat:1.2,carbs:63,water:9,fiber:16.3},amino:["라이신","류신"],vit:{folate:625,B1:0.62,iron:6.74},compounds:["비텍신","이소비텍신","이소플라본"],flavor:{umami:15,sweet:8,salty:0,sour:5,bitter:8}},
  "리마빈":{cat:"legume",en:"Lima Bean",emoji:"🫘",defaultG:100,comp:{protein:21,fat:0.7,carbs:64,water:10,fiber:19},amino:["라이신","이소류신"],vit:{folate:395,B1:0.51,potassium:1724},compounds:["리마린","이소플라본","피트산"],flavor:{umami:15,sweet:10,salty:0,sour:5,bitter:8}},
  "아주키빈":{cat:"legume",en:"Azuki Bean",emoji:"🫘",defaultG:100,comp:{protein:19.9,fat:0.5,carbs:62,water:13,fiber:12.7},amino:["라이신","류신"],vit:{folate:622,B1:0.5,iron:4.98},compounds:["안토시아닌","비텍신","사포닌"],flavor:{umami:15,sweet:12,salty:0,sour:5,bitter:8}},
  "템페":{cat:"legume",en:"Tempeh",emoji:"🫘",defaultG:80,comp:{protein:18.5,fat:10.8,carbs:17.1,water:55,fiber:1.8},amino:["라이신","이소류신","발린"],vit:{B12:0.08,B2:0.36,iron:2.7},compounds:["이소플라본","피트산","베타글루칸","프로바이오틱"],flavor:{umami:35,sweet:5,salty:3,sour:10,bitter:10}},
  "흑태(검은콩)":{cat:"legume",en:"Black Soybean",emoji:"🫘",defaultG:100,comp:{protein:36,fat:19,carbs:30,water:9,fiber:15},amino:["라이신","아르기닌","이소류신"],vit:{folate:375,B1:0.87,iron:9.2},compounds:["안토시아닌","이소플라본","사포닌"],flavor:{umami:20,sweet:8,salty:0,sour:5,bitter:10}},
  "동부콩":{cat:"legume",en:"Black-Eyed Pea",emoji:"🫘",defaultG:100,comp:{protein:23.4,fat:1.3,carbs:57.5,water:11,fiber:15.4},amino:["라이신","트레오닌"],vit:{folate:633,B1:0.87,iron:8.27},compounds:["비겐(비텍신)","이소플라본","탄닌"],flavor:{umami:15,sweet:8,salty:0,sour:5,bitter:8}},
  "완두콩":{cat:"legume",en:"Green Peas",emoji:"🫘",defaultG:100,comp:{protein:5,fat:0.4,carbs:7,water:88,fiber:2.4},amino:["글루탐산","리신"],vit:{C:40,K:24,manganese:0.4},compounds:["이소플라본"],flavor:{umami:15,sweet:15,salty:0,sour:0,bitter:3}},
  "된장(식재료)":{cat:"legume",en:"Doenjang",emoji:"🫘",defaultG:15,comp:{protein:12,fat:5,carbs:10,water:67,fiber:2},amino:["글루탐산"],vit:{sodium:4030,iron:1.8},compounds:["멜라노이딘","글루탐산나트륨"],flavor:{umami:85,sweet:10,salty:80,sour:10,bitter:5}},
  "두부":{cat:"legume",en:"Tofu",emoji:"🧊",defaultG:150,comp:{protein:8,fat:4.8,carbs:1.9,water:85,fiber:0.3},amino:["류신","리신"],vit:{calcium:350,iron:5.4},compounds:["이소플라본","제니스테인","다이드제인","사포닌"],flavor:{umami:25,sweet:5,salty:0,sour:0,bitter:5}},

  "바질":{cat:"herb",en:"Basil",emoji:"🌿",defaultG:3,comp:{protein:3.2,fat:0.6,carbs:2.7,water:92,fiber:1.6},amino:[],vit:{K:27,A:264,C:18},compounds:["에센셜오일","리나롤","유게놀"],flavor:{umami:15,sweet:10,salty:0,sour:5,bitter:10}},
  "로즈마리":{cat:"herb",en:"Rosemary",emoji:"🌿",defaultG:3,comp:{protein:3.3,fat:5.3,carbs:21,water:69,fiber:14.1},amino:[],vit:{A:20,C:21.8},compounds:["카르노솔","올레산"],flavor:{umami:10,sweet:5,salty:0,sour:5,bitter:20}},
  "타임":{cat:"herb",en:"Thyme",emoji:"🌿",defaultG:3,comp:{protein:5.6,fat:1.7,carbs:24,water:65,fiber:18.5},amino:[],vit:{K:401,A:27,C:50},compounds:["티몰","카르바크롤"],flavor:{umami:15,sweet:5,salty:0,sour:5,bitter:20}},
  "민트":{cat:"herb",en:"Mint",emoji:"🌿",defaultG:3,comp:{protein:3.8,fat:0.9,carbs:6.4,water:85,fiber:2.8},amino:[],vit:{A:212,C:31.8},compounds:["멘톨","멘톤"],flavor:{umami:10,sweet:15,salty:0,sour:5,bitter:25}},
  "고수(실란트로)":{cat:"herb",en:"Cilantro",emoji:"🌿",defaultG:3,comp:{protein:2.1,fat:0.1,carbs:3.7,water:93,fiber:2.1},amino:[],vit:{K:246,A:386,C:27},compounds:["린알롤","아네톨"],flavor:{umami:10,sweet:5,salty:0,sour:5,bitter:15}},
  "파슬리":{cat:"herb",en:"Parsley",emoji:"🌿",defaultG:5,comp:{protein:2.7,fat:0.8,carbs:6.3,water:88,fiber:1.3},amino:[],vit:{K:1640,A:421,C:133},compounds:["플라본","아피올"],flavor:{umami:15,sweet:5,salty:0,sour:5,bitter:15}},
  "생강":{cat:"herb",en:"Ginger",emoji:"🫚",defaultG:5,comp:{protein:1.8,fat:0.8,carbs:18,water:79,fiber:2.0},amino:[],vit:{C:5,B6:0.16,potassium:415},compounds:["진저롤","쇼가올","진저론"],flavor:{umami:5,sweet:5,salty:0,sour:5,bitter:15}},
  "후추":{cat:"herb",en:"Black Pepper",emoji:"🌿",defaultG:2,comp:{protein:10.4,fat:3.3,carbs:64,water:12,fiber:25},amino:[],vit:{K:163,C:21},compounds:["피페린","사비닌"],flavor:{umami:10,sweet:5,salty:0,sour:5,bitter:25}},
  "갈랑갈":{cat:"herb",en:"Galangal",emoji:"🌿",defaultG:10,comp:{protein:1,fat:0.6,carbs:18,water:79,fiber:2},amino:[],vit:{C:6,B6:0.04},compounds:["갈라갈 A","갈라가파이든","페놀산","테르펜"],flavor:{umami:5,sweet:5,salty:0,sour:10,bitter:20}},
  "레몬밤":{cat:"herb",en:"Lemon Balm",emoji:"🌿",defaultG:5,comp:{protein:3.7,fat:0.4,carbs:8,water:86,fiber:0},amino:[],vit:{C:14,A:170,K:100},compounds:["로즈마린산","우르솔산","시트랄"],flavor:{umami:3,sweet:8,salty:0,sour:10,bitter:15}},
  "마조람":{cat:"herb",en:"Marjoram",emoji:"🌿",defaultG:3,comp:{protein:12.7,fat:7,carbs:61,water:9,fiber:40},amino:[],vit:{K:621,A:161,C:51},compounds:["테르피넨-4-올","사비넨","리날룰"],flavor:{umami:5,sweet:8,salty:0,sour:5,bitter:15}},
  "커민":{cat:"herb",en:"Cumin",emoji:"🟡",defaultG:3,comp:{protein:17.8,fat:22,carbs:45,water:9,fiber:10.5},amino:[],vit:{B1:0.63,B3:4.58,iron:66.4},compounds:["커미날데하이드","베타-피넨","베타-피넨"],flavor:{umami:8,sweet:5,salty:5,sour:5,bitter:20}},
  "코리앤더씨드":{cat:"herb",en:"Coriander Seed",emoji:"🟡",defaultG:3,comp:{protein:12.4,fat:17,carbs:55,water:9,fiber:41.9},amino:[],vit:{B1:0.24,C:21,K:31},compounds:["리날룰","감마-테르피넨","리날룰 아세테이트"],flavor:{umami:5,sweet:10,salty:0,sour:8,bitter:10}},
  "카이엔페퍼":{cat:"herb",en:"Cayenne Pepper",emoji:"🌶️",defaultG:2,comp:{protein:12,fat:17,carbs:57,water:9,fiber:27},amino:[],vit:{A:2081,C:76,B6:2.45},compounds:["캡사이신","디하이드로캡사이신","카로티노이드"],flavor:{umami:5,sweet:5,salty:0,sour:5,bitter:8}},
  "훈제파프리카가루":{cat:"herb",en:"Smoked Paprika",emoji:"🟡",defaultG:3,comp:{protein:14,fat:12,carbs:54,water:10,fiber:35},amino:[],vit:{A:2463,C:18,B6:2.14},compounds:["캡산틴","베타카로틴","카로티노이드"],flavor:{umami:10,sweet:15,salty:5,sour:5,bitter:8}},
  "올스파이스":{cat:"herb",en:"Allspice",emoji:"🟤",defaultG:3,comp:{protein:6.1,fat:8.7,carbs:73,water:8,fiber:21.6},amino:[],vit:{A:19,C:39.2,K:1.3},compounds:["유게놀","카리오필렌","리날룰"],flavor:{umami:5,sweet:15,salty:0,sour:5,bitter:15}},
  "커리리프":{cat:"herb",en:"Curry Leaf",emoji:"🌿",defaultG:5,comp:{protein:6.1,fat:1,carbs:19,water:62,fiber:6.4},amino:[],vit:{C:4,A:73,B2:0.21,calcium:811},compounds:["카바졸 알칼로이드","마하닌빈","비스마하닌빈"],flavor:{umami:8,sweet:5,salty:0,sour:5,bitter:25}},
  "판다누스잎":{cat:"herb",en:"Pandan Leaf",emoji:"🌿",defaultG:5,comp:{protein:1.8,fat:0.8,carbs:9,water:87,fiber:1.6},amino:[],vit:{A:180,C:12},compounds:["2-아세틸-1-피롤린","알카로이드","클로로필"],flavor:{umami:5,sweet:20,salty:0,sour:3,bitter:5}},
  "페뉴그릭(호로파)":{cat:"herb",en:"Fenugreek",emoji:"🟡",defaultG:5,comp:{protein:23,fat:6.4,carbs:58,water:8,fiber:24.6},amino:["라이신","류신"],vit:{B1:0.32,B6:0.6,iron:33.5},compounds:["포토시드","디오스게닌","코린"],flavor:{umami:8,sweet:10,salty:3,sour:3,bitter:30}},
  "캐러웨이씨":{cat:"herb",en:"Caraway Seed",emoji:"🟡",defaultG:3,comp:{protein:19.8,fat:14,carbs:50,water:10,fiber:38},amino:[],vit:{B3:3.6,B1:0.38,iron:16.2},compounds:["카르본","리모넨","트랜스아네톨"],flavor:{umami:5,sweet:10,salty:0,sour:5,bitter:20}},
  "스타아니스(팔각)":{cat:"herb",en:"Star Anise",emoji:"⭐",defaultG:2,comp:{protein:17.6,fat:15.9,carbs:50,water:9,fiber:14.6},amino:[],vit:{C:21,calcium:646,iron:36.96},compounds:["트랜스아네톨","에스트라골","p-알리아니졸"],flavor:{umami:5,sweet:15,salty:0,sour:5,bitter:15}},
  "베르베레(에티오피아 혼합향신료)":{cat:"herb",en:"Berbere Spice",emoji:"🟡",defaultG:5,comp:{protein:10,fat:8,carbs:55,water:9,fiber:15},amino:[],vit:{A:1200,C:20},compounds:["캡사이신","진저롤","유게놀","코리안더"],flavor:{umami:8,sweet:5,salty:5,sour:5,bitter:15}},
  "자타르(중동 혼합향신료)":{cat:"herb",en:"Zaatar",emoji:"🟡",defaultG:5,comp:{protein:9.3,fat:3.5,carbs:55,water:9,fiber:14.4},amino:[],vit:{calcium:415,iron:7.6},compounds:["티몰","카르바크롤","오레가노산"],flavor:{umami:8,sweet:5,salty:8,sour:8,bitter:15}},
  "고추냉이(와사비)":{cat:"herb",en:"Wasabi",emoji:"🟢",defaultG:10,comp:{protein:4.8,fat:0.6,carbs:23.5,water:70,fiber:7.8},amino:[],vit:{C:68,B6:0.28,calcium:128},compounds:["알릴이소티오시아네이트","글루코시나페이트","이소티오시아네이트"],flavor:{umami:10,sweet:5,salty:3,sour:5,bitter:25}},
  "아나토(아치오테)":{cat:"herb",en:"Annatto",emoji:"🟠",defaultG:3,comp:{protein:13,fat:12,carbs:65,water:6,fiber:25},amino:[],vit:{A:108,calcium:7.1},compounds:["빅신","노르빅신","카로티노이드"],flavor:{umami:5,sweet:10,salty:3,sour:5,bitter:8}},
  "시나몬":{cat:"herb",en:"Cinnamon",emoji:"🌿",defaultG:2,comp:{protein:3.9,fat:1.2,carbs:81,water:10,fiber:53},amino:[],vit:{K:1113,calcium:1002},compounds:["신나밀알데하이드","쿠마린"],flavor:{umami:5,sweet:60,salty:0,sour:0,bitter:20}},
  "카레가루":{cat:"herb",en:"Curry Powder",emoji:"🌿",defaultG:3,comp:{protein:12,fat:3.3,carbs:45,water:12,fiber:20},amino:[],vit:{iron:66,manganese:26},compounds:["쿠르쿠민","강황"],flavor:{umami:20,sweet:10,salty:0,sour:5,bitter:15}},
  "강황":{cat:"herb",en:"Turmeric",emoji:"🌿",defaultG:3,comp:{protein:9.7,fat:3.1,carbs:44,water:12,fiber:21},amino:[],vit:{iron:41,manganese:19.8},compounds:["쿠르쿠민"],flavor:{umami:10,sweet:5,salty:0,sour:5,bitter:15}},
  "와사비":{cat:"herb",en:"Wasabi",emoji:"🌿",defaultG:2,comp:{protein:4.8,fat:0.4,carbs:8.3,water:87,fiber:0.8},amino:[],vit:{C:27,K:28},compounds:["알릴이소티오시아네이트","글루코시놀레이트"],flavor:{umami:10,sweet:5,salty:0,sour:10,bitter:30}},
  "산초":{cat:"herb",en:"Sichuan Pepper",emoji:"🌿",defaultG:2,comp:{protein:5.4,fat:8.7,carbs:60,water:13,fiber:25},amino:[],vit:{K:1104,iron:15},compounds:["히드록시알파산초올"],flavor:{umami:15,sweet:10,salty:0,sour:10,bitter:20}},

  "소금":{cat:"sauce",en:"Salt",emoji:"🫗",defaultG:5,comp:{protein:0,fat:0,carbs:0,water:0,fiber:0},amino:[],vit:{sodium:39146,chlorine:60662},compounds:["염화나트륨"],flavor:{umami:0,sweet:0,salty:100,sour:0,bitter:0}},
  "식초":{cat:"sauce",en:"Vinegar",emoji:"🫗",defaultG:15,comp:{protein:0.2,fat:0,carbs:0.9,water:94,fiber:0},amino:[],vit:{potassium:34},compounds:["아세트산","폴리페놀"],flavor:{umami:0,sweet:0,salty:0,sour:95,bitter:5}},
  "고추장":{cat:"sauce",en:"Gochujang",emoji:"🫗",defaultG:15,comp:{protein:5,fat:4.4,carbs:13,water:69,fiber:2},amino:["글루탐산"],vit:{sodium:1090,iron:2.2},compounds:["캡사이신","멜라노이딘"],flavor:{umami:35,sweet:20,salty:70,sour:20,bitter:10}},
  "간장":{cat:"sauce",en:"Soy Sauce",emoji:"🫗",defaultG:15,comp:{protein:8,fat:0,carbs:5,water:67,fiber:0},amino:["글루탐산"],vit:{sodium:5637,iron:1.9,potassium:212},compounds:["멜라노이딘","글루탐산나트륨","유기산"],flavor:{umami:95,sweet:15,salty:90,sour:10,bitter:10}},
  "설탕":{cat:"sauce",en:"Sugar",emoji:"🍬",defaultG:10,comp:{protein:0,fat:0,carbs:100,water:0,fiber:0},amino:[],vit:{},compounds:["수크로스","글루코스","프럭토스"],flavor:{umami:0,sweet:100,salty:0,sour:0,bitter:0}},
  "굴소스":{cat:"sauce",en:"Oyster Sauce",emoji:"🫗",defaultG:15,comp:{protein:5,fat:0,carbs:7,water:87,fiber:0},amino:["글루탐산"],vit:{sodium:1920,iron:5},compounds:["글루탐산나트륨"],flavor:{umami:80,sweet:20,salty:80,sour:5,bitter:5}},
  "미림":{cat:"sauce",en:"Mirin",emoji:"🫗",defaultG:15,comp:{protein:0.4,fat:0,carbs:40,water:54,fiber:0},amino:[],vit:{sodium:13,potassium:15},compounds:["글루코스","말토스"],flavor:{umami:5,sweet:85,salty:5,sour:0,bitter:0}},
  "물엿":{cat:"sauce",en:"Rice Syrup",emoji:"🫗",defaultG:20,comp:{protein:0,fat:0,carbs:100,water:0,fiber:0},amino:[],vit:{},compounds:["글루코스","수크로스"],flavor:{umami:0,sweet:95,salty:0,sour:0,bitter:0}},
  "케첩":{cat:"sauce",en:"Ketchup",emoji:"🫗",defaultG:15,comp:{protein:0.2,fat:0,carbs:29,water:67,fiber:0},amino:[],vit:{sodium:1110},compounds:["리코펜","글루탐산"],flavor:{umami:35,sweet:50,salty:40,sour:20,bitter:5}},
  "마요네즈":{cat:"sauce",en:"Mayonnaise",emoji:"🫗",defaultG:15,comp:{protein:0.1,fat:79,carbs:0.1,water:16,fiber:0},amino:[],vit:{E:16.6},compounds:["지방","계란 레시틴"],flavor:{umami:5,sweet:5,salty:30,sour:15,bitter:0}},
  "머스타드":{cat:"sauce",en:"Mustard",emoji:"🫗",defaultG:10,comp:{protein:3.3,fat:4.7,carbs:6.4,water:80,fiber:3.3},amino:[],vit:{K:40,calcium:70},compounds:["알릴이소티오시아네이트"],flavor:{umami:10,sweet:10,salty:30,sour:30,bitter:20}},
  "꿀":{cat:"sauce",en:"Honey",emoji:"🍯",defaultG:15,comp:{protein:0.3,fat:0,carbs:82,water:17,fiber:0},amino:[],vit:{},compounds:["글루코스","프럭토스"],flavor:{umami:0,sweet:95,salty:0,sour:5,bitter:0}},

  "올리브오일":{cat:"oil",en:"Olive Oil",emoji:"🫒",defaultG:15,comp:{protein:0,fat:100,carbs:0,water:0,fiber:0},amino:[],vit:{E:14.35,K:60.2},compounds:["올레산","폴리페놀","토코페롤"],flavor:{umami:0,sweet:0,salty:0,sour:0,bitter:20}},
  "참기름":{cat:"oil",en:"Sesame Oil",emoji:"🫒",defaultG:15,comp:{protein:0,fat:100,carbs:0,water:0,fiber:0},amino:[],vit:{E:1.4,K:0},compounds:["세사몰","세사민"],flavor:{umami:5,sweet:0,salty:0,sour:0,bitter:25}},
  "들기름":{cat:"oil",en:"Perilla Oil",emoji:"🫒",defaultG:15,comp:{protein:0,fat:100,carbs:0,water:0,fiber:0},amino:[],vit:{E:0,omega3:53},compounds:["알파리놀렌산"],flavor:{umami:5,sweet:0,salty:0,sour:0,bitter:20}},
  "포도씨유":{cat:"oil",en:"Grapeseed Oil",emoji:"🫒",defaultG:15,comp:{protein:0,fat:100,carbs:0,water:0,fiber:0},amino:[],vit:{E:1.5},compounds:["리놀레산","폴리페놀"],flavor:{umami:0,sweet:0,salty:0,sour:0,bitter:10}},
  "코코넛오일":{cat:"oil",en:"Coconut Oil",emoji:"🫒",defaultG:15,comp:{protein:0,fat:100,carbs:0,water:0,fiber:0},amino:[],vit:{},compounds:["라우르산","미리스트산"],flavor:{umami:0,sweet:0,salty:0,sour:0,bitter:5}},
  "카놀라유":{cat:"oil",en:"Canola Oil",emoji:"🫒",defaultG:15,comp:{protein:0,fat:100,carbs:0,water:0,fiber:0},amino:[],vit:{E:15.4,K:145},compounds:["올레산","리놀레산"],flavor:{umami:0,sweet:0,salty:0,sour:0,bitter:0}},
  "버터":{cat:"oil",en:"Butter",emoji:"🧈",defaultG:15,comp:{protein:0.9,fat:81,carbs:0.1,water:18,fiber:0},amino:[],vit:{A:684,D:0.6,E:2.3},compounds:["부티르산","디아세틸","카세인","유당"],flavor:{umami:5,sweet:10,salty:10,sour:5,bitter:0}},

  // ── Meat parents (부위·그룹 선택용) ─────────────────────────────────────
  "닭고기":{cat:"meat",en:"Chicken",emoji:"🍗",defaultG:200,comp:{protein:27,fat:6,carbs:0,water:66,fiber:0},amino:["류신","리신","메티오닌"],vit:{B6:0.7,niacin:9.5,selenium:26},compounds:["카르노신","미오글로빈"],flavor:{umami:62,sweet:6,salty:5,sour:0,bitter:4}},
  "내장육":{cat:"meat",en:"Organ Meat",emoji:"🫀",defaultG:100,comp:{protein:17,fat:7,carbs:2,water:73,fiber:0},amino:["글루탐산","글리신"],vit:{B12:20,iron:7},compounds:["헤민","콜라겐"],flavor:{umami:65,sweet:8,salty:5,sour:3,bitter:12}},
  "가공육류":{cat:"meat",en:"Processed Meat",emoji:"🥩",defaultG:50,comp:{protein:14,fat:28,carbs:2,water:54,fiber:0},amino:["류신"],vit:{sodium:1200},compounds:["니트라이트","훈연"],flavor:{umami:70,sweet:8,salty:75,sour:5,bitter:5}},

  // ── 소고기 부위 ─────────────────────────────────────────────────────────
  "소고기 등심":{cat:"meat",en:"Beef Sirloin",emoji:"🥩",defaultG:200,comp:{protein:22,fat:22,carbs:0,water:55,fiber:0},amino:["글루탐산","류신"],vit:{B12:2.4,zinc:4.5,iron:2.4},compounds:["미오글로빈","콜라겐","크레아틴"],flavor:{umami:82,sweet:10,salty:5,sour:0,bitter:5}},
  "소고기 안심":{cat:"meat",en:"Beef Tenderloin",emoji:"🥩",defaultG:200,comp:{protein:22,fat:8,carbs:0,water:69,fiber:0},amino:["글루탐산","류신"],vit:{B12:2.4,zinc:3.8,iron:2.1},compounds:["미오글로빈","크레아틴"],flavor:{umami:75,sweet:8,salty:5,sour:0,bitter:5}},
  "꽃등심(립아이)":{cat:"meat",en:"Ribeye",emoji:"🥩",defaultG:200,comp:{protein:20,fat:25,carbs:0,water:54,fiber:0},amino:["글루탐산","류신"],vit:{B12:2.1,zinc:4.5,iron:2.1},compounds:["미오글로빈","마블링"],flavor:{umami:88,sweet:10,salty:5,sour:0,bitter:4}},
  "채끝(서로인)":{cat:"meat",en:"Striploin",emoji:"🥩",defaultG:200,comp:{protein:21,fat:18,carbs:0,water:60,fiber:0},amino:["글루탐산","류신"],vit:{B12:2.3,zinc:4.3},compounds:["미오글로빈"],flavor:{umami:82,sweet:8,salty:5,sour:0,bitter:4}},
  "갈비(소)":{cat:"meat",en:"Beef Short Ribs",emoji:"🍖",defaultG:200,comp:{protein:18,fat:22,carbs:0,water:59,fiber:0},amino:["글루탐산","류신"],vit:{B12:2.2,zinc:4.2,iron:2.0},compounds:["콜라겐","미오글로빈"],flavor:{umami:80,sweet:8,salty:5,sour:0,bitter:5}},
  "양지(브리스킷)":{cat:"meat",en:"Brisket",emoji:"🥩",defaultG:200,comp:{protein:18,fat:20,carbs:0,water:61,fiber:0},amino:["글루탐산","글리신"],vit:{B12:2.0,zinc:4.0,iron:2.0},compounds:["콜라겐","미오글로빈"],flavor:{umami:78,sweet:8,salty:5,sour:0,bitter:5}},
  "우둔(라운드)":{cat:"meat",en:"Beef Round",emoji:"🥩",defaultG:200,comp:{protein:22,fat:10,carbs:0,water:67,fiber:0},amino:["글루탐산","류신"],vit:{B12:2.5,zinc:4.1,iron:2.3},compounds:["미오글로빈"],flavor:{umami:75,sweet:7,salty:5,sour:0,bitter:5}},
  "부채살(플랫아이언)":{cat:"meat",en:"Flat Iron Steak",emoji:"🥩",defaultG:200,comp:{protein:23,fat:9,carbs:0,water:67,fiber:0},amino:["글루탐산","류신"],vit:{B12:2.3,zinc:4.2},compounds:["미오글로빈"],flavor:{umami:80,sweet:8,salty:5,sour:0,bitter:4}},
  "업진살(스커트)":{cat:"meat",en:"Skirt Steak",emoji:"🥩",defaultG:200,comp:{protein:19,fat:20,carbs:0,water:60,fiber:0},amino:["글루탐산"],vit:{B12:2.1,zinc:3.9},compounds:["미오글로빈","콜라겐"],flavor:{umami:80,sweet:7,salty:5,sour:0,bitter:5}},
  "홍두깨살":{cat:"meat",en:"Eye of Round",emoji:"🥩",defaultG:200,comp:{protein:22,fat:4.5,carbs:0,water:73,fiber:0},amino:["글루탐산","류신"],vit:{B12:2.2,zinc:4.0},compounds:["미오글로빈"],flavor:{umami:74,sweet:7,salty:5,sour:0,bitter:4}},
  "비프 패티":{cat:"meat",en:"Beef Patty",emoji:"🍔",defaultG:100,comp:{protein:17,fat:15,carbs:0,water:67,fiber:0},amino:["글루탐산","류신"],vit:{B12:2.1,zinc:4.2,iron:2.2},compounds:["미오글로빈"],flavor:{umami:78,sweet:8,salty:5,sour:0,bitter:5}},
  "사골":{cat:"meat",en:"Bone Broth Bones",emoji:"🦴",defaultG:200,comp:{protein:6,fat:3,carbs:0,water:91,fiber:0},amino:["글리신","프롤린"],vit:{calcium:15,phosphorus:20},compounds:["콜라겐","젤라틴"],flavor:{umami:60,sweet:5,salty:5,sour:0,bitter:5}},

  // ── 돼지고기 부위 ────────────────────────────────────────────────────────
  "삼겹살":{cat:"meat",en:"Pork Belly",emoji:"🐷",defaultG:200,comp:{protein:14,fat:34,carbs:0,water:51,fiber:0},amino:["류신","리신"],vit:{B1:0.5,B6:0.4,niacin:5},compounds:["미오글로빈","콜라겐"],flavor:{umami:70,sweet:8,salty:5,sour:0,bitter:5}},
  "목살(돼지)":{cat:"meat",en:"Pork Shoulder",emoji:"🐷",defaultG:200,comp:{protein:16,fat:25,carbs:0,water:58,fiber:0},amino:["류신","리신"],vit:{B1:0.55,B6:0.45},compounds:["미오글로빈","콜라겐"],flavor:{umami:72,sweet:8,salty:5,sour:0,bitter:5}},
  "등심(돼지)":{cat:"meat",en:"Pork Loin",emoji:"🐷",defaultG:200,comp:{protein:22,fat:8,carbs:0,water:69,fiber:0},amino:["류신","리신"],vit:{B1:0.7,B6:0.5,niacin:6.5},compounds:["미오글로빈"],flavor:{umami:65,sweet:8,salty:5,sour:0,bitter:4}},
  "안심(돼지)":{cat:"meat",en:"Pork Tenderloin",emoji:"🐷",defaultG:200,comp:{protein:23,fat:3.5,carbs:0,water:73,fiber:0},amino:["류신","리신"],vit:{B1:0.8,B6:0.6,niacin:7},compounds:["미오글로빈"],flavor:{umami:60,sweet:7,salty:5,sour:0,bitter:4}},
  "갈비(돼지)":{cat:"meat",en:"Pork Ribs",emoji:"🐷",defaultG:200,comp:{protein:17,fat:28,carbs:0,water:54,fiber:0},amino:["류신","리신"],vit:{B1:0.5,B6:0.4},compounds:["콜라겐","미오글로빈"],flavor:{umami:72,sweet:8,salty:5,sour:0,bitter:5}},
  "항정살":{cat:"meat",en:"Pork Jowl",emoji:"🐷",defaultG:200,comp:{protein:15,fat:30,carbs:0,water:54,fiber:0},amino:["류신"],vit:{B1:0.45,B6:0.38},compounds:["근내지방","콜라겐"],flavor:{umami:73,sweet:8,salty:5,sour:0,bitter:5}},
  "족발":{cat:"meat",en:"Pig Feet",emoji:"🍖",defaultG:100,comp:{protein:22,fat:15,carbs:0.5,water:62,fiber:0},amino:["글리신","프롤린","류신"],vit:{B12:0.8,calcium:15},compounds:["콜라겐","젤라틴"],flavor:{umami:65,sweet:8,salty:5,sour:0,bitter:5}},
  "돼지껍데기":{cat:"meat",en:"Pork Rind",emoji:"🐷",defaultG:50,comp:{protein:29,fat:26,carbs:0,water:44,fiber:0},amino:["글리신","프롤린"],vit:{B12:0.2},compounds:["콜라겐"],flavor:{umami:50,sweet:5,salty:5,sour:0,bitter:3}},
  "순대":{cat:"meat",en:"Blood Sausage",emoji:"🌭",defaultG:100,comp:{protein:10,fat:12,carbs:22,water:55,fiber:1},amino:["글루탐산"],vit:{iron:3,B12:0.9},compounds:["선지","당면"],flavor:{umami:55,sweet:10,salty:35,sour:5,bitter:5}},
  "베이컨":{cat:"meat",en:"Bacon",emoji:"🥓",defaultG:30,comp:{protein:37,fat:61,carbs:0,water:1,fiber:0},amino:["류신","리신"],vit:{B1:0.62,B6:0.5,niacin:6.8},compounds:["니트로사민","스모키 향료"],flavor:{umami:85,sweet:5,salty:85,sour:0,bitter:5}},
  "소시지":{cat:"meat",en:"Sausage",emoji:"🌭",defaultG:50,comp:{protein:12,fat:28,carbs:4,water:55,fiber:0},amino:["류신","리신"],vit:{sodium:1100,iron:0.9},compounds:["니트라이트","타우린"],flavor:{umami:75,sweet:10,salty:75,sour:5,bitter:5}},
  "햄":{cat:"meat",en:"Ham",emoji:"🍖",defaultG:50,comp:{protein:13,fat:6.5,carbs:1.5,water:79,fiber:0},amino:["류신","리신"],vit:{B1:0.53,iron:0.8},compounds:["니트라이트","글루탐산"],flavor:{umami:70,sweet:8,salty:70,sour:3,bitter:5}},
  "스팸":{cat:"meat",en:"Spam",emoji:"🥫",defaultG:50,comp:{protein:12,fat:24,carbs:4,water:57,fiber:0},amino:["류신"],vit:{sodium:1600,B1:0.3},compounds:["니트라이트","카세이네이트"],flavor:{umami:70,sweet:8,salty:80,sour:3,bitter:3}},
  "비엔나소시지":{cat:"meat",en:"Vienna Sausage",emoji:"🌭",defaultG:30,comp:{protein:9,fat:24,carbs:4,water:61,fiber:0},amino:["류신"],vit:{sodium:900,B1:0.2},compounds:["니트라이트"],flavor:{umami:70,sweet:10,salty:70,sour:3,bitter:3}},

  // ── 닭고기 부위 ─────────────────────────────────────────────────────────
  "닭가슴살":{cat:"meat",en:"Chicken Breast",emoji:"🍗",defaultG:200,comp:{protein:31,fat:3.6,carbs:0,water:65,fiber:0},amino:["류신","리신","메티오닌"],vit:{B6:0.88,niacin:9.9,selenium:27.4},compounds:["미오글로빈","카르노신","안세린"],flavor:{umami:60,sweet:5,salty:5,sour:0,bitter:5}},
  "닭다리":{cat:"meat",en:"Chicken Leg",emoji:"🍗",defaultG:200,comp:{protein:26,fat:8,carbs:0,water:65,fiber:0},amino:["류신","리신"],vit:{B6:0.4,niacin:6.2,iron:1.4,zinc:2.8},compounds:["미오글로빈","콜라겐"],flavor:{umami:65,sweet:6,salty:5,sour:0,bitter:5}},
  "닭날개":{cat:"meat",en:"Chicken Wings",emoji:"🍗",defaultG:100,comp:{protein:18,fat:12,carbs:0,water:69,fiber:0},amino:["류신","리신"],vit:{B6:0.35,niacin:5.5},compounds:["콜라겐","카르노신"],flavor:{umami:62,sweet:6,salty:5,sour:0,bitter:5}},
  "닭 안심":{cat:"meat",en:"Chicken Tender",emoji:"🍗",defaultG:100,comp:{protein:23,fat:1.5,carbs:0,water:75,fiber:0},amino:["류신","리신","메티오닌"],vit:{B6:0.9,niacin:10},compounds:["카르노신"],flavor:{umami:55,sweet:5,salty:5,sour:0,bitter:3}},
  "닭 모래집":{cat:"meat",en:"Chicken Gizzard",emoji:"🍗",defaultG:100,comp:{protein:18,fat:2.7,carbs:0,water:78,fiber:0},amino:["류신","글리신"],vit:{B12:1.8,iron:3.8},compounds:["콜라겐"],flavor:{umami:60,sweet:5,salty:5,sour:0,bitter:5}},

  // ── 오리·가금류 ──────────────────────────────────────────────────────────
  "훈제오리":{cat:"meat",en:"Smoked Duck",emoji:"🦆",defaultG:100,comp:{protein:15,fat:19,carbs:1,water:62,fiber:0},amino:["글루탐산"],vit:{B12:1.2,iron:2.5},compounds:["스모크 화합물","미오글로빈"],flavor:{umami:75,sweet:10,salty:50,sour:5,bitter:8}},
  "거위":{cat:"meat",en:"Goose",emoji:"🪿",defaultG:200,comp:{protein:23,fat:33,carbs:0,water:43,fiber:0},amino:["류신","리신"],vit:{B12:2.8,iron:3.3,selenium:17},compounds:["미오글로빈","불포화지방산"],flavor:{umami:72,sweet:8,salty:5,sour:0,bitter:8}},
  "푸아그라":{cat:"meat",en:"Foie Gras",emoji:"🫀",defaultG:50,comp:{protein:9,fat:44,carbs:4.7,water:41,fiber:0},amino:["글루탐산"],vit:{A:11000,B12:17.3,iron:9.3},compounds:["레시틴","팔미트산"],flavor:{umami:80,sweet:15,salty:10,sour:5,bitter:5}},
  "메추리":{cat:"meat",en:"Quail",emoji:"🐦",defaultG:100,comp:{protein:22,fat:5,carbs:0,water:72,fiber:0},amino:["류신","리신"],vit:{B12:0.35,iron:4.5,zinc:3.8},compounds:["카르노신","미오글로빈"],flavor:{umami:65,sweet:6,salty:5,sour:0,bitter:5}},
  "꿩":{cat:"meat",en:"Pheasant",emoji:"🐦",defaultG:200,comp:{protein:26,fat:4,carbs:0,water:69,fiber:0},amino:["류신","리신"],vit:{B12:0.46,iron:1.4,selenium:21},compounds:["미오글로빈"],flavor:{umami:65,sweet:5,salty:5,sour:0,bitter:5}},
  "칠면조":{cat:"meat",en:"Turkey",emoji:"🦃",defaultG:200,comp:{protein:29,fat:1.9,carbs:0,water:69,fiber:0},amino:["류신","리신","트립토판"],vit:{B6:0.9,niacin:7.5,selenium:26},compounds:["카르노신"],flavor:{umami:60,sweet:5,salty:5,sour:0,bitter:5}},

  // ── 글로벌 특수 육류 ───────────────────────────────────────────────────────
  "송아지고기":{cat:"meat",en:"Veal",emoji:"🐄",defaultG:200,comp:{protein:19,fat:2.9,carbs:0,water:77,fiber:0},amino:["류신","리신"],vit:{B12:1.4,zinc:3.4,iron:1.0},compounds:["미오글로빈","콜라겐"],flavor:{umami:65,sweet:7,salty:5,sour:0,bitter:3}},
  "염소고기":{cat:"meat",en:"Goat",emoji:"🐐",defaultG:200,comp:{protein:27,fat:3.6,carbs:0,water:69,fiber:0},amino:["글루탐산","류신"],vit:{B12:1.7,iron:3.7,zinc:4.0},compounds:["미오글로빈","카르니틴"],flavor:{umami:70,sweet:6,salty:5,sour:0,bitter:8}},
  "토끼고기":{cat:"meat",en:"Rabbit",emoji:"🐇",defaultG:200,comp:{protein:33,fat:8,carbs:0,water:58,fiber:0},amino:["류신","리신","메티오닌"],vit:{B12:7.2,selenium:38,phosphorus:263},compounds:["미오글로빈"],flavor:{umami:68,sweet:5,salty:5,sour:0,bitter:5}},
  "사슴고기":{cat:"meat",en:"Venison",emoji:"🦌",defaultG:200,comp:{protein:30,fat:2.4,carbs:0,water:67,fiber:0},amino:["글루탐산","류신"],vit:{B12:2.8,iron:3.8,zinc:3.4},compounds:["미오글로빈","카르니틴"],flavor:{umami:75,sweet:6,salty:5,sour:0,bitter:8}},
  "말고기":{cat:"meat",en:"Horse Meat",emoji:"🐎",defaultG:200,comp:{protein:21,fat:2.5,carbs:0.6,water:75,fiber:0},amino:["글루탐산","류신"],vit:{B12:3.5,iron:4.9,zinc:3.4},compounds:["미오글로빈","글리코겐"],flavor:{umami:75,sweet:8,salty:5,sour:0,bitter:5}},
  "타조고기":{cat:"meat",en:"Ostrich",emoji:"🦤",defaultG:200,comp:{protein:29,fat:3,carbs:0,water:67,fiber:0},amino:["류신","리신"],vit:{B12:3.7,iron:2.7,zinc:3.4},compounds:["미오글로빈"],flavor:{umami:70,sweet:6,salty:5,sour:0,bitter:5}},
  "들소고기":{cat:"meat",en:"Bison",emoji:"🦬",defaultG:200,comp:{protein:28,fat:2.4,carbs:0,water:70,fiber:0},amino:["글루탐산","류신"],vit:{B12:2.4,iron:3.2,zinc:4.3,selenium:26},compounds:["미오글로빈","CLA"],flavor:{umami:78,sweet:7,salty:5,sour:0,bitter:5}},
  "멧돼지":{cat:"meat",en:"Wild Boar",emoji:"🐗",defaultG:200,comp:{protein:28,fat:5.2,carbs:0,water:67,fiber:0},amino:["류신","리신"],vit:{B1:0.6,B6:0.6,niacin:7.5},compounds:["미오글로빈"],flavor:{umami:78,sweet:7,salty:5,sour:0,bitter:6}},
  "악어고기":{cat:"meat",en:"Alligator",emoji:"🐊",defaultG:200,comp:{protein:22,fat:3,carbs:0,water:74,fiber:0},amino:["류신","리신"],vit:{B12:1.8,selenium:19},compounds:["미오글로빈"],flavor:{umami:60,sweet:7,salty:5,sour:0,bitter:3}},
  "캥거루고기":{cat:"meat",en:"Kangaroo",emoji:"🦘",defaultG:200,comp:{protein:23,fat:2,carbs:0,water:74,fiber:0},amino:["류신","리신"],vit:{B12:2.3,iron:4.0,zinc:3.2},compounds:["CLA","카르니틴"],flavor:{umami:72,sweet:6,salty:5,sour:0,bitter:6}},
  "라마고기":{cat:"meat",en:"Llama",emoji:"🦙",defaultG:200,comp:{protein:26,fat:4,carbs:0,water:69,fiber:0},amino:["류신","리신"],vit:{B12:2.0,iron:3.5,zinc:3.0},compounds:["미오글로빈","오메가-3"],flavor:{umami:70,sweet:6,salty:5,sour:0,bitter:6}},
  "멧돼지(야생)":{cat:"meat",en:"Wild Boar (Wild)",emoji:"🐗",defaultG:200,comp:{protein:28,fat:4.5,carbs:0,water:68,fiber:0},amino:["류신","리신"],vit:{B1:0.65,niacin:8},compounds:["미오글로빈"],flavor:{umami:80,sweet:7,salty:5,sour:0,bitter:6}},

  // ── 내장육 ────────────────────────────────────────────────────────────────
  "간(소고기)":{cat:"meat",en:"Beef Liver",emoji:"🫀",defaultG:100,comp:{protein:20,fat:5,carbs:5,water:69,fiber:0},amino:["류신","리신"],vit:{A:4968,B12:59.3,iron:6.2,folate:290},compounds:["헤민","글리코겐"],flavor:{umami:70,sweet:10,salty:5,sour:5,bitter:15}},
  "닭 간":{cat:"meat",en:"Chicken Liver",emoji:"🫀",defaultG:100,comp:{protein:17,fat:5.5,carbs:0.9,water:75,fiber:0},amino:["류신","리신"],vit:{A:3296,B12:16.6,folate:590,iron:8.9},compounds:["헤민","레티놀","철분"],flavor:{umami:65,sweet:8,salty:5,sour:5,bitter:15}},
  "돼지 간":{cat:"meat",en:"Pork Liver",emoji:"🫀",defaultG:100,comp:{protein:21,fat:3.7,carbs:2.5,water:71,fiber:0},amino:["리신","류신"],vit:{A:6502,B12:26,folate:212,iron:18},compounds:["헤민","레티놀"],flavor:{umami:68,sweet:10,salty:5,sour:5,bitter:15}},
  "곱창":{cat:"meat",en:"Small Intestine",emoji:"🫀",defaultG:100,comp:{protein:15,fat:12,carbs:1.5,water:70,fiber:0},amino:["글루탐산","글리신"],vit:{B12:4.5,iron:4.2},compounds:["콜라겐","뮤신"],flavor:{umami:65,sweet:5,salty:5,sour:0,bitter:10}},
  "대창":{cat:"meat",en:"Large Intestine",emoji:"🫀",defaultG:100,comp:{protein:12,fat:18,carbs:1,water:68,fiber:0},amino:["글리신","프롤린"],vit:{B12:3.8,iron:3.5},compounds:["콜라겐","지방"],flavor:{umami:60,sweet:5,salty:5,sour:0,bitter:8}},
  "막창":{cat:"meat",en:"Abomasum",emoji:"🫀",defaultG:100,comp:{protein:11,fat:16,carbs:1.2,water:70,fiber:0},amino:["글리신","알라닌"],vit:{B12:3.5,iron:3.2},compounds:["콜라겐","뮤신"],flavor:{umami:58,sweet:5,salty:5,sour:0,bitter:8}},
  "양(소)":{cat:"meat",en:"Tripe",emoji:"🫀",defaultG:100,comp:{protein:14,fat:2.5,carbs:1.7,water:80,fiber:0},amino:["글리신","알라닌"],vit:{B12:1.3,iron:1.8},compounds:["뮤신","콜라겐"],flavor:{umami:60,sweet:5,salty:5,sour:5,bitter:10}},
  "혀(소)":{cat:"meat",en:"Beef Tongue",emoji:"🫀",defaultG:100,comp:{protein:16,fat:22,carbs:0.4,water:61,fiber:0},amino:["글루탐산","글리신"],vit:{B12:5.8,zinc:4.0,iron:2.5},compounds:["미오글로빈","콜라겐"],flavor:{umami:72,sweet:8,salty:5,sour:0,bitter:5}},
  "심장(소)":{cat:"meat",en:"Beef Heart",emoji:"🫀",defaultG:100,comp:{protein:17,fat:5,carbs:0.2,water:77,fiber:0},amino:["글루탐산","류신"],vit:{B12:10.5,CoQ10:113,iron:4.3},compounds:["코엔자임Q10","미오글로빈"],flavor:{umami:68,sweet:5,salty:5,sour:0,bitter:10}},
  "신장(소)":{cat:"meat",en:"Beef Kidney",emoji:"🫀",defaultG:100,comp:{protein:17,fat:3.1,carbs:0.8,water:78,fiber:0},amino:["류신","리신"],vit:{B12:36,B2:2.8,selenium:141},compounds:["헴철","요소"],flavor:{umami:60,sweet:5,salty:5,sour:0,bitter:15}},

  // ── 글로벌 가공육 ──────────────────────────────────────────────────────────
  "프로슈토":{cat:"meat",en:"Prosciutto",emoji:"🍖",defaultG:30,comp:{protein:28,fat:7,carbs:0.3,water:62,fiber:0},amino:["글루탐산","류신"],vit:{B1:0.64,sodium:1870},compounds:["올레산","티라민"],flavor:{umami:80,sweet:5,salty:80,sour:5,bitter:5}},
  "살라미":{cat:"meat",en:"Salami",emoji:"🥓",defaultG:30,comp:{protein:22,fat:36,carbs:1.4,water:38,fiber:0},amino:["류신"],vit:{B12:1.2,sodium:1740},compounds:["티라민","니트라이트","발효"],flavor:{umami:75,sweet:5,salty:80,sour:15,bitter:5}},
  "초리조":{cat:"meat",en:"Chorizo",emoji:"🌶️",defaultG:30,comp:{protein:23,fat:39,carbs:2.2,water:33,fiber:0},amino:["류신"],vit:{B1:0.4,sodium:1237},compounds:["캡사이신","파프리카","니트라이트"],flavor:{umami:70,sweet:10,salty:70,sour:10,bitter:5}},
  "페퍼로니":{cat:"meat",en:"Pepperoni",emoji:"🍕",defaultG:30,comp:{protein:19,fat:40,carbs:2,water:36,fiber:0},amino:["류신"],vit:{B12:0.8,sodium:1582},compounds:["캡사이신","니트라이트"],flavor:{umami:70,sweet:5,salty:75,sour:8,bitter:5}},
  "파스트라미":{cat:"meat",en:"Pastrami",emoji:"🥩",defaultG:30,comp:{protein:17,fat:5.5,carbs:0.5,water:74,fiber:0},amino:["글루탐산"],vit:{B12:1.8,sodium:1350},compounds:["코리앤더","후추","니트라이트"],flavor:{umami:72,sweet:5,salty:70,sour:5,bitter:10}},
  "코른비프":{cat:"meat",en:"Corned Beef",emoji:"🥫",defaultG:50,comp:{protein:25,fat:17,carbs:0,water:57,fiber:0},amino:["글루탐산","류신"],vit:{B12:2.0,sodium:1200},compounds:["니트라이트","겨자씨"],flavor:{umami:68,sweet:5,salty:75,sour:5,bitter:5}},
  "브라트부어스트":{cat:"meat",en:"Bratwurst",emoji:"🌭",defaultG:80,comp:{protein:14,fat:27,carbs:2,water:55,fiber:0},amino:["류신"],vit:{B1:0.45,sodium:780},compounds:["넛맥","마조람"],flavor:{umami:65,sweet:10,salty:60,sour:5,bitter:5}},
  "모르타델라":{cat:"meat",en:"Mortadella",emoji:"🥩",defaultG:30,comp:{protein:15,fat:29,carbs:1.5,water:52,fiber:0},amino:["류신"],vit:{B12:0.7,sodium:1100},compounds:["피스타치오","코리앤더"],flavor:{umami:65,sweet:10,salty:65,sour:5,bitter:3}},
  "판체타":{cat:"meat",en:"Pancetta",emoji:"🥓",defaultG:30,comp:{protein:14,fat:43,carbs:0,water:42,fiber:0},amino:["류신"],vit:{B1:0.4,sodium:1580},compounds:["주니퍼베리","후추","니트라이트"],flavor:{umami:72,sweet:5,salty:80,sour:5,bitter:5}},
  "키엘바사":{cat:"meat",en:"Kielbasa",emoji:"🌭",defaultG:80,comp:{protein:15,fat:28,carbs:3,water:52,fiber:0},amino:["류신"],vit:{B12:0.8,sodium:920},compounds:["마늘","마조람","니트라이트"],flavor:{umami:70,sweet:10,salty:65,sour:5,bitter:5}},
  "안두이유소시지":{cat:"meat",en:"Andouille Sausage",emoji:"🌭",defaultG:80,comp:{protein:14,fat:26,carbs:2,water:56,fiber:0},amino:["류신"],vit:{B12:0.7,sodium:1050},compounds:["케이준향신료","니트라이트"],flavor:{umami:68,sweet:10,salty:65,sour:5,bitter:8}},
  "볼로냐소시지":{cat:"meat",en:"Bologna",emoji:"🥩",defaultG:30,comp:{protein:12,fat:27,carbs:2.8,water:57,fiber:0},amino:["류신"],vit:{B12:0.7,sodium:1050},compounds:["코리앤더","니트라이트"],flavor:{umami:62,sweet:10,salty:65,sour:5,bitter:3}},
  "육포(비프저키)":{cat:"meat",en:"Beef Jerky",emoji:"🥩",defaultG:30,comp:{protein:33,fat:3.3,carbs:11,water:34,fiber:1.8},amino:["글루탐산","류신"],vit:{B12:2.3,zinc:5.4,iron:4.2},compounds:["니트라이트","소르베이트"],flavor:{umami:80,sweet:15,salty:80,sour:5,bitter:10}},
  "란체온미트":{cat:"meat",en:"Luncheon Meat",emoji:"🥫",defaultG:50,comp:{protein:13,fat:22,carbs:3,water:60,fiber:0},amino:["류신"],vit:{sodium:1450},compounds:["니트라이트"],flavor:{umami:65,sweet:8,salty:75,sour:3,bitter:3}},

  // ── Seafood (추가) ────────────────────────────────────────────────────────
  "굴":{cat:"seafood",en:"Oyster",emoji:"🦪",defaultG:100,comp:{protein:9,fat:2.5,carbs:4.9,water:82,fiber:0},amino:["글루탐산","글리신","타우린"],vit:{B12:16,zinc:78,selenium:63},compounds:["타우린","글리코겐","글리신"],flavor:{umami:85,sweet:20,salty:10,sour:8,bitter:3}},
  "가리비":{cat:"seafood",en:"Scallop",emoji:"🐚",defaultG:100,comp:{protein:17,fat:0.8,carbs:3.2,water:78,fiber:0},amino:["글리신","타우린"],vit:{B12:1.4,selenium:27,zinc:2},compounds:["타우린","글리신"],flavor:{umami:80,sweet:18,salty:8,sour:5,bitter:3}},
  "홍합":{cat:"seafood",en:"Mussel",emoji:"🦪",defaultG:100,comp:{protein:12,fat:2,carbs:3.7,water:81,fiber:0},amino:["글루탐산","글리신"],vit:{B12:12,selenium:44,iron:3.9},compounds:["타우린","오메가-3"],flavor:{umami:78,sweet:15,salty:8,sour:5,bitter:3}},
  "낙지":{cat:"seafood",en:"Small Octopus",emoji:"🐙",defaultG:100,comp:{protein:14,fat:0.9,carbs:1,water:83,fiber:0},amino:["글루탐산","타우린"],vit:{B12:8.9,selenium:44},compounds:["타우린"],flavor:{umami:78,sweet:5,salty:5,sour:5,bitter:3}},
  "해삼":{cat:"seafood",en:"Sea Cucumber",emoji:"🌊",defaultG:100,comp:{protein:5,fat:0.4,carbs:1,water:93,fiber:0},amino:["글리신","알라닌"],vit:{calcium:50,iron:2},compounds:["콜라겐","홀로투린"],flavor:{umami:65,sweet:5,salty:5,sour:5,bitter:3}},
  "성게":{cat:"seafood",en:"Sea Urchin",emoji:"🦔",defaultG:30,comp:{protein:13,fat:4.8,carbs:3.6,water:77,fiber:0},amino:["글루탐산","글리신"],vit:{B12:0.9,C:11,carotenoids:500},compounds:["에키놀론"],flavor:{umami:90,sweet:25,salty:8,sour:5,bitter:5}},
  "미역":{cat:"seafood",en:"Wakame",emoji:"🌿",defaultG:30,comp:{protein:1.7,fat:0.4,carbs:9.6,water:85,fiber:3.2},amino:[],vit:{iodine:1900,calcium:150,A:30},compounds:["알긴산","후코이단","요오드"],flavor:{umami:20,sweet:5,salty:5,sour:5,bitter:5}},
  "다시마":{cat:"seafood",en:"Kombu",emoji:"🌿",defaultG:10,comp:{protein:1.6,fat:0.2,carbs:4.4,water:88,fiber:1.4},amino:["글루탐산"],vit:{iodine:5000,calcium:168},compounds:["알긴산","만니톨","글루탐산"],flavor:{umami:90,sweet:5,salty:5,sour:0,bitter:3}},
  "김":{cat:"seafood",en:"Nori",emoji:"🍘",defaultG:2,comp:{protein:36,fat:0.7,carbs:50,water:8,fiber:36},amino:["글루탐산"],vit:{B12:57.6,iodine:2320,A:52},compounds:["포르피란","감마-아미노부티르산"],flavor:{umami:70,sweet:5,salty:15,sour:0,bitter:5}},
  "황태":{cat:"seafood",en:"Dried Pollock",emoji:"🐟",defaultG:30,comp:{protein:77,fat:3,carbs:0,water:13,fiber:0},amino:["류신","리신"],vit:{B12:10,calcium:200},compounds:["타우린","글리신"],flavor:{umami:85,sweet:5,salty:5,sour:5,bitter:3}},
  "건새우":{cat:"seafood",en:"Dried Shrimp",emoji:"🦐",defaultG:10,comp:{protein:57,fat:2.5,carbs:5.6,water:26,fiber:0},amino:["글루탐산","글리신"],vit:{calcium:1540,iodine:600},compounds:["타우린","키틴"],flavor:{umami:85,sweet:8,salty:10,sour:3,bitter:3}},
  "방어":{cat:"seafood",en:"Yellowtail",emoji:"🐟",defaultG:150,comp:{protein:23,fat:17,carbs:0,water:59,fiber:0},amino:["류신","리신"],vit:{D:14,B12:6.7,omega3:2.3},compounds:["오메가-3","아스타잔틴"],flavor:{umami:72,sweet:8,salty:5,sour:5,bitter:5}},
  "아귀":{cat:"seafood",en:"Monkfish",emoji:"🐡",defaultG:150,comp:{protein:15,fat:0.5,carbs:0,water:84,fiber:0},amino:["류신","리신"],vit:{B12:1.2,selenium:28},compounds:["타우린","콜라겐"],flavor:{umami:68,sweet:5,salty:5,sour:5,bitter:3}},
  "임연수어":{cat:"seafood",en:"Atka Mackerel",emoji:"🐟",defaultG:150,comp:{protein:19,fat:3.5,carbs:0,water:77,fiber:0},amino:["류신"],vit:{B12:2.4,omega3:0.8},compounds:["오메가-3"],flavor:{umami:68,sweet:5,salty:5,sour:5,bitter:3}},
  "청어":{cat:"seafood",en:"Herring",emoji:"🐟",defaultG:150,comp:{protein:18,fat:9,carbs:0,water:72,fiber:0},amino:["류신","리신"],vit:{D:9,B12:9.1,omega3:1.7},compounds:["오메가-3","비타민D"],flavor:{umami:70,sweet:8,salty:5,sour:5,bitter:5}},
  "해파리":{cat:"seafood",en:"Jellyfish",emoji:"🪼",defaultG:100,comp:{protein:7,fat:0.1,carbs:0,water:95,fiber:0},amino:["글리신","알라닌"],vit:{calcium:50},compounds:["콜라겐"],flavor:{umami:40,sweet:5,salty:5,sour:5,bitter:3}},
  "꼬막":{cat:"seafood",en:"Blood Cockle",emoji:"🦪",defaultG:100,comp:{protein:11,fat:1.8,carbs:2.7,water:83,fiber:0},amino:["글루탐산","타우린"],vit:{B12:8.2,iron:16.1},compounds:["타우린","헤모글로빈"],flavor:{umami:80,sweet:12,salty:8,sour:5,bitter:3}},

  // ── 해산물 추가 어류 ──────────────────────────────────────────────────────
  "도미":{cat:"seafood",en:"Sea Bream",emoji:"🐠",defaultG:150,comp:{protein:20,fat:3.4,carbs:0,water:75,fiber:0},amino:["글루탐산","라이신","알라닌"],vit:{D:3.5,B12:2.1,B6:0.4},compounds:["오메가-3","DHA","셀레늄"],flavor:{umami:75,sweet:12,salty:5,sour:3,bitter:2}},
  "삼치":{cat:"seafood",en:"Spanish Mackerel",emoji:"🐡",defaultG:150,comp:{protein:19,fat:5.5,carbs:0,water:73,fiber:0},amino:["류신","라이신","글루탐산"],vit:{D:4.8,B12:4.2,niacin:7.8},compounds:["오메가-3","EPA","DHA"],flavor:{umami:70,sweet:8,salty:5,sour:3,bitter:3}},
  "갈치":{cat:"seafood",en:"Hairtail",emoji:"🐟",defaultG:150,comp:{protein:18,fat:4.6,carbs:0,water:76,fiber:0},amino:["글루탐산","알라닌","글리신"],vit:{D:5.2,B12:3.8,calcium:45},compounds:["오메가-3","비타민D"],flavor:{umami:72,sweet:9,salty:5,sour:3,bitter:2}},
  "우럭":{cat:"seafood",en:"Rockfish",emoji:"🐟",defaultG:150,comp:{protein:19,fat:2.8,carbs:0,water:76,fiber:0},amino:["글루탐산","라이신","발린"],vit:{D:3.2,B12:2.5,selenium:28},compounds:["셀레늄","오메가-3"],flavor:{umami:73,sweet:10,salty:5,sour:3,bitter:2}},
  "볼락":{cat:"seafood",en:"Scorpionfish",emoji:"🐟",defaultG:120,comp:{protein:18,fat:2.2,carbs:0,water:77,fiber:0},amino:["글루탐산","알라닌","라이신"],vit:{D:2.8,B12:2.1},compounds:["오메가-3","칼슘"],flavor:{umami:68,sweet:10,salty:5,sour:3,bitter:2}},
  "농어":{cat:"seafood",en:"Sea Bass",emoji:"🐟",defaultG:150,comp:{protein:20,fat:2.0,carbs:0,water:76,fiber:0},amino:["글루탐산","라이신","이소류신"],vit:{D:3.8,B12:2.8,selenium:32},compounds:["셀레늄","오메가-3"],flavor:{umami:71,sweet:11,salty:5,sour:3,bitter:2}},
  "가자미":{cat:"seafood",en:"Flounder",emoji:"🐠",defaultG:150,comp:{protein:19,fat:1.8,carbs:0,water:77,fiber:0},amino:["글루탐산","알라닌","글리신"],vit:{D:2.5,B12:1.9,B6:0.3},compounds:["오메가-3","저지방"],flavor:{umami:65,sweet:9,salty:5,sour:3,bitter:2}},
  "송어":{cat:"seafood",en:"Trout",emoji:"🐟",defaultG:150,comp:{protein:20,fat:7.0,carbs:0,water:71,fiber:0},amino:["류신","라이신","발린"],vit:{D:9.5,B12:4.8,B6:0.6},compounds:["오메가-3","DHA","EPA","아스타잔틴"],flavor:{umami:70,sweet:10,salty:5,sour:3,bitter:2}},
  "무지개송어":{cat:"seafood",en:"Rainbow Trout",emoji:"🐟",defaultG:150,comp:{protein:21,fat:6.2,carbs:0,water:70,fiber:0},amino:["류신","라이신","트립토판"],vit:{D:11.5,B12:5.2,B6:0.7},compounds:["오메가-3","아스타잔틴","셀레늄"],flavor:{umami:72,sweet:10,salty:5,sour:3,bitter:2}},
  "틸라피아":{cat:"seafood",en:"Tilapia",emoji:"🐟",defaultG:150,comp:{protein:20,fat:2.7,carbs:0,water:76,fiber:0},amino:["라이신","류신","발린"],vit:{B12:1.8,B6:0.4,niacin:5.1},compounds:["셀레늄","저지방"],flavor:{umami:55,sweet:7,salty:4,sour:3,bitter:2}},
  "바라문디":{cat:"seafood",en:"Barramundi",emoji:"🐟",defaultG:150,comp:{protein:19,fat:2.0,carbs:0,water:77,fiber:0},amino:["글루탐산","라이신","알라닌"],vit:{D:3.1,B12:2.2,selenium:30},compounds:["오메가-3","셀레늄"],flavor:{umami:65,sweet:10,salty:5,sour:3,bitter:2}},
  "황새치":{cat:"seafood",en:"Swordfish",emoji:"🐟",defaultG:150,comp:{protein:20,fat:5.0,carbs:0,water:73,fiber:0},amino:["류신","라이신","이소류신"],vit:{D:6.8,B12:2.4,selenium:40},compounds:["오메가-3","셀레늄"],flavor:{umami:68,sweet:7,salty:5,sour:3,bitter:3}},
  "복어":{cat:"seafood",en:"Pufferfish",emoji:"🐡",defaultG:120,comp:{protein:18,fat:0.3,carbs:0,water:80,fiber:0},amino:["글루탐산","알라닌","글리신"],vit:{B12:1.5,B6:0.3},compounds:["테트로도톡신(독소)","저지방"],flavor:{umami:65,sweet:10,salty:4,sour:3,bitter:2}},
  "빙어":{cat:"seafood",en:"Smelt",emoji:"🐟",defaultG:80,comp:{protein:16,fat:2.5,carbs:0,water:80,fiber:0},amino:["글루탐산","알라닌"],vit:{D:2.1,calcium:55},compounds:["오메가-3","칼슘"],flavor:{umami:60,sweet:8,salty:4,sour:3,bitter:2}},
  "은어":{cat:"seafood",en:"Sweetfish",emoji:"🐟",defaultG:100,comp:{protein:17,fat:3.8,carbs:0,water:77,fiber:0},amino:["글루탐산","알라닌","글리신"],vit:{D:3.5,B12:2.0},compounds:["오메가-3","비타민D"],flavor:{umami:65,sweet:12,salty:5,sour:4,bitter:3}},
  "잉어":{cat:"seafood",en:"Carp",emoji:"🐟",defaultG:150,comp:{protein:17,fat:5.6,carbs:0,water:76,fiber:0},amino:["글루탐산","라이신"],vit:{B12:1.6,B6:0.3,calcium:50},compounds:["오메가-3","철분"],flavor:{umami:60,sweet:8,salty:5,sour:3,bitter:3}},
  "민어":{cat:"seafood",en:"Croaker",emoji:"🐟",defaultG:150,comp:{protein:18,fat:2.2,carbs:0,water:78,fiber:0},amino:["글루탐산","알라닌","라이신"],vit:{D:2.8,B12:2.0,selenium:25},compounds:["오메가-3","셀레늄"],flavor:{umami:68,sweet:10,salty:5,sour:3,bitter:2}},
  "숭어":{cat:"seafood",en:"Mullet",emoji:"🐟",defaultG:150,comp:{protein:19,fat:3.8,carbs:0,water:75,fiber:0},amino:["글루탐산","알라닌","라이신"],vit:{D:4.2,B12:3.1},compounds:["오메가-3","비타민D"],flavor:{umami:67,sweet:9,salty:5,sour:3,bitter:3}},
  "부시리":{cat:"seafood",en:"Greater Amberjack",emoji:"🐟",defaultG:150,comp:{protein:21,fat:7.5,carbs:0,water:70,fiber:0},amino:["류신","라이신","글루탐산"],vit:{D:5.5,B12:4.2},compounds:["오메가-3","DHA","EPA"],flavor:{umami:75,sweet:9,salty:5,sour:3,bitter:2}},
  "블루핀참치(혼마구로)":{cat:"seafood",en:"Bluefin Tuna",emoji:"🐟",defaultG:150,comp:{protein:26,fat:21,carbs:0,water:51,fiber:0},amino:["류신","라이신","발린"],vit:{D:12.5,B12:9.4,niacin:8.9},compounds:["오메가-3","DHA","EPA","아스타잔틴"],flavor:{umami:90,sweet:10,salty:5,sour:3,bitter:2}},

  // ── 해산물 조개류 ────────────────────────────────────────────────────────
  "조개류":{cat:"seafood",en:"Shellfish",emoji:"🦪",defaultG:100,comp:{protein:10,fat:1,carbs:3,water:84,fiber:0},amino:["타우린","글루탐산"],vit:{B12:5,iron:8},compounds:["타우린","철분"],flavor:{umami:78,sweet:10,salty:7,sour:4,bitter:3}},
  "바지락":{cat:"seafood",en:"Manila Clam",emoji:"🦪",defaultG:100,comp:{protein:9,fat:1.0,carbs:3.0,water:85,fiber:0},amino:["타우린","글루탐산","글리신"],vit:{B12:6.8,iron:12.5,calcium:66},compounds:["타우린","철분","베타인"],flavor:{umami:82,sweet:10,salty:8,sour:4,bitter:3}},
  "동죽":{cat:"seafood",en:"Surf Clam",emoji:"🦪",defaultG:100,comp:{protein:8,fat:0.8,carbs:3.5,water:86,fiber:0},amino:["타우린","글루탐산"],vit:{B12:5.5,iron:10.2},compounds:["타우린","철분"],flavor:{umami:75,sweet:9,salty:8,sour:4,bitter:3}},
  "백합":{cat:"seafood",en:"Hard Clam",emoji:"🦪",defaultG:100,comp:{protein:11,fat:1.2,carbs:4.0,water:82,fiber:0},amino:["타우린","글루탐산","글리신"],vit:{B12:8.5,iron:14.3,zinc:2.5},compounds:["타우린","아연","글리코겐"],flavor:{umami:85,sweet:12,salty:8,sour:4,bitter:2}},
  "키조개":{cat:"seafood",en:"Pen Shell",emoji:"🦪",defaultG:100,comp:{protein:13,fat:0.8,carbs:3.0,water:81,fiber:0},amino:["글루탐산","알라닌","타우린"],vit:{B12:7.2,iron:11.8,zinc:3.1},compounds:["타우린","철분","아연"],flavor:{umami:80,sweet:13,salty:6,sour:3,bitter:2}},
  "피조개":{cat:"seafood",en:"Blood Ark Shell",emoji:"🦪",defaultG:100,comp:{protein:13,fat:1.5,carbs:4.0,water:79,fiber:0},amino:["헤모글로빈","타우린","글루탐산"],vit:{B12:9.8,iron:22.5},compounds:["헤모글로빈","타우린","철분"],flavor:{umami:78,sweet:10,salty:7,sour:4,bitter:4}},
  "소라":{cat:"seafood",en:"Turban Shell",emoji:"🐚",defaultG:100,comp:{protein:14,fat:1.0,carbs:3.0,water:80,fiber:0},amino:["타우린","글루탐산","알라닌"],vit:{B12:4.8,iron:5.2,magnesium:35},compounds:["타우린","마그네슘"],flavor:{umami:72,sweet:10,salty:7,sour:4,bitter:4}},

  // ── 해산물 게류 ──────────────────────────────────────────────────────────
  "게류":{cat:"seafood",en:"Crabs",emoji:"🦀",defaultG:150,comp:{protein:16,fat:1,carbs:0,water:82,fiber:0},amino:["글루탐산","글리신","알라닌"],vit:{B12:3.5,zinc:4},compounds:["타우린","아연"],flavor:{umami:80,sweet:14,salty:7,sour:3,bitter:2}},
  "꽃게":{cat:"seafood",en:"Blue Crab",emoji:"🦀",defaultG:200,comp:{protein:14,fat:1.2,carbs:0,water:83,fiber:0},amino:["글루탐산","글리신","알라닌"],vit:{B12:3.8,zinc:3.8,calcium:72},compounds:["타우린","키토산"],flavor:{umami:82,sweet:14,salty:7,sour:3,bitter:2}},
  "대게":{cat:"seafood",en:"Snow Crab",emoji:"🦀",defaultG:300,comp:{protein:16,fat:0.8,carbs:0,water:81,fiber:0},amino:["글루탐산","알라닌","글리신"],vit:{B12:4.2,zinc:4.5,selenium:35},compounds:["셀레늄","아연"],flavor:{umami:85,sweet:15,salty:6,sour:3,bitter:2}},
  "킹크랩":{cat:"seafood",en:"King Crab",emoji:"🦀",defaultG:300,comp:{protein:19,fat:1.5,carbs:0,water:77,fiber:0},amino:["글루탐산","알라닌","류신"],vit:{B12:5.1,zinc:6.5,selenium:38},compounds:["셀레늄","아연","오메가-3"],flavor:{umami:88,sweet:15,salty:6,sour:3,bitter:2}},
  "홍게":{cat:"seafood",en:"Red Crab",emoji:"🦀",defaultG:200,comp:{protein:15,fat:0.6,carbs:0,water:82,fiber:0},amino:["글루탐산","글리신"],vit:{B12:3.5,calcium:68},compounds:["타우린","칼슘"],flavor:{umami:78,sweet:13,salty:7,sour:3,bitter:2}},
  "털게":{cat:"seafood",en:"Horsehair Crab",emoji:"🦀",defaultG:200,comp:{protein:17,fat:1.8,carbs:0,water:78,fiber:0},amino:["글루탐산","알라닌","글리신"],vit:{B12:4.8,zinc:5.2},compounds:["타우린","아연","오메가-3"],flavor:{umami:86,sweet:15,salty:6,sour:3,bitter:2}},

  // ── 해산물 새우류 ────────────────────────────────────────────────────────
  "새우류":{cat:"seafood",en:"Shrimps",emoji:"🦐",defaultG:100,comp:{protein:18,fat:1.2,carbs:0,water:79,fiber:0},amino:["글루탐산","글리신","알라닌"],vit:{B12:1.8,selenium:30,iodine:35},compounds:["타우린","셀레늄"],flavor:{umami:75,sweet:12,salty:7,sour:3,bitter:2}},
  "대하":{cat:"seafood",en:"Tiger Prawn",emoji:"🦐",defaultG:100,comp:{protein:18,fat:1.1,carbs:0,water:79,fiber:0},amino:["글루탐산","글리신","알라닌"],vit:{B12:2.1,selenium:32,iodine:40},compounds:["타우린","셀레늄","아스타잔틴"],flavor:{umami:78,sweet:12,salty:7,sour:3,bitter:2}},
  "랍스터":{cat:"seafood",en:"Lobster",emoji:"🦞",defaultG:200,comp:{protein:19,fat:1.9,carbs:0,water:77,fiber:0},amino:["글루탐산","알라닌","아르기닌"],vit:{B12:2.5,zinc:3.7,selenium:42},compounds:["셀레늄","아연","오메가-3"],flavor:{umami:82,sweet:15,salty:6,sour:3,bitter:2}},
  "닭새우":{cat:"seafood",en:"Mantis Shrimp",emoji:"🦞",defaultG:200,comp:{protein:20,fat:1.4,carbs:0,water:77,fiber:0},amino:["글루탐산","알라닌","아르기닌"],vit:{B12:2.8,selenium:40,zinc:3.5},compounds:["셀레늄","타우린"],flavor:{umami:80,sweet:13,salty:6,sour:3,bitter:2}},

  // ── 해산물 오징어류 ──────────────────────────────────────────────────────
  "오징어류":{cat:"seafood",en:"Squids",emoji:"🦑",defaultG:100,comp:{protein:15,fat:1,carbs:1.5,water:81,fiber:0},amino:["타우린","글루탐산","알라닌"],vit:{B12:1.5,selenium:25,iodine:20},compounds:["타우린","묵물안토시아닌"],flavor:{umami:72,sweet:8,salty:6,sour:3,bitter:2}},
  "한치":{cat:"seafood",en:"Spear Squid",emoji:"🦑",defaultG:100,comp:{protein:15,fat:1.2,carbs:2.0,water:80,fiber:0},amino:["타우린","글루탐산","알라닌"],vit:{B12:1.8,selenium:28},compounds:["타우린","오메가-3"],flavor:{umami:73,sweet:9,salty:6,sour:3,bitter:2}},
  "갑오징어":{cat:"seafood",en:"Cuttlefish",emoji:"🦑",defaultG:100,comp:{protein:16,fat:0.7,carbs:1.5,water:80,fiber:0},amino:["타우린","글루탐산","글리신"],vit:{B12:2.1,selenium:30,copper:2.1},compounds:["타우린","구리"],flavor:{umami:70,sweet:8,salty:6,sour:3,bitter:2}},
  "주꾸미":{cat:"seafood",en:"Webfoot Octopus",emoji:"🐙",defaultG:100,comp:{protein:13,fat:0.7,carbs:0.5,water:84,fiber:0},amino:["타우린","글루탐산","글리신"],vit:{B12:1.2,iron:3.8,selenium:22},compounds:["타우린","철분"],flavor:{umami:68,sweet:8,salty:6,sour:3,bitter:3}},
  "대문어":{cat:"seafood",en:"Giant Octopus",emoji:"🐙",defaultG:150,comp:{protein:15,fat:1.2,carbs:1.0,water:82,fiber:0},amino:["타우린","글루탐산","알라닌"],vit:{B12:2.2,selenium:35},compounds:["타우린","오메가-3"],flavor:{umami:72,sweet:9,salty:6,sour:3,bitter:3}},

  // ── 해산물 해조류 ────────────────────────────────────────────────────────
  "해조류":{cat:"seafood",en:"Seaweed",emoji:"🌿",defaultG:30,comp:{protein:3,fat:0.3,carbs:9,water:85,fiber:3},amino:["글루탐산","알라닌"],vit:{iodine:150,calcium:80,B12:0.3},compounds:["아이오딘","알긴산","푸코이단"],flavor:{umami:65,sweet:5,salty:12,sour:4,bitter:5}},
  "톳":{cat:"seafood",en:"Hijiki",emoji:"🌿",defaultG:30,comp:{protein:2,fat:0.2,carbs:12,water:83,fiber:5},amino:["글루탐산","알라닌"],vit:{calcium:140,iron:9.5,iodine:42},compounds:["푸코이단","알긴산","철분"],flavor:{umami:55,sweet:4,salty:12,sour:5,bitter:6}},
  "파래":{cat:"seafood",en:"Green Laver",emoji:"🌿",defaultG:30,comp:{protein:5,fat:0.5,carbs:7,water:85,fiber:4},amino:["글루탐산","알라닌"],vit:{A:120,C:15,calcium:90,iodine:35},compounds:["클로로필","베타카로텐","아이오딘"],flavor:{umami:58,sweet:5,salty:10,sour:4,bitter:5}},
  "청각":{cat:"seafood",en:"Sea Staghorn",emoji:"🌿",defaultG:30,comp:{protein:3,fat:0.3,carbs:8,water:86,fiber:3},amino:["글루탐산"],vit:{iodine:45,calcium:75},compounds:["아이오딘","알긴산"],flavor:{umami:52,sweet:4,salty:11,sour:4,bitter:6}},
  "우뭇가사리":{cat:"seafood",en:"Agar Seaweed",emoji:"🌿",defaultG:20,comp:{protein:2,fat:0.1,carbs:10,water:86,fiber:8},amino:["알라닌"],vit:{calcium:55,iodine:25},compounds:["아가로스","아가로펙틴","식이섬유"],flavor:{umami:30,sweet:3,salty:8,sour:3,bitter:4}},

  // ── 해산물 어란류 ────────────────────────────────────────────────────────
  "어란류":{cat:"seafood",en:"Fish Roe",emoji:"🫧",defaultG:30,comp:{protein:26,fat:14,carbs:3,water:53,fiber:0},amino:["류신","라이신","발린"],vit:{D:8,B12:10,A:180,E:2.5},compounds:["오메가-3","DHA","레시틴","아스타잔틴"],flavor:{umami:90,sweet:8,salty:12,sour:4,bitter:4}},
  "연어알":{cat:"seafood",en:"Salmon Roe",emoji:"🫧",defaultG:30,comp:{protein:29,fat:15,carbs:4,water:48,fiber:0},amino:["류신","라이신","발린"],vit:{D:10.5,B12:12.5,A:200,E:3.2},compounds:["아스타잔틴","오메가-3","DHA","레시틴"],flavor:{umami:88,sweet:10,salty:13,sour:5,bitter:4}},
  "명란":{cat:"seafood",en:"Pollock Roe",emoji:"🫧",defaultG:50,comp:{protein:22,fat:4.5,carbs:2,water:69,fiber:0},amino:["글루탐산","라이신","알라닌"],vit:{B12:8.8,A:85,D:4.2},compounds:["EPA","DHA","타우린"],flavor:{umami:82,sweet:7,salty:15,sour:5,bitter:3}},
  "날치알":{cat:"seafood",en:"Flying Fish Roe",emoji:"🫧",defaultG:30,comp:{protein:28,fat:6,carbs:5,water:58,fiber:0},amino:["류신","라이신","글루탐산"],vit:{B12:7.5,D:3.8},compounds:["오메가-3","DHA"],flavor:{umami:75,sweet:8,salty:12,sour:4,bitter:3}},
  "캐비어":{cat:"seafood",en:"Caviar",emoji:"🫧",defaultG:20,comp:{protein:25,fat:18,carbs:4,water:49,fiber:0},amino:["라이신","류신","아르기닌"],vit:{D:18.5,B12:20.2,A:250,E:4.5},compounds:["오메가-3","DHA","EPA","레시틴","아스타잔틴"],flavor:{umami:92,sweet:8,salty:14,sour:5,bitter:5}},
  "청어알":{cat:"seafood",en:"Herring Roe",emoji:"🫧",defaultG:30,comp:{protein:22,fat:8,carbs:2,water:65,fiber:0},amino:["류신","라이신","발린"],vit:{D:12.5,B12:9.2,E:2.8},compounds:["오메가-3","DHA","비타민D"],flavor:{umami:80,sweet:7,salty:13,sour:4,bitter:4}},

  // ── 해산물 기타 ──────────────────────────────────────────────────────────
  "멍게":{cat:"seafood",en:"Sea Squirt",emoji:"🪸",defaultG:100,comp:{protein:7,fat:0.5,carbs:4,water:87,fiber:0},amino:["타우린","글리신","글루탐산"],vit:{B12:1.5,iodine:120,vanadium:2},compounds:["신티아올","타우린","바나듐","아이오딘"],flavor:{umami:65,sweet:8,salty:9,sour:7,bitter:8}},
  "미더덕":{cat:"seafood",en:"Sea Pineapple",emoji:"🪸",defaultG:100,comp:{protein:8,fat:0.6,carbs:3,water:86,fiber:0},amino:["타우린","글루탐산","글리신"],vit:{B12:1.2,iodine:95,calcium:45},compounds:["타우린","아이오딘","신티아올"],flavor:{umami:62,sweet:7,salty:9,sour:6,bitter:7}},

  // ── Vegetable (추가) ──────────────────────────────────────────────────────
  "연근":{cat:"veg",en:"Lotus Root",emoji:"🌿",defaultG:100,comp:{protein:2.6,fat:0.1,carbs:17,water:79,fiber:4.9},amino:[],vit:{C:44,B6:0.17,potassium:556},compounds:["무신","탄닌","폴리페놀"],flavor:{umami:10,sweet:20,salty:0,sour:5,bitter:5}},
  "우엉":{cat:"veg",en:"Burdock Root",emoji:"🌿",defaultG:100,comp:{protein:1.5,fat:0.1,carbs:17.3,water:80,fiber:3.3},amino:[],vit:{B6:0.24,folate:21,potassium:308},compounds:["이눌린","리그닌","사포닌"],flavor:{umami:10,sweet:15,salty:0,sour:10,bitter:15}},
  "대파":{cat:"veg",en:"Korean Leek",emoji:"🌿",defaultG:50,comp:{protein:1.8,fat:0.2,carbs:7.4,water:89,fiber:2.6},amino:[],vit:{K:47,C:12,folate:64},compounds:["알리신","퀘르세틴"],flavor:{umami:20,sweet:20,salty:0,sour:5,bitter:15}},
  "쪽파":{cat:"veg",en:"Scallion",emoji:"🌿",defaultG:30,comp:{protein:1.8,fat:0.2,carbs:5.5,water:91,fiber:1.8},amino:[],vit:{K:207,A:100,C:18},compounds:["알리신","플라보노이드"],flavor:{umami:20,sweet:15,salty:0,sour:5,bitter:15}},
  "청양고추":{cat:"veg",en:"Korean Hot Pepper",emoji:"🌶️",defaultG:10,comp:{protein:2.0,fat:0.4,carbs:8,water:89,fiber:1.5},amino:[],vit:{C:160,A:50},compounds:["캡사이신","디하이드로캡사이신"],flavor:{umami:5,sweet:10,salty:0,sour:5,bitter:10}},
  "풋고추":{cat:"veg",en:"Green Chili",emoji:"🌶️",defaultG:15,comp:{protein:1.8,fat:0.3,carbs:7,water:90,fiber:1.2},amino:[],vit:{C:130,A:30},compounds:["캡사이신","카로티노이드"],flavor:{umami:5,sweet:15,salty:0,sour:5,bitter:5}},
  "두릅":{cat:"veg",en:"Aralia Shoots",emoji:"🌿",defaultG:100,comp:{protein:3,fat:0.3,carbs:6.9,water:88,fiber:2.4},amino:[],vit:{C:24,K:85,A:68},compounds:["사포닌","타닌"],flavor:{umami:15,sweet:5,salty:0,sour:5,bitter:20}},
  "취나물":{cat:"veg",en:"Aster Scaber",emoji:"🌿",defaultG:100,comp:{protein:3.7,fat:0.6,carbs:5.5,water:87,fiber:2.8},amino:[],vit:{K:780,A:362,C:35},compounds:["클로로필","폴리페놀"],flavor:{umami:15,sweet:5,salty:0,sour:5,bitter:25}},
  "고사리":{cat:"veg",en:"Bracken Fern",emoji:"🌿",defaultG:100,comp:{protein:2.9,fat:0.2,carbs:5.5,water:90,fiber:3.4},amino:[],vit:{K:60,C:26.6,B2:0.21},compounds:["프테로신"],flavor:{umami:15,sweet:5,salty:0,sour:5,bitter:15}},
  "도라지":{cat:"veg",en:"Bellflower Root",emoji:"🌿",defaultG:100,comp:{protein:2,fat:0.2,carbs:14.2,water:82,fiber:5},amino:[],vit:{C:8,calcium:40},compounds:["플라티코딘","이눌린","사포닌"],flavor:{umami:10,sweet:5,salty:0,sour:5,bitter:30}},
  "더덕":{cat:"veg",en:"Codonopsis Root",emoji:"🌿",defaultG:100,comp:{protein:2.1,fat:0.2,carbs:14,water:82,fiber:4.5},amino:[],vit:{C:6,calcium:30},compounds:["이눌린","사포닌"],flavor:{umami:10,sweet:5,salty:0,sour:5,bitter:20}},
  "쑥갓":{cat:"veg",en:"Crown Daisy",emoji:"🌿",defaultG:100,comp:{protein:2.1,fat:0.3,carbs:4.1,water:92,fiber:2},amino:[],vit:{K:350,A:460,C:43},compounds:["클로로필","테르펜"],flavor:{umami:15,sweet:5,salty:0,sour:5,bitter:25}},
  "청경채":{cat:"veg",en:"Bok Choy",emoji:"🥬",defaultG:100,comp:{protein:1.5,fat:0.2,carbs:2.2,water:95,fiber:1},amino:[],vit:{K:45.5,A:223,C:45},compounds:["글루코시놀레이트","설포라판"],flavor:{umami:15,sweet:10,salty:0,sour:5,bitter:10}},
  "루꼴라":{cat:"veg",en:"Arugula",emoji:"🥬",defaultG:50,comp:{protein:2.6,fat:0.7,carbs:3.7,water:92,fiber:1.6},amino:[],vit:{K:109,A:96,C:15},compounds:["글루코시놀레이트","이소티오시아네이트"],flavor:{umami:15,sweet:5,salty:0,sour:5,bitter:30}},
  "숙주나물":{cat:"veg",en:"Mung Bean Sprouts",emoji:"🌱",defaultG:100,comp:{protein:3.1,fat:0.2,carbs:5.9,water:90,fiber:1},amino:["글루탐산"],vit:{C:20,K:34,folate:95},compounds:["이소플라본"],flavor:{umami:10,sweet:8,salty:0,sour:5,bitter:5}},
  "깻잎":{cat:"veg",en:"Perilla Leaf",emoji:"🌿",defaultG:50,comp:{protein:3.9,fat:0.6,carbs:7.5,water:86,fiber:3.7},amino:[],vit:{K:530,A:375,C:24},compounds:["로즈마린산","루테올린"],flavor:{umami:15,sweet:5,salty:0,sour:5,bitter:20}},
  "열무":{cat:"veg",en:"Young Radish Greens",emoji:"🌿",defaultG:100,comp:{protein:1,fat:0.1,carbs:2.8,water:94,fiber:1},amino:[],vit:{C:27,K:29,calcium:40},compounds:["글루코시놀레이트"],flavor:{umami:5,sweet:5,salty:0,sour:10,bitter:15}},
  "죽순":{cat:"veg",en:"Bamboo Shoot",emoji:"🌿",defaultG:100,comp:{protein:2.6,fat:0.3,carbs:3.9,water:91,fiber:2.2},amino:["글루탐산","타이로신"],vit:{B6:0.14,potassium:533},compounds:["타이로신","사포닌"],flavor:{umami:20,sweet:5,salty:0,sour:5,bitter:10}},
  "콜라비":{cat:"veg",en:"Kohlrabi",emoji:"🥦",defaultG:100,comp:{protein:1.7,fat:0.1,carbs:5,water:91,fiber:3.6},amino:[],vit:{C:62,B6:0.15,potassium:350},compounds:["글루코시놀레이트"],flavor:{umami:10,sweet:20,salty:0,sour:5,bitter:5}},
  "적양배추":{cat:"veg",en:"Red Cabbage",emoji:"🥬",defaultG:100,comp:{protein:1.4,fat:0.2,carbs:6.6,water:90,fiber:2.1},amino:[],vit:{C:57,K:38,A:48},compounds:["안토시아닌","설포라판"],flavor:{umami:15,sweet:15,salty:0,sour:10,bitter:15}},
  "냉이":{cat:"veg",en:"Shepherds Purse",emoji:"🌿",defaultG:100,comp:{protein:3.4,fat:0.4,carbs:5,water:90,fiber:2},amino:[],vit:{K:315,A:223,C:43},compounds:["클로로필","이소티오시아네이트"],flavor:{umami:20,sweet:5,salty:0,sour:5,bitter:20}},
  "엔다이브":{cat:"veg",en:"Endive",emoji:"🥬",defaultG:100,comp:{protein:1.6,fat:0.2,carbs:4.1,water:94,fiber:3.1},amino:[],vit:{K:231,A:108,folate:142},compounds:["이눌린","락투신"],flavor:{umami:10,sweet:5,salty:0,sour:5,bitter:30}},
  "아티초크":{cat:"veg",en:"Artichoke",emoji:"🌿",defaultG:100,comp:{protein:3.3,fat:0.2,carbs:11.4,water:84,fiber:5.4},amino:[],vit:{C:11.7,K:14.4,folate:68},compounds:["이눌린","시나라린","루틴"],flavor:{umami:15,sweet:5,salty:0,sour:10,bitter:20}},
  "오크라":{cat:"veg",en:"Okra",emoji:"🌿",defaultG:100,comp:{protein:2,fat:0.2,carbs:7.5,water:90,fiber:3.2},amino:[],vit:{K:53,C:23,folate:88},compounds:["뮤실라지","펙틴","폴리페놀"],flavor:{umami:10,sweet:10,salty:0,sour:5,bitter:10}},
  "래디시":{cat:"veg",en:"Radish",emoji:"🌿",defaultG:50,comp:{protein:0.7,fat:0.1,carbs:3.4,water:95,fiber:1.6},amino:[],vit:{C:14.8,folate:25},compounds:["안토시아닌","이소티오시아네이트"],flavor:{umami:5,sweet:5,salty:0,sour:10,bitter:20}},
  "파슨립":{cat:"veg",en:"Parsnip",emoji:"🌿",defaultG:100,comp:{protein:1.8,fat:0.3,carbs:18,water:79,fiber:4.9},amino:[],vit:{C:17,K:22.5,folate:67},compounds:["파라핀","폴리아세틸렌"],flavor:{umami:10,sweet:20,salty:0,sour:5,bitter:10}},
  "생콩나물":{cat:"veg",en:"Raw Bean Sprouts",emoji:"🌱",defaultG:100,comp:{protein:3.1,fat:0.2,carbs:6,water:90,fiber:1},amino:["글루탐산"],vit:{C:20,K:34,folate:95},compounds:["사포닌"],flavor:{umami:10,sweet:8,salty:0,sour:5,bitter:5}},
  "방울토마토":{cat:"veg",en:"Cherry Tomato",emoji:"🍅",defaultG:100,comp:{protein:0.9,fat:0.2,carbs:5.8,water:93,fiber:1.2},amino:["글루탐산"],vit:{C:19.1,A:42,K:7.9},compounds:["리코펜","글루탐산","나린게닌"],flavor:{umami:60,sweet:30,salty:0,sour:35,bitter:5}},
  "단호박":{cat:"veg",en:"Kabocha Squash",emoji:"🎃",defaultG:100,comp:{protein:1.3,fat:0.1,carbs:12,water:85,fiber:2},amino:[],vit:{A:532,C:21,B6:0.17},compounds:["베타카로틴","루테인"],flavor:{umami:10,sweet:35,salty:0,sour:3,bitter:3}},
  "알배추":{cat:"veg",en:"Mini Napa Cabbage",emoji:"🥬",defaultG:100,comp:{protein:1.2,fat:0.1,carbs:3,water:95,fiber:0.8},amino:[],vit:{C:22,K:57,folate:36},compounds:["설포라판","클로로필"],flavor:{umami:15,sweet:12,salty:0,sour:5,bitter:8}},
  "브뤼셀새싹":{cat:"veg",en:"Brussels Sprouts",emoji:"🥦",defaultG:100,comp:{protein:3.4,fat:0.3,carbs:8.9,water:86,fiber:3.8},amino:["글루탐산"],vit:{K:177,C:85,folate:61},compounds:["설포라판","인돌-3-카르비놀"],flavor:{umami:20,sweet:8,salty:0,sour:5,bitter:30}},

  // ── 채소 글로벌 확장 ────────────────────────────────────────────────────

  // 양파/부추류
  "샬롯":{cat:"veg",en:"Shallot",emoji:"🧅",defaultG:50,comp:{protein:2.5,fat:0.1,carbs:17,water:79,fiber:3.2},amino:["알리신"],vit:{B6:0.34,folate:20,C:8},compounds:["퀘르세틴","알리신","플라보노이드"],flavor:{umami:25,sweet:35,salty:0,sour:5,bitter:10}},
  "리크":{cat:"veg",en:"Leek",emoji:"🌿",defaultG:100,comp:{protein:1.5,fat:0.3,carbs:14,water:83,fiber:1.8},amino:[],vit:{K:47,C:12,folate:64,B6:0.23},compounds:["알리신","플라보노이드","카로티노이드"],flavor:{umami:20,sweet:25,salty:0,sour:5,bitter:10}},
  "골파":{cat:"veg",en:"Chinese Chives",emoji:"🌿",defaultG:20,comp:{protein:3.3,fat:0.7,carbs:4.4,water:90,fiber:2.5},amino:[],vit:{K:212,A:131,C:58},compounds:["알리신","루테인","퀘르세틴"],flavor:{umami:20,sweet:10,salty:0,sour:5,bitter:15}},
  "적양파":{cat:"veg",en:"Red Onion",emoji:"🧅",defaultG:100,comp:{protein:1.1,fat:0.1,carbs:7.6,water:90,fiber:1.4},amino:[],vit:{C:7,B6:0.12,folate:19},compounds:["안토시아닌","퀘르세틴","알리신"],flavor:{umami:20,sweet:35,salty:0,sour:5,bitter:15}},
  "마늘쫑":{cat:"veg",en:"Garlic Scapes",emoji:"🌿",defaultG:50,comp:{protein:1.8,fat:0.2,carbs:5.2,water:91,fiber:1.2},amino:[],vit:{C:14,B6:0.18},compounds:["알리신","알리인","플라보노이드"],flavor:{umami:25,sweet:15,salty:0,sour:5,bitter:15}},
  "달래":{cat:"veg",en:"Wild Chives",emoji:"🌿",defaultG:50,comp:{protein:2.1,fat:0.4,carbs:4.8,water:91,fiber:1.8},amino:[],vit:{C:30,K:55,A:95},compounds:["알리신","사포닌","플라보노이드"],flavor:{umami:20,sweet:10,salty:0,sour:5,bitter:20}},
  "산마늘":{cat:"veg",en:"Wild Garlic",emoji:"🌿",defaultG:50,comp:{protein:2.2,fat:0.3,carbs:5.8,water:90,fiber:2.2},amino:[],vit:{C:60,K:180,A:110},compounds:["알리신","플라보노이드","비타민C"],flavor:{umami:25,sweet:5,salty:0,sour:5,bitter:20}},

  // 잎채소류 (글로벌)
  "양상추":{cat:"veg",en:"Iceberg Lettuce",emoji:"🥬",defaultG:100,comp:{protein:0.9,fat:0.1,carbs:2.9,water:96,fiber:1.3},amino:[],vit:{K:24,A:25,C:2.8,folate:29},compounds:["루테인","클로로필"],flavor:{umami:5,sweet:5,salty:0,sour:3,bitter:5}},
  "로메인상추":{cat:"veg",en:"Romaine Lettuce",emoji:"🥬",defaultG:100,comp:{protein:1.2,fat:0.3,carbs:3.3,water:95,fiber:2.1},amino:[],vit:{K:103,A:436,C:4,folate:136},compounds:["루테인","베타카로틴","클로로필"],flavor:{umami:8,sweet:5,salty:0,sour:3,bitter:10}},
  "상추":{cat:"veg",en:"Lettuce",emoji:"🥬",defaultG:50,comp:{protein:1.4,fat:0.2,carbs:2.9,water:95,fiber:1.8},amino:[],vit:{K:130,A:166,C:9.2,folate:68},compounds:["락투신","클로로필","안토시아닌"],flavor:{umami:10,sweet:5,salty:0,sour:3,bitter:15}},
  "적상추":{cat:"veg",en:"Red Lettuce",emoji:"🥬",defaultG:50,comp:{protein:1.3,fat:0.2,carbs:2.8,water:95,fiber:1.7},amino:[],vit:{K:140,A:180,C:8.5,folate:65},compounds:["안토시아닌","락투신","클로로필"],flavor:{umami:8,sweet:5,salty:0,sour:3,bitter:18}},
  "근대":{cat:"veg",en:"Swiss Chard",emoji:"🥬",defaultG:100,comp:{protein:1.8,fat:0.2,carbs:3.7,water:93,fiber:1.6},amino:["글루탐산"],vit:{K:830,A:306,C:30,magnesium:81},compounds:["베타인","안토시아닌","베타카로틴"],flavor:{umami:20,sweet:5,salty:3,sour:5,bitter:15}},
  "물냉이":{cat:"veg",en:"Watercress",emoji:"🌿",defaultG:50,comp:{protein:2.3,fat:0.1,carbs:1.3,water:95,fiber:0.5},amino:[],vit:{K:250,A:160,C:43,calcium:120},compounds:["이소티오시아네이트","글루코나스투르틴","루테인"],flavor:{umami:10,sweet:3,salty:0,sour:5,bitter:25}},
  "겨자잎":{cat:"veg",en:"Mustard Greens",emoji:"🥬",defaultG:100,comp:{protein:2.9,fat:0.4,carbs:4.9,water:90,fiber:3.2},amino:[],vit:{K:593,A:151,C:70,folate:187},compounds:["글루코시놀레이트","이소티오시아네이트","시나피신"],flavor:{umami:10,sweet:3,salty:0,sour:5,bitter:35}},
  "라디치오":{cat:"veg",en:"Radicchio",emoji:"🥬",defaultG:80,comp:{protein:1.4,fat:0.2,carbs:4.5,water:93,fiber:0.9},amino:[],vit:{K:255,C:8,folate:60},compounds:["안토시아닌","락투신","이눌린"],flavor:{umami:8,sweet:5,salty:0,sour:5,bitter:40}},
  "민들레잎":{cat:"veg",en:"Dandelion Greens",emoji:"🌿",defaultG:100,comp:{protein:2.7,fat:0.7,carbs:9.2,water:85,fiber:3.5},amino:[],vit:{K:778,A:508,C:35,calcium:187},compounds:["타락사신","루테올린","클로로겐산"],flavor:{umami:10,sweet:3,salty:0,sour:5,bitter:35}},
  "소렐":{cat:"veg",en:"Sorrel",emoji:"🌿",defaultG:100,comp:{protein:2,fat:0.7,carbs:3.2,water:93,fiber:0.9},amino:[],vit:{C:48,A:201,K:43,iron:2.4},compounds:["옥살산","안트라퀴논","폴리페놀"],flavor:{umami:8,sweet:3,salty:0,sour:40,bitter:15}},
  "콜라드그린":{cat:"veg",en:"Collard Greens",emoji:"🥬",defaultG:100,comp:{protein:3,fat:0.4,carbs:5.7,water:89,fiber:3.6},amino:["글루탐산"],vit:{K:623,A:251,C:35,calcium:232},compounds:["설포라판","글루코시놀레이트","클로로필"],flavor:{umami:20,sweet:5,salty:0,sour:5,bitter:20}},
  "미즈나":{cat:"veg",en:"Mizuna",emoji:"🥬",defaultG:80,comp:{protein:2.1,fat:0.3,carbs:4.4,water:92,fiber:1.8},amino:[],vit:{K:257,C:65,A:88,folate:96},compounds:["글루코시놀레이트","이소티오시아네이트"],flavor:{umami:10,sweet:5,salty:0,sour:5,bitter:15}},
  "타차이":{cat:"veg",en:"Tatsoi",emoji:"🥬",defaultG:80,comp:{protein:1.5,fat:0.2,carbs:2.2,water:95,fiber:1},amino:[],vit:{K:60,C:40,A:155},compounds:["클로로필","글루코시놀레이트"],flavor:{umami:12,sweet:8,salty:0,sour:3,bitter:10}},
  "치커리":{cat:"veg",en:"Chicory",emoji:"🥬",defaultG:100,comp:{protein:1.7,fat:0.3,carbs:8.6,water:88,fiber:4},amino:[],vit:{K:297,A:286,C:24,folate:110},compounds:["이눌린","락투신","에스쿨린"],flavor:{umami:8,sweet:5,salty:0,sour:5,bitter:35}},
  "토스카나케일":{cat:"veg",en:"Tuscan Kale",emoji:"🥬",defaultG:100,comp:{protein:4.3,fat:0.9,carbs:5.4,water:83,fiber:2},amino:["글루탐산"],vit:{K:817,A:381,C:93,calcium:268},compounds:["설포라판","이소티오시아네이트","루테인"],flavor:{umami:25,sweet:5,salty:0,sour:5,bitter:30}},
  "공심채":{cat:"veg",en:"Water Spinach",emoji:"🌿",defaultG:100,comp:{protein:2.6,fat:0.4,carbs:3.1,water:93,fiber:2.1},amino:[],vit:{K:78,A:380,C:55,iron:1.7},compounds:["클로로필","베타카로틴"],flavor:{umami:15,sweet:8,salty:0,sour:5,bitter:15}},
  "쑥":{cat:"veg",en:"Mugwort",emoji:"🌿",defaultG:50,comp:{protein:3.8,fat:0.6,carbs:7.5,water:85,fiber:3.8},amino:[],vit:{K:1040,A:480,C:35,iron:3.5},compounds:["아르테미시닌","투존","캠퍼","클로로필"],flavor:{umami:15,sweet:3,salty:0,sour:3,bitter:35}},
  "원추리":{cat:"veg",en:"Daylily",emoji:"🌼",defaultG:100,comp:{protein:2.1,fat:0.3,carbs:7.5,water:88,fiber:2.8},amino:[],vit:{A:250,C:15,B6:0.19},compounds:["베타카로틴","폴리페놀"],flavor:{umami:15,sweet:10,salty:0,sour:5,bitter:15}},
  "방풍나물":{cat:"veg",en:"Bangpung Herb",emoji:"🌿",defaultG:100,comp:{protein:2.3,fat:0.3,carbs:6.2,water:89,fiber:3.1},amino:[],vit:{A:280,C:25,K:95},compounds:["쿠마린","폴리아세틸렌","플라보노이드"],flavor:{umami:15,sweet:5,salty:0,sour:5,bitter:20}},
  "돌나물":{cat:"veg",en:"Stonecrop",emoji:"🌿",defaultG:100,comp:{protein:1.5,fat:0.2,carbs:3.8,water:93,fiber:1.5},amino:[],vit:{C:32,K:45,calcium:35},compounds:["쿼르세틴","클로로필"],flavor:{umami:10,sweet:5,salty:2,sour:15,bitter:10}},
  "머위":{cat:"veg",en:"Butterbur",emoji:"🌿",defaultG:100,comp:{protein:1.8,fat:0.2,carbs:4.9,water:92,fiber:2.6},amino:[],vit:{K:120,A:88,C:15},compounds:["페타신","이소페타신","폴리페놀"],flavor:{umami:15,sweet:5,salty:0,sour:5,bitter:30}},
  "아욱":{cat:"veg",en:"Mallow",emoji:"🌿",defaultG:100,comp:{protein:3,fat:0.4,carbs:5,water:90,fiber:2.3},amino:[],vit:{K:140,C:31,calcium:170,iron:1.6},compounds:["뮤실라지","플라보노이드"],flavor:{umami:15,sweet:10,salty:0,sour:5,bitter:10}},
  "비트잎":{cat:"veg",en:"Beet Greens",emoji:"🥬",defaultG:100,comp:{protein:2.2,fat:0.1,carbs:4.3,water:91,fiber:3.7},amino:["글루탐산"],vit:{K:400,A:316,C:30,iron:3.3},compounds:["베타인","베타라닌","옥살산"],flavor:{umami:20,sweet:5,salty:3,sour:5,bitter:20}},

  // 박류/호박류
  "애호박":{cat:"veg",en:"Korean Zucchini",emoji:"🥒",defaultG:150,comp:{protein:1.2,fat:0.1,carbs:3.4,water:94,fiber:1.1},amino:[],vit:{C:17,K:4.3,B6:0.22,folate:24},compounds:["루테인","제아잔틴","클로로필"],flavor:{umami:10,sweet:10,salty:0,sour:3,bitter:5}},
  "주키니":{cat:"veg",en:"Zucchini",emoji:"🥒",defaultG:150,comp:{protein:1.2,fat:0.3,carbs:3.1,water:94,fiber:1},amino:[],vit:{C:17,K:4.3,B6:0.24,folate:24},compounds:["루테인","클로로필"],flavor:{umami:10,sweet:10,salty:0,sour:3,bitter:5}},
  "여주":{cat:"veg",en:"Bitter Melon",emoji:"🫚",defaultG:100,comp:{protein:1,fat:0.2,carbs:3.7,water:94,fiber:2.8},amino:[],vit:{C:84,K:4.8,folate:72},compounds:["채란틴","모모르디신","폴리펩타이드-P"],flavor:{umami:5,sweet:3,salty:0,sour:5,bitter:55}},
  "동아":{cat:"veg",en:"Wax Gourd",emoji:"🎃",defaultG:100,comp:{protein:0.4,fat:0.2,carbs:3,water:96,fiber:2.9},amino:[],vit:{C:13,B6:0.04,zinc:0.6},compounds:["아데닌","베타인"],flavor:{umami:5,sweet:5,salty:0,sour:3,bitter:5}},
  "버터넛스쿼시":{cat:"veg",en:"Butternut Squash",emoji:"🎃",defaultG:150,comp:{protein:1,fat:0.1,carbs:12,water:86,fiber:2},amino:[],vit:{A:532,C:21,B6:0.19,E:1.4},compounds:["베타카로틴","루테인","오메가-3"],flavor:{umami:8,sweet:35,salty:0,sour:3,bitter:3}},
  "차요테":{cat:"veg",en:"Chayote",emoji:"🥒",defaultG:100,comp:{protein:0.8,fat:0.1,carbs:4.5,water:94,fiber:1.7},amino:[],vit:{C:7.7,folate:93,K:4.5,zinc:0.7},compounds:["폴리페놀","비타민C"],flavor:{umami:5,sweet:10,salty:0,sour:5,bitter:5}},
  "박":{cat:"veg",en:"Bottle Gourd",emoji:"🎃",defaultG:100,comp:{protein:0.6,fat:0.1,carbs:2.9,water:96,fiber:0.5},amino:[],vit:{C:10,B5:0.15},compounds:["식이섬유","폴리페놀"],flavor:{umami:5,sweet:5,salty:0,sour:3,bitter:5}},
  "스파게티스쿼시":{cat:"veg",en:"Spaghetti Squash",emoji:"🎃",defaultG:150,comp:{protein:0.7,fat:0.6,carbs:6.9,water:92,fiber:1.5},amino:[],vit:{B6:0.10,B5:0.40,C:5.1},compounds:["베타카로틴","루테인"],flavor:{umami:5,sweet:10,salty:0,sour:3,bitter:5}},
  "아콘스쿼시":{cat:"veg",en:"Acorn Squash",emoji:"🎃",defaultG:150,comp:{protein:0.8,fat:0.1,carbs:10,water:88,fiber:1.5},amino:[],vit:{A:360,C:11,B6:0.20,potassium:350},compounds:["베타카로틴","루테인"],flavor:{umami:8,sweet:25,salty:0,sour:3,bitter:5}},

  // 고추류 (글로벌)
  "꽈리고추":{cat:"veg",en:"Shishito Pepper",emoji:"🌶️",defaultG:30,comp:{protein:1.8,fat:0.3,carbs:7,water:90,fiber:1.4},amino:[],vit:{C:110,A:20},compounds:["캡사이신","카로티노이드"],flavor:{umami:5,sweet:15,salty:0,sour:5,bitter:8}},
  "할라피뇨":{cat:"veg",en:"Jalapeno",emoji:"🌶️",defaultG:15,comp:{protein:0.9,fat:0.4,carbs:6.5,water:92,fiber:2.5},amino:[],vit:{C:119,A:22,B6:0.42},compounds:["캡사이신","디하이드로캡사이신"],flavor:{umami:5,sweet:10,salty:0,sour:5,bitter:8}},
  "포블라노고추":{cat:"veg",en:"Poblano Pepper",emoji:"🫑",defaultG:80,comp:{protein:1.1,fat:0.5,carbs:5,water:92,fiber:1.9},amino:[],vit:{C:95,A:28,B6:0.3},compounds:["캡사이신","카로티노이드"],flavor:{umami:8,sweet:20,salty:0,sour:5,bitter:10}},
  "아나헤임고추":{cat:"veg",en:"Anaheim Pepper",emoji:"🫑",defaultG:80,comp:{protein:1,fat:0.2,carbs:6.5,water:91,fiber:2},amino:[],vit:{C:88,A:50},compounds:["캡사이신","카로티노이드"],flavor:{umami:8,sweet:25,salty:0,sour:5,bitter:5}},
  "토마티요":{cat:"veg",en:"Tomatillo",emoji:"🍅",defaultG:100,comp:{protein:0.9,fat:1.0,carbs:5.8,water:92,fiber:1.9},amino:[],vit:{C:12,K:10,niacin:1.8},compounds:["위타놀라이드","플라보노이드"],flavor:{umami:15,sweet:10,salty:0,sour:30,bitter:10}},
  "노란파프리카":{cat:"veg",en:"Yellow Bell Pepper",emoji:"🫑",defaultG:100,comp:{protein:1,fat:0.2,carbs:6.3,water:92,fiber:0.9},amino:[],vit:{C:183,A:73,B6:0.17},compounds:["캡산토인","루테인","제아잔틴"],flavor:{umami:12,sweet:50,salty:0,sour:8,bitter:3}},
  "오렌지파프리카":{cat:"veg",en:"Orange Bell Pepper",emoji:"🫑",defaultG:100,comp:{protein:1,fat:0.3,carbs:6.7,water:91,fiber:2.1},amino:[],vit:{C:158,A:150,B6:0.2},compounds:["베타카로틴","캡산토인","루테인"],flavor:{umami:12,sweet:45,salty:0,sour:8,bitter:3}},

  // 십자화과 추가
  "콜리플라워":{cat:"veg",en:"Cauliflower",emoji:"🥦",defaultG:100,comp:{protein:1.9,fat:0.3,carbs:5,water:92,fiber:2},amino:["글루탐산"],vit:{C:48.2,K:15.5,folate:57,B6:0.18},compounds:["설포라판","인돌","글루코시놀레이트"],flavor:{umami:20,sweet:10,salty:0,sour:5,bitter:15}},
  "로마네스코":{cat:"veg",en:"Romanesco",emoji:"🥦",defaultG:100,comp:{protein:2.8,fat:0.4,carbs:4.6,water:90,fiber:3},amino:["글루탐산"],vit:{C:60,K:18,folate:75},compounds:["설포라판","글루코시놀레이트","카로티노이드"],flavor:{umami:22,sweet:10,salty:0,sour:5,bitter:15}},
  "브로콜리니":{cat:"veg",en:"Broccolini",emoji:"🥦",defaultG:100,comp:{protein:3.1,fat:0.4,carbs:5.5,water:89,fiber:2.7},amino:["글루탐산"],vit:{C:93,K:115,A:85,folate:71},compounds:["설포라판","안토시아닌","클로로필"],flavor:{umami:22,sweet:10,salty:0,sour:5,bitter:20}},
  "카이란":{cat:"veg",en:"Chinese Broccoli",emoji:"🥦",defaultG:100,comp:{protein:2.2,fat:0.4,carbs:4.2,water:92,fiber:2.8},amino:[],vit:{C:74,K:88,calcium:105,A:96},compounds:["글루코시놀레이트","설포라판","클로로필"],flavor:{umami:18,sweet:8,salty:0,sour:5,bitter:20}},
  "사보이양배추":{cat:"veg",en:"Savoy Cabbage",emoji:"🥬",defaultG:100,comp:{protein:2,fat:0.1,carbs:6.1,water:91,fiber:3.1},amino:[],vit:{K:68,C:31,folate:80},compounds:["설포라판","인돌","글루코시놀레이트"],flavor:{umami:15,sweet:12,salty:0,sour:5,bitter:15}},
  "무청":{cat:"veg",en:"Radish Greens",emoji:"🥬",defaultG:100,comp:{protein:1.5,fat:0.3,carbs:4.8,water:92,fiber:2},amino:[],vit:{K:370,A:280,C:44,calcium:94},compounds:["글루코시놀레이트","베타카로틴"],flavor:{umami:10,sweet:5,salty:0,sour:5,bitter:20}},

  // 뿌리/구근류 (글로벌)
  "순무":{cat:"veg",en:"Turnip",emoji:"🌰",defaultG:100,comp:{protein:0.9,fat:0.1,carbs:6.4,water:92,fiber:1.8},amino:[],vit:{C:21,K:0.1,folate:15},compounds:["글루코시놀레이트","안토시아닌"],flavor:{umami:5,sweet:15,salty:0,sour:5,bitter:15}},
  "루타바가":{cat:"veg",en:"Rutabaga",emoji:"🌰",defaultG:100,comp:{protein:1.2,fat:0.2,carbs:8.7,water:89,fiber:2.3},amino:[],vit:{C:25,K:0.3,B6:0.1},compounds:["글루코시놀레이트","안토시아닌"],flavor:{umami:5,sweet:20,salty:0,sour:5,bitter:15}},
  "셀러리악":{cat:"veg",en:"Celeriac",emoji:"🌰",defaultG:100,comp:{protein:1.5,fat:0.3,carbs:9.2,water:88,fiber:1.8},amino:[],vit:{K:41,C:8,B6:0.15,phosphorus:115},compounds:["프탈라이드","부타-3-n","폴리아세틸렌"],flavor:{umami:15,sweet:10,salty:0,sour:5,bitter:15}},
  "토란":{cat:"veg",en:"Taro",emoji:"🌰",defaultG:100,comp:{protein:1.5,fat:0.2,carbs:26,water:72,fiber:4.1},amino:[],vit:{B6:0.33,K:1.1,potassium:591},compounds:["옥살산칼슘","뮤신","갈락탄"],flavor:{umami:10,sweet:15,salty:0,sour:3,bitter:5}},
  "마":{cat:"veg",en:"Yam",emoji:"🌰",defaultG:100,comp:{protein:1.5,fat:0.1,carbs:17,water:80,fiber:4.1},amino:[],vit:{B6:0.29,C:17.1,potassium:816},compounds:["뮤신","알란토인","디오스게닌","사포닌"],flavor:{umami:10,sweet:20,salty:0,sour:3,bitter:5}},
  "카사바":{cat:"veg",en:"Cassava",emoji:"🌰",defaultG:100,comp:{protein:1.4,fat:0.3,carbs:38,water:60,fiber:1.8},amino:[],vit:{C:20.6,K:1.9,B6:0.09,folate:27},compounds:["전분","식이섬유","폴리페놀"],flavor:{umami:5,sweet:5,salty:0,sour:3,bitter:3}},
  "자색감자":{cat:"veg",en:"Purple Potato",emoji:"🥔",defaultG:150,comp:{protein:2.1,fat:0.1,carbs:17,water:79,fiber:2.5},amino:["아스파르트산"],vit:{C:19,B6:0.30,potassium:407},compounds:["안토시아닌","클로로겐산","아스파라긴"],flavor:{umami:10,sweet:12,salty:0,sour:3,bitter:5}},
  "야콘":{cat:"veg",en:"Yacon",emoji:"🌰",defaultG:100,comp:{protein:0.5,fat:0.1,carbs:11,water:88,fiber:0.3},amino:[],vit:{C:13.5,potassium:160,calcium:16},compounds:["프럭토올리고당","이눌린","클로로겐산"],flavor:{umami:5,sweet:30,salty:0,sour:5,bitter:3}},
  "수박무":{cat:"veg",en:"Watermelon Radish",emoji:"🌰",defaultG:100,comp:{protein:0.7,fat:0.1,carbs:3.4,water:95,fiber:1.6},amino:[],vit:{C:14.8,folate:25},compounds:["안토시아닌","글루코시놀레이트"],flavor:{umami:5,sweet:8,salty:0,sour:10,bitter:15}},
  "예루살렘아티초크":{cat:"veg",en:"Jerusalem Artichoke",emoji:"🌰",defaultG:100,comp:{protein:2,fat:0,carbs:17.4,water:79,fiber:1.6},amino:[],vit:{B1:0.2,iron:3.4,potassium:429},compounds:["이눌린","프럭토올리고당","폴리페놀"],flavor:{umami:8,sweet:20,salty:0,sour:5,bitter:5}},

  // 콩 채소류
  "에다마메":{cat:"veg",en:"Edamame",emoji:"🫘",defaultG:100,comp:{protein:11,fat:5,carbs:8.9,water:73,fiber:5.2},amino:["라이신","류신","발린"],vit:{K:26.7,folate:311,C:9.7,iron:2.3},compounds:["이소플라본","사포닌","피트산"],flavor:{umami:25,sweet:15,salty:3,sour:3,bitter:5}},
  "완두콩":{cat:"veg",en:"Green Peas",emoji:"🫛",defaultG:80,comp:{protein:5,fat:0.4,carbs:14.5,water:79,fiber:5.5},amino:["라이신","류신"],vit:{K:24.8,C:40,folate:65,B1:0.27},compounds:["루테인","제아잔틴","이소플라본"],flavor:{umami:20,sweet:30,salty:0,sour:3,bitter:5}},
  "스냅피":{cat:"veg",en:"Sugar Snap Peas",emoji:"🫛",defaultG:80,comp:{protein:2.8,fat:0.2,carbs:7.5,water:89,fiber:2.6},amino:[],vit:{C:60,K:25,folate:42},compounds:["클로로필","루테인","폴리페놀"],flavor:{umami:15,sweet:25,salty:0,sour:3,bitter:5}},
  "롱빈":{cat:"veg",en:"Long Bean",emoji:"🌿",defaultG:100,comp:{protein:2.8,fat:0.2,carbs:8.4,water:88,fiber:3.1},amino:[],vit:{C:18.8,K:47,A:865,folate:62},compounds:["클로로필","베타카로틴","폴리페놀"],flavor:{umami:12,sweet:15,salty:0,sour:3,bitter:8}},
  "잠두(파바빈)":{cat:"veg",en:"Fava Bean",emoji:"🫘",defaultG:100,comp:{protein:7.6,fat:0.7,carbs:19,water:72,fiber:5.4},amino:["라이신","류신","이소류신"],vit:{folate:148,C:33,B1:0.25},compounds:["레바도파","폴리페놀","이소플라본"],flavor:{umami:20,sweet:10,salty:0,sour:5,bitter:15}},

  // 기타 글로벌 채소
  "펜넬":{cat:"veg",en:"Fennel",emoji:"🌿",defaultG:100,comp:{protein:1.2,fat:0.2,carbs:7.3,water:90,fiber:3.1},amino:[],vit:{C:12,K:62,folate:27,potassium:414},compounds:["아네톨","펜촌","에스트라골"],flavor:{umami:8,sweet:20,salty:0,sour:5,bitter:10}},
  "노팔":{cat:"veg",en:"Nopales",emoji:"🌵",defaultG:100,comp:{protein:1.1,fat:0.1,carbs:5.1,water:92,fiber:3.6},amino:[],vit:{C:9.3,K:0.5,calcium:164,magnesium:52},compounds:["베타인","폴리페놀","뮤실라지"],flavor:{umami:5,sweet:5,salty:2,sour:15,bitter:10}},
  "하트오브팜":{cat:"veg",en:"Heart of Palm",emoji:"🌿",defaultG:100,comp:{protein:2.7,fat:0.5,carbs:7.8,water:88,fiber:3.5},amino:[],vit:{B6:0.1,folate:30,potassium:177},compounds:["폴리페놀","식이섬유"],flavor:{umami:10,sweet:5,salty:3,sour:10,bitter:10}},
  "모링가잎":{cat:"veg",en:"Moringa Leaves",emoji:"🌿",defaultG:30,comp:{protein:9.4,fat:1.4,carbs:8.3,water:76,fiber:2},amino:["라이신","메티오닌","시스테인"],vit:{C:220,A:378,calcium:185,iron:4},compounds:["이소티오시아네이트","쿼르세틴","클로로겐산"],flavor:{umami:20,sweet:5,salty:3,sour:5,bitter:25}},
  "쇠비름":{cat:"veg",en:"Purslane",emoji:"🌿",defaultG:100,comp:{protein:1.3,fat:0.4,carbs:3.4,water:93,fiber:0.4},amino:[],vit:{A:26,C:21,E:12.2},compounds:["오메가-3","베탈라인","글루타치온"],flavor:{umami:8,sweet:5,salty:2,sour:15,bitter:10}},
  "봄동":{cat:"veg",en:"Spring Cabbage",emoji:"🥬",defaultG:100,comp:{protein:1.6,fat:0.3,carbs:3.5,water:93,fiber:1.8},amino:[],vit:{C:35,K:80,folate:55,A:180},compounds:["설포라판","클로로필","베타카로틴"],flavor:{umami:18,sweet:15,salty:0,sour:5,bitter:10}},
  "고수(코리앤더)":{cat:"veg",en:"Cilantro",emoji:"🌿",defaultG:10,comp:{protein:2.1,fat:0.5,carbs:3.7,water:93,fiber:2.8},amino:[],vit:{K:310,A:337,C:27,folate:62},compounds:["리날룰","데칸알","리날룰 아세테이트","쿼르세틴"],flavor:{umami:8,sweet:3,salty:0,sour:5,bitter:10}},
  "라임잎":{cat:"veg",en:"Lime Leaf",emoji:"🌿",defaultG:5,comp:{protein:1.5,fat:0.5,carbs:5,water:92,fiber:3},amino:[],vit:{C:18,K:30},compounds:["시트로넬랄","리날룰","시네올"],flavor:{umami:5,sweet:3,salty:0,sour:8,bitter:15}},
  "파드득나물":{cat:"veg",en:"Water Dropwort",emoji:"🌿",defaultG:50,comp:{protein:2.5,fat:0.3,carbs:4.5,water:91,fiber:2.8},amino:[],vit:{C:45,K:200,A:250},compounds:["클로로필","루테올린","아피올"],flavor:{umami:15,sweet:5,salty:0,sour:5,bitter:15}},
  "토마토(로마)":{cat:"veg",en:"Roma Tomato",emoji:"🍅",defaultG:150,comp:{protein:1.1,fat:0.3,carbs:4.2,water:93,fiber:1.1},amino:["글루탐산"],vit:{C:16,A:50,K:8.3,lycopene:3100},compounds:["리코펜","글루탐산","클로로겐산"],flavor:{umami:65,sweet:20,salty:0,sour:35,bitter:5}},
  "미니파프리카":{cat:"veg",en:"Mini Bell Pepper",emoji:"🫑",defaultG:80,comp:{protein:1,fat:0.2,carbs:6,water:92,fiber:1.8},amino:[],vit:{C:150,A:220,B6:0.22},compounds:["캡산토인","루테인","안토시아닌"],flavor:{umami:12,sweet:50,salty:0,sour:8,bitter:3}},
  "자색고구마":{cat:"veg",en:"Purple Sweet Potato",emoji:"🍠",defaultG:100,comp:{protein:1.6,fat:0.1,carbs:21,water:77,fiber:3},amino:[],vit:{A:80,C:7,B6:0.25,potassium:320},compounds:["안토시아닌","베타카로틴","클로로겐산"],flavor:{umami:5,sweet:45,salty:0,sour:3,bitter:3}},

  // ── Fruit (추가) ─────────────────────────────────────────────────────────
  "체리":{cat:"fruit",en:"Cherry",emoji:"🍒",defaultG:100,comp:{protein:1,fat:0.3,carbs:16,water:82,fiber:2.1},amino:[],vit:{C:7,A:30,K:2.1},compounds:["안토시아닌","멜라토닌","퀘르세틴"],flavor:{umami:5,sweet:45,salty:0,sour:20,bitter:5}},
  "자두":{cat:"fruit",en:"Plum",emoji:"🍑",defaultG:100,comp:{protein:0.7,fat:0.3,carbs:11,water:87,fiber:1.4},amino:[],vit:{C:9.5,A:17,K:6.4},compounds:["클로로겐산","안토시아닌"],flavor:{umami:5,sweet:40,salty:0,sour:15,bitter:5}},
  "살구":{cat:"fruit",en:"Apricot",emoji:"🍊",defaultG:100,comp:{protein:1.4,fat:0.4,carbs:11,water:86,fiber:2},amino:[],vit:{A:96,C:10,K:3.3},compounds:["베타카로틴","클로로겐산"],flavor:{umami:5,sweet:45,salty:0,sour:15,bitter:5}},
  "석류":{cat:"fruit",en:"Pomegranate",emoji:"🍎",defaultG:100,comp:{protein:1.7,fat:1.2,carbs:19,water:77,fiber:4},amino:[],vit:{C:10.2,K:16.4,folate:38},compounds:["엘라그산","안토시아닌","퓨니칼라긴"],flavor:{umami:5,sweet:40,salty:0,sour:20,bitter:10}},
  "무화과":{cat:"fruit",en:"Fig",emoji:"🫐",defaultG:100,comp:{protein:0.8,fat:0.3,carbs:19,water:79,fiber:2.9},amino:[],vit:{B6:0.11,K:4.7,calcium:35},compounds:["안토시아닌","루틴"],flavor:{umami:5,sweet:55,salty:0,sour:5,bitter:5}},
  "대추":{cat:"fruit",en:"Jujube",emoji:"🫐",defaultG:30,comp:{protein:1.2,fat:0.2,carbs:20.2,water:77,fiber:0.9},amino:[],vit:{C:69,potassium:250},compounds:["베툴린산","올레아놀산"],flavor:{umami:5,sweet:50,salty:0,sour:5,bitter:5}},
  "유자":{cat:"fruit",en:"Yuzu",emoji:"🍋",defaultG:30,comp:{protein:0.9,fat:0.2,carbs:10.6,water:88,fiber:2.8},amino:[],vit:{C:50,potassium:209},compounds:["리모넨","플라보노이드","나린진"],flavor:{umami:0,sweet:15,salty:0,sour:70,bitter:20}},
  "청포도":{cat:"fruit",en:"Green Grape",emoji:"🍇",defaultG:100,comp:{protein:0.7,fat:0.4,carbs:18,water:80,fiber:0.9},amino:[],vit:{C:3.2,K:14.6},compounds:["카테킨","레스베라트롤"],flavor:{umami:5,sweet:52,salty:0,sour:10,bitter:3}},
  "멜론":{cat:"fruit",en:"Melon",emoji:"🍈",defaultG:150,comp:{protein:0.8,fat:0.2,carbs:9,water:90,fiber:0.9},amino:[],vit:{A:169,C:18,B6:0.07},compounds:["베타카로틴","이노시톨"],flavor:{umami:5,sweet:52,salty:0,sour:5,bitter:3}},
  "파파야":{cat:"fruit",en:"Papaya",emoji:"🍈",defaultG:100,comp:{protein:0.5,fat:0.3,carbs:11,water:88,fiber:1.8},amino:[],vit:{C:61,A:47,folate:38},compounds:["파파인","베타카로틴","카르파인"],flavor:{umami:5,sweet:45,salty:0,sour:5,bitter:3}},
  "리치":{cat:"fruit",en:"Lychee",emoji:"🍓",defaultG:100,comp:{protein:0.8,fat:0.4,carbs:17,water:82,fiber:1.3},amino:[],vit:{C:71.5,B6:0.1,potassium:171},compounds:["폴리페놀","안토시아닌"],flavor:{umami:5,sweet:55,salty:0,sour:10,bitter:3}},
  "용과":{cat:"fruit",en:"Dragon Fruit",emoji:"🍎",defaultG:100,comp:{protein:1.2,fat:0.4,carbs:11,water:87,fiber:3},amino:[],vit:{C:9,iron:1.9,magnesium:18},compounds:["안토시아닌","베타시아닌"],flavor:{umami:5,sweet:40,salty:0,sour:5,bitter:3}},
  "구아바":{cat:"fruit",en:"Guava",emoji:"🍐",defaultG:100,comp:{protein:2.6,fat:1,carbs:14,water:81,fiber:5.4},amino:[],vit:{C:228,A:31,folate:49},compounds:["리코펜","케르세틴"],flavor:{umami:5,sweet:40,salty:0,sour:15,bitter:5}},
  "금귤":{cat:"fruit",en:"Kumquat",emoji:"🍊",defaultG:30,comp:{protein:1.9,fat:0.9,carbs:16,water:79,fiber:6.5},amino:[],vit:{C:43.9,A:15,calcium:62},compounds:["플라보노이드","리모넨"],flavor:{umami:5,sweet:35,salty:0,sour:30,bitter:20}},
  "블랙베리":{cat:"fruit",en:"Blackberry",emoji:"🫐",defaultG:100,comp:{protein:1.4,fat:0.5,carbs:10,water:88,fiber:5.3},amino:[],vit:{C:21,K:19.8,folate:25},compounds:["안토시아닌","엘라그산"],flavor:{umami:5,sweet:30,salty:0,sour:20,bitter:10}},
  "라즈베리":{cat:"fruit",en:"Raspberry",emoji:"🍓",defaultG:100,comp:{protein:1.2,fat:0.7,carbs:12,water:86,fiber:6.5},amino:[],vit:{C:26.2,K:7.8,folate:21},compounds:["안토시아닌","엘라그산","케토논"],flavor:{umami:5,sweet:35,salty:0,sour:20,bitter:8}},
  "크랜베리":{cat:"fruit",en:"Cranberry",emoji:"🍓",defaultG:100,comp:{protein:0.4,fat:0.1,carbs:12,water:87,fiber:4.6},amino:[],vit:{C:13.3,E:1.2,K:5.1},compounds:["프로안토시아니딘","퀘르세틴"],flavor:{umami:3,sweet:15,salty:0,sour:35,bitter:15}},
  "패션프루트":{cat:"fruit",en:"Passion Fruit",emoji:"🍈",defaultG:100,comp:{protein:2.2,fat:0.7,carbs:23,water:73,fiber:10.4},amino:[],vit:{C:30,A:64,iron:1.6},compounds:["카로티노이드","폴리페놀"],flavor:{umami:5,sweet:40,salty:0,sour:30,bitter:5}},
  "망고스틴":{cat:"fruit",en:"Mangosteen",emoji:"🍇",defaultG:100,comp:{protein:0.6,fat:0.6,carbs:18,water:80,fiber:1.8},amino:[],vit:{C:2.9,B1:0.054,folate:31},compounds:["잔톤","알파망고스틴","베타망고스틴","폴리페놀"],flavor:{umami:3,sweet:55,salty:0,sour:10,bitter:5}},
  "두리안":{cat:"fruit",en:"Durian",emoji:"🍈",defaultG:100,comp:{protein:1.5,fat:5.3,carbs:27,water:65,fiber:3.8},amino:["트립토판","류신"],vit:{C:19.7,B6:0.32,potassium:436},compounds:["다이알릴설파이드","에스터","케톤"],flavor:{umami:5,sweet:50,salty:0,sour:5,bitter:3}},
  "람부탄":{cat:"fruit",en:"Rambutan",emoji:"🍒",defaultG:100,comp:{protein:0.9,fat:0.2,carbs:21,water:78,fiber:0.9},amino:[],vit:{C:4.9,B3:1.35,iron:0.35},compounds:["갈산","엘라그산","플라보노이드"],flavor:{umami:3,sweet:55,salty:0,sour:12,bitter:3}},
  "잭프루트":{cat:"fruit",en:"Jackfruit",emoji:"🍈",defaultG:150,comp:{protein:1.7,fat:0.6,carbs:24,water:73,fiber:1.5},amino:["류신","이소류신"],vit:{C:13.7,B6:0.33,potassium:303},compounds:["이소플라보노이드","칼콘","카로티노이드"],flavor:{umami:5,sweet:45,salty:0,sour:5,bitter:3}},
  "스타프루트":{cat:"fruit",en:"Star Fruit",emoji:"⭐",defaultG:100,comp:{protein:1,fat:0.3,carbs:6.7,water:91,fiber:2.8},amino:[],vit:{C:34.4,B5:0.39,folate:12},compounds:["옥살산","퀘르세틴","이소비텍신"],flavor:{umami:3,sweet:25,salty:0,sour:35,bitter:5}},
  "용과(흰속)":{cat:"fruit",en:"White Dragon Fruit",emoji:"🌵",defaultG:150,comp:{protein:1.2,fat:0,carbs:13,water:84,fiber:3},amino:[],vit:{C:9,B3:0.43,iron:0.65},compounds:["베타라닌","폴리페놀","피토알부민"],flavor:{umami:3,sweet:35,salty:0,sour:5,bitter:3}},
  "타마린드":{cat:"fruit",en:"Tamarind",emoji:"🟤",defaultG:30,comp:{protein:2.8,fat:0.6,carbs:75,water:20,fiber:5.1},amino:["류신","발린"],vit:{B1:0.43,B3:1.94,iron:2.8},compounds:["타르타르산","시트르산","폴리페놀"],flavor:{umami:10,sweet:20,salty:5,sour:55,bitter:8}},
  "아세롤라":{cat:"fruit",en:"Acerola",emoji:"🍒",defaultG:100,comp:{protein:0.4,fat:0.3,carbs:7.7,water:91,fiber:1.1},amino:[],vit:{C:1678,A:38,B1:0.02},compounds:["비타민C","안토시아닌","카로티노이드"],flavor:{umami:3,sweet:20,salty:0,sour:40,bitter:8}},
  "구스베리":{cat:"fruit",en:"Gooseberry",emoji:"🍓",defaultG:100,comp:{protein:0.9,fat:0.6,carbs:10,water:88,fiber:4.3},amino:[],vit:{C:27.7,B5:0.29,K:19.3},compounds:["안토시아닌","이소퀘르세틴","페놀산"],flavor:{umami:3,sweet:25,salty:0,sour:35,bitter:8}},
  "블랙커런트":{cat:"fruit",en:"Black Currant",emoji:"🫐",defaultG:100,comp:{protein:1.4,fat:0.4,carbs:15,water:82,fiber:4.3},amino:[],vit:{C:181,K:19.3,E:1.0},compounds:["안토시아닌","GLA","폴리페놀"],flavor:{umami:3,sweet:30,salty:0,sour:35,bitter:10}},
  "엘더베리":{cat:"fruit",en:"Elderberry",emoji:"🫐",defaultG:80,comp:{protein:0.7,fat:0.5,carbs:18,water:80,fiber:7},amino:[],vit:{C:36,B6:0.23,iron:1.6},compounds:["안토시아닌","루틴","클로로겐산"],flavor:{umami:3,sweet:20,salty:0,sour:25,bitter:15}},
  "오디(뽕나무)":{cat:"fruit",en:"Mulberry",emoji:"🫐",defaultG:100,comp:{protein:1.4,fat:0.4,carbs:10,water:88,fiber:1.7},amino:[],vit:{C:36.4,K:7.8,iron:1.85},compounds:["안토시아닌","레스베라트롤","루틴"],flavor:{umami:3,sweet:45,salty:0,sour:15,bitter:5}},
  "천도복숭아":{cat:"fruit",en:"Nectarine",emoji:"🍑",defaultG:150,comp:{protein:0.9,fat:0.3,carbs:11,water:88,fiber:1.7},amino:[],vit:{C:5.4,A:17,B3:1.07},compounds:["클로로겐산","카로티노이드","안토시아닌"],flavor:{umami:3,sweet:45,salty:0,sour:15,bitter:5}},
  "대추야자(데이츠)":{cat:"fruit",en:"Dates",emoji:"🟤",defaultG:30,comp:{protein:2.5,fat:0.4,carbs:75,water:21,fiber:6.7},amino:["글루탐산","아스파르트산"],vit:{K:2.7,B6:0.25,potassium:696},compounds:["탄닌","카로티노이드","안트라센"],flavor:{umami:5,sweet:65,salty:0,sour:3,bitter:5}},
  "피그(무화과·건조)":{cat:"fruit",en:"Dried Fig",emoji:"🌰",defaultG:30,comp:{protein:3.3,fat:1.2,carbs:64,water:30,fiber:9.8},amino:[],vit:{K:15.6,B6:0.11,calcium:162,iron:2},compounds:["안토시아닌","폴리페놀","피신"],flavor:{umami:5,sweet:60,salty:0,sour:5,bitter:5}},
  "매실":{cat:"fruit",en:"Green Plum",emoji:"🍈",defaultG:100,comp:{protein:0.7,fat:0.5,carbs:8.7,water:89,fiber:1.9},amino:[],vit:{C:6,K:14,B2:0.07},compounds:["시트르산","사과산","카테킨","피쿨린산"],flavor:{umami:5,sweet:5,salty:0,sour:60,bitter:15}},
  "유자":{cat:"fruit",en:"Yuzu",emoji:"🍋",defaultG:100,comp:{protein:0.5,fat:0.3,carbs:9.1,water:89,fiber:1.8},amino:[],vit:{C:150,folate:27,B1:0.05},compounds:["리모넨","베르가프텐","플라보노이드"],flavor:{umami:3,sweet:10,salty:0,sour:50,bitter:20}},
  "모과":{cat:"fruit",en:"Quince",emoji:"🍈",defaultG:100,comp:{protein:0.4,fat:0.1,carbs:9.6,water:88,fiber:1.7},amino:[],vit:{C:15,K:2.4,B6:0.04},compounds:["탄닌","퀘르세틴","사과산"],flavor:{umami:3,sweet:10,salty:0,sour:30,bitter:25}},
  "칼라만시":{cat:"fruit",en:"Calamansi",emoji:"🍋",defaultG:50,comp:{protein:0.8,fat:0.2,carbs:9,water:89,fiber:3},amino:[],vit:{C:45,B1:0.04},compounds:["리모넨","플라바논","폴리페놀"],flavor:{umami:3,sweet:8,salty:0,sour:55,bitter:20}},
  "아사이베리":{cat:"fruit",en:"Acai Berry",emoji:"🫐",defaultG:100,comp:{protein:1.3,fat:5.1,carbs:20,water:72,fiber:2},amino:[],vit:{A:15,C:0.5,calcium:40},compounds:["안토시아닌","올레산","베타시토스테롤"],flavor:{umami:5,sweet:10,salty:0,sour:8,bitter:25}},
  "고지베리(구기자)":{cat:"fruit",en:"Goji Berry",emoji:"🔴",defaultG:30,comp:{protein:14,fat:0.4,carbs:77,water:7,fiber:13},amino:["베타인"],vit:{A:162,C:48,B1:0.15,B2:1.27,iron:6.8},compounds:["제아잔틴","베타인","폴리사카라이드"],flavor:{umami:8,sweet:35,salty:3,sour:10,bitter:15}},
  "사워솝(그라비올라)":{cat:"fruit",en:"Soursop",emoji:"🍈",defaultG:150,comp:{protein:1,fat:0.3,carbs:16.8,water:82,fiber:3.3},amino:[],vit:{C:20.6,B1:0.07,B6:0.06},compounds:["아세토제닌","안노신","이소쿼르세틴"],flavor:{umami:3,sweet:40,salty:0,sour:20,bitter:5}},
  "체리모야":{cat:"fruit",en:"Cherimoya",emoji:"🍈",defaultG:150,comp:{protein:1.5,fat:0.7,carbs:25,water:72,fiber:3},amino:[],vit:{C:12.6,B6:0.26,B3:0.8},compounds:["아노나민","안트라퀴논","폴리페놀"],flavor:{umami:3,sweet:50,salty:0,sour:10,bitter:5}},
  "핑거라임":{cat:"fruit",en:"Finger Lime",emoji:"🟢",defaultG:30,comp:{protein:0.8,fat:0.3,carbs:5,water:93,fiber:2.5},amino:[],vit:{C:30,folate:10},compounds:["리모넨","루틴","폴리페놀"],flavor:{umami:3,sweet:8,salty:0,sour:55,bitter:10}},
  "허니듀멜론":{cat:"fruit",en:"Honeydew Melon",emoji:"🍈",defaultG:150,comp:{protein:0.5,fat:0.1,carbs:9,water:90,fiber:0.8},amino:[],vit:{C:18,B6:0.1,K:2.9,potassium:228},compounds:["베타카로틴","루테인"],flavor:{umami:3,sweet:50,salty:0,sour:5,bitter:3}},
  "칸탈루프멜론":{cat:"fruit",en:"Cantaloupe",emoji:"🍈",defaultG:150,comp:{protein:0.8,fat:0.2,carbs:8.2,water:90,fiber:0.9},amino:[],vit:{A:169,C:36.7,B6:0.07,potassium:267},compounds:["베타카로틴","루테인","제아잔틴"],flavor:{umami:3,sweet:50,salty:0,sour:5,bitter:3}},
  "코코넛(과육·신선)":{cat:"fruit",en:"Fresh Coconut",emoji:"🥥",defaultG:100,comp:{protein:3.3,fat:33,carbs:15,water:47,fiber:9},amino:["글루탐산","아르기닌"],vit:{B5:0.3,manganese:1.5},compounds:["라우르산","미리스트산","MCT"],flavor:{umami:5,sweet:15,salty:0,sour:3,bitter:3}},
  "바오밥열매":{cat:"fruit",en:"Baobab Fruit",emoji:"🌰",defaultG:20,comp:{protein:2.3,fat:0.3,carbs:83,water:11,fiber:44},amino:[],vit:{C:280,calcium:273,iron:9.3},compounds:["타르타르산","폴리페놀","글루코스"],flavor:{umami:3,sweet:15,salty:0,sour:40,bitter:10}},

  // ── Grain (추가) ─────────────────────────────────────────────────────────
  "찹쌀":{cat:"grain",en:"Glutinous Rice",emoji:"🍚",defaultG:150,comp:{protein:2.4,fat:0.4,carbs:30,water:67,fiber:0.3},amino:["글루탐산"],vit:{B1:0.03,B3:0.4},compounds:["아밀로펙틴","감마오리자놀"],flavor:{umami:10,sweet:20,salty:0,sour:0,bitter:0}},
  "보리":{cat:"grain",en:"Barley",emoji:"🌾",defaultG:50,comp:{protein:12,fat:2.3,carbs:73,water:9,fiber:15.6},amino:["글루탐산"],vit:{B1:0.65,B3:4.6,selenium:37.7},compounds:["베타글루칸","페놀산"],flavor:{umami:10,sweet:15,salty:0,sour:0,bitter:5}},
  "흑미":{cat:"grain",en:"Black Rice",emoji:"🍚",defaultG:150,comp:{protein:8.5,fat:2.2,carbs:75,water:10,fiber:3.5},amino:["글루탐산"],vit:{B1:0.33,iron:1.9},compounds:["안토시아닌","감마오리자놀"],flavor:{umami:10,sweet:20,salty:0,sour:0,bitter:5}},
  "스펠트밀":{cat:"grain",en:"Spelt",emoji:"🌾",defaultG:100,comp:{protein:15,fat:2.4,carbs:65,water:11,fiber:10.7},amino:["글루탐산","프롤린"],vit:{B1:0.36,B3:5.74,manganese:2.9},compounds:["페놀산","글루텐","베타글루칸"],flavor:{umami:15,sweet:10,salty:0,sour:5,bitter:5}},
  "파로밀":{cat:"grain",en:"Farro",emoji:"🌾",defaultG:100,comp:{protein:14,fat:1.5,carbs:63,water:12,fiber:7},amino:["글루탐산"],vit:{B1:0.5,B3:4.5,zinc:3.1},compounds:["페놀산","글루텐","안토시아닌"],flavor:{umami:12,sweet:10,salty:0,sour:5,bitter:5}},
  "테프":{cat:"grain",en:"Teff",emoji:"🌾",defaultG:100,comp:{protein:13.3,fat:2.4,carbs:73,water:9,fiber:8},amino:["라이신"],vit:{B1:0.39,B6:0.49,calcium:180,iron:7.6},compounds:["이눌린","페놀산","플라보노이드"],flavor:{umami:10,sweet:10,salty:3,sour:5,bitter:5}},
  "소르검":{cat:"grain",en:"Sorghum",emoji:"🌾",defaultG:100,comp:{protein:11,fat:3.5,carbs:75,water:9,fiber:6.3},amino:["류신","알라닌"],vit:{B3:2.9,B6:0.44,phosphorus:289},compounds:["탄닌","안토시아닌","폴리코사놀"],flavor:{umami:10,sweet:8,salty:0,sour:5,bitter:8}},
  "포니오":{cat:"grain",en:"Fonio",emoji:"🌾",defaultG:100,comp:{protein:9,fat:3.8,carbs:72,water:12,fiber:8.5},amino:["메티오닌","시스테인"],vit:{B1:0.27,iron:8.5,zinc:3.1},compounds:["페놀산","이눌린"],flavor:{umami:8,sweet:10,salty:0,sour:5,bitter:5}},
  "기장(밀렛)":{cat:"grain",en:"Millet",emoji:"🌾",defaultG:100,comp:{protein:11,fat:4.2,carbs:73,water:8.7,fiber:8.5},amino:["류신","이소류신"],vit:{B1:0.41,B3:4.72,manganese:1.6},compounds:["피트산","폴리페놀","마그네슘"],flavor:{umami:8,sweet:8,salty:0,sour:5,bitter:5}},
  "폴렌타(옥수수죽)":{cat:"grain",en:"Polenta",emoji:"🌽",defaultG:150,comp:{protein:2,fat:0.5,carbs:18,water:79,fiber:0.5},amino:["글루탐산"],vit:{B3:1.2,B1:0.09},compounds:["루테인","제아잔틴"],flavor:{umami:10,sweet:15,salty:0,sour:0,bitter:3}},
  "쌀가루":{cat:"grain",en:"Rice Flour",emoji:"🌾",defaultG:100,comp:{protein:6,fat:0.5,carbs:80,water:12,fiber:2.4},amino:["글루탐산"],vit:{B1:0.14,B3:2.59,manganese:1.3},compounds:["전분","감마오리자놀"],flavor:{umami:5,sweet:10,salty:0,sour:0,bitter:0}},
  "메밀가루":{cat:"grain",en:"Buckwheat Flour",emoji:"🌾",defaultG:100,comp:{protein:13,fat:3.4,carbs:72,water:9,fiber:10},amino:["라이신","아르기닌"],vit:{B1:0.1,B2:0.43,manganese:1.3},compounds:["루틴","퀘르세틴","D-카이로이노시톨"],flavor:{umami:10,sweet:5,salty:0,sour:5,bitter:10}},
  "옥수수전분":{cat:"grain",en:"Cornstarch",emoji:"🌽",defaultG:50,comp:{protein:0.3,fat:0.1,carbs:91,water:8,fiber:0.9},amino:[],vit:{B3:0.01},compounds:["아밀로스","아밀로펙틴"],flavor:{umami:0,sweet:5,salty:0,sour:0,bitter:0}},
  "감자전분":{cat:"grain",en:"Potato Starch",emoji:"🥔",defaultG:50,comp:{protein:0.1,fat:0,carbs:83,water:17,fiber:0.6},amino:[],vit:{},compounds:["아밀로펙틴","아밀로스"],flavor:{umami:0,sweet:3,salty:0,sour:0,bitter:0}},
  "타피오카":{cat:"grain",en:"Tapioca",emoji:"🌰",defaultG:50,comp:{protein:0,fat:0,carbs:88,water:11,fiber:0.9},amino:[],vit:{},compounds:["아밀로펙틴","망간"],flavor:{umami:0,sweet:5,salty:0,sour:0,bitter:0}},
  "빵가루":{cat:"grain",en:"Bread Crumbs",emoji:"🍞",defaultG:30,comp:{protein:11,fat:2.2,carbs:73,water:8,fiber:3},amino:["글루탐산"],vit:{B1:0.42,B3:5.0,sodium:543},compounds:["전분","글루텐"],flavor:{umami:15,sweet:10,salty:5,sour:3,bitter:3}},
  "통밀가루":{cat:"grain",en:"Whole Wheat Flour",emoji:"🌾",defaultG:100,comp:{protein:13,fat:2.5,carbs:72,water:10,fiber:10.7},amino:["글루탐산","프롤린"],vit:{B1:0.4,B3:6.4,manganese:3.8},compounds:["글루텐","페룰산","리그난"],flavor:{umami:15,sweet:5,salty:0,sour:5,bitter:8}},
  "라이스페이퍼":{cat:"grain",en:"Rice Paper",emoji:"🌾",defaultG:20,comp:{protein:0.4,fat:0.1,carbs:85,water:13,fiber:0.3},amino:[],vit:{},compounds:["아밀로스","아밀로펙틴"],flavor:{umami:0,sweet:3,salty:0,sour:0,bitter:0}},
  "차파티/난":{cat:"grain",en:"Chapati / Naan",emoji:"🫓",defaultG:80,comp:{protein:8,fat:3.5,carbs:50,water:37,fiber:2},amino:["글루탐산"],vit:{B1:0.22,B3:2.5},compounds:["글루텐","페놀산"],flavor:{umami:10,sweet:5,salty:3,sour:5,bitter:3}},
  "또르티야":{cat:"grain",en:"Tortilla",emoji:"🫓",defaultG:60,comp:{protein:6,fat:5,carbs:47,water:37,fiber:3},amino:["글루탐산"],vit:{B3:2.0,B1:0.17,calcium:79},compounds:["니아신","라임처리옥수수(닉스타말)"],flavor:{umami:10,sweet:5,salty:5,sour:3,bitter:3}},
  "코코넛가루":{cat:"grain",en:"Coconut Flour",emoji:"🥥",defaultG:30,comp:{protein:6.9,fat:14.4,carbs:60,water:3,fiber:39},amino:["글루탐산"],vit:{B5:0.3,manganese:1.8},compounds:["라우르산","식이섬유","MCT"],flavor:{umami:5,sweet:15,salty:0,sour:0,bitter:3}},
  "퀴노아":{cat:"grain",en:"Quinoa",emoji:"🌾",defaultG:50,comp:{protein:14,fat:6,carbs:64,water:13,fiber:7},amino:["글루탐산","리신","메티오닌"],vit:{iron:4.6,magnesium:197,folate:184},compounds:["사포닌","플라보노이드","베타인"],flavor:{umami:15,sweet:10,salty:0,sour:5,bitter:5}},
  "아마란스":{cat:"grain",en:"Amaranth",emoji:"🌾",defaultG:50,comp:{protein:14,fat:7,carbs:65,water:12,fiber:6.7},amino:["리신","메티오닌"],vit:{magnesium:248,iron:7.6,calcium:159},compounds:["스쿠알렌","이소플라본"],flavor:{umami:15,sweet:5,salty:0,sour:5,bitter:5}},
  "수수":{cat:"grain",en:"Sorghum",emoji:"🌾",defaultG:50,comp:{protein:11,fat:3.5,carbs:73,water:9,fiber:6.7},amino:["글루탐산"],vit:{B1:0.24,B3:3.7,iron:4.4},compounds:["탄닌","안토시아닌"],flavor:{umami:10,sweet:10,salty:0,sour:0,bitter:10}},
  "기장":{cat:"grain",en:"Millet",emoji:"🌾",defaultG:50,comp:{protein:11,fat:4.2,carbs:73,water:9,fiber:8.5},amino:["글루탐산"],vit:{B1:0.15,magnesium:114},compounds:["페놀산"],flavor:{umami:10,sweet:10,salty:0,sour:0,bitter:5}},
  "통밀빵":{cat:"grain",en:"Whole Wheat Bread",emoji:"🍞",defaultG:30,comp:{protein:9,fat:3,carbs:44,water:38,fiber:6.8},amino:["글루텐"],vit:{B1:0.27,B2:0.14,niacin:3.7,iron:2.3},compounds:["글루텐","통밀폴리페놀"],flavor:{umami:15,sweet:15,salty:10,sour:10,bitter:5}},
  "크로아상":{cat:"grain",en:"Croissant",emoji:"🥐",defaultG:60,comp:{protein:8,fat:17,carbs:47,water:24,fiber:1.8},amino:["글루텐"],vit:{B1:0.12,B2:0.09,folate:39},compounds:["글루텐","버터향"],flavor:{umami:10,sweet:20,salty:15,sour:5,bitter:0}},
  "오트밀":{cat:"grain",en:"Oatmeal",emoji:"🌾",defaultG:80,comp:{protein:11,fat:5,carbs:56,water:15,fiber:8.2},amino:["글루탐산"],vit:{B1:0.51,B5:1.1,iron:3.6},compounds:["베타글루칸","아베난트라미드"],flavor:{umami:15,sweet:20,salty:0,sour:0,bitter:5}},
  "호밀빵":{cat:"grain",en:"Rye Bread",emoji:"🍞",defaultG:30,comp:{protein:7.5,fat:1.5,carbs:48,water:37,fiber:5.8},amino:["글루탐산"],vit:{B1:0.22,B2:0.24,niacin:2.5},compounds:["리그닌","페놀산"],flavor:{umami:15,sweet:10,salty:10,sour:15,bitter:5}},
  "쌀국수":{cat:"grain",en:"Rice Noodles",emoji:"🍜",defaultG:80,comp:{protein:2.1,fat:0.4,carbs:26,water:71,fiber:0.5},amino:["글루탐산"],vit:{B1:0.03,B3:0.4},compounds:["전분","아밀로스"],flavor:{umami:10,sweet:5,salty:0,sour:0,bitter:0}},
  "당면":{cat:"grain",en:"Glass Noodles",emoji:"🍜",defaultG:80,comp:{protein:0.2,fat:0.1,carbs:38,water:61,fiber:1.5},amino:[],vit:{},compounds:["전분(감자)"],flavor:{umami:5,sweet:5,salty:0,sour:0,bitter:0}},
  "소면":{cat:"grain",en:"Thin Wheat Noodles",emoji:"🍜",defaultG:80,comp:{protein:3.2,fat:0.3,carbs:24,water:71,fiber:0.7},amino:["글루탐산"],vit:{B1:0.05,B2:0.01},compounds:["글루텐","전분"],flavor:{umami:10,sweet:5,salty:5,sour:0,bitter:0}},

  // ── Dairy (추가) ──────────────────────────────────────────────────────────
  "크림치즈":{cat:"dairy",en:"Cream Cheese",emoji:"🧀",defaultG:30,comp:{protein:6,fat:34,carbs:4,water:54,fiber:0},amino:["류신"],vit:{A:1111,calcium:98},compounds:["카제인","지방산"],flavor:{umami:30,sweet:10,salty:35,sour:15,bitter:0}},
  "체다치즈":{cat:"dairy",en:"Cheddar",emoji:"🧀",defaultG:30,comp:{protein:25,fat:33,carbs:1.3,water:37,fiber:0},amino:["류신","리신"],vit:{A:994,B12:1,calcium:721},compounds:["카제인","라이신","타이라민"],flavor:{umami:70,sweet:5,salty:55,sour:10,bitter:5}},
  "그뤼에르":{cat:"dairy",en:"Gruyere",emoji:"🧀",defaultG:30,comp:{protein:27,fat:32,carbs:0.4,water:36,fiber:0},amino:["류신","리신"],vit:{calcium:1011,B12:1.8},compounds:["카제인","부티르산"],flavor:{umami:75,sweet:5,salty:50,sour:8,bitter:5}},
  "리코타":{cat:"dairy",en:"Ricotta",emoji:"🧀",defaultG:50,comp:{protein:11,fat:13,carbs:3,water:72,fiber:0},amino:["류신"],vit:{A:175,B12:0.3,calcium:207},compounds:["유청단백","락토스"],flavor:{umami:20,sweet:10,salty:20,sour:15,bitter:0}},
  "사워크림":{cat:"dairy",en:"Sour Cream",emoji:"🥛",defaultG:30,comp:{protein:2.1,fat:20,carbs:3.3,water:71,fiber:0},amino:[],vit:{A:200,calcium:60},compounds:["유산균","지방산"],flavor:{umami:10,sweet:5,salty:10,sour:40,bitter:0}},
  "코티지치즈":{cat:"dairy",en:"Cottage Cheese",emoji:"🧀",defaultG:50,comp:{protein:11,fat:4.5,carbs:3.4,water:79,fiber:0},amino:["류신","리신"],vit:{B12:0.4,calcium:83,selenium:9.7},compounds:["카제인","유청"],flavor:{umami:20,sweet:10,salty:35,sour:15,bitter:0}},
  "고다치즈":{cat:"dairy",en:"Gouda",emoji:"🧀",defaultG:30,comp:{protein:25,fat:27,carbs:2.2,water:41,fiber:0},amino:["류신"],vit:{B12:1.5,calcium:700},compounds:["카제인","티라민"],flavor:{umami:65,sweet:8,salty:50,sour:8,bitter:3}},
  "버터밀크":{cat:"dairy",en:"Buttermilk",emoji:"🥛",defaultG:200,comp:{protein:3.3,fat:0.9,carbs:4.8,water:90,fiber:0},amino:["류신","리신"],vit:{B12:0.3,calcium:116},compounds:["유산균","디아세틸"],flavor:{umami:10,sweet:10,salty:5,sour:35,bitter:0}},
  "산양유":{cat:"dairy",en:"Goat Milk",emoji:"🥛",defaultG:200,comp:{protein:3.6,fat:4.1,carbs:4.5,water:87,fiber:0},amino:["카세인","유청단백질"],vit:{calcium:134,A:185,B2:0.21,D:0.03},compounds:["MCT","카프르산","공액리놀레산"],flavor:{umami:15,sweet:15,salty:3,sour:5,bitter:5}},
  "케피어":{cat:"dairy",en:"Kefir",emoji:"🥛",defaultG:200,comp:{protein:3.4,fat:3.5,carbs:4.5,water:88,fiber:0},amino:["카세인","유청단백질"],vit:{B12:0.5,calcium:120,K2:0.5},compounds:["프로바이오틱균","유산","케피란"],flavor:{umami:10,sweet:10,salty:3,sour:25,bitter:5}},
  "마스카르포네":{cat:"dairy",en:"Mascarpone",emoji:"🧀",defaultG:50,comp:{protein:5,fat:44,carbs:3,water:47,fiber:0},amino:["카세인"],vit:{A:415,calcium:160,B2:0.21},compounds:["올레산","팔미트산","부티르산"],flavor:{umami:15,sweet:15,salty:3,sour:8,bitter:3}},
  "브리":{cat:"dairy",en:"Brie",emoji:"🧀",defaultG:40,comp:{protein:20,fat:28,carbs:0,water:49,fiber:0},amino:["류신","리신"],vit:{A:173,B12:1.65,calcium:184},compounds:["암모니아","카프르산","지방산"],flavor:{umami:40,sweet:5,salty:12,sour:8,bitter:8}},
  "카망베르":{cat:"dairy",en:"Camembert",emoji:"🧀",defaultG:40,comp:{protein:19.8,fat:24,carbs:0,water:52,fiber:0},amino:["류신","리신"],vit:{A:241,B12:2.7,calcium:388},compounds:["페니실리움균","올레산","부티르산"],flavor:{umami:45,sweet:5,salty:12,sour:10,bitter:10}},
  "고르곤졸라":{cat:"dairy",en:"Gorgonzola",emoji:"🧀",defaultG:40,comp:{protein:21,fat:29,carbs:2.2,water:43,fiber:0},amino:["류신","리신"],vit:{A:190,B12:1.22,calcium:528},compounds:["페니실리움글라우쿰","지방산","항균펩타이드"],flavor:{umami:50,sweet:5,salty:18,sour:8,bitter:15}},
  "페타":{cat:"dairy",en:"Feta",emoji:"🧀",defaultG:40,comp:{protein:14,fat:21,carbs:4,water:55,fiber:0},amino:["류신","리신"],vit:{B12:1.69,calcium:493,phosphorus:337},compounds:["공액리놀레산","히스타민","안식향산"],flavor:{umami:35,sweet:5,salty:20,sour:15,bitter:5}},
  "할로미":{cat:"dairy",en:"Halloumi",emoji:"🧀",defaultG:50,comp:{protein:22,fat:26,carbs:2,water:46,fiber:0},amino:["류신"],vit:{calcium:709,B12:0.9},compounds:["인산칼슘","유청단백질"],flavor:{umami:30,sweet:5,salty:22,sour:5,bitter:3}},
  "부라타":{cat:"dairy",en:"Burrata",emoji:"🧀",defaultG:60,comp:{protein:16,fat:20,carbs:2,water:60,fiber:0},amino:["카세인","유청단백질"],vit:{A:175,calcium:505},compounds:["스트렙토코쿠스균","올레산","팔미트산"],flavor:{umami:20,sweet:10,salty:5,sour:5,bitter:2}},
  "만체고":{cat:"dairy",en:"Manchego",emoji:"🧀",defaultG:40,comp:{protein:26,fat:35,carbs:0.5,water:35,fiber:0},amino:["류신","리신"],vit:{A:265,B12:2.1,calcium:810},compounds:["리넨산","부티르산","향기성분"],flavor:{umami:45,sweet:5,salty:15,sour:8,bitter:8}},
  "에멘탈":{cat:"dairy",en:"Emmental",emoji:"🧀",defaultG:40,comp:{protein:28,fat:29,carbs:0,water:38,fiber:0},amino:["류신","리신"],vit:{B12:1.7,calcium:969,A:262},compounds:["프로피온산","부티르산","에스터"],flavor:{umami:40,sweet:10,salty:10,sour:8,bitter:5}},
  "파르미지아노레지아노":{cat:"dairy",en:"Parmigiano-Reggiano",emoji:"🧀",defaultG:20,comp:{protein:35,fat:26,carbs:0,water:29,fiber:0},amino:["글루탐산","류신"],vit:{B12:3.6,calcium:1184},compounds:["유리글루탐산","티로신크리스탈","케토산"],flavor:{umami:85,sweet:5,salty:18,sour:8,bitter:5}},
  "크렘프레쉬":{cat:"dairy",en:"Creme Fraiche",emoji:"🍦",defaultG:50,comp:{protein:2.3,fat:30,carbs:4,water:63,fiber:0},amino:[],vit:{A:270,calcium:100},compounds:["부티르산","락트산","디아세틸"],flavor:{umami:10,sweet:10,salty:3,sour:20,bitter:3}},
  "기버터(기)":{cat:"dairy",en:"Ghee",emoji:"🫙",defaultG:15,comp:{protein:0.3,fat:99,carbs:0,water:0.5,fiber:0},amino:[],vit:{A:840,E:2.8,D:1.5},compounds:["CLA","부티르산","오메가-3","MCT"],flavor:{umami:20,sweet:5,salty:0,sour:0,bitter:3}},
  "피요르드버터":{cat:"dairy",en:"European Butter",emoji:"🧈",defaultG:15,comp:{protein:0.5,fat:84,carbs:0,water:16,fiber:0},amino:[],vit:{A:684,D:0.6},compounds:["팔미트산","올레산","부티르산"],flavor:{umami:15,sweet:10,salty:0,sour:0,bitter:2}},
  "버팔로모짜렐라":{cat:"dairy",en:"Buffalo Mozzarella",emoji:"🧀",defaultG:60,comp:{protein:16,fat:18,carbs:2,water:60,fiber:0},amino:["카세인","유청단백질"],vit:{A:185,calcium:520},compounds:["올레산","공액리놀레산","단쇄지방산"],flavor:{umami:22,sweet:12,salty:6,sour:8,bitter:2}},

  // ── Nut & Seeds (추가) ───────────────────────────────────────────────────
  "마카다미아":{cat:"nut",en:"Macadamia",emoji:"🥜",defaultG:30,comp:{protein:8,fat:76,carbs:14,water:1,fiber:8.6},amino:["글루탐산"],vit:{thiamin:1.2,manganese:4.1,B6:0.28},compounds:["팔미톨레산","폴리페놀"],flavor:{umami:20,sweet:15,salty:0,sour:0,bitter:3}},
  "피스타치오":{cat:"nut",en:"Pistachio",emoji:"🥜",defaultG:30,comp:{protein:20,fat:45,carbs:28,water:4,fiber:10.3},amino:["글루탐산","아르기닌"],vit:{B6:1.7,copper:1.3,thiamin:0.87},compounds:["안토시아닌","루테인","제아잔틴"],flavor:{umami:25,sweet:15,salty:0,sour:0,bitter:5}},
  "피칸":{cat:"nut",en:"Pecan",emoji:"🥜",defaultG:30,comp:{protein:9.2,fat:72,carbs:14,water:3.5,fiber:9.6},amino:["글루탐산"],vit:{E:1.4,B1:0.66,zinc:4.5},compounds:["엘라그산","탄닌"],flavor:{umami:20,sweet:15,salty:0,sour:0,bitter:5}},
  "헤이즐넛":{cat:"nut",en:"Hazelnut",emoji:"🥜",defaultG:30,comp:{protein:15,fat:61,carbs:17,water:5,fiber:9.7},amino:["글루탐산"],vit:{E:15.3,B6:0.56,manganese:6.2},compounds:["올레산","클로로겐산"],flavor:{umami:25,sweet:15,salty:0,sour:0,bitter:5}},
  "브라질너트":{cat:"nut",en:"Brazil Nut",emoji:"🥜",defaultG:30,comp:{protein:14,fat:67,carbs:12,water:3,fiber:7.5},amino:["글루탐산","메티오닌"],vit:{selenium:1917,magnesium:376,B1:0.62},compounds:["셀레늄","올레산"],flavor:{umami:20,sweet:10,salty:0,sour:0,bitter:3}},
  "코코넛(과육)":{cat:"nut",en:"Coconut",emoji:"🥥",defaultG:50,comp:{protein:3.3,fat:33,carbs:15,water:47,fiber:9},amino:[],vit:{manganese:1.5,copper:0.44},compounds:["라우르산","MCT"],flavor:{umami:5,sweet:20,salty:0,sour:0,bitter:5}},
  "치아씨드":{cat:"nut",en:"Chia Seed",emoji:"🌱",defaultG:15,comp:{protein:17,fat:31,carbs:42,water:6,fiber:34.4},amino:["글루탐산"],vit:{calcium:631,phosphorus:860,omega3:17.8},compounds:["알파리놀렌산","케르세틴"],flavor:{umami:10,sweet:5,salty:0,sour:0,bitter:5}},
  "아마씨":{cat:"nut",en:"Flaxseed",emoji:"🌱",defaultG:15,comp:{protein:18,fat:42,carbs:29,water:7,fiber:27.3},amino:["글루탐산"],vit:{B1:1.6,manganese:2.5,omega3:22.8},compounds:["리그난","알파리놀렌산"],flavor:{umami:10,sweet:5,salty:0,sour:5,bitter:10}},
  "호박씨":{cat:"nut",en:"Pumpkin Seed",emoji:"🌱",defaultG:15,comp:{protein:30,fat:49,carbs:11,water:4,fiber:6},amino:["글루탐산","아르기닌"],vit:{zinc:7.6,magnesium:592,iron:8.8},compounds:["쿠쿠르비타신","리그난"],flavor:{umami:25,sweet:5,salty:0,sour:0,bitter:5}},
  "흑임자(흑참깨)":{cat:"nut",en:"Black Sesame",emoji:"⚫",defaultG:15,comp:{protein:18,fat:48,carbs:23,water:5,fiber:11.8},amino:["트립토판","메티오닌"],vit:{calcium:975,iron:15,B1:0.91},compounds:["세사민","세사몰린","안토시아닌"],flavor:{umami:20,sweet:5,salty:3,sour:3,bitter:15}},
  "헴프씨드":{cat:"nut",en:"Hemp Seed",emoji:"🌿",defaultG:30,comp:{protein:31,fat:49,carbs:8.7,water:5,fiber:4},amino:["아르기닌","글루탐산","메티오닌"],vit:{B1:0.4,iron:7.95,magnesium:700},compounds:["GLA","오메가-3","오메가-6","칸나비디올"],flavor:{umami:15,sweet:5,salty:3,sour:3,bitter:8}},
  "포피씨드":{cat:"nut",en:"Poppy Seed",emoji:"⚫",defaultG:10,comp:{protein:18,fat:42,carbs:28,water:5,fiber:19.5},amino:["글루탐산","아스파르트산"],vit:{calcium:1438,B1:0.85,iron:9.76},compounds:["올레산","리놀레산","알칼로이드"],flavor:{umami:10,sweet:10,salty:0,sour:3,bitter:15}},
  "니젤라씨드(블랙씨드)":{cat:"nut",en:"Nigella Seed",emoji:"⚫",defaultG:5,comp:{protein:21,fat:36,carbs:38,water:5,fiber:12},amino:[],vit:{calcium:182,iron:66,B3:4.4},compounds:["티모퀴논","카르바크롤","알파-핀엔"],flavor:{umami:5,sweet:5,salty:3,sour:3,bitter:30}},
  "카카오닙스":{cat:"nut",en:"Cacao Nibs",emoji:"🟤",defaultG:20,comp:{protein:14,fat:51,carbs:34,water:3,fiber:33},amino:["트립토판","페닐알라닌"],vit:{iron:13.9,magnesium:272},compounds:["테오브로민","플라바놀","페닐에틸아민","카테킨"],flavor:{umami:10,sweet:5,salty:0,sour:15,bitter:45}},
  "코코넛플레이크":{cat:"nut",en:"Coconut Flakes",emoji:"🥥",defaultG:20,comp:{protein:2.7,fat:33,carbs:15,water:3,fiber:9},amino:["글루탐산"],vit:{B5:0.3,manganese:1.5},compounds:["라우르산","카프릴산","MCT"],flavor:{umami:5,sweet:15,salty:0,sour:3,bitter:5}},
  "타히니(참깨페이스트)":{cat:"nut",en:"Tahini",emoji:"🫙",defaultG:20,comp:{protein:17,fat:53,carbs:22,water:3,fiber:9.3},amino:["메티오닌","시스테인"],vit:{calcium:426,B1:0.97,iron:8.95},compounds:["세사민","세사몰린","리그난"],flavor:{umami:20,sweet:8,salty:3,sour:5,bitter:15}},
  "마카다미아오일":{cat:"nut",en:"Macadamia Oil",emoji:"🫙",defaultG:15,comp:{protein:0,fat:100,carbs:0,water:0,fiber:0},amino:[],vit:{E:0.4},compounds:["팔미톨레산","올레산"],flavor:{umami:5,sweet:8,salty:0,sour:0,bitter:3}},
  "피뇨(피냐타이트)":{cat:"nut",en:"Pignoli",emoji:"🌿",defaultG:15,comp:{protein:14,fat:68,carbs:13,water:2,fiber:3.7},amino:["아르기닌","글루탐산"],vit:{B1:0.36,E:9.3,manganese:8.8},compounds:["피뇨레산","β-피넨","지방산"],flavor:{umami:15,sweet:8,salty:0,sour:3,bitter:5}},
  "버터피넛(땅콩버터원료)":{cat:"nut",en:"Butternut",emoji:"🥜",defaultG:30,comp:{protein:25,fat:50,carbs:16,water:2,fiber:9},amino:["아르기닌","글루탐산"],vit:{B3:13.1,B6:0.35,E:8.33},compounds:["레스베라트롤","쿠마르산","캠페롤"],flavor:{umami:15,sweet:8,salty:0,sour:3,bitter:5}},
  "워터멜론씨드":{cat:"nut",en:"Watermelon Seed",emoji:"⚫",defaultG:15,comp:{protein:28,fat:47,carbs:15,water:5,fiber:0},amino:["라이신","아르기닌"],vit:{B3:3.55,magnesium:515,zinc:10},compounds:["시트룰린","리코펜","아르기닌"],flavor:{umami:10,sweet:5,salty:0,sour:3,bitter:5}},

  // ── Mushroom (추가) ───────────────────────────────────────────────────────
  "송이버섯":{cat:"mushroom",en:"Matsutake",emoji:"🍄",defaultG:100,comp:{protein:2.1,fat:0.5,carbs:6.8,water:89,fiber:1.4},amino:["글루탐산"],vit:{D:4.2,B5:2.1,copper:0.37},compounds:["에르고티오네인","테르펜","마쯔타케올"],flavor:{umami:80,sweet:5,salty:0,sour:5,bitter:5}},
  "포르치니":{cat:"mushroom",en:"Porcini",emoji:"🍄",defaultG:100,comp:{protein:3.7,fat:0.5,carbs:7.5,water:86,fiber:3.1},amino:["글루탐산"],vit:{D:3.2,B5:2.5,copper:0.42},compounds:["에르고티오네인","폴리사카라이드"],flavor:{umami:85,sweet:5,salty:0,sour:3,bitter:5}},
  "포르토벨로":{cat:"mushroom",en:"Portobello",emoji:"🍄",defaultG:100,comp:{protein:3.1,fat:0.4,carbs:4.8,water:90,fiber:1.2},amino:["글루탐산"],vit:{B5:1.5,niacin:3.8,selenium:10},compounds:["에르고티오네인","베타글루칸"],flavor:{umami:60,sweet:5,salty:0,sour:5,bitter:5}},
  "트러플(검은)":{cat:"mushroom",en:"Black Truffle",emoji:"🍄",defaultG:10,comp:{protein:8,fat:0.5,carbs:14,water:73,fiber:8},amino:["글루탐산"],vit:{B1:0.02,C:6},compounds:["안드로스테놀","디메틸설파이드","2,4-디티아펜탄"],flavor:{umami:90,sweet:5,salty:0,sour:3,bitter:5}},
  "꾀꼬리버섯":{cat:"mushroom",en:"Chanterelle",emoji:"🍄",defaultG:100,comp:{protein:1.5,fat:0.5,carbs:6.9,water:89,fiber:3.8},amino:["글루탐산"],vit:{D:5.3,B5:1.8,A:766},compounds:["에르고티오네인","카로티노이드"],flavor:{umami:55,sweet:8,salty:0,sour:5,bitter:5}},
  "노루궁뎅이":{cat:"mushroom",en:"Lions Mane",emoji:"🍄",defaultG:80,comp:{protein:2.2,fat:0.3,carbs:6.4,water:90,fiber:4.4},amino:["글루탐산","아스파르트산"],vit:{B3:5.4,B2:0.35,D:0.5},compounds:["헤리세논","에리나신","베타글루칸"],flavor:{umami:45,sweet:10,salty:3,sour:3,bitter:5}},
  "영지버섯":{cat:"mushroom",en:"Reishi",emoji:"🍄",defaultG:5,comp:{protein:7.3,fat:3.9,carbs:75,water:12,fiber:59},amino:["글루탐산"],vit:{B3:6.9,B1:0.15,zinc:3.9},compounds:["가노데르산","트리테르펜","폴리사카라이드"],flavor:{umami:20,sweet:5,salty:3,sour:3,bitter:35}},
  "차가버섯":{cat:"mushroom",en:"Chaga",emoji:"🍄",defaultG:5,comp:{protein:7.6,fat:2,carbs:60,water:8,fiber:25},amino:[],vit:{B3:8.8,K:1.1,zinc:5.2},compounds:["베툴린","이노노투스","베타글루칸","멜라닌"],flavor:{umami:15,sweet:5,salty:3,sour:5,bitter:30}},
  "마이타케":{cat:"mushroom",en:"Maitake",emoji:"🍄",defaultG:80,comp:{protein:1.9,fat:0.2,carbs:6.7,water:91,fiber:2.7},amino:["글루탐산","아스파르트산"],vit:{D:28.1,B3:5.4,B2:0.26},compounds:["D-프락션","베타글루칸","MX-프락션"],flavor:{umami:55,sweet:8,salty:3,sour:3,bitter:5}},
  "모렐버섯":{cat:"mushroom",en:"Morel",emoji:"🍄",defaultG:80,comp:{protein:3.1,fat:0.6,carbs:5.1,water:90,fiber:2.8},amino:["글루탐산","아스파르트산"],vit:{D:206,B3:2.3,B2:0.24,iron:12.2},compounds:["폴리사카라이드","비타민D2","에르고티오네인"],flavor:{umami:65,sweet:8,salty:3,sour:5,bitter:8}},
  "샹테렐(꾀꼬리·추가)":{cat:"mushroom",en:"Chanterelle",emoji:"🍄",defaultG:80,comp:{protein:1.5,fat:0.5,carbs:6.8,water:90,fiber:3.8},amino:["글루탐산","알라닌"],vit:{D:212,B3:6.1,A:155},compounds:["에르고스테롤","테르페노이드","비타민D2"],flavor:{umami:55,sweet:8,salty:3,sour:3,bitter:5}},
  "블랙트럼펫":{cat:"mushroom",en:"Black Trumpet",emoji:"🍄",defaultG:30,comp:{protein:2.9,fat:0.6,carbs:7.2,water:88,fiber:5.2},amino:["글루탐산"],vit:{B12:2.65,D:165,B2:0.48},compounds:["에르고스테롤","트럼페틴","베타글루칸"],flavor:{umami:60,sweet:5,salty:5,sour:5,bitter:8}},
  "크리미니버섯":{cat:"mushroom",en:"Cremini",emoji:"🍄",defaultG:80,comp:{protein:2.5,fat:0.3,carbs:4.3,water:92,fiber:0.6},amino:["글루탐산","알라닌"],vit:{B3:3.6,B2:0.45,B5:1.5},compounds:["에르고티오네인","베타글루칸","폴리페놀"],flavor:{umami:50,sweet:8,salty:3,sour:3,bitter:5}},
  "흰목이버섯":{cat:"mushroom",en:"White Fungus",emoji:"🍄",defaultG:15,comp:{protein:0.9,fat:0.1,carbs:6.7,water:92,fiber:2.6},amino:["글루탐산"],vit:{D:0.4,B2:0.06,iron:1.9},compounds:["트레멜라폴리사카라이드","베타글루칸","식이섬유"],flavor:{umami:20,sweet:5,salty:3,sour:3,bitter:3}},
  "황금송이":{cat:"mushroom",en:"Golden Enoki",emoji:"🍄",defaultG:80,comp:{protein:2.8,fat:0.5,carbs:6.1,water:89,fiber:4.7},amino:["글루탐산","알라닌"],vit:{D:18.5,B3:7.5,B2:0.22},compounds:["폴리사카라이드","베타글루칸","에르고티오네인"],flavor:{umami:60,sweet:8,salty:3,sour:3,bitter:5}},
  "복령":{cat:"mushroom",en:"Poria",emoji:"🍄",defaultG:10,comp:{protein:2.5,fat:0.6,carbs:88,water:6,fiber:80},amino:[],vit:{calcium:2,potassium:70},compounds:["포리아폴리사카라이드","베타글루칸","파키민"],flavor:{umami:10,sweet:5,salty:3,sour:3,bitter:5}},
  "아가리쿠스":{cat:"mushroom",en:"Agaricus",emoji:"🍄",defaultG:30,comp:{protein:2,fat:0.3,carbs:4,water:92,fiber:1.3},amino:["글루탐산"],vit:{B3:3.6,B2:0.36,D:0.2},compounds:["베타글루칸","AHCC","레반"],flavor:{umami:40,sweet:5,salty:3,sour:3,bitter:5}},
  "만가닥버섯":{cat:"mushroom",en:"Beech Mushroom",emoji:"🍄",defaultG:100,comp:{protein:3.1,fat:0.3,carbs:5.9,water:89,fiber:2},amino:["글루탐산"],vit:{B5:1.6,niacin:4.2},compounds:["베타글루칸","렌티난"],flavor:{umami:45,sweet:5,salty:0,sour:5,bitter:3}},

  // ── Legume (추가) ─────────────────────────────────────────────────────────
  "대두":{cat:"legume",en:"Soybean",emoji:"🫘",defaultG:100,comp:{protein:36,fat:20,carbs:30,water:8,fiber:9.3},amino:["글루탐산","리신","류신"],vit:{folate:375,iron:15.7,calcium:277},compounds:["이소플라본","사포닌","피트산"],flavor:{umami:30,sweet:5,salty:0,sour:5,bitter:5}},
  "강낭콩":{cat:"legume",en:"Kidney Bean",emoji:"🫘",defaultG:100,comp:{protein:24,fat:1.5,carbs:60,water:11,fiber:25},amino:["리신","류신","글루탐산"],vit:{folate:394,iron:8,magnesium:140},compounds:["폴리페놀","사포닌"],flavor:{umami:20,sweet:10,salty:0,sour:0,bitter:5}},
  "청국장":{cat:"legume",en:"Cheonggukjang",emoji:"🫘",defaultG:20,comp:{protein:18,fat:8,carbs:10,water:60,fiber:3},amino:["글루탐산"],vit:{sodium:1500,B12:0.3,K2:800},compounds:["나토키나아제","바실러스서브틸리스","이소플라본"],flavor:{umami:80,sweet:10,salty:70,sour:15,bitter:10}},
  "낫토":{cat:"legume",en:"Natto",emoji:"🫘",defaultG:50,comp:{protein:17,fat:11,carbs:12.5,water:55,fiber:5.4},amino:["글루탐산","리신"],vit:{K2:1103,B2:0.56,iron:3.6},compounds:["나토키나아제","폴리감마글루탐산","이소플라본"],flavor:{umami:70,sweet:8,salty:5,sour:15,bitter:10}},
  "에다마메":{cat:"legume",en:"Edamame",emoji:"🫘",defaultG:100,comp:{protein:11,fat:5,carbs:8.9,water:73,fiber:5.2},amino:["류신","리신","글루탐산"],vit:{K:26,C:6.1,folate:111},compounds:["이소플라본","클로로필"],flavor:{umami:20,sweet:15,salty:0,sour:5,bitter:5}},
  "누에콩":{cat:"legume",en:"Broad Bean",emoji:"🫘",defaultG:100,comp:{protein:7.7,fat:0.7,carbs:18,water:72,fiber:5.4},amino:["글루탐산","리신"],vit:{C:1.8,folate:148,magnesium:43},compounds:["레바도파","이소플라본","탄닌"],flavor:{umami:20,sweet:10,salty:0,sour:5,bitter:10}},

  // ── Herb & Spice (추가) ───────────────────────────────────────────────────
  "오레가노":{cat:"herb",en:"Oregano",emoji:"🌿",defaultG:2,comp:{protein:9,fat:4.3,carbs:69,water:9,fiber:42.5},amino:[],vit:{K:622,iron:36.8,calcium:1597},compounds:["카르바크롤","티몰","로즈마린산"],flavor:{umami:10,sweet:5,salty:0,sour:5,bitter:20}},
  "세이지":{cat:"herb",en:"Sage",emoji:"🌿",defaultG:2,comp:{protein:10,fat:12,carbs:61,water:8,fiber:40.3},amino:[],vit:{K:1714,A:148,calcium:1652},compounds:["투욘","캠퍼","로즈마린산"],flavor:{umami:10,sweet:5,salty:0,sour:5,bitter:25}},
  "딜":{cat:"herb",en:"Dill",emoji:"🌿",defaultG:3,comp:{protein:3.5,fat:1.1,carbs:7,water:86,fiber:2.1},amino:[],vit:{K:55,A:386,C:85},compounds:["카르본","리모넨"],flavor:{umami:10,sweet:5,salty:0,sour:5,bitter:15}},
  "타라곤":{cat:"herb",en:"Tarragon",emoji:"🌿",defaultG:2,comp:{protein:22.8,fat:7.2,carbs:50,water:8,fiber:7.4},amino:[],vit:{K:295,iron:32.3,manganese:7.2},compounds:["에스트라골","메틸차비콜"],flavor:{umami:10,sweet:10,salty:0,sour:5,bitter:15}},
  "레몬그라스":{cat:"herb",en:"Lemongrass",emoji:"🌿",defaultG:5,comp:{protein:1.8,fat:0.5,carbs:25,water:70,fiber:0},amino:[],vit:{folate:75,B5:0.22},compounds:["시트랄","제라니올","미르센"],flavor:{umami:5,sweet:10,salty:0,sour:10,bitter:15}},
  "팔각":{cat:"herb",en:"Star Anise",emoji:"🌿",defaultG:2,comp:{protein:17.6,fat:16,carbs:50,water:9,fiber:14.6},amino:[],vit:{iron:36.96,calcium:646},compounds:["트랜스-아네톨","시키미산"],flavor:{umami:5,sweet:30,salty:0,sour:5,bitter:15}},
  "클로브(정향)":{cat:"herb",en:"Clove",emoji:"🌿",defaultG:2,comp:{protein:5.9,fat:13,carbs:65,water:9,fiber:33.9},amino:[],vit:{K:141.8,manganese:60.1},compounds:["유게놀","아세틸유게놀"],flavor:{umami:5,sweet:10,salty:0,sour:5,bitter:25}},
  "넛맥":{cat:"herb",en:"Nutmeg",emoji:"🌿",defaultG:2,comp:{protein:5.8,fat:36,carbs:49,water:6.2,fiber:20.8},amino:[],vit:{B1:0.35,B6:0.16,copper:1.0},compounds:["미리스티신","엘레미신"],flavor:{umami:5,sweet:15,salty:0,sour:0,bitter:20}},
  "사프란":{cat:"herb",en:"Saffron",emoji:"🌿",defaultG:0.5,comp:{protein:11.4,fat:5.9,carbs:65,water:12,fiber:3.9},amino:[],vit:{B2:0.27,C:80.8},compounds:["크로신","사프라날","피크로크로신"],flavor:{umami:5,sweet:10,salty:0,sour:5,bitter:20}},
  "오향(우시앙펀)":{cat:"herb",en:"Five Spice",emoji:"🌿",defaultG:2,comp:{protein:11,fat:8,carbs:50,water:10,fiber:15},amino:[],vit:{iron:17,calcium:300},compounds:["시나밀알데하이드","아네톨","유게놀"],flavor:{umami:10,sweet:15,salty:0,sour:3,bitter:20}},
  "차이브":{cat:"herb",en:"Chives",emoji:"🌿",defaultG:5,comp:{protein:3.3,fat:0.7,carbs:4.4,water:91,fiber:2.5},amino:[],vit:{K:213,A:218,C:58},compounds:["알리신","루틴"],flavor:{umami:15,sweet:10,salty:0,sour:5,bitter:15}},
  "카다몬":{cat:"herb",en:"Cardamom",emoji:"🌿",defaultG:2,comp:{protein:11,fat:6.7,carbs:68,water:8,fiber:28},amino:[],vit:{B1:0.19,iron:14,manganese:28},compounds:["1,8-시네올","리모넨","테르피넨"],flavor:{umami:5,sweet:15,salty:0,sour:5,bitter:15}},

  // ── Condiment (추가) ──────────────────────────────────────────────────────
  "쌈장":{cat:"sauce",en:"Ssamjang",emoji:"🫗",defaultG:15,comp:{protein:8,fat:4,carbs:13,water:68,fiber:2},amino:["글루탐산"],vit:{sodium:1260,iron:1.5},compounds:["멜라노이딘","글루탐산"],flavor:{umami:80,sweet:15,salty:75,sour:10,bitter:10}},
  "멸치액젓":{cat:"sauce",en:"Anchovy Fish Sauce",emoji:"🫗",defaultG:10,comp:{protein:9,fat:0.3,carbs:2,water:82,fiber:0},amino:["글루탐산","글리신"],vit:{sodium:7770,calcium:62},compounds:["글루탐산나트륨","타우린"],flavor:{umami:90,sweet:5,salty:90,sour:10,bitter:5}},
  "새우젓":{cat:"sauce",en:"Salted Shrimp Paste",emoji:"🫗",defaultG:10,comp:{protein:14,fat:1,carbs:2.5,water:65,fiber:0},amino:["글루탐산","글리신"],vit:{sodium:8530,calcium:120,iodine:200},compounds:["글루탐산","타우린"],flavor:{umami:85,sweet:5,salty:90,sour:5,bitter:5}},
  "된장":{cat:"sauce",en:"Doenjang",emoji:"🫗",defaultG:15,comp:{protein:11,fat:5,carbs:12,water:67,fiber:2.5},amino:["글루탐산"],vit:{sodium:3920,B2:0.11,K2:50},compounds:["멜라노이딘","이소플라본","사포닌"],flavor:{umami:85,sweet:8,salty:80,sour:10,bitter:8}},
  "MSG":{cat:"sauce",en:"MSG",emoji:"🫗",defaultG:2,comp:{protein:11,fat:0,carbs:4,water:0,fiber:0},amino:["글루탐산"],vit:{sodium:12230},compounds:["L-글루탐산나트륨"],flavor:{umami:100,sweet:0,salty:20,sour:0,bitter:0}},
  "국간장":{cat:"sauce",en:"Soup Soy Sauce",emoji:"🫗",defaultG:10,comp:{protein:11,fat:0,carbs:5,water:56,fiber:0},amino:["글루탐산"],vit:{sodium:7200,iron:2.8},compounds:["멜라노이딘","글루탐산"],flavor:{umami:90,sweet:10,salty:95,sour:8,bitter:8}},
  "발사믹식초":{cat:"sauce",en:"Balsamic Vinegar",emoji:"🫗",defaultG:15,comp:{protein:0.5,fat:0,carbs:17,water:77,fiber:0},amino:[],vit:{potassium:112},compounds:["폴리페놀","안토시아닌","유기산"],flavor:{umami:10,sweet:25,salty:0,sour:60,bitter:10}},
  "레몬즙":{cat:"sauce",en:"Lemon Juice",emoji:"🍋",defaultG:15,comp:{protein:0.3,fat:0.2,carbs:5.4,water:93,fiber:0.2},amino:[],vit:{C:38,potassium:103},compounds:["시트르산","리모넨","플라보노이드"],flavor:{umami:0,sweet:5,salty:0,sour:90,bitter:10}},
  "스리라차소스":{cat:"sauce",en:"Sriracha",emoji:"🫗",defaultG:10,comp:{protein:1,fat:0.5,carbs:8,water:85,fiber:0},amino:[],vit:{sodium:510,C:6},compounds:["캡사이신","식초산"],flavor:{umami:20,sweet:20,salty:40,sour:30,bitter:5}},
  "타바스코":{cat:"sauce",en:"Tabasco",emoji:"🫗",defaultG:5,comp:{protein:0.3,fat:0.1,carbs:0.9,water:92,fiber:0},amino:[],vit:{sodium:180},compounds:["캡사이신","초산"],flavor:{umami:5,sweet:5,salty:40,sour:40,bitter:5}},
  "두반장":{cat:"sauce",en:"Doubanjiang",emoji:"🫗",defaultG:15,comp:{protein:8,fat:6,carbs:8,water:70,fiber:2},amino:["글루탐산"],vit:{sodium:3000,iron:2},compounds:["캡사이신","글루탐산","멜라노이딘"],flavor:{umami:75,sweet:5,salty:80,sour:10,bitter:15}},
  "XO소스":{cat:"sauce",en:"XO Sauce",emoji:"🫗",defaultG:10,comp:{protein:10,fat:5,carbs:3,water:75,fiber:0},amino:["글루탐산"],vit:{sodium:1280},compounds:["IMP","GMP","글루탐산"],flavor:{umami:95,sweet:10,salty:60,sour:5,bitter:5}},
  "폰즈":{cat:"sauce",en:"Ponzu",emoji:"🫗",defaultG:15,comp:{protein:3,fat:0,carbs:6,water:85,fiber:0},amino:["글루탐산"],vit:{sodium:2400},compounds:["시트르산","글루탐산","IMP"],flavor:{umami:80,sweet:10,salty:70,sour:20,bitter:5}},
  "데리야키소스":{cat:"sauce",en:"Teriyaki Sauce",emoji:"🫗",defaultG:15,comp:{protein:3.5,fat:0.1,carbs:16,water:75,fiber:0},amino:["글루탐산"],vit:{sodium:1765,potassium:131},compounds:["글루탐산","말토스"],flavor:{umami:70,sweet:40,salty:70,sour:5,bitter:5}},
  "느림발사믹":{cat:"sauce",en:"Balsamic Reduction",emoji:"🫗",defaultG:15,comp:{protein:0.5,fat:0,carbs:25,water:70,fiber:0},amino:[],vit:{},compounds:["폴리페놀","유기산"],flavor:{umami:15,sweet:30,salty:0,sour:50,bitter:10}},
  "남플라(피시소스)":{cat:"sauce",en:"Fish Sauce",emoji:"🫙",defaultG:10,comp:{protein:5,fat:0,carbs:4,water:90,fiber:0},amino:["글루탐산","알라닌","글리신"],vit:{B3:3.1,B12:1.8,iodine:20},compounds:["히스타민","글루탐산","핵산"],flavor:{umami:95,sweet:5,salty:35,sour:5,bitter:3}},
  "삼발오렉":{cat:"sauce",en:"Sambal Oelek",emoji:"🌶️",defaultG:15,comp:{protein:2,fat:1,carbs:15,water:78,fiber:3},amino:[],vit:{C:80,A:45},compounds:["캡사이신","알리신","초산"],flavor:{umami:20,sweet:15,salty:12,sour:15,bitter:8}},
  "하리사":{cat:"sauce",en:"Harissa",emoji:"🌶️",defaultG:15,comp:{protein:2.5,fat:6,carbs:12,water:75,fiber:3},amino:[],vit:{C:75,A:65},compounds:["캡사이신","카르바크롤","큐민알데하이드"],flavor:{umami:15,sweet:10,salty:15,sour:8,bitter:8}},
  "마라소스":{cat:"sauce",en:"Mala Sauce",emoji:"🫙",defaultG:20,comp:{protein:3,fat:12,carbs:10,water:68,fiber:2},amino:["글루탐산"],vit:{A:85,C:15},compounds:["마라(산초+고추)","캡사이신","산쇼올"],flavor:{umami:45,sweet:8,salty:18,sour:5,bitter:10}},
  "유자코쇼":{cat:"sauce",en:"Yuzu Kosho",emoji:"🟡",defaultG:5,comp:{protein:1.4,fat:0.3,carbs:8.5,water:85,fiber:2},amino:[],vit:{C:80,A:15},compounds:["리모넨","캡사이신","플라보노이드"],flavor:{umami:10,sweet:5,salty:20,sour:15,bitter:15}},
  "워스터셔소스":{cat:"sauce",en:"Worcestershire Sauce",emoji:"🫙",defaultG:10,comp:{protein:0.6,fat:0,carbs:18,water:79,fiber:0},amino:["글루탐산"],vit:{B3:0.7,sodium:3200},compounds:["타마린드","앤초비","초산"],flavor:{umami:55,sweet:20,salty:20,sour:15,bitter:8}},
  "홀그레인머스타드":{cat:"sauce",en:"Whole Grain Mustard",emoji:"🫙",defaultG:15,comp:{protein:5,fat:5.9,carbs:28,water:68,fiber:5},amino:[],vit:{selenium:20,calcium:150},compounds:["이소티오시아네이트","시나피신","글루코시놀레이트"],flavor:{umami:10,sweet:8,salty:15,sour:20,bitter:25}},
  "디종머스타드":{cat:"sauce",en:"Dijon Mustard",emoji:"🫙",defaultG:10,comp:{protein:7.1,fat:7.6,carbs:19,water:73,fiber:5.9},amino:[],vit:{selenium:22},compounds:["이소티오시아네이트","화이트와인","시나피신"],flavor:{umami:12,sweet:5,salty:15,sour:18,bitter:30}},
  "타히니(소스용)":{cat:"sauce",en:"Tahini Sauce",emoji:"🫙",defaultG:20,comp:{protein:17,fat:53,carbs:22,water:3,fiber:9.3},amino:["메티오닌"],vit:{calcium:426,B1:0.97},compounds:["세사민","세사몰린"],flavor:{umami:20,sweet:8,salty:3,sour:5,bitter:15}},
  "타마린드페이스트":{cat:"sauce",en:"Tamarind Paste",emoji:"🫙",defaultG:20,comp:{protein:2.8,fat:0.6,carbs:57,water:38,fiber:5},amino:[],vit:{B1:0.43,iron:2.8,potassium:628},compounds:["타르타르산","사과산","폴리페놀"],flavor:{umami:10,sweet:20,salty:5,sour:55,bitter:8}},
  "애플사이더비네거":{cat:"sauce",en:"Apple Cider Vinegar",emoji:"🫙",defaultG:15,comp:{protein:0,fat:0,carbs:0.9,water:94,fiber:0},amino:[],vit:{potassium:73},compounds:["아세트산","말산","페놀산"],flavor:{umami:5,sweet:5,salty:0,sour:50,bitter:5}},
  "발사믹글레이즈":{cat:"sauce",en:"Balsamic Glaze",emoji:"🫙",defaultG:15,comp:{protein:0.4,fat:0,carbs:25,water:68,fiber:0},amino:["글루탐산"],vit:{potassium:120},compounds:["초산","포도당","말산","안토시아닌"],flavor:{umami:20,sweet:40,salty:5,sour:30,bitter:5}},
  "미소된장(시로)":{cat:"sauce",en:"White Miso",emoji:"🫙",defaultG:20,comp:{protein:11.7,fat:3.5,carbs:26,water:44,fiber:5.2},amino:["글루탐산","알라닌"],vit:{B12:0.1,B2:0.12,calcium:65},compounds:["이소플라본","글루탐산","프로바이오틱"],flavor:{umami:70,sweet:15,salty:12,sour:8,bitter:5}},
  "쯔유(麺つゆ)":{cat:"sauce",en:"Tsuyu",emoji:"🫙",defaultG:30,comp:{protein:3.1,fat:0,carbs:8.5,water:86,fiber:0},amino:["글루탐산","이노신산"],vit:{B12:0.3,iodine:25},compounds:["글루탐산","이노신산","가쓰오부시추출"],flavor:{umami:85,sweet:20,salty:15,sour:5,bitter:5}},
  "폰즈소스":{cat:"sauce",en:"Ponzu Sauce",emoji:"🫙",defaultG:20,comp:{protein:1.5,fat:0,carbs:7,water:88,fiber:0},amino:["글루탐산"],vit:{C:8,B12:0.2},compounds:["글루탐산","시트르산","가쓰오부시"],flavor:{umami:60,sweet:10,salty:15,sour:25,bitter:5}},

  // ── Oil (추가) ────────────────────────────────────────────────────────────
  "해바라기유":{cat:"oil",en:"Sunflower Oil",emoji:"🫒",defaultG:15,comp:{protein:0,fat:100,carbs:0,water:0,fiber:0},amino:[],vit:{E:41.1},compounds:["리놀레산","비타민E"],flavor:{umami:0,sweet:0,salty:0,sour:0,bitter:0}},
  "아보카도오일":{cat:"oil",en:"Avocado Oil",emoji:"🥑",defaultG:15,comp:{protein:0,fat:100,carbs:0,water:0,fiber:0},amino:[],vit:{E:12,K:20},compounds:["올레산","루테인"],flavor:{umami:0,sweet:0,salty:0,sour:0,bitter:5}},
  "팜유":{cat:"oil",en:"Palm Oil",emoji:"🫒",defaultG:15,comp:{protein:0,fat:100,carbs:0,water:0,fiber:0},amino:[],vit:{E:15.9,A:37},compounds:["팔미트산","토코트리에놀"],flavor:{umami:0,sweet:0,salty:0,sour:0,bitter:3}},
  "마가린":{cat:"oil",en:"Margarine",emoji:"🧈",defaultG:15,comp:{protein:0.2,fat:80,carbs:0.9,water:18,fiber:0},amino:[],vit:{E:8.1,A:600},compounds:["트랜스지방산","팔미트산"],flavor:{umami:0,sweet:5,salty:15,sour:0,bitter:0}},
  "현미유":{cat:"oil",en:"Rice Bran Oil",emoji:"🫒",defaultG:15,comp:{protein:0,fat:100,carbs:0,water:0,fiber:0},amino:[],vit:{E:4.4},compounds:["감마오리자놀","오리자놀","비타민E"],flavor:{umami:0,sweet:0,salty:0,sour:0,bitter:3}},
  "트러플오일":{cat:"oil",en:"Truffle Oil",emoji:"🫙",defaultG:10,comp:{protein:0,fat:100,carbs:0,water:0,fiber:0},amino:[],vit:{E:14.4},compounds:["2,4-디티아펜탄","올레산","폴리페놀"],flavor:{umami:30,sweet:5,salty:0,sour:0,bitter:5}},
  "호박씨오일":{cat:"oil",en:"Pumpkin Seed Oil",emoji:"🫙",defaultG:10,comp:{protein:0.1,fat:100,carbs:0,water:0,fiber:0},amino:[],vit:{E:9.5,K:20},compounds:["알파리놀렌산","리놀레산","팔미트산"],flavor:{umami:8,sweet:8,salty:0,sour:0,bitter:8}},
  "호두오일":{cat:"oil",en:"Walnut Oil",emoji:"🫙",defaultG:10,comp:{protein:0,fat:100,carbs:0,water:0,fiber:0},amino:[],vit:{E:0.4,K:15},compounds:["ALA오메가-3","리놀레산","폴리페놀"],flavor:{umami:8,sweet:8,salty:0,sour:0,bitter:8}},
  "헤이즐넛오일":{cat:"oil",en:"Hazelnut Oil",emoji:"🫙",defaultG:10,comp:{protein:0,fat:100,carbs:0,water:0,fiber:0},amino:[],vit:{E:47},compounds:["올레산","팔미트산","토코페롤"],flavor:{umami:5,sweet:10,salty:0,sour:0,bitter:5}},
  "아르간오일":{cat:"oil",en:"Argan Oil",emoji:"🫙",defaultG:10,comp:{protein:0,fat:100,carbs:0,water:0,fiber:0},amino:[],vit:{E:62},compounds:["올레산","리놀레산","스쿠알렌","폴리페놀"],flavor:{umami:5,sweet:8,salty:0,sour:0,bitter:8}},
  "쇼트닝":{cat:"oil",en:"Shortening",emoji:"🫙",defaultG:20,comp:{protein:0,fat:100,carbs:0,water:0,fiber:0},amino:[],vit:{E:2.4},compounds:["트랜스지방(수소화)","팔미트산","스테아르산"],flavor:{umami:3,sweet:5,salty:0,sour:0,bitter:3}},
  "오리기름":{cat:"oil",en:"Duck Fat",emoji:"🫙",defaultG:15,comp:{protein:0,fat:100,carbs:0,water:0,fiber:0},amino:[],vit:{E:2.7},compounds:["올레산","팔미트산","리놀레산"],flavor:{umami:15,sweet:5,salty:0,sour:0,bitter:3}},
  "닭기름":{cat:"oil",en:"Chicken Fat",emoji:"🫙",defaultG:15,comp:{protein:0,fat:100,carbs:0,water:0,fiber:0},amino:[],vit:{E:2.2},compounds:["올레산","팔미트산"],flavor:{umami:15,sweet:5,salty:0,sour:0,bitter:3}},
  "라드(돼지기름)":{cat:"oil",en:"Lard",emoji:"🫙",defaultG:15,comp:{protein:0,fat:100,carbs:0,water:0,fiber:0},amino:[],vit:{D:2.5,E:0.6},compounds:["올레산","팔미트산","스테아르산"],flavor:{umami:15,sweet:5,salty:0,sour:0,bitter:3}},
  "들깨오일":{cat:"oil",en:"Perilla Seed Oil",emoji:"🫙",defaultG:10,comp:{protein:0,fat:100,carbs:0,water:0,fiber:0},amino:[],vit:{E:1.5,K:7},compounds:["ALA오메가-3","리놀레산","로즈마린산"],flavor:{umami:10,sweet:5,salty:0,sour:0,bitter:5}},
  "향미오일(차오일)":{cat:"oil",en:"Chili Oil",emoji:"🫙",defaultG:10,comp:{protein:0,fat:100,carbs:0,water:0,fiber:0},amino:[],vit:{E:3.8},compounds:["올레산","폴리페놀","카테킨"],flavor:{umami:8,sweet:5,salty:0,sour:3,bitter:5}},
  "검은참기름":{cat:"oil",en:"Dark Sesame Oil",emoji:"🫙",defaultG:10,comp:{protein:0.2,fat:100,carbs:0,water:0,fiber:0},amino:[],vit:{E:1.4,K:13.6},compounds:["세사민","세사몰린","안토시아닌"],flavor:{umami:15,sweet:5,salty:0,sour:0,bitter:8}},

  // ── Beverage ─────────────────────────────────────────────────────────────
  "커피":{cat:"beverage",en:"Coffee",emoji:"☕",defaultG:200,comp:{protein:0.3,fat:0,carbs:0,water:99,fiber:0},amino:[],vit:{B2:0.01,B3:0.19,potassium:49},compounds:["카페인","클로로겐산","카페스톨"],flavor:{umami:5,sweet:0,salty:0,sour:15,bitter:70}},
  "녹차":{cat:"beverage",en:"Green Tea",emoji:"🍵",defaultG:200,comp:{protein:0,fat:0,carbs:0,water:100,fiber:0},amino:["테아닌"],vit:{C:5,K:0.3},compounds:["카테킨","테아닌","카페인","EGCG"],flavor:{umami:20,sweet:5,salty:0,sour:5,bitter:35}},
  "홍차":{cat:"beverage",en:"Black Tea",emoji:"🍵",defaultG:200,comp:{protein:0,fat:0,carbs:0.1,water:99,fiber:0},amino:[],vit:{potassium:37},compounds:["테아플라빈","테아루비긴","카페인"],flavor:{umami:5,sweet:5,salty:0,sour:10,bitter:30}},
  "에스프레소":{cat:"beverage",en:"Espresso",emoji:"☕",defaultG:30,comp:{protein:0.1,fat:0.2,carbs:0.5,water:99,fiber:0},amino:[],vit:{B3:0.7,B2:0.01},compounds:["카페인","클로로겐산","멜라노이딘","트리고넬린"],flavor:{umami:15,sweet:3,salty:0,sour:20,bitter:40}},
  "말차":{cat:"beverage",en:"Matcha",emoji:"🍵",defaultG:5,comp:{protein:6.1,fat:5.1,carbs:38,water:5,fiber:36.5},amino:["테아닌"],vit:{K:1090,A:310,C:60},compounds:["EGCG","카테킨","테아닌","카페인"],flavor:{umami:30,sweet:5,salty:0,sour:5,bitter:40}},
  "우롱차":{cat:"beverage",en:"Oolong Tea",emoji:"🍵",defaultG:200,comp:{protein:0,fat:0,carbs:0.5,water:99.5,fiber:0},amino:["테아닌"],vit:{K:0.6,manganese:0.22},compounds:["오룡차폴리페놀","카테킨","카페인","아로마"],flavor:{umami:15,sweet:5,salty:0,sour:5,bitter:20}},
  "보이차(푸에르)":{cat:"beverage",en:"Pu-erh Tea",emoji:"🍵",defaultG:200,comp:{protein:0.1,fat:0,carbs:0.3,water:99.5,fiber:0},amino:["테아닌"],vit:{},compounds:["갈산","폴리페놀","GABA","스타틴"],flavor:{umami:20,sweet:5,salty:0,sour:8,bitter:25}},
  "캐모마일차":{cat:"beverage",en:"Chamomile Tea",emoji:"🫖",defaultG:200,comp:{protein:0,fat:0,carbs:0.3,water:99.7,fiber:0},amino:[],vit:{},compounds:["아피게닌","루테올린","카마줄렌","비사볼올"],flavor:{umami:3,sweet:8,salty:0,sour:3,bitter:8}},
  "히비스커스차":{cat:"beverage",en:"Hibiscus Tea",emoji:"🫖",defaultG:200,comp:{protein:0,fat:0,carbs:2,water:98,fiber:0},amino:[],vit:{C:9,iron:0.4},compounds:["안토시아닌","하이드록시구연산","하이비시신"],flavor:{umami:3,sweet:5,salty:0,sour:35,bitter:10}},
  "루이보스차":{cat:"beverage",en:"Rooibos Tea",emoji:"🫖",defaultG:200,comp:{protein:0,fat:0,carbs:0.5,water:99.5,fiber:0},amino:[],vit:{manganese:0.2,calcium:1.1},compounds:["아스팔라틴","노소페린","퀘르세틴","루틴"],flavor:{umami:5,sweet:8,salty:0,sour:5,bitter:5}},
  "생강차":{cat:"beverage",en:"Ginger Tea",emoji:"🫖",defaultG:200,comp:{protein:0,fat:0,carbs:2,water:98,fiber:0},amino:[],vit:{C:2},compounds:["진저롤","쇼가올","진저렌"],flavor:{umami:5,sweet:10,salty:0,sour:5,bitter:15}},
  "유자차":{cat:"beverage",en:"Yuzu Tea",emoji:"🍋",defaultG:200,comp:{protein:0.2,fat:0,carbs:12,water:87,fiber:0},amino:[],vit:{C:45,B1:0.04},compounds:["리모넨","플라보노이드","헤스페리딘"],flavor:{umami:3,sweet:25,salty:0,sour:20,bitter:10}},
  "오미자차":{cat:"beverage",en:"Schisandra Tea",emoji:"🔴",defaultG:200,comp:{protein:0,fat:0,carbs:3,water:97,fiber:0},amino:[],vit:{C:5},compounds:["시잔드린","고미신","유기산"],flavor:{umami:5,sweet:10,salty:5,sour:30,bitter:15}},
  "보리차":{cat:"beverage",en:"Barley Tea",emoji:"🫖",defaultG:200,comp:{protein:0.1,fat:0,carbs:0.5,water:99.3,fiber:0},amino:[],vit:{B3:0.1},compounds:["폴리코사놀","피라진","말톨"],flavor:{umami:5,sweet:8,salty:0,sour:3,bitter:8}},
  "호지차":{cat:"beverage",en:"Hojicha",emoji:"🍵",defaultG:200,comp:{protein:0,fat:0,carbs:0.2,water:99.8,fiber:0},amino:["테아닌"],vit:{},compounds:["피라진","카테킨","카페인(저)"],flavor:{umami:10,sweet:8,salty:0,sour:5,bitter:12}},
  "코코넛워터":{cat:"beverage",en:"Coconut Water",emoji:"🥥",defaultG:250,comp:{protein:0.7,fat:0.2,carbs:3.7,water:95,fiber:1.1},amino:[],vit:{C:2.4,potassium:250,magnesium:25},compounds:["시토키닌","로린산","칼륨"],flavor:{umami:3,sweet:15,salty:3,sour:3,bitter:3}},
  "콤부차":{cat:"beverage",en:"Kombucha",emoji:"🫙",defaultG:200,comp:{protein:0.2,fat:0,carbs:3,water:97,fiber:0},amino:[],vit:{B1:0.02,B2:0.05,B12:0.02},compounds:["초산","글루쿠론산","EGCG","프로바이오틱"],flavor:{umami:5,sweet:10,salty:0,sour:25,bitter:10}},
  "케피어음료":{cat:"beverage",en:"Kefir Drink",emoji:"🥛",defaultG:200,comp:{protein:3.8,fat:3.5,carbs:5,water:87,fiber:0},amino:["카세인","유청단백질"],vit:{B12:0.5,calcium:120,K2:0.3},compounds:["유산균","케피란","프로바이오틱"],flavor:{umami:10,sweet:10,salty:3,sour:20,bitter:5}},
  "소주":{cat:"beverage",en:"Soju",emoji:"🍶",defaultG:50,comp:{protein:0,fat:0,carbs:0,water:75,fiber:0},amino:[],vit:{},compounds:["에탄올","물","에스터"],flavor:{umami:0,sweet:3,salty:0,sour:3,bitter:5}},
  "청주(사케)":{cat:"beverage",en:"Sake",emoji:"🍶",defaultG:100,comp:{protein:0.5,fat:0,carbs:5,water:80,fiber:0},amino:["글루탐산","알라닌"],vit:{B2:0.02},compounds:["에탄올","아미노산","유기산","에스터"],flavor:{umami:20,sweet:10,salty:0,sour:8,bitter:5}},
  "에일맥주":{cat:"beverage",en:"Ale",emoji:"🍺",defaultG:330,comp:{protein:0.5,fat:0,carbs:4.6,water:92,fiber:0},amino:[],vit:{B3:0.5,B6:0.08,B12:0.06},compounds:["에탄올","호프쓴맛","이소알파산","에스터"],flavor:{umami:5,sweet:10,salty:3,sour:8,bitter:25}},
  "레드와인":{cat:"beverage",en:"Red Wine",emoji:"🍷",defaultG:150,comp:{protein:0.1,fat:0,carbs:3.8,water:87,fiber:0},amino:[],vit:{B6:0.06,B2:0.02},compounds:["레스베라트롤","안토시아닌","탄닌","에탄올"],flavor:{umami:10,sweet:5,salty:0,sour:15,bitter:20}},
  "화이트와인":{cat:"beverage",en:"White Wine",emoji:"🍾",defaultG:150,comp:{protein:0.1,fat:0,carbs:3.8,water:87,fiber:0},amino:[],vit:{B6:0.05},compounds:["플라보노이드","유기산","에탄올","에스터"],flavor:{umami:8,sweet:8,salty:0,sour:18,bitter:10}},
  "와인(레드)":{cat:"beverage",en:"Red Wine",emoji:"🍷",defaultG:150,comp:{protein:0.1,fat:0,carbs:2.5,water:86,fiber:0},amino:[],vit:{potassium:127},compounds:["레스베라트롤","탄닌","안토시아닌","타르타르산"],flavor:{umami:5,sweet:5,salty:0,sour:20,bitter:15}},
  "와인(화이트)":{cat:"beverage",en:"White Wine",emoji:"🥂",defaultG:150,comp:{protein:0.1,fat:0,carbs:2.6,water:87,fiber:0},amino:[],vit:{potassium:71},compounds:["플라보노이드","타르타르산"],flavor:{umami:5,sweet:10,salty:0,sour:20,bitter:8}},
  "맥주":{cat:"beverage",en:"Beer",emoji:"🍺",defaultG:350,comp:{protein:0.5,fat:0,carbs:3.6,water:93,fiber:0},amino:[],vit:{B3:0.51,folate:7},compounds:["에탄올","이소알파산","멜라노이딘"],flavor:{umami:5,sweet:10,salty:0,sour:10,bitter:35}},
  "두유":{cat:"beverage",en:"Soy Milk",emoji:"🥛",defaultG:200,comp:{protein:3.3,fat:1.8,carbs:3.2,water:91,fiber:0.3},amino:["글루탐산","리신"],vit:{B2:0.04,B12:0,calcium:25},compounds:["이소플라본","사포닌"],flavor:{umami:15,sweet:15,salty:0,sour:0,bitter:5}},
  "오렌지주스":{cat:"beverage",en:"Orange Juice",emoji:"🍊",defaultG:200,comp:{protein:0.7,fat:0.2,carbs:10,water:89,fiber:0.2},amino:[],vit:{C:50,folate:30,potassium:200},compounds:["플라보노이드","나린게닌"],flavor:{umami:3,sweet:40,salty:0,sour:20,bitter:5}},
  "코코아":{cat:"beverage",en:"Cocoa",emoji:"🍫",defaultG:200,comp:{protein:0.9,fat:2,carbs:8.6,water:87,fiber:0.4},amino:[],vit:{iron:0.4,magnesium:11},compounds:["테오브로민","카페인","플라보노이드"],flavor:{umami:5,sweet:25,salty:5,sour:5,bitter:30}},
  "막걸리":{cat:"beverage",en:"Makgeolli",emoji:"🍶",defaultG:200,comp:{protein:2,fat:0,carbs:5.1,water:90,fiber:0},amino:["글루탐산"],vit:{B1:0.05,B2:0.08,folate:12},compounds:["유산균","에탄올","말산","시트르산"],flavor:{umami:10,sweet:20,salty:0,sour:15,bitter:10}},

  // ── Processed Food ────────────────────────────────────────────────────────
  "두부(연)":{cat:"processed",en:"Silken Tofu",emoji:"🫙",defaultG:150,comp:{protein:8,fat:4.8,carbs:2,water:85,fiber:0.3},amino:["이소류신","류신","발린"],vit:{calcium:201,B1:0.07,iron:1.8},compounds:["이소플라본","사포닌"],flavor:{umami:20,sweet:5,salty:3,sour:3,bitter:3}},
  "두부(단단)":{cat:"processed",en:"Firm Tofu",emoji:"🫙",defaultG:100,comp:{protein:17,fat:9,carbs:2,water:70,fiber:0.3},amino:["이소류신","류신","발린"],vit:{calcium:350,B1:0.1,iron:3},compounds:["이소플라본","사포닌"],flavor:{umami:25,sweet:5,salty:3,sour:3,bitter:3}},
  "유부":{cat:"processed",en:"Fried Tofu",emoji:"🫙",defaultG:30,comp:{protein:15,fat:19,carbs:2,water:61,fiber:0.8},amino:["글루탐산"],vit:{calcium:130,B1:0.06},compounds:["이소플라본"],flavor:{umami:30,sweet:5,salty:3,sour:3,bitter:3}},
  "낫토(가공)":{cat:"processed",en:"Natto",emoji:"🟫",defaultG:50,comp:{protein:17,fat:11,carbs:14,water:55,fiber:5.4},amino:["글루탐산","아르기닌"],vit:{K2:870,B2:0.56,B12:0},compounds:["나토키나아제","이소플라본","비타민K2"],flavor:{umami:35,sweet:5,salty:3,sour:5,bitter:10}},
  "된장(가공)":{cat:"processed",en:"Doenjang",emoji:"🫙",defaultG:20,comp:{protein:11.8,fat:4.7,carbs:22,water:53,fiber:4.9},amino:["글루탐산","알라닌"],vit:{B12:0.1,B2:0.15,calcium:57},compounds:["이소플라본","글루탐산","프로바이오틱"],flavor:{umami:70,sweet:8,salty:18,sour:8,bitter:8}},
  "청국장(가공)":{cat:"processed",en:"Cheonggukjang",emoji:"🟫",defaultG:30,comp:{protein:18,fat:11,carbs:22,water:42,fiber:6.1},amino:["글루탐산","이소류신"],vit:{K2:600,B2:0.45},compounds:["이소플라본","나토키나아제","프로바이오틱"],flavor:{umami:60,sweet:5,salty:15,sour:8,bitter:15}},
  "간장(양조)":{cat:"processed",en:"Brewed Soy Sauce",emoji:"🫙",defaultG:15,comp:{protein:8.1,fat:0,carbs:7,water:72,fiber:0.8},amino:["글루탐산","알라닌"],vit:{B3:1.5,B12:0.02},compounds:["글루탐산","이노신산","갈산","멜라노이딘"],flavor:{umami:90,sweet:5,salty:30,sour:5,bitter:5}},
  "식혜":{cat:"processed",en:"Sikhye",emoji:"🥤",defaultG:200,comp:{protein:0.5,fat:0,carbs:15,water:84,fiber:0},amino:[],vit:{B1:0.02},compounds:["말토스","아밀라아제","맥아당"],flavor:{umami:5,sweet:35,salty:0,sour:5,bitter:3}},
  "김치(배추)":{cat:"processed",en:"Napa Cabbage Kimchi",emoji:"🥬",defaultG:100,comp:{protein:1.5,fat:0.5,carbs:2.4,water:92,fiber:1.6},amino:["글루탐산"],vit:{C:18,K:43,B2:0.06},compounds:["캡사이신","젖산균","이소티오시아네이트","알리신"],flavor:{umami:35,sweet:5,salty:15,sour:25,bitter:5}},
  "김치(깍두기)":{cat:"processed",en:"Radish Kimchi",emoji:"🟥",defaultG:100,comp:{protein:1.2,fat:0.4,carbs:4,water:92,fiber:2},amino:[],vit:{C:15,K:20},compounds:["캡사이신","젖산균","이소티오시아네이트"],flavor:{umami:30,sweet:8,salty:15,sour:20,bitter:5}},
  "젓갈(새우)":{cat:"processed",en:"Salted Shrimp",emoji:"🫙",defaultG:10,comp:{protein:24,fat:2,carbs:3,water:65,fiber:0},amino:["글루탐산","알라닌","타우린"],vit:{B12:2.5,iodine:120},compounds:["글루탐산","타우린","히스타민"],flavor:{umami:80,sweet:5,salty:30,sour:5,bitter:5}},
  "안초비":{cat:"processed",en:"Anchovy",emoji:"🫙",defaultG:10,comp:{protein:29,fat:9.7,carbs:0,water:56,fiber:0},amino:["글루탐산","알라닌","이노신산"],vit:{B12:3.3,calcium:232,niacin:19.9},compounds:["이노신산","글루탐산","히스타민"],flavor:{umami:90,sweet:5,salty:30,sour:3,bitter:5}},
  "토마토페이스트":{cat:"processed",en:"Tomato Paste",emoji:"🫙",defaultG:30,comp:{protein:3.5,fat:0.4,carbs:19,water:74,fiber:4.3},amino:["글루탐산"],vit:{C:21.9,A:101,lycopene:7700},compounds:["리코펜","글루탐산","5-HMF"],flavor:{umami:65,sweet:20,salty:5,sour:30,bitter:8}},
  "코코넛밀크(캔)":{cat:"processed",en:"Coconut Milk",emoji:"🥥",defaultG:100,comp:{protein:2.3,fat:24,carbs:3.3,water:70,fiber:2.2},amino:["글루탐산"],vit:{B5:0.16,manganese:0.9},compounds:["라우르산","MCT","카프릴산"],flavor:{umami:8,sweet:15,salty:0,sour:3,bitter:3}},
  "참치캔":{cat:"processed",en:"Canned Tuna",emoji:"🥫",defaultG:100,comp:{protein:26,fat:1.8,carbs:0,water:70,fiber:0},amino:["류신","라이신","발린"],vit:{B12:2.5,D:3.8,niacin:13.8},compounds:["오메가-3","셀레늄","히스타민"],flavor:{umami:70,sweet:3,salty:15,sour:3,bitter:3}},
  "정어리캔":{cat:"processed",en:"Canned Sardines",emoji:"🥫",defaultG:100,comp:{protein:24.6,fat:11.4,carbs:0,water:60,fiber:0},amino:["글루탐산","라이신"],vit:{B12:8.9,D:4.8,calcium:382},compounds:["오메가-3","EPA","DHA"],flavor:{umami:75,sweet:3,salty:15,sour:3,bitter:5}},
  "스팸(런천미트)":{cat:"processed",en:"Spam",emoji:"🥫",defaultG:100,comp:{protein:13,fat:28,carbs:4,water:52,fiber:0},amino:["글루탐산"],vit:{B12:0.9,B3:2.9},compounds:["아질산염","포화지방산","글루탐산"],flavor:{umami:40,sweet:5,salty:20,sour:3,bitter:3}},
  "미소(시로)":{cat:"processed",en:"White Miso",emoji:"🫙",defaultG:20,comp:{protein:12,fat:3.5,carbs:26,water:44,fiber:5.2},amino:["글루탐산","알라닌"],vit:{B2:0.12,calcium:65},compounds:["이소플라본","글루탐산","프로바이오틱"],flavor:{umami:70,sweet:15,salty:12,sour:8,bitter:5}},

  // ── 한국 장류/발효/떡 ────────────────────────────────────────────────────
  "고추장":{cat:"processed",en:"Gochujang",emoji:"🌶️",defaultG:20,comp:{protein:6.7,fat:2.2,carbs:50,water:36,fiber:3.5},amino:["글루탐산","알라닌"],vit:{A:95,B2:0.13,calcium:42},compounds:["캡사이신","이소플라본","젖산균","멜라노이딘"],flavor:{umami:55,sweet:20,salty:18,sour:10,bitter:8}},
  "쌈장":{cat:"processed",en:"Ssamjang",emoji:"🫙",defaultG:20,comp:{protein:8,fat:3.1,carbs:30,water:50,fiber:3.2},amino:["글루탐산"],vit:{B2:0.1,calcium:50},compounds:["이소플라본","캡사이신","글루탐산","젖산균"],flavor:{umami:60,sweet:15,salty:18,sour:8,bitter:8}},
  "춘장":{cat:"processed",en:"Black Bean Paste",emoji:"🫙",defaultG:20,comp:{protein:8.5,fat:3.8,carbs:35,water:46,fiber:3},amino:["글루탐산","알라닌"],vit:{B2:0.08,iron:2.1},compounds:["멜라노이딘","글루탐산","캐러멜"],flavor:{umami:65,sweet:12,salty:22,sour:5,bitter:10}},
  "멸치액젓":{cat:"processed",en:"Anchovy Fish Sauce",emoji:"🫙",defaultG:10,comp:{protein:13,fat:1.2,carbs:2,water:79,fiber:0},amino:["글루탐산","알라닌","이노신산"],vit:{B12:3.1,calcium:115,iodine:45},compounds:["글루탐산","이노신산","타우린","히스타민"],flavor:{umami:88,sweet:5,salty:30,sour:5,bitter:5}},
  "까나리액젓":{cat:"processed",en:"Sand Lance Fish Sauce",emoji:"🫙",defaultG:10,comp:{protein:12,fat:0.8,carbs:1,water:82,fiber:0},amino:["글루탐산","타우린"],vit:{B12:2.5,iodine:30},compounds:["글루탐산","타우린","히스타민"],flavor:{umami:85,sweet:5,salty:28,sour:5,bitter:5}},
  "명란젓":{cat:"processed",en:"Salted Pollock Roe",emoji:"🟠",defaultG:30,comp:{protein:18,fat:3.8,carbs:2,water:68,fiber:0},amino:["글루탐산","라이신","알라닌"],vit:{B12:8,A:68,D:3.8},compounds:["EPA","DHA","타우린","캡사이신"],flavor:{umami:80,sweet:5,salty:25,sour:5,bitter:3}},
  "오징어젓":{cat:"processed",en:"Salted Squid",emoji:"🦑",defaultG:20,comp:{protein:22,fat:1.5,carbs:5,water:65,fiber:0},amino:["글루탐산","타우린","알라닌"],vit:{B12:3.5,iodine:55},compounds:["타우린","글루탐산","히스타민"],flavor:{umami:75,sweet:8,salty:25,sour:5,bitter:5}},
  "멸치젓":{cat:"processed",en:"Salted Anchovy",emoji:"🫙",defaultG:10,comp:{protein:20,fat:4.5,carbs:1,water:68,fiber:0},amino:["글루탐산","알라닌","이노신산"],vit:{B12:5.2,calcium:260},compounds:["이노신산","글루탐산","히스타민"],flavor:{umami:85,sweet:5,salty:30,sour:3,bitter:5}},
  "창란젓":{cat:"processed",en:"Salted Pollock Innards",emoji:"🫙",defaultG:15,comp:{protein:15,fat:2,carbs:3,water:74,fiber:0},amino:["글루탐산","타우린"],vit:{B12:4.1,iodine:40},compounds:["타우린","글루탐산"],flavor:{umami:72,sweet:8,salty:22,sour:5,bitter:5}},
  "어묵":{cat:"processed",en:"Fish Cake",emoji:"🟡",defaultG:80,comp:{protein:12,fat:4.5,carbs:12,water:68,fiber:0.5},amino:["글루탐산","알라닌"],vit:{B12:0.5,calcium:55},compounds:["전분","글루탐산","소르비톨"],flavor:{umami:40,sweet:10,salty:15,sour:3,bitter:3}},
  "맛살(크래브스틱)":{cat:"processed",en:"Crab Stick",emoji:"🦀",defaultG:60,comp:{protein:8,fat:0.5,carbs:14,water:75,fiber:0},amino:["글루탐산"],vit:{B12:0.3,calcium:15},compounds:["전분","소르비톨","인공향"],flavor:{umami:35,sweet:15,salty:15,sour:3,bitter:3}},
  "가래떡":{cat:"processed",en:"Rice Cake",emoji:"🍡",defaultG:100,comp:{protein:2.5,fat:0.3,carbs:47,water:49,fiber:0.4},amino:["글루탐산"],vit:{B1:0.05,B3:0.8},compounds:["아밀로스","아밀로펙틴","전분"],flavor:{umami:5,sweet:10,salty:3,sour:0,bitter:0}},
  "찹쌀떡":{cat:"processed",en:"Glutinous Rice Cake",emoji:"🍡",defaultG:80,comp:{protein:3,fat:1.5,carbs:52,water:42,fiber:0.3},amino:["글루탐산"],vit:{B1:0.04},compounds:["아밀로펙틴","전분","당"],flavor:{umami:5,sweet:20,salty:3,sour:0,bitter:0}},
  "인절미":{cat:"processed",en:"Injeolmi",emoji:"🟡",defaultG:80,comp:{protein:3.5,fat:2.5,carbs:48,water:44,fiber:0.5},amino:["글루탐산"],vit:{B1:0.06},compounds:["아밀로펙틴","콩고물","전분"],flavor:{umami:10,sweet:15,salty:3,sour:0,bitter:5}},
  "누룽지":{cat:"processed",en:"Scorched Rice",emoji:"🟡",defaultG:30,comp:{protein:3.5,fat:0.5,carbs:75,water:18,fiber:0.3},amino:["글루탐산"],vit:{B1:0.08,B3:2.1},compounds:["멜라노이딘","덱스트린","전분"],flavor:{umami:20,sweet:15,salty:3,sour:3,bitter:8}},
  "수정과":{cat:"processed",en:"Sujeonggwa",emoji:"🧡",defaultG:200,comp:{protein:0.2,fat:0,carbs:15,water:84,fiber:0},amino:[],vit:{C:2},compounds:["진저롤","시나몬알데하이드","클로브"],flavor:{umami:3,sweet:30,salty:0,sour:3,bitter:10}},
  "김치(열무)":{cat:"processed",en:"Young Radish Kimchi",emoji:"🥬",defaultG:100,comp:{protein:1.3,fat:0.3,carbs:3.5,water:92,fiber:1.4},amino:[],vit:{C:22,K:45,B2:0.05},compounds:["캡사이신","젖산균","글루코시놀레이트"],flavor:{umami:25,sweet:5,salty:15,sour:22,bitter:8}},
  "김치(파)":{cat:"processed",en:"Green Onion Kimchi",emoji:"🌿",defaultG:80,comp:{protein:1.8,fat:0.5,carbs:4,water:90,fiber:1.6},amino:[],vit:{C:15,K:90,A:80},compounds:["알리신","캡사이신","젖산균","퀘르세틴"],flavor:{umami:30,sweet:8,salty:15,sour:20,bitter:10}},
  "김치(오이소박이)":{cat:"processed",en:"Cucumber Kimchi",emoji:"🥒",defaultG:100,comp:{protein:0.8,fat:0.2,carbs:3,water:94,fiber:0.8},amino:[],vit:{C:8,K:12},compounds:["캡사이신","젖산균","큐커비타신"],flavor:{umami:20,sweet:5,salty:15,sour:20,bitter:8}},

  // ── 일본 발효/가공 ────────────────────────────────────────────────────────
  "미소(아카)":{cat:"processed",en:"Red Miso",emoji:"🫙",defaultG:20,comp:{protein:13.5,fat:4.3,carbs:24,water:43,fiber:5.5},amino:["글루탐산","알라닌"],vit:{B2:0.14,calcium:83},compounds:["이소플라본","글루탐산","멜라노이딘","프로바이오틱"],flavor:{umami:78,sweet:8,salty:20,sour:8,bitter:10}},
  "가쓰오부시":{cat:"processed",en:"Katsuobushi",emoji:"🟤",defaultG:5,comp:{protein:77,fat:0.4,carbs:0.3,water:15,fiber:0},amino:["글루탐산","이노신산","히스티딘"],vit:{B12:5.4,B3:46.3},compounds:["이노신산(IMP)","글루탐산","히스타민","카테킨"],flavor:{umami:95,sweet:5,salty:5,sour:5,bitter:5}},
  "다시마포(콘부)":{cat:"processed",en:"Kombu",emoji:"🌿",defaultG:5,comp:{protein:8.2,fat:1.1,carbs:56,water:10,fiber:27.1},amino:["글루탐산"],vit:{iodine:3000,K:66,B2:0.31,calcium:800},compounds:["글루탐산","알긴산","푸코이단","만니톨"],flavor:{umami:90,sweet:8,salty:12,sour:3,bitter:5}},
  "니보시(멸치국물용)":{cat:"processed",en:"Niboshi",emoji:"🐟",defaultG:10,comp:{protein:62,fat:6.8,carbs:0.5,water:17,fiber:0},amino:["글루탐산","이노신산"],vit:{D:18,B12:29,calcium:2200},compounds:["이노신산(IMP)","글루탐산","칼슘"],flavor:{umami:85,sweet:5,salty:8,sour:3,bitter:8}},
  "간장(다마리)":{cat:"processed",en:"Tamari",emoji:"🫙",defaultG:15,comp:{protein:11.6,fat:0.1,carbs:7.9,water:67,fiber:0},amino:["글루탐산","알라닌"],vit:{B3:2.2,B12:0.03},compounds:["글루탐산","멜라노이딘","이소플라본"],flavor:{umami:92,sweet:8,salty:28,sour:5,bitter:5}},
  "우메보시(매실절임)":{cat:"processed",en:"Umeboshi",emoji:"🔴",defaultG:10,comp:{protein:0.9,fat:0.2,carbs:13,water:72,fiber:3.6},amino:[],vit:{K:11.6,iron:1.7,calcium:65},compounds:["구연산","피쿨린산","카테킨","벤조산"],flavor:{umami:8,sweet:3,salty:25,sour:55,bitter:10}},
  "쓰케모노(일본절임)":{cat:"processed",en:"Tsukemono",emoji:"🟡",defaultG:50,comp:{protein:1.5,fat:0.2,carbs:6,water:88,fiber:1.5},amino:[],vit:{K:35,B2:0.05},compounds:["젖산","초산","식물폴리페놀"],flavor:{umami:15,sweet:8,salty:18,sour:20,bitter:8}},
  "아마자케(단술)":{cat:"processed",en:"Amazake",emoji:"🥤",defaultG:150,comp:{protein:3.9,fat:0.5,carbs:17,water:78,fiber:0.4},amino:["글루탐산","알라닌"],vit:{B1:0.03,B6:0.15},compounds:["코지산","올리고당","포도당","아미노산"],flavor:{umami:15,sweet:40,salty:0,sour:5,bitter:3}},

  // ── 중국 발효/가공 ────────────────────────────────────────────────────────
  "두시(흑두시)":{cat:"processed",en:"Douchi",emoji:"⚫",defaultG:10,comp:{protein:23,fat:5,carbs:38,water:25,fiber:8.5},amino:["글루탐산","알라닌"],vit:{B2:0.32,iron:9.5,calcium:207},compounds:["이소플라본","글루탐산","멜라노이딘","프로바이오틱"],flavor:{umami:75,sweet:5,salty:18,sour:5,bitter:10}},
  "해선장":{cat:"processed",en:"Hoisin Sauce",emoji:"🫙",defaultG:15,comp:{protein:4.3,fat:1.6,carbs:43,water:42,fiber:2.4},amino:["글루탐산"],vit:{B3:1.8,iron:2.4},compounds:["글루탐산","캐러멜","오향분말"],flavor:{umami:55,sweet:25,salty:20,sour:5,bitter:5}},
  "천면장":{cat:"processed",en:"Sweet Bean Sauce",emoji:"🫙",defaultG:15,comp:{protein:6,fat:1.5,carbs:37,water:48,fiber:1.8},amino:["글루탐산","알라닌"],vit:{B2:0.1,calcium:48},compounds:["멜라노이딘","글루탐산","맥아당"],flavor:{umami:55,sweet:20,salty:18,sour:5,bitter:8}},
  "사천두반장":{cat:"processed",en:"Sichuan Doubanjiang",emoji:"🌶️",defaultG:15,comp:{protein:7.5,fat:4.5,carbs:18,water:60,fiber:2.8},amino:["글루탐산","알라닌"],vit:{A:78,B2:0.08},compounds:["캡사이신","글루탐산","산초오일","발효누룩"],flavor:{umami:65,sweet:8,salty:22,sour:8,bitter:12}},
  "라지앙(칠리오일)":{cat:"processed",en:"Chili Oil",emoji:"🌶️",defaultG:10,comp:{protein:2,fat:18,carbs:8,water:62,fiber:1.5},amino:[],vit:{A:85},compounds:["캡사이신","산초오일","마늘"],flavor:{umami:35,sweet:5,salty:10,sour:3,bitter:5}},
  "두부(훈제)":{cat:"processed",en:"Smoked Tofu",emoji:"🟫",defaultG:80,comp:{protein:18,fat:9,carbs:3,water:67,fiber:0.5},amino:["이소류신","류신","발린"],vit:{calcium:250,B1:0.08},compounds:["이소플라본","훈제화합물","페놀"],flavor:{umami:35,sweet:5,salty:8,sour:3,bitter:8}},

  // ── 서양 절임/훈제/통조림 ─────────────────────────────────────────────────
  "케이퍼(절임)":{cat:"processed",en:"Capers",emoji:"🫙",defaultG:10,comp:{protein:2.4,fat:0.9,carbs:4.9,water:84,fiber:3.2},amino:[],vit:{K:24.6,C:4.3,A:7},compounds:["케르세틴","루틴","캠페롤","글루코카파린"],flavor:{umami:20,sweet:3,salty:25,sour:25,bitter:15}},
  "올리브(그린절임)":{cat:"processed",en:"Green Olives",emoji:"🫒",defaultG:30,comp:{protein:0.8,fat:10.7,carbs:0.8,water:80,fiber:1.6},amino:[],vit:{E:3.8,K:1.4,iron:0.49},compounds:["올레우로페인","하이드록시티로솔","올레산"],flavor:{umami:15,sweet:3,salty:20,sour:8,bitter:25}},
  "올리브(블랙절임)":{cat:"processed",en:"Black Olives",emoji:"⚫",defaultG:30,comp:{protein:0.8,fat:11,carbs:0.9,water:80,fiber:1.5},amino:[],vit:{E:1.6,K:1.4},compounds:["올레우로페인","안토시아닌","올레산"],flavor:{umami:12,sweet:3,salty:20,sour:5,bitter:15}},
  "사우어크라우트":{cat:"processed",en:"Sauerkraut",emoji:"🥬",defaultG:100,comp:{protein:1,fat:0.1,carbs:4.3,water:92,fiber:2.9},amino:[],vit:{C:15,K:13.2,B12:0.02},compounds:["젖산균","비타민C","이소티오시아네이트","GABA"],flavor:{umami:15,sweet:3,salty:12,sour:35,bitter:8}},
  "오이피클":{cat:"processed",en:"Pickled Cucumber",emoji:"🥒",defaultG:80,comp:{protein:0.7,fat:0.1,carbs:2.7,water:94,fiber:0.5},amino:[],vit:{K:34,B1:0.03},compounds:["초산","젖산","딜"],flavor:{umami:5,sweet:5,salty:15,sour:30,bitter:5}},
  "훈제연어":{cat:"processed",en:"Smoked Salmon",emoji:"🍣",defaultG:80,comp:{protein:18.3,fat:4.3,carbs:0,water:72,fiber:0},amino:["류신","라이신","발린"],vit:{D:14.4,B12:3.3,omega3:1.4},compounds:["아스타잔틴","오메가-3","훈제화합물","페놀"],flavor:{umami:65,sweet:5,salty:15,sour:3,bitter:5}},
  "훈제고등어":{cat:"processed",en:"Smoked Mackerel",emoji:"🐟",defaultG:80,comp:{protein:19,fat:12,carbs:0,water:65,fiber:0},amino:["글루탐산","라이신"],vit:{D:8.2,B12:12.1,B3:8.1},compounds:["오메가-3","훈제화합물","히스타민","DHA"],flavor:{umami:70,sweet:5,salty:15,sour:3,bitter:5}},
  "청어절임":{cat:"processed",en:"Pickled Herring",emoji:"🐟",defaultG:80,comp:{protein:17,fat:9,carbs:3,water:67,fiber:0},amino:["글루탐산","라이신"],vit:{D:9.5,B12:9.1,omega3:1.7},compounds:["오메가-3","초산","양파플라보노이드"],flavor:{umami:55,sweet:8,salty:12,sour:20,bitter:5}},
  "토마토캔(홀)":{cat:"processed",en:"Canned Whole Tomatoes",emoji:"🥫",defaultG:200,comp:{protein:1.5,fat:0.2,carbs:4.5,water:93,fiber:1},amino:["글루탐산"],vit:{C:22,A:42,lycopene:4100},compounds:["리코펜","글루탐산","시트르산"],flavor:{umami:55,sweet:15,salty:5,sour:25,bitter:5}},
  "콘통조림":{cat:"processed",en:"Canned Corn",emoji:"🥫",defaultG:100,comp:{protein:2.1,fat:1.3,carbs:18,water:77,fiber:2.4},amino:["글루탐산"],vit:{B1:0.06,B3:1.2,B5:0.69},compounds:["루테인","제아잔틴","전분"],flavor:{umami:12,sweet:20,salty:5,sour:3,bitter:3}},
  "콩통조림":{cat:"processed",en:"Canned Beans",emoji:"🥫",defaultG:100,comp:{protein:7,fat:0.5,carbs:16,water:74,fiber:5.5},amino:["라이신","류신"],vit:{folate:100,B1:0.14,iron:2.1},compounds:["이소플라본","사포닌","피트산"],flavor:{umami:15,sweet:10,salty:8,sour:3,bitter:5}},
  "베이크빈":{cat:"processed",en:"Baked Beans",emoji:"🥫",defaultG:150,comp:{protein:5,fat:0.3,carbs:21,water:70,fiber:4.6},amino:["라이신","이소류신"],vit:{B1:0.12,iron:1.5,folate:55},compounds:["이소플라본","리코펜","사포닌"],flavor:{umami:25,sweet:15,salty:12,sour:5,bitter:5}},
  "코른비프캔":{cat:"processed",en:"Canned Corned Beef",emoji:"🥫",defaultG:100,comp:{protein:26,fat:14,carbs:0,water:56,fiber:0},amino:["글루탐산","라이신"],vit:{B12:1.8,B3:3.2,zinc:4.9},compounds:["아질산염","NaCl","글루탐산"],flavor:{umami:55,sweet:5,salty:20,sour:3,bitter:5}},

  // ── 감미료/베이킹/기타 ────────────────────────────────────────────────────
  "연유(가당)":{cat:"processed",en:"Condensed Milk",emoji:"🫙",defaultG:30,comp:{protein:8.2,fat:9,carbs:56,water:26,fiber:0},amino:["카세인","유청단백질"],vit:{calcium:285,B2:0.43,A:155},compounds:["마이야르갈변","카르보닐화합물","유당"],flavor:{umami:10,sweet:55,salty:3,sour:5,bitter:3}},
  "그릭요거트":{cat:"processed",en:"Greek Yogurt",emoji:"🥛",defaultG:150,comp:{protein:10,fat:0.7,carbs:3.6,water:81,fiber:0},amino:["카세인","유청단백질"],vit:{B12:1.3,calcium:111,B2:0.27},compounds:["프로바이오틱","젖산","단백질"],flavor:{umami:10,sweet:8,salty:3,sour:18,bitter:3}},
  "메이플시럽":{cat:"processed",en:"Maple Syrup",emoji:"🍁",defaultG:20,comp:{protein:0,fat:0.1,carbs:67,water:32,fiber:0},amino:[],vit:{manganese:0.37,zinc:1.47,B2:0.07},compounds:["수크로스","아브시스산","케베콜","폴리페놀"],flavor:{umami:5,sweet:70,salty:0,sour:3,bitter:5}},
  "아가베시럽":{cat:"processed",en:"Agave Syrup",emoji:"🫙",defaultG:20,comp:{protein:0.1,fat:0.3,carbs:76,water:23,fiber:0},amino:[],vit:{calcium:1,iron:0.09},compounds:["프럭토스","이눌린","사포닌"],flavor:{umami:3,sweet:75,salty:0,sour:3,bitter:3}},
  "팜슈거(야자당)":{cat:"processed",en:"Palm Sugar",emoji:"🟤",defaultG:15,comp:{protein:0,fat:0,carbs:99,water:1,fiber:0},amino:[],vit:{potassium:1030,B3:0.5,iron:0.9},compounds:["수크로스","이눌린","카라멜"],flavor:{umami:5,sweet:70,salty:0,sour:3,bitter:8}},
  "초콜릿(다크70%)":{cat:"processed",en:"Dark Chocolate 70%",emoji:"🍫",defaultG:30,comp:{protein:5.5,fat:31,carbs:46,water:1.5,fiber:7},amino:["트립토판","페닐알라닌"],vit:{iron:11.9,magnesium:146,zinc:3.3},compounds:["테오브로민","플라바놀","카테킨","페닐에틸아민"],flavor:{umami:15,sweet:30,salty:3,sour:5,bitter:40}},
  "코코아파우더":{cat:"processed",en:"Cocoa Powder",emoji:"🟤",defaultG:10,comp:{protein:19.6,fat:13.7,carbs:58,water:3,fiber:33.2},amino:["트립토판"],vit:{iron:36,magnesium:499,B3:2.19},compounds:["테오브로민","플라바놀","카테킨"],flavor:{umami:10,sweet:5,salty:3,sour:8,bitter:50}},
  "피넛버터":{cat:"processed",en:"Peanut Butter",emoji:"🥜",defaultG:30,comp:{protein:22,fat:51,carbs:20,water:1.8,fiber:6},amino:["아르기닌","글루탐산"],vit:{B3:13,E:9.1,B6:0.35},compounds:["레스베라트롤","쿠마르산","올레산"],flavor:{umami:15,sweet:15,salty:5,sour:3,bitter:8}},
  "딸기잼":{cat:"processed",en:"Strawberry Jam",emoji:"🍓",defaultG:20,comp:{protein:0.4,fat:0,carbs:49,water:49,fiber:0.9},amino:[],vit:{C:10,K:2.1},compounds:["안토시아닌","펙틴","엘라그산"],flavor:{umami:3,sweet:60,salty:0,sour:15,bitter:3}},
  "선드라이드토마토":{cat:"processed",en:"Sun-Dried Tomato",emoji:"🍅",defaultG:20,comp:{protein:5.1,fat:0.8,carbs:55,water:14,fiber:12},amino:["글루탐산"],vit:{C:39.2,A:87,lycopene:9500,K:43},compounds:["리코펜","글루탐산","클로로겐산","베타카로틴"],flavor:{umami:75,sweet:25,salty:8,sour:25,bitter:5}},
  "팥앙금":{cat:"processed",en:"Red Bean Paste",emoji:"🟥",defaultG:50,comp:{protein:6.5,fat:0.2,carbs:52,water:40,fiber:2.8},amino:["라이신","류신"],vit:{B1:0.04,iron:1.2,potassium:165},compounds:["안토시아닌","사포닌","탄닌"],flavor:{umami:10,sweet:50,salty:3,sour:3,bitter:5}},
  "이스트(드라이)":{cat:"processed",en:"Dry Yeast",emoji:"🟡",defaultG:7,comp:{protein:40.4,fat:7.6,carbs:41,water:5,fiber:26.9},amino:["글루탐산","아스파르트산"],vit:{B1:10.99,B2:4.0,B3:40.2,folate:2340},compounds:["세포벽다당류","베타글루칸","이스트엑기스"],flavor:{umami:30,sweet:5,salty:3,sour:8,bitter:5}},
  "베이킹파우더":{cat:"processed",en:"Baking Powder",emoji:"⬜",defaultG:5,comp:{protein:0,fat:0,carbs:48,water:4,fiber:0},amino:[],vit:{calcium:5765},compounds:["탄산수소나트륨","인산칼슘","전분"],flavor:{umami:0,sweet:0,salty:0,sour:8,bitter:5}},
  "바닐라익스트랙":{cat:"processed",en:"Vanilla Extract",emoji:"🟤",defaultG:5,comp:{protein:0.1,fat:0.1,carbs:13,water:53,fiber:0},amino:[],vit:{},compounds:["바닐린","p-하이드록시벤즈알데하이드","쿠마린"],flavor:{umami:3,sweet:15,salty:0,sour:5,bitter:8}},
  "젤라틴":{cat:"processed",en:"Gelatin",emoji:"🫙",defaultG:10,comp:{protein:86,fat:0.1,carbs:0,water:13,fiber:0},amino:["글리신","프롤린","하이드록시프롤린"],vit:{},compounds:["콜라겐분해물","글리신","하이드록시프롤린"],flavor:{umami:10,sweet:3,salty:3,sour:3,bitter:3}},
  "라면스프(분말)":{cat:"processed",en:"Ramen Seasoning",emoji:"🟡",defaultG:8,comp:{protein:7.5,fat:4.5,carbs:55,water:4,fiber:1.5},amino:["글루탐산"],vit:{B1:0.1,B3:1.2,sodium:4800},compounds:["MSG","이노신산","구아닐산","캐러멜"],flavor:{umami:85,sweet:5,salty:40,sour:3,bitter:3}},

  // ── 소스/조미료 추가 ─────────────────────────────────────────────────────────
  "와사비페이스트":{cat:"sauce",en:"Wasabi Paste",emoji:"🟢",defaultG:5,comp:{protein:2.5,fat:0.4,carbs:20,water:74,fiber:3},amino:[],vit:{C:15,sodium:830},compounds:["알릴이소티오시아네이트","서양고추냉이추출","녹색소"],flavor:{umami:5,sweet:5,salty:15,sour:5,bitter:25}},
  "호이신소스":{cat:"sauce",en:"Hoisin Sauce",emoji:"🫙",defaultG:15,comp:{protein:2.8,fat:1.5,carbs:42,water:49,fiber:1.8},amino:["글루탐산"],vit:{B3:1.5,iron:1.8,sodium:980},compounds:["글루탐산","오향","캐러멜"],flavor:{umami:50,sweet:35,salty:22,sour:5,bitter:5}},
  "스위트칠리소스":{cat:"sauce",en:"Sweet Chili Sauce",emoji:"🌶️",defaultG:15,comp:{protein:0.5,fat:0,carbs:25,water:71,fiber:0.3},amino:[],vit:{C:5,sodium:600},compounds:["캡사이신","초산","마늘"],flavor:{umami:15,sweet:45,salty:18,sour:20,bitter:5}},
  "살사소스":{cat:"sauce",en:"Salsa",emoji:"🍅",defaultG:30,comp:{protein:1.2,fat:0.2,carbs:7,water:89,fiber:1.5},amino:[],vit:{C:12,A:45,sodium:590},compounds:["리코펜","캡사이신","시트르산","알리신"],flavor:{umami:20,sweet:10,salty:15,sour:20,bitter:5}},
  "아이올리":{cat:"sauce",en:"Aioli",emoji:"🫗",defaultG:20,comp:{protein:0.5,fat:45,carbs:1.5,water:51,fiber:0},amino:[],vit:{E:5.2,sodium:280},compounds:["알리신","올레산","레시틴"],flavor:{umami:10,sweet:3,salty:15,sour:8,bitter:5}},
  "타르타르소스":{cat:"sauce",en:"Tartar Sauce",emoji:"🫗",defaultG:20,comp:{protein:0.5,fat:30,carbs:5,water:62,fiber:0.3},amino:[],vit:{E:4.1,sodium:450},compounds:["초산","케이퍼","딜","레시틴"],flavor:{umami:8,sweet:8,salty:15,sour:25,bitter:5}},
  "랜치드레싱":{cat:"sauce",en:"Ranch Dressing",emoji:"🫗",defaultG:30,comp:{protein:0.8,fat:20,carbs:3,water:72,fiber:0},amino:[],vit:{B2:0.06,sodium:510},compounds:["버터밀크","딜","차이브","파슬리"],flavor:{umami:8,sweet:8,salty:18,sour:10,bitter:5}},
  "시저드레싱":{cat:"sauce",en:"Caesar Dressing",emoji:"🫗",defaultG:30,comp:{protein:1.5,fat:22,carbs:2,water:71,fiber:0},amino:["글루탐산"],vit:{B12:0.2,sodium:650},compounds:["안초비","파르메산","레몬즙","우스터셔"],flavor:{umami:35,sweet:3,salty:20,sour:12,bitter:5}},
  "짜지키":{cat:"sauce",en:"Tzatziki",emoji:"🫙",defaultG:50,comp:{protein:3.5,fat:2.5,carbs:4,water:88,fiber:0.5},amino:["카세인"],vit:{B12:0.4,calcium:90,sodium:250},compounds:["큐커비타신","딜","알리신","젖산"],flavor:{umami:10,sweet:5,salty:10,sour:15,bitter:5}},
  "구아카몰레":{cat:"sauce",en:"Guacamole",emoji:"🥑",defaultG:50,comp:{protein:2,fat:11,carbs:6,water:79,fiber:4},amino:[],vit:{C:10,K:21,B6:0.28,potassium:485},compounds:["올레산","글루타티온","루테인","베타시토스테롤"],flavor:{umami:8,sweet:5,salty:8,sour:10,bitter:8}},
  "페스토소스":{cat:"sauce",en:"Pesto",emoji:"🟢",defaultG:30,comp:{protein:4.8,fat:22,carbs:3,water:66,fiber:1},amino:["글루탐산"],vit:{K:92,A:54,sodium:450},compounds:["유게놀","리나롤","올레산","파르메산"],flavor:{umami:35,sweet:8,salty:18,sour:5,bitter:12}},
  "치폴레소스":{cat:"sauce",en:"Chipotle Sauce",emoji:"🌶️",defaultG:15,comp:{protein:1.2,fat:1,carbs:8,water:86,fiber:1},amino:[],vit:{A:120,C:15,sodium:540},compounds:["캡사이신","훈제화합물","리코펜"],flavor:{umami:25,sweet:10,salty:15,sour:12,bitter:8}},
  "석류당밀":{cat:"sauce",en:"Pomegranate Molasses",emoji:"🫙",defaultG:15,comp:{protein:0.4,fat:0.1,carbs:55,water:40,fiber:0},amino:[],vit:{C:5,potassium:220},compounds:["안토시아닌","엘라그산","탄닌","유기산"],flavor:{umami:8,sweet:20,salty:0,sour:50,bitter:10}},
  "할라피뇨소스":{cat:"sauce",en:"Jalapeno Sauce",emoji:"🌶️",defaultG:20,comp:{protein:1,fat:0.3,carbs:5,water:90,fiber:1.2},amino:[],vit:{C:40,A:18,sodium:480},compounds:["캡사이신","시트르산","큐커비타신"],flavor:{umami:10,sweet:8,salty:12,sour:18,bitter:8}},
  "참깨드레싱":{cat:"sauce",en:"Sesame Dressing",emoji:"🫗",defaultG:20,comp:{protein:2.1,fat:12,carbs:8,water:74,fiber:0.5},amino:["메티오닌"],vit:{calcium:80,sodium:680},compounds:["세사민","세사몰린","리놀레산"],flavor:{umami:25,sweet:15,salty:18,sour:8,bitter:5}},
  "땅콩소스":{cat:"sauce",en:"Peanut Sauce",emoji:"🥜",defaultG:30,comp:{protein:7,fat:14,carbs:10,water:65,fiber:1.5},amino:["아르기닌","글루탐산"],vit:{B3:5.2,sodium:650},compounds:["올레산","레스베라트롤","쿠마르산"],flavor:{umami:25,sweet:15,salty:15,sour:8,bitter:8}},
  "그린카레페이스트":{cat:"sauce",en:"Green Curry Paste",emoji:"🟢",defaultG:20,comp:{protein:3,fat:4,carbs:12,water:75,fiber:2},amino:[],vit:{A:180,C:25,sodium:1200},compounds:["캡사이신","레몬그라스","갈랑갈","코코넛"],flavor:{umami:20,sweet:5,salty:22,sour:10,bitter:15}},
  "레드카레페이스트":{cat:"sauce",en:"Red Curry Paste",emoji:"🔴",defaultG:20,comp:{protein:3,fat:4.5,carbs:12,water:74,fiber:2},amino:[],vit:{A:250,C:20,sodium:1350},compounds:["캡사이신","강황","레몬그라스","새우페이스트"],flavor:{umami:22,sweet:5,salty:25,sour:8,bitter:12}},

  // ── 허브/향신료 추가 ─────────────────────────────────────────────────────────
  "바닐라빈":{cat:"herb",en:"Vanilla Bean",emoji:"🌿",defaultG:2,comp:{protein:0.1,fat:0.1,carbs:12,water:36,fiber:0},amino:[],vit:{B2:0.09,calcium:11},compounds:["바닐린","4-하이드록시벤즈알데하이드","쿠마린","아니스알데하이드"],flavor:{umami:3,sweet:60,salty:0,sour:3,bitter:8}},
  "라임잎(카피르)":{cat:"herb",en:"Kaffir Lime Leaf",emoji:"🌿",defaultG:2,comp:{protein:1.2,fat:0.5,carbs:9,water:86,fiber:3},amino:[],vit:{C:18,A:45},compounds:["리모넨","시트로넬롤","리날룰","피넨"],flavor:{umami:3,sweet:5,salty:0,sour:15,bitter:15}},
  "차빌":{cat:"herb",en:"Chervil",emoji:"🌿",defaultG:3,comp:{protein:23,fat:3.9,carbs:50,water:8,fiber:11.3},amino:[],vit:{A:565,C:50,iron:31.9},compounds:["에스트라골","메틸차비콜","아네톨"],flavor:{umami:8,sweet:10,salty:0,sour:5,bitter:10}},
  "아사페티다(힝)":{cat:"herb",en:"Asafoetida",emoji:"🟡",defaultG:1,comp:{protein:17.7,fat:10,carbs:68,water:3,fiber:4.1},amino:[],vit:{calcium:691,iron:23.4},compounds:["디설파이드","페룰릭산","움벨리페론"],flavor:{umami:25,sweet:3,salty:0,sour:5,bitter:20}},
  "차이향신료믹스":{cat:"herb",en:"Chai Spice Mix",emoji:"🟤",defaultG:3,comp:{protein:11,fat:5,carbs:60,water:9,fiber:15},amino:[],vit:{manganese:12,calcium:400,iron:10},compounds:["시나밀알데하이드","진저롤","카르다몬","클로브"],flavor:{umami:5,sweet:15,salty:0,sour:3,bitter:20}},
  "스모크파프리카":{cat:"herb",en:"Smoked Paprika",emoji:"🟠",defaultG:3,comp:{protein:14,fat:12,carbs:54,water:10,fiber:35},amino:[],vit:{A:2463,C:18,B6:2.14},compounds:["캡산틴","베타카로틴","훈제피라진","과이아콜"],flavor:{umami:12,sweet:20,salty:5,sour:3,bitter:10}},
  "에스프레소소금":{cat:"herb",en:"Espresso Salt",emoji:"⚫",defaultG:2,comp:{protein:0,fat:0,carbs:0,water:0,fiber:0},amino:[],vit:{sodium:38000},compounds:["염화나트륨","클로로겐산","카페인"],flavor:{umami:5,sweet:0,salty:100,sour:5,bitter:10}},
  "섬머사보리":{cat:"herb",en:"Summer Savory",emoji:"🌿",defaultG:2,comp:{protein:6.7,fat:5.9,carbs:69,water:8,fiber:45.7},amino:[],vit:{K:378,iron:37.9},compounds:["카르바크롤","티몰","알파-테르피넨"],flavor:{umami:8,sweet:5,salty:0,sour:5,bitter:25}},
  "블랙페퍼(통)":{cat:"herb",en:"Whole Black Pepper",emoji:"⚫",defaultG:2,comp:{protein:10.4,fat:3.3,carbs:64,water:12,fiber:25},amino:[],vit:{K:163,C:21},compounds:["피페린","카리오필렌","사비닌"],flavor:{umami:10,sweet:5,salty:0,sour:3,bitter:30}},
  "화이트페퍼":{cat:"herb",en:"White Pepper",emoji:"⬜",defaultG:2,comp:{protein:11,fat:2.1,carbs:69,water:11,fiber:26.2},amino:[],vit:{K:136,B6:0.09},compounds:["피페린","리모넨","미르센"],flavor:{umami:8,sweet:5,salty:0,sour:5,bitter:25}},
  "쓰촨페퍼":{cat:"herb",en:"Sichuan Pepper",emoji:"🟠",defaultG:2,comp:{protein:6.5,fat:8.9,carbs:70,water:8,fiber:22},amino:[],vit:{A:48,iron:10},compounds:["산쇼올","하이드록시알파산초올","리모넨","게라니올"],flavor:{umami:5,sweet:5,salty:0,sour:8,bitter:15}},
  "롱페퍼":{cat:"herb",en:"Long Pepper",emoji:"🟤",defaultG:2,comp:{protein:14,fat:8,carbs:68,water:8,fiber:17},amino:[],vit:{iron:9.2,calcium:45},compounds:["피페린","피페린","실바틴","필랄틴"],flavor:{umami:5,sweet:8,salty:0,sour:3,bitter:20}},
  "암추르(망고파우더)":{cat:"herb",en:"Amchur",emoji:"🟡",defaultG:3,comp:{protein:2.1,fat:0.5,carbs:85,water:5,fiber:2.5},amino:[],vit:{C:5,iron:1.5},compounds:["시트르산","갈산","망고이페린"],flavor:{umami:3,sweet:10,salty:0,sour:55,bitter:10}},
  "수막(수막가루)":{cat:"herb",en:"Sumac",emoji:"🟤",defaultG:3,comp:{protein:3,fat:1.1,carbs:70,water:10,fiber:9},amino:[],vit:{C:10,iron:2.9},compounds:["안토시아닌","탄닌","말산","시트르산"],flavor:{umami:5,sweet:5,salty:0,sour:45,bitter:15}},
  "에파조테":{cat:"herb",en:"Epazote",emoji:"🌿",defaultG:3,comp:{protein:3.3,fat:0.5,carbs:8,water:85,fiber:3.8},amino:[],vit:{A:576,C:3.6,B2:0.16},compounds:["아스카리돌","리모넨","p-시멘"],flavor:{umami:8,sweet:3,salty:0,sour:5,bitter:25}},
  "피클링스파이스":{cat:"herb",en:"Pickling Spice",emoji:"🟤",defaultG:5,comp:{protein:11,fat:9,carbs:63,water:9,fiber:20},amino:[],vit:{iron:18,manganese:5},compounds:["초산","머스타드씨","딜씨","클로브"],flavor:{umami:8,sweet:8,salty:5,sour:15,bitter:15}},

  // ── 가공식품 추가 ─────────────────────────────────────────────────────────────
  "세이탄":{cat:"processed",en:"Seitan",emoji:"🌾",defaultG:100,comp:{protein:25,fat:1.9,carbs:14,water:57,fiber:0.6},amino:["글루탐산","글루타민"],vit:{B1:0.16,B3:3.5,iron:1.5},compounds:["글루텐","글리아딘","글루테닌"],flavor:{umami:40,sweet:5,salty:8,sour:3,bitter:5}},
  "템페":{cat:"processed",en:"Tempeh",emoji:"🟤",defaultG:100,comp:{protein:19,fat:11,carbs:9,water:59,fiber:0},amino:["이소류신","류신","발린","라이신"],vit:{B12:0.1,B2:0.36,manganese:1.3},compounds:["이소플라본","프로바이오틱","피트산감소"],flavor:{umami:35,sweet:5,salty:5,sour:8,bitter:15}},
  "파스타(건)":{cat:"processed",en:"Dried Pasta",emoji:"🍝",defaultG:100,comp:{protein:13,fat:1.5,carbs:75,water:9,fiber:3.2},amino:["글루탐산","글루타민"],vit:{B1:0.09,B3:1.7,folate:18},compounds:["세몰리나전분","글루텐"],flavor:{umami:5,sweet:5,salty:0,sour:0,bitter:0}},
  "스파게티(건)":{cat:"processed",en:"Dried Spaghetti",emoji:"🍝",defaultG:100,comp:{protein:13.1,fat:1.3,carbs:74,water:9,fiber:2.9},amino:["글루탐산","글루타민"],vit:{B1:0.87,B3:4.6,folate:20},compounds:["세몰리나","글루텐","전분"],flavor:{umami:5,sweet:5,salty:0,sour:0,bitter:0}},
  "쌀국수(건)":{cat:"processed",en:"Dried Rice Noodles",emoji:"🍜",defaultG:80,comp:{protein:2.4,fat:0.6,carbs:82,water:10,fiber:1.6},amino:[],vit:{B1:0.02,B3:0.4},compounds:["아밀로스","아밀로펙틴"],flavor:{umami:3,sweet:5,salty:0,sour:0,bitter:0}},
  "녹두당면":{cat:"processed",en:"Mung Bean Noodles",emoji:"🍜",defaultG:60,comp:{protein:0.5,fat:0.1,carbs:87,water:11,fiber:0.5},amino:[],vit:{B1:0.02},compounds:["아밀로스","전분"],flavor:{umami:3,sweet:3,salty:0,sour:0,bitter:0}},
  "라이스페이퍼":{cat:"processed",en:"Rice Paper",emoji:"🌾",defaultG:25,comp:{protein:0.4,fat:0.1,carbs:84,water:14,fiber:0.3},amino:[],vit:{},compounds:["쌀전분","타피오카전분"],flavor:{umami:0,sweet:3,salty:0,sour:0,bitter:0}},
  "두부피(유바)":{cat:"processed",en:"Yuba",emoji:"🟡",defaultG:30,comp:{protein:25,fat:15,carbs:4,water:55,fiber:0.5},amino:["이소류신","류신"],vit:{calcium:265,B2:0.24,iron:4.1},compounds:["이소플라본","레시틴","사포닌"],flavor:{umami:35,sweet:5,salty:3,sour:3,bitter:5}},
  "오트밀":{cat:"processed",en:"Oatmeal",emoji:"🌾",defaultG:80,comp:{protein:13.2,fat:6.9,carbs:67,water:9,fiber:10.1},amino:["글루탐산","알라닌"],vit:{B1:0.76,B5:1.35,manganese:3.6},compounds:["베타글루칸","아베난트라마이드","피트산"],flavor:{umami:8,sweet:10,salty:0,sour:3,bitter:5}},
  "그래놀라":{cat:"processed",en:"Granola",emoji:"🌾",defaultG:60,comp:{protein:8,fat:14,carbs:66,water:4,fiber:5.9},amino:["글루탐산"],vit:{B1:0.23,iron:2.6,manganese:2.2},compounds:["베타글루칸","꿀","캐러멜"],flavor:{umami:5,sweet:30,salty:5,sour:3,bitter:5}},
  "팝콘":{cat:"processed",en:"Popcorn",emoji:"🍿",defaultG:30,comp:{protein:3.7,fat:4.5,carbs:78,water:4,fiber:14.5},amino:["글루탐산"],vit:{B3:1.8,B6:0.16,manganese:0.5},compounds:["피라진","푸르푸랄"],flavor:{umami:10,sweet:5,salty:5,sour:3,bitter:5}},
  "빵가루(판코)":{cat:"processed",en:"Panko",emoji:"🟡",defaultG:30,comp:{protein:11,fat:2.1,carbs:78,water:6,fiber:3.4},amino:["글루탐산"],vit:{B1:0.4,B3:4.6},compounds:["글루텐","전분","덱스트린"],flavor:{umami:8,sweet:8,salty:3,sour:3,bitter:5}},
  "토르티야(밀)":{cat:"processed",en:"Flour Tortilla",emoji:"🫓",defaultG:80,comp:{protein:8.3,fat:6,carbs:54,water:30,fiber:3.5},amino:["글루탐산"],vit:{B1:0.36,B3:3.5,calcium:100},compounds:["글루텐","전분"],flavor:{umami:5,sweet:5,salty:5,sour:3,bitter:3}},
  "타피오카전분":{cat:"processed",en:"Tapioca Starch",emoji:"⬜",defaultG:20,comp:{protein:0.2,fat:0.1,carbs:89,water:10,fiber:0.9},amino:[],vit:{calcium:20},compounds:["아밀로펙틴","전분"],flavor:{umami:0,sweet:3,salty:0,sour:0,bitter:0}},
  "크림치즈스프레드":{cat:"processed",en:"Cream Cheese Spread",emoji:"🧀",defaultG:30,comp:{protein:6.2,fat:29,carbs:3.5,water:54,fiber:0},amino:["카세인","유청"],vit:{A:305,B2:0.16,calcium:98},compounds:["젖산","디아세틸","카세인"],flavor:{umami:10,sweet:5,salty:8,sour:8,bitter:3}},
  "누텔라(초콜릿헤이즐넛잼)":{cat:"processed",en:"Nutella",emoji:"🍫",defaultG:30,comp:{protein:6.3,fat:31,carbs:57,water:3,fiber:3.4},amino:["트립토판"],vit:{B1:0.21,B2:0.12,calcium:45},compounds:["테오브로민","플라보노이드","올레산"],flavor:{umami:8,sweet:60,salty:3,sour:3,bitter:12}},
  "피시케이크(오뎅)":{cat:"processed",en:"Fish Cake",emoji:"🟡",defaultG:100,comp:{protein:12.5,fat:5,carbs:16,water:64,fiber:0.5},amino:["글루탐산","알라닌"],vit:{B12:0.8,calcium:65},compounds:["전분","글루탐산","소르비톨"],flavor:{umami:42,sweet:10,salty:16,sour:3,bitter:3}},
  "미트볼(가공)":{cat:"processed",en:"Meatball",emoji:"🟤",defaultG:80,comp:{protein:14,fat:12,carbs:8,water:63,fiber:0.5},amino:["글루탐산","라이신"],vit:{B12:1.2,B3:3.5,iron:1.8},compounds:["글루탐산","아질산염","전분"],flavor:{umami:45,sweet:8,salty:15,sour:3,bitter:3}},
  "로스트비프(슬라이스)":{cat:"processed",en:"Roast Beef",emoji:"🥩",defaultG:60,comp:{protein:28,fat:8,carbs:1,water:61,fiber:0},amino:["류신","발린","라이신"],vit:{B12:2.5,B3:5.8,zinc:5.1},compounds:["멜라노이딘","크레아틴","이노신산"],flavor:{umami:65,sweet:5,salty:15,sour:3,bitter:5}},

  // ── 음료 추가 ────────────────────────────────────────────────────────────────
  "아메리카노":{cat:"beverage",en:"Americano",emoji:"☕",defaultG:300,comp:{protein:0.2,fat:0,carbs:0,water:99.5,fiber:0},amino:[],vit:{B2:0.01,B3:0.3,potassium:90},compounds:["카페인","클로로겐산","트리고넬린","멜라노이딘"],flavor:{umami:8,sweet:0,salty:0,sour:15,bitter:40}},
  "카페라테":{cat:"beverage",en:"Cafe Latte",emoji:"☕",defaultG:300,comp:{protein:3.4,fat:3.5,carbs:5,water:88,fiber:0},amino:["카세인"],vit:{B2:0.17,calcium:113,potassium:155},compounds:["카페인","클로로겐산","유지방","카세인"],flavor:{umami:10,sweet:15,salty:3,sour:8,bitter:18}},
  "카푸치노":{cat:"beverage",en:"Cappuccino",emoji:"☕",defaultG:200,comp:{protein:3.3,fat:3.2,carbs:4.8,water:88,fiber:0},amino:["카세인"],vit:{B2:0.15,calcium:105},compounds:["카페인","클로로겐산","유지방","밀크폼"],flavor:{umami:8,sweet:12,salty:3,sour:8,bitter:22}},
  "말차라떼":{cat:"beverage",en:"Matcha Latte",emoji:"🍵",defaultG:250,comp:{protein:2.5,fat:2.5,carbs:8,water:87,fiber:0},amino:["테아닌","카세인"],vit:{K:180,A:60,calcium:90},compounds:["EGCG","테아닌","카페인","카세인","엽록소"],flavor:{umami:20,sweet:15,salty:0,sour:3,bitter:20}},
  "버블티(타피오카)":{cat:"beverage",en:"Bubble Tea",emoji:"🧋",defaultG:400,comp:{protein:1.5,fat:2,carbs:35,water:60,fiber:0.5},amino:[],vit:{calcium:60},compounds:["타피오카전분","홍차추출","카페인","캐러멜"],flavor:{umami:5,sweet:50,salty:0,sour:5,bitter:8}},
  "탄산수":{cat:"beverage",en:"Sparkling Water",emoji:"💧",defaultG:300,comp:{protein:0,fat:0,carbs:0,water:100,fiber:0},amino:[],vit:{},compounds:["이산화탄소","미네랄"],flavor:{umami:0,sweet:0,salty:3,sour:5,bitter:3}},
  "콜라":{cat:"beverage",en:"Cola",emoji:"🥤",defaultG:330,comp:{protein:0,fat:0,carbs:11,water:89,fiber:0},amino:[],vit:{},compounds:["카페인","이산화탄소","인산","카라멜"],flavor:{umami:0,sweet:45,salty:0,sour:15,bitter:12}},
  "사이다(탄산음료)":{cat:"beverage",en:"Lemon-Lime Soda",emoji:"🥤",defaultG:330,comp:{protein:0,fat:0,carbs:9,water:91,fiber:0},amino:[],vit:{},compounds:["이산화탄소","구연산","설탕"],flavor:{umami:0,sweet:40,salty:0,sour:10,bitter:3}},
  "에너지드링크":{cat:"beverage",en:"Energy Drink",emoji:"⚡",defaultG:250,comp:{protein:0.5,fat:0,carbs:11,water:87,fiber:0},amino:["타우린"],vit:{B3:22,B6:2.1,B12:6},compounds:["카페인","타우린","과라나","B비타민"],flavor:{umami:5,sweet:35,salty:5,sour:15,bitter:8}},
  "국화차":{cat:"beverage",en:"Chrysanthemum Tea",emoji:"🌸",defaultG:200,comp:{protein:0.1,fat:0,carbs:0.5,water:99.5,fiber:0},amino:[],vit:{A:16},compounds:["루테올린","아피게닌","크리산테믹산","보르네올"],flavor:{umami:3,sweet:8,salty:0,sour:5,bitter:10}},
  "감잎차":{cat:"beverage",en:"Persimmon Leaf Tea",emoji:"🍵",defaultG:200,comp:{protein:0.1,fat:0,carbs:1,water:99,fiber:0},amino:["테아닌"],vit:{C:550,K:300},compounds:["플라보노이드","탄닌","비타민C"],flavor:{umami:5,sweet:5,salty:0,sour:5,bitter:15}},
  "둥굴레차":{cat:"beverage",en:"Solomons Seal Tea",emoji:"🫖",defaultG:200,comp:{protein:0.3,fat:0,carbs:2,water:98,fiber:0},amino:[],vit:{},compounds:["코나발라린","폴리갈락투로나아제"],flavor:{umami:8,sweet:15,salty:0,sour:3,bitter:8}},
  "진저에일":{cat:"beverage",en:"Ginger Ale",emoji:"🟡",defaultG:330,comp:{protein:0,fat:0,carbs:9,water:90,fiber:0},amino:[],vit:{},compounds:["진저롤","이산화탄소","설탕"],flavor:{umami:3,sweet:35,salty:0,sour:5,bitter:5}},
  "스파클링와인":{cat:"beverage",en:"Sparkling Wine",emoji:"🥂",defaultG:150,comp:{protein:0.3,fat:0,carbs:3.8,water:88,fiber:0},amino:[],vit:{B6:0.03},compounds:["에탄올","이산화탄소","타르타르산","유기산"],flavor:{umami:5,sweet:10,salty:0,sour:25,bitter:8}},
  "라즈베리레모네이드":{cat:"beverage",en:"Raspberry Lemonade",emoji:"🍋",defaultG:330,comp:{protein:0.3,fat:0,carbs:12,water:87,fiber:0.3},amino:[],vit:{C:15,B1:0.03},compounds:["시트르산","안토시아닌","플라보노이드"],flavor:{umami:3,sweet:35,salty:0,sour:25,bitter:5}},
  "로즈힙티":{cat:"beverage",en:"Rosehip Tea",emoji:"🌹",defaultG:200,comp:{protein:0,fat:0,carbs:1.5,water:98.5,fiber:0},amino:[],vit:{C:426,A:15},compounds:["비타민C","루틴","베타카로틴","플라보노이드"],flavor:{umami:3,sweet:8,salty:0,sour:20,bitter:8}},
  "페퍼민트차":{cat:"beverage",en:"Peppermint Tea",emoji:"🌿",defaultG:200,comp:{protein:0,fat:0,carbs:0.5,water:99.5,fiber:0},amino:[],vit:{A:28,folate:5},compounds:["멘톨","멘톤","멘틸아세테이트"],flavor:{umami:3,sweet:5,salty:0,sour:3,bitter:8}},
  "아이스티(홍차)":{cat:"beverage",en:"Iced Tea",emoji:"🧊",defaultG:350,comp:{protein:0,fat:0,carbs:8,water:92,fiber:0},amino:[],vit:{K:0.3,potassium:25},compounds:["테아플라빈","카페인","구연산","설탕"],flavor:{umami:3,sweet:20,salty:0,sour:10,bitter:12}},
};

// ── Quantitative Scientific Data Patch (USDA FoodData Central SR28 / Peer-reviewed sources) ──
// glu: glutamic acid g/100g (bound+free) | imp: IMP mg/100g (Yamaguchi & Ninomiya 1998)
// gmp: GMP mg/100g | allicin: mg/100g fresh (Miron et al. 2000) | capsaicin: mg/100g
// lycopene: μg/100g | asparagine: g/100g | lecithin: mg/100g | free_glu: free glutamate mg/100g
const DB_SCI = {
  // ── Meats ──────────────────────────────────────────────────────────────────
  "소고기":       {glu:3.04, imp:450},
  "돼지고기":     {glu:2.78, imp:430},
  "닭가슴살":     {glu:3.28, imp:350},
  "닭다리":       {glu:2.80, imp:310},
  "양고기":       {glu:2.90, imp:380},
  "오리고기":     {glu:2.64, imp:290},
  "베이컨":       {glu:4.23, imp:180},
  "소시지":       {glu:1.80, imp:120},
  "햄":           {glu:1.95, imp:150},
  // ── Seafood ────────────────────────────────────────────────────────────────
  "연어":         {glu:2.81, imp:280},
  "참치":         {glu:3.21, imp:450},
  "새우":         {glu:1.74, imp:250, gmp:40},
  "고등어":       {glu:2.68, imp:380},
  "오징어":       {glu:1.38, imp:180, gmp:35},
  "조개":         {glu:1.02, imp:30,  gmp:150},
  "게":           {glu:1.50, imp:60,  gmp:80},
  "문어":         {glu:1.72, imp:25,  gmp:60},
  "꽁치":         {glu:2.54, imp:370},
  "대구":         {glu:2.21, imp:210},
  "광어":         {glu:2.48, imp:245},
  "멸치":         {glu:3.24, imp:380},
  "전복":         {glu:1.45, imp:30,  gmp:20},
  // ── Vegetables ────────────────────────────────────────────────────────────
  "양파":         {glu:0.05, allicin:0.2,  quercetin:38.6},
  "마늘":         {glu:0.81, allicin:3.7,  alliin:6.5, quercetin:47.2},
  "감자":         {glu:0.42, asparagine:0.16, chlorogenic:130},
  "토마토":       {glu:0.26, lycopene:2573},
  "고추":         {glu:0.09, capsaicin:0.15, lycopene:48},
  "브로콜리":     {glu:0.17, sulforaphane:0.45},
  "당근":         {glu:0.09, betacarotene:8285},
  "시금치":       {glu:0.19, lutein:12198, oxalate:970},
  "양배추":       {glu:0.12, sulforaphane:0.30},
  "오이":         {glu:0.07},
  "호박":         {glu:0.08, betacarotene:426},
  "가지":         {glu:0.09},
  "셀러리":       {glu:0.10},
  "아스파라거스": {glu:0.17, asparagine:0.38},
  "무":           {glu:0.05, glucosinolate:35},
  "콩나물":       {glu:0.10},
  "부추":         {glu:0.14, allicin:0.5},
  "파":           {glu:0.12, allicin:0.3,  quercetin:32},
  "미나리":       {glu:0.12},
  "피망":         {glu:0.08, betacarotene:208},
  "비트":         {glu:0.16, betaine:127},
  "케일":         {glu:0.21, sulforaphane:0.65, betacarotene:478},
  "고구마":       {glu:0.13, betacarotene:961},
  "옥수수":       {glu:0.27, lutein:202},
  // ── Fruits ────────────────────────────────────────────────────────────────
  "사과":         {glu:0.04, quercetin:4.4,  chlorogenic:28},
  "바나나":       {glu:0.09},
  "딸기":         {glu:0.05, ellagic:15,     anthocyanin:20},
  "블루베리":     {glu:0.07, anthocyanin:165},
  "아보카도":     {glu:0.22, glutathione:27},
  "포도":         {glu:0.07, resveratrol:0.36, tannin:180},
  "수박":         {glu:0.06, lycopene:4532},
  "키위":         {glu:0.08, actinidin:30},
  "레몬":         {glu:0.05, limonene:500,   citric:5700},
  "오렌지":       {glu:0.07, hesperidin:71},
  "자몽":         {glu:0.06, naringin:85},
  "망고":         {glu:0.07, mangiferin:28},
  "파인애플":     {glu:0.06, bromelain_iu:500},
  "복숭아":       {glu:0.07, chlorogenic:40},
  "배":           {glu:0.05, arbutin:17},
  "감":           {glu:0.06, tannin:200},
  // ── Grains ────────────────────────────────────────────────────────────────
  "밀가루":       {glu:3.64, asparagine:0.34},
  "파스타":       {glu:4.39},
  "귀리":         {glu:2.74, betaglucan_g:4.5},
  "메밀":         {glu:2.45, rutin:30},
  "현미":         {glu:1.37, gammaoryzanol:45},
  "쌀":           {glu:1.33},
  "식빵":         {glu:3.33, asparagine:0.28},
  "우동면":       {glu:2.97},
  "라면(건면)":   {glu:3.00},
  // ── Dairy ─────────────────────────────────────────────────────────────────
  "우유":         {glu:0.68, lecithin:100},
  "치즈":         {glu:4.65, free_glu:800},
  "크림":         {glu:0.52},
  "요거트":       {glu:0.73},
  "생크림":       {glu:0.45},
  "모짜렐라":     {glu:3.89, free_glu:400},
  "파르메산":     {glu:9.21, free_glu:1200},
  // ── Eggs ──────────────────────────────────────────────────────────────────
  "계란":         {glu:1.60, lecithin:4000},
  "메추리알":     {glu:1.58, lecithin:3800},
  "오리알":       {glu:1.62, lecithin:3500},
  // ── Nuts ──────────────────────────────────────────────────────────────────
  "아몬드":       {glu:5.47, arginine:2.47},
  "호두":         {glu:2.80, omega3_g:9.08, arginine:2.27},
  "땅콩":         {glu:6.12, arginine:2.67},
  "캐슈넛":       {glu:3.97, arginine:2.12},
  "잣":           {glu:4.04, arginine:2.58},
  "참깨":         {glu:2.87, sesamin:3300,  sesamol:1300},
  "들깨":         {glu:2.75, omega3_g:45},
  "해바라기씨":   {glu:5.48, tocopherol_ug:41100},
  // ── Mushrooms ─────────────────────────────────────────────────────────────
  "표고버섯":     {glu:0.67, gmp:150, ergothioneine:4700},
  "양송이":       {glu:0.42, gmp:40,  ergothioneine:500},
  "팽이버섯":     {glu:0.35, gmp:60,  ergothioneine:300},
  "새송이":       {glu:0.55, gmp:80,  ergothioneine:1200},
  "목이버섯":     {glu:1.10, gmp:35},
  "느타리":       {glu:0.45, gmp:70,  ergothioneine:700},
  // ── Legumes ───────────────────────────────────────────────────────────────
  "검은콩":       {glu:0.71, isoflavone:13000},
  "렌틸콩":       {glu:0.98},
  "병아리콩":     {glu:1.04},
  "팥":           {glu:0.82},
  "완두콩":       {glu:0.34},
  "된장(식재료)": {glu:0.87, free_glu:200, gmp:25},
  "두부":         {glu:0.73, isoflavone:27000, genistein:17000},
  // ── Herbs & Spices ────────────────────────────────────────────────────────
  "바질":         {glu:0.43, linalool:50},
  "로즈마리":     {glu:0.61, carnosol:3300,  ursolic:7000},
  "타임":         {glu:0.72, thymol:1200,    carvacrol:3000},
  "민트":         {glu:0.45, menthol:7000},
  "고수(실란트로)":{glu:0.14, linalool:500},
  "파슬리":       {glu:0.30, apiol:300},
  "생강":         {glu:0.16, gingerol:16000, shogaol:8000},
  "후추":         {glu:1.12, piperine:58000},
  "시나몬":       {glu:0.46, cinnamaldehyde:14000},
  "카레가루":     {glu:1.23, curcumin:3200},
  "강황":         {glu:0.87, curcumin:54000},
  "와사비":       {glu:0.24, AITC:11000},
  "산초":         {glu:0.56},
  // ── Condiments ────────────────────────────────────────────────────────────
  "소금":         {glu:0},
  "식초":         {glu:0.05, acetic:5000},
  "고추장":       {glu:0.89, free_glu:100, capsaicin:1200},
  "간장":         {glu:0.81, free_glu:1500},
  "설탕":         {glu:0},
  "굴소스":       {glu:0.64, free_glu:450},
  "미림":         {glu:0.10},
  "물엿":         {glu:0},
  "케첩":         {glu:0.33, lycopene:6000},
  "마요네즈":     {glu:0.10, lecithin:2000},
  "머스타드":     {glu:0.50, AITC:800},
  "꿀":           {glu:0},
  // ── Oils ──────────────────────────────────────────────────────────────────
  "올리브 오일":  {oleic_g:73,  polyphenol:300,  tocopherol_ug:14350},
  "올리브오일":   {oleic_g:73,  polyphenol:300,  tocopherol_ug:14350},
  "참기름":       {sesamin:3800, sesamol:1300},
  "들기름":       {omega3_g:53},
  "포도씨유":     {linoleic_g:69, polyphenol:350},
  "코코넛오일":   {lauric_g:47},
  "카놀라유":     {oleic_g:63, omega3_g:9.3},
  "버터":         {butyric_g:3.6, SFA_g:51, lecithin:300, diacetyl:2300},
  // ── New Meat ──────────────────────────────────────────────────────────────
  "소고기 등심":  {glu:3.10, imp:440},
  "소고기 안심":  {glu:2.95, imp:420},
  "삼겹살":       {glu:2.85, imp:400},
  "목살(돼지)":   {glu:2.90, imp:410},
  "닭날개":       {glu:2.80, imp:330},
  "닭 안심":      {glu:3.00, imp:320},
  "비프 패티":    {glu:3.00, imp:430},
  "칠면조":       {glu:2.90, imp:300},
  "곱창":         {glu:1.50, imp:180},
  "간(소고기)":   {glu:2.90, imp:220},
  // ── New Seafood ───────────────────────────────────────────────────────────
  "굴":           {glu:1.32, imp:20,  gmp:155},
  "가리비":       {glu:1.45, imp:25,  gmp:180},
  "홍합":         {glu:1.19, imp:30,  gmp:90},
  "낙지":         {glu:1.58, imp:20,  gmp:55},
  "성게":         {glu:3.24, imp:15,  gmp:180},
  "다시마":       {glu:1.84, free_glu:1600},
  "김":           {glu:1.76, free_glu:1300},
  "황태":         {glu:3.10, imp:350},
  "건새우":       {glu:3.05, imp:280},
  "꼬막":         {glu:1.62, imp:30,  gmp:60},
  // ── New Vegetables ────────────────────────────────────────────────────────
  "연근":         {glu:0.08, tannin:150},
  "우엉":         {glu:0.10, inulin_g:18},
  "대파":         {glu:0.13, allicin:0.3, quercetin:28},
  "쪽파":         {glu:0.14, allicin:0.4},
  "청양고추":     {glu:0.10, capsaicin:1.4},
  "두릅":         {glu:0.15, saponin:280},
  "취나물":       {glu:0.16, chlorophyll:850},
  "고사리":       {glu:0.12},
  "도라지":       {glu:0.14, saponin:600},
  "쑥갓":         {glu:0.17},
  "청경채":       {glu:0.14, glucosinolate:22},
  "루꼴라":       {glu:0.18, glucosinolate:55, AITC:800},
  "깻잎":         {glu:0.20, rosmarinic:1500},
  "죽순":         {glu:0.29},
  "방울토마토":   {glu:0.30, lycopene:2800},
  "단호박":       {glu:0.09, betacarotene:532},
  "브뤼셀새싹":  {glu:0.20, sulforaphane:0.85},
  "적양배추":     {glu:0.13, anthocyanin:215},
  // ── New Fruits ────────────────────────────────────────────────────────────
  "체리":         {glu:0.06, anthocyanin:82, melatonin:0.13},
  "자두":         {glu:0.05, chlorogenic:45},
  "석류":         {glu:0.07, ellagic:25, punicalagin:620},
  "유자":         {glu:0.05, limonene:480, hesperidin:180},
  "파파야":       {glu:0.06, papain_iu:600, betacarotene:47},
  "블랙베리":     {glu:0.06, anthocyanin:138, ellagic:18},
  "라즈베리":     {glu:0.05, ellagic:22, anthocyanin:55},
  "크랜베리":     {glu:0.04, proanthocyanidin:418},
  // ── New Grains ────────────────────────────────────────────────────────────
  "찹쌀":         {glu:1.25},
  "보리":         {glu:2.25, betaglucan_g:8.5},
  "퀴노아":       {glu:3.30, betaine:630},
  "당면":         {glu:0.05},
  "소면":         {glu:2.50},
  // ── New Dairy ─────────────────────────────────────────────────────────────
  "크림치즈":     {glu:1.80, free_glu:300},
  "체다치즈":     {glu:5.34, free_glu:900, tyramine:500},
  "그뤼에르":     {glu:6.22, free_glu:1050},
  "리코타":       {glu:1.12},
  "사워크림":     {glu:0.54, diacetyl:600},
  "코티지치즈":   {glu:1.25},
  "고다치즈":     {glu:4.58, free_glu:780},
  // ── New Nuts ──────────────────────────────────────────────────────────────
  "마카다미아":   {glu:2.20, oleic_g:60},
  "피스타치오":   {glu:5.85, arginine:2.0, lutein:1160},
  "피칸":         {glu:2.35, ellagic:330},
  "헤이즐넛":     {glu:2.75, oleic_g:45},
  "브라질너트":   {glu:3.00, selenium_ug:1917},
  "치아씨드":     {glu:1.68, omega3_g:17.8},
  "아마씨":       {glu:2.20, omega3_g:22.8, lignan:300000},
  "호박씨":       {glu:4.35, arginine:5.4},
  // ── New Mushrooms ─────────────────────────────────────────────────────────
  "송이버섯":     {glu:0.80, gmp:200, ergothioneine:5500, matsutakeol:300},
  "포르치니":     {glu:0.95, gmp:220, ergothioneine:3200},
  "포르토벨로":   {glu:0.58, gmp:70,  ergothioneine:800},
  "트러플(검은)": {glu:1.12, gmp:380, androstenol:50},
  "만가닥버섯":   {glu:0.48, gmp:90,  ergothioneine:600},
  // ── New Legumes ───────────────────────────────────────────────────────────
  "대두":         {glu:5.50, isoflavone:80000, genistein:50000},
  "강낭콩":       {glu:3.20, isoflavone:2000},
  "낫토":         {glu:1.80, isoflavone:73000, genistein:46000},
  "에다마메":     {glu:0.86, isoflavone:18000},
  // ── New Herbs ─────────────────────────────────────────────────────────────
  "오레가노":     {glu:0.90, carvacrol:7000, thymol:3000},
  "세이지":       {glu:0.80, thujone:8000, rosmarinic:1600},
  "딜":           {glu:0.50, carvone:3000},
  "레몬그라스":   {glu:0.30, citral:6000},
  "팔각":         {glu:0.60, anethole:8000},
  "클로브(정향)": {glu:0.70, eugenol:12000},
  "넛맥":         {glu:0.60, myristicin:2500},
  "사프란":       {glu:0.55, crocin:3200, safranal:2000},
  "차이브":       {glu:0.18, allicin:0.8},
  // ── New Condiments ────────────────────────────────────────────────────────
  "쌈장":         {glu:0.90, free_glu:180, capsaicin:600},
  "멸치액젓":     {glu:1.85, free_glu:2100},
  "새우젓":       {glu:1.42, free_glu:1800},
  "된장":         {glu:0.87, free_glu:200, isoflavone:14000},
  "MSG":          {glu:78.2, free_glu:78200},
  "국간장":       {glu:0.95, free_glu:1800},
  "발사믹식초":   {glu:0.12, polyphenol:180, acetic:3500},
  "레몬즙":       {glu:0.05, citric:5800, limonene:120},
  "두반장":       {glu:0.90, capsaicin:1000, free_glu:220},
  "XO소스":       {glu:1.20, free_glu:1400, imp:380, gmp:120},
  "폰즈":         {glu:0.70, free_glu:900},
  // ── New Oils ──────────────────────────────────────────────────────────────
  "해바라기유":   {tocopherol_ug:41100, linoleic_g:66},
  "아보카도오일": {oleic_g:71, polyphenol:140},
  "현미유":       {gammaoryzanol:45, tocopherol_ug:4400},
};
// Merge quantitative sci data into DB at runtime
Object.entries(DB_SCI).forEach(([k,v]) => { if (DB[k]) DB[k].sci = v; });

// ── 부위 계층 구조 (parent → children) ─────────────────────────────────────
const PARENT_GROUPS = {
  // 육류 부위
  "소고기":   ["꽃등심(립아이)","채끝(서로인)","소고기 등심","소고기 안심","갈비(소)","양지(브리스킷)","우둔(라운드)","부채살(플랫아이언)","업진살(스커트)","홍두깨살","비프 패티","사골"],
  "돼지고기": ["삼겹살","목살(돼지)","등심(돼지)","안심(돼지)","갈비(돼지)","항정살","족발","돼지껍데기","순대","베이컨","소시지","햄","스팸","비엔나소시지"],
  "닭고기":   ["닭가슴살","닭다리","닭날개","닭 안심","닭 모래집"],
  "오리고기": ["훈제오리"],
  "거위":     ["푸아그라"],
  // 내장육
  "내장육":   ["간(소고기)","닭 간","돼지 간","곱창","대창","막창","양(소)","혀(소)","심장(소)","신장(소)"],
  // 가공육
  "가공육류": ["프로슈토","살라미","초리조","페퍼로니","파스트라미","코른비프","브라트부어스트","모르타델라","판체타","키엘바사","안두이유소시지","볼로냐소시지","육포(비프저키)","란체온미트"],
  // 유제품
  "치즈":     ["모짜렐라","파르메산","크림치즈","체다치즈","그뤼에르","리코타","코티지치즈","고다치즈"],
  // 해산물 그룹
  "조개류":   ["굴","가리비","홍합","꼬막","전복","바지락","동죽","백합","키조개","피조개","소라"],
  "게류":     ["게","꽃게","대게","킹크랩","홍게","털게"],
  "새우류":   ["새우","건새우","대하","랍스터","닭새우"],
  "오징어류": ["오징어","문어","낙지","한치","갑오징어","주꾸미","대문어"],
  "해조류":   ["미역","다시마","김","톳","파래","청각","우뭇가사리"],
  "어란류":   ["연어알","명란","날치알","캐비어","청어알"],
};
const CHILD_SET = new Set(Object.values(PARENT_GROUPS).flat());

// ── 조리 방법 데이터 ──────────────────────────────────────────────────────────
// medium: 열전달 매체 — dry(건열) | water(수침) | steam(증기) | oil(유침) | mw(마이크로파) | smoke(훈연) | none(비가열)
// pressure_atm: 조리 중 기압 배수 (1.0=상압, 압력솥≈1.3 → 비등점 121°C)
// o2_level: 산소 노출도 0-1 (지질산화, 비타민 산화 속도에 비례)
// leach_factor: 수용성 영양소 용출율 0-1 (1=완전 침지, 0=건열 무손실)
// fat_contact: 지방상 직접 접촉 여부 (지용성 영양소 추출, 지질산화, 칼로리 증가)
// browning: 마이야르·캐러멜화 가능 여부 (건열 표면에서 수분 증발 후 가능)
// starch_h2o: 전분 호화 가능 여부 (수분 공급 필요)
// pah_risk: 연소·훈연으로 인한 PAH/HCA 생성 위험
// uniformity: 온도 균일도 — high(균일) | medium(중간) | low(불균일·핫스팟)
// ─────────────────────────────────────────────────────────────────────────────
//                         medium    p_atm  o2   leach  fat    brown  h2o    pah    unif
const METHODS = {
  pan_fry:  {label:"팬 프라이",  label_en:"Pan Fry",      emoji:"🍳",img:"https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop",range:[150,220], medium:'dry',    pressure_atm:1.0, o2_level:0.7, leach_factor:0.0, fat_contact:true,  browning:true,  starch_h2o:false, pah_risk:false, uniformity:'medium'},
  boil:     {label:"끓이기",    label_en:"Boil",          emoji:"🍲",img:"https://images.pexels.com/photos/6287525/pexels-photo-6287525.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop",range:[95,100],  medium:'water',  pressure_atm:1.0, o2_level:0.1, leach_factor:0.9, fat_contact:false, browning:false, starch_h2o:true,  pah_risk:false, uniformity:'high'  },
  steam:    {label:"찜",       label_en:"Steam",          emoji:"♨️",img:"https://images.pexels.com/photos/3298605/pexels-photo-3298605.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop",range:[95,100],  medium:'steam',  pressure_atm:1.0, o2_level:0.2, leach_factor:0.2, fat_contact:false, browning:false, starch_h2o:true,  pah_risk:false, uniformity:'high'  },
  grill:    {label:"그릴",     label_en:"Grill",          emoji:"🔥",img:"https://images.pexels.com/photos/236887/pexels-photo-236887.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop",range:[200,300],  medium:'dry',    pressure_atm:1.0, o2_level:0.9, leach_factor:0.0, fat_contact:false, browning:true,  starch_h2o:false, pah_risk:true,  uniformity:'low'   },
  oven:     {label:"오븐",     label_en:"Oven",           emoji:"🫕",img:"https://images.pexels.com/photos/3338497/pexels-photo-3338497.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop",range:[150,250],  medium:'dry',    pressure_atm:1.0, o2_level:0.8, leach_factor:0.0, fat_contact:false, browning:true,  starch_h2o:false, pah_risk:false, uniformity:'medium'},
  deep_fry: {label:"튀김",     label_en:"Deep Fry",       emoji:"🍤",img:"https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop",range:[160,190],  medium:'oil',    pressure_atm:1.0, o2_level:0.4, leach_factor:0.0, fat_contact:true,  browning:true,  starch_h2o:false, pah_risk:false, uniformity:'high'  },
  stir_fry: {label:"볶음",     label_en:"Stir Fry",       emoji:"🥘",img:"https://images.pexels.com/photos/2664443/pexels-photo-2664443.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop",range:[180,250],  medium:'dry',    pressure_atm:1.0, o2_level:0.9, leach_factor:0.0, fat_contact:true,  browning:true,  starch_h2o:false, pah_risk:false, uniformity:'medium'},
  air_fry:  {label:"에어프라이어",label_en:"Air Fryer",    emoji:"🌀",img:"https://images.pexels.com/photos/8879634/pexels-photo-8879634.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop",range:[160,210], medium:'dry',   pressure_atm:1.0, o2_level:0.9, leach_factor:0.0, fat_contact:false, browning:true,  starch_h2o:false, pah_risk:false, uniformity:'medium'},
  microwave:{label:"전자레인지",label_en:"Microwave",      emoji:"📡",img:"https://images.pexels.com/photos/211761/pexels-photo-211761.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop",range:[60,100],   medium:'mw',     pressure_atm:1.0, o2_level:0.5, leach_factor:0.3, fat_contact:false, browning:false, starch_h2o:true,  pah_risk:false, uniformity:'low'   },
  pressure: {label:"압력솥",   label_en:"Pressure Cook",  emoji:"🫙",img:"https://images.pexels.com/photos/2544829/pexels-photo-2544829.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop",range:[110,130],  medium:'water',  pressure_atm:1.3, o2_level:0.0, leach_factor:0.7, fat_contact:false, browning:false, starch_h2o:true,  pah_risk:false, uniformity:'high'  },
  slow_cook:{label:"슬로우쿠킹",label_en:"Slow Cook",     emoji:"⏲️",img:"https://images.pexels.com/photos/2544829/pexels-photo-2544829.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop",range:[70,95],   medium:'water',  pressure_atm:1.0, o2_level:0.1, leach_factor:0.8, fat_contact:false, browning:false, starch_h2o:true,  pah_risk:false, uniformity:'high'  },
  sous_vide:{label:"수비드",   label_en:"Sous Vide",      emoji:"🎯",img:"https://images.pexels.com/photos/3338497/pexels-photo-3338497.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop",range:[50,90],    medium:'water',  pressure_atm:1.0, o2_level:0.0, leach_factor:0.1, fat_contact:false, browning:false, starch_h2o:true,  pah_risk:false, uniformity:'high'  },
  smoke:    {label:"훈제",     label_en:"Smoke",          emoji:"🪵",img:"https://images.pexels.com/photos/1482803/pexels-photo-1482803.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop",range:[90,135],   medium:'smoke',  pressure_atm:1.0, o2_level:0.6, leach_factor:0.0, fat_contact:false, browning:false, starch_h2o:false, pah_risk:true,  uniformity:'low'   },
  charcoal: {label:"숯불구이", label_en:"Charcoal Grill", emoji:"🔥",img:"https://images.pexels.com/photos/533325/pexels-photo-533325.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop",range:[300,500],  medium:'dry',    pressure_atm:1.0, o2_level:1.0, leach_factor:0.0, fat_contact:false, browning:true,  starch_h2o:false, pah_risk:true,  uniformity:'low'   },
  wok:      {label:"웍 볶음",  label_en:"Wok",            emoji:"🥢",img:"https://images.pexels.com/photos/2664443/pexels-photo-2664443.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop",range:[200,300],  medium:'dry',    pressure_atm:1.0, o2_level:1.0, leach_factor:0.0, fat_contact:true,  browning:true,  starch_h2o:false, pah_risk:false, uniformity:'low'   },
  blanch:   {label:"데치기",   label_en:"Blanch",         emoji:"💧",img:"https://images.pexels.com/photos/6287525/pexels-photo-6287525.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop",range:[90,100],   medium:'water',  pressure_atm:1.0, o2_level:0.2, leach_factor:0.6, fat_contact:false, browning:false, starch_h2o:true,  pah_risk:false, uniformity:'high'  },
  braise:   {label:"브레이징", label_en:"Braise",         emoji:"🍖",img:"https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop",range:[80,100],   medium:'water',  pressure_atm:1.0, o2_level:0.1, leach_factor:0.6, fat_contact:false, browning:false, starch_h2o:true,  pah_risk:false, uniformity:'high'  },
  poach:    {label:"포칭",     label_en:"Poach",          emoji:"🫗",img:"https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop",range:[70,85],    medium:'water',  pressure_atm:1.0, o2_level:0.1, leach_factor:0.5, fat_contact:false, browning:false, starch_h2o:true,  pah_risk:false, uniformity:'high'  },
  tandoor:  {label:"탄두르",   label_en:"Tandoor",        emoji:"🏺",img:"https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop",range:[250,480],  medium:'dry',    pressure_atm:1.0, o2_level:1.0, leach_factor:0.0, fat_contact:false, browning:true,  starch_h2o:false, pah_risk:true,  uniformity:'low'   },
  ferment:  {label:"발효",     label_en:"Ferment",        emoji:"🧫",img:"https://images.pexels.com/photos/1132558/pexels-photo-1132558.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop",range:[4,40],     medium:'none',   pressure_atm:1.0, o2_level:0.3, leach_factor:0.1, fat_contact:false, browning:false, starch_h2o:false, pah_risk:false, uniformity:'medium'},
  raw:      {label:"생식",     label_en:"Raw",            emoji:"🥗",img:"https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop",range:[0,25],     medium:'none',   pressure_atm:1.0, o2_level:1.0, leach_factor:0.0, fat_contact:false, browning:false, starch_h2o:false, pah_risk:false, uniformity:'high'  },
};

// ── 질환별 식이 규칙 DB ──
const CONDITIONS = {
  diabetes: {
    label: "당뇨", label_en: "Diabetes", emoji: "🩸",
    desc: "혈당 관리가 필요한 상태", desc_en: "Blood sugar management required",
    rules: [
      // 위험 규칙: {check: fn(ingMap,comp,method,temp,time) => bool, severity, title, detail, tip}
      {check:(im,c)=>c.carbs>40, severity:"danger", title:"탄수화물 과다 섭취",
        detail:(im,c)=>`총 탄수화물 ${c.carbs.toFixed(1)}g — 당뇨 환자 1회 식사 권장량(45-60g)에 근접하거나 초과합니다. 특히 ${Object.entries(im).filter(([n])=>DB[n]?.comp.carbs>10).map(([n,g])=>`${n}(${g}g → 탄수화물 ${(DB[n].comp.carbs*g/100).toFixed(1)}g)`).join(', ')}이 주요 원인입니다.`,
        tip:"탄수화물 재료의 양을 줄이거나, 식이섬유가 풍부한 채소를 추가하여 GI를 낮추세요."},
      {check:(im,c)=>c.carbs>60, severity:"danger", title:"탄수화물 위험 수준",
        detail:(im,c)=>`총 탄수화물 ${c.carbs.toFixed(1)}g — 1회 식사 권장량(45-60g)을 크게 초과합니다. 급격한 혈당 상승(blood glucose spike) 위험이 높습니다.`,
        tip:"쌀/감자/설탕의 양을 절반 이하로 줄이거나, 통곡물/콩류로 대체하세요."},
      {check:(im)=>'설탕' in im && im['설탕']>5, severity:"danger", title:"설탕 직접 사용 주의",
        detail:(im)=>`설탕 ${im['설탕']}g 투입 — 정제 당류는 혈당을 가장 빠르게 올리는 탄수화물입니다 (GI=65).`,
        tip:"설탕 대신 에리스리톨, 스테비아 등 대체감미료를 고려하세요. 과일(레몬 등)로 맛을 보완하는 것도 방법입니다."},
      {check:(im,c,m)=>['deep_fry','pan_fry','stir_fry','wok','charcoal','tandoor'].includes(m)&&c.carbs>20, severity:"caution", title:"고온 조리 + 탄수화물 → GI 상승",
        detail:(im,c)=>`전분의 호화(gelatinization)가 촉진되어 혈당 반응이 빨라집니다. 탄수화물 ${c.carbs.toFixed(1)}g + 고온 조리는 GI를 추가로 10-20포인트 높일 수 있습니다.`,
        tip:"찜이나 저온 조리로 전환하면 전분의 호화도를 낮춰 GI를 줄일 수 있습니다."},
      {check:(im)=>Object.keys(im).some(n=>DB[n]?.compounds.some(c=>c.includes('알리신'))), severity:"good", title:"마늘/양파의 혈당 조절 효과",
        detail:()=>`알리신과 프럭토올리고당은 인슐린 감수성을 높이고 혈당 반응을 완만하게 만드는 연구 결과가 있습니다.`,
        tip:"마늘은 열에 의해 알리신이 변환되므로, 조리 마무리에 생마늘을 소량 추가하면 효과를 극대화할 수 있습니다."},
      {check:(im,c)=>c.fiber>5, severity:"good", title:"식이섬유가 혈당 완화에 도움",
        detail:(im,c)=>`식이섬유 약 ${c.fiber.toFixed(1)}g — 식이섬유는 탄수화물의 소화 흡수 속도를 늦춰 혈당 급상승을 방지합니다.`,
        tip:"목표: 1회 식사당 식이섬유 7-10g. 채소를 더 추가하면 좋습니다."},
      {check:(im)=>Object.keys(im).some(n=>DB[n]?.compounds.some(c=>c.includes('캡사이신'))), severity:"good", title:"캡사이신의 인슐린 감수성 개선",
        detail:()=>`고추의 캡사이신은 인슐린 분비를 촉진하고 포도당 대사를 개선하는 효과가 보고되어 있습니다.`,
        tip:"매운맛을 적당히 활용하되, 위장이 예민한 경우 소량부터 시작하세요."},
    ]
  },
  hypertension: {
    label: "고혈압", label_en: "Hypertension", emoji: "💉",
    desc: "혈압 관리가 필요한 상태", desc_en: "Blood pressure management required",
    rules: [
      {check:(im,c)=>c.sodium>800, severity:"danger", title:"나트륨 과다 섭취 위험",
        detail:(im,c)=>`총 나트륨 약 ${c.sodium.toFixed(0)}mg — WHO 일일 권장량 2000mg의 ${Math.round(c.sodium/2000*100)}%입니다. 1회 식사로 매우 높습니다.`,
        tip:"간장·소금 양을 절반으로 줄이고, 레몬·식초·허브로 맛을 보완하세요."},
      {check:(im,c)=>c.sodium>400, severity:"caution", title:"나트륨 주의 필요",
        detail:(im,c)=>`총 나트륨 약 ${c.sodium.toFixed(0)}mg — 고혈압 환자 1회 식사 권장량(600mg 이하)에 근접합니다.`,
        tip:"저나트륨 간장 사용, 또는 칼륨이 풍부한 재료(토마토, 감자)를 추가해 나트륨 배출을 촉진하세요."},
      {check:(im,c)=>c.potassium>500, severity:"good", title:"칼륨이 혈압 조절에 도움",
        detail:(im,c)=>`칼륨 약 ${c.potassium.toFixed(0)}mg — 칼륨은 나트륨의 신장 배출을 촉진하여 혈압을 낮추는 역할을 합니다.`,
        tip:"토마토, 감자, 바나나 등 칼륨 풍부한 식재료를 적극 활용하세요."},
      {check:(im,c)=>c.fat>25, severity:"caution", title:"과도한 지방 섭취",
        detail:(im,c)=>`총 지방 ${c.fat.toFixed(1)}g — 포화지방이 많으면 동맥경화를 촉진하여 혈압 관리에 불리합니다.`,
        tip:"버터 대신 올리브오일을 사용하고, 조리법을 찜/삶기로 전환하세요."},
      {check:(im)=>Object.keys(im).some(n=>DB[n]?.compounds.some(c=>c.includes('알리신'))), severity:"good", title:"마늘의 혈관 이완 효과",
        detail:()=>`마늘의 알리신은 혈관을 이완시키는 NO(산화질소) 생성을 촉진하여 혈압 강하에 도움을 줄 수 있습니다.`,
        tip:"생마늘을 하루 1-2쪽 섭취하는 것이 가장 효과적입니다."},
    ]
  },
  kidney: {
    label: "신장질환", label_en: "Kidney Disease", emoji: "🫘",
    desc: "신장 기능이 저하된 상태", desc_en: "Reduced kidney function",
    rules: [
      {check:(im,c)=>c.protein>30, severity:"danger", title:"단백질 과다 — 신장 부담",
        detail:(im,c)=>`총 단백질 ${c.protein.toFixed(1)}g — 신장질환 환자는 1회 식사 단백질 15-20g 이하가 권장됩니다. 과도한 단백질은 요소(BUN) 생성을 증가시켜 신장에 부담을 줍니다.`,
        tip:"소고기/계란 양을 줄이고, 두부 등 식물성 단백질로 대체하면 신장 부담을 줄일 수 있습니다."},
      {check:(im,c)=>c.potassium>600, severity:"danger", title:"칼륨 과다 — 고칼륨혈증 위험",
        detail:(im,c)=>`칼륨 약 ${c.potassium.toFixed(0)}mg — 신장 기능이 저하되면 칼륨 배출이 어려워 고칼륨혈증(부정맥 위험)이 발생할 수 있습니다.`,
        tip:"감자·토마토를 물에 담가 칼륨을 빼거나(leaching), 양을 줄이세요. 삶는 물은 버리세요."},
      {check:(im,c)=>c.potassium>350, severity:"caution", title:"칼륨 섭취 주의",
        detail:(im,c)=>`칼륨 약 ${c.potassium.toFixed(0)}mg — 중등도 수준이지만 신장 기능에 따라 주의가 필요합니다.`,
        tip:"채소를 끓인 후 물을 버리면 칼륨을 30-50% 제거할 수 있습니다."},
      {check:(im,c)=>c.sodium>600, severity:"caution", title:"나트륨 부종 악화 위험",
        detail:(im,c)=>`나트륨 약 ${c.sodium.toFixed(0)}mg — 신장질환 시 나트륨 배출 능력이 저하되어 부종과 혈압 상승을 유발합니다.`,
        tip:"간장 대신 레몬·식초로 맛을 내고, 허브·향신료를 활용하세요."},
    ]
  },
  gout: {
    label: "통풍", label_en: "Gout", emoji: "🦶",
    desc: "요산 수치 관리가 필요한 상태", desc_en: "Uric acid management required",
    rules: [
      {check:(im)=>Object.keys(im).some(n=>['소고기'].includes(n)&&im[n]>100), severity:"danger", title:"붉은 고기 과다 — 퓨린 위험",
        detail:(im)=>`소고기 ${im['소고기']||0}g — 붉은 고기(100g당 퓨린 150-200mg)는 요산 생성을 크게 증가시킵니다.`,
        tip:"소고기를 100g 이하로 줄이거나, 두부·계란 등 저퓨린 단백질로 대체하세요."},
      {check:(im)=>'두부' in im, severity:"good", title:"두부 — 저퓨린 단백질 선택",
        detail:()=>`두부는 100g당 퓨린이 20-40mg으로 매우 낮아 통풍 환자에게 안전한 단백질 공급원입니다.`,
        tip:"고기 대신 두부를 주 단백질원으로 활용하는 것이 좋습니다."},
      {check:(im)=>'계란' in im, severity:"good", title:"계란 — 퓨린 거의 없음",
        detail:()=>`계란은 퓨린 함량이 거의 없어(100g당 <5mg) 통풍 환자에게 가장 안전한 동물성 단백질입니다.`,
        tip:"계란을 활용한 조리법은 통풍 관리에 매우 유리합니다."},
      {check:(im,c)=>c.fat>20&&['deep_fry'].includes('deep_fry'), severity:"caution", title:"고지방 조리 — 요산 배출 방해",
        detail:(im,c)=>`지방 ${c.fat.toFixed(1)}g — 과도한 지방은 신장의 요산 배출을 방해하여 통풍 발작 위험을 높입니다.`,
        tip:"튀김 대신 찜·삶기·그릴 조리법을 선택하세요."},
    ]
  },
  heart: {
    label: "심혈관질환", label_en: "Heart Disease", emoji: "❤️",
    desc: "심장·혈관 건강 관리", desc_en: "Cardiovascular disease",
    rules: [
      {check:(im,c)=>c.saturatedFat>10, severity:"danger", title:"포화지방 과다 — 심혈관 위험",
        detail:(im,c)=>`포화지방 추정 약 ${c.saturatedFat.toFixed(1)}g — AHA 권장 일일 상한 13g의 ${Math.round(c.saturatedFat/13*100)}%입니다. LDL 콜레스테롤을 높여 동맥경화 위험을 증가시킵니다.`,
        tip:"버터→올리브오일, 소고기→생선으로 대체하면 포화지방을 크게 줄일 수 있습니다."},
      {check:(im)=>Object.keys(im).some(n=>DB[n]?.compounds.some(c=>c.includes('올레산'))), severity:"good", title:"올리브오일의 심혈관 보호 효과",
        detail:()=>`올레산(불포화지방산)은 LDL 콜레스테롤을 낮추고 HDL을 높여 심혈관 건강에 유익합니다.`,
        tip:"올리브오일을 주 조리유로 사용하고, 엑스트라 버진을 마무리에 뿌려 폴리페놀 효과를 극대화하세요."},
      {check:(im)=>Object.keys(im).some(n=>DB[n]?.compounds.some(c=>c.includes('리코펜'))), severity:"good", title:"리코펜의 심혈관 보호 효과",
        detail:()=>`토마토의 리코펜은 LDL 산화를 억제하고 혈관 내피 기능을 개선하는 강력한 항산화제입니다.`,
        tip:"토마토를 올리브오일과 함께 가열 조리하면 리코펜 흡수율이 최대 5배 증가합니다."},
      {check:(im,c)=>c.sodium>800, severity:"caution", title:"나트륨 과다 — 심장 부담",
        detail:(im,c)=>`나트륨 약 ${c.sodium.toFixed(0)}mg — 과도한 나트륨은 혈액량을 증가시켜 심장에 부담을 줍니다.`,
        tip:"점진적으로 간을 줄여가면 2-3주 안에 미각이 적응합니다."},
    ]
  },
  obesity: {
    label: "비만/체중관리", label_en: "Obesity", emoji: "⚖️",
    desc: "칼로리 및 체중 관리", desc_en: "BMI 30+ weight management",
    rules: [
      {check:(im,c)=>c.calories>600, severity:"danger", title:"1회 식사 칼로리 과다",
        detail:(im,c)=>`추정 칼로리 약 ${c.calories.toFixed(0)}kcal — 체중 관리 시 1회 식사 400-500kcal이 권장됩니다.`,
        tip:"지방이 많은 재료(버터, 올리브오일)의 양을 줄이고, 채소 비율을 높이세요."},
      {check:(im,c)=>c.calories>400&&c.calories<=600, severity:"caution", title:"칼로리 주의",
        detail:(im,c)=>`추정 칼로리 약 ${c.calories.toFixed(0)}kcal — 적정 범위지만 간식·음료까지 고려하면 일일 총량을 초과할 수 있습니다.`,
        tip:"식사 전 물을 한 잔 마시고, 천천히 먹으면 포만감을 높일 수 있습니다."},
      {check:(im,c,m)=>['deep_fry'].includes(m), severity:"danger", title:"튀김 조리법 — 칼로리 급증",
        detail:(im,c)=>`튀김은 기름을 흡수하여 칼로리가 2-3배 증가합니다. 같은 재료도 찜으로 조리하면 칼로리를 50% 이상 줄일 수 있습니다.`,
        tip:"에어프라이어(air_fry)나 오븐 조리로 대체하면 기름 사용을 90% 줄일 수 있습니다."},
      {check:(im,c)=>c.fiber>5, severity:"good", title:"식이섬유가 포만감에 도움",
        detail:(im,c)=>`식이섬유 약 ${c.fiber.toFixed(1)}g — 포만감을 오래 유지하여 과식을 방지합니다.`,
        tip:"채소를 먼저 먹고 탄수화물을 나중에 먹으면 혈당과 식욕 조절에 도움됩니다."},
    ]
  },
  liver: {
    label: "간질환", label_en: "Liver Disease", emoji: "🫀",
    desc: "만성 간염·간경변·지방간 등 간 기능 저하", desc_en: "Reduced liver function",
    rules: [
      {check:(im,c)=>c.protein>35, severity:"danger", title:"단백질 과다 — 간성 혼수 위험",
        detail:(im,c)=>`총 단백질 ${c.protein.toFixed(1)}g — 간경변 환자는 암모니아 대사 능력이 저하되어 과도한 단백질이 간성 뇌증을 유발할 수 있습니다.`,
        tip:"1회 식사 단백질 20-25g으로 제한하고, 두부·두유 등 분지쇄 아미노산 공급원을 우선하세요."},
      {check:(im,c)=>c.fat>30, severity:"caution", title:"고지방 — 지방간 악화 위험",
        detail:(im,c)=>`총 지방 ${c.fat.toFixed(1)}g — 포화지방과 단순당은 간 내 중성지방 축적을 촉진합니다.`,
        tip:"버터·삼겹살 대신 등푸른 생선·아보카도의 불포화지방을 선택하세요."},
      {check:(im,c)=>c.sodium>800, severity:"caution", title:"고나트륨 — 복수 악화",
        detail:(im,c)=>`나트륨 약 ${c.sodium.toFixed(0)}mg — 간경변 시 나트륨 과다는 복수와 부종을 악화시킵니다.`,
        tip:"나트륨 1,500mg/일 이하로 제한하고 허브·식초로 맛을 보완하세요."},
      {check:(im)=>Object.keys(im).some(n=>DB[n]?.compounds?.some(c=>c.includes('리코펜'))||DB[n]?.compounds?.some(c=>c.includes('설포라판'))), severity:"good", title:"항산화 성분이 간세포 보호",
        detail:()=>`리코펜(토마토), 설포라판(브로콜리) 등 항산화 성분은 산화 스트레스로 인한 간세포 손상을 억제합니다.`,
        tip:"토마토, 브로콜리, 베리류를 꾸준히 섭취하세요."},
    ]
  },
  thyroid_hypo: {
    label: "갑상선 기능저하증", label_en: "Hypothyroidism", emoji: "🦋",
    desc: "갑상선 호르몬 부족 — 체중 증가·피로·냉증", desc_en: "Underactive thyroid",
    rules: [
      {check:(im)=>['양배추','브로콜리','콜리플라워','케일'].some(n=>im[n]>80), severity:"caution", title:"생 십자화과 채소 — 갑상선 호르몬 방해",
        detail:()=>`양배추·브로콜리의 고이트로겐(glucosinolate)은 생으로 대량 섭취 시 갑상선 호르몬 합성을 억제할 수 있습니다.`,
        tip:"살짝 데치거나 가열 조리하면 고이트로겐이 60-90% 비활성화됩니다."},
      {check:(im)=>['두부','두유'].some(n=>(im[n]||0)>100), severity:"caution", title:"대두 이소플라본 — 갑상선약 흡수 방해",
        detail:()=>`대두 이소플라본은 갑상선 호르몬 합성 효소를 억제하고 레보티록신 흡수를 저해할 수 있습니다.`,
        tip:"갑상선약 복용 후 최소 4시간 뒤 두부·두유를 섭취하세요."},
      {check:(im,c)=>c.sodium>1000, severity:"caution", title:"고나트륨 — 부종 악화",
        detail:(im,c)=>`갑상선 기능저하 시 신진대사가 저하되어 과다 나트륨이 부종을 악화시킵니다. 나트륨 ${c.sodium.toFixed(0)}mg 감지.`,
        tip:"나트륨 섭취를 1,500mg/일 이하로 제한하세요."},
      {check:(im,c)=>c.fiber>6, severity:"good", title:"식이섬유로 변비 완화",
        detail:(im,c)=>`갑상선 기능저하 시 장운동 저하로 변비가 흔합니다. 식이섬유 ${c.fiber.toFixed(1)}g은 장운동 개선에 도움됩니다.`,
        tip:"아침에 미지근한 물 + 고섬유질 식사로 장 기능을 활성화하세요."},
    ]
  },
  anemia: {
    label: "빈혈 (철결핍성)", label_en: "Anemia", emoji: "🩸",
    desc: "철분 부족으로 인한 혈색소 감소", desc_en: "Iron/B12 deficiency anemia",
    rules: [
      {check:(im)=>Object.keys(im).some(n=>['소고기','간','굴'].includes(n)), severity:"good", title:"헴철 식품 — 철분 흡수 최적",
        detail:()=>`소고기·간·굴의 헴철(heme iron)은 비헴철보다 2-3배 흡수율이 높습니다 (흡수율 15-35%).`,
        tip:"주 2-3회 적색 육류를 소량 섭취하면 철분 보충에 효과적입니다."},
      {check:(im)=>Object.keys(im).some(n=>['토마토','파프리카','레몬','브로콜리'].includes(n)), severity:"good", title:"비타민C — 비헴철 흡수 3배 증가",
        detail:()=>`비타민C는 비헴철(식물성 철분)을 흡수하기 쉬운 2가철로 환원시켜 흡수율을 크게 높입니다.`,
        tip:"시금치나 콩을 먹을 때 레몬즙이나 파프리카를 함께 사용하세요."},
      {check:(im)=>Object.keys(im).some(n=>['녹차','홍차','커피'].includes(n)), severity:"caution", title:"탄닌이 철분 흡수 50% 감소",
        detail:()=>`녹차·홍차·커피의 탄닌은 철분과 결합하여 흡수를 방해합니다.`,
        tip:"철분 식품과 차·커피는 최소 1시간 간격을 두세요."},
      {check:(im,c)=>c.protein<15, severity:"caution", title:"단백질 부족 — 헤모글로빈 합성 저하",
        detail:(im,c)=>`총 단백질 ${c.protein.toFixed(1)}g — 헤모글로빈은 글로빈 단백질로 구성되어 있어 단백질 공급이 중요합니다.`,
        tip:"소고기·달걀·콩류 등 양질의 단백질을 매 식사에 포함하세요."},
    ]
  },
  ibs: {
    label: "과민성 대장 증후군", label_en: "IBS", emoji: "🫃",
    desc: "장 과민 반응 — 복통·설사·변비 반복", desc_en: "Irritable bowel syndrome",
    rules: [
      {check:(im)=>['양파','마늘','양배추'].some(n=>(im[n]||0)>50), severity:"danger", title:"고FODMAP 채소 — 장 가스 유발",
        detail:()=>`양파·마늘·양배추는 고FODMAP 식품으로, 대장에서 발효되어 가스·팽만·복통을 유발합니다.`,
        tip:"마늘 대신 마늘향 오일, 양파 대신 파 녹색 부분을 사용하세요."},
      {check:(im)=>Object.keys(im).some(n=>['밀가루','빵','보리','호밀'].includes(n)), severity:"caution", title:"프럭탄 함유 곡물 — 복부 팽만",
        detail:()=>`밀·보리·호밀의 프럭탄(fructan)은 과민성 대장 증후군의 주요 유발 인자입니다.`,
        tip:"쌀·오트밀·퀴노아 등 저FODMAP 곡물로 대체하세요."},
      {check:(im,c)=>c.fat>25, severity:"caution", title:"고지방 식사 — 장 수축 반응 유발",
        detail:(im,c)=>`지방 ${c.fat.toFixed(1)}g — 고지방 식사는 위-대장 반사를 강화하여 복통과 설사 충동을 유발할 수 있습니다.`,
        tip:"튀김·버터 사용을 줄이고, 조리유를 소량만 사용하세요."},
      {check:(im)=>Object.keys(im).some(n=>['생강','강황','페퍼민트'].includes(n)), severity:"good", title:"생강·강황의 장 진정 효과",
        detail:()=>`생강의 진저롤은 구역 완화, 강황의 커큐민은 장 염증 억제에 효과가 입증되어 있습니다.`,
        tip:"생강차나 강황을 넣은 음식은 IBS 증상 완화에 도움이 됩니다."},
    ]
  },

  // ══════════════════════════════════════════════════════════════
  // 신규 추가 질환 (15개)
  // ══════════════════════════════════════════════════════════════

  hyperlipidemia: {
    label: "고지혈증", label_en: "Hyperlipidemia", emoji: "🫀",
    desc: "혈중 LDL·중성지방 과다 — 동맥경화 위험", desc_en: "Elevated LDL/triglycerides — atherosclerosis risk",
    rules: [
      {check:(im,c)=>c.saturatedFat>10, severity:"danger", title:"포화지방 과다 — LDL 콜레스테롤 상승",
        detail:(im,c)=>`포화지방 추정 ${c.saturatedFat.toFixed(1)}g — 포화지방 1g 증가 시 LDL이 약 1-2mg/dL 상승합니다. AHA 권장 상한(13g/일)의 ${Math.round(c.saturatedFat/13*100)}%입니다.`,
        tip:"버터·삼겹살·코코넛오일을 올리브오일·아보카도·견과류로 교체하세요."},
      {check:(im,c)=>c.saturatedFat>6&&c.saturatedFat<=10, severity:"caution", title:"포화지방 주의",
        detail:(im,c)=>`포화지방 약 ${c.saturatedFat.toFixed(1)}g — 고지혈증 환자는 1회 식사 포화지방 5g 이하가 권장됩니다.`,
        tip:"육류는 껍질·지방 부위를 제거하고 흰살생선·두부로 대체하세요."},
      {check:(im)=>Object.keys(im).some(n=>['계란','오징어'].includes(n)&&(im[n]||0)>100), severity:"caution", title:"콜레스테롤 고함량 식품 주의",
        detail:(im)=>`계란(콜레스테롤 370mg/100g)·오징어(270mg/100g)를 대량 섭취 시 식이 콜레스테롤이 증가합니다. 단, 개인 반응 차이가 큽니다.`,
        tip:"계란은 1일 1개, 오징어는 100g 이하로 제한하세요."},
      {check:(im,c)=>c.fiber>7, severity:"good", title:"수용성 식이섬유 — LDL 흡수 억제",
        detail:(im,c)=>`식이섬유 ${c.fiber.toFixed(1)}g — 수용성 식이섬유(β-글루칸, 펙틴)는 담즙산 재흡수를 줄여 LDL을 5-10% 낮출 수 있습니다.`,
        tip:"귀리, 사과, 콩류는 수용성 식이섬유가 특히 풍부합니다."},
      {check:(im)=>Object.keys(im).some(n=>DB[n]?.compounds?.some(c=>c.includes('오메가3'))||['연어','고등어','청어','참치','멸치'].includes(n)), severity:"good", title:"오메가3 — 중성지방 30% 감소",
        detail:()=>`EPA/DHA는 간에서 VLDL 합성을 억제하여 혈중 중성지방을 20-30% 낮추는 효과가 메타분석으로 확인됐습니다.`,
        tip:"등푸른 생선을 주 2-3회 섭취하거나 오메가3 보충제(EPA+DHA 2-4g/일)를 고려하세요."},
      {check:(im)=>Object.keys(im).some(n=>DB[n]?.compounds?.some(c=>c.includes('올레산'))), severity:"good", title:"올레산(올리브오일) — HDL 유지하며 LDL 감소",
        detail:()=>`올리브오일의 올레산은 LDL은 낮추면서 HDL(좋은 콜레스테롤)은 유지하는 균형 효과가 있습니다.`,
        tip:"조리유를 올리브오일로 교체하고 엑스트라버진을 마무리에 뿌리세요."},
      {check:(im,c,m)=>['deep_fry'].includes(m)&&c.saturatedFat>5, severity:"danger", title:"튀김 + 포화지방 → 산화 LDL 생성",
        detail:()=>`고온 튀김은 지방을 산화시켜 산화 LDL을 생성합니다. 산화 LDL은 일반 LDL보다 동맥경화를 10배 빠르게 유발합니다.`,
        tip:"튀김은 최소화하고 찜·구이로 대체하세요. 불가피하면 발연점 높은 아보카도오일을 사용하세요."},
    ]
  },

  fatty_liver: {
    label: "지방간 (NAFLD)", label_en: "Fatty Liver", emoji: "🟡",
    desc: "간에 중성지방 축적 — 간염·간경변 전단계", desc_en: "Non-alcoholic fatty liver disease",
    rules: [
      {check:(im)=>Object.keys(im).some(n=>n==='설탕'&&im[n]>15)||Object.keys(im).some(n=>['과당','시럽','꿀'].includes(n)&&im[n]>20), severity:"danger", title:"과당·정제당 — 지방간 최대 원인",
        detail:()=>`과당은 간에서만 대사되어 직접 중성지방으로 전환됩니다. 설탕(자당)의 50%가 과당입니다. 고과당 섭취는 NAFLD의 핵심 원인입니다.`,
        tip:"설탕·시럽·가공 소스를 허브·레몬·식초로 대체하고, 과일도 1일 2개 이하로 제한하세요."},
      {check:(im,c)=>c.carbs>60, severity:"caution", title:"고탄수화물 → 간 내 지방 합성(De novo lipogenesis)",
        detail:(im,c)=>`탄수화물 ${c.carbs.toFixed(1)}g — 과잉 탄수화물은 간에서 de novo lipogenesis(신생 지방 합성)를 통해 중성지방으로 전환됩니다.`,
        tip:"탄수화물을 줄이고 단백질·불포화지방 비율을 높이세요."},
      {check:(im,c)=>c.fat>30&&c.saturatedFat>8, severity:"danger", title:"고포화지방 — 간세포 내 지방 직접 축적",
        detail:(im,c)=>`총지방 ${c.fat.toFixed(1)}g, 포화지방 ${c.saturatedFat.toFixed(1)}g — 포화지방은 간에서 산화되지 않고 직접 축적되어 지방간을 악화시킵니다.`,
        tip:"삼겹살·버터를 등푸른 생선·올리브오일로 교체하세요."},
      {check:(im)=>Object.keys(im).some(n=>DB[n]?.compounds?.some(c=>c.includes('리코펜'))||DB[n]?.compounds?.some(c=>c.includes('설포라판'))), severity:"good", title:"항산화 성분 — 간세포 산화 스트레스 억제",
        detail:()=>`리코펜(토마토), 설포라판(브로콜리)은 간세포 산화 스트레스와 염증을 억제합니다.`,
        tip:"토마토는 올리브오일과 가열 조리하면 리코펜 흡수율이 4배 높아집니다."},
      {check:(im)=>Object.keys(im).some(n=>['커피'].includes(n)), severity:"good", title:"커피 — 지방간 보호 효과",
        detail:()=>`메타분석에서 커피(카페인·클로로겐산)를 하루 2-3잔 마시면 NAFLD 위험이 40% 감소하는 것으로 나타났습니다.`,
        tip:"블랙커피가 가장 효과적입니다. 설탕·크림 추가는 효과를 감소시킵니다."},
      {check:(im,c)=>c.protein>=20&&c.protein<=35, severity:"good", title:"적정 단백질 — 간 지방 대사 촉진",
        detail:(im,c)=>`단백질 ${c.protein.toFixed(1)}g — 적정 단백질은 VLDL 분비를 통해 간 지방을 혈액으로 운반·제거하는 데 필요합니다.`,
        tip:"두부·생선·달걀로 단백질을 보충하되, 동물성 포화지방은 최소화하세요."},
    ]
  },

  gerd: {
    label: "역류성 식도염 (GERD)", label_en: "GERD", emoji: "🔥",
    desc: "위산·내용물이 식도로 역류 — 흉통·속쓰림", desc_en: "Gastroesophageal reflux",
    rules: [
      {check:(im,c)=>c.fat>20, severity:"danger", title:"고지방 식사 — 하부식도괄약근(LES) 이완",
        detail:(im,c)=>`지방 ${c.fat.toFixed(1)}g — 지방은 콜레시스토키닌을 분비하여 LES 압력을 낮추고 역류를 유발합니다. 지방이 많을수록 역류 시간이 길어집니다.`,
        tip:"1회 지방 10g 이하로 제한하고, 튀김·버터·치즈를 피하세요."},
      {check:(im)=>Object.keys(ingMap=>ingMap).some||(()=>{return Object.keys(im).some(n=>['토마토','레몬','식초','오렌지'].includes(n))})()||Object.keys(im).some(n=>['토마토','레몬','식초','오렌지'].includes(n)), severity:"caution", title:"산성 식품 — 식도 점막 직접 자극",
        detail:()=>`토마토·레몬·식초·오렌지는 산도(pH 2-4)가 낮아 이미 손상된 식도 점막을 직접 자극합니다.`,
        tip:"급성기에는 산성 식품을 제한하세요. 증상이 완화되면 소량부터 재도입하세요."},
      {check:(im)=>Object.keys(im).some(n=>DB[n]?.compounds?.some(c=>c.includes('캡사이신'))), severity:"caution", title:"캡사이신 — 위산 분비 촉진",
        detail:()=>`고추의 캡사이신은 위산 분비를 증가시키고 식도 감각을 예민하게 만들어 역류 증상을 악화시킵니다.`,
        tip:"GERD 증상이 있을 때는 고추·고춧가루 사용을 최소화하세요."},
      {check:(im)=>Object.keys(im).some(n=>['초콜릿','커피','민트'].includes(n)), severity:"caution", title:"초콜릿·커피·민트 — LES 이완 트리거",
        detail:()=>`세 식품 모두 메틸잔틴(카페인·테오브로민)을 포함하거나 직접 LES를 이완시켜 역류를 촉진합니다.`,
        tip:"GERD 환자는 식후 커피·초콜릿·민트티를 피하세요."},
      {check:(im,c)=>c.fat<15&&c.protein>=15&&!Object.keys(im).some(n=>['토마토','레몬','고추','초콜릿','커피'].includes(n)), severity:"good", title:"저자극·저지방 식사 — GERD 친화적",
        detail:()=>`지방이 적고 산성·자극성 식품이 없는 조합입니다. LES 기능 유지에 유리합니다.`,
        tip:"식사는 소량씩 자주, 식후 3시간 이내 눕지 마세요."},
      {check:(im)=>Object.keys(im).some(n=>['생강','알로에'].includes(n)), severity:"good", title:"생강·알로에 — 식도·위 점막 보호",
        detail:()=>`생강의 진저롤은 위 배출을 촉진하여 역류 기회를 줄이고, 알로에는 식도 점막을 진정시킵니다.`,
        tip:"식전 생강차 한 잔이 위 배출을 도와 GERD 증상을 완화할 수 있습니다."},
    ]
  },

  gastritis: {
    label: "위염 / 위궤양", label_en: "Gastritis/Ulcer", emoji: "🫁",
    desc: "위 점막 염증·손상 — 공복통·오심", desc_en: "Stomach lining inflammation or ulcer",
    rules: [
      {check:(im)=>Object.keys(im).some(n=>DB[n]?.compounds?.some(c=>c.includes('캡사이신'))||(im[n]||0)>10), severity:"danger", title:"캡사이신 — 위 점막 직접 자극",
        detail:()=>`고추의 캡사이신은 위 점막의 TRPV1 수용체를 자극하여 위산 분비를 증가시키고 점막 보호층을 손상시킵니다.`,
        tip:"급성기에는 고추·고춧가루를 완전히 피하세요. 회복 후에도 소량부터 시작하세요."},
      {check:(im)=>Object.keys(im).some(n=>n.includes('술')||['소주','맥주','와인','막걸리'].includes(n)), severity:"danger", title:"알코올 — 위 점막 직접 손상",
        detail:()=>`알코올은 점막 보호 점액층을 분해하고 위산 분비를 증가시켜 궤양을 악화시킵니다.`,
        tip:"위염·궤양 치료 중에는 알코올을 완전히 중단하세요."},
      {check:(im)=>Object.keys(im).some(n=>['커피','녹차','홍차'].includes(n)), severity:"caution", title:"카페인·탄닌 — 위산 분비 자극",
        detail:()=>`카페인은 위산 분비를 촉진하고, 탄닌은 위 점막에 결합하여 자극합니다. 공복 섭취 시 특히 주의하세요.`,
        tip:"위염 시 커피·차는 식후 소량만, 또는 카페인 프리(루이보스)로 대체하세요."},
      {check:(im,c)=>c.protein<10, severity:"caution", title:"저단백 식사 — 점막 재생 부족",
        detail:(im,c)=>`단백질 ${c.protein.toFixed(1)}g — 위 점막 재생에는 아미노산(특히 글루타민)이 필요합니다. 단백질 섭취 부족은 회복을 늦춥니다.`,
        tip:"소화가 쉬운 달걀흰자, 두부, 흰살생선으로 단백질을 보충하세요."},
      {check:(im)=>Object.keys(im).some(n=>['양배추','브로콜리'].includes(n)), severity:"good", title:"양배추·브로콜리 — 위 점막 보호",
        detail:()=>`양배추의 비타민U(메틸메티오닌)는 위 점막 재생을 촉진합니다. 브로콜리의 설포라판은 H.pylori(헬리코박터균) 억제 효과가 있습니다.`,
        tip:"양배추즙이나 살짝 쪄서 먹는 것이 위 보호에 효과적입니다."},
      {check:(im,c,m)=>['deep_fry','charcoal','stir_fry'].includes(m), severity:"caution", title:"고온·기름진 조리 — 위 배출 지연",
        detail:()=>`튀김·볶음·숯불구이는 지방 함량이 높아 위 배출을 지연시켜 포만감과 통증을 악화시킵니다.`,
        tip:"찜·삶기·수비드 등 부드러운 조리법으로 전환하세요."},
    ]
  },

  osteoporosis: {
    label: "골다공증", label_en: "Osteoporosis", emoji: "🦴",
    desc: "골밀도 감소 — 골절 위험 증가", desc_en: "Bone density loss",
    rules: [
      {check:(im)=>!Object.keys(im).some(n=>DB[n]?.vit?.calcium||(DB[n]?.vit&&'calcium' in DB[n].vit)), severity:"caution", title:"칼슘 공급원 부재",
        detail:()=>`칼슘 함유 식품이 없습니다. 골다공증 환자는 1일 1,000-1,200mg 칼슘이 필요합니다.`,
        tip:"두부(350mg/100g), 멸치(1,000mg/100g), 우유(120mg/100ml)를 포함하세요."},
      {check:(im,c)=>c.sodium>800, severity:"danger", title:"고나트륨 — 소변으로 칼슘 배출 증가",
        detail:(im,c)=>`나트륨 ${c.sodium.toFixed(0)}mg — 나트륨 1,000mg 섭취 시 소변으로 칼슘 26mg이 추가 손실됩니다. 골밀도 감소를 가속화합니다.`,
        tip:"저나트륨 식단을 유지하세요. 나트륨 감소가 칼슘 보충만큼 중요합니다."},
      {check:(im)=>Object.keys(im).some(n=>['콜라','사이다'].includes(n)), severity:"danger", title:"탄산음료(인산) — 칼슘 흡수 방해 + 뼈에서 칼슘 용출",
        detail:()=>`콜라의 인산은 칼슘과 결합하여 흡수를 방해하고, 혈중 칼슘 균형을 맞추기 위해 뼈에서 칼슘이 용출됩니다.`,
        tip:"탄산음료를 유제품·칼슘 강화 두유로 대체하세요."},
      {check:(im)=>Object.keys(im).some(n=>['시금치','견과류'].includes(n))&&!Object.keys(im).some(n=>['두부','멸치','우유'].includes(n)), severity:"caution", title:"옥살산 식품만 있음 — 칼슘 흡수 방해",
        detail:()=>`시금치·견과류의 옥살산은 칼슘과 결합해 불용성 옥살산칼슘을 형성하여 흡수를 방해합니다.`,
        tip:"칼슘 흡수를 위해 두부·멸치·유제품을 함께 포함하거나, 시금치는 데쳐서 옥살산을 줄이세요."},
      {check:(im)=>Object.keys(im).some(n=>['두부','멸치','우유','치즈','요거트'].includes(n)), severity:"good", title:"칼슘 공급원 포함 — 골밀도 유지",
        detail:()=>`두부·멸치·유제품에 칼슘이 풍부합니다. 비타민D(햇볕)와 함께 섭취해야 흡수율이 2-3배 높아집니다.`,
        tip:"칼슘 보충제보다 음식으로 섭취하는 칼슘의 흡수율이 더 높습니다."},
      {check:(im)=>Object.keys(im).some(n=>['연어','고등어','청어'].includes(n)), severity:"good", title:"등푸른 생선 — 비타민D + 오메가3 뼈 보호",
        detail:()=>`연어·고등어는 비타민D(칼슘 흡수 촉진)와 오메가3(파골세포 억제, 조골세포 촉진)를 동시에 제공합니다.`,
        tip:"주 2회 등푸른 생선 섭취로 비타민D와 오메가3를 효율적으로 보충하세요."},
    ]
  },

  metabolic_syndrome: {
    label: "대사증후군", label_en: "Metabolic Syndrome", emoji: "⚗️",
    desc: "복부비만·고혈당·고혈압·이상지질혈증 복합", desc_en: "Abdominal obesity, high blood sugar, dyslipidemia complex",
    rules: [
      {check:(im,c)=>c.carbs>60&&c.fiber<3, severity:"danger", title:"고탄수 + 저섬유 — 인슐린 저항성 악화",
        detail:(im,c)=>`탄수화물 ${c.carbs.toFixed(1)}g, 식이섬유 ${c.fiber.toFixed(1)}g — 정제 탄수화물만 많고 섬유질이 없으면 혈당 스파이크 → 인슐린 과분비 → 인슐린 저항성 악화의 악순환이 반복됩니다.`,
        tip:"백미 대신 현미·잡곡, 흰빵 대신 통밀빵으로 교체하고 채소를 먼저 드세요."},
      {check:(im,c)=>c.sodium>700&&c.saturatedFat>8, severity:"danger", title:"고나트륨 + 포화지방 복합 위험",
        detail:(im,c)=>`나트륨 ${c.sodium.toFixed(0)}mg + 포화지방 ${c.saturatedFat.toFixed(1)}g — 대사증후군의 두 핵심 위험인자가 동시에 과다합니다.`,
        tip:"나트륨과 포화지방을 동시에 줄이는 지중해식 식이가 대사증후군 개선에 가장 효과적입니다."},
      {check:(im,c)=>c.calories>550, severity:"caution", title:"과잉 칼로리 — 내장지방 축적",
        detail:(im,c)=>`칼로리 ${c.calories.toFixed(0)}kcal — 대사증후군 환자는 복부 내장지방 감소가 핵심입니다. 과잉 칼로리는 내장지방을 늘립니다.`,
        tip:"하루 500kcal 적자를 목표로, 설탕·알코올·포화지방 순으로 줄이세요."},
      {check:(im,c)=>c.fiber>8, severity:"good", title:"풍부한 식이섬유 — 인슐린 감수성 개선",
        detail:(im,c)=>`식이섬유 ${c.fiber.toFixed(1)}g — 식이섬유는 혈당 흡수를 늦추고, 장내 미생물을 통해 인슐린 감수성을 개선합니다.`,
        tip:"1일 식이섬유 목표 25-30g. 채소·콩류·귀리가 풍부합니다."},
      {check:(im)=>Object.keys(im).some(n=>DB[n]?.compounds?.some(c=>c.includes('알리신'))), severity:"good", title:"마늘·양파 — 혈당·혈압·지질 동시 개선",
        detail:()=>`알리신과 케르세틴은 인슐린 감수성, 혈압 강하, LDL 감소에 동시 효과가 있어 대사증후군에 특히 유익합니다.`,
        tip:"마늘은 다져서 15분 후 가열하면 알리신이 최대로 생성됩니다."},
    ]
  },

  celiac: {
    label: "셀리악병 (글루텐)", label_en: "Celiac Disease", emoji: "⚠️",
    desc: "글루텐에 의한 소장 자가면역 손상", desc_en: "Autoimmune gluten intolerance",
    rules: [
      {check:(im)=>Object.keys(im).some(n=>['밀가루','빵','파스타','국수','보리','호밀','맥아'].includes(n)), severity:"danger", title:"<img src=\"https://images.pexels.com/photos/2889942/pexels-photo-2889942.jpeg?auto=compress&cs=tinysrgb&w=20&h=20&fit=crop\" style=\"width:20px;height:20px;border-radius:4px;object-fit:cover;vertical-align:middle\" onerror=\"this.outerHTML='<span>⚠️</span>'\"> 글루텐 함유 식품 — 소장 융모 파괴",
        detail:(im)=>`${Object.keys(im).filter(n=>['밀가루','빵','파스타','국수','보리','호밀','맥아'].includes(n)).join(', ')}에 글루텐이 포함되어 있습니다. 셀리악 환자는 소량(20ppm 이상)에도 면역 반응이 발생합니다.`,
        tip:"글루텐 프리(쌀가루, 타피오카, 퀴노아, 아마란스, 감자전분) 식재료로 완전히 교체하세요."},
      {check:(im)=>Object.keys(im).some(n=>['간장','된장','고추장'].includes(n)), severity:"caution", title:"발효 장류 — 숨겨진 글루텐 주의",
        detail:()=>`일반 간장(밀 함유)·된장·고추장에는 밀이 포함될 수 있습니다. 성분표를 반드시 확인하세요.`,
        tip:"글루텐 프리 인증 간장(100% 쌀로 만든 타마리 간장)을 사용하세요."},
      {check:(im)=>!Object.keys(im).some(n=>['밀가루','빵','파스타','국수','보리','호밀','간장','된장'].includes(n)), severity:"good", title:"글루텐 감지 없음 ✓",
        detail:()=>`현재 재료 조합에서 주요 글루텐 식품이 감지되지 않았습니다. 단, 가공식품의 숨겨진 글루텐(전분, 몰트 등)에 주의하세요.`,
        tip:"교차 오염도 중요합니다. 글루텐이 닿은 도마·팬을 공유하지 마세요."},
      {check:(im,c)=>c.fiber>5&&!Object.keys(im).some(n=>['밀가루','빵','보리'].includes(n)), severity:"good", title:"글루텐 프리 + 식이섬유 충분",
        detail:(im,c)=>`식이섬유 ${c.fiber.toFixed(1)}g — 셀리악 환자는 글루텐 제한으로 식이섬유가 부족하기 쉬운데, 이 식사는 채소·콩류로 충분히 보충됩니다.`,
        tip:"쌀겨, 치아씨드, 아마씨는 글루텐 프리이면서 식이섬유가 풍부합니다."},
    ]
  },

  crohns: {
    label: "크론병 (Crohn's)", label_en: "Crohn's Disease", emoji: "🫀",
    desc: "소화관 전체 만성 염증성 장질환", desc_en: "Inflammatory bowel disease",
    rules: [
      {check:(im,c)=>c.fiber>10, severity:"caution", title:"고식이섬유 — 협착 시 폐색 위험",
        detail:(im,c)=>`식이섬유 ${c.fiber.toFixed(1)}g — 크론병으로 장 협착이 있는 경우 고식이섬유는 장 폐색을 유발할 수 있습니다. 급성기에는 저잔사 식이가 권장됩니다.`,
        tip:"급성기·협착기에는 식이섬유를 5g 이하로 제한하고, 완해기에 서서히 늘리세요."},
      {check:(im,c)=>c.fat>25, severity:"caution", title:"고지방 — 장 자극 및 설사 유발",
        detail:(im,c)=>`지방 ${c.fat.toFixed(1)}g — 지방은 소화가 느리고 장 수축을 자극하여 크론병 증상을 악화시킬 수 있습니다.`,
        tip:"저지방 조리법(찜·삶기)을 선택하고, MCT오일은 일반 지방보다 흡수가 용이합니다."},
      {check:(im)=>Object.keys(im).some(n=>['양파','마늘','양배추','브로콜리'].includes(n)&&(im[n]||0)>60), severity:"caution", title:"고FODMAP + 십자화과 — 장 가스·경련",
        detail:()=>`양파·마늘·양배추·브로콜리는 발효성 당류가 풍부하여 크론병 환자의 복통과 팽만감을 악화시킬 수 있습니다.`,
        tip:"급성기에는 저FODMAP 식이(파 녹색 부분, 당근, 호박 등)로 전환하세요."},
      {check:(im)=>Object.keys(im).some(n=>['연어','고등어','참치'].includes(n)), severity:"good", title:"오메가3 생선 — 장 염증 억제",
        detail:()=>`오메가3(EPA/DHA)는 장 염증의 핵심 매개체인 프로스타글란딘과 류코트리엔 생성을 억제합니다.`,
        tip:"등푸른 생선을 주 2-3회 섭취하거나 오메가3 보충제를 고려하세요."},
      {check:(im,c)=>c.protein<15, severity:"caution", title:"저단백 — 영양 불량·장 점막 회복 부족",
        detail:(im,c)=>`크론병은 영양 흡수 장애로 단백질 결핍이 흔합니다. 단백질 ${c.protein.toFixed(1)}g은 장 점막 재생과 면역 유지에 부족합니다.`,
        tip:"소화가 쉬운 흰살생선·달걀·두부를 우선하세요."},
    ]
  },

  arthritis: {
    label: "관절염 (류마티스)", label_en: "Rheumatoid Arthritis", emoji: "🦵",
    desc: "관절 염증·통증 — 자가면역 또는 퇴행성", desc_en: "Autoimmune joint inflammation",
    rules: [
      {check:(im,c)=>c.saturatedFat>10, severity:"danger", title:"포화지방 과다 — 염증 사이토카인 촉진",
        detail:(im,c)=>`포화지방 ${c.saturatedFat.toFixed(1)}g — 포화지방은 아라키돈산 대사를 통해 프로스타글란딘 E2와 TNF-α 등 염증 사이토카인 생성을 촉진합니다.`,
        tip:"버터·삼겹살을 올리브오일·아보카도로 교체하세요."},
      {check:(im)=>Object.keys(im).some(n=>DB[n]?.compounds?.some(c=>c.includes('오메가3'))||['연어','고등어','청어','참치','아마씨'].includes(n)), severity:"good", title:"오메가3 — 관절 염증 30% 감소",
        detail:()=>`오메가3의 EPA는 염증성 에이코사노이드를 소염성 에이코사노이드로 전환하여 류마티스 관절염의 조조강직과 통증을 유의하게 줄입니다.`,
        tip:"EPA+DHA 2-4g/일이 관절 증상 개선에 효과적인 용량입니다."},
      {check:(im)=>Object.keys(im).some(n=>DB[n]?.compounds?.some(c=>c.includes('커큐민'))||['강황'].includes(n)), severity:"good", title:"커큐민(강황) — COX-2 억제, NSAIDs 유사 효과",
        detail:()=>`커큐민은 COX-2와 NF-κB를 억제하여 NSAIDs와 유사한 항염 효과를 보이면서도 위장 부작용이 없습니다.`,
        tip:"후추의 피페린과 함께 섭취하면 커큐민 흡수율이 2,000% 증가합니다."},
      {check:(im)=>Object.keys(im).some(n=>['가지','토마토','피망','고추'].includes(n)), severity:"info", title:"나이트쉐이드(가지·토마토·피망·고추) — 일부 환자 주의",
        detail:()=>`나이트쉐이드 계열 채소의 솔라닌·알칼로이드가 일부 류마티스 환자에서 증상을 악화시킨다는 보고가 있습니다. 개인차가 큽니다.`,
        tip:"2-4주간 이 채소를 제외한 식이로 증상 변화를 관찰해보세요(elimination diet)."},
      {check:(im)=>Object.keys(im).some(n=>['생강'].includes(n)), severity:"good", title:"생강 — 5-LOX 억제 항염 효과",
        detail:()=>`생강의 진저롤과 쇼가올은 5-리폭시게나제를 억제하여 류코트리엔 생성을 줄이고 관절 통증을 완화합니다.`,
        tip:"하루 1-2g 생강 섭취(생강차, 조리에 첨가)가 효과적입니다."},
      {check:(im,c)=>c.fiber>6, severity:"good", title:"식이섬유 — 장내 미생물 개선 → 전신 염증 감소",
        detail:(im,c)=>`식이섬유 ${c.fiber.toFixed(1)}g — 식이섬유는 장내 유익균(특히 Akkermansia)을 증식시켜 장 투과성을 줄이고 전신 염증 수준을 낮춥니다.`,
        tip:"다양한 채소·콩류·통곡물로 장내 미생물 다양성을 높이세요."},
    ]
  },

  thyroid_hyper: {
    label: "갑상선 기능항진증", label_en: "Hyperthyroidism", emoji: "🦋",
    desc: "갑상선 호르몬 과다 — 체중감소·빈맥·열감", desc_en: "Overactive thyroid",
    rules: [
      {check:(im)=>Object.keys(im).some(n=>['미역','다시마','김','굴'].includes(n)&&(im[n]||0)>30), severity:"danger", title:"고요오드 식품 — 갑상선 호르몬 과잉 합성 악화",
        detail:(im)=>`다시마(2,500μg/100g), 미역(1,000μg/100g)은 요오드 함량이 매우 높습니다. 기능항진 시 요오드 과다는 호르몬 분비를 더 촉진할 수 있습니다.`,
        tip:"갑상선 기능항진 치료 중에는 해조류 섭취를 엄격히 제한하세요."},
      {check:(im)=>Object.keys(im).some(n=>['양배추','브로콜리','케일','콜리플라워'].includes(n)), severity:"good", title:"십자화과 채소(생) — 고이트로겐이 갑상선 억제",
        detail:()=>`양배추·브로콜리의 고이트로겐은 갑상선 호르몬 합성 효소(TPO)를 억제합니다. 기능항진 시에는 오히려 유익할 수 있습니다.`,
        tip:"기능항진 환자는 십자화과 채소를 생으로 적당히 섭취할 수 있습니다. 단, 항갑상선제 용량 조정이 필요할 수 있으니 의사와 상담하세요."},
      {check:(im,c)=>c.calories<300, severity:"caution", title:"저칼로리 — 기초대사 항진으로 영양 소모 증가",
        detail:(im,c)=>`기능항진 시 기초대사율이 15-50% 증가합니다. 칼로리 ${c.calories.toFixed(0)}kcal는 부족할 수 있습니다.`,
        tip:"칼로리 밀도 높은 식품(견과류, 아보카도, 통곡물)으로 에너지를 보충하세요."},
      {check:(im,c)=>c.protein<20, severity:"caution", title:"저단백 — 근육 소모 가속",
        detail:(im,c)=>`기능항진 시 근육 단백질이 에너지로 소모됩니다. 단백질 ${c.protein.toFixed(1)}g은 근감소 예방에 부족합니다.`,
        tip:"체중 kg당 1.2-1.5g의 단백질 섭취를 목표로 하세요."},
      {check:(im)=>Object.keys(im).some(n=>['두부','콩','두유'].includes(n)), severity:"info", title:"대두 이소플라본 — 갑상선 기능 조절",
        detail:()=>`대두 이소플라본은 갑상선 호르몬 합성 효소를 약하게 억제하여 기능항진 환자에게 중립적이거나 약간 유익할 수 있습니다.`,
        tip:"대두 식품은 적당량 섭취하되, 항갑상선제와의 상호작용을 의사와 확인하세요."},
    ]
  },

  pancreatitis: {
    label: "췌장염", label_en: "Pancreatitis", emoji: "🫁",
    desc: "췌장 염증 — 지방 소화효소 분비 장애", desc_en: "Pancreatic inflammation",
    rules: [
      {check:(im,c)=>c.fat>15, severity:"danger", title:"지방 과다 — 췌장 효소 과분비 → 자가소화",
        detail:(im,c)=>`지방 ${c.fat.toFixed(1)}g — 지방 섭취는 췌장에서 리파아제 분비를 촉진합니다. 췌장염 환자는 1회 지방 5-10g 이하가 권장됩니다.`,
        tip:"유일하게 안전한 조리법은 찜·삶기입니다. 기름은 1티스푼 이하로 제한하세요."},
      {check:(im,c)=>c.fat<=10, severity:"good", title:"저지방 식사 — 췌장 자극 최소화",
        detail:(im,c)=>`지방 ${c.fat.toFixed(1)}g — 췌장 회복에 적합한 저지방 수준입니다.`,
        tip:"MCT오일은 일반 지방보다 췌장 부담이 적습니다."},
      {check:(im,c)=>c.protein>30, severity:"caution", title:"고단백 — 췌장 효소 분비 자극",
        detail:(im,c)=>`단백질 ${c.protein.toFixed(1)}g — 고단백도 췌장 효소 분비를 자극합니다. 1회 20g 이하가 권장됩니다.`,
        tip:"소량씩 자주 먹는 소식다식(小食多食) 패턴을 유지하세요."},
      {check:(im)=>Object.keys(im).some(n=>n.includes('술')||['소주','맥주','와인'].includes(n)), severity:"danger", title:"알코올 — 췌장염 최대 위험인자",
        detail:()=>`알코올성 췌장염은 전체의 30%를 차지합니다. 췌장염 환자에게 알코올은 완전 금지입니다.`,
        tip:"알코올성 췌장염 환자는 금주가 치료의 핵심입니다."},
      {check:(im)=>Object.keys(im).some(n=>['사과','배','복숭아','수박'].includes(n))&&!Object.keys(im).some(n=>['버터','삼겹살','기름'].includes(n)), severity:"good", title:"저지방 과일·채소 — 회복기 적합",
        detail:()=>`저지방 과일과 채소는 췌장에 부담을 최소화하면서 항산화 성분을 공급합니다.`,
        tip:"회복기에는 저지방·저섬유·부드러운 음식에서 서서히 다양화하세요."},
    ]
  },

  gallstone: {
    label: "담석증", label_en: "Gallbladder Disease", emoji: "🟡",
    desc: "담낭 내 결석 형성 — 고지방 섭취 시 통증", desc_en: "Gallstones or gallbladder issues",
    rules: [
      {check:(im,c)=>c.fat>20, severity:"danger", title:"고지방 식사 — 담낭 수축 → 담석 통증 유발",
        detail:(im,c)=>`지방 ${c.fat.toFixed(1)}g — 지방 섭취는 콜레시스토키닌(CCK)을 분비하여 담낭을 강하게 수축시킵니다. 담석이 있으면 이 수축이 극심한 통증을 유발합니다.`,
        tip:"1회 지방을 10g 이하로 제한하세요. 특히 튀김·기름진 고기를 피하세요."},
      {check:(im)=>Object.keys(im).some(n=>['계란'].includes(n)&&(im[n]||0)>100), severity:"caution", title:"계란 과다 — 콜레스테롤 담석 위험",
        detail:()=>`콜레스테롤 담석(전체의 80%)은 담즙 내 콜레스테롤 과포화로 형성됩니다. 계란 대량 섭취는 위험을 높일 수 있습니다.`,
        tip:"계란은 1일 1개 이하로 제한하세요."},
      {check:(im,c)=>c.fiber>7, severity:"good", title:"식이섬유 — 담즙산 재흡수 억제, 담석 예방",
        detail:(im,c)=>`식이섬유 ${c.fiber.toFixed(1)}g — 식이섬유는 담즙산을 결합하여 대변으로 배출시키고, 담즙 내 콜레스테롤 농도를 낮춰 담석 형성을 억제합니다.`,
        tip:"채소·과일·통곡물을 꾸준히 섭취하세요."},
      {check:(im)=>Object.keys(im).some(n=>['올리브오일'].includes(n)&&(im[n]||0)<15), severity:"good", title:"소량 올리브오일 — 담낭 수축 정상화",
        detail:()=>`소량의 올리브오일(5-10ml)은 담낭을 규칙적으로 수축시켜 담즙이 정체되지 않게 하여 담석 형성을 예방합니다.`,
        tip:"지중해식 식이의 소량 올리브오일은 담석 예방에 도움이 됩니다."},
      {check:(im,c,m)=>['deep_fry'].includes(m), severity:"danger", title:"튀김 — 담낭 발작 최대 위험",
        detail:()=>`튀김은 지방 흡수량이 가장 많은 조리법으로, 담석 환자에서 급성 담낭 발작을 가장 자주 유발합니다.`,
        tip:"튀김은 완전히 피하세요. 찜·삶기·구이로 대체하세요."},
    ]
  },

  pcos: {
    label: "다낭성 난소 증후군 (PCOS)", label_en: "PCOS", emoji: "🌸",
    desc: "인슐린 저항성·남성호르몬 과다 — 생리 불규칙", desc_en: "Polycystic ovary syndrome",
    rules: [
      {check:(im,c)=>c.carbs>55&&c.fiber<4, severity:"danger", title:"고정제 탄수화물 — 인슐린 급등 → 안드로겐 증가",
        detail:(im,c)=>`PCOS의 70-80%가 인슐린 저항성을 가집니다. 정제 탄수화물 ${c.carbs.toFixed(1)}g은 인슐린을 급격히 올려 난소에서 안드로겐(남성호르몬) 생성을 자극합니다.`,
        tip:"저GI 식품(통곡물, 콩류, 채소) 위주로 탄수화물을 섭취하세요."},
      {check:(im)=>Object.keys(im).some(n=>['두부','두유','콩','된장'].includes(n)), severity:"good", title:"콩 이소플라본 — 안드로겐 수용체 경쟁",
        detail:()=>`콩의 이소플라본(제니스테인, 다이드제인)은 안드로겐 수용체에 결합하여 남성호르몬의 효과를 약화시키고 인슐린 감수성을 개선합니다.`,
        tip:"하루 두부 100-150g 또는 두유 1-2잔이 PCOS 증상 개선에 도움됩니다."},
      {check:(im)=>Object.keys(im).some(n=>['연어','고등어','참치'].includes(n)), severity:"good", title:"오메가3 — 인슐린 감수성 개선 + 염증 감소",
        detail:()=>`오메가3는 인슐린 수용체 신호 전달을 개선하고, PCOS와 관련된 만성 염증을 줄입니다.`,
        tip:"주 2-3회 등푸른 생선 섭취 또는 오메가3 보충제(2-4g/일)를 권장합니다."},
      {check:(im)=>Object.keys(im).some(n=>['계피','강황'].includes(n)), severity:"good", title:"계피·강황 — 인슐린 감수성 개선",
        detail:()=>`계피의 신남알데히드는 인슐린 수용체 인산화를 촉진하며, 강황의 커큐민은 만성 염증과 인슐린 저항성을 동시에 개선합니다.`,
        tip:"하루 계피 1-2g(차, 요거트 토핑)이 혈당 조절에 도움됩니다."},
      {check:(im,c)=>c.fiber>6, severity:"good", title:"식이섬유 — 혈당·인슐린 완화",
        detail:(im,c)=>`식이섬유 ${c.fiber.toFixed(1)}g — 수용성 식이섬유는 탄수화물 흡수를 늦추고 인슐린 분비를 줄입니다.`,
        tip:"아침 귀리죽(β-글루칸), 콩류가 PCOS 혈당 관리에 특히 유익합니다."},
    ]
  },

  sarcopenia: {
    label: "근감소증 (Sarcopenia)", label_en: "Sarcopenia", emoji: "💪",
    desc: "근육량·근력 감소 — 노인·장기 입원·활동 저하", desc_en: "Age-related muscle mass and strength loss",
    rules: [
      {check:(im,c)=>c.protein<20, severity:"danger", title:"단백질 부족 — 근합성 불가",
        detail:(im,c)=>`단백질 ${c.protein.toFixed(1)}g — 근감소증 예방을 위해 1끼 최소 25-30g 단백질이 필요합니다. 류신(leucine) 2-3g이 근합성 스위치를 켭니다.`,
        tip:"계란(6g/개), 닭가슴살(30g/100g), 참치(26g/100g)로 단백질을 보충하세요."},
      {check:(im,c)=>c.protein>=25&&c.protein<=45, severity:"good", title:"단백질 적정 — 근합성 조건 충족",
        detail:(im,c)=>`단백질 ${c.protein.toFixed(1)}g — 근합성에 충분한 단백질이 포함되어 있습니다. 식사 후 30-60분 내 가벼운 운동으로 효과를 극대화하세요.`,
        tip:"단백질은 한 번에 많이 먹는 것보다 매끼 고르게 분배하는 것이 근합성에 더 효과적입니다."},
      {check:(im)=>Object.keys(im).some(n=>['계란','닭고기','연어','참치','두부'].includes(n)), severity:"good", title:"류신 풍부 식품 — mTOR 경로 활성화",
        detail:()=>`계란·닭고기·연어·참치·두부는 분지쇄 아미노산(BCAA), 특히 류신이 풍부합니다. 류신은 mTOR 신호 경로를 통해 근단백 합성을 직접 촉진합니다.`,
        tip:"근감소증 예방에는 식물성보다 동물성 단백질(류신 함량 높음)이 더 효과적입니다."},
      {check:(im,c)=>c.calories<300&&c.protein<15, severity:"danger", title:"칼로리·단백질 모두 부족 — 근육 소모",
        detail:(im,c)=>`칼로리 ${c.calories.toFixed(0)}kcal, 단백질 ${c.protein.toFixed(1)}g — 에너지 부족 시 근육 단백질이 에너지원으로 분해됩니다(근육 이화).`,
        tip:"칼로리와 단백질을 동시에 충분히 섭취해야 근육 유지가 가능합니다."},
      {check:(im)=>Object.keys(im).some(n=>['연어','고등어'].includes(n)), severity:"good", title:"등푸른 생선 — 비타민D + 오메가3 근육 보호",
        detail:()=>`비타민D는 근섬유 재생을 촉진하고, 오메가3는 근육 단백 분해 신호(NF-κB)를 억제합니다. 근감소증 예방에 시너지 효과가 있습니다.`,
        tip:"주 2회 연어·고등어 섭취로 비타민D와 오메가3를 동시에 보충하세요."},
    ]
  },

  // ── 암 / 종양 ─────────────────────────────────────────────────────────────
  stomach_cancer: {
    label:"위암", label_en:"Stomach Cancer", emoji:"🫃",
    desc:"위 점막 악성종양 — 식염·가공육·H.pylori 연관", desc_en:"Gastric malignancy — salt, processed meat, H.pylori related",
    rules:[
      {check:(im,c)=>c.sodium>1200, severity:"danger", title:"고염 식품 — 위 점막 손상·H.pylori 증식 촉진",
        detail:()=>`소금은 위 점막 보호층을 손상시키고 H.pylori 감염을 촉진합니다. 하루 나트륨 2,000mg 이하를 목표로 하세요.`,
        tip:"국물 섭취 최소화, 젓갈·절임류 제한. 요리 시 소금 대신 식초·레몬즙을 활용하세요."},
      {check:(im)=>Object.keys(im).some(n=>['베이컨','소시지','햄','훈제연어'].includes(n)), severity:"danger", title:"가공·훈제육 — 니트로사민 발암물질",
        detail:()=>`훈제·염장 가공육의 니트로사민과 PAH는 위암 위험을 최대 74% 증가시킵니다.`,
        tip:"가공육은 주 1회 이하로 제한하세요."},
      {check:(im)=>Object.keys(im).some(n=>['마늘','브로콜리','양배추'].includes(n)), severity:"good", title:"알리신·설포라판 — H.pylori 억제·항암",
        detail:()=>`마늘의 알리신은 H.pylori를 직접 억제합니다. 브로콜리·양배추의 설포라판은 발암물질 해독 효소를 유도합니다.`,
        tip:"마늘은 으깬 후 10분 방치하면 알리신 생성 최대화."},
      {check:(im)=>Object.keys(im).some(n=>n.includes('토마토')), severity:"good", title:"리코펜(토마토) — 위암 세포 산화 억제",
        detail:()=>`조리된 토마토(소스·케첩)는 생토마토보다 리코펜 흡수율이 3배 높습니다.`,
        tip:"올리브오일과 함께 조리한 토마토 소스 형태가 가장 효과적입니다."},
      {check:(im,c,m)=>m&&['char_grill','bbq','smoke'].includes(m), severity:"caution", title:"고온 직화·훈연 — PAH·HCA 발암물질",
        detail:()=>`300°C 이상 직화 시 벤조피렌 등 발암물질이 생성됩니다.`,
        tip:"찜·삶기·저온 조리로 대체하고 탄 부분은 제거하세요."},
    ]
  },

  liver_cancer: {
    label:"간암", label_en:"Liver Cancer", emoji:"🟫",
    desc:"간세포암 — B·C형 간염·간경변·알코올성 간질환 배경", desc_en:"Hepatocellular carcinoma — hepatitis/cirrhosis related",
    rules:[
      {check:(im,c)=>Object.keys(im).some(n=>n.includes('술')||n.includes('맥주')||n.includes('소주')||n.includes('와인')), severity:"danger", title:"알코올 — 간경변 촉진·간암 위험 직접 상승",
        detail:()=>`알코올 대사 산물 아세트알데히드는 발암물질입니다. 간암 환자에게 알코올은 절대 금기입니다.`,
        tip:"알코올 완전 차단이 필수입니다."},
      {check:(im)=>Object.keys(im).some(n=>['땅콩','옥수수'].includes(n)), severity:"caution", title:"아플라톡신 위험 식품 — 간암 발암물질",
        detail:()=>`곰팡이 오염 땅콩·옥수수의 아플라톡신 B1은 WHO 1군 발암물질입니다.`,
        tip:"오래되거나 곰팡이 흔적이 있는 제품은 즉시 폐기하세요."},
      {check:(im)=>Object.keys(im).some(n=>['브로콜리','양배추','케일'].includes(n)), severity:"good", title:"십자화과 채소 — 간 해독 효소 유도",
        detail:()=>`설포라판은 Phase II 해독 효소를 활성화하여 발암물질 제거를 돕습니다.`,
        tip:"주 3-4회 섭취를 목표로 하세요."},
      {check:(im)=>Object.keys(im).some(n=>n.includes('커피')), severity:"good", title:"커피 — 간섬유화·간암 위험 감소",
        detail:()=>`하루 2-3잔의 커피가 간경변 위험 44%, 간암 위험 40% 감소와 연관됩니다.`,
        tip:"블랙커피 또는 아메리카노를 권장합니다."},
      {check:(im,c)=>c.fat>25&&c.carbs>60, severity:"caution", title:"고지방+고탄수화물 — 지방간 진행 가속",
        detail:()=>`과잉 에너지 섭취는 간내 지방 축적을 가속화하고 간경변·간암 진행 위험을 높입니다.`,
        tip:"균형 잡힌 식사로 적정 체중 유지가 간 건강의 핵심입니다."},
    ]
  },

  colon_cancer: {
    label:"대장암", label_en:"Colorectal Cancer", emoji:"🔄",
    desc:"대장·직장 악성종양 — 식이섬유 부족·적색육 연관", desc_en:"Colorectal malignancy — low fiber, red meat related",
    rules:[
      {check:(im)=>Object.keys(im).some(n=>['소고기','돼지고기','양고기','베이컨','소시지','햄'].includes(n)), severity:"danger", title:"적색·가공육 — 대장암 위험 증가 (WHO 1군 발암물질)",
        detail:()=>`가공육은 WHO 1군 발암물질입니다. 적색육 100g/일 추가 섭취마다 대장암 위험 17% 증가. 헴철·니트로사민이 주요 기전입니다.`,
        tip:"가공육 주 1회 이하, 적색육 주 300g 이하(조리 후)로 제한하세요."},
      {check:(im,c)=>c.fiber<5, severity:"caution", title:"식이섬유 부족 — 발암물질 접촉 시간 증가",
        detail:()=>`식이섬유는 변 통과 시간을 단축해 발암물질의 장 점막 접촉을 줄입니다.`,
        tip:"통곡물·콩류·채소·과일을 적극 섭취하세요."},
      {check:(im,c)=>c.fiber>8, severity:"good", title:"풍부한 식이섬유 — 부티레이트 생성 (암 억제)",
        detail:()=>`발효성 식이섬유는 부티레이트로 전환되어 대장 세포 에너지원이자 암 억제 유전자 활성화 인자로 작용합니다.`,
        tip:"콩류·귀리·사과·당근 등 다양한 섬유를 섭취하세요."},
      {check:(im)=>Object.keys(im).some(n=>['마늘','양파'].includes(n)), severity:"good", title:"알리움 채소 — 항암 유기황화합물",
        detail:()=>`마늘·양파의 알리신·퀘르세틴은 대장암 세포 증식 억제 및 세포 사멸 유도 효과가 있습니다.`,
        tip:"주 5회 이상 마늘·양파를 요리에 사용하세요."},
      {check:(im,c,m,t)=>m&&['char_grill','bbq'].includes(m)&&t>250, severity:"caution", title:"직화 고온 조리 — HCA(헤테로고리아민) 생성",
        detail:()=>`250°C 이상 직화 조리 시 이형방향족아민(HCA)이 생성되어 대장 세포 DNA 돌연변이를 유발합니다.`,
        tip:"찜·삶기·저온 오븐으로 대체하세요."},
    ]
  },

  lung_cancer: {
    label:"폐암", label_en:"Lung Cancer", emoji:"🫁",
    desc:"폐 악성종양 — 흡연·발암물질·산화 스트레스 연관", desc_en:"Pulmonary malignancy — smoking/carcinogen related",
    rules:[
      {check:(im)=>Object.keys(im).some(n=>['당근','고구마','호박','시금치'].includes(n)), severity:"good", title:"카로티노이드 — 항산화·폐 세포 보호",
        detail:()=>`식품 형태의 베타카로틴·루테인·리코펜은 폐 세포를 산화 스트레스로부터 보호합니다. <img src="https://images.pexels.com/photos/2889942/pexels-photo-2889942.jpeg?auto=compress&cs=tinysrgb&w=20&h=20&fit=crop" style="width:20px;height:20px;border-radius:4px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='<span>⚠️</span>'"> 흡연자는 베타카로틴 보충제를 피하세요 (CARET 연구).`,
        tip:"식품 형태로만 섭취하세요. 보충제 고용량은 흡연자에게 역효과."},
      {check:(im)=>Object.keys(im).some(n=>['브로콜리','브로콜리새싹','케일','양배추'].includes(n)), severity:"good", title:"설포라판 — 발암물질 해독 효소 유도",
        detail:()=>`브로콜리의 설포라판은 Nrf2 경로를 활성화해 흡연 관련 발암물질 제거를 돕습니다.`,
        tip:"살짝 데친 브로콜리가 가장 효과적입니다."},
      {check:(im,c)=>c.vitaminC>50, severity:"good", title:"비타민C — 폐 산화 스트레스 중화",
        detail:()=>`폐는 고산소 환경으로 산화 스트레스에 취약합니다. 비타민C는 직접적 항산화제로 폐 기능 유지에 필수입니다.`,
        tip:"피망·파프리카·브로콜리·키위를 매 식사에 포함하세요."},
      {check:(im)=>Object.keys(im).some(n=>['베이컨','소시지','햄'].includes(n)), severity:"caution", title:"가공육 — 니트로사민 폐 DNA 손상",
        detail:()=>`가공육의 니트리트가 니트로사민으로 전환되어 폐 DNA를 손상시킬 수 있습니다.`,
        tip:"가공육을 최소화하고 신선한 단백질로 대체하세요."},
      {check:(im,c)=>c.omega3>2, severity:"good", title:"오메가3 — 폐 염증 억제·면역 강화",
        detail:()=>`EPA·DHA는 프로-레졸빈 생성으로 폐 염증을 억제합니다.`,
        tip:"연어·고등어·청어를 주 3회 이상 섭취하세요."},
    ]
  },

  breast_cancer: {
    label:"유방암", label_en:"Breast Cancer", emoji:"🎀",
    desc:"유방 악성종양 — 에스트로겐·생활습관·유전 복합 요인", desc_en:"Breast malignancy — estrogen/lifestyle/genetic factors",
    rules:[
      {check:(im)=>Object.keys(im).some(n=>['소주','맥주','와인','막걸리'].includes(n)), severity:"danger", title:"알코올 — 에스트로겐 상승·DNA 손상",
        detail:()=>`알코올은 혈중 에스트로겐을 높이고 아세트알데히드가 유방 세포 DNA를 손상합니다. 음주량에 비례해 위험 증가 (1잔/일 +7-10%).`,
        tip:"알코올은 가능한 완전히 피하세요. 적은 양도 위험을 높입니다."},
      {check:(im)=>Object.keys(im).some(n=>['브로콜리','브로콜리새싹','케일','양배추','콜리플라워'].includes(n)), severity:"good", title:"DIM(십자화과) — 에스트로겐 대사 경로 조절",
        detail:()=>`브로콜리의 인돌-3-카르비놀(I3C)은 에스트로겐을 덜 활성화된 형태로 대사시켜 유방암 위험을 낮춥니다.`,
        tip:"주 5회 이상 십자화과 채소를 섭취하세요."},
      {check:(im)=>Object.keys(im).some(n=>['두부','두유','된장','청국장'].includes(n)), severity:"good", title:"대두 이소플라본 — 에스트로겐 수용체 경쟁 억제",
        detail:()=>`아시아 여성의 대두 섭취와 유방암 발생률 역상관이 보고됩니다. 발효 대두(된장·청국장)는 이소플라본 흡수율이 더 높습니다.`,
        tip:"보충제보다 식품 형태(두부·된장)로 섭취하세요."},
      {check:(im,c)=>c.fiber>8, severity:"good", title:"풍부한 식이섬유 — 혈중 에스트로겐 배출 촉진",
        detail:()=>`식이섬유는 장에서 에스트로겐 재흡수를 차단하고 대변으로 배출을 촉진합니다.`,
        tip:"콩류·통곡물·채소·과일로 매 식사 섬유를 보충하세요."},
      {check:(im)=>Object.keys(im).some(n=>['아마씨'].includes(n)), severity:"good", title:"아마씨 리그난 — 식물성 에스트로겐 조절",
        detail:()=>`아마씨의 리그난은 에스트로겐 수용체를 점유해 강한 에스트로겐 신호를 차단합니다.`,
        tip:"하루 1큰술(10g) 갈아서 요거트·스무디에 넣어 드세요."},
    ]
  },

  prostate_cancer: {
    label:"전립선암", label_en:"Prostate Cancer", emoji:"🔵",
    desc:"전립선 악성종양 — 안드로겐·포화지방·노화 연관", desc_en:"Prostate malignancy — androgen/saturated fat related",
    rules:[
      {check:(im)=>Object.keys(im).some(n=>n.includes('토마토')||n==='케첩'), severity:"good", title:"리코펜(조리 토마토) — 전립선 산화 억제",
        detail:()=>`리코펜은 전립선에 특이적으로 축적되는 항산화 카로티노이드입니다. 가열 조리 토마토는 생토마토보다 흡수율 4배.`,
        tip:"올리브오일로 볶은 토마토 소스가 가장 효과적입니다."},
      {check:(im)=>Object.keys(im).some(n=>['두부','두유','된장'].includes(n)), severity:"good", title:"대두 이소플라본 — DHT 생성 효소 억제",
        detail:()=>`제니스테인은 5α-리덕테이스(DHT 생성 효소)를 억제합니다. 아시아 남성의 전립선암 발생률이 낮은 것과 연관됩니다.`,
        tip:"두부·된장·두유를 식사에 정기적으로 포함하세요."},
      {check:(im,c)=>c.saturatedFat>12, severity:"caution", title:"포화지방 과다 — 안드로겐 생성 촉진",
        detail:()=>`고포화지방 식사는 혈중 테스토스테론·DHT를 높여 전립선암 세포 성장을 촉진할 수 있습니다.`,
        tip:"붉은 고기·버터·전유 제품을 줄이고 식물성 지방·생선으로 대체하세요."},
      {check:(im)=>Object.keys(im).some(n=>['연어','고등어','청어'].includes(n)), severity:"good", title:"오메가3 DHA/EPA — 전립선암 세포 증식 억제",
        detail:()=>`EPA·DHA는 COX-2 염증 경로를 억제하여 전립선암 세포 증식을 줄입니다.`,
        tip:"주 3회 등푸른 생선을 섭취하세요."},
      {check:(im)=>Object.keys(im).some(n=>['마늘','브로콜리'].includes(n)), severity:"good", title:"알리신·설포라판 — 전립선 세포 아포토시스 유도",
        detail:()=>`마늘의 알리신과 브로콜리의 설포라판은 전립선암 세포 자멸을 유도하고 암 줄기세포 억제 효과가 있습니다.`,
        tip:"마늘 2-3쪽, 브로콜리 ½컵을 매일 목표로 하세요."},
    ]
  },

  pancreatic_cancer: {
    label:"췌장암", label_en:"Pancreatic Cancer", emoji:"🟡",
    desc:"췌장 악성종양 — 예후 불량·조기 식이 관리 중요", desc_en:"Pancreatic malignancy — early dietary management critical",
    rules:[
      {check:(im)=>Object.keys(im).some(n=>['베이컨','소시지','햄','핫도그'].includes(n)), severity:"danger", title:"가공육 — 췌장암 위험 최대 2배 증가",
        detail:()=>`아질산염-니트로사민이 췌장 세포 DNA를 손상시킵니다. 매일 50g 가공육 섭취 시 췌장암 위험 19% 증가 (WCRF).`,
        tip:"가공육을 제거하고 신선한 닭고기·생선·콩류로 대체하세요."},
      {check:(im,c)=>c.fat>30, severity:"caution", title:"고지방 식사 — 췌장 소화효소 분비 부담",
        detail:()=>`지방은 CCK를 통해 췌장을 자극합니다. 지속적 고지방 섭취는 췌장 세포 손상을 가속화합니다.`,
        tip:"식사당 지방 10-15g 이하로 제한하세요."},
      {check:(im)=>Object.keys(im).some(n=>['블루베리','딸기','라즈베리','체리'].includes(n)), severity:"good", title:"베리류 — Nrf2 경로 통한 췌장 세포 보호",
        detail:()=>`안토시아닌과 레스베라트롤은 산화 스트레스로부터 췌장 세포를 보호합니다.`,
        tip:"냉동 베리도 신선 베리와 동등한 항산화 효과를 제공합니다."},
      {check:(im,c)=>c.fiber>7, severity:"good", title:"풍부한 식이섬유 — 혈당 안정화로 췌장 인슐린 부담 감소",
        detail:()=>`혈당 급등을 완화해 췌장 베타세포 부담을 줄입니다. 고혈당·인슐린 저항성은 췌장암 위험 증가와 연관됩니다.`,
        tip:"콩류·귀리·통곡물로 식이섬유를 보충하세요."},
      {check:(im)=>Object.keys(im).some(n=>['녹차'].includes(n)), severity:"good", title:"녹차 EGCG — mTOR 신호 억제·암 세포 자가포식 유도",
        detail:()=>`EGCG는 췌장암 세포의 mTOR 신호를 억제하고 자가포식을 유도합니다.`,
        tip:"하루 3-4잔, 80°C 온도로 우려 마시면 EGCG가 보존됩니다."},
    ]
  },

  // ── 정신건강 ──────────────────────────────────────────────────────────────
  depression_nutrition: {
    label: "우울증 / 정신건강", label_en: "Depression/Mental Health", emoji: "💙",
    desc: "세로토닌·도파민 부족 — 식이로 뇌 기능 지원", desc_en: "Serotonin/dopamine deficiency — dietary brain support",
    rules: [
      {check:(im)=>Object.keys(im).some(n=>['계란','닭고기','두부','바나나'].includes(n)), severity:"good", title:"트립토판 식품 — 세로토닌 합성 촉진",
        detail:()=>`트립토판은 세로토닌(행복 호르몬)의 전구체입니다. 계란·닭고기·두부·바나나에 풍부합니다. 탄수화물과 함께 섭취하면 뇌로의 전달이 향상됩니다.`,
        tip:"탄수화물과 함께 트립토판 식품을 섭취하면 인슐린이 경쟁 아미노산을 근육으로 보내 트립토판의 뇌 투과를 돕습니다."},
      {check:(im)=>Object.keys(im).some(n=>DB[n]?.compounds?.some(c=>c.includes('오메가3'))||['연어','고등어','청어'].includes(n)), severity:"good", title:"오메가3 DHA — 뇌 신경막 구성·우울 완화",
        detail:()=>`DHA는 뇌 신경세포막의 35%를 구성합니다. 우울증 환자에서 DHA 수치가 낮고, EPA 보충이 우울 증상을 30-40% 개선한다는 메타분석이 있습니다.`,
        tip:"EPA 함량이 높은 오메가3(EPA:DHA=2:1 이상)를 선택하세요. 주 2-3회 등푸른 생선도 효과적입니다."},
      {check:(im,c)=>c.carbs>60&&Object.keys(im).some(n=>n==='설탕'&&im[n]>20), severity:"caution", title:"고당분 식사 — 혈당 스파이크 후 기분 저하",
        detail:()=>`정제당은 일시적 도파민 분비 → 혈당 급락 → 기분 저하·피로·집중력 감소의 악순환을 만듭니다. '설탕 우울증(sugar crash)' 효과입니다.`,
        tip:"정제당 대신 복합 탄수화물(통곡물, 고구마)로 안정적인 혈당을 유지하세요."},
      {check:(im)=>Object.keys(im).some(n=>['강황'].includes(n)), severity:"good", title:"커큐민(강황) — 신경 항염 + BDNF 증가",
        detail:()=>`커큐민은 신경 염증을 억제하고 BDNF(뇌유래신경영양인자)를 증가시켜 항우울 효과를 보입니다. 일부 연구에서 항우울제와 유사한 효과가 보고됩니다.`,
        tip:"후추와 함께 섭취하면 흡수율이 크게 높아집니다."},
      {check:(im)=>Object.keys(im).some(n=>['김치','된장','요거트'].includes(n)), severity:"good", title:"발효식품 — 장-뇌 축(gut-brain axis) 개선",
        detail:()=>`장내 미생물은 세로토닌의 90-95%를 생산합니다. 발효식품의 프로바이오틱스는 장내 미생물 다양성을 높여 뇌 기능과 기분을 개선합니다.`,
        tip:"매일 김치 한 접시나 무가당 요거트 1컵으로 장내 미생물을 관리하세요."},
      {check:(im,c)=>c.carbs<15&&c.protein<15, severity:"caution", title:"에너지 부족 — 뇌 포도당 공급 불충분",
        detail:(im,c)=>`뇌는 체중의 2%이지만 에너지의 20%를 소비합니다. 탄수화물과 단백질 모두 부족하면 인지 기능 저하와 기분 불안정이 심해집니다.`,
        tip:"균형 잡힌 식사는 정신 건강의 기초입니다. 규칙적인 식사 패턴을 유지하세요."},
    ]
  },

  // ── 뇌신경 / 면역 / 혈액 ─────────────────────────────────────────────────
  stroke: {label:"뇌졸중", label_en:"Stroke", emoji:"🧠", desc:"뇌혈관 막힘·파열 — 고혈압·혈전 연관", desc_en:"Cerebrovascular blockage/rupture — hypertension/thrombosis related", rules:[
    {check:(im,c)=>c.sodium>1200, severity:"danger", title:"고염 — 혈압 상승·뇌혈관 위험",
      detail:()=>`나트륨 과다는 혈압을 높여 뇌혈관 손상 위험을 증가시킵니다. 뇌졸중의 가장 큰 예방 가능 위험 인자입니다.`, tip:"나트륨 1,500mg/일 이하. DASH 식이를 실천하세요."},
    {check:(im,c)=>c.omega3>2, severity:"good", title:"오메가3 — 혈전 억제·뇌혈관 보호",
      detail:()=>`EPA·DHA는 혈소판 응집을 억제하고 뇌혈관 내피 기능을 개선합니다.`, tip:"등푸른 생선을 주 3회 섭취하세요."},
    {check:(im)=>Object.keys(im).some(n=>['시금치','케일','브로콜리','아스파라거스'].includes(n)), severity:"good", title:"엽산·비타민K — 호모시스테인 저하",
      detail:()=>`엽산은 뇌졸중 위험인자인 호모시스테인을 낮춥니다. 비타민K는 혈관 석회화를 억제합니다.`, tip:"녹색 채소를 매일 2컵 이상 섭취하세요."},
    {check:(im,c)=>c.potassium>400, severity:"good", title:"칼륨 풍부 — 혈압 조절",
      detail:()=>`칼륨은 나트륨 배출을 촉진하여 혈압을 낮추고 뇌졸중 위험을 줄입니다.`, tip:"바나나·토마토·감자·아보카도를 활용하세요."},
    {check:(im,c)=>c.saturatedFat>10, severity:"caution", title:"포화지방 — 동맥경화·혈전 위험",
      detail:()=>`포화지방은 LDL 콜레스테롤을 높여 뇌혈관 동맥경화를 촉진합니다.`, tip:"붉은 고기를 생선·두부로 대체하세요."},
  ]},
  alzheimer: {label:"치매/알츠하이머", label_en:"Alzheimer's Disease", emoji:"🧠", desc:"뇌 신경세포 퇴화 — APOE4 유전·산화 스트레스·염증 연관", desc_en:"Neurodegenerative cognitive disorder", rules:[
    {check:(im)=>Object.keys(im).some(n=>DB[n]?.compounds?.some(c=>c.includes('오메가3'))||['연어','고등어','청어','블루베리','견과류'].includes(n)), severity:"good", title:"MIND 식이 핵심 식품 — 뇌 신경 보호",
      detail:()=>`오메가3 DHA, 폴리페놀, 비타민E는 뇌 신경세포막을 보호하고 아밀로이드 플라크 형성을 억제합니다.`, tip:"MIND 식이: 베리류·녹색채소·견과류·통곡물·생선 주 3회 이상."},
    {check:(im,c)=>c.saturatedFat>8, severity:"caution", title:"포화지방 — 뇌혈관 손상·인지 저하 가속",
      detail:()=>`포화지방과 트랜스지방은 뇌혈관을 손상시키고 신경 염증을 촉진합니다.`, tip:"올리브오일·견과류·생선으로 지방 공급원을 교체하세요."},
    {check:(im,c)=>c.carbs>60&&Object.keys(im).some(n=>n==='설탕'), severity:"caution", title:"고당분 — 인슐린 저항성·인지 저하",
      detail:()=>`당뇨와 인슐린 저항성은 알츠하이머 위험을 2-3배 높입니다 ('3형 당뇨' 가설). 뇌의 포도당 대사 장애가 핵심 기전입니다.`, tip:"정제당을 줄이고 복합탄수화물로 대체하세요."},
    {check:(im)=>Object.keys(im).some(n=>['강황'].includes(n)), severity:"good", title:"커큐민 — 아밀로이드 플라크 분해 효과",
      detail:()=>`강황의 커큐민은 아밀로이드-β 응집을 억제하고 신경 염증을 줄입니다. 인도의 알츠하이머 발생률이 낮은 것과 연관이 연구됩니다.`, tip:"후추와 함께 섭취하면 흡수율이 증가합니다."},
  ]},
  parkinson: {label:"파킨슨병", label_en:"Parkinson's Disease", emoji:"🫳", desc:"도파민 신경세포 퇴화 — 산화 스트레스·환경 요인 연관", desc_en:"Neurodegenerative movement disorder", rules:[
    {check:(im)=>Object.keys(im).some(n=>['블루베리','라즈베리','시금치','브로콜리','토마토'].includes(n)), severity:"good", title:"항산화 식품 — 도파민 신경세포 보호",
      detail:()=>`산화 스트레스는 흑질 도파민 신경세포 손상의 주요 기전입니다. 플라보노이드·비타민C·E가 풍부한 식품이 신경 보호 효과를 보입니다.`, tip:"베리류·녹색채소·토마토를 매일 섭취하세요."},
    {check:(im)=>Object.keys(im).some(n=>['연어','고등어','청어'].includes(n)), severity:"good", title:"오메가3 — 신경 염증 억제",
      detail:()=>`DHA는 도파민 수용체 밀도를 유지하고 신경 염증을 억제합니다. 파킨슨 환자에서 생선 섭취와 진행 억제 연관성이 보고됩니다.`, tip:"등푸른 생선을 주 3회 섭취하세요."},
    {check:(im)=>Object.keys(im).some(n=>n.includes('커피')), severity:"good", title:"커피 카페인 — 파킨슨 위험 감소",
      detail:()=>`카페인은 아데노신 A2A 수용체를 차단하여 도파민 신호를 보호합니다. 커피 섭취자에서 파킨슨 위험 32-60% 감소가 보고됩니다.`, tip:"하루 2-3잔의 커피를 규칙적으로 섭취하세요."},
    {check:(im,c)=>c.protein>40, severity:"info", title:"고단백 — 레보도파 흡수 방해 가능",
      detail:()=>`단백질의 아미노산은 레보도파와 같은 운반체를 경쟁하여 약물 흡수를 감소시킵니다. 약 복용 시간 관리가 중요합니다.`, tip:"레보도파 복용 30분 후 식사하거나, 단백질을 저녁에 집중 섭취하세요."},
  ]},
  autoimmune: {label:"자가면역질환", label_en:"Autoimmune Disease", emoji:"🛡️", desc:"면역 과활성 — 류마티스/갑상선/장 자가면역 포함", desc_en:"Immune hyperactivation — includes RA/thyroid/gut autoimmune", rules:[
    {check:(im,c)=>c.sodium>700, severity:"caution", title:"고나트륨 — TH17 세포 활성화로 면역 과항진",
      detail:()=>`과도한 나트륨은 TH17 세포 분화를 촉진하여 자가면역 반응을 악화시킵니다.`, tip:"저나트륨 식단 (<1500mg/일)을 엄격히 유지하세요."},
    {check:(im,c)=>c.omega3>2, severity:"good", title:"오메가3 — 면역 조절·염증 억제",
      detail:()=>`EPA는 항염증 에이코사노이드를 생성하여 과도한 면역 반응을 억제합니다.`, tip:"등푸른 생선, 아마씨, 호두를 꾸준히 섭취하세요."},
    {check:(im)=>Object.keys(im).some(n=>['강황','생강'].includes(n)), severity:"good", title:"커큐민·생강 — 면역 조절 항염 효과",
      detail:()=>`커큐민은 NF-κB를 억제하여 염증성 사이토카인(TNF-α, IL-6) 생성을 줄입니다.`, tip:"강황+후추+올리브오일 조합으로 흡수율을 높이세요."},
    {check:(im)=>Object.keys(im).some(n=>['김치','된장','요거트'].includes(n)), severity:"good", title:"발효식품 — 장내 미생물 통한 면역 조절",
      detail:()=>`장내 미생물 불균형(dysbiosis)은 자가면역 질환의 주요 촉발 요인입니다. 프로바이오틱스가 Treg 세포를 활성화합니다.`, tip:"매일 발효식품을 섭취하여 장내 환경을 개선하세요."},
  ]},
  lupus: {label:"루푸스 (SLE)", label_en:"Lupus (SLE)", emoji:"🦋", desc:"전신 자가면역질환 — 항핵항체 양성·피부/관절/신장 침범", desc_en:"Systemic lupus erythematosus", rules:[
    {check:(im)=>Object.keys(im).some(n=>n.includes('새싹')||n==='알팔파'), severity:"danger", title:"알팔파 새싹 — 루푸스 플레어 직접 유발",
      detail:()=>`알팔파의 L-카나바닌은 루푸스 환자에서 면역 활성화와 플레어(악화)를 직접 유발하는 아미노산 유사체입니다.`, tip:"알팔파 새싹, 알팔파 보충제를 완전히 피하세요."},
    {check:(im,c)=>c.omega3>2, severity:"good", title:"오메가3 — 루푸스 염증 및 신장 보호",
      detail:()=>`EPA/DHA는 루푸스 신염 악화를 억제하고 관절 염증을 완화합니다. 루푸스 환자의 오메가3 섭취와 질병 활성도 감소가 연관됩니다.`, tip:"연어·고등어·청어를 주 3회 이상 섭취하세요."},
    {check:(im,c)=>c.vitaminD>10, severity:"good", title:"비타민D — 면역 조절 핵심 영양소",
      detail:()=>`루푸스 환자의 90% 이상이 비타민D 결핍입니다. 비타민D는 면역 관용(tolerance)을 증진시켜 자가면역 반응을 억제합니다.`, tip:"비타민D 강화 식품과 햇볕 노출을 병행하세요. 혈중 25(OH)D 40ng/mL 이상 목표."},
    {check:(im,c)=>c.sodium>600, severity:"caution", title:"고나트륨 — 신장 부담·혈압 상승",
      detail:()=>`루푸스 신염이 있으면 나트륨 과다는 신장 기능을 악화시킵니다.`, tip:"나트륨 1,200mg/일 이하를 목표로 하세요."},
  ]},
  allergy_disease: {label:"알레르기 질환", label_en:"Allergic Disease", emoji:"⚠️", desc:"면역 과민반응 — 알레르기 비염·아토피·두드러기 포함", desc_en:"Immune hypersensitivity — allergic rhinitis/atopy/urticaria", rules:[
    {check:(im)=>Object.keys(im).some(n=>['김치','요거트','케피르'].includes(n)), severity:"good", title:"프로바이오틱스 — 알레르기 면역 조절 (Th1/Th2 균형)",
      detail:()=>`장내 미생물이 Th2 우세 알레르기 면역을 Th1으로 조절합니다. 프로바이오틱스 섭취가 아토피, 알레르기 비염 증상을 완화합니다.`, tip:"발효식품을 매일 섭취하거나 프로바이오틱스 보충제를 활용하세요."},
    {check:(im,c)=>c.omega3>2, severity:"good", title:"오메가3 — 히스타민 반응 완화·염증 억제",
      detail:()=>`EPA는 히스타민 생성을 줄이고 알레르기성 염증 반응을 억제합니다.`, tip:"등푸른 생선, 아마씨, 치아씨를 꾸준히 섭취하세요."},
    {check:(im)=>Object.keys(im).some(n=>['양파','사과'].includes(n)), severity:"good", title:"퀘르세틴 (양파·사과) — 비만세포 탈과립 억제",
      detail:()=>`퀘르세틴은 비만세포에서 히스타민 방출을 억제하여 알레르기 반응을 줄입니다. 천연 항히스타민제 역할을 합니다.`, tip:"양파를 요리에 꾸준히 사용하고 사과를 껍질째 섭취하세요."},
  ]},
  asthma: {label:"천식/호흡기", label_en:"Asthma/Respiratory", emoji:"💨", desc:"기도 과민반응 — 염증·기관지 수축·환경 유발인자 연관", desc_en:"Airway hyperresponsiveness — inflammation/bronchoconstriction", rules:[
    {check:(im,c)=>c.omega3>2, severity:"good", title:"오메가3 — 기도 염증 억제·폐 기능 개선",
      detail:()=>`EPA는 류코트리엔(기관지 수축 매개체) 생성을 줄여 천식 증상을 완화합니다.`, tip:"등푸른 생선을 주 3회 이상 섭취하세요."},
    {check:(im)=>Object.keys(im).some(n=>['브로콜리','시금치','아몬드'].includes(n)), severity:"good", title:"마그네슘 풍부 — 기관지 이완",
      detail:()=>`마그네슘은 기관지 평활근을 이완시켜 기도를 넓히고 천식 발작 빈도를 줄입니다.`, tip:"녹색채소, 견과류, 통곡물로 마그네슘(320-420mg/일)을 보충하세요."},
    {check:(im)=>Object.keys(im).some(n=>['건포도','말린과일','와인'].includes(n)), severity:"caution", title:"아황산염(건과일·와인) — 기관지 수축 유발",
      detail:()=>`아황산염 과민 천식 환자의 5-10%에서 아황산염이 즉각적인 기관지 수축을 유발합니다.`, tip:"건과일, 와인, 식초 등 아황산염 함유 식품에 주의하세요."},
    {check:(im,c)=>c.sodium>800, severity:"caution", title:"고나트륨 — 기도 과민성 증가",
      detail:()=>`나트륨 과다 섭취는 기도 반응성을 높이고 천식 증상을 악화시킵니다.`, tip:"저나트륨 식단이 천식 관리에 도움됩니다."},
  ]},

  // ── 암 — 추가 ──────────────────────────────────────────────────────────────
  cervical_cancer: {label:"자궁경부암", label_en:"Cervical Cancer", emoji:"🎗️", desc:"자궁경부 악성종양 — HPV 감염·엽산 부족 연관", desc_en:"Cervical malignancy — HPV infection/folate deficiency related", rules:[
    {check:(im)=>Object.keys(im).some(n=>['시금치','브로콜리','아스파라거스','콩'].includes(n)), severity:"good", title:"엽산 풍부 식품 — HPV 진행 억제",
      detail:()=>`엽산 결핍은 HPV 바이러스의 자궁경부 세포 DNA 통합을 촉진합니다. 충분한 엽산 섭취가 경부상피이형성증 예방에 중요합니다.`, tip:"잎채소, 콩류, 아스파라거스를 매일 섭취하고, 흡연을 피하세요."},
    {check:(im,c)=>c.vitaminC>50, severity:"good", title:"비타민C — HPV 감염 세포 면역 강화",
      detail:()=>`비타민C는 면역 기능을 강화하고 항산화 작용으로 자궁경부 세포를 보호합니다.`, tip:"피망, 파프리카, 브로콜리, 딸기로 비타민C를 보충하세요."},
    {check:(im)=>Object.keys(im).some(n=>['브로콜리','콜리플라워','케일'].includes(n)), severity:"good", title:"십자화과 채소 DIM — 에스트로겐 대사 조절",
      detail:()=>`인돌-3-카르비놀(I3C)이 에스트로겐을 덜 발암성인 형태로 대사시키고 HPV 감염 세포 증식을 억제합니다.`, tip:"십자화과 채소를 주 5회 이상 섭취하세요."},
  ]},
  ovarian_cancer: {label:"난소암", label_en:"Ovarian Cancer", emoji:"🎗️", desc:"난소 악성종양 — 유전(BRCA1/2)·호르몬·환경 복합 요인", desc_en:"Ovarian malignancy — BRCA/hormone/environmental factors", rules:[
    {check:(im,c)=>c.fiber>8, severity:"good", title:"식이섬유 — 에스트로겐 조절·난소암 위험 감소",
      detail:()=>`식이섬유는 에스트로겐 장-간 순환을 억제하여 에스트로겐 노출을 줄입니다.`, tip:"채소·콩류·통곡물·과일로 25-30g/일 목표."},
    {check:(im,c)=>c.omega3>2, severity:"good", title:"오메가3 — 난소 세포 항염 보호",
      detail:()=>`오메가3는 난소 주변 만성 염증을 억제하여 난소암 위험을 줄입니다.`, tip:"등푸른 생선을 주 3회 섭취하세요."},
    {check:(im)=>Object.keys(im).some(n=>['녹차'].includes(n)), severity:"good", title:"녹차 EGCG — 난소암 세포 아포토시스 유도",
      detail:()=>`EGCG는 난소암 세포의 VEGF(혈관 신생인자)를 억제하고 세포 자멸을 유도합니다.`, tip:"하루 3-4잔 80°C 녹차를 섭취하세요."},
  ]},
  thyroid_cancer: {label:"갑상선암", label_en:"Thyroid Cancer", emoji:"🦋", desc:"갑상선 악성종양 — 방사선·요오드 불균형 연관", desc_en:"Thyroid malignancy — radiation/iodine imbalance related", rules:[
    {check:(im)=>Object.keys(im).some(n=>['미역','다시마'].includes(n)), severity:"info", title:"요오드 식품 — 갑상선 기능 영향 주의",
      detail:()=>`갑상선암 치료 후 방사성 요오드 치료 전 저요오드 식사가 필요한 경우가 있습니다. 담당 의사와 상담 후 결정하세요.`, tip:"치료 상태에 따라 요오드 섭취를 조절하세요."},
    {check:(im)=>Object.keys(im).some(n=>['브로콜리','양배추','케일'].includes(n)), severity:"info", title:"십자화과 채소 — 갑상선 기능 영향 가능",
      detail:()=>`십자화과 채소의 고이트로겐은 갑상선 요오드 흡수를 억제할 수 있으나, 가열 조리 시 대부분 불활성화됩니다.`, tip:"충분히 가열 조리하면 안전하게 섭취할 수 있습니다."},
    {check:(im)=>Object.keys(im).some(n=>['브라질너트','굴','새우'].includes(n)), severity:"good", title:"셀레늄 풍부 식품 — 갑상선 호르몬 대사 지원",
      detail:()=>`셀레늄은 갑상선 과산화효소 보호인자로 갑상선 조직 보호에 필수적입니다.`, tip:"브라질너트 1-2알이 하루 셀레늄 권장량을 충족합니다."},
  ]},
  leukemia: {label:"백혈병/혈액암", label_en:"Leukemia/Blood Cancer", emoji:"🩸", desc:"혈액·골수 악성종양 — 조혈세포 DNA 손상·발암물질 연관", desc_en:"Blood/bone marrow malignancy — hematopoietic DNA damage", rules:[
    {check:(im)=>Object.keys(im).some(n=>['블루베리','딸기','라즈베리'].includes(n)), severity:"good", title:"베리류 안토시아닌 — 백혈병 세포 증식 억제",
      detail:()=>`안토시아닌은 백혈병 세포의 세포주기 정지와 아포토시스를 유도합니다.`, tip:"냉동 베리도 신선 베리와 동등한 효과를 제공합니다."},
    {check:(im)=>Object.keys(im).some(n=>['시금치','브로콜리','아스파라거스'].includes(n)), severity:"good", title:"엽산 풍부 — 조혈세포 DNA 합성 지원",
      detail:()=>`엽산은 조혈세포의 DNA 복제 정확성을 높여 돌연변이 축적을 줄입니다.`, tip:"잎채소를 매일 섭취하고, 고용량 엽산 보충제는 의사 상담 후 복용하세요."},
    {check:(im)=>Object.keys(im).some(n=>['베이컨','소시지','햄'].includes(n)), severity:"caution", title:"가공육 — 아질산염 조혈세포 DNA 손상",
      detail:()=>`아질산염-니트로사민은 조혈세포 DNA를 손상시켜 혈액암 위험을 높입니다.`, tip:"가공육을 완전히 제거하고 신선한 단백질로 대체하세요."},
    {check:(im)=>Object.keys(im).some(n=>['녹차'].includes(n)), severity:"good", title:"녹차 EGCG — 백혈병 세포 아포토시스 유도",
      detail:()=>`EGCG는 만성 림프구성 백혈병 세포의 Bcl-2 억제와 자멸 유도 효과가 연구됩니다.`, tip:"하루 3-4잔 녹차를 규칙적으로 섭취하세요."},
  ]},
  epilepsy: {label:"뇌전증", label_en:"Epilepsy", emoji:"⚡", desc:"뇌 전기적 이상 방전 — 발작 반복·유전·뇌 손상 연관", desc_en:"Seizure disorder", rules:[
    {check:(im,c)=>c.carbs<20&&c.fat>20, severity:"good", title:"저탄고지 패턴 — 케톤 생성 식이 근거",
      detail:()=>`케톤 생성 식이(고지방·저탄수화물)는 뇌의 에너지 대사를 포도당에서 케톤체로 전환하여 난치성 뇌전증 발작을 50% 이상 줄입니다.`, tip:"케톤 식이는 전문 의료팀 감독 하에 시행하세요."},
    {check:(im,c)=>c.vitaminD>10, severity:"good", title:"비타민D — 뇌전증 약물 대사 지원",
      detail:()=>`항경련제 장기 복용 환자의 80%에서 비타민D 결핍이 나타납니다. 비타민D는 골밀도 보호와 신경 기능 유지에 필요합니다.`, tip:"비타민D 강화 식품과 규칙적인 햇볕 노출을 병행하세요."},
    {check:(im)=>Object.keys(im).some(n=>['소주','맥주','와인'].includes(n)), severity:"danger", title:"알코올 — 발작 역치 저하·약물 상호작용",
      detail:()=>`알코올은 GABA 수용체를 교란하고 항경련제 대사를 방해합니다. 금주 후 금단 발작의 위험도 있습니다.`, tip:"뇌전증 환자에게 알코올은 절대 금기입니다."},
    {check:(im)=>Object.keys(im).some(n=>['시금치','아몬드','브로콜리'].includes(n)), severity:"good", title:"마그네슘 풍부 — 신경 과흥분 억제",
      detail:()=>`마그네슘은 NMDA 수용체를 차단하여 신경 과흥분을 억제합니다. 마그네슘 결핍이 발작 역치를 낮출 수 있습니다.`, tip:"녹색채소와 견과류로 마그네슘을 보충하세요."},
  ]},
  schizophrenia: {label:"조현병", label_en:"Schizophrenia", emoji:"🧩", desc:"도파민·글루타메이트 불균형 — 뇌 구조·기능 이상", desc_en:"Dopamine/glutamate imbalance — brain structure/function disorder", rules:[
    {check:(im,c)=>c.omega3>2, severity:"good", title:"오메가3 EPA/DHA — 신경막 인지질 최적화",
      detail:()=>`조현병 환자에서 뇌 인지질 DHA 농도가 낮습니다. EPA 보충이 음성 증상과 인지 기능 개선에 효과를 보인 임상 연구들이 있습니다.`, tip:"등푸른 생선을 주 3회 이상 섭취하세요."},
    {check:(im,c)=>c.vitaminD>10, severity:"good", title:"비타민D — 신경 발달 및 도파민 조절",
      detail:()=>`비타민D 결핍이 조현병 위험 증가와 연관됩니다. 비타민D는 도파민 합성 효소(TH)를 조절합니다.`, tip:"비타민D 강화 식품과 햇볕 노출을 규칙적으로 유지하세요."},
    {check:(im)=>Object.keys(im).some(n=>['김치','된장','요거트'].includes(n)), severity:"good", title:"발효식품 — 장-뇌 축 통한 정신 건강",
      detail:()=>`장내 미생물이 GABA 등 신경전달물질에 영향을 줍니다. 조현병 환자에서 장내 미생물 다양성 감소가 확인됩니다.`, tip:"매일 발효식품으로 장내 환경을 개선하세요."},
    {check:(im,c)=>c.carbs>60&&Object.keys(im).some(n=>n==='설탕'), severity:"caution", title:"고당분 — 항정신병 약물 대사증후군 악화",
      detail:()=>`항정신병 약물은 체중 증가·인슐린 저항성을 유발합니다. 고당분 섭취는 이를 악화시킵니다.`, tip:"정제당을 줄이고 복합탄수화물과 채소를 늘리세요."},
  ]},
};

// ── 질환 카테고리 그룹 (부모-자식 확장 구조) ──────────────────────────────
// ── 질환 통합 그룹 (본인/가족력 공유 DB) ─────────────────────────────────
// 각 key는 CONDITIONS 객체의 key와 동일 — 양쪽 탭 모두 이 DB를 사용
const DISEASE_GROUPS = {
  cancer:   {label:"암 / 종양",     label_en:"Cancer / Tumors",          emoji:"🎗️", keys:['stomach_cancer','liver_cancer','colon_cancer','lung_cancer','breast_cancer','prostate_cancer','pancreatic_cancer','cervical_cancer','ovarian_cancer','thyroid_cancer','leukemia']},
  cardio:   {label:"심혈관",         label_en:"Cardiovascular",          emoji:"❤️",  keys:['hypertension','heart','hyperlipidemia','metabolic_syndrome','stroke']},
  metabolic:{label:"대사 / 내분비", label_en:"Metabolic / Endocrine",   emoji:"🔬", img:"https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=24&h=24&fit=crop", keys:['diabetes','obesity','pcos','thyroid_hypo','thyroid_hyper','gout']},
  digestive:{label:"소화기",         label_en:"Digestive",               emoji:"🫃",  keys:['gerd','gastritis','ibs','crohns','celiac','gallstone','pancreatitis','fatty_liver']},
  renal:    {label:"신장 / 혈액",   label_en:"Renal / Blood",           emoji:"🫘",  keys:['kidney','liver','anemia']},
  musculo:  {label:"근골격 / 면역", label_en:"Musculoskeletal / Immune",emoji:"🦴",  keys:['osteoporosis','arthritis','sarcopenia','autoimmune','lupus','allergy_disease','asthma']},
  mental:   {label:"정신 / 뇌건강", label_en:"Mental / Brain Health",   emoji:"🧠",  keys:['depression_nutrition','alzheimer','parkinson','epilepsy','schizophrenia']},
};

// ── 체질/특이사항 DB ──
const TRAITS = {
  // 알레르기
  allergy_egg:      {label:"계란 알레르기",   label_en:"Egg Allergy",   emoji:"🥚", desc:"계란 단백질(오보알부민) 알레르기", desc_en:"Ovalbumin protein allergy"},
  allergy_milk:     {label:"우유 알레르기",   label_en:"Milk Allergy",   emoji:"🥛", desc:"우유 단백질(카세인·유청) 알레르기", desc_en:"Casein/whey protein allergy"},
  allergy_nuts:     {label:"견과류 알레르기", label_en:"Nut Allergy",   emoji:"🥜", desc:"땅콩 및 트리너트 알레르기", desc_en:"Peanut and tree nut allergy"},
  allergy_soy:      {label:"대두 알레르기",   label_en:"Soy Allergy",   emoji:"🫘", desc:"콩 단백질 알레르기", desc_en:"Soy protein allergy"},
  allergy_wheat:    {label:"밀 알레르기",     label_en:"Wheat Allergy",   emoji:"🌾", desc:"밀 단백질(글리아딘) 알레르기", desc_en:"Gliadin protein allergy"},
  allergy_seafood:  {label:"해산물 알레르기", label_en:"Shellfish Allergy",   emoji:"🦐", desc:"갑각류·연체류 알레르기", desc_en:"Crustacean/mollusk allergy"},
  allergy_fish:     {label:"생선 알레르기",   label_en:"Fish Allergy",   emoji:"🐟", desc:"어류 단백질 알레르기", desc_en:"Fish protein allergy"},
  allergy_sulfite:  {label:"아황산염 과민",   label_en:"Sulfite Sensitivity",   emoji:"⚠️", desc:"와인·건과일·가공식품 아황산염 반응", desc_en:"Reaction to sulfites in wine, dried fruit, processed foods"},
  // 소화·대사 특이사항
  lactose_intolerant:    {label:"유당불내증",       label_en:"Lactose Intolerance",       emoji:"🥛", desc:"유당(락토스) 분해 효소 부족", desc_en:"Lactase enzyme deficiency"},
  gluten_sensitive:      {label:"글루텐 민감",       label_en:"Gluten Sensitivity",       emoji:"🌾", desc:"셀리악병 또는 비셀리악 글루텐 민감증", desc_en:"Celiac or non-celiac gluten sensitivity"},
  histamine_intolerance: {label:"히스타민 불내증",   label_en:"Histamine Intolerance",   emoji:"⚠️", desc:"발효식품·숙성 치즈·적포도주 히스타민 반응", desc_en:"Reaction to fermented foods, aged cheese, red wine"},
  fodmap_sensitive:      {label:"FODMAP 민감",       label_en:"FODMAP Sensitivity",       emoji:"🫃", desc:"발효성 당류 소화 장애 (양파·마늘·밀 등)", desc_en:"Digestive issues with fermentable sugars (onion, garlic, wheat)"},
  caffeine_sensitive:    {label:"카페인 민감",       label_en:"Caffeine Sensitivity",       emoji:"☕", desc:"카페인 과민 반응 — 불면·두근거림", desc_en:"Caffeine hypersensitivity — insomnia, palpitations"},
  alcohol_flush:         {label:"알코올 플러시",     label_en:"Alcohol Flush",     emoji:"🍷", desc:"음주 시 얼굴 홍조 (ALDH2 유전 변이)", desc_en:"Facial flushing from alcohol (ALDH2 variant)"},
  spice_sensitive:       {label:"매운맛 민감",       label_en:"Spice Sensitivity",       emoji:"🌶️", desc:"캡사이신 위장 자극 민감", desc_en:"Capsaicin GI irritation sensitivity"},
  // 식이 원칙
  vegan:       {label:"완전채식 (비건)", label_en:"Vegan", emoji:"🌱", desc:"동물성 식품 전체 제한", desc_en:"No animal products"},
  vegetarian:  {label:"채식주의 (베지)", label_en:"Vegetarian", emoji:"🥬", desc:"육류·어류 제한, 유제품·계란 허용", desc_en:"No meat/fish, dairy/eggs allowed"},
  halal:       {label:"할랄 식이",       label_en:"Halal", emoji:"☪️", desc:"이슬람 율법 허용 식품만 섭취", desc_en:"Islamic dietary law compliant foods only"},
  kosher:      {label:"코셔 식이",       label_en:"Kosher", emoji:"✡️", desc:"유대 율법 코셔 인증 식품만 섭취", desc_en:"Jewish dietary law certified foods only"},
  low_salt:    {label:"저염식",           label_en:"Low Sodium", emoji:"🧂", desc:"나트륨 제한 (1,500mg/일 이하)", desc_en:"Sodium restricted (<1,500mg/day)"},
  low_fat:     {label:"저지방식",         label_en:"Low Fat", emoji:"🥗", desc:"포화지방 및 총지방 제한 식이", desc_en:"Saturated and total fat restricted diet"},
  low_carb:    {label:"저탄수화물식",     label_en:"Low Carb", emoji:"🥩", desc:"탄수화물 100g/일 이하 제한", desc_en:"Carbohydrate restricted (<100g/day)"},
  low_purine:  {label:"저퓨린식",         label_en:"Low Purine", emoji:"🦶", desc:"요산 생성 퓨린 섭취 제한", desc_en:"Purine restricted to reduce uric acid"},
  low_oxalate: {label:"저옥살레이트식",   label_en:"Low Oxalate", emoji:"🫘", desc:"신장결석 예방을 위한 옥살산 제한", desc_en:"Oxalate restricted for kidney stone prevention"},
  // 생애·신체 상태
  pregnant:          {label:"임신/수유 중",       label_en:"Pregnant/Nursing",       emoji:"🤰", desc:"태아·영아 영향 및 섭취 금지 식품 고려", desc_en:"Considerations for fetal/infant health and restricted foods"},
  elderly_nutrition: {label:"노인 영양 관리",     label_en:"Senior Nutrition",     emoji:"👴", desc:"근감소 예방·소화력 저하·미량영양소 부족 고려", desc_en:"Sarcopenia prevention, reduced digestion, micronutrient needs"},
  athlete:           {label:"고강도 운동",         label_en:"High-Intensity Exercise",         emoji:"🏋️", desc:"고단백·고탄수화물 에너지 요구량 증가", desc_en:"High protein/carb energy demands"},
  // 한의학 체질
  cold_constitution: {label:"냉체질 (한성)", label_en:"Cold Constitution", emoji:"❄️", desc:"몸이 차고 소화가 느린 체질 — 따뜻한 음식 선호", desc_en:"Cold body, slow digestion — prefers warm foods"},
  hot_constitution:  {label:"열체질 (열성)", label_en:"Hot Constitution", emoji:"🔥", desc:"열이 많고 땀이 많은 체질 — 서늘한 음식 선호", desc_en:"Hot body, heavy sweating — prefers cooling foods"},
};

// FAMILY_HISTORY 제거됨 — 통합 DB: CONDITIONS를 양쪽 탭(본인 질환 / 직계 가족 병력) 공유 사용

// ── 약물/영양제/생활습관 DB ──
const SUBSTANCES = {
  // 음주
  alcohol_none:     {label:"비음주",     label_en:"Non-drinker",     emoji:"🚫", desc:"음주하지 않음",       desc_en:"Does not drink alcohol", category:"alcohol"},
  alcohol_light:    {label:"경도 음주",  label_en:"Light Drinking",  emoji:"🍷", desc:"주 1-2회",           desc_en:"1-2 times per week", category:"alcohol"},
  alcohol_moderate: {label:"중등도 음주",label_en:"Moderate Drinking",emoji:"🍷", desc:"주 3-4회",           desc_en:"3-4 times per week", category:"alcohol"},
  alcohol_heavy:    {label:"다량 음주",  label_en:"Heavy Drinking",  emoji:"🍷", desc:"거의 매일 음주",     desc_en:"Almost daily drinking", category:"alcohol"},
  // 흡연
  smoking_none:    {label:"비흡연",   label_en:"Non-smoker",   emoji:"🚭", desc:"담배를 피우지 않음",       desc_en:"Does not smoke", category:"smoking"},
  smoking_current: {label:"현재 흡연",label_en:"Current Smoker",emoji:"🚬", desc:"현재 연초 흡연 중",       desc_en:"Currently smoking cigarettes", category:"smoking"},
  smoking_e_cig:   {label:"전자담배", label_en:"E-cigarette", emoji:"💨", desc:"전자담배(베이핑) 사용 중", desc_en:"Currently vaping", category:"smoking"},
  smoking_quit:    {label:"금연 중",  label_en:"Quitting Smoking",  emoji:"✋", desc:"1년 이내 금연",           desc_en:"Quit within 1 year", category:"smoking"},
  // 약물
  med_metformin:        {label:"메트포르민",         label_en:"Metformin",         emoji:"💊", desc:"당뇨약 — 비타민B12 흡수 감소", desc_en:"Diabetes — reduces vitamin B12 absorption", category:"medication"},
  med_insulin:          {label:"인슐린",             label_en:"Insulin",             emoji:"💉", desc:"인슐린 주사 — 저혈당 식이 주의", desc_en:"Insulin injection — hypoglycemia diet caution", category:"medication"},
  med_statin:           {label:"스타틴계",           label_en:"Statin",           emoji:"💊", desc:"고지혈증약 — 자몽 상호작용",    desc_en:"Cholesterol — grapefruit interaction", category:"medication"},
  med_bp_med:           {label:"혈압약",             label_en:"Blood Pressure Med",             emoji:"💊", desc:"ACE억제제/ARB — 칼륨 주의",    desc_en:"ACE inhibitor/ARB — potassium caution", category:"medication"},
  med_diuretic:         {label:"이뇨제",             label_en:"Diuretic",             emoji:"💊", desc:"이뇨제 — 칼륨·마그네슘 소실", desc_en:"Diuretic — potassium/magnesium depletion", category:"medication"},
  med_anticoagulant:    {label:"항응고제 (와파린)",  label_en:"Anticoagulant (Warfarin)",  emoji:"💊", desc:"와파린 — 비타민K 음식 주의",   desc_en:"Warfarin — vitamin K food caution", category:"medication"},
  med_nsaid:            {label:"소염진통제 (NSAIDs)",label_en:"NSAIDs",emoji:"💊", desc:"아스피린·이부프로펜 — 위장 자극", desc_en:"Aspirin/ibuprofen — GI irritation", category:"medication"},
  med_ppi:              {label:"위산억제제 (PPI)",   label_en:"PPI (Acid Reducer)",   emoji:"💊", desc:"오메프라졸 — 마그네슘·B12 흡수↓", desc_en:"Omeprazole — reduces Mg/B12 absorption", category:"medication"},
  med_antidepressant:   {label:"항우울제",           label_en:"Antidepressant",           emoji:"💊", desc:"SSRI/SNRI — 식욕 변화, 세로토닌 주의", desc_en:"SSRI/SNRI — appetite changes, serotonin caution", category:"medication"},
  med_maoi:             {label:"MAOI",               label_en:"MAOI",               emoji:"💊", desc:"단아민산화효소억제제 — 티라민 음식 금지", desc_en:"MAO inhibitor — tyramine foods prohibited", category:"medication"},
  med_corticosteroid:   {label:"스테로이드",         label_en:"Corticosteroid",         emoji:"💊", desc:"코르티코스테로이드 — 혈당·나트륨 상승", desc_en:"Corticosteroid — elevates blood sugar/sodium", category:"medication"},
  med_immunosuppressant:{label:"면역억제제",         label_en:"Immunosuppressant",         emoji:"💊", desc:"타크로리무스 등 — 자몽·생식품 주의", desc_en:"Tacrolimus etc. — avoid grapefruit/raw foods", category:"medication"},
  med_antibiotic:       {label:"항생제",             label_en:"Antibiotic",             emoji:"💊", desc:"현재 항생제 복용 — 프로바이오틱 병행 권장", desc_en:"Currently on antibiotics — probiotic recommended", category:"medication"},
  med_antihistamine:    {label:"항히스타민제",       label_en:"Antihistamine",       emoji:"💊", desc:"알레르기약 — 카페인·알코올 주의", desc_en:"Allergy med — caffeine/alcohol caution", category:"medication"},
  med_thyroid:          {label:"갑상선약",           label_en:"Thyroid Med",           emoji:"💊", desc:"레보티록신 — 공복 복용, 칼슘·철분 주의", desc_en:"Levothyroxine — take fasting, calcium/iron caution", category:"medication"},
  med_contraceptive:    {label:"경구 피임약",        label_en:"Oral Contraceptive",        emoji:"💊", desc:"엽산·마그네슘·B6 소진",          desc_en:"Depletes folate, magnesium, B6", category:"medication"},
  med_obesity:          {label:"비만치료제 (GLP-1)", label_en:"GLP-1 Weight Med", emoji:"💊", desc:"세마글루타이드 — 소량 고단백 식사 권장", desc_en:"Semaglutide — small high-protein meals recommended", category:"medication"},
  // 영양제
  sup_omega3:       {label:"오메가3",       label_en:"Omega-3",       emoji:"🐟", desc:"EPA/DHA — 항응고 효과",                  desc_en:"EPA/DHA — anticoagulant effect", category:"supplement"},
  sup_vitamin_d:    {label:"비타민D",       label_en:"Vitamin D",       emoji:"☀️", desc:"비타민D3 — 지방과 함께 섭취",           desc_en:"Vitamin D3 — take with fat", category:"supplement"},
  sup_vitamin_b12:  {label:"비타민B12",     label_en:"Vitamin B12",     emoji:"🔵", desc:"코발라민 — 채식인·노인 결핍 주의",       desc_en:"Cobalamin — deficiency risk for vegans/elderly", category:"supplement"},
  sup_vitamin_c:    {label:"비타민C",       label_en:"Vitamin C",       emoji:"🍊", desc:"아스코르브산 — 철분 흡수 촉진",          desc_en:"Ascorbic acid — enhances iron absorption", category:"supplement"},
  sup_calcium:      {label:"칼슘",           label_en:"Calcium",           emoji:"🦴", desc:"칼슘 — 철분·갑상선약과 분리 복용",     desc_en:"Calcium — separate from iron/thyroid meds", category:"supplement"},
  sup_iron:         {label:"철분제",         label_en:"Iron",         emoji:"🔴", desc:"철분 — 공복 복용, 탄닌 주의",           desc_en:"Iron — take fasting, avoid tannins", category:"supplement"},
  sup_zinc:         {label:"아연",           label_en:"Zinc",           emoji:"⚡", desc:"아연 — 구리 흡수 경쟁",                 desc_en:"Zinc — competes with copper absorption", category:"supplement"},
  sup_folate:       {label:"엽산 (폴산)",   label_en:"Folate",   emoji:"💚", desc:"임신 전·중 필수 — DNA 합성",            desc_en:"Essential pre/during pregnancy — DNA synthesis", category:"supplement"},
  sup_magnesium:    {label:"마그네슘",       label_en:"Magnesium",       emoji:"💪", desc:"마그네슘 — 수면·근경련 완화",           desc_en:"Magnesium — sleep/muscle cramp relief", category:"supplement"},
  sup_coq10:        {label:"코엔자임Q10",   label_en:"CoQ10",   emoji:"⚡", desc:"CoQ10 — 스타틴 복용 시 보충 권장",     desc_en:"CoQ10 — supplement recommended with statins", category:"supplement"},
  sup_glutathione:  {label:"글루타티온",     label_en:"Glutathione",     emoji:"✨", desc:"항산화 — 비타민C와 병행 효과↑",        desc_en:"Antioxidant — enhanced with vitamin C", category:"supplement"},
  sup_collagen:     {label:"콜라겐",         label_en:"Collagen",         emoji:"💅", desc:"피부·관절 — 비타민C 병행 합성 촉진",   desc_en:"Skin/joints — vitamin C enhances synthesis", category:"supplement"},
  sup_glucosamine:  {label:"글루코사민",     label_en:"Glucosamine",     emoji:"🦴", desc:"관절 영양제 — 혈당 영향 주의",         desc_en:"Joint supplement — blood sugar caution", category:"supplement"},
  sup_curcumin:     {label:"커큐민 (강황)", label_en:"Curcumin (Turmeric)", emoji:"🌿", desc:"항염 — 피페린(후추) 병행 흡수↑",       desc_en:"Anti-inflammatory — piperine enhances absorption", category:"supplement"},
  sup_melatonin:    {label:"멜라토닌",       label_en:"Melatonin",       emoji:"🌙", desc:"수면 — 저녁 식사 후 복용",              desc_en:"Sleep — take after dinner", category:"supplement"},
  sup_protein:      {label:"단백질 보충제", label_en:"Protein Supplement", emoji:"💪", desc:"유청·식물성 단백질 — 신장 기능 주의",  desc_en:"Whey/plant protein — kidney function caution", category:"supplement"},
  sup_creatine:     {label:"크레아틴",       label_en:"Creatine",       emoji:"🏋️", desc:"운동 보충제 — 수분 섭취 충분히",       desc_en:"Exercise supplement — adequate hydration needed", category:"supplement"},
  sup_ginseng:      {label:"홍삼/인삼",     label_en:"Red Ginseng",     emoji:"🌿", desc:"홍삼 — 혈당·혈압 강하 효과",            desc_en:"Ginseng — blood sugar/pressure lowering", category:"supplement"},
  sup_milk_thistle: {label:"밀크시슬",       label_en:"Milk Thistle",       emoji:"🌿", desc:"간 보호 영양제 — 약물 대사 영향",      desc_en:"Liver support — affects drug metabolism", category:"supplement"},
  sup_berberine:    {label:"베르베린",       label_en:"Berberine",       emoji:"🌿", desc:"혈당·지질 개선 — 메트포르민 유사 작용", desc_en:"Blood sugar/lipid — metformin-like action", category:"supplement"},
  sup_probiotics:   {label:"프로바이오틱스",label_en:"Probiotics",emoji:"🦠", desc:"유익균 — 항생제와 2시간 간격",          desc_en:"Beneficial bacteria — 2hr gap from antibiotics", category:"supplement"},
  sup_multivitamin: {label:"종합비타민",     label_en:"Multivitamin",     emoji:"💊", desc:"종합비타민 — 식사와 함께 복용",         desc_en:"Multivitamin — take with meals", category:"supplement"},
  // 생활습관
  life_exercise_regular: {label:"규칙적 운동",     label_en:"Regular Exercise",     emoji:"🏃", desc:"주 3회 이상 유산소·근력 운동", desc_en:"3+ times/week aerobic/strength training", category:"lifestyle"},
  life_sedentary:        {label:"주로 좌식 생활",  label_en:"Sedentary Lifestyle",  emoji:"💺", desc:"하루 대부분 앉아서 생활",       desc_en:"Mostly sitting throughout the day", category:"lifestyle"},
  life_night_shift:      {label:"야간·교대 근무",  label_en:"Night/Shift Work",  emoji:"🌙", desc:"생체리듬 교란 — 식사 패턴 불규칙", desc_en:"Circadian disruption — irregular meal patterns", category:"lifestyle"},
  life_stress_high:      {label:"고스트레스",       label_en:"High Stress",       emoji:"😓", desc:"만성 스트레스 — 코르티솔 과다·폭식 위험", desc_en:"Chronic stress — excess cortisol/binge risk", category:"lifestyle"},
  life_sleep_disorder:   {label:"수면장애",         label_en:"Sleep Disorder",         emoji:"😴", desc:"불면증·수면무호흡 — 식욕호르몬 교란", desc_en:"Insomnia/sleep apnea — appetite hormone disruption", category:"lifestyle"},
  // ── 추가 약물 (Phase 4) ────────────────────────────────────────────────
  med_lithium:           {label:"리튬",             label_en:"Lithium",             emoji:"💊", desc:"양극성 장애 치료제 — 나트륨·수분 균형 중요", desc_en:"Bipolar disorder — sodium/fluid balance critical", category:"medication"},
  med_clopidogrel:       {label:"클로피도그렐",     label_en:"Clopidogrel",     emoji:"💊", desc:"항혈소판제(플라빅스) — CYP2C19 대사", desc_en:"Antiplatelet (Plavix) — CYP2C19 metabolism", category:"medication"},
  med_methotrexate:      {label:"메토트렉세이트",   label_en:"Methotrexate",   emoji:"💊", desc:"항류마티스/항암제 — 엽산 길항작용", desc_en:"Antirheumatic/antineoplastic — folate antagonism", category:"medication"},
  med_ksparing_diuretic: {label:"칼륨보존이뇨제",   label_en:"K-Sparing Diuretic",   emoji:"💊", desc:"스피로노락톤/아밀로라이드 — 고칼륨혈증 주의", desc_en:"Spironolactone/amiloride — hyperkalemia risk", category:"medication"},
  med_digoxin:           {label:"디곡신",           label_en:"Digoxin",           emoji:"💊", desc:"강심배당체 — 좁은 치료역, 전해질 민감", desc_en:"Cardiac glycoside — narrow therapeutic window, electrolyte sensitive", category:"medication"},
  med_theophylline:      {label:"테오필린",         label_en:"Theophylline",         emoji:"💊", desc:"기관지확장제 — 카페인과 크산틴 경쟁", desc_en:"Bronchodilator — caffeine/xanthine competition", category:"medication"},
  med_levodopa:          {label:"레보도파",         label_en:"Levodopa",         emoji:"💊", desc:"파킨슨 치료제 — 고단백식 흡수 방해", desc_en:"Parkinson's — high protein impairs absorption", category:"medication"},
  med_ace_inhibitor:     {label:"ACE억제제",        label_en:"ACE Inhibitor",        emoji:"💊", desc:"혈압약(프릴계) — 고칼륨혈증 주의", desc_en:"BP med (pril-class) — hyperkalemia risk", category:"medication"},
  med_arb:               {label:"ARB",              label_en:"ARB",              emoji:"💊", desc:"혈압약(사르탄계) — 고칼륨혈증 주의", desc_en:"BP med (sartan-class) — hyperkalemia risk", category:"medication"},
  med_quinolone:         {label:"퀴놀론 항생제",    label_en:"Quinolone Antibiotic",    emoji:"💊", desc:"시프로플록사신 등 — 금속이온 킬레이션", desc_en:"Ciprofloxacin etc. — metal ion chelation", category:"medication"},
  med_tetracycline:      {label:"테트라사이클린",   label_en:"Tetracycline",   emoji:"💊", desc:"항생제 — 칼슘/철분/마그네슘 킬레이션", desc_en:"Antibiotic — Ca/Fe/Mg chelation", category:"medication"},
};

// ══════════════════════════════════════════════════
// SCIENTIFIC REFERENCES (논문 출처)
// ══════════════════════════════════════════════════
const REFERENCES = {
  maillard: {
    confidence: 92,
    papers: [
      {authors:"Hodge, J.E.", year:1953, title:"Chemistry of Browning Reactions in Model Systems", journal:"J. Agric. Food Chem.", vol:"1(15)", pages:"928-943", doi:"10.1021/jf60015a004"},
      {authors:"Martins, S.I.F.S., Jongen, W.M.F., van Boekel, M.A.J.S.", year:2000, title:"A review of Maillard reaction in food and implications to kinetic modelling", journal:"Trends in Food Science & Technology", vol:"11(9-10)", pages:"364-373", doi:"10.1016/S0924-2244(01)00022-X"}
    ]
  },
  caramelization: {
    confidence: 88,
    papers: [
      {authors:"Kroh, L.W.", year:1994, title:"Caramelisation in food and beverages", journal:"Food Chemistry", vol:"51(4)", pages:"373-379", doi:"10.1016/0308-8146(94)90188-0"}
    ]
  },
  protein_denaturation: {
    confidence: 90,
    papers: [
      {authors:"Tornberg, E.", year:2005, title:"Effects of heat on meat proteins - Implications on structure and quality of meat products", journal:"Meat Science", vol:"70(3)", pages:"493-508", doi:"10.1016/j.meatsci.2004.11.021"}
    ]
  },
  starch_gelatinization: {
    confidence: 91,
    papers: [
      {authors:"Ratnayake, W.S., Jackson, D.S.", year:2006, title:"Gelatinization and Solubility of Corn Starch during Heating in Excess Water", journal:"J. Agric. Food Chem.", vol:"54(10)", pages:"3712-3716", doi:"10.1021/jf0529114"}
    ]
  },
  vitamin_c_loss: {
    confidence: 87,
    papers: [
      {authors:"Santos, P.H.S., Silva, M.A.", year:2008, title:"Retention of Vitamin C in Drying Processes of Fruits and Vegetables — A Review", journal:"Drying Technology", vol:"26(12)", pages:"1421-1437", doi:"10.1080/07373930802458911"}
    ]
  },
  nutrient_retention: {
    confidence: 94,
    papers: [
      {authors:"USDA", year:2007, title:"USDA Table of Nutrient Retention Factors, Release 6", journal:"USDA Agricultural Research Service", vol:"", pages:"", doi:""}
    ]
  },
  acrylamide: {
    confidence: 85,
    papers: [
      {authors:"Stadler, R.H., et al.", year:2002, title:"Acrylamide from Maillard reaction products", journal:"Nature", vol:"419", pages:"449-450", doi:"10.1038/419449a"}
    ]
  },
  lipid_oxidation: {
    confidence: 83,
    papers: [
      {authors:"Frankel, E.N.", year:1998, title:"Lipid Oxidation", journal:"The Oily Press, Dundee", vol:"2nd Ed.", pages:"", doi:""}
    ]
  },
  pah: {
    confidence: 89,
    papers: [
      {authors:"Phillips, D.H.", year:1999, title:"Polycyclic aromatic hydrocarbons in the diet", journal:"Mutation Research", vol:"443(1-2)", pages:"139-147", doi:"10.1016/S1383-5742(99)00016-2"},
      {authors:"EFSA Panel on Contaminants in the Food Chain", year:2008, title:"PAH in food — Scientific Opinion", journal:"EFSA Journal", vol:"724", pages:"1-114", doi:"10.2903/j.efsa.2008.724"}
    ]
  },
  hca: {
    confidence: 87,
    papers: [
      {authors:"Skog, K., Steineck, G., Augustsson, K., Jägerstad, M.", year:1998, title:"Effect of cooking temperature on the formation of heterocyclic amines in fried meat products and pan residues", journal:"Carcinogenesis", vol:"19(6)", pages:"1061-1067", doi:"10.1093/carcin/19.6.1061"},
      {authors:"Sugimura, T.", year:2000, title:"Nutrition and dietary carcinogens", journal:"Carcinogenesis", vol:"21(3)", pages:"387-395", doi:"10.1093/carcin/21.3.387"}
    ]
  },
  nitrosamine: {
    confidence: 90,
    papers: [
      {authors:"Honikel, K.O.", year:2008, title:"The use and control of nitrate and nitrite for the processing of meat products", journal:"Meat Science", vol:"78(1-2)", pages:"68-76", doi:"10.1016/j.meatsci.2007.05.030"},
      {authors:"IARC Working Group", year:2018, title:"Red Meat and Processed Meat", journal:"IARC Monographs", vol:"114", pages:"1-502", doi:""}
    ]
  },
  anthocyanin: {
    confidence: 86,
    papers: [
      {authors:"Patras, A., Brunton, N.P., O'Donnell, C., Tiwari, B.K.", year:2010, title:"Effect of thermal processing on anthocyanin stability in foods", journal:"Trends in Food Science & Technology", vol:"21(1)", pages:"3-11", doi:"10.1016/j.tifs.2009.07.004"}
    ]
  },
  chlorophyll: {
    confidence: 85,
    papers: [
      {authors:"Schwartz, S.J., von Elbe, J.H.", year:1983, title:"Kinetics of chlorophyll degradation to pyropheophytin in vegetables", journal:"Journal of Food Science", vol:"48(4)", pages:"1303-1306", doi:"10.1111/j.1365-2621.1983.tb09224.x"}
    ]
  },
  beta_carotene: {
    confidence: 88,
    papers: [
      {authors:"Chen, B.H., Huang, J.H.", year:1998, title:"Degradation and isomerization of chlorophyll a and β-carotene as affected by various heating and illumination treatments", journal:"Journal of Food Science", vol:"63(5)", pages:"751-754", doi:"10.1111/j.1365-2621.1998.tb15798.x"},
      {authors:"Deming, D.M., et al.", year:2002, title:"Amount of dietary fat at a meal determines β-carotene absorption", journal:"American Journal of Clinical Nutrition", vol:"75(6)", pages:"1041-1049", doi:"10.1093/ajcn/75.6.1041"}
    ]
  },
  glucosinolate: {
    confidence: 89,
    papers: [
      {authors:"Verkerk, R., Schreiner, M., Krumbein, A., et al.", year:2009, title:"Glucosinolates in Brassica vegetables: The influence of the food supply chain on intake, bioavailability and human health", journal:"Molecular Nutrition & Food Research", vol:"53(S2)", pages:"S219-S265", doi:"10.1002/mnfr.200800065"},
      {authors:"Matusheski, N.V., Juvik, J.A., Jeffery, E.H.", year:2004, title:"Heating decreases epithiospecifier protein activity and increases sulforaphane formation in broccoli", journal:"Phytochemistry", vol:"65(9)", pages:"1273-1281", doi:"10.1016/j.phytochem.2004.04.013"}
    ]
  },
  polyphenol_oxidation: {
    confidence: 84,
    papers: [
      {authors:"Yoruk, R., Marshall, M.R.", year:2003, title:"Physicochemical properties and function of plant polyphenol oxidase: A review", journal:"Journal of Food Biochemistry", vol:"27(5)", pages:"361-422", doi:"10.1111/j.1745-4514.2003.tb00289.x"}
    ]
  }
};

// Reaction-to-reference mapping
const RXN_REF_MAP = {
  'maillard': 'maillard', 'caramelization': 'caramelization',
  'protein_denaturation': 'protein_denaturation', 'starch_gelatinization': 'starch_gelatinization',
  'vitamin_c_loss': 'vitamin_c_loss', 'capsaicin': null, 'allicin': null,
  'emulsification': null, 'acid_coagulation': null, 'lycopene': null,
  'pah': 'pah', 'hca': 'hca', 'nitrosamine': 'nitrosamine',
  'anthocyanin': 'anthocyanin', 'chlorophyll': 'chlorophyll',
  'beta_carotene': 'beta_carotene', 'glucosinolate': 'glucosinolate',
  'polyphenol_oxidation': 'polyphenol_oxidation'
};

// ══════════════════════════════════════════════════
// COMMERCIAL STATE (DB 중심)
// ══════════════════════════════════════════════════
let currentUser = null;      // { id, email, name, avatar_url }
let userProfile = null;      // DB profiles row
let userPlan = 'free';       // 'free', 'pro', 'enterprise'
let proMode = false;
let dailyUsage = { analysis_count: 0, search_count: 0, export_count: 0 };
let isGuest = false;
let authSession = null;      // Supabase auth session

// 플랜별 제한
const PLAN_LIMITS = {
  free:       { analysis: 5, export: 1, history: 10, members: 1 },
  pro:        { analysis: 50, export: -1, history: -1, members: 5 },
  enterprise: { analysis: -1, export: -1, history: -1, members: -1 }
};

function getPlanLimit(type) {
  return PLAN_LIMITS[userPlan]?.[type] ?? PLAN_LIMITS.free[type];
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

// ── Safe localStorage helpers ──
function safeGetLS(key, defaultValue) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : defaultValue; }
  catch(e) { return defaultValue; }
}
function safeSetLS(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); return true; }
  catch(e) { return false; }
}

async function checkDailyLimit(type = 'analysis') {
  const limit = getPlanLimit(type);
  if (limit === -1) return true; // unlimited

  if (sbClient && authSession) {
    // DB 기반 사용량 체크
    const result = await dbRPC('increment_usage', { usage_type: type });
    if (result) {
      dailyUsage[type + '_count'] = result.current;
      return result.allowed;
    }
  }
  // 폴백: localStorage
  const today = new Date().toISOString().split('T')[0];
  const key = `mc_${type}_${today}`;
  const count = parseInt(localStorage.getItem(key) || '0');
  if (count >= limit) return false;
  localStorage.setItem(key, count + 1);
  dailyUsage[type + '_count'] = count + 1;
  return true;
}

// ══════════════════════════════════════════════════
// LOGIN PAGE LOGIC (Supabase Auth 연동)
// ══════════════════════════════════════════════════
let loginMode = 'login';

function showLoginPage() {
  document.getElementById('loginPage').classList.remove('hidden');
}

function hideLoginPage() {
  document.getElementById('loginPage').classList.add('hidden');
}

function showLoginError(msg) {
  const el = document.getElementById('loginError');
  document.getElementById('loginErrorMsg').textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 5000);
}

function toggleLoginMode() {
  loginMode = loginMode === 'login' ? 'signup' : 'login';
  const title = document.getElementById('loginFormTitle');
  const desc = document.getElementById('loginFormDesc');
  const btn = document.getElementById('loginSubmitBtn');
  const toggle = document.getElementById('loginToggle');
  const nameGroup = document.getElementById('loginNameGroup');
  const forgot = document.getElementById('loginForgot');

  if (loginMode === 'signup') {
    title.textContent = '회원가입';
    desc.textContent = '무료로 시작하고 과학적 분석을 경험하세요';
    btn.textContent = '가입하기';
    toggle.innerHTML = '이미 계정이 있으신가요? <a onclick="toggleLoginMode()">로그인</a>';
    nameGroup.style.display = '';
    forgot.style.display = 'none';
  } else {
    title.textContent = '로그인';
    desc.textContent = 'Mealcule 계정으로 시작하세요';
    btn.textContent = '로그인';
    toggle.innerHTML = '계정이 없으신가요? <a onclick="toggleLoginMode()">회원가입</a>';
    nameGroup.style.display = 'none';
    forgot.style.display = '';
  }
}

async function handleLoginSubmit() {
  const email = document.getElementById('loginEmail').value.trim();
  const pw = document.getElementById('loginPw').value;
  const name = document.getElementById('loginName').value.trim();

  if (!email) { showLoginError('이메일을 입력해주세요'); return; }
  if (!email.includes('@')) { showLoginError('올바른 이메일 형식을 입력해주세요'); return; }
  if (!pw || pw.length < 6) { showLoginError('비밀번호는 6자 이상이어야 합니다'); return; }
  if (loginMode === 'signup' && !name) { showLoginError('이름을 입력해주세요'); return; }

  const btn = document.getElementById('loginSubmitBtn');
  btn.textContent = loginMode === 'login' ? '로그인 중...' : '가입 중...';
  btn.disabled = true;

  try {
    if (sbClient) {
      // ── Supabase Auth ──
      if (loginMode === 'signup') {
        const { data, error } = await sbClient.auth.signUp({
          email,
          password: pw,
          options: { data: { name: name, full_name: name } }
        });
        if (error) throw error;
        if (data.user && !data.session) {
          showLoginError('인증 이메일을 확인해주세요!');
          btn.textContent = '가입하기'; btn.disabled = false;
          return;
        }
        authSession = data.session;
        await loadUserProfile();
      } else {
        const { data, error } = await sbClient.auth.signInWithPassword({ email, password: pw });
        if (error) throw error;
        authSession = data.session;
        await loadUserProfile();
      }
    } else {
      // ── 폴백: localStorage 데모 모드 ──
      const userName = loginMode === 'signup' ? name : email.split('@')[0];
      currentUser = { id: 'local_' + Date.now(), email, name: userName };
      userPlan = 'free';
      localStorage.setItem('mc_user', JSON.stringify(currentUser));
      localStorage.setItem('mc_plan', userPlan);
    }

    isGuest = false;
    updateUserUI();
    hideLoginPage();
  } catch (e) {
    const msg = e.message || '인증 오류';
    if (msg.includes('Invalid login')) showLoginError('이메일 또는 비밀번호가 올바르지 않습니다');
    else if (msg.includes('already registered')) showLoginError('이미 등록된 이메일입니다');
    else showLoginError(msg);
  } finally {
    btn.textContent = loginMode === 'login' ? '로그인' : '가입하기';
    btn.disabled = false;
  }
}

async function handleLoginGoogle() {
  if (!sbClient) {
    showLoginError('Supabase 연결이 필요합니다');
    return;
  }
  try {
    const { data, error } = await sbClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
        queryParams: { access_type: 'offline', prompt: 'consent' }
      }
    });
    if (error) throw error;
    // OAuth는 리다이렉트 방식이므로 여기서 추가 처리 불필요
  } catch (e) {
    showLoginError('Google 로그인 오류: ' + e.message);
  }
}

function handleGuestEntry() {
  currentUser = null;
  userPlan = 'free';
  isGuest = true;
  localStorage.setItem('mc_guest', 'true');
  updateUserUI();
  hideLoginPage();
}

async function handleForgotPw() {
  const email = document.getElementById('loginEmail').value.trim();
  if (!email) { showLoginError('이메일을 먼저 입력해주세요'); return; }

  if (sbClient) {
    try {
      const { error } = await sbClient.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '?type=recovery'
      });
      if (error) throw error;
      alert(`${email}로 비밀번호 재설정 링크를 보냈습니다.`);
    } catch(e) {
      showLoginError('비밀번호 재설정 오류: ' + e.message);
    }
  } else {
    alert(`${email}로 비밀번호 재설정 링크를 보냈습니다. (데모)`);
  }
}

// ── DB에서 유저 프로필 로드 ──
async function loadUserProfile() {
  if (!sbClient || !authSession) return;

  const user = authSession.user;
  currentUser = {
    id: user.id,
    email: user.email,
    name: user.user_metadata?.name || user.user_metadata?.full_name || user.email.split('@')[0],
    avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture || null
  };

  // 프로필 조회 (trigger가 자동 생성)
  const profiles = await dbQuery('profiles', 'select', { eq: { id: user.id } });
  if (profiles && profiles.length > 0) {
    userProfile = profiles[0];
    userPlan = userProfile.plan || 'free';
    proMode = userProfile.pro_mode || false;
  }

  // 오늘 사용량 로드
  const today = new Date().toISOString().split('T')[0];
  const usage = await dbQuery('daily_usage', 'select', { eq: { user_id: user.id, usage_date: today } });
  if (usage && usage.length > 0) {
    dailyUsage = { analysis_count: usage[0].analysis_count, search_count: usage[0].search_count, export_count: usage[0].export_count };
  }

  // 멤버 프로필 로드
  await loadMemberProfiles();
}

// ── 멤버 프로필 DB 로드 ──
async function loadMemberProfiles() {
  if (!sbClient || !currentUser?.id || isGuest) return;

  const data = await dbQuery('member_profiles', 'select', {
    eq: { user_id: currentUser.id },
    order: { col: 'sort_order', asc: true }
  });

  if (data && data.length > 0) {
    members = data.map((m, i) => ({
      id: i + 1,
      dbId: m.id,
      name: m.name,
      age: m.age,
      gender: m.gender,
      height: m.height,
      weight: m.weight,
      ethnicity: m.ethnicity,
      country: m.country || null,
      activity: m.activity,
      traits: m.traits || [],
      familyHx: m.family_history || [],
      conditions: m.conditions || [],
      substances: m.substances || []
    }));
    activeMemberId = 1;
    nextMemberId = members.length + 1;
  }
}

// ── 멤버 프로필 DB 저장 ──
async function saveMemberToDB(member) {
  if (!sbClient || !currentUser?.id || isGuest) return;

  const data = {
    user_id: currentUser.id,
    name: member.name,
    age: member.age,
    gender: member.gender,
    height: member.height,
    weight: member.weight,
    ethnicity: member.ethnicity,
    country: member.country || null,
    activity: member.activity,
    traits: JSON.stringify(member.traits || []),
    family_history: JSON.stringify(member.familyHx || []),
    conditions: JSON.stringify(member.conditions || []),
    substances: JSON.stringify(member.substances || []),
    sort_order: member.id
  };

  if (member.dbId) {
    await dbQuery('member_profiles', 'update', { data, eq: { id: member.dbId } });
  } else {
    const result = await dbQuery('member_profiles', 'insert', { data });
    if (result && result[0]) member.dbId = result[0].id;
  }
}

// ── 세션 초기화 (OAuth 리다이렉트 및 저장된 세션) ──
async function initAuth() {
  if (!sbClient) {
    // 폴백: localStorage
    const saved = localStorage.getItem('mc_user');
    const guest = localStorage.getItem('mc_guest');
    if (saved) {
      try {
        currentUser = JSON.parse(saved);
        userPlan = localStorage.getItem('mc_plan') || 'free';
        updateUserUI();
        hideLoginPage();
      } catch(e) { /* ignore */ }
    } else {
      // DEV: auto-skip login as guest
      isGuest = true;
      hideLoginPage();
    }
    return;
  }

  // Supabase 세션 체크
  try {
    const { data: { session } } = await sbClient.auth.getSession();
    if (session) {
      authSession = session;
      await loadUserProfile();
      updateUserUI();
      hideLoginPage();
    } else {
      // DEV: auto-skip login as guest
      isGuest = true;
      hideLoginPage();
    }
  } catch(e) {
    console.warn('Auth init error:', e);
    isGuest = true;
    hideLoginPage();
  }

  // Auth 상태 변경 리스너
  sbClient.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session) {
      authSession = session;
      await loadUserProfile();
      updateUserUI();
      hideLoginPage();
    } else if (event === 'SIGNED_OUT') {
      currentUser = null; userProfile = null; userPlan = 'free';
      proMode = false; authSession = null; isGuest = false;
      dailyUsage = { analysis_count: 0, search_count: 0, export_count: 0 };
      updateUserUI(); updateModeUI();
      showLoginPage();
    } else if (event === 'TOKEN_REFRESHED' && session) {
      authSession = session;
    }
  });
}

// Enter key handler for login form
document.addEventListener('DOMContentLoaded', () => {
  ['loginEmail','loginPw','loginName'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('keydown', e => { if (e.key === 'Enter') handleLoginSubmit(); });
  });
  initAuth();
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    if (document.getElementById('ytModal')?.style.display !== 'none' && document.getElementById('ytModal')?.style.display) { document.getElementById('ytModal').style.display = 'none'; return; }
    if (document.getElementById('feedbackModal')?.style.display !== 'none' && document.getElementById('feedbackModal')?.style.display) { document.getElementById('feedbackModal').style.display = 'none'; return; }
    var methodOverlay = document.getElementById('methodModalOverlay');
    if (methodOverlay?.classList.contains('open')) { methodOverlay.classList.remove('open'); return; }
    var healthOverlay = document.getElementById('healthModalOverlay');
    if (healthOverlay?.classList.contains('open')) { healthOverlay.classList.remove('open'); return; }
    if (document.getElementById('pricingModal')?.style.display !== 'none' && document.getElementById('pricingModal')?.style.display) { closePricingModal(); return; }
  }
});

// Re-render dynamic content when language changes
document.addEventListener('i18n:applied', () => {
  if (typeof renderCategoryTabs === 'function') renderCategoryTabs();
  if (typeof renderIngredients === 'function') renderIngredients(document.getElementById('searchInput')?.value || '');
  if (typeof renderMethods === 'function') renderMethods();
  if (typeof renderMemberTabs === 'function') renderMemberTabs();
  if (typeof renderConditions === 'function') renderConditions();
  if (typeof renderTraits === 'function') renderTraits();
  if (typeof renderSubstances === 'function') renderSubstances();
  if (typeof updateTime === 'function') updateTime();
  if (typeof updateUserUI === 'function' && typeof currentUser !== 'undefined') updateUserUI();
  // Re-apply i18n to any new DOM elements created by the re-renders above
  setTimeout(() => I18n.applyTranslations(), 0);
});

// ── Auth Functions (header buttons) ──
function openAuthModal() { showLoginPage(); }
function closeAuthModal() { hideLoginPage(); }
function openPricingModal() { document.getElementById('pricingModal').classList.add('active'); }
function closePricingModal() { document.getElementById('pricingModal').classList.remove('active'); }

function updateUserUI() {
  const authBtn = document.getElementById('authBtn');
  const avatar = document.getElementById('userAvatar');
  if (currentUser) {
    authBtn.style.display = 'none';
    avatar.style.display = 'flex';
    document.getElementById('avatarInitial').textContent = (currentUser.name || 'U')[0].toUpperCase();
    document.getElementById('avatarName').textContent = currentUser.name || ((window.I18n && I18n.lang === 'en') ? 'User' : '사용자');
    // 플랜 배지 표시
    const badge = document.getElementById('planBadge');
    if (badge) {
      badge.textContent = userPlan === 'free' ? '' : userPlan.toUpperCase();
      badge.style.display = userPlan === 'free' ? 'none' : 'inline';
    }
  } else {
    authBtn.style.display = '';
    avatar.style.display = 'none';
  }
}

async function openUserMenu() {
  if (confirm('로그아웃 하시겠습니까?')) {
    if (sbClient) {
      await sbClient.auth.signOut();
    }
    currentUser = null; userProfile = null; userPlan = 'free'; proMode = false;
    authSession = null; isGuest = false;
    localStorage.removeItem('mc_user');
    localStorage.removeItem('mc_plan');
    localStorage.removeItem('mc_guest');
    updateUserUI(); updateModeUI();
    showLoginPage();
  }
}

async function selectPlan(plan) {

  if (sbClient && authSession) {
    // DB에 구독 정보 저장
    const subData = {
      user_id: currentUser.id,
      plan: plan,
      status: plan === 'free' ? 'active' : 'trial',
      amount: plan === 'pro' ? 9900 : plan === 'enterprise' ? 49900 : 0,
      currency: 'KRW',
      interval: 'monthly',
      trial_ends_at: plan !== 'free' ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() : null
    };
    await dbQuery('subscriptions', 'insert', { data: subData });
    // 프로필 플랜 업데이트 (trigger가 자동으로 하지만 UI 즉시 반영)
    await dbQuery('profiles', 'update', { data: { plan }, eq: { id: currentUser.id } });
  }

  userPlan = plan;
  localStorage.setItem('mc_plan', plan);
  alert(plan === 'pro' ? '프로 플랜 7일 무료 체험이 시작되었습니다!' : plan === 'enterprise' ? '엔터프라이즈 플랜 문의가 접수되었습니다' : '무료 플랜으로 변경되었습니다');
  closePricingModal();
}
function contactSales() { window.open('mailto:contact@mealcule.com?subject=엔터프라이즈 플랜 문의'); }

// ── Professional Mode ──
function toggleProMode() {
  if (!currentUser || userPlan === 'free') { openPricingModal(); return; }
  proMode = !proMode;
  updateModeUI();
}

function updateModeUI() {
  const btn = document.getElementById('modeToggle');
  if (proMode) {
    btn.textContent = '전문가 모드'; btn.classList.add('pro');
  } else {
    btn.textContent = '일반 모드'; btn.classList.remove('pro');
  }
}

// ── Methodology Toggle ──
function toggleMethodology() {
  document.getElementById('methodologyContent').classList.toggle('show');
}

// ── Reference Toggle ──
function toggleRef(id) {
  document.getElementById('ref-' + id).classList.toggle('show');
}

// ── Export Report ──
async function exportReport() {
  if (userPlan === 'free') { openPricingModal(); return; }
  const exportAllowed = await checkDailyLimit('export');
  if (!exportAllowed) { alert('오늘의 보고서 다운로드 횟수를 초과했습니다.'); return; }
  if (!lastAnalysisResult) { alert('먼저 분석을 실행해주세요'); return; }

  const { rxns, warns, nutrition, flavor, temp, time } = lastAnalysisResult;
  const now = new Date().toLocaleString('ko-KR');
  const methodInfo = METHODS[method] || {};
  const VNAMES = {C:'비타민 C',B1:'비타민 B1',B2:'비타민 B2',B6:'비타민 B6',B12:'비타민 B12',
    folate:'엽산',niacin:'나이아신',A:'비타민 A',D:'비타민 D',E:'비타민 E',K:'비타민 K',
    calcium:'칼슘',iron:'철분',zinc:'아연',magnesium:'마그네슘',potassium:'칼륨'};

  let report = `═══════════════════════════════════════\n`;
  report += `  MEALCULE 분석 보고서\n`;
  report += `  생성일: ${now}\n`;
  report += `═══════════════════════════════════════\n\n`;

  // ── 1. 재료 ──
  report += `[재료]\n`;
  for (const [name, g] of Object.entries(selected)) {
    report += `  - ${name}: ${g}g\n`;
  }

  // ── 2. 조리 조건 ──
  report += `\n[조리 조건]\n`;
  report += `  방법: ${methodInfo.label || method} (${method})\n`;
  report += `  온도: ${temp}°C\n`;
  report += `  시간: ${time}분\n`;
  if (methodInfo.medium) {
    const medLabel = {dry:'건열',water:'수침',steam:'증기',oil:'유지',mw:'마이크로파',smoke:'훈연',none:'가열없음'};
    report += `  열전달 매체: ${medLabel[methodInfo.medium] || methodInfo.medium}\n`;
  }

  // ── 3. 경고 & 주의 ──
  if (warns.length > 0) {
    report += `\n[경고 및 주의사항]\n`;
    warns.forEach(w => {
      report += `  [${w.type}] ${w.msg}\n`;
    });
  }

  // ── 4. 화학 반응 ──
  report += `\n[화학 반응 분석]\n`;
  if (rxns.length === 0) {
    report += `  특별한 화학 반응이 예측되지 않습니다.\n`;
  } else {
    rxns.forEach(r => {
      report += `\n  ◆ ${r.name} (반응 강도: ${r.intensity}%)\n`;
      report += `    ${r.desc}\n`;
      if (r.effects && r.effects.length > 0) {
        report += `    효과: ${r.effects.join(' · ')}\n`;
      }
      if (r.health) {
        report += `    건강 영향: ${r.health}\n`;
      }
      if (r.science) {
        report += `    과학 모델: ${r.science}\n`;
      }
    });
  }

  // ── 5. 영양소 보존률 ──
  const nutriKeys = Object.keys(nutrition);
  if (nutriKeys.length > 0) {
    report += `\n[영양소 변화 (조리 후 보존률)]\n`;
    // 보존률 낮은 순서로 정렬
    const sorted = nutriKeys.sort((a, b) => (nutrition[a].ret || 100) - (nutrition[b].ret || 100));
    sorted.forEach(k => {
      const n = nutrition[k];
      const label = VNAMES[k] || k;
      const bar = '█'.repeat(Math.round((n.ret || 0) / 10)) + '░'.repeat(10 - Math.round((n.ret || 0) / 10));
      report += `  ${label.padEnd(12)}: ${String(n.ret || 0).padStart(3)}% [${bar}]  ${(n.orig||0).toFixed(2)} → ${(n.cooked||0).toFixed(2)} (단위: mg/μg)\n`;
    });
  }

  // ── 6. 맛 프로파일 ──
  if (flavor) {
    report += `\n[맛 프로파일 예측]\n`;
    const flavorNames = {umami:'감칠맛',sweet:'단맛',salty:'짠맛',sour:'신맛',bitter:'쓴맛'};
    Object.entries(flavor).forEach(([k, v]) => {
      const score = Math.round(v);
      const bar = '█'.repeat(Math.round(score / 10)) + '░'.repeat(10 - Math.round(score / 10));
      report += `  ${(flavorNames[k] || k).padEnd(6)}: ${String(score).padStart(3)}% [${bar}]\n`;
    });
  }

  // ── 7. 과학적 출처 ──
  report += `\n[과학적 출처]\n`;
  for (const [key, ref] of Object.entries(REFERENCES)) {
    ref.papers.forEach(p => {
      report += `  - ${p.authors} (${p.year}) "${p.title}" ${p.journal}\n`;
    });
  }

  report += `\n═══════════════════════════════════════\n`;
  report += `  Mealcule v2.0 · mealcule.com\n`;
  report += `  이 보고서는 이론적 모델에 기반하며\n  의학적 조언을 대체하지 않습니다.\n`;
  report += `═══════════════════════════════════════\n`;

  const blob = new Blob([report], {type: 'text/plain;charset=utf-8'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `mealcule-report-${Date.now()}.txt`;
  a.click();
}

// ── Supabase Config ──
const SUPABASE_URL = 'https://ojtgkvtzmedsbhqkbhwe.supabase.co';
const SUPABASE_KEY = 'sb_publishable_6c8GjizbhYKUBzQywsoUhA_3KYN25-2';
// 로컬 개발 환경에서는 API 호출을 Vercel 배포 서버로 라우팅
const API_BASE = (location.hostname === 'localhost' || location.hostname === '127.0.0.1')
  ? 'https://mealcule.vercel.app' : '';
const USE_SUPABASE = SUPABASE_URL && SUPABASE_KEY;

// Supabase Client (supabase-js v2)
var sbClient = null;
if (SUPABASE_URL && SUPABASE_KEY && typeof window.supabase !== 'undefined') {
  sbClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      storage: window.localStorage,
      storageKey: 'mc_auth',
      flowType: 'pkce'
    }
  });
}

// ── DB Helper: Supabase RPC/Query Wrapper ──
async function dbQuery(table, method = 'select', params = {}) {
  if (!sbClient) return null;
  try {
    let query = sbClient.from(table);
    if (method === 'select') {
      query = query.select(params.select || '*');
      if (params.eq) Object.entries(params.eq).forEach(([k,v]) => query = query.eq(k,v));
      if (params.ilike) Object.entries(params.ilike).forEach(([k,v]) => query = query.ilike(k,v));
      if (params.order) query = query.order(params.order.col, { ascending: params.order.asc !== false });
      if (params.limit) query = query.limit(params.limit);
      if (params.range) query = query.range(params.range[0], params.range[1]);
    } else if (method === 'insert') {
      query = query.insert(params.data);
    } else if (method === 'update') {
      query = query.update(params.data);
      if (params.eq) Object.entries(params.eq).forEach(([k,v]) => query = query.eq(k,v));
    } else if (method === 'upsert') {
      query = query.upsert(params.data);
    } else if (method === 'delete') {
      if (params.eq) Object.entries(params.eq).forEach(([k,v]) => query = query.eq(k,v));
      query = query.delete();
    }
    const { data, error } = await query;
    if (error) {
      console.warn(`DB ${method} ${table}:`, error.message);
      if (typeof showToast === 'function' && (method === 'insert' || method === 'update' || method === 'upsert' || method === 'delete')) {
        showToast(`Save failed: ${error.message}`, 'error');
      }
      return null;
    }
    return data;
  } catch(e) {
    console.warn('DB error:', e);
    if (typeof showToast === 'function') showToast('Database connection error', 'error');
    return null;
  }
}

async function dbRPC(fn, params = {}) {
  if (!sbClient) return null;
  try {
    const { data, error } = await sbClient.rpc(fn, params);
    if (error) {
      console.warn(`RPC ${fn}:`, error.message);
      if (typeof showToast === 'function') showToast(`Operation failed: ${error.message}`, 'error');
      return null;
    }
    return data;
  } catch(e) {
    console.warn('RPC error:', e);
    if (typeof showToast === 'function') showToast('Database connection error', 'error');
    return null;
  }
}

// ── State ──
let selected = {};  // {name: grams}
let activeCategory = "all";
let members = [{id:1, name:'Me', age:null, gender:null, height:null, weight:null, ethnicity:null, country:null, activity:null, traits:[], familyHx:[], conditions:[], substances:[]}];
// 사용자 추가 건강 항목 (AI 분석)
let customTraits = {};     // {key: {label, emoji, desc, interactions, warningFoods}}
let customFamilyHx = {};   // {key: {label, emoji, desc}}
let customSubstances = {}; // {key: {label, emoji, desc, category, interactions, warningFoods}}
let customConditions = {}; // {key: {label, emoji, desc, avoidFoods, benefitFoods, notes}}
let _condExpanded = new Set(); // 현재 펼쳐진 그룹 키
let _condTab = 'me'; // 'me' | 'fam'
let activeMemberId = 1;
let nextMemberId = 2;
let profileOpen = false;
let method = "pan_fry";
let charts = {};
let searchTimeout = null;
let apiCache = {};         // 검색 결과 캐시
let dbCategories = null;   // Supabase 카테고리 캐시

function activeMember() {
  return members.find(m => m.id === activeMemberId);
}

function selNames() { return Object.keys(selected); }
function selCount() { return selNames().length; }

// ── Supabase DB 헬퍼 (supabase-js 기반) ──

// Supabase에서 카테고리 로드
async function loadCategories() {
  if (!sbClient) return;
  const data = await dbQuery('categories', 'select', {
    order: { col: 'sort_order', asc: true },
    eq: { is_active: true }
  });
  if (data) {
    dbCategories = {};
    data.forEach(c => { dbCategories[c.id] = { label: c.label, label_en: c.label_en || (CATEGORIES[c.id] && CATEGORIES[c.id].label_en), emoji: c.emoji }; });
  }
}

// Supabase 재료 검색
async function searchIngredientsAPI(query, category) {
  if (!sbClient) return null;
  const cacheKey = `${category}:${query}`;
  if (apiCache[cacheKey]) return apiCache[cacheKey];

  const params = { select: '*', limit: 50, order: { col: 'name', asc: true } };
  const eqParams = { is_active: true };
  const ilikeParams = {};
  if (category && category !== 'all') eqParams.cat = category;
  if (query) ilikeParams.name = `%${query}%`;
  params.eq = eqParams;
  if (Object.keys(ilikeParams).length) params.ilike = ilikeParams;

  const data = await dbQuery('ingredients', 'select', params);
  if (data) {
    const results = {};
    data.forEach(row => {
      results[row.name] = {
        cat: row.cat,
        emoji: row.emoji,
        defaultG: row.default_g,
        comp: { protein: row.protein, fat: row.fat, carbs: row.carbs, water: row.water, fiber: row.fiber },
        amino: typeof row.amino_acids === 'string' ? JSON.parse(row.amino_acids || '[]') : (row.amino_acids || []),
        vit: {
          A: row.vit_a, C: row.vit_c, D: row.vit_d, E: row.vit_e, K: row.vit_k,
          B1: row.vit_b1, B2: row.vit_b2, B6: row.vit_b6, B12: row.vit_b12,
          folate: row.folate, niacin: row.niacin,
          sodium: row.sodium, potassium: row.potassium, calcium: row.calcium, iron: row.iron
        },
        compounds: typeof row.compounds === 'string' ? JSON.parse(row.compounds || '[]') : (row.compounds || []),
        flavor: {
          umami: row.flavor_umami, sweet: row.flavor_sweet, salty: row.flavor_salty,
          sour: row.flavor_sour, bitter: row.flavor_bitter
        },
        _fromAPI: true
      };
      if (!DB[row.name]) DB[row.name] = results[row.name];
    });
    apiCache[cacheKey] = results;
    return results;
  }
  return null;
}

// 카테고리별 총 개수 조회
async function getCategoryCount() {
  if (!sbClient) return Object.keys(DB).length;
  const { count, error } = await sbClient.from('ingredients').select('id', { count: 'exact', head: true }).eq('is_active', true);
  return error ? Object.keys(DB).length : (count || Object.keys(DB).length);
}

// ── 분석 히스토리 DB 저장 ──
async function saveAnalysisToHistory(analysisResult) {
  if (!sbClient || !currentUser?.id || isGuest) return null;

  const temp = parseInt(document.getElementById('tempSlider')?.value || 180);
  const time = parseInt(document.getElementById('timeSlider')?.value || 10);
  const oil = parseInt(document.getElementById('oilSlider')?.value || 0);

  const data = {
    user_id: currentUser.id,
    ingredients: selected,
    method: method,
    temperature: temp,
    duration: time,
    oil_amount: oil,
    member_profiles: members.map(m => ({ name: m.name, age: m.age, gender: m.gender, conditions: m.conditions })),
    reactions: analysisResult.reactions || null,
    nutrition: analysisResult.nutrition || null,
    flavor: analysisResult.flavor || null,
    health: analysisResult.health || null
  };

  const result = await dbQuery('analysis_history', 'insert', { data });
  return result?.[0]?.id || null;
}

// ── 분석 히스토리 조회 ──
async function loadAnalysisHistory(limit = 20) {
  if (!sbClient || !currentUser?.id) return [];
  const data = await dbQuery('analysis_history', 'select', {
    eq: { user_id: currentUser.id },
    order: { col: 'created_at', asc: false },
    limit: limit
  });
  return data || [];
}

// ── 북마크 토글 ──
async function toggleBookmark(analysisId) {
  if (!sbClient) return;
  const current = await dbQuery('analysis_history', 'select', { eq: { id: analysisId } });
  if (current && current[0]) {
    await dbQuery('analysis_history', 'update', {
      data: { is_bookmarked: !current[0].is_bookmarked },
      eq: { id: analysisId }
    });
  }
}

// ── 피드백 전송 ──
async function sendFeedback(type, message) {
  if (!sbClient || !currentUser?.id) return false;
  const result = await dbQuery('feedback', 'insert', {
    data: { user_id: currentUser.id, type, message }
  });
  return !!result;
}

// 검색 디바운스
function onSearchInput() {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => filterIngredients(), !!sbClient ? 300 : 50);
}

// ── Init ──
async function init() {
  const statusEl = document.getElementById('dbStatus');

  if (sbClient) {
    statusEl.innerHTML = '<img src="https://images.pexels.com/photos/1028599/pexels-photo-1028599.jpeg?auto=compress&cs=tinysrgb&w=20&h=20&fit=crop" style="width:20px;height:20px;border-radius:4px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML=\'<span>🔄</span>\'"> DB 연결 중...';
    try {
      await Promise.race([
        Promise.all([loadCategories(), loadCustomMethods()]),
        new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 5000))
      ]);
      const count = await Promise.race([
        getCategoryCount(),
        new Promise(resolve => setTimeout(() => resolve(Object.keys(DB).length), 5000))
      ]);
      if (dbCategories) {
        const _en = window.I18n && I18n.lang === 'en';
        statusEl.innerHTML = `<span style="color:#10B981">● ${_en ? 'Online' : '온라인'}</span> · ${count.toLocaleString()}+ ${_en ? 'ingredients' : '식재료'}`;
      } else {
        statusEl.innerHTML = `<span style="color:#f97316">● 로컬</span> · ${Object.keys(DB).length}+ 식재료`;
      }
    } catch(e) {
      statusEl.innerHTML = `<span style="color:#f97316">● 로컬</span> · ${Object.keys(DB).length}+ 식재료`;
      console.warn('DB 연결 실패, 로컬 모드:', e);
    }
  } else {
    statusEl.innerHTML = '<span style="color:rgba(255,255,255,0.6)">○ 로컬</span> · ' + Object.keys(DB).length + '+ 식재료';
  }

  renderCategoryTabs();
  renderIngredients();
  renderMethods();
  renderMemberTabs();
  renderConditions();
  renderTraits();
  renderFamilyHx();
  renderSubstances();
  loadMemberForm();
}

function renderConditions() {
  const container = document.getElementById("condGrid");
  if (!container) return;
  const member = activeMember();
  container.innerHTML = "";

  // ── 탭 바 ──
  const isMe = _condTab === 'me';
  const tabBar = document.createElement("div");
  tabBar.className = "cond-tab-bar";
  const _en = window.I18n && I18n.lang === 'en';
  tabBar.innerHTML = `
    <button class="cond-tab me${isMe?' active':''}" onclick="switchCondTab('me')"><img src="https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='🏥'"> ${_en ? 'My Conditions' : '본인 질환'}</button>
    <button class="cond-tab fam${!isMe?' active':''}" onclick="switchCondTab('fam')"><img src="https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=18&h=18&fit=crop" style="width:18px;height:18px;border-radius:4px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='👨‍👩‍👧‍👦'"> ${_en ? 'Family History' : '직계 가족 병력'}</button>`;
  container.appendChild(tabBar);

  // 현재 탭 기준 배열
  const myArr    = isMe ? member.conditions : member.familyHx;
  const theirArr = isMe ? member.familyHx : member.conditions;
  const activeClass = isMe ? 'cond-active' : 'fam-active';
  const crossLabel  = isMe ? (_en ? 'Family✓' : '가족✓') : (_en ? 'Me✓' : '나✓');

  const wrap = document.createElement("div");
  wrap.className = "ing-table";

  // ── DISEASE_GROUPS 렌더링 (양쪽 탭 공유 DB) ──
  Object.entries(DISEASE_GROUPS).forEach(([groupKey, group]) => {
    const items = group.keys.filter(k => !!CONDITIONS[k]);
    if (!items.length) return;

    const selCount = items.filter(k => myArr.includes(k)).length;
    const isOpen = _condExpanded.has(groupKey);

    const hdr = document.createElement("div");
    hdr.className = "cond-group-hdr" + (isOpen ? " expanded" : "");
    const badge = selCount > 0
      ? `<span class="cg-badge" style="background:${isMe?'#10B981':'#3b82f6'}">${selCount}</span>` : '';
    hdr.innerHTML = `<span class="cg-e">${group.img ? '<img src="'+group.img+'" style="width:20px;height:20px;border-radius:4px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML=\''+group.emoji+'\'">': group.emoji}</span><span>${tl(group)}</span>${badge}<span class="cg-arr">▶</span>`;
    hdr.onclick = () => toggleCondParent(groupKey);
    wrap.appendChild(hdr);

    const expand = document.createElement("div");
    expand.className = "ing-expand" + (isOpen ? " open" : "");
    expand.id = "cond-expand-" + groupKey;

    for (let i = 0; i < items.length; i += 4) {
      const subRow = document.createElement("div");
      subRow.className = "ing-sub-row ing-row health-ing-row";
      items.slice(i, i + 4).forEach(key => {
        const cond = CONDITIONS[key];
        const isActive = myArr.includes(key);
        const crossActive = theirArr.includes(key);

        const cell = document.createElement("div");
        cell.className = "ing-cell" + (isActive ? " " + activeClass : "");
        cell.innerHTML = `<span class="ci-e">${cond.emoji}</span><span class="ci-n">${tl(cond)}</span>${crossActive ? `<span class="ci-cross-tag">${crossLabel}</span>` : ''}`;
        cell.onclick = e => {
          e.stopPropagation();
          const idx = myArr.indexOf(key);
          if (idx >= 0) myArr.splice(idx, 1); else myArr.push(key);
          renderConditions();
          updateProfileSummary();
          updateProfileNote();
        };
        subRow.appendChild(cell);
      });
      expand.appendChild(subRow);
    }
    wrap.appendChild(expand);
  });

  // ── 직접 추가(AI) 항목 — 양쪽 탭 공유 ──
  const customEntries = Object.entries(customConditions);
  if (customEntries.length > 0) {
    const gk = "_custom";
    const selCount = customEntries.filter(([k]) => myArr.includes(k)).length;
    const isOpen = _condExpanded.has(gk);
    const badge = selCount > 0
      ? `<span class="cg-badge" style="background:${isMe?'#10B981':'#3b82f6'}">${selCount}</span>` : '';
    const hdr = document.createElement("div");
    hdr.className = "cond-group-hdr" + (isOpen ? " expanded" : "");
    hdr.innerHTML = `<span class="cg-e"><img src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='🤖'"></span><span>${_en ? 'Custom Added' : '직접 추가'}</span>${badge}<span class="cg-arr">▶</span>`;
    hdr.onclick = () => toggleCondParent(gk);
    wrap.appendChild(hdr);
    const expand = document.createElement("div");
    expand.className = "ing-expand" + (isOpen ? " open" : "");
    expand.id = "cond-expand-" + gk;
    for (let i = 0; i < customEntries.length; i += 4) {
      const subRow = document.createElement("div");
      subRow.className = "ing-sub-row ing-row health-ing-row";
      customEntries.slice(i, i + 4).forEach(([k, item]) => {
        const isActive = myArr.includes(k);
        const crossActive = theirArr.includes(k);
        const cell = document.createElement("div");
        cell.className = "ing-cell health-custom" + (isActive ? " " + activeClass : "");
        cell.innerHTML = `<span class="ci-e">${item.emoji}</span><span class="ci-n">${tl(item)}</span>${crossActive ? `<span class="ci-cross-tag">${crossLabel}</span>` : ''}`;
        cell.onclick = e => {
          e.stopPropagation();
          const idx = myArr.indexOf(k);
          if (idx >= 0) myArr.splice(idx, 1); else myArr.push(k);
          renderConditions();
          updateProfileSummary();
          updateProfileNote();
        };
        subRow.appendChild(cell);
      });
      expand.appendChild(subRow);
    }
    wrap.appendChild(expand);
  }

  container.appendChild(wrap);
}

function switchCondTab(tab) {
  _condTab = tab;
  renderConditions();
}

function toggleCondParent(groupKey) {
  if (_condExpanded.has(groupKey)) _condExpanded.delete(groupKey);
  else _condExpanded.add(groupKey);
  renderConditions();
}

function toggleCondition(key) {
  const member = activeMember();
  if (member.conditions.includes(key)) member.conditions = member.conditions.filter(c => c !== key);
  else member.conditions.push(key);
  renderConditions();
  updateProfileNote();
}

function toggleProfile() {
  profileOpen = !profileOpen;
  document.getElementById("profilePanel").style.display = profileOpen ? "block" : "none";
  const btn = document.getElementById("profileToggle");
  btn.textContent = profileOpen
    ? (window.t ? t('profile.toggleHide') : "프로필 접기 ▲")
    : (window.t ? t('profile.toggleShow') : "프로필 입력 ▼");
  if (!profileOpen) updateProfileSummary();
}

// ── Profile Step Navigation (Progressive Disclosure) ─────────────────────
let _profileStep = 'basic';

function switchProfileStep(step) {
  _profileStep = step;
  const steps = ['basic', 'health', 'advanced'];
  steps.forEach(s => {
    const panel = document.getElementById('profileStep-' + s);
    const btn = document.querySelector('.profile-step[data-step="' + s + '"]');
    if (panel) panel.style.display = s === step ? 'block' : 'none';
    if (btn) {
      btn.classList.toggle('active', s === step);
    }
  });
}

// ── Mobile Bottom Navigation ──────────────────────────────────────────────
function mobileNavTo(section) {
  // Update active state
  document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.id === 'mnav-' + section);
  });

  const container = document.querySelector('.container');
  if (!container) return;

  // Scroll to the relevant section
  const scrollMap = {
    ingredients: '.grid2',
    cooking: '.grid2',
    profile: '.card[style*="margin-bottom:16px"]',
    results: '#results',
    history: '#historyPanel',
  };

  if (section === 'history') {
    toggleHistory();
  } else if (section === 'profile') {
    const card = document.querySelector('#profileToggle')?.closest('.card');
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (!profileOpen) toggleProfile();
  } else if (section === 'results') {
    const results = document.getElementById('results');
    if (results && results.style.display !== 'none') {
      results.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      const emptyState = document.getElementById('emptyState');
      if (emptyState) emptyState.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } else if (section === 'ingredients') {
    const grid = document.querySelector('.grid2');
    if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else if (section === 'cooking') {
    const cookingCard = document.querySelectorAll('.grid2 .card')[1];
    if (cookingCard) cookingCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function _makeHealthRow(key, icon, label, desc, isActive, isCustom, extraClass, onToggle) {
  const row = document.createElement("div");
  row.className = "health-row" + (isActive ? " active" : "") + (isCustom ? " custom-item" : "") + (extraClass ? " " + extraClass : "");
  row.innerHTML = `
    <div class="health-row-check">✓</div>
    <div class="health-row-icon">${icon}</div>
    <div class="health-row-main">
      <div class="health-row-label">${label}</div>
      ${desc ? `<div class="health-row-desc">${desc}</div>` : ''}
    </div>`;
  row.onclick = onToggle;
  return row;
}

function _healthCell(key, emoji, label, desc, active, isCustom, activeCls, onToggle) {
  const cell = document.createElement("div");
  cell.className = "ing-cell" + (active ? (" " + (activeCls || "active")) : "") + (isCustom ? " health-custom" : "");
  cell.innerHTML = `<span class="ci-e">${emoji}</span><span class="ci-n">${label}</span>`;
  cell.title = desc || '';
  cell.onclick = onToggle;
  return cell;
}

function _healthGrid(entries, member, keyFn, toggleFn, activeCls, isCustomFn) {
  const wrap = document.createElement("div");
  wrap.className = "ing-table";
  for (let i = 0; i < entries.length; i += 4) {
    const row = document.createElement("div");
    row.className = "ing-row health-ing-row";
    entries.slice(i, i + 4).forEach(([key, item]) => {
      row.appendChild(_healthCell(
        key, item.emoji, tl(item), tl(item, "desc") || '',
        keyFn(key), isCustomFn ? isCustomFn(key) : false,
        activeCls, () => { toggleFn(key); }
      ));
    });
    wrap.appendChild(row);
  }
  return wrap;
}

function renderTraits() {
  const container = document.getElementById("traitGrid");
  const member = activeMember();
  container.innerHTML = "";
  const allTraits = {...TRAITS, ...customTraits};
  container.appendChild(_healthGrid(
    Object.entries(allTraits), member,
    k => member.traits.includes(k),
    k => { const i = member.traits.indexOf(k); if (i>=0) member.traits.splice(i,1); else member.traits.push(k); renderTraits(); updateProfileSummary(); },
    'active', k => !!customTraits[k]
  ));
}

// 가족력 렌더링 → 통합 테이블(condGrid)로 위임
function renderFamilyHx() { renderConditions(); }
function toggleFamParent(groupKey) { toggleCondParent(groupKey); }

function loadMemberForm() {
  const member = activeMember();
  document.getElementById("pName").value = member.name || '';
  document.getElementById("pAge").value = member.age || '';
  document.getElementById("pGender").value = member.gender || '';
  document.getElementById("pHeight").value = member.height || '';
  document.getElementById("pWeight").value = member.weight || '';
  document.getElementById("pEthnicity").value = member.ethnicity || '';
  document.getElementById("pCountry").value = member.country || '';
  document.getElementById("pActivity").value = member.activity || '';
}

function saveMemberForm() {
  const member = activeMember();
  member.name = document.getElementById("pName").value || ((window.I18n && I18n.lang === 'en') ? 'Me' : '나');
  member.age = parseInt(document.getElementById("pAge").value) || null;
  member.gender = document.getElementById("pGender").value || null;
  member.height = parseInt(document.getElementById("pHeight").value) || null;
  member.weight = parseInt(document.getElementById("pWeight").value) || null;
  member.ethnicity = document.getElementById("pEthnicity").value || null;
  member.country = document.getElementById("pCountry").value || null;
  member.activity = document.getElementById("pActivity").value || null;
}

function updateProfile() {
  saveMemberForm();
  updateProfileSummary();
}

function calcBMI(member) {
  if (!member.height || !member.weight) return null;
  return member.weight / ((member.height/100) ** 2);
}

function calcDailyCalories(member) {
  if (!member.age || !member.gender || !member.height || !member.weight) return null;
  let bmr;
  if (member.gender === 'male') bmr = 88.362 + (13.397*member.weight) + (4.799*member.height) - (5.677*member.age);
  else bmr = 447.593 + (9.247*member.weight) + (3.098*member.height) - (4.330*member.age);
  const factors = {sedentary:1.2, light:1.375, moderate:1.55, active:1.725, very_active:1.9};
  return bmr * (factors[member.activity] || 1.375);
}

function updateProfileSummary() {
  saveMemberForm();
  const el = document.getElementById("profileSummary");
  const member = activeMember();
  const chips = [];
  if (member.age) chips.push(`${member.age}세`);
  if (member.gender) chips.push(member.gender==='male'?'남성':'여성');
  const bmi = calcBMI(member);
  if (bmi) {
    const bmiLabel = bmi<18.5?'저체중':bmi<23?'정상':bmi<25?'과체중':'비만';
    chips.push(`BMI ${bmi.toFixed(1)} (${bmiLabel})`);
  }
  const ethLabels = {east_asian:'동아시아인',southeast_asian:'동남아시아인',south_asian:'남아시아인',caucasian:'유럽계',african:'아프리카계',hispanic:'히스패닉',middle_eastern:'중동계'};
  if (member.ethnicity) chips.push(ethLabels[member.ethnicity]);
  const countryLabels = {kr:'🇰🇷 한국',jp:'🇯🇵 일본',cn:'🇨🇳 중국',us:'🇺🇸 미국',gb:'🇬🇧 영국',fr:'🇫🇷 프랑스',de:'🇩🇪 독일',it:'🇮🇹 이탈리아',es:'🇪🇸 스페인',th:'🇹🇭 태국',vn:'🇻🇳 베트남',in:'🇮🇳 인도',id:'🇮🇩 인도네시아',ph:'🇵🇭 필리핀',mx:'🇲🇽 멕시코',br:'🇧🇷 브라질',tr:'🇹🇷 터키',sa:'🇸🇦 사우디',eg:'🇪🇬 이집트',ng:'🇳🇬 나이지리아',other:'기타'};
  if (member.country) chips.push(countryLabels[member.country] || member.country);
  const actLabels = {sedentary:'비활동적',light:'가벼운 활동',moderate:'중간 활동',active:'활발',very_active:'매우 활발'};
  if (member.activity) chips.push(actLabels[member.activity]);
  member.traits.forEach(t => { const d = TRAITS[t]||customTraits[t]; if(d) chips.push(d.emoji+' '+d.label); });
  member.familyHx.forEach(f => { const d = CONDITIONS[f]||customConditions[f]; if(d) chips.push('<img src="https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=14&h=14&fit=crop" style="width:14px;height:14px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML=\'👨‍👩‍👧\'"> '+d.label); });
  member.conditions.forEach(c => { const d = CONDITIONS[c]||customConditions[c]; if(d) chips.push(d.emoji+' '+d.label); });
  member.substances.forEach(s => { const d = SUBSTANCES[s]||customSubstances[s]; if(d) chips.push(d.emoji+' '+d.label); });

  if (chips.length > 0) {
    el.style.display = "flex";
    el.innerHTML = chips.map(c => `<span class="profile-chip">${c}</span>`).join("");
  } else {
    el.style.display = "none";
  }
  updateProfileNote();
}

function updateProfileNote() {
  const member = activeMember();
  const hasAny = member.conditions.length > 0 || member.traits.length > 0 || member.familyHx.length > 0 || member.age;
  document.getElementById("condNote").style.display = hasAny ? "block" : "none";
}

function renderMemberTabs() {
  const container = document.getElementById("memberTabs");
  container.innerHTML = "";
  members.forEach(m => {
    const tab = document.createElement("button");
    tab.className = "member-tab" + (m.id === activeMemberId ? " active" : "");
    const deleteBtn = members.length > 1 ? `<span class="delete-member" onclick="deleteMember(${m.id}); event.stopPropagation();">✕</span>` : '';
    tab.innerHTML = `${m.name}${deleteBtn}`;
    tab.onclick = () => switchMember(m.id);
    container.appendChild(tab);
  });
  if (members.length < 6) {
    const addBtn = document.createElement("button");
    addBtn.className = "add-member-btn";
    addBtn.innerHTML = (window.I18n && I18n.lang === 'en') ? "+ Add" : "+ 추가";
    addBtn.onclick = addMember;
    container.appendChild(addBtn);
  }
}

function switchMember(memberId) {
  saveMemberForm();
  activeMemberId = memberId;
  loadMemberForm();
  renderMemberTabs();
  renderConditions();
  renderTraits();
  renderFamilyHx();
  renderSubstances();
  updateProfileSummary();
}

function addMember() {
  if (members.length >= 6) return;
  saveMemberForm();
  const memberName = (window.I18n && I18n.lang === 'en') ? `Person ${nextMemberId}` : `사람${nextMemberId}`;
  const newMember = {id: nextMemberId++, name: memberName, age: null, gender: null, height: null, weight: null, ethnicity: null, country: null, activity: null, traits: [], familyHx: [], conditions: [], substances: []};
  members.push(newMember);
  switchMember(newMember.id);
}

function deleteMember(memberId) {
  if (members.length <= 1) return;
  members = members.filter(m => m.id !== memberId);
  if (activeMemberId === memberId) {
    activeMemberId = members.length > 0 ? members[0].id : null;
  }
  if (!activeMemberId) return;
  switchMember(activeMemberId);
}

function renderSubstances() {
  const container = document.getElementById("substanceGrid");
  const member = activeMember();
  if (!container) return;
  container.innerHTML = "";
  const allSubstances = {...SUBSTANCES, ...customSubstances};
  const _en = window.I18n && I18n.lang === 'en';
  const catLabels = _en
    ? {alcohol:'<img src="https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=18&h=18&fit=crop" style="width:18px;height:18px;border-radius:4px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML=\'🍷\'"> Alcohol', smoking:'🚬 Smoking', medication:'<img src="https://images.pexels.com/photos/3683098/pexels-photo-3683098.jpeg?auto=compress&cs=tinysrgb&w=18&h=18&fit=crop" style="width:18px;height:18px;border-radius:4px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML=\'💊\'"> Medication', supplement:'<img src="https://images.pexels.com/photos/1340116/pexels-photo-1340116.jpeg?auto=compress&cs=tinysrgb&w=18&h=18&fit=crop" style="width:18px;height:18px;border-radius:4px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML=\'🌿\'"> Supplements', lifestyle:'<img src="https://images.pexels.com/photos/3775566/pexels-photo-3775566.jpeg?auto=compress&cs=tinysrgb&w=18&h=18&fit=crop" style="width:18px;height:18px;border-radius:4px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML=\'🏃\'"> Lifestyle'}
    : {alcohol:'<img src="https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=18&h=18&fit=crop" style="width:18px;height:18px;border-radius:4px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML=\'🍷\'"> 음주', smoking:'🚬 흡연', medication:'<img src="https://images.pexels.com/photos/3683098/pexels-photo-3683098.jpeg?auto=compress&cs=tinysrgb&w=18&h=18&fit=crop" style="width:18px;height:18px;border-radius:4px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML=\'💊\'"> 약물', supplement:'<img src="https://images.pexels.com/photos/1340116/pexels-photo-1340116.jpeg?auto=compress&cs=tinysrgb&w=18&h=18&fit=crop" style="width:18px;height:18px;border-radius:4px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML=\'🌿\'"> 영양제', lifestyle:'<img src="https://images.pexels.com/photos/3775566/pexels-photo-3775566.jpeg?auto=compress&cs=tinysrgb&w=18&h=18&fit=crop" style="width:18px;height:18px;border-radius:4px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML=\'🏃\'"> 생활습관'};
  const catOrder = ['alcohol','smoking','medication','supplement','lifestyle'];
  const wrap = document.createElement("div");
  wrap.className = "ing-table";
  catOrder.forEach(cat => {
    const items = Object.entries(allSubstances).filter(([,v]) => v.category === cat);
    if (!items.length) return;
    const hdr = document.createElement("div");
    hdr.className = "ing-cat-hdr";
    hdr.innerHTML = `<span>${catLabels[cat]}</span>`;
    wrap.appendChild(hdr);
    for (let i = 0; i < items.length; i += 4) {
      const row = document.createElement("div");
      row.className = "ing-row health-ing-row";
      items.slice(i, i+4).forEach(([key, s]) => {
        row.appendChild(_healthCell(
          key, s.emoji, tl(s), tl(s, "desc") || '',
          member.substances.includes(key), !!customSubstances[key], 'active',
          () => { const idx = member.substances.indexOf(key); if (idx>=0) member.substances.splice(idx,1); else member.substances.push(key); renderSubstances(); updateProfileSummary(); }
        ));
      });
      wrap.appendChild(row);
    }
  });
  container.appendChild(wrap);
}

// 투입 재료의 총 영양 성분 계산 (100g 기준 DB → 실제 g 환산)
function calcTotalComposition(ingMap) {
  // 확장된 영양소 추적: 기존 macro + micro 영양소 추가 (CONDITIONS rules에서 참조)
  const total = {protein:0, fat:0, carbs:0, water:0, fiber:0, sodium:0, potassium:0, saturatedFat:0, calories:0,
    calcium:0, iron:0, zinc:0, vitaminC:0, vitaminD:0, vitaminK:0, vitaminA:0, vitaminE:0,
    vitaminB6:0, vitaminB12:0, folate:0, magnesium:0, selenium:0, omega3:0, phosphorus:0, purine:0, iodine:0};
  // 포화지방 추정: 동물성 카테고리별 세분화 (USDA FoodData Central 기준)
  const highSatAnimals = new Set(['소고기','돼지고기','삼겹살','양고기','베이컨','소시지','버터','치즈','크림치즈','생크림','라드']);
  const medSatAnimals = new Set(['계란','닭고기','오리고기','우유','요거트','닭가슴살']);
  const highSatPlants = new Set(['코코넛오일','팜유','코코넛밀크','코코넛']);
  // 퓨린 추정: 식품군별 퓨린 함량 (mg/100g) — Choi et al. 2004, NEJM
  const purineHigh = new Set(['소고기','돼지고기','양고기','멸치','정어리','꽁치','고등어','새우','조개','굴','간','내장']);
  const purineMed = new Set(['닭고기','오리고기','연어','참치','두부','콩','렌틸콩','버섯','표고버섯','아스파라거스','시금치']);
  Object.entries(ingMap).forEach(([name, grams]) => {
    const d = DB[name]; if (!d) return;
    const s = grams / 100;
    total.protein += (d.comp.protein||0) * s;
    total.fat += (d.comp.fat||0) * s;
    total.carbs += (d.comp.carbs||0) * s;
    total.water += (d.comp.water||0) * s;
    total.fiber += (d.comp.fiber||0) * s;
    total.sodium += (d.vit?.sodium||0) * s;
    total.potassium += (d.vit?.potassium||0) * s;
    total.calcium += (d.vit?.calcium||0) * s;
    total.iron += (d.vit?.iron||0) * s;
    total.zinc += (d.vit?.zinc||0) * s;
    total.vitaminC += (d.vit?.C||0) * s;
    total.vitaminD += (d.vit?.D||0) * s;
    total.vitaminK += (d.vit?.K||0) * s;
    total.vitaminA += (d.vit?.A||0) * s;
    total.vitaminE += (d.vit?.E||0) * s;
    total.vitaminB6 += (d.vit?.B6||0) * s;
    total.vitaminB12 += (d.vit?.B12||0) * s;
    total.folate += (d.vit?.folate||0) * s;
    total.magnesium += (d.vit?.magnesium||0) * s;
    total.selenium += (d.vit?.selenium||0) * s;
    total.omega3 += (d.vit?.omega3||0) * s;
    total.phosphorus += (d.vit?.phosphorus||0) * s;
    total.iodine += (d.vit?.iodine||0) * s;
    // 포화지방 세분화 (WHO 2023: <10% total energy)
    const satRatio = highSatAnimals.has(name) ? 0.45 : medSatAnimals.has(name) ? 0.30 : highSatPlants.has(name) ? 0.82 : 0.14;
    total.saturatedFat += (d.comp.fat||0) * s * satRatio;
    // 퓨린 추정: Choi HK et al. (2004) NEJM 350:1093
    if (purineHigh.has(name)) total.purine += 170 * s;
    else if (purineMed.has(name)) total.purine += 80 * s;
    else total.purine += 15 * s;
  });
  total.calories = total.protein * 4 + total.carbs * 4 + total.fat * 9;
  return total;
}

// 질환별 건강 분석 (프로필 + 가족력 + 약물 상호작용 통합)
function analyzeHealth(ingMap, method, temp, time, memberForAnalysis) {
  const member = memberForAnalysis || activeMember();
  const hasProfile = member.age || member.traits.length > 0 || member.familyHx.length > 0;
  if (member.conditions.length === 0 && !hasProfile && member.substances.length === 0) return [];
  const comp = calcTotalComposition(ingMap);
  const bmi = calcBMI(member);
  const dailyCal = calcDailyCalories(member);
  const results = [];

  // 1) 기존 질환 분석
  member.conditions.forEach(condKey => {
    const cond = CONDITIONS[condKey];
    if (!cond) return;
    const findings = [];
    cond.rules.forEach(rule => {
      if (rule.check(ingMap, comp, method, temp, time)) {
        findings.push({
          severity: rule.severity, title: rule.title,
          detail: typeof rule.detail === 'function' ? rule.detail(ingMap, comp) : rule.detail,
          tip: rule.tip,
        });
      }
    });

    // 나이별 보정
    if (member.age) {
      if (member.age >= 65 && condKey === 'diabetes' && comp.carbs > 30) {
        findings.push({severity:'caution', title:`${member.age}세 고령 — 혈당 조절 능력 저하`,
          detail:`나이가 들수록 인슐린 감수성이 떨어져 같은 양의 탄수화물에도 혈당이 더 높이 올라갑니다. 65세 이상은 1회 탄수화물 30-40g 이하를 권장합니다.`,
          tip:'식사량을 줄이고 횟수를 늘리는 소식다식(少食多食) 패턴이 혈당 관리에 유리합니다.'});
      }
      if (member.age >= 50 && condKey === 'heart') {
        findings.push({severity:'info', title:`${member.age}세 — 심혈관 위험 연령`,
          detail:`50세 이상은 심혈관질환 위험이 급격히 증가합니다. 식이 관리가 특히 중요한 시기입니다.`,
          tip:'오메가-3 지방산(등푸른 생선, 아마씨)을 주 2-3회 섭취하면 심혈관 보호에 도움됩니다.'});
      }
    }

    // BMI별 보정
    if (bmi && bmi >= 25 && ['diabetes','heart','obesity'].includes(condKey)) {
      findings.push({severity:'caution', title:`BMI ${bmi.toFixed(1)} — 과체중/비만 상태`,
        detail:`현재 BMI가 ${bmi.toFixed(1)}로 ${bmi>=30?'비만':'과체중'} 범위입니다. 이는 인슐린 저항성, 고혈압, 이상지질혈증의 위험을 높입니다.`,
        tip:`목표 BMI 23 이하를 위해 일일 칼로리를 ${dailyCal ? Math.round(dailyCal*0.8) + 'kcal' : '기초대사량의 80%'}로 제한하는 것을 고려하세요.`});
    }

    // 가족력 보정 — 통합 DB: familyHx와 conditions가 같은 key 사용
    if (member.familyHx.includes(condKey)) {
      const famLabel = (CONDITIONS[condKey]||customConditions[condKey])?.label || condKey;
      findings.push({severity:'caution', title:`<img src="https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='👨‍👩‍👧'"> 가족력: ${famLabel}`,
        detail:`직계 가족에 ${famLabel} 병력이 있어 유전적 소인이 있을 수 있습니다. 같은 식이라도 발병 위험이 일반인 대비 2-3배 높을 수 있습니다.`,
        tip:'정기 검진과 함께 예방적 식이 관리를 더 엄격하게 적용하는 것이 좋습니다.'});
    }

    // 종합 점수 계산
    let score = 70;
    findings.forEach(f => {
      if (f.severity === 'danger') score -= 30;
      if (f.severity === 'caution') score -= 10;
      if (f.severity === 'good') score += 15;
      if (f.severity === 'info') score += 0;
    });
    score = Math.max(0, Math.min(100, score));
    results.push({key:condKey, label:cond.label, emoji:cond.emoji, desc:cond.desc, score, findings, composition:comp});
  });

  // 1b) 사용자 추가 질환 (정적 노트 방식)
  member.conditions.forEach(condKey => {
    const cond = customConditions[condKey];
    if (!cond) return;
    const findings = [];
    if (cond.avoidFoods?.length) {
      const matched = cond.avoidFoods.filter(af => Object.keys(ingMap).some(n => n.includes(af.food) || af.food.includes(n)));
      if (matched.length > 0) {
        matched.forEach(af => findings.push({severity:'caution', title:`${af.food} 주의`, detail:af.reason, tip:'의사 또는 영양사와 상담하여 식이 계획을 조정하세요.'}));
      }
    }
    if (cond.benefitFoods?.length) {
      const matched = cond.benefitFoods.filter(bf => Object.keys(ingMap).some(n => n.includes(bf.food) || bf.food.includes(n)));
      if (matched.length > 0) {
        matched.forEach(bf => findings.push({severity:'good', title:`${bf.food} 효과`, detail:bf.benefit, tip:'균형 잡힌 식단의 일부로 꾸준히 섭취하세요.'}));
      }
    }
    if (cond.notes?.length && findings.length === 0) {
      cond.notes.slice(0, 2).forEach(n => findings.push({severity:'info', title:'식이 주의사항', detail:n, tip:''}));
    }
    const score = Math.max(0, Math.min(100, 70 - findings.filter(f=>f.severity==='caution'||f.severity==='danger').length * 10 + findings.filter(f=>f.severity==='good').length * 10));
    results.push({key:condKey, label:cond.label, emoji:cond.emoji, desc:cond.desc, score, findings, composition:comp});
  });

  // 2) 약물-음식 상호작용 분석
  const substanceFindings = [];

  // 메트포르민 + 알코올
  if (member.substances.includes('med_metformin') && (member.substances.includes('alcohol_moderate') || member.substances.includes('alcohol_heavy'))) {
    substanceFindings.push({severity:'danger', title:'메트포르민 + 알코올 → 유산산증 위험',
      detail:'알코올은 메트포르민의 유산산증(lactic acidosis) 위험을 크게 높입니다. 특히 중등도 이상 음주 시 위험합니다.',
      tip:'메트포르민 복용 중에는 음주를 피하거나 최소한으로 줄이세요.'});
  }

  // 항응고제(와파린) + 비타민K 풍부 음식
  if (member.substances.includes('med_anticoagulant')) {
    const vitKFoods = Object.keys(ingMap).filter(n => ['시금치','브로콜리','양배추'].includes(n));
    if (vitKFoods.length > 0) {
      substanceFindings.push({severity:'danger', title:`항응고제(와파린) + 비타민K 음식(${vitKFoods.join(',')}) → 약효 감소`,
        detail:'비타민K는 와파린의 작용을 방해합니다. 갑작스러운 많은 비타민K 섭취는 혈전 위험을 높입니다.',
        tip:'매일 일정량의 비타민K를 안정적으로 섭취하는 것이 중요합니다. 의사와 상담 후 식단을 조정하세요.'});
    }
  }

  // 스타틴 + 자몽 (만약 DB에 있다면)
  if (member.substances.includes('med_statin') && ingMap['자몽']) {
    substanceFindings.push({severity:'caution', title:'스타틴 + 자몽 → 약물 농도 상승',
      detail:'자몽의 furanocoumarin은 스타틴 대사를 방해하여 약물 농도가 과도하게 올라갈 수 있습니다.',
      tip:'스타틴 복용 중에는 자몽과 자몽주스를 피하세요.'});
  }

  // 칼슘 보충제 + 철분 보충제
  if (member.substances.includes('sup_calcium') && member.substances.includes('sup_iron')) {
    substanceFindings.push({severity:'caution', title:'칼슘 + 철분 보충제 → 흡수 간섭',
      detail:'칼슘은 철분 흡수를 방해합니다. 같은 시간에 섭취하면 둘 다의 흡수가 감소합니다.',
      tip:'칼슘과 철분은 최소 2시간 이상 간격을 두고 섭취하세요.'});
  }

  // PPI + 칼슘/철분/B12
  if (member.substances.includes('med_ppi')) {
    const absorbIngs = [];
    if (member.substances.includes('sup_calcium')) absorbIngs.push('칼슘');
    if (member.substances.includes('sup_iron')) absorbIngs.push('철분');
    if (absorbIngs.length > 0) {
      substanceFindings.push({severity:'caution', title:`PPI + ${absorbIngs.join('/')} → 흡수 감소`,
        detail:`PPI(위산억제제)는 위산을 줄이기 때문에 ${absorbIngs.join(',')}의 흡수가 감소합니다.`,
        tip:`${absorbIngs.join(',')} 보충제는 PPI와 최소 2시간 간격을 두고 섭취하세요.`});
    }
  }

  // 알코올_heavy + 고지방
  if (member.substances.includes('alcohol_heavy') && comp.fat > 25) {
    substanceFindings.push({severity:'danger', title:'다량 음주 + 고지방 식사 → 간 손상 위험',
      detail:`높은 알코올 섭취와 고지방 식사는 지방간을 유발하고 간 손상을 가속화합니다.`,
      tip:'음주량을 줄이고, 지방이 적은 음식을 선택하세요.'});
  }

  // 알코올 + NSAIDs → 위장 출혈
  if ((member.substances.includes('alcohol_moderate') || member.substances.includes('alcohol_heavy')) && member.substances.includes('med_nsaid')) {
    substanceFindings.push({severity:'danger', title:'알코올 + NSAIDs → 위장 출혈 위험',
      detail:'알코올과 소염진통제(아스피린, 이부프로펜 등)를 함께 복용하면 위장 출혈 위험이 크게 증가합니다.',
      tip:'가능한 음주를 피하고, 반드시 필요한 경우 NSAIDs는 식사와 함께 복용하세요.'});
  }

  // 흡연 + 비타민C 음식 (필요량 35mg 추가)
  if (member.substances.includes('smoking_current')) {
    const vitCFoods = Object.keys(ingMap).filter(n => DB[n]?.vit?.C && DB[n].vit.C > 20);
    const vitCTotal = Object.entries(ingMap).reduce((sum,[n,g]) => sum + (DB[n]?.vit?.C||0) * g / 100, 0);
    if (vitCFoods.length > 0 && vitCTotal >= 35) {
      substanceFindings.push({severity:'good', title:'흡연 중 — 비타민C로 산화스트레스 완화',
        detail:`현재 비타민C 약 ${vitCTotal.toFixed(1)}mg이 포함되어 있습니다. 흡연자는 비일반인보다 35mg 더 많은 비타민C가 필요합니다.`,
        tip:'비타민C 풍부 식품(레몬, 파프리카, 키위)을 자주 섭취하세요.'});
    }
  }

  // GLP-1(비만치료제) + 고지방/고탄수화물 → 소화불편
  if (member.substances.includes('med_obesity')) {
    if (comp.fat > 20 || comp.carbs > 40) {
      substanceFindings.push({severity:'caution', title:'비만치료제(GLP-1) + 고지방/탄수화물 → 메스꺼움 위험',
        detail:'GLP-1 약물은 위 배출을 느리게 하므로, 고지방·고탄수화물 식사 시 메스꺼움과 소화불편이 심할 수 있습니다.',
        tip:'소량씩 자주 먹는 식사 패턴으로 전환하고, 기름진 음식과 단순 탄수화물을 제한하세요.'});
    }
  }

  // 갑상선약 + 칼슘/철분/두부 (이소플라본)
  if (member.substances.includes('med_thyroid')) {
    const interferingItems = [];
    if (member.substances.includes('sup_calcium')) interferingItems.push('칼슘');
    if (member.substances.includes('sup_iron')) interferingItems.push('철분');
    if ('두부' in ingMap) interferingItems.push('두부(이소플라본)');
    if (interferingItems.length > 0) {
      substanceFindings.push({severity:'caution', title:`갑상선약 + ${interferingItems.join('/')} → 흡수 방해`,
        detail:`${interferingItems.join(',')}는 갑상선약 흡수를 방해합니다.`,
        tip:`갑상선약은 공복에 복용하고, ${interferingItems.join(',')}는 최소 4시간 후에 섭취하세요.`});
    }
  }

  // 오메가3 + 항응고제
  if (member.substances.includes('sup_omega3') && member.substances.includes('med_anticoagulant')) {
    substanceFindings.push({severity:'caution', title:'오메가3 + 항응고제 → 출혈 위험 증가',
      detail:'오메가3는 항응고 작용이 있어 와파린과 함께 복용하면 출혈 위험이 증가합니다.',
      tip:'의사와 상담하여 용량을 조정하거나 모니터링을 강화하세요.'});
  }

  // 알코올 + 임신
  if (member.substances.includes('alcohol_moderate') || member.substances.includes('alcohol_heavy') || member.substances.includes('alcohol_light')) {
    if (member.traits.includes('pregnant')) {
      substanceFindings.push({severity:'danger', title:'임신 + 음주 → 태아 알코올 스펙트럼 장애(FASD) 위험',
        detail:'임신 중 음주는 태아에게 심각한 뇌 손상, 발달 장애를 초래할 수 있습니다.',
        tip:'임신 중에는 음주를 완전히 피해야 합니다.'});
    }
  }

  // MAOI + 티라민 식품 → 고혈압 위기 (가장 위험한 상호작용)
  if (member.substances.includes('med_maoi')) {
    const tyramineFoods = Object.keys(ingMap).filter(n =>
      ['치즈','된장','간장','김치','살라미','소시지','청어','맥주','와인','두부'].includes(n));
    if (tyramineFoods.length > 0) {
      substanceFindings.push({severity:'danger', title:`<img src="https://images.pexels.com/photos/2889942/pexels-photo-2889942.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='⚠️'"> MAOI + 티라민 식품(${tyramineFoods.join(', ')}) → 고혈압 위기`,
        detail:`MAOI 계열 항우울제 복용 중 티라민이 풍부한 식품 섭취는 심각한 고혈압 위기(혈압 급등, 뇌출혈)를 유발할 수 있습니다. 매우 위험합니다.`,
        tip:'MAOI 복용 중에는 숙성 치즈, 발효식품, 훈제육, 알코올을 완전히 피해야 합니다. 의사에게 반드시 확인하세요.'});
    }
  }

  // 인슐린 + 고탄수화물/당분
  if (member.substances.includes('med_insulin')) {
    if (comp.carbs > 60) {
      substanceFindings.push({severity:'danger', title:'인슐린 복용 + 고탄수화물 → 용량 조정 필요',
        detail:`탄수화물 ${comp.carbs.toFixed(1)}g — 인슐린 용량은 식사 탄수화물량에 맞춰 조정해야 합니다. 과도한 탄수화물 섭취 시 고혈당 또는 용량 오류 위험이 있습니다.`,
        tip:'식사 전 탄수화물 계산(carb counting)을 통해 인슐린 용량을 조정하세요. 담당 의사와 상담하세요.'});
    } else if (comp.carbs < 10) {
      substanceFindings.push({severity:'caution', title:'인슐린 복용 + 저탄수화물 → 저혈당 주의',
        detail:`탄수화물 ${comp.carbs.toFixed(1)}g으로 매우 적습니다. 인슐린 투여 후 탄수화물이 충분하지 않으면 저혈당이 발생할 수 있습니다.`,
        tip:'저혈당 대비 단순당(사탕, 주스)을 항상 소지하세요.'});
    }
  }

  // 이뇨제 + 칼륨
  if (member.substances.includes('med_diuretic')) {
    if (comp.potassium < 200) {
      substanceFindings.push({severity:'caution', title:'이뇨제 복용 + 저칼륨 식사 → 저칼륨혈증 위험',
        detail:`이뇨제는 소변으로 칼륨을 소실시킵니다. 칼륨 섭취가 부족하면 근경련, 부정맥이 발생할 수 있습니다.`,
        tip:'바나나, 감자, 토마토, 아보카도 등 칼륨 풍부 식품을 꾸준히 섭취하세요.'});
    } else if (comp.potassium > 500) {
      substanceFindings.push({severity:'good', title:'이뇨제 복용 — 칼륨 보충 식품 포함',
        detail:`칼륨 ${comp.potassium.toFixed(0)}mg이 포함되어 있습니다. 이뇨제로 인한 칼륨 소실을 식사로 보완하는 데 도움됩니다.`,
        tip:'칼륨 수치는 정기 혈액검사로 모니터링하세요.'});
    }
  }

  // 항우울제(SSRI/SNRI) + 알코올
  if (member.substances.includes('med_antidepressant')) {
    if (member.substances.includes('alcohol_moderate') || member.substances.includes('alcohol_heavy')) {
      substanceFindings.push({severity:'danger', title:'항우울제(SSRI) + 음주 → 중추신경 억제 + 세로토닌 작용 방해',
        detail:'알코올은 세로토닌계를 교란하여 항우울제 효과를 감소시키고 우울 증상을 악화시킬 수 있습니다.',
        tip:'항우울제 복용 중에는 음주를 피하거나 최소화하세요.'});
    }
  }

  // 스테로이드 + 고나트륨/고당분
  if (member.substances.includes('med_corticosteroid')) {
    if (comp.sodium > 600) {
      substanceFindings.push({severity:'caution', title:'스테로이드 + 고나트륨 → 부종·혈압 악화',
        detail:`나트륨 ${comp.sodium.toFixed(0)}mg — 스테로이드는 나트륨 저류를 유발하므로 고나트륨 식사는 부종과 혈압 상승을 악화시킵니다.`,
        tip:'저나트륨 식단(1,500mg/일 이하)을 유지하세요.'});
    }
    if (comp.carbs > 50) {
      substanceFindings.push({severity:'caution', title:'스테로이드 + 고탄수화물 → 혈당 상승',
        detail:`스테로이드는 간에서 포도당 생성을 증가시켜 혈당을 높입니다. 탄수화물 ${comp.carbs.toFixed(1)}g은 혈당 상승을 더욱 악화시킬 수 있습니다.`,
        tip:'스테로이드 복용 기간 중에는 정제 탄수화물과 설탕을 제한하세요.'});
    }
    substanceFindings.push({severity:'info', title:'스테로이드 복용 — 칼슘·비타민D 보충 중요',
      detail:'장기 스테로이드 복용은 골밀도를 감소시킵니다. 칼슘 1,000-1,500mg/일, 비타민D 800-1,000IU/일이 권장됩니다.',
      tip:'두부, 멸치, 유제품을 꾸준히 섭취하고 야외 활동으로 비타민D를 보충하세요.'});
  }

  // 면역억제제 + 자몽 / 생식품
  if (member.substances.includes('med_immunosuppressant')) {
    if (ingMap['자몽']) {
      substanceFindings.push({severity:'danger', title:'면역억제제 + 자몽 → 약물 농도 위험 수준 상승',
        detail:'자몽의 furanocoumarin이 CYP3A4 효소를 억제하여 면역억제제(타크로리무스, 사이클로스포린) 혈중 농도를 수배 높일 수 있습니다.',
        tip:'면역억제제 복용 중에는 자몽·자몽주스를 완전히 피하세요.'});
    }
    const rawFoods = Object.keys(ingMap).filter(n => ['생굴','생새우','생고기'].includes(n));
    if (rawFoods.length > 0) {
      substanceFindings.push({severity:'danger', title:`면역억제제 + 날것 섭취(${rawFoods.join(', ')}) → 감염 위험`,
        detail:'면역이 억제된 상태에서 날고기·날해산물은 리스테리아, 살모넬라 등 감염 위험을 크게 높입니다.',
        tip:'모든 동물성 식품을 완전히 익혀서 드세요.'});
    }
  }

  // 항생제 + 유제품/칼슘
  if (member.substances.includes('med_antibiotic')) {
    const dairyItems = Object.keys(ingMap).filter(n => ['우유','치즈','버터'].includes(n));
    if (dairyItems.length > 0) {
      substanceFindings.push({severity:'caution', title:`항생제 + 유제품(${dairyItems.join(', ')}) → 흡수 방해 가능`,
        detail:'테트라사이클린, 퀴놀론계 항생제는 칼슘과 결합해 흡수가 감소합니다. 항생제 종류에 따라 다릅니다.',
        tip:'처방받은 항생제의 복용 지침을 확인하고, 유제품은 2시간 간격을 두세요.'});
    }
    substanceFindings.push({severity:'info', title:'항생제 복용 — 프로바이오틱스 병행 권장',
      detail:'항생제는 장내 유익균도 제거합니다. 유산균이 풍부한 식품이나 프로바이오틱스 보충제 병행이 권장됩니다.',
      tip:'김치, 요거트 등 발효식품을 항생제 복용 2시간 후에 섭취하세요.'});
  }

  // 항히스타민제 + 알코올
  if (member.substances.includes('med_antihistamine')) {
    if (member.substances.includes('alcohol_moderate') || member.substances.includes('alcohol_heavy')) {
      substanceFindings.push({severity:'caution', title:'항히스타민제 + 알코올 → 진정 효과 증폭',
        detail:'알코올과 항히스타민제 모두 중추신경 억제 효과가 있어 졸음, 인지 능력 저하가 심해집니다.',
        tip:'항히스타민제 복용 중에는 음주를 피하세요. 특히 운전 전 주의하세요.'});
    }
  }

  // 경구피임약 + 엽산/B6 부족
  if (member.substances.includes('med_contraceptive')) {
    substanceFindings.push({severity:'info', title:'경구피임약 — 엽산·B6·마그네슘 보충 필요',
      detail:'경구피임약은 엽산, 비타민B6, 마그네슘 체내 농도를 낮출 수 있습니다.',
      tip:'시금치, 브로콜리, 콩류(엽산), 바나나·감자(B6), 견과류(마그네슘)를 꾸준히 섭취하세요.'});
  }

  // 비타민D + 칼슘 시너지
  if (member.substances.includes('sup_vitamin_d') && member.substances.includes('sup_calcium')) {
    substanceFindings.push({severity:'good', title:'비타민D + 칼슘 보충 — 뼈 건강 시너지',
      detail:'비타민D는 칼슘 흡수를 2-3배 높입니다. 두 가지를 함께 복용하면 골밀도 유지에 최적입니다.',
      tip:'비타민D는 지용성이므로 지방이 포함된 식사와 함께 복용하면 흡수율이 높아집니다.'});
  }

  // 비타민C + 철분 시너지
  if (member.substances.includes('sup_vitamin_c') && member.substances.includes('sup_iron')) {
    substanceFindings.push({severity:'good', title:'비타민C + 철분 보충 — 철분 흡수 3배 증가',
      detail:'비타민C는 비헴철을 흡수되기 쉬운 형태로 환원시켜 흡수율을 크게 높입니다.',
      tip:'철분제 복용 시 오렌지주스, 토마토 등 비타민C 음식과 함께 섭취하세요.'});
  }

  // 커큐민 + 지방 → 흡수 증가
  if (member.substances.includes('sup_curcumin') && comp.fat > 10) {
    substanceFindings.push({severity:'good', title:'커큐민 + 지방 함유 식사 — 흡수율 증가',
      detail:'커큐민은 지용성으로 지방이 있을 때 흡수율이 크게 높아집니다. 후추의 피페린과 함께하면 흡수율 2,000% 증가.',
      tip:'강황/커큐민 복용 시 지방이 포함된 식사와 함께, 후추도 함께 섭취하세요.'});
  }

  // 단백질 보충제 + 신장질환 교차 체크
  if (member.substances.includes('sup_protein') && comp.protein > 40) {
    substanceFindings.push({severity:'caution', title:'단백질 보충제 + 고단백 식사 → 과부하',
      detail:`식사 단백질 ${comp.protein.toFixed(1)}g + 보충제 추가 시 일일 총 단백질이 과잉될 수 있습니다. 신장 기능이 약한 경우 BUN(혈중 요소질소) 상승 위험.`,
      tip:'운동선수가 아닌 일반인은 1일 단백질 0.8g/kg으로 충분합니다.'});
  }

  // 베르베린 + 혈당약
  if (member.substances.includes('sup_berberine') && member.substances.includes('med_metformin')) {
    substanceFindings.push({severity:'caution', title:'베르베린 + 메트포르민 → 저혈당 위험 증가',
      detail:'베르베린은 메트포르민과 유사한 혈당 강하 기전을 가지므로 함께 복용 시 과도한 혈당 저하가 발생할 수 있습니다.',
      tip:'두 가지를 병용할 경우 반드시 의사와 상담하고 혈당을 자주 모니터링하세요.'});
  }

  // 홍삼/인삼 + 항응고제
  if (member.substances.includes('sup_ginseng') && member.substances.includes('med_anticoagulant')) {
    substanceFindings.push({severity:'caution', title:'홍삼/인삼 + 항응고제 → 출혈 위험',
      detail:'인삼의 진세노사이드는 혈소판 응집을 억제하여 와파린과 함께 복용 시 출혈 위험이 증가합니다.',
      tip:'항응고제 복용 중 홍삼 복용은 의사와 상담 후 결정하세요.'});
  }

  // 크레아틴 + 수분 체크
  if (member.substances.includes('sup_creatine')) {
    substanceFindings.push({severity:'info', title:'크레아틴 복용 — 수분 섭취 충분히',
      detail:'크레아틴은 근육 내 수분을 끌어당기므로 수분 섭취가 부족하면 탈수, 근육 경련 위험이 있습니다.',
      tip:'크레아틴 복용 시 하루 물 2L 이상 섭취를 권장합니다.'});
  }

  // 생활습관 — 야간근무
  if (member.substances.includes('life_night_shift')) {
    if (comp.carbs > 50 || comp.fat > 25) {
      substanceFindings.push({severity:'caution', title:'야간근무 + 고탄수화물/고지방 식사 → 대사증후군 위험',
        detail:'야간 근무자는 생체리듬이 교란되어 같은 식사도 혈당·지질 반응이 주간보다 20-30% 더 강하게 나타납니다.',
        tip:'야간에는 탄수화물을 줄이고, 단백질·채소 위주의 가벼운 식사를 권장합니다.'});
    }
  }

  // 생활습관 — 고스트레스
  if (member.substances.includes('life_stress_high') && comp.calories > 500) {
    substanceFindings.push({severity:'info', title:'고스트레스 상태 + 고칼로리 — 스트레스 폭식 주의',
      detail:'만성 스트레스는 코르티솔 분비를 높여 식욕을 자극하고 복부지방 축적을 촉진합니다.',
      tip:'마그네슘(견과류, 녹색채소)과 오메가3(등푸른 생선)는 스트레스 호르몬 완화에 도움됩니다.'});
  }

  // 생활습관 — 수면장애
  if (member.substances.includes('life_sleep_disorder')) {
    if (member.substances.includes('sup_melatonin')) {
      substanceFindings.push({severity:'good', title:'수면장애 + 멜라토닌 보충 + 저녁 식사',
        detail:'저녁 식사를 가볍게 하고 멜라토닌을 취침 1-2시간 전 복용하면 수면의 질 개선 효과가 있습니다.',
        tip:'트립토판이 풍부한 식품(바나나, 우유, 두부)은 세로토닌→멜라토닌 합성을 돕습니다.'});
    }
    const caffeineItems = Object.keys(ingMap).filter(n => ['커피','녹차','홍차'].includes(n));
    if (caffeineItems.length > 0) {
      substanceFindings.push({severity:'caution', title:`수면장애 + 카페인 식품(${caffeineItems.join(', ')}) → 수면 악화`,
        detail:'카페인 반감기는 5-7시간으로, 오후에 섭취해도 자정까지 수면에 영향을 미칩니다.',
        tip:'오후 2시 이후 카페인 섭취를 피하세요.'});
    }
  }

  // 생활습관 — 규칙적 운동
  if (member.substances.includes('life_exercise_regular') && comp.protein < 20) {
    substanceFindings.push({severity:'caution', title:'규칙적 운동 + 단백질 부족 → 근합성 저하',
      detail:`단백질 ${comp.protein.toFixed(1)}g — 운동 후 근육 합성을 위해 식사당 최소 20-30g의 단백질이 권장됩니다.`,
      tip:'운동 30-60분 후 단백질 식품(계란, 닭가슴살, 두부)을 섭취하면 근합성이 극대화됩니다.'});
  }

  // 생활습관 — 좌식 생활
  if (member.substances.includes('life_sedentary') && comp.calories > 400) {
    substanceFindings.push({severity:'caution', title:'주로 좌식 생활 + 고칼로리 식사 → 에너지 잉여 주의',
      detail:`활동량이 적은 경우 기초대사량이 낮아 칼로리 ${comp.calories.toFixed(0)}kcal의 식사는 체중 증가로 이어질 수 있습니다.`,
      tip:'식사량을 약 20% 줄이거나, 식후 20분 이상 산책을 습관화하세요.'});
  }

  // ── 추가 약물-음식 상호작용 (Phase 4) ────────────────────────────────────
  // 리튬 + 저나트륨: DiPiro JT (2020) Pharmacotherapy Handbook 10th Ed
  if (member.substances.includes('med_lithium')) {
    if (comp.sodium < 200) substanceFindings.push({severity:'danger', title:'리튬 + 저나트륨 식사 → 리튬 독성 위험',
      detail:`나트륨 ${comp.sodium.toFixed(0)}mg — 저나트륨 식사는 신장 리튬 재흡수를 증가시켜 혈중 농도가 독성 수준으로 상승할 수 있습니다 (치료역 0.6-1.2 mEq/L, 매우 좁음).`,
      tip:'리튬 복용 시 일정한 나트륨 섭취를 유지하고, 급격한 식이 변화를 피하세요. 탈수도 위험합니다.'});
    if (Object.keys(ingMap).some(n => ['커피','녹차','홍차'].includes(n))) substanceFindings.push({severity:'info', title:'리튬 + 카페인 → 리튬 수치 변동',
      detail:'카페인은 이뇨 작용으로 리튬 배설을 촉진합니다. 갑자기 카페인을 중단하면 리튬 수치가 급상승할 수 있습니다.',
      tip:'카페인 섭취량을 일정하게 유지하세요.'});
  }
  // 클로피도그렐 + 자몽: Holmberg MT et al. (2014) Clin Pharmacol Ther 95:383
  if (member.substances.includes('med_clopidogrel') && Object.keys(ingMap).some(n => n.includes('자몽'))) {
    substanceFindings.push({severity:'danger', title:'클로피도그렐(플라빅스) + 자몽 → 항혈소판 효과 감소',
      detail:'자몽의 퓨라노쿠마린이 CYP2C19을 억제하여 클로피도그렐의 활성 대사체 전환을 차단합니다. 심혈관 사건 위험 증가.',
      tip:'클로피도그렐 복용 기간 중 자몽 및 자몽주스를 완전히 피하세요.'});
  }
  // 메토트렉세이트 + 엽산: Whittle SL & Hughes RA (2004) Cochrane Database Syst Rev
  if (member.substances.includes('med_methotrexate')) {
    if (comp.folate > 200) substanceFindings.push({severity:'info', title:'메토트렉세이트 + 고엽산 식사 → 약효 변동 가능',
      detail:`엽산 ${comp.folate.toFixed(0)}μg — 메토트렉세이트는 엽산 길항제입니다. 의사가 처방한 엽산 보충 외 과도한 엽산 섭취는 약효에 영향을 줄 수 있습니다.`,
      tip:'엽산 보충은 의사 지시대로만. 과도한 녹색 잎채소 섭취는 주치의와 상담.'});
  }
  // 칼륨보존이뇨제 + 고칼륨: Palmer BF (2004) NEJM 351:585
  if (member.substances.includes('med_ksparing_diuretic') && comp.potassium > 400) {
    substanceFindings.push({severity:'danger', title:`칼륨보존이뇨제 + 칼륨 ${comp.potassium.toFixed(0)}mg → 고칼륨혈증 위험`,
      detail:'스피로노락톤/아밀로라이드는 칼륨 배설을 억제합니다. 고칼륨 식사 시 혈중 K⁺>5.5 mEq/L → 부정맥·심정지 위험.',
      tip:'바나나, 오렌지, 감자, 토마토 등 고칼륨 식품을 제한하고 정기적으로 혈중 칼륨을 확인하세요.'});
  }
  // ACE억제제/ARB + 고칼륨: Raebel MA et al. (2007) Pharmacoepidemiol Drug Saf 16:1129
  if ((member.substances.includes('med_ace_inhibitor') || member.substances.includes('med_arb')) && comp.potassium > 500) {
    substanceFindings.push({severity:'caution', title:`ACE억제제/ARB + 칼륨 ${comp.potassium.toFixed(0)}mg → 고칼륨혈증 주의`,
      detail:'ACE억제제(프릴계)/ARB(사르탄계)는 알도스테론 분비를 억제하여 칼륨 배설이 감소합니다.',
      tip:'고칼륨 식품(바나나, 아보카도, 시금치)을 과다 섭취하지 않도록 주의하세요.'});
  }
  // 디곡신 + 고섬유질/저칼륨: Bauer LA (2008) Applied Clinical Pharmacokinetics 2nd Ed
  if (member.substances.includes('med_digoxin')) {
    if (comp.fiber > 10) substanceFindings.push({severity:'caution', title:`디곡신 + 고섬유질 ${comp.fiber.toFixed(1)}g → 흡수 감소`,
      detail:'식이섬유가 디곡신을 흡착하여 생체이용률이 감소합니다. 치료역이 매우 좁은 약물(0.8-2.0 ng/mL)이므로 주의.',
      tip:'디곡신은 식사 1시간 전 또는 2시간 후 공복 투여가 바람직합니다.'});
    if (comp.potassium < 200) substanceFindings.push({severity:'danger', title:'디곡신 + 저칼륨 → 디곡신 독성 위험',
      detail:'저칼륨혈증은 Na⁺/K⁺-ATPase에 대한 디곡신 결합을 증가시켜 독성(부정맥)을 유발합니다.',
      tip:'칼륨이 풍부한 식품(바나나, 감자, 오렌지)을 꾸준히 섭취하세요.'});
  }
  // 테오필린 + 카페인: Carrillo JA & Benitez J (2000) Clin Pharmacokinet 39:127
  if (member.substances.includes('med_theophylline') && Object.keys(ingMap).some(n => ['커피','녹차','홍차','초콜릿','에너지드링크'].includes(n))) {
    substanceFindings.push({severity:'danger', title:'테오필린 + 카페인 → 크산틴 독성 위험',
      detail:'테오필린과 카페인은 모두 메틸크산틴으로 CYP1A2에 의해 경쟁적으로 대사됩니다. 동시 섭취 시 진전·빈맥·발작 위험.',
      tip:'테오필린 복용 중 카페인 음료를 완전히 피하세요.'});
  }
  // 레보도파 + 고단백: Nutt JG et al. (1984) NEJM 310:483
  if (member.substances.includes('med_levodopa') && comp.protein > 20) {
    substanceFindings.push({severity:'caution', title:`레보도파 + 단백질 ${comp.protein.toFixed(1)}g → 흡수 경쟁`,
      detail:'대형 중성 아미노산(LNAA)이 레보도파와 소장 및 혈뇌장벽 수송체에서 경쟁합니다 (Nutt 1984 NEJM). 단백질이 많으면 약효 감소.',
      tip:'단백질 섭취를 저녁에 집중하고, 레보도파는 식사 30분 전 공복에 복용하세요.'});
  }
  // 퀴놀론 + 칼슘/철분/마그네슘: Lomaestro BM & Bailie GR (1995) Ann Pharmacother 29:1101
  if (member.substances.includes('med_quinolone') && (comp.calcium > 150 || comp.iron > 3 || comp.magnesium > 50)) {
    substanceFindings.push({severity:'danger', title:'퀴놀론 항생제 + 금속이온 → 킬레이션으로 흡수 거의 차단',
      detail:`칼슘 ${comp.calcium.toFixed(0)}mg, 철분 ${comp.iron.toFixed(1)}mg, 마그네슘 ${comp.magnesium.toFixed(0)}mg — 다가 금속이온이 퀴놀론과 불용성 킬레이트를 형성하여 항생제 흡수가 최대 90% 감소합니다.`,
      tip:'퀴놀론은 유제품·제산제·철분제 섭취 2시간 전 또는 6시간 후에 복용하세요.'});
  }
  // 테트라사이클린 + 칼슘/철분: Neuvonen PJ (1976) Drugs 11:45
  if (member.substances.includes('med_tetracycline') && (comp.calcium > 100 || comp.iron > 2)) {
    substanceFindings.push({severity:'danger', title:'테트라사이클린 + 칼슘/철분 → 킬레이션으로 약효 상실',
      detail:'테트라사이클린은 Ca²⁺, Fe²⁺/³⁺, Mg²⁺, Al³⁺과 불용성 킬레이트를 형성합니다. 우유 한 잔으로도 흡수율 50-65% 감소.',
      tip:'테트라사이클린은 식사 1시간 전 또는 2시간 후, 물로만 복용. 유제품 완전 분리.'});
  }

  // 3) 체질/특이사항 분석 (질환 선택 없어도 동작)
  const traitFindings = [];

  // 인종별 분석
  if (member.ethnicity === 'east_asian') {
    if (comp.carbs > 50) traitFindings.push({severity:'caution', title:'동아시아인 — 당뇨 고위험 인종',
      detail:`동아시아인은 같은 BMI에서도 당뇨 발병률이 서양인보다 2-3배 높습니다 (인슐린 분비 능력이 상대적으로 낮음). 탄수화물 ${comp.carbs.toFixed(1)}g은 주의가 필요합니다.`,
      tip:'백미 대신 현미/잡곡, 밀가루 대신 통밀을 선택하면 혈당 반응을 줄일 수 있습니다.'});
    if (comp.sodium > 500) traitFindings.push({severity:'info', title:'동아시아인 — 나트륨 민감도 높음',
      detail:`한국인/일본인은 유전적으로 나트륨 민감도가 높아 같은 소금량에서도 혈압이 더 많이 오르는 경향이 있습니다.`,
      tip:'국물/장류의 양을 점진적으로 줄이는 것이 효과적입니다.'});
  }
  if (member.ethnicity === 'african' && comp.sodium > 400) {
    traitFindings.push({severity:'caution', title:'아프리카계 — 소금 민감성 고혈압 위험',
      detail:`아프리카계는 소금 민감성 고혈압 비율이 다른 인종보다 유의하게 높습니다.`,
      tip:'DASH 식이요법(저나트륨, 고칼륨, 과일·채소 중심)이 특히 효과적입니다.'});
  }

  // 유당불내증
  if (member.traits.includes('lactose_intolerant')) {
    const dairyItems = Object.keys(ingMap).filter(n => ['버터','치즈','우유'].includes(n));
    if (dairyItems.length > 0) traitFindings.push({severity:'caution', title:'유당불내증 — 유제품 포함(' + dairyItems.join(', ') + ')',
      detail:`${dairyItems.join(', ')}에 유당이 포함되어 있습니다. 민감도에 따라 복부팽만, 가스, 설사 등 소화 불편감이 발생할 수 있습니다.`,
      tip:'유제품 대신 두유, 아몬드밀크, 기버터(ghee) 등 유당 없는 대체품을 사용하세요.'});
  }

  // 매운맛 민감
  if (member.traits.includes('spice_sensitive') && Object.keys(ingMap).some(n => DB[n]?.compounds.some(c => c.includes('캡사이신')))) {
    traitFindings.push({severity:'caution', title:'매운맛 민감 — 캡사이신 주의',
      detail:`고추의 캡사이신이 위산 분비를 촉진하여 속쓰림, 위장 불편감을 유발할 수 있습니다.`,
      tip:'고추 양을 절반 이하로 줄이거나, 유제품(우유)과 함께 섭취하면 자극이 완화됩니다.'});
  }

  // 계란 알레르기
  if (member.traits.includes('allergy_egg') && '계란' in ingMap) {
    traitFindings.push({severity:'danger', title:'<img src="https://images.pexels.com/photos/2889942/pexels-photo-2889942.jpeg?auto=compress&cs=tinysrgb&w=20&h=20&fit=crop" style="width:20px;height:20px;border-radius:4px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML=\'<span>⚠️</span>\'"> 계란 알레르기 — 알레르겐 포함!',
      detail:`계란이 ${ingMap['계란']}g 포함되어 있습니다. 오보알부민, 오보뮤코이드 등 알레르겐이 가열해도 완전히 파괴되지 않습니다.`,
      tip:'계란을 완전히 제거하세요. 바인딩이 필요하면 아마씨 겔, 두부, 바나나로 대체할 수 있습니다.'});
  }

  // 해산물 알레르기
  if (member.traits.includes('allergy_seafood')) {
    const seafoods = Object.keys(ingMap).filter(n => ['연어','새우','참치','오징어','조개','멸치'].includes(n));
    if (seafoods.length > 0) traitFindings.push({severity:'danger', title:'<img src="https://images.pexels.com/photos/2889942/pexels-photo-2889942.jpeg?auto=compress&cs=tinysrgb&w=20&h=20&fit=crop" style="width:20px;height:20px;border-radius:4px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML=\'<span>⚠️</span>\'"> 해산물 알레르기 — ' + seafoods.join(', ') + ' 포함!',
      detail:`${seafoods.join(', ')}이(가) 포함되어 있습니다. 해산물 알레르기는 아나필락시스 위험이 있어 매우 주의해야 합니다.`,
      tip:'해산물을 완전히 제거하세요. 단백질은 두부, 소고기, 닭고기로 대체하세요.'});
  }

  // 글루텐 민감
  if (member.traits.includes('gluten_sensitive')) {
    const glutenFoods = Object.keys(ingMap).filter(n => ['밀가루','파스타','빵'].includes(n));
    if (glutenFoods.length > 0) traitFindings.push({severity:'caution', title:'글루텐 민감 — ' + glutenFoods.join(', ') + ' 포함',
      detail:`${glutenFoods.join(', ')}에 글루텐이 포함되어 있습니다. 복부팽만, 피로감, 소화 불편 등이 발생할 수 있습니다.`,
      tip:'쌀가루, 감자전분, 타피오카 등 글루텐 프리 대체재를 사용하세요.'});
  }

  // 임산부
  if (member.traits.includes('pregnant')) {
    if (comp.calories < 300) traitFindings.push({severity:'info', title:'임신 중 — 열량 보충 필요',
      detail:`임산부는 일반인보다 1일 300kcal를 추가로 섭취해야 합니다. 현재 식사 열량이 부족할 수 있습니다.`,
      tip:'단백질과 엽산이 풍부한 식품(두부, 시금치, 콩)을 추가하세요.'});
    if (Object.keys(ingMap).some(n => n === '생강')) traitFindings.push({severity:'good', title:'임신 중 — 생강의 입덧 완화 효과',
      detail:`생강의 진저롤은 입덧 완화에 효과적이라는 임상 연구 결과가 있습니다.`,
      tip:'생강차 또는 조리 시 소량의 생강 추가가 도움됩니다.'});
  }

  // 한성/열성 체질
  if (member.traits.includes('cold_constitution')) {
    const warmFoods = Object.keys(ingMap).filter(n => ['생강','마늘','고추'].includes(n));
    const coldFoods = Object.keys(ingMap).filter(n => ['두부','레몬'].includes(n));
    if (warmFoods.length > 0) traitFindings.push({severity:'good', title:`한성 체질 — 온성 식재료(${warmFoods.join(', ')}) 적합`,
      detail:'생강(진저롤), 마늘(알리신), 고추(캡사이신)는 혈액순환을 촉진하고 체온을 높여 냉체질에 유리합니다.',
      tip:'따뜻한 조리법(찜, 끓이기)과 온성 재료를 조합하면 효과가 극대화됩니다.'});
    if (coldFoods.length > 0 && warmFoods.length === 0) traitFindings.push({severity:'caution', title:`한성 체질 — 냉성 식재료 주의`,
      detail:'냉체질에 차가운 성질의 음식이 많으면 소화 기능이 더 약해질 수 있습니다.',
      tip:'생강이나 고추를 소량 추가하여 밸런스를 맞추세요.'});
  }
  if (member.traits.includes('hot_constitution')) {
    const hotFoods = Object.keys(ingMap).filter(n => ['고추','생강','소고기'].includes(n));
    if (hotFoods.length >= 2) traitFindings.push({severity:'caution', title:`열체질 — 열성 식재료 과다(${hotFoods.join(', ')})`,
      detail:'열체질에 열성 재료가 많으면 피부 트러블, 상열감, 구내염 등이 악화될 수 있습니다.',
      tip:'두부, 토마토 등 냉성/평성 재료를 추가하고, 튀김보다 찜·삶기를 선택하세요.'});
  }

  // ── 알레르기 (미연결 항목 추가) ──────────────────────────────────────
  // 우유 알레르기
  if (member.traits.includes('allergy_milk')) {
    const milkFoods = Object.keys(ingMap).filter(n => ['우유','버터','치즈','생크림'].includes(n));
    if (milkFoods.length > 0) traitFindings.push({severity:'danger', title:`<img src="https://images.pexels.com/photos/2889942/pexels-photo-2889942.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='⚠️'"> 우유 알레르기 — ${milkFoods.join(', ')} 포함`,
      detail:`${milkFoods.join(', ')}에 카세인·유청 단백질이 포함되어 있습니다. 가열해도 알레르겐이 유지됩니다.`,
      tip:'식물성 대체품(두유, 오트밀크, 코코넛밀크)으로 교체하세요.'});
  }
  // 견과류 알레르기
  if (member.traits.includes('allergy_nuts')) {
    const nutFoods = Object.keys(ingMap).filter(n => ['아몬드','호두','캐슈넛','피스타치오','땅콩','참깨','들깨'].includes(n));
    if (nutFoods.length > 0) traitFindings.push({severity:'danger', title:`<img src="https://images.pexels.com/photos/2889942/pexels-photo-2889942.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='⚠️'"> 견과류 알레르기 — ${nutFoods.join(', ')} 포함`,
      detail:`견과류 알레르기는 아나필락시스를 유발할 수 있습니다. ${nutFoods.join(', ')}을 완전히 제거해야 합니다.`,
      tip:'에피네프린 자가주사기(에피펜)를 항상 소지하세요.'});
  }
  // 대두 알레르기
  if (member.traits.includes('allergy_soy')) {
    const soyFoods = Object.keys(ingMap).filter(n => ['두부','두유','된장','간장','콩나물','콩'].includes(n));
    if (soyFoods.length > 0) traitFindings.push({severity:'danger', title:`<img src="https://images.pexels.com/photos/2889942/pexels-photo-2889942.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='⚠️'"> 대두 알레르기 — ${soyFoods.join(', ')} 포함`,
      detail:`${soyFoods.join(', ')}에 대두 단백질이 포함되어 있습니다. 가공식품의 숨겨진 대두 성분도 주의하세요.`,
      tip:'두부·두유 대신 귀리, 코코넛, 아몬드 기반 제품을 사용하세요.'});
  }
  // 밀 알레르기
  if (member.traits.includes('allergy_wheat')) {
    const wheatFoods = Object.keys(ingMap).filter(n => ['밀가루','빵','파스타','국수'].includes(n));
    if (wheatFoods.length > 0) traitFindings.push({severity:'danger', title:`<img src="https://images.pexels.com/photos/2889942/pexels-photo-2889942.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='⚠️'"> 밀 알레르기 — ${wheatFoods.join(', ')} 포함`,
      detail:`밀 알레르기는 글루텐 민감과 다르게 즉각적인 면역 반응을 일으킵니다. ${wheatFoods.join(', ')}을 제거해야 합니다.`,
      tip:'쌀가루, 감자전분, 타피오카, 퀴노아 등 글루텐 프리 대체재를 사용하세요.'});
  }
  // 생선 알레르기
  if (member.traits.includes('allergy_fish')) {
    const fishFoods = Object.keys(ingMap).filter(n => ['연어','참치','고등어','대구','멸치','광어','청어','방어','갈치','삼치'].includes(n));
    if (fishFoods.length > 0) traitFindings.push({severity:'danger', title:`<img src="https://images.pexels.com/photos/2889942/pexels-photo-2889942.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='⚠️'"> 생선 알레르기 — ${fishFoods.join(', ')} 포함`,
      detail:`어류 단백질(파르발부민)은 가열해도 파괴되지 않습니다. 교차 반응에 주의하세요.`,
      tip:'생선 대신 닭고기, 두부, 콩류로 단백질을 보충하세요.'});
  }
  // 갑각류/연체류 알레르기
  if (member.traits.includes('allergy_shellfish')) {
    const shellFoods = Object.keys(ingMap).filter(n => ['새우','게','가재','오징어','낙지','문어','조개','홍합','굴'].includes(n));
    if (shellFoods.length > 0) traitFindings.push({severity:'danger', title:`<img src="https://images.pexels.com/photos/2889942/pexels-photo-2889942.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='⚠️'"> 갑각류·연체류 알레르기 — ${shellFoods.join(', ')} 포함`,
      detail:`갑각류·연체류 알레르기는 성인에서 가장 흔한 식품 알레르기 중 하나로, 아나필락시스 위험이 높습니다.`,
      tip:'완전히 제거하고, 조리 도구 교차 오염에도 주의하세요.'});
  }
  // 아황산염 알레르기
  if (member.traits.includes('allergy_sulfite')) {
    const sulfiteFoods = Object.keys(ingMap).filter(n => ['와인','건포도','새우'].includes(n));
    if (sulfiteFoods.length > 0) traitFindings.push({severity:'caution', title:`아황산염 과민 — ${sulfiteFoods.join(', ')} 주의`,
      detail:'아황산염은 천식 악화, 두통, 두드러기를 유발할 수 있습니다. 특히 천식 환자는 더 민감합니다.',
      tip:'성분표에서 E220-E228 (아황산염류) 표기를 확인하세요.'});
  }

  // ── 식이 원칙 ──────────────────────────────────────────────────────────
  // 비건
  if (member.traits.includes('vegan')) {
    const animalFoods = Object.keys(ingMap).filter(n =>
      ['소고기','돼지고기','닭고기','오리고기','양고기','계란','우유','버터','치즈','연어','참치','새우','멸치','게','오징어'].includes(n));
    if (animalFoods.length > 0) traitFindings.push({severity:'caution', title:`비건 식이 — 동물성 식품 포함: ${animalFoods.join(', ')}`,
      detail:'비건 식이 원칙에 맞지 않는 동물성 재료가 포함되어 있습니다.',
      tip:'두부, 템페, 콩, 렌틸, 견과류로 단백질을 대체하세요. 비타민B12 보충제 복용을 권장합니다.'});
    else traitFindings.push({severity:'good', title:'비건 식이 — 동물성 식품 없음 ✓',
      detail:'동물성 성분이 감지되지 않았습니다. 비타민B12, 철분, 칼슘, 오메가3 섭취에 주의하세요.',
      tip:'아마씨오일(오메가3), 강화두유(칼슘+B12), 시금치·콩류(철분)를 챙기세요.'});
  }
  // 채식(베지)
  if (member.traits.includes('vegetarian') && !member.traits.includes('vegan')) {
    const meatFoods = Object.keys(ingMap).filter(n =>
      ['소고기','돼지고기','닭고기','오리고기','양고기','연어','참치','새우','멸치'].includes(n));
    if (meatFoods.length > 0) traitFindings.push({severity:'caution', title:`채식 식이 — 육류·어류 포함: ${meatFoods.join(', ')}`,
      detail:'채식 원칙에 맞지 않는 육류 또는 어류가 포함되어 있습니다.',
      tip:'두부, 콩류, 달걀, 유제품으로 단백질을 대체하세요.'});
  }
  // 할랄
  if (member.traits.includes('halal')) {
    const haramFoods = Object.keys(ingMap).filter(n => ['돼지고기','삼겹살','베이컨'].includes(n));
    if (haramFoods.length > 0) traitFindings.push({severity:'danger', title:`<img src="https://images.pexels.com/photos/2889942/pexels-photo-2889942.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='⚠️'"> 할랄 식이 — 금지 식품 포함: ${haramFoods.join(', ')}`,
      detail:'이슬람 율법상 돼지고기와 파생 제품은 금지(하람)입니다.',
      tip:'닭고기, 소고기, 양고기(할랄 인증)로 대체하세요.'});
  }
  // 코셔
  if (member.traits.includes('kosher')) {
    const nonKosher = Object.keys(ingMap).filter(n => ['돼지고기','새우','게','조개','오징어','낙지'].includes(n));
    if (nonKosher.length > 0) traitFindings.push({severity:'caution', title:`코셔 식이 — 금지 식품 포함: ${nonKosher.join(', ')}`,
      detail:'유대 율법에서 돼지고기, 갑각류, 연체류는 금지입니다.',
      tip:'코셔 인증 재료로 교체하세요.'});
  }

  // ── 식이 제한 ──────────────────────────────────────────────────────────
  // 저염식
  if (member.traits.includes('low_salt')) {
    if (comp.sodium > 800) traitFindings.push({severity:'danger', title:'저염식 — 나트륨 과다',
      detail:`나트륨 약 ${comp.sodium.toFixed(0)}mg — 저염식 목표(1,500mg/일, 1끼 500mg 이하)를 크게 초과합니다.`,
      tip:'간장·소금 양을 절반으로 줄이고 레몬즙·식초·허브로 맛을 내세요.'});
    else if (comp.sodium > 500) traitFindings.push({severity:'caution', title:'저염식 — 나트륨 주의',
      detail:`나트륨 약 ${comp.sodium.toFixed(0)}mg — 저염식 목표에 근접합니다. 나머지 식사에서 조절이 필요합니다.`,
      tip:'저나트륨 간장, 무염 버터 등 저염 대체재를 활용하세요.'});
  }
  // 저지방식
  if (member.traits.includes('low_fat')) {
    if (comp.fat > 20) traitFindings.push({severity:'caution', title:'저지방식 — 지방 과다',
      detail:`총 지방 ${comp.fat.toFixed(1)}g — 저지방식 목표(1회 10-15g 이하)를 초과합니다.`,
      tip:'올리브오일을 티스푼 단위로 줄이고, 굽기·튀기기 대신 찜·삶기를 선택하세요.'});
  }
  // 저탄수화물식
  if (member.traits.includes('low_carb')) {
    if (comp.carbs > 50) traitFindings.push({severity:'caution', title:'저탄수화물식 — 탄수화물 과다',
      detail:`탄수화물 ${comp.carbs.toFixed(1)}g — 저탄수화물 목표(1끼 20-30g 이하)를 초과합니다.`,
      tip:'쌀·밀가루를 줄이고 채소, 단백질, 건강한 지방 비율을 높이세요.'});
    else traitFindings.push({severity:'good', title:'저탄수화물식 — 탄수화물 적정',
      detail:`탄수화물 ${comp.carbs.toFixed(1)}g으로 저탄수화물 목표 범위 내입니다.`,
      tip:'케토/저탄수 식이 중에는 전해질(나트륨·칼륨·마그네슘)이 부족할 수 있으니 보충하세요.'});
  }
  // 저퓨린식
  if (member.traits.includes('low_purine')) {
    const purineFoods = Object.keys(ingMap).filter(n =>
      ['소고기','돼지고기','간','내장','멸치','새우','고등어','청어','맥주'].includes(n));
    if (purineFoods.length > 0) traitFindings.push({severity:'caution', title:`저퓨린식 — 고퓨린 식품 포함: ${purineFoods.join(', ')}`,
      detail:`고퓨린 식품은 요산 생성을 증가시켜 통풍 발작 및 신장 결석 위험을 높입니다.`,
      tip:'동물 내장·멸치·고등어는 최소화하고, 두부·계란·저지방 유제품으로 단백질을 보충하세요.'});
  }
  // 저옥살레이트식
  if (member.traits.includes('low_oxalate')) {
    const oxFoods = Object.keys(ingMap).filter(n => ['시금치','견과류','초콜릿','비트'].includes(n));
    if (oxFoods.length > 0) traitFindings.push({severity:'caution', title:`저옥살레이트식 — 고옥살산 식품 포함: ${oxFoods.join(', ')}`,
      detail:`${oxFoods.join(', ')}은 옥살산 함량이 높습니다. 옥살산은 칼슘과 결합해 신장결석을 형성합니다.`,
      tip:'시금치 대신 케일(저옥살레이트)을 선택하고, 칼슘과 함께 섭취하면 장에서 결합해 흡수를 줄일 수 있습니다.'});
  }

  // ── 소화·대사 특이사항 ────────────────────────────────────────────────
  // 히스타민 불내증
  if (member.traits.includes('histamine_intolerance')) {
    const histFoods = Object.keys(ingMap).filter(n =>
      ['와인','맥주','치즈','김치','된장','간장','토마토','가지','시금치','삼겹살','소시지','참치'].includes(n));
    if (histFoods.length > 0) traitFindings.push({severity:'caution', title:`히스타민 불내증 — 고히스타민 식품 포함: ${histFoods.join(', ')}`,
      detail:`${histFoods.join(', ')}은 히스타민 함량이 높거나 히스타민 분비를 촉진합니다. 두통, 홍조, 두드러기, 소화불편 등을 유발할 수 있습니다.`,
      tip:'신선한 재료를 사용하고, 발효·숙성·훈제 식품을 최소화하세요.'});
  }
  // FODMAP 민감
  if (member.traits.includes('fodmap_sensitive')) {
    const fodFoods = Object.keys(ingMap).filter(n =>
      ['양파','마늘','양배추','사과','복숭아','수박','밀가루','보리','호밀','우유','아이스크림'].includes(n));
    if (fodFoods.length > 0) traitFindings.push({severity:'caution', title:`FODMAP 민감 — 고FODMAP 식품 포함: ${fodFoods.join(', ')}`,
      detail:`${fodFoods.join(', ')}은 발효성 당류(FODMAP)가 풍부하여 소장에서 흡수되지 않고 대장에서 발효되어 가스·팽만·복통을 유발합니다.`,
      tip:'마늘 대신 마늘향 오일, 양파 대신 파 녹색 부분, 우유 대신 락토프리 제품을 사용하세요.'});
  }
  // 카페인 민감
  if (member.traits.includes('caffeine_sensitive')) {
    const cafFoods = Object.keys(ingMap).filter(n => ['커피','녹차','홍차','초콜릿'].includes(n));
    if (cafFoods.length > 0) traitFindings.push({severity:'caution', title:`카페인 민감 — 카페인 식품 포함: ${cafFoods.join(', ')}`,
      detail:`${cafFoods.join(', ')}에 카페인이 포함되어 있습니다. 카페인 민감자는 소량에도 불면, 두근거림, 불안, 두통이 발생할 수 있습니다.`,
      tip:'카페인 프리(허브차, 루이보스)로 교체하거나 오후에는 피하세요.'});
  }
  // 알코올 플러시
  if (member.traits.includes('alcohol_flush') && member.substances.some(s => s.startsWith('alcohol_') && s !== 'alcohol_none')) {
    traitFindings.push({severity:'caution', title:'알코올 플러시 + 음주 — 아세트알데히드 축적',
      detail:'ALDH2 유전 변이로 알코올 대사물(아세트알데히드)이 축적됩니다. 아세트알데히드는 발암성 물질로 식도암, 두경부암 위험을 높입니다.',
      tip:'알코올 플러시가 있다면 음주를 최소화하거나 금주를 강력히 권장합니다.'});
  }

  // ── 운동선수/고강도 운동 ──────────────────────────────────────────────
  if (member.traits.includes('athlete')) {
    if (comp.protein < 25) traitFindings.push({severity:'caution', title:'고강도 운동 — 단백질 부족',
      detail:`단백질 ${comp.protein.toFixed(1)}g — 고강도 운동 시 1끼당 단백질 25-35g이 권장됩니다. 근합성에 불리합니다.`,
      tip:'계란, 닭가슴살, 두부, 연어 등 고단백 식품을 추가하세요.'});
    if (comp.carbs < 20) traitFindings.push({severity:'caution', title:'고강도 운동 — 탄수화물 부족',
      detail:`탄수화물 ${comp.carbs.toFixed(1)}g — 운동 에너지원인 글리코겐 보충이 부족합니다.`,
      tip:'운동 전후 복합 탄수화물(현미, 고구마, 오트밀)을 적절히 섭취하세요.'});
    if (comp.protein >= 25 && comp.carbs >= 30) traitFindings.push({severity:'good', title:'고강도 운동 — 단백질·탄수화물 적합',
      detail:`단백질 ${comp.protein.toFixed(1)}g, 탄수화물 ${comp.carbs.toFixed(1)}g — 운동 후 회복에 좋은 조합입니다.`,
      tip:'운동 후 30분 이내(골든타임) 섭취하면 근합성과 글리코겐 보충이 극대화됩니다.'});
  }
  // 노인 영양 (trait 기반)
  if (member.traits.includes('elderly_nutrition')) {
    if (comp.protein < 20) traitFindings.push({severity:'caution', title:'노인 영양 관리 — 단백질 부족 (근감소증 예방)',
      detail:`단백질 ${comp.protein.toFixed(1)}g — 노인은 근육 유지를 위해 1끼당 25-30g의 단백질이 필요합니다 (일반 성인보다 20% 더).`,
      tip:'소화가 쉬운 달걀찜, 연두부, 흰살생선을 우선하세요.'});
    if (comp.sodium > 600) traitFindings.push({severity:'caution', title:'노인 영양 관리 — 나트륨 과다 (혈압·신장 주의)',
      detail:'노인은 신장 기능이 저하되어 나트륨 배출 능력이 감소합니다.',
      tip:'국·찌개는 건더기 위주로 드시고, 국물 섭취를 줄이세요.'});
  }

  // 나이별 일반 분석
  if (member.age && member.age >= 65) {
    if (comp.protein < 15) traitFindings.push({severity:'caution', title:`${profile.age}세 고령 — 단백질 부족 주의`,
      detail:`65세 이상은 근감소증(sarcopenia) 예방을 위해 1끼 단백질 20-30g이 권장됩니다. 현재 ${comp.protein.toFixed(1)}g으로 부족합니다.`,
      tip:'계란, 두부, 소고기 등 단백질 식재료를 추가하세요.'});
    const calciumIngs = Object.keys(ingMap).filter(n => DB[n]?.vit.calcium);
    if (calciumIngs.length === 0) traitFindings.push({severity:'info', title:'고령 — 칼슘 섭취 고려',
      detail:'골다공증 예방을 위해 1일 칼슘 800-1000mg이 권장됩니다.',
      tip:'두부, 멸치 등 칼슘 식품을 추가하거나 보충제를 고려하세요.'});
  }
  if (member.age && member.age < 18 && member.age >= 10) {
    traitFindings.push({severity:'info', title:`${profile.age}세 성장기 — 영양 균형 중요`,
      detail:'성장기에는 단백질, 칼슘, 철분이 특히 중요합니다.',
      tip:'다양한 식재료를 균형있게 섭취하고, 인스턴트 식품을 줄이세요.'});
  }

  // 가족력 예방 분석 (질환을 선택하지 않아도) — 통합 DB: fh === 조건 key 그대로 사용
  member.familyHx.forEach(fh => {
    // 같은 조건이 본인 질환에 없을 때만 예방 분석
    if (!member.conditions.includes(fh)) {
      // 질환을 선택하지 않았지만 가족력이 있는 경우 예방 분석
      if (fh === 'diabetes' && comp.carbs > 50) {
        traitFindings.push({severity:'caution', title:`가족력(당뇨) — 탄수화물 ${comp.carbs.toFixed(1)}g 주의`,
          detail:'가족에 당뇨 병력이 있으면 본인도 유전적 소인이 있을 수 있습니다. 탄수화물 관리가 예방에 중요합니다.',
          tip:'현재 당뇨가 없더라도 1회 탄수화물 50g 이하를 습관화하면 예방에 도움됩니다.'});
      }
      if (fh === 'stomach_cancer' && temp >= 200) {
        traitFindings.push({severity:'caution', title:'가족력(위암) — 고온 조리 주의',
          detail:`${temp}°C 이상 고온 조리는 발암물질(HCA, PAH)을 생성할 수 있습니다. 위암 가족력이 있으면 더 주의가 필요합니다.`,
          tip:'탄 부분은 제거하고, 굽기보다 찜·삶기 위주로 조리하세요.'});
      }
      if (fh === 'colon_cancer') {
        if (Object.keys(ingMap).some(n => n === '소고기') && ingMap['소고기'] > 100) {
          traitFindings.push({severity:'caution', title:'가족력(대장암) — 붉은 고기 과다',
            detail:'WHO는 붉은 고기를 Group 2A 발암물질로 분류했습니다. 가족력이 있으면 주 500g 이하로 제한을 권장합니다.',
            tip:'소고기를 생선, 두부, 콩으로 부분 대체하세요.'});
        }
        if (comp.fiber > 5) traitFindings.push({severity:'good', title:'가족력(대장암) — 식이섬유 긍정적',
          detail:`식이섬유 ${comp.fiber.toFixed(1)}g — 식이섬유는 대장 건강에 도움이 되며 대장암 위험을 낮출 수 있습니다.`,
          tip:'목표: 1일 25-30g. 채소와 잡곡을 꾸준히 섭취하세요.'});
      }
      if (fh === 'osteoporosis') {
        const hasCa = Object.keys(ingMap).some(n => DB[n]?.vit.calcium);
        traitFindings.push({severity: hasCa ? 'good' : 'info',
          title:'가족력(골다공증) — 칼슘 ' + (hasCa ? '섭취 긍정적' : '보충 필요'),
          detail:'가족력이 있으면 30대부터 칼슘과 비타민 D 섭취에 신경 써야 합니다.',
          tip:'두부(칼슘 350mg/100g), 멸치, 우유를 활용하고 햇볕을 규칙적으로 쬐세요.'});
      }
    }

    // ── 추가 가족력 예방 분석 ──────────────────────────────────────────
    // 고혈압 가족력
    if (fh === 'hypertension' && !member.conditions.includes('hypertension')) {
      if (comp.sodium > 500) traitFindings.push({severity:'caution', title:'가족력(고혈압) — 나트륨 주의',
        detail:`나트륨 약 ${comp.sodium.toFixed(0)}mg — 고혈압 가족력이 있으면 나트륨 민감도가 높을 수 있습니다. 예방 차원에서 1,500mg/일 이하를 권장합니다.`,
        tip:'DASH 식이(저나트륨, 고칼륨, 고섬유질, 저지방 유제품)가 고혈압 예방에 효과적입니다.'});
      if (comp.potassium > 400) traitFindings.push({severity:'good', title:'가족력(고혈압) — 칼륨 섭취 긍정적',
        detail:`칼륨 ${comp.potassium.toFixed(0)}mg — 칼륨은 나트륨 배출을 촉진하여 혈압 관리에 도움됩니다.`,
        tip:'바나나, 토마토, 감자, 아보카도는 칼륨 보충에 좋습니다.'});
    }

    // 고지혈증 가족력
    if (fh === 'hyperlipidemia' && !member.conditions.includes('hyperlipidemia')) {
      if (comp.saturatedFat > 7) traitFindings.push({severity:'caution', title:'가족력(고지혈증) — 포화지방 주의',
        detail:`포화지방 추정 약 ${comp.saturatedFat.toFixed(1)}g — 고지혈증 가족력이 있으면 LDL 콜레스테롤이 올라가기 쉽습니다.`,
        tip:'버터·삼겹살·치즈를 줄이고 올리브오일, 등푸른 생선, 견과류로 대체하세요.'});
      if (Object.keys(ingMap).some(n => DB[n]?.compounds?.some(c => c.includes('리코펜')) || DB[n]?.compounds?.some(c => c.includes('올레산')))) {
        traitFindings.push({severity:'good', title:'가족력(고지혈증) — 항산화·불포화지방 식품 포함',
          detail:'리코펜, 올레산 등의 성분은 LDL 산화를 억제하고 HDL을 높여 지질 관리에 도움됩니다.',
          tip:'올리브오일+토마토 조합은 지중해식 식이의 핵심으로 심혈관 보호에 효과적입니다.'});
      }
    }

    // 심장질환 가족력
    if (fh === 'heart' && !member.conditions.includes('heart')) {
      if (comp.saturatedFat > 10) traitFindings.push({severity:'caution', title:'가족력(심장질환) — 포화지방 과다',
        detail:`포화지방 약 ${comp.saturatedFat.toFixed(1)}g — 심장질환 가족력이 있으면 포화지방 제한이 더욱 중요합니다.`,
        tip:'붉은 고기 대신 생선(오메가3), 통곡물, 채소 중심 식사를 유지하세요.'});
    }

    // 뇌졸중 가족력
    if (fh === 'stroke' && !member.conditions.includes('stroke')) {
      if (comp.sodium > 600) traitFindings.push({severity:'caution', title:'가족력(뇌졸중) — 나트륨·혈압 관리 중요',
        detail:`나트륨 약 ${comp.sodium.toFixed(0)}mg — 뇌졸중의 주요 위험 인자인 고혈압 예방을 위해 나트륨 제한이 중요합니다.`,
        tip:'짜게 먹는 습관을 줄이고, 금연·금주·규칙적 운동을 병행하세요.'});
    }

    // 간암 가족력
    if (fh === 'liver_cancer') {
      if (member.substances.includes('alcohol_moderate') || member.substances.includes('alcohol_heavy')) {
        traitFindings.push({severity:'danger', title:'가족력(간암) + 음주 — 간암 위험 매우 높음',
          detail:'간암 가족력 + 음주는 간암 위험을 크게 높입니다. B형·C형 간염 검사와 함께 음주를 삼가야 합니다.',
          tip:'음주량을 최소화하거나 완전히 금주하세요. 정기적인 간 초음파 검사를 받으세요.'});
      }
      if (comp.fat > 30) traitFindings.push({severity:'caution', title:'가족력(간암) — 고지방 식사 지방간 주의',
        detail:'지방간은 간암의 전 단계가 될 수 있습니다. 지방 과다 섭취를 줄이는 것이 예방에 중요합니다.',
        tip:'등푸른 생선, 브로콜리, 녹차 등 간 보호 식품을 꾸준히 섭취하세요.'});
    }

    // 폐암 가족력
    if (fh === 'lung_cancer') {
      const brassicaFoods = Object.keys(ingMap).filter(n => ['브로콜리','양배추','케일','콜리플라워'].includes(n));
      if (brassicaFoods.length > 0) traitFindings.push({severity:'good', title:`가족력(폐암) — 십자화과 채소(${brassicaFoods.join(', ')}) 긍정적`,
        detail:'브로콜리의 설포라판, 인돌-3-카르비놀은 발암물질 해독 효소를 활성화하여 폐암 예방에 도움이 됩니다.',
        tip:'십자화과 채소는 주 3회 이상, 가볍게 찌거나 생으로 섭취하면 효과적입니다.'});
    }

    // 유방암 가족력
    if (fh === 'breast_cancer') {
      if (member.substances.includes('alcohol_moderate') || member.substances.includes('alcohol_heavy')) {
        traitFindings.push({severity:'caution', title:'가족력(유방암) + 음주 — 에스트로겐 수치 상승',
          detail:'알코올은 에스트로겐 수치를 높여 호르몬 수용체 양성 유방암 위험을 증가시킵니다.',
          tip:'유방암 가족력이 있다면 특히 음주를 삼가고 정기 유방 검진을 받으세요.'});
      }
      if (comp.fiber > 5) traitFindings.push({severity:'good', title:'가족력(유방암) — 식이섬유 섭취 긍정적',
        detail:`식이섬유 ${comp.fiber.toFixed(1)}g — 식이섬유는 에스트로겐 재흡수를 억제하여 호르몬성 유방암 예방에 도움됩니다.`,
        tip:'십자화과 채소, 통곡물, 콩류 섭취를 늘리세요.'});
    }

    // 전립선암 가족력
    if (fh === 'prostate_cancer') {
      const lycopeneFoods = Object.keys(ingMap).filter(n => DB[n]?.compounds?.some(c => c.includes('리코펜')));
      if (lycopeneFoods.length > 0) traitFindings.push({severity:'good', title:`가족력(전립선암) — 리코펜(${lycopeneFoods.join(', ')}) 긍정적`,
        detail:'토마토의 리코펜은 전립선암 위험을 줄인다는 여러 연구가 있습니다. 가열 조리 시 흡수율이 4-5배 증가합니다.',
        tip:'토마토를 올리브오일과 함께 익혀 먹으면 리코펜 흡수 효과가 극대화됩니다.'});
      if (Object.keys(ingMap).some(n => ['소고기','돼지고기'].includes(n))) {
        traitFindings.push({severity:'caution', title:'가족력(전립선암) — 붉은 고기 주의',
          detail:'붉은 고기와 가공육은 전립선암 위험과 연관성이 보고되어 있습니다.',
          tip:'생선, 두부, 콩류로 단백질을 대체하고, 정기적인 PSA 검사를 받으세요.'});
      }
    }

    // 췌장암 가족력
    if (fh === 'pancreatic_cancer') {
      if (comp.carbs > 60 || Object.keys(ingMap).some(n => n === '설탕' && ingMap[n] > 10)) {
        traitFindings.push({severity:'caution', title:'가족력(췌장암) — 고당분 식사 주의',
          detail:'만성적 인슐린 자극은 췌장에 부담을 줍니다. 정제 당류와 고혈당 식품을 줄이는 것이 예방에 중요합니다.',
          tip:'설탕, 흰쌀, 흰빵을 줄이고 통곡물·채소·콩류로 대체하세요.'});
      }
    }

    // 간질환 가족력
    if (fh === 'liver' && !member.conditions.includes('liver')) {
      if (comp.fat > 25) traitFindings.push({severity:'caution', title:'가족력(간질환) — 고지방 식사 지방간 위험',
        detail:`지방 ${comp.fat.toFixed(1)}g — 간질환 가족력이 있으면 지방간에 취약할 수 있습니다.`,
        tip:'포화지방을 줄이고, 녹황색 채소·십자화과 채소로 간 보호 성분을 섭취하세요.'});
    }

    // 갑상선질환 가족력
    if ((fh === 'thyroid_hypo' || fh === 'thyroid_hyper') && !member.conditions.includes(fh)) {
      const iodineCheck = Object.keys(ingMap).some(n => ['미역','다시마','김','굴'].includes(n));
      traitFindings.push({severity: iodineCheck ? 'good' : 'info',
        title:'가족력(갑상선질환) — 요오드 섭취 ' + (iodineCheck ? '적정' : '점검 필요'),
        detail:'갑상선은 요오드로 호르몬을 합성합니다. 과다·과소 모두 갑상선 기능에 영향을 줍니다.',
        tip:'미역·다시마는 요오드가 풍부하지만, 자동면역 갑상선염이 의심되면 과다 섭취는 오히려 악화될 수 있어 의사 상담이 중요합니다.'});
    }

    // 자가면역질환 가족력
    if (fh === 'autoimmune') {
      const antiInflamFoods = Object.keys(ingMap).filter(n =>
        DB[n]?.compounds?.some(c => c.includes('오메가3')) || ['생강','강황','블루베리'].includes(n));
      if (antiInflamFoods.length > 0) traitFindings.push({severity:'good', title:'가족력(자가면역) — 항염 성분 식품 포함',
        detail:'오메가3, 생강, 강황의 커큐민은 과도한 면역 반응을 조절하는 항염 효과가 있습니다.',
        tip:'가공식품, 정제 설탕, 트랜스지방을 줄이고 지중해식 식사 패턴을 유지하세요.'});
      if (comp.sodium > 700) traitFindings.push({severity:'caution', title:'가족력(자가면역) — 고나트륨은 면역 과활성 위험',
        detail:'과도한 나트륨 섭취는 TH17 세포 활성화를 통해 자가면역 반응을 촉진한다는 연구가 있습니다.',
        tip:'저나트륨 식단을 유지하고 항염 식품을 꾸준히 섭취하세요.'});
    }

    // 치매/알츠하이머 가족력
    if (fh === 'alzheimer') {
      const brainFoods = Object.keys(ingMap).filter(n =>
        DB[n]?.compounds?.some(c => c.includes('오메가3')) || ['블루베리','견과류','연어','고등어'].includes(n));
      if (brainFoods.length > 0) traitFindings.push({severity:'good', title:'가족력(치매) — 뇌 보호 식품 포함',
        detail:'오메가3 DHA, 폴리페놀, 비타민E는 뇌 신경 보호와 인지 기능 유지에 도움됩니다.',
        tip:'MIND 식이(베리류, 채소, 견과류, 통곡물, 생선 강조)가 알츠하이머 예방에 효과적입니다.'});
      if (comp.saturatedFat > 8) traitFindings.push({severity:'caution', title:'가족력(치매) — 포화지방 뇌 혈관 위험',
        detail:'포화지방과 트랜스지방은 뇌혈관 건강을 해치고 인지 저하를 가속화할 수 있습니다.',
        tip:'포화지방을 줄이고 불포화지방(올리브오일, 견과류, 생선)으로 대체하세요.'});
    }

    // 우울증/정신질환 가족력
    if (fh === 'depression_nutrition') {
      const serotoninFoods = Object.keys(ingMap).filter(n => ['계란','두부','닭고기','바나나','연어'].includes(n));
      if (serotoninFoods.length > 0) traitFindings.push({severity:'good', title:'가족력(우울증) — 트립토판 식품 포함',
        detail:`${serotoninFoods.join(', ')}에 트립토판이 풍부합니다. 트립토판은 세로토닌 합성의 전구체로 기분 조절에 중요합니다.`,
        tip:'오메가3(등푸른 생선), 발효식품(장내 세로토닌의 90%는 장에서 생산), 마그네슘이 정신 건강에 도움됩니다.'});
    }

    // 파킨슨병 가족력
    if (fh === 'parkinson') {
      const antioxFoods = Object.keys(ingMap).filter(n =>
        DB[n]?.compounds?.some(c => c.includes('리코펜')) || ['브로콜리','시금치','블루베리','토마토'].includes(n));
      if (antioxFoods.length > 0) traitFindings.push({severity:'good', title:'가족력(파킨슨) — 항산화 식품 포함',
        detail:'산화 스트레스는 파킨슨병의 주요 발병 기전입니다. 항산화 성분이 풍부한 채소·과일이 예방에 도움됩니다.',
        tip:'녹황색 채소, 베리류, 코코넛오일(MCT), 강황을 꾸준히 섭취하세요.'});
    }
  });

  // ── 영양소 교차분석 (Cross-Correlation) ──────────────────────────────────
  // 비타민C + 철분 시너지: Hallberg L et al. (1989) Am J Clin Nutr 49:140
  if (comp.vitaminC > 25 && comp.iron > 2) {
    traitFindings.push({severity:'good', title:`비타민C ${comp.vitaminC.toFixed(0)}mg + 철분 ${comp.iron.toFixed(1)}mg — 흡수 시너지`,
      detail:'비타민C는 비헴철(Fe³⁺→Fe²⁺)을 환원하여 소장 흡수율을 최대 6배 증가시킵니다 (Hallberg 1989).',
      tip:'철분이 풍부한 시금치·두부와 레몬즙·피망을 함께 먹으면 철분 흡수 극대화.'});
  }
  // 칼슘 vs 철분 경쟁: Hallberg L et al. (1991) Am J Clin Nutr 53:112
  if (comp.calcium > 150 && comp.iron > 2) {
    traitFindings.push({severity:'info', title:`칼슘 ${comp.calcium.toFixed(0)}mg과 철분 ${comp.iron.toFixed(1)}mg 동시 섭취 — 흡수 경쟁`,
      detail:'칼슘 300mg 이상 시 비헴철 흡수율 최대 50% 감소 (Hallberg 1991). 같은 끼니 대량 동시 섭취는 비효율적.',
      tip:'철분 보충이 중요하면 칼슘은 다른 끼니에 분산 섭취 권장.'});
  }
  // 폴리페놀-단백질 결합: Ozdal T et al. (2013) Food Res Int 51:954
  const hasTeaTannin = Object.keys(ingMap).some(n => ['녹차','홍차','커피','와인'].includes(n));
  if (hasTeaTannin && comp.protein > 15) {
    traitFindings.push({severity:'info', title:'탄닌/폴리페놀과 단백질 결합 — 상호 생체이용률 감소',
      detail:'차/커피의 탄닌은 단백질과 불용성 복합체를 형성하여 양쪽 모두 흡수율이 감소합니다 (Ozdal 2013).',
      tip:'식사 중 차/커피보다 30분 이후 별도 섭취가 효과적.'});
  }
  // 비타민D + 칼슘 시너지: Heaney RP (2008) J Am Coll Nutr 27:62
  if (comp.vitaminD > 3 && comp.calcium > 100) {
    traitFindings.push({severity:'good', title:`비타민D ${comp.vitaminD.toFixed(1)}μg + 칼슘 ${comp.calcium.toFixed(0)}mg — 흡수 시너지`,
      detail:'비타민D는 소장 칼슘 수송체(CaBP-9k) 발현을 유도하여 칼슘 흡수를 2-3배 증가시킵니다 (Heaney 2008).',
      tip:'연어+우유, 계란+치즈 등의 조합이 골밀도 유지에 효과적.'});
  }
  // 오메가3 + 커큐민 상승: Jäger R et al. (2014) J Int Soc Sports Nutr 11:20
  const hasCurcumin = Object.keys(ingMap).some(n => ['강황','카레','울금'].includes(n));
  if (comp.omega3 > 0.5 && hasCurcumin) {
    traitFindings.push({severity:'good', title:'오메가3 + 커큐민 — 항염 시너지',
      detail:'오메가3(EPA/DHA)와 커큐민은 NF-κB 경로를 상호보완적으로 억제하여 항염 효과가 증폭됩니다.',
      tip:'연어+강황 조합은 항염 식이의 핵심 조합.'});
  }
  // WHO 나트륨/칼륨 비율: WHO (2012) Guideline 나트륨 <2000mg/일, 칼륨 >3510mg/일
  if (comp.sodium > 0 && comp.potassium > 0) {
    const naKRatio = comp.sodium / Math.max(1, comp.potassium);
    if (naKRatio > 2) traitFindings.push({severity:'caution', title:`나트륨/칼륨 비율 ${naKRatio.toFixed(1)} — WHO 권장 <1.0`,
      detail:`현재 나트륨 ${comp.sodium.toFixed(0)}mg, 칼륨 ${comp.potassium.toFixed(0)}mg. WHO는 Na/K<1.0을 권장합니다. 높은 비율은 고혈압 위험을 증가시킵니다.`,
      tip:'칼륨이 풍부한 바나나, 아보카도, 감자, 토마토를 추가하세요.'});
  }

  // 칼로리 대비 일일 권장량
  if (dailyCal && comp.calories > 0) {
    const mealRatio = comp.calories / (dailyCal / 3) * 100;
    if (mealRatio > 150) traitFindings.push({severity:'caution', title:`1끼 열량이 일일 권장의 ${Math.round(mealRatio)}%`,
      detail:`프로필 기준 일일 권장 칼로리 약 ${Math.round(dailyCal)}kcal, 1끼 적정량 약 ${Math.round(dailyCal/3)}kcal. 현재 ${comp.calories.toFixed(0)}kcal로 상당히 초과합니다.`,
      tip:'재료 양을 전체적으로 줄이거나, 지방이 많은 재료를 교체하세요.'});
    else if (mealRatio > 110) traitFindings.push({severity:'info', title:`1끼 열량: 일일 권장의 ${Math.round(mealRatio)}%`,
      detail:`적정 범위에 가깝지만 간식 등을 고려하면 약간 높을 수 있습니다.`,
      tip:'남은 식사에서 조금 적게 먹으면 균형이 맞습니다.'});
  }

  // traitFindings를 별도 결과로 추가 (프로필 기반 분석)
  if (traitFindings.length > 0) {
    let score = 70;
    traitFindings.forEach(f => {
      if (f.severity === 'danger') score -= 30;
      if (f.severity === 'caution') score -= 10;
      if (f.severity === 'good') score += 15;
    });
    score = Math.max(0, Math.min(100, score));
    results.push({key:'profile', label:'개인 맞춤 분석', emoji:'👤', desc:'프로필·체질·가족력 기반', score, findings:traitFindings, composition:comp});
  }

  // substanceFindings를 별도 결과로 추가 (약물-음식 상호작용)
  if (substanceFindings.length > 0) {
    let score = 70;
    substanceFindings.forEach(f => {
      if (f.severity === 'danger') score -= 30;
      if (f.severity === 'caution') score -= 10;
      if (f.severity === 'good') score += 15;
      if (f.severity === 'info') score += 0;
    });
    score = Math.max(0, Math.min(100, score));
    results.push({key:'substances', label:'약물-음식 상호작용', emoji:'💊', desc:'복용 약물·영양제·생활습관 기반', score, findings:substanceFindings, composition:comp});
  }

  return results;
}

function renderIngredientsFromData(items, grid, bypassGrouping = false) {
  // Filter out children unless bypassing (e.g., during search)
  const entries = bypassGrouping
    ? Object.entries(items)
    : Object.entries(items).filter(([name]) => !CHILD_SET.has(name));

  if (entries.length === 0) return Object.keys(items).length > 0 ? -1 : 0;

  for (let i = 0; i < entries.length; i += 4) {
    const rowEntries = entries.slice(i, i + 4);
    const row = document.createElement("div");
    row.className = "ing-row";
    const parentsInRow = [];

    rowEntries.forEach(([name, data]) => {
      const children = !bypassGrouping && PARENT_GROUPS[name];
      const isParent = children && children.length > 0;
      const cell = document.createElement("div");
      cell.className = "ing-cell" + (name in selected ? " active" : "") + (isParent ? " ing-cell--parent" : "");
      if (isParent) {
        cell.dataset.parentKey = name;
        const pLabel = tl(data, 'en') || name;
        const pImgHtml = typeof FoodImageResolver !== 'undefined' ? FoodImageResolver.createImgHtml(data.en || pLabel, data.emoji, 'ci-img', 36) : `<span class="ci-e">${data.emoji}</span>`;
        cell.innerHTML = `${pImgHtml}<span class="ci-n">${pLabel}</span><span class="ci-arr">▶</span>`;
        cell.onclick = () => toggleParentExpand(name);
        parentsInRow.push(name);
      } else {
        const iLabel = tl(data, 'en') || name;
        const iImgHtml = typeof FoodImageResolver !== 'undefined' ? FoodImageResolver.createImgHtml(data.en || iLabel, data.emoji, 'ci-img', 36) : `<span class="ci-e">${data.emoji}</span>`;
        cell.innerHTML = `${iImgHtml}<span class="ci-n">${iLabel}</span>`;
        cell.onclick = () => toggleIngredient(name);
      }
      row.appendChild(cell);
    });

    grid.appendChild(row);

    // Append hidden expansion panels for any parent in this row
    parentsInRow.forEach(parentName => {
      const expand = document.createElement("div");
      expand.className = "ing-expand";
      expand.id = `ing-expand-${parentName}`;
      const children = (PARENT_GROUPS[parentName] || []).filter(c => DB[c]);
      for (let ci = 0; ci < children.length; ci += 4) {
        const subRow = document.createElement("div");
        subRow.className = "ing-row ing-sub-row";
        children.slice(ci, ci + 4).forEach(cname => {
          const cdata = DB[cname];
          if (!cdata) return;
          const subCell = document.createElement("div");
          subCell.className = "ing-cell" + (cname in selected ? " active" : "");
          const cLabel = tl(cdata, 'en') || cname;
          const cImgHtml = typeof FoodImageResolver !== 'undefined' ? FoodImageResolver.createImgHtml(cdata.en || cLabel, cdata.emoji, 'ci-img', 36) : `<span class="ci-e">${cdata.emoji}</span>`;
          subCell.innerHTML = `${cImgHtml}<span class="ci-n">${cLabel}</span>`;
          subCell.onclick = () => toggleIngredient(cname);
          subRow.appendChild(subCell);
        });
        expand.appendChild(subRow);
      }
      grid.appendChild(expand);
    });
  }
  if (typeof FoodImageResolver !== 'undefined') FoodImageResolver.scheduleScan();
  return entries.length;
}

function renderIngredients(filter = "") {
  const grid = document.getElementById("ingGrid");
  grid.innerHTML = "";
  const lower = (filter || "").toLowerCase();

  // 전체 보기 + 검색어 없음 → 카테고리별 그룹 테이블
  if (activeCategory === "all" && !lower) {
    const cats = dbCategories || CATEGORIES;
    let totalCount = 0;
    Object.entries(cats).forEach(([catKey, catData]) => {
      if (catKey === 'all') return;
      const catItems = {};
      Object.entries(DB).forEach(([name, data]) => {
        if (data.cat === catKey) catItems[name] = data;
      });
      if (Object.keys(catItems).length === 0) return;
      const hdr = document.createElement("div");
      hdr.className = "ing-cat-hdr";
      hdr.textContent = `${catData.emoji}  ${tl(catData)}`;
      grid.appendChild(hdr);
      totalCount += renderIngredientsFromData(catItems, grid);
    });
    return;
  }

  // 카테고리 필터 또는 검색
  const localItems = {};
  Object.entries(DB).forEach(([name, data]) => {
    if (activeCategory !== "all" && data.cat !== activeCategory) return;
    if (lower && !name.includes(lower) && !(data.en && data.en.toLowerCase().includes(lower))) return;
    localItems[name] = data;
  });

  // 검색 시 자식 항목도 직접 표시 (bypassGrouping=true)
  const count = renderIngredientsFromData(localItems, grid, !!lower);

  if (count === 0 && !!!sbClient) {
    const _nrMsg = (window.I18n && I18n.lang === 'en') ? 'No results found' : '검색 결과 없음';
    grid.innerHTML = `<div style="padding:16px;text-align:center;color:rgba(255,255,255,0.6);font-size:13px">${_nrMsg}</div>`;
  }
  if (count === 0 && !!sbClient && lower) {
    const _srMsg = (window.I18n && I18n.lang === 'en') ? 'Searching database...' : 'DB에서 검색 중...';
    grid.innerHTML = `<div style="padding:12px;text-align:center;color:rgba(255,255,255,0.6);font-size:13px"><img src="https://images.pexels.com/photos/210661/pexels-photo-210661.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='🔍'"> ${_srMsg}</div>`;
  }
}

async function renderIngredientsAPI(filter) {
  if (!!!sbClient || !filter) return;
  const apiResults = await searchIngredientsAPI(filter, activeCategory);
  if (!apiResults) return;

  const grid = document.getElementById("ingGrid");
  // 로컬과 중복되지 않는 API 결과만 추가
  const newItems = {};
  Object.entries(apiResults).forEach(([name, data]) => {
    if (!DB[name] || DB[name]._fromAPI) newItems[name] = data;
  });

  if (Object.keys(newItems).length > 0) {
    // 기존 "검색 중" 메시지 제거
    const placeholder = grid.querySelector('div[style*="text-align:center"]');
    if (placeholder) placeholder.remove();

    const hdr = document.createElement('div');
    hdr.className = 'ing-cat-hdr';
    const _dbLabel = (window.I18n && I18n.lang === 'en') ? `Database results (${Object.keys(newItems).length})` : `DB 검색 결과 (${Object.keys(newItems).length}건)`;
    hdr.innerHTML = `<img src="https://images.pexels.com/photos/87651/pexels-photo-87651.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='🌐'"> ${_dbLabel}`;
    grid.appendChild(hdr);

    renderIngredientsFromData(newItems, grid);
  } else {
    // 로컬 + Supabase 모두 결과 없음 → AI 추가 버튼 표시
    const hasLocalResults = grid.querySelectorAll('.ing-cell').length > 0;
    if (!hasLocalResults && filter && filter.length >= 1) {
      showAIAddButton(filter);
    }
  }
}

function renderCategoryTabs() {
  const container = document.getElementById("catTabs");
  container.innerHTML = "";
  const cats = dbCategories || CATEGORIES;
  const allBtn = document.createElement("button");
  allBtn.className = "cat-tab" + (activeCategory === "all" ? " active" : "");
  const allCat = cats.all || CATEGORIES.all;
  allBtn.innerHTML = `<span>${allCat.img ? '<img src="' + allCat.img + '" style="width:18px;height:18px;border-radius:4px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML=\'📋\'">' : '<img src="https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=18&h=18&fit=crop" style="width:18px;height:18px;border-radius:4px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML=\'<span>📋</span>\'">'}</span><span>${window.tl ? tl(allCat) : '전체'}</span>`;
  allBtn.onclick = () => { activeCategory = "all"; renderCategoryTabs(); filterIngredients(); };
  container.appendChild(allBtn);
  Object.entries(cats).forEach(([key, c]) => {
    if (key === 'all') return;
    const btn = document.createElement("button");
    btn.className = "cat-tab" + (activeCategory === key ? " active" : "");
    btn.innerHTML = `<span>${c.img ? '<img src="' + c.img + '" style="width:18px;height:18px;border-radius:4px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML=\'' + c.emoji + '\'">' : c.emoji}</span><span>${tl(c)}</span>`;
    btn.onclick = () => { activeCategory = key; renderCategoryTabs(); filterIngredients(); };
    container.appendChild(btn);
  });
}

// ── 커뮤니티 조리 방법 Supabase 로드 ────────────────────────────────────────
let customMethodsLoaded = false;
async function loadCustomMethods() {
  if (!sbClient || customMethodsLoaded) return;
  try {
    const { data, error } = await sbClient
      .from('cooking_methods').select('*').eq('is_active', true).order('created_at', { ascending: true });
    if (error || !data) return;
    let added = 0;
    data.forEach(m => {
      if (METHODS[m.key]) return; // 내장 방법은 덮어쓰지 않음
      METHODS[m.key] = {
        label: m.label, label_en: m.label_en,
        emoji: m.emoji || '🍳',
        range: [m.range_min, m.range_max],
        medium: m.medium,
        pressure_atm: parseFloat(m.pressure_atm) || 1.0,
        o2_level: parseFloat(m.o2_level) || 0.7,
        leach_factor: parseFloat(m.leach_factor) || 0.0,
        fat_contact: m.fat_contact || false,
        browning: m.browning !== false,
        starch_h2o: m.starch_h2o || false,
        pah_risk: m.pah_risk || false,
        uniformity: m.uniformity || 'medium',
        _fromDB: true,
      };
      if (typeof FoodImageResolver !== 'undefined') FoodImageResolver.autoAssignMethodImage(METHODS[m.key]);
      added++;
    });
    customMethodsLoaded = true;
    if (added > 0) renderMethods();
  } catch(e) { console.warn('loadCustomMethods:', e); }
}

// ── DB에서 로드한 방법 객체를 METHODS 포맷으로 변환 ──────────────────────────
function dbMethodToMETHODS(m) {
  return {
    label: m.label, label_en: m.label_en,
    emoji: m.emoji || '🍳',
    range: [m.range_min, m.range_max],
    medium: m.medium,
    pressure_atm: parseFloat(m.pressure_atm) || 1.0,
    o2_level: parseFloat(m.o2_level) || 0.7,
    leach_factor: parseFloat(m.leach_factor) || 0.0,
    fat_contact: m.fat_contact || false,
    browning: m.browning !== false,
    starch_h2o: m.starch_h2o || false,
    pah_risk: m.pah_risk || false,
    uniformity: m.uniformity || 'medium',
    _fromDB: true,
  };
}

// ── 모달 열기/닫기 ─────────────────────────────────────────────────────────
// ── 건강 항목 AI 추가 ────────────────────────────────────────────────────────
let _healthModalType = 'trait';
let _healthModalPendingItem = null;

const HEALTH_MODAL_CONFIG = {
  trait:     {title:'<img src="https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML=\'🧬\'"> 체질/식이 특이사항 추가', title_en:'<img src="https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML=\'🧬\'"> Add Constitution / Dietary Trait', placeholder:'예: 옥수수 알레르기, 저인산식, 프럭토스 불내증...', placeholder_en:'e.g., Corn allergy, Low phosphorus diet, Fructose intolerance...'},
  family:    {title:'<img src="https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=18&h=18&fit=crop" style="width:18px;height:18px;border-radius:4px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML=\'👨‍👩‍👧‍👦\'"> 가족 병력 추가', title_en:'<img src="https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=18&h=18&fit=crop" style="width:18px;height:18px;border-radius:4px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML=\'👨‍👩‍👧‍👦\'"> Add Family History', placeholder:'예: 췌장암, 파킨슨병, 다발성경화증...', placeholder_en:'e.g., Pancreatic cancer, Parkinson\'s, Multiple sclerosis...'},
  substance: {title:'<img src="https://images.pexels.com/photos/3683098/pexels-photo-3683098.jpeg?auto=compress&cs=tinysrgb&w=18&h=18&fit=crop" style="width:18px;height:18px;border-radius:4px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML=\'💊\'"> 약물·영양제·생활습관 추가', title_en:'<img src="https://images.pexels.com/photos/3683098/pexels-photo-3683098.jpeg?auto=compress&cs=tinysrgb&w=18&h=18&fit=crop" style="width:18px;height:18px;border-radius:4px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML=\'💊\'"> Add Medication / Supplement / Lifestyle', placeholder:'예: 클로피도그렐, NAC, 간헐적 단식...', placeholder_en:'e.g., Clopidogrel, NAC, Intermittent fasting...'},
  condition: {title:'<img src="https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML=\'🏥\'"> 질환/건강 상태 추가', title_en:'<img src="https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML=\'🏥\'"> Add Condition / Health Status', placeholder:'예: 크론병, 셀리악병, 루푸스, 갑상선 기능항진증...', placeholder_en:'e.g., Crohn\'s, Celiac, Lupus, Hyperthyroidism...'},
};

function openAddHealthModal(type) {
  _healthModalType = type;
  _healthModalPendingItem = null;
  const cfg = HEALTH_MODAL_CONFIG[type] || HEALTH_MODAL_CONFIG.trait;
  const _en = window.I18n && I18n.lang === 'en';
  document.getElementById('healthModalTitle').innerHTML = (_en && cfg.title_en) ? cfg.title_en : cfg.title;
  document.getElementById('healthModalInput').placeholder = (_en && cfg.placeholder_en) ? cfg.placeholder_en : cfg.placeholder;
  document.getElementById('healthModalInput').value = '';
  document.getElementById('healthModalStatus').textContent = '';
  document.getElementById('healthModalStatus').className = 'health-modal-status';
  document.getElementById('healthModalResult').style.display = 'none';
  document.getElementById('healthModalAnalyzeBtn').textContent = (window.I18n && I18n.lang === 'en') ? 'AI Analyze' : 'AI 분석';
  document.getElementById('healthModalAnalyzeBtn').disabled = false;
  document.getElementById('healthModalOverlay').classList.add('open');
  setTimeout(() => document.getElementById('healthModalInput').focus(), 100);
}

function closeAddHealthModal() {
  document.getElementById('healthModalOverlay').classList.remove('open');
  _healthModalPendingItem = null;
}

async function analyzeHealthItem() {
  const name = document.getElementById('healthModalInput').value.trim();
  if (!name) return;

  // 분석 결과가 있으면 추가 모드
  if (_healthModalPendingItem) {
    _addHealthItemToProfile(_healthModalPendingItem);
    return;
  }

  const analyzeBtn = document.getElementById('healthModalAnalyzeBtn');
  const statusEl = document.getElementById('healthModalStatus');
  const resultEl = document.getElementById('healthModalResult');
  analyzeBtn.disabled = true;
  analyzeBtn.textContent = (window.I18n && I18n.lang === 'en') ? 'Analyzing...' : '분석 중...';
  statusEl.className = 'health-modal-status';
  statusEl.innerHTML = `<img src="https://images.pexels.com/photos/1178684/pexels-photo-1178684.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='⏳'"> AI가 "${name}" 분석 중...`;
  resultEl.style.display = 'none';

  try {
    const res = await fetch(`${API_BASE}/api/add-health-item`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({type: _healthModalType, name}),
    });
    const data = await res.json();
    if (!res.ok || !data.item) throw new Error(data.error || '분석 실패');

    const item = data.item;
    if (!item.valid) {
      statusEl.className = 'health-modal-status error';
      statusEl.innerHTML = `<img src="https://images.pexels.com/photos/2889942/pexels-photo-2889942.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='❌'"> ${item.reason || '유효하지 않은 항목입니다. 다시 입력하세요.'}`;
      analyzeBtn.disabled = false;
      analyzeBtn.textContent = (window.I18n && I18n.lang === 'en') ? 'AI Analyze' : 'AI 분석';
      return;
    }

    _healthModalPendingItem = item;
    statusEl.textContent = '';

    // 결과 미리보기
    document.getElementById('hmResultName').textContent = `${item.emoji} ${item.label}`;
    document.getElementById('hmResultDesc').textContent = item.desc || '';
    const tagsEl = document.getElementById('hmResultTags');
    tagsEl.innerHTML = '';
    const tags = [...(item.interactions||[]), ...(item.warningFoods||[]), ...(item.notes||[])].slice(0,4);
    tags.forEach(t => {
      const span = document.createElement('span');
      span.className = 'result-tag';
      span.textContent = t;
      tagsEl.appendChild(span);
    });
    resultEl.style.display = 'block';
    analyzeBtn.textContent = (window.I18n && I18n.lang === 'en') ? 'Add to profile' : '프로필에 추가';
    analyzeBtn.disabled = false;
  } catch(e) {
    statusEl.className = 'health-modal-status error';
    statusEl.innerHTML = `<img src="https://images.pexels.com/photos/2889942/pexels-photo-2889942.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='❌'"> ${e.message}`;
    analyzeBtn.disabled = false;
    analyzeBtn.textContent = (window.I18n && I18n.lang === 'en') ? 'AI Analyze' : 'AI 분석';
  }
}

function _addHealthItemToProfile(item) {
  const key = item.key || ('custom_' + Date.now());
  const type = _healthModalType;
  const member = activeMember();

  if (type === 'trait') {
    customTraits[key] = {label:item.label, emoji:item.emoji, desc:item.desc, interactions:item.interactions, warningFoods:item.warningFoods};
    if (!member.traits.includes(key)) member.traits.push(key);
    renderTraits();
  } else if (type === 'family') {
    // 공유 DB: 양쪽 커스텀 스토어에 동시 저장
    const customItem = {label:item.label, emoji:item.emoji, desc:item.desc, avoidFoods:[], benefitFoods:[], notes:[]};
    customConditions[key] = customItem;
    customFamilyHx[key] = {label:item.label, emoji:item.emoji, desc:item.desc};
    if (!member.familyHx.includes(key)) member.familyHx.push(key);
    if (!member.conditions.includes(key)) member.conditions.push(key);
    renderConditions();
    updateProfileNote();
  } else if (type === 'substance') {
    customSubstances[key] = {label:item.label, emoji:item.emoji, desc:item.desc, category:item.category||'medication', interactions:item.interactions, warningFoods:item.warningFoods};
    if (!member.substances.includes(key)) member.substances.push(key);
    renderSubstances();
  } else if (type === 'condition') {
    // 공유 DB: 양쪽 커스텀 스토어에 동시 저장
    customConditions[key] = {label:item.label, emoji:item.emoji, desc:item.desc, avoidFoods:item.avoidFoods||[], benefitFoods:item.benefitFoods||[], notes:item.notes||[]};
    customFamilyHx[key] = {label:item.label, emoji:item.emoji, desc:item.desc};
    if (!member.conditions.includes(key)) member.conditions.push(key);
    if (!member.familyHx.includes(key)) member.familyHx.push(key);
    renderConditions();
    updateProfileNote();
  }

  updateProfileSummary();
  closeAddHealthModal();
  const _addedMsg = (window.I18n && I18n.lang === 'en') ? `<img src="https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='✨'"> "${tl(item)}" added to profile` : `<img src="https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='✨'"> "${item.label}" 프로필에 추가되었습니다`;
  showToast(_addedMsg);
}

function openMethodModal() {
  document.getElementById('methodModalOverlay').classList.add('open');
  document.getElementById('methodModalInput').value = '';
  document.getElementById('methodModalStatus').textContent = '';
  document.getElementById('methodModalConfirmBtn').disabled = false;
  setTimeout(() => document.getElementById('methodModalInput').focus(), 100);
}
function closeMethodModal() {
  document.getElementById('methodModalOverlay').classList.remove('open');
}
async function confirmAddMethod() {
  const name = document.getElementById('methodModalInput').value.trim();
  if (!name) return;
  document.getElementById('methodModalConfirmBtn').disabled = true;
  document.getElementById('methodModalStatus').innerHTML = `<span style="color:rgba(255,255,255,0.6)"><img src="https://images.pexels.com/photos/1178684/pexels-photo-1178684.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='⏳'"> AI가 '${name.replace(/</g,'&lt;')}' 분석 중...</span>`;
  await addMethodWithAI(name);
}

// ── AI로 조리 방법 추가 ────────────────────────────────────────────────────
async function addMethodWithAI(name) {
  const statusEl = document.getElementById('methodModalStatus');
  try {
    const res = await fetch(`${API_BASE}/api/add-method?name=${encodeURIComponent(name)}`);
    let data;
    try { data = await res.json(); } catch { throw new Error('서버 응답 오류'); }

    if (res.status === 404 || res.status === 422 || res.status === 409) {
      statusEl.innerHTML = `<span style="color:#f59e0b"><img src="https://images.pexels.com/photos/2889942/pexels-photo-2889942.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='⚠️'"> ${data.error}</span>`;
      document.getElementById('methodModalConfirmBtn').disabled = false;
      return;
    }
    if (!res.ok || !data.method) {
      statusEl.innerHTML = `<span style="color:#ef4444"><img src="https://images.pexels.com/photos/2889942/pexels-photo-2889942.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='❌'"> ${data.error || '분석 실패'}</span>`;
      document.getElementById('methodModalConfirmBtn').disabled = false;
      return;
    }

    const m = data.method;
    METHODS[m.key] = dbMethodToMETHODS(m);
    // 커스텀 방법에 자동으로 Pexels 이미지 할당
    if (typeof FoodImageResolver !== 'undefined') FoodImageResolver.autoAssignMethodImage(METHODS[m.key]);

    // 새 방법 선택
    method = m.key;
    const slider = document.getElementById('tempSlider');
    if (slider) { slider.value = Math.round((m.range_min + m.range_max) / 2); updateTemp(); }

    renderMethods();
    closeMethodModal();

    const isNew = data.source === 'ai_generated';
    const _mEn = window.I18n && I18n.lang === 'en';
    const _mLabel = tl(METHODS[m.key] || m);
    showToast(isNew
      ? (_mEn ? `<img src="https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='✨'"> '${_mLabel}' added! Shared with all users.` : `<img src="https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='✨'"> '${m.label}' 추가 완료! 전체 사용자와 공유됩니다.`)
      : (_mEn ? `'${_mLabel}' loaded from database.` : `'${m.label}' DB에서 불러왔습니다.`));
  } catch(e) {
    const _errLabel = (window.I18n && I18n.lang === 'en') ? 'Error' : '오류';
    statusEl.innerHTML = `<span style="color:#ef4444"><img src="https://images.pexels.com/photos/2889942/pexels-photo-2889942.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='❌'"> ${_errLabel}: ${e.message}</span>`;
    document.getElementById('methodModalConfirmBtn').disabled = false;
  }
}

function renderMethods() {
  const grid = document.getElementById("methodGrid");
  grid.innerHTML = "";
  Object.entries(METHODS).forEach(([key, m]) => {
    const btn = document.createElement("button");
    btn.className = "method-btn" + (method === key ? " active" : "");
    const iconHtml = m.img
      ? `<img src="${m.img}" class="method-img" alt="${tl(m)}" onerror="this.outerHTML='<span class=\\'emoji\\'>${m.emoji}</span>'">`
      : `<span class="emoji">${m.emoji}</span>`;
    btn.innerHTML = `<div class="method-icon">${iconHtml}</div><div>${tl(m)}</div>`;
    btn.onclick = () => {
      method = key;
      document.getElementById("tempSlider").value = Math.round((m.range[0] + m.range[1]) / 2);
      updateTemp();
      renderMethods();
    };
    grid.appendChild(btn);
  });
  // "+" 추가 버튼
  const addBtn = document.createElement("button");
  addBtn.className = "method-btn add-method-btn";
  addBtn.title = (window.I18n && I18n.lang === 'en') ? "Add cooking method" : "조리 방법 추가";
  addBtn.innerHTML = "+";
  addBtn.onclick = openMethodModal;
  grid.appendChild(addBtn);
}

function toggleParentExpand(name) {
  const expand = document.getElementById(`ing-expand-${name}`);
  const cell = document.querySelector(`.ing-cell--parent[data-parent-key="${name}"]`);
  if (!expand) return;
  const open = expand.classList.toggle("open");
  if (cell) cell.classList.toggle("expanded", open);
}

function toggleIngredient(name) {
  if (name in selected) delete selected[name];
  else selected[name] = DB[name]?.defaultG || 100;
  // Fast active toggle without full re-render
  const displayName = tl(DB[name], 'en') || name;
  document.querySelectorAll(".ing-cell").forEach(cell => {
    const n = cell.querySelector(".ci-n")?.textContent;
    if (n === name || n === displayName) cell.classList.toggle("active", name in selected);
  });
  renderSelected();
  document.getElementById("analyzeBtn").disabled = selCount() === 0;
}

function updateGrams(name, val) {
  const g = Math.max(1, Math.min(9999, parseInt(val) || 1));
  selected[name] = g;
}

function renderSelected() {
  const area = document.getElementById("selectedArea");
  const tags = document.getElementById("selTags");
  const badge = document.getElementById("selCount");
  if (selCount() === 0) { area.style.display = "none"; return; }
  area.style.display = "block";
  badge.textContent = selCount();
  tags.innerHTML = selNames().map(n => {
    const d = DB[n]; if (!d) return '';
    const scImg = typeof FoodImageResolver !== 'undefined' ? FoodImageResolver.createImgHtml(d.en || n, d.emoji, 'sc-img', 24) : `<span class="sc-e">${d.emoji}</span>`;
    return `<div class="sel-chip">
      ${scImg}
      <span class="sc-n">${tl(d, 'en') || n}</span>
      <input type="number" class="sc-g" value="${selected[n]}" min="1" max="9999"
        onchange="updateGrams('${n}',this.value)" onkeyup="updateGrams('${n}',this.value)">
      <span class="sc-u">g</span>
      <span class="sc-rm" onclick="toggleIngredient('${n}')" title="제거">×</span>
    </div>`;
  }).join("");
  if (typeof FoodImageResolver !== 'undefined') FoodImageResolver.scheduleScan();
}

function clearAllIngredients() {
  Object.keys(selected).forEach(k => delete selected[k]);
  renderIngredients(document.getElementById("searchInput").value);
  renderSelected();
  document.getElementById("analyzeBtn").disabled = true;
}

async function filterIngredients() {
  const query = document.getElementById("searchInput").value;
  renderIngredients(query);
  if (!!sbClient && query.length >= 1) {
    await renderIngredientsAPI(query);
  } else if (!sbClient && query.length >= 2) {
    // 오프라인 + 로컬 결과 없을 때도 AI 버튼 표시
    const grid = document.getElementById("ingGrid");
    if (grid.querySelectorAll('.ing-cell').length === 0) showAIAddButton(query);
  }
}

// ── AI 재료 자동 추가 ─────────────────────────────────────────────────────────
function showAIAddButton(query) {
  const grid = document.getElementById("ingGrid");
  const safe = query.replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const _en = window.I18n && I18n.lang === 'en';
  grid.innerHTML = `
    <div style="text-align:center;padding:24px 16px">
      <div style="color:rgba(255,255,255,0.6);font-size:13px;margin-bottom:14px">'${safe}' ${_en ? 'not found' : '검색 결과 없음'}</div>
      <button id="aiAddBtn" onclick="addIngredientWithAI('${query.replace(/'/g,"\\'")}')"
        style="background:#10B981;color:#fff;border:none;border-radius:8px;padding:9px 18px;font-size:13px;cursor:pointer;font-weight:600">
        <img src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='🤖'"> ${_en ? `Add '${safe}' with AI` : `AI로 '${safe}' 추가하기`}
      </button>
      <div style="color:rgba(255,255,255,0.35);font-size:11px;margin-top:8px">${_en ? 'AI analyzes nutrition data and saves to database' : 'AI가 영양 데이터를 분석해 DB에 저장합니다'}</div>
    </div>`;
}

async function addIngredientWithAI(name) {
  const grid = document.getElementById("ingGrid");
  const safe = name.replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const _aiMsg = (window.I18n && I18n.lang === 'en') ? `AI analyzing '${safe}'...` : `AI가 '${safe}' 분석 중...`;
  grid.innerHTML = `<div style="text-align:center;padding:24px;color:rgba(255,255,255,0.6);font-size:13px"><img src="https://images.pexels.com/photos/1178684/pexels-photo-1178684.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='⏳'"> ${_aiMsg}</div>`;

  try {
    const res = await fetch(`${API_BASE}/api/add-ingredient?name=${encodeURIComponent(name)}`);
    let data;
    try { data = await res.json(); } catch { throw new Error('서버 응답 오류 — 잠시 후 다시 시도해주세요'); }

    if (res.status === 404 || res.status === 422) {
      grid.innerHTML = `<div style="text-align:center;padding:20px;color:#f59e0b;font-size:13px"><img src="https://images.pexels.com/photos/2889942/pexels-photo-2889942.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='⚠️'"> ${data.error}</div>`;
      return;
    }
    if (!res.ok || !data.ingredient) {
      grid.innerHTML = `<div style="text-align:center;padding:20px;color:#ef4444;font-size:13px"><img src="https://images.pexels.com/photos/2889942/pexels-photo-2889942.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='❌'"> 분석 실패: ${data.error || '다시 시도해주세요'}</div>`;
      return;
    }

    const ing = data.ingredient;
    // 로컬 DB에 추가
    DB[ing.name] = {
      cat: ing.cat || 'processed',
      emoji: ing.emoji || '🍴',
      defaultG: ing.default_g || 100,
      comp: { protein: ing.protein||0, fat: ing.fat||0, carbs: ing.carbs||0, water: ing.water||0, fiber: ing.fiber||0 },
      amino: Array.isArray(ing.amino_acids) ? ing.amino_acids : [],
      vit: { sodium: ing.sodium, potassium: ing.potassium, calcium: ing.calcium, iron: ing.iron, C: ing.vit_c, A: ing.vit_a, B12: ing.vit_b12 },
      compounds: Array.isArray(ing.compounds) ? ing.compounds : [],
      flavor: { umami: ing.flavor_umami||0, sweet: ing.flavor_sweet||0, salty: ing.flavor_salty||0, sour: ing.flavor_sour||0, bitter: ing.flavor_bitter||0 },
      _fromAPI: true,
    };

    // 검색 재실행으로 결과 표시
    document.getElementById("searchInput").value = ing.name;
    renderIngredients(ing.name);

    const isNew = data.source === 'ai_generated';
    showToast(isNew ? `<img src="https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='✨'"> '${ing.name}' AI 추가 완료! 모든 사용자가 이용할 수 있습니다.` : `'${ing.name}' DB에서 불러왔습니다.`);
  } catch (e) {
    grid.innerHTML = `<div style="text-align:center;padding:20px;color:#ef4444;font-size:13px"><img src="https://images.pexels.com/photos/2889942/pexels-photo-2889942.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='❌'"> 오류: ${e.message}</div>`;
  }
}

function showToast(msg, type) {
  type = type || 'info';
  var bgColors = { success: 'rgba(16,185,129,0.9)', error: 'rgba(239,68,68,0.9)', warning: 'rgba(245,158,11,0.9)', info: 'rgba(255,255,255,0.15)' };
  var bg = bgColors[type] || bgColors.info;
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);color:#fff;padding:10px 18px;border-radius:20px;font-size:13px;z-index:9999;opacity:0;transition:opacity 0.3s;max-width:90vw;text-align:center;pointer-events:none';
    document.body.appendChild(toast);
  }
  toast.style.background = bg;
  toast.textContent = msg;
  toast.style.opacity = '1';
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => { toast.style.opacity = '0'; }, 3500);
}

function updateTemp() {
  const v = document.getElementById("tempSlider").value;
  const el = document.getElementById("tempVal");
  el.textContent = v + "°C";
  el.style.color = v >= 200 ? "#ef4444" : v >= 140 ? "#f97316" : "#4ade80";
}

function updateTime() {
  const v = document.getElementById("timeSlider").value;
  const unit = (window.I18n && I18n.lang === 'en') ? ' min' : '분';
  document.getElementById("timeVal").textContent = v + unit;
}

// ── Scientific Constants (Arrhenius kinetics, USDA, Stevens Power Law) ──
const SCI = {
  R: 8.314, // J/(mol·K)
  // Arrhenius: k(T) = A * exp(-Ea / RT)
  // Returns dimensionless extent [0,1] for given temp(°C), time(min), Ea(J/mol), A(s⁻¹)
  extent(tempC, timeMin, Ea, A) {
    const T = tempC + 273.15;
    const k = A * Math.exp(-Ea / (this.R * T)); // s⁻¹
    const t = timeMin * 60; // s
    return 1 - Math.exp(-k * t);
  },
  // 2nd-order Maillard: d[M]/dt = k·[AA]·[RS]  simplified as pseudo-1st after normalizing
  // Ea=100 kJ/mol, A=10^10 s⁻¹  (Martins, Jongen & van Boekel 2001, CRC Food Chem)
  maillardExtent(tempC, timeMin) {
    return this.extent(tempC, timeMin, 100000, 1e10);
  },
  // Caramelization onset 160°C, Ea=128 kJ/mol (Kroh 1994, Food Chem)
  caramelExtent(tempC, timeMin) {
    if (tempC < 120) return 0;
    return this.extent(tempC, timeMin, 128000, 5e11);
  },
  // Protein denaturation: multi-component sigmoid (Tornberg 2005, Meat Sci)
  // Myosin: Tm=55°C, Actin: Tm=75°C  — weighted by component ratios
  proteinDenaturation(tempC, timeMin) {
    const sigmoid = (T, Tm, dH) => 1/(1+Math.exp(-dH/(this.R*(T+273.15))*(1-(Tm+273.15)/(T+273.15))));
    const myosin = sigmoid(tempC, 55, 220000) * 0.4;  // 40% of total
    const collagen = sigmoid(tempC, 65, 180000) * 0.3; // 30%
    const actin = sigmoid(tempC, 77, 600000) * 0.3;    // 30%
    const denat = Math.min(1, myosin + collagen + actin);
    // Time factor: first-order approach to equilibrium
    const timeFactor = 1 - Math.exp(-timeMin/20);
    return Math.min(1, denat * (0.6 + 0.4*timeFactor));
  },
  // Starch gelatinization: Avrami n=3, Ea=260 kJ/mol (Donovan 1979, Biopolymers)
  starchGelatinization(tempC, timeMin) {
    if (tempC < 55) return 0;
    const k = Math.exp(-260000/(this.R*(tempC+273.15))) * 2e20;
    const t = timeMin * 60;
    return 1 - Math.exp(-k * Math.pow(t, 3)); // Avrami n=3
  },
  // Vitamin C 1st-order degradation, Ea=75 kJ/mol (Santos & Silva 2008, J Food Eng)
  vitCRetention(tempC, timeMin) {
    const k = 3e6 * Math.exp(-75000/(this.R*(tempC+273.15))); // s⁻¹
    return Math.exp(-k * timeMin * 60);
  },
  // Lipid autoxidation induction period (Frankel 1980, Prog Lipid Res)
  lipidOxidation(tempC, timeMin) {
    const Ea_init = 150000; // initiation Ea
    const k = Math.exp(-Ea_init/(this.R*(tempC+273.15))) * 1e13;
    return Math.min(1, k * timeMin * 60);
  },
  // Acrylamide bell-curve: formation Ea=87 kJ/mol, elimination Ea=110 kJ/mol (Mottram 2002, Nature)
  acrylamide(tempC, timeMin) {
    if (tempC < 120) return 0;
    const kf = Math.exp(-87000/(this.R*(tempC+273.15))) * 5e7;
    const ke = Math.exp(-110000/(this.R*(tempC+273.15))) * 2e9;
    const t = timeMin * 60;
    return kf/(ke-kf) * (Math.exp(-kf*t) - Math.exp(-ke*t));
  },
  // Allicin thermolysis 1st-order, Ea=92 kJ/mol (Lawson & Wang 2001, J Agric Food Chem)
  allicinRetention(tempC, timeMin) {
    const k = 1e8 * Math.exp(-92000/(this.R*(tempC+273.15)));
    return Math.exp(-k * timeMin * 60);
  },
  // ── 추가 반응 모델 (Phase 1) ──────────────────────────────────────────
  // PAH (polycyclic aromatic hydrocarbons): formation on fat-drip/char surfaces
  // Phillips (1999) Mutation Res 443:139; EFSA (2008) J EFSA 724:1-114
  pahFormation(tempC, timeMin) {
    if (tempC < 200) return 0;
    // 벤조피렌 생성: Ea≈120 kJ/mol, 지방 열분해 → 라디칼 고리화
    const k = 2e9 * Math.exp(-120000/(this.R*(tempC+273.15)));
    return Math.min(1, k * timeMin * 60);
  },
  // HCA (heterocyclic amines): creatine + amino acids + sugars at high temp
  // Skog K et al. (1998) Food Chem Toxicol 36:879; Sugimura T (2000) Mutation Res 447:17
  hcaFormation(tempC, timeMin) {
    if (tempC < 150) return 0;
    // PhIP (2-amino-1-methyl-6-phenylimidazo[4,5-b]pyridine) 주요 HCA
    const k = 8e7 * Math.exp(-80000/(this.R*(tempC+273.15)));
    return Math.min(1, k * timeMin * 60);
  },
  // Nitrosamine: nitrite + secondary amines at high temp
  // Honikel (2008) Meat Sci 78:68; IARC Monograph 114 (2018)
  nitrosamineFormation(tempC, timeMin) {
    if (tempC < 130) return 0;
    const k = 3e6 * Math.exp(-95000/(this.R*(tempC+273.15)));
    return Math.min(1, k * timeMin * 60);
  },
  // Anthocyanin thermal degradation: 1st-order, Ea≈75 kJ/mol
  // Patras A et al. (2010) Trends Food Sci Technol 21:3
  anthocyaninRetention(tempC, timeMin) {
    if (tempC < 50) return 1;
    const k = 5e6 * Math.exp(-75000/(this.R*(tempC+273.15)));
    return Math.exp(-k * timeMin * 60);
  },
  // Chlorophyll degradation → pheophytin (Mg loss), Ea≈68 kJ/mol
  // Schwartz SJ & von Elbe JH (1983) J Food Sci 48:1303
  chlorophyllRetention(tempC, timeMin) {
    if (tempC < 50) return 1;
    const k = 1e6 * Math.exp(-68000/(this.R*(tempC+273.15)));
    return Math.exp(-k * timeMin * 60);
  },
  // Beta-carotene trans-to-cis isomerization: enhances bioavailability
  // Chen BH & Huang JH (1998) J Food Sci 63:751
  betaCaroteneIsomer(tempC, timeMin) {
    if (tempC < 50) return 0;
    const k = 2e4 * Math.exp(-50000/(this.R*(tempC+273.15)));
    return Math.min(1, 1 - Math.exp(-k * timeMin * 60));
  },
  // Glucosinolate hydrolysis: myrosinase active 20-60°C, thermal 60-100°C
  // Verkerk R et al. (2009) Food Chem Toxicol 47:16
  glucosinolateHydrolysis(tempC, timeMin) {
    if (tempC < 20) return 0;
    // Myrosinase: optimal 30-40°C, inactivated >70°C
    const enzymatic = tempC <= 70 ? Math.exp(-Math.pow((tempC-35)/15, 2)) : 0;
    // Thermal: Ea≈90 kJ/mol, significant above 60°C
    const thermal = tempC >= 60 ? Math.min(1, this.extent(tempC, timeMin, 90000, 1e7)) : 0;
    const timeFactor = 1 - Math.exp(-timeMin/15);
    return Math.min(1, Math.max(enzymatic * timeFactor * 0.8, thermal));
  },
  // Polyphenol oxidation (PPO enzymatic browning): active 25-70°C, inactivated >70°C
  // Yoruk R & Marshall MR (2003) J Food Biochem 27:361
  polyphenolOxidation(tempC, timeMin) {
    if (tempC > 80 || tempC < 15) return 0;
    // Bell-curve: optimal at 40°C, inactivated progressively above 60°C
    const activity = Math.exp(-Math.pow((tempC - 40) / 18, 2));
    const timeFactor = 1 - Math.exp(-timeMin / 10);
    return Math.min(1, activity * timeFactor);
  },
  // USDA Nutrient Retention Factors Release 6 (2007)
  // [boil, steam, bake/roast, fry, raw]
  USDA: {
    C:      [0.50, 0.73, 0.64, 0.65, 1.00],
    B1:     [0.67, 0.83, 0.77, 0.80, 1.00],
    B2:     [0.73, 0.85, 0.82, 0.83, 1.00],
    B6:     [0.72, 0.83, 0.79, 0.80, 1.00],
    B12:    [0.74, 0.87, 0.84, 0.85, 1.00],
    folate: [0.59, 0.70, 0.65, 0.65, 1.00],
    niacin: [0.77, 0.90, 0.88, 0.90, 1.00],
    A:      [0.84, 0.90, 0.87, 0.88, 1.00],
    D:      [0.87, 0.92, 0.89, 0.90, 1.00],
    E:      [0.80, 0.88, 0.85, 0.86, 1.00],
    K:      [0.85, 0.92, 0.89, 0.90, 1.00],
    iron:   [0.85, 0.94, 0.92, 0.93, 1.00],
    zinc:   [0.83, 0.92, 0.89, 0.90, 1.00],
    calcium:[0.87, 0.95, 0.93, 0.94, 1.00],
    potassium:[0.70, 0.84, 0.82, 0.83, 1.00],
    sodium: [0.90, 0.97, 0.95, 0.96, 1.00],
    manganese:[0.87, 0.93, 0.91, 0.92, 1.00],
    selenium: [0.85, 0.92, 0.89, 0.90, 1.00],
  },
  methodIdx(m) {
    return {boil:0, steam:1, poach:1, blanch:0, bake:2, roast:2, oven:2, grill:3, charcoal:3, tandoor:3, pan_fry:3, stir_fry:3, wok:3, deep_fry:3, air_fry:2, microwave:1, pressure:0, slow_cook:0, braise:0, sous_vide:1, smoke:2, ferment:4, raw:4}[m] ?? 3;
  },
  // Time correction: USDA values calibrated at ~20min. Adjust by log ratio.
  timeCorrect(base, timeMin, isWaterSol) {
    const ref = 20;
    const sensitivity = isWaterSol ? 0.18 : 0.07;
    const factor = 1 - sensitivity * Math.log(Math.max(1, timeMin) / ref);
    return Math.max(isWaterSol ? 0.20 : 0.60, base * factor);
  },
  // Stevens Power Law: perceived intensity = k · C^n
  // n exponents from Lawless & Heymann (2010), Sensory Evaluation of Food
  stevensN: {umami:0.72, sweet:0.80, salty:0.85, sour:0.85, bitter:0.80},
  stevens(raw, taste) {
    const n = this.stevensN[taste] || 0.80;
    return Math.round(Math.min(100, 100 * Math.pow(Math.max(0, raw/100), n)));
  },
  // Umami synergy: MSG+IMP multiplicative enhancement up to 8× (Yamaguchi 1991, Food Rev Int)
  umamiSynergy(glutamate, inositol) {
    const s = 1 + 7 * (glutamate/(glutamate+50)) * (inositol/(inositol+30));
    return Math.min(8, s);
  },
};

// ── Analysis Engine (gram-weighted, Arrhenius kinetics) ──
function analyze(ingMap, method, temp, time) {
  const md = METHODS[method] || {};  // 조리 방법 물리화학 인자
  const ings = Object.keys(ingMap);
  const rxns = [], warns = [];
  const totalG = Object.values(ingMap).reduce((a,b)=>a+b,0) || 1;
  const totalComp = (key) => ings.reduce((sum,n) => sum + (DB[n]?.comp[key]||0) * (ingMap[n]||0) / 100, 0);
  const totalProtein = totalComp("protein");
  const totalFat = totalComp("fat");
  const totalCarbs = totalComp("carbs");
  const has = fn => ings.some(i => DB[i] && fn(DB[i]));
  // ── Quantitative sci totals (per actual gram input) ──────────────────
  const sciTotal = (field) => ings.reduce((s,n) => s + (DB[n]?.sci?.[field] ?? 0) * (ingMap[n]||0) / 100, 0);
  const totalGlu       = sciTotal("glu");        // g glutamic acid
  const totalIMP       = sciTotal("imp");        // mg inosinate (IMP)
  const totalGMP       = sciTotal("gmp");        // mg guanylate (GMP)
  const totalFreeGlu   = sciTotal("free_glu");   // mg free glutamate
  const totalAllicin   = sciTotal("allicin");    // mg allicin
  const totalCapsaicin = sciTotal("capsaicin");  // mg capsaicin
  const totalAsparagine= sciTotal("asparagine"); // g asparagine (acrylamide precursor)
  const totalLecithin  = sciTotal("lecithin");   // mg lecithin
  // Fallback: if no sci.glu, estimate from protein×0.16 (average glutamate fraction)
  const totalGluEst = totalGlu > 0 ? totalGlu :
    ings.reduce((s,n) => s + (DB[n]?.amino?.includes?.('글루탐산') ? (DB[n]?.comp?.protein||0)*0.16*(ingMap[n]||0)/100 : 0), 0);

  const hasProt = totalProtein > 3;
  const hasSugar = totalCarbs > 5 || ings.includes("설탕");
  const hasAmino = totalGluEst > 0.3; // >0.3g glutamate = meaningful Maillard substrate
  const hasAcid = has(d => d.compounds.some(c => c.includes("시트르산")));
  const hasFat = totalFat > 3;
  const hasStarch = has(d => d.compounds.some(c => c.includes("전분") || c.includes("아밀로")));
  const hasCap = totalCapsaicin > 0.001 || has(d => d.compounds.some(c => c.includes("캡사이신")));
  const hasAllicin = totalAllicin > 0.05 || has(d => d.compounds.some(c => c.includes("알리신")));

  // ── Maillard Reaction: 2nd-order Arrhenius, Ea=100 kJ/mol (Martins, Jongen & van Boekel 2001) ──
  // 건열 표면에서만 발생 (수분 매체 = 수증기·수침에서는 표면 갈변 불가)
  if (hasAmino && hasSugar && temp >= 140 && md.browning) {
    const ext = SCI.maillardExtent(temp, time);
    const int = Math.min(100, Math.round(ext * 100));
    const T = temp + 273.15;
    const k = 1e10 * Math.exp(-100000/(SCI.R*T));
    const halfLife = Math.round(Math.log(2)/k/60 * 10)/10;
    rxns.push({name:"마이야르 반응 (Maillard Reaction)",key:"maillard",icon:'<img src="https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=20&h=20&fit=crop" style="width:20px;height:20px;border-radius:4px;object-fit:cover" onerror="this.outerHTML=\'🔬\'">',intensity:int,
      desc:`글루탐산 ${totalGluEst.toFixed(2)}g + 탄수화물 ${totalCarbs.toFixed(1)}g이 ${temp}°C에서 반응 → 진행률 ${int}%`,
      effects:["갈색 색상 발현","고소한 풍미 생성","향기 화합물 다양화"],
      science:`k(T) = A·exp(-Ea/RT) | Ea=100 kJ/mol, A=10¹⁰ s⁻¹ | k(${temp}°C)=${k.toExponential(2)} s⁻¹`,
      proDetail:`Martins, Jongen & van Boekel (2001) Food Chem 74:403. 2차 반응속도론: d[M]/dt = k[AA][RS]. Ea=100 kJ/mol, A=10¹⁰ s⁻¹. k(${temp}°C)=${k.toExponential(3)} s⁻¹, t½=${halfLife}분. 반응 진행률 ${int}% (Hodge 3단계: 아마도리 전위 → 스트레커 분해 → 중합). 주요 생성물: 피라진류, 퓨란류, 멜라노이딘. AGEs(최종당화산물) 과도생성 임계: 진행률 >70%.`,
      health:int>70?"과도한 반응(>70%)은 AGEs 생성 → 염증 촉진 가능":"멜라노이딘 생성 → 항산화 효과"});
  }

  // ── Caramelization: Ea=128 kJ/mol (Kroh 1994, Food Chem) ──
  // 마이야르와 동일하게 건열 표면 필요, 수침에서는 당이 녹아나와 캐러멜화 불가
  if (hasSugar && temp >= 120 && md.browning) {
    const ext = SCI.caramelExtent(temp, time);
    const int = Math.min(100, Math.round(ext * 100));
    if (int > 2) {
      const T = temp + 273.15;
      const k = 5e11 * Math.exp(-128000/(SCI.R*T));
      rxns.push({name:"캐러멜화 (Caramelization)",key:"caramelization",icon:'<img src="https://images.pexels.com/photos/33260/honey-sweet-syrup-organic.jpg?auto=compress&cs=tinysrgb&w=20&h=20&fit=crop" style="width:20px;height:20px;border-radius:4px;object-fit:cover" onerror="this.outerHTML=\'🍯\'">',intensity:int,
        desc:`당류가 ${temp}°C에서 열분해 → 반응 진행률 ${int}% (개시온도: 수크로스 160°C, 포도당 150°C, 과당 110°C)`,
        effects:["호박색 발현","캐러멜 향 생성","복합 풍미"],
        science:`k(T) = A·exp(-Ea/RT) | Ea=128 kJ/mol, A=5×10¹¹ s⁻¹ | k(${temp}°C)=${k.toExponential(2)} s⁻¹`,
        proDetail:`Kroh (1994) Food Chem 51:373. Ea=128 kJ/mol. k(${temp}°C)=${k.toExponential(3)} s⁻¹. 수크로스 분해 경로: 수크로스→글루코스+프럭토스→enolization→탈수→HMF(5-hydroxymethylfurfural). HMF 생성량 ∝ 반응진행률²·[당류]. 카라멜 색소 분류: E150a-d.`,
        health:"고농도 HMF(>1000mg/kg)는 EFSA 잠재독성 주의"});
    }
  }

  // ── Protein Denaturation: multi-component sigmoid (Tornberg 2005, Meat Sci) ──
  if (hasProt && temp >= 40) {
    const frac = SCI.proteinDenaturation(temp, time);
    const int = Math.min(100, Math.round(frac * 100));
    if (int > 5) {
      const shrink = Math.min(35, Math.round(frac * 35));
      rxns.push({name:"단백질 변성 (Protein Denaturation)",key:"protein_denaturation",icon:'<img src="https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=20&h=20&fit=crop" style="width:20px;height:20px;border-radius:4px;object-fit:cover" onerror="this.outerHTML=\'<span>🧬</span>\'">',intensity:int,
        desc:`단백질 ${totalProtein.toFixed(1)}g의 ${int}% 변성 완료 (미오신 40% + 콜라겐 30% + 액틴 30% 가중합산)`,
        effects:["조직 수축·응고","소화율 향상","수분 방출"],
        science:`다성분 시그모이드: f(T)=1/[1+exp(-ΔH/R·(1-Tm/T))] | 수축률≈${shrink}%`,
        proDetail:`Tornberg (2005) Meat Sci 70:493. 미오신: Tm=55°C, ΔH=220kJ/mol(40%). 콜라겐: Tm=65°C, ΔH=180kJ/mol(30%). 액틴: Tm=77°C, ΔH=600kJ/mol(30%). DSC열량계 데이터 기반. 시간보정: 1-exp(-t/τ), τ=20분. 현재 변성도=${int}%, 수축률≈${shrink}%.`,
        health:"적절한 변성은 단백질 소화율↑, 과변성(>90%)은 탄력·보습 손실"});
    }
  }

  // ── Starch Gelatinization: Avrami n=3, Ea=260 kJ/mol (Donovan 1979, Biopolymers) ──
  // starch_h2o=true인 방법(수침·증기·마이크로파)에서만 전분 호화 발생
  if (hasStarch && temp >= 55 && md.starch_h2o) {
    const frac = SCI.starchGelatinization(temp, time);
    const int = Math.min(100, Math.round(frac * 100));
    if (int > 1) {
      rxns.push({name:"전분 호화 (Starch Gelatinization)",key:"starch_gelatinization",icon:'<img src="https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=20&h=20&fit=crop" style="width:20px;height:20px;border-radius:4px;object-fit:cover" onerror="this.outerHTML=\'<span>💧</span>\'">',intensity:int,
        desc:`전분 과립 ${int}% 호화 완료 (Avrami 핵생성-성장 모델, n=3)`,
        effects:["점성 증가","투명도 변화","소화율 대폭 향상"],
        science:`Avrami: α=1-exp(-k·tⁿ) | n=3, Ea=260 kJ/mol | 호화율=${int}%`,
        proDetail:`Donovan (1979) Biopolymers 18:263. Avrami 핵생성-성장 모델: α=1-exp(-k·t³), k=A·exp(-Ea/RT), Ea=260 kJ/mol, A=2×10²⁰. 호화 온도: 옥수수 62-72°C, 쌀 61-78°C, 감자 59-68°C (Ratnayake & Jackson 2006). 엔탈피 ΔH=10-18 J/g. 현재 호화율=${int}%.`,
        health:"호화전분은 비호화 대비 소화속도 2-3배↑ → GI 상승"});
    }
  }

  // ── Vitamin C Degradation: 1st-order, Ea=75 kJ/mol (Santos & Silva 2008) ──
  // leach_factor: 수침에서 비타민 C가 조리수로 용출되어 추가 손실 발생
  const vitCIngs = ings.filter(i => DB[i]?.vit?.C && DB[i].vit.C > 10);
  if (vitCIngs.length > 0 && temp >= 60) {
    const thermalRet = SCI.vitCRetention(temp, time);
    // 용출 손실 추가: leach_factor만큼 비례해서 잔존율 추가 감소
    const leachPenalty = (md.leach_factor || 0) * 0.35;
    const ret = Math.max(0.01, thermalRet * (1 - leachPenalty));
    const loss = Math.min(99, Math.round((1-ret)*100));
    const T = temp + 273.15;
    const k = 3e6 * Math.exp(-75000/(SCI.R*T));
    const t_half = Math.round(Math.log(2)/k/60 * 10)/10;
    rxns.push({name:"비타민 C 열분해",key:"vitamin_c_loss",icon:'<img src="https://images.pexels.com/photos/3683098/pexels-photo-3683098.jpeg?auto=compress&cs=tinysrgb&w=20&h=20&fit=crop" style="width:20px;height:20px;border-radius:4px;object-fit:cover" onerror="this.outerHTML=\'💊\'">',intensity:loss,
      desc:`아스코르브산 1차 반응 분해 → ${loss}% 손실 | 잔존율 ${Math.round(ret*100)}%`,
      effects:[`비타민 C ${loss}% 손실`,"항산화 능력 감소"],
      science:`k(T)=A·exp(-Ea/RT) | Ea=75kJ/mol, A=3×10⁶ s⁻¹ | t½=${t_half}분`,
      proDetail:`Santos & Silva (2008) J Food Eng 86:178. 1차 반응: C(t)=C₀·exp(-kt). Ea=75kJ/mol, A=3×10⁶ s⁻¹. k(${temp}°C)=${k.toExponential(3)} s⁻¹, t½=${t_half}분. 잔존율=${Math.round(ret*100)}%. pH의존성: pH<4에서 안정성↑ (산성환경). 산소농도 의존적 → 밀폐조리시 손실 감소.`,
      health:`${Math.round(ret*100)}% 잔존 — 짧은 조리·밀폐환경·산성화(레몬즙)로 손실 최소화 권장`});
  }

  // ── Lipid Oxidation: induction period model (Frankel 1980, Prog Lipid Res) ──
  // o2_level이 낮을수록(진공·밀폐) 산화 억제, fat_contact=true이면 기름 흡수로 산화 기질↑
  if (hasFat && temp >= 150 && (md.o2_level || 0) > 0.2) {
    const ox = SCI.lipidOxidation(temp, time) * Math.max(0.1, md.o2_level || 0.7);
    const int = Math.min(100, Math.round(ox * 100));
    if (int > 5) {
      rxns.push({name:"지질 산화 (Lipid Oxidation)",key:"lipid_oxidation",icon:'<img src="https://images.pexels.com/photos/2889942/pexels-photo-2889942.jpeg?auto=compress&cs=tinysrgb&w=20&h=20&fit=crop" style="width:20px;height:20px;border-radius:4px;object-fit:cover" onerror="this.outerHTML=\'<span>⚠️</span>\'">',intensity:int,
        desc:`불포화지방산이 산소(노출도 ${Math.round((md.o2_level||0.7)*100)}%)와 반응 → 과산화지질 생성 위험도 ${int}%`,
        effects:["산패취 발생","과산화지질 생성","필수지방산 손실"],
        science:`유도기간 모델: Ea_개시=150kJ/mol, Ea_전파=60kJ/mol (Frankel 1980)`,
        proDetail:`Frankel (1980) Prog Lipid Res 19:1. 자동산화 3단계: 개시(Ea=150kJ/mol)→전파(Ea=60kJ/mol)→종결. ROOH 누적량 ∝ exp(-Ea_init/RT)·t. 항산화제(토코페롤) 존재시 유도기간 2-5배 연장. 현재 산화위험도=${int}%.`,
        health:"과산화지질은 세포막 손상, 심혈관 위험↑ — 항산화제 첨가 또는 온도 저하 권장"});
    }
  }

  // ── Acrylamide: bell-curve formation (Mottram 2002, Nature) ──
  if (temp >= 120 && hasSugar && (totalAsparagine > 0.05 || hasAmino)) {
    const rawAcr = SCI.acrylamide(temp, time);
    const int = Math.min(100, Math.round(Math.min(1, rawAcr*1e5) * 100));
    if (int > 3) {
      const asnInfo = totalAsparagine > 0.05 ? ` (아스파라긴 ${(totalAsparagine*1000).toFixed(0)}mg)` : '';
      warns.push({type:"주의",msg:`${temp}°C 고온+환원당+아스파라긴${asnInfo} → 아크릴아마이드 생성 (Mottram 2002, Ea=87kJ/mol) — 진행률 ${int}%`});
    }
  }

  // ── Allicin Thermolysis: 1st-order, Ea=92 kJ/mol (Lawson & Wang 2001) ──
  if (hasAllicin && temp >= 60) {
    const ret = SCI.allicinRetention(temp, time);
    const p = Math.round(ret*100);
    const initMg = totalAllicin > 0.05 ? totalAllicin.toFixed(2) : '추정치';
    const retMg  = totalAllicin > 0.05 ? (totalAllicin * ret).toFixed(3) : '—';
    rxns.push({name:"알리신 열변환",key:"allicin",icon:(typeof FoodImageResolver!=='undefined'?FoodImageResolver.createImgHtml('Garlic','🧄','rxn-icon-img',20):'🧄'),intensity:100-p,
      desc:`초기 알리신 ${initMg}mg → ${retMg}mg 잔존 (${p}% 보존, ${100-p}% 분해·변환)`,
      effects:["매운향 감소","단맛 증가","항산화 화합물 변환"],
      science:`1차 반응: Ea=92kJ/mol (Lawson & Wang 2001) | 잔존율=${p}%`,
      proDetail:`Lawson & Wang (2001) J Agric Food Chem 49:2911. 알리신 분해: 1차 반응 k=A·exp(-Ea/RT), Ea=92kJ/mol. 초기 투입량=${initMg}mg, 잔존=${retMg}mg(${p}%). 생성물: 아조엔(항혈전, 항암), 다이알릴디설파이드(항균). 알리신 잔존→항균 활성. 낮은 온도(<60°C) 단시간 조리 또는 조리 직전 첨가 권장.`,
      health:`항균·항산화 활성 약 ${p}% 잔존 — 생마늘 또는 조리 직전 첨가로 보존`});
  }

  // ── Capsaicin Partitioning: LogP=3.04 (Appendino 2008) ──
  if (hasCap && hasFat) {
    const logP = 3.04;
    const partCoeff = Math.pow(10, logP);
    const capMg = totalCapsaicin > 0.001 ? totalCapsaicin.toFixed(3) : '미량';
    rxns.push({name:"캡사이신 지용성 추출",key:"capsaicin",icon:(typeof FoodImageResolver!=='undefined'?FoodImageResolver.createImgHtml('Chili Pepper','🌶️','rxn-icon-img',20):'🌶️'),intensity:72,
      desc:`캡사이신 ${capMg}mg, LogP=${logP} → 지방상 농축도 ${partCoeff.toExponential(1)}× 증가`,
      effects:["매운맛 강화","기름에 색소 추출","풍미 분산"],
      science:`Nernst 분배법칙: LogP=3.04, Kow≈${partCoeff.toExponential(1)} | 지방상 농축`,
      proDetail:`Appendino et al. (2008) Angew Chem. Nernst 분배법칙: [cap]_지방/[cap]_물 = Kow = 10^LogP = ${partCoeff.toFixed(0)}. 지방 존재시 수상 대비 ${partCoeff.toFixed(0)}배 농축. TRPV1 수용체 결합 활성화 임계농도: ~1μM. 오일에 용해된 캡사이신은 구강 내 분포 균일화 → 지속적 매운맛.`,
      health:"대사↑(TRPV1 활성), 항염(SP 고갈) ↔ 고용량 위점막 자극"});
  }

  // ── Lecithin Emulsification (hydrophilic-lipophilic balance) ──
  if (hasFat && (totalLecithin > 100 || has(d => d.compounds.some(c => c.includes("레시틴"))))) {
    const lecMg = totalLecithin > 0 ? totalLecithin.toFixed(0) : '추정';
    rxns.push({name:"유화 (Emulsification)",key:"emulsification",icon:'<img src="https://images.pexels.com/photos/1028599/pexels-photo-1028599.jpeg?auto=compress&cs=tinysrgb&w=20&h=20&fit=crop" style="width:20px;height:20px;border-radius:4px;object-fit:cover" onerror="this.outerHTML=\'<span>🔄</span>\'">',intensity:60,
      desc:`레시틴 ${lecMg}mg (포스파티딜콜린 HLB≈8) → O/W 에멀전 안정화`,
      effects:["크리미한 질감","소스 안정화","풍미 균일 분배"],
      science:"HLB=8 (Griffin 1954) → O/W 에멀전 | 임계미셀농도(CMC) 의존",
      proDetail:`Griffin (1954) J Soc Cosmet Chem. 레시틴(포스파티딜콜린) HLB≈8, O/W 에멀전 형성. CMC≈0.2mg/mL. 에멀전 안정성: ζ-전위 |>30mV| 조건. 온도↑ → HLB 감소 → 에멀전 불안정화 경향. 계란 레시틴 2-3% wt 기준 안정적 에멀전.`,
      health:"지용성 비타민 흡수율↑, 담즙산 절약 효과"});
  }

  // ── Acid-Protein Coagulation (isoelectric point) ──
  if (hasAcid && hasProt) {
    rxns.push({name:"산-단백질 응고",key:"acid_coagulation",icon:'<img src="https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=20&h=20&fit=crop" style="width:20px;height:20px;border-radius:4px;object-fit:cover" onerror="this.outerHTML=\'<span>⚗️</span>\'">',intensity:55,
      desc:"시트르산이 pH↓ → 단백질 등전점(pI≈4.5-5.5) 도달 → 응집·응고",
      effects:["단백질 응고","pH 저하","살균 효과"],
      science:"pI에서 순전하=0 → 분자간 인력>척력 → 응집 (Tanford 1961)",
      proDetail:`Tanford (1961) Physical Chemistry of Macromolecules. pI 도달시 정전기 반발 소멸 → van der Waals + 소수성 상호작용 우세 → 응집. 카제인 pI≈4.6, 알부민 pI≈4.7. 시트르산 pKa: 3.13, 4.76, 6.40 → pH 조절 완충능↑.`,
      health:"등전점 응고 단백질은 위산(pH1.5-3.5)에서 소화율 개선 가능"});
  }

  // ── Lycopene Bioavailability Enhancement ──
  if (ings.includes("토마토") && (hasFat || temp >= 80)) {
    const bio = hasFat && temp>=80 ? 85 : hasFat ? 60 : 45;
    rxns.push({name:"리코펜 생체이용률↑",key:"lycopene",icon:(typeof FoodImageResolver!=='undefined'?FoodImageResolver.createImgHtml('Tomato','🍅','rxn-icon-img',20):'🍅'),intensity:bio,
      desc:`열+지방 → trans-리코펜→cis변환 및 세포벽 파괴 → 생체이용률 최대 4.3배↑`,
      effects:["리코펜 추출↑","항산화 극대화","색상 강화"],
      science:"가열→세포벽 파괴→trans-to-cis 이성화 | Stahl & Sies (1992)",
      proDetail:`Stahl & Sies (1992) J Nutr 122:2161. cis-이성체 생체이용률은 trans 대비 2.5-4.3배↑(Clinton 1998). 최적조건: 80-100°C·15-20분+지방(오일)→세포벽 파괴+미셀 형성. 리코펜 함량: 생토마토 2.6mg/100g vs 토마토페이스트 29.3mg/100g. 현재 생체이용률 지수: ${bio}%.`,
      health:"리코펜: 전립선암 위험↓(RR 0.79, Giovannucci 1995), LDL 산화↓"});
  }

  // ── PAH Formation: Ea=120 kJ/mol (Phillips 1999, EFSA 2008) ──
  if (hasFat && temp >= 200 && (md.pah_risk || md.medium === 'smoke' || temp >= 300)) {
    const pah = SCI.pahFormation(temp, time) * Math.max(0.3, md.o2_level || 0.7);
    const int = Math.min(100, Math.round(pah * 100));
    if (int > 2) {
      rxns.push({name:"PAH 생성 (다환방향족탄화수소)",key:"pah",icon:'<img src="https://images.pexels.com/photos/2889942/pexels-photo-2889942.jpeg?auto=compress&cs=tinysrgb&w=20&h=20&fit=crop" style="width:20px;height:20px;border-radius:4px;object-fit:cover" onerror="this.outerHTML=\'<span>⚠️</span>\'">',intensity:int,
        desc:`지방 열분해 → 벤조[a]피렌 등 PAH 생성 위험도 ${int}% (IARC Group 1 발암물질)`,
        effects:["벤조[a]피렌 생성","표면 탄화 침착","발암물질 축적"],
        science:`k(T)=A·exp(-Ea/RT) | Ea=120kJ/mol, A=2×10⁹ | Phillips (1999) Mutation Res 443:139`,
        proDetail:`EFSA (2008) J EFSA 724. 벤조[a]피렌(BaP): 지방 열분해→라디칼 고리화→다환 방향족 축합. EU 규제 한도: 훈제식품 BaP<2μg/kg (Reg. 835/2011). 직접 화염 접촉시 BaP 최대 130μg/kg. 간접 열원·물받이 사용으로 90% 이상 감소. 마리네이드(산성)로 최대 70% 억제.`,
        health:"IARC Group 1 발암물질 — 직접 불꽃 피하고, 탄화부위 제거, 알루미늄 포일 활용 권장"});
    }
  }

  // ── HCA Formation: Ea=80 kJ/mol (Skog 1998, Sugimura 2000) ──
  if (hasProt && temp >= 150 && md.browning && time > 5) {
    const hca = SCI.hcaFormation(temp, time);
    const int = Math.min(100, Math.round(hca * 100));
    if (int > 3) {
      rxns.push({name:"HCA 생성 (이환방향족아민)",key:"hca",icon:'<img src="https://images.pexels.com/photos/3850571/pexels-photo-3850571.jpeg?auto=compress&cs=tinysrgb&w=20&h=20&fit=crop" style="width:20px;height:20px;border-radius:4px;object-fit:cover" onerror="this.outerHTML=\'<span>🔴</span>\'">',intensity:int,
        desc:`크레아틴+아미노산+당류 → PhIP 등 HCA 생성 위험도 ${int}% (IARC Group 2A)`,
        effects:["PhIP·MeIQx 생성","고온·장시간 조리시 급증","표면 부착"],
        science:`k(T)=A·exp(-Ea/RT) | Ea=80kJ/mol | Skog et al. (1998) Food Chem Toxicol 36:879`,
        proDetail:`Sugimura (2000) Mutation Res 447:17. PhIP(2-amino-1-methyl-6-phenylimidazo[4,5-b]pyridine): 가장 흔한 HCA. 크레아틴(근육)+유리아미노산+포도당 → Strecker 분해 → 고리화. 조리 전 마리네이드(로즈마리, 올리브오일)로 최대 90% 감소 (Smith 2008). 뒤집기 빈도↑로 표면온도↓→HCA↓.`,
        health:"IARC Group 2A 발암물질 — 마리네이드, 저온조리, 자주 뒤집기로 최소화"});
    }
  }

  // ── Nitrosamine: Ea=95 kJ/mol (Honikel 2008, IARC Monograph 114) ──
  const hasNitrite = ings.some(n => ['베이컨','소시지','햄','핫도그','살라미'].includes(n));
  if (hasNitrite && temp >= 130) {
    const nit = SCI.nitrosamineFormation(temp, time);
    const int = Math.min(100, Math.round(nit * 100));
    if (int > 1) {
      rxns.push({name:"니트로사민 생성",key:"nitrosamine",icon:'<img src="https://images.pexels.com/photos/3850571/pexels-photo-3850571.jpeg?auto=compress&cs=tinysrgb&w=20&h=20&fit=crop" style="width:20px;height:20px;border-radius:4px;object-fit:cover" onerror="this.outerHTML=\'<span>☢️</span>\'">',intensity:int,
        desc:`아질산염+2차 아민 → NDMA 등 니트로사민 생성 위험도 ${int}% (IARC Group 1)`,
        effects:["N-니트로소디메틸아민(NDMA) 생성","고온 가공육에서 급증"],
        science:`Ea=95kJ/mol | Honikel (2008) Meat Sci 78:68 | IARC Monograph 114`,
        proDetail:`IARC (2018) Monograph 114. 가공육은 IARC Group 1 발암물질(대장암). 아질산나트륨(E250) → NO + 2차아민 → 니트로사민. 비타민 C(아스코르브산) 첨가로 니트로사민 생성 최대 90% 억제 (Mirvish 1994 Cancer Lett). 직접 화염 조리 시 니트로사민 3-4배 증가.`,
        health:"IARC Group 1 — 가공육 고온 조리 최소화, 비타민C 풍부 채소와 함께 섭취"});
    }
  }

  // ── Anthocyanin Degradation: Ea=75 kJ/mol (Patras 2010) ──
  const hasAnthocyanin = has(d => d.compounds?.some(c => c.includes("안토시아닌")));
  if (hasAnthocyanin && temp >= 60) {
    const ret = SCI.anthocyaninRetention(temp, time);
    const loss = Math.min(99, Math.round((1-ret)*100));
    if (loss > 5) {
      rxns.push({name:"안토시아닌 열분해",key:"anthocyanin",icon:(typeof FoodImageResolver!=='undefined'?FoodImageResolver.createImgHtml('Blueberry','🫐','rxn-icon-img',20):'🫐'),intensity:loss,
        desc:`안토시아닌 ${loss}% 분해 — 항산화 색소 손실 (잔존율 ${100-loss}%)`,
        effects:["적/보라 색상 퇴색","항산화 능력 감소","갈변화"],
        science:`1차 반응: Ea=75kJ/mol | Patras et al. (2010) Trends Food Sci Technol 21:3`,
        proDetail:`Patras (2010). 안토시아닌: pH<3에서 적색(flavylium cation, 안정), pH>7에서 청/녹→무색. 열분해: chalcone 개환 → 무색 화합물. 최적보존: pH<4, 50°C 이하 단시간, 빛 차단, 금속이온(Cu²⁺, Fe³⁺) 회피. 동결-해동도 세포벽 파괴로 방출↑.`,
        health:`잔존 ${100-loss}% — 짧은 조리, 산성 환경(레몬즙), 저온으로 보존 극대화`});
    }
  }

  // ── Chlorophyll Degradation: Ea=68 kJ/mol (Schwartz & von Elbe 1983) ──
  const hasChlorophyll = has(d => d.compounds?.some(c => c.includes("클로로필")));
  if (hasChlorophyll && temp >= 60) {
    const ret = SCI.chlorophyllRetention(temp, time);
    const loss = Math.min(99, Math.round((1-ret)*100));
    if (loss > 5) {
      rxns.push({name:"클로로필 분해 → 페오피틴",key:"chlorophyll",icon:(typeof FoodImageResolver!=='undefined'?FoodImageResolver.createImgHtml('Spinach','🥬','rxn-icon-img',20):'<img src="https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=20&h=20&fit=crop" style="width:20px;height:20px;border-radius:4px;object-fit:cover" onerror="this.outerHTML=\'<span>🥬</span>\'">'),intensity:loss,
        desc:`클로로필 ${loss}% 분해 → 페오피틴(올리브색) 전환 (Mg²⁺ 치환)`,
        effects:["선명 녹색 → 올리브/갈색","Mg²⁺ 이탈","시각 품질 감소"],
        science:`1차 반응: Ea=68kJ/mol | Schwartz & von Elbe (1983) J Food Sci 48:1303`,
        proDetail:`Schwartz (1983). 클로로필→페오피틴: 산(pH<5) 또는 열에 의해 포르피린 고리 중심 Mg²⁺이 2H⁺로 치환. 클로로필 a(청녹)→페오피틴 a(올리브), 클로로필 b(황녹)→페오피틴 b. 보존법: 약알칼리(베이킹소다 소량), 짧은 블랜칭(30초), 급냉(얼음물).`,
        health:`녹색 채소는 짧은 고온 조리(블랜칭 30초→급냉) 또는 스팀으로 색·영양 동시 보존`});
    }
  }

  // ── Beta-Carotene Isomerization (Chen & Huang 1998) ──
  const hasBetaCarotene = has(d => d.compounds?.some(c => c.includes("베타카로틴") || c.includes("카로티노이드")));
  if (hasBetaCarotene && temp >= 60 && hasFat) {
    const isom = SCI.betaCaroteneIsomer(temp, time);
    const int = Math.min(100, Math.round(isom * 100));
    if (int > 5) {
      rxns.push({name:"베타카로틴 이성화 (생체이용률↑)",key:"beta_carotene",icon:(typeof FoodImageResolver!=='undefined'?FoodImageResolver.createImgHtml('Carrot','🥕','rxn-icon-img',20):'🥕'),intensity:int,
        desc:`trans→cis 이성화 ${int}% 진행 + 지방 공존 → 생체이용률 최대 6.5배↑`,
        effects:["cis-이성체 생성","미셀 가용성 증가","지용성 흡수 극대화"],
        science:`Ea≈50kJ/mol | Chen & Huang (1998) J Food Sci 63:751`,
        proDetail:`Chen & Huang (1998). all-trans-β-carotene → 9-cis, 13-cis, 15-cis 이성체 생성. cis-이성체: 결정성↓, 미셀 가용성↑ → 소장 흡수율 3.5-6.5배 증가 (Deming 2002, Am J Clin Nutr). 최적조건: 80-100°C, 10-20분, 식용유(올리브오일) 5-10mL 동시 조리. 비타민A 전구체로서 면역·시력 유지 필수.`,
        health:"당근·호박·고구마는 기름과 함께 가열 조리 시 프로비타민A 흡수 극대화"});
    }
  }

  // ── Glucosinolate → Sulforaphane (Verkerk 2009, Matusheski 2004) ──
  const hasCruciferous = ings.some(n => ['브로콜리','양배추','케일','콜리플라워','배추','무','갓','루꼴라','겨자'].includes(n));
  if (hasCruciferous) {
    const hydro = SCI.glucosinolateHydrolysis(temp, time);
    const int = Math.min(100, Math.round(hydro * 100));
    // 설포라판 수율: 60-70°C 최적 (마이로시네이즈 활성), >80°C에서 효소 불활성→저수율
    const sulfoYield = temp <= 70 ? Math.round(hydro * 80) : temp <= 100 ? Math.round(hydro * 30) : Math.round(hydro * 10);
    rxns.push({name:"글루코시놀레이트 가수분해",key:"glucosinolate",icon:(typeof FoodImageResolver!=='undefined'?FoodImageResolver.createImgHtml('Broccoli','🥦','rxn-icon-img',20):'🥦'),intensity:int,
      desc:`십자화과 글루코시놀레이트 ${int}% 가수분해 → 설포라판 수율 약 ${sulfoYield}%`,
      effects:["설포라판(SFN) 생성","이소티오시아네이트 방출","항암 효소 활성화"],
      science:`마이로시네이즈: 최적 30-40°C | 열분해: Ea=90kJ/mol | Verkerk (2009)`,
      proDetail:`Verkerk et al. (2009) Food Chem Toxicol 47:16. 글루코시놀레이트 → (마이로시네이즈) → 이소티오시아네이트(설포라판). 마이로시네이즈 최적: 30-40°C, 60-70°C에서 잔존 활성. >75°C 효소 완전 불활성화 → 열분해 경로(니트릴 생성↑, 설포라판↓). Matusheski (2004): 60°C 10분 처리 시 설포라판 수율 최대. 장내 세균 마이로시네이즈로 부분 보상 가능.`,
      health:`설포라판: Nrf2 경로 활성화 → 해독효소(GST) 유도, 항암(Zhang 1992 PNAS). ${temp<=70?'현재 온도에서 효소 활성→높은 수율':'고온에서 효소 불활성→잘게 썰어 상온 방치 후 조리 권장'}`});
  }

  // ── Polyphenol Oxidation (Yoruk & Marshall 2003) ──
  const hasPolyphenol = has(d => d.compounds?.some(c => c.includes("폴리페놀") || c.includes("카테킨") || c.includes("퀘르세틴") || c.includes("탄닌")));
  if (hasPolyphenol && temp < 80 && temp >= 15 && method !== 'raw') {
    const ox = SCI.polyphenolOxidation(temp, time);
    const int = Math.min(100, Math.round(ox * 100));
    if (int > 5) {
      rxns.push({name:"폴리페놀 효소적 갈변 (PPO)",key:"polyphenol_oxidation",icon:(typeof FoodImageResolver!=='undefined'?FoodImageResolver.createImgHtml('Apple','🍎','rxn-icon-img',20):'🍎'),intensity:int,
        desc:`폴리페놀옥시다아제(PPO) 활성 → 효소적 갈변 ${int}% 진행`,
        effects:["갈변(melanin 생성)","항산화 능력 감소","풍미 변화"],
        science:`PPO 최적 40°C, >70°C 불활성 | Yoruk & Marshall (2003)`,
        proDetail:`Yoruk & Marshall (2003) J Food Biochem 27:361. 기질: catechol, chlorogenic acid → PPO → o-quinone → melanin 중합. 억제방법: (1) 산처리(pH<3 → 레몬즙/구연산), (2) 70°C 이상 가열(블랜칭), (3) 비타민C(환원제), (4) NaCl 침지. 최적 pH 5-7, 최적 온도 35-45°C.`,
        health:"레몬즙(산성화), 블랜칭(효소 불활성), 물 침지(산소 차단)로 갈변 억제"});
    }
  }

  // ── Method-specific warnings (METHODS 데이터 기반) ────────────────────────
  if (temp>=250) warns.push({type:"경고",msg:"250°C 이상: PAH(다환방향족탄화수소) 및 HCA(이환아민) 생성 → IARC Group 2A 발암물질 위험"});
  if (md.pah_risk) warns.push({type:"주의",msg:`${md.label} — 연소·훈연 PAH(벤조피렌 등) 표면 침착 위험 (o2 노출도 ${Math.round((md.o2_level||0)*100)}%) — 탄화 부위 제거 권장`});
  if (md.medium==='oil' && time>15) warns.push({type:"주의",msg:`장시간 유침 조리(${time}분): 과산화지질(LOOH) 누적, 발연점 초과 여부 확인 권장`});
  if ((md.pressure_atm||1)>1.1) warns.push({type:"정보",msg:`압력 조리(${md.pressure_atm}atm) → 비등점 약 ${Math.round(100 + (md.pressure_atm-1)*27)}°C, 단백질 변성·전분 호화 촉진 — 영양소 보존률은 저온 장시간 조리보다 우수`});
  if (md.medium==='mw' && md.uniformity==='low') warns.push({type:"주의",msg:"마이크로파 유전 가열: 국소 핫스팟 발생 → 온도 불균일(±20°C), 중간에 저어주기 권장"});
  if ((md.leach_factor||0)>=0.8 && time>30) warns.push({type:"정보",msg:`장시간 수침 조리(${time}분): 수용성 영양소(B군, C, 칼륨) 조리수로 용출 최대 ${Math.round((md.leach_factor||0)*90)}% — 국물도 함께 섭취 권장`});
  if (md.medium==='none' && method==='ferment') {
    rxns.push({name:"발효 (Fermentation)",key:"fermentation",icon:'<img src="https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=20&h=20&fit=crop" style="width:20px;height:20px;border-radius:4px;object-fit:cover" onerror="this.outerHTML=\'<span>🧫</span>\'">',intensity:70,
      desc:"미생물 대사로 유기산·알코올·항균 펩타이드 생성 → 풍미·저장성·프로바이오틱스↑",
      effects:["젖산·초산 생성(pH↓)","단백질 가수분해","프로바이오틱스 증식","비타민 B군 증가"],
      science:"젖산균 Lactobacillus: 포도당→젖산 (Embden-Meyerhof 경로, ΔG=-196kJ/mol)",
      proDetail:"젖산 발효: 포도당 → 2 젖산 (ΔG°=-196kJ/mol). pH 3.5-4.5 도달 시 유해균 억제. 프로테아제 활성화 → 펩타이드·아미노산 증가 → 감칠맛↑. 비타민 B12·K2·엽산 신생합성 가능. ACE억제 펩타이드(혈압↓), GABA(신경안정) 생성.",
      health:"프로바이오틱스, 단쇄지방산(SCFA) 생산 → 장내 미생물 다양성↑, 면역 조절"});
  }
  if (md.medium==='water' && md.pressure_atm===1.0 && method==='sous_vide') {
    warns.push({type:"정보",msg:`수비드 저온 장시간(${temp}°C/${time}분): 정밀 온도 제어로 단백질 변성도 최적화 가능 — 단, 63°C 미만에서 가금류 사용 시 살모넬라 살균 시간 확인 필요`});
  }
  return {rxns, warns};
}

// ── Nutrition Retention: USDA Nutrient Retention Factors Release 6 (2007) ──
function calcNutrition(ingMap, method, temp, time) {
  const ings = Object.keys(ingMap);
  const n = {};
  ings.forEach(name => {
    const d = DB[name]; if (!d) return;
    const grams = ingMap[name] || 100;
    const scale = grams / 100;
    Object.entries(d.vit).forEach(([k,v]) => {
      if (!n[k]) n[k] = {orig:0, cooked:0};
      n[k].orig += v * scale;
    });
  });
  const waterSol = ["C","B1","B2","B6","B12","folate","niacin"];
  const mData = METHODS[method] || {};
  const idx = SCI.methodIdx(method);
  // leach_factor: 수용성 영양소 용출 보정 (boil=0.9 → 최대 35% 추가 감소, steam=0.2 → 7% 추가 감소)
  const leachPenalty = (mData.leach_factor || 0) * 0.35;
  Object.keys(n).forEach(k => {
    const baseRet = SCI.USDA[k]?.[idx] ?? (waterSol.includes(k) ? 0.75 : 0.90);
    const isWS = waterSol.includes(k);
    // Vitamin C uses Arrhenius kinetics; others use USDA table with time correction
    let r;
    if (k === "C" && temp >= 60) {
      r = SCI.vitCRetention(temp, time);
      // USDA method factor still applies (e.g. boiling leaches more than steaming)
      r *= (SCI.USDA.C?.[idx] ?? 0.65) / (SCI.USDA.C?.[4] ?? 1.0); // scale vs raw
      r = Math.max(0.05, Math.min(1, r));
    } else {
      r = SCI.timeCorrect(baseRet, time, isWS);
    }
    // 수용성 영양소는 조리수 용출 추가 감소 적용
    if (isWS) r = Math.max(0.05, r * (1 - leachPenalty));
    n[k].cooked = Math.round(n[k].orig * r * 100) / 100;
    n[k].ret = Math.round(r * 100);
  });
  return n;
}

// ── Flavor Prediction: Stevens Power Law + Umami Synergy (Yamaguchi 1991, Breslin & Beauchamp 1997) ──
function predictFlavor(ingMap, method, temp, time) {
  const ings = Object.keys(ingMap);
  const raw = {umami:0, sweet:0, salty:0, sour:0, bitter:0};
  let totalG = 0;
  // ── Accumulate sci-sourced glutamate, IMP, GMP for umami synergy ────
  ings.forEach(name => {
    const d = DB[name]; if (!d) return;
    const g = ingMap[name] || 100;
    totalG += g;
    Object.keys(raw).forEach(t => { raw[t] += (d.flavor[t]||0) * g; });
  });
  if (totalG > 0) Object.keys(raw).forEach(t => { raw[t] /= totalG; });

  // Use sci quantitative data (USDA FoodData Central) for umami synergy
  // Glutamate in g/serving; IMP+GMP in mg/serving converted to relative units
  const totalGlutamate = ings.reduce((s,n) => {
    const d = DB[n]; if (!d) return s;
    const g = ingMap[n] || 0;
    // sci.glu preferred; fallback: free_glu (mg→g) + protein-fraction estimate
    const glu = d.sci?.glu ?? (d.sci?.free_glu ? d.sci.free_glu/1000 : (d.amino?.includes?.('글루탐산') ? (d.comp?.protein||0)*0.16 : 0));
    return s + glu * g / 100;
  }, 0);
  const totalInosinate = ings.reduce((s,n) => s + (DB[n]?.sci?.imp ?? 0) * (ingMap[n]||0) / 100, 0); // mg
  const totalGuanylate = ings.reduce((s,n) => s + (DB[n]?.sci?.gmp ?? 0) * (ingMap[n]||0) / 100, 0); // mg
  // Combined nucleotide (IMP + GMP additive for synergy, Yamaguchi 1991)
  const totalNucleotide = totalInosinate + totalGuanylate; // mg

  // Umami synergy: MSG+IMP multiplier up to 8× (Yamaguchi & Ninomiya 1998, J Nutr)
  const synergy = SCI.umamiSynergy(totalGlutamate, totalNucleotide / 10); // convert mg→relative scale
  raw.umami = Math.min(100, raw.umami * synergy);

  // Maillard/Caramelization boost to umami and sweet (from reaction extents)
  if (temp >= 140) {
    const mExt = SCI.maillardExtent(temp, time);
    raw.umami = Math.min(100, raw.umami + mExt * 25);   // glutamate release + pyrazines
    raw.sweet = Math.min(100, raw.sweet + mExt * 10);
    raw.bitter = Math.min(100, raw.bitter + Math.max(0, mExt - 0.7) * 30); // over-reaction bitterness
  }
  if (temp >= 120) {
    const cExt = SCI.caramelExtent(temp, time);
    raw.sweet = Math.min(100, raw.sweet + cExt * 15);
    raw.bitter = Math.min(100, raw.bitter + Math.max(0, cExt - 0.6) * 20);
  }

  // Taste interaction: salt suppresses bitter and sour (Breslin & Beauchamp 1997, Nature)
  const saltFactor = 1 - (raw.salty / 100) * 0.35;
  raw.bitter = Math.max(0, raw.bitter * saltFactor);
  raw.sour   = Math.max(0, raw.sour   * saltFactor);

  // Method effects: boil/steam leaches water-soluble flavor compounds
  if (["boil","steam"].includes(method)) {
    raw.salty  *= 0.80; raw.sour  *= 0.85; raw.umami *= 0.88;
  }
  // Long cooking: umami nucleotides degrade above 30min (Mau 2000, J Agric Food Chem)
  if (time > 30) {
    raw.umami = Math.min(100, raw.umami * (1 - (time-30)/120 * 0.20));
    raw.sweet = Math.min(100, raw.sweet * 1.05);
  }

  // Apply Stevens Power Law: perceived = 100 · (physical/100)^n
  const b = {};
  Object.keys(raw).forEach(t => { b[t] = SCI.stevens(raw[t], t); });
  return b;
}

// ── Render Results ──
let currentTab = "reactions";
let lastAnalysisResult = null; // 마지막 분석 결과 저장 (보고서용)

async function runAnalysis() {
  if (window._analysisRunning) return;
  window._analysisRunning = true;
  try {
  if (!selCount()) return;
  // Daily limit check (DB 또는 localStorage 기반)
  const allowed = await checkDailyLimit('analysis');
  if (!allowed) {
    alert(`무료 플랜의 일일 분석 횟수(${getPlanLimit('analysis')}회)를 초과했습니다.\n프로 플랜으로 업그레이드하면 더 많이 분석할 수 있습니다.`);
    openPricingModal();
    return;
  }
  const temp = +document.getElementById("tempSlider").value;
  const time = +document.getElementById("timeSlider").value;
  const {rxns, warns} = analyze(selected, method, temp, time);
  const nutrition = calcNutrition(selected, method, temp, time);
  const flavor = predictFlavor(selected, method, temp, time);

  // 분석 결과 보고서용 전역 저장 + 레시피 캐시 초기화
  lastAnalysisResult = { rxns, warns, nutrition, flavor, temp, time };
  _cachedRecipes = null;
  _ytCache = {};

  // 분석 결과 DB에 저장 (비동기 — UI 블로킹 없음)
  saveAnalysisToHistory({ reactions: rxns, nutrition, flavor, health: null }).catch(e => console.warn('히스토리 저장 실패:', e));

  document.getElementById("emptyState").style.display = "none";
  const res = document.getElementById("results");
  res.style.display = "block";

  // Destroy old charts
  Object.values(charts).forEach(c => c.destroy());
  charts = {};

  let html = '<div class="fade-in">';

  // Warnings
  warns.forEach(w => {
    html += `<div class="warning ${w.type==='경고'?'error':'warn'}"><img src="https://images.pexels.com/photos/2889942/pexels-photo-2889942.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='⚠️'"> <span><strong>[${w.type}]</strong> ${w.msg}</span></div>`;
  });

  // Health analysis
  // 모든 멤버에 대해 건강 분석 수행
  const allMembersHealth = {};
  members.forEach(m => {
    const hr = analyzeHealth(selected, method, temp, time, m);
    if (hr.length > 0) allMembersHealth[m.id] = {member: m, results: hr};
  });
  const hasHealth = Object.keys(allMembersHealth).length > 0;

  // Tabs + Export
  html += `<div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;flex-wrap:wrap">
    <div class="tabs" style="flex:1;margin-bottom:0">
      <button class="tab-btn ${currentTab==='reactions'?'active':''}" onclick="switchTab('reactions')"><img src="https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='🧪'"> 화학 반응</button>
      <button class="tab-btn ${currentTab==='nutrition'?'active':''}" onclick="switchTab('nutrition')"><img src="https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='📊'"> 영양소 변화</button>
      <button class="tab-btn ${currentTab==='flavor'?'active':''}" onclick="switchTab('flavor')"><img src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='🍽️'"> 맛 프로파일</button>
      ${hasHealth ? `<button class="tab-btn ${currentTab==='health'?'active':''}" onclick="switchTab('health')"><img src="https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='🏥'"> 건강 분석</button>` : ''}
      <button class="tab-btn ${currentTab==='recipes'?'active':''}" onclick="switchTab('recipes')"><img src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='🍴'"> 레시피 추천</button>
    </div>
    <button class="export-btn" onclick="exportReport()" title="${userPlan==='free'?'프로 플랜 필요':'보고서 다운로드'}"><img src="https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='📥'"> 보고서${userPlan==='free'?' <span class="pro-badge">PRO</span>':''}</button>
  </div>`;

  // Reactions tab
  html += `<div id="tab-reactions" style="display:${currentTab==='reactions'?'block':'none'}">`;
  if (rxns.length === 0) {
    html += `<div class="empty-state"><div class="big-icon"><img src="https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&fit=crop" style="width:48px;height:48px;border-radius:8px;object-fit:cover" onerror="this.outerHTML='🧪'"></div><p style="color:rgba(255,255,255,0.6);margin-top:12px">특별한 화학 반응이 예측되지 않습니다</p><p style="font-size:13px;color:rgba(255,255,255,0.6)">온도를 높이거나 재료를 추가해보세요</p></div>`;
  } else {
    rxns.forEach((r, idx) => {
      const barColor = r.intensity>70 ? "linear-gradient(90deg,#f97316,#ef4444)" : r.intensity>40 ? "linear-gradient(90deg,#eab308,#f97316)" : "linear-gradient(90deg,#22c55e,#eab308)";
      const refKey = RXN_REF_MAP[r.key] || null;
      const ref = refKey ? REFERENCES[refKey] : null;
      const conf = ref ? ref.confidence : null;
      const uncert = r.intensity > 0 ? Math.round(r.intensity * (ref ? (100-ref.confidence)/100 : 0.15)) : 0;
      html += `<div class="rxn-card">
        <div class="rxn-header">
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
            <span class="rxn-icon">${r.icon}</span>
            <span class="rxn-name">${r.name}</span>
            ${conf ? `<span class="rxn-confidence">신뢰도 ${conf}%</span>` : ''}
          </div>
          <div style="display:flex;align-items:center;gap:10px">
            ${ref ? `<button class="ref-toggle" onclick="toggleRef('rxn${idx}')"><img src="https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='📖'"> 출처</button>` : ''}
            <div style="text-align:right;min-width:80px">
              <div style="font-size:11px;color:rgba(255,255,255,0.6);margin-bottom:4px">반응 강도</div>
              <div class="intensity-bar"><div class="intensity-fill" style="width:${r.intensity}%;background:${barColor}"></div></div>
              <div style="font-size:11px;color:rgba(255,255,255,0.6);margin-top:2px">${r.intensity}%${proMode && uncert ? ` (±${uncert}%)` : ''}</div>
            </div>
          </div>
        </div>
        <p style="font-size:13px;color:rgba(255,255,255,0.6);line-height:1.6;margin-bottom:12px">${r.desc}</p>
        <div style="margin-bottom:12px">${r.effects.map(e => `<span class="effect-tag">${e}</span>`).join("")}</div>
        <div class="science-box"><h4>과학적 메커니즘</h4><p>${r.science}</p></div>
        ${proMode ? `<div class="science-box" style="border-color:rgba(139,92,246,0.3);background:rgba(139,92,246,0.1)"><h4 style="color:#a78bfa">전문가 상세</h4><p>${r.proDetail || '상세 동역학 데이터는 해당 반응의 원문 논문을 참조하세요.'}</p></div>` : ''}
        <div class="health-box"><h4>건강 영향</h4><p>${r.health}</p></div>
        ${ref ? `<div class="ref-detail" id="ref-rxn${idx}">
          <strong>📖 참고 문헌</strong><br>
          ${ref.papers.map(p => `${p.authors} (${p.year}). "${p.title}". <em>${p.journal}</em>${p.vol ? ', '+p.vol : ''}${p.pages ? ', pp.'+p.pages : ''}${p.doi ? '. DOI: '+p.doi : ''}`).join('<br><br>')}
        </div>` : ''}
      </div>`;
    });
  }
  html += "</div>";

  // Nutrition tab
  html += `<div id="tab-nutrition" style="display:${currentTab==='nutrition'?'block':'none'}">
    <div class="grid2">
      <div class="card"><h3 style="font-size:14px;font-weight:600;margin-bottom:16px;color:#F5F5F5">영양소 조리 전후 비교</h3>
        <div class="chart-wrap"><canvas id="nutChart" height="300"></canvas></div>
      </div>
      <div class="card"><h3 style="font-size:14px;font-weight:600;margin-bottom:16px;color:#F5F5F5">시간별 비타민 잔존율 (%)</h3>
        <div class="chart-wrap"><canvas id="timeChart" height="300"></canvas></div>
      </div>
    </div>
    <div class="card" style="margin-top:16px">
      <h3 style="font-size:14px;font-weight:600;margin-bottom:16px;color:#F5F5F5">상세 영양소 변화</h3>
      <table>
        <thead><tr><th>영양소</th><th style="text-align:right">조리 전</th><th style="text-align:right">조리 후</th><th style="text-align:right">잔존율</th><th style="width:35%">시각화</th></tr></thead>
        <tbody>${Object.entries(nutrition).filter(([,v])=>v.orig>0).map(([k,v]) => {
          const color = v.ret>=80?"#22c55e":v.ret>=60?"#eab308":"#ef4444";
          return `<tr><td style="color:#F5F5F5">${k}</td><td style="text-align:right;color:rgba(255,255,255,0.6)">${Math.round(v.orig*10)/10}</td><td style="text-align:right;color:#F5F5F5;font-weight:500">${Math.round(v.cooked*10)/10}</td><td style="text-align:right;font-weight:600;color:${color}">${v.ret}%</td><td><div class="ret-bar"><div class="ret-fill" style="width:${v.ret}%;background:${color}"></div></div></td></tr>`;
        }).join("")}</tbody>
      </table>
    </div>
  </div>`;

  // Flavor tab
  const flavorColors = {umami:"#6366f1",sweet:"#f97316",salty:"#3b82f6",sour:"#eab308",bitter:"#8b5cf6"};
  const flavorNames = {umami:"감칠맛",sweet:"단맛",salty:"짠맛",sour:"신맛",bitter:"쓴맛"};
  const flavorDescs = {umami:"글루탐산, 이노신산에 의한 깊은 맛",sweet:"당류, 마이야르 반응 산물",salty:"나트륨, 미네랄",sour:"유기산(시트르산 등)",bitter:"폴리페놀, 캐러멜화 산물"};

  html += `<div id="tab-flavor" style="display:${currentTab==='flavor'?'block':'none'}">
    <div class="grid2">
      <div class="card"><h3 style="font-size:14px;font-weight:600;margin-bottom:8px;color:#F5F5F5">예상 맛 프로파일</h3>
        <div class="chart-wrap"><canvas id="flavorChart" height="320"></canvas></div>
      </div>
      <div class="card"><h3 style="font-size:14px;font-weight:600;margin-bottom:16px;color:#F5F5F5">맛 분석 상세</h3>
        ${Object.entries(flavor).map(([k,v]) => `<div class="flavor-detail">
          <div class="flavor-label"><span style="font-size:14px;font-weight:600;color:${flavorColors[k]}">${flavorNames[k]}</span><span style="font-size:20px;font-weight:700;color:${flavorColors[k]}">${v}</span></div>
          <div class="flavor-bar"><div class="flavor-fill" style="width:${v}%;background:${flavorColors[k]}"></div></div>
          <div class="flavor-desc">${flavorDescs[k]}</div>
        </div>`).join("")}
      </div>
    </div>
    <div class="card" style="margin-top:16px">
      <h3 style="font-size:14px;font-weight:600;margin-bottom:16px;color:#F5F5F5">재료별 핵심 풍미 화합물</h3>
      <div class="compound-grid">
        ${selNames().map(n => { const d=DB[n]; if(!d) return ""; return `<div class="compound-card">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><span style="font-size:22px">${d.emoji}</span><span style="font-weight:600;color:#F5F5F5;font-size:14px">${n} (${selected[n]}g)</span></div>
          <div>${d.compounds.map(c => `<span class="compound-tag">${c}</span>`).join("")}</div>
        </div>`; }).join("")}
      </div>
    </div>
  </div>`;

  // Health tab
  if (hasHealth) {
    html += `<div id="tab-health" style="display:${currentTab==='health'?'block':'none'}">`;

    // 총 성분 요약 (첫 번째 결과에서 composition 사용)
    const firstResults = Object.values(allMembersHealth)[0];
    const comp = firstResults.results[0].composition;
    html += `<div class="card" style="margin-bottom:16px">
      <h3 style="font-size:14px;font-weight:600;margin-bottom:12px;color:#F5F5F5"><img src="https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='📋'"> 투입 재료 총 성분 요약</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:8px">
        ${[
          {l:'칼로리',v:comp.calories.toFixed(0)+'kcal',c:'#f97316'},
          {l:'단백질',v:comp.protein.toFixed(1)+'g',c:'#ef4444'},
          {l:'지방',v:comp.fat.toFixed(1)+'g',c:'#eab308'},
          {l:'탄수화물',v:comp.carbs.toFixed(1)+'g',c:'#3b82f6'},
          {l:'식이섬유',v:comp.fiber.toFixed(1)+'g',c:'#22c55e'},
          {l:'나트륨',v:comp.sodium.toFixed(0)+'mg',c:'#a855f7'},
          {l:'칼륨',v:comp.potassium.toFixed(0)+'mg',c:'#06b6d4'},
          {l:'포화지방',v:comp.saturatedFat.toFixed(1)+'g',c:'#f43f5e'},
        ].map(n => `<div style="background:rgba(255,255,255,0.04);border-radius:10px;padding:10px;text-align:center;border:1px solid rgba(255,255,255,0.08)">
          <div style="font-size:11px;color:rgba(255,255,255,0.6);margin-bottom:4px">${n.l}</div>
          <div style="font-size:16px;font-weight:700;color:${n.c}">${n.v}</div>
        </div>`).join('')}
      </div>
    </div>`;

    // 각 멤버별 분석 결과
    Object.entries(allMembersHealth).forEach(([memberId, memberData]) => {
      const member = memberData.member;
      const healthResults = memberData.results;

      // 멤버 헤더
      html += `<div style="margin-top:16px;padding:12px;border-radius:12px;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.2);margin-bottom:12px">
        <div style="font-size:14px;font-weight:600;color:#10B981"><img src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='👤'"> ${member.name}${member.age ? ' (' + member.age + '세)' : ''}</div>
      </div>`;

      healthResults.forEach(hr => {
        // 종합 점수
        const scoreColor = hr.score >= 70 ? '#22c55e' : hr.score >= 40 ? '#eab308' : '#ef4444';
        const scoreBg = hr.score >= 70 ? 'rgba(34,197,94,.1)' : hr.score >= 40 ? 'rgba(234,179,8,.1)' : 'rgba(239,68,68,.1)';
        const scoreLabel = hr.score >= 70 ? '양호' : hr.score >= 40 ? '주의 필요' : '위험';

        // SVG circular progress
        const circumference = 2 * Math.PI * 34;
        const dashoffset = circumference - (hr.score / 100) * circumference;
        const svgHtml = `<svg width="80" height="80" style="transform:rotate(-90deg);margin:0 auto">
          <circle cx="40" cy="40" r="34" fill="#fafafa" stroke="#e5e5e5" stroke-width="2"/>
          <circle cx="40" cy="40" r="34" fill="none" stroke="${scoreColor}" stroke-width="2.5" stroke-dasharray="${circumference}" stroke-dashoffset="${dashoffset}" style="transition:stroke-dashoffset 0.8s ease"/>
          <text x="40" y="45" text-anchor="middle" font-size="22" font-weight="700" fill="${scoreColor}" style="pointer-events:none">${hr.score}</text>
        </svg>`;

        html += `<div class="health-score" style="background:${scoreBg};border:1px solid ${scoreColor}30">
          <div class="score-circle" style="position:relative;background:rgba(255,255,255,0.04);border:none;display:flex;align-items:center;justify-content:center">${svgHtml}</div>
          <div>
            <div style="font-size:16px;font-weight:700;color:${scoreColor}">${hr.emoji} ${hr.label} 적합도: ${scoreLabel}</div>
            <div style="font-size:12px;color:rgba(255,255,255,0.6);margin-top:2px">${hr.desc} · ${hr.findings.length}개 항목 분석됨</div>
          </div>
        </div>`;

        // 개별 findings
        if (hr.findings.length === 0) {
          html += `<div class="card" style="margin-bottom:12px;text-align:center;color:rgba(255,255,255,0.45);padding:30px">
            <p>현재 재료 조합에서 ${hr.label} 관련 특이사항이 없습니다.</p>
          </div>`;
        } else {
          hr.findings.forEach(f => {
            const sevClass = f.severity;
            const sevLabel = {danger:'위험',caution:'주의',good:'긍정',info:'참고'}[f.severity];
            const sevIcon = {danger:'<img src="https://images.pexels.com/photos/3850571/pexels-photo-3850571.jpeg?auto=compress&cs=tinysrgb&w=20&h=20&fit=crop" style="width:20px;height:20px;border-radius:4px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML=\'<span>🚫</span>\'">',caution:'<img src="https://images.pexels.com/photos/2889942/pexels-photo-2889942.jpeg?auto=compress&cs=tinysrgb&w=20&h=20&fit=crop" style="width:20px;height:20px;border-radius:4px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML=\'<span>⚠️</span>\'">',good:'<img src="https://images.pexels.com/photos/586030/pexels-photo-586030.jpeg?auto=compress&cs=tinysrgb&w=20&h=20&fit=crop" style="width:20px;height:20px;border-radius:4px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML=\'<span>✅</span>\'">',info:'<img src="https://images.pexels.com/photos/355952/pexels-photo-355952.jpeg?auto=compress&cs=tinysrgb&w=20&h=20&fit=crop" style="width:20px;height:20px;border-radius:4px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML=\'<span>ℹ️</span>\'">'}[f.severity];
            html += `<div class="health-card ${sevClass}">
              <div style="display:flex;align-items:center;margin-bottom:6px">
                <span class="health-severity sev-${sevClass}">${sevIcon} ${sevLabel}</span>
                <span style="font-size:14px;font-weight:600;color:#F5F5F5">${f.title}</span>
              </div>
              <div class="health-detail">${f.detail}</div>
              ${f.tip ? `<div class="health-tip"><img src="https://images.pexels.com/photos/355952/pexels-photo-355952.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='💡'"> <strong>개선 팁:</strong> ${f.tip}</div>` : ''}
            </div>`;
          });
        }
      });
    });

    html += `<div style="margin-top:16px;padding:12px;border-radius:12px;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.2);font-size:12px;color:#10B981">
      ⚕️ 이 분석은 일반적인 영양학 지식에 기반한 참고 정보이며, 개인의 건강 상태에 따라 다를 수 있습니다. 구체적인 식이 관리는 반드시 담당 의료진과 상담하세요.
    </div>`;
    html += "</div>";
  }

  // ── Recipes tab (lazy loaded) ─────────────────────────────────────────
  const member0 = members[0] || {};
  html += `<div id="tab-recipes" style="display:${currentTab==='recipes'?'block':'none'}">
    <div class="cuisine-bar">
      <span class="cuisine-label"><img src="https://images.pexels.com/photos/87651/pexels-photo-87651.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='🌍'"> 요리 국가:</span>
      <button class="cuisine-chip active" data-country="" onclick="selectCuisine(this,'')">자동</button>
      <button class="cuisine-chip" data-country="kr" onclick="selectCuisine(this,'kr')">🇰🇷 한국</button>
      <button class="cuisine-chip" data-country="jp" onclick="selectCuisine(this,'jp')">🇯🇵 일본</button>
      <button class="cuisine-chip" data-country="cn" onclick="selectCuisine(this,'cn')">🇨🇳 중국</button>
      <button class="cuisine-chip" data-country="th" onclick="selectCuisine(this,'th')">🇹🇭 태국</button>
      <button class="cuisine-chip" data-country="vn" onclick="selectCuisine(this,'vn')">🇻🇳 베트남</button>
      <button class="cuisine-chip" data-country="in" onclick="selectCuisine(this,'in')">🇮🇳 인도</button>
      <button class="cuisine-chip" data-country="it" onclick="selectCuisine(this,'it')">🇮🇹 이탈리아</button>
      <button class="cuisine-chip" data-country="fr" onclick="selectCuisine(this,'fr')">🇫🇷 프랑스</button>
      <button class="cuisine-chip" data-country="us" onclick="selectCuisine(this,'us')">🇺🇸 미국</button>
      <button class="cuisine-chip" data-country="mx" onclick="selectCuisine(this,'mx')">🇲🇽 멕시코</button>
      <button class="cuisine-chip" data-country="tr" onclick="selectCuisine(this,'tr')">🇹🇷 터키</button>
      <button class="cuisine-chip" data-country="lb" onclick="selectCuisine(this,'lb')">🇱🇧 레바논</button>
      <button class="cuisine-chip" data-country="de" onclick="selectCuisine(this,'de')">🇩🇪 독일</button>
      <button class="cuisine-chip" data-country="gr" onclick="selectCuisine(this,'gr')">🇬🇷 그리스</button>
      <button class="cuisine-chip" data-country="id" onclick="selectCuisine(this,'id')">🇮🇩 인도네시아</button>
      <button class="cuisine-chip" data-country="pe" onclick="selectCuisine(this,'pe')">🇵🇪 페루</button>
    </div>
    <div id="recipeList"><div class="yt-loading"><img src="https://images.pexels.com/photos/1028599/pexels-photo-1028599.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='🍳'"> AI가 레시피를 추천하는 중...</div></div>
  </div>`;

  html += "</div>";
  res.innerHTML = html;

  // Trigger recipe loading
  _pendingRecipeLoad = { ethnicity: member0.ethnicity, country: member0.country || '', conditions: member0.conditions || [], traits: member0.traits || [] };
  if (currentTab === 'recipes') loadRecipes('');

  // Draw Charts
  setTimeout(() => {
    // Nutrition Bar Chart
    const nutEntries = Object.entries(nutrition).filter(([,v])=>v.orig>0).slice(0,8);
    if (nutEntries.length > 0) {
      const ctx1 = document.getElementById("nutChart");
      if (ctx1) {
        charts.nut = new Chart(ctx1, {
          type: "bar",
          data: {
            labels: nutEntries.map(([k])=>k),
            datasets: [
              {label:"조리 전", data:nutEntries.map(([,v])=>Math.round(v.orig*10)/10), backgroundColor:"rgba(255,255,255,0.3)", borderRadius:4},
              {label:"조리 후", data:nutEntries.map(([,v])=>Math.round(v.cooked*10)/10), backgroundColor:"#10B981", borderRadius:4},
            ]
          },
          options: {responsive:true, plugins:{legend:{labels:{color:"rgba(255,255,255,0.6)"}}}, scales:{x:{ticks:{color:"rgba(255,255,255,0.6)"},grid:{color:"rgba(255,255,255,0.06)"}},y:{ticks:{color:"rgba(255,255,255,0.6)"},grid:{color:"rgba(255,255,255,0.06)"}}}}
        });
      }
    }

    // Time Series Line Chart
    const hasVitC = nutrition.C && nutrition.C.orig > 0;
    const hasVitB6 = nutrition.B6 && nutrition.B6.orig > 0;
    if (hasVitC || hasVitB6) {
      const times = [0,5,10,15,20,30,45,60];
      const datasets = [];
      if (hasVitC) {
        datasets.push({label:"비타민C 잔존율(%)", data:times.map(t => calcNutrition(selected,method,temp,t).C?.ret??100), borderColor:"#f97316", backgroundColor:"rgba(249,115,22,.1)", tension:.3, fill:true});
      }
      if (hasVitB6) {
        datasets.push({label:"비타민B6 잔존율(%)", data:times.map(t => calcNutrition(selected,method,temp,t).B6?.ret??100), borderColor:"#22c55e", backgroundColor:"rgba(34,197,94,.1)", tension:.3, fill:true});
      }
      const ctx2 = document.getElementById("timeChart");
      if (ctx2) {
        charts.time = new Chart(ctx2, {
          type:"line",
          data:{labels:times.map(t=>t+"분"), datasets},
          options:{responsive:true, plugins:{legend:{labels:{color:"rgba(255,255,255,0.6)"}}}, scales:{x:{ticks:{color:"rgba(255,255,255,0.6)"},grid:{color:"rgba(255,255,255,0.06)"}},y:{min:0,max:100,ticks:{color:"rgba(255,255,255,0.6)"},grid:{color:"rgba(255,255,255,0.06)"}}}}
        });
      }
    }

    // Radar Chart
    const ctx3 = document.getElementById("flavorChart");
    if (ctx3) {
      charts.flavor = new Chart(ctx3, {
        type: "radar",
        data: {
          labels: Object.keys(flavor).map(k => flavorNames[k]),
          datasets: [{
            label: "맛 강도",
            data: Object.values(flavor),
            backgroundColor: "rgba(16,185,129,.12)",
            borderColor: "#10B981",
            borderWidth: 2,
            pointBackgroundColor: "#10B981",
            pointBorderColor: "#161819",
            pointRadius: 4,
          }]
        },
        options: {
          responsive: true,
          scales: {
            r: {
              beginAtZero: true, max: 100,
              grid: {color:"rgba(255,255,255,0.06)"},
              angleLines: {color:"rgba(255,255,255,0.06)"},
              pointLabels: {color:"rgba(255,255,255,0.6)", font:{size:13}},
              ticks: {color:"rgba(255,255,255,0.45)", backdropColor:"transparent", stepSize:25}
            }
          },
          plugins: {legend:{labels:{color:"rgba(255,255,255,0.6)"}}}
        }
      });
    }
  }, 50);
  } finally {
    setTimeout(function() { window._analysisRunning = false; }, 1000);
  }
}

function switchTab(tab) {
  currentTab = tab;
  ["reactions","nutrition","flavor","health","recipes"].forEach(t => {
    const el = document.getElementById("tab-" + t);
    if (el) el.style.display = t === tab ? "block" : "none";
  });
  document.querySelectorAll(".tab-btn").forEach(btn => {
    const txt = btn.textContent;
    const t = txt.includes('화학') ? 'reactions'
            : txt.includes('영양') ? 'nutrition'
            : txt.includes('맛')   ? 'flavor'
            : txt.includes('건강') ? 'health'
            : txt.includes('레시피') ? 'recipes'
            : 'reactions';
    btn.className = "tab-btn" + (t === tab ? " active" : "");
  });
  // Lazy-load recipes on first visit to tab
  if (tab === 'recipes' && _pendingRecipeLoad) {
    const country = document.querySelector('.cuisine-chip.active')?.dataset?.country || '';
    loadRecipes(country);
  }
}

// ══════════════════════════════════════════════════
// RECIPE RECOMMENDATION + YOUTUBE
// ══════════════════════════════════════════════════

let _pendingRecipeLoad = null;
let _cachedRecipes = null;   // { country, recipes }
let _ytCache = {};           // { `${recipeIdx}_${order}`: videos[] }

const COUNTRY_LANG = {
  kr:{lang:'ko',region:'KR'}, jp:{lang:'ja',region:'JP'}, cn:{lang:'zh-Hans',region:'CN'},
  th:{lang:'th',region:'TH'}, vn:{lang:'vi',region:'VN'}, in:{lang:'hi',region:'IN'},
  it:{lang:'it',region:'IT'}, fr:{lang:'fr',region:'FR'}, us:{lang:'en',region:'US'},
  mx:{lang:'es',region:'MX'}, tr:{lang:'tr',region:'TR'}, lb:{lang:'ar',region:'LB'},
  de:{lang:'de',region:'DE'}, gr:{lang:'el',region:'GR'}, id:{lang:'id',region:'ID'},
  pe:{lang:'es',region:'PE'},
};

function selectCuisine(btn, country) {
  document.querySelectorAll('.cuisine-chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  // Reload recipes only if country changed
  const prev = _cachedRecipes?.country;
  if (prev !== country) {
    _cachedRecipes = null;
    _ytCache = {};
    document.getElementById('recipeList').innerHTML = '<div class="yt-loading"><img src="https://images.pexels.com/photos/1028599/pexels-photo-1028599.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML=\'🍳\'"> AI가 레시피를 추천하는 중...</div>';
    loadRecipes(country);
  }
}

async function loadRecipes(country) {
  if (!lastAnalysisResult) return;
  if (_cachedRecipes && _cachedRecipes.country === country) {
    renderRecipeList(_cachedRecipes.recipes);
    return;
  }
  const member0 = _pendingRecipeLoad || {};
  const ingredients = Object.entries(selected).map(([name, grams]) => ({ name, grams }));
  try {
    const r = await fetch(`${API_BASE}/api/recommend-recipes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ingredients,
        method,
        temp: lastAnalysisResult.temp,
        time: lastAnalysisResult.time,
        conditions: member0.conditions || [],
        traits: member0.traits || [],
        ethnicity: member0.ethnicity || null,
        country: country || null,
        userLang: getUserLang(),
      }),
    });
    const data = await r.json();
    if (!r.ok || data.error) throw new Error(data.error || '알 수 없는 오류');
    _cachedRecipes = { country, recipes: data.recipes };
    renderRecipeList(data.recipes);
  } catch (e) {
    const el = document.getElementById('recipeList');
    if (el) el.innerHTML = `<div class="yt-error">레시피 추천 실패: ${e.message}</div>`;
  }
}

function renderRecipeList(recipes) {
  const el = document.getElementById('recipeList');
  if (!el) return;
  if (!recipes || recipes.length === 0) {
    el.innerHTML = '<div class="yt-loading">추천 레시피가 없습니다.</div>';
    return;
  }
  const ytIcon = `<svg viewBox="0 0 24 24"><path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/></svg>`;
  el.innerHTML = recipes.map((r, i) => `
    <div class="recipe-card">
      <div class="recipe-card-header" onclick="toggleYtPanel(${i})">
        <div class="recipe-num">${i+1}</div>
        <div class="recipe-title-wrap">
          <div class="recipe-title">${r.name}</div>
          <div class="recipe-title-en">${r.name_en}</div>
          <div class="recipe-meta">
            <span class="recipe-tag cuisine">${r.cuisine}</span>
            <span class="recipe-tag diff-${r.difficulty}">${r.difficulty}</span>
            ${r.allergens?.length ? `<span class="recipe-tag" style="background:rgba(249,115,22,0.15);color:#fb923c;border:1px solid rgba(249,115,22,0.3)"><img src="https://images.pexels.com/photos/2889942/pexels-photo-2889942.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='⚠'"> ${r.allergens.join(', ')}</span>` : ''}
          </div>
        </div>
      </div>
      <div class="recipe-body">
        <div class="recipe-desc">${r.description}</div>
        ${r.healthNote ? `<div class="recipe-health"><img src="https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='💚'"> ${r.healthNote}</div>` : ''}
        ${r.usedIngredients?.length ? `<div class="recipe-ings">${r.usedIngredients.map(ing=>`<span class="recipe-ing">${ing}</span>`).join('')}</div>` : ''}
      </div>
      <div class="recipe-yt-footer">
        <button class="recipe-save-btn" onclick="event.stopPropagation();typeof saveRecipe==='function'?saveRecipe(${i}):showToast('Recipe Box not loaded')"><img src="https://images.pexels.com/photos/1178684/pexels-photo-1178684.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='💾'"> ${(window.I18n&&I18n.lang==='en')?'Save':'저장'}</button>
        <button class="yt-open-btn" id="yt-btn-${i}" onclick="event.stopPropagation();toggleYtPanel(${i})">${ytIcon} YouTube ${(window.I18n&&I18n.lang==='en')?'Videos':'레시피 영상 보기'}</button>
      </div>
      <div class="yt-panel" id="yt-panel-${i}">
        <div class="yt-panel-inner">
          <div class="yt-sort-bar">
            <span class="yt-sort-label">${(window.I18n&&I18n.lang==='en')?'Sort:':'정렬:'}</span>
            <button class="yt-sort-btn active" onclick="loadYt(${i},'${escQ(r.youtubeQuery)}','relevance',this)"><img src="https://images.pexels.com/photos/210661/pexels-photo-210661.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='🔍'"> ${(window.I18n&&I18n.lang==='en')?'Relevant':'관련도순'}</button>
            <button class="yt-sort-btn" onclick="loadYt(${i},'${escQ(r.youtubeQuery)}','date',this)"><img src="https://images.pexels.com/photos/273153/pexels-photo-273153.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='📅'"> ${(window.I18n&&I18n.lang==='en')?'Newest':'최신순'}</button>
            <button class="yt-sort-btn" onclick="loadYt(${i},'${escQ(r.youtubeQuery)}','viewCount',this)"><img src="https://images.pexels.com/photos/2156881/pexels-photo-2156881.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='👁'"> ${(window.I18n&&I18n.lang==='en')?'Views':'조회수순'}</button>
            <button class="yt-sort-btn" onclick="loadYt(${i},'${escQ(r.youtubeQuery)}','rating',this)"><img src="https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='👍'"> ${(window.I18n&&I18n.lang==='en')?'Likes':'좋아요순'}</button>
          </div>
          <div id="yt-videos-${i}"></div>
        </div>
      </div>
    </div>`).join('');
}

function escQ(s) { return (s || '').replace(/'/g, "\\'").replace(/"/g, '&quot;'); }

function toggleYtPanel(idx) {
  const panel = document.getElementById(`yt-panel-${idx}`);
  const btn   = document.getElementById(`yt-btn-${idx}`);
  if (!panel) return;
  const opening = panel.style.display !== 'block';
  panel.style.display = opening ? 'block' : 'none';
  if (btn) btn.classList.toggle('open', opening);
  if (opening && !_ytCache[`${idx}_relevance`]) {
    const q = _cachedRecipes?.recipes?.[idx]?.youtubeQuery || '';
    loadYt(idx, q, 'relevance', panel.querySelector('.yt-sort-btn'));
  }
}

async function loadYt(idx, query, order, btn) {
  // Update sort button styles
  const panel = document.getElementById(`yt-panel-${idx}`);
  if (panel) panel.querySelectorAll('.yt-sort-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const cacheKey = `${idx}_${order}`;
  const videosEl = document.getElementById(`yt-videos-${idx}`);
  if (!videosEl) return;

  if (_ytCache[cacheKey]) { renderYtVideos(videosEl, _ytCache[cacheKey]); return; }

  videosEl.innerHTML = '<div class="yt-loading"><img src="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML=\'🎬\'"> YouTube에서 영상을 검색하는 중...</div>';

  // Country lang params
  const activeCountry = document.querySelector('.cuisine-chip.active')?.dataset?.country || '';
  const { lang = 'ko', region = 'KR' } = COUNTRY_LANG[activeCountry] || COUNTRY_LANG['kr'];

  try {
    const params = new URLSearchParams({ q: query, order, maxResults: '12', lang, region });
    const r = await fetch(`${API_BASE}/api/youtube-search?${params}`);
    const data = await r.json();
    if (!r.ok || data.error) throw new Error(data.error || '검색 실패');
    _ytCache[cacheKey] = data.videos;
    renderYtVideos(videosEl, data.videos);
  } catch (e) {
    videosEl.innerHTML = `<div class="yt-error">YouTube 검색 실패: ${e.message}</div>`;
  }
}

function renderYtVideos(container, videos) {
  if (!videos || videos.length === 0) {
    container.innerHTML = '<div class="yt-loading">검색 결과가 없습니다.</div>';
    return;
  }
  const playLg = `<svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>`;
  const playSm = `<svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>`;
  const [feat, ...rest] = videos;
  const featHtml = `
    <div class="yt-feat" onclick="openYtVideo('${feat.id}','${escQ(feat.title)}')" style="cursor:pointer">
      <div class="yt-feat-thumb">
        <img src="${feat.thumbnail.replace('mqdefault','hqdefault')}" alt="${feat.title}" loading="lazy">
        <div class="yt-feat-play">${playLg}</div>
        <span class="yt-feat-badge">BEST</span>
        ${feat.duration ? `<span class="yt-feat-dur">${feat.duration}</span>` : ''}
      </div>
      <div class="yt-feat-info">
        <div class="yt-feat-title">${feat.title}</div>
        <div class="yt-feat-meta">
          <span class="yt-feat-channel"><img src="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='📺'"> ${feat.channel}</span>
          <span class="yt-feat-stat"><img src="https://images.pexels.com/photos/2156881/pexels-photo-2156881.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='👁'"> ${fmtNum(feat.viewCount)}</span>
          <span class="yt-feat-stat"><img src="https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='👍'"> ${fmtNum(feat.likeCount)}</span>
          <span class="yt-feat-stat"><img src="https://images.pexels.com/photos/273153/pexels-photo-273153.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='📅'"> ${fmtDate(feat.publishedAt)}</span>
        </div>
      </div>
    </div>`;
  const gridHtml = rest.length ? `
    <div class="yt-grid">
      ${rest.map(v => `
        <div class="yt-card" onclick="openYtVideo('${v.id}','${escQ(v.title)}')" style="cursor:pointer">
          <div class="yt-thumb">
            <img src="${v.thumbnail}" alt="${v.title}" loading="lazy">
            <div class="yt-play">${playSm}</div>
            ${v.duration ? `<span class="yt-dur">${v.duration}</span>` : ''}
          </div>
          <div class="yt-info">
            <div class="yt-vtitle">${v.title}</div>
            <div class="yt-vchannel">${v.channel}</div>
            <div class="yt-vstats">
              <span class="yt-vstat"><img src="https://images.pexels.com/photos/2156881/pexels-photo-2156881.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='👁'"> ${fmtNum(v.viewCount)}</span>
              <span class="yt-vstat"><img src="https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='👍'"> ${fmtNum(v.likeCount)}</span>
              <span class="yt-vstat"><img src="https://images.pexels.com/photos/273153/pexels-photo-273153.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='📅'"> ${fmtDate(v.publishedAt)}</span>
            </div>
          </div>
        </div>`).join('')}
    </div>` : '';
  container.innerHTML = featHtml + gridHtml;
}

function getUserLang() {
  const country = _pendingRecipeLoad?.country || '';
  if (country && COUNTRY_LANG[country]) return COUNTRY_LANG[country].lang;
  const ethnicity = _pendingRecipeLoad?.ethnicity || '';
  return ({east_asian:'ko',southeast_asian:'vi',south_asian:'hi',caucasian:'en',african:'fr',hispanic:'es',middle_eastern:'ar'})[ethnicity] || 'ko';
}

function openYtVideo(videoId, title) {
  const lang = getUserLang();
  const modal = document.getElementById('ytModal');
  if (!modal) return;
  document.getElementById('ytModalTitle').textContent = title;
  document.getElementById('ytIframeWrap').innerHTML =
    `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&cc_load_policy=1&hl=${lang}&cc_lang_pref=${lang}&rel=0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen></iframe>`;
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeYtModal() {
  const modal = document.getElementById('ytModal');
  if (!modal) return;
  modal.classList.remove('show');
  document.body.style.overflow = '';
  setTimeout(() => { const w = document.getElementById('ytIframeWrap'); if (w) w.innerHTML = ''; }, 340);
}

function fmtNum(n) {
  if (!n) return '0';
  if (n >= 1e8) return (n/1e8).toFixed(1) + '억';
  if (n >= 1e4) return (n/1e4).toFixed(1) + '만';
  if (n >= 1000) return (n/1000).toFixed(1) + 'K';
  return String(n);
}

function fmtDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  const diff = Date.now() - d;
  const days = Math.floor(diff / 86400000);
  if (days < 1)   return '오늘';
  if (days < 7)   return `${days}일 전`;
  if (days < 30)  return `${Math.floor(days/7)}주 전`;
  if (days < 365) return `${Math.floor(days/30)}개월 전`;
  return `${Math.floor(days/365)}년 전`;
}

// ══════════════════════════════════════════════════
// HISTORY UI (분석 기록 UI)
// ══════════════════════════════════════════════════
async function toggleHistory() {
  const panel = document.getElementById('historyPanel');
  if (panel.style.display === 'none') {
    panel.style.display = 'block';
    await renderHistory();
  } else {
    panel.style.display = 'none';
  }
}

async function renderHistory() {
  const list = document.getElementById('historyList');
  const empty = document.getElementById('historyEmpty');
  const countEl = document.getElementById('historyCount');
  if (!list) return;

  const history = await loadAnalysisHistory(20);
  if (!history || history.length === 0) {
    list.innerHTML = '';
    empty.style.display = 'block';
    countEl.textContent = '';
    return;
  }

  empty.style.display = 'none';
  countEl.textContent = `(${history.length}건)`;

  list.innerHTML = history.map(h => {
    const date = new Date(h.created_at).toLocaleString('ko-KR', { month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' });
    const ings = Object.keys(h.ingredients || {}).slice(0, 3).join(', ');
    const more = Object.keys(h.ingredients || {}).length > 3 ? ` 외 ${Object.keys(h.ingredients).length - 3}개` : '';
    const methodData = METHODS[h.method];
    const methodEmoji = methodData?.emoji || '🍳';
    const methodImg = methodData?.img;
    const methodIcon = methodImg
      ? `<img src="${methodImg}" style="width:20px;height:20px;border-radius:4px;object-fit:cover;vertical-align:middle;margin-right:4px" onerror="this.outerHTML='${methodEmoji} '">`
      : `<img src="https://images.pexels.com/photos/1028599/pexels-photo-1028599.jpeg?auto=compress&cs=tinysrgb&w=20&h=20&fit=crop" style="width:20px;height:20px;border-radius:4px;object-fit:cover;vertical-align:middle;margin-right:4px" onerror="this.outerHTML='${methodEmoji} '">`;
    return `<div class="history-item" style="padding:12px;border-bottom:1px solid rgba(255,255,255,0.06);cursor:pointer;transition:background .2s" onclick="replayAnalysis('${h.id}')" onmouseover="this.style.background='rgba(16,185,129,0.08)'" onmouseout="this.style.background=''">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-size:14px;font-weight:500">${methodIcon}${ings}${more}</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.6);margin-top:2px">${h.temperature}°C · ${h.duration}분 · ${date}</div>
        </div>
        <div style="display:flex;gap:6px;align-items:center">
          ${h.is_bookmarked ? '<span style="color:#eab308"><img src="https://images.pexels.com/photos/1537086/pexels-photo-1537086.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML=\'⭐\'"></span>' : ''}
          <button onclick="event.stopPropagation();toggleBookmark('${h.id}').then(()=>renderHistory())" style="border:none;background:none;cursor:pointer;font-size:14px;opacity:.5" title="북마크">${h.is_bookmarked ? '<img src="https://images.pexels.com/photos/1537086/pexels-photo-1537086.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML=\'⭐\'">' : '☆'}</button>
        </div>
      </div>
    </div>`;
  }).join('');
}

async function replayAnalysis(id) {
  // 히스토리에서 분석을 다시 로드
  if (!sbClient || !currentUser?.id) return;
  const data = await dbQuery('analysis_history', 'select', { eq: { id } });
  if (!data || !data[0]) return;

  const h = data[0];
  // 재료 복원
  selected = h.ingredients || {};
  method = h.method || 'pan_fry';
  if (h.temperature) document.getElementById('tempSlider').value = h.temperature;
  if (h.duration) document.getElementById('timeSlider').value = h.duration;

  // UI 갱신
  renderIngredients();
  renderMethods();
  updateSliderLabels();
  document.getElementById('historyPanel').style.display = 'none';

  // 분석 재실행
  runAnalysis();
}

function updateSliderLabels() {
  const temp = document.getElementById('tempSlider');
  const time = document.getElementById('timeSlider');
  if (temp) { const lbl = document.getElementById('tempVal'); if (lbl) lbl.textContent = temp.value + '°C'; }
  if (time) { const lbl = document.getElementById('timeVal'); if (lbl) lbl.textContent = time.value + '분'; }
}

// ══════════════════════════════════════════════════
// FEEDBACK UI
// ══════════════════════════════════════════════════
function openFeedbackModal() {
  document.getElementById('feedbackModal').style.display = 'flex';
}
function closeFeedbackModal() {
  document.getElementById('feedbackModal').style.display = 'none';
  document.getElementById('feedbackMsg').value = '';
}
async function submitFeedback() {
  const type = document.getElementById('feedbackType').value;
  const msg = document.getElementById('feedbackMsg').value.trim();
  if (!msg) { alert('메시지를 입력해주세요'); return; }
  const success = await sendFeedback(type, msg);
  if (success) {
    alert('피드백이 전송되었습니다. 감사합니다!');
    closeFeedbackModal();
  } else {
    alert('전송에 실패했습니다. 다시 시도해주세요.');
  }
}

// Boot
init();
// Add bottom padding so content isn't hidden behind dev nav
document.body.style.paddingBottom = '48px';

function devGoMain() {
  closePricingModal();
  document.getElementById('feedbackModal').style.display = 'none';
  document.getElementById('historyPanel').style.display = 'none';
  profileOpen = false;
  const pp = document.getElementById('profilePanel');
  if (pp) pp.style.display = 'none';
  const tog = document.getElementById('profileToggle');
  if (tog) tog.textContent = '프로필 입력 ▼';
  document.getElementById('results').style.display = 'none';
  document.getElementById('emptyState').style.display = '';
  hideLoginPage();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function devGoProfile() {
  devGoMain();
  document.getElementById('emptyState').style.display = 'none';
  profileOpen = true;
  const pp = document.getElementById('profilePanel');
  if (pp) pp.style.display = 'block';
  const tog = document.getElementById('profileToggle');
  if (tog) tog.textContent = '프로필 접기 ▲';
  setTimeout(() => pp && pp.scrollIntoView({ behavior:'smooth', block:'start' }), 100);
}

async function devGoHistory() {
  devGoMain();
  const hp = document.getElementById('historyPanel');
  hp.style.display = 'block';
  await renderHistory();
  setTimeout(() => hp.scrollIntoView({ behavior:'smooth', block:'start' }), 100);
}

function devTab(tab) {
  const res = document.getElementById('results');
  if (!res || !res.innerHTML.trim() || res.style.display === 'none') {
    devRunSample().then(() => setTimeout(() => { switchTab(tab); res.scrollIntoView({ behavior:'smooth', block:'start' }); }, 200));
  } else {
    devGoMain();
    res.style.display = 'block';
    document.getElementById('emptyState').style.display = 'none';
    switchTab(tab);
    setTimeout(() => res.scrollIntoView({ behavior:'smooth', block:'start' }), 100);
  }
}

// ══════════════════════════════════════════════════════════════
// Phase 2: AI Features — Photo Scanner, URL Import
// ══════════════════════════════════════════════════════════════

function openPhotoScanner() {
  const _t = (ko, en) => (window.I18n && I18n.lang === 'en') ? en : ko;
  let overlay = document.getElementById('photoScanOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'photoScanOverlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:8000;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;padding:16px';
    overlay.onclick = e => { if (e.target === overlay) overlay.style.display = 'none'; };
    document.body.appendChild(overlay);
  }
  overlay.style.display = 'flex';
  overlay.innerHTML = `
    <div style="background:#161819;border-radius:16px;max-width:440px;width:100%;max-height:85vh;overflow-y:auto;padding:24px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <h3 style="margin:0;font-size:17px"><img src="https://images.pexels.com/photos/821749/pexels-photo-821749.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='📷'"> ${_t('사진으로 재료 인식', 'Photo Ingredient Scanner')}</h3>
        <button onclick="document.getElementById('photoScanOverlay').style.display='none'" style="background:none;border:none;font-size:20px;cursor:pointer">&times;</button>
      </div>
      <p style="font-size:13px;color:rgba(255,255,255,0.6);margin-bottom:16px">${_t('재료 사진을 촬영하거나 업로드하면 AI가 자동 인식합니다', 'Take or upload a photo of ingredients — AI identifies them automatically')}</p>
      <div style="display:flex;gap:8px;margin-bottom:16px">
        <label style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;padding:12px;border:2px dashed rgba(255,255,255,0.15);border-radius:10px;cursor:pointer;font-size:13px;color:rgba(255,255,255,0.6);transition:border-color .2s" onmouseenter="this.style.borderColor='#10B981'" onmouseleave="this.style.borderColor='rgba(255,255,255,0.15)'">
          <img src="https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='📁'"> ${_t('사진 선택', 'Choose photo')}
          <input type="file" accept="image/*" style="display:none" onchange="_handlePhotoSelect(this)">
        </label>
        <label style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;padding:12px;border:2px dashed rgba(255,255,255,0.15);border-radius:10px;cursor:pointer;font-size:13px;color:rgba(255,255,255,0.6);transition:border-color .2s" onmouseenter="this.style.borderColor='#10B981'" onmouseleave="this.style.borderColor='rgba(255,255,255,0.15)'">
          <img src="https://images.pexels.com/photos/821749/pexels-photo-821749.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='📸'"> ${_t('촬영', 'Take photo')}
          <input type="file" accept="image/*" capture="environment" style="display:none" onchange="_handlePhotoSelect(this)">
        </label>
      </div>
      <div id="photoPreview" style="display:none;text-align:center;margin-bottom:16px">
        <img id="photoPreviewImg" style="max-width:100%;max-height:200px;border-radius:10px;border:1px solid rgba(255,255,255,0.08)">
      </div>
      <div id="photoResults"></div>
    </div>`;
}

async function _handlePhotoSelect(input) {
  const _t = (ko, en) => (window.I18n && I18n.lang === 'en') ? en : ko;
  const file = input.files?.[0];
  if (!file) return;

  // Show preview
  const preview = document.getElementById('photoPreview');
  const img = document.getElementById('photoPreviewImg');
  const results = document.getElementById('photoResults');
  const reader = new FileReader();
  reader.onload = async (e) => {
    const dataUri = e.target.result;
    if (preview) { preview.style.display = 'block'; img.src = dataUri; }
    if (results) results.innerHTML = `<div style="text-align:center;padding:20px;color:rgba(255,255,255,0.45)"><div class="loading-spinner" style="margin:0 auto 8px"></div>${_t('사진 분석 중...', 'Analyzing photo...')}</div>`;

    try {
      const res = await fetch('/api/photo-ingredient', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: dataUri, userLang: I18n?.lang || 'en' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Analysis failed');

      if (!data.ingredients?.length) {
        results.innerHTML = `<div style="text-align:center;padding:16px;color:rgba(255,255,255,0.45)">${_t('이미지에서 식재료를 찾을 수 없습니다', 'No food ingredients detected')}</div>`;
        return;
      }

      let html = `<div style="font-size:13px;font-weight:600;margin-bottom:8px">${_t(data.count + '개 재료 인식', data.count + ' ingredients found')}</div>`;
      html += `<div style="display:flex;flex-direction:column;gap:6px">`;
      data.ingredients.forEach((ing, i) => {
        const conf = ing.confidence === 'high' ? '🟢' : ing.confidence === 'medium' ? '🟡' : '<img src="https://images.pexels.com/photos/3850571/pexels-photo-3850571.jpeg?auto=compress&cs=tinysrgb&w=14&h=14&fit=crop" style="width:14px;height:14px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML=\'<span>🔴</span>\'">';
        html += `<div style="display:flex;align-items:center;gap:8px;padding:8px 10px;background:rgba(255,255,255,0.04);border-radius:8px;font-size:13px">
          ${typeof FoodImageResolver !== 'undefined' ? FoodImageResolver.createImgHtml(ing.name_en || ing.name, ing.emoji || '🥬', 'fi-photo-result', 28) : '<img src="https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=28&h=28&fit=crop" style="width:28px;height:28px;border-radius:4px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML=\'<span>🥬</span>\'">'}
          <span style="flex:1">${I18n?.lang === 'en' ? ing.name_en : ing.name} <span style="color:rgba(255,255,255,0.45);font-size:11px">~${ing.estimatedGrams}g ${conf}</span></span>
          <button onclick="_addPhotoIngredient('${(ing.name_en || ing.name).replace(/'/g,"\\'")}',${ing.estimatedGrams})" style="padding:4px 10px;border:1px solid #10B981;border-radius:6px;background:transparent;color:#10B981;font-size:12px;cursor:pointer;font-weight:600">${_t('추가', 'Add')}</button>
        </div>`;
      });
      html += `</div>`;
      html += `<button onclick="_addAllPhotoIngredients()" style="width:100%;margin-top:10px;padding:10px;border:none;border-radius:8px;background:#10B981;color:#fff;font-size:13px;font-weight:600;cursor:pointer">${_t('전체 추가', 'Add all to selection')}</button>`;
      results.innerHTML = html;
      results._ingredients = data.ingredients;
      if (typeof FoodImageResolver !== 'undefined') FoodImageResolver.scheduleScan();
    } catch (err) {
      results.innerHTML = `<div style="text-align:center;padding:16px;color:#ef4444">${err.message}</div>`;
    }
  };
  reader.readAsDataURL(file);
}

function _addPhotoIngredient(name, grams) {
  // Try to match in DB first
  const dbKey = Object.keys(DB).find(k => {
    const entry = DB[k];
    return k === name || entry.en?.toLowerCase() === name.toLowerCase();
  });
  if (dbKey) {
    selected[dbKey] = grams;
  } else {
    selected[name] = grams;
  }
  renderIngredients();
  showToast(`${name} ${grams}g added`);
}

function _addAllPhotoIngredients() {
  const results = document.getElementById('photoResults');
  const ingredients = results?._ingredients;
  if (!ingredients?.length) return;
  ingredients.forEach(ing => {
    const name = ing.name_en || ing.name;
    const dbKey = Object.keys(DB).find(k => k === name || DB[k].en?.toLowerCase() === name.toLowerCase());
    selected[dbKey || name] = ing.estimatedGrams;
  });
  renderIngredients();
  showToast((window.I18n && I18n.lang === 'en') ? `${ingredients.length} ingredients added` : `${ingredients.length}개 재료 추가됨`);
  document.getElementById('photoScanOverlay').style.display = 'none';
}

// ── URL Recipe Import ──

function openUrlImport() {
  const _t = (ko, en) => (window.I18n && I18n.lang === 'en') ? en : ko;
  let overlay = document.getElementById('urlImportOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'urlImportOverlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:8500;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;padding:16px';
    overlay.onclick = e => { if (e.target === overlay) overlay.style.display = 'none'; };
    document.body.appendChild(overlay);
  }
  overlay.style.display = 'flex';
  overlay.innerHTML = `
    <div style="background:#161819;border-radius:16px;max-width:480px;width:100%;max-height:85vh;overflow-y:auto;padding:24px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <h3 style="margin:0;font-size:17px"><img src="https://images.pexels.com/photos/1591061/pexels-photo-1591061.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='🔗'"> ${_t('URL에서 레시피 가져오기', 'Import Recipe from URL')}</h3>
        <button onclick="document.getElementById('urlImportOverlay').style.display='none'" style="background:none;border:none;font-size:20px;cursor:pointer">&times;</button>
      </div>
      <p style="font-size:13px;color:rgba(255,255,255,0.6);margin-bottom:16px">${_t('레시피 URL을 붙여넣으면 AI가 재료, 단계, 영양 정보를 추출합니다', 'Paste a recipe URL and AI will extract ingredients, steps, and nutrition')}</p>
      <div style="display:flex;gap:8px;margin-bottom:16px">
        <input id="urlImportInput" type="url" placeholder="https://..." style="flex:1;padding:10px 14px;border:1px solid rgba(255,255,255,0.12);border-radius:8px;font-size:14px;background:rgba(255,255,255,0.04);color:#F5F5F5">
        <button onclick="_runUrlImport()" style="padding:10px 18px;border:none;border-radius:8px;background:#10B981;color:#fff;font-size:14px;font-weight:600;cursor:pointer;white-space:nowrap">${_t('가져오기', 'Import')}</button>
      </div>
      <div id="urlImportResults"></div>
    </div>`;
}

async function _runUrlImport() {
  const _t = (ko, en) => (window.I18n && I18n.lang === 'en') ? en : ko;
  const input = document.getElementById('urlImportInput');
  const results = document.getElementById('urlImportResults');
  const url = input?.value?.trim();
  if (!url) { showToast(_t('URL을 입력하세요', 'Enter a URL')); return; }

  results.innerHTML = `<div style="text-align:center;padding:20px;color:rgba(255,255,255,0.45)"><div class="loading-spinner" style="margin:0 auto 8px"></div>${_t('레시피 추출 중...', 'Extracting recipe...')}</div>`;

  try {
    const res = await fetch('/api/import-recipe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, userLang: I18n?.lang || 'en' }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Import failed');

    const nutr = data.nutrition || {};
    let html = `<div style="border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:16px;margin-bottom:12px">
      <div style="font-size:16px;font-weight:700;margin-bottom:4px">${data.name}</div>
      ${data.name_en ? `<div style="font-size:13px;color:rgba(255,255,255,0.45)">${data.name_en}</div>` : ''}
      ${data.description ? `<div style="font-size:13px;color:rgba(255,255,255,0.6);margin-top:8px">${data.description}</div>` : ''}
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px">
        ${data.cuisine ? `<span class="recipe-tag cuisine">${data.cuisine}</span>` : ''}
        ${data.difficulty ? `<span class="recipe-tag">${data.difficulty}</span>` : ''}
        ${data.duration ? `<span class="recipe-tag"><img src="https://images.pexels.com/photos/2784135/pexels-photo-2784135.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='⏱'"> ${data.duration}min</span>` : ''}
        ${data.servings ? `<span class="recipe-tag"><img src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='🍽'"> ${data.servings} servings</span>` : ''}
      </div>
      ${nutr.calories ? `<div style="font-size:12px;color:rgba(255,255,255,0.6);margin-top:8px">${nutr.calories}kcal · P${nutr.protein||0}g · F${nutr.fat||0}g · C${nutr.carbs||0}g</div>` : ''}
    </div>`;

    if (data.ingredients?.length) {
      html += `<div style="font-size:13px;font-weight:600;margin-bottom:6px">${_t('재료', 'Ingredients')} (${data.ingredients.length})</div>`;
      html += `<div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:12px">`;
      data.ingredients.forEach(ing => {
        html += `<span style="font-size:11px;background:rgba(255,255,255,0.06);padding:3px 8px;border-radius:6px">${ing.emoji||''} ${I18n?.lang==='en' ? ing.name_en||ing.name : ing.name} ${ing.grams}g</span>`;
      });
      html += `</div>`;
    }

    html += `<div style="display:flex;gap:8px">
      <button onclick="_importToAnalysis()" style="flex:1;padding:10px;border:none;border-radius:8px;background:#10B981;color:#fff;font-size:13px;font-weight:600;cursor:pointer">${_t('Mealcule로 분석', 'Analyze with Mealcule')}</button>
      <button onclick="_importToRecipeBox()" style="flex:1;padding:10px;border:1px solid #10B981;border-radius:8px;background:transparent;color:#10B981;font-size:13px;font-weight:600;cursor:pointer">${_t('레시피 박스에 저장', 'Save to Recipe Box')}</button>
    </div>`;

    results.innerHTML = html;
    results._importedRecipe = data;
  } catch (err) {
    results.innerHTML = `<div style="text-align:center;padding:16px;color:#ef4444">${err.message}</div>`;
  }
}

function _importToAnalysis() {
  const results = document.getElementById('urlImportResults');
  const recipe = results?._importedRecipe;
  if (!recipe?.ingredients) return;
  selected = {};
  recipe.ingredients.forEach(ing => {
    const name = ing.name_en || ing.name;
    const dbKey = Object.keys(DB).find(k => k === name || DB[k].en?.toLowerCase() === name.toLowerCase());
    selected[dbKey || name] = ing.grams || 100;
  });
  if (recipe.cookingMethod) {
    const methodKey = Object.keys(METHODS || {}).find(k => k.toLowerCase().includes(recipe.cookingMethod.toLowerCase()));
    if (methodKey) method = methodKey;
  }
  renderIngredients();
  renderMethods();
  document.getElementById('urlImportOverlay').style.display = 'none';
  showToast((window.I18n && I18n.lang === 'en') ? 'Ingredients loaded — ready to analyze!' : '재료 로드 완료 — 분석 준비됨!');
}

async function _importToRecipeBox() {
  const results = document.getElementById('urlImportResults');
  const recipe = results?._importedRecipe;
  if (!recipe) return;
  if (typeof saveRecipe !== 'function' || isGuest || !currentUser) {
    showToast((window.I18n && I18n.lang === 'en') ? 'Please log in to save recipes' : '로그인 후 저장 가능합니다');
    return;
  }
  const row = {
    user_id: currentUser.id,
    name: recipe.name,
    name_en: recipe.name_en || recipe.name,
    description: recipe.description || '',
    cuisine: recipe.cuisine || '',
    difficulty: recipe.difficulty || '',
    health_note: recipe.healthNote || '',
    allergens: recipe.allergens || [],
    youtube_query: recipe.youtubeQuery || '',
    ingredients: (recipe.ingredients || []).map(i => ({ name: i.name, grams: i.grams, en: i.name_en })),
    method: recipe.cookingMethod || '',
    temperature: recipe.temperature || null,
    duration: recipe.duration || null,
    nutrition_snapshot: recipe.nutrition || null,
    source: 'import',
    source_url: recipe.sourceUrl || '',
  };
  const result = await dbQuery('saved_recipes', 'insert', { data: row });
  if (result) {
    showToast((window.I18n && I18n.lang === 'en') ? 'Saved to Recipe Box!' : '레시피 박스에 저장됨!');
    document.dispatchEvent(new CustomEvent('recipe:saved', { detail: result[0] || result }));
  } else {
    showToast((window.I18n && I18n.lang === 'en') ? 'Save failed' : '저장 실패');
  }
}

async function devRunSample() {
  devGoMain();
  // Reset and pre-select sample ingredients
  selected = { '닭가슴살': 150, '마늘': 10, '양파': 80, '올리브 오일': 15 };
  method = 'pan_fry';
  // Sync sliders to reasonable defaults
  const temp = document.getElementById('tempSlider');
  const time = document.getElementById('timeSlider');
  if (temp) temp.value = 180;
  if (time) time.value = 15;
  updateSliderLabels();
  renderIngredients();
  renderMethods();
  await runAnalysis();
}
