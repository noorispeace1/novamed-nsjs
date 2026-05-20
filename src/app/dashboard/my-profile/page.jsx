"use client";

import { useSession } from "@/app/lib/auth-client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast"; // Dynamic toast notifications

const ProfilePage = () => {
    const { data: session, update: updateSession } = useSession();
    
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    
    // Modal state control
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (!session?.user?.id) return;

        setLoading(true);
        fetch(`${process.env.NEXT_PUBLIC_API_URI}/booking/${session.user.id}`, {
            cache: 'no-store'
        })
        .then((res) => {
            if (!res.ok) throw new Error("Failed to fetch");
            return res.json();
        })
        .then((data) => {
            setBookings(data);
        })
        .catch((error) => {
            console.error("Data load korte problem hoyeche:", error);
        })
        .finally(() => {
            setLoading(false);
        });
    }, [session?.user?.id]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setIsUpdating(true);

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name");
        const email = formData.get("email");
        const image = formData.get("image");

        const updatedData = { name, email, image };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/user/${session?.user?.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });

            if (res.ok) {
                // Immediately update session UI locally without full-page refresh
                if (updateSession) {
                    await updateSession({
                        ...session,
                        user: { 
                            ...session?.user, 
                            ...updatedData
                        }
                    });
                }
                
                // 1. Close the modal immediately
                setIsModalOpen(false);
                
                // 2. Trigger the exact toast notification requested
                toast.success("Profile updated successfully!");
            } else {
                toast.error("Update failed. Please try again.");
            }
        } catch (error) {
            toast.error("Server connection error!");
            console.error(error);
        } finally {
            setIsUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-[#f8fafc]">
                <div className="flex flex-col items-center gap-3">
                    <span className="w-10 h-10 border-4 border-[#0091A1]/20 border-t-[#0091A1] rounded-full animate-spin"></span>
                    <p className="text-sm font-semibold text-gray-500 tracking-wide">Loading profile data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full mx-auto p-4 md:p-8 bg-[#f8fafc] min-h-screen">
            {/* Toast Container to allow popups to render */}
            <Toaster position="top-right" reverseOrder={false} />

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Profile Detail Card */}
                <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-fit">
                    <div className="flex flex-col items-center mb-6 pb-6 border-b border-slate-100">
                        <div className="relative group mb-3">
                            <Image
                                src={session?.user?.image || "https://picsum.photos/200"} 
                                alt="Profile" 
                                width={120}
                                height={120}
                                className="w-24 h-24 rounded-full object-cover border-4 border-[#f4fafd] shadow-sm transition-transform duration-300 group-hover:scale-[1.02]"
                                unoptimized 
                            />
                        </div>
                        <h2 className="text-xl font-bold text-slate-800">{session?.user?.name || "No Name"}</h2>
                        <p className="text-xs font-medium text-slate-400 mt-0.5">{session?.user?.email}</p>
                        
                        {/* Button to Open Edit Modal */}
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all"
                        >
                            Edit Profile Details
                        </button>
                    </div>
                </div>

                {/* Bookings View Panel */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h3 className="text-xl font-bold text-slate-800">My Bookings</h3>
                            <p className="text-xs text-slate-400 mt-0.5">Manage and track your appointments</p>
                        </div>
                        <span className="bg-[#f4fafd] text-[#0091A1] text-xs font-bold px-2.5 py-1 rounded-lg border border-[#a1dbdf]/40">
                            Total: {bookings.length}
                        </span>
                    </div>
                    
                    <hr className="mb-5 border-slate-100" />
                    
                    {bookings.length === 0 ? (
                        <div className="text-center py-16 bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-100 flex flex-col items-center justify-center">
                            <p className="text-slate-400 text-sm font-medium">Kono booking er tathya paoya jayni.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {bookings.map((booking) => (
                                <div key={booking._id || booking.id} className="p-4 border border-slate-100 rounded-xl bg-slate-50/40 flex justify-between items-center hover:border-slate-200 hover:bg-white hover:shadow-sm transition-all duration-200">
                                    <div className="space-y-1">
                                        <p className="font-bold text-slate-700 text-base">{booking.title || booking.doctorName || "Doctor Appointment"}</p>
                                        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                                            <span>Date:</span>
                                            <span className="text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">{booking.date || "N/A"}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <span className={`px-3 py-1 rounded-xl text-xs font-bold border ${booking.status === "confirmed" ? "bg-emerald-50 text-emerald-700 border-emerald-200/50" : "bg-amber-50 text-amber-700 border-amber-200/50"}`}>
                                            {booking.status || "Pending"}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* EDIT PROFILE MODAL DIALOG OVERLAY */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
                    <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl border border-slate-100 relative">
                        
                        {/* Close Icon */}
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            ✕
                        </button>

                        <h3 className="text-lg font-bold text-slate-800 mb-4">Update Profile Details</h3>
                        
                        <form onSubmit={handleUpdateProfile} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Full Name</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    defaultValue={session?.user?.name || ""}
                                    className="w-full px-3.5 py-2.5 border border-slate-200 text-slate-800 bg-slate-50/50 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-[#0091A1] focus:ring-4 focus:ring-[#0091A1]/10 transition-all font-medium"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Email Address</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    defaultValue={session?.user?.email || ""}
                                    className="w-full px-3.5 py-2.5 border border-slate-200 text-slate-800 bg-slate-50/50 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-[#0091A1] focus:ring-4 focus:ring-[#0091A1]/10 transition-all font-medium"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Profile Image URL</label>
                                <input 
                                    type="text" 
                                    name="image"
                                    defaultValue={session?.user?.image || ""}
                                    className="w-full px-3.5 py-2.5 border border-slate-200 text-slate-800 bg-slate-50/50 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-[#0091A1] focus:ring-4 focus:ring-[#0091A1]/10 transition-all font-medium"
                                    placeholder="https://image-link.com"
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="w-1/2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold py-2.5 rounded-xl text-sm transition-all"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={isUpdating}
                                    className="w-1/2 bg-[#0091A1] hover:bg-[#007b8a] text-white font-semibold py-2.5 rounded-xl text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {isUpdating ? "Updating..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;