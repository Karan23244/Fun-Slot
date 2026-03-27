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
import { useNavigate } from "react-router-dom";
import "./App.css";
const apiUrl = process.env.REACT_APP_API_URL;
function Home() {
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [appVisible, setAppVisible] = useState(false);

  const navigate = useNavigate();

  const handleModalClose = useCallback(() => {
    setModalOpen(false);
    navigate("/home");
  }, [navigate]);
  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
    // Small delay to let loading screen fade out, then fade in app
    setTimeout(() => setAppVisible(true), 100);
  }, []);

  const handleStartNow = useCallback(() => {
    setModalOpen(true);
  }, []);
  return (
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
              Gambling can be addictive. Please play responsibly and seek help
              if you feel you are losing control. Support is available 24/7 from
              trusted organizations.
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
  );
}

export default Home;
// import { useEffect, useState } from "react";
// import Modal from "react-modal";
// import { getFingerprint } from "./utils/fingerprint";
// import { ShoppingBag, Mail, Instagram, Facebook, Twitter } from "lucide-react";

// // Required for accessibility
// Modal.setAppElement("#root");

// function App() {
//   const [showPopup, setShowPopup] = useState(false);
//   const [botStatus, setBotStatus] = useState(null);
//   const [email, setEmail] = useState("");

//   useEffect(() => {
//     const checkBot = async () => {
//       const checks = {
//         userAgent: navigator.userAgent,
//         webdriver: navigator.webdriver,
//         pluginsLength: navigator.plugins.length,
//         languages: navigator.languages,
//       };

//       const behavior = { movedMouse: false, scrolled: false };

//       const onMouseMove = () => (behavior.movedMouse = true);
//       const onScroll = () => (behavior.scrolled = true);

//       document.addEventListener("mousemove", onMouseMove);
//       document.addEventListener("scroll", onScroll);

//       await new Promise((res) => setTimeout(res, 3000));

//       document.removeEventListener("mousemove", onMouseMove);
//       document.removeEventListener("scroll", onScroll);

//       const res = await fetch("http://localhost:4000/check-bot", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ checks, behavior }),
//       });

//       if (!res.ok) {
//         const errorText = await res.text();
//         console.error(`Server error (${res.status}):`, errorText);
//         return; // Stop further execution
//       }

//       const data = await res.json();
//       console.log("Bot check:", data);

//       if (data.isBot) {
//         if (data.isGoogleBot) {
//           console.log("✅ Googlebot detected. Staying on same page.");
//         } else {
//           console.log("⚠️ Bot detected. Redirecting...");
//           setBotStatus("bot");
//           window.location.href = "/";
//         }
//       } else {
//         console.log("🎉 Real user detected. Showing popup...");
//         setBotStatus("real");
//         setShowPopup(true);
//       }
//     };

//     checkBot();
//   }, []);

//   const handleConfirm = () => {
//     setShowPopup(false);
//     window.location.href = "/fake.html";
//   };

//   const handleCancel = () => {
//     setShowPopup(false);
//     alert("You must be 18+ to continue.");
//   };

//   return (
//     <div style={{ textAlign: "center", padding: "50px" }}>
//       {/* Home Page Content */}
//       <div className="font-sans">
//       {/* Navbar */}
//       <header className="fixed top-0 w-full bg-white shadow z-50">
//         <div className="container mx-auto flex justify-between items-center px-6 py-4">
//           <h1 className="text-2xl font-bold tracking-wide text-gray-900">MistSpecs</h1>
//           <nav className="hidden md:flex space-x-6 text-gray-700">
//             <a href="#men" className="hover:text-black">Men</a>
//             <a href="#women" className="hover:text-black">Women</a>
//             <a href="#kids" className="hover:text-black">Kids</a>
//             <a href="#sunglasses" className="hover:text-black">Sunglasses</a>
//             <a href="#contactlenses" className="hover:text-black">Contact Lenses</a>
//           </nav>
//           <button className="relative">
//             <ShoppingBag className="w-6 h-6" />
//             <span className="absolute -top-2 -right-2 bg-black text-white text-xs px-1 rounded-full">2</span>
//           </button>
//         </div>
//       </header>

//       {/* Hero */}
//       <section className="pt-28 bg-gray-100">
//         <div className="container mx-auto px-6 py-16 text-center">
//           <h2 className="text-5xl font-bold text-gray-900 mb-4">Find Your Perfect Pair</h2>
//           <p className="text-lg text-gray-600 mb-6">
//             Premium Eyewear for Everyone. Explore 5000+ Styles Online.
//           </p>
//           <button className="bg-black text-white px-6 py-3 rounded-full text-lg hover:bg-gray-800">
//             Shop Now
//           </button>
//         </div>
//       </section>

//       {/* Categories */}
//       <section id="categories" className="container mx-auto px-6 py-16">
//         <h3 className="text-3xl font-bold text-center mb-10">Shop by Category</h3>
//         <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
//           {["Men", "Women", "Kids", "Sunglasses", "Contact Lenses"].map((cat) => (
//             <div
//               key={cat}
//               className="bg-gray-200 rounded-2xl h-48 flex items-end justify-center hover:scale-105 transition cursor-pointer"
//               style={{
//                 backgroundImage: `url(https://source.unsplash.com/300x300/?${cat},glasses)`,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//               }}
//             >
//               <span className="bg-white bg-opacity-80 text-gray-900 px-4 py-2 rounded-t-lg font-semibold">{cat}</span>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Best Sellers */}
//       <section className="bg-gray-50 py-16">
//         <div className="container mx-auto px-6">
//           <h3 className="text-3xl font-bold text-center mb-10">Best Sellers</h3>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             {[1, 2, 3, 4].map((i) => (
//               <div key={i} className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4">
//                 <img
//                   src={`https://source.unsplash.com/300x200/?glasses,${i}`}
//                   alt="Glasses"
//                   className="rounded-xl mb-3"
//                 />
//                 <h4 className="font-semibold">Stylish Frame {i}</h4>
//                 <p className="text-gray-500 text-sm">₹1999</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Why Choose */}
//       <section className="container mx-auto px-6 py-16">
//         <h3 className="text-3xl font-bold text-center mb-10">Why Choose MistSpecs</h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
//           {[
//             { title: "Free Eye Test", desc: "Book online & get free eye checkups." },
//             { title: "Free Home Trial", desc: "Try 5 frames at home for free." },
//             { title: "Fast Delivery", desc: "Your specs at your doorstep in 48h." },
//           ].map((item, idx) => (
//             <div key={idx} className="bg-gray-100 p-8 rounded-2xl shadow">
//               <h4 className="font-semibold text-xl mb-2">{item.title}</h4>
//               <p className="text-gray-600">{item.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Newsletter */}
//       <section className="bg-black text-white py-16">
//         <div className="container mx-auto px-6 text-center">
//           <h3 className="text-3xl font-bold mb-4">Stay in Style</h3>
//           <p className="text-gray-300 mb-6">
//             Get exclusive offers & latest collection updates straight to your inbox
//           </p>
//           <form
//             onSubmit={(e) => {
//               e.preventDefault();
//               alert(`Subscribed with ${email}`);
//             }}
//             className="flex flex-col md:flex-row justify-center max-w-md mx-auto"
//           >
//             <input
//               type="email"
//               required
//               placeholder="Enter your email"
//               className="flex-1 px-4 py-3 text-black rounded-l-full focus:outline-none"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <button className="bg-white text-black px-6 py-3 rounded-r-full hover:bg-gray-200">
//               <Mail className="w-5 h-5 inline-block mr-1" /> Subscribe
//             </button>
//           </form>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-gray-300 py-12">
//         <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
//           <div>
//             <h4 className="text-xl font-bold text-white mb-3">MistSpecs</h4>
//             <p>See the world clearly. Fashionable eyewear for everyone.</p>
//           </div>
//           <div>
//             <h5 className="text-white font-semibold mb-3">Quick Links</h5>
//             <ul className="space-y-2">
//               <li>About Us</li>
//               <li>Shipping</li>
//               <li>Returns</li>
//               <li>Contact</li>
//             </ul>
//           </div>
//           <div>
//             <h5 className="text-white font-semibold mb-3">Customer Care</h5>
//             <ul className="space-y-2">
//               <li>FAQ</li>
//               <li>Track Order</li>
//               <li>Size Guide</li>
//               <li>Support</li>
//             </ul>
//           </div>
//           <div>
//             <h5 className="text-white font-semibold mb-3">Follow Us</h5>
//             <div className="flex space-x-4">
//               <Instagram className="w-6 h-6 hover:text-white cursor-pointer" />
//               <Facebook className="w-6 h-6 hover:text-white cursor-pointer" />
//               <Twitter className="w-6 h-6 hover:text-white cursor-pointer" />
//             </div>
//           </div>
//         </div>
//         <div className="text-center mt-10 text-gray-500 text-sm">
//           © {new Date().getFullYear()} MistSpecs. All rights reserved.
//         </div>
//       </footer>
//     </div>

//       {/* 18+ Popup */}
//       <Modal
//         isOpen={showPopup}
//         onRequestClose={handleCancel}
//         style={{
//           overlay: {
//             backgroundColor: "rgba(0, 0, 0, 0.7)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           },
//           content: {
//             inset: "unset",
//             width: "400px",
//             padding: "20px",
//             borderRadius: "10px",
//             background: "#fff",
//             margin: "auto",
//             textAlign: "center",
//           },
//         }}
//       >
//         <h2 style={{ fontSize: "1.5rem", marginBottom: "15px" }}>Are you 18+?</h2>
//         <p style={{ marginBottom: "20px", color: "#555" }}>
//           You must be at least 18 years old to continue.
//         </p>
//         <div style={{ display: "flex", justifyContent: "space-around" }}>
//           <button
//             onClick={handleConfirm}
//             style={{
//               background: "#007bff",
//               color: "#fff",
//               padding: "10px 20px",
//               border: "none",
//               borderRadius: "5px",
//               cursor: "pointer",
//             }}
//           >
//             Yes
//           </button>
//           <button
//             onClick={handleCancel}
//             style={{
//               background: "#ddd",
//               color: "#333",
//               padding: "10px 20px",
//               border: "none",
//               borderRadius: "5px",
//               cursor: "pointer",
//             }}
//           >
//             No
//           </button>
//         </div>
//       </Modal>
//     </div>
//   );
// }

// export default App;
