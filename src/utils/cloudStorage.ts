import { useUser } from '@clerk/clerk-react';

interface RecordingMetadata {
  userId: string;
  sentence: string;
  emotion?: string;
  timestamp: number;
  filename: string;
  type: 'batch' | 'single';
}

export class CloudStorage {
  private static readonly STORAGE_KEY = 'emorecorder_recordings';

  static async uploadRecording(
    audioBlob: Blob,
    metadata: Omit<RecordingMetadata, 'timestamp' | 'filename'>
  ): Promise<string> {
    // Generate filename based on metadata
    const timestamp = Date.now();
    const sanitizedSentence = metadata.sentence
      .slice(0, 50)
      .replace(/[^a-z0-9]/gi, '_')
      .toLowerCase();
    
    const filename = `${metadata.userId}_${timestamp}_${sanitizedSentence}_${metadata.emotion || 'single'}.wav`;

    // For now, store in localStorage with metadata
    // In production, this would upload to AWS S3, Google Cloud Storage, etc.
    const recordingData = {
      ...metadata,
      timestamp,
      filename,
      audioData: await this.blobToBase64(audioBlob),
    };

    // Get existing recordings
    const existingRecordings = this.getUserRecordings(metadata.userId);
    existingRecordings.push(recordingData);

    // Store back to localStorage
    localStorage.setItem(
      `${this.STORAGE_KEY}_${metadata.userId}`,
      JSON.stringify(existingRecordings)
    );

    // Also create a downloadable URL for immediate use
    const url = URL.createObjectURL(audioBlob);
    return url;
  }

  static getUserRecordings(userId: string): Array<RecordingMetadata & { audioData: string }> {
    const stored = localStorage.getItem(`${this.STORAGE_KEY}_${userId}`);
    if (!stored) return [];
    
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }

  static async downloadRecording(userId: string, filename: string): Promise<Blob | null> {
    const recordings = this.getUserRecordings(userId);
    const recording = recordings.find(r => r.filename === filename);
    
    if (!recording) return null;

    // Convert base64 back to blob
    return this.base64ToBlob(recording.audioData);
  }

  static deleteRecording(userId: string, filename: string): boolean {
    const recordings = this.getUserRecordings(userId);
    const filteredRecordings = recordings.filter(r => r.filename !== filename);
    
    if (filteredRecordings.length === recordings.length) {
      return false; // Recording not found
    }

    localStorage.setItem(
      `${this.STORAGE_KEY}_${userId}`,
      JSON.stringify(filteredRecordings)
    );
    
    return true;
  }

  static getRecordingStats(userId: string): {
    totalRecordings: number;
    batchRecordings: number;
    singleRecordings: number;
    totalDuration: number;
  } {
    const recordings = this.getUserRecordings(userId);
    
    return {
      totalRecordings: recordings.length,
      batchRecordings: recordings.filter(r => r.type === 'batch').length,
      singleRecordings: recordings.filter(r => r.type === 'single').length,
      totalDuration: 0, // Would calculate from audio files in production
    };
  }

  private static async blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]); // Remove data:audio/wav;base64, prefix
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  private static base64ToBlob(base64: string): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: 'audio/wav' });
  }
}