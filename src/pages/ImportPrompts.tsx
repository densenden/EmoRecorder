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
    <div className="max-w-2xl mx-auto px-4">
      <div className="card-primary p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-secondary">
              Enter your prompts in the format: Emotion: followed by sentences
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-64 px-4 py-3 surface-elevated border border-border-light dark:border-border-dark rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary/50 focus:surface-primary transition-all duration-200 shadow-sm font-mono text-sm text-primary"
              placeholder={exampleText}
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleImport}
              disabled={!text.trim()}
              className="flex-1 btn-primary disabled:opacity-50"
            >
              Import Prompts
            </button>
            <button
              onClick={() => setText(exampleText)}
              className="flex-1 btn-outline"
            >
              Use Example
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};