import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { supabase } from '../lib/supabase';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface CompletionPageProps {
  recordedFiles: Array<{
    path: string;
    emotion: string;
    sentence: string;
  }>;
  onStartNew: () => void;
}

export const CompletionPage: React.FC<CompletionPageProps> = ({ 
  recordedFiles, 
  onStartNew 
}) => {
  const { user } = useUser();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const downloadAllRecordings = async () => {
    if (!user) return;
    
    setIsDownloading(true);
    setDownloadProgress(0);
    
    try {
      const zip = new JSZip();
      const totalFiles = recordedFiles.length;
      
      for (let i = 0; i < recordedFiles.length; i++) {
        const file = recordedFiles[i];
        setDownloadProgress(Math.round(((i + 1) / totalFiles) * 100));
        
        // Download file from Supabase
        const { data, error } = await supabase.storage
          .from('emo-recordings')
          .download(file.path);
        
        if (data && !error) {
          // Add to zip with organized folder structure
          const fileName = file.path.split('/').pop() || 'recording.wav';
          const folderPath = `${file.emotion}/${fileName}`;
          zip.file(folderPath, data);
        } else {
          console.error(`Failed to download ${file.path}:`, error);
        }
      }
      
      // Generate and download zip
      const content = await zip.generateAsync({ type: 'blob' });
      const timestamp = new Date().toISOString().split('T')[0];
      saveAs(content, `emo-recordings-${timestamp}.zip`);
      
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download recordings. Please try again.');
    } finally {
      setIsDownloading(false);
      setDownloadProgress(0);
    }
  };

  const downloadMetadata = () => {
    const metadata = recordedFiles.map(file => ({
      emotion: file.emotion,
      sentence: file.sentence,
      filename: file.path.split('/').pop(),
      path: file.path
    }));
    
    const csv = [
      'Emotion,Sentence,Filename,Path',
      ...metadata.map(m => 
        `"${m.emotion}","${m.sentence}","${m.filename}","${m.path}"`
      )
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const timestamp = new Date().toISOString().split('T')[0];
    saveAs(blob, `recording-metadata-${timestamp}.csv`);
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="card-primary p-8">
        <div className="text-center mb-8">
          <div className="mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-status-success/10 rounded-full mb-4">
              <svg className="w-8 h-8 text-status-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          <h2 className="text-3xl font-thin mb-2 text-primary">
            Recording Complete!
          </h2>
          <p className="text-lg text-secondary mb-2">
            You successfully recorded {recordedFiles.length} audio files
          </p>
        </div>

        <div className="card-secondary p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4 text-primary">
            Your Recordings
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {recordedFiles.map((file, index) => (
              <div 
                key={index}
                className="flex items-center justify-between py-2 px-3 surface-elevated rounded"
              >
                <div className="flex-1">
                  <span className="font-medium text-primary">
                    {file.emotion}
                  </span>
                  <span className="text-muted ml-2">
                    {file.sentence.slice(0, 50)}...
                  </span>
                </div>
                <svg className="w-5 h-5 text-status-success" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={downloadAllRecordings}
            disabled={isDownloading}
            className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
          >
          {isDownloading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Downloading... {downloadProgress}%
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
              Download All Recordings (ZIP)
            </>
          )}
        </button>

          <button
            onClick={downloadMetadata}
            className="w-full btn-outline flex items-center justify-center gap-2"
          >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download Metadata (CSV)
        </button>

          <button
            onClick={onStartNew}
            className="w-full btn-secondary"
          >
            Record New Set
          </button>
        </div>
      </div>

      {isDownloading && (
        <div className="mt-4">
          <div className="w-full bg-border-light dark:bg-border-dark rounded-full h-2">
            <div 
              className="bg-accent-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${downloadProgress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};