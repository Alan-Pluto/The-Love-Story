const fs = require('fs').promises;
const path = require('path');

async function ensureDir(p) { await fs.mkdir(p, { recursive: true }); }

function safeFilename(id) {
  return String(id).replace(/[^a-zA-Z0-9\-_.]/g, '-');
}

function esc(s){ if(typeof s !== 'string') return ''; return s.replace(/"/g,'\\"'); }

async function main() {
  const root = path.join(__dirname, '..');
  const srcData = path.join(root, 'data');
  const destData = path.join(root, '_data');
  await ensureDir(destData);

  const files = await fs.readdir(srcData);
  for (const f of files) {
    if (!f.endsWith('.json')) continue;
    const src = path.join(srcData, f);
    const dest = path.join(destData, f);
    const content = await fs.readFile(src, 'utf8');
    await fs.writeFile(dest, content, 'utf8');
    console.log('[sync-data] copied', f, '->', path.relative(root, dest));

    if (f === 'little.json') {
      // generate per-article pages under page/<id>.html
      const list = JSON.parse(content);
      const pageDir = path.join(root, 'page');
      await ensureDir(pageDir);
      for (const it of list) {
        const id = it.id != null ? safeFilename(it.id) : safeFilename(it.articletitle || ('article-' + Math.random().toString(36).slice(2,8)));
        const filename = path.join(pageDir, `${id}.md`);
        const title = it.articletitle || '无标题';
        const articlename = it.articlename || '';
        const articletime = it.articletime || '';
        const body = it.articletext || '';
        const front = `---\nlayout: default\ntitle: "${esc(title)}"\n---\n\n<div class="central">\n  <div class="title"><h1>${title}</h1></div>\n  <div class="row central central-800">\n    <div class="card">\n      <div class="little_texts">\n        <div class="info"><span>\n          <svg class=\"little_icon\" aria-hidden=\"true\"><use xlink:href=\"#icon-shoucang\"></use></svg> ${articlename} <i>记录于</i> ${articletime}\n        </span></div>\n        <div class=\"line-top\"></div>\n        <div class=\"article-body\">${body}</div>\n      </div>\n    </div>\n  </div>\n</div>\n`;
        await fs.writeFile(filename, front, 'utf8');
        console.log('[sync-data] generated article', path.relative(root, filename));
      }
    }
  }

  console.log('[sync-data] done');
}

main().catch(err => { console.error(err); process.exit(1); });
