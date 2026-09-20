// 生成个人主页 README.md —— 9 种语言的 <details> 折叠块 + 顶部语言徽章。
// 内容取自网站仓库的 src/i18n.json 与 content.json，保证两边文案一致。
// 用法：node scripts/build-readme.mjs [网站仓库路径]

import { readFileSync, writeFileSync } from 'node:fs';

const SITE = process.argv[2] || 'C:/Users/huawei/Desktop/gofish040821.github.io';
const i18n = JSON.parse(readFileSync(SITE + '/src/i18n.json', 'utf8'));
const content = JSON.parse(readFileSync(SITE + '/content.json', 'utf8'));
const extras = {
  "zh": {
    "moments": "生活瞬间",
    "skills": "技能与工具",
    "contact": "联系我",
    "footer": "用 ✳ 打造 · Claude 配色"
  },
  "en": {
    "moments": "Moments",
    "skills": "Skills & Tools",
    "contact": "Contact",
    "footer": "Made with ✳ · Claude palette"
  },
  "fr": {
    "moments": "Instants",
    "skills": "Compétences et outils",
    "contact": "Contact",
    "footer": "Fait avec ✳ · palette Claude"
  },
  "de": {
    "moments": "Momente",
    "skills": "Fähigkeiten und Werkzeuge",
    "contact": "Kontakt",
    "footer": "Gemacht mit ✳ · Claude-Farbpalette"
  },
  "es": {
    "moments": "Momentos",
    "skills": "Habilidades y herramientas",
    "contact": "Contacto",
    "footer": "Hecho con ✳ · paleta Claude"
  },
  "ar": {
    "moments": "لحظات",
    "skills": "المهارات والأدوات",
    "contact": "تواصل معي",
    "footer": "صُنع بـ ✳ · ألوان Claude"
  },
  "ja": {
    "moments": "暮らしの一コマ",
    "skills": "スキルとツール",
    "contact": "連絡先",
    "footer": "✳ で作りました · Claude カラー"
  },
  "ko": {
    "moments": "순간들",
    "skills": "기술과 도구",
    "contact": "연락처",
    "footer": "✳ 로 만들었습니다 · Claude 색상"
  },
  "ru": {
    "moments": "Мгновения",
    "skills": "Навыки и инструменты",
    "contact": "Связаться",
    "footer": "Сделано с ✳ · палитра Claude"
  }
};

const FLAG = { zh: '🇨🇳', en: '🇬🇧', fr: '🇫🇷', de: '🇩🇪', es: '🇪🇸', ar: '🇸🇦', ja: '🇯🇵', ko: '🇰🇷', ru: '🇷🇺' };
const SITE_URL = 'https://gofish040821.github.io';

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function badge(code, label, color) {
  const url = 'https://img.shields.io/badge/' + encodeURIComponent(code) + '-' + encodeURIComponent(label) + '-' + color + '?style=for-the-badge';
  return '<a href="' + SITE_URL + '/?lang=' + code + '"><img src="' + url + '" alt="' + esc(label) + '" /></a>';
}

const SKILL_BADGES = [
  'Python-3776AB?style=flat-square&logo=python&logoColor=white',
  'PyTorch-EE4C2C?style=flat-square&logo=pytorch&logoColor=white',
  'NumPy-013243?style=flat-square&logo=numpy&logoColor=white',
  'LaTeX-008080?style=flat-square&logo=latex&logoColor=white',
  'Git-F05032?style=flat-square&logo=git&logoColor=white'
].map(function (s) { return '    <img src="https://img.shields.io/badge/' + s + '" />'; }).join('\n');

const PHOTOS = content.gallery.map(function (g) { return g.image; });
function photoTable() {
  let rows = '';
  for (let i = 0; i < PHOTOS.length; i += 2) {
    rows += '  <tr>\n';
    rows += '    <td width="50%"><img src="assets/life-' + String(i + 1).padStart(2, '0') + '.jpg" width="100%" /></td>\n';
    rows += '    <td width="50%"><img src="assets/life-' + String(i + 2).padStart(2, '0') + '.jpg" width="100%" /></td>\n';
    rows += '  </tr>\n';
  }
  return '<table>\n' + rows + '</table>';
}

function block(code, meta, open) {
  const t = i18n.translations[code];
  const s = t.strings;
  const c = t.content;
  const x = extras[code];
  const CJK = code === 'zh' || code === 'ja' || code === 'ko';
  const PO = CJK ? '（' : '(';
  const PC = CJK ? '）' : ')';
  const SEP = CJK ? ' · ' : ' · ';
  const L = [];
  L.push('<details' + (open ? ' open' : '') + '>');
  L.push('<summary><b>' + FLAG[code] + ' ' + esc(meta.label) + '</b></summary>');
  L.push('<br/>');
  L.push('');
  L.push('<h2>' + esc(s.aboutTitle) + '</h2>');
  L.push('');
  L.push('<table>');
  L.push('  <tr>');
  L.push('    <td align="center" width="200"><img src="assets/avatar.png" width="170" alt="Gofish" /></td>');
  L.push('    <td>' + c.about.map(esc).join('<br/><br/>') + '</td>');
  L.push('  </tr>');
  L.push('</table>');
  L.push('');
  const edu = c.education;
  L.push('- 🧑 **' + esc(s.profileNote) + '**');
  for (let i = edu.length - 1; i >= 0; i--) {
    L.push('- 🎓 **' + esc(edu[i].school) + '** · ' + esc(edu[i].degree) + (CJK ? '' : ' ') + PO + esc(edu[i].dates) + PC);
  }
  L.push('- 🧭 **' + esc(c.research.map(function (r) { return r.title; }).join(' · ')) + '**');
  L.push('');
  L.push('<h2>' + esc(s.educationTitle) + '</h2>');
  L.push('');
  L.push('<table>');
  edu.forEach(function (e) {
    L.push('  <tr>');
    L.push('    <td width="40">🎓</td>');
    L.push('    <td><b>' + esc(e.school) + '</b>' + (e.english && e.english !== e.school ? '<br/><sub>' + esc(e.english) + '</sub>' : '') + '</td>');
    L.push('    <td>' + esc(e.degree) + '</td>');
    L.push('    <td align="right"><sub>' + esc(e.dates) + '</sub></td>');
    L.push('  </tr>');
  });
  L.push('</table>');
  L.push('');
  L.push('<h2>' + esc(s.researchTitle) + '</h2>');
  L.push('');
  L.push('<sub>' + esc(s.researchIntro) + '</sub>');
  L.push('');
  c.research.forEach(function (r) {
    L.push('<h3>' + esc(r.number) + ' · ' + esc(r.title) + ' — ' + esc(r.subtitle) + '</h3>');
    L.push('');
    L.push(esc(r.description));
    L.push('');
    L.push('<sub>' + r.tags.map(esc).join(' · ') + '</sub>');
    L.push('');
    L.push('<sub><b>' + r.process.map(esc).join(' → ') + '</b></sub>');
    L.push('');
  });
  L.push('<h2>' + esc(s.lifeTitle) + '</h2>');
  L.push('');
  L.push('<sub>' + esc(s.lifeIntro) + '</sub>');
  L.push('');
  L.push('<table>');
  c.hobbies.forEach(function (h) {
    L.push('  <tr>');
    L.push('    <td width="40" align="center">' + h.symbol + '</td>');
    L.push('    <td><b>' + esc(h.title) + '</b></td>');
    L.push('    <td>' + esc(h.description) + '</td>');
    L.push('  </tr>');
  });
  L.push('</table>');
  L.push('');
  L.push('<h2>' + esc(x.moments) + '</h2>');
  L.push('');
  L.push(photoTable());
  L.push('');
  L.push('<h2>' + esc(x.skills) + '</h2>');
  L.push('');
  L.push('<p>');
  L.push(SKILL_BADGES);
  L.push('</p>');
  L.push('');
  L.push('<h2>' + esc(x.contact) + '</h2>');
  L.push('');
  L.push('<p align="center">');
  L.push('  <a href="https://github.com/gofish040821"><img src="https://img.shields.io/badge/GitHub-gofish040821-191919?style=for-the-badge&logo=github&logoColor=white" /></a>');
  L.push('  <a href="mailto:gofish0821@gmail.com"><img src="https://img.shields.io/badge/Email-gofish0821@gmail.com-D97757?style=for-the-badge&logo=gmail&logoColor=white" /></a>');
  L.push('</p>');
  L.push('');
  L.push('<p align="center"><sub>© 2026 Gofish · ' + esc(x.footer) + '</sub></p>');
  L.push('');
  L.push('</details>');
  L.push('');
  return L.join('\n');
}

const langs = i18n.languages;
const order = ['en', 'zh', 'fr', 'de', 'es', 'ar', 'ja', 'ko', 'ru'].filter(function (c) {
  return langs.some(function (l) { return l.code === c; });
});
const byCode = {};
langs.forEach(function (l) { byCode[l.code] = l; });

const out = [];
out.push('<picture>');
out.push('  <source media="(prefers-color-scheme: dark)" srcset="assets/banner-dark.svg" />');
out.push('  <img src="assets/banner.svg" alt="Gofish — Mathematics · AI · Agent RSI · Physical AI" width="100%" />');
out.push('</picture>');
out.push('');
out.push('<!-- 语言切换：点任意一枚徽章，跳到该语言的完整主页 -->');
out.push('<p align="center">');
order.forEach(function (c, i) {
  out.push('  ' + badge(c, byCode[c].label, i % 2 === 0 ? 'D97757' : '191919'));
});
out.push('</p>');
out.push('');
out.push('<p align="center">');
out.push('  <a href="https://github.com/gofish040821"><img src="https://img.shields.io/badge/-Gofish-D97757?style=for-the-badge&logo=github&logoColor=white" /></a>');
out.push('  <a href="#"><img src="https://img.shields.io/badge/Mathematics-数理基础科学-191919?style=for-the-badge" /></a>');
out.push('  <a href="#"><img src="https://img.shields.io/badge/Agent_RSI-递归自我改进-D97757?style=for-the-badge" /></a>');
out.push('  <a href="#"><img src="https://img.shields.io/badge/Physical_AI-具身智能-191919?style=for-the-badge" /></a>');
out.push('</p>');
out.push('');
order.forEach(function (c) {
  out.push(block(c, byCode[c], c === 'en'));
});

writeFileSync('README.md', out.join('\n'));
console.log('README.md 写入完成');
console.log('语言块:', order.join(' '));
console.log('默认展开:', 'en');
