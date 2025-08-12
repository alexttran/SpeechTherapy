    'use client';

    import React, { useEffect, useMemo, useState } from 'react';
    import StepHeader from '../../components/StepHeader';
    import Recorder from '../../components/Recorder';
    import CoachPanel from '../../components/CoachPanel';
    import MinimalPairCard from '../../components/MinimalPairCard';
    import { ACCENT_PROFILES } from '../../lib/accentProfiles';
    import { READING_PASSAGES, MINIMAL_PAIRS, ACCENT_TO_TARGETS } from '../../lib/curriculum';
    import { startSession, nextStep, timeLeftMs, ended, SESSION_MS } from '../../lib/sessionFlow';
    import { formatMs } from '../../lib/utils';
    import { AgeGroup, Severity, AccentKey } from '../../types';

    type Clip = { prompt: string; transcript: string; feedback: string; durationSec: number };
    const ageOptions: { value: AgeGroup, label: string }[] = [
      { value: 'child', label: 'Child' },
      { value: 'teen', label: 'Teen' },
      { value: 'adult', label: 'Adult' }
    ];
    const severityOptions: { value: Severity, label: string }[] = [
      { value: 'mild', label: 'Mild' },
      { value: 'moderate', label: 'Moderate' },
      { value: 'severe', label: 'Severe' }
    ];

    export default function SessionPage() {
      const [ageGroup, setAgeGroup] = useState<AgeGroup | null>(null);
      const [accent, setAccent] = useState<AccentKey | null>(null);
      const [severity, setSeverity] = useState<Severity | null>(null);
      const [step, setStep] = useState<'intake' | 'assessment' | 'recommend' | 'exercise' | 'coach' | 'summary'>('intake');
      const [clips, setClips] = useState<Clip[]>([]);
      const [recs, setRecs] = useState<string[]>([]);
      const [startedAt, setStartedAt] = useState<number | null>(null);
      const [deadline, setDeadline] = useState<number | null>(null);
      const [now, setNow] = useState<number>(Date.now());
      const [sessionSummary, setSessionSummary] = useState<string>('');

      // timer ticker
      useEffect(() => {
        const id = setInterval(() => setNow(Date.now()), 500);
        return () => clearInterval(id);
      }, []);

      const remaining = useMemo(() => {
        if (!deadline) return SESSION_MS;
        return Math.max(0, deadline - now);
      }, [deadline, now]);

      const selectedAccent = useMemo(() => {
        return ACCENT_PROFILES.find(a => a.key === accent) || null;
      }, [accent]);

      // Step labels
      const stepLabel = useMemo(() => {
        switch (step) {
          case 'intake': return 'Step 1 · Intake & Setup';
          case 'assessment': return 'Step 2 · Quick Assessment';
          case 'recommend': return 'Step 3 · Recommendations';
          case 'exercise': return 'Step 4 · Practice Exercises';
          case 'coach': return 'Step 5 · Coaching';
          case 'summary': return 'Step 6 · Session Summary';
          default: return 'Session';
        }
      }, [step]);

      function start() {
        setStartedAt(Date.now());
        setDeadline(Date.now() + SESSION_MS);
        setStep('assessment');
      }

      function advance() {
        const ns = nextStep(step);
        setStep(ns);
      }

      function addClip(prompt: string, transcript: string, durationSec: number) {
        setClips(prev => [...prev, { prompt, transcript, feedback: '', durationSec }]);
      }

      function setFeedbackForLast(feedback: string) {
        setClips(prev => {
          if (prev.length === 0) return prev;
          const out = [...prev];
          out[out.length - 1] = { ...out[out.length - 1], feedback };
          return out;
        });
      }

      async function buildRecommendations() {
        const last = clips[clips.length - 1];
        const targets = (accent && ACCENT_TO_TARGETS[accent]) || ['r_l', 'th_s', 'i_ii'];
        const resp = await fetch('/api/coach', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            transcript: last?.transcript || '',
            prompt: last?.prompt || '',
            accent,
            severity,
            ageGroup,
            targets
          })
        });
        const json = await resp.json();
        const out = (json?.content || 'Focus on a few target sounds. Practice slowly, then increase speed.').split(".").map((s: string) => s.trim()).filter(Boolean).slice(0, 6);
        setRecs(out);
      }

      function finishSummary() {
        const lines = [
          '# Session Overview',
          '',
          `Time: ${formatMs((startedAt && deadline) ? (deadline - startedAt) : 0)} (cap 30:00)`,
          `Age Group: ${ageGroup || '-'}`,
          `Accent: ${selectedAccent?.label || '-'}`,
          `Severity: ${severity || '-'}`,
          '',
          '## What you practiced',
          ...clips.map((c, i) => `- (${i+1}) "${c.prompt}"`),
          '',
          '## Recommendations',
          ...recs.map(r => `- ${r}`),
          '',
          '## Next steps',
          '- Review target sounds daily (5–10 min).',
          '- Record yourself once more this week and compare.',
          '- Speak slowly, fully pronounce final consonants, and stretch tricky vowels.'
        ];
        setSessionSummary(lines.join('\n'));
      }

      useEffect(() => {
        if (step === 'recommend') {
          void buildRecommendations();
        }
        if (remaining <= 0 && step !== 'summary') {
          setStep('summary');
        }
      }, [step, remaining]); // eslint-disable-line

      // Assessment prompts based on accent profile
      const reading = useMemo(() => {
        if (ageGroup === 'child') return READING_PASSAGES.kid;
        if (ageGroup === 'adult' || ageGroup === 'teen') return READING_PASSAGES.pro;
        return READING_PASSAGES.default;
      }, [ageGroup]);

      const pairKeys = useMemo(() => {
        return (accent && ACCENT_TO_TARGETS[accent]) || ['r_l', 'th_s', 'i_ii'];
      }, [accent]);

      const pairList = useMemo(() => {
        const list: string[][] = [];
        for (const k of pairKeys) {
          const pairs = MINIMAL_PAIRS[k] || [];
          for (const [l, r] of pairs) list.push([l, r]);
        }
        return list.slice(0, 6);
      }, [pairKeys]);

      return (
        <div>
          <StepHeader stepLabel={stepLabel} timeLeftMs={remaining} />

          {step === 'intake' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl card">
                <h2 className="text-xl font-semibold mb-3">Choose your settings</h2>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-300 mb-1">Age group</div>
                    <div className="flex gap-2 flex-wrap">
                      {ageOptions.map(opt => (
                        <button key={opt.value} onClick={() => setAgeGroup(opt.value)}
                          className={'pill px-3 py-2 rounded-xl ' + (ageGroup === opt.value ? 'ring-2 ring-brand' : '')}>
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-300 mb-1">Accent origin</div>
                    <select className="w-full p-2 rounded-xl bg-black/20 border border-white/10"
                      value={accent || ''} onChange={e => setAccent(e.target.value as any)}>
                      <option value="">Select…</option>
                      {ACCENT_PROFILES.map(a => <option key={a.key} value={a.key}>{a.label}</option>)}
                    </select>
                    {selectedAccent && (
                      <div className="mt-2 text-xs text-gray-400">
                        {selectedAccent.notes}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-sm text-gray-300 mb-1">Severity (self-rated)</div>
                    <div className="flex gap-2 flex-wrap">
                      {severityOptions.map(opt => (
                        <button key={opt.value} onClick={() => setSeverity(opt.value)}
                          className={'pill px-3 py-2 rounded-xl ' + (severity === opt.value ? 'ring-2 ring-brand' : '')}>
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">
                    Your selections only shape the prompts. Nothing is stored.
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-2xl card">
                <h3 className="font-semibold mb-2">Session plan (30 minutes)</h3>
                <ol className="list-decimal ml-5 text-gray-300 space-y-1">
                  <li>Quick assessment (reading + minimal pairs)</li>
                  <li>Recommendations</li>
                  <li>Exercises</li>
                  <li>Coaching feedback</li>
                  <li>Summary & next steps</li>
                </ol>
                <button
                  disabled={!ageGroup || !accent || !severity}
                  onClick={start}
                  className="btn mt-4 disabled:opacity-50"
                >
                  Start Assessment
                </button>
              </div>
            </div>
          )}

          {step === 'assessment' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl card">
                <h2 className="text-lg font-semibold mb-2">Reading sample</h2>
                <Recorder
                  prompt={reading}
                  disabled={remaining <= 0}
                  onTranscribed={(text, dur) => addClip(reading, text, dur)}
                />
              </div>
              <div className="p-6 rounded-2xl card">
                <h2 className="text-lg font-semibold mb-2">Minimal pairs</h2>
                <div className="grid grid-cols-1 gap-2 mb-3">
                  {pairList.map(([l, r], i) => <MinimalPairCard key={i} left={l} right={r} />)}
                </div>
                <Recorder
                  prompt={pairList.map(([l,r]) => `${l} … ${r}`).join(', ')}
                  disabled={remaining <= 0}
                  onTranscribed={(text, dur) => addClip('Minimal pairs', text, dur)}
                />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <button className="btn" onClick={advance}>Continue</button>
              </div>
            </div>
          )}

          {step === 'recommend' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl card">
                <h2 className="text-lg font-semibold mb-2">Recommendations</h2>
                <ul className="list-disc ml-5 space-y-1 text-gray-300">
                  {recs.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
                <div className="text-xs text-gray-400 mt-3">
                  Friendly tip: practice slowly, exaggerate target sounds, then increase speed.
                </div>
              </div>
              <div className="p-6 rounded-2xl card">
                <h2 className="text-lg font-semibold mb-2">Try this</h2>
                <p className="text-gray-300 mb-2">Read the recommendation that sounds most relevant out loud, or pick one minimal pair and make 3 clear repetitions each.</p>
                <Recorder
                  prompt={"Read one recommendation or practice pairs 3× each in a slow, clear voice."}
                  disabled={remaining <= 0}
                  onTranscribed={(text, dur) => addClip('Practice block', text, dur)}
                />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <button className="btn" onClick={() => setStep('exercise')}>Keep Practicing</button>
              </div>
            </div>
          )}

          {step === 'exercise' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl card">
                <h2 className="text-lg font-semibold mb-2">Exercise Round</h2>
                <p className="text-gray-300 mb-2">Choose a tricky sound and make a short practice recording.</p>
                <Recorder
                  prompt={selectedAccent?.samplePrompts?.[0] || 'She sells seashells by the seashore.'}
                  disabled={remaining <= 0}
                  onTranscribed={(text, dur) => addClip('Exercise round', text, dur)}
                />
              </div>
              <div className="p-6 rounded-2xl card">
                <h2 className="text-lg font-semibold mb-2">Another Exercise</h2>
                <Recorder
                  prompt={selectedAccent?.samplePrompts?.[1] || 'Three thin threads.'}
                  disabled={remaining <= 0}
                  onTranscribed={(text, dur) => addClip('Exercise round 2', text, dur)}
                />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <button className="btn" onClick={() => setStep('coach')}>Get Coaching</button>
              </div>
            </div>
          )}

          {step === 'coach' && (
            <div className="grid md:grid-cols-2 gap-6">
              {clips.length === 0 ? (
                <div className="p-6 rounded-2xl card">Record something first in previous steps.</div>
              ) : (
                clips.slice(-2).map((c, idx) => (
                  <CoachPanel
                    key={idx}
                    accent={accent}
                    severity={severity}
                    ageGroup={ageGroup}
                    targets={pairKeys}
                    prompt={c.prompt}
                    transcript={c.transcript}
                    durationSec={c.durationSec}
                    onFeedback={(fb) => setFeedbackForLast(fb)}
                  />
                ))
              )}
              <div className="md:col-span-2 flex justify-end">
                <button className="btn" onClick={() => { finishSummary(); setStep('summary'); }}>View Summary</button>
              </div>
            </div>
          )}

          {step === 'summary' && (
            <div className="grid gap-6">
              <div className="p-6 rounded-2xl card">
                <h2 className="text-lg font-semibold mb-2">Final Overview</h2>
                <div className="text-sm text-gray-300 whitespace-pre-wrap">
                  {sessionSummary || 'No summary yet.'}
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="btn-secondary" onClick={() => window.print()}>Print / Save as PDF</button>
                  <a href="/" className="btn">Start New Session</a>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }
