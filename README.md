# Portfolio - Next.js 14+ App Router

A modern portfolio website built with Next.js 14+ using the App Router architecture.

## Features

- ✅ Next.js 14+ App Router
- ✅ Server Components by default
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ Framer Motion animations
- ✅ Dark mode with next-themes
- ✅ Radix UI components
- ✅ SEO optimized with metadata API
- ✅ Image optimization with next/image
- ✅ Responsive design

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
/app                    # App Router directory
  /layout.tsx          # Root layout with metadata
  /page.tsx            # Home page
  /providers.tsx       # Client-side providers
  /globals.css         # Global styles
/components            # React components
  /pages              # Page components
  /ui                 # UI components (Radix)
  /navigation.tsx     # Navigation component
  /portfolio-client.tsx # Main client component
/hooks                # Custom hooks
/lib                  # Utilities
/public               # Static assets
```

## Key Migrations from React to Next.js

- Replaced React Router with Next.js App Router
- Converted to Server Components where possible
- Added "use client" directive for interactive components
- Replaced `<img>` with Next.js `<Image>` component
- Implemented metadata API for SEO
- Used next-themes instead of custom theme provider
- Configured external image domains in next.config.js
