"use client"
import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import { 
  PlaneTakeoff, 
  HeartHandshake, 
  Activity, 
  Baby, 
  Dna, 
  FileText,
  Video,
  Sparkles,
  CalendarDays
} from 'lucide-react';

const Bannerfixed = () => {
  const [isHovered, setIsHovered] = useState(false);
  const trackRef = useRef(null);
  const x = useMotionValue(0);


  const specialties = [
    {
      id: 1,
      icon: <PlaneTakeoff className="w-6 h-6 text-emerald-600" />,
      title: "Visa & Travel Assistance",
      desc: "Fast-track medical visa invitation within 24 hours for BD patients."
    },
    {
      id: 2,
      icon: <Video className="w-6 h-6 text-blue-600" />,
      title: "Tele-Appointment Booking",
      desc: "Book direct video consultations with senior specialists from Dhaka."
    },
    {
      id: 3,
      icon: <HeartHandshake className="w-6 h-6 text-rose-600" />,
      title: "Organ Transplant Support",
      desc: "Legal documentation support and world-class post-operative care."
    },
    {
      id: 4,
      icon: <Activity className="w-6 h-6 text-amber-600" />,
      title: "Gastroenterology & Liver",
      desc: "Advanced therapeutic procedures for chronic gastric & liver diseases."
    },
    {
      id: 5,
      icon: <Baby className="w-6 h-6 text-indigo-600" />,
      title: "High-Success IVF Centers",
      desc: "Specialized reproductive medicine tailored for Bangladeshi couples."
    },
    {
      id: 6,
      icon: null, 
      title: "Cardiothoracic & Vascular Surgery",
      desc: ""
    },
    {
      id: 7,
      icon: null,
      title: "Radiation Oncology & CyberKnife",
      desc: ""
    },
    {
      id: 8,
      icon: <FileText className="w-6 h-6 text-teal-600" />,
      title: "Easy Medical Records Transfer",
      desc: "Seamless digital report submission and multi-disciplinary reviews."
    }
  ];

 
  const continuousList = [...specialties, ...specialties];

  // Framer Motion Animation Loop (Pure High-End Webflow/Stripe Style)
  useAnimationFrame((time, delta) => {
    if (!trackRef.current || isHovered) return;

    const speed = 0.05 * delta; 
    const currentX = x.get();
    
    
    const trackWidth = trackRef.current.scrollWidth / 2;
    
    if (currentX <= -trackWidth) {
      x.set(0);
    } else {
      x.set(currentX - speed);
    }
  });

  return (
    <div className="w-full bg-gradient-to-b from-slate-50 via-white to-slate-50 py-20 overflow-hidden relative">
      
    
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-200/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 relative z-10">
        {/* Header Section with Motion Fade-In */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-left max-w-4xl"
        >

          <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-100/80 px-3.5 py-1.5 rounded-full mb-5 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500 inline" /> Dedicated BD Support Helpline
            </span>
          </div>
          
          
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-5 leading-[1.15]">
            World-Class Medical Specialties & <br />
            <span className="bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
              Priority Doctor Appointments
            </span>
          </h2>
          
      
          <p className="text-slate-600 text-base md:text-lg max-w-3xl leading-relaxed font-normal">
            Easily book physical or video appointments with top senior specialists at Apollo Hospitals Chennai. Fully managed support, medical visa processing, and digital records transfer built entirely for <span className="font-semibold text-emerald-600 underline decoration-emerald-400/40 underline-offset-4">Bangladeshi Patients</span>.
          </p>
        </motion.div>
      </div>


      <div 
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing before:absolute before:left-0 before:top-0 before:z-20 before:h-full before:w-32 before:bg-gradient-to-r before:from-slate-50 before:to-transparent after:absolute after:right-0 after:top-0 after:z-20 after:h-full after:w-32 after:bg-gradient-to-l after:from-slate-50 after:to-transparent"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Track */}
        <motion.div 
          ref={trackRef}
          style={{ x }}
          className="flex gap-5 px-4 w-max"
        >
          {continuousList.map((item, index) => (
            <motion.div 
              key={`${item.id}-${index}`} 
              whileHover={{ 
                y: -6,
                scale: 1.01,
                borderColor: "rgba(59, 130, 246, 0.4)",
                boxShadow: "0 12px 30px -10px rgba(0,0,0,0.06)"
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="w-[310px] md:w-[370px] shrink-0 bg-white/80 backdrop-blur-md border border-gray-200/70 rounded-2xl p-6 transition-colors duration-300 flex items-start min-h-[130px] select-none"
            >
              {item.icon ? (
       
                <div className="flex gap-4 w-full">
                  <div className="shrink-0 p-2.5 bg-slate-50 rounded-xl border border-gray-100 h-fit">
                    {item.icon}
                  </div>
                  <div className="flex flex-col justify-start">
                    <h3 className="text-[15px] font-bold text-slate-800 hover:text-blue-600 transition-colors cursor-pointer leading-snug mb-1.5 flex items-center gap-1 group">
                      {item.title}
                    </h3>
                    {item.desc && (
                      <p className="text-xs text-slate-500 leading-normal font-normal">
                        {item.desc}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
              
                <div className="w-full h-full flex items-center justify-center text-center px-2">
                  <h3 className="text-[15px] font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer leading-snug">
                    {item.title}
                  </h3>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Bannerfixed;