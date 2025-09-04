import { useState } from 'react';
import { 
  ClerkProvider, 
  SignedIn, 
  SignedOut, 
  SignIn,
  UserButton
} from '@clerk/clerk-react';
import { ImportPrompts } from './pages/ImportPrompts';
import { Recorder } from './pages/Recorder';
import { CompletionPage } from './pages/CompletionPage';
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
    <ClerkProvider publishableKey={clerkPubKey}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <SignedOut>
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
              <div className="flex items-center justify-center gap-3 mb-6">
                <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="14" fill="url(#gradient-login)" stroke="currentColor" strokeWidth="1" className="stroke-gray-200 dark:stroke-gray-700"/>
                  <path d="M16 8C16 7.44772 15.5523 7 15 7H13C12.4477 7 12 7.44772 12 8V20C12 20.5523 12.4477 21 13 21H15C15.5523 21 16 20.5523 16 20V8Z" fill="white"/>
                  <path d="M21 11C21 10.4477 20.5523 10 20 10H18C17.4477 10 17 10.4477 17 11V20C17 20.5523 17.4477 21 18 21H20C20.5523 21 21 20.5523 21 20V11Z" fill="white"/>
                  <path d="M11 13C11 12.4477 10.5523 12 10 12H8C7.44772 12 7 12.4477 7 13V20C7 20.5523 7.44772 21 8 21H10C10.5523 21 11 20.5523 11 20V13Z" fill="white"/>
                  <path d="M26 14C26 13.4477 25.5523 13 25 13H23C22.4477 13 22 13.4477 22 14V20C22 20.5523 22.4477 21 23 21H25C25.5523 21 26 20.5523 26 20V14Z" fill="white"/>
                  <circle cx="16" cy="24" r="2" fill="white"/>
                  <defs>
                    <linearGradient id="gradient-login" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#3B82F6"/>
                      <stop offset="1" stopColor="#8B5CF6"/>
                    </linearGradient>
                  </defs>
                </svg>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  SenRecorder
                </h1>
              </div>
              <SignIn />
            </div>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="min-h-screen flex flex-col">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                  <div className="flex items-center gap-2">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="16" cy="16" r="14" fill="url(#gradient)" stroke="currentColor" strokeWidth="1" className="stroke-gray-200 dark:stroke-gray-700"/>
                      <path d="M16 8C16 7.44772 15.5523 7 15 7H13C12.4477 7 12 7.44772 12 8V20C12 20.5523 12.4477 21 13 21H15C15.5523 21 16 20.5523 16 20V8Z" fill="currentColor" className="fill-gray-900 dark:fill-white"/>
                      <path d="M21 11C21 10.4477 20.5523 10 20 10H18C17.4477 10 17 10.4477 17 11V20C17 20.5523 17.4477 21 18 21H20C20.5523 21 21 20.5523 21 20V11Z" fill="currentColor" className="fill-gray-900 dark:fill-white"/>
                      <path d="M11 13C11 12.4477 10.5523 12 10 12H8C7.44772 12 7 12.4477 7 13V20C7 20.5523 7.44772 21 8 21H10C10.5523 21 11 20.5523 11 20V13Z" fill="currentColor" className="fill-gray-900 dark:fill-white"/>
                      <path d="M26 14C26 13.4477 25.5523 13 25 13H23C22.4477 13 22 13.4477 22 14V20C22 20.5523 22.4477 21 23 21H25C25.5523 21 26 20.5523 26 20V14Z" fill="currentColor" className="fill-gray-900 dark:fill-white"/>
                      <circle cx="16" cy="24" r="2" fill="currentColor" className="fill-gray-900 dark:fill-white"/>
                      <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#3B82F6"/>
                          <stop offset="1" stopColor="#8B5CF6"/>
                        </linearGradient>
                      </defs>
                    </svg>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      SenRecorder
                    </h1>
                  </div>
                  <UserButton afterSignOutUrl="/" />
                </div>
              </div>
            </div>

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

            <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8 mt-auto">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-400">
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
                  <div className="flex items-center gap-4">
                    <a href="https://github.com/densenden/EmoRecorder" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-500">
                  © 2025 SEN.CO UG. All rights reserved.
                </div>
              </div>
            </footer>
          </div>
        </SignedIn>
      </div>
    </ClerkProvider>
  );
}

export default App;