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
    <div className="space-y-4">
      {audioUrl && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <audio ref={audioRef} src={audioUrl} controls className="w-full" />
        </div>
      )}

      <div className="flex justify-center gap-3">
        {!isRecording && !audioBlob && (
          <button
            onClick={startRecording}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <span className="text-xl">●</span>
            Start Recording
          </button>
        )}

        {isRecording && (
          <button
            onClick={stopRecording}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <span className="text-xl">■</span>
            Stop
          </button>
        )}

        {audioBlob && !isRecording && (
          <>
            <button
              onClick={handleRetry}
              className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
            >
              Retry
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
            >
              Save & Next
            </button>
          </>
        )}

        {!isRecording && (
          <button
            onClick={onSkip}
            className="px-6 py-3 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-medium transition-colors"
          >
            Skip
          </button>
        )}
      </div>
    </div>
  );
};