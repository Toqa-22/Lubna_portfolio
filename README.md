# Lubna Alsinawi — Portfolio Website

A modern, self-contained 5-page portfolio site: no build step, no framework —
just HTML, CSS and vanilla JS, so it's easy to host anywhere or hand off to
another developer.

## Structure

```
lubna-portfolio/
├── index.html          Home
├── about.html           About / philosophy / skills
├── workshops.html        Workshops & Projects
├── portfolio.html        Filterable art gallery + modal lightbox
├── contact.html          CV & Contact
├── css/
│   └── style.css        Design system (colors, type, components)
├── js/
│   └── main.js           Nav, scroll reveal, stat counters, gallery filter/modal
└── assets/
    ├── images/           Put your photos here (see images/README.txt)
    └── cv/               Put your CV PDF here
```

## Design language

"Ink & Clay" — a palette and type system built specifically around this
practice: sumi-ink black, parchment cream, a Chinese-seal red, jade green and
Omani clay gold. The recurring hand-drawn brush stroke (used under nav links,
as section dividers, and echoed in the "chop" seal on the hero) nods directly
to the calligraphy and ink work in the portfolio — it's meant to feel like a
signature, not a decoration.

- **Display type:** Fraunces (serif with soft, brush-like curves)
- **Body type:** Work Sans
- **Captions / metadata:** Space Mono (used for stats, dates, dimensions —
  anything factual)

## Adding your content

1. **Images** — drop files into `assets/images/` using the filenames listed
   in `assets/images/README.txt`. Until then, each spot shows a soft
   placeholder automatically (no broken-image icons).
2. **CV** — add your PDF at `assets/cv/lubna-alsinawi-cv.pdf`.
3. **Text** — every page is plain HTML; open any `.html` file in a text
   editor and edit the copy directly.
4. **Social links** — update the `href="#"` placeholders in the social icons
   on `contact.html` with your real Instagram / WhatsApp / LinkedIn links.
5. **Portfolio pieces** — each artwork lives in one `<div class="art-card">`
   block in `portfolio.html` with `data-*` attributes (title, medium,
   dimensions, year, description, image, category). Copy an existing block
   to add a new piece; the `data-category` value controls which filter button
   picks it up (`sketch`, `watercolor`, `oil`, `calligraphy`).

## Running it locally

No build tools needed — just open `index.html` in a browser, or serve the
folder with any static server, e.g.:

```
npx serve .
```

## Deploying

This is a static site, so it works as-is on GitHub Pages, Netlify, Vercel,
Cloudflare Pages, or any basic web host — just upload the whole folder.
