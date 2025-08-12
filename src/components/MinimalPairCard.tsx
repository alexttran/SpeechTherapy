'use client';

import React from 'react';

export default function MinimalPairCard({ left, right }: { left: string, right: string }) {
  return (
    <div className="p-3 rounded-xl card flex items-center justify-between">
      <span className="text-white font-medium">{left}</span>
      <span className="text-gray-400">↔</span>
      <span className="text-white font-medium">{right}</span>
    </div>
  );
}
