export type Prompt = {
  emotion: string;
  sentence: string;
};

export function parsePrompts(text: string): Prompt[] {
  const prompts: Prompt[] = [];
  
  // Remove file upload artifacts in various languages
  const fileUploadPatterns = [
    // German
    /Datei auswählen[\s\n]*Keine Datei ausgewählt/gi,
    // English
    /Choose file[\s\n]*No file chosen/gi,
    /Select file[\s\n]*No file selected/gi,
    // French
    /Choisir un fichier[\s\n]*Aucun fichier sélectionné/gi,
    /Sélectionner un fichier[\s\n]*Aucun fichier sélectionné/gi,
    // Spanish
    /Seleccionar archivo[\s\n]*Ningún archivo seleccionado/gi,
    /Elegir archivo[\s\n]*Ningún archivo elegido/gi,
    // Italian
    /Scegli file[\s\n]*Nessun file selezionato/gi,
    // Generic patterns
    /\n\s*Datei auswählen\s*\n/gi,
    /\n\s*Keine Datei ausgewählt\s*\n/gi,
    /\n\s*Choose file\s*\n/gi,
    /\n\s*No file (chosen|selected)\s*\n/gi,
  ];
  
  // Clean the text
  let cleanedText = text;
  fileUploadPatterns.forEach(pattern => {
    cleanedText = cleanedText.replace(pattern, '\n');
  });
  
  const lines = cleanedText.trim().split('\n');
  let currentEmotion = '';
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Skip empty lines
    if (!trimmedLine) continue;
    
    // Skip lines that are just file upload artifacts
    if (
      trimmedLine === 'Datei auswählen' ||
      trimmedLine === 'Keine Datei ausgewählt' ||
      trimmedLine === 'Choose file' ||
      trimmedLine === 'No file chosen' ||
      trimmedLine === 'No file selected' ||
      trimmedLine === 'Select file'
    ) {
      continue;
    }
    
    // Check if this is an emotion label (ends with :)
    if (trimmedLine.endsWith(':')) {
      currentEmotion = trimmedLine.slice(0, -1);
    } else if (currentEmotion) {
      // This is a sentence for the current emotion
      prompts.push({
        emotion: currentEmotion,
        sentence: trimmedLine
      });
    }
  }
  
  return prompts;
}