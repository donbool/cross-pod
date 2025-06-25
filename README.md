# Cross-Pod

AI-powered platform for global micro-learning pods.

## Tech Stack
- Next.js (TypeScript)
- Supabase (Auth, DB)
- OpenAI API (project prompts)
- Google Calendar API (session scheduling)
- ElevenLabs/OpenAI (voice/translation)
- Tailwind CSS (UI)

## Setup
1. Clone repo & install deps:
   ```
   npm install
   ```
2. Copy `.env.example` to `.env.local` and fill in your keys.
3. Set up Supabase with the provided schema in `/supabase/schema.sql`.
4. Run dev server:
   ```
   npm run dev
   ```

## TODOs
- Pod matching algorithm
- Google Calendar OAuth flow
- Voice translation/cloning (ElevenLabs/OpenAI)
- Badge system logic
- Advanced notifications
- Mobile polish 