// cities 板块目录页的唯一数据源。改这里，9 个语种的目录页同时生效。
// 统计格必须放能在本板块文章里查到的事实，不要放文章数量。

export const LANGS = ['en', 'zh', 'es', 'fr', 'ja', 'ko', 'ar', 'ru', 'th'] as const;
export type Lang = (typeof LANGS)[number];
export type Localized = Record<Lang, string>;

export interface Stat {
  value: string;
  color: "blue" | "indigo" | "emerald" | "amber";
  label: Localized;
}

export interface Group {
  color: string;
  name: Localized;
}

export interface Item {
  slug: string;
  group: number;
  tag: Localized;
  title: Localized;
  desc: Localized;
}

export const STATS: Stat[] = [
  {
    value: "5–7 days",
    color: 'blue',
    label:
    {
      en: "Days to plan",
      zh: "建议停留天数",
      es: "Días a planear",
      fr: "Jours à prévoir",
      ja: "旅程の日数",
      ko: "여행 일수",
      ar: "أيام الرحلة",
      ru: "Дней на поездку",
      th: "จำนวนวัน",
    },
  },
  {
    value: "3 days",
    color: 'indigo',
    label:
    {
      en: "Minimum per city",
      zh: "每城最少天数",
      es: "Mínimo por ciudad",
      fr: "Minimum par ville",
      ja: "1都市の最低日数",
      ko: "도시당 최소 일수",
      ar: "الحد الأدنى للمدينة",
      ru: "Минимум на город",
      th: "ขั้นต่ำต่อเมือง",
    },
  },
  {
    value: "7 days",
    color: 'emerald',
    label:
    {
      en: "Forbidden City booking",
      zh: "故宫提前订票",
      es: "Reserva Ciudad Prohibida",
      fr: "Réservation Cité interdite",
      ja: "故宮は事前予約",
      ko: "자금성 사전 예약",
      ar: "حجز المدينة المحرمة",
      ru: "Бронь Запретного города",
      th: "จองพระราชวังต้องห้าม",
    },
  },
  {
    value: "4.5 h",
    color: 'amber',
    label:
    {
      en: "Beijing–Shanghai by rail",
      zh: "京沪高铁用时",
      es: "Pekín–Shanghái en tren",
      fr: "Pékin–Shanghai en train",
      ja: "北京–上海の鉄道",
      ko: "베이징–상하이 철도",
      ar: "بكين–شنغهاي بالقطار",
      ru: "Пекин–Шанхай поездом",
      th: "ปักกิ่ง–เซี่ยงไฮ้ทางราง",
    },
  },
];

export const GROUPS: Group[] = [
  {
    color: 'purple',
    name:
    {
      en: "Planning Your Trip",
      zh: "行程规划",
      es: "Planificando tu Viaje",
      fr: "Planifier Votre Voyage",
      ja: "旅行計画",
      ko: "여행 계획",
      ar: "التخطيط لرحلتك",
      ru: "Планирование поездки",
      th: "วางแผนทริปของคุณ",
    },
  },
  {
    color: 'red',
    name:
    {
      en: "History & Culture",
      zh: "历史与文化",
      es: "Historia y Cultura",
      fr: "Histoire et Culture",
      ja: "歴史と文化",
      ko: "역사 & 문화",
      ar: "التاريخ والثقافة",
      ru: "История и культура",
      th: "ประวัติศาสตร์และวัฒนธรรม",
    },
  },
  {
    color: 'blue',
    name:
    {
      en: "Modern & Urban",
      zh: "现代与都市",
      es: "Moderno y Urbano",
      fr: "Moderne et Urbain",
      ja: "モダン＆アーバン",
      ko: "현대 & 도시",
      ar: "الحديث والحضري",
      ru: "Современное и городское",
      th: "ทันสมัยและเมือง",
    },
  },
  {
    color: 'emerald',
    name:
    {
      en: "Nature & Scenery",
      zh: "自然与风景",
      es: "Naturaleza y Paisajes",
      fr: "Nature et Paysages",
      ja: "自然と景観",
      ko: "자연 & 경관",
      ar: "الطبيعة والمناظر",
      ru: "Природа и пейзажи",
      th: "ธรรมชาติและทิวทัศน์",
    },
  },
  {
    color: 'orange',
    name:
    {
      en: "Food & Lifestyle",
      zh: "美食与生活方式",
      es: "Comida y Estilo de Vida",
      fr: "Gastronomie et Art de Vivre",
      ja: "グルメとライフスタイル",
      ko: "음식 & 라이프스타일",
      ar: "الطعام وأسلوب الحياة",
      ru: "Еда и образ жизни",
      th: "อาหารและวิถีชีวิต",
    },
  },
];

