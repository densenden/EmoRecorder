import React, { useState } from 'react';
import { parsePrompts } from '../utils/parsePrompts';

interface ImportPromptsProps {
  onImport: (prompts: ReturnType<typeof parsePrompts>) => void;
}

export const ImportPrompts: React.FC<ImportPromptsProps> = ({ onImport }) => {
  const [text, setText] = useState('');

  const handleImport = () => {
    const prompts = parsePrompts(text);
    if (prompts.length > 0) {
      onImport(prompts);
    }
  };

  const exampleText = `Sad:
I tried everything, but it still hurts.
Sometimes I wonder if things will ever get better.

Excited:
Guess what? We're going to space!
This is the best day of my life!

Angry:
I can't believe you would say that.
This is absolutely unacceptable.`;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Import Prompts
      </h1>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Enter your prompts in the format: Emotion: followed by sentences
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-64 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={exampleText}
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleImport}
          disabled={!text.trim()}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
        >
          Import Prompts
        </button>
        <button
          onClick={() => setText(exampleText)}
          className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
        >
          Use Example
        </button>
      </div>
    </div>
  );
};