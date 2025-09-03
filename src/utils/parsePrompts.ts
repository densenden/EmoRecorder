export type Prompt = {
  emotion: string;
  sentence: string;
};

export function parsePrompts(text: string): Prompt[] {
  const prompts: Prompt[] = [];
  const lines = text.trim().split('\n');
  let currentEmotion = '';
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    if (!trimmedLine) continue;
    
    if (trimmedLine.endsWith(':')) {
      currentEmotion = trimmedLine.slice(0, -1);
    } else if (currentEmotion) {
      prompts.push({
        emotion: currentEmotion,
        sentence: trimmedLine
      });
    }
  }
  
  return prompts;
}