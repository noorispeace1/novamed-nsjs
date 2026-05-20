"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { signUp } from '@/app/lib/auth-client'; 
import { toast } from 'react-hot-toast'; 
import { useRouter } from 'next/navigation';


const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const formData = new FormData(e.currentTarget);
    const { name, email, photoUrl, password } = Object.fromEntries(formData.entries());

 
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const isValidLength = password.length >= 6;

    if (!isValidLength || !hasUppercase || !hasLowercase) {
      toast.error("Password must be at least 6 characters long, contain 1 uppercase letter, and 1 lowercase letter.");
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading("Creating account...");

    try {
      const { data, error } = await signUp.email({
        email,
        password,
        name,
        image: photoUrl, 
      });

      toast.dismiss(loadingToast);

      if (error) {
        console.error("Auth Error:", error.message);
        toast.error(error.message || "Registration Failed");
        return;
      }

      toast.success("Registration Successful!");
      router.push("/");
      
    } catch (err) {
      toast.dismiss(loadingToast);
      console.error("Submit Error:", err);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      toast.loading("Redirecting to Google...");
      await signUp.social({ 
        provider: 'google', 
        callbackURL: '/' 
      });
    } catch (err) {
      toast.dismiss();
      console.error(err);
      toast.error("Google sign up failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 sm:px-6 lg:px-8 font-sans antialiased text-slate-800">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200/80 p-8 shadow-sm space-y-6">
        
        <div className="space-y-1 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Register
          </h2>
          <p className="text-slate-500 text-sm">
            Enter your details to create your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1.5">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Dr. Jane Doe"
              className="block w-full h-11 px-4 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="doctor@healthcare.com"
              className="block w-full h-11 px-4 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
            />
          </div>

          <div>
            <label htmlFor="photoUrl" className="block text-sm font-semibold text-slate-700 mb-1.5">
              Photo URL
            </label>
            <input
              id="photoUrl"
              name="photoUrl"
              type="url"
              required
              placeholder="https://example.com/profile.jpg"
              className="block w-full h-11 px-4 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-1.5">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="block w-full h-11 px-4 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
            />
         
            <p className="text-[11px] text-slate-500 mt-1">
              Must contain at least 1 uppercase, 1 lowercase letter, and minimum 6 characters.
            </p>
          </div>

          <p className="text-sm text-slate-600 pt-1">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:underline font-semibold transition-all">
              Login
            </Link>
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 active:scale-[0.99] disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-bold h-11 px-4 rounded-lg transition-all text-sm shadow-sm cursor-pointer mt-2"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="relative flex items-center justify-center py-1">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <span className="relative bg-white px-3 text-xs text-slate-400 font-medium">
            Or sign up with
          </span>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-2.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold h-11 px-4 rounded-lg shadow-sm transition-all text-sm cursor-pointer"
        >
          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.53-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-8.17z" />
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.11 0-5.74-2.11-6.68-4.96H1.21v3.15C3.18 21.88 7.31 24 12 24z" />
            <path fill="#FBBC05" d="M5.32 14.24A7.16 7.16 0 0 1 4.91 12c0-.79.13-1.57.38-2.31V6.54H1.21A11.94 11.94 0 0 0 0 12c0 1.92.45 3.74 1.21 5.46l4.11-3.22z" />
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.18 2.12 1.21 5.36l4.11 3.22c.94-2.85 3.57-4.96 6.68-4.96z" />
          </svg>
          Google
        </button>

      </div>
    </div>
  );
};

export default RegisterPage;