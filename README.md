Wedding site starter (Next.js)

Quick start

1. Install dependencies

```bash
npm install
```

2. Run locally

```bash
npm run dev
```

What I scaffolded

- `pages/` — Next.js pages (`index.js`, `_app.js`)
- `components/` — `AnimatedInvite.js`, `Gallery.js`
- `styles/globals.css` — basic styling
- `public/images/` — place your photos here (already created)

How to add your photos and details

- Put your sister and partner photos into `public/images` with these names (or change paths in `components/Gallery.js`):
 - Put your sister and partner photos into `public/images` with these names (or change paths in `components/Gallery.js`):
  - `priya.jpg` (sister)
  - `harshit.jpg` (partner)
  - `couple.jpg` (optional couple photo)
- Send me the invitation details (names, date/time, venue, RSVP text). I will update the invite text and add an RSVP form.
 - You already shared details; I updated the invite with:
   - Names: Priya & Harshit
   - Main date: 24-01-2026
   - Venue: Keshod
   - Theme: Traditional
   - Sangeet & other events on 23-01-2026 (times included)
 - Add your photos to `public/images` with the filenames above and refresh the site to see them.

Suggested next steps I can do for you

- Add an RSVP form connected to Supabase or Firebase
- Replace the invite card with a Lottie animation and custom illustration
- Add email templates or shareable digital invite link

If you want, send the invitation details now and I will update the site content and add RSVP.