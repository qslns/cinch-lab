# THE YON — Beyond Fashion

> "Twisted yet harmonious. Every element slightly askew, yet together they form perfect beauty."

Experimental fashion portfolio by Taehyun Lee. Built with Next.js 15 and Framer Motion.

## Philosophy

**THE YON** (더 연) = "저 너머" — Beyond reach, beyond time, beyond space.
Fashion that transcends the tangible, pursuing an ideal beauty that remains forever elusive.

Core aesthetic: **"Twisted yet harmonious"** — Every element is slightly off-center, yet the whole achieves perfect balance.

## Features

### Design System
- **Asymmetric Typography** — Never centered, always intentional
- **Faerie-style Layouts** — Scattered, organic image placement
- **Monochrome Palette** — Black (#0A0A0A) to white (#FAFAFA) with warm taupe accent
- **Experimental Motion** — Parallax scroll, subtle rotations

### Technical Excellence
- Server-side rendering with Next.js 15
- Advanced animations with Framer Motion & GSAP
- Smooth scrolling with Lenis
- Optimized performance
- TypeScript for type safety

## Pages

- **Home** (`/`) — Faerie-style scattered images with parallax
- **Collections** (`/collections`) — Asymmetric gallery with rotated cards
- **Archive** (`/archive`) — Research documentation and process timeline
- **About** (`/about`) — Designer philosophy and approach
- **Contact** (`/contact`) — Minimal inquiry form

## Tech Stack

- **Framework:** Next.js 15
- **Animation:** Framer Motion, GSAP, Lenis
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **CMS:** Sanity (optional)
- **Deployment:** Vercel

## Installation

```bash
# Clone repository
git clone https://github.com/qslns/cinch-lab.git
cd cinch-lab

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Homepage (Faerie layout)
│   ├── collections/       # Collections gallery
│   ├── archive/           # Archive timeline
│   ├── about/             # Designer philosophy
│   └── contact/           # Contact form
├── components/            # Reusable components
│   ├── YonNav.tsx        # Navigation
│   ├── Footer.tsx        # Footer
│   └── ...
└── styles/
    └── globals.css        # Global styles & design system
```

## Design Principles

### Typography
- **Cormorant Garamond** — Elegant serif for titles
- **Inter** — Clean sans-serif for body
- **Space Mono** — Technical mono for details

### Color Palette
```css
--yon-black: #0A0A0A
--yon-charcoal: #1A1A1A
--yon-graphite: #2A2A2A
--yon-grey: #6B6B6B
--yon-silver: #A3A3A3
--yon-platinum: #D4D4D4
--yon-ivory: #F0F0F0
--yon-white: #FAFAFA
--yon-accent: #8B7355
```

### Motion
- Transform & opacity only
- ease-out-expo timing
- 60fps target

## Portfolio Purpose

This website serves as a portfolio for graduate school applications to:
- Central Saint Martins (CSM)
- Parsons School of Design
- Royal Academy of Fine Arts Antwerp

## License

© 2025 THE YON. All rights reserved.

---

**Designer:** Taehyun Lee
**School:** SASADA Fashion School

*"Beyond fashion, beyond reach, beyond time."*
