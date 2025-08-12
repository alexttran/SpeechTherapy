import { SessionState, StepKey } from '../types';

export const SESSION_MS = 30 * 60 * 1000; // 30 minutes

export function startSession(): SessionState {
  const now = Date.now();
  return {
    ageGroup: null,
    accent: null,
    severity: null,
    startedAt: now,
    endsAt: now + SESSION_MS,
    step: 'intake',
    clips: [],
    recommendations: [],
    finalSummary: null,
    elapsedMs: 0
  };
}

export function nextStep(current: StepKey): StepKey {
  const order: StepKey[] = ['intake', 'assessment', 'recommend', 'exercise', 'coach', 'summary'];
  const idx = order.indexOf(current);
  return order[Math.min(idx + 1, order.length - 1)];
}

export function timeLeftMs(state: SessionState): number {
  if (!state.endsAt) return SESSION_MS;
  return Math.max(0, state.endsAt - Date.now());
}

export function ended(state: SessionState): boolean {
  return timeLeftMs(state) <= 0;
}
