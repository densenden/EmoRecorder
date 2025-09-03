import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { MicSelector } from '../components/MicSelector';
import { PromptDisplay } from '../components/PromptDisplay';
import { RecorderControls } from '../components/RecorderControls';
import type { Prompt } from '../utils/parsePrompts';
import { slugify } from '../utils/slugify';
import { supabase } from '../lib/supabase';

interface RecorderProps {
  prompts: Prompt[];
  onComplete: () => void;
}

export const Recorder: React.FC<RecorderProps> = ({ prompts, onComplete }) => {
  const { user } = useUser();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDevice, setSelectedDevice] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  const currentPrompt = prompts[currentIndex];

  const handleSave = async (audioBlob: Blob) => {
    if (!user) return;

    setIsUploading(true);
    try {
      const emotion = currentPrompt.emotion.toLowerCase();
      const sentenceSlug = slugify(currentPrompt.sentence.slice(0, 50));
      const filename = `${emotion}_${sentenceSlug}.wav`;
      const path = `${user.id}/${emotion}/${filename}`;

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
          statusCode: error.statusCode,
          error
        });
      } else {
        console.log('Upload successful!', data);
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
      onComplete();
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
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / prompts.length) * 100}%` }}
          />
        </div>
      </div>

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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-900 dark:text-gray-100">Uploading...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};