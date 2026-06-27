/**
 * Multi-language UI strings for the site navigation, footer, and language switcher.
 * Supported languages: en, zh, ja, ko, fr, th, ru, es, ar
 * Source of truth for Layout.astro and translate.cjs metadata.
 */

export type UILang = 'en' | 'zh' | 'ja' | 'ko' | 'fr' | 'th' | 'ru' | 'es' | 'ar';

export const langs: UILang[] = ['en', 'zh', 'ja', 'ko', 'fr', 'th', 'ru', 'es', 'ar'];

export const langLabels: Record<UILang, string> = {
  en: 'English',
  zh: '中文',
  ja: '日本語',
  ko: '한국어',
  fr: 'Français',
  th: 'ไทย',
  ru: 'Русский',
  es: 'Español',
  ar: 'العربية',
};

export const langDirections: Record<UILang, 'ltr' | 'rtl'> = {
  en: 'ltr',
  zh: 'ltr',
  ja: 'ltr',
  ko: 'ltr',
  fr: 'ltr',
  th: 'ltr',
  ru: 'ltr',
  es: 'ltr',
  ar: 'rtl',
};

export const defaultLocale: UILang = 'en';

export const ui: Record<UILang, {
  siteName: string;
  nav: { label: string; href: string }[];
  footer: {
    about: string;
    privacy: string;
    contact: string;
  };
  language: string;
}> = {
  en: {
    siteName: 'China Starter Guide',
    nav: [
      { label: 'Home', href: '/en/' },
      { label: 'Prepare', href: '/en/prepare/' },
      { label: 'Payment', href: '/en/payment/' },
      { label: 'Transport', href: '/en/transport/' },
      { label: 'Life', href: '/en/life/' },
      { label: 'Medical', href: '/en/medical/' },
      { label: 'Cities', href: '/en/cities/' },
      { label: 'Tips', href: '/en/tips/' },
      { label: 'Search', href: '/en/search/' },
      { label: 'About', href: '/en/about/' },
    ],
    footer: { about: 'About', privacy: 'Privacy', contact: 'Contact' },
    language: 'Language',
  },
  zh: {
    siteName: '中国入门指南',
    nav: [
      { label: '首页', href: '/zh/' },
      { label: '行前准备', href: '/zh/prepare/' },
      { label: '支付', href: '/zh/payment/' },
      { label: '交通', href: '/zh/transport/' },
      { label: '生活', href: '/zh/life/' },
      { label: '医疗', href: '/zh/medical/' },
      { label: '城市', href: '/zh/cities/' },
      { label: '贴士', href: '/zh/tips/' },
      { label: '搜索', href: '/zh/search/' },
      { label: '关于', href: '/zh/about/' },
    ],
    footer: { about: '关于', privacy: '隐私', contact: '联系' },
    language: '语言',
  },
  ja: {
    siteName: '中国スターターガイド',
    nav: [
      { label: 'ホーム', href: '/ja/' },
      { label: '準備', href: '/ja/prepare/' },
      { label: '支払い', href: '/ja/payment/' },
      { label: '交通', href: '/ja/transport/' },
      { label: '生活', href: '/ja/life/' },
      { label: '医療', href: '/ja/medical/' },
      { label: '都市', href: '/ja/cities/' },
      { label: 'ヒント', href: '/ja/tips/' },
      { label: '検索', href: '/ja/search/' },
      { label: 'について', href: '/ja/about/' },
    ],
    footer: { about: 'について', privacy: 'プライバシー', contact: 'お問い合わせ' },
    language: '言語',
  },
  ko: {
    siteName: '차이나 스타터 가이드',
    nav: [
      { label: '홈', href: '/ko/' },
      { label: '준비', href: '/ko/prepare/' },
      { label: '결제', href: '/ko/payment/' },
      { label: '교통', href: '/ko/transport/' },
      { label: '생활', href: '/ko/life/' },
      { label: '의료', href: '/ko/medical/' },
      { label: '도시', href: '/ko/cities/' },
      { label: '팁', href: '/ko/tips/' },
      { label: '검색', href: '/ko/search/' },
      { label: '소개', href: '/ko/about/' },
    ],
    footer: { about: '소개', privacy: '개인정보', contact: '문의' },
    language: '언어',
  },
  fr: {
    siteName: 'Guide de démarrage pour la Chine',
    nav: [
      { label: 'Accueil', href: '/fr/' },
      { label: 'Préparer', href: '/fr/prepare/' },
      { label: 'Paiement', href: '/fr/payment/' },
      { label: 'Transport', href: '/fr/transport/' },
      { label: 'Vie', href: '/fr/life/' },
      { label: 'Médical', href: '/fr/medical/' },
      { label: 'Villes', href: '/fr/cities/' },
      { label: 'Conseils', href: '/fr/tips/' },
      { label: 'Recherche', href: '/fr/search/' },
      { label: 'À propos', href: '/fr/about/' },
    ],
    footer: { about: 'À propos', privacy: 'Confidentialité', contact: 'Contact' },
    language: 'Langue',
  },
  th: {
    siteName: 'คู่มือเริ่มต้นสำหรับจีน',
    nav: [
      { label: 'หน้าแรก', href: '/th/' },
      { label: 'เตรียมตัว', href: '/th/prepare/' },
      { label: 'การชำระเงิน', href: '/th/payment/' },
      { label: 'การคมนาคม', href: '/th/transport/' },
      { label: 'ชีวิต', href: '/th/life/' },
      { label: 'การแพทย์', href: '/th/medical/' },
      { label: 'เมือง', href: '/th/cities/' },
      { label: 'เคล็ดลับ', href: '/th/tips/' },
      { label: 'ค้นหา', href: '/th/search/' },
      { label: 'เกี่ยวกับ', href: '/th/about/' },
    ],
    footer: { about: 'เกี่ยวกับ', privacy: 'ความเป็นส่วนตัว', contact: 'ติดต่อ' },
    language: 'ภาษา',
  },
  ru: {
    siteName: 'Путеводитель по Китаю',
    nav: [
      { label: 'Главная', href: '/ru/' },
      { label: 'Подготовка', href: '/ru/prepare/' },
      { label: 'Оплата', href: '/ru/payment/' },
      { label: 'Транспорт', href: '/ru/transport/' },
      { label: 'Жизнь', href: '/ru/life/' },
      { label: 'Медицина', href: '/ru/medical/' },
      { label: 'Города', href: '/ru/cities/' },
      { label: 'Советы', href: '/ru/tips/' },
      { label: 'Поиск', href: '/ru/search/' },
      { label: 'О нас', href: '/ru/about/' },
    ],
    footer: { about: 'О нас', privacy: 'Конфиденциальность', contact: 'Контакты' },
    language: 'Язык',
  },
  es: {
    siteName: 'Guía de inicio para China',
    nav: [
      { label: 'Inicio', href: '/es/' },
      { label: 'Preparar', href: '/es/prepare/' },
      { label: 'Pago', href: '/es/payment/' },
      { label: 'Transporte', href: '/es/transport/' },
      { label: 'Vida', href: '/es/life/' },
      { label: 'Médico', href: '/es/medical/' },
      { label: 'Ciudades', href: '/es/cities/' },
      { label: 'Consejos', href: '/es/tips/' },
      { label: 'Buscar', href: '/es/search/' },
      { label: 'Acerca de', href: '/es/about/' },
    ],
    footer: { about: 'Acerca de', privacy: 'Privacidad', contact: 'Contacto' },
    language: 'Idioma',
  },
  ar: {
    siteName: 'دليل الصين للمبتدئين',
    nav: [
      { label: 'الرئيسية', href: '/ar/' },
      { label: 'الاستعداد', href: '/ar/prepare/' },
      { label: 'الدفع', href: '/ar/payment/' },
      { label: 'النقل', href: '/ar/transport/' },
      { label: 'الحياة', href: '/ar/life/' },
      { label: 'الطبية', href: '/ar/medical/' },
      { label: 'المدن', href: '/ar/cities/' },
      { label: 'نصائح', href: '/ar/tips/' },
      { label: 'بحث', href: '/ar/search/' },
      { label: 'حول', href: '/ar/about/' },
    ],
    footer: { about: 'حول', privacy: 'الخصوصية', contact: 'اتصل' },
    language: 'اللغة',
  },
};

// Runtime helpers
export function getUI(lang: string) {
  return ui[lang as UILang] || ui[defaultLocale];
}

export function isValidLang(lang: string): lang is UILang {
  return langs.includes(lang as UILang);
}
