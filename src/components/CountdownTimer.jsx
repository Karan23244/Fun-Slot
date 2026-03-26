import React, { useEffect, useState } from 'react';

const CountdownTimer = () => {
  const getTargetTime = () => {
    const t = new Date();
    t.setHours(t.getHours() + 3);
    t.setMinutes(t.getMinutes() + 47);
    return t.getTime();
  };

  const [target] = useState(getTargetTime);
  const [timeLeft, setTimeLeft] = useState({ hours: 3, minutes: 47, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      const hours = Math.floor(diff / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setTimeLeft({ hours, minutes, seconds });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const pad = n => String(n).padStart(2, '0');

  const units = [
    { label: 'HRS', value: pad(timeLeft.hours) },
    { label: 'MIN', value: pad(timeLeft.minutes) },
    { label: 'SEC', value: pad(timeLeft.seconds) },
  ];

  return (
    <div className="relative rounded-2xl px-6 py-4 text-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(245,158,11,0.12) 0%, rgba(239,68,68,0.08) 100%)',
        border: '1px solid rgba(245,158,11,0.3)',
      }}>

      {/* Animated glow */}
      <div className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #F59E0B, transparent)' }} />

      <p className="text-yellow-400/80 text-xs font-semibold uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
        <span className="glow-dot" />
        Limited Offer Expires In
      </p>

      <div className="flex items-center justify-center gap-2">
        {units.map((unit, i) => (
          <React.Fragment key={unit.label}>
            <div className="flex flex-col items-center">
              <div className="relative w-16 h-16 flex items-center justify-center rounded-xl"
                style={{
                  background: 'rgba(6,2,15,0.8)',
                  border: '1px solid rgba(245,158,11,0.3)',
                  boxShadow: '0 0 20px rgba(245,158,11,0.15)',
                }}>
                <span className="font-display text-3xl"
                  style={{
                    background: 'linear-gradient(135deg, #F59E0B, #FCD34D)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                  {unit.value}
                </span>
                {/* Flip line */}
                <div className="absolute inset-x-0 top-1/2 h-px bg-black/40" />
              </div>
              <span className="text-yellow-600 text-[10px] font-semibold tracking-widest mt-1.5">
                {unit.label}
              </span>
            </div>
            {i < units.length - 1 && (
              <span className="font-display text-2xl text-yellow-500/60 mb-4 animate-pulse">:</span>
            )}
          </React.Fragment>
        ))}
      </div>

      <p className="text-gray-400 text-xs mt-3">
        🔥 <span className="text-yellow-400 font-semibold">247 people</span> are viewing this offer right now
      </p>
    </div>
  );
};

export default CountdownTimer;
