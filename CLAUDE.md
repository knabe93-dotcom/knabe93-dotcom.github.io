# Kevin Knabe – Portfolio

**Stack:** Vite + React 19 + TypeScript + Tailwind v4 + shadcn-Button + React Three Fiber (3D).
Dark Mode, Kobalt+Gold. Fonts: Instrument Sans / Playfair Display / JetBrains Mono (via @fontsource).

**Aktueller Branch:** `feature/react-migration` (die neue React-Version). `main` = alte Vanilla-Seite.
Migration ist fertig und baut (`npm run build`).

## Struktur
- `src/pages/Home.tsx` – alle Sektionen inline (Hero, Marquee, Problem, Stats, Services, Compare,
  Projects, Pricing, Testimonials, Standards, Process, Guarantee, Faq, Contact)
- `src/pages/Legal.tsx` – Impressum + Datenschutz (HashRouter-Routen `/impressum`, `/datenschutz`)
- `src/three/Scene3D.tsx` – R3F-Hintergrund (morphender Blob + Partikel + Scroll-Kamera), lazy geladen
- `src/components/` – Header, Footer, Intro (Logo-Loader), Reveal, Eyebrow, Section, Magnetic
- `src/components/ui/button.tsx` – Button (cva), `src/index.css` – Tailwind-Theme
- Assets in `public/assets/` (logo-kk.webp, kevin.jpg, projekte/*.webp)

## Deploy (Hostinger, kemmi-designs.de)
`./deploy.sh` baut `dist/` und lädt per FTPS hoch (curl, `--connect-to` auf IP, chroot-Pfad).
Zugangsdaten in `deploy.config` (gitignored, NICHT committen). Ziel:
`domains/kemmi-designs.de/public_html`. Gabi-Projekt liegt auf der hostingersite-Domain – nicht anfassen.
Live: https://kemmi-designs.de

## Offen
- Echte Testimonials + echte Preise (aktuell Platzhalter), PLZ 76344 prüfen (= Eggenstein-Leopoldshafen).
- FTP-Passwort wurde im Chat gepostet → im hPanel rotieren.
- Reste im FTP-Home aus 1. Fehlversuch (harmlos) ggf. aufräumen.
- Nicht gebaut: Spotlight/Tilt-JS, Count-up, Mobile-Hamburger (bewusst weggelassen).

## Konventionen
Reine Statik nach Build; kein Server. Deutsch. Keine erfundenen Testimonials/Awards (in DE abmahnbar).
