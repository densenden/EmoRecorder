# EmoRecorder

<p align="center">
  <strong>A modern emotion-based audio recording web application</strong>
</p>

<p align="center">
  Record emotional prompts as high-quality WAV files, organized by emotion and synced to the cloud
</p>

---

## Features

### Core Functionality
- **Emotion-Based Recording** - Record audio snippets based on predefined emotional prompts
- **Professional Audio Quality** - Capture high-fidelity WAV format recordings
- **Smart Organization** - Auto-categorize recordings by emotion type
- **Cloud Storage** - Seamlessly sync recordings to Supabase Storage
- **Multi-Device Support** - Select from available microphones
- **Real-time Preview** - Listen to recordings before saving

### Technical Highlights
- **Authentication** - Secure login via Clerk (email or social providers)
- **Dark Mode** - Automatic light/dark theme detection
- **Responsive Design** - Mobile-first, works on all devices
- **Modern Stack** - React 18, TypeScript, Vite for blazing-fast performance
- **Clean Architecture** - Well-organized component structure

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Clerk account for authentication
- Supabase account for storage

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/emorecorder.git
cd emorecorder
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE=your_supabase_publishable_key
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

4. Start the development server
```bash
npm run dev
```

## Usage

### Import Prompts
Enter your prompts in the following format:
```
Emotion:
First sentence to record.
Second sentence to record.

Another Emotion:
Another sentence.
```

### Recording Flow
1. **Select Microphone** - Choose from available input devices
2. **View Prompt** - See the current emotion and sentence
3. **Record** - Click to start recording
4. **Preview** - Listen to your recording
5. **Save or Retry** - Save to cloud or re-record

### File Organization
Recordings are automatically organized:
```
/user_id/
  /emotion/
    emotion_sentence-slug.wav
```

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS with automatic dark mode
- **Authentication**: Clerk
- **Storage**: Supabase Storage
- **Audio**: Web Audio API
- **Font**: Inter

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── MicSelector.tsx
│   ├── PromptDisplay.tsx
│   └── RecorderControls.tsx
├── pages/            # Page components
│   ├── ImportPrompts.tsx
│   └── Recorder.tsx
├── utils/            # Utility functions
│   ├── audioRecorder.ts
│   ├── parsePrompts.ts
│   └── slugify.ts
└── lib/              # External service configs
    └── supabase.ts
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Roadmap

- [ ] Add Whisper AI for emotion accuracy evaluation
- [ ] Export recording metadata as CSV
- [ ] Voice warmup/training mode
- [ ] Batch upload for offline recordings
- [ ] Advanced audio processing (noise reduction, normalization)
- [ ] Multi-language support
- [ ] Recording analytics dashboard

## License

MIT License - see [LICENSE](LICENSE) file for details

## Acknowledgments

Built with modern web technologies and best practices for performance and user experience.

---

<p align="center">
  Made with React + TailwindCSS + Web Audio API
</p>