import React from 'react';

const OlympicRings: React.FC = () => {
  return (
    <div className="flex justify-center mb-8">
      <svg viewBox="-34 -12 68 33" width="272" height="132" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="interlace">
            <path d="M -11,-11 h 22 v 22 h -22 z M 11,-1.5 a 10.5,10.5 0 0,0 0,21 v -3 a 7.5,7.5 0 1,1 0,-15 M -11,1.5 a 7.5,7.5 0 1,1 0,15 v 3 a 10.5,10.5 0 0,0 0,-21 z" clipRule="evenodd"/>
          </clipPath>
          <clipPath id="interlace_Firefox">
            <path d="M 0,0 l -12,12 h 12 z"/>
          </clipPath>
          <g id="ring">
            <circle r="9" clipPath="url(#interlace)"/>
            <circle r="9" clipPath="url(#interlace_Firefox)"/>
            <path d="M 0,-9 a 9,9 0 0,1 9,9" transform="rotate(45)"/>
          </g>
        </defs>
        <g fill="none" strokeWidth="2">
          <g stroke="#0085c7" transform="translate(-22,0)">
            <use xlinkHref="#ring"/>
            <path d="M 0,-9 a 9,9 0 0,0 0,18"/>
          </g>
          <use xlinkHref="#ring" stroke="black"/>
          <g stroke="#df0024" transform="translate(22,0)">
            <use xlinkHref="#ring"/>
            <path d="M 0,-9 a 9,9 0 0,1 0,18"/>
          </g>
          <use xlinkHref="#ring" stroke="#f4c300" transform="translate(-11,9) rotate(180)"/>
          <use xlinkHref="#ring" stroke="#009f3d" transform="translate(11,9) rotate(180)"/>
        </g>
      </svg>
    </div>
  );
};

export default OlympicRings;