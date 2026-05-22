// "use client";

// import { useState, useEffect, useRef } from "react";
// import { Avatar, Card, Input, Button } from '@heroui/react';
// import { toast, Toaster } from "react-hot-toast";
// import { 
//   Camera, User, Mail, Save, Calendar, 
//   CheckCircle2, Clock, ShieldCheck, Bookmark 
// } from 'lucide-react';
// import { authClient } from '@/app/lib/auth-client';

// const ProfilePage = () => {
//     const fileInputRef = useRef(null);
//     const { 
//         data: session, 
//         isPending: isSessionPending, 
//         error: sessionError, 
//         refetch: refetchSession 
//     } = authClient.useSession();
    
//     const user = session?.user;

//     const [bookings, setBookings] = useState([]);
//     const [isBookingsLoading, setIsBookingsLoading] = useState(false);
//     const [isUpdating, setIsUpdating] = useState(false);

//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [image, setImage] = useState("");

//   
//     useEffect(() => {
//         if (user) {
//             setName(user.name || "");
//             setEmail(user.email || "");
//             setImage(user.image || "");
//         }
//     }, [user]);

// 
//     useEffect(() => {
//         if (!user?.id) return;

//         setIsBookingsLoading(true);
//         fetch(`${process.env.NEXT_PUBLIC_API_URI}/booking/${user.id}`, {
//             cache: 'no-store'
//         })
//         .then((res) => {
//             if (!res.ok) throw new Error("Failed to fetch bookings");
//             return res.json();
//         })
//         .then((data) => {
//             setBookings(data);
//         })
//         .catch((error) => {
//             console.error(error);
//             toast.error("Could not load bookings.");
//         })
//         .finally(() => {
//             setIsBookingsLoading(false);
//         });
//     }, [user?.id]);

//     
//     const handleUpdateProfile = async (e) => {
//         e.preventDefault();
//         setIsUpdating(true);

//         const updatedData = {
//             name: name,
//             image: image
//         };

//         try {
//             const { error } = await authClient.updateUser(updatedData);

//             if (error) {
//                 toast.error(error.message || 'Update failed. Please try again.');
//                 return;
//             }

//             await refetchSession();
//             toast.success('Profile updated successfully!');
//         } catch (error) {
//             toast.error('Server connection error!');
//             console.error(error);
//         } finally {
//             setIsUpdating(false);
//         }
//     };

//  
//     const handleImageChange = (e) => {
//         const file = e.target.files?.[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setImage(reader.result);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//
//     const handleDownloadImage = async () => {
//         const currentImage = image || "https://picsum.photos/200";
//         try {
//             const response = await fetch(currentImage);
//             const blob = await response.blob();
//             const url = window.URL.createObjectURL(blob);
//             const link = document.createElement("a");
//             link.href = url;
//             link.download = `${name || "user"}-profile.jpg`;
//             document.body.appendChild(link);
//             link.click();
//             document.body.removeChild(link);
//             window.URL.revokeObjectURL(url);
//         } catch (error) {
//             console.error(error);
//             toast.error("Failed to download image.");
//         }
//     };
  
//   
//     if (isSessionPending) {
//         return (
//             <div className="flex justify-center items-center min-h-screen w-full bg-gradient-to-br from-slate-50 via-zinc-100 to-slate-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-neutral-950">
//                 <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md border border-white/40 dark:border-zinc-800/40 shadow-xl">
//                     <span className="w-12 h-12 border-4 border-[#0091A1]/20 border-t-[#0091A1] rounded-full animate-spin"></span>
//                     <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 tracking-wider">Loading secure session...</p>
//                 </div>
//             </div>
//         );
//     }

//   
//     if (sessionError) {
//         return (
//             <div className="flex justify-center items-center min-h-screen w-full bg-gradient-to-br from-slate-50 via-zinc-100 to-slate-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-neutral-950">
//                 <div className="p-6 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 shadow-xl">
//                     <p className="text-red-600 dark:text-red-400 font-semibold flex items-center gap-2">
//                         <span>Authentication Error:</span> {sessionError.message}
//                     </p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-zinc-100 to-slate-200 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 flex flex-col justify-center py-10 lg:py-16 relative overflow-hidden">
//             <Toaster position="top-center" reverseOrder={false} />
            
//        
//             <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#0091A1]/5 dark:bg-[#0091A1]/10 rounded-full blur-[120px] pointer-events-none" />
//             <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-500/5 dark:bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

//             <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10 w-full">
//                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
//                    
//                     <div className="lg:col-span-5 h-full">
//                         <form onSubmit={handleUpdateProfile} className="h-full">
//                             <Card className="p-6 sm:p-8 shadow-xl border border-white/60 dark:border-zinc-800/50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-3xl transition-all duration-300 hover:shadow-2xl">
//                                 <div className="flex flex-col items-center space-y-6">
                                    
//                                   
//                                     <div className="relative group">
//                                         <div className="absolute inset-0 bg-gradient-to-tr from-[#0091A1] to-cyan-400 rounded-full blur opacity-40 group-hover:opacity-60 transition duration-300" />
//                                         <div className="relative">
//                                             <div 
//                                                 onClick={handleDownloadImage}
//                                                 className="cursor-pointer"
//                                                 title="Click to download image"
//                                             >
//                                                 <Avatar 
//                                                  
//                                                     src={image || "https://picsum.photos/200"} 
//                                                     name={name || "U"}
//                                                     className="w-32 h-32 text-2xl ring-4 ring-white dark:ring-zinc-900 font-bold shadow-inner transition-transform duration-200 hover:scale-105"
//                                                 />
//                                             </div>
//                                             <button 
//                                                 type="button"
//                                                 onClick={() => fileInputRef.current?.click()}
//                                                 className="absolute bottom-1 right-1 bg-[#0091A1] p-2.5 rounded-full text-white shadow-lg cursor-pointer hover:bg-[#007b8a] transition-all duration-200 hover:scale-110 active:scale-95"
//                                             >
//                                                 <Camera size={16} />
//                                             </button>
//                                             <input 
//                                                 type="file" 
//                                                 ref={fileInputRef} 
//                                                 onChange={handleImageChange} 
//                                                 className="hidden" 
//                                                 accept="image/*"
//                                             />
//                                         </div>
//                                     </div>

//                                     <div className="text-center space-y-1">
//                                         <h2 className="text-2xl font-extrabold tracking-tight text-zinc-800 dark:text-zinc-100">Account Settings</h2>
//                                         <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Manage profile data and identities</p>
//                                     </div>

//                                
//                                     <div className="w-full space-y-4 pt-2">
//                                         <Input 
//                                             label="Full Name" 
//                                             variant="bordered" 
//                                             labelPlacement="outside"
//                                             placeholder="John Doe"
//                                             value={name} 
//                                             onChange={(e) => setName(e.target.value)} 
//                                             classNames={{
//                                                 inputWrapper: "h-12 border-zinc-200 dark:border-zinc-700 hover:border-[#0091A1] focus-within:!border-[#0091A1] bg-white/50 dark:bg-zinc-800/30 rounded-xl"
//                                             }}
//                                             startContent={<User size={16} className="text-zinc-400 shrink-0" />} 
//                                         />
//                                         <Input 
//                                             label="Email Address" 
//                                             variant="bordered" 
//                                             labelPlacement="outside"
//                                             value={email} 
//                                             disabled 
//                                             classNames={{
//                                                 inputWrapper: "h-12 border-zinc-200 dark:border-zinc-700 bg-zinc-100/50 dark:bg-zinc-800/50 cursor-not-allowed opacity-80 rounded-xl"
//                                             }}
//                                             startContent={<Mail size={16} className="text-zinc-400 shrink-0" />} 
//                                         />
//                                         <Input 
//                                             label="Avatar URL" 
//                                             variant="bordered" 
//                                             labelPlacement="outside"
//                                             placeholder="https://example.com/avatar.jpg"
//                                             value={image} 
//                                             onChange={(e) => setImage(e.target.value)} 
//                                             classNames={{
//                                                 inputWrapper: "h-12 border-zinc-200 dark:border-zinc-700 hover:border-[#0091A1] focus-within:!border-[#0091A1] bg-white/50 dark:bg-zinc-800/30 rounded-xl"
//                                             }}
//                                             startContent={<Camera size={16} className="text-zinc-400 shrink-0" />} 
//                                         />
//                                     </div>

//                                     <Button 
//                                         type="submit"
//                                         className="w-full h-12 font-bold text-sm bg-gradient-to-r from-[#0091A1] to-[#007b8a] text-white rounded-xl shadow-lg shadow-cyan-600/10 hover:shadow-xl hover:shadow-cyan-600/20 hover:opacity-95 active:scale-[0.99] transition-all duration-200" 
//                                         isLoading={isUpdating} 
//                                         startContent={!isUpdating && <Save size={16} />}
//                                     >
//                                         Save Changes
//                                     </Button>
//                                 </div>
//                             </Card>
//                         </form>
//                     </div>

//                     <div className="lg:col-span-7 space-y-6">
//                         <Card className="p-6 border border-white/60 dark:border-zinc-800/50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md shadow-xl rounded-3xl">
//                             <div className="flex items-center justify-between mb-6">
//                                 <div className="flex items-center gap-3">
//                                     <div className="p-2.5 rounded-xl bg-[#0091A1]/10 text-[#0091A1]">
//                                         <Bookmark size={20} />
//                                     </div>
//                                     <div>
//                                         <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">My Bookings</h3>
//                                         <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 mt-0.5">Manage and track your appointments</p>
//                                     </div>
//                                 </div>
//                                 <span className="bg-[#f0f9fa] dark:bg-[#0091A1]/10 text-[#0091A1] text-xs font-bold px-3 py-1.5 rounded-xl border border-[#0091A1]/20">
//                                     Total: {bookings.length}
//                                 </span>
//                             </div>
                            
//                             <hr className="mb-6 border-zinc-100 dark:border-zinc-800/60" />
                            
//                             {isBookingsLoading ? (
//                                 <div className="flex justify-center items-center py-20">
//                                     <span className="w-10 h-10 border-4 border-[#0091A1]/20 border-t-[#0091A1] rounded-full animate-spin"></span>
//                                 </div>
//                             ) : bookings.length === 0 ? (
//                                 <div className="text-center py-16 bg-slate-50/40 dark:bg-zinc-800/10 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center p-6">
//                                     <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 mb-3">
//                                         <Calendar size={22} />
//                                     </div>
//                                     <p className="text-zinc-400 dark:text-zinc-500 text-sm font-medium">No booking data found active at this time.</p>
//                                 </div>
//                             ) : (
//                                 <div className="grid grid-cols-1 gap-4 max-h-[440px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
//                                     {bookings.map((booking, index) => (
//                                         <div 
//                                             key={booking._id || booking.id || index} 
//                                             className="p-4 border border-zinc-100 dark:border-zinc-800/80 rounded-2xl bg-white dark:bg-zinc-900/50 flex justify-between items-center hover:border-zinc-200 dark:hover:border-zinc-700 hover:shadow-md transition-all duration-200 group"
//                                         >
//                                             <div className="space-y-2">
//                                                 <p className="font-bold text-zinc-700 dark:text-zinc-200 text-base group-hover:text-[#0091A1] transition-colors">
//                                                     {booking.title || booking.doctorName || "Doctor Appointment"}
//                                                 </p>
//                                                 <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 dark:text-zinc-500">
//                                                     <Calendar size={14} className="text-zinc-400" />
//                                                     <span>Date:</span>
//                                                     <span className="text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800/80 px-2 py-0.5 rounded-md font-medium">
//                                                         {booking.date || "N/A"}
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             <div>
//                                                 <span className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 shadow-sm ${
//                                                     booking.status === "confirmed" 
//                                                         ? "bg-emerald-50/60 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-900/30" 
//                                                         : "bg-amber-50/60 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border-amber-200/50 dark:border-amber-900/30"
//                                                 }`}>
//                                                     {booking.status === "confirmed" ? <CheckCircle2 size={13} /> : <Clock size={13} />}
//                                                     <span className="capitalize">{booking.status || "Pending"}</span>
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                         </Card>

//                         <div className="p-4 bg-zinc-900/[0.02] dark:bg-white/[0.01] rounded-2xl border border-zinc-200/50 dark:border-zinc-800/40 backdrop-blur-sm flex items-center justify-center gap-3">
//                             <ShieldCheck size={16} className="text-[#0091A1] shrink-0" />
//                             <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 tracking-wide leading-relaxed text-center">
//                                 Secure system processing. All actions fall under our standard Terms of Service and data regulations natively compliant with GDPR protocols.
//                             </p>
//                         </div>
//                     </div>

//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProfilePage;

