# The Love Story

一个基于纯静态前端的[情侣小站](https://alan-pluto.github.io/The-Love-Story/)（HTML/CSS/JS），在 [情侣小站 v5.2.0](https://gitee.com/kiCode111/like-girl-v5.2.0) 的基础上开发而来。

本项目以 **Jekyll 构建为推荐方式**（用于本地预览或生成静态站点）。

**快速说明：** 所有站点内容数据放在 `_data/` 目录下的 JSON 文件，数据会在 Jekyll 构建时由 Liquid 注入页面。

## ✅ 主要特性

- 配置集中：所有可编辑的数据位于 `_data/`（例如 `_data/site.json`、`_data/lovelist.json` 等）。
- 构建/运行模式：使用 Jekyll 时数据在构建时注入。Jekyll 根据_config.yml文件进行配置，并根据 `_includes/` 目录下的模板片段生成最终 HTML 文件。
- 纯静态：只要把仓库里的文件推到静态托管服务即可运行（无后端依赖）。
- 兼容 GitHub Pages 仓库页：在 _config.yml 中配置 `baseurl`，以保证 `https://<username>.github.io/<repo>` 下资源正确加载。

## 🔧 配置说明

- `_data/site.json`：站点全局配置（title、description、favicon、logo、boy/girl 设置、cards、版权信息等）。修改此文件可更新站点显示数据。
- `_data/about.json`：对应关于页面中的数据，可配置问答信息，如果需要自定义上下文回答，需要同步修改about.html中的JS逻辑。
- `_data/leaving.json`：对应留言板中的数据，可配置留言内容、时间、ip地址等信息。
- `_data/little.json`：对应记事中的数据，可配置文章标题、作者、时间等信息，注意将文章的文件名配置在id字段中,方便网页调用。文章存储在`page/`目录下。按照命名规范命名，例如`1.md`、`2.md`等，并按照相应格式进行撰写文章内容。网页调用的时候会根据little.json中的id字段去`page/`目录下寻找对应的文章文件进行渲染，注意文章文件的后缀名为`.md`。
- `_data/loveImg.json`：对应恋爱相册中的数据，可配置图片地址、描述等信息。
- `_data/lovelist.json`：对应恋爱列表中的事件，可配置恋爱事件的完成情况，0代表未完成，1代表已完成；如果是已完成，可以配置图片信息。


**小贴士：**
- 确保 `_data/` 里的 JSON 与 `Style/`、`img/` 等静态资源一并提交到仓库。
- 尽量使用相对路径（例如 `Style/img/favicon.ico`）。

## 📁 项目结构

- 页面：`index.html`, `about.html`, `list.html`, `little.html`, `leaving.html`, `loveImg.html` 等。
- Jekyll 模板片段：`_includes/footer.html`,`_includes/head.html`, `_includes/header.html`, `_includes/scripts.html`, `_layouts/default.html`（用于页面构建，Jekyll的渲染逻辑是根据default.html模版进行渲染，而用到的模版片段会自动引入）。
- 数据目录：`_data/`（所有 JSON 配置文件）。
- 静态资源：`Style/`, `Botui/` 等。

## 📦 技术栈

- 前端：HTML / CSS / JavaScript（Vanilla JS + 少量 jQuery）
- 可选：BotUI（聊天界面），Jekyll（本地预览 / 构建）

## 🛠️ 构建

项目是纯静态的，最简单的预览方式是用静态文件服务器。你可以直接部署到Github Pages 进行预览；也可以在本地先用 Jekyll 构建后再进行预览。

> 说明：Jekyll 并非运行时必须；若你只是做静态托管，可直接把仓库内容部署到静态托管服务，但若要测试 Jekyll 模板或构建流程，请先进行构建后再预览。

推荐用 Jekyll 构建为本地根路径后预览
先修改_config.yml_ 文件中的 `baseurl` 为空字符串（`baseurl: ""`），注意如果你打算部署到 GitHub Pages 的项目站点（例如 `https://<username>.github.io/<repo>`），请设置为对应的仓库子路径（例如 `baseurl: "/<repo>"`），本项目是作为项目站点进行部署的，所以请注意区分。
然后在项目根目录下运行：

```bash
jekyll build 
jekyll serve
# 在浏览器打开 http://localhost:4000
```
**小贴士：**
- 关闭服务器时请用 `Ctrl+C` 退出。

## ✨ 将本站部署到 GitHub Pages

> 推荐：使用 `main` 分支的 **root** 目录作为默认发布方式（最简单、直观）。

下面按两类用户给出具体步骤：

---

### A. 如果你没有个人站点（想要创建 `username.github.io` 个人站点）

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

- 如果你使用 Jekyll 构建，确保本地测试时使用 `jekyll build` / `jekyll serve`，并在 `_config.yml` 中正确配置 `baseurl`（个人站点通常 `baseurl: ''`）。
- 若使用自定义域：在仓库根放入 `CNAME` 文件（内容为你的域名），并在 GitHub Pages 设置中填写自定义域，同时确认 DNS 记录已配置。

---

### B. 如果你已有个人站点（想把本项目作为一个“项目站点”部署）

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

- baseurl 与链接：对于项目站点，请在 `_config.yml` 中设置 `baseurl: "/<repo>"`

- 如果你不想改 `baseurl` 或处理模板，也可以在 GitHub Pages 设置中使用 `main`+`docs`（把发布内容放到 `docs/`）来避免影响仓库根的其它内容，但 `root` 更直观。

---