# Website V2

React Router portfolio redesign, kept separate from the existing Angular website.

## Run locally

```sh
npm install
npm run dev
```

The portfolio page includes the existing games and other projects, project detail dialogs, contact links, and CV. Images and the CV are served from `public/assets`.

Run `npm run typecheck` and `npm run build` to validate a production build.

## Deploy to GitHub Pages

The `page-v2` branch deploys this app to GitHub Pages through `.github/workflows/deploy.yml`.
In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.
The SPA build includes a `404.html` fallback so direct visits to client-side routes work.
