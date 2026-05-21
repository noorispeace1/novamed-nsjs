"use client";

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import { authClient } from '../lib/auth-client';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false); 
    const [isProfileOpen, setIsProfileOpen] = useState(false); 
    const pathname = usePathname();
    const router = useRouter();
    const dropdownRef = useRef(null);

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSignOut = async () => {
        try {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        setIsOpen(false);
                        setIsProfileOpen(false);
                        router.push("/"); 
                    },
                },
            });
        } catch (error) {
            console.error("Sign out failed:", error);
        }
    };

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'All Appointment', href: '/all-appointment' },
        { name: 'Dashboard', href: '/dashboard/my-bookings' },
    ];


    return (
        <nav className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-teal-100/60 shadow-sm relative z-50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center space-x-3 cursor-pointer group">
                        <div className="bg-gradient-to-br from-teal-500/10 to-emerald-500/10 p-2 rounded-xl shadow-inner group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
                            <Image 
                                src="/logo.png" 
                                alt="NovaMeD-BD Logo" 
                                width={36} 
                                height={36} 
                                className="object-contain" 
                                priority
                            />
                        </div>
                        <span className="text-xl font-black bg-gradient-to-r from-teal-800 via-teal-600 to-emerald-600 bg-clip-text text-transparent tracking-tight">
                            NovaMeD<span className="text-emerald-500">.</span>BD
                        </span>
                    </Link>

                    {/* Navigation Links (Desktop) */}
                    <div className="hidden md:flex items-center space-x-1 font-medium">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link 
                                    key={link.href}
                                    href={link.href} 
                                    className={`px-4 py-2 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 ${
                                        isActive 
                                            ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md shadow-teal-600/20 scale-[1.02]" 
                                            : "text-slate-600 hover:bg-teal-50 hover:text-teal-600"
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Auth Buttons / Dynamic User Profile (Desktop) */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
                                {/* Profile Image Button */}
                                <button 
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="focus:outline-none relative transition-transform active:scale-95 cursor-pointer"
                                    title="View Profile Details"
                                >
                                    <Image
                                        src={user.image || "/fallback-avatar.png"} 
                                        alt={user.name || "User Profile"} 
                                        width={42}
                                        height={42}
                                        className="w-10 h-10 rounded-xl border-2 border-teal-500 object-cover shadow-sm ring-4 ring-teal-50 hover:border-emerald-500 transition-all"
                                    />
                                </button>

                                {/* Profile Details Dropdown Card */}
                                {isProfileOpen && (
                                    <div className="absolute right-28 top-12 w-64 bg-white border border-teal-100 rounded-2xl shadow-xl p-4 transition-all duration-200 animate-in fade-in slide-in-from-top-2 z-50">
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold text-teal-600 tracking-wider uppercase">Logged in as</p>
                                            <p className="text-sm font-black text-slate-800 truncate">{user.name}</p>
                                            <p className="text-xs text-slate-500 truncate">{user.email}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Signout Button */}
                                <button 
                                    onClick={handleSignOut}
                                    className="bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white px-4 py-2 rounded-xl font-bold transition-all duration-300 text-xs tracking-wider uppercase shadow-md shadow-rose-500/15 hover:shadow-rose-600/20 active:scale-95 cursor-pointer"
                                >
                                    Signout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link 
                                    href="/login"
                                    className={`px-5 py-2.5 rounded-xl font-bold transition-all duration-300 text-sm border cursor-pointer ${
                                        pathname === '/login'
                                            ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white border-transparent shadow-lg shadow-teal-600/20 scale-[1.02]"
                                            : "text-teal-700 bg-teal-50/60 border-teal-100 hover:bg-teal-600 hover:text-white hover:border-transparent hover:shadow-md hover:shadow-teal-600/10"
                                    }`}
                                >
                                    Login
                                </Link>
                                <Link 
                                    href="/register"
                                    className={`px-5 py-2.5 rounded-xl font-bold transition-all duration-300 text-sm border cursor-pointer shadow-sm ${
                                        pathname === '/register'
                                            ? "bg-gradient-to-r from-teal-700 to-emerald-700 text-white border-transparent shadow-lg shadow-teal-700/20 scale-[1.02]"
                                            : "bg-gradient-to-r from-teal-600 to-emerald-600 text-white border-transparent hover:from-teal-700 hover:to-emerald-700 hover:shadow-lg hover:shadow-teal-600/20"
                                    }`}
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Hamburger Menu (Mobile Button) */}
                    <div className="flex md:hidden items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="inline-flex items-center justify-center p-2.5 rounded-xl text-teal-700 hover:text-teal-900 hover:bg-teal-100/60 focus:outline-none transition-all border border-teal-100/80 shadow-sm"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Responsive Menu */}
            <div 
                className={`md:hidden absolute w-full bg-white/98 backdrop-blur-lg left-0 shadow-2xl border-b border-teal-50/80 transition-all duration-300 ease-in-out ${
                    isOpen ? "top-20 opacity-100 visible" : "-top-96 opacity-0 invisible"
                }`}
            >
                <div className="px-4 pt-3 pb-6 space-y-2">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`block px-4 py-3 rounded-xl text-base font-bold transition-all duration-200 ${
                                    isActive
                                        ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md shadow-teal-600/15"
                                        : "text-slate-600 hover:bg-teal-50 hover:text-teal-600"
                                }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}

                    <hr className="my-4 border-teal-100/50" />

                    {/* Auth Buttons / User Profile (Mobile Dynamic) */}
                    <div className="px-2">
                        {user ? (
                            <div className="flex flex-col space-y-3 bg-gradient-to-r from-teal-50 to-emerald-50 p-4 rounded-xl border border-teal-100/50 shadow-sm">
                                {/* User Info for Mobile */}
                                <div className="flex items-center space-x-3">
                                    <Image
                                        src={user.image || "/fallback-avatar.png"} 
                                        alt={user.name || "User Profile"}
                                        width={44}
                                        height={44}
                                        className="w-11 h-11 rounded-xl border-2 border-teal-500 object-cover"
                                    />
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-slate-800 font-black text-sm truncate">{user.name}</span>
                                        <span className="text-slate-500 text-xs truncate">{user.email}</span>
                                    </div>
                                </div>
                                
                                <button
                                    onClick={handleSignOut}
                                    className="w-full bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white py-2.5 rounded-xl font-bold transition-all text-xs uppercase tracking-wider shadow-sm cursor-pointer text-center"
                                >
                                    Signout
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col space-y-2.5">
                                <Link 
                                    href="/login"
                                    onClick={() => setIsOpen(false)}
                                    className={`w-full text-center font-bold py-3 rounded-xl transition-all text-sm border cursor-pointer ${
                                        pathname === '/login'
                                            ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white border-transparent shadow-md"
                                            : "text-teal-700 bg-teal-50/60 border-teal-100 hover:bg-teal-600 hover:text-white hover:border-transparent"
                                    }`}
                                >
                                    Login
                                </Link>
                                <Link 
                                    href="/register"
                                    onClick={() => setIsOpen(false)}
                                    className={`w-full text-center font-bold py-3 rounded-xl transition-all text-sm border cursor-pointer shadow-sm ${
                                        pathname === '/register'
                                            ? "bg-gradient-to-r from-teal-700 to-emerald-700 text-white border-transparent shadow-md"
                                            : "bg-gradient-to-r from-teal-600 to-emerald-600 text-white border-transparent hover:from-teal-700 hover:to-emerald-700"
                                    }`}
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;