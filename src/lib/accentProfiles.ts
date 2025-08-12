// Generalized accent profiles (non-diagnostic, not medical advice).
// These are common *tendencies* to guide initial targets for intelligibility work.
// Individuals vary widely.
import { AccentProfile } from '@/types';

export const ACCENT_PROFILES: AccentProfile[] = [
  {
    key: 'spanish_mx',
    label: 'Spanish (Mexico)',
    notes: 'Focus on /b/ vs /v/ contrasts, vowels like /ɪ/ vs /iː/ (ship vs sheep), and final consonants.',
    primaryTargets: ['/b/↔/v/', '/ɪ/↔/iː/', 'final consonants'],
    samplePrompts: ['Very busy bees visit the valley.', 'She picked six ships.']
  },
  {
    key: 'mandarin_cn',
    label: 'Mandarin Chinese',
    notes: 'Focus on /r/ vs /l/, /θ/ vs /s/, and final consonant clusters.',
    primaryTargets: ['/r/↔/l/', '/θ/↔/s/', 'final clusters'],
    samplePrompts: ['Red lorries roll lightly.', 'Think softly through Thursday.']
  },
  {
    key: 'hindi_in',
    label: 'Hindi',
    notes: 'V vs W contrast, retroflex/alveolar distinctions, and /ɪ/ vs /iː/.',
    primaryTargets: ['/v/↔/w/', 'retroflex vs alveolar', '/ɪ/↔/iː/'],
    samplePrompts: ['Weave vivid waves.', 'Sheep in the shipyard.']
  },
  {
    key: 'arabic',
    label: 'Arabic',
    notes: 'P vs B contrast, vowels /ɪ/ vs /iː/, and syllable stress patterns.',
    primaryTargets: ['/p/↔/b/', '/ɪ/↔/iː/', 'stress timing'],
    samplePrompts: ['Please bring the blue paper.', 'Busy cities feel peaceful.']
  },
  {
    key: 'russian',
    label: 'Russian',
    notes: 'W vs V contrast, devoicing of final consonants, and /θ/ vs /s/.',
    primaryTargets: ['/w/↔/v/', 'final devoicing', '/θ/↔/s/'],
    samplePrompts: ['Weaving velvet over leaves.', 'Think of this path.']
  },
  {
    key: 'korean',
    label: 'Korean',
    notes: 'R/L liquids, tense vs lax vowels, and syllable-final consonants.',
    primaryTargets: ['/r/↔/l/', 'lax vs tense vowels', 'final consonants'],
    samplePrompts: ['Rolling rails along.', 'Bit, beat, seat.']
  },
  {
    key: 'japanese',
    label: 'Japanese',
    notes: 'R/L contrasts, vowel length distinctions, and consonant clusters.',
    primaryTargets: ['/r/↔/l/', 'vowel length', 'clusters'],
    samplePrompts: ['Light rain on the road.', 'Green glass globes.']
  },
  {
    key: 'french_fr',
    label: 'French',
    notes: 'H dropping/aspiration, /θ/ vs /s/, and rhythm (stress timing).',
    primaryTargets: ['h-aspiration', '/θ/↔/s/', 'stress timing'],
    samplePrompts: ['Have healthy habits.', 'Think steadily on the thesis.']
  },
  {
    key: 'german_de',
    label: 'German',
    notes: 'W vs V, voiced/voiceless contrasts, and English /ð/ (this) and /θ/ (thin).',
    primaryTargets: ['/w/↔/v/', '/ð/ and /θ/', 'voicing contrasts'],
    samplePrompts: ['This weather is very warm.', 'Thin threads weave.']
  },
  {
    key: 'portuguese_br',
    label: 'Portuguese (Brazil)',
    notes: 'Vowel qualities (/ɪ/ vs /iː/), /h/ and /r/ onset clarity, final consonants.',
    primaryTargets: ['/ɪ/↔/iː/', 'onset /h/ and /r/', 'final consonants'],
    samplePrompts: ['He really reads.', 'She ships fresh fish.']
  },
  {
    key: 'vietnamese',
    label: 'Vietnamese',
    notes: 'Final consonants and clusters, /θ/ vs /t/ or /s/, and prosody.',
    primaryTargets: ['final consonants', '/θ/↔/t/ or /s/', 'prosody'],
    samplePrompts: ['Think of fifteen thin threads.', 'Bright spring streets.']
  },
  {
    key: 'tagalog',
    label: 'Tagalog',
    notes: 'Vowel contrasts and final consonants; /f/ and /v/ clarity.',
    primaryTargets: ['/f/ and /v/', 'vowel space', 'final consonants'],
    samplePrompts: ['Five very fine views.', 'Swift ships shift.']
  },
  {
    key: 'turkish_tr',
    label: 'Turkish',
    notes: 'W presence, /ð/ (this) and /θ/ (thin), and stress timing.',
    primaryTargets: ['/w/ presence', '/ð/ and /θ/', 'stress timing'],
    samplePrompts: ['This is the way.', 'Three thin thieves.']
  },
  {
    key: 'thai_th',
    label: 'Thai',
    notes: 'Final consonants, /r/ vs /l/, and vowel length.',
    primaryTargets: ['final consonants', '/r/↔/l/', 'vowel length'],
    samplePrompts: ['Roll a red rail.', 'Peak, pick, peek.']
  },
  {
    key: 'italian_it',
    label: 'Italian',
    notes: 'H aspiration, vowel length/quality, and /θ/ vs /t/ or /s/.',
    primaryTargets: ['h-aspiration', 'vowel length/quality', '/θ/ contrasts'],
    samplePrompts: ['Healthy habits help.', 'Think softly.']
  },
  {
    key: 'other',
    label: 'Other / Not Listed',
    notes: 'Start general with English core contrasts and adjust based on assessment.',
    primaryTargets: ['/r/', '/l/', '/θ/', '/ð/', '/ɪ/↔/iː/', 'final consonants'],
    samplePrompts: ['Three thin threads.', 'She picked six ships.']
  }
];
