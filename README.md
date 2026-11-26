# LinguaReader website

The website for [LinguaReader](https://github.com/yusufdinc974/LinguaReader), a free and open source reader for language learners (Windows, macOS and Linux).

Live at <https://lingua-reader-web.vercel.app/>.

## What's here

- **Home** (`/`): what the app does, a small working copy of the reader, screenshots, and downloads for the latest release.
- **Word lists** (`/custom-lists`): the JSON format for sharing and importing lists.
- **Contribute** (`/contribution`): how to send a change or report a bug.
- **Android** (`/mobile`), **Privacy policy** (`/privacy`) and **Delete account** (`/delete-account`).

The site follows the desktop app's design: the same colors, fonts (Inter and Source Serif 4), logo, and light and dark themes. Text is in English and Turkish (`src/lib/en.ts`, `src/lib/tr.ts`).

Download buttons read the latest release from the GitHub API. If GitHub can't be reached, they fall back to the links in `src/lib/release.ts`, so update the version there after a release.

Screenshots in `public/screens/` are copies of `docs/screenshots/` in the desktop repository.

## Develop

```bash
npm install
npm run dev      # local server with hot reload
npm run build    # type check and build into dist/
npm run lint
```

Built with Vite, React and TypeScript. Deployed on Vercel; `vercel.json` sends every path to `index.html` so page links work.
