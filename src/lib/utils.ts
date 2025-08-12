// Utility helpers used in the app.

export function formatMs(ms: number): string {
  const sec = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(sec / 60).toString().padStart(2, '0');
  const s = (sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export function estimateWPM(transcript: string, seconds: number): number {
  const words = transcript.trim().split(/\s+/).filter(Boolean).length;
  if (seconds <= 0) return 0;
  return Math.round((words / seconds) * 60);
}
