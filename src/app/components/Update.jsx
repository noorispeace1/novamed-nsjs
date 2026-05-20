'use client';

import React, { useState, useEffect } from 'react';

const Update = ({ isOpen, booking, onClose, onUpdateSuccess }) => {
    const [modalLoading, setModalLoading] = useState(false);
    

    const [doctorName, setDoctorName] = useState('');
    const [patientName, setPatientName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [reason, setReason] = useState('');

    useEffect(() => {
        if (booking && isOpen) {
    
            const { 
                doctorName: docName, 
                doctor, 
                patientName: patName, 
                date: bookingDate, 
                time: bookingTime, 
                reason: bookingReason 
            } = booking;

            setDoctorName(docName || doctor?.name || 'Dr. Professional');
            setPatientName(patName || '');
            setTime(bookingTime || '');
            setReason(bookingReason || '');

           
            if (bookingDate) {
                try {
                    const formattedDate = new Date(bookingDate).toISOString().split('T')[0];
                    setDate(formattedDate);
                } catch (e) {
                    setDate(bookingDate); 
                }
            } else {
                setDate('');
            }
        }
    }, [booking, isOpen]);

    if (!isOpen) return null;

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setModalLoading(true);

        const bookingId = booking?._id || booking?.id;

        try {
           
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/bookings/${bookingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ patientName, date, time, reason }),
            });

            if (res.ok) {
                if (onUpdateSuccess) {
                    onUpdateSuccess(bookingId, { patientName, date, time, reason });
                }
                if (onClose) onClose();
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

                <form onSubmit={handleUpdateSubmit} className="space-y-4">
   
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Doctor / Service</label>
                        <input 
                            type="text" 
                            value={doctorName}
                            disabled
                            className="w-full px-3 py-2.5 bg-[#f4fafd] border border-[#a1dbdf] text-[#008B99] font-medium rounded-xl text-sm cursor-not-allowed outline-none select-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Patient Name</label>
                        <input 
                            type="text" 
                            value={patientName}
                            onChange={(e) => setPatientName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 text-gray-700 rounded-xl text-sm focus:outline-none focus:border-[#008B99] focus:ring-1 focus:ring-[#008B99]/20 transition"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Date</label>
                            <input 
                                type="date" 
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 text-gray-700 rounded-xl text-sm focus:outline-none focus:border-[#008B99] focus:ring-1 focus:ring-[#008B99]/20 transition"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Time</label>
                            <input 
                                type="text" 
                                value={time}
                                placeholder="04:54 PM"
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 text-gray-700 rounded-xl text-sm focus:outline-none focus:border-[#008B99] focus:ring-1 focus:ring-[#008B99]/20 transition"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Reason for Visit</label>
                        <textarea 
                            value={reason}
                            rows={2}
                            onChange={(e) => setReason(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 text-gray-700 rounded-xl text-sm focus:outline-none focus:border-[#008B99] focus:ring-1 focus:ring-[#008B99]/20 transition resize-none"
                        />
                    </div>

                    
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={modalLoading}
                            className="w-full py-2.5 bg-[#0091A1] hover:bg-[#007b8a] text-white font-medium rounded-xl text-sm transition shadow-sm disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                        >
                            {modalLoading ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    Saving...
                                </>
                            ) : (
                                'Save Changes'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Update;