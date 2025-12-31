# The Love Story

一个基于纯静态前端的情侣小站（HTML/CSS/JS），在 [情侣小站 v5.2.0](https://gitee.com/kiCode111/like-girl-v5.2.0) 的基础上开发而来。

本项目以 **Jekyll 构建为官方/推荐方式**（用于本地预览或生成静态站点）。

**快速说明：** 所有站点内容数据放在 `_data/` 目录下的 JSON 文件，数据会在 Jekyll 构建时由 Liquid 注入页面。项目不提供非 Jekyll 的运行时注入支持。

## ✅ 主要特性

- 配置集中：所有可编辑的数据位于 `_data/`（例如 `_data/site.json`、`_data/lovelist.json` 等）。
- 构建/运行模式：使用 Jekyll 时数据在构建时注入（推荐）。本项目不提供非 Jekyll 模式的官方支持。
- 纯静态：只要把仓库里的文件推到静态托管服务即可运行（无后端依赖）。
- 兼容 GitHub Pages 仓库页：已建议使用相对路径或在 Jekyll 中配置 `baseurl`，以保证 `https://<username>.github.io/<repo>` 下资源正确加载。

## 🔧 配置说明

- `_data/site.json`：站点全局配置（title、description、favicon、logo、boy/girl 设置、cards、版权信息等）。修改此文件可更新站点显示数据。
- 其他数据文件：`_data/lovelist.json`、`_data/leaving.json`、`_data/loveImg.json` 等，分别对应不同页面的数据源。

小贴士：
- 确保 `_data/` 里的 JSON 与 `Style/`、`img/` 等静态资源一并提交到仓库。
- 尽量使用相对路径（例如 `Style/img/favicon.ico`）；如果使用 Jekyll 并启用 `baseurl`，请在模板中处理 `baseurl` 前缀。

## 📁 项目结构（简要）

- 页面：`index.html`, `about.html`, `list.html`, `little.html`, `leaving.html`, `loveImg.html` 等。
- Jekyll 模板片段：`_includes/head.html`, `_includes/header.html`, `_includes/footer.html`（可用于 Jekyll 构建，非必须）。
- 数据目录：`_data/`（所有 JSON 配置文件）。
- 静态资源：`Style/`, `Botui/`, `jquery/`, `Font/`, `img/` 等。

## 📦 技术栈

- 前端：HTML / CSS / JavaScript（Vanilla JS + 少量 jQuery）
- 可选：BotUI（聊天界面），Jekyll（本地预览 / 构建）

## 本地预览（推荐：简单静态服务器）

项目是纯静态的，最简单的预览方式是不依赖 Jekyll，而用一个静态文件服务器：

使用 Python（适用于已安装 Python 的环境）：

```bash
python -m http.server 4000
# 在浏览器打开 http://localhost:4000
```

使用 Node.js 的 `serve`：

```bash
npx serve . -l 4000
# 在浏览器打开 http://localhost:4000
```

如果你希望使用 Jekyll（例如测试 `_includes` 或生成 `_site/`）：

1. 安装 Ruby 与 Jekyll（Windows 推荐使用 RubyInstaller）：

```bash
gem install bundler jekyll
bundle install
jekyll serve --watch
# 在 http://localhost:4000 预览（注意：如果使用 Jekyll，可能需要在 _config.yml 中设置 baseurl）
```

> 说明：Jekyll 并非运行时必要；大多数静态托管场景直接用仓库内容即可。

> **注：** 本仓库**不提供**非 Jekyll 模式的使用指南或运行时注入支持。请使用 Jekyll 构建并部署站点（或联系仓库所有者讨论特殊需求）。

## 部署

常见方式请参见 `DEPLOY_GITHUB_PAGES.md`，要点：

- 直接把仓库作为静态站点推送到 GitHub，然后在仓库设置中选择发布分支与目录（`main` + `root` 或 `main` + `/docs`）。
- 也可以使用 `gh-pages` 分支或 GitHub Actions 自动化部署。

---