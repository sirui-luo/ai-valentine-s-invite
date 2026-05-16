# 💌 Valentine’s Day Interactive Invite

https://private-user-images.githubusercontent.com/209253223/593543522-be969277-6246-46af-8bd9-7528e76ddaa1.mov?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Nzg5NDU1MTksIm5iZiI6MTc3ODk0NTIxOSwicGF0aCI6Ii8yMDkyNTMyMjMvNTkzNTQzNTIyLWJlOTY5Mjc3LTYyNDYtNDZhZi04YmQ5LTc1MjhlNzZkZGFhMS5tb3Y_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwNTE2JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDUxNlQxNTI2NTlaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1hNWEwNmJhMWFiZjY4ZmQ0MTZhOTc1NjM2YWY5YWEyODViOGZhNjJmZTY1ZjJlYTA1ZGI3YWE5MGNhOTdkZjg0JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZyZXNwb25zZS1jb250ZW50LXR5cGU9dmlkZW8lMkZxdWlja3RpbWUifQ.hkrTY9iapXqaVrMa2EAHDB5ThJOujaOiJlQ-J9eYzsg

A playful, interactive Valentine’s Day web app where:

- The sender creates a personalized invite
- The receiver must choose **“Yes, I will ❤️”**
- An animated envelope slowly opens
- Romantic music plays
- The final invitation is revealed beautifully

Built with:
Gemini AI Studio
Cursor
ChatGPT
This project explores AI-augmented creativity in frontend development.

---

## Features

- 📸 Multi-photo upload (preview + remove)
- 💗 Envelope opening animation (slow romantic reveal)
- 🎵 Background music (local MP3, gesture-triggered)
- 😈 “No” button that can’t be clicked
- 💌 Multi-step invitation flow
- 🎨 Pink/red Valentine theme with handwritten-style font

---

## Tech Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- Lucide Icons

---

## AI-Assisted Development Workflow

This project was built using a structured AI-assisted workflow combining:

- **Gemini AI Studio**
- **Cursor**
- **ChatGPT**

---

### 1️⃣ Idea & UX Brainstorming — ChatGPT

Used ChatGPT to:
- Explore interaction ideas
- Design playful “No button” behavior
- Improve animation concepts
- Refine UI logic and user flow

---

### 2️⃣ Structured Prompt Engineering — Gemini AI Studio

I used a structured prompting framework based on:

**Task → Context → Reference → Evaluate → Iterate**

Example structure:

- **Task**: Build a Valentine’s invite web app with envelope animation.
- **Context**: React + Vite project, client-side only.
- **Reference**: Romantic theme, handwritten font, pink/red palette.
- **Evaluate**: Ensure animation timing feels elegant and emotional.
- **Iterate**: Refine UX and simplify UI.

Gemini AI Studio generated:
- Initial component structure
- Animation scaffolding
- Envelope SVG logic
- Core layout files

---

### 3️⃣ Iteration & Refinement — Cursor

Cursor was used to:
- Refactor code
- Improve animation timing (2.3s romantic reveal)
- Debug browser audio autoplay behavior
- Simplify state management
- Polish UI details

---

## 📁 Project Structure

```bash
valentines-invite/
├── components/
│   ├── AskScreen.tsx
│   ├── CreatorForm.tsx
│   ├── EnvelopeReveal.tsx
│   └── FloatingHearts.tsx
│
├── public/
│   └── romantic.mp3
│
├── App.tsx
├── index.tsx
├── types.ts
├── vite.config.ts
├── package.json
└── tsconfig.json
```


---

## 🎵 Music Setup

To avoid browser autoplay issues, the app uses a local MP3 file.

Place your music file inside: public/romantic.mp3

It will then be accessible at: http://localhost:3000/romantic.mp3


---

## 🚀 Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start the development server

```bash
npm run dev
```

3. Open in browser

```
http://localhost:3000
```
