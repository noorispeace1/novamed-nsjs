"use client";

import React, { useState } from 'react';
import { toast } from 'react-hot-toast'; 
import { authClient } from '@/app/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    const loadingToast = toast.loading("Logging you in...");

    try {
      const { data, error } = await authClient.signIn.email({ 
        email, 
        password,
      });
      
      toast.dismiss(loadingToast);

      if (error) {
        toast.error(error.message || "Invalid credentials. Please try again.");
        return;
      }

      toast.success("Welcome back!");
      router.push("/"); 
    } catch (err) {
      toast.dismiss(loadingToast);
      console.error("Login Error:", err);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const loadingToast = toast.loading("Redirecting to Google...");
    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/', 
      });
    } catch (err) {
      toast.dismiss(loadingToast);
      console.error("Google Login Error:", err);
      toast.error("Google login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white antialiased selection:bg-[#934A8F] selection:text-white">
      
      <div className="hidden md:flex flex-col items-center justify-center bg-slate-50/60 p-12 relative overflow-hidden border-r border-slate-100">
        <div className="absolute top-12 left-12 text-[#934A8F]/30 animate-pulse text-2xl">✦</div>
        <div className="absolute bottom-20 right-16 text-[#934A8F]/20 text-3xl">✦</div>
        
        <div className="w-full max-w-md space-y-8 relative z-10 text-center">
          <div className="relative w-full aspect-[4/3] flex items-center justify-center rounded-2xl overflow-hidden bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100">
            <div className="absolute inset-0 opacity-[0.04] flex items-center justify-center">
              <svg className="w-full h-40 text-[#934A8F]" viewBox="0 0 100 20" fill="none" stroke="currentColor" strokeWidth="0.6">
                <path d="M0,10 L30,10 L35,2 L40,18 L45,8 L48,12 L52,10 L100,10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            
            <Image
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600"
              alt="Medical Professional Specialist"
              width={360}
              height={270}
              className="object-cover rounded-xl mix-blend-multiply"
              priority
            />
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-bold text-slate-800 tracking-tight">
              Your Health, Our Priority
            </h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
              Connect with certified medical specialists, manage your bookings seamlessly, and access digital prescriptions instantly.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200/60 text-left">
            <div>
              <p className="text-lg font-bold text-[#934A8F]">500+</p>
              <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Specialists</p>
            </div>
            <div>
              <p className="text-lg font-bold text-[#934A8F]">15k+</p>
              <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Happy Patients</p>
            </div>
            <div>
              <p className="text-lg font-bold text-[#934A8F]">4.9</p>
              <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Top Rating</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center bg-[#934A8F] px-6 sm:px-16 lg:px-24 relative">
        <div className="absolute top-16 right-16 text-white/10 text-4xl hidden sm:block">✦</div>
        <div className="absolute bottom-24 left-12 text-white/10 text-3xl hidden sm:block">✦</div>

        <div className="w-full max-w-[380px] space-y-6">
          <div className="space-y-1.5">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Welcome back
            </h2>
            <p className="text-white/70 text-xs font-medium uppercase tracking-widest">
              Patient & Doctor Console
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-[11px] font-semibold text-white/80 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="doctor@healthcare.com"
                className="block w-full h-11 px-4 text-sm text-slate-800 bg-white rounded-xl placeholder-slate-400/80 focus:outline-none focus:ring-[4px] focus:ring-white/15 transition-all duration-150"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-[11px] font-semibold text-white/80 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full h-11 pl-4 pr-11 text-sm text-slate-800 bg-white rounded-xl placeholder-slate-400/80 focus:outline-none focus:ring-[4px] focus:ring-white/15 transition-all duration-150"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 transition-colors duration-100 cursor-pointer"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268-2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-0.5">
              <label className="flex items-center gap-2 text-white/90 cursor-pointer select-none font-medium">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-none text-[#934A8F] focus:ring-0 h-4 w-4 bg-white/20 cursor-pointer"
                />
                Remember me
              </label>
              <Link href="/forgot-password" className="text-white/90 hover:text-white font-medium hover:underline transition-all">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center bg-white hover:bg-slate-50 active:scale-[0.99] text-[#934A8F] font-semibold h-11 px-4 rounded-xl transition-all duration-150 text-sm shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-[#934A8F]" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="relative flex items-center justify-center py-1">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/15"></div>
            </div>
            <span className="relative bg-[#934A8F] px-3 text-[10px] font-bold uppercase tracking-widest text-white/40">
              or
            </span>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2.5 bg-white hover:bg-slate-50 active:scale-[0.99] text-slate-700 font-semibold h-11 px-4 rounded-xl shadow-sm transition-all duration-150 text-sm cursor-pointer"
          >
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.53-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-8.17z" />
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.11 0-5.74-2.11-6.68-4.96H1.21v3.15C3.18 21.88 7.31 24 12 24z" />
              <path fill="#FBBC05" d="M5.32 14.24A7.16 7.16 0 0 1 4.91 12c0-.79.13-1.57.38-2.31V6.54H1.21A11.94 11.94 0 0 0 0 12c0 1.92.45 3.74 1.21 5.46l4.11-3.22z" />
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.18 2.12 1.21 5.36l4.11 3.22c.94-2.85 3.57-4.96 6.68-4.96z" />
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-xs text-white/70">
            New to the platform?{' '}
            <Link href="/register" className="text-white hover:underline font-semibold transition-all">
              Create an account
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
};

export default LoginPage;