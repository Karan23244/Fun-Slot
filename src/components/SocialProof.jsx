import React, { useEffect, useRef, useState } from 'react';

const testimonials = [
  {
    name: 'Rahul S.',
    location: 'Mumbai',
    avatar: '👨‍💼',
    rating: 5,
    text: 'Withdrew ₹45,000 within 3 minutes. Absolutely unmatched. This platform changed how I bet.',
    win: '₹45,000',
  },
  {
    name: 'Priya M.',
    location: 'Delhi',
    avatar: '👩‍💻',
    rating: 5,
    text: 'The odds on IPL here are just insane. Nobody else comes close. Big wins every week!',
    win: '₹1.2L',
  },
  {
    name: 'Arjun K.',
    location: 'Bangalore',
    avatar: '🧑‍🦱',
    rating: 5,
    text: 'Welcome bonus was real and easy to claim. Support team replied in under a minute. Love it!',
    win: '₹28,500',
  },
  {
    name: 'Vikram T.',
    location: 'Chennai',
    avatar: '🧔',
    rating: 5,
    text: 'Been using for 6 months. Always paid on time, amazing live betting features. Best platform!',
    win: '₹3.4L',
  },
  {
    name: 'Sneha R.',
    location: 'Hyderabad',
    avatar: '👩‍🦰',
    rating: 5,
    text: 'The app is so smooth and fast. Bet on football live and won big. Highly recommended!',
    win: '₹67,000',
  },
];

const liveActivities = [
  { user: 'Raj***', action: 'just won', amount: '₹12,400', sport: '🏏 Cricket' },
  { user: 'Am***', action: 'just joined', amount: '₹20,000 bonus', sport: '🎁' },
  { user: 'Vij***', action: 'just won', amount: '₹8,900', sport: '⚽ Football' },
  { user: 'Sur***', action: 'just won', amount: '₹55,000', sport: '🏏 IPL' },
  { user: 'Poo***', action: 'just joined', amount: '₹20,000 bonus', sport: '🎁' },
  { user: 'Kir***', action: 'just won', amount: '₹23,100', sport: '🎾 Tennis' },
  { user: 'Man***', action: 'just won', amount: '₹41,000', sport: '🏏 Cricket' },
  { user: 'Div***', action: 'just joined', amount: '₹20,000 bonus', sport: '🎁' },
];

const TestimonialCard = ({ t, index }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="glass-card p-5 transition-all duration-700 flex flex-col gap-3"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transitionDelay: `${index * 0.1}s`,
      }}>

      {/* Stars */}
      <div className="flex gap-0.5 text-yellow-400 text-sm">
        {'★'.repeat(t.rating)}
      </div>

      {/* Quote */}
      <p className="text-gray-300 text-sm leading-relaxed font-body flex-1">"{t.text}"</p>

      {/* Win badge */}
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full self-start"
        style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)' }}>
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" style={{ boxShadow: '0 0 6px #4ade80' }} />
        <span className="text-green-400 text-xs font-semibold">Won {t.win}</span>
      </div>

      {/* User */}
      <div className="flex items-center gap-2 pt-1 border-t border-white/5">
        <span className="text-2xl">{t.avatar}</span>
        <div>
          <p className="text-white text-sm font-semibold font-body">{t.name}</p>
          <p className="text-gray-500 text-xs font-body">{t.location}</p>
        </div>
      </div>
    </div>
  );
};

const SocialProof = ({ onStartNow }) => {
  const titleRef = useRef(null);
  const [titleVisible, setTitleVisible] = useState(false);
  const [joinCount, setJoinCount] = useState(120);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTitleVisible(true); },
      { threshold: 0.3 }
    );
    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setJoinCount(prev => prev + Math.floor(Math.random() * 3));
    }, 8000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="social-proof" className="relative py-24 px-4 overflow-hidden" style={{ background: '#06020F' }}>

      <div className="orb" style={{
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)',
        top: '-100px', left: '-100px',
      }} />
      <div className="noise-overlay" />

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div
          ref={titleRef}
          className="text-center mb-8 transition-all duration-700"
          style={{ opacity: titleVisible ? 1 : 0, transform: titleVisible ? 'translateY(0)' : 'translateY(30px)' }}>

          <div className="badge mx-auto mb-4">
            <span className="glow-dot" />
            Real Winners
          </div>

          <h2 className="section-title mb-4"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)', letterSpacing: '0.05em' }}>
            <span className="text-gradient">10,000+ </span>
            <span className="text-white">TRUST US</span>
          </h2>
          <p className="text-gray-400 font-body max-w-xl mx-auto">
            Real people, real wins. See what our community is saying about their experience.
          </p>
        </div>

        {/* Live Activity Ticker */}
        <div className="mb-10 rounded-2xl overflow-hidden py-3"
          style={{ background: 'rgba(124,58,237,0.07)', border: '1px solid rgba(124,58,237,0.15)' }}>
          <div className="ticker-wrap">
            <div className="ticker-content">
              {[...liveActivities, ...liveActivities].map((a, i) => (
                <div key={i} className="flex items-center gap-3 px-6 py-1 border-r border-purple-900/30 whitespace-nowrap">
                  <span className="text-gray-400 text-sm font-body">
                    <span className="text-white font-semibold">{a.user}</span>{' '}
                    {a.action}{' '}
                    <span className="text-green-400 font-semibold">{a.amount}</span>{' '}
                    {a.sport}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Big Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
          {[
            { icon: '🔥', stat: `${joinCount}+`, label: 'Users joined today', color: '#F97316' },
            { icon: '⭐', stat: '10,000+', label: 'Trusted users', color: '#F59E0B' },
            { icon: '💰', stat: '₹50Cr+', label: 'Total paid out', color: '#22C55E' },
          ].map(item => (
            <div
              key={item.label}
              className="flex items-center gap-4 rounded-2xl px-6 py-5 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: `radial-gradient(ellipse at 20% 50%, ${item.color}15 0%, transparent 60%)`,
                border: `1px solid ${item.color}25`,
              }}>
              <span className="text-4xl">{item.icon}</span>
              <div>
                <div className="font-display text-3xl tracking-wide"
                  style={{ color: item.color, textShadow: `0 0 20px ${item.color}60` }}>
                  {item.stat}
                </div>
                <div className="text-gray-400 text-xs font-body uppercase tracking-wider mt-0.5">{item.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {testimonials.slice(0, 3).map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div id="bonus" className="text-center">
          <div className="inline-block rounded-3xl p-8 md:p-10 max-w-2xl w-full"
            style={{
              background: 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(37,99,235,0.1) 100%)',
              border: '1px solid rgba(124,58,237,0.3)',
              boxShadow: '0 0 60px rgba(124,58,237,0.1)',
            }}>
            <div className="text-5xl mb-4">🏆</div>
            <h3 className="font-display text-3xl md:text-4xl text-white mb-2 tracking-wide">
              READY TO WIN?
            </h3>
            <p className="text-gray-300 text-sm mb-6 font-body">
              Join thousands of winners. Claim your <span className="text-yellow-400 font-bold">₹20,000 welcome bonus</span> today.
            </p>
            <button
              onClick={() => {
                console.log('[Analytics] Social proof CTA clicked');
                onStartNow();
              }}
              className="btn-primary text-lg py-4 px-12 animate-pulse-glow">
              <span className="relative z-10">🚀 Start Winning Now</span>
            </button>
            <p className="text-gray-600 text-xs mt-3 font-body">
              No hidden fees. Instant registration. Bonus credited automatically.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
