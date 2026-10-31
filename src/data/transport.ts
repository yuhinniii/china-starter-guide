// transport 板块目录页的唯一数据源。改这里，9 个语种的目录页同时生效。
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
    value: "350 km/h",
    color: 'blue',
    label:
    {
      en: "Top speed, G trains",
      zh: "高铁最高时速",
      es: "Velocidad máx., tren G",
      fr: "Vitesse max., trains G",
      ja: "G号の最高速度",
      ko: "G열차 최고 속도",
      ar: "أقصى سرعة لقطارات G",
      ru: "Макс. скорость, G",
      th: "ความเร็วสูงสุดของรถ G",
    },
  },
  {
    value: "15 days",
    color: 'indigo',
    label:
    {
      en: "Ticket presale window",
      zh: "车票预售期",
      es: "Venta anticipada",
      fr: "Ouverture des ventes",
      ja: "発売開始は15日前",
      ko: "승차권 예매 오픈",
      ar: "فترة الحجز المسبق",
      ru: "Срок продажи билетов",
      th: "ระยะเวลาเปิดจองตั๋ว",
    },
  },
  {
    value: "¥3–10",
    color: 'emerald',
    label:
    {
      en: "Metro ride in city",
      zh: "市区地铁单程",
      es: "Metro en la ciudad",
      fr: "Métro en ville",
      ja: "市内メトロ運賃",
      ko: "시내 지하철 요금",
      ar: "مترو المدينة",
      ru: "Метро в городе",
      th: "ค่าโดยสารรถไฟใต้ดิน",
    },
  },
  {
    value: "0",
    color: 'amber',
    label:
    {
      en: "Paper tickets needed",
      zh: "需要的纸质票",
      es: "Billetes de papel",
      fr: "Billets papier",
      ja: "紙の切符は不要",
      ko: "종이 승차권",
      ar: "تذاكر ورقية",
      ru: "Бумажные билеты",
      th: "ตั๋วกระดาษ",
    },
  },
];

export const GROUPS: Group[] = [
  {
    color: 'sky',
    name:
    {
      en: "Getting Around China",
      zh: "出行概览",
      es: "Cómo moverse por China",
      fr: "Se déplacer en Chine",
      ja: "中国国内の移動",
      ko: "중국 내 이동",
      ar: "التجول في الصين",
      ru: "Передвижение по Китаю",
      th: "การเดินทางทั่วจีน",
    },
  },
  {
    color: 'emerald',
    name:
    {
      en: "Arriving in China",
      zh: "抵达中国",
      es: "Llegar a China",
      fr: "Arrivée en Chine",
      ja: "中国への到着",
      ko: "중국 도착",
      ar: "الوصول إلى الصين",
      ru: "Прибытие в Китай",
      th: "การมาถึงจีน",
    },
  },
  {
    color: 'purple',
    name:
    {
      en: "City Transport",
      zh: "市内交通",
      es: "Transporte urbano",
      fr: "Transport urbain",
      ja: "都市交通",
      ko: "시내 교통",
      ar: "النقل في المدينة",
      ru: "Городской транспорт",
      th: "การเดินทางในเมือง",
    },
  },
  {
    color: 'gray',
    name:
    {
      en: "Ride-Hailing",
      zh: "网约车",
      es: "Viajes compartidos",
      fr: "VTC (Ride-Hailing)",
      ja: "配車サービス",
      ko: "차량 호출",
      ar: "استئجار الركوب",
      ru: "Каршеринг",
      th: "เรียกรถ",
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
    slug: "transport-guide",
    group: 0,
    tag:
    {
      en: "📖 Overview",
      zh: "📖 概览",
      es: "📖 General",
      fr: "📖 Aperçu",
      ja: "📖 概要",
      ko: "📖 개요",
      ar: "📖 نظرة عامة",
      ru: "📖 Обзор",
      th: "📖 ภาพรวม",
    },
    title:
    {
      en: "How to Get Around China",
      zh: "在中国怎么出行",
      es: "Cómo moverse por China",
      fr: "Comment se déplacer en Chine",
      ja: "中国での移動方法",
      ko: "중국 내 이동 방법",
      ar: "كيفية التجول في الصين",
      ru: "Как передвигаться по Китаю",
      th: "วิธีเดินทางในจีน",
    },
    desc:
    {
      en: "Complete overview of all transport options — trains, planes, metro, and more.",
      zh: "所有交通方式的完整介绍——高铁、飞机、地铁等。",
      es: "Visión general completa de todas las opciones de transporte: trenes, aviones, metro y más.",
      fr: "Aperçu complet de toutes les options de transport — trains, avions, métro et plus.",
      ja: "すべての交通手段の完全概要 — 鉄道、飛行機、地下鉄など。",
      ko: "모든 교통 수단 종합 개요 — 기차, 비행기, 지하철 등.",
      ar: "نظرة عامة كاملة عن جميع خيارات النقل — القطارات، الطائرات، المترو، والمزيد.",
      ru: "Полный обзор всех видов транспорта — поезда, самолёты, метро и другое.",
      th: "ภาพรวมตัวเลือกการเดินทางทั้งหมด — รถไฟ เครื่องบิน รถไฟฟ้าใต้ดิน และอื่นๆ",
    },
  },
  {
    slug: "airport-to-city",
    group: 1,
    tag:
    {
      en: "🛬 Guide",
      zh: "🛬 指南",
      es: "🛬 Guía",
      fr: "🛬 Guide",
      ja: "🛬 ガイド",
      ko: "🛬 가이드",
      ar: "🛬 دليل",
      ru: "🛬 Гайд",
      th: "🛬 คู่มือ",
    },
    title:
    {
      en: "From Airport to City",
      zh: "从机场到市区",
      es: "Del aeropuerto a la ciudad",
      fr: "De l'aéroport au centre-ville",
      ja: "空港から市内へ",
      ko: "공항에서 시내로 가는 방법",
      ar: "من المطار إلى المدينة",
      ru: "Из аэропорта в город",
      th: "จากสนามบินเข้าเมือง",
    },
    desc:
    {
      en: "Transport options at major airports — Beijing, Shanghai, Guangzhou, and more.",
      zh: "各大机场的交通选择——北京、上海、广州等。",
      es: "Opciones de transporte en los principales aeropuertos: Pekín, Shanghái, Cantón y más.",
      fr: "Options de transport dans les principaux aéroports — Pékin, Shanghai, Canton et plus.",
      ja: "主要空港の交通手段 — 北京、上海、広州など。",
      ko: "베이징, 상하이, 광저우 등 주요 공항 교통 옵션.",
      ar: "خيارات النقل في المطارات الرئيسية — بكين، شنغهاي، قوانغتشو، والمزيد.",
      ru: "Варианты транспорта в крупных аэропортах — Пекин, Шанхай, Гуанчжоу и другие.",
      th: "ตัวเลือกการเดินทางที่สนามบินหลัก — ปักกิ่ง เซี่ยงไฮ้ กวางโจว และอื่นๆ",
    },
  },
  {
    slug: "high-speed-rail",
    group: 2,
    tag:
    {
      en: "🚄 Guide",
      zh: "🚄 指南",
      es: "🚄 Guía",
      fr: "🚄 Guide",
      ja: "🚄 ガイド",
      ko: "🚄 가이드",
      ar: "🚄 دليل",
      ru: "🚄 Гайд",
      th: "🚄 คู่มือ",
    },
    title:
    {
      en: "How to Book and Ride China High-Speed Rail",
      zh: "如何购票和乘坐中国高铁",
      es: "Cómo reservar y usar el tren bala en China",
      fr: "Comment réserver et prendre le TGV chinois",
      ja: "中国高速鉄道の予約と乗り方",
      ko: "중국 고속철도 예매 및 탑승 방법",
      ar: "كيفية حجز وركوب القطار فائق السرعة في الصين",
      ru: "Как купить билет и поехать на скоростном поезде",
      th: "วิธีจองและนั่งรถไฟความเร็วสูงในจีน",
    },
    desc:
    {
      en: "Everything about booking and riding the world's largest HSR network.",
      zh: "关于订票和乘坐全球最大高铁网络的所有信息。",
      es: "Todo sobre la reserva y el uso de la red de tren de alta velocidad más grande del mundo.",
      fr: "Tout savoir sur la réservation et l'utilisation du plus grand réseau de TGV au monde.",
      ja: "世界最大の高速鉄道網の予約と利用方法のすべて。",
      ko: "세계 최대 고속철도 네트워크 예매 및 이용에 관한 모든 것.",
      ar: "كل شيء عن حجز وركوب أكبر شبكة قطارات فائقة السرعة في العالم.",
      ru: "Всё о покупке билетов и поездках по крупнейшей в мире сети ВСМ.",
      th: "ทุกเรื่องเกี่ยวกับการจองและนั่งรถไฟเครือข่าย HSR ที่ใหญ่ที่สุดในโลก",
    },
  },
  {
    slug: "metro-bus",
    group: 2,
    tag:
    {
      en: "🚇 Guide",
      zh: "🚇 指南",
      es: "🚇 Guía",
      fr: "🚇 Guide",
      ja: "🚇 ガイド",
      ko: "🚇 가이드",
      ar: "🚇 دليل",
      ru: "🚇 Гайд",
      th: "🚇 คู่มือ",
    },
    title:
    {
      en: "Metro & Bus Guide for Major Cities",
      zh: "主要城市地铁和公交指南",
      es: "Guía de metro y autobús para las principales ciudades",
      fr: "Guide du métro et du bus dans les grandes villes",
      ja: "主要都市の地下鉄・バスガイド",
      ko: "주요 도시 지하철 & 버스 가이드",
      ar: "دليل المترو والحافلات للمدن الكبرى",
      ru: "Метро и автобусы в крупных городах",
      th: "คู่มือรถไฟฟ้าและรถบัสในเมืองหลัก",
    },
    desc:
    {
      en: "Navigate public transit in Beijing, Shanghai, Guangzhou, and Shenzhen.",
      zh: "在北京、上海、广州、深圳乘坐公共交通。",
      es: "Navega por el transporte público en Pekín, Shanghái, Cantón y Shenzhen.",
      fr: "Naviguez dans les transports en commun à Pékin, Shanghai, Canton et Shenzhen.",
      ja: "北京、上海、広州、深圳の公共交通機関を利用しよう。",
      ko: "베이징, 상하이, 광저우, 선전의 대중교통 이용 방법.",
      ar: "التنقل في وسائل النقل العام في بكين، شنغهاي، قوانغتشو، وشنتشن.",
      ru: "Как пользоваться общественным транспортом в Пекине, Шанхае, Гуанчжоу и Шэньчжэне.",
      th: "เดินทางด้วยระบบขนส่งสาธารณะในปักกิ่ง เซี่ยงไฮ้ กวางโจว และเซินเจิ้น",
    },
  },
  {
    slug: "flights-vs-rail",
    group: 2,
    tag:
    {
      en: "✈️ Guide",
      zh: "✈️ 指南",
      es: "✈️ Guía",
      fr: "✈️ Guide",
      ja: "✈️ ガイド",
      ko: "✈️ 가이드",
      ar: "✈️ دليل",
      ru: "✈️ Гайд",
      th: "✈️ คู่มือ",
    },
    title:
    {
      en: "Flights vs High-Speed Rail",
      zh: "高铁 vs 航班",
      es: "Vuelos vs tren de alta velocidad",
      fr: "Avion vs TGV",
      ja: "飛行機 vs 高速鉄道",
      ko: "고속철도 vs 항공편",
      ar: "الطائرات مقابل القطار فائق السرعة",
      ru: "Самолёт или высокоскоростной поезд",
      th: "เครื่องบิน vs รถไฟความเร็วสูง",
    },
    desc:
    {
      en: "Train or plane for your China trip? A numbers-backed comparison.",
      zh: "火车还是飞机？一个用数据说话的对比。",
      es: "¿Tren o avión para tu viaje a China? Una comparación basada en datos.",
      fr: "Train ou avion pour votre voyage en Chine ? Une comparaison chiffrée.",
      ja: "中国旅行の移動は列車か飛行機か？数字に基づいた比較。",
      ko: "기차와 비행기 중 무엇을 탈까? 데이터로 비교해 드립니다.",
      ar: "قطار أم طائرة لرحلتك في الصين؟ مقارنة مدعومة بالأرقام.",
      ru: "Поезд или самолёт для твоей поездки по Китаю? Сравнение с цифрами.",
      th: "รถไฟหรือเครื่องบินสำหรับทริปจีน? การเปรียบเทียบที่มีตัวเลขรองรับ",
    },
  },
  {
    slug: "didi",
    group: 3,
    tag:
    {
      en: "🚕 Tutorial",
      zh: "🚕 教程",
      es: "🚕 Tutorial",
      fr: "🚕 Tutoriel",
      ja: "🚕 チュートリアル",
      ko: "🚕 튜토리얼",
      ar: "🚕 دليل",
      ru: "🚕 Инструкция",
      th: "🚕 บทช่วยสอน",
    },
    title:
    {
      en: "How to Use Didi in China as a Foreigner",
      zh: "外国人如何使用滴滴",
      es: "Cómo usar DiDi en China como extranjero",
      fr: "Comment utiliser Didi en Chine en tant qu'étranger",
      ja: "外国人が中国でDiDiを使う方法",
      ko: "외국인이 중국에서 Didi 사용하는 방법",
      ar: "كيفية استخدام Didi في الصين كأجنبي",
      ru: "Как иностранцу пользоваться DiDi в Китае",
      th: "วิธีใช้ DiDi ในจีนสำหรับชาวต่างชาติ",
    },
    desc:
    {
      en: "Step-by-step guide to using DiDi, China's Uber — with screenshots.",
      zh: "使用滴滴（中国版 Uber）的详细指南——含截图。",
      es: "Guía paso a paso para usar DiDi, el Uber chino — con capturas de pantalla.",
      fr: "Guide étape par étape pour utiliser DiDi, le Uber chinois — avec captures d'écran.",
      ja: "中国版Uber、DiDiの使い方をスクリーンショット付きで解説。",
      ko: "중국의 Uber, DiDi 사용 단계별 가이드 — 스크린샷 포함.",
      ar: "دليل خطوة بخطوة لاستخدام DiDi، أوبر الصين — مع لقطات شاشة.",
      ru: "Пошаговая инструкция по использованию DiDi, китайского Uber — со скриншотами.",
      th: "คู่มือการใช้ DiDi, Uber ของจีน — พร้อมภาพประกอบ",
    },
  },
];
