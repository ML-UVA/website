'use client';
import { useEffect, useState } from 'react';

export default function Calendar() {
  const [mode, setMode] = useState<'MONTH' | 'AGENDA'>('MONTH');

  useEffect(() => {
    setMode(document.documentElement.clientWidth < 768 ? 'AGENDA' : 'MONTH');
  }, []);

  return (
    <div className="text-center">
      <h2 className="mb-3">Calendar</h2>
      <p className="text-txt-secondary mb-8">Stay up to date with our upcoming events and meetings.</p>
      <div className="rounded-2xl overflow-hidden shadow-card">
        <iframe
          src={`https://calendar.google.com/calendar/embed?src=sigaiatuva%40gmail.com&ctz=America%2FNew_York&mode=${mode}`}
          width="100%" height="600" loading="lazy" className="border-none"
        />
      </div>
    </div>
  );
}
