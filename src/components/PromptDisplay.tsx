import React from 'react';
import type { Prompt } from '../utils/parsePrompts';

interface PromptDisplayProps {
  prompt: Prompt;
  currentIndex: number;
  totalPrompts: number;
}

export const PromptDisplay: React.FC<PromptDisplayProps> = ({ 
  prompt, 
  currentIndex, 
  totalPrompts 
}) => {
  return (
    <div className="text-center mb-8">
      <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">
        Prompt {currentIndex + 1} of {totalPrompts}
      </div>
      <div className="mb-4">
        <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full font-medium">
          {prompt.emotion}
        </span>
      </div>
      <div className="text-2xl font-medium text-gray-900 dark:text-gray-100 px-4">
        "{prompt.sentence}"
      </div>
    </div>
  );
};