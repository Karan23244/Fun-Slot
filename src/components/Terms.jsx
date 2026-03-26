import React from "react";

const PolicyPage = () => {
  return (
    <div className="min-h-screen bg-[#06020F] text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">

          {/* Terms */}
          <div className="p-8 rounded-2xl border border-blue-500/30 bg-white/5 backdrop-blur-lg shadow-xl">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">
              Terms & Conditions
            </h2>
            <p className="text-sm text-gray-400 mb-6">Last Updated: 23/3/2026</p>

            <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
              <p>
                <strong>1. Acceptance</strong><br />
                By using this website, you agree to these terms.
              </p>

              <p>
                <strong>2. Use</strong><br />
                You agree to use the site legally.
              </p>

              <p>
                <strong>3. Third-Party Links</strong><br />
                We are not responsible for external websites.
              </p>

              <p>
                <strong>4. Affiliate Disclosure</strong><br />
                We may earn commissions through affiliate links.
              </p>

              <p>
                <strong>5. No Guarantee</strong><br />
                We do not guarantee accuracy of content.
              </p>

              <p>
                <strong>6. Liability</strong><br />
                We are not liable for damages.
              </p>

              <p>
                <strong>7. User Responsibility</strong><br />
                Users must verify information.
              </p>

              <p>
                <strong>8. Changes</strong><br />
                Terms may be updated anytime.
              </p>

              <p>
                <strong>9. Governing Law</strong><br />
                Governed by applicable laws.
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
