import { TopBar } from '../components/TopBar'
import { AbstractBackground } from '../components/AbstractBackground'

export function About() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <AbstractBackground />
      <TopBar title="SenRecorder" subtitle="About" showUserButton={true} />

      {/* Main content */}
      <div className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Hero Section */}
          <div className="card-primary p-8 text-center">
            <div className="mb-6">
              <img 
                src="/logo.svg" 
                alt="SenRecorder Logo" 
                className="mx-auto w-32 h-32"
              />
            </div>
            <h2 className="text-3xl font-thin text-primary mb-4">
              Professional Emotion Audio Recording
            </h2>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              SenRecorder is a specialized tool for creating high-quality emotional voice datasets. 
              Perfect for AI training, voice research, and professional audio production.
            </p>
          </div>

          {/* What is SenRecorder */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-primary p-6">
              <h3 className="text-2xl font-semibold text-primary mb-4">What is SenRecorder?</h3>
              <p className="text-secondary leading-relaxed mb-4">
                SenRecorder is a professional-grade web application designed for recording emotional voice samples 
                with precise organization and high audio quality. Built for researchers, AI developers, and content creators 
                who need structured emotional audio datasets.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent-primary rounded-full"></div>
                  <span className="text-secondary">Emotion-based batch recording</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent-primary rounded-full"></div>
                  <span className="text-secondary">Individual sentence recording</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent-primary rounded-full"></div>
                  <span className="text-secondary">Professional audio quality</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent-primary rounded-full"></div>
                  <span className="text-secondary">Organized file management</span>
                </div>
              </div>
            </div>

            <div className="card-primary p-6">
              <img 
                src="/about-hero.jpg" 
                alt="Professional Audio Waveform Visualization" 
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-xl font-semibold text-primary mb-2">Professional Results</h3>
              <p className="text-secondary">
                Every recording is captured at 48kHz in 24-bit WAV format, ensuring studio-quality audio 
                suitable for professional applications and AI training datasets.
              </p>
            </div>
          </div>

          {/* Usage Examples */}
          <div className="card-primary p-8">
            <h3 className="text-2xl font-semibold text-primary mb-6 text-center">Usage Examples</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-primary mb-3">Research & AI Development</h4>
                <ul className="space-y-2 text-secondary">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-accent-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>AI training datasets for speech synthesis models</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-accent-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Voice research and linguistic studies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-accent-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Emotion recognition system training</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-primary mb-3">Content & Education</h4>
                <ul className="space-y-2 text-secondary">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-accent-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Professional voiceovers and audio content</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-accent-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Language learning pronunciation guides</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-accent-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Voice acting portfolios and speech therapy</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="card-primary p-8">
            <h3 className="text-2xl font-semibold text-primary mb-6">Technical Specifications</h3>
            <div className="grid md:grid-cols-2 gap-8">
              
              <div>
                <h4 className="text-lg font-semibold text-primary mb-4">Audio Quality</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-border-light dark:border-border-dark">
                    <span className="text-secondary">Sample Rate</span>
                    <span className="text-primary font-mono">48 kHz</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border-light dark:border-border-dark">
                    <span className="text-secondary">Bit Depth</span>
                    <span className="text-primary font-mono">24-bit</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border-light dark:border-border-dark">
                    <span className="text-secondary">Format</span>
                    <span className="text-primary font-mono">WAV (PCM)</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border-light dark:border-border-dark">
                    <span className="text-secondary">Channels</span>
                    <span className="text-primary font-mono">Mono</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-primary mb-4">Platform Features</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-border-light dark:border-border-dark">
                    <span className="text-secondary">Browser Support</span>
                    <span className="text-primary">Modern Web Browsers</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border-light dark:border-border-dark">
                    <span className="text-secondary">Authentication</span>
                    <span className="text-primary">Clerk Secure Login</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border-light dark:border-border-dark">
                    <span className="text-secondary">Storage</span>
                    <span className="text-primary">Cloud-based</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border-light dark:border-border-dark">
                    <span className="text-secondary">Export</span>
                    <span className="text-primary">ZIP + CSV Metadata</span>
                  </div>
                </div>
              </div>

            </div>

            <div className="mt-8 p-4 bg-brand-cream/10 dark:bg-brand-primary/10 rounded-xl">
              <h5 className="text-primary font-semibold mb-2">Why WAV Format?</h5>
              <p className="text-secondary text-sm leading-relaxed">
                We use uncompressed WAV format to preserve every detail of your voice recordings. 
                Unlike compressed formats (MP3, AAC), WAV maintains the full dynamic range and frequency spectrum, 
                making it ideal for professional applications, AI training, and scientific research where audio fidelity is critical.
              </p>
            </div>
          </div>

          {/* About Studio SEN */}
          <div className="card-primary p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <img 
                  src="/studio-sen.jpg" 
                  alt="Studio Sen - Digital Innovation" 
                  className="w-full h-48 object-cover rounded-xl"
                />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-primary mb-4">About Studio Sen</h3>
                <p className="text-secondary leading-relaxed mb-4">
                  Studio Sen is a digital innovation studio specializing in cutting-edge web applications 
                  and AI-powered tools. We create professional-grade solutions that bridge the gap between 
                  technology and human creativity.
                </p>
                <p className="text-secondary leading-relaxed mb-6">
                  SenRecorder represents our commitment to building tools that empower creators, researchers, 
                  and innovators to capture and organize human expression with unprecedented quality and precision.
                </p>
                <div className="space-y-3">
                  <a 
                    href="https://www.sen.studio" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    Visit Studio Sen
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Development Services Teaser */}
          <div className="card-primary p-8 text-center bg-gradient-to-br from-accent-primary/5 to-accent-secondary/5">
            <h3 className="text-2xl font-semibold text-primary mb-4">Need Custom Development?</h3>
            <p className="text-secondary max-w-2xl mx-auto mb-6 leading-relaxed">
              Looking for a tailored solution like SenRecorder for your specific needs? Studio Sen offers 
              custom web application development, AI integration, and specialized tool creation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="https://dev.sen.studio" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                Explore Development Services
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <span className="text-secondary text-sm">
                Custom tools • AI integration • Web applications
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="surface-elevated border-t border-border-elevated-light dark:border-border-elevated-dark py-4 sm:py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-3 sm:gap-6">
              <a href="/orga" className="nav-toggle">
                1by1
              </a>
              <div className="flex gap-3 sm:gap-6 text-xs sm:text-sm text-secondary">
                <a href="/downloads" className="hover:text-primary transition-colors">
                  Downloads
                </a>
                <a href="https://www.sen.studio/content/legal/imprint.html" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  Imprint
                </a>
                <a href="https://www.sen.studio/content/legal/terms.html" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  Terms
                </a>
                <a href="https://www.sen.studio/content/legal/privacy.html" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  Privacy
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://github.com/densenden/EmoRecorder" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-3 sm:mt-6 text-center text-xs text-muted">
            © 2025 SEN.CO UG. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}