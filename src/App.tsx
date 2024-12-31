import { useState, useEffect } from "react";
import { Sparkle, Stars, Github, Instagram } from "lucide-react";
import { FaTiktok } from "react-icons/fa6";

const phrases = [
  "Counting down to an amazing new beginning...",
  "Get ready for a fresh start...",
  "New adventures await...",
  "Time to celebrate what's ahead...",
  "Moments away from a new chapter...",
];

const NewYearCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [showFireworks, setShowFireworks] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [audio] = useState(new Audio("/countdown.mp3"));

  useEffect(() => {
    const phraseInterval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(phraseInterval);
  }, []);

  useEffect(() => {
    const targetDate = new Date("2025-01-01T00:00:00");

    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      if (difference <= 0) {
        setShowFireworks(true);
        audio.play();
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [audio]);

  return (
    <div className="min-h-screen bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-blue-900 via-black to-purple-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <Stars
            key={i}
            className="absolute text-white opacity-20 transition-opacity duration-1000 ease-in-out animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: "3s",
              transform: `scale(${0.5 + Math.random()})`,
            }}
          />
        ))}
      </div>

      {!showFireworks ? (
        <div className="text-center z-10 w-full max-w-6xl px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6 md:mb-8 animate-text">
            New Year Countdown
          </h1>

          <div className="text-lg md:text-xl text-white opacity-80 mb-8 md:mb-12 animate-fade-in-out min-h-[2rem]">
            {phrases[currentPhrase]}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-12">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div
                key={unit}
                className="bg-white bg-opacity-10 backdrop-blur-lg p-4 md:p-8 rounded-2xl shadow-xl hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-3xl md:text-5xl font-mono bg-gradient-to-r from-cyan-400 to-blue-600 text-transparent bg-clip-text">
                  {value.toString().padStart(2, "0")}
                </div>
                <div className="text-gray-300 mt-2 md:mt-4 text-base md:text-lg capitalize">
                  {unit}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 mb-8 animate-bounce">
            Happy New Year 2025!
          </h1>
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(30)].map((_, i) => (
              <Sparkle
                key={i}
                className="absolute animate-ping text-yellow-400"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random() * 2}s`,
                  transform: `scale(${1 + Math.random() * 2})`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      <footer className="fixed bottom-0 w-full bg-black bg-opacity-30 backdrop-blur-sm py-4 px-6 flex flex-col md:flex-row justify-between items-center z-20">
        <div className="text-white text-sm md:text-base mb-4 md:mb-0">
          Built with ❤️ by Onario
        </div>
        <div className="flex gap-6">
          <a
            href="https://github.com/Onario747"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-purple-400 transition-colors"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://instagram.com/onario747"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-pink-400 transition-colors"
          >
            <Instagram className="w-6 h-6" />
          </a>
          <a
            href="https://tiktok.com/@onariolovescoding"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-400 transition-colors"
          >
            <FaTiktok className="w-6 h-6" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default NewYearCountdown;
