'use client';

// Simple audio recorder that captures short clips and posts to /api/transcribe.
import React, { useEffect, useRef, useState } from 'react';

interface Props {
  prompt: string;
  onTranscribed: (transcript: string, durationSec: number) => void;
  disabled?: boolean;
}

export default function Recorder({ prompt, onTranscribed, disabled }: Props) {
  const [recording, setRecording] = useState(false);
  const [status, setStatus] = useState<string>('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const startedAtRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  async function start() {
    try {
      setStatus('Requesting microphone...');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      chunksRef.current = [];
      mr.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };
      mr.onstart = () => {
        startedAtRef.current = Date.now();
        setStatus('Recording...');
      };
      mr.onstop = async () => {
        setStatus('Transcribing...');
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const form = new FormData();
        form.append('audio', new File([blob], 'clip.webm', { type: 'audio/webm' }));
        const resp = await fetch('/api/transcribe', { method: 'POST', body: form });
        const json = await resp.json();
        const text = json?.text || '';
        const durSec = startedAtRef.current ? (Date.now() - startedAtRef.current) / 1000 : 0;
        onTranscribed(text, durSec);
        setStatus('');
      };
      mediaRecorderRef.current = mr;
      mr.start();
      setRecording(true);
    } catch (e: any) {
      setStatus(e?.message || 'Mic error');
    }
  }

  function stop() {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  }

  return (
    <div className="w-full">
      <div className="text-sm text-gray-300 mb-2">Prompt</div>
      <div className="p-3 rounded-xl card mb-3">{prompt}</div>
      <div className="flex items-center gap-2">
        {!recording ? (
          <button disabled={disabled} onClick={start} className="btn disabled:opacity-50">
            🎙️ Start Recording
          </button>
        ) : (
          <button onClick={stop} className="btn-secondary">⏹ Stop</button>
        )}
        {status && <span className="text-sm text-gray-300">{status}</span>}
      </div>
    </div>
  );
}
