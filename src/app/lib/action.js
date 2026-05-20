'use server';

import { revalidatePath } from 'next/cache';


export async function deleteBooking(bookingId) {
    if (!bookingId) return { success: false, error: "Booking ID is required" };

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/bookings/${bookingId}`, {
            method: 'DELETE',
        });

        if (!res.ok) {
            throw new Error("Failed to delete booking from server");
        }

       
        revalidatePath('/dashboard/my-bookings'); 
        return { success: true };
    } catch (error) {
        console.error("Delete Error:", error);
        return { success: false, error: error.message };
    }
}