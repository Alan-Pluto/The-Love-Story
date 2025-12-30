# The Love Story

在[情侣小站v5.2.0](https://gitee.com/kiCode111/like-girl-v5.2.0)的基础上开发的纯前端静态情侣小站。
基于纯静态 HTML/CSS/JS（无服务端依赖），易于部署到 GitHub Pages。

## ✅ 特性

- 所有可配置的内容集中放在 `_data/` 目录下的 JSON 文件（例如 `_data/site.json`、`_data/lovelist.json` 等）
- 使用 `Style/js/site-loader.js` 在运行时加载 `head.html`、`footer.html` 与 `data/site.json` 并完成页面注入与渲染
- 纯静态资源（HTML/CSS/JS/图片），可直接部署到 GitHub Pages
- 已将常见的绝对根路径（例如 `/favicon.ico`）替换为相对路径，兼容仓库页（`username.github.io/repo`）

## 🔧 配置说明

主要配置文件：

- `data/site.json`：站点标题、描述、头像（支持 `boyqq` / `girlqq` 以从 QQ 头像拉取）、封面、卡片、页脚版权等（示例已包含字段 `title`、`description`、`favicon`、`logo`、`writing`、`boy`、`girl`、`boyqq`、`girlqq`、`boyimg`、`girlimg`、`bgimg`、`cards`、`copy`、`icp`、`about`）。修改该文件即可更新全站显示的数据。
- 其他数据：`data/lovelist.json`、`data/leaving.json`、`data/loveImg.json` 等，分别对应页面数据。

小贴士：
- 请在仓库中放入 `Style/img/favicon.ico`（或在 `data/site.json` 中通过 `favicon` 指向任意图标路径），站点会优先使用该配置。
- 所有内部链接使用相对路径（`index.html`, `about.html` 等），避免使用以 `/` 开头的绝对路径以确保在仓库页正常展示。

## 📁 项目结构（简要）

- `index.html`, `about.html`, `list.html`, `little.html`, `leaving.html`, `loveImg.html` ... 页面文件
- `_includes/head.html`, `_includes/header.html`, `_includes/footer.html` - Jekyll include 模块（现在项目使用 Jekyll 构建）
- `_data/site.json` / `data/` - 站点配置与数据（`_data/site.json` 会在 Jekyll 中被读取）
- `Style/`, `Botui/`, `jquery/` 等 - 静态资源

## 📦 技术栈

- 纯静态：HTML / CSS / JavaScript
- 简单依赖：Vanilla JS + jQuery（用于少量交互），BotUI（可选）

## 🚀 本地预览（使用 Jekyll）

1. 安装 Ruby 与 Jekyll（推荐使用 rbenv 或 ruby-install）：

   - macOS / Linux: `gem install bundler jekyll`
   - Windows: 使用 RubyInstaller 然后 `gem install bundler jekyll`

2. 在项目根运行：

   - `jekyll serve --watch`（在 `http://localhost:4000` 预览）

3. 构建静态文件：

   - `jekyll build` 会生成 `_site/` 目录，内容可直接部署到 GitHub Pages。

## 🚀 部署

见项目根下的 `DEPLOY_GITHUB_PAGES.md`，包含多种部署方式（`main/docs`、`gh-pages` 分支、GitHub UI 配置等）。

---