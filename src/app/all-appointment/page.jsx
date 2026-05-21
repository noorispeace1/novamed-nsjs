import AllAppointmentCard from '../components/AllAppointmentCard';
import SearchWrapper from '../components/Search';

export const metadata = {
  title: "All Appointment",
  description: "NovaMeD-Bd is Bangladesh's premier digital healthcare platform, connecting you with top-rated doctors across the nation.",
};

const fetchAllAppointment = async (searchQuery) => {
  try {
    const apiUri = process.env.NEXT_PUBLIC_API_URI;
    if (!apiUri) {
      console.warn("Warning: NEXT_PUBLIC_API_URI is missing.");
      return [];
    }
    const res = await fetch(`${apiUri}/all-appointment?search=${searchQuery}`, {
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

const AllAppointmentPage = async ({ searchParams }) => {
  const resolvedParams = await searchParams;
  const searchQuery = resolvedParams?.search || '';
  const appointmentsData = await fetchAllAppointment(searchQuery);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800 bg-clip-text text-transparent">
            Find Trusted Telehealth Doctors & Specialists
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-base text-slate-500 sm:text-lg">
            Schedule an online or in-person consultation with top-rated medical practitioners today.
          </p>
        </div>

        <SearchWrapper defaultValue={searchQuery} />

        {!appointmentsData || appointmentsData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-base text-slate-500 font-medium">No medical specialists available at this moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {appointmentsData.map((item) => (
              <AllAppointmentCard
                key={item._id || item.id}
                appointment={item}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAppointmentPage;