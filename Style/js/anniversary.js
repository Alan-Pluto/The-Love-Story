// ===== 纪念日时间配置 =====
// 优先使用 _data/site.json 中的配置（ISO 字符串），否则回退到内置日期
let anniversaryDate = new Date(2022, 6, 18, 12, 41, 0);
let timePrefix = '这是我们一起走过的';
function initAnniversary() {
  if (window.siteConfig) {
    if (window.siteConfig.anniversary) {
      const d = new Date(window.siteConfig.anniversary);
      if (!isNaN(d)) anniversaryDate = d;
    } else if (window.siteConfig.startTime) {
      const d2 = new Date(window.siteConfig.startTime);
      if (!isNaN(d2)) anniversaryDate = d2;
    }

    if (window.siteConfig.timePrefix) timePrefix = window.siteConfig.timePrefix;
  }
}

function updateTime() {
  const today = new Date();
  let timeold = (today.getTime() - anniversaryDate.getTime());
  if (timeold < 0) timeold = 0;

  const msPerDay = 24 * 60 * 60 * 1000;
  const e_daysold = timeold / msPerDay;
  const daysold = Math.floor(e_daysold);
  const e_hrsold = (e_daysold - daysold) * 24;
  const hrsold = Math.floor(e_hrsold);
  const e_minsold = (e_hrsold - hrsold) * 60;
  const minsold = Math.floor(e_minsold);
  let seconds = Math.floor((e_minsold - minsold) * 60);

  const spanEl = document.getElementById('span_dt_dt'); if (spanEl) spanEl.innerHTML = timePrefix;
  const tianEl = document.getElementById('tian'); if (tianEl) tianEl.innerHTML = daysold + '天';
  const shiEl = document.getElementById('shi'); if (shiEl) shiEl.innerHTML = hrsold + '时';
  const fenEl = document.getElementById('fen'); if (fenEl) fenEl.innerHTML = minsold + '分';
  if (seconds < 10) seconds = '0' + seconds;
  const miaoEl = document.getElementById('miao'); if (miaoEl) miaoEl.innerHTML = seconds + '秒';
}

document.addEventListener('DOMContentLoaded', function () {
  var maxWait = 2000; // 最长等待时间（毫秒）
  var startTime = Date.now();

  function waitUntilConfig() {
    if (window.siteConfig) {
      initAnniversary();
      updateTime();
      setInterval(updateTime, 1000);
    } else {
      if (Date.now() - startTime > maxWait) {
        console.warn('[Anniversary] window.siteConfig 未就绪，检查数据是否正确加载');
      }
      setTimeout(waitUntilConfig, 50);
    }
  }

  waitUntilConfig();
});

