import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { formatDate } from "../../utils/date";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axiosInstance.get("/bookings");
        setBookings(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md space-y-6 overflow-hidden">
      <h2 className="text-xl font-semibold p-6 border-b border-gray-100">Booking List</h2>

      <div className="rounded-md border border-gray-200 mx-6 mb-6 overflow-x-auto">
        {loading ? (
          <p className="p-6">Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p className="p-6">No bookings found.</p>
        ) : (
          <>
            <div className="flex justify-between items-center px-4 py-3 bg-blue-100">
              <span className="text-sm font-semibold">
                Total Bookings: {bookings.length}
              </span>
              <button className="text-blue-600 px-4 py-2 rounded-full text-sm border border-blue-600 hover:bg-blue-50">
                Export to Excel
              </button>
            </div>

            <table className="w-full text-sm text-left min-w-[700px]">
              <thead className="bg-gray-300 text-gray-800">
                <tr>
                  <th className="p-3 font-semibold whitespace-nowrap">Name</th>
                  <th className="p-3 font-semibold whitespace-nowrap">Email</th>
                  <th className="p-3 font-semibold whitespace-nowrap">Address</th>
                  <th className="p-3 font-semibold whitespace-nowrap">Service</th>
                  <th className="p-3 font-semibold whitespace-nowrap">Price</th>
                  <th className="p-3 font-semibold whitespace-nowrap">Created At</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking, i) => (
                  <tr key={booking._id || i} className={i % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                    <td className="p-3 whitespace-nowrap">{booking.firstName} {booking.lastName}</td>
                    <td className="p-3 whitespace-nowrap">{booking.email}</td>
                    <td className="p-3">
                      {booking.address}, {booking.city}, {booking.postCode}
                    </td>
                    <td className="p-3 whitespace-nowrap">{booking.service?.title}</td>
                    <td className="p-3 whitespace-nowrap">${booking.service?.price}</td>
                    <td className="p-3 whitespace-nowrap">{formatDate(booking.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingList;
