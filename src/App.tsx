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
              <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">
                SenRecorder
              </h1>
              <SignIn />
            </div>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  SenRecorder
                </h1>
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          </div>

          <div className="py-8">
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
        </SignedIn>
      </div>
    </ClerkProvider>
  );
}

export default App;