const fs = require('fs');
const path = require('path');

// Complete mapping of all zh page titles → Chinese
const titleMap = {
  'About — China Starter Guide': '关于——中国入门指南',
  'Essential Apps for China': '中国必备应用',
  'Beijing Travel Guide: What to See, Eat, and Know': '北京旅游指南：看什么、吃什么、知道什么',
  'Chengdu Travel Guide: Pandas, Spicy Food & Slow Life': '成都旅游指南：熊猫、麻辣美食与慢生活',
  'How Many Days Do You Need in China? Itinerary by Trip Length': '你需要在中国待多少天？按行程长度推荐行程',
  'Guangzhou Travel Guide: Food Capital of China': '广州旅游指南：中国的美食之都',
  'Hainan Travel Guide 2026 — Visa-Free for 59 Countries': '海南旅游指南2026——59个国家免签证',
  'China City Guides — Travel Destinations': '中国城市指南——旅游目的地',
  'Shanghai Travel Guide: The Most Foreigner-Friendly City': '上海旅游指南：最友好的外国游客城市',
  'Shenzhen Travel Guide: Tech Hub Next to Hong Kong': '深圳旅游指南：香港旁边的科技中心',
  'Contact — China Starter Guide': '联系我们——中国入门指南',
  'Essential Chinese Phrases for Travelers': '旅行者必备中文短语',
  'Common Scams in China & How to Avoid Them': '中国的常见骗局以及如何避免',
  'Cultural Dos and Don\'ts in China — A Practical Guide': '中国的文化禁忌与礼仪——实用指南',
  'Emergency Numbers & What to Do If You Need Help in China': '紧急电话号码及在中国需要帮助时该怎么办',
  '10 Apps You Need to Download Before Traveling to China': '去中国之前需要下载的10个必备应用',
  'Life in China — Travel Tips & Guides': '中国生活——旅游贴士与指南',
  'Is it safe to travel to China?': '去中国旅行安全吗？',
  'Medical Care in China — Clinics, Hospitals & Insurance': '中国的医疗服务——诊所、医院与保险',
  'What to Pack for China — Seasons & Climate Guide': '去中国该带什么——季节与气候指南',
  'Seeing a Doctor in China: Clinics, Hospitals & Insurance': '在中国看病：诊所、医院和保险',
  'Best SIM Card & eSIM for Tourists in China': '中国游客的最佳SIM卡和eSIM选择',
  'Your China Trip Survival Kit: Everything You Need Before You Go': '你的中国之旅生存工具包：出发前需要的一切',
  'China Travel Tips — Safety, Scams, Emergency, Culture': '中国旅游小贴士——安全、骗局、紧急情况、文化',
  'Top Hospitals with International Departments in China': '中国设有国际部的最佳医院',
  'Travel Insurance for China: What to Look For': '中国旅行保险：应该关注什么',
  'Best VPNs for Traveling in China': '在中国旅行使用的最佳VPN',
  'Medical Guide for China — Hospitals & Insurance': '中国医疗指南——医院与保险',
  'Can You Use Foreign Credit Cards in China? A Realistic Look': '在中国可以使用外国信用卡吗？真实情况分析',
  'Payment Guide — How to Pay in China': '支付指南——如何在中国支付',
  'What to Do When Your Payment Fails in China': '在中国支付失败时该怎么办',
  'How to Pay in China: Complete Guide for Foreign Visitors': '如何在中国支付：外国游客完整指南',
  'How to Set Up Alipay as a Foreigner (2026): Step-by-Step Guide': '外国人如何设置支付宝（2026）：逐步指南',
  'How to Set Up WeChat Pay as a Foreigner (2026): Step-by-Step Guide': '外国人如何设置微信支付（2026）：逐步指南',
  'China Tipping Culture: Do You Need to Tip?': '中国小费文化：需要给小费吗？',
  'Prepare for China — Entry & Setup Guide': '为中国做准备——入境与设置指南',
  'How to Apply for China Tourist Visa (L-Type) 2026: A Step-by-Step Guide': '如何申请中国旅游签证（L型）2026：逐步指南',
  'Visa & Entry Rules — China Starter Guide': '签证与入境规则——中国入门指南',
  'Mutual Visa-Free Agreements (29 Countries) — China Starter Guide': '互免签证协议（29个国家）——中国入门指南',
  'China 240-Hour Visa-Free Transit (2026) — China Starter Guide': '中国240小时免签过境（2026）——中国入门指南',
  'China Visa-Free Countries List (2026) — China Starter Guide': '中国免签国家名单（2026）——中国入门指南',
  'China Visa Types Complete Guide 2026: Which Visa Do You Need?': '中国签证类型完整指南2026：你需要哪种签证？',
  'Privacy Policy — China Starter Guide': '隐私政策——中国入门指南',
  'Travel Tips for China — Safety, Scams & Culture': '中国旅游小贴士——安全、骗局与文化',
  'From Airport to City in China: What Usually Works Best': '从机场到中国城市：最有效的方式',
  'How to Use Didi in China as a Foreigner': '外国人如何在中国使用滴滴',
  'How to Book and Ride China High-Speed Rail: Step-by-Step Guide': '如何预订和乘坐中国高铁：逐步指南',
  'Transport Guide — Getting Around China': '交通指南——环游中国',
  'Metro & Bus Guide for Major Chinese Cities': '中国主要城市地铁与公交指南',
  'How to Get Around China: The Complete Transport Guide': '如何环游中国：完整交通指南',
  'Visa & Entry Guide for China — China Starter Guide': '中国签证与入境指南——中国入门指南',
  'How to Submit Your Arrival Card to China Online — Step-by-Step Guide with Screenshots': '如何在线提交中国入境卡——带截图的逐步指南',
  'China Customs Regulations: What You Can and Cannot Bring into China': '中国海关规定：你可以带入和不能带入中国的物品',
  'First Time in China: Step-by-Step Preparation Guide': '首次来中国：逐步准备指南',
  'Hainan Travel Guide 2026 — Visa-Free for 59 Countries': '海南旅游指南2026——59个国家免签证',
};

const descMap = {
  'Why we built this guide and who it is for.': '我们为什么制作这本指南以及它是为谁准备的。',
  'Your essential guide to traveling, living and working in China.': '你在中国旅行、生活和工作的重要指南。',
  'The apps you actually need in China — setup guides for non-Chinese speakers.': '你在��国实际需要的应用——为非中文用户提供的设置指南。',
  'Everything you need to know before coming to China: payment, transport, apps, cities, and travel tips.': '来中国之前你需要知道的一切：支付、交通、应用、城市和旅行提示。',
  'Full Beijing travel guide — must-see landmarks, authentic food, practical tips, and everything you need to know.': '北京完整旅游指南——必看景点、地道美食、实用贴士和出行必备知识。',
  'Full Chengdu travel guide — see pandas, eat Sichuan\'s spiciest food, and experience Sichuan\'s laid-back lifestyle.': '成都完整旅游指南——看大熊猫、吃最辣的川菜、体验四川的悠闲生活。',
};

const baseDir = 'src/pages/zh';
let fixed = 0;

function fix(dir) {
  for (const e of fs.readdirSync(dir)) {
    const full = path.join(dir, e);
    if (fs.statSync(full).isDirectory()) { fix(full); continue; }
    if (!e.endsWith('.astro')) continue;
    
    let content = fs.readFileSync(full, 'utf-8');
    const orig = content;
    
    // Fix title
    for (const [en, zh] of Object.entries(titleMap)) {
      content = content.replace(`const title = "${en}"`, `const title = "${zh}"`);
      content = content.replace(`const title = '${en}'`, `const title = '${zh}'`);
    }
    
    // Fix description
    for (const [en, zh] of Object.entries(descMap)) {
      content = content.replace(`const description = "${en}"`, `const description = "${zh}"`);
      content = content.replace(`const description = '${en}'`, `const description = '${zh}'`);
    }
    
    if (content !== orig) {
      fs.writeFileSync(full, content, 'utf-8');
      fixed++;
      console.log('✓ ' + path.relative(baseDir, full));
    }
  }
}
fix(baseDir);
console.log('\nFixed ' + fixed + ' files.');
