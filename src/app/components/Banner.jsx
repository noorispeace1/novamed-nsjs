"use client"
import React from 'react';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Banner = () => {
    
    const slideData = [
        {
            id: 1,
            badge: "VERIFIED HEALTHCARE",
            title: "Find & Book the Best Doctors Near You",
            description: "Verified specialists, instant confirmation, and transparent fees — your health, simplified.",
            bgImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1920&q=80"
        },
        {
            id: 2,
            badge: "24/7 EMERGENCY CARE",
            title: "Your Health Is Our Top Priority",
            description: "Connect with world-class medical experts from the comfort of your home or visit our clinic.",
            bgImage: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1920&q=80"
        },
        {
            id: 3,
            badge: "MODERN LAB & SURGERY",
            title: "Advanced Care & Expert Specialists",
            description: "Equipped with cutting-edge medical technologies and dedicated healthcare professionals.",
            bgImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920&q=80"
        }
    ];

    return (
        <div className="w-full h-[550px] md:h-[600px] relative">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper w-full h-full"
            >
                {slideData.map((slide) => (
                    <SwiperSlide key={slide.id} className="relative w-full h-full">
              
                        <div className="absolute inset-0 w-full h-full -z-10">
                            <Image
                                src={slide.bgImage}
                                alt={slide.title}
                                fill
                                className="object-cover"
                                priority={slide.id === 1}
                            />
                         
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-teal-900/40"></div>
                        </div>

                        <div className="max-w-7xl mx-auto h-full px-6 md:px-12 flex flex-col justify-center items-start text-white text-left">
          
                            <div className="flex items-center space-x-2 border border-gray-400 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-4">
                                <span className="inline-block w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse"></span>
                                <span>{slide.badge}</span>
                            </div>

                     
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold max-w-2xl leading-tight mb-4 tracking-tight">
                                {slide.title}
                            </h1>

                       
                            <p className="text-gray-300 text-sm md:text-base max-w-lg mb-8 leading-relaxed">
                                {slide.description}
                            </p>

                         
                            <div className="flex flex-wrap gap-4 items-center mb-10">
                                <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium px-6 py-3 rounded-lg flex items-center space-x-2 transition-all shadow-lg hover:scale-105">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <span>Browse Doctors</span>
                                </button>
                                
                                <button className="bg-transparent hover:bg-white/10 text-white font-medium px-6 py-3 rounded-lg border border-gray-400 flex items-center space-x-2 transition-all">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>My Bookings</span>
                                </button>
                            </div>

                       
                            {slide.id === 1 && (
                                <div className="flex flex-wrap items-center gap-6 md:gap-10 border-t border-white/20 pt-6 w-full max-w-md">
                                    <div>
                                        <p className="text-xl md:text-2xl font-bold flex items-center"><span className="text-cyan-400 mr-1">👥</span> 500+</p>
                                        <p className="text-xs text-gray-400">Verified Doctors</p>
                                    </div>
                                    <div>
                                        <p className="text-xl md:text-2xl font-bold flex items-center"><span className="text-yellow-400 mr-1">★</span> 4.9</p>
                                        <p className="text-xs text-gray-400">Avg. Rating</p>
                                    </div>
                                    <div>
                                        <p className="text-xl md:text-2xl font-bold flex items-center"><span className="text-cyan-400 mr-1">📅</span> 50k+</p>
                                        <p className="text-xs text-gray-400">Appointments</p>
                                    </div>
                                </div>
                            )}

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            
         
            <style jsx global>{`
                .swiper-button-next, .swiper-button-prev {
                    color: #ffffff !important;
                    transform: scale(0.7);
                }
                .swiper-pagination-bullet-active {
                    background: #22d3ee !important;
                }
            `}</style>
        </div>
    );
};

export default Banner;