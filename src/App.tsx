/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

const quotes = [
  "Her eyes say everything words can't.",
  "Every glance at her is a gift I don't deserve",
  "Her beauty is unfair",
  "Sunsets are jealous of that glow",
  "She's the light in my eyes",
  "She's the kind of pretty that ruins me beautifully",
  "World disappears when I look at her"
];

export default function App() {
  const [quoteIndex, setQuoteIndex] = useState(() => Math.floor(Math.random() * quotes.length));
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showCatText, setShowCatText] = useState(false);

  useEffect(() => {
    // Current year's september 12 at 00:00 Dhaka time. Which is Sept 11 at 18:00 UTC
    // We will use standard timezone features or explicit calculation for 18:00 UTC.
    const targetDate = new Date();
    targetDate.setUTCFullYear(2026, 8, 11); // Month is 0-indexed (8 = September), Date = 11
    targetDate.setUTCHours(18, 0, 0, 0); // 18:00 UTC = 00:00 Dhaka (+6)

    const updateTimer = () => {
      const now = Date.now();
      const difference = targetDate.getTime() - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);

    const quoteInterval = setInterval(() => {
      setQuoteIndex(prev => {
        let nextIndex;
        do {
          nextIndex = Math.floor(Math.random() * quotes.length);
        } while (nextIndex === prev);
        return nextIndex;
      });
    }, 5000);

    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    return () => {
      clearInterval(timerInterval);
      clearInterval(quoteInterval);
      clearTimeout(loadingTimeout);
    };
  }, []);

  if (!isLoading) {
    return (
      <div className="min-h-screen w-full bg-[#fffff5] flex flex-col items-center justify-center font-sans tracking-wide relative overflow-hidden">
        {/* Peeking Cats */}
        <motion.img
          src="/cat1.png"
          alt="Peeking Cat 1"
          className="absolute top-0 left-0 w-24 sm:w-36 md:w-48 h-auto object-contain z-10"
          initial={{ x: "-150%", y: "-150%", rotate: 45 }}
          animate={{ 
            x: ["-150%", "10%", "0%", "10%", "-150%"], 
            y: ["-150%", "10%", "0%", "10%", "-150%"] 
          }}
          transition={{
            delay: 1.5,
            duration: 8,
            repeat: Infinity,
            repeatDelay: 4,
            ease: "easeInOut"
          }}
        />
        <motion.img
          src="/cat2.png"
          alt="Peeking Cat 2"
          className="absolute top-0 right-0 w-24 sm:w-36 md:w-48 h-auto object-contain z-10"
          initial={{ x: "150%", y: "-150%", rotate: -45 }}
          animate={{ 
            x: ["150%", "-10%", "0%", "-10%", "150%"], 
            y: ["-150%", "10%", "0%", "10%", "-150%"] 
          }}
          transition={{
            delay: 5,
            duration: 9,
            repeat: Infinity,
            repeatDelay: 5,
            ease: "easeInOut"
          }}
        />

        <div className="absolute bottom-0 left-0 w-full z-20 flex justify-center pointer-events-none pb-4 md:pb-10">
          <div 
            className="relative pointer-events-auto cursor-pointer" 
            onClick={() => setShowCatText(prev => !prev)}
            onTouchStart={(e) => { e.preventDefault(); setShowCatText(prev => !prev); }}
          >
            <img 
              src="/grass.png" 
              alt="Background cat" 
              className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] h-auto object-contain object-bottom drop-shadow-xl"
            />
            <AnimatePresence>
              {showCatText && (
                <>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1, rotate: -15 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    className="absolute left-[2%] top-[25%] text-red-500 font-extrabold text-[15px] sm:text-lg md:text-xl whitespace-nowrap z-30 pointer-events-none"
                    style={{ textShadow: "0 0 6px white, 0 0 8px white, 0 0 12px white" }}
                  >
                    Sorry disney,
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1, rotate: 12 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    className="absolute right-[2%] top-[8%] text-blue-500 font-extrabold text-[15px] sm:text-lg md:text-xl whitespace-nowrap z-30 pointer-events-none"
                    style={{ textShadow: "0 0 6px white, 0 0 8px white, 0 0 12px white" }}
                  >
                    my princess
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1, rotate: -8 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    className="absolute right-[5%] bottom-[25%] text-green-500 font-extrabold text-[15px] sm:text-lg md:text-xl whitespace-nowrap z-30 pointer-events-none"
                    style={{ textShadow: "0 0 6px white, 0 0 8px white, 0 0 12px white" }}
                  >
                    is better than yours
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, ease: "easeOut" }}
           className="z-10 flex flex-col items-center mb-[20vh] sm:mb-[30vh] md:mb-[35vh]"
        >
          {/* Glassmorphism Card */}
          <div 
            className="bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(180,185,200,0.4)] rounded-[2rem] p-6 md:p-8 flex flex-col items-center gap-5 relative mx-4 sm:mx-0 w-full max-w-[90%] sm:max-w-sm lg:max-w-md"
          >
            
            <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 w-full">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-[#2a303c] tracking-tight text-center">
                Time till her birthday!!
              </h2>
              <img src="/cat.gif" alt="Cat" className="w-16 h-16 sm:w-20 sm:h-20 object-contain scale-x-[-1] mt-1 sm:mt-0" />
            </div>

            <div className="flex items-center gap-2 md:gap-4 w-full justify-center mt-1">
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Mins', value: timeLeft.minutes },
                { label: 'Secs', value: timeLeft.seconds }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex flex-col items-center bg-white/50 backdrop-blur-md border border-white/80 shadow-sm rounded-2xl py-3 px-2 sm:px-3 w-full sm:w-[4.5rem] md:w-[5rem] transition-colors"
                >
                  <span className="text-2xl sm:text-3xl font-semibold text-[#2a303c] mix-blend-multiply tracking-tight">
                    {item.value.toString().padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-[11px] tracking-wider uppercase text-[#7a8bb0] font-medium mt-1">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen w-full bg-[#fffff5] flex flex-col items-center justify-center font-sans overflow-hidden py-10 px-4 sm:px-6"
    >
      <AnimatePresence>
        <motion.div
          key="loading-screen"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ 
            duration: 1, 
            ease: "easeOut"
          }}
          className="flex flex-col items-center gap-16 md:gap-28 w-full max-w-5xl"
        >
          {/* Top Section */}
          <div className="flex w-full flex-row items-center justify-center gap-4 sm:gap-10 md:gap-20 lg:gap-24 relative mt-10 md:mt-0">
            
            <motion.div
              animate={{ 
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="flex-shrink-0 z-10 w-2/5 sm:w-auto"
            >
               <img 
                 src="/logo.png" 
                 alt="Sword" 
                 className="w-full sm:w-72 sm:h-72 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] object-contain drop-shadow-2xl max-w-[200px] sm:max-w-none transition-transform duration-300"
               />
            </motion.div>
            
            {/* blending text on the right */}
            <motion.div 
              className="flex flex-col z-0 pointer-events-none w-3/5 sm:w-auto"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
            >
              <div className="text-3xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-medium tracking-tighter text-[#2a303c]/[0.15] mix-blend-multiply flex flex-col gap-1 md:gap-2 text-left leading-[1.05]">
                <div className="relative w-[180px] sm:w-[300px] md:w-[400px] lg:w-[500px] h-[150px] sm:h-[180px] md:h-[220px] flex items-center">
                  <AnimatePresence mode="popLayout">
                    <motion.span 
                      key={quoteIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-x-0 mx-auto text-left text-xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-[#2a303c]/[0.12] italic tracking-normal"
                    >
                      “{quotes[quoteIndex]}”
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Section: Loading UI */}
          <motion.div 
            className="flex flex-col items-start gap-1 w-full max-w-[280px] sm:max-w-xs md:max-w-sm mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <span className="text-xl md:text-2xl font-medium text-[#7a8bb0] pl-1 mb-1 tracking-wide">
              Loading...
            </span>

            <div className="relative w-full pb-2">
              {/* The Cat GIF */}
              <motion.div 
                className="absolute z-10 -top-[42px] sm:-top-[46px]"
                initial={{ left: "0%", x: "0%" }}
                animate={{ left: "100%", x: "-100%" }}
                transition={{ duration: 10, ease: "linear" }}
              >
                <img 
                  src="/cat.gif" 
                  alt="Cat loading" 
                  className="w-12 h-12 sm:w-14 sm:h-14 object-contain scale-x-[-1]"
                />
              </motion.div>

              {/* The Bar */}
              <div className="w-full h-6 sm:h-7 border-[3px] border-[#7a8bb0] bg-white rounded-lg overflow-hidden relative shadow-sm">
                <motion.div 
                  className="h-full bg-[#7a8bb0] opacity-40"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 10, ease: "linear" }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
