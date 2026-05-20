'use client';

import React from 'react';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#FAFCFD] flex items-center justify-center p-6 font-sans overflow-hidden relative">
      
      {/* Premium Ambient Background Blobs */}
      <div className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-teal-100/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-2xl w-full text-center space-y-10 relative z-10">
        
        {/* Hero UI Style Stethoscope Icon Container */}
        <div className="relative inline-flex items-center justify-center group">
          <div className="absolute inset-0 bg-teal-200 blur-3xl rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
          
          <div className="relative bg-white border border-teal-50/60 p-8 rounded-[2rem] shadow-sm -rotate-3 group-hover:rotate-0 transition-all duration-500 ease-out">
            {/* Heroicons: Stethoscope Style Outlined */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 text-teal-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </svg>
            
            <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[11px] font-bold tracking-wider px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 backdrop-blur-sm bg-opacity-95">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-100 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              404
            </span>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
            Page Not <span className="text-teal-600">Found</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl max-w-lg mx-auto leading-relaxed font-normal">
            Don't worry, your health is still our priority. The page you are looking for seems to have taken an unexpected recovery day.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/"
            className="group flex items-center gap-2.5 px-8 py-4 bg-slate-900 text-white font-semibold rounded-2xl hover:bg-teal-600 transition-all duration-300 shadow-lg shadow-slate-900/10 active:scale-98"
          >
            {/* Heroicons: Home */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            Back to Home
          </Link>

          <Link
            href="/appointments"
            className="group flex items-center gap-2.5 px-8 py-4 bg-white border border-slate-200 text-slate-700 font-semibold rounded-2xl hover:border-teal-200 hover:bg-teal-50/30 transition-all duration-300 active:scale-98"
          >
            {/* Heroicons: Calendar */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-teal-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            Book an Appointment
            {/* Heroicons: Arrow Right */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4 ml-0.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        {/* Clean Minimal Support Footer */}
        <div className="pt-10 border-t border-slate-100">
          <p className="text-slate-400 font-medium text-sm">
            Need immediate medical help? <button className="text-rose-500 hover:text-rose-600 underline underline-offset-4 font-semibold transition-colors">Emergency Contact</button> or <button className="text-teal-600 hover:text-teal-700 underline underline-offset-4 font-semibold transition-colors">Help Center</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;