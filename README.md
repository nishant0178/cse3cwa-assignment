# CSE3CWA Assignment 1

**Name:** Nishant Singh
**Student ID:** 21973913

## What is this?

This is my first assignment for CSE3CWA. Basically it's a Next.js app that lets you create HTML tabs. You can make up to 15 tabs, edit them, and then download the HTML file to submit on MOODLE.

## Running it

```bash
npm install
npm run dev
```

Then go to http://localhost:3000

## Features

- Create/edit/delete tabs (max 15)
- Dark mode toggle
- Saves your tabs in localStorage so you don't lose them
- Generates standalone HTML with inline CSS
- Download or copy the generated code
- Works on MOODLE (thats the important part lol)

## What I built

Main stuff:
- Tab generator (the core thing)
- Dark/light theme
- Hamburger menu with animation
- About page with my info
- Some extra pages (escape room, coding races etc - mostly empty for now)

The generated HTML uses only inline styles because MOODLE doesn't accept external CSS files. Spent way too much time figuring that out.

## Tech stuff

- Next.js 15 with TypeScript
- React for components
- localStorage for saving tabs
- Inline CSS everywhere (had to)

## File structure

```
pages/
  index.tsx         - main tab generator
  about.tsx         - about page
  escape-room.tsx   - extra feature (wip)
  coding-races.tsx  - extra feature (empty)
  court-room.tsx    - extra feature (empty)
  _app.tsx          - app wrapper

components/
  Header.tsx        - navbar with dark mode
  Footer.tsx        - footer
```

## How to use

1. Add tabs using the + button
2. Click on a tab to edit it
3. Type your content
4. Hit "Generate HTML"
5. Copy or download the file
6. Upload to MOODLE

Pretty straightforward.

## Notes

- The 15 tab limit is hardcoded (assignment requirement)
- Dark mode uses a custom event to sync across components
- Generated HTML filename is weekAssign.html
- Everything saves automatically in localStorage

## Issues I ran into

- MOODLE not accepting external CSS (solution: inline everything)
- Dark mode syncing between pages (solution: custom events)
- Tab IDs getting messed up when deleting (solution: filter and update properly)
- TypeScript being annoying with types (solution: used `any` in a few places ngl)

## Git

Multiple commits done. Check the history for progress.

## Help

If something breaks or doesn't work, let me know.

---

Made with help from Claude AI and ChatGPT (being honest here). Wrote most of the logic myself but got help with styling and debugging.
