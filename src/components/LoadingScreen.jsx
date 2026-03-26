import React, { useEffect, useState } from 'react';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing...');

  const statuses = [
    'Initializing...',
    'Loading secure modules...',
    'Connecting to servers...',
    'Preparing your experience...',
    'Almost ready...',
  ];

  useEffect(() => {
    let interval;
    let statusIndex = 0;

    const statusInterval = setInterval(() => {
      statusIndex = Math.min(statusIndex + 1, statuses.length - 1);
      setStatusText(statuses[statusIndex]);
    }, 420);

    interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 12 + 4;
        if (next >= 100) {
          clearInterval(interval);
          clearInterval(statusInterval);
          setProgress(100);
          setStatusText('Ready! 🚀');
          setTimeout(onComplete, 600);
          return 100;
        }
        return Math.min(next, 99);
      });
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(statusInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: '#06020F' }}>

      {/* Orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="grid-overlay" />

      {/* Logo / Brand */}
      <div className="relative flex flex-col items-center gap-8 z-10">

        {/* Animated logo ring */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-purple-700/40" />
          <div className="absolute inset-0 rounded-full border-t-2 border-purple-500 animate-spin" />
          <div className="absolute inset-2 rounded-full border-b-2 border-blue-500 animate-spin"
            style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
          <span className="text-3xl relative z-10">🚀</span>
        </div>

        {/* Brand name */}
        <div className="text-center">
          <h1 className="font-display text-5xl text-gradient tracking-widest mb-1">
            WIN ZONE
          </h1>
          <p className="text-purple-300/70 text-sm font-body tracking-[0.3em] uppercase">
            Premium Gaming Platform
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-64 md:w-80">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-purple-300/60 font-body animate-pulse">{statusText}</span>
            <span className="text-xs text-purple-400 font-semibold font-body">{Math.round(progress)}%</span>
          </div>
          <div className="h-1 w-full rounded-full overflow-hidden"
            style={{ background: 'rgba(124,58,237,0.2)' }}>
            <div
              className="h-full rounded-full transition-all duration-150 ease-out"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #7C3AED 0%, #2563EB 50%, #06B6D4 100%)',
                boxShadow: '0 0 12px rgba(124,58,237,0.8)',
              }}
            />
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex gap-2 items-center">
          {[0, 1, 2, 3, 4].map(i => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{
                background: progress > i * 20 ? '#A855F7' : 'rgba(124,58,237,0.3)',
                boxShadow: progress > i * 20 ? '0 0 6px #A855F7' : 'none',
                transform: progress > i * 20 ? 'scale(1.4)' : 'scale(1)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
