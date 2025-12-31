# 将本站部署到 GitHub Pages

> 推荐：使用 `main` 分支的 **root** 目录作为默认发布方式（最简单、直观）。

下面按两类用户给出具体步骤：

---

## A. 如果你没有个人站点（想要创建 `username.github.io` 个人站点）

适用场景：你希望把本项目部署为你的个人站点，地址为 `https://<username>.github.io/`。

1. 在 GitHub 上创建一个新的仓库，仓库名称必须为 `username.github.io`（将 `username` 替换为你的 GitHub 用户名）。
2. 在本地将本项目内容复制或初始化到该仓库：

```bash
# 克隆空仓库（示例）
git clone https://github.com/<username>/<username>.github.io.git
cd <username>.github.io
# 复制或移动本项目文件到此目录，然后：
git add .
git commit -m "Initial site"
git push -u origin main
```

3. 在仓库 Settings -> Pages 中，选择 `Branch: main` 且 `Folder: / (root)`，保存设置。几分钟后站点会在 `https://<username>.github.io/` 可访问。

注意：

- 如果你使用 Jekyll 构建（推荐用于本仓库），确保本地测试时使用 `jekyll build` / `jekyll serve`，并在 `_config.yml` 中正确配置 `baseurl`（个人站点通常 `baseurl: ''`）。
- 若使用自定义域：在仓库根放入 `CNAME` 文件（内容为你的域名），并在 GitHub Pages 设置中填写自定义域，同时确认 DNS 记录已配置。

---

## B. 如果你已有个人站点（想把本项目作为一个“项目站点”部署）

适用场景：你已经有个人站点 `username.github.io`，想把本项目放到仓库 `username/this-project` 并部署为 `https://<username>.github.io/<repo>`。

推荐做法：将仓库内容推送到该项目仓库的 `main` 分支的根目录（root）并在 Pages 设置选择 `Branch: main` + `root`，这样可直接在 `https://<username>.github.io/<repo>` 访问。

步骤示例：

```bash
git clone https://github.com/<username>/<repo>.git
cd <repo>
# 复制/添加项目文件
git add .
git commit -m "Add site files"
git push origin main
```

然后在仓库 Settings -> Pages 中选择 `Branch: main`、`Folder: / (root)`。

注意事项：

- baseurl 与链接：对于项目站点，请在 `_config.yml` 中设置 `baseurl: "/<repo>"`，并确保模板中使用 `{{ '/path' | relative_url }}` 或 `{{ '/path' | absolute_url }}` 等 Jekyll 过滤器来生成正确带前缀的路径。构建时可用：

```bash
jekyll serve --baseurl "/<repo>"
```

- 如果你不想改 `baseurl` 或处理模板，也可以在 GitHub Pages 设置中使用 `main`+`docs`（把发布内容放到 `docs/`）来避免影响仓库根的其它内容，但 `root` 更直观。

---

## 其他可选方式（当你需要构建或自动化时）

- 使用 `gh-pages` 分支：把构建产物（例如 `_site/` 或 `dist/`）发布到 `gh-pages` 分支并在仓库设置选择 `gh-pages` 作为发布源。适用于需要将源码与构建产物分离的场景。

示例（手动或脚本）：

```bash
# 生成构建产物到 _site/ (如果使用 Jekyll)
jekyll build
# 切换到临时目录把 _site 内容推送到 gh-pages
git checkout --orphan gh-pages
git rm -rf .
cp -r _site/* .
git add .
git commit -m "Publish site"
git push origin gh-pages --force
```

- 使用 GitHub Actions 自动化部署：当需要持续集成/自动发布时，在 `.github/workflows/` 中创建 workflow（例如运行 `jekyll build` 并使用 `peaceiris/actions-gh-pages` 发布到 `gh-pages` 或直接推送到 `main` 的 `root`）。如果需要，我可以根据本仓库生成一个示例 workflow。

---

## 常见注意事项与最佳实践 ✅

- 推荐默认：**main + root** —— 最简单且对大多数用户友好。
- 路径与 `baseurl`：对于项目站点，务必正确设置 `_config.yml` 中的 `baseurl` 并使用 `relative_url`/`absolute_url` 过滤器来生成静态资源 URL，否则图片、CSS 等资源在 `username.github.io/<repo>` 下可能无法加载。
- 数据与静态资源：确保 `_data/`、`Style/`、`img/` 等静态资源已被推送并在发布分支/目录可访问。
- 自定义域：放入 `CNAME` 并配置 DNS；启用 GitHub Pages 的 "Enforce HTTPS" 后确认 HTTPS 正常。
- 访问延迟：Pages 有缓存/部署延迟（通常几分钟），推送后请稍等并清理浏览器缓存以确认修改生效。

---