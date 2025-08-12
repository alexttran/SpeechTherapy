'use client';

// Simple inline SVG showing basic articulators for quick reference.
// Not to anatomical scale; purely illustrative.
import React from 'react';

export default function TongueDiagram() {
  return (
    <div className="p-4 rounded-2xl card">
      <div className="text-sm text-gray-300 mb-2">Tongue Placement Diagram (simplified)</div>
      <svg viewBox="0 0 500 220" className="w-full h-auto">
        <rect x="0" y="0" width="500" height="220" fill="transparent" stroke="rgba(255,255,255,0.1)" />
        {/* Mouth outline */}
        <path d="M40,120 C140,20 360,20 460,120 C360,200 140,200 40,120 Z" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.2)"/>
        {/* Teeth */}
        <rect x="120" y="70" width="260" height="12" fill="white" opacity="0.5"/>
        {/* Tongue */}
        <path d="M80,140 C180,170 320,170 420,140 C360,150 140,150 80,140 Z" fill="#ef4444" opacity="0.6"/>
        {/* Labels */}
        <circle cx="120" cy="65" r="4" fill="#fff"/><text x="120" y="55" fill="#fff" fontSize="12" textAnchor="middle">Teeth</text>
        <circle cx="180" cy="50" r="4" fill="#fff"/><text x="180" y="40" fill="#fff" fontSize="12" textAnchor="middle">Alveolar ridge</text>
        <circle cx="240" cy="35" r="4" fill="#fff"/><text x="240" y="25" fill="#fff" fontSize="12" textAnchor="middle">Hard palate</text>
        <circle cx="310" cy="40" r="4" fill="#fff"/><text x="310" y="30" fill="#fff" fontSize="12" textAnchor="middle">Soft palate</text>
        <circle cx="90" cy="155" r="4" fill="#fff"/><text x="90" y="170" fill="#fff" fontSize="12" textAnchor="middle">Tongue tip</text>
        <circle cx="160" cy="160" r="4" fill="#fff"/><text x="160" y="175" fill="#fff" fontSize="12" textAnchor="middle">Blade</text>
        <circle cx="260" cy="160" r="4" fill="#fff"/><text x="260" y="175" fill="#fff" fontSize="12" textAnchor="middle">Dorsum</text>
        <circle cx="60" cy="90" r="4" fill="#fff"/><text x="60" y="80" fill="#fff" fontSize="12" textAnchor="middle">Lips</text>
      </svg>
      <div className="text-xs text-gray-400 mt-2">
        Use this as a quick reference for sounds like /θ/ (tongue tip lightly between teeth), /r/ (tongue bunched or retroflex near alveolar ridge), and final consonants (close the mouth shape fully).
      </div>
    </div>
  );
}
