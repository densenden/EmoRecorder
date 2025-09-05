import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { 
  ClerkProvider, 
  SignedIn, 
  SignedOut, 
  SignIn
} from '@clerk/clerk-react';
import { ImportPrompts } from './pages/ImportPrompts';
import { Recorder } from './pages/Recorder';
import { CompletionPage } from './pages/CompletionPage';
import { Orga } from './pages/Orga';
import { Downloads } from './pages/Downloads';
import { About } from './pages/About';
import { AbstractBackground } from './components/AbstractBackground';
import { TopBar } from './components/TopBar';
import type { Prompt } from './utils/parsePrompts';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [recordedFiles, setRecordedFiles] = useState<Array<{path: string; emotion: string; sentence: string}>>();

  const handleImport = (importedPrompts: Prompt[]) => {
    setPrompts(importedPrompts);
    setIsRecording(true);
  };

  const handleComplete = (recordings: Array<{path: string; emotion: string; sentence: string}>) => {
    setIsRecording(false);
    setIsCompleted(true);
    setRecordedFiles(recordings);
  };

  const handleStartNew = () => {
    setIsCompleted(false);
    setPrompts([]);
    setRecordedFiles(undefined);
  };

  return (
    <Router>
      <ClerkProvider publishableKey={clerkPubKey}>
        <Routes>
          <Route path="/orga" element={<Orga />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/about" element={<About />} />
          <Route path="/*" element={
            <div className="min-h-screen relative">
              <AbstractBackground />
              <SignedOut>
          <div className="flex items-center justify-center min-h-screen">
            <div className="card-primary p-8">
              <div className="flex items-baseline justify-center gap-4 mb-6">
                <img 
                  src="/logo.svg" 
                  alt="SenRecorder Logo" 
                  className="w-12 h-12 text-gray-900 dark:text-gray-100"
                />
                <h1 className="text-2xl font-thin text-gray-900 dark:text-gray-100 transform scale-80 origin-left">
                  SenRecorder
                </h1>
              </div>
              <SignIn />
            </div>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="min-h-screen flex flex-col relative">
            <AbstractBackground />
            <TopBar 
              title="SenRecorder" 
              subtitle={
                isCompleted ? "Recordings Complete" : 
                !isRecording ? "Batch Recorder" : 
                "Recording in Progress"
              } 
              showUserButton={true} 
            />

            <div className="flex-1 py-8">
              {isCompleted && recordedFiles ? (
                <CompletionPage 
                  recordedFiles={recordedFiles} 
                  onStartNew={handleStartNew} 
                />
              ) : !isRecording ? (
                <ImportPrompts onImport={handleImport} />
              ) : (
                <Recorder prompts={prompts} onComplete={handleComplete} />
              )}
            </div>

            <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-t border-white/40 dark:border-gray-700/50 py-4 sm:py-8 mt-auto">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-3 sm:gap-6">
                    <a href="/orga" className="min-w-16 px-3 py-1.5 text-xs font-medium text-center text-gray-600 dark:text-gray-400 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 shadow-sm">
                      1by1
                    </a>
                    <div className="flex gap-3 sm:gap-6 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      <a href="/downloads" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                        Downloads
                      </a>
                      <a href="/about" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                        About
                      </a>
                      <a href="https://www.sen.studio/content/legal/imprint.html" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                        Imprint
                      </a>
                      <a href="https://www.sen.studio/content/legal/terms.html" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                        Terms
                      </a>
                      <a href="https://www.sen.studio/content/legal/privacy.html" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                        Privacy
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <a href="https://github.com/densenden/EmoRecorder" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="mt-3 sm:mt-6 text-center text-xs text-gray-500 dark:text-gray-500">
                  © 2025 Sen.Co UG. All rights reserved.
                </div>
              </div>
            </footer>
          </div>
              </SignedIn>
            </div>
          } />
        </Routes>
      </ClerkProvider>
    </Router>
  );
}

export default App;