"use client";

import { useState, useEffect } from "react";

const symbols = ["−", "÷", "×", "+"];

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [showFinalLogo, setShowFinalLogo] = useState(false);

  useEffect(() => {
    if (currentIndex < symbols.length - 1) {
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 400);
      return () => clearTimeout(timer);
    } else {
      // Show the + (Swiss cross) for a moment, then show final logo
      const finalTimer = setTimeout(() => {
        setShowFinalLogo(true);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(onComplete, 500);
        }, 600);
      }, 400);
      return () => clearTimeout(finalTimer);
    }
  }, [currentIndex, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-white transition-opacity duration-500 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Animated Swiss flag with symbols */}
        <div 
          className="flex items-center justify-center w-24 h-24 bg-primary rounded-lg shadow-lg transition-transform duration-300"
          style={{ transform: isExiting ? "scale(0.8)" : "scale(1)" }}
        >
          {!showFinalLogo ? (
            <span 
              className="text-white font-bold text-6xl transition-all duration-200"
              key={currentIndex}
              style={{
                animation: "symbolPop 0.3s ease-out",
              }}
            >
              {symbols[currentIndex]}
            </span>
          ) : (
            <div 
              className="grid grid-cols-2 w-full h-full p-1"
              style={{ animation: "symbolPop 0.3s ease-out" }}
            >
              <span className="flex items-center justify-center text-white font-bold text-3xl leading-none">+</span>
              <span className="flex items-center justify-center text-white font-bold text-3xl leading-none">−</span>
              <span className="flex items-center justify-center text-white font-bold text-3xl leading-none">×</span>
              <span className="flex items-center justify-center text-white font-bold text-3xl leading-none">÷</span>
            </div>
          )}
        </div>
        
        {/* Brand name */}
        <div 
          className={`font-bold text-2xl text-swiss-gray-900 transition-opacity duration-300 ${
            showFinalLogo ? "opacity-100" : "opacity-0"
          }`}
        >
          Swiss<span className="text-primary">Data</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes symbolPop {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
