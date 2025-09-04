export class AudioRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private stream: MediaStream | null = null;
  private audioContext: AudioContext | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  private destination: MediaStreamAudioDestinationNode | null = null;

  async startRecording(deviceId?: string): Promise<void> {
    const constraints: MediaStreamConstraints = {
      audio: deviceId ? {
        deviceId: { exact: deviceId },
        sampleRate: 48000,
        sampleSize: 24,
        channelCount: 1,
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false
      } : {
        sampleRate: 48000,
        sampleSize: 24,
        channelCount: 1,
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false
      }
    };

    this.stream = await navigator.mediaDevices.getUserMedia(constraints);
    
    // Create AudioContext for high-quality processing
    this.audioContext = new AudioContext({ sampleRate: 48000 });
    this.source = this.audioContext.createMediaStreamSource(this.stream);
    this.destination = this.audioContext.createMediaStreamDestination();
    this.source.connect(this.destination);
    
    // Use high-quality recording options
    const options = {
      mimeType: 'audio/webm;codecs=opus',
      audioBitsPerSecond: 384000 // Increased for 24-bit audio
    };
    
    // Fallback for browsers that don't support webm
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      this.mediaRecorder = new MediaRecorder(this.destination.stream);
    } else {
      this.mediaRecorder = new MediaRecorder(this.destination.stream, options);
    }
    
    this.audioChunks = [];

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.audioChunks.push(event.data);
      }
    };

    this.mediaRecorder.start();
  }

  async stopRecording(): Promise<Blob> {
    return new Promise((resolve) => {
      if (!this.mediaRecorder) {
        resolve(new Blob());
        return;
      }

      this.mediaRecorder.onstop = async () => {
        // Convert to high-quality WAV
        const audioBlob = await this.convertToWav(this.audioChunks);
        this.cleanup();
        resolve(audioBlob);
      };

      this.mediaRecorder.stop();
    });
  }
  
  private async convertToWav(chunks: Blob[]): Promise<Blob> {
    const audioBlob = new Blob(chunks);
    const arrayBuffer = await audioBlob.arrayBuffer();
    const audioContext = new AudioContext({ sampleRate: 48000 });
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    
    // Trim 0.5 seconds from start and end to remove clicks/buffer
    const trimmedBuffer = this.trimAudioBuffer(audioBuffer, 0.5, 0.5);
    
    // Convert AudioBuffer to high-quality WAV
    const wavBuffer = this.audioBufferToWav(trimmedBuffer);
    return new Blob([wavBuffer], { type: 'audio/wav' });
  }
  
  private trimAudioBuffer(buffer: AudioBuffer, trimStart: number, trimEnd: number): AudioBuffer {
    const sampleRate = buffer.sampleRate;
    const startOffset = Math.floor(trimStart * sampleRate);
    const endOffset = Math.floor(trimEnd * sampleRate);
    
    // Calculate new length
    const newLength = buffer.length - startOffset - endOffset;
    
    // Ensure we don't have negative or zero length
    if (newLength <= 0) {
      return buffer; // Return original if trim would remove everything
    }
    
    // Create new audio buffer with trimmed length
    const trimmedBuffer = new AudioBuffer({
      numberOfChannels: buffer.numberOfChannels,
      length: newLength,
      sampleRate: buffer.sampleRate
    });
    
    // Copy trimmed data for each channel
    for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
      const originalData = buffer.getChannelData(channel);
      const trimmedData = trimmedBuffer.getChannelData(channel);
      
      // Copy data, skipping the trimmed portions
      for (let i = 0; i < newLength; i++) {
        trimmedData[i] = originalData[i + startOffset];
      }
    }
    
    return trimmedBuffer;
  }
  
  private audioBufferToWav(buffer: AudioBuffer): ArrayBuffer {
    const bytesPerSample = 3; // 24-bit audio
    const length = buffer.length * buffer.numberOfChannels * bytesPerSample + 44;
    const arrayBuffer = new ArrayBuffer(length);
    const view = new DataView(arrayBuffer);
    const channels = [];
    let offset = 0;
    let pos = 0;
    
    // Write WAV header
    const setUint16 = (data: number) => {
      view.setUint16(pos, data, true);
      pos += 2;
    };
    
    const setUint32 = (data: number) => {
      view.setUint32(pos, data, true);
      pos += 4;
    };
    
    // RIFF identifier
    const writeString = (str: string) => {
      for (let i = 0; i < str.length; i++) {
        view.setUint8(pos + i, str.charCodeAt(i));
      }
      pos += str.length;
    };
    
    writeString('RIFF');
    setUint32(length - 8);
    writeString('WAVE');
    writeString('fmt ');
    setUint32(16);
    setUint16(1); // PCM format
    setUint16(buffer.numberOfChannels);
    setUint32(buffer.sampleRate);
    setUint32(buffer.sampleRate * bytesPerSample * buffer.numberOfChannels);
    setUint16(buffer.numberOfChannels * bytesPerSample);
    setUint16(24); // 24 bits per sample
    writeString('data');
    setUint32(length - pos - 4);
    
    // Get audio data
    for (let i = 0; i < buffer.numberOfChannels; i++) {
      channels.push(buffer.getChannelData(i));
    }
    
    // Interleave channels and convert to 24-bit PCM
    while (offset < buffer.length) {
      for (let i = 0; i < buffer.numberOfChannels; i++) {
        let sample = Math.max(-1, Math.min(1, channels[i][offset]));
        // Convert float to 24-bit integer
        const value = Math.floor(sample * 0x7FFFFF);
        // Write 24-bit value (3 bytes) in little-endian format
        view.setUint8(pos, value & 0xFF);
        view.setUint8(pos + 1, (value >> 8) & 0xFF);
        view.setUint8(pos + 2, (value >> 16) & 0xFF);
        pos += 3;
      }
      offset++;
    }
    
    return arrayBuffer;
  }

  private cleanup() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
    this.source = null;
    this.destination = null;
    this.mediaRecorder = null;
    this.audioChunks = [];
  }

  static async getDevices(): Promise<MediaDeviceInfo[]> {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter(device => device.kind === 'audioinput');
  }
}