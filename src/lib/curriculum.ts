// Minimal, SLP-inspired content. This is educational coaching material, not clinical therapy.
// Add or replace with licensed/SLP-authored content as needed.
export const READING_PASSAGES: Record<string, string> = {
  // short, neutral, culturally general passages designed for intelligibility assessment
  default: `On a sunny morning, people gathered at the community garden. 
  They watered small plants, shared tools, and practiced clear conversation. 
  Everyone tried to speak slowly, to listen carefully, and to pronounce words completely.`,
  kid: `On a bright day, kids plant seeds in a big box of dirt. 
  They take turns with the water can and say the words on the sign clearly.`,
  pro: `During the weekly meeting, the team reviewed goals, clarified action items, 
  and practiced concise speaking. Clear speech helped decisions move forward quickly.`
};

// Minimal pairs target common problem sets for intelligibility.
export const MINIMAL_PAIRS: Record<string, string[][]> = {
  r_l: [
    ['rice', 'lice'],
    ['right', 'light'],
    ['road', 'load'],
    ['grass', 'glass']
  ],
  th_s: [
    ['think', 'sink'],
    ['thin', 'sin'],
    ['faith', 'face'],
    ['path', 'pass']
  ],
  th_t: [
    ['think', 'tink'],
    ['thin', 'tin'],
    ['bath', 'bat'],
    ['both', 'boat'] // near-minimal
  ],
  v_w: [
    ['vest', 'west'],
    ['vine', 'wine'],
    ['very', 'wary'],
    ['van', 'wan']
  ],
  b_v: [
    ['berry', 'very'],
    ['ban', 'van'],
    ['bow', 'vow'],
    ['bent', 'vent']
  ],
  i_ii: [
    ['ship', 'sheep'],
    ['bit', 'beet'],
    ['sit', 'seat'],
    ['live', 'leave']
  ],
  p_b: [
    ['pack', 'back'],
    ['pearl', 'burl'],
    ['rip', 'rib'],
    ['cup', 'cub']
  ],
  final_cons: [
    ['cap', 'cab'],
    ['lice', 'lie'],
    ['back', 'bag'],
    ['seat', 'sea']
  ]
};

// Map accent to likely starter pair-sets to test
export const ACCENT_TO_TARGETS: Record<string, (keyof typeof MINIMAL_PAIRS)[]> = {
  spanish_mx: ['b_v', 'i_ii', 'final_cons'],
  mandarin_cn: ['r_l', 'th_s', 'final_cons'],
  hindi_in: ['v_w', 'i_ii'],
  arabic: ['p_b', 'i_ii'],
  russian: ['v_w', 'th_s', 'final_cons'],
  korean: ['r_l', 'i_ii', 'final_cons'],
  japanese: ['r_l', 'i_ii'],
  french_fr: ['th_s'],
  german_de: ['v_w', 'th_s'],
  portuguese_br: ['i_ii', 'final_cons'],
  vietnamese: ['final_cons', 'th_t'],
  tagalog: ['final_cons', 'i_ii', 'b_v'],
  turkish_tr: ['th_s', 'v_w'],
  thai_th: ['final_cons', 'r_l'],
  italian_it: ['th_t', 'i_ii'],
  other: ['r_l', 'th_s', 'i_ii', 'final_cons']
};
