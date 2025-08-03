import React, { useEffect, useState } from "react";
import NasdaqLogo from "../assets/NASDAQ_Logo.svg";
interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 1000); // Wait for fade out animation
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`flex items-center justify-center w-full h-screen bg-gradient-to-r from-[#fcfc9a] to-[#8cfc8c] bg-[length:200%_200%] animate-gradient-background border-[48px] ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="text-center">
        <div className="mb-16">
          <div className="flex flex-col gap-5 items-center">
            <img src={NasdaqLogo} />

            <div className="mt-10">
              <p
                className="mb-2 text-2xl font-semibold md:text-xl animate-fade-in-up"
                style={{
                  animationDelay: "0.1s",
                  animationFillMode: "forwards",
                }}
              >
                Ali Khaled
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
