"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/app/lib/auth-client";

export default function BookAppointmentPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  
  const id = params?.id;
  const doctorQuery = searchParams.get("doctor") || "Doctor";
  const slotQuery = searchParams.get("slot") || "";

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [formData, setFormData] = useState({
    userEmail: "", 
    doctorName: doctorQuery,
    patientName: "",
    gender: "Male",
    phone: "",
    date: "", 
    time: slotQuery, 
    reason: ""
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      userEmail: user?.email || "",
      time: slotQuery || prev.time,
      doctorName: doctorQuery || prev.doctorName
    }));
  }, [slotQuery, doctorQuery, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to book an appointment");
      return;
    }
    setSubmitting(true);

    try {
      const apiUri = process.env.NEXT_PUBLIC_API_URI;
      const res = await fetch(`${apiUri}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          doctorId: id,
          ...formData
        }),
      });

      if (!res.ok) throw new Error("Failed to book appointment");

      alert("Appointment Confirmed Successfully!");
      router.push("/all-appointment"); 
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Failed to confirm booking. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-100">
        
        <div className="p-6 pb-4 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Book Appointment</h2>
            <p className="text-xs text-slate-500 mt-0.5">with {formData.doctorName}</p>
          </div>
          <Link href={`/all-appointment/${id}`} className="text-xs font-semibold text-slate-400 hover:text-slate-600">
            Cancel
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">User Email</label>
            <input 
              type="email" 
              name="userEmail"
              value={formData.userEmail}
              readOnly
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-600 focus:outline-none"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Doctor Name</label>
            <input 
              type="text" 
              value={formData.doctorName}
              disabled
              className="w-full px-4 py-2.5 rounded-xl border border-slate-100 bg-slate-100/70 text-sm text-slate-500 cursor-not-allowed"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Patient Name *</label>
            <input 
              type="text" 
              name="patientName"
              placeholder="Full name"
              value={formData.patientName}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Gender *</label>
              <select 
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Phone *</label>
              <input 
                type="tel" 
                name="phone"
                placeholder="01XXXXXXXXX"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Date *</label>
              <input 
                type="date" 
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Time *</label>
              <input 
                type="text" 
                name="time"
                placeholder="e.g. 05:00 PM"
                value={formData.time}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Reason (optional)</label>
            <textarea 
              name="reason"
              placeholder="Brief reason for visit"
              value={formData.reason}
              onChange={handleChange}
              rows="2"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={submitting || !user}
            className="w-full text-center bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 text-white font-bold py-3 rounded-xl transition-all text-sm shadow-md mt-2 cursor-pointer disabled:cursor-not-allowed"
          >
            {submitting ? "Booking..." : "Confirm Booking"}
          </button>
        </form>

      </div>
    </div>
  );
}