// life 板块目录页的唯一数据源。改这里，9 个语种的目录页同时生效。
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
    value: "110",
    color: 'blue',
    label:
    {
      en: "Police, 120 ambulance",
      zh: "报警，急救 120",
      es: "Policía, 120 ambulancia",
      fr: "Police, 120 ambulances",
      ja: "警察・救急 120",
      ko: "경찰·구급 120",
      ar: "الشرطة والإسعاف 120",
      ru: "Полиция, скорая 120",
      th: "ตำรวจ · รถพยาบาล 120",
    },
  },
  {
    value: "4",
    color: 'indigo',
    label:
    {
      en: "Apps before landing",
      zh: "落地前必装 app",
      es: "Apps antes de llegar",
      fr: "Apps avant d'arriver",
      ja: "到着前に入れるアプリ",
      ko: "출발 전 필수 앱",
      ar: "تطبيقات قبل الوصول",
      ru: "Приложения заранее",
      th: "แอปที่ต้องมีก่อนถึง",
    },
  },
  {
    value: "220V",
    color: 'emerald',
    label:
    {
      en: "Type A/I sockets",
      zh: "Type A/I 插座",
      es: "Enchufes tipo A/I",
      fr: "Prises type A/I",
      ja: "A/I 型コンセント",
      ko: "A/I형 콘센트",
      ar: "مقابس نوع A/I",
      ru: "Розетки типа A/I",
      th: "ปลั๊กชนิด A/I",
    },
  },
  {
    value: "3",
    color: 'amber',
    label:
    {
      en: "Levels of care",
      zh: "就医分级",
      es: "Niveles de atención",
      fr: "Niveaux de soins",
      ja: "医療機関の3段階",
      ko: "진료 3단계",
      ar: "مستويات الرعاية",
      ru: "Уровни помощи",
      th: "ระดับการรักษา",
    },
  },
];

export const GROUPS: Group[] = [
  {
    color: 'purple',
    name:
    {
      en: "Communication & Internet",
      zh: "通信与网络",
      es: "Comunicación e Internet",
      fr: "Communication & Internet",
      ja: "通信・インターネット",
      ko: "통신 & 인터넷",
      ar: "الاتصالات والإنترنت",
      ru: "Связь и интернет",
      th: "การสื่อสารและอินเทอร์เน็ต",
    },
  },
  {
    color: 'cyan',
    name:
    {
      en: "Health & Medical",
      zh: "健康与医疗",
      es: "Salud y Medicina",
      fr: "Santé & Médical",
      ja: "健康・医療",
      ko: "건강 & 의료",
      ar: "الصحة والرعاية الطبية",
      ru: "Здоровье и медицина",
      th: "สุขภาพและการแพทย์",
    },
  },
  {
    color: 'red',
    name:
    {
      en: "Safety & Emergencies",
      zh: "安全与应急",
      es: "Seguridad y Emergencias",
      fr: "Sécurité & Urgences",
      ja: "安全・緊急時",
      ko: "안전 & 비상",
      ar: "السلامة والطوارئ",
      ru: "Безопасность и ЧС",
      th: "ความปลอดภัยและเหตุฉุกเฉิน",
    },
  },
  {
    color: 'yellow',
    name:
    {
      en: "Culture & Essentials",
      zh: "文化与必备",
      es: "Cultura y Esenciales",
      fr: "Culture & Essentiels",
      ja: "文化・必需品",
      ko: "문화 & 필수 정보",
      ar: "الثقافة والأساسيات",
      ru: "Культура и необходимое",
      th: "วัฒนธรรมและสิ่งจำเป็น",
    },
  },
  {
    color: 'teal',
    name:
    {
      en: "Accommodation",
      zh: "住宿",
      es: "Alojamiento",
      fr: "Hébergement",
      ja: "宿泊・ホテル",
      ko: "숙박",
      ar: "الإقامة",
      ru: "Проживание",
      th: "ที่พัก",
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
    slug: "sim-card-guide",
    group: 0,
    tag:
    {
      en: "📶 Internet",
      zh: "📶 上网",
      es: "📶 Internet",
      fr: "📶 Internet",
      ja: "📶 インターネット",
      ko: "📶 인터넷",
      ar: "📶 الإنترنت",
      ru: "📶 Интернет",
      th: "📶 อินเทอร์เน็ต",
    },
    title:
    {
      en: "Best SIM Card & eSIM for Tourists",
      zh: "SIM 卡与 eSIM 选卡攻略",
      es: "Mejor SIM y eSIM para Turistas",
      fr: "Meilleure carte SIM et eSIM pour touristes",
      ja: "観光客に最適なSIMカード・eSIM",
      ko: "관광객을 위한 최고의 SIM 카드 & eSIM",
      ar: "أفضل بطاقة SIM و eSIM للسياح",
      ru: "Лучшая SIM-карта и eSIM для туристов",
      th: "SIM Card และ eSIM ที่ดีที่สุดสำหรับนักท่องเที่ยว",
    },
    desc:
    {
      en: "Compare eSIM providers, airport SIM cards, and data plans.",
      zh: "对比 eSIM 运营商、机场购卡和数据套餐。",
      es: "Compara proveedores de eSIM, tarjetas SIM del aeropuerto y planes de datos.",
      fr: "Comparez les fournisseurs d'eSIM, les cartes SIM d'aéroport et les forfaits data.",
      ja: "eSIMプロバイダー、空港SIMカード、データプランを比較。",
      ko: "eSIM 제공업체, 공항 SIM 카드, 데이터 요금제 비교.",
      ar: "قارن بين مزودي eSIM وبطاقات SIM في المطار وخطط البيانات.",
      ru: "Сравни eSIM-провайдеров, SIM-карты в аэропорту и тарифы.",
      th: "เปรียบเทียบผู้ให้บริการ eSIM, SIM Card ที่สนามบิน และแพ็กเกจข้อมูล",
    },
  },
  {
    slug: "vpn-guide",
    group: 0,
    tag:
    {
      en: "🔒 VPN",
      zh: "🔒 VPN",
      es: "🔒 VPN",
      fr: "🔒 VPN",
      ja: "🔒 VPN",
      ko: "🔒 VPN",
      ar: "🔒 VPN",
      ru: "🔒 VPN",
      th: "🔒 VPN",
    },
    title:
    {
      en: "Best VPNs for Traveling in China",
      zh: "中国旅行 VPN 推荐",
      es: "Mejores VPN para Viajar por China",
      fr: "Meilleurs VPN pour voyager en Chine",
      ja: "中国旅行に最適なVPN",
      ko: "중국 여행을 위한 최고의 VPN",
      ar: "أفضل خدمات VPN للسفر في الصين",
      ru: "Лучшие VPN для поездки в Китай",
      th: "VPN ที่ดีที่สุดสำหรับการเดินทางในจีน",
    },
    desc:
    {
      en: "What works, how to set it up, and why before you arrive.",
      zh: "哪些能用、怎么设置、为什么出发前就要准备好。",
      es: "Qué funciona, cómo configurarlo y por qué antes de llegar.",
      fr: "Ce qui fonctionne, comment les configurer et pourquoi avant votre arrivée.",
      ja: "使えるVPN、設定方法、到着前に準備すべき理由。",
      ko: "어떤 VPN이 작동하는지, 설정 방법, 도착 전에 준비해야 하는 이유.",
      ar: "ما الذي يعمل، وكيفية الإعداد، ولماذا يجب قبل وصولك.",
      ru: "Что работает, как настроить и почему — до прилёта.",
      th: "อะไรใช้ได้ วิธีตั้งค่า และทำไมต้องติดตั้งก่อนเดินทาง",
    },
  },
  {
    slug: "essential-apps",
    group: 0,
    tag:
    {
      en: "📱 Apps",
      zh: "📱 App",
      es: "📱 Apps",
      fr: "📱 Applications",
      ja: "📱 アプリ",
      ko: "📱 앱",
      ar: "📱 التطبيقات",
      ru: "📱 Приложения",
      th: "📱 แอป",
    },
    title:
    {
      en: "10 Essential Apps for Traveling in China",
      zh: "中国旅行必备 10 个 App",
      es: "10 Apps Esenciales para Viajar por China",
      fr: "10 applications essentielles pour voyager en Chine",
      ja: "中国旅行に必須の10アプリ",
      ko: "중국 여행 필수 앱 10선",
      ar: "10 تطبيقات أساسية للسفر في الصين",
      ru: "10 обязательных приложений для Китая",
      th: "10 แอปจำเป็นสำหรับการเดินทางในจีน",
    },
    desc:
    {
      en: "Payment, transport, translation, and discovery.",
      zh: "支付、出行、翻译、探索一应俱全。",
      es: "Pagos, transporte, traducción y descubrimiento.",
      fr: "Paiement, transport, traduction et découverte.",
      ja: "支払い、交通、翻訳、情報収集。",
      ko: "결제, 교통, 번역, 탐색.",
      ar: "الدفع، النقل، الترجمة، والاستكشاف.",
      ru: "Оплата, транспорт, перевод и поиск.",
      th: "การชำระเงิน การเดินทาง การแปลภาษา และการสำรวจ",
    },
  },
  {
    slug: "seeing-a-doctor",
    group: 1,
    tag:
    {
      en: "⚕️ Medical",
      zh: "⚕️ 就医",
      es: "⚕️ Médico",
      fr: "⚕️ Médical",
      ja: "⚕️ 医療",
      ko: "⚕️ 의료",
      ar: "⚕️ الرعاية الطبية",
      ru: "⚕️ Медицина",
      th: "⚕️ การแพทย์",
    },
    title:
    {
      en: "Seeing a Doctor in China",
      zh: "在中国看病指南",
      es: "Ir al Médico en China",
      fr: "Consulter un médecin en Chine",
      ja: "中国で医者にかかる",
      ko: "중국에서 병원 방문하기",
      ar: "زيارة الطبيب في الصين",
      ru: "Поход к врачу в Китае",
      th: "การพบแพทย์ในจีน",
    },
    desc:
    {
      en: "Pharmacy, clinic, or hospital — how to choose.",
      zh: "药店、诊所还是医院？教你如何选择。",
      es: "Farmacia, clínica u hospital — cómo elegir.",
      fr: "Pharmacie, clinique ou hôpital — comment choisir.",
      ja: "薬局、クリニック、病院 — 選び方。",
      ko: "약국, 의원, 병원 — 어떻게 선택할까요.",
      ar: "صيدلية، عيادة، أو مستشفى — كيف تختار.",
      ru: "Аптека, клиника или больница — как выбрать.",
      th: "ร้านขายยา คลินิก หรือโรงพยาบาล — เลือกอย่างไรดี",
    },
  },
  {
    slug: "top-hospitals",
    group: 1,
    tag:
    {
      en: "🏥 Hospitals",
      zh: "🏥 医院",
      es: "🏥 Hospitales",
      fr: "🏥 Hôpitaux",
      ja: "🏥 病院",
      ko: "🏥 병원",
      ar: "🏥 المستشفيات",
      ru: "🏥 Больницы",
      th: "🏥 โรงพยาบาล",
    },
    title:
    {
      en: "Top Hospitals with International Departments",
      zh: "优质国际部医院推荐",
      es: "Mejores Hospitales con Departamentos Internacionales",
      fr: "Meilleurs hôpitaux avec services internationaux",
      ja: "国際部がある主要病院",
      ko: "국제 진료과가 있는 주요 병원",
      ar: "أفضل المستشفيات ذات الأقسام الدولية",
      ru: "Лучшие больницы с международными отделениями",
      th: "โรงพยาบาลชั้นนำที่มีแผนกนานาชาติ",
    },
    desc:
    {
      en: "Best hospitals with English-speaking staff, by city.",
      zh: "配备英文医护人员的优质医院，按城市分类。",
      es: "Mejores hospitales con personal angloparlante, por ciudad.",
      fr: "Les meilleurs hôpitaux avec personnel anglophone, par ville.",
      ja: "英語対応スタッフがいる病院を都市別に紹介。",
      ko: "도시별 영어 구사 직원이 있는 최고의 병원.",
      ar: "أفضل المستشفيات التي تتحدث بالإنجليزية، حسب المدينة.",
      ru: "Лучшие больницы с англоговорящим персоналом по городам.",
      th: "โรงพยาบาลที่ดีที่สุดที่มีเจ้าหน้าที่พูดภาษาอังกฤษ แยกตามเมือง",
    },
  },
  {
    slug: "travel-insurance",
    group: 1,
    tag:
    {
      en: "🛡️ Insurance",
      zh: "🛡️ 保险",
      es: "🛡️ Seguro",
      fr: "🛡️ Assurance",
      ja: "🛡️ 保険",
      ko: "🛡️ 보험",
      ar: "🛡️ التأمين",
      ru: "🛡️ Страховка",
      th: "🛡️ ประกันภัย",
    },
    title:
    {
      en: "Travel Insurance for China",
      zh: "中国旅行保险须知",
      es: "Seguro de Viaje para China",
      fr: "Assurance voyage pour la Chine",
      ja: "中国旅行保険",
      ko: "중국 여행 보험",
      ar: "تأمين السفر للصين",
      ru: "Туристическая страховка для Китая",
      th: "ประกันการเดินทางสำหรับจีน",
    },
    desc:
    {
      en: "What you need to know about travel insurance.",
      zh: "关于旅行保险你需要知道的事。",
      es: "Lo que necesitas saber sobre el seguro de viaje.",
      fr: "Ce que vous devez savoir sur l'assurance voyage.",
      ja: "旅行保険について知っておくべきこと。",
      ko: "여행 보험에 대해 알아야 할 사항.",
      ar: "ما تحتاج معرفته عن تأمين السفر.",
      ru: "Всё, что нужно знать о страховке.",
      th: "สิ่งที่คุณต้องรู้เกี่ยวกับประกันการเดินทาง",
    },
  },
  {
    slug: "is-china-safe",
    group: 2,
    tag:
    {
      en: "🛡️ Safety",
      zh: "🛡️ 安全",
      es: "🛡️ Seguridad",
      fr: "🛡️ Sécurité",
      ja: "🛡️ 安全性",
      ko: "🛡️ 안전",
      ar: "🛡️ الأمان",
      ru: "🛡️ Безопасность",
      th: "🛡️ ความปลอดภัย",
    },
    title:
    {
      en: "Is It Safe to Travel to China?",
      zh: "去中国旅行安全吗？",
      es: "¿Es Seguro Viajar a China?",
      fr: "Est-il sûr de voyager en Chine ?",
      ja: "中国旅行は安全？",
      ko: "중국 여행은 안전한가요?",
      ar: "هل السفر إلى الصين آمن؟",
      ru: "Безопасно ли путешествовать в Китай?",
      th: "การเดินทางไปจีนปลอดภัยไหม?",
    },
    desc:
    {
      en: "An honest take on safety, crime, and what to watch for.",
      zh: "关于安全、犯罪率和注意事项的实话实说。",
      es: "Una opinión honesta sobre seguridad, delitos y qué tener en cuenta.",
      fr: "Un avis honnête sur la sécurité, la criminalité et les précautions.",
      ja: "安全性、犯罪、注意点について正直な解説。",
      ko: "안전, 범죄, 주의할 점에 대한 솔직한 평가.",
      ar: "رأي صادق حول السلامة والجريمة وما يجب الانتباه له.",
      ru: "Честный взгляд на безопасность, преступность и что остерегаться.",
      th: "มุมมองจริงเกี่ยวกับความปลอดภัย อาชญากรรม และสิ่งที่ควรระวัง",
    },
  },
  {
    slug: "common-scams",
    group: 2,
    tag:
    {
      en: "⚠️ Scams",
      zh: "⚠️ 骗局",
      es: "⚠️ Estafas",
      fr: "⚠️ Arnaques",
      ja: "⚠️ 詐欺",
      ko: "⚠️ 사기",
      ar: "⚠️ الاحتيال",
      ru: "⚠️ Мошенничество",
      th: "⚠️ กลลวง",
    },
    title:
    {
      en: "Common Scams in China & How to Avoid Them",
      zh: "中国常见骗局与防范",
      es: "Estafas Comunes en China y Cómo Evitarlas",
      fr: "Arnaques courantes en Chine et comment les éviter",
      ja: "中国でよくある詐欺とその回避方法",
      ko: "중국에서 흔한 사기와 예방 방법",
      ar: "الاحتيالات الشائعة في الصين وكيفية تجنبها",
      ru: "Распространённые схемы обмана и как их избежать",
      th: "กลลวงทั่วไปในจีนและวิธีหลีกเลี่ยง",
    },
    desc:
    {
      en: "Spot and avoid the most common tourist traps.",
      zh: "识别并避开最常见的旅游陷阱。",
      es: "Identifica y evita las trampas turísticas más comunes.",
      fr: "Repérez et évitez les pièges à touristes les plus fréquents.",
      ja: "よくある観光客向け詐欺を見抜き、回避する方法。",
      ko: "가장 흔한 관광객 대상 사기를 식별하고 피하는 방법.",
      ar: "اكتشف أشهر فخاخ السياح وتجنبها.",
      ru: "Распознавай и избегай типичные туристические ловушки.",
      th: "สังเกตและหลีกเลี่ยงกับดักนักท่องเที่ยวที่พบบ่อย",
    },
  },
  {
    slug: "emergency-numbers",
    group: 2,
    tag:
    {
      en: "🆘 Emergency",
      zh: "🆘 紧急",
      es: "🆘 Emergencias",
      fr: "🆘 Urgence",
      ja: "🆘 緊急",
      ko: "🆘 비상",
      ar: "🆘 الطوارئ",
      ru: "🆘 Экстренные номера",
      th: "🆘 ฉุกเฉิน",
    },
    title:
    {
      en: "Emergency Numbers & What to Do",
      zh: "紧急联系电话与应对指南",
      es: "Números de Emergencia y Qué Hacer",
      fr: "Numéros d'urgence et conduite à tenir",
      ja: "緊急連絡先と対応方法",
      ko: "비상 연락처 & 대처 방법",
      ar: "أرقام الطوارئ وماذا تفعل",
      ru: "Экстренные номера и что делать",
      th: "เบอร์โทรฉุกเฉินและวิธีปฏิบัติ",
    },
    desc:
    {
      en: "Essential contacts and step-by-step emergency response.",
      zh: "必备联系方式和分步应急处理指南。",
      es: "Contactos esenciales y respuesta ante emergencias paso a paso.",
      fr: "Contacts essentiels et procédure d'urgence étape par étape.",
      ja: "重要な連絡先と緊急時の対応手順。",
      ko: "필수 연락처와 단계별 비상 대응.",
      ar: "جهات اتصال أساسية وخطوات الاستجابة للطوارئ.",
      ru: "Важные контакты и пошаговые действия в ЧС.",
      th: "เบอร์ติดต่อสำคัญและการตอบสนองเหตุฉุกเฉินทีละขั้นตอน",
    },
  },
  {
    slug: "packing-guide",
    group: 3,
    tag:
    {
      en: "🧳 Packing",
      zh: "🧳 打包",
      es: "🧳 Equipaje",
      fr: "🧳 Bagages",
      ja: "🧳 荷造り",
      ko: "🧳 짐 싸기",
      ar: "🧳 التعبئة",
      ru: "🧳 Упаковка",
      th: "🧳 แพ็คกระเป๋า",
    },
    title:
    {
      en: "What to Pack for China",
      zh: "去中国该带什么",
      es: "Qué Empacar para China",
      fr: "Que mettre dans sa valise pour la Chine",
      ja: "中国に持っていくべきもの",
      ko: "중국에 가져갈 물건",
      ar: "ماذا تأخذ معك إلى الصين",
      ru: "Что взять с собой в Китай",
      th: "สิ่งที่ต้องแพ็คไปจีน",
    },
    desc:
    {
      en: "Practical packing list for every season.",
      zh: "适合四季的实用打包清单。",
      es: "Lista práctica de equipaje para cada temporada.",
      fr: "Liste de bagages pratique pour chaque saison.",
      ja: "季節ごとの実用的な荷造りリスト。",
      ko: "계절별 실용적인 짐 싸기 목록.",
      ar: "قائمة تعبئة عملية لكل فصل.",
      ru: "Практичный список упаковки на любой сезон.",
      th: "รายการแพ็คของที่ใช้งานได้จริงสำหรับทุกฤดูกาล",
    },
  },
  {
    slug: "cultural-taboos",
    group: 3,
    tag:
    {
      en: "🙏 Etiquette",
      zh: "🙏 礼仪",
      es: "🙏 Etiqueta",
      fr: "🙏 Étiquette",
      ja: "🙏 エチケット",
      ko: "🙏 에티켓",
      ar: "🙏 الإتيكيت",
      ru: "🙏 Этикет",
      th: "🙏 มารยาท",
    },
    title:
    {
      en: "Cultural Dos and Don'ts in China",
      zh: "中国文化礼仪须知",
      es: "Qué Hacer y No Hacer en la Cultura China",
      fr: "Us et Coutumes en Chine",
      ja: "中国での文化的なDo's and Don'ts",
      ko: "중국 문화의 에티켓과 금기사항",
      ar: "الأمور المسموح والممنوع في الصين",
      ru: "Культурные «можно» и «нельзя» в Китае",
      th: "ข้อควรปฏิบัติและไม่ควรปฏิบัติในจีน",
    },
    desc:
    {
      en: "Etiquette guide for foreign visitors.",
      zh: "外国游客必读的文化礼仪指南。",
      es: "Guía de etiqueta para visitantes extranjeros.",
      fr: "Guide des bonnes manières pour les visiteurs.",
      ja: "観光客のためのエチケットガイド。",
      ko: "외국인 방문객을 위한 예절 가이드입니다.",
      ar: "دليل الإتيكيت للزوار الأجانب.",
      ru: "Гид по этикету для иностранных гостей.",
      th: "คู่มือมารยาทสำหรับนักท่องเที่ยวต่างชาติ",
    },
  },
  {
    slug: "chinese-phrases",
    group: 3,
    tag:
    {
      en: "🈶 Language",
      zh: "🈶 语言",
      es: "🈶 Idioma",
      fr: "🈶 Langue",
      ja: "🈶 言語",
      ko: "🈶 언어",
      ar: "🈶 اللغة",
      ru: "🈶 Язык",
      th: "🈶 ภาษา",
    },
    title:
    {
      en: "Essential Chinese Phrases for Tourists",
      zh: "旅行必备中文用语",
      es: "Frases Esenciales en Chino para Turistas",
      fr: "Phrases chinoises essentielles pour les touristes",
      ja: "観光客のための必須中国語フレーズ",
      ko: "관광객을 위한 필수 중국어 회화",
      ar: "عبارات صينية أساسية للسياح",
      ru: "Основные китайские фразы для туристов",
      th: "วลีภาษาจีนที่จำเป็นสำหรับนักท่องเที่ยว",
    },
    desc:
    {
      en: "Survival Chinese for travelers.",
      zh: "游客实用中文短语。",
      es: "Chino de supervivencia para viajeros.",
      fr: "Chinois de survie pour voyageurs.",
      ja: "旅行者のためのサバイバル中国語。",
      ko: "여행자를 위한 생존 중국어.",
      ar: "لغة صينية للبقاء للمسافرين.",
      ru: "Разговорник выживания для путешественников.",
      th: "ภาษาจีนเพื่อเอาตัวรอดสำหรับนักเดินทาง",
    },
  },
  {
    slug: "china-hotels-guide",
    group: 4,
    tag:
    {
      en: "🏨 Hotels",
      zh: "🏨 酒店",
      es: "🏨 Hoteles",
      fr: "🏨 Hôtels",
      ja: "🏨 ホテル",
      ko: "🏨 호텔",
      ar: "🏨 الفنادق",
      ru: "🏨 Отели",
      th: "🏨 โรงแรม",
    },
    title:
    {
      en: "How to Book Hotels in China for Foreigners",
      zh: "外国人如何在中国预订酒店",
      es: "Cómo Reservar Hoteles en China para Extranjeros",
      fr: "Comment réserver un hôtel en Chine pour les étrangers",
      ja: "外国人が中国でホテルを予約する方法",
      ko: "외국인을 위한 중국 호텔 예약 방법",
      ar: "كيف تحجز فنادق في الصين للأجانب",
      ru: "Как бронировать отели в Китае иностранцу",
      th: "วิธีจองโรงแรมในจีนสำหรับชาวต่างชาติ",
    },
    desc:
    {
      en: "Book hotels in China as a foreigner — Trip.com, hotel prices, foreign-guest policies, check-in, and where to stay.",
      zh: "外国人在中国订酒店——Trip.com、酒店价格、接待外宾政策、入住流程，以及住哪里。",
      es: "Reserva hoteles en China como extranjero — Trip.com, precios de hoteles, políticas de huéspedes extranjeros, check-in y dónde alojarte.",
      fr: "Réservez un hôtel en Chine en tant qu",
      ja: "外国人が中国でホテルを予約——Trip.com、ホテル料金、外国人受入れポリシー、チェックイン、おすすめ滞在エリア。",
      ko: "외국인이 중국에서 호텔 예약하기 — Trip.com, 호텔 요금, 외국인 정책, 체크인, 추천 지역.",
      ar: "احجز فنادق في الصين كأجنبي — Trip.com، أسعار الفنادق، سياسات النزلاء الأجانب، تسجيل الدخول، وأين تقيم.",
      ru: "Бронируйте отели в Китае как иностранец — Trip.com, цены на отели, политика в отношении иностранцев, заселение и где остановиться.",
      th: "จองโรงแรมในจีนในฐานะชาวต่างชาติ — Trip.com นโยบายราคา โยบายแขกต่างชาติ การเช็คอิน และควรพักที่ไหน",
    },
  },
];
