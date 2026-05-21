import Delete from '@/app/components/Delete';
import { auth } from '@/app/lib/auth';
import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

const MyBookingPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

  
    if (!session) {
        redirect("/login");
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/booking/${session?.user?.id}`, {
        cache: 'no-store' 
    });
    
    const bookings = await res.json();

    return (
        <div className="w-full mx-auto p-6 bg-gray-50/50 min-h-screen">
            
            {/* Bookings Title Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-100 pb-5">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Doctor Appointments</h2>
                    <p className="text-sm text-gray-500 mt-1">Manage your scheduled consultations and view history.</p>
                </div>
                <div className="mt-4 md:mt-0">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#008B99]/10 text-[#008B99] font-semibold rounded-full text-xs uppercase tracking-wider">
                        Total: {bookings?.length || 0} Bookings
                    </span>
                </div>
            </div>

            {!bookings || bookings.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[350px] bg-white rounded-2xl shadow-xs border border-gray-100 p-8 text-center animate-in fade-in duration-300">
                    <div className="p-4 bg-gray-50 rounded-full text-gray-400 mb-4 ring-8 ring-gray-50/50">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                        </svg>
                    </div>
                    <h3 className="text-base font-bold text-gray-700">No appointments found</h3>
                    <p className="text-sm text-gray-400 mt-1 max-w-xs">You haven't booked any medical consultations yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {bookings.map((booking) => {
                        const bookingId = booking._id || booking.id;
                        
                        return (
                            <div key={bookingId} className="bg-white rounded-2xl shadow-xs border border-gray-100 p-6 flex flex-col justify-between hover:shadow-md hover:border-gray-200/80 transition-all duration-300 relative group overflow-hidden">
                                
                                {/* Top colored accent bar on hover */}
                                <div className="absolute top-0 left-0 right-0 h-1 bg-[#008B99] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                
                                <div>
                                    {/* Doctor Name */}
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#008B99] transition-colors duration-200">
                                            {booking.doctorName || booking.doctor?.name || 'Dr. Professional'}
                                        </h3>
                                        <span className="px-2.5 py-1 bg-gray-50 text-gray-600 font-medium rounded-lg text-xs border border-gray-100">
                                            Active
                                        </span>
                                    </div>

                                    {/* Info Body */}
                                    <div className="space-y-3 text-sm text-gray-500 mb-6 bg-gray-50/50 p-4 rounded-xl border border-gray-100/50">
                                        <div className="flex items-center gap-3">
                                            <div className="p-1.5 bg-white rounded-lg text-gray-400 shadow-xxs">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4 text-gray-500">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                                </svg>
                                            </div>
                                            <span>Patient: <span className="text-gray-800 font-semibold">{booking.patientName || session?.user?.name || 'Patient'}</span></span>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="p-1.5 bg-white rounded-lg text-gray-400 shadow-xxs">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4 text-gray-500">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75" />
                                                </svg>
                                            </div>
                                            <span>Date: <span className="text-gray-800 font-semibold">{booking.date}</span></span>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="p-1.5 bg-white rounded-lg text-gray-400 shadow-xxs">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4 text-gray-500">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                            </div>
                                            <span>Time: <span className="text-gray-800 font-semibold">{booking.time}</span></span>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="p-1.5 bg-white rounded-lg text-gray-400 shadow-xxs mt-0.5">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4 text-gray-500">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.355-3.393a.903.903 0 0 1 .865-.5c1.153-.086 2.294-.213 3.423-.379 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                                </svg>
                                            </div>
                                            <span className="leading-relaxed">Reason: <span className="text-gray-700 font-medium">{booking.reason || 'No specific reason mentioned'}</span></span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons Container */}
                                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                                    {/* Update Button */}
                                    <Link 
                                        href={`/dashboard/update/${booking._id}`}
                                        className="w-full py-2.5 bg-[#008B99] hover:bg-[#007682] text-white font-semibold rounded-xl text-sm transition-all duration-200 text-center shadow-xs flex items-center justify-center gap-2 group-hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>
                                        Update
                                    </Link>
                                
                                    {/* Delete Button Component */}
                                    <div className="w-full">
                                        <Delete bookingId={bookingId} />
                                    </div>                     
                                </div>

                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MyBookingPage;