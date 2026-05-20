
export  const fetchAllAppointment = async () => {
 
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/all-appointment` );
   
    const data = await res.json();
    return data || [] ;
}