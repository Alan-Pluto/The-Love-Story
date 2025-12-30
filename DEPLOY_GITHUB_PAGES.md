# 将本站部署到 GitHub Pages

下面给出几种常用的部署方式（任选其一）：

## 方式一：直接使用 `main` 分支的 `docs/` 目录
1. 在仓库根创建一个 `docs/` 目录，并将站点所有文件放入 `docs/`（或将项目直接放入仓库根并在仓库设置中选择 `main` 分支的根目录）。
2. 在 GitHub 仓库页面中：Settings -> Pages，选择 `Branch: main` 且 `Folder: /docs`（或 `root`），点击保存。
3. 若使用 `docs/`，推送后几分钟内页面将可用：`https://<username>.github.io/<repo>`。

## 方式二：使用 `gh-pages` 分支（适合自动化构建）
1. 使用 `gh-pages` 分支托管构建产物。例如：

```bash
# 安装 gh-pages（可选）
npm install -D gh-pages

# 将当前目录发布到 gh-pages
npx gh-pages -d .
```

2. 或手动新建 `gh-pages` 分支并将构建产物 push 到该分支。
3. 在 GitHub 仓库设置中启用 `gh-pages` 分支的 Pages 服务。

## 方式三：GitHub Actions 自动部署（推荐）
- 本仓库已包含一个 **Jekyll build -> publish** 的 workflow（`.github/workflows/jekyll-deploy.yml`），会在 push 到 `main` 或 `master` 分支时运行 `jekyll build` 并将 `_site/` 目录发布到 GitHub Pages（使用 `peaceiris/actions-gh-pages`）。请确保在仓库设置中启用 GitHub Pages 并选择 `gh-pages` 分支作为发布源（workflow 会自动推送）。

## 注意事项（重要）
- 资源路径请使用相对路径（例如 `Style/img/favicon.ico`、`Style/...`、`data/...`），避免以 `/` 开头的绝对路径，这样可保证在 `username.github.io/repo` 下正常加载。
- 确保 `data/*.json` 与静态资源一并上传到仓库（GitHub Pages 会以 HTTP 提供这些文件，site-loader.js 会通过 fetch 加载它们）。
- 如果你想使用自定义域名，创建 `CNAME` 文件（文件里写入你的域名）并推送到发布分支，同时在 GitHub Pages 设置中配置自定义域名。

---