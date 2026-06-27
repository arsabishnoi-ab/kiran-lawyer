# Kiran Thirumalesh J. — Advocate & Legal Consultant

A fast, SEO-optimized, mobile-friendly one-page website for Advocate Kiran Thirumalesh J. (Bengaluru). Built with plain HTML, CSS and JavaScript — no build step, no dependencies.

## Quick start

Just open `index.html` in a browser. To preview with a local server (recommended so the map and fonts load cleanly):

```bash
# Python 3
python -m http.server 8000
# then visit http://localhost:8000
```

## Project structure

```
index.html            Page markup + SEO meta + JSON-LD structured data
css/styles.css        Theme, layout, responsive design, animations
js/reviews.js         ~100 sample client reviews (PLACEHOLDER — replace with real ones)
js/main.js            Nav, scroll-reveal, counters, review filtering, contact form
assets/images/        Logo, favicon, hero & about imagery
robots.txt            Search engine crawl rules
sitemap.xml           Sitemap for search engines
site.webmanifest      PWA / install metadata
```

## Editing content

| What to change | Where |
| --- | --- |
| Name, tagline, bio, qualifications | `index.html` (hero + about sections) |
| Practice areas / case types | `index.html` (`#practice` section) |
| Phone / email / address / map | `index.html` (`#contact`, footer, JSON-LD) and `js/main.js` (mailto + WhatsApp number) |
| Client reviews | `js/reviews.js` — edit the `REVIEWS` array |
| Colours / theme | `css/styles.css` — CSS variables at the top (`:root`) |

> The reviews in `js/reviews.js` are **sample placeholder content**. Replace them with genuine client testimonials before going live.

## Adding photos (image slots)

The design has built-in image slots that currently fall back to tasteful green gradients. Drop files with these exact names into `assets/images/` to fill them — no code change needed:

| Slot | File to add |
| --- | --- |
| Hero portrait (right of headline) | `kiran-portrait.png` (transparent PNG works best) |
| Family & Divorce card | `service-family.jpg` |
| Consumer card | `service-consumer.jpg` |
| Civil card | `service-civil.jpg` |
| Property card | `service-property.jpg` |
| Registration & Conveyancing card | `service-registration.jpg` |
| Cheque Bounce card | `service-cheque.jpg` |
| Arbitration card | `service-arbitration.jpg` |

Recommended sizes: portrait ~900×1100px; service photos ~800×550px (landscape).

## Before launch (SEO checklist)

1. Replace the domain `https://www.kiranadvocate.in/` everywhere with the real domain:
   - `index.html` (canonical, Open Graph, Twitter, JSON-LD)
   - `robots.txt`, `sitemap.xml`
2. Confirm the phone number (`+91 80953 44722`) and email (`ktjeddu@gmail.com`).
3. Replace generated images in `assets/images/` with real photos if available, and update `og-cover.jpg` (recommended 1200×630).
4. Submit `sitemap.xml` to Google Search Console.
5. Set the correct office coordinates in the JSON-LD `geo` block and Google Maps embed.

## Deploy (free hosting)

**Netlify (drag & drop):** zip the folder or drag it onto https://app.netlify.com/drop.

**GitHub Pages:** push the folder to a repo, then enable Pages from the `main` branch (root) in repo Settings.

## Notes

- The contact form has no backend; it opens the visitor's email client (`mailto:`) or WhatsApp with the details pre-filled.
- A Bar Council of India compliance disclaimer is included in the footer.
