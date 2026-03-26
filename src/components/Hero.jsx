import React, { useEffect, useRef } from "react";
import CountdownTimer from "./CountdownTimer";

const Hero = ({ onStartNow }) => {
  const heroRef = useRef(null);

  // Parallax effect on mouse move
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 10;
      const orbs = hero.querySelectorAll(".orb");
      orbs.forEach((orb, i) => {
        const factor = (i + 1) * 0.4;
        orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleStart = () => {
    console.log("[Analytics] Start Now clicked - Hero");
    onStartNow();
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-40"
      style={{ background: "#06020F" }}>
      {/* Background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="grid-overlay" />
      <div className="noise-overlay" />

      {/* Particle ring decoration */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none opacity-10"
        style={{
          border: "1px solid rgba(124,58,237,0.5)",
          animation: "spin 30s linear infinite",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none opacity-10"
        style={{
          border: "1px dashed rgba(37,99,235,0.5)",
          animation: "spin 20s linear infinite reverse",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Top badge */}
        <div
          className="flex justify-center mb-6"
          style={{
            animation: "fadeInUp 0.6s ease forwards",
            animationDelay: "0.1s",
            opacity: 0,
          }}>
          <div className="badge">
            <span className="glow-dot" />
            <span>Live Now — 120+ users joined today</span>
          </div>
        </div>

        {/* Main heading */}
        <h1
          className="font-display leading-none mb-6"
          style={{
            animation: "fadeInUp 0.7s ease forwards",
            animationDelay: "0.25s",
            opacity: 0,
          }}>
          <span
            className="block text-white"
            style={{
              fontSize: "clamp(3rem, 10vw, 8rem)",
              letterSpacing: "0.04em",
            }}>
            START WINNING
          </span>
          <span
            className="block text-gradient shimmer-text"
            style={{
              fontSize: "clamp(3rem, 10vw, 8rem)",
              letterSpacing: "0.04em",
            }}>
            TODAY 🚀
          </span>
        </h1>

        {/* Sub-heading */}
        <p
          className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-4 leading-relaxed font-body font-light"
          style={{
            animation: "fadeInUp 0.7s ease forwards",
            animationDelay: "0.4s",
            opacity: 0,
          }}>
          Join the most trusted betting platform in India. Lightning-fast
          withdrawals, the highest odds, and a{" "}
          <span className="text-purple-400 font-semibold">
            ₹20,000 welcome bonus
          </span>{" "}
          waiting for you.
        </p>

        {/* Trust line */}
        <p
          className="text-purple-300/60 text-sm mb-8 font-body"
          style={{
            animation: "fadeInUp 0.7s ease forwards",
            animationDelay: "0.5s",
            opacity: 0,
          }}>
          ⭐⭐⭐⭐⭐ Trusted by{" "}
          <strong className="text-purple-300">10,000+</strong> winners across
          India
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          style={{
            animation: "fadeInUp 0.7s ease forwards",
            animationDelay: "0.6s",
            opacity: 0,
          }}>
          <button
            onClick={handleStart}
            className="btn-primary text-lg py-5 px-10 w-full sm:w-auto animate-pulse-glow">
            <span className="relative z-10 flex items-center gap-2">
              <span>🏆</span>
              <span>Start Now — Get Bonus</span>
            </span>
          </button>

          <button
            className="btn-outline text-lg py-5 px-10 w-full sm:w-auto">
            <span>👁️</span>
            <span>View Demo</span>
          </button>
        </div>

        {/* Countdown Timer */}
        <div
          className="max-w-sm mx-auto"
          style={{
            animation: "fadeInUp 0.7s ease forwards",
            animationDelay: "0.75s",
            opacity: 0,
          }}>
          <CountdownTimer />
        </div>

        {/* Mini social proof strip */}
        <div
          className="flex items-center justify-center flex-wrap gap-6 mt-8"
          style={{
            animation: "fadeInUp 0.7s ease forwards",
            animationDelay: "0.9s",
            opacity: 0,
          }}>
          {[
            { icon: "🔒", label: "SSL Secured" },
            { icon: "⚡", label: "Instant Payout" },
            { icon: "🏅", label: "5★ Rated" },
            { icon: "🌍", label: "24/7 Support" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-1.5 text-gray-400 text-sm">
              <span>{item.icon}</span>
              <span className="font-body">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div
          className="mt-14 flex flex-col items-center gap-1 opacity-40"
          style={{
            animation: "fadeIn 1s ease forwards",
            animationDelay: "1.2s",
          }}>
          <span className="text-xs tracking-widest uppercase text-gray-500 font-body">
            Scroll
          </span>
          <div className="w-5 h-8 rounded-full border border-gray-600 flex items-start justify-center pt-1.5">
            <div
              className="w-1 h-2 rounded-full bg-purple-400"
              style={{ animation: "bounce 1.8s ease-in-out infinite" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
