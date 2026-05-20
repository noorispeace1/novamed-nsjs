import Image from "next/image";
import Link from "next/link";
import React from "react";

const fetchSingleAppointment = async (id) => {


  try {
    let apiUri = process.env.NEXT_PUBLIC_API_URI;
    if (!apiUri) {
      console.warn("Warning: NEXT_PUBLIC_API_URI is missing.");
      return null;
    }

   
    if (apiUri.endsWith('/')) {
      apiUri = apiUri.slice(0, -1);
    }

    const res = await fetch(`${apiUri}/all-appointment/${id}`, {
      cache: 'no-store' 
    });

    if (!res.ok) {
      console.error(`Fetch failed with status: ${res.status}`);
      return null;
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching appointment details:", error);
    return null;
  }
};

export default async function AppointmentDetailsPage({ params }) {

 
  const resolvedParams = await params;
  const id = resolvedParams?.id; 
console.log(resolvedParams);
  if (!id) {
    return <p className="text-center p-8 text-red-500">Invalid Appointment ID.</p>;
  }

  const appointment = await fetchSingleAppointment(id);

  if (!appointment) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-slate-50 p-4">
        <div className="text-center p-8 bg-white rounded-2xl border border-slate-100 shadow-sm max-w-sm">
          <p className="text-slate-600 font-medium">Doctor details not found.</p>
          <p className="text-xs text-slate-400 mt-2">The link might be broken or the server is offline.</p>
          <Link href="/all-appointment" className="mt-4 inline-block text-xs font-bold text-blue-600 hover:underline">
            ← Back to All Doctors
          </Link>
        </div>
      </div>
    );
  }

  const {
    name,
    specialty,
    image,
    experience,
    hospital,
    location,
    description,
    availability,
    fee
  } = appointment;

  const appointmentId = appointment._id || id;
  const defaultSlot = availability && availability.length > 0 ? availability[0] : "";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
  
        <div className="mb-6">
          <Link href="/all-appointment" className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors duration-150">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Directory
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            
            <div className="p-6 sm:p-8 border-b border-slate-50 flex flex-col sm:flex-row gap-6 items-center sm:items-start bg-gradient-to-r from-slate-50/30 to-white">
              <div className="relative h-32 w-32 sm:h-36 sm:w-36 rounded-2xl overflow-hidden border-2 border-white shadow-md bg-slate-100 flex-shrink-0">
                <Image
                  src={image && image.startsWith('http') ? image : 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400'}
                  alt={name || "Doctor"}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              <div className="text-center sm:text-left space-y-2">
                <span className="inline-block text-[11px] font-bold tracking-wider uppercase text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                  {specialty}
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {name}
                </h1>
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 text-xs font-medium text-slate-500">
                  <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-semibold">
                    {experience || "10 years"} Exp
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    {hospital}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Practitioner Biography</h2>
                <p className="text-slate-600 text-sm leading-relaxed antialiased">
                  {description}
                </p>
              </div>

              <div className="border-t border-slate-100 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Medical Affiliation</h3>
                  <p className="text-slate-800 font-semibold text-sm">{hospital}</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Chamber Location</h3>
                  <p className="text-slate-600 text-sm flex items-start gap-1">
                    <svg className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {location}
                  </p>
                </div>
              </div>
            </div>

          </div>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-6 lg:sticky lg:top-8">
            <div className="space-y-1">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Consultation Fee</h2>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-900">৳ {fee || "500"}</span>
                <span className="text-xs text-slate-400 font-medium">/ session</span>
              </div>
            </div>

            <div className="space-y-3 border-t border-slate-50 pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Available Appointment Slots
              </h3>
              
              <div className="flex flex-col gap-2">
                {availability && availability.length > 0 ? (
                  availability.map((slot, index) => (
                    <div
                      key={index}
                      className={`w-full text-left p-3 rounded-xl border text-xs font-semibold transition-all duration-150 ${
                        index === 0 
                          ? 'border-blue-600 bg-blue-50/50 text-blue-700 ring-2 ring-blue-600/10' 
                          : 'border-slate-100 bg-slate-50 text-slate-700'
                      }`}
                    >
                      {slot}
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 italic py-2">No active slots available for online booking.</p>
                )}
              </div>
            </div>
{
  console.log(appointmentId,"from appointment")
}
            <Link
              href={availability && availability.length > 0 ? `/all-appointment/${appointmentId}/book?doctor=${encodeURIComponent(name)}&slot=${encodeURIComponent(defaultSlot)}` : '#'}
              className={`w-full block text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 text-sm shadow-md shadow-blue-100 ${
                (!availability || availability.length === 0) && 'pointer-events-none opacity-50 bg-slate-100 text-slate-400 shadow-none'
              }`}
            >
              Confirm & Book Appointment
            </Link>

            <p className="text-[10px] text-center text-slate-400 leading-normal">
              Secured connection. Cancel at least 2 hours before the appointment for a full refund.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}