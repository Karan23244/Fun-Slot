import { useState } from "react";

const symbols = ["🍒", "🍋", "🍊", "🍉", "⭐", "💎"];
const wheelRewards = [5, 10, 20, 0, 15, 30, 0, 50];

export default function CasinoFunZone() {
  // SLOT
  const [reels, setReels] = useState(["❓", "❓", "❓"]);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState("");

  // COINS
  const [coins, setCoins] = useState(100);

  // WHEEL
  const [wheelSpinning, setWheelSpinning] = useState(false);
  const [wheelResult, setWheelResult] = useState("");

  // SLOT GAME
  const spin = () => {
    if (spinning || coins < 10) return;

    setCoins((prev) => prev - 10);
    setSpinning(true);
    setResult("");

    let tempReels = ["", "", ""];

    const interval = setInterval(() => {
      tempReels = tempReels.map(
        () => symbols[Math.floor(Math.random() * symbols.length)],
      );
      setReels([...tempReels]);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);

      const finalReels = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
      ];

      setReels(finalReels);
      setSpinning(false);

      if (finalReels[0] === finalReels[1] && finalReels[1] === finalReels[2]) {
        setResult("🎉 JACKPOT! +50 coins");
        setCoins((prev) => prev + 50);
      } else if (
        finalReels[0] === finalReels[1] ||
        finalReels[1] === finalReels[2]
      ) {
        setResult("✨ Small Win! +20 coins");
        setCoins((prev) => prev + 20);
      } else {
        setResult("😢 Try Again!");
      }
    }, 2000);
  };

  // LUCKY WHEEL GAME
  const spinWheel = () => {
    if (wheelSpinning || coins < 5) return;

    setCoins((prev) => prev - 5);
    setWheelSpinning(true);
    setWheelResult("");

    setTimeout(() => {
      const reward =
        wheelRewards[Math.floor(Math.random() * wheelRewards.length)];

      if (reward > 0) {
        setWheelResult(`🎉 You won ${reward} coins!`);
        setCoins((prev) => prev + reward);
      } else {
        setWheelResult("😢 No luck, try again!");
      }

      setWheelSpinning(false);
    }, 2000);
  };

  return (
    <div className="text-white px-4 lg:py-20 py-5">
      {/* HEADER */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-bold text-[#7C3AED]">
          🎰 Casino Fun Zone
        </h1>
        <p className="text-gray-400 mt-2 text-sm md:text-base">
          Play for fun • No real money • Try your luck 🎮
        </p>
        <div className="mt-4 text-lg md:text-xl">
          🪙 Coins: <span className="text-[#7C3AED]">{coins}</span>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {/* SLOT MACHINE */}
        <div className="bg-gray-800 p-5 md:p-8 rounded-2xl shadow-xl text-center">
          <h2 className="text-xl md:text-2xl mb-4">🎰 Slot Machine</h2>

          <div className="flex justify-center gap-3 md:gap-4 mb-6">
            {reels.map((symbol, index) => (
              <div
                key={index}
                className={`w-16 h-16 md:w-24 md:h-24 flex items-center justify-center text-2xl md:text-4xl bg-black border-4 border-[#7C3AED] rounded-lg ${
                  spinning ? "animate-pulse" : ""
                }`}>
                {symbol}
              </div>
            ))}
          </div>

          <button
            onClick={spin}
            disabled={spinning || coins < 10}
            className={`px-6 md:px-8 py-2 md:py-3 rounded-lg font-bold transition ${
              spinning ? "bg-gray-500" : "bg-[#7C3AED] hover:bg-[#6D28D9]"
            }`}>
            {spinning ? "Spinning..." : "Spin (10 coins)"}
          </button>

          {result && <p className="mt-4 text-lg md:text-xl">{result}</p>}
        </div>

        {/* LUCKY WHEEL */}
        <div className="bg-gray-800 p-5 md:p-8 rounded-2xl shadow-xl text-center">
          <h2 className="text-xl md:text-2xl mb-4">🎯 Lucky Wheel</h2>

          {/* Wheel Visual */}
          <div
            className={`w-32 h-32 md:w-48 md:h-48 mx-auto mb-6 rounded-full border-4 border-[#7C3AED] flex items-center justify-center text-xl md:text-2xl ${
              wheelSpinning ? "animate-spin" : ""
            }`}>
            🎡
          </div>

          <button
            onClick={spinWheel}
            disabled={wheelSpinning || coins < 5}
            className={`px-6 md:px-8 py-2 md:py-3 rounded-lg font-bold transition ${
              wheelSpinning ? "bg-gray-500" : "bg-[#7C3AED] hover:bg-[#6D28D9]"
            }`}>
            {wheelSpinning ? "Spinning..." : "Spin (5 coins)"}
          </button>

          {wheelResult && (
            <p className="mt-4 text-lg md:text-xl">{wheelResult}</p>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center mt-10 text-gray-400 text-sm md:text-base">
        <p>🔥 Play smart! Try both games and maximize your coins.</p>
      </div>
    </div>
  );
}
