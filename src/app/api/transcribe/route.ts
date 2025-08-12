// POST /api/transcribe
// Accepts multipart/form-data with field 'audio' (Blob/File) and forwards to OpenAI Whisper API.
// Returns { text, ... } from OpenAI.
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic'; // ensure Node runtime
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const audio = form.get('audio');
    if (!audio || !(audio instanceof File)) {
      return new Response(JSON.stringify({ error: 'No audio file provided.' }), { status: 400 });
    }

    const openaiForm = new FormData();
    openaiForm.append('file', audio);
    openaiForm.append('model', 'whisper-1'); // Stable transcription model
    openaiForm.append('response_format', 'json');

    const resp = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY ?? ''}`
      },
      body: openaiForm
    });

    if (!resp.ok) {
      const errText = await resp.text();
      return new Response(JSON.stringify({ error: 'OpenAI error', detail: errText }), { status: 500 });
    }

    const data = await resp.json();
    return new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || 'Unknown error' }), { status: 500 });
  }
}
