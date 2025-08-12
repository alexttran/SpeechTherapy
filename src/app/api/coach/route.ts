// POST /api/coach
// Accepts JSON with { transcript, prompt, accent, severity, ageGroup, targets?, history? }
// Calls Chat Completions for encouraging feedback + drills. Returns { content }.
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { transcript, prompt, accent, severity, ageGroup, targets, history } = body || {};

    const system = {
      role: 'system',
      content: [
        'You are a friendly speech coaching assistant focused on English intelligibility.',
        'Audience: primarily K–12 (but also adults). No medical claims.',
        'Tone: encouraging, concise, age-appropriate.',
        'Focus on pronunciation and articulation; provide simple tips and next-step drills.',
        'If helpful, include a brief tongue placement description (short text) referencing a diagram with labels: lips, teeth, alveolar ridge, hard palate, soft palate, tongue tip, blade, dorsum.',
        'Never store data or ask for personal info.'
      ].join(' ')
    };

    const user = {
      role: 'user',
      content: JSON.stringify({
        transcript,
        prompt,
        accent,
        severity,
        ageGroup,
        targets,
        history
      })
    };

    const payload = {
      model: 'gpt-4o-mini',
      temperature: 0.2,
      messages: [system, user]
    };

    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY ?? ''}`
      },
      body: JSON.stringify(payload)
    });

    if (!resp.ok) {
      const errText = await resp.text();
      return new Response(JSON.stringify({ error: 'OpenAI error', detail: errText }), { status: 500 });
    }

    const data = await resp.json();
    const content = data?.choices?.[0]?.message?.content ?? '';
    return new Response(JSON.stringify({ content }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || 'Unknown error' }), { status: 500 });
  }
}
