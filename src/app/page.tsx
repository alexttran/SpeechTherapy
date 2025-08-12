import React from 'react';
import TongueDiagram from '../components/TongueDiagram';

export default function HomePage() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="p-6 rounded-2xl card">
        <h2 className="text-xl font-semibold mb-2">What this is</h2>
        <p className="text-gray-300 mb-3">
          A free, self-serve website to practice clearer, more intelligible English.
          Designed for K–12 learners (and helpful for adults), with a focus on
          pronunciation and articulation. Sessions are private and capped at 30 minutes.
        </p>
        <ul className="list-disc ml-5 text-gray-300 space-y-1">
          <li>No account. No database.</li>
          <li>Microphone only; nothing is stored.</li>
          <li>Accent softening for common regions in Europe, Asia, and Mexico.</li>
          <li>Assessment → Recommendations → Exercises → Coaching → Summary.</li>
        </ul>
      </div>
      <TongueDiagram />
      <div className="p-6 rounded-2xl card md:col-span-2">
        <h3 className="font-semibold mb-2">Disclaimer</h3>
        <p className="text-gray-400 text-sm">
          This is educational coaching, not medical therapy. For clinical speech or language
          needs, consult a licensed Speech-Language Pathologist (SLP).
        </p>
      </div>
    </div>
  );
}
