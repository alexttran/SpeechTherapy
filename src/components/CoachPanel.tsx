'use client';

import React, { useState } from 'react';
import { estimateWPM } from '../lib/utils';

interface Props {
  accent: string | null;
  severity: string | null;
  ageGroup: string | null;
  targets: string[];
  prompt: string;
  transcript: string;
  durationSec: number;
  onFeedback: (feedback: string) => void;
}

export default function CoachPanel({
  accent, severity, ageGroup, targets, prompt, transcript, durationSec, onFeedback
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wpm = estimateWPM(transcript, durationSec);

  async function getFeedback() {
    try {
      setError(null);
      setLoading(true);
      const resp = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript, prompt, accent, severity, ageGroup, targets
        })
      });
      const json = await resp.json();
      if (json?.error) {
        setError('Coach API error.');
      } else {
        onFeedback(json?.content || '');
      }
    } catch (e: any) {
      setError(e?.message || 'Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 rounded-2xl card">
      <div className="text-sm text-gray-300 mb-1">Transcript</div>
      <div className="p-3 rounded-xl bg-black/20 border border-white/10 text-sm whitespace-pre-wrap mb-3">
        {transcript || '—'}
      </div>
      <div className="flex items-center gap-4 mb-3 text-sm text-gray-300">
        <span>Estimated WPM: <strong className="text-white">{wpm}</strong></span>
        {targets?.length > 0 && (
          <span>Targets: <strong className="text-white">{targets.join(', ')}</strong></span>
        )}
      </div>
      <button onClick={getFeedback} className="btn">✨ Get Coaching Feedback</button>
      {loading && <div className="mt-2 text-sm text-gray-300">Thinking...</div>}
      {error && <div className="mt-2 text-sm text-red-300">{error}</div>}
    </div>
  );
}
