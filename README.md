# 🏛️ Architectural Canvas — Mohammed Ateeq Portfolio

An immersive, high-performance developer portfolio and interactive architectural canvas built with **Next.js 14**, **React 18**, **TypeScript**, **Three.js / React Three Fiber**, and **Tailwind CSS**.

Designed with a brutalist, futuristic aesthetic, this web application blends high-fidelity 3D graphics, frame-by-frame canvas scrubbing, audio-reactive neumorphic dials, and custom text scramble animations—all while maintaining strict performance budgets, sub-second latency, and responsive design.

---

## 🌟 Live Demo & Links

- **Live Site**: [mohdateeqnova.in](https://www.mohdateeqnova.in)
- **GitHub**: [@Mohammed-Ateeq-nova](https://github.com/Mohammed-Ateeq-nova)
- **LinkedIn**: [mohammed-ateeq](https://www.linkedin.com/in/mohammed-ateeq/)

---

## ✨ Features & Highlights

### 1. 🎞️ 600vh Hero Canvas Scroll Experience
- **Frame-by-Frame Scrubbing**: Renders 59 high-definition 3D camera rotation frames synchronized to user scroll position across a `600vh` sticky track.
- **Hardware-Accelerated 2D Canvas**: Frame drawing is batched via `requestAnimationFrame` with `{ alpha: false }` context and GPU transform layer promotion (`willChange: 'transform'`).
- **Graceful Frame Interpolation**: Employs an intelligent fallback algorithm that renders the closest loaded frame during rapid flick-scrolling to prevent blank flashes.
- **Synchronized Overlays**: Scroll-linked typography and subtitles describing architectural and systems engineering principles.

### 2. ⚡ Two-Pass Progressive Preloading
- **Payload Reduction**: Converted 59 original PNG frames (146.6 MB) to high-quality modern WebP (7.2 MB), achieving a **~95% payload reduction**.
- **Progressive Unlocking**:
  - **Pass 1 (Priority)**: Loads frames 1–20 to enable immediate First Contentful Paint (FCP) and interactive readiness.
  - **Pass 2 (Background)**: Asynchronously fetches remaining frames (21–59) after the loader gate opens.
  - Built-in automatic fallback to PNG if WebP fails to load.

### 3. 🌀 Unicorn Studio WebGL Site Loader
- Cyberpunk-inspired full-screen site preloader integrating Unicorn Studio WebGL shaders.
- Live asset preloading tracking showing actual download progress and frame initialization before revealing the interface.
- Smooth exit transitions powered by Framer Motion.

### 4. 🎛️ Interactive Neumorphic Controls & Dials
- Custom tactile audio-style neumorphic rotary dial (`NeumorphicDial`) with drag, touch, and scroll gesture tracking.
- Audio synthesis cues and interactive sound toggle.
- Count-up statistics counters driven by custom quadratic easing algorithms.

### 5. 🔠 Optimized Scramble Text Typography
- Sequential character decoding with cybernetic glyph pools (`!@#$%^&*<>...ΔΩΞλπ`).
- **Singleton Timer Scheduler**: Replaced independent interval timers with a global singleton subscriber architecture (`useScrambleText`), eliminating CPU timer contention and micro-stutters.

### 6. 🪐 Interactive 3D Footer Model (React Three Fiber)
- Embedded interactive 3D logo rendered in Three.js and `@react-three/fiber`.
- Mouse gyro tracking, lighting controls, and dynamic material color presets (`cyber`, `aurora`, `magma`).
- Smooth inertia and floating animation physics.

### 7. 📁 Dynamic Project & Experience Case Studies
- **Filterable Catalog**: Featured work spanning AI/Healthcare, LLMs, Computer Vision, and Full-Stack Engineering.
- **Deep-Dive Routes**:
  - `/projects/[id]`: Architecture diagrams, technical implementation context, YouTube video demos, and GitHub links.
  - `/experience/[id]`: Defense research systems (DRDO-RCI), protocol engineering (RS-422, MIL-STD-1553), and freelance web projects.
- Static Site Generation (`generateStaticParams`) for instant route transitions.

### 8. 📝 Technical Writing & Articles (`/blog`)
- Dedicated blog space highlighting technical articles on LLM evaluation, local RAG architectures, contactless signal extraction (rPPG), and UI performance.

### 9. 🚀 SEO & Structured Data
- Complete OpenGraph and Twitter meta cards.
- Embedded JSON-LD schema (`Person` schema markup).
- Static `sitemap.xml` and `robots.txt` generation.

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router, SSG, Turbopack-ready) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) (Strict mode, type-safe routes & data) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), CSS Variables |
| **3D & Canvas** | [Three.js](https://threejs.org/), [@react-three/fiber](https://r3f.docs.pmnd.rs/), [@react-three/drei](https://github.com/pmndrs/drei), HTML5 Canvas 2D |
| **Animations** | [Framer Motion](https://www.framer.com/motion/), Unicorn Studio WebGL |
| **State & Forms** | [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/), [@tanstack/react-query](https://tanstack.com/query) |
| **Icons & UI** | [Lucide React](https://lucide.dev/), [Radix UI](https://www.radix-ui.com/), [Sonner](https://sonner.emilkowal.ski/) |
| **Testing** | [Vitest](https://vitest.dev/), React Testing Library, JSDOM |

---

## ⚡ Performance Architecture

1. **Asset Compression & Modern Formats**:
   - WebP image sequences deliver pristine visual fidelity at 1/20th the size of raw PNGs.
2. **Viewport-Gated Rendering (`SectionWrapper`)**:
   - Below-the-fold sections (`ResumeSection`, `ContactSection`, and `FooterSection`'s Three.js canvas) mount dynamically as the user approaches them using `IntersectionObserver` with a `350px` buffer.
   - Drastically cuts initial DOM size, hydration overhead, and memory footprint.
3. **Critical Font Optimization**:
   - Preconnected to Google Fonts CDN with `display=swap`.
   - Preloaded initial hero frame in `<head>`.
4. **Next.js Tree-Shaking**:
   - Enabled `swcMinify: true`, `compress: true`, and `experimental.optimizePackageImports` for heavy component libraries (`three`, `framer-motion`, `lucide-react`, `@radix-ui/*`).

---

## 📂 Project Structure

```text
architectural-canvas/
├── public/
│   ├── Hero_Frames/               # 59 WebP and PNG frames for hero scroll
│   ├── projects/                  # Project screenshots and assets
│   ├── models/                    # 3D GLTF/GLB models for footer scene
│   └── favicon.png                # Brand favicon
├── src/
│   ├── app/                       # Next.js 14 App Router
│   │   ├── blog/                  # Blog page and client view
│   │   ├── experience/[id]/       # Dynamic experience detail pages (SSG)
│   │   ├── projects/[id]/         # Dynamic project detail pages (SSG)
│   │   ├── layout.tsx             # Root layout, fonts, meta tags
│   │   ├── page.tsx               # Homepage with progressive sections
│   │   ├── not-found.tsx          # Custom 404 page
│   │   ├── robots.ts              # SEO crawler directives
│   │   └── sitemap.ts             # Dynamic XML sitemap generator
│   ├── components/                # Core reusable UI and scene components
│   │   ├── sections/              # Page sections (Hero, About, Projects, Experience, Contact, Footer)
│   │   ├── ui/                    # shadcn/ui and Radix design system primitives
│   │   ├── FooterLogoScene.tsx    # Interactive Three.js R3F canvas footer
│   │   ├── HeroScroll.tsx         # Canvas-based 600vh frame scrubbing engine
│   │   ├── NeumorphicDial.tsx     # Custom rotary control dial
│   │   ├── SiteLoader.tsx         # Unicorn Studio preloader
│   │   ├── SectionWrapper.tsx     # IntersectionObserver lazy mounting wrapper
│   │   ├── ScrambleText.tsx       # Character scramble typography component
│   │   └── Navigation.tsx         # Floating dock navigation bar
│   ├── data/                      # Structured content records
│   │   ├── experiences.ts         # Career roles, responsibilities, achievements
│   │   └── projects.ts            # Project technical specs, demos, architectures
│   ├── hooks/                     # Custom React hooks
│   │   ├── useScrambleText.ts     # Global scheduler for scramble animations
│   │   ├── useScramble.ts         # Secondary text effect hook
│   │   └── useTheme.ts            # Next-themes wrapper
│   ├── lib/                       # Utility functions & managers
│   │   ├── heroFramePreloader.ts  # Progressive two-pass frame loader
│   │   └── utils.ts               # Tailwind class merge helper (cn)
│   └── index.css                  # Global styles, Tailwind directives, theme variables
├── next.config.js                 # Next.js configuration & compiler settings
├── tailwind.config.ts             # Tailwind design tokens & plugins
├── tsconfig.json                  # TypeScript configuration
└── package.json                   # Dependencies & build scripts
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.17.0` or higher
- **npm** or **pnpm** or **yarn**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Mohammed-Ateeq-nova/architectural-canvas.git
   cd architectural-canvas
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Next.js development server with hot reloading. |
| `npm run build` | Compiles the production build, optimizes bundles, and pre-renders static pages. |
| `npm run start` | Runs the compiled Next.js production server. |
| `npm run lint` | Runs ESLint to check for code quality and style issues. |
| `npm run test` | Executes unit tests using Vitest. |
| `npm run test:watch` | Runs Vitest in interactive watch mode. |

---

## ⚙️ Customization & Adding Content

### Adding / Modifying Projects
Open [`src/data/projects.ts`](file:///c:/nova/projects/portfolio/Antigravity/architectural-canvas/src/data/projects.ts) and add or edit project records:
```typescript
export const projectData: Record<string, ProjectData> = {
  'your-project-slug': {
    title: 'Your Project Title',
    category: 'AI / Full Stack',
    overview: 'Short summary of the system...',
    documentation: {
      context: 'Why this project was built...',
      approach: 'How you solved it...',
      implementation: 'Technical stack details...',
      architecture: 'Data flow and pipeline steps...',
    },
    tech: [
      { name: 'TypeScript', usage: 'End-to-end type safety' }
    ],
    githubUrl: 'https://github.com/...',
    liveUrl: 'https://...',
    youtubeId: 'VIDEO_ID',
    image: '/projects/your-project/cover.png'
  }
};
```
Because the app uses static generation (`generateStaticParams`), new project pages at `/projects/your-project-slug` are generated automatically at build time!

### Adding / Modifying Experience
Open [`src/data/experiences.ts`](file:///c:/nova/projects/portfolio/Antigravity/architectural-canvas/src/data/experiences.ts) to update timeline entries, responsibilities, and achievements.

---

## 🛡️ License

This project is open source and available under the **MIT License**.

---

## 👤 Author & Contact

**Mohammed Ateeq**
- **Website**: [mohdateeqnova.in](https://www.mohdateeqnova.in)
- **GitHub**: [@Mohammed-Ateeq-nova](https://github.com/Mohammed-Ateeq-nova)
- **LinkedIn**: [mohammed-ateeq](https://www.linkedin.com/in/mohammed-ateeq/)
- **Email**: [mohd.ateeq.march@gmail.com](mailto:mohd.ateeq.march@gmail.com)
