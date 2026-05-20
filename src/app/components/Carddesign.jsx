

"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const Carddesign = () => {
  const [activeId, setActiveId] = useState(1);

  const faqs = [
    {
      id: 1,
      question: "What is NovaMed telemedicine platform?",
      answer: "NovaMed is Bangladesh's premier healthcare platform combining online doctor appointment booking with a comprehensive doctors directory. Experience seamless telemedicine consultations, secure medical record transfers, and instant appointment confirmations with top senior specialists nationwide."
    },
    {
      id: 2,
      question: "How do I book telemedicine appointments on NovaMed?",
      answer: "Simply search for your required specialty or doctor, select an available time slot that suits your schedule, and complete the digital registration. You will receive an instant confirmation along with a secure video consultation link via SMS and email."
    },
    {
      id: 3,
      question: "Are telemedicine consultations reliable?",
      answer: "Absolutely. NovaMed partners exclusively with verified, registered medical professionals and senior specialists. The video consultations are conducted over high-definition, encrypted channels to ensure the highest clinical standards and absolute privacy."
    },
    {
      id: 4,
      question: "Is telemedicine payment secure on NovaMed?",
      answer: "Yes, your transactions are completely secure. We use bank-grade SSL encryption protocols supporting all major Bangladeshi credit/debit cards, internet banking, and mobile financial services like bKash, Nagad, and Rocket."
    },
    {
      id: 5,
      question: "When are telemedicine consultations available?",
      answer: "Telemedicine consultations are available 24/7 depending on doctor schedules. Many general physicians are available for immediate virtual consultations, while senior specialists can be pre-booked for specific morning or evening chambers."
    },
    {
      id: 6,
      question: "How reliable is the doctors' information?",
      answer: "Every medical practitioner on NovaMed goes through a rigorous BMDC (Bangladesh Medical & Dental Council) registration verification check. Degrees, current hospital affiliations, and clinical experience are systematically audited before profile activation."
    },
    {
      id: 7,
      question: "How to register as a doctor?",
      answer: "Doctors can register by clicking the 'Join as Practitioner' button on our homepage. Upload your BMDC credentials, academic certificates, and chamber layout details. Our onboarding team will verify and activate your digital chamber within 48 hours."
    },
    {
      id: 8,
      question: "Can doctors outside Dhaka register?",
      answer: "Yes, NovaMed is a nationwide digital network. Medical practitioners from Chittagong, Sylhet, Rajshahi, Khulna, and all other districts are highly encouraged to join to extend their specialized healthcare reach across Bangladesh."
    },
    {
      id: 9,
      question: "Where can I find hospital and clinic information?",
      answer: "Our centralized directory includes a dedicated section for hospitals, diagnostic labs, and specialty clinics. You can browse facilities by location, available emergency services, testing machinery, and active specialist doctor lists."
    }
  ];

  const toggleAccordion = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className="w-full bg-slate-50 py-12 md:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-teal-100/30 rounded-full blur-[80px] md:blur-[140px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center mb-10 md:mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 bg-teal-50 border border-teal-100 px-3.5 py-1 rounded-full mb-4 shadow-sm"
        >
          <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
          <span className="text-[11px] md:text-xs font-semibold text-teal-800 uppercase tracking-wider">
            Help Center
          </span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4"
        >
          Telemedicine FAQs
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-500 text-sm md:text-base font-medium"
        >
          Everything you need to know about <span className="text-teal-600 font-semibold">Doctor Appointment BD (NovaMed)</span>
        </motion.p>
      </div>

      <div className="max-w-3xl mx-auto flex flex-col gap-3.5 relative z-10">
        {faqs.map((faq, index) => {
          const isOpen = activeId === faq.id;
          return (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="w-full bg-white border border-gray-100 rounded-xl md:rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:border-gray-200"
            >
              <button
                onClick={() => toggleAccordion(faq.id)}
                className="w-full flex items-center justify-between p-4 md:p-6 text-left select-none gap-4 transition-colors duration-200"
              >
                <span className={`text-sm md:text-[15px] font-bold tracking-tight transition-colors duration-200 ${isOpen ? 'text-teal-600' : 'text-slate-800'}`}>
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className={`shrink-0 p-1 rounded-full transition-colors ${isOpen ? 'text-teal-600 bg-teal-50' : 'text-slate-400'}`}
                >
                  <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ height: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                  >
                    <div className="px-4 pb-5 md:px-6 md:pb-7 border-t border-gray-50 pt-3">
                      <p className="text-xs md:text-[13px] text-slate-500 leading-relaxed font-normal">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Carddesign;