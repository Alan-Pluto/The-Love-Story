# The Love Story

A simple static "couple" site (HTML/CSS/JS) available at [The-Love-Story](https://alan-pluto.github.io/The-Love-Story/), developed on the basis of [Couple Site v5.2.0](https://gitee.com/kiCode111/like-girl-v5.2.0).

This project **recommends using Jekyll for builds** (for local preview or generating the static site).

**Quick note:** All site content data are stored as JSON files in the `_data/` directory and are injected into pages by Liquid during the Jekyll build.

## ✅ Key Features

- Centralized configuration: all editable data are in `_data/` (for example `_data/site.json`, `_data/lovelist.json`, etc.).
- Build/run model: when using Jekyll the data are injected at build time. Jekyll is configured via `_config.yml` and generates the final HTML files using template fragments under `_includes/`.
- Pure static: just push the repository files to static hosting to run (no backend dependency).
- Compatible with GitHub Pages project pages: configure `baseurl` in `_config.yml` to ensure resources load correctly under `https://<username>.github.io/<repo>`.

## 🔧 Configuration

- `_data/site.json`: global site configuration (title, description, favicon, logo, boy/girl settings, cards, copyright, etc.).
- `_data/about.json`: data for the About page; can configure Q&A items—if you customize contextual answers, you need to update the JS logic in `about.html` accordingly.
- `_data/leaving.json`: data for the guestbook; can configure message content, time, IP address, etc.
- `_data/little.json`: data for notes; can configure article title, author, time, etc. Note that the article filename is configured in the `id` field for easy lookup. Articles are stored in the `page/` directory and should follow naming conventions such as `1.md`, `2.md`, and be written in the proper format. When rendering, the page will look up the corresponding `.md` file in `page/` by the `id` field in `little.json`.
- `_data/loveImg.json`: data for the love album; can configure image URLs and descriptions.
- `_data/lovelist.json`: data for the love timeline; can configure completion status of events where `0` means incomplete and `1` means complete; when complete, image information can be supplied.

**Tips:**
- Ensure `_data/` JSON files are committed together with static assets such as `Style/`, `img/`, etc.
- Prefer relative paths (for example `Style/img/favicon.ico`).

## 📁 Project Structure

- Pages: `index.html`, `about.html`, `list.html`, `little.html`, `leaving.html`, `loveImg.html`, etc.
- Jekyll template fragments: `_includes/footer.html`, `_includes/head.html`, `_includes/header.html`, `_includes/scripts.html`, `_layouts/default.html` (used for page builds; Jekyll’s rendering logic uses `default.html` and automatically includes required fragments).
- Data directory: `_data/` (all JSON configuration files).
- Static assets: `Style/`, `Botui/`, etc.

## 📦 Tech Stack

- Frontend: HTML / CSS / JavaScript (Vanilla JS + a small amount of jQuery)
- Optional: BotUI (chat UI), Jekyll (local preview / build)

## 🛠️ Build

The project is purely static; the simplest way to preview is using a static file server. You can deploy directly to GitHub Pages for preview, or you can build locally with Jekyll and then preview.

> Note: Jekyll is not required at runtime; if you only need static hosting you can deploy repository contents directly. If you need to test Jekyll templates or the build process, please build first and then preview.

Recommended: build with Jekyll to a local root path and preview

First change the `baseurl` in `_config.yml` to an empty string (`baseurl: ""`). Note: if you plan to deploy to a GitHub Pages project site (for example `https://<username>.github.io/<repo>`), set it to the repository subpath (for example `baseurl: "/<repo>"`). This project is deployed as a project site, so please distinguish accordingly.

Then run in the project root:

```bash
jekyll build 
jekyll serve
# Open http://localhost:4000 in your browser
```
**Tips:**
- Stop the server with `Ctrl+C`.

## ✨ Deploy this site to GitHub Pages

> Recommended: use the `main` branch with the **root** folder as the default publishing source (simplest and most straightforward).

Below are steps for two types of users:

---

### A. If you do not have a personal site (want to create `username.github.io`)

Scenario: you want to deploy this project as your personal site at `https://<username>.github.io/`.

1. Create a new GitHub repository named `username.github.io` (replace `username` with your GitHub username).
2. On your local machine copy or initialize this project into that repository:

```bash
# Clone the empty repo (example)
git clone https://github.com/<username>/<username>.github.io.git
cd <username>.github.io
# Copy or move project files into this directory, then:
git add .
git commit -m "Initial site"
git push -u origin main
```

3. In the repository Settings -> Pages select `Branch: main` and `Folder: / (root)`, save. The site will be available at `https://<username>.github.io/` in a few minutes.

Notes:

- If you use Jekyll to build, make sure to test locally with `jekyll build` / `jekyll serve`, and set `baseurl: ''` in `_config.yml` for personal sites.
- For a custom domain: add a `CNAME` file in the repository root (content is your domain) and fill in the custom domain in GitHub Pages settings; also ensure DNS records are configured.

---

### B. If you already have a personal site (want to deploy this project as a "project site")

Scenario: you already have a personal site `username.github.io` and want this project hosted under `username/this-project` as `https://<username>.github.io/<repo>`.

Recommended approach: push the repository contents to the project's `main` branch root and choose `Branch: main` + `root` in Pages settings; the site will be available at `https://<username>.github.io/<repo>`.

Example steps:

```bash
git clone https://github.com/<username>/<repo>.git
cd <repo>
# Copy/add project files
git add .
git commit -m "Add site files"
git push origin main
```

Then in repository Settings -> Pages select `Branch: main` and `Folder: / (root)`.

Notes:

- baseurl and links: for project sites, set `baseurl: "/<repo>"` in `_config.yml`.

- If you do not want to change `baseurl` or handle templates, you can publish using `main` + `docs` (place the published content in `docs/`) to avoid affecting other root files; however `root` is more straightforward.

---