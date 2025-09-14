# CINCH LAB Wireframes & Page Layouts
## Detailed Page-by-Page Design Specifications

---

## 🏠 HOMEPAGE

### Hero Section
```
┌─────────────────────────────────────────────────────┐
│ CINCH—LAB                              [MENU ICON] │ <- Fixed header (80px)
├─────────────────────────────────────────────────────┤
│                                                     │
│                                                     │
│     FASHION                                        │ <- 120px font
│     EXTREME                                        │ <- Italic, lighter
│     TECHNICAL                                      │
│     LABORATORY                                     │ <- Outlined text
│                                                     │
│     ________________                               │ <- Animated underline
│                                                     │
└─────────────────────────────────────────────────────┘
Height: 100vh
```

### Navigation Grid
```
┌──────────────────┬──────────────────┬──────────────┐
│                  │                  │              │
│      LAB         │      MOOD        │  COLLECTIONS │
│   Experiments    │   Inspiration    │    Archive   │
│                  │                  │              │
│  [Hover: →]      │  [Hover: →]      │  [Hover: →]  │
├──────────────────┴──────────────────┴──────────────┤
│                                                     │
│                  ABOUT CINCH LAB                   │
│          Fashion's Technical Laboratory            │
│                                                     │
│                  [ENTER]                           │
└─────────────────────────────────────────────────────┘
Each card: 400px height, hover scale 1.02
```

### Editorial Content
```
┌─────────────────────────────────────────────────────┐
│ ┌─────────────┐                                     │
│ │             │  "We don't create fashion.          │
│ │   Editorial │   We engineer experiences."         │
│ │    Image    │                                     │
│ │             │  Long-form text about the brand...  │
│ └─────────────┘                                     │
├─────────────────────────────────────────────────────┤
│     Latest from the Lab        View All →          │
│ ┌──────┬──────┬──────┬──────┐                     │
│ │ Exp1 │ Exp2 │ Exp3 │ Exp4 │                     │
│ └──────┴──────┴──────┴──────┘                     │
└─────────────────────────────────────────────────────┘
```

---

## 🧪 LAB PAGE

### Experiment Grid
```
┌─────────────────────────────────────────────────────┐
│ LAB — EXPERIMENTAL ZONE                    [CLOSE] │
├─────────────────────────────────────────────────────┤
│                                                     │
│  SELECT EXPERIMENT                                 │
│                                                     │
│  ┌───────────┬───────────┬───────────┐            │
│  │    001    │    002    │    003    │            │
│  │ DISTORT   │ FREQUENCY │ PARTICLE  │            │
│  │           │           │           │            │
│  │  [ENTER]  │  [ENTER]  │  [ENTER]  │            │
│  ├───────────┼───────────┼───────────┤            │
│  │    004    │    005    │    006    │            │
│  │  MORPH    │  NEURAL   │   VOID    │            │
│  │           │           │           │            │
│  │  [ENTER]  │  [ENTER]  │  [ENTER]  │            │
│  └───────────┴───────────┴───────────┘            │
└─────────────────────────────────────────────────────┘
Cards: 350x350px, 3D tilt on hover
```

### Experiment View (Fullscreen)
```
┌─────────────────────────────────────────────────────┐
│                                          [X CLOSE] │
├─────────────────────────────────────────────────────┤
│                                                     │
│              EXPERIMENT 001: DISTORT               │
│                                                     │
│         ┌─────────────────────────────┐           │
│         │                             │           │
│         │      INTERACTIVE CANVAS     │           │
│         │         (WebGL/Three.js)    │           │
│         │                             │           │
│         └─────────────────────────────┘           │
│                                                     │
│  Controls: [RANDOMIZE] [RESET] [EXPORT]           │
│                                                     │
│  Parameters:                                       │
│  Intensity  [━━━━━━━━○━━━]                        │
│  Frequency  [━━━○━━━━━━━━]                        │
│  Amplitude  [━━━━━━○━━━━━]                        │
└─────────────────────────────────────────────────────┘
```

---

## 🎨 MOOD PAGE

### Mood Selector
```
┌─────────────────────────────────────────────────────┐
│ MOOD BOARD                                 SEARCH │
├─────────────────────────────────────────────────────┤
│                                                     │
│  [MINIMAL] [CHAOS] [DREAM] [ELECTRIC] [COSMIC]    │
│                                                     │
└─────────────────────────────────────────────────────┘
Pills: Active state with underline
```

### Masonry Grid
```
┌─────────────────────────────────────────────────────┐
│ ┌──────────┐ ┌────────────────┐ ┌──────────┐      │
│ │          │ │                │ │          │      │
│ │  Image   │ │                │ │          │      │
│ │    1     │ │    Image 2     │ │  Image   │      │
│ │          │ │                │ │    3     │      │
│ └──────────┘ │                │ │          │      │
│              └────────────────┘ └──────────┘      │
│ ┌────────────────┐ ┌──────────┐                   │
│ │                │ │          │ ┌──────────┐      │
│ │    Image 4     │ │  Image   │ │          │      │
│ │                │ │    5     │ │  Image   │      │
│ └────────────────┘ └──────────┘ │    6     │      │
│                                 └──────────┘      │
└─────────────────────────────────────────────────────┘
Variable heights, 20px gaps
```

### Detail View
```
┌─────────────────────────────────────────────────────┐
│                                          [← BACK]  │
├─────────────────────────────────────────────────────┤
│                                                     │
│         ┌─────────────────────────────┐           │
│         │                             │           │
│         │       FULL IMAGE VIEW       │           │
│         │                             │           │
│         └─────────────────────────────┘           │
│                                                     │
│  MOOD: MINIMAL                                     │
│  Collection SS25                                   │
│  #minimal #monochrome #architecture                │
│                                                     │
│  [SAVE] [SHARE] [DOWNLOAD]                        │
└─────────────────────────────────────────────────────┘
```

---

## 📚 COLLECTIONS PAGE

### Season Navigation
```
┌─────────────────────────────────────────────────────┐
│ COLLECTIONS                                        │
├─────────────────────────────────────────────────────┤
│                                                     │
│  2025  2024  2023  2022  2021  ARCHIVE            │
│  ────                                              │
│                                                     │
│  [SPRING/SUMMER] [FALL/WINTER]                    │
└─────────────────────────────────────────────────────┘
Year tabs with active underline
```

### Collection Grid
```
┌─────────────────────────────────────────────────────┐
│ ┌─────────────────┬─────────────────┐              │
│ │                 │                 │              │
│ │                 │   COLLECTION    │              │
│ │   Hero Image    │      SS25       │              │
│ │                 │                 │              │
│ │                 │   "VOID THEORY" │              │
│ └─────────────────┴─────────────────┘              │
│                                                     │
│ ┌──────┬──────┬──────┬──────┐                     │
│ │      │      │      │      │                     │
│ │ Look │ Look │ Look │ Look │                     │
│ │  01  │  02  │  03  │  04  │                     │
│ │      │      │      │      │                     │
│ └──────┴──────┴──────┴──────┘                     │
└─────────────────────────────────────────────────────┘
Hero: 16:9, Looks: 3:4 ratio
```

---

## 📖 ARCHIVE PAGE

