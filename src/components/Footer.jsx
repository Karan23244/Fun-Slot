import React from "react";
import { Link } from "react-router-dom";


const Footer = ({ onStartNow }) => {

  return (
    <footer
      className="relative py-12 px-4 overflow-hidden"
      style={{
        background: "#04010D",
        borderTop: "1px solid rgba(124,58,237,0.1)",
      }}>
      <div className="noise-overlay opacity-20" />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-10">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-3">
              <img
                src="/logo.svg"
                alt="1XBET"
                className="h-5 hidden sm:block"
              />
            </div>
            <p className="text-gray-500 text-sm font-body leading-relaxed">
              The most trusted premium betting platform. Fast, secure, and
              rewarding.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 text-sm">
            {/* Platform */}
            <div>
              <h4 className="text-white font-semibold mb-3 font-body">
                Platform
              </h4>
              <ul className="space-y-2 text-gray-500">
                {[
                  "Sports Betting",
                  "Live Casino",
                  "Promotions",
                  "VIP Club",
                ].map((l) => (
                  <li key={l}>
                    <button
                      className="hover:text-purple-300 transition-colors">
                      {l}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-white font-semibold mb-3 font-body">
                Support
              </h4>
              <ul className="space-y-2 text-gray-500">
                <li>
                  <button
                    className="hover:text-purple-300 transition-colors">
                    Help Center
                  </button>
                </li>

                <li>
                  <button
                    className="hover:text-purple-300 transition-colors">
                    Responsible Gaming
                  </button>
                </li>

                {/* Internal Routes */}
                <li>
                  <Link
                    to="/policy"
                    className="hover:text-purple-300 transition-colors">
                    Privacy Policy
                  </Link>
                </li>

                <li>
                  <Link
                    to="/terms"
                    className="hover:text-purple-300 transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-3">
            <button
              className="btn-primary text-sm py-3 px-6">
              <span className="relative z-10">🚀 Get Started</span>
            </button>

            <div className="flex items-center gap-2 justify-center">
              {["🔒", "✅", "🏅"].map((icon) => (
                <span key={icon} className="text-lg">
                  {icon}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-gray-600 text-xs font-body">
          <p>© 2025 FunSlot. All rights reserved.</p>

          <p className="text-center">
            ⚠️ 18+ only. Gambling can be addictive. Play responsibly.
          </p>

          <button
            className="hover:text-purple-400 transition-colors">
            Licensed & Regulated
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
