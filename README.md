# Otiti Mordecai Marvellous — Portfolio

A responsive, dependency-free portfolio focused on Go and Python projects.

## Preview locally

```sh
python3 -m http.server 3200 --bind 127.0.0.1 --directory dist
```

Open http://localhost:3200. Publish the contents of `dist/` on any static host.

## Content

- Name: Otiti Mordecai Marvellous
- Phone: 08106333322 (international: +234 810 633 3322)
- GitHub: https://github.com/mordecai12-cool
- Selected projects: Marvellous Motors, CampusFlow, Guessing Game, and Go Text Processor.
- CampusFlow is described as collaborative work; the portfolio does not claim sole authorship.
- Project summaries reflect the public repository contents reviewed on 27 October 2026.
- No qualifications, employers, testimonials, live deployment URLs or email addresses have been invented.

## Add her photograph

Place the approved photo at `dist/assets/marvellous.jpg`, then replace the monogram inside `.portrait-frame` in `dist/index.html` with:

```html
<img class="portrait-photo" src="assets/marvellous.jpg" alt="Otiti Mordecai Marvellous">
```

The layout includes styles for this image. The current artwork is an original typographic monogram, not a representation of her appearance.

## Editing

Edit `dist/index.html` for profile and projects, `dist/styles.css` for appearance, and `dist/app.js` for menu, filtering and project details. Contact links use the supplied phone number. No form submissions or visitor data are collected.

Project images: Marvellous Motors uses a screenshot of the public, signed-out site. Other project previews are interface illustrations, clearly labeled. Manrope is included under the SIL Open Font License; see `dist/assets/FONT-LICENSE.txt`.