export const COUNT: Localized = {
  en: "{n} articles",
  zh: "{n} 篇文章",
  es: "{n} artículos",
  fr: "{n} articles",
  ja: "{n}記事",
  ko: "{n}개 문서",
  ar: "{n} مقالات",
  ru: "{n} статьи",
  th: "{n} บทความ",
};


// 只有 1 篇文章的组用这个，避免出现 “1 articles”。
export const COUNT_SINGULAR: Localized = {
  en: "{n} article",
  zh: "{n} 篇文章",
  es: "{n} artículo",
  fr: "{n} article",
  ja: "{n}記事",
  ko: "{n}개 문서",
  ar: "مقالة واحدة",
  ru: "{n} статья",
  th: "{n} บทความ",
};

export const ITEMS: Item[] = [
  {
    slug: "city-select",
    group: 0,
    tag:
    {
      en: "🧭 Planning",
      zh: "🧭 规划",
      es: "🧭 Planificación",
      fr: "🧭 Planification",
      ja: "🧭 計画",
      ko: "🧭 계획",
      ar: "🧭 تخطيط",
      ru: "🧭 Планирование",
      th: "🧭 วางแผน",
    },
    title:
    {
      en: "How Many Days Do You Need in China?",
      zh: "中国旅行需要多少天？",
      es: "¿Cuántos Días Necesitas en China?",
      fr: "Combien de Jours en Chine ?",
      ja: "中国旅行に必要な日数は？",
      ko: "중국 여행, 며칠이 필요할까?",
      ar: "كم يوماً تحتاج في الصين؟",
      ru: "Сколько дней нужно в Китае?",
      th: "ควรเที่ยวจีนกี่วัน?",
    },
    desc:
    {
      en: "Plan the perfect itinerary — from a 3-day whirlwind to a 3-week adventure.",
      zh: "规划完美行程——从3天急速游到3周深度游。",
      es: "Planifica el itinerario perfecto — desde 3 días intensos hasta una aventura de 3 semanas.",
      fr: "Planifiez l'itinéraire parfait — d'un tourbillon de 3 jours à une aventure de 3 semaines.",
      ja: "完璧な旅程を計画 — 3日の弾丸ツアーから3週間の大冒険まで。",
      ko: "완벽한 일정 계획 — 3일 강행군부터 3주 대모험까지.",
      ar: "خطط لرحلتك المثالية — من 3 أيام سريعة إلى 3 أسابيع من المغامرة.",
      ru: "Спланируй идеальный маршрут — от 3-дневного блица до 3-недельного приключения.",
      th: "วางแผน itineraries ที่สมบูรณ์แบบ — จาก 3 วันเร่งด่วนถึง 3 สัปดาห์ผจญภัย",
    },
  },
  {
    slug: "beijing-vs-shanghai",
    group: 0,
    tag:
    {
      en: "⚖️ Beijing vs Shanghai",
      zh: "⚖️ 北京 vs 上海",
      es: "⚖️ Pekín vs Shanghái",
      fr: "⚖️ Pékin vs Shanghai",
      ja: "⚖️ 北京 vs 上海",
      ko: "⚖️ 베이징 vs 상하이",
      ar: "⚖️ بكين أم شنغهاي",
      ru: "⚖️ Пекин vs Шанхай",
      th: "⚖️ ปักกิ่ง vs เซี่ยงไฮ้",
    },
    title:
    {
      en: "Beijing vs Shanghai: Which City Should You Visit First?",
      zh: "北京还是上海：先去哪座城市？",
      es: "Pekín vs Shanghái: ¿Qué ciudad visitar primero?",
      fr: "Pékin vs Shanghai : quelle ville visiter en premier ?",
      ja: "北京 or 上海：最初の一都市は？",
      ko: "베이징 vs 상하이: 어느 도시를 먼저?",
      ar: "بكين أم شنغهاي: أي مدينة تزور أولاً؟",
      ru: "Пекин или Шанхай: какой город посетить первым?",
      th: "ปักกิ่งหรือเซี่ยงไฮ้: ควรไปเมืองไหนก่อน?",
    },
    desc:
    {
      en: "Dynasties or skylines? The honest comparison to pick your first Chinese city.",
      zh: "王朝还是天际线？选第一座中国城市的诚实对比。",
      es: "¿Dinastías o rascacielos? La comparación honesta para elegir tu primera ciudad china.",
      fr: "Dynasties ou gratte-ciel ? La comparaison honnête pour choisir votre première ville chinoise.",
      ja: "王朝かスカイラインか？中国初の都市選びの正直な比較。",
      ko: "왕조인가 스카이라인인가? 첫 중국 도시 선택을 위한 정직한 비교.",
      ar: "الدويلات أم ناطحات السحاب؟ المقارنة الصادقة لاختيار أول مدينة صينية لك.",
      ru: "Династии или небоскрёбы? Честное сравнение для выбора первого китайского города.",
      th: "ราชวงศ์หรือตึกระฟ้า? การเปรียบเทียบอย่างตรงไปตรงมาเพื่อเลือกเมืองจีนเมืองแรกของคุณ",
    },
  },
  {
    slug: "beijing-guide",
    group: 1,
    tag:
    {
      en: "🏛️ Beijing",
      zh: "🏛️ 北京",
      es: "🏛️ Pekín",
      fr: "🏛️ Pékin",
      ja: "🏛️ 北京",
      ko: "🏛️ 베이징",
      ar: "🏛️ بكين",
      ru: "🏛️ Пекин",
      th: "🏛️ ปักกิ่ง",
    },
    title:
    {
      en: "Beijing Travel Guide: What to See, Eat, and Know",
      zh: "北京旅行指南：景点、美食与实用信息",
      es: "Guía de Viaje de Pekín: Qué Ver, Comer y Saber",
      fr: "Guide de Voyage de Pékin : Que Voir, Manger et Savoir",
      ja: "北京旅行ガイド：見どころ、グルメ、知っておくべきこと",
      ko: "베이징 여행 가이드: 볼거리, 먹거리 & 필수 정보",
      ar: "دليل بكين السياحي: ما تراه، ما تأكله، وما تحتاج معرفته",
      ru: "Путеводитель по Пекину: что посмотреть, поесть и знать",
      th: "คู่มือเที่ยวปักกิ่ง: สถานที่เที่ยว อาหาร และสิ่งที่ต้องรู้",
    },
    desc:
    {
      en: "Forbidden City, Great Wall, hutongs, Peking duck, and essential tips.",
      zh: "故宫、长城、胡同、北京烤鸭和必备贴士。",
      es: "Ciudad Prohibida, Gran Muralla, hutongs, pato laqueado y consejos esenciales.",
      fr: "Cité Interdite, Grande Muraille, hutongs, canard laqué et conseils essentiels.",
      ja: "故宮、万里の長城、胡同、北京ダック、そして厳選ヒント。",
      ko: "자금성, 만리장성, 후퉁, 베이징 덕, 필수 팁.",
      ar: "المدينة المحرمة، سور الصين العظيم، الأزقة القديمة، بط بكين، ونصائح أساسية.",
      ru: "Запретный город, Великая стена, хутуны, утка по-пекински и полезные советы.",
      th: "พระราชวังต้องห้าม, กำแพงเมืองจีน, หูถง, เป็ดปักกิ่ง, และเคล็ดลับสำคัญ",
    },
  },
  {
    slug: "forbidden-city",
    group: 1,
    tag:
    {
      en: "🏯 Forbidden City",
      zh: "🏯 故宫",
      es: "🏯 Ciudad Prohibida",
      fr: "🏯 Cité Interdite",
      ja: "🏯 故宮",
      ko: "🏯 자금성",
      ar: "🏯 المدينة المحرمة",
      ru: "🏯 Запретный город",
      th: "🏯 พระราชวังต้องห้าม",
    },
    title:
    {
      en: "Forbidden City Guide: Tickets, Routes, and What to See",
      zh: "故宫参观指南：门票、路线与看点",
      es: "Guía de la Ciudad Prohibida: Entradas, Rutas y Qué Ver",
      fr: "Guide de la Cité Interdite : Billets, Itinéraires et Que Voir",
      ja: "故宮ガイド：チケット、見学ルート、見どころ",
      ko: "자금성 가이드: 입장권, 관람 코스, 볼거리",
      ar: "دليل المدينة المحرمة: التذاكر والمسارات وأهم المعالم",
      ru: "Путеводитель по Запретному городу: билеты, маршруты и что смотреть",
      th: "คู่มือพระราชวังต้องห้าม: ตั๋ว เส้นทาง และสิ่งที่ควรดู",
    },
    desc:
    {
      en: "Tickets, the three official routes, opening hours, and the halls worth your time.",
      zh: "门票预约、三条官方路线、开放时间，以及真正值得看的殿宇。",
      es: "Cómo reservar entradas, las tres rutas oficiales, horarios y los palacios que valen la pena.",
      fr: "Comment réserver, les trois itinéraires officiels, les horaires et les palais qui valent le détour.",
      ja: "予約方法、公式の3ルート、開館時間、そして見る価値のある宮殿。",
      ko: "예약 방법, 공식 3개 코스, 개장 시간, 놓치면 아까운 전각.",
      ar: "كيف تحجز التذاكر، والمسارات الرسمية الثلاثة، وساعات الزيارة، والقاعات التي تستحق وقتك.",
      ru: "Как купить билеты, три официальных маршрута, часы работы и залы, которые стоят времени.",
      th: "วิธีจองตั๋ว เส้นทางทางการ 3 เส้น ชั่วโมงเปิด และตำหนักที่คุ้มค่าเวลา",
    },
  },
  {
    slug: "great-wall",
    group: 1,
    tag:
    {
      en: "🧱 Great Wall",
      zh: "🧱 长城",
      es: "🧱 Gran Muralla",
      fr: "🧱 Grande Muraille",
      ja: "🧱 万里の長城",
      ko: "🧱 만리장성",
      ar: "🧱 سور الصين العظيم",
      ru: "🧱 Великая Китайская стена",
      th: "🧱 กำแพงเมืองจีน",
    },
    title:
    {
      en: "Great Wall of China Guide: Which Section to Visit",
      zh: "长城攻略：该去哪一段",
      es: "Guía de la Gran Muralla de China: Qué sección visitar",
      fr: "Guide de la Grande Muraille de Chine : quelle section visiter",
      ja: "万里の長城ガイド：どの区間に行くべきか",
      ko: "만리장성 가이드: 어느 구간을 가야 할까",
      ar: "دليل سور الصين العظيم: أي قسم تزور؟",
      ru: "Гид по Великой Китайской стене: какой участок выбрать",
      th: "คู่มือกำแพงเมืองจีน: ควรไปด่านไหน",
    },
    desc:
    {
      en: "Compare the six sections — Badaling, Mutianyu, Jinshanling, Simatai, Huanghuacheng and Juyongguan.",
      zh: "六段长城横向对比——八达岭、慕田峪、金山岭、司马台、黄花城与居庸关。",
      es: "Compara las seis secciones: Badaling, Mutianyu, Jinshanling, Simatai, Huanghuacheng y Juyongguan.",
      fr: "Comparez les six sections : Badaling, Mutianyu, Jinshanling, Simatai, Huanghuacheng et Juyongguan.",
      ja: "八達嶺・慕田峪・金山嶺・司馬台・黄花城・居庸関の6区間を比較。",
      ko: "팔달령, 모전욕, 진산령, 사마대, 황화성, 거용관 등 여섯 구간을 비교합니다.",
      ar: "قارن بين الأقسام الستة: بادالينغ وموتيانيو وجينشانلينغ وسيماتاي وهوانغهواچنغ وجويونغقوان.",
      ru: "Сравните шесть участков: Бадалин, Мутяньюй, Цзиньшаньлин, Сыматай, Хуанхуачэн и Цзюйюнгуань.",
      th: "เทียบทั้ง 6 ด่าน — ปาต๋าหลิง มู่เถียนยวี่ จินซานหลิง ซือหมาถาย หวงฮวาเฉิง และจูยงกวน",
    },
  },
  {
    slug: "xi-an-guide",
    group: 1,
    tag:
    {
      en: "🐎 Xi'an",
      zh: "🐎 西安",
      es: "🐎 Xi'an",
      fr: "🐎 Xi'an",
      ja: "🐎 西安",
      ko: "🐎 시안",
      ar: "🐎 شيآن",
      ru: "🐎 Сиань",
      th: "🐎 ซีอาน",
    },
    title:
    {
      en: "Xi'an Travel Guide: What to See, Eat, and Know",
      zh: "西安旅行指南：景点、美食与实用信息",
      es: "Guía de Viaje de Xi'an: Qué Ver, Comer y Saber",
      fr: "Guide de Voyage de Xi'an : Que Voir, Manger et Savoir",
      ja: "西安旅行ガイド：観光スポット、グルメ、知っておくべきこと",
      ko: "시안 여행 가이드: 관광명소, 맛집, 알아두어야 할 것",
      ar: "دليل شيآن السياحي: ماذا ترى، تأكل، وتحتاج معرفته",
      ru: "Путеводитель по Сианю: что посмотреть, поесть и знать",
      th: "คู่มือเที่ยวซีอาน: สถานที่เที่ยว อาหาร และสิ่งที่ต้องรู้",
    },
    desc:
    {
      en: "Terracotta Warriors, the best-preserved city wall in China, and a Silk Road Muslim Quarter.",
      zh: "兵马俑、中国保存最完好的城墙，以及丝绸之路回民街。",
      es: "Guerreros de Terracota, la muralla mejor conservada de China y un barrio musulmán de la Ruta de la Seda.",
      fr: "Guerriers de terre cuite, meilleure muraille conservée de Chine et quartier musulman de la Route de la Soie.",
      ja: "兵馬俑、中国で最も保存状態の良い城壁、シルクロードのムスリム・クォーター。",
      ko: "병마용, 중국에서 가장 잘 보존된 성벽, 실크로드의 무슬림 거리.",
      ar: "جيش الطين، أفضل سور مدينة محفوظ في الصين، وحي مسلم على طريق الحرير.",
      ru: "Терракотовая армия, лучшая сохранившаяся городская стена Китая и мусульманский квартал Шёлкового пути.",
      th: "ทหารดินเผา กำแพงเมืองที่อนุรักษ์ดีที่สุดในจีน และย่านมุสลิมเส้นทางสายไหม",
    },
  },
  {
    slug: "shanghai-guide",
    group: 2,
    tag:
    {
      en: "🌆 Shanghai",
      zh: "🌆 上海",
      es: "🌆 Shanghái",
      fr: "🌆 Shanghai",
      ja: "🌆 上海",
      ko: "🌆 상하이",
      ar: "🌆 شنغهاي",
      ru: "🌆 Шанхай",
      th: "🌆 เซี่ยงไฮ้",
    },
    title:
    {
      en: "Shanghai Travel Guide: The Most Foreigner-Friendly City",
      zh: "上海旅行指南：最友好的外国人城市",
      es: "Guía de Viaje de Shanghái: La Ciudad Más Amigable para Extranjeros",
      fr: "Guide de Voyage de Shanghai : La Ville la Plus Accueillante pour les Étrangers",
      ja: "上海旅行ガイド：外国人に最も優しい都市",
      ko: "상하이 여행 가이드: 외국인에게 가장 친화적인 도시",
      ar: "دليل شنغهاي السياحي: المدينة الأكثر ترحيباً بالأجانب",
      ru: "Путеводитель по Шанхаю: самый удобный для иностранцев город",
      th: "คู่มือเที่ยวเซี่ยงไฮ้: เมืองที่เป็นมิตรกับชาวต่างชาติที่สุด",
    },
    desc:
    {
      en: "The Bund, Shanghai Tower, Wukang Road–Anfu Road area, and world-class dining.",
      zh: "外滩、上海中心大厦、武康路-安福路区域和世界级餐饮。",
      es: "El Bund, Shanghai Tower, Wukang Road-Anfu Road y gastronomía de clase mundial.",
      fr: "Le Bund, Shanghai Tower, quartier Wukang Road-Anfu Road et gastronomie de classe mondiale.",
      ja: "外灘、上海タワー、武康路・安福路エリア、世界クラスのダイニング。",
      ko: "와이탄, 상하이 타워, 우캉루-안푸루 지역, 세계적 수준의 식도락.",
      ar: "الواجهة البحرية، برج شنغهاي، منطقة ووكانغ-أنفو، ومطاعم عالمية المستوى.",
      ru: "Бунд, Шанхайская башня, Французская концессия и рестораны мирового уровня.",
      th: "เดอะบันด์, เซี่ยงไฮ้ทาวเวอร์, ย่านอู่คัง-อันฟู่, และร้านอาหารระดับโลก",
    },
  },
  {
    slug: "shenzhen-guide",
    group: 2,
    tag:
    {
      en: "🏙️ Shenzhen",
      zh: "🏙️ 深圳",
      es: "🏙️ Shenzhen",
      fr: "🏙️ Shenzhen",
      ja: "🏙️ 深圳",
      ko: "🏙️ 선전",
      ar: "🏙️ شنتشن",
      ru: "🏙️ Шэньчжэнь",
      th: "🏙️ เซินเจิ้น",
    },
    title:
    {
      en: "Shenzhen Travel Guide: Tech Hub Next to Hong Kong",
      zh: "深圳旅行指南：毗邻香港的科技之都",
      es: "Guía de Viaje de Shenzhen: Centro Tecnológico Junto a Hong Kong",
      fr: "Guide de Voyage de Shenzhen : Centre Technologique aux Côtés de Hong Kong",
      ja: "深圳旅行ガイド：香港に隣接するテクノロジーハブ",
      ko: "선전 여행 가이드: 홍콩 옆의 테크 허브",
      ar: "دليل شنتشن السياحي: مركز التكنولوجيا بجوار هونغ كونغ",
      ru: "Путеводитель по Шэньчжэню: технохаб рядом с Гонконгом",
      th: "คู่มือเที่ยวเซินเจิ้น: ศูนย์กลางเทคโนโลยีติดกับฮ่องกง",
    },
    desc:
    {
      en: "China's Silicon Valley, coastal cycling, and a 15-minute train to Hong Kong.",
      zh: "中国硅谷、滨海骑行、15分钟火车到香港。",
      es: "El Silicon Valley de China, ciclismo costero y un tren de 15 minutos a Hong Kong.",
      fr: "La Silicon Valley de la Chine, le cyclisme côtier et un train de 15 minutes pour Hong Kong.",
      ja: "中国のシリコンバレー、海岸サイクリング、香港まで電車で15分。",
      ko: "중국의 실리콘밸리, 해안 자전거, 홍콩까지 15분 기차.",
      ar: "وادي السيليكون الصيني، ركوب الدراجات على الساحل، و15 دقيقة بالقطار إلى هونغ كونغ.",
      ru: "Кремниевая долина Китая, велопрогулки у побережья и 15 минут до Гонконга.",
      th: "ซิลิคอนวัลเลย์ของจีน, ปั่นจักรยานเลียบทะเล, และรถไฟ 15 นาทีถึงฮ่องกง",
    },
  },
  {
    slug: "hainan-visa-free",
    group: 3,
    tag:
    {
      en: "🏝️ Hainan",
      zh: "🏝️ 海南",
      es: "🏝️ Hainan",
      fr: "🏝️ Hainan",
      ja: "🏝️ 海南",
      ko: "🏝️ 하이난",
      ar: "🏝️ هاينان",
      ru: "🏝️ Хайнань",
      th: "🏝️ ไหหลำ",
    },
    title:
    {
      en: "Hainan Travel Guide — 30-Day Visa-Free",
      zh: "海南旅行指南——30天免签",
      es: "Guía de Viaje de Hainan — 30 Días Sin Visa",
      fr: "Guide de Voyage de Hainan — 30 Jours Sans Visa",
      ja: "海南旅行ガイド — 30日間ビザ免除",
      ko: "하이난 여행 가이드 — 30일 무비자",
      ar: "دليل هاينان السياحي — 30 يوماً بدون تأشيرة",
      ru: "Путеводитель по Хайнаню — 30 дней без визы",
      th: "คู่มือเที่ยวไหหลำ — ยกเว้นวีซ่า 30 วัน",
    },
    desc:
    {
      en: "Tropical beaches, rainforest, and visa-free entry for 61 countries.",
      zh: "热带海滩、雨林，61国免签入境。",
      es: "Playas tropicales, selva tropical y entrada sin visa para 61 países.",
      fr: "Plages tropicales, forêt tropicale et entrée sans visa pour 61 pays.",
      ja: "熱帯ビーチ、熱帯雨林、61カ国ビザなし入国。",
      ko: "열대 해변, 열대우림, 61개국 무비자 입국.",
      ar: "شواطئ استوائية، غابات مطيرة، ودخول بدون تأشيرة لـ 61 دولة.",
      ru: "Тропические пляжи, джунгли и безвизовый въезд для 61 стран.",
      th: "ชายหาดเขตร้อน, ป่าฝน, และยกเว้นวีซ่าสำหรับ 61 ประเทศ",
    },
  },
  {
    slug: "guangzhou-guide",
    group: 4,
    tag:
    {
      en: "🥟 Guangzhou",
      zh: "🥟 广州",
      es: "🥟 Cantón",
      fr: "🥟 Guangzhou",
      ja: "🥟 広州",
      ko: "🥟 광저우",
      ar: "🥟 قوانغتشو",
      ru: "🥟 Гуанчжоу",
      th: "🥟 กวางโจว",
    },
    title:
    {
      en: "Guangzhou Travel Guide: Food Capital of China",
      zh: "广州旅行指南：中国美食之都",
      es: "Guía de Viaje de Cantón: La Capital Gastronómica de China",
      fr: "Guide de Voyage de Guangzhou : Capitale Gastronomique de la Chine",
      ja: "広州旅行ガイド：中国の美食の都",
      ko: "광저우 여행 가이드: 중국의 미식 수도",
      ar: "دليل قوانغتشو السياحي: عاصمة الطعام في الصين",
      ru: "Путеводитель по Гуанчжоу: гастрономическая столица Китая",
      th: "คู่มือเที่ยวกวางโจว: เมืองหลวงอาหารของจีน",
    },
    desc:
    {
      en: "Dim sum, Canton Tower, Shamian Island, and gateway to southern China.",
      zh: "点心、广州塔、沙面岛，通往华南的门户。",
      es: "Dim sum, Canton Tower, Isla Shamian y puerta de entrada al sur de China.",
      fr: "Dim sum, Tour de Canton, Île de Shamian et porte d'entrée vers le sud de la Chine.",
      ja: "点心、広州塔、沙面島、華南への玄関口。",
      ko: "딤섬, 캔턴 타워, 사몐 섬, 중국 남부의 관문.",
      ar: "الديم سام، برج كانتون، جزيرة شاميان، وبوابة جنوب الصين.",
      ru: "Димсамы, Кантонская башня, остров Шамянь и ворота в южный Китай.",
      th: "ติ่มซำ, หอคอยกวางโจว, เกาะซาเมี่ยน, และประตูสู่จีนตอนใต้",
    },
  },
  {
    slug: "chengdu-guide",
    group: 4,
    tag:
    {
      en: "🐼 Chengdu",
      zh: "🐼 成都",
      es: "🐼 Chengdú",
      fr: "🐼 Chengdu",
      ja: "🐼 成都",
      ko: "🐼 청두",
      ar: "🐼 تشنغدو",
      ru: "🐼 Чэнду",
      th: "🐼 เฉิงตู",
    },
    title:
    {
      en: "Chengdu Travel Guide: Pandas, Spicy Food & Slow Life",
      zh: "成都旅行指南：熊猫、麻辣美食与慢生活",
      es: "Guía de Viaje de Chengdú: Pandas, Comida Picante y Vida Tranquila",
      fr: "Guide de Voyage de Chengdu : Pandas, Nourriture Épicée et Art de Vivre",
      ja: "成都旅行ガイド：パンダ、辛い料理、スローライフ",
      ko: "청두 여행 가이드: 판다, 매운 음식 & 느린 삶",
      ar: "دليل تشنغدو السياحي: الباندا، الطعام الحار، والحياة البطيئة",
      ru: "Путеводитель по Чэнду: панды, острая еда и медленная жизнь",
      th: "คู่มือเที่ยวเฉิงตู: หมีแพนด้า อาหารเผ็ด และชีวิตชิลล์",
    },
    desc:
    {
      en: "Giant pandas, Sichuan hotpot, tea houses, and gateway to Jiuzhaigou.",
      zh: "大熊猫、四川火锅、茶馆，通往九寨沟的门户。",
      es: "Pandas gigantes, hotpot sichuanés, casas de té y puerta de entrada a Jiuzhaigou.",
      fr: "Pandas géants, fondue sichuanaise, maisons de thé et porte d'entrée vers Jiuzhaigou.",
      ja: "ジャイアントパンダ、四川火鍋、茶館、九寨溝への玄関口。",
      ko: "자이언트 판다, 쓰촨 훠궈, 찻집, 주자이거우 관문.",
      ar: "الباندا العملاقة، الهوت بوت السيتشواني، بيوت الشاي، وبوابة جيوتشايغو.",
      ru: "Большие панды, сычуаньский хого, чайные домики и ворота в Цзючжайгоу.",
      th: "หมีแพนด้ายักษ์, หม้อไฟเสฉวน, ร้านน้ำชา, และประตูสู่จิ่วจ้ายโกว",
    },
  },
];
