// アプリのアイコン（icon-192.png・icon-512.png・icon-maskable-512.png）を作る。開いた本に © の印。
// maskable は Android で丸く切られても欠けないよう、絵を中央の半径40％に収める（shared-workflows routines/game-dev.md・drift-check pwa:maskable）
// 使い方: node tools/make-icons.cjs（qa/ の playwright を使う）
const path = require("path");
const { chromium } = require(path.join(__dirname, "..", "qa", "node_modules", "playwright"));
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const [s, mask] of [[192, 0], [512, 0], [512, 1]]) {
    const p = await b.newPage({ viewport: { width: s, height: s } });
    await p.setContent(`<body style="margin:0"><svg width="${s}" height="${s}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#eceff3"/><g transform="${mask ? 'translate(50 50) scale(0.72) translate(-50 -54)' : ''}">
      <path d="M12 26 Q31 20 50 28 L50 84 Q31 76 12 82 Z" fill="#ffffff" stroke="#1b2433" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M88 26 Q69 20 50 28 L50 84 Q69 76 88 82 Z" fill="#ffffff" stroke="#1b2433" stroke-width="2.5" stroke-linejoin="round"/>
      <line x1="19" y1="40" x2="43" y2="38" stroke="#1b243355" stroke-width="3" stroke-linecap="round"/>
      <line x1="19" y1="50" x2="43" y2="48" stroke="#1b243355" stroke-width="3" stroke-linecap="round"/>
      <line x1="19" y1="60" x2="38" y2="58" stroke="#1b243355" stroke-width="3" stroke-linecap="round"/>
      <circle cx="69" cy="52" r="15" fill="#b23a24"/>
      <text x="69" y="59.5" font-size="22" text-anchor="middle" fill="#ffffff" font-family="'Noto Sans CJK JP',sans-serif" font-weight="900">©</text></g></svg></body>`);
    await p.screenshot({ path: path.join(__dirname, "..", mask ? "icon-maskable-512.png" : `icon-${s}.png`), clip: { x: 0, y: 0, width: s, height: s } });
  }
  await b.close();
})();
