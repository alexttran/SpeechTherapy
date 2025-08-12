# Speech Coach MVP (No-Login, No-DB, Privacy-First)

A self-serve web app to help K–12 (and adults) improve English intelligibility
via accent softening and articulation coaching. No accounts, no database, no
server-side storage. Sessions last up to **30 minutes** and run fully in-browser
with a small API layer that proxies requests to the OpenAI API.

## Key Features
- **No login & no storage**: No database. The server never persists user data.
  All session state lives in browser memory and disappears on refresh.
- **30-minute session timer**: Hard cap per session.
- **Assessment → Recommendations → Exercises → Coaching → Summary** flow.
- **English-only** (for now), with accent profiles for common regions (Europe, Asia, Mexico).
- **Pronunciation-first**: Focus on phoneme targets, minimal pairs, and tongue placement diagrams.
- **Encouraging tone** for feedback.
- **OpenAI API**: Whisper for transcription, GPT for coaching feedback and next steps.
- **SLP-inspired content**: Minimal pairs and cues curated in local JSON. (Generalized, not medical advice.)

## Tech
- Next.js (App Router) + TypeScript + TailwindCSS
- Edge-friendly APIs but defaulting to Node runtime for file FormData stability
- No DB, no analytics
- Microphone access via MediaRecorder
- API routes: `/api/transcribe` (Whisper), `/api/coach` (Chat Completions)

## Getting Started
1. **Install deps**
   ```bash
   npm i
   ```
2. **Create `.env.local`** from example and set your OpenAI key.
   ```bash
   cp .env.example .env.local
   # then edit .env.local
   ```
3. **Run dev server**
   ```bash
   npm run dev
   ```
4. Open http://localhost:3000


## Privacy & Safety
- The server never writes audio or text to disk.
- No cookies/localStorage/sessionStorage are used for user content.
- This tool is **not clinical therapy**. It provides **communication coaching** only.

## Project Structure
```text
/src
  /app
    /api
      /coach/route.ts         # Calls OpenAI Chat Completions for feedback
      /transcribe/route.ts    # Calls OpenAI Whisper for transcription
    /session/page.tsx         # Main session flow
    /page.tsx                 # Landing / intro
    /layout.tsx               # App shell
  /components
    CoachPanel.tsx
    Recorder.tsx
    StepHeader.tsx
    TongueDiagram.tsx
    MinimalPairCard.tsx
  /lib
    accentProfiles.ts         # Typical challenges for selected accents (generalized)
    curriculum.ts             # SLP-inspired exercises & passages
    sessionFlow.ts            # Simple state machine-like helpers
    utils.ts                  # helpers (WPM, chunking, timers)
  /styles
    globals.css
  /types
    index.ts
tailwind.config.ts
postcss.config.js
next.config.js
package.json
tsconfig.json
.env.example
```

## Notes
- Session summary is generated client-side and can be printed/saved as PDF (browser's print dialog). Nothing is stored.
- Accent profiles are general tendencies; individuals vary.
- Replace or expand curriculum with licensed or SLP-authored content as desired.
- Tongue placement diagrams are simple SVGs included in `TongueDiagram.tsx`.

## License
MIT
