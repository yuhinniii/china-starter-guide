# -*- coding: utf-8 -*-
"""把 cities/life/transport/visa 四个板块的目录页改成数据驱动。

做法：从现有 9 个语种的 index.astro 里抽出分组 + 卡片（tag/title/desc），
写入 src/data/<section>.ts，再把页面里写死的 Quick Stats 与分类清单替换成组件。
不做任何翻译，全部沿用页面上已有的文字，避免抄错。
"""
import os, re, json, html

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LANGS = ['en', 'zh', 'es', 'fr', 'ja', 'ko', 'ar', 'ru', 'th']
SECTIONS = ['cities', 'life', 'transport', 'visa']

# 原始页面备份目录（改造前 copy 出来的 36 个文件）。重复运行脚本时从这里取原文。
_backups = sorted(d for d in os.listdir(ROOT) if d.startswith('backup-sections-'))
BACKUP = _backups[-1]

STATS = {
    'cities': [
        ('5–7 days', [
            ('en', 'Days to plan'), ('zh', '建议停留天数'), ('es', 'Días a planear'),
            ('fr', 'Jours à prévoir'), ('ja', '旅程の日数'), ('ko', '여행 일수'),
            ('ar', 'أيام الرحلة'), ('ru', 'Дней на поездку'), ('th', 'จำนวนวัน')]),
        ('3 days', [
            ('en', 'Minimum per city'), ('zh', '每城最少天数'), ('es', 'Mínimo por ciudad'),
            ('fr', 'Minimum par ville'), ('ja', '1都市の最低日数'), ('ko', '도시당 최소 일수'),
            ('ar', 'الحد الأدنى للمدينة'), ('ru', 'Минимум на город'), ('th', 'ขั้นต่ำต่อเมือง')]),
        ('7 days', [
            ('en', 'Forbidden City booking'), ('zh', '故宫提前订票'), ('es', 'Reserva Ciudad Prohibida'),
            ('fr', 'Réservation Cité interdite'), ('ja', '故宮は事前予約'), ('ko', '자금성 사전 예약'),
            ('ar', 'حجز المدينة المحرمة'), ('ru', 'Бронь Запретного города'), ('th', 'จองพระราชวังต้องห้าม')]),
        ('4.5 h', [
            ('en', 'Beijing–Shanghai by rail'), ('zh', '京沪高铁用时'), ('es', 'Pekín–Shanghái en tren'),
            ('fr', 'Pékin–Shanghai en train'), ('ja', '北京–上海の鉄道'), ('ko', '베이징–상하이 철도'),
            ('ar', 'بكين–شنغهاي بالقطار'), ('ru', 'Пекин–Шанхай поездом'), ('th', 'ปักกิ่ง–เซี่ยงไฮ้ทางราง')]),
    ],
    'life': [
        ('110', [
            ('en', 'Police, 120 ambulance'), ('zh', '报警，急救 120'), ('es', 'Policía, 120 ambulancia'),
            ('fr', 'Police, 120 ambulances'), ('ja', '警察・救急 120'), ('ko', '경찰·구급 120'),
            ('ar', 'الشرطة والإسعاف 120'), ('ru', 'Полиция, скорая 120'), ('th', 'ตำรวจ · รถพยาบาล 120')]),
        ('4', [
            ('en', 'Apps before landing'), ('zh', '落地前必装 app'), ('es', 'Apps antes de llegar'),
            ('fr', "Apps avant d'arriver"), ('ja', '到着前に入れるアプリ'), ('ko', '출발 전 필수 앱'),
            ('ar', 'تطبيقات قبل الوصول'), ('ru', 'Приложения заранее'), ('th', 'แอปที่ต้องมีก่อนถึง')]),
        ('220V', [
            ('en', 'Type A/I sockets'), ('zh', 'Type A/I 插座'), ('es', 'Enchufes tipo A/I'),
            ('fr', 'Prises type A/I'), ('ja', 'A/I 型コンセント'), ('ko', 'A/I형 콘센트'),
            ('ar', 'مقابس نوع A/I'), ('ru', 'Розетки типа A/I'), ('th', 'ปลั๊กชนิด A/I')]),
        ('3', [
            ('en', 'Levels of care'), ('zh', '就医分级'), ('es', 'Niveles de atención'),
            ('fr', 'Niveaux de soins'), ('ja', '医療機関の3段階'), ('ko', '진료 3단계'),
            ('ar', 'مستويات الرعاية'), ('ru', 'Уровни помощи'), ('th', 'ระดับการรักษา')]),
    ],
    'transport': [
        ('350 km/h', [
            ('en', 'Top speed, G trains'), ('zh', '高铁最高时速'), ('es', 'Velocidad máx., tren G'),
            ('fr', 'Vitesse max., trains G'), ('ja', 'G号の最高速度'), ('ko', 'G열차 최고 속도'),
            ('ar', 'أقصى سرعة لقطارات G'), ('ru', 'Макс. скорость, G'), ('th', 'ความเร็วสูงสุดของรถ G')]),
        ('15 days', [
            ('en', 'Ticket presale window'), ('zh', '车票预售期'), ('es', 'Venta anticipada'),
            ('fr', 'Ouverture des ventes'), ('ja', '発売開始は15日前'), ('ko', '승차권 예매 오픈'),
            ('ar', 'فترة الحجز المسبق'), ('ru', 'Срок продажи билетов'), ('th', 'ระยะเวลาเปิดจองตั๋ว')]),
        ('¥3–10', [
            ('en', 'Metro ride in city'), ('zh', '市区地铁单程'), ('es', 'Metro en la ciudad'),
            ('fr', 'Métro en ville'), ('ja', '市内メトロ運賃'), ('ko', '시내 지하철 요금'),
            ('ar', 'مترو المدينة'), ('ru', 'Метро в городе'), ('th', 'ค่าโดยสารรถไฟใต้ดิน')]),
        ('0', [
            ('en', 'Paper tickets needed'), ('zh', '需要的纸质票'), ('es', 'Billetes de papel'),
            ('fr', 'Billets papier'), ('ja', '紙の切符は不要'), ('ko', '종이 승차권'),
            ('ar', 'تذاكر ورقية'), ('ru', 'Бумажные билеты'), ('th', 'ตั๋วกระดาษ')]),
    ],
    'visa': [
        ('240 h', [
            ('en', 'Visa-free transit'), ('zh', '过境免签停留'), ('es', 'Tránsito sin visado'),
            ('fr', 'Transit sans visa'), ('ja', '乗り継ぎ免除'), ('ko', '무비자 환승'),
            ('ar', 'عبور بدون تأشيرة'), ('ru', 'Транзит без визы'), ('th', 'เปลี่ยนเครื่องฟรีวีซ่า')]),
        ('30 days', [
            ('en', 'Visa-free stay'), ('zh', '免签停留上限'), ('es', 'Estancia sin visado'),
            ('fr', 'Séjour sans visa'), ('ja', '免除での滞在日数'), ('ko', '무비자 체류'),
            ('ar', 'الإقامة بدون تأشيرة'), ('ru', 'Безвизовое пребывание'), ('th', 'พำนักฟรีวีซ่า')]),
        ('6 months', [
            ('en', 'Passport validity'), ('zh', '护照有效期'), ('es', 'Validez del pasaporte'),
            ('fr', 'Validité du passeport'), ('ja', 'パスポート残存期間'), ('ko', '여권 유효기간'),
            ('ar', 'صلاحية الجواز'), ('ru', 'Срок действия паспорта'), ('th', 'อายุหนังสือเดินทาง')]),
        ('24 h', [
            ('en', 'Police registration'), ('zh', '住私宅需报备'), ('es', 'Registro en la policía'),
            ('fr', 'Enregistrement police'), ('ja', '警察への届出'), ('ko', '경찰 신고'),
            ('ar', 'تسجيل لدى الشرطة'), ('ru', 'Регистрация в полиции'), ('th', 'แจ้งที่พักต่อตำรวจ')]),
    ],
}

STAT_COLORS = ['blue', 'indigo', 'emerald', 'amber']

COUNT = {
    'en': '{n} articles', 'zh': '{n} 篇文章', 'es': '{n} artículos', 'fr': '{n} articles',
    'ja': '{n}記事', 'ko': '{n}개 문서', 'ar': '{n} مقالات', 'ru': '{n} статьи', 'th': '{n} บทความ',
}


def balanced_div(text, start):
    """从 <div ...> 的起始位置，找到与之配对的 </div> 结束位置（返回闭合标签后的下标）。"""
    depth = 0
    i = start
    tag = re.compile(r'<div\b|</div>')
    while True:
        m = tag.search(text, i)
        if not m:
            raise ValueError('unbalanced div')
        if m.group(0) == '</div>':
            depth -= 1
            if depth == 0:
                return m.end()
        else:
            depth += 1
        i = m.end()


def block_at(text, needle):
    """按 class 片段定位要替换的 div。注释标记在中文页里被翻译过，不能依赖它。
    needle 可以是候选列表；取第一个能在本页找到的片段，并用它第一次出现的位置。"""
    cands = needle if isinstance(needle, (list, tuple)) else [needle]
    for n in cands:
        if n in text:
            idx = text.index(n)
            start = text.rfind('<div', 0, idx)
            return start, balanced_div(text, start)
    raise ValueError('needle not found: %r' % (cands,))


ITEM_RE = re.compile(
    r'<a href="/(?P<lang>[a-z]{2})/(?P<sec>[a-z-]+)/(?P<slug>[a-z0-9-]+)/"[^>]*>\s*'
    r'<span[^>]*>(?P<tag>.*?)</span>\s*'
    r'<p[^>]*font-bold[^>]*>(?P<title>.*?)</p>\s*'
    r'<p[^>]*text-gray-600[^>]*>(?P<desc>.*?)</p>', re.S)

GROUP_SPLIT = '<div class="flex items-center gap-3 mb-3">'


def clean(s):
    s = html.unescape(s).strip()
    s = re.sub(r'\s+', ' ', s)
    if '<' in s or '>' in s:
        raise ValueError('unexpected tag inside text: %r' % s)
    return s


def parse_page(path, sec, lang):
    t = open(path, encoding='utf-8').read()
    cat_start, cat_end = block_at(t, 'space-y-8 mb-16 not-prose')
    cat = t[cat_start:cat_end]

    chunks = cat.split(GROUP_SPLIT)[1:]
    groups = []
    for ch in chunks:
        cm = re.search(r'w-1 h-7 bg-([a-z]+)-500', ch)
        tm = re.search(r'<h2[^>]*>(.*?)</h2>', ch, re.S)
        if not (cm and tm):
            raise ValueError('group header parse fail in %s' % path)
        items = []
        for m in ITEM_RE.finditer(ch):
            # 个别语种页面里混进了指向别的板块的卡片（例如中文签证页的“数字准备”组
            # 指向 life/sim-card-guide）。这类卡片不属于本板块文章清单，跳过并告警。
            if m.group('lang') != lang or m.group('sec') != sec:
                print('  warn %s 跳过跨板块卡片 %s/%s' % (path, m.group('sec'), m.group('slug')))
                continue
            items.append({'slug': m.group('slug'), 'tag': clean(m.group('tag')),
                          'title': clean(m.group('title')), 'desc': clean(m.group('desc'))})
        if not items:
            print('  warn %s 空分组已忽略：%s' % (path, clean(tm.group(1))))
            continue
        groups.append({'color': cm.group(1), 'name': clean(tm.group(1)), 'items': items})

    real = [len(g['items']) for g in groups]
    anchors = len(re.findall(r'<a href="/[a-z]{2}/%s/' % sec, cat))
    if sum(real) != anchors:
        raise ValueError('card parse mismatch %s: anchors %d parsed %d' % (path, anchors, sum(real)))
    return groups


def ts_localized(pairs):
    d = dict(pairs)
    lines = ['    {']
    for lg in LANGS:
        if lg not in d:
            raise ValueError('missing lang %s' % lg)
        lines.append('      %s: %s,' % (lg, json.dumps(d[lg], ensure_ascii=False)))
    lines.append('    }')
    return '\n'.join(lines)


def build_data():
    data = {}
    for sec in SECTIONS:
        data[sec] = {}
        for lg in LANGS:
            # 从备份读原文：已经改造过的页面里分类清单已经换成组件，不能再解析
            src = os.path.join(ROOT, BACKUP, '%s-%s.astro' % (lg, sec))
            data[sec][lg] = parse_page(src, sec, lg)

        # 以英文为基准。其它语种可能因为历史翻译顺序不同而卡片顺序不一致，
        # 所以按 slug 对齐，不按位置对齐。
        base = data[sec]['en']
        base_map = flatten(base)
        for lg in LANGS:
            g = data[sec][lg]
            m = flatten(g)
            if set(m) != set(base_map):
                missing = set(base_map) - set(m)
                extra = set(m) - set(base_map)
                raise ValueError('%s/%s slug 不一致 缺:%s 多:%s' % (sec, lg, missing, extra))
            if len(g) != len(base):
                print('  warn %s/%s 分组数 %d -> 按英文 %d 归一' % (sec, lg, len(g), len(base)))
            for slug, (gi, _) in m.items():
                if gi != base_map[slug][0]:
                    print('  warn %s/%s %s 分组 %d -> 按英文归到 %d'
                          % (sec, lg, slug, gi, base_map[slug][0]))
    return data


def flatten(groups):
    d = {}
    for gi, g in enumerate(groups):
        for it in g['items']:
            d[it['slug']] = (gi, it)
    return d


def write_ts(sec, section_data):
    data = {sec: section_data}  # 下面统一用 data[sec][lang] 取值
    out = []
    out.append('// %s 板块目录页的唯一数据源。改这里，9 个语种的目录页同时生效。' % sec)
    out.append('// 统计格必须放能在本板块文章里查到的事实，不要放文章数量。')
    out.append('')
    out.append("export const LANGS = ['en', 'zh', 'es', 'fr', 'ja', 'ko', 'ar', 'ru', 'th'] as const;")
    out.append('export type Lang = (typeof LANGS)[number];')
    out.append('export type Localized = Record<Lang, string>;')
    out.append('')
    out.append('export interface Stat {')
    out.append('  value: string;')
    out.append('  color: "blue" | "indigo" | "emerald" | "amber";')
    out.append('  label: Localized;')
    out.append('}')
    out.append('')
    out.append('export interface Group {')
    out.append('  color: string;')
    out.append('  name: Localized;')
    out.append('}')
    out.append('')
    out.append('export interface Item {')
    out.append('  slug: string;')
    out.append('  group: number;')
    out.append('  tag: Localized;')
    out.append('  title: Localized;')
    out.append('  desc: Localized;')
    out.append('}')
    out.append('')
    out.append('export const STATS: Stat[] = [')
    for i, (value, pairs) in enumerate(STATS[sec]):
        out.append('  {')
        out.append("    value: %s," % json.dumps(value, ensure_ascii=False))
        out.append("    color: '%s'," % STAT_COLORS[i])
        out.append('    label:')
        out.append(ts_localized(pairs) + ',')
        out.append('  },')
    out.append('];')
    out.append('')
    out.append('export const GROUPS: Group[] = [')
    for gi, g0 in enumerate(data[sec]['en']):
        out.append('  {')
        out.append("    color: '%s'," % g0['color'])
        out.append('    name:')
        pairs = []
        for lg in LANGS:
            same = [g for g in data[sec][lg] if g['color'] == g0['color']]
            pairs.append((lg, same[0]['name'] if same else data[sec][lg][gi]['name']))
        out.append(ts_localized(pairs) + ',')
        out.append('  },')
    out.append('];')
    out.append('')
    out.append('export const COUNT: Localized = {')
    for lg in LANGS:
        out.append('  %s: %s,' % (lg, json.dumps(COUNT[lg], ensure_ascii=False)))
    out.append('};')
    out.append('')
    out.append('export const ITEMS: Item[] = [')
    maps = {lg: flatten(data[sec][lg]) for lg in LANGS}
    for gi, g in enumerate(data[sec]['en']):
        for it in g['items']:
            slug = it['slug']
            out.append('  {')
            out.append("    slug: %s," % json.dumps(slug, ensure_ascii=False))
            out.append('    group: %d,' % gi)
            out.append('    tag:')
            out.append(ts_localized([(lg, maps[lg][slug][1]['tag']) for lg in LANGS]) + ',')
            out.append('    title:')
            out.append(ts_localized([(lg, maps[lg][slug][1]['title']) for lg in LANGS]) + ',')
            out.append('    desc:')
            out.append(ts_localized([(lg, maps[lg][slug][1]['desc']) for lg in LANGS]) + ',')
            out.append('  },')
    out.append('];')
    out.append('')
    p = os.path.join(ROOT, 'src/data', sec + '.ts')
    open(p, 'w', encoding='utf-8', newline='\n').write('\n'.join(out))
    return len(data[sec]['en']), sum(len(g['items']) for g in data[sec]['en'])


def rewrite_page(sec, lang):
    p = os.path.join(ROOT, 'src/pages', lang, sec, 'index.astro')
    t = open(p, encoding='utf-8').read()
    if 'SectionStats' in t:
        return 'skip'

    # 1) frontmatter 里加 import 与派生数据
    fm_end = t.index('\n---', 3)
    inject = (
        "\nimport SectionStats from '../../../components/SectionStats.astro';"
        "\nimport ArticleGroups from '../../../components/ArticleGroups.astro';"
        "\nimport { STATS, GROUPS, ITEMS, COUNT, type Lang } from '../../../data/%s';"
        "\n\nconst lang: Lang = '%s';"
        "\n\nconst stats = STATS.map((s) => ({ value: s.value, color: s.color, label: s.label[lang] }));"
        "\n\nconst groups = GROUPS.map((g, gi) => {"
        "\n  const items = ITEMS.filter((i) => i.group === gi);"
        "\n  return {"
        "\n    color: g.color,"
        "\n    title: g.name[lang],"
        "\n    countText: COUNT[lang].replace('{n}', String(items.length)),"
        "\n    items: items.map((i) => ({"
        "\n      href: `/${lang}/%s/${i.slug}/`,"
        "\n      tag: i.tag[lang],"
        "\n      title: i.title[lang],"
        "\n      desc: i.desc[lang],"
        "\n    })),"
        "\n  };"
        "\n});"
        "\n" % (sec, lang, sec)
    )
    t = t[:fm_end] + inject + t[fm_end:]

    # 2) Quick Stats -> 组件
    qs, qe = block_at(t, ['grid grid-cols-2 gap-3 mb-12 not-prose',
                          'grid-cols-2 md:grid-cols-4 gap-3 mb-12 not-prose',
                          'grid-cols-2 md:grid-cols-3 gap-3 mb-12 not-prose',
                          'mb-12 not-prose'])
    if 'text-center' not in t[qs:qe]:
        raise ValueError('统计块定位可疑：%s' % p)
    t = t[:qs] + '<SectionStats stats={stats} />' + t[qe:]

    # 3) 分类清单 -> 组件
    cs, ce = block_at(t, 'space-y-8 mb-16 not-prose')
    if '<a href=' not in t[cs:ce]:
        raise ValueError('分类块定位可疑：%s' % p)
    t = t[:cs] + '<ArticleGroups groups={groups} />' + t[ce:]

    open(p, 'w', encoding='utf-8', newline='\n').write(t)
    return 'ok'


if __name__ == '__main__':
    data = build_data()
    for sec in SECTIONS:
        ng, ni = write_ts(sec, data[sec])
        print(sec, 'groups=%d items=%d' % (ng, ni))
    for sec in SECTIONS:
        for lg in LANGS:
            print(sec, lg, rewrite_page(sec, lg))
