'use client';

import React from 'react';
import { formatMs } from '../lib/utils';

export default function StepHeader(props: {
  stepLabel: string;
  timeLeftMs: number;
}) {
  const { stepLabel, timeLeftMs } = props;
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl card mb-4">
      <div className="text-lg font-semibold">{stepLabel}</div>
      <div className="pill px-3 py-1 rounded-xl text-sm">
        ⏳ {formatMs(timeLeftMs)} left
      </div>
    </div>
  );
}
