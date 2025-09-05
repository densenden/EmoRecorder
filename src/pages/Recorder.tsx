import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { MicSelector } from '../components/MicSelector';
import { PromptDisplay } from '../components/PromptDisplay';
import { RecorderControls } from '../components/RecorderControls';
import type { Prompt } from '../utils/parsePrompts';
import { slugify } from '../utils/slugify';
import { supabase } from '../lib/supabase';
import { CloudStorage } from '../utils/cloudStorage';

interface RecorderProps {
  prompts: Prompt[];
  onComplete: (recordings: Array<{path: string; emotion: string; sentence: string}>) => void;
}

export const Recorder: React.FC<RecorderProps> = ({ prompts, onComplete }) => {
  const { user } = useUser();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDevice, setSelectedDevice] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{path: string; emotion: string; sentence: string}>>([]);

  const currentPrompt = prompts[currentIndex];

  const handleSave = async (audioBlob: Blob) => {
    if (!user) return;

    setIsUploading(true);
    try {
      // Apply slugify to both emotion (folder name) and sentence (filename)
      const emotionSlug = slugify(currentPrompt.emotion.toLowerCase());
      const sentenceSlug = slugify(currentPrompt.sentence.slice(0, 50));
      const filename = `${emotionSlug}_${sentenceSlug}.wav`;
      const path = `${user.id}/${filename}`;

      // Log upload attempt
      console.log('Attempting to upload:', {
        path,
        blobSize: audioBlob.size,
        userId: user.id
      });

      const { data, error } = await supabase.storage
        .from('emo-recordings')
        .upload(path, audioBlob, {
          contentType: 'audio/wav',
          upsert: true
        });

      if (error) {
        console.error('Upload error:', error);
        
        // Provide helpful error messages
        let errorMessage = 'Failed to upload audio. ';
        
        if (error.message?.includes('row-level security')) {
          errorMessage += 'RLS policy error. Please disable RLS for the bucket or add proper policies. See SUPABASE_RLS_FIX.md for instructions.';
        } else if (error.message?.includes('bucket not found')) {
          errorMessage += 'Storage bucket "emo-recordings" not found. Please create it in Supabase.';
        } else if (error.message?.includes('signature')) {
          errorMessage += 'Authentication error. Please check your Supabase keys.';
        } else {
          errorMessage += error.message;
        }
        
        alert(errorMessage);
        console.error('Full error details:', {
          message: error.message,
          error
        });
      } else {
        console.log('Upload successful!', data);
        
        // Also save to CloudStorage for the downloads page
        try {
          await CloudStorage.uploadRecording(audioBlob, {
            userId: user.id,
            sentence: currentPrompt.sentence,
            emotion: currentPrompt.emotion,
            type: 'batch'
          });
        } catch (error) {
          console.error('CloudStorage save failed:', error);
        }
        
        // Track uploaded file
        setUploadedFiles(prev => [...prev, {
          path,
          emotion: currentPrompt.emotion,
          sentence: currentPrompt.sentence
        }]);
        moveToNext();
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save recording. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const moveToNext = () => {
    if (currentIndex < prompts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Pass the updated files list including the last uploaded file
      const finalFiles = [...uploadedFiles];
      if (currentPrompt) {
        const emotionSlug = slugify(currentPrompt.emotion.toLowerCase());
        const sentenceSlug = slugify(currentPrompt.sentence.slice(0, 50));
        const filename = `${emotionSlug}_${sentenceSlug}.wav`;
        const path = `${user?.id}/${filename}`;
        
        // Check if this was the last file uploaded
        const lastFile = finalFiles[finalFiles.length - 1];
        if (!lastFile || lastFile.path !== path) {
          finalFiles.push({
            path,
            emotion: currentPrompt.emotion,
            sentence: currentPrompt.sentence
          });
        }
      }
      onComplete(finalFiles);
    }
  };

  if (!currentPrompt) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          No prompts available
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 pt-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Batch Recording
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
          {currentIndex + 1} of {prompts.length} prompts
        </p>
        <div className="w-full bg-gray-200/60 dark:bg-gray-700/60 rounded-full h-3 backdrop-blur-sm">
          <div 
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300 shadow-sm"
            style={{ width: `${((currentIndex + 1) / prompts.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-8 shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-gray-700/30 space-y-6">
        <MicSelector onDeviceSelect={setSelectedDevice} />

        <PromptDisplay 
          prompt={currentPrompt} 
          currentIndex={currentIndex}
          totalPrompts={prompts.length}
        />

        <RecorderControls 
          onSave={handleSave}
          onSkip={moveToNext}
          deviceId={selectedDevice}
        />

        {isUploading && (
          <div className="text-center py-4">
            <div className="inline-flex items-center gap-3 bg-blue-50/80 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-3 rounded-2xl backdrop-blur-sm">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-current border-t-transparent"></div>
              <span className="font-medium">Uploading recording...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};