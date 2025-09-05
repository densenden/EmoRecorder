# SenRecorder

Professional emotion audio recording tool for AI training, voice research, and content creation. Create high-quality emotional voice datasets with precise organization and studio-quality audio.

## What It Does

SenRecorder is a specialized web application for recording emotional voice samples with professional audio quality. Perfect for AI developers, researchers, voice actors, and content creators who need structured emotional audio datasets.

## Features

- 🎙️ **Studio Quality Audio**: 48kHz, 24-bit WAV recordings
- 📝 **Batch Recording**: Import multiple emotion/sentence pairs
- 🎯 **Single Recording**: Record individual sentences on-demand
- 📊 **Smart Organization**: Automatic file naming and metadata
- 📥 **Bulk Download**: ZIP export with CSV metadata
- 🔊 **Real-time Preview**: Listen before saving
- 🌓 **Modern UI**: Glass morphism design with dark/light modes
- 📱 **Cross-platform**: Works on desktop and mobile browsers
- 🔐 **Secure**: Private recordings with user authentication

## Recording Modes

### Batch Recording (Main Page)
1. **Sign in** with your email or social account  
2. **Import your prompts** in this format:
   ```
   Happy:
   What a beautiful day!
   
   Sad:
   I miss the old times.
   ```
3. **Record** each sentence with the shown emotion
4. **Download** all recordings as ZIP when complete

### Single Recording (/orga)
1. **Enter a sentence** to record
2. **Click record** and speak clearly
3. **Preview** your recording
4. **Download immediately** or record another

## Example Prompts

The app comes with German example prompts, but you can use any language:

```
Excited:
Guess what? We're going to space!

Confused:
Wait, that doesn't make sense at all.

Angry:
This is absolutely unacceptable!
```

## Live App

Visit: **https://recorder.sen.studio**

## Use Cases

- **AI Training**: Create emotional voice datasets for machine learning
- **Voice Research**: Linguistic studies and prosody analysis
- **Content Creation**: Professional voiceovers and audio content
- **Language Learning**: Pronunciation guides and emotional expression
- **Voice Acting**: Build portfolios with organized samples
- **Speech Therapy**: Communication training and progress tracking

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Requirements

- Modern web browser with microphone access
- Account for login (free)

## Technical Specifications

- **Audio Format**: Uncompressed WAV (PCM)
- **Sample Rate**: 48 kHz
- **Bit Depth**: 24-bit
- **Channels**: Mono
- **Browser Support**: Modern browsers with Web Audio API
- **Authentication**: Clerk secure login
- **Storage**: Cloud-based with instant download

## Privacy & Security

- Your recordings are private and secure
- Only you can access your recordings  
- Download and delete anytime
- No recording data is shared or analyzed

---

**Built by [Studio Sen](https://sen.studio)** • Custom development: [dev.sen.studio](https://dev.sen.studio)