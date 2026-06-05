# Is It 5 PM Yet?

A simple static site that checks whether it is 5 PM or later in the user's current timezone. If it isn't, the page selects a random location where it is already 5 PM.

## Files

- `index.html` - page markup
- `style.css` - styles
- `script.js` - timezone logic and button interaction
- `server.js` - static file server for external access
- `package.json` - project scripts and dependencies

## Run locally

Open `index.html` in a browser.

## Deploy with GitHub Pages

This site can be published with GitHub Pages as a static site.

1. Push this repository to GitHub.
2. In the repository settings, choose **Pages**.
3. Set the source branch to `gh-pages` and the folder to `/`.
4. Save the settings.

A GitHub Actions workflow is included at `.github/workflows/gh-pages.yml`. It will automatically deploy the repository to the `gh-pages` branch whenever you push to `main` or `master`.

## Notes

- `.nojekyll` is included so GitHub Pages serves the site without Jekyll processing.
- The repo is now a pure static site, so no local Node server is required.
