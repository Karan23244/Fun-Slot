import React, { useEffect, useState } from 'react';


const RedirectModal = ({ isOpen, onClose }) => {
  const [countdown, setCountdown] = useState(5);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(5);
      setRedirecting(false);
      return;
    }

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setRedirecting(true);
          setTimeout(() => {
            console.log('[Analytics] Auto-redirect fired from modal');
            onClose();
          }, 400);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, onClose]);

  const handleRedirectNow = () => {
    console.log('[Analytics] Manual redirect clicked from modal');
    onClose();
  };

  if (!isOpen) return null;

  const circumference = 2 * Math.PI * 22;
  const strokeDashoffset = circumference - (countdown / 5) * circumference;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      style={{ backdropFilter: 'blur(12px)', background: 'rgba(6,2,15,0.85)' }}
      onClick={onClose}>

      <div
        className="relative w-full max-w-md glass-card p-8 text-center"
        style={{
          border: '1px solid rgba(124,58,237,0.4)',
          boxShadow: '0 0 60px rgba(124,58,237,0.3), 0 20px 60px rgba(0,0,0,0.8)',
          animation: 'fadeInUp 0.4s ease',
        }}
        onClick={e => e.stopPropagation()}>

        {/* Glow top accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-0.5"
          style={{ background: 'linear-gradient(90deg, transparent, #7C3AED, transparent)' }} />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-purple-300/50 hover:text-white transition-colors text-xl leading-none"
          aria-label="Close">
          ✕
        </button>

        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-3xl"
          style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(37,99,235,0.3))', border: '1px solid rgba(124,58,237,0.3)' }}>
          🏆
        </div>

        <div className="badge mx-auto mb-4">
          ✦ Exclusive Offer
        </div>

        <h2 className="font-display text-4xl text-gradient mb-2 tracking-wide">
          YOU'RE ONE STEP AWAY!
        </h2>

        <p className="text-gray-300 text-sm mb-6 leading-relaxed">
          Join <span className="text-purple-400 font-semibold">10,000+ winners</span> on the most trusted platform.
          Claim your welcome bonus now — limited time offer!
        </p>

        {/* Countdown ring */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="absolute inset-0 -rotate-90" width="56" height="56" viewBox="0 0 56 56">
              <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(124,58,237,0.2)" strokeWidth="3" />
              <circle
                cx="28" cy="28" r="22"
                fill="none"
                stroke="url(#timerGrad)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{ transition: 'stroke-dashoffset 0.9s linear' }}
              />
              <defs>
                <linearGradient id="timerGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#2563EB" />
                </linearGradient>
              </defs>
            </svg>
            <span className="font-display text-2xl text-white relative z-10">{countdown}</span>
          </div>
          <p className="text-gray-400 text-sm text-left">
            {redirecting
              ? <span className="text-purple-400 font-semibold animate-pulse">Redirecting... 🚀</span>
              : <>Auto-redirecting in <span className="text-white font-semibold">{countdown}s</span></>
            }
          </p>
        </div>

        {/* Bonus badge */}
        <div className="rounded-xl px-4 py-3 mb-6 text-left"
          style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)' }}>
          <p className="text-yellow-400 font-semibold text-sm flex items-center gap-2">
            🎁 Welcome Bonus — Up to ₹20,000
          </p>
          <p className="text-yellow-300/60 text-xs mt-0.5">Valid for new users only. T&C apply.</p>
        </div>

        {/* CTA Buttons */}
        <button
          onClick={handleRedirectNow}
          className="btn-primary w-full mb-3 text-lg py-4 relative z-10">
          <span className="relative z-10">🚀 Claim Bonus Now</span>
        </button>

        <button
          onClick={onClose}
          className="text-gray-500 text-xs hover:text-gray-300 transition-colors">
          No thanks, I'll miss out
        </button>
      </div>
    </div>
  );
};

export default RedirectModal;
