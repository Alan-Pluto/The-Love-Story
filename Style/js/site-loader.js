(function () {
  'use strict';

  function loadJSON(url) { return fetch(url).then(function (r) { if (!r.ok) throw new Error('fetch failed'); return r.json(); }); }
  function loadText(url) { return fetch(url).then(function (r) { if (!r.ok) throw new Error('fetch failed'); return r.text(); }); }

  // 加载 site 配置与 head/footer 模板并注入
  Promise.all([loadJSON('../_data/site.json'), loadText('head.html'), loadText('footer.html')])
    .then(function (arr) {
      var cfg = arr[0], headHtml = arr[1], footHtml = arr[2];
      window.siteConfig = cfg;

      // 注入 head 片段
      var headContainer = document.createElement('div'); headContainer.innerHTML = headHtml;
      while (headContainer.firstChild) document.head.appendChild(headContainer.firstChild);

      // 设置页面 title / meta description / favicon（优先使用 data/site.json 中的配置）
      try {
        if (cfg.title) document.title = cfg.title;
        if (cfg.description) {
          var metaDesc = document.querySelector('meta[name="description"]');
          if (metaDesc) metaDesc.setAttribute('content', cfg.description);
          else { var m = document.createElement('meta'); m.name = 'description'; m.content = cfg.description; document.head.appendChild(m); }
        }
        if (cfg.keywords) {
          var metaKw = document.querySelector('meta[name="keywords"]');
          if (metaKw) metaKw.setAttribute('content', cfg.keywords);
          else { var k = document.createElement('meta'); k.name = 'keywords'; k.content = cfg.keywords; document.head.appendChild(k); }
        }
        if (cfg.favicon) {
          var icon = document.querySelector('link[rel*="icon"]');
          if (icon) icon.href = cfg.favicon;
          else { var l = document.createElement('link'); l.rel = 'shortcut icon'; l.href = cfg.favicon; document.head.appendChild(l); }
        }
      } catch (e) { /* 安全失败 */ }

      // 渲染 header 与 avatar（简化：不依赖 <template>，在 DOMContentLoaded 后直接生成 HTML，便于调试与维护）
      function injectHeaderAndAvatar(){
        try {
          var headerPlaceholder = document.getElementById('head-placeholder');
          if (headerPlaceholder) {
            var headerHtml = '<div class="header-wrap"><div class="header"><div class="logo"><h1><a class="alogo" href="index.html">' + (cfg.logo || cfg.title) + '</a></h1></div><div class="word"><span class="wenan">' + (cfg.writing || '我们的故事') + '</span></div></div></div>';
            headerPlaceholder.innerHTML = headerHtml;
          }

          var avatarPlaceholder = document.getElementById('avatar-placeholder');
          if (avatarPlaceholder) {
            var bgStyle = cfg.bgimg ? 'style="background-image: url(' + cfg.bgimg + '); background-size: cover;"' : 'style="background-size: cover;"';
            var boySrc = cfg.boyqq ? ('https://q1.qlogo.cn/g?b=qq&nk=' + cfg.boyqq + '&s=640') : (cfg.boyimg || '');
            var girlSrc = cfg.girlqq ? ('https://q1.qlogo.cn/g?b=qq&nk=' + cfg.girlqq + '&s=640') : (cfg.girlimg || '');
            var avatarHtml = '' +
              '<div class="bg-img" ' + bgStyle + '>' +
              '  <div class="central central-800"><div class="middle">' +
              '    <div class="img-male"><img src="' + boySrc + '" alt="男生头像" draggable="false"><span>' + (cfg.boy || 'Boy') + '</span></div>' +
              '    <div class="love-icon"><img src="Style/img/like.svg" draggable="false"></div>' +
              '    <div class="img-female"><img src="' + girlSrc + '" alt="女生头像" draggable="false"><span>' + (cfg.girl || 'Girl') + '</span></div>' +
              '  </div></div>' +
              '  <svg class="waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">' +
              '    <defs><path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" /></defs>' +
              '    <g class="parallax"><use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />' +
              '    <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />' +
              '    <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />' +
              '    <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" /></g>' +
              '  </svg>' +
              '</div>';
            avatarPlaceholder.innerHTML = avatarHtml;
          }

          // 时间前缀（如首页）由站点配置控制
          var timeElLocal = document.getElementById('span_dt_dt');
          if (timeElLocal && typeof cfg.timePrefix !== 'undefined') timeElLocal.textContent = cfg.timePrefix || '';
        } catch(e) { /* ignore errors */ }
      }

      if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', injectHeaderAndAvatar); else injectHeaderAndAvatar();

      // 填充首页卡片（若存在）
      var cardsWrap = document.querySelector('.card-wrap .row');
      if (cardsWrap && Array.isArray(cfg.cards)) {
        cardsWrap.innerHTML = '';
        cfg.cards.forEach(function (c, idx) {
          var isBig = idx >= 3 && idx <= 4;
          var div = document.createElement('div');
          div.className = isBig ? 'card-b col-lg-6 col-12 col-sm-12 flex-h' : 'card col-lg-4 col-sm-12 col-sm-x-12 flex-h';
          div.innerHTML = '<img src="' + c.icon + '"><div class="text"><span><a href="' + c.href + '">' + c.label + '</a></span><p>' + c.desc + '</p></div>';
          cardsWrap.appendChild(div);
        });
      }

      // 注入 footer 到 body 底部（仅在页面未提供 site-copy 时注入，避免重复）
      var existingCopy = document.getElementById('site-copy');
      if (!existingCopy) {
        var frag = document.createElement('div'); frag.innerHTML = footHtml; document.body.appendChild(frag);
        existingCopy = document.getElementById('site-copy');
      }
      if (cfg.copy && existingCopy) existingCopy.textContent = cfg.copy;
      if (cfg.icp) {
        var footerDiv = document.querySelector('.footer');
        if (footerDiv) {
          // 避免重复插入 icp 内容
          if (!footerDiv.querySelector('.icp-added')) {
            var p = document.createElement('p'); p.className = 'icp-added';
            p.innerHTML = '<img src="Style/img/icp.svg"><a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">' + cfg.icp + '</a>';
            footerDiv.appendChild(p);
          }
        }
      }

      // 通知其他脚本 siteConfig 已就绪
      document.dispatchEvent(new CustomEvent('siteConfigReady', { detail: cfg }));
    })
    .catch(function (err) {
      console.warn('site loader failed, falling back to minimal header/footer', err);
      // 回退：在无法 fetch 文件（file:// 或其他限制）时，注入最小 header/footer 保证页面可用
      var cfg = {
        title: 'Like Girl',
        logo: 'Like Girl',
        writing: '我们的故事',
        boy: 'Boy',
        girl: 'Girl',
        boyimg: 'https://q1.qlogo.cn/g?b=qq&nk=10001&s=640',
        girlimg: 'https://q1.qlogo.cn/g?b=qq&nk=10002&s=640',
        bgimg: 'Style/img/Cover.webp',
        copy: '© Like Girl - 保留所有权利',
        cards: [
          {"label":"记事","href":"little.html","desc":"记录我们的点滴","icon":"Style/img/home/home-page.svg"},
          {"label":"留言板","href":"leaving.html","desc":"写下彼此的想念","icon":"Style/img/home/home-msg.svg"},
          {"label":"关于","href":"about.html","desc":"我们的故事与简介","icon":"Style/img/home/home-about.svg"},
          {"label":"Love Photo","href":"loveImg.html","desc":"恋爱相册 记录最美瞬间","icon":"Style/img/home/home-photo.svg"},
          {"label":"Love List","href":"list.html","desc":"恋爱列表 你我之间的约定","icon":"Style/img/home/home-list.svg"}
        ]
      };
      window.siteConfig = cfg;

      var headerPlaceholder = document.getElementById('head-placeholder');
      if (headerPlaceholder) {
        var header = document.createElement('div'); header.className = 'header-wrap';
        header.innerHTML = '<div class="header"><div class="logo"><h1><a class="alogo" href="index.html">' + cfg.logo + '</a></h1></div><div class="word"><span class="wenan">' + cfg.writing + '</span></div></div>';
        headerPlaceholder.appendChild(header);
      }

      // 在回退情形也应用封面与头像（与正常流程保持一致）
      var bg = document.querySelector('.bg-img'); if (bg && cfg.bgimg) bg.style.backgroundImage = 'url(' + cfg.bgimg + ')';
      try {
        var maleEl = document.querySelector('.img-male img');
        var femaleEl = document.querySelector('.img-female img');
        function qqUrl(q){ return q ? ('https://q1.qlogo.cn/g?b=qq&nk=' + q + '&s=640') : ''; }
        if (maleEl) {
          if (cfg.boyqq) maleEl.src = qqUrl(cfg.boyqq);
          else if (cfg.boyimg) maleEl.src = cfg.boyimg;
        }
        if (femaleEl) {
          if (cfg.girlqq) femaleEl.src = qqUrl(cfg.girlqq);
          else if (cfg.girlimg) femaleEl.src = cfg.girlimg;
        }
        var maleSpan = document.querySelector('.img-male span');
        var femaleSpan = document.querySelector('.img-female span');
        if (maleSpan) maleSpan.textContent = cfg.boy || 'Boy';
        if (femaleSpan) femaleSpan.textContent = cfg.girl || 'Girl';
      } catch (e) { }

      // minimal footer
      var f = document.createElement('div');
      f.innerHTML = '<footer class="footer-warp"><div class="footer"><p id="site-copy">' + cfg.copy + '</p></div></footer>';
      document.body.appendChild(f);

      document.dispatchEvent(new CustomEvent('siteConfigReady', { detail: cfg }));
    });

  // 通用页面交互（在 DOM 即将可用时绑定）
  document.addEventListener('DOMContentLoaded', function () {
    // 全局链接导航保护（将 .html 链接强制跳转）
    function handleLinkClick(e) {
      try {
        var a = e.target.closest('a'); if (!a) return; var href = a.getAttribute('href'); if (!href) return; if (href.indexOf('http') === 0 || href.indexOf('mailto:') === 0 || href.indexOf('#') === 0) return; if (href.match(/\.html$/i)) { e.preventDefault(); window.location.href = href; }
      } catch (err) { console && console.error(err); }
    }
    document.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', handleLinkClick, true); });

    // 将卡片整体作为可点击项（事件委托，支持动态渲染）
    document.addEventListener('click', function (e) {
      var card = e.target.closest('.card, .card-b'); if (card) { var link = card.querySelector('a'); if (link) link.click(); }
    });

    // MessageBtn 跳转
    document.addEventListener('click', function (e) {
      if (e.target && e.target.id === 'MessageBtn') {
        var target = document.getElementById('MessageArea'); if (target) { var top = target.offsetTop; if (window.scrollY !== top) window.scrollTo({ top: top, behavior: 'smooth' }); }
      }
    });

    // 图片高亮与 toastr 初始化
    document.querySelectorAll('.love_img img, .lovelist img, .little_texts img').forEach(function (img) { img.classList.add('spotlight'); img.onclick = function () { return window.hs && hs.expand ? hs.expand(this) : true; }; });
    if (window.toastr) toastr.options = { closeButton: true, progressBar: true, positionClass: "toast-top-right" };

    // 懒加载配置（如果存在）
    try { if (typeof FunLazy !== 'undefined') FunLazy({ placeholder: "Style/img/Loading2.gif", effect: "show", strictLazyMode: false }); } catch (e) { }

    // 视频播放控件（简化版）
    function setupVideoPlayer(video) {
      try {
        var $video = window.jQuery ? window.jQuery(video) : null;
        if (!$video) return;
        var btn = window.jQuery('<div class="play-pause-btn">▶</div>');
        $video.wrap('<div class="video-container"></div>').parent().append(btn);
        $video.attr('controls', false).css({ width: '100%', height: 'auto' });
        btn.on('click', function (e) { e.stopPropagation(); if ($video[0].paused) { $video[0].play(); btn.hide(); } else { $video[0].pause(); btn.show(); } });
        $video.on('click', function () { if ($video[0].paused) { $video[0].play(); btn.hide(); } else { $video[0].pause(); btn.show(); } });
      } catch (e) { }
    }
    document.querySelectorAll('video').forEach(function (v) { setupVideoPlayer(v); });

    // 页面特定逻辑：留言、列表
    var leavingContainer = document.getElementById('leaving-container');
    if (leavingContainer) {
      fetch('data/leaving.json').then(function (r) { if (!r.ok) throw 0; return r.json(); }).then(function (items) {
        leavingContainer.innerHTML = '';
        items.forEach(function (it) {
          var card = document.createElement('div'); card.className = 'card';
          card.innerHTML = '<div class="leavform"><div class="textinfo">' + '<div class="name">' + (it.name || '匿名') + '</div>' + '<div class="time">' + (it.time ? new Date(it.time).toLocaleString() : '') + '</div>' + '<div class="text">' + (it.text || '') + '</div>' + '</div></div>';
          leavingContainer.appendChild(card);
        });
      }).catch(function () { /* fallback */ });
    }

    // lovelist rendering is handled per-page (e.g. list.html loads data/lovelist.json). Removed here to avoid duplicate rendering.

  });

})();
