// Shared TypeScript types used across the app.

export type AgeGroup = 'child' | 'teen' | 'adult';
export type Severity = 'mild' | 'moderate' | 'severe';

export type AccentKey =
  | 'spanish_mx'
  | 'mandarin_cn'
  | 'hindi_in'
  | 'arabic'
  | 'russian'
  | 'korean'
  | 'japanese'
  | 'french_fr'
  | 'german_de'
  | 'portuguese_br'
  | 'vietnamese'
  | 'tagalog'
  | 'turkish_tr'
  | 'thai_th'
  | 'italian_it'
  | 'other';

export interface AccentProfile {
  key: AccentKey;
  label: string;
  notes: string;      // general tendencies (non-clinical)
  primaryTargets: string[]; // phoneme targets like "/r/", "/θ/"
  samplePrompts: string[];  // short phrases used in assessment
}

export type StepKey = 'intake' | 'assessment' | 'recommend' | 'exercise' | 'coach' | 'summary';

export interface SessionState {
  ageGroup: AgeGroup | null;
  accent: AccentKey | null;
  severity: Severity | null;
  startedAt: number | null;
  endsAt: number | null; // timestamp when 30min cap hits
  step: StepKey;
  // transcripts and AI feedback kept in memory only
  clips: Array<{
    prompt: string;
    transcript: string;
    feedback: string;
  }>;
  recommendations: string[];
  finalSummary: string | null;
  elapsedMs: number;
}
