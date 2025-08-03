import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Wait for fade out animation
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`fixed bg-amber-50 inset-0 bg-gradient-to-br from-gradient-start to-gradient-end flex items-center justify-center z-50 transition-opacity duration-500 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="text-center text-white animate-fade-in-up">
        <div className="mb-16">
          <div className="flex flex-col gap-5 items-center">
            <span className="text-6xl font-bold tracking-widest md:text-4xl text-shadow-lg animate-pulse-slow">
            BORSA
            </span>
            <div className="flex gap-2 items-end h-16 md:h-12">
              <div className="w-2 md:w-1.5 bg-white rounded animate-bounce" style={{ height: '20px', animationDelay: '0s' }}></div>
              <div className="w-2 md:w-1.5 bg-white rounded animate-bounce" style={{ height: '40px', animationDelay: '0.2s' }}></div>
              <div className="w-2 md:w-1.5 bg-white rounded animate-bounce" style={{ height: '60px', animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
        
        <div className="mt-10">
          <p className="mb-2 text-2xl font-semibold opacity-0 md:text-xl animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            Ali Khaled
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen; 