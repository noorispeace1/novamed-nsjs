'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const Update = ({ isOpen, booking, onClose, onUpdateSuccess }) => {
 const params = useParams();
 const bookingId = params.id
 console.log(params);
    const [modalLoading, setModalLoading] = useState(false);
    const [doctorName, setDoctorName] = useState('');
    const [patientName, setPatientName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [reason, setReason] = useState('');

   console.log(booking);
  

  

const router = useRouter();
   
    const handleUpdateSubmit = async (e) => {
        
        e.preventDefault();
        setModalLoading(true);
console.log(patientName, date, time, reason,"from update test");
     

 
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/bookings/${bookingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({ patientName, date, time, reason }),
            });
            
           

            if (res.ok) {

                const responseData = await res.json();
                
              
                if (onUpdateSuccess) {
                    onUpdateSuccess(bookingId, { patientName, date, time, reason });
                }
              
                if (onClose) onClose();
                router.push("/dashboard/my-bookings")
            } else {
                console.error("Backend error occurred while updating");
            }
        } catch (error) {
            console.error("Update error:", error);
        } finally {
            setModalLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs transition-opacity">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 max-w-md w-full p-6 mx-4 relative transform transition-all animate-in zoom-in-95 duration-200">
                
        
                <button 
                    onClick={onClose}
                    type="button"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition p-1 rounded-full hover:bg-gray-100 cursor-pointer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>

                <h3 className="text-lg font-bold text-gray-800 mb-5">Update Appointment</h3>

               <form onSubmit={handleUpdateSubmit} className="space-y-5">
    
    {/* Doctor Input (Auto-filled & Disabled) */}
    <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1.5 tracking-wide uppercase">
            Assigned Doctor
        </label>
        <div className="relative flex items-center">
            {/* Doctor Icon */}
            <span className="absolute left-3.5 text-[#008B99]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
            </span>
            <input 
                type="text" 
                value={doctorName} 
                disabled
                className="w-full pl-10 pr-4 py-2.5 bg-[#f4fafd] border border-[#a1dbdf] text-[#008B99] font-medium rounded-xl text-sm cursor-not-allowed outline-none select-none shadow-inner"
            />
        </div>
    </div>

    {/* Patient Name Input */}
    <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1.5 tracking-wide uppercase">
            Patient Name
        </label>
        <div className="relative flex items-center">
            <span className="absolute left-3.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
            </span>
            <input 
                type="text" 
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Enter patient full name"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 text-gray-800 bg-gray-50/30 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-[#008B99] focus:ring-4 focus:ring-[#008B99]/10 transition-all duration-200 placeholder:text-gray-400 font-medium"
                required
            />
        </div>
    </div>

    {/* Date & Time Grid */}
    <div className="grid grid-cols-2 gap-4">
        {/* Date Input */}
        <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 tracking-wide uppercase">
                Date
            </label>
            <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-200 text-gray-800 bg-gray-50/30 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-[#008B99] focus:ring-4 focus:ring-[#008B99]/10 transition-all duration-200 font-medium cursor-pointer"
                required
            />
        </div>
        
        {/* Time Input */}
        <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 tracking-wide uppercase">
                Time
            </label>
            <input 
                type="text" 
                value={time}
                placeholder="e.g., 04:54 PM"
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-200 text-gray-800 bg-gray-50/30 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-[#008B99] focus:ring-4 focus:ring-[#008B99]/10 transition-all duration-200 placeholder:text-gray-400 font-medium"
                required
            />
        </div>
    </div>

    {/* Reason Textarea */}
    <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1.5 tracking-wide uppercase">
            Reason for Visit
        </label>
        <textarea 
            value={reason}
            rows="3"
            onChange={(e) => setReason(e.target.value)}
            placeholder="Briefly describe the symptom or reason..."
            className="w-full px-4 py-2.5 border border-gray-200 text-gray-800 bg-gray-50/30 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-[#008B99] focus:ring-4 focus:ring-[#008B99]/10 transition-all duration-200 resize-none placeholder:text-gray-400 font-medium leading-relaxed"
        />
    </div>

    {/* Form Actions (Buttons) */}
    <div className="flex items-center gap-3 pt-3">
        {/* Cancel Button */}
    <Link
    href="/dashboard/my-bookings" 
    onClick={onClose} 
    className="w-1/3 py-2.5 border border-gray-200 text-gray-600 font-semibold rounded-xl text-sm hover:bg-gray-50 active:bg-gray-100 transition duration-200 cursor-pointer text-center block"
>
    Cancel
</Link>

        {/* Submit Button */}
        <button
            type="submit"
            disabled={modalLoading}
            className="w-2/3 py-2.5 bg-[#0091A1] hover:bg-[#007b8a] active:scale-[0.99] text-white font-semibold rounded-xl text-sm transition-all duration-200 shadow-md shadow-[#0091A1]/10 disabled:opacity-50 disabled:pointer-events-none cursor-pointer flex items-center justify-center gap-2"
        >
            {modalLoading ? (
                <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>Saving Changes...</span>
                </>
            ) : (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    <span>Save Changes</span>
                </>
            )}
        </button>
    </div>
</form>
            </div>
        </div>
    );
};

export default Update;
