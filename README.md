# Portfolio

Single-page portfolio with a dedicated page for each project.
Built with React, Vite, Tailwind CSS and Framer Motion. Fully static, so it deploys on Vercel, Cloudflare Pages, Netlify or any static host.

## Run locally

    npm install
    npm run dev

## Build

    npm run build      # output goes to dist/

## Deploy

- **Vercel**: import the repo (vercel.json is already set).
- **Cloudflare Pages**: build command npm run build, output directory dist (public/_redirects handles the page routes).

## Where to edit

- **All text, links, projects and images: src/data/site.js.** Every value starts empty; fill in what you need.
- Each project has its own page at /project/<slug> (01, 02, 03, 04 by default), built from the same file.
- Images: drop files in public/images and reference them from site.js, e.g. /images/my-file.jpg. Empty paths keep an empty frame.
- CV page: public/cv.html
- Page title / description: index.html
- Favicon: public/favicon.svg
