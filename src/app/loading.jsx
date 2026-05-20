'use client';

import React from 'react';

const LoadingPage = () => {
  return (
    <div className="flex h-[80vh] flex-col items-center justify-center bg-[#FAFCFD]">
      <div className="relative flex items-center justify-center">
        
        {/* Premium Outer Clinical Spinner */}
        <div className="h-24 w-24 rounded-full border-[3px] border-slate-100 border-t-teal-600 border-r-teal-600/30 animate-spin duration-1000" />
        
        {/* Central Heartbeat / Pulse Icon Container */}
        <div className="absolute h-14 w-14 rounded-full bg-teal-50/60 backdrop-blur-sm flex items-center justify-center shadow-inner">
          
          {/* Animated Heartbeat Line SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2.5"
            stroke="currentColor"
            className="w-7 h-7 text-teal-600"
          >
            {/* Heartbeat path with custom dash animation for professional look */}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2 12h3L9 5l4 14 3-9 2 2h4"
              className="animate-[pulse_1.5s_ease-in-out_infinite]"
            />
          </svg>
          
        </div>

        {/* Ambient Glow Background Behind Spinner */}
        <div className="absolute w-32 h-32 bg-teal-100/20 rounded-full blur-2xl -z-10 animate-pulse" />
      </div>
      
      {/* Text Context Section */}
      <div className="mt-8 text-center space-y-1.5">
        <h2 className="text-xs font-bold tracking-[0.25em] text-slate-800 uppercase pl-[0.25em]">
          Connecting to Clinic
        </h2>
        
        {/* Smooth Dot-Fading Custom Loading Text */}
        <div className="flex items-center justify-center gap-1 text-xs text-slate-400 font-medium">
          <span>Securing your appointment panel</span>
          <span className="flex gap-0.5 ml-0.5">
            <span className="animate-[bounce_1.4s_infinite_0ms] h-1 w-1 bg-teal-600/60 rounded-full"></span>
            <span className="animate-[bounce_1.4s_infinite_200ms] h-1 w-1 bg-teal-600/60 rounded-full"></span>
            <span className="animate-[bounce_1.4s_infinite_400ms] h-1 w-1 bg-teal-600/60 rounded-full"></span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;