// visa 板块目录页的唯一数据源。改这里，9 个语种的目录页同时生效。
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
    value: "240 h",
    color: 'blue',
    label:
    {
      en: "Visa-free transit",
      zh: "过境免签停留",
      es: "Tránsito sin visado",
      fr: "Transit sans visa",
      ja: "乗り継ぎ免除",
      ko: "무비자 환승",
      ar: "عبور بدون تأشيرة",
      ru: "Транзит без визы",
      th: "เปลี่ยนเครื่องฟรีวีซ่า",
    },
  },
  {
    value: "30 days",
    color: 'indigo',
    label:
    {
      en: "Visa-free stay",
      zh: "免签停留上限",
      es: "Estancia sin visado",
      fr: "Séjour sans visa",
      ja: "免除での滞在日数",
      ko: "무비자 체류",
      ar: "الإقامة بدون تأشيرة",
      ru: "Безвизовое пребывание",
      th: "พำนักฟรีวีซ่า",
    },
  },
  {
    value: "6 months",
    color: 'emerald',
    label:
    {
      en: "Passport validity",
      zh: "护照有效期",
      es: "Validez del pasaporte",
      fr: "Validité du passeport",
      ja: "パスポート残存期間",
      ko: "여권 유효기간",
      ar: "صلاحية الجواز",
      ru: "Срок действия паспорта",
      th: "อายุหนังสือเดินทาง",
    },
  },
  {
    value: "24 h",
    color: 'amber',
    label:
    {
      en: "Police registration",
      zh: "住私宅需报备",
      es: "Registro en la policía",
      fr: "Enregistrement police",
      ja: "警察への届出",
      ko: "경찰 신고",
      ar: "تسجيل لدى الشرطة",
      ru: "Регистрация в полиции",
      th: "แจ้งที่พักต่อตำรวจ",
    },
  },
];

export const GROUPS: Group[] = [
  {
    color: 'green',
    name:
    {
      en: "Visa & Entry",
      zh: "签证与入境",
      es: "Visa y Entrada",
      fr: "Visa & Entrée",
      ja: "ビザ・入国",
      ko: "비자 및 입국",
      ar: "التأشيرة والدخول",
      ru: "Виза и въезд",
      th: "วีซ่าและการเข้าเมือง",
    },
  },
  {
    color: 'amber',
    name:
    {
      en: "Before You Fly",
      zh: "出发之前",
      es: "Antes de Volar",
      fr: "Avant le décollage",
      ja: "搭乗前",
      ko: "출국 전",
      ar: "قبل الطيران",
      ru: "Перед вылетом",
      th: "ก่อนออกเดินทาง",
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
    slug: "visa-guide",
    group: 0,
    tag:
    {
      en: "📖 Overview",
      zh: "📖 概览",
      es: "📖 Resumen",
      fr: "📖 Aperçu",
      ja: "📖 概要",
      ko: "📖 개요",
      ar: "📖 نظرة عامة",
      ru: "📖 Обзор",
      th: "📖 ภาพรวม",
    },
    title:
    {
      en: "China Visa Types Complete Guide",
      zh: "中国签证类型完全指南",
      es: "Guía Completa de Tipos de Visa China",
      fr: "Guide complet des types de visa chinois",
      ja: "中国ビザ種類完全ガイド",
      ko: "중국 비자 종류 완벽 가이드",
      ar: "الدليل الكامل لأنواع تأشيرات الصين",
      ru: "Типы виз в Китай — полный гайд",
      th: "คู่มือประเภทวีซ่าจีนครบถ้วน",
    },
    desc:
    {
      en: "All visa options explained — compare visa-free, transit, and L visa.",
      zh: "了解所有签证方案——对比免签、过境签和 L 旅游签。",
      es: "Todas las opciones de visa explicadas — compara sin visa, tránsito y visa L.",
      fr: "Toutes les options de visa expliquées — comparez l'exonération, le transit et le visa L.",
      ja: "すべてのビザオプションを解説 — ビザ免除、トランジット、Lビザを比較。",
      ko: "모든 비자 옵션 설명 — 무비자, 환승, L비자 비교.",
      ar: "جميع خيارات التأشيرات موضحة — قارن بين الإعفاء والعبور وتأشيرة L.",
      ru: "Все варианты виз: безвизовый въезд, транзит и виза L.",
      th: "อธิบายตัวเลือกวีซ่าทั้งหมด — เปรียบเทียบการยกเว้นวีซ่า การต่อเครื่อง และวีซ่า L",
    },
  },
  {
    slug: "visa-free",
    group: 0,
    tag:
    {
      en: "📋 List",
      zh: "📋 列表",
      es: "📋 Lista",
      fr: "📋 Liste",
      ja: "📋 リスト",
      ko: "📋 목록",
      ar: "📋 قائمة",
      ru: "📋 Список",
      th: "📋 รายชื่อ",
    },
    title:
    {
      en: "China Visa-Free Countries List",
      zh: "中国免签国家名单",
      es: "Lista de Países Sin Visa para China",
      fr: "Liste des pays exonérés de visa",
      ja: "中国ビザ免除国リスト",
      ko: "중국 무비자 국가 목록",
      ar: "قائمة الدول المعفاة من تأشيرة الصين",
      ru: "Безвизовые страны для Китая",
      th: "รายชื่อประเทศที่ยกเว้นวีซ่าจีน",
    },
    desc:
    {
      en: "50 countries can enter without a visa for up to 30 days.",
      zh: "50 个国家可免签入境，最长停留 30 天。",
      es: "50 países pueden entrar sin visa por hasta 30 días.",
      fr: "50 pays peuvent entrer sans visa pour un séjour allant jusqu'à 30 jours.",
      ja: "50ヶ国が最長30日間ビザなしで入国可能。",
      ko: "50개국이 최대 30일간 비자 없이 입국 가능합니다.",
      ar: "50 دولة يمكنها الدخول بدون تأشيرة لمدة تصل إلى 30 يوماً.",
      ru: "50 стран могут въезжать без визы до 30 дней.",
      th: "50 ประเทศสามารถเข้าจีนโดยไม่ต้องใช้วีซ่าสูงสุด 30 วัน",
    },
  },
  {
    slug: "transit-240",
    group: 0,
    tag:
    {
      en: "✈️ Transit",
      zh: "✈️ 过境",
      es: "✈️ Tránsito",
      fr: "✈️ Transit",
      ja: "✈️ トランジット",
      ko: "✈️ 환승",
      ar: "✈️ عبور",
      ru: "✈️ Транзит",
      th: "✈️ การต่อเครื่อง",
    },
    title:
    {
      en: "240-Hour Visa-Free Transit",
      zh: "240 小时过境免签",
      es: "Tránsito Sin Visa de 240 Horas",
      fr: "Transit sans visa de 240 heures",
      ja: "240時間トランジットビザ免除",
      ko: "240시간 무비자 환승",
      ar: "العبور بدون تأشيرة لمدة 240 ساعة",
      ru: "240-часовой безвизовый транзит",
      th: "การต่อเครื่องปลอดวีซ่า 240 ชั่วโมง",
    },
    desc:
    {
      en: "57 eligible countries — stay up to 10 days without a visa.",
      zh: "57 个适用国家——最长免签停留 10 天。",
      es: "57 países elegibles — quédate hasta 10 días sin visa.",
      fr: "57 pays éligibles — restez jusqu'à 10 jours sans visa.",
      ja: "57ヶ国対象 — ビザなしで最長10日間滞在可能。",
      ko: "57개국 대상 — 비자 없이 최대 10일 체류 가능.",
      ar: "57 دولة مؤهلة — أقم لمدة تصل إلى 10 أيام بدون تأشيرة.",
      ru: "57 стран — оставайся до 10 дней без визы.",
      th: "57 ประเทศที่มีสิทธิ์ — พักได้สูงสุด 10 วันโดยไม่ต้องใช้วีซ่า",
    },
  },
  {
    slug: "mutual-agreement",
    group: 0,
    tag:
    {
      en: "🤝 Mutual",
      zh: "🤝 互免",
      es: "🤝 Mutuo",
      fr: "🤝 Accord mutuel",
      ja: "🤝 相互協定",
      ko: "🤝 상호 협정",
      ar: "🤝 متبادل",
      ru: "🤝 Взаимные",
      th: "🤝 ข้อตกลงร่วม",
    },
    title:
    {
      en: "Mutual Visa-Free Agreements",
      zh: "互免签证协议",
      es: "Acuerdos Mutuos Sin Visa",
      fr: "Accords mutuels d'exonération de visa",
      ja: "相互ビザ免除協定",
      ko: "상호 무비자 협정",
      ar: "اتفاقيات الإعفاء المتبادل من التأشيرة",
      ru: "Взаимные безвизовые соглашения",
      th: "ข้อตกลงยกเว้นวีซ่าร่วม",
    },
    desc:
    {
      en: "29 countries have reciprocal visa-free deals with China.",
      zh: "29 个国家与中国有互免签证协议。",
      es: "29 países tienen acuerdos recíprocos sin visa con China.",
      fr: "29 pays ont des accords réciproques d'exonération avec la Chine.",
      ja: "29ヶ国が中国と相互ビザ免除協定を結んでいる。",
      ko: "29개국이 중국과 상호 비자 면제 협정을 체결했습니다.",
      ar: "29 دولة لديها اتفاقيات إعفاء متبادل مع الصين.",
      ru: "29 стран имеют двусторонние безвизовые договорённости с Китаем.",
      th: "29 ประเทศมีข้อตกลงยกเว้นวีซ่าร่วมกับจีน",
    },
  },
  {
    slug: "apply-l-visa",
    group: 0,
    tag:
    {
      en: "📝 Application",
      zh: "📝 申请",
      es: "📝 Solicitud",
      fr: "📝 Demande",
      ja: "📝 申請",
      ko: "📝 신청",
      ar: "📝 طلب",
      ru: "📝 Оформление",
      th: "📝 การยื่นขอ",
    },
    title:
    {
      en: "How to Apply for a China Tourist Visa",
      zh: "如何申请中国旅游签证",
      es: "Cómo Solicitar una Visa de Turista para China",
      fr: "Comment demander un visa touristique chinois",
      ja: "中国観光ビザの申請方法",
      ko: "중국 관광 비자 신청 방법",
      ar: "كيفية التقديم على تأشيرة سياحية للصين",
      ru: "Как оформить туристическую визу в Китай",
      th: "วิธีขอวีซ่าท่องเที่ยวจีน",
    },
    desc:
    {
      en: "Step-by-step guide — documents, COVA form, fees, and tips.",
      zh: "一步步指南——材料、COVA 表格、费用和技巧。",
      es: "Guía paso a paso — documentos, formulario COVA, tarifas y consejos.",
      fr: "Guide étape par étape — documents, formulaire COVA, frais et conseils.",
      ja: "ステップバイステップガイド — 書類、COVAフォーム、料金、コツ。",
      ko: "단계별 가이드 — 서류, COVA 신청서, 수수료, 팁.",
      ar: "دليل خطوة بخطوة — المستندات، نموذج COVA، الرسوم، والنصائح.",
      ru: "Пошаговый гайд — документы, форма COVA, стоимость и советы.",
      th: "คู่มือทีละขั้นตอน — เอกสาร แบบฟอร์ม COVA ค่าธรรมเนียม และเคล็ดลับ",
    },
  },
  {
    slug: "customs-guide",
    group: 1,
    tag:
    {
      en: "🛃 Regulations",
      zh: "🛃 海关",
      es: "🛃 Regulaciones",
      fr: "🛃 Réglementation",
      ja: "🛃 規制",
      ko: "🛃 규정",
      ar: "🛃 اللوائح",
      ru: "🛃 Правила",
      th: "🛃 ข้อบังคับ",
    },
    title:
    {
      en: "China Customs Regulations",
      zh: "中国海关规定",
      es: "Regulaciones Aduaneras de China",
      fr: "Réglementations douanières chinoises",
      ja: "中国の税関規制",
      ko: "중국 세관 규정",
      ar: "لوائح الجمارك الصينية",
      ru: "Таможенные правила Китая",
      th: "ข้อบังคับศุลกากรจีน",
    },
    desc:
    {
      en: "Duty-free limits, prohibited items, and what to declare.",
      zh: "免税额度、禁带物品和申报要求。",
      es: "Límites libres de impuestos, artículos prohibidos y qué declarar.",
      fr: "Franchises en franchise, articles interdits et ce qu'il faut déclarer.",
      ja: "免税限度額、持ち込み禁止品、申告が必要なもの。",
      ko: "면세 한도, 금지 품목, 신고해야 할 물품.",
      ar: "حدود الإعفاء الجمركي، العناصر المحظورة، وما يجب التصريح به.",
      ru: "Беспошлинные лимиты, запрещённые предметы и что нужно декларировать.",
      th: "วงเงินปลอดภาษี สิ่งของต้องห้าม และสิ่งที่ต้องสำแดง",
    },
  },
  {
    slug: "arrival-card",
    group: 1,
    tag:
    {
      en: "📄 Arrival Card",
      zh: "📄 入境卡",
      es: "📄 Tarjeta de Llegada",
      fr: "📄 Carte d'arrivée",
      ja: "📄 入国カード",
      ko: "📄 입국 카드",
      ar: "📄 بطاقة الوصول",
      ru: "📄 Карта прибытия",
      th: "📄 บัตรขาเข้า",
    },
    title:
    {
      en: "Submit Your Arrival Card Online",
      zh: "在线填写中国入境卡",
      es: "Envía Tu Tarjeta de Llegada en Línea",
      fr: "Soumettre votre carte d'arrivée en ligne",
      ja: "入国カードをオンラインで提出",
      ko: "온라인 입국 카드 제출하기",
      ar: "تقديم بطاقة الوصول عبر الإنترنت",
      ru: "Заполнение карты прибытия онлайн",
      th: "กรอกบัตรขาเข้าจีนออนไลน์",
    },
    desc:
    {
      en: "Fill in the NIA arrival card before you fly — step by step with screenshots.",
      zh: "出发前填好 NIA 入境卡——含截图步骤。",
      es: "Completa la tarjeta de llegada NIA antes de volar — paso a paso con capturas.",
      fr: "Remplissez la carte d'arrivée NIA avant votre vol — étape par étape avec captures d'écran.",
      ja: "搭乗前にNIA入国カードを記入 — スクリーンショット付きで順を追って解説。",
      ko: "출국 전 NIA 입국 카드 작성 방법 — 스크린샷과 함께 단계별 안내.",
      ar: "املأ بطاقة وصول NIA قبل الطيران — خطوة بخطوة مع لقطات شاشة.",
      ru: "Заполни карту прибытия NIA перед вылетом — пошагово со скриншотами.",
      th: "กรอกบัตรขาเข้า NIA ก่อนบิน — ทีละขั้นตอนพร้อมภาพประกอบ",
    },
  },
  {
    slug: "first-time-china",
    group: 1,
    tag:
    {
      en: "🌟 First Time",
      zh: "🌟 首次来华",
      es: "🌟 Primera Vez",
      fr: "🌟 Première fois",
      ja: "🌟 初めての方",
      ko: "🌟 첫 방문",
      ar: "🌟 أول مرة",
      ru: "🌟 Впервые",
      th: "🌟 ครั้งแรก",
    },
    title:
    {
      en: "First Time in China",
      zh: "首次来华指南",
      es: "Primera Vez en China",
      fr: "Première fois en Chine",
      ja: "初めての中国渡航",
      ko: "첫 중국 방문",
      ar: "أول مرة في الصين",
      ru: "Впервые в Китае",
      th: "ครั้งแรกในจีน",
    },
    desc:
    {
      en: "Complete timeline — visa, digital setup, packing, arrival, first 24 hours.",
      zh: "完整时间线——签证、数字准备、打包、到达和头 24 小时。",
      es: "Cronograma completo — visa, configuración digital, equipaje, llegada, primeras 24 horas.",
      fr: "Calendrier complet — visa, configuration numérique, bagages, arrivée, premières 24 heures.",
      ja: "完全タイムライン — ビザ、デジタル準備、荷造り、到着、最初の24時間。",
      ko: "전체 타임라인 — 비자, 디지털 설정, 준비물, 도착, 첫 24시간.",
      ar: "جدول زمني كامل — التأشيرة، الإعداد الرقمي، التجهيز، الوصول، أول 24 ساعة.",
      ru: "Полный таймлайн — виза, цифровая настройка, сборы, прибытие, первые 24 часа.",
      th: "ไทม์ไลน์ครบถ้วน — วีซ่า การตั้งค่าดิจิทัล การแพ็คกระเป๋า การเดินทางถึง 24 ชั่วโมงแรก",
    },
  },
];
