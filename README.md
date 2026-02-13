# 💌 Valentine’s Day Interactive Invite

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

## ✨ Features

- 📸 Multi-photo upload (preview + remove)
- 💗 Envelope opening animation (slow romantic reveal)
- 🎵 Background music (local MP3, gesture-triggered)
- 😈 “No” button that can’t be clicked
- 💌 Multi-step invitation flow
- 🎨 Pink/red Valentine theme with handwritten-style font

---

## 🛠 Tech Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- Lucide Icons

---

## 🤖 AI-Assisted Development Workflow

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
valentines-invite/
├── components/
│ ├── AskScreen.tsx
│ ├── CreatorForm.tsx
│ ├── EnvelopeReveal.tsx
│ └── FloatingHearts.tsx
│
├── public/
│ └── romantic.mp3
│
├── App.tsx
├── index.tsx
├── types.ts
├── vite.config.ts
├── package.json
└── tsconfig.json

---

## 🎵 Music Setup

To avoid browser autoplay issues, the app uses a local MP3 file.

Place your music file inside: public/romantic.mp3

It will then be accessible at: http://localhost:3000/romantic.mp3


---

## 🚀 Run Locally

Install dependencies:

```bash
npm install

2. Start the development server
npm run dev

3. Open in browser

http://localhost:3000