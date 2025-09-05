import React, { useState, useRef } from 'react';
import { AudioRecorder } from '../utils/audioRecorder';

interface RecorderControlsProps {
  onSave: (audioBlob: Blob) => void;
  onSkip: () => void;
  deviceId: string;
}

export const RecorderControls: React.FC<RecorderControlsProps> = ({ 
  onSave, 
  onSkip, 
  deviceId 
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const recorderRef = useRef<AudioRecorder>(new AudioRecorder());

  const startRecording = async () => {
    try {
      setAudioBlob(null);
      setAudioUrl(null);
      await recorderRef.current.startRecording(deviceId);
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const stopRecording = async () => {
    try {
      const blob = await recorderRef.current.stopRecording();
      setAudioBlob(blob);
      setAudioUrl(URL.createObjectURL(blob));
      setIsRecording(false);
    } catch (error) {
      console.error('Failed to stop recording:', error);
    }
  };

  const handleRetry = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioBlob(null);
    setAudioUrl(null);
  };

  const handleSave = () => {
    if (audioBlob) {
      onSave(audioBlob);
      handleRetry();
    }
  };

  return (
    <div className="space-y-6">
      {audioUrl && (
        <div className="bg-green-50/80 dark:bg-green-900/20 border border-green-200/60 dark:border-green-700/40 rounded-2xl p-4 backdrop-blur-sm">
          <audio ref={audioRef} src={audioUrl} controls className="w-full" />
        </div>
      )}

      <div className="flex justify-center gap-3">
        {!isRecording && !audioBlob && (
          <button
            onClick={startRecording}
            className="px-4 py-2 bg-red-500/80 hover:bg-red-600/80 text-white rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md backdrop-blur-sm flex items-center gap-2"
          >
            <span className="text-xl">●</span>
            Start Recording
          </button>
        )}

        {isRecording && (
          <button
            onClick={stopRecording}
            className="px-4 py-2 bg-gray-700/80 hover:bg-gray-800/80 text-white rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md backdrop-blur-sm flex items-center gap-2"
          >
            <span className="text-xl">■</span>
            Stop
          </button>
        )}

        {audioBlob && !isRecording && (
          <>
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-gray-500/80 hover:bg-gray-600/80 text-white rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md backdrop-blur-sm"
            >
              Retry
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500/80 hover:bg-green-600/80 text-white rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md backdrop-blur-sm"
            >
              Save & Next
            </button>
          </>
        )}

        {!isRecording && (
          <button
            onClick={onSkip}
            className="px-4 py-2 bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm border border-gray-200/60 dark:border-gray-600/60 hover:bg-white/80 dark:hover:bg-gray-600/80 text-gray-700 dark:text-gray-200 rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Skip
          </button>
        )}
      </div>
    </div>
  );
};