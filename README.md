# Ilam Vikram Arjunan — Portfolio (Angular)

Single page portfolio built with **Angular 19**, standalone components and **Signals**, with unit tests (Jasmine + Karma).

## Run it

```bash
npm install
npm start            # http://localhost:4200
```

## Test and build

```bash
npm test             # unit tests in watch mode
npm run test:ci      # headless, runs once (good for CI)
npm run build        # production build in dist/ilam-portfolio/browser
```

Needs Node 20.19+ (or 22) and Chrome for the tests.

## Project layout

```
src/
  index.html            fonts, <app-root>
  styles.css            design tokens (light + dark), layout, components
  app/
    app.component.ts    page shell + "click a card to highlight it"
    core/               services and helpers (all unit tested)
      whatsapp.service.ts   wa.me links + the contact message
      theme.service.ts      dark / light toggle (signal, saved in localStorage)
      scroll.service.ts     page scroll progress (signal)
      reveal.directive.ts   scroll reveal + count-up for every .rv element
      typewriter.ts         typed role text (pure functions)
      count-up.ts           number count-up helpers
    layout/             header, footer, SVG sprite (icons + skill logos), floating WhatsApp button
    sections/           hero, about, why (carousel), services, skills, experience, projects, contact, cta
    data/               skills and "why choose me" content
public/                 profile.jpg, logo.jpg
```

## Things you will probably edit

| What | Where |
| --- | --- |
| WhatsApp number | `src/app/core/whatsapp.service.ts` (`WA_NUMBER`, digits only with country code) |
| Skills list | `src/app/data/skills.data.ts` |
| Why choose me cards | `src/app/data/why.data.ts` |
| Colours and fonts | top of `src/styles.css` (`:root` tokens) |
| Text of each section | `src/app/sections/*/*.component.html` |
| Photo | replace `public/profile.jpg` and `public/logo.jpg` |

## How the WhatsApp contact works

A static site cannot send a message to your WhatsApp silently. The green **Send on WhatsApp** button is a normal link to
`https://wa.me/<number>?text=...` whose text is rebuilt from the form as the visitor types. WhatsApp opens with the name,
email and message already filled in, and the visitor presses **Send**. The floating button at the bottom right opens a
chat with a short greeting. Fully automatic delivery would need the WhatsApp Business Cloud API and a small server.

## Put it on GitHub

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/ilam-portfolio.git
git push -u origin main
```

## Deploy (free)

- **Vercel / Netlify**: import the repo. Build command `npm run build`, output directory `dist/ilam-portfolio/browser`.
- **GitHub Pages**: `npm run build -- --base-href /ilam-portfolio/` and publish `dist/ilam-portfolio/browser`
  (the `<use href="#icon">` sprite references resolve against `<base href>`, so keep the base href equal to the deploy path).
