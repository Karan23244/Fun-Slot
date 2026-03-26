import React from "react";

const PolicyPage = () => {
  return (
    <div className="min-h-screen bg-[#06020F] text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">

          {/* Privacy Policy */}
          <div className="p-8 rounded-2xl border border-purple-500/30 bg-white/5 backdrop-blur-lg shadow-xl">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">
              Privacy Policy
            </h2>
            <p className="text-sm text-gray-400 mb-6">Last Updated: 23/3/2026   </p>

            <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
              <p>
                <strong>1. Information We Collect</strong><br />
                We may collect personal information such as your name, email address, phone number, IP address, device details, and browsing behavior.
              </p>

              <p>
                <strong>2. How We Use Your Information</strong><br />
                • Provide and improve services<br />
                • Respond to queries<br />
                • Send marketing communications<br />
                • Analyze user behavior
              </p>

              <p>
                <strong>3. Cookies & Tracking</strong><br />
                We use cookies and tracking technologies. You can disable them in browser settings.
              </p>

              <p>
                <strong>4. Third-Party Services</strong><br />
                We may share data with advertisers, analytics providers, and affiliate partners.
              </p>

              <p>
                <strong>5. Data Protection</strong><br />
                We use security measures, but no method is 100% secure.
              </p>

              <p>
                <strong>6. Your Rights</strong><br />
                • Access your data<br />
                • Request deletion<br />
                • Opt out of marketing
              </p>

              <p>
                <strong>7. Data Retention</strong><br />
                Data is retained only as necessary.
              </p>

              <p>
                <strong>8. Changes</strong><br />
                Policy may be updated anytime.
              </p>

              <p>
                <strong>9. Contact</strong><br />
                Email: [your email]
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-xs">
          © {new Date().getFullYear()} FunSlot. All rights reserved.
        </div>
      </div>
  );
};

export default PolicyPage;
