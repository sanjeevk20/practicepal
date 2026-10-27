# PracticePal
Static, dependency-free educational worksheet library. Serve `dist` using any static HTTP server. Open `index.html` for offline use (web fonts fall back to system fonts).

Includes 35 sample worksheets covering Classes 1–8, subject/class/difficulty/search filters, browser-local favourites, editable print previews and optional answer keys. PDF export uses the browser print dialog's Save as PDF option. Customisation selects a sample topic, question count and teacher-assigned difficulty; it does not use AI generation. All questions and answers remain editable for review. Hindi uses Noto Sans Devanagari when available.

Content is supplementary practice, not official CBSE material. Academic year and textbook edition can be entered on each worksheet. Favourites require localStorage. No child personal data is collected or sent to a server. Configure a real contact address before offering support. Edit sample content in dist/app.js. Deploy dist as static assets; .openai/hosting.json retains the Site identity.

## GitHub Pages
In Settings → Pages, choose GitHub Actions as the source. Pushes to main deploy the dist directory through the included workflow.
