# CSE3CWA Assignment 1 

**Student Name:** Nishant Singh  
**Student Number:** 21973913  
**Assignment:** Assignment 1 - 

## Project Overview

A Next.js app that creates HTML5 tabs. You can make up to 15 tabs and customize them however you want.

## Features Implemented

### User Interface
- Navigation bar with different sections
- Header with dark mode and menu
- Footer with my info
- About page

### Themes
- Dark and light modes
- Saves your preference

### Menu
- Hamburger menu that rotates when clicked
- Works on all screen sizes

### Tab Features
- Add/remove tabs (up to 15)
- Edit tab titles and content
- Automatically saves your work

### HTML Output
- Generates complete HTML files
- Uses inline CSS only
- Works in MOODLE
- Copy or download the code

### Git Stuff
- Multiple commits
- Everything is in the repo

## Technology Stack

- **Framework:** Next.js 15.5.0 with Turbopack
- **Language:** TypeScript
- **Styling:** Inline CSS and CSS-in-JS
- **Icons:** React Icons
- **Storage:** Browser localStorage for data persistence

## How to Run

```bash
npm install
npm run dev
```

That's it! Open localhost:3000 in your browser.

## How to Use

1. Click + to add tabs (max 15)
2. Edit tab titles and content
3. Click Generate HTML
4. Copy or download the HTML file
5. Use it in MOODLE

The generated HTML has all CSS inline and works everywhere.

## File Structure

```
project/
├── components/
│   ├── Header.tsx          # Main navigation header
│   └── Footer.tsx          # Site footer
├── pages/
│   ├── index.tsx           # Main tabs generator interface
│   ├── about.tsx           # About page with student info
│   ├── court-room.tsx      # Court room page (empty)
│   ├── escape-room.tsx     # Escape room page (empty)  
│   ├── coding-races.tsx    # Coding races page (empty)
│   └── _app.tsx            # Next.js app wrapper
├── public/                 # Static assets
├── package.json            # Dependencies and scripts
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## What I Built

Everything required for the assignment:
- Navigation with all sections
- Dark/light themes  
- Hamburger menu with animation
- Up to 15 editable tabs
- LocalStorage to save work
- HTML generation with inline CSS only
- Multiple git commits and branches

## Support

For questions or issues:
- **Student:** Nishant Singh (21973913)
- **Course:** CSE3CWA
- **Assignment:** Assignment 1

