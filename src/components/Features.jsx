import React, { useEffect, useRef, useState } from 'react';

const features = [
  {
    icon: '⚡',
    title: 'Lightning Withdrawals',
    desc: 'Get your winnings in under 5 minutes. No delays, no excuses — your money when you need it.',
    accent: '#7C3AED',
    highlight: '< 5 min',
    highlightLabel: 'avg. payout',
  },
  {
    icon: '📈',
    title: 'Industry-High Odds',
    desc: 'We offer the highest odds in the market across cricket, football, kabaddi, and 50+ sports.',
    accent: '#2563EB',
    highlight: '50+',
    highlightLabel: 'sports covered',
  },
  {
    icon: '🔐',
    title: 'Bank-Grade Security',
    desc: '256-bit SSL encryption, 2FA protection, and fully licensed & regulated operations.',
    accent: '#059669',
    highlight: '256-bit',
    highlightLabel: 'SSL encryption',
  },
  {
    icon: '🎁',
    title: 'Massive Bonuses',
    desc: 'Up to ₹20,000 welcome bonus, daily cashback, refer & earn, and exclusive VIP perks.',
    accent: '#F59E0B',
    highlight: '₹20K',
    highlightLabel: 'welcome bonus',
  },
];

const FeatureCard = ({ feature, index }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="glass-card p-6 transition-all duration-700 cursor-default"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transitionDelay: `${index * 0.12}s`,
      }}>

      {/* Top accent line */}
      <div className="absolute top-0 left-6 right-6 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${feature.accent}, transparent)` }} />

      {/* Icon */}
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4"
        style={{
          background: `radial-gradient(circle, ${feature.accent}30 0%, transparent 70%)`,
          border: `1px solid ${feature.accent}40`,
          boxShadow: `0 0 20px ${feature.accent}20`,
        }}>
        {feature.icon}
      </div>

      {/* Highlight stat */}
      <div className="flex items-baseline gap-2 mb-2">
        <span className="font-display text-3xl tracking-wide"
          style={{ color: feature.accent, textShadow: `0 0 20px ${feature.accent}80` }}>
          {feature.highlight}
        </span>
        <span className="text-gray-500 text-xs uppercase tracking-widest font-body">
          {feature.highlightLabel}
        </span>
      </div>

      <h3 className="font-body font-bold text-lg text-white mb-2">{feature.title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed font-body">{feature.desc}</p>

      {/* Bottom hover indicator */}
      <div className="mt-4 flex items-center gap-2 text-xs font-semibold transition-all duration-300"
        style={{ color: feature.accent }}>
        <span>Learn more</span>
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </div>
    </div>
  );
};

const Features = () => {
  const titleRef = useRef(null);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTitleVisible(true); },
      { threshold: 0.3 }
    );
    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="relative py-24 px-4 overflow-hidden" style={{ background: '#07021A' }}>

      <div className="orb" style={{
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)',
        top: '0', right: '-100px',
      }} />
      <div className="noise-overlay" />

      <div className="max-w-6xl mx-auto">

        {/* Section heading */}
        <div
          ref={titleRef}
          className="text-center mb-16 transition-all duration-700"
          style={{ opacity: titleVisible ? 1 : 0, transform: titleVisible ? 'translateY(0)' : 'translateY(30px)' }}>

          <div className="badge mx-auto mb-4">✦ Why Choose Us</div>

          <h2 className="section-title text-center mb-4"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)', letterSpacing: '0.05em' }}>
            <span className="text-white">BUILT FOR </span>
            <span className="text-gradient">WINNERS</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto font-body text-base leading-relaxed">
            Everything you need to bet smarter, win bigger, and enjoy a seamless experience every time.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>

        {/* Bottom comparison row */}
        <div
          className="mt-12 rounded-2xl p-6 md:p-8"
          style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(37,99,235,0.07) 100%)',
            border: '1px solid rgba(124,58,237,0.2)',
          }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: '10,000+', label: 'Active Users' },
              { val: '₹50Cr+', label: 'Paid Out' },
              { val: '99.9%', label: 'Uptime' },
              { val: '4.9★', label: 'App Rating' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="font-display text-3xl md:text-4xl text-gradient mb-1 tracking-wide">
                  {stat.val}
                </div>
                <div className="text-gray-400 text-xs uppercase tracking-widest font-body">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