### Timeline Interface
```
┌─────────────────────────────────────────────────────┐
│ ARCHIVE — COMPLETE HISTORY                         │
├─────────────────────────────────────────────────────┤
│                                                     │
│  2019 ──── 2020 ──── 2021 ──── 2022 ──── 2023 ──── 2025│
│             └─────────●─────────┘                  │
│                   Selected                         │
│                                                     │
│  ┌──────────────────────────────────────┐         │
│  │         YEAR 2021 OVERVIEW           │         │
│  │                                      │         │
│  │  4 Collections                       │         │
│  │  127 Pieces                          │         │
│  │  23 Experiments                      │         │
│  └──────────────────────────────────────┘         │
│                                                     │
│  January    February    March    April             │
│  ● ○ ○      ○ ● ○      ● ○ ○    ○ ○ ●            │
│                                                     │
│  [View Collections] [View Experiments]             │
└─────────────────────────────────────────────────────┘
Interactive timeline with hover states
```

---

## 💭 ABOUT PAGE

### Storytelling Layout
```
┌─────────────────────────────────────────────────────┐
│ ABOUT                                              │
├─────────────────────────────────────────────────────┤
│                                                     │
│     CINCH LAB                                      │
│     Fashion's Extreme                              │
│     Technical Laboratory                           │
│                                                     │
│ ┌─────────────────────────────────────┐           │
│ │                                     │           │
│ │   Founded in 2019, CINCH LAB       │           │
│ │   operates at the intersection     │           │
│ │   of fashion and technology...     │           │
│ │                                     │           │
│ └─────────────────────────────────────┘           │
│                                                     │
│  OUR PHILOSOPHY                                    │
│  ┌───────┬───────┬───────┐                       │
│  │       │       │       │                       │
│  │ TECH  │ ART   │ HUMAN │                       │
│  │       │       │       │                       │
│  └───────┴───────┴───────┘                       │
│                                                     │
│  TEAM                                              │
│  Creative Director — Name                          │
│  Technical Lead — Name                             │
│  Design Team — 12 People                           │
└─────────────────────────────────────────────────────┘
```

---

## 📧 CONTACT PAGE

### Minimal Contact
```
┌─────────────────────────────────────────────────────┐
│ CONTACT                                            │
├─────────────────────────────────────────────────────┤
│                                                     │
│                                                     │
│           hello@cinchlab.com                       │
│           ───────────────────                      │
│                                                     │
│           SEOUL                                    │
│           123 Gangnam-daero                        │
│           Seoul, South Korea                       │
│                                                     │
│           NEW YORK                                 │
│           456 Broadway                             │
│           New York, NY 10013                       │
│                                                     │
│           [INSTAGRAM] [TWITTER] [LINKEDIN]         │
│                                                     │
│                                                     │
│     Or send us a message:                          │
│                                                     │
│     Name     ________________________              │
│     Email    ________________________              │
│     Message  ________________________              │
│              ________________________              │
│              ________________________              │
│                                                     │
│              [SEND MESSAGE]                        │
└─────────────────────────────────────────────────────┘
Clean form with minimal styling
```

---

## 📱 RESPONSIVE BEHAVIORS

### Mobile Navigation
```
┌─────────────────────┐
│ CINCH—LAB      ☰   │
├─────────────────────┤
│                     │
│ When menu opened:   │
│                     │
│     LAB             │
│     MOOD            │
│     COLLECTIONS     │
│     ARCHIVE         │
│     ABOUT           │
│     CONTACT         │
│                     │
│     [X CLOSE]       │
└─────────────────────┘
Full screen overlay
```

### Mobile Grid Adaptation
- 12 cols → 4 cols
- Horizontal scroll for galleries
- Stack all content vertically
- Increase touch targets to 44px
- Simplify interactions

---

## 🎯 Key Interaction Points

1. **Navigation**: Sticky header with blur backdrop
2. **Hover States**: All interactive elements scale/transform
3. **Loading**: Skeleton screens with shimmer effect
4. **Transitions**: 400ms fade between pages
5. **Scroll**: Parallax on hero sections (20% offset)
6. **Forms**: Real-time validation with inline errors
7. **Images**: Lazy load with blur-up placeholder
8. **Accessibility**: Focus rings, skip links, ARIA labels

---

*These wireframes provide the complete blueprint for implementing CINCH LAB's new design system.*