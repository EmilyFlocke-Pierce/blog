# Accessibility

Ideas for making this site accessible to people and to LLMs.

---

## Human accessibility

- **Accessibility button / panel** — Plan to add a control (e.g. in header or footer) that lets users adjust preferences (e.g. contrast, font size, reduced motion). Document behavior and where it lives here once it’s built.
- **Semantic HTML** — Use `<main>`, `<nav>`, `<article>`, `<header>`, `<footer>` and a clear heading hierarchy (h1 → h2 → h3) so screen readers and assistive tech can navigate.
- **Focus and keyboard** — Ensure all interactive elements are focusable and order makes sense. No keyboard traps.
- **Alt text** — Meaningful `alt` for images; decorative images can use `alt=""`.
- **Labels and ARIA** — Form controls and custom widgets have visible or `aria-label`/`aria-labelledby` so purpose is clear.
- **Color and contrast** — Text meets contrast guidelines; don’t rely on color alone for meaning.

---

## LLM / crawler accessibility

- **llms.txt** — Single file at `/llms.txt` describing the site, sections, and team. One file for the whole site (not per page). Keep it updated when structure changes.
- **RSS** — `/rss.xml` linked in footer and optionally in llms.txt (e.g. `RSS: /rss.xml`) so LLMs can discover and consume feed.
- **Sitemap** — `sitemap.xml` at root listing important URLs so crawlers and LLMs can discover every page.
- **Meta and Open Graph** — Unique `<title>` and `<meta name="description">` per page; `og:title` and `og:description` for sharing and parsing.
- **Semantic HTML** — Same structure that helps humans helps systems that parse the DOM.
- **Optional: JSON-LD** — Minimal Schema.org (e.g. WebSite, Blog, Person on about) for search and some LLMs.

---

## Checklist (update as we ship)

- [x] llms.txt at root, kept up to date
- [x] RSS linked in footer and in llms.txt
- [x] sitemap (Astro sitemap integration; output at /sitemap-index.xml)
- [x] Semantic layout and heading hierarchy (header, nav, main, footer in BaseLayout)
- [ ] Accessibility button / preferences (when built)
- [ ] Focus order and keyboard support (not yet audited)
- [ ] Alt text on images (avatar has alt; audit other images as added)
- [ ] (Optional) JSON-LD for key pages
