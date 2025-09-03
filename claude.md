Perfekt. Hier ist deine vollständige claude.md-Datei auf Englisch – bereit für Claude, Cursor oder jede andere AI-gestützte Dev-Umgebung.

Die Datei ist exakt auf dein Setup abgestimmt: React + TailwindCSS, Clerk Auth, Supabase Storage, automatische Light/Dark Mode-Erkennung, WAV-Dateiuploads in Ordnern nach Emotion, Inter Font, mobilfähig, performant und klar strukturiert.

⸻

📄 claude.md

# Project: EmoRecorder – Emotion-based Audio Recording App

## Goal
Build a performant, mobile-friendly web app using React + TailwindCSS that allows logged-in users to record short audio snippets (WAV format) based on predefined sentence prompts with assigned emotions. Each recording is saved in Supabase Storage under a folder structure organized by user and emotion.

---

## Stack

- React + Vite
- TailwindCSS (with dark mode: media)
- Inter font
- Clerk for authentication
- Supabase (Storage only, no RLS needed)
- Web Audio API for recording
- Context API or Zustand for state (optional)
- `slugify` for filename generation

---

## Key Features

- ✅ Import sentence+emotion prompts as text
- ✅ Display sentence + emotion per step
- ✅ System mic selection (via MediaDevices)
- ✅ Record audio and preview it
- ✅ Save WAV file with filename based on sentence and emotion
- ✅ Upload to Supabase `/userId/emotion/filename.wav`
- ✅ Responsive layout, supports mobile
- ✅ Auto detects system light/dark mode
- ✅ Protected via Clerk login

---

## UI Flow

1. **Login Page**
   - Clerk Login (email or social)
   - Redirect to `/recorder` upon auth

2. **Prompt Import Screen**
   - Textarea input
   - Format:
     ```
     Sad:
     I tried everything, but it still hurts.

     Excited:
     Guess what? We’re going to space!
     ```
   - Parsed into:
     ```ts
     { emotion: "Sad", sentence: "I tried everything..." }
     ```

3. **Recording Flow**
   - Shows current sentence + emotion
   - Allows mic selection if multiple devices
   - Button group:
     - 🎙 Start recording
     - ⏹ Stop
     - 🔁 Retry
     - ✅ Save
   - After save, proceed to next

4. **Audio Naming**
   - Filename: `[emotion]_[slugified-sentence].wav`
   - Example:
     `sad_i-tried-everything.wav`

5. **Supabase Upload**
   - Structure:
     ```
     /user_abc123/sad/sad_i-tried-everything.wav
     /user_abc123/excited/excited_guess-what.wav
     ```

---

## Supabase Setup

- Storage bucket: `emo-recordings`
- Public access with upload token (optional)
- No DB table required unless for analytics

---

## Folder Structure (example)

src/
components/
MicSelector.tsx
RecorderControls.tsx
PromptDisplay.tsx
pages/
ImportPrompts.tsx
Recorder.tsx
utils/
parsePrompts.ts
slugify.ts
lib/
supabase.ts
clerk.ts
app.tsx
main.tsx

---

## Styling / Tailwind Setup

- Inter font (via Google Fonts)
- `tailwind.config.ts`:
  ```ts
  darkMode: 'media',
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
  }

	•	Color scheme:
	•	Light: neutral background, blue/gray accents
	•	Dark: dark gray bg, teal accents
    •   No Emojis
    •   No Gradients
    •   Frosted Glass, minimalist regular font 

⸻

Required Env Vars (.env)

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_SECRET=your_supabase_secret_key
VITE_SUPABASE_PUBLISHABLE=your_supabase_publishable_key
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key


⸻

Dependencies (npm)

npm install @clerk/clerk-react @clerk/clerk-js
npm install @supabase/supabase-js
npm install slugify
npm install clsx


⸻

Nice-to-Haves
	•	Show current progress: X / Y prompts completed
	•	Allow skipping a sentence
	•	Add a check that duration > 2 seconds before upload
	•	Playback before saving
    •   Redo the recording
	•	Error handling UI
	•	Offline safety (queue unsaved files if needed)

⸻

Optional Next Steps
	•	Add Whisper AI or sentiment model to evaluate emotion accuracy
	•	Add export of filenames as .csv
	•	Enable voice warmup / training mode

⸻

GitHub Oneliner

🎙️ EmoRecorder is a React+Tailwind web app for recording emotional prompts as WAV files and uploading them to Supabase, powered by Clerk Auth and the Web Audio API.
