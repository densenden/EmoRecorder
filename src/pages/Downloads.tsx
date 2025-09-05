import { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { CloudStorage } from '../utils/cloudStorage'
import { TopBar } from '../components/TopBar'
import { AbstractBackground } from '../components/AbstractBackground'

interface Recording {
  userId: string;
  sentence: string;
  emotion?: string;
  timestamp: number;
  filename: string;
  type: 'batch' | 'single';
  audioData: string;
}

export function Downloads() {
  const { user } = useUser()
  const [recordings, setRecordings] = useState<Recording[]>([])
  const [selectedRecordings, setSelectedRecordings] = useState<Set<string>>(new Set())
  const [stats, setStats] = useState({
    totalRecordings: 0,
    batchRecordings: 0,
    singleRecordings: 0,
    totalDuration: 0
  })

  useEffect(() => {
    if (user) {
      loadRecordings()
    }
  }, [user])

  const loadRecordings = () => {
    if (!user) return
    
    const userRecordings = CloudStorage.getUserRecordings(user.id)
    const userStats = CloudStorage.getRecordingStats(user.id)
    
    setRecordings(userRecordings.sort((a, b) => b.timestamp - a.timestamp))
    setStats(userStats)
  }

  const downloadRecording = async (filename: string) => {
    if (!user) return
    
    const blob = await CloudStorage.downloadRecording(user.id, filename)
    if (!blob) return

    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const deleteRecording = (filename: string) => {
    if (!user) return
    
    if (confirm('Are you sure you want to delete this recording?')) {
      CloudStorage.deleteRecording(user.id, filename)
      loadRecordings()
      setSelectedRecordings(prev => {
        const updated = new Set(prev)
        updated.delete(filename)
        return updated
      })
    }
  }

  const downloadSelected = async () => {
    if (!user || selectedRecordings.size === 0) return

    // Create a zip-like download by downloading each file individually
    for (const filename of selectedRecordings) {
      await downloadRecording(filename)
      // Add small delay to avoid overwhelming the browser
      await new Promise(resolve => setTimeout(resolve, 200))
    }
  }

  const deleteSelected = () => {
    if (!user || selectedRecordings.size === 0) return

    if (confirm(`Are you sure you want to delete ${selectedRecordings.size} recordings?`)) {
      selectedRecordings.forEach(filename => {
        CloudStorage.deleteRecording(user.id, filename)
      })
      loadRecordings()
      setSelectedRecordings(new Set())
    }
  }

  const toggleSelection = (filename: string) => {
    setSelectedRecordings(prev => {
      const updated = new Set(prev)
      if (updated.has(filename)) {
        updated.delete(filename)
      } else {
        updated.add(filename)
      }
      return updated
    })
  }

  const selectAll = () => {
    setSelectedRecordings(new Set(recordings.map(r => r.filename)))
  }

  const clearSelection = () => {
    setSelectedRecordings(new Set())
  }

  const formatDate = (timestamp: number) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(timestamp))
  }

  const truncateSentence = (sentence: string, maxLength: number = 60) => {
    return sentence.length > maxLength 
      ? `${sentence.substring(0, maxLength)}...` 
      : sentence
  }

  if (!user) {
    return <div>Please log in to view your recordings.</div>
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      <AbstractBackground />
      <TopBar title="SenRecorder" subtitle="Downloads" showUserButton={true} />

      {/* Main content */}
      <div className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="card-primary p-6">
              <h3 className="text-sm font-medium text-muted">Total Recordings</h3>
              <p className="text-3xl font-bold text-primary">{stats.totalRecordings}</p>
            </div>
            <div className="card-primary p-6">
              <h3 className="text-sm font-medium text-muted">Batch Recordings</h3>
              <p className="text-3xl font-bold text-brand-coral">{stats.batchRecordings}</p>
            </div>
            <div className="card-primary p-6">
              <h3 className="text-sm font-medium text-muted">Single Recordings</h3>
              <p className="text-3xl font-bold text-accent-secondary">{stats.singleRecordings}</p>
            </div>
          </div>

          {/* Bulk actions */}
          {recordings.length > 0 && (
            <div className="card-primary p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="flex gap-3">
                  <button
                    onClick={selectAll}
                    className="btn-outline"
                  >
                    Select All
                  </button>
                  <button
                    onClick={clearSelection}
                    className="btn-outline"
                  >
                    Clear
                  </button>
                </div>
                
                {selectedRecordings.size > 0 && (
                  <div className="flex gap-3">
                    <span className="text-sm text-secondary">
                      {selectedRecordings.size} selected
                    </span>
                    <button
                      onClick={downloadSelected}
                      className="btn-primary"
                    >
                      Download Selected
                    </button>
                    <button
                      onClick={deleteSelected}
                      className="btn-error"
                    >
                      Delete Selected
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Recordings list */}
          {recordings.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-muted mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-primary mb-2">No recordings yet</h3>
              <p className="text-muted mb-6">Start recording to see your files here</p>
              <div className="flex gap-4 justify-center">
                <a href="/" className="btn-primary">
                  Batch Recording
                </a>
                <a href="/orga" className="btn-secondary">
                  Single Recording
                </a>
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              {recordings.map((recording) => (
                <div
                  key={recording.filename}
                  className="card-primary p-6 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={selectedRecordings.has(recording.filename)}
                      onChange={() => toggleSelection(recording.filename)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          recording.type === 'batch' 
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        }`}>
                          {recording.type}
                        </span>
                        {recording.emotion && (
                          <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                            {recording.emotion}
                          </span>
                        )}
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(recording.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                        {truncateSentence(recording.sentence)}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {recording.filename}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => downloadRecording(recording.filename)}
                        className="px-3 py-1.5 text-sm font-medium text-white bg-blue-500/80 hover:bg-blue-600/80 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md backdrop-blur-sm"
                      >
                        Download
                      </button>
                      <button
                        onClick={() => deleteRecording(recording.filename)}
                        className="px-3 py-1.5 text-sm font-medium text-white bg-red-500/80 hover:bg-red-600/80 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md backdrop-blur-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-t border-white/40 dark:border-gray-700/50 py-4 sm:py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-3 sm:gap-6">
              <a href="/orga" className="min-w-16 px-3 py-1.5 text-xs font-medium text-center text-gray-600 dark:text-gray-400 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 shadow-sm">
                1by1
              </a>
              <div className="flex gap-3 sm:gap-6 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
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
            © 2025 Sen.Co UG. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}