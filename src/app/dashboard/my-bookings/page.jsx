
import Delete from '@/app/components/Delete';
import Update from '@/app/components/Update';
import { auth } from '@/app/lib/auth';
import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

const MyBookingPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
//     if(
// !session
//      ){
//       redirect ("/login" )
//      }
     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/booking/${session?.user?.id}`, {
                cache: 'no-store' 
            });
            const bookings = await res.json()

    // let bookings = [];
    // try {
    //     if (session?.user?.id) {
       
    //         if (res.ok) {
    //             bookings = await res.json();
    //         }
    //     }
    // } catch (error) {
    //     console.error("Booking fetch error:", error);
    // }

    return (
        <div className="w-full mx-auto p-6 bg-gray-50 min-h-screen">
        
          

            {/* Navigation Tabs */}
            {/* <div className="flex gap-2 mb-8">
                <span className="px-4 py-1.5 bg-white text-slate-800 font-medium rounded-full text-sm shadow-sm border border-gray-100 cursor-pointer">
                    My Bookings
                </span>
                <span className="px-4 py-1.5 bg-slate-100 text-slate-500 font-medium rounded-full text-sm cursor-pointer hover:bg-slate-200/70 transition">
                    My Profile
                </span>
            </div> */}

            {/* Bookings Title Header */}
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800">Doctor Appointments</h2>
                <p className="text-xs text-gray-500 mt-0.5">Manage your scheduled consultations and view history.</p>
            </div>

            {!bookings || bookings.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[250px] bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
                    <div className="p-3 bg-slate-50 rounded-full text-gray-400 mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                        </svg>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-700">No appointments found</h3>
                    <p className="text-xs text-gray-400 mt-1 max-w-xs">You haven't booked any medical consultations yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {bookings.map((booking) => {
                        const bookingId = booking._id || booking.id;
                        
                        return (
                            <div key={bookingId} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between max-w-xl">
                                <div>
                                    {/* Doctor Name */}
                                    <h3 className="text-lg font-bold text-[#008B99] mb-4">
                                        {booking.doctorName || booking.doctor?.name || 'Dr. Professional'}
                                    </h3>

                                    {/* Info Body */}
                                    <div className="space-y-2.5 text-sm text-gray-500 mb-6">
                                        <div className="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                            </svg>
                                            <span>Patient: <span className="text-gray-700 font-medium">{booking.patientName || session?.user?.name || 'Patient'}</span></span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75" />
                                            </svg>
                                            <span>Date: <span className="text-gray-700 font-medium">{booking.date}</span></span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                            <span>Time: <span className="text-gray-700 font-medium">{booking.time}</span></span>
                                        </div>

                                        <div className="text-sm text-gray-500">
                                            <span>Reason: <span className="text-gray-700 font-medium">{booking.reason || 'N/A'}</span></span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center gap-3 pt-2">
                                    {/* Update Button (Redirects to update page with ID) */}
<Link href={`/dashboard/update/${booking._id}`}>
         Update
</Link>
                                
<Delete bookingId={bookingId}></Delete>                                   
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