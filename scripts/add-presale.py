# -*- coding: utf-8 -*-
"""在高铁篇购票段落末尾补一句预售期说明（9 语种），让交通板块统计格的 15 days 有正文出处。"""
import io
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LANGS = ['en', 'zh', 'es', 'fr', 'ja', 'ko', 'ar', 'ru', 'th']

TEXT = {
    'en': '<strong>Tickets go on sale 15 days ahead</strong> (the travel day counts as day one), and each station opens sales at its own time — the 12306 app shows the exact hour for your departure station.',
    'zh': '<strong>车票提前 15 天开售（含乘车当天）</strong>，各车站起售时间不同，12306 App 里能查到出发站的具体开售时间。',
    'es': '<strong>Los billetes se ponen a la venta 15 días antes</strong> (el día del viaje cuenta como día uno), y cada estación abre la venta a su propia hora: la app de 12306 indica la hora exacta de tu estación de salida.',
    'fr': '<strong>Les billets sont mis en vente 15 jours à l\'avance</strong> (le jour du voyage compte comme premier jour), et chaque gare ouvre la vente à sa propre heure — l\'appli 12306 indique l\'heure exacte de votre gare de départ.',
    'ja': '<strong>切符は乗車日の15日前（当日を含む）から発売</strong>され、駅ごとに発売開始時刻が異なります。12306アプリで出発駅の正確な時刻を確認できます。',
    'ko': '<strong>승차일 15일 전(당일 포함)부터 판매</strong>가 시작되며, 역마다 판매 시작 시각이 다릅니다. 12306 앱에서 출발역의 정확한 시각을 확인할 수 있습니다.',
    'ar': '<strong>تُطرح التذاكر للبيع قبل 15 يومًا</strong> (يوم السفر يُحسب يومًا أولًا)، وكل محطة تفتح البيع في وقتها الخاص — ويعرض تطبيق 12306 الساعة الدقيقة لمحطة انطلاقك.',
    'ru': '<strong>Билеты поступают в продажу за 15 дней</strong> (день поездки считается первым), и каждая станция открывает продажу в своё время — точное время для вашей станции отправления указано в приложении 12306.',
    'th': '<strong>ตั๋วเปิดขายล่วงหน้า 15 วัน</strong> (นับวันเดินทางเป็นวันแรก) และแต่ละสถานีเปิดขายคนละเวลา — แอป 12306 แสดงเวลาที่แน่นอนของสถานีต้นทางของคุณ',
}

ANCHOR = re.compile(r'</ol>\s*(<p class="mb-12">\s*<a href="https://www\.trip\.com)')


def main():
    for lg in LANGS:
        path = os.path.join(ROOT, 'src/pages', lg, 'transport', 'high-speed-rail.astro')
        with io.open(path, encoding='utf-8') as f:
            text = f.read()
        if '15 days ahead' in text or '15 天开售' in text:
            print('skip (already)', lg)
            continue
        if len(ANCHOR.findall(text)) != 1:
            raise SystemExit('anchor not unique: ' + lg)
        para = '<p class="text-base leading-relaxed text-gray-700 mb-6">\n        %s\n      </p>\n\n      ' % TEXT[lg]
        new = ANCHOR.sub(lambda m: '</ol>\n\n      ' + para + m.group(1), text, count=1)
        with io.open(path, 'w', encoding='utf-8', newline='\n') as f:
            f.write(new)
        print('patched', lg)


if __name__ == '__main__':
    main()
