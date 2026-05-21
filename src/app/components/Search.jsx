"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchWrapper({ defaultValue }) {
  const [searchQuery, setSearchQuery] = useState(defaultValue || '');
  const router = useRouter();

  const handleSearch = () => {
    router.push(`/all-appointment?search=${searchQuery}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="flex items-center bg-white rounded-full shadow-sm border border-gray-200 px-4 py-2 mb-8 max-w-xl mx-auto">
      <svg className="w-5 h-5 mr-3 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search by doctor name, specialty or hospital..."
        className="w-full bg-transparent border-none text-[#5fa3b3] text-sm sm:text-base placeholder-gray-300 focus:outline-none font-medium"
      />
      <button
        onClick={handleSearch}
        className="ml-3 bg-[#8cb632] hover:bg-[#7aa029] text-white text-xs font-bold tracking-wider uppercase px-4 py-2 rounded-full transition-colors duration-200 focus:outline-none flex-shrink-0"
      >
        Search
      </button>
    </div>
  );
}