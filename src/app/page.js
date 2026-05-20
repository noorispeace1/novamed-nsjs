import Image from "next/image";
import Banner from "./components/Banner";
import AllAppointmentCard from "./components/AllAppointmentCard";

const fetchAllAppointment = async () => {
  try {
    const apiUri = process.env.NEXT_PUBLIC_API_URI;
    if (!apiUri) {
      console.warn("Warning: NEXT_PUBLIC_API_URI is missing.");
      return [];
    }

    const res = await fetch(`${apiUri}/all-appointment`, {
      cache: 'no-store'
    });
    
    if (!res.ok) throw new Error('Failed to fetch data');
    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return [];
  }
};

export default async function Home () {
  const appointmentsData = await fetchAllAppointment();

  const topRatedAppointments = appointmentsData
    ? [...appointmentsData]
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 4)
    : [];

  return (
    <div>
      <Banner />
      
      {topRatedAppointments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-base text-slate-500 font-medium">No medical specialists available at this moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {topRatedAppointments.map((item) => (
            <AllAppointmentCard
              key={item._id || item.id} 
              appointment={item} 
            />
          ))}
        </div>
      )}
    </div>
  );
}