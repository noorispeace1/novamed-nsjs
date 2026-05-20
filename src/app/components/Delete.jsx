"use client"
import React from 'react';
import Swal from 'sweetalert2';

const Delete = ({ bookingId, onDeleteSuccess }) => {
    
    const handleDelete = () => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
             
                fetch(`http://localhost:8080/bookings/${bookingId}`, {
                    method: 'DELETE',
                })
                .then(res => res.json())
                .then(data => {
                    if (data.result?.deletedCount > 0) {
             
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your booking has been deleted.",
                            icon: "success"
                        });
                        
          
                        if (onDeleteSuccess) {
                            onDeleteSuccess(bookingId);
                        }
                    }
                })
                .catch(error => {
                    console.error("Error deleting booking:", error);
                    Swal.fire({
                        title: "Error!",
                        text: "Something went wrong. Please try again.",
                        icon: "error"
                    });
                });
            }
        });
    };

    return (
        <button 
            onClick={handleDelete} 
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition duration-200 shadow-md"
        >
            Delete 
        </button>
    );
};

export default Delete;