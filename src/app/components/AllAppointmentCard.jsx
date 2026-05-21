import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const AllAppointmentCard = ({ appointment }) => {

  if (!appointment) return null;

  const {
    _id,
    name,
    specialty,
    image,
    experience,
    hospital,
    description,
    availability,
    fee
  } = appointment;

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-out flex flex-col justify-between group">
      <div>
        <div className="relative h-44 w-full overflow-hidden bg-slate-50 p-3 pb-0">
          <div className="relative w-full h-full overflow-hidden rounded-xl">
            <Image
              src={image && image.startsWith('http') ? image : 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400'}
              alt={name || 'Doctor'}
              fill
              sizes="(max-w-7xl) 25vw, 100vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
            />
          </div>
          {experience && (
            <div className="absolute top-5 right-5 bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
              {experience} Exp
            </div>
          )}
        </div>

        <div className="p-4 pb-2">
          <span className="inline-block text-[10px] font-bold tracking-wider uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md mb-2">
            {specialty || 'General Specialist'}
          </span>
          <h3 className="text-base font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors duration-200">
            {name}
          </h3>

          {hospital && (
            <p className="text-[11px] text-slate-400 font-semibold mb-2 flex items-center gap-1 mt-0.5">
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {hospital}
            </p>
          )}

          <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
            {description || 'No description available for this practitioner.'}
          </p>

          <div className="border-t border-slate-50 pt-3">
            <p className="text-[11px] font-bold text-slate-600 mb-1.5 flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Available Slots:
            </p>
            <div className="flex flex-wrap gap-1">
              {availability && availability.length > 0 ? (
                <>
                  {availability.slice(0, 3).map((slot, index) => (
                    <span key={index} className="text-[9px] bg-slate-50 border border-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium tracking-wide">
                      {slot}
                    </span>
                  ))}
                  {availability.length > 3 && (
                    <span className="text-[9px] text-slate-400 font-medium pt-0.5 pl-1">
                      +{availability.length - 3} more
                    </span>
                  )}
                </>
              ) : (
                <span className="text-[9px] text-slate-400 italic">No active slots</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 pt-0 mt-auto">
        <div className="flex items-center justify-between border-t border-slate-50 pt-3 mb-3">
          <span className="text-[11px] font-semibold text-slate-400">Fee</span>
          <span className="text-base font-black text-slate-900">৳ {fee || '500'}</span>
        </div>
        <Link
  href={`/all-appointment/${_id}`}
  className="block w-full text-center bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 text-sm shadow-sm hover:shadow-md border border-slate-800"
>
  View Details
</Link>
      </div>
    </div>
  );
};

export default AllAppointmentCard;