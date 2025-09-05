'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Mic, MicOff, Download, RotateCcw } from 'lucide-react'

export default function OrgaPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [currentSentence, setCurrentSentence] = useState('')
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [recordingDuration, setRecordingDuration] = useState(0)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

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
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 48000,
          channelCount: 1,
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        } 
      })

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      })

      audioChunksRef.current = []
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        setAudioBlob(blob)
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorderRef.current = mediaRecorder
      mediaRecorder.start()
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

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }

  const downloadRecording = () => {
    if (!audioBlob) return

    const url = URL.createObjectURL(audioBlob)
    const a = document.createElement('a')
    a.href = url
    const fileName = `${currentSentence.slice(0, 50).replace(/[^a-z0-9]/gi, '_')}.webm`
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Sentence Recorder
        </h1>
        
        <Card className="p-6 shadow-xl bg-white/95 backdrop-blur">
          <div className="space-y-6">
            <div>
              <label htmlFor="sentence" className="block text-sm font-medium text-gray-700 mb-2">
                Enter sentence to record:
              </label>
              <Input
                id="sentence"
                type="text"
                value={currentSentence}
                onChange={(e) => setCurrentSentence(e.target.value)}
                placeholder="Type your sentence here..."
                className="w-full"
                disabled={isRecording || audioBlob !== null}
              />
            </div>

            {isRecording && (
              <div className="text-center py-4">
                <div className="text-2xl font-mono text-red-600">
                  {formatTime(recordingDuration)}
                </div>
                <div className="text-sm text-gray-600 mt-1">Recording...</div>
              </div>
            )}

            {audioBlob && !isRecording && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-sm mb-3">Recording complete!</p>
                <audio controls className="w-full mb-3">
                  <source src={URL.createObjectURL(audioBlob)} type="audio/webm" />
                </audio>
              </div>
            )}

            <div className="flex gap-3">
              {!isRecording && !audioBlob && (
                <Button
                  onClick={startRecording}
                  disabled={!currentSentence.trim()}
                  className="flex-1"
                  size="lg"
                >
                  <Mic className="mr-2 h-5 w-5" />
                  Start Recording
                </Button>
              )}

              {isRecording && (
                <Button
                  onClick={stopRecording}
                  variant="destructive"
                  className="flex-1"
                  size="lg"
                >
                  <MicOff className="mr-2 h-5 w-5" />
                  Stop Recording
                </Button>
              )}

              {audioBlob && !isRecording && (
                <>
                  <Button
                    onClick={downloadRecording}
                    className="flex-1"
                    size="lg"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download
                  </Button>
                  <Button
                    onClick={resetForNewSentence}
                    variant="outline"
                    className="flex-1"
                    size="lg"
                  >
                    <RotateCcw className="mr-2 h-5 w-5" />
                    New Sentence
                  </Button>
                </>
              )}
            </div>
          </div>
        </Card>

        <div className="mt-8 text-center">
          <a 
            href="/"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            ← Back to Emotion Recorder
          </a>
        </div>
      </div>
    </div>
  )
}