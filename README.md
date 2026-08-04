# Safan Portfolio

A dark, responsive developer portfolio built with Next.js 16, React, TypeScript and plain CSS.

## Highlights

- Four project pages generated from structured project data
- Accessible desktop and modal mobile navigation
- Sticky case-study navigation with reading progress
- Responsive project cards and interactive skill cards
- Natural-aspect project media with intrinsic image dimensions
- Local assets with no external font dependency
- Privacy-friendly analytics that stays disabled until production activation
- Reduced-motion and keyboard-navigation support
- Security headers, metadata, sitemap, robots and structured data
- Playwright coverage for desktop and mobile core journeys

## Requirements

- Node.js 20 or newer
- npm

## Install and run locally

```powershell
npm.cmd install
npm.cmd run dev
```

Open:

```text
http://localhost:3000
```

## Install Playwright browsers

The end-to-end suite uses Chromium and WebKit. Install those browser binaries once after installing npm packages:

```powershell
npm.cmd exec playwright install chromium webkit
```

On Linux CI or a fresh Linux machine, install browsers and their required system dependencies with:

```bash
npx playwright install --with-deps chromium webkit
```

## Tests and verification

Run linting:

```powershell
npm.cmd run lint
```

Create a production build:

```powershell
npm.cmd run build
```

Run the dependency-free unit tests:

```powershell
npm.cmd run test:unit
```

Run the complete Playwright suite:

```powershell
npm.cmd run test:e2e
```

Run Playwright with visible browsers:

```powershell
npm.cmd run test:e2e:headed
```

Open the Playwright debugger:

```powershell
npm.cmd run test:e2e:debug
```

Open the most recent HTML report:

```powershell
npm.cmd run test:e2e:report
```

Run lint, unit tests, build and end-to-end tests together:

```powershell
npm.cmd run verify
```

Generated Playwright folders are ignored by Git:

```text
playwright-report/
test-results/
blob-report/
```

## Production URL

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SITE_URL=https://your-real-domain.com
```

Use only the deployed origin:

- include `https://`
- do not include a page path
- do not add a trailing slash
- do not leave `localhost` in the deployment environment

The production URL is used for canonical links, Open Graph metadata, structured data, `robots.txt` and `sitemap.xml`. Vercel, Cloudflare Pages and Netlify deployment URLs are also recognized as fallbacks, but the custom public domain should still be set explicitly.

## Verify before deployment

```powershell
Remove-Item .\.next -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item .\playwright-report -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item .\test-results -Recurse -Force -ErrorAction SilentlyContinue
npm.cmd run verify
npm.cmd audit
```

After deployment, open these URLs and confirm that they use the real domain:

```text
https://your-real-domain.com/robots.txt
https://your-real-domain.com/sitemap.xml
https://your-real-domain.com/api/og?title=Velvet%20Vogue&type=Full-Stack%20Web%20App
```

## Main content files

- `src/app/page.tsx` — homepage
- `src/app/globals.css` — visual system and responsive styling
- `src/app/work/[slug]/page.tsx` — shared project-page layout
- `src/data/projects.ts` — project stories, media and links
- `src/data/site.ts` — contact details, navigation and skills
- `src/data/media-meta.ts` — intrinsic media dimensions
- `src/lib/site-url.ts` — canonical deployment URL resolution
- `e2e/portfolio.spec.ts` — core desktop, mobile, email and SEO tests
- `playwright.config.ts` — end-to-end browser configuration

## Images

Project screenshots are displayed without redrawing or AI upscaling. Larger media can use Next.js responsive image optimization, while small screenshots retain their original pixels.

## Analytics after deployment

The analytics script is disabled by default, so local testing does not pollute production data. After deploying to Vercel:

1. Open the project in Vercel and enable **Web Analytics**.
2. Set this production environment variable:

```env
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

3. Redeploy the production site.

The setup collects privacy-friendly page views and visitor metrics without cookies. Custom button events are intentionally not enabled because they require a paid Vercel analytics plan.
