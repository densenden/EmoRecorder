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

  const exampleText = `Traurig:
Hast du irgendwelche Ratschläge in Betracht gezogen?

Lachend:
Was ist der gefährlichste Kaffee der Welt? Der *Expresso!*

Flüsternd:
Das Ziel Großbritanniens bei der Gründung von New South Wales war es, eine Strafkolonie zu errichten.

Verwirrt:
Der erste wird in 16 Stunden und 6 Minuten aktiviert, und der zweite 6 Stunden und 7 Minuten später?

Gelangweilt:
Das ist, als würde man Sandkörner einzeln zählen.`;

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