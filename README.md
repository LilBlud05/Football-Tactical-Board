# Football Tactical Board

Version: 0.1.0

A responsive football tactics board built with Next.js for planning formations, positioning players on a pitch, and analyzing tactical structure in real time.

## Features

- Interactive 2D football pitch
- Formation presets: 4-3-3, 4-2-3-1, and 3-5-2
- Drag-and-drop player positioning
- Player inspector for name, number, category, and role editing
- Tactical feedback and warnings based on formation and positioning
- Mentality selector for tactical setup changes
- Export board as an image

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide icons
- html-to-image

## Project Structure

```bash
src/
  app/
    layout.tsx
    page.tsx
  components/
    features/
    ui/
  lib/
    analyzer.ts
    formations.ts
    utils.ts
  styles/
    globals.css
  types/
    index.ts
```

## Prerequisites

- Node.js 18+
- npm

## Installation

```bash
npm install
```

## Running the App

Development mode:

```bash
npm run dev
```

Then open:

```bash
http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

## Notes

This project is intended as a tactical planning board for football coaches and analysts. It focuses on quick formation adjustments and immediate visual feedback for player positioning and tactical balance.

## License

This project is for educational and personal use.
