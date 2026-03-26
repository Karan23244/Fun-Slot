import React, { useEffect, useState } from 'react';

const StickyCTA = ({ onStartNow }) => {
  const [visible, setVisible] = useState(false);
  const [pulsing, setPulsing] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Pulse every 5 seconds to draw attention
  useEffect(() => {
    const id = setInterval(() => {
      setPulsing(true);
      setTimeout(() => setPulsing(false), 1000);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 md:hidden"
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        background: 'rgba(6,2,15,0.95)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(124,58,237,0.3)',
        boxShadow: '0 -10px 40px rgba(124,58,237,0.15)',
      }}>

      {/* Glow line on top */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #7C3AED, #2563EB, transparent)' }} />

      <div className="flex items-center gap-3 px-4 py-3">

        {/* Left info */}
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold text-sm font-body truncate">
            🎁 ₹20,000 Bonus Waiting!
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="glow-dot" />
            <p className="text-purple-300/70 text-xs font-body">120+ joined today</p>
          </div>
        </div>

        {/* CTA button */}
        <button
          onClick={() => {
            console.log('[Analytics] Sticky CTA clicked');
            onStartNow();
          }}
          className="flex-shrink-0 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all duration-300"
          style={{
            background: pulsing
              ? 'linear-gradient(135deg, #8B5CF6, #3B82F6)'
              : 'linear-gradient(135deg, #7C3AED, #2563EB)',
            boxShadow: pulsing
              ? '0 0 30px rgba(124,58,237,0.9), 0 0 60px rgba(124,58,237,0.4)'
              : '0 0 20px rgba(124,58,237,0.5)',
            transform: pulsing ? 'scale(1.05)' : 'scale(1)',
          }}>
          🚀 Start Now
        </button>
      </div>

      {/* Safe area padding for notched phones */}
      <div className="h-safe-area-inset-bottom" />
    </div>
  );
};

export default StickyCTA;
