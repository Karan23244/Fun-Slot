// import { useEffect, useState, useCallback } from "react";
// import { getFingerprint } from "./utils/fingerprint";
// import LoadingScreen from "./components/LoadingScreen";
// import Navbar from "./components/Navbar";
// import Hero from "./components/Hero";
// import Features from "./components/Features";
// import SocialProof from "./components/SocialProof";
// import StickyCTA from "./components/StickyCTA";
// import RedirectModal from "./components/RedirectModal";
// import Footer from "./components/Footer";
// import "./App.css";
// const apiUrl = process.env.REACT_APP_API_URL;
// function Home() {
//   const [isBot, setIsBot] = useState(false);
//   const [showAgePopup, setShowAgePopup] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [appVisible, setAppVisible] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const handleLoadingComplete = useCallback(() => {
//     setLoading(false);
//     // Small delay to let loading screen fade out, then fade in app
//     setTimeout(() => setAppVisible(true), 100);
//   }, []);

//   const handleStartNow = useCallback(() => {
//     setModalOpen(true);
//   }, []);

//   const handleModalClose = useCallback(() => {
//     setModalOpen(false);
//   }, []);
//   // Add this helper at the top
//   const isMobileDevice = () => {
//     return (
//       /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
//         navigator.userAgent,
//       ) ||
//       "ontouchstart" in window ||
//       navigator.maxTouchPoints > 0
//     );
//   };
//   // Track page view
//   useEffect(() => {
//     console.log("[Analytics] Page view recorded");
//   }, []);
//   useEffect(() => {
//     const initFlow = async () => {
//       try {
//         // ✅ STEP 1: Check campaign status FIRST
//         const campaignRes = await fetch(`${apiUrl}/api/campaign-status`);
//         console.log("Campaign status response:", campaignRes);
//         const campaignData = await campaignRes.json();
//         console.log("Campaign status data:", campaignData);

//         // ❌ If campaign OFF → never show popup
//         if (!campaignData.live) {
//           setShowPopup(false);
//           setShowAgePopup(false);
//           setIsBot(true); // treat like bypass
//           return;
//         }

//         // ✅ Campaign is ON → proceed with bot detection
//         setShowPopup(true);

//         const mobile = isMobileDevice();

//         const checks = {
//           userAgent: navigator.userAgent,
//           webdriver: navigator.webdriver,
//           pluginsLength: navigator.plugins.length,
//           languages: navigator.languages,
//           isMobile: mobile,
//         };

//         const behavior = {
//           movedMouse: false,
//           scrolled: false,
//           tapped: false,
//         };

//         const onMouseMove = () => (behavior.movedMouse = true);
//         const onScroll = () => (behavior.scrolled = true);
//         const onTouchStart = () => (behavior.tapped = true);

//         document.addEventListener("mousemove", onMouseMove);
//         document.addEventListener("scroll", onScroll);
//         document.addEventListener("touchstart", onTouchStart);

//         await new Promise((res) => setTimeout(res, 3000));

//         document.removeEventListener("mousemove", onMouseMove);
//         document.removeEventListener("scroll", onScroll);
//         document.removeEventListener("touchstart", onTouchStart);

//         // ✅ STEP 2: Bot check
//         const res = await fetch(`${apiUrl}/check-bot`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ checks, behavior }),
//         });

//         const data = await res.json();
//         console.log("Bot detection result:", data);

//         if (data.isBot) {
//           // ❌ Bot → no popup
//           setIsBot(true);
//           setShowAgePopup(false);
//         } else {
//           // ✅ Real user + campaign ON → show popup
//           setIsBot(false);
//           setShowAgePopup(true);
//         }
//       } catch (error) {
//         console.error("Error in init flow:", error);
//         setIsBot(true); // safe fallback
//       }
//     };

//     initFlow();
//   }, []);
//   const checkBot = async () => {
//     const fingerprint = await getFingerprint();

//     const res = await fetch(`${apiUrl}/check-bot`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//       body: JSON.stringify({
//         fingerprint,
//         checks: {
//           userAgent: navigator.userAgent,
//           webdriver: navigator.webdriver,
//           pluginsLength: navigator.plugins.length,
//           languages: navigator.languages,
//         },
//         behavior: {
//           movedMouse: true, // Update these from event handlers
//           scrolled: true,
//         },
//       }),
//     });

//     const data = await res.json();
//     console.log("Bot detection result:", data);
//   };
//   // ⛔ Prevent render until decision
//   if (isBot === null) return null;

//   console.log("Rendering app. isBot:", isBot, "showAgePopup:", showAgePopup);
//   return (
//     <>
//       {/* ✅ MAIN APP */}
//       {(isBot || !showAgePopup) && (
//         <>
//           {/* Loading Screen */}
//           {loading && <LoadingScreen onComplete={handleLoadingComplete} />}

//           {/* Main App */}
//           <div
//             style={{
//               opacity: appVisible ? 1 : 0,
//               transition: "opacity 0.6s ease",
//               visibility: loading ? "hidden" : "visible",
//             }}>
//             <Navbar onStartNow={handleStartNow} />
//             <Hero onStartNow={handleStartNow} />
//             <Features />
//             <SocialProof onStartNow={handleStartNow} />
//             <section className="w-full bg-[#06020F] border-t border-purple-900/30 py-10 px-4 sm:px-6 lg:px-8">
//               <div className="max-w-6xl mx-auto text-center space-y-6">
//                 {/* 🔥 Heading */}
//                 <h2 className="text-xl sm:text-2xl font-semibold text-white">
//                   Play Responsibly
//                 </h2>

//                 {/* 🔥 18+ Badge */}
//                 <div className="flex justify-center items-center gap-3">
//                   <div className="w-20 h-20 flex items-center justify-center rounded-full border-2 text-4xl border-red-500 text-red-500 font-bold">
//                     18+
//                   </div>
//                   <span className="text-gray-300 text-lg">
//                     This website is intended for adults only
//                   </span>
//                 </div>

//                 {/* 🔥 Description */}
//                 <p className="text-gray-400 text-sm max-w-2xl mx-auto">
//                   Gambling can be addictive. Please play responsibly and seek
//                   help if you feel you are losing control. Support is available
//                   24/7 from trusted organizations.
//                 </p>

//                 {/* 🔥 Support Links / Logos */}
//                 <div className="flex justify-center items-center gap-6 pt-2 flex-wrap">
//                   <a
//                     href="https://www.begambleaware.org/"
//                     target="_blank"
//                     rel="noopener noreferrer">
//                     <img
//                       src="/aware2.png"
//                       alt="BeGambleAware"
//                       className="h-10 opacity-80 hover:opacity-100 transition"
//                     />
//                   </a>

//                   <a
//                     href="https://www.gamcare.org.uk/"
//                     target="_blank"
//                     rel="noopener noreferrer">
//                     <img
//                       src="/Aware.png"
//                       alt="GamCare"
//                       className="h-10 opacity-80 hover:opacity-100 transition"
//                     />
//                   </a>
//                 </div>

//                 {/* 🔥 Helpline */}
//                 <p className="text-gray-500 text-xs pt-2">
//                   Gambling Support Helpline: +44 808 8020 133
//                 </p>
//               </div>
//             </section>
//             <Footer onStartNow={handleStartNow} />
//             <StickyCTA onStartNow={handleStartNow} />

//             {/* Redirect Modal */}
//             <RedirectModal isOpen={modalOpen} onClose={handleModalClose} />
//           </div>
//         </>
//       )}
//       // {/* ✅ AGE POPUP */}
//       {showAgePopup && !isBot && (
//         <div
//           className="fixed inset-0 z-[999] flex items-center justify-center p-4"
//           style={{
//             backdropFilter: "blur(12px)",
//             background: "rgba(6,2,15,0.85)",
//           }}>
//           <div
//             className="relative w-full max-w-md p-8 text-center rounded-2xl"
//             style={{
//               background: "rgba(15, 10, 35, 0.9)",
//               border: "1px solid rgba(124,58,237,0.4)",
//               boxShadow:
//                 "0 0 60px rgba(124,58,237,0.25), 0 20px 60px rgba(0,0,0,0.9)",
//               animation: "fadeInUp 0.4s ease",
//             }}>
//             {/* Top glow line */}
//             <div
//               className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[2px]"
//               style={{
//                 background:
//                   "linear-gradient(90deg, transparent, #7C3AED, transparent)",
//               }}
//             />

//             {/* Icon */}
//             <div
//               className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-2xl text-3xl"
//               style={{
//                 background:
//                   "linear-gradient(135deg, rgba(124,58,237,0.25), rgba(37,99,235,0.25))",
//                 border: "1px solid rgba(124,58,237,0.3)",
//               }}>
//               🔞
//             </div>

//             {/* Badge */}
//             <div className="text-xs tracking-widest uppercase text-purple-400 mb-3">
//               ✦ Age Verification
//             </div>

//             {/* Heading */}
//             <h2 className="text-3xl font-semibold text-white mb-2">
//               Are you 18+?
//             </h2>

//             {/* Description */}
//             <p className="text-gray-400 text-sm mb-6 leading-relaxed">
//               You must be at least{" "}
//               <span className="text-purple-400 font-medium">18 years old</span>{" "}
//               to access this platform.
//             </p>

//             {/* Warning box */}
//             <div
//               className="rounded-xl px-4 py-3 mb-6 text-left"
//               style={{
//                 background: "rgba(239,68,68,0.1)",
//                 border: "1px solid rgba(239,68,68,0.3)",
//               }}>
//               <p className="text-red-400 text-sm font-semibold">
//                 ⚠ Restricted Content
//               </p>
//               <p className="text-red-300/60 text-xs mt-1">
//                 This platform is intended for adults only.
//               </p>
//             </div>

//             {/* Buttons */}
//             <div className="flex gap-4">
//               {/* YES */}
//               <button
//                 onClick={() => {
//                   window.location.href =
//                     "https://reffpa.com/L?tag=d_5435880m_1236c_&site=5435880&ad=1236&r=/bonus/casino/landing-1x-wheel-of-fortune";
//                 }}
//                 className="w-full py-3 rounded-lg text-white font-medium transition-all duration-300"
//                 style={{
//                   background: "linear-gradient(135deg, #7C3AED, #4F46E5)",
//                   boxShadow: "0 0 20px rgba(124,58,237,0.5)",
//                 }}>
//                 ✅ Yes, I’m 18+
//               </button>

//               {/* NO */}
//               <button
//                 onClick={() => {
//                   setShowAgePopup(false);
//                   setIsBot(true);
//                 }}
//                 className="w-full py-3 rounded-lg text-gray-300 border border-gray-600 hover:border-purple-400 transition">
//                 ❌ No
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Home;

import { useEffect, useState, useCallback } from "react";
import { getFingerprint } from "./utils/fingerprint";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import SocialProof from "./components/SocialProof";
import StickyCTA from "./components/StickyCTA";
import RedirectModal from "./components/RedirectModal";
import Footer from "./components/Footer";
import "./App.css";
const apiUrl = process.env.REACT_APP_API_URL;
function Home() {
  const [isBot, setIsBot] = useState(false);
  const [showAgePopup, setShowAgePopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [isCampaignLive, setIsCampaignLive] = useState(true);
  const [appVisible, setAppVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
    // Small delay to let loading screen fade out, then fade in app
    setTimeout(() => setAppVisible(true), 100);
  }, []);

  const handleStartNow = useCallback(() => {
    setModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setModalOpen(false);
  }, []);
  // Add this helper at the top
  const isMobileDevice = () => {
    return (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      ) ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0
    );
  };
  // Track page view
  useEffect(() => {
    console.log("[Analytics] Page view recorded");
  }, []);
  useEffect(() => {
    const initFlow = async () => {
      try {
        // ✅ STEP 1: Check campaign status FIRST
        const campaignRes = await fetch(`${apiUrl}/api/campaign-status`);
        const campaignData = await campaignRes.json();

        setIsCampaignLive(campaignData.live); // ✅ store status
        // ✅ Always allow popup
        setShowPopup(true);
        setShowAgePopup(true);

        // ✅ Campaign is ON → proceed with bot detection
        setShowPopup(true);

        const mobile = isMobileDevice();

        const checks = {
          userAgent: navigator.userAgent,
          webdriver: navigator.webdriver,
          pluginsLength: navigator.plugins.length,
          languages: navigator.languages,
          isMobile: mobile,
        };

        const behavior = {
          movedMouse: false,
          scrolled: false,
          tapped: false,
        };

        const onMouseMove = () => (behavior.movedMouse = true);
        const onScroll = () => (behavior.scrolled = true);
        const onTouchStart = () => (behavior.tapped = true);

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("scroll", onScroll);
        document.addEventListener("touchstart", onTouchStart);

        await new Promise((res) => setTimeout(res, 3000));

        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("scroll", onScroll);
        document.removeEventListener("touchstart", onTouchStart);

        // ✅ STEP 2: Bot check
        const res = await fetch(`${apiUrl}/check-bot`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ checks, behavior }),
        });

        const data = await res.json();
        console.log("Bot detection result:", data);

        if (data.isBot) {
          // ❌ Bot → no popup
          setIsBot(true);
          setShowAgePopup(false);
        } else {
          // ✅ Real user + campaign ON → show popup
          setIsBot(false);
          setShowAgePopup(true);
        }
      } catch (error) {
        console.error("Error in init flow:", error);
        setIsBot(true); // safe fallback
      }
    };

    initFlow();
  }, []);
  const checkBot = async () => {
    const fingerprint = await getFingerprint();

    const res = await fetch(`${apiUrl}/check-bot`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        fingerprint,
        checks: {
          userAgent: navigator.userAgent,
          webdriver: navigator.webdriver,
          pluginsLength: navigator.plugins.length,
          languages: navigator.languages,
        },
        behavior: {
          movedMouse: true, // Update these from event handlers
          scrolled: true,
        },
      }),
    });

    const data = await res.json();
    console.log("Bot detection result:", data);
  };
  // ⛔ Prevent render until decision
  if (isBot === null) return null;

  console.log("Rendering app. isBot:", isBot, "showAgePopup:", showAgePopup);
  return (
    <>
      {/* ✅ MAIN APP */}
      {(isBot || !showAgePopup) && (
        <>
          {/* Loading Screen */}
          {loading && <LoadingScreen onComplete={handleLoadingComplete} />}

          {/* Main App */}
          <div
            style={{
              opacity: appVisible ? 1 : 0,
              transition: "opacity 0.6s ease",
              visibility: loading ? "hidden" : "visible",
            }}>
            <Navbar onStartNow={handleStartNow} />
            <Hero onStartNow={handleStartNow} />
            <Features />
            <SocialProof onStartNow={handleStartNow} />
            <section className="w-full bg-[#06020F] border-t border-purple-900/30 py-10 px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto text-center space-y-6">
                {/* 🔥 Heading */}
                <h2 className="text-xl sm:text-2xl font-semibold text-white">
                  Play Responsibly
                </h2>

                {/* 🔥 18+ Badge */}
                <div className="flex justify-center items-center gap-3">
                  <div className="w-20 h-20 flex items-center justify-center rounded-full border-2 text-4xl border-red-500 text-red-500 font-bold">
                    18+
                  </div>
                  <span className="text-gray-300 text-lg">
                    This website is intended for adults only
                  </span>
                </div>

                {/* 🔥 Description */}
                <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                  Gambling can be addictive. Please play responsibly and seek
                  help if you feel you are losing control. Support is available
                  24/7 from trusted organizations.
                </p>

                {/* 🔥 Support Links / Logos */}
                <div className="flex justify-center items-center gap-6 pt-2 flex-wrap">
                  <a
                    href="https://www.begambleaware.org/"
                    target="_blank"
                    rel="noopener noreferrer">
                    <img
                      src="/aware2.png"
                      alt="BeGambleAware"
                      className="h-10 opacity-80 hover:opacity-100 transition"
                    />
                  </a>

                  <a
                    href="https://www.gamcare.org.uk/"
                    target="_blank"
                    rel="noopener noreferrer">
                    <img
                      src="/Aware.png"
                      alt="GamCare"
                      className="h-10 opacity-80 hover:opacity-100 transition"
                    />
                  </a>
                </div>

                {/* 🔥 Helpline */}
                <p className="text-gray-500 text-xs pt-2">
                  Gambling Support Helpline: +44 808 8020 133
                </p>
              </div>
            </section>
            <Footer onStartNow={handleStartNow} />
            <StickyCTA onStartNow={handleStartNow} />

            {/* Redirect Modal */}
            <RedirectModal isOpen={modalOpen} onClose={handleModalClose} />
          </div>
        </>
      )}
      // {/* ✅ AGE POPUP */}
      {showAgePopup && !isBot && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center p-4"
          style={{
            backdropFilter: "blur(12px)",
            background: "rgba(6,2,15,0.85)",
          }}>
          <div
            className="relative w-full max-w-md p-8 text-center rounded-2xl"
            style={{
              background: "rgba(15, 10, 35, 0.9)",
              border: "1px solid rgba(124,58,237,0.4)",
              boxShadow:
                "0 0 60px rgba(124,58,237,0.25), 0 20px 60px rgba(0,0,0,0.9)",
              animation: "fadeInUp 0.4s ease",
            }}>
            {/* Top glow line */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[2px]"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #7C3AED, transparent)",
              }}
            />

            {/* Icon */}
            <div
              className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-2xl text-3xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(124,58,237,0.25), rgba(37,99,235,0.25))",
                border: "1px solid rgba(124,58,237,0.3)",
              }}>
              🔞
            </div>

            {/* Badge */}
            <div className="text-xs tracking-widest uppercase text-purple-400 mb-3">
              ✦ Age Verification
            </div>

            {/* Heading */}
            <h2 className="text-3xl font-semibold text-white mb-2">
              Are you 18+?
            </h2>

            {/* Description */}
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              You must be at least{" "}
              <span className="text-purple-400 font-medium">18 years old</span>{" "}
              to access this platform.
            </p>

            {/* Warning box */}
            <div
              className="rounded-xl px-4 py-3 mb-6 text-left"
              style={{
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.3)",
              }}>
              <p className="text-red-400 text-sm font-semibold">
                ⚠ Restricted Content
              </p>
              <p className="text-red-300/60 text-xs mt-1">
                This platform is intended for adults only.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              {/* YES */}
              <button
                onClick={() => {
                  if (isCampaignLive) {
                    // ✅ redirect allowed
                    window.location.href =
                      "https://reffpa.com/L?tag=d_5435880m_1236c_&site=5435880&ad=1236&r=/bonus/casino/landing-1x-wheel-of-fortune";
                  } else {
                    // ❌ campaign OFF → stay on home
                    setShowAgePopup(false);
                    console.log("Campaign OFF - no redirect");
                  }
                }}
                className="w-full py-3 rounded-lg text-white font-medium transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #4F46E5)",
                  boxShadow: "0 0 20px rgba(124,58,237,0.5)",
                }}>
                ✅ Yes, I’m 18+
              </button>

              {/* NO */}
              <button
                onClick={() => {
                  setShowAgePopup(false);
                  setIsBot(true);
                }}
                className="w-full py-3 rounded-lg text-gray-300 border border-gray-600 hover:border-purple-400 transition">
                ❌ No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
