import { useState, useRef, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { AudioRecorder } from '../utils/audioRecorder'
import { CloudStorage } from '../utils/cloudStorage'
import { TopBar } from '../components/TopBar'
import { AbstractBackground } from '../components/AbstractBackground'

export function Orga() {
  const [isRecording, setIsRecording] = useState(false)
  const [currentSentence, setCurrentSentence] = useState('')
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [recordingDuration, setRecordingDuration] = useState(0)
  const audioRecorderRef = useRef<AudioRecorder | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const { user } = useUser()

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const startRecording = async () => {
    if (!currentSentence.trim()) {
      alert('Please enter a sentence first')
      return
    }

    try {
      audioRecorderRef.current = new AudioRecorder()
      await audioRecorderRef.current.startRecording()
      
      setIsRecording(true)
      setRecordingDuration(0)

      intervalRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1)
      }, 1000)
    } catch (error) {
      console.error('Error accessing microphone:', error)
      alert('Could not access microphone. Please check permissions.')
    }
  }

  const stopRecording = async () => {
    if (audioRecorderRef.current && isRecording) {
      const blob = await audioRecorderRef.current.stopRecording()
      setAudioBlob(blob)
      setIsRecording(false)
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }

  const downloadRecording = async () => {
    if (!audioBlob || !user) return

    try {
      // Save to cloud storage
      const url = await CloudStorage.uploadRecording(audioBlob, {
        userId: user.id,
        sentence: currentSentence,
        type: 'single'
      })

      // Also trigger immediate download
      const a = document.createElement('a')
      a.href = url
      const fileName = `${currentSentence.slice(0, 50).replace(/[^a-z0-9]/gi, '_')}.wav`
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error saving recording:', error)
      alert('Error saving recording. Please try again.')
    }
  }

  const resetForNewSentence = () => {
    setCurrentSentence('')
    setAudioBlob(null)
    setRecordingDuration(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      <AbstractBackground />
      <TopBar title="SenRecorder" subtitle="Sentence Recorder" showUserButton={true} />

      {/* Main content */}
      <div className="flex-1 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="card-primary p-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="sentence" className="block text-sm font-medium text-secondary mb-2">
                Enter sentence to record:
              </label>
              <input
                id="sentence"
                type="text"
                value={currentSentence}
                onChange={(e) => setCurrentSentence(e.target.value)}
                placeholder="Type your sentence here..."
                className="w-full px-4 py-3 surface-elevated border border-border-light dark:border-border-dark rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary/50 focus:surface-primary transition-all duration-200 shadow-sm"
                disabled={isRecording || audioBlob !== null}
              />
            </div>

            {isRecording && (
              <div className="text-center py-4">
                <div className="text-2xl font-mono text-status-error">
                  {formatTime(recordingDuration)}
                </div>
                <div className="text-sm text-secondary mt-1">Recording...</div>
              </div>
            )}

            {audioBlob && !isRecording && (
              <div className="bg-status-success/10 border border-status-success/30 rounded-2xl p-4 backdrop-blur-sm">
                <p className="text-status-success text-sm mb-3">Recording complete!</p>
                <audio controls className="w-full mb-3">
                  <source src={URL.createObjectURL(audioBlob)} type="audio/webm" />
                </audio>
              </div>
            )}

            <div className="flex gap-3">
              {!isRecording && !audioBlob && (
                <button
                  onClick={startRecording}
                  disabled={!currentSentence.trim()}
                  className="flex-1 btn-primary disabled:opacity-50"
                >
                  Start Recording
                </button>
              )}

              {isRecording && (
                <button
                  onClick={stopRecording}
                  className="flex-1 btn-error"
                >
                  Stop Recording
                </button>
              )}

              {audioBlob && !isRecording && (
                <>
                  <button
                    onClick={downloadRecording}
                    className="flex-1 btn-secondary"
                  >
                    Download
                  </button>
                  <button
                    onClick={resetForNewSentence}
                    className="flex-1 btn-outline"
                  >
                    New Sentence
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-t border-white/40 dark:border-gray-700/50 py-4 sm:py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-3 sm:gap-6">
              <a href="/" className="min-w-16 px-3 py-1.5 text-xs font-medium text-center text-gray-600 dark:text-gray-400 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 shadow-sm">
                batch
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
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-3 sm:mt-6 text-center text-xs text-gray-500 dark:text-gray-500">
            © 2025 SEN.CO UG. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}