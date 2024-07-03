import React from 'react';

const OlympicBeerBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1]" style={{
      backgroundImage: `
        radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.2) 2%, transparent 0%),
        radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.2) 2%, transparent 0%),
        radial-gradient(circle at 125px 125px, rgba(0, 129, 200, 0.2) 2%, transparent 0%),
        radial-gradient(circle at 175px 175px, rgba(238, 51, 78, 0.2) 2%, transparent 0%),
        radial-gradient(circle at 225px 225px, rgba(252, 177, 49, 0.2) 2%, transparent 0%)
      `,
      backgroundSize: '250px 250px',
    }}>
      <svg width="0" height="0">
        <defs>
          <clipPath id="beerMug">
            <path d="M10 3 C10 3 10 20 10 20 L20 20 C20 20 20 3 20 3 L25 3 L25 25 L5 25 L5 3 Z" />
          </clipPath>
        </defs>
      </svg>
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3E%3Crect width='30' height='30' fill='rgba(255,255,255,0.1)' clip-path='url(%23beerMug)' /%3E%3C/svg%3E")`,
        backgroundSize: '90px 90px',
        backgroundPosition: '30px 30px',
      }}></div>
    </div>
  );
};

export default OlympicBeerBackground;