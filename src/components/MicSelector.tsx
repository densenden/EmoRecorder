import React, { useEffect, useState } from 'react';
import { AudioRecorder } from '../utils/audioRecorder';

interface MicSelectorProps {
  onDeviceSelect: (deviceId: string) => void;
}

export const MicSelector: React.FC<MicSelectorProps> = ({ onDeviceSelect }) => {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string>('');

  useEffect(() => {
    loadDevices();
  }, []);

  const loadDevices = async () => {
    try {
      const audioDevices = await AudioRecorder.getDevices();
      setDevices(audioDevices);
      if (audioDevices.length > 0 && !selectedDevice) {
        const defaultDevice = audioDevices[0].deviceId;
        setSelectedDevice(defaultDevice);
        onDeviceSelect(defaultDevice);
      }
    } catch (error) {
      console.error('Failed to load audio devices:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const deviceId = e.target.value;
    setSelectedDevice(deviceId);
    onDeviceSelect(deviceId);
  };

  if (devices.length <= 1) return null;

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
        Select Microphone
      </label>
      <select
        value={selectedDevice}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {devices.map((device) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Microphone ${device.deviceId.slice(0, 5)}`}
          </option>
        ))}
      </select>
    </div>
  );
};