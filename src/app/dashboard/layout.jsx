'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }) {
    const pathname = usePathname();

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">

        

       
            <div className="flex gap-2 mb-6 bg-gray-100 p-1 w-fit rounded-xl border border-gray-200">
              
                <Link 
                    href="/dashboard/my-bookings"
                    className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all inline-block ${
                        pathname === '/dashboard/my-bookings' 
                        ? 'bg-white text-slate-800 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                >
                    My Bookings
                </Link>
                
                {/* Tab: My Profile Link */}
                <Link 
                    href="/dashboard/my-profile"
                    className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all inline-block ${
                        pathname === '/dashboard/my-profile' 
                        ? 'bg-white text-slate-800 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                >
                    My Profile
                </Link>
            </div>

           
            <div className='w-11/12 bg-red-100 '>{children}</div>
        </div>
    );
}