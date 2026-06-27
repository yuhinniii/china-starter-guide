import { readFileSync, writeFileSync } from 'fs';

const base = 'src/pages/zh';

// Each broken file: search for the broken string and replace with the full correct description line
const replacements = {
  'cities/chengdu-guide.astro': {
    search: `const description = "成都深度游指南——看大熊猫、吃火锅、体验悠闲的天府之国。"s spiciest food, and experience Sichuan's laid-back lifestyle.";`,
    replace: `const description = "成都深度游指南——看大熊猫、吃火锅、体验悠闲的天府之国的慢生活。";`
  },
  'cities/guangzhou-guide.astro': {
    search: `const description = "广州旅游全攻略——早茶文化、粤菜美食、景点推荐和实用贴士。"s food capital with world-famous dim sum, Cantonese culture, and easy access to Hong Kong.";`,
    replace: `const description = "广州旅游全攻略——早茶文化、粤菜美食、景点推荐和实用贴士。";`
  },
  'cities/shanghai-guide.astro': {
    search: `const description = "上海旅行攻略——外滩、豫园、新天地，以及对外国人最友好的城市体验。"s most international city.";`,
    replace: `const description = "上海旅行攻略——外滩、豫园、新天地，体验中国最国际化的都市。";`
  },
  'cities/shenzhen-guide.astro': {
    search: `const description = "深圳旅游攻略——现代化都市、科技体验和邻近香港的便利出行。"s tech capital, gateway to Hong Kong, mountain-and-sea outdoor adventures, and a modern city built in just 40 years.";`,
    replace: `const description = "深圳旅游攻略——现代化科技都市，紧邻香港，山海景观与现代城市完美融合。";`
  },
  'life/common-scams.astro': {
    search: `const description = "外国游客在中国的常见骗局大全——如何识别、预防和保护自己。"t let scammers ruin your China trip. Here are the most common tourist scams in China and exactly how to avoid them.";`,
    replace: `const description = "外国游客在中国的常见骗局大全——如何识别、预防和保护自己，让骗子无机可乘。";`
  },
  'life/survival-kit.astro': {
    search: `const description = "从应用到SIM卡，从VPN到行李打包——出发前在中国的完整检查清单。"s your complete pre-travel checklist for China.";`,
    replace: `const description = "从应用到SIM卡，从VPN到行李打包——出发前在中国的完整检查清单。";`
  },
  'life/top-hospitals.astro': {
    search: `const description = "中国主要城市的国际医院推荐——北京、上海、广州等地的优质医疗资源。"s best A++++ ranked hospitals with International Departments (国际部) for foreign visitors — sorted by city.";`,
    replace: `const description = "中国主要城市的国际医院推荐——北京、上海、广州等地的优质医疗资源。";`
  },
  'life/vpn-guide.astro': {
    search: `const description = "在中国可行的最佳VPN——什么好用、什么不好用，以及如何在抵达前设置VPN。"t, and how to set up your VPN before you arrive.";`,
    replace: `const description = "在中国可行的最佳VPN——什么好用、什么不好用，以及如何在出发前设置好。";`
  },
  'medical/top-hospitals.astro': {
    search: `const description = "中国主要城市的国际医院推荐——北京、上海、广州等地的优质医疗资源。"s best A++++ ranked hospitals with International Departments (国际部) for foreign visitors — sorted by city.";`,
    replace: `const description = "中国主要城市的国际医院推荐——北京、上海、广州等地的优质医疗资源。";`
  },
  'tips/common-scams.astro': {
    search: `const description = "外国游客在中国的常见骗局大全——如何识别、预防和保护自己。"t let scammers ruin your China trip. Here are the most common tourist scams in China and exactly how to avoid them.";`,
    replace: `const description = "外国游客在中国的常见骗局大全——如何识别、预防和保护自己，让骗子无机可乘。";`
  }
};

let fixed = 0;
for (const [file, {search, replace}] of Object.entries(replacements)) {
  const fp = base + '/' + file;
  let content = readFileSync(fp, 'utf-8');
  if (content.includes(search)) {
    content = content.replace(search, replace);
    writeFileSync(fp, content, 'utf-8');
    console.log('FIXED: ' + file);
    fixed++;
  } else {
    console.log('NOT FOUND (maybe already fixed): ' + file);
  }
}
console.log('Fixed ' + fixed + ' files.');
