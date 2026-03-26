import React, { useEffect, useState } from "react";

const Navbar = ({ onStartNow }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Reviews", href: "#social-proof" },
    { label: "Bonus", href: "#bonus" },
  ];

  return (
    <>
      {/* 🔥 Main Navbar */}
      <nav
        className="fixed left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(6,2,15,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(124,58,237,0.15)" : "none",
        }}>
        {/* 🔥 Top Header */}
        <div className="w-full text-gray-300 text-xs sm:text-sm py-4 px-28 flex items-center justify-between border-b border-purple-900/30">
          {/* Left: Logo + Contact */}
          {/* Left: 18+ Badge */}
          <div className="flex items-center gap-2">
            {/* Circle Badge */}
            <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-red-500 text-red-500 font-bold text-sm">
              18+
            </div>

            {/* Text */}
            <span className="text-3xl text-gray-300 font-medium tracking-wide">
              Adults Only
            </span>
          </div>
          <div className="flex flex-row items-center gap-3">
            <a
              href="https://www.begambleaware.org/"
              target="_blank"
              rel="noopener noreferrer">
              <img src="/aware2.png" alt="BeGambleAware" className="h-8" />
            </a>

            <a
              href="https://www.gamcare.org.uk/"
              target="_blank"
              rel="noopener noreferrer">
              <img src="/Aware.png" alt="GamCare" className="h-8" />
            </a>
          </div>

          {/* Right: 18+ */}
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img
                src="/logo.svg"
                alt="1XBET"
                className="h-5 hidden sm:block"
              />
            </div>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-400 hover:text-white text-sm font-medium transition-colors duration-200 hover:text-purple-300">
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => {
                  console.log("[Analytics] Navbar Start Now clicked");
                  onStartNow();
                }}
                className="btn-primary py-2.5 px-5 text-sm">
                <span className="relative z-10">Start Now 🚀</span>
              </button>
            </div>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-gray-300 hover:text-white transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu">
              <div className="space-y-1.5">
                <span
                  className={`block w-6 h-0.5 bg-current transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
                />
                <span
                  className={`block w-6 h-0.5 bg-current transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`block w-6 h-0.5 bg-current transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className="md:hidden transition-all duration-300 overflow-hidden"
          style={{
            maxHeight: mobileOpen ? "300px" : "0",
            background: "rgba(6,2,15,0.95)",
            backdropFilter: "blur(20px)",
          }}>
          <div className="px-4 py-4 space-y-2 border-t border-purple-900/30">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block py-2 px-3 text-gray-300 hover:text-white rounded-lg hover:bg-purple-900/20 transition-all"
                onClick={() => setMobileOpen(false)}>
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                console.log("[Analytics] Mobile Navbar Start Now clicked");
                onStartNow();
                setMobileOpen(false);
              }}
              className="btn-primary w-full mt-2">
              <span className="relative z-10">Start Now 🚀</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
