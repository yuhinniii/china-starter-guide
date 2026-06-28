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
    siteName: 'China Starter Hub',
    nav: [
      { label: 'Home', href: '/en/' },
      { label: 'Visa', href: '/en/visa/' },
      { label: 'Payment', href: '/en/payment/' },
      { label: 'Transport', href: '/en/transport/' },
      { label: 'Life in China', href: '/en/life/' },
      { label: 'Cities', href: '/en/cities/' },
      { label: 'Search', href: '/en/search/' },
      { label: 'About', href: '/en/about/' },
    ],
    footer: { about: 'About', privacy: 'Privacy', contact: 'Contact' },
    language: 'Language',
  },
  zh: {
    siteName: 'China Starter Hub',
    nav: [
      { label: '首页', href: '/zh/' },
      { label: '签证', href: '/zh/visa/' },
      { label: '支付', href: '/zh/payment/' },
      { label: '交通', href: '/zh/transport/' },
      { label: '在中国的生活', href: '/zh/life/' },
      { label: '城市', href: '/zh/cities/' },
      { label: '搜索', href: '/zh/search/' },
      { label: '关于', href: '/zh/about/' },
    ],
    footer: { about: '关于', privacy: '隐私', contact: '联系' },
    language: '语言',
  },
  ja: {
    siteName: 'China Starter Hub',
    nav: [
      { label: 'ホーム', href: '/ja/' },
      { label: 'ビザ', href: '/ja/visa/' },
      { label: '支払い', href: '/ja/payment/' },
      { label: '交通', href: '/ja/transport/' },
      { label: '中国での生活', href: '/ja/life/' },
      { label: '都市', href: '/ja/cities/' },
      { label: '検索', href: '/ja/search/' },
      { label: 'について', href: '/ja/about/' },
    ],
    footer: { about: 'について', privacy: 'プライバシー', contact: 'お問い合わせ' },
    language: '言語',
  },
  ko: {
    siteName: 'China Starter Hub',
    nav: [
      { label: '홈', href: '/ko/' },
      { label: '비자', href: '/ko/visa/' },
      { label: '결제', href: '/ko/payment/' },
      { label: '교통', href: '/ko/transport/' },
      { label: '중국에서의 생활', href: '/ko/life/' },
      { label: '도시', href: '/ko/cities/' },
      { label: '검색', href: '/ko/search/' },
      { label: '소개', href: '/ko/about/' },
    ],
    footer: { about: '소개', privacy: '개인정보', contact: '문의' },
    language: '언어',
  },
  fr: {
    siteName: 'China Starter Hub',
    nav: [
      { label: 'Accueil', href: '/fr/' },
      { label: 'Visa', href: '/fr/visa/' },
      { label: 'Paiement', href: '/fr/payment/' },
      { label: 'Transport', href: '/fr/transport/' },
      { label: 'Vie en Chine', href: '/fr/life/' },
      { label: 'Villes', href: '/fr/cities/' },
      { label: 'Recherche', href: '/fr/search/' },
      { label: 'À propos', href: '/fr/about/' },
    ],
    footer: { about: 'À propos', privacy: 'Confidentialité', contact: 'Contact' },
    language: 'Langue',
  },
  th: {
    siteName: 'China Starter Hub',
    nav: [
      { label: 'หน้าแรก', href: '/th/' },
      { label: 'วีซ่า', href: '/th/visa/' },
      { label: 'การชำระเงิน', href: '/th/payment/' },
      { label: 'การคมนาคม', href: '/th/transport/' },
      { label: 'ชีวิตในจีน', href: '/th/life/' },
      { label: 'เมือง', href: '/th/cities/' },
      { label: 'ค้นหา', href: '/th/search/' },
      { label: 'เกี่ยวกับ', href: '/th/about/' },
    ],
    footer: { about: 'เกี่ยวกับ', privacy: 'ความเป็นส่วนตัว', contact: 'ติดต่อ' },
    language: 'ภาษา',
  },
  ru: {
    siteName: 'China Starter Hub',
    nav: [
      { label: 'Главная', href: '/ru/' },
      { label: 'Виза', href: '/ru/visa/' },
      { label: 'Оплата', href: '/ru/payment/' },
      { label: 'Транспорт', href: '/ru/transport/' },
      { label: 'Жизнь в Китае', href: '/ru/life/' },
      { label: 'Города', href: '/ru/cities/' },
      { label: 'Поиск', href: '/ru/search/' },
      { label: 'О нас', href: '/ru/about/' },
    ],
    footer: { about: 'О нас', privacy: 'Конфиденциальность', contact: 'Контакты' },
    language: 'Язык',
  },
  es: {
    siteName: 'China Starter Hub',
    nav: [
      { label: 'Inicio', href: '/es/' },
      { label: 'Visa', href: '/es/visa/' },
      { label: 'Pago', href: '/es/payment/' },
      { label: 'Transporte', href: '/es/transport/' },
      { label: 'Vida en China', href: '/es/life/' },
      { label: 'Ciudades', href: '/es/cities/' },
      { label: 'Buscar', href: '/es/search/' },
      { label: 'Acerca de', href: '/es/about/' },
    ],
    footer: { about: 'Acerca de', privacy: 'Privacidad', contact: 'Contacto' },
    language: 'Idioma',
  },
  ar: {
    siteName: 'China Starter Hub',
    nav: [
      { label: 'الرئيسية', href: '/ar/' },
      { label: 'التأشيرة', href: '/ar/visa/' },
      { label: 'الدفع', href: '/ar/payment/' },
      { label: 'النقل', href: '/ar/transport/' },
      { label: 'الحياة في الصين', href: '/ar/life/' },
      { label: 'المدن', href: '/ar/cities/' },
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
