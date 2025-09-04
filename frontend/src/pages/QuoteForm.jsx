import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedService } from "../features/service/serviceSlice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SelectServiceModal from "../components/SelectServiceModal";
import axiosInstance from "../utils/axiosInstance";
import { useSnackbar } from "notistack";

const QuoteForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selected } = useSelector((state) => state.service);
  const { user } = useSelector((state) => state.user); // ✅ Assuming user is in Redux
  const { enqueueSnackbar } = useSnackbar();

  const [showChangeService, setShowChangeService] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postCode: "",
    details: "",
  });

  useEffect(() => {
    if (!selected) {
      navigate("/services");
    }
  }, [selected, navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!user) {
      enqueueSnackbar("Please log in to book a service.", {
        variant: "warning",
      });
      navigate("/login"); // Optional: Redirect to login page
      return;
    }

    if (!selected) {
      enqueueSnackbar("Please select a service before booking.", {
        variant: "warning",
      });
      return;
    }

    const { firstName, lastName, email, address, city, postCode } = form;
    if (!firstName || !lastName || !email || !address || !city || !postCode) {
      enqueueSnackbar("Please fill in all required fields.", {
        variant: "error",
      });
      return;
    }

    try {
      setLoading(true);
      const payload = {
        ...form,
        service: {
          _id: selected._id,
          title: selected.title,
          price: selected.price,
          shortDescription: selected.shortDescription,
          thumbnail: selected.thumbnail,
        },
      };

      await axiosInstance.post("/bookings", payload);
      enqueueSnackbar("Booking submitted successfully!", {
        variant: "success",
      });

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        city: "",
        postCode: "",
        details: "",
      });
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Failed to submit booking. Please try again.", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div
        className={`relative ${showChangeService ? "pointer-events-none" : ""}`}
      >
        <div className="min-h-screen bg-white px-4 sm:px-8 py-10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-semibold">Quote</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  name="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  value={form.firstName}
                  onChange={handleChange}
                  className="border rounded-md p-3 w-full border-gray-200"
                />
                <input
                  name="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  value={form.lastName}
                  onChange={handleChange}
                  className="border rounded-md p-3 w-full border-gray-200"
                />
              </div>

              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                className="border rounded-md p-3 w-full border-gray-200"
              />

              <input
                name="address"
                type="text"
                placeholder="456 Elm Street"
                value={form.address}
                onChange={handleChange}
                className="border rounded-md p-3 w-full border-gray-200"
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    <img
                      src="https://flagcdn.com/w40/au.png"
                      alt="Australia"
                      className="h-5 w-5"
                    />
                    <span className="text-gray-600 text-sm">Australia</span>
                  </div>
                  <input
                    type="text"
                    className="border rounded-md p-3 w-full pl-20 bg-gray-100 text-gray-500 border-gray-200"
                    disabled
                  />
                </div>

                <input
                  name="city"
                  type="text"
                  placeholder="Town/City"
                  value={form.city}
                  onChange={handleChange}
                  className="border rounded-md p-3 w-full border-gray-200"
                />
                <input
                  name="postCode"
                  type="text"
                  placeholder="Post Code"
                  value={form.postCode}
                  onChange={handleChange}
                  className="border rounded-md p-3 w-full border-gray-200"
                />
              </div>

              <textarea
                name="details"
                rows={4}
                placeholder="More Details about Property"
                value={form.details}
                onChange={handleChange}
                className="border rounded-md p-3 w-full border-gray-200"
              ></textarea>

              <button
                disabled={loading}
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium w-full sm:w-auto disabled:opacity-50"
              >
                {loading ? "Booking..." : "Book Now"}
              </button>
            </div>

            {/* Right Card */}
            <div className="bg-blue-50 rounded-xl shadow p-4 self-start">
              {selected ? (
                <>
                  <img
                    src={`http://localhost:9700/uploads/${selected.thumbnail}`}
                    alt={selected.title}
                    className="w-full max-h-40 object-cover rounded-lg"
                  />
                  <div className="mt-3">
                    <h3 className="text-lg font-semibold">{selected.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {selected.shortDescription}
                    </p>
                    <p className="mt-2 text-sm">
                      Price:{" "}
                      <span className="text-blue-600 font-semibold">
                        ${selected.price}
                      </span>
                    </p>
                    <button
                      onClick={() => setShowChangeService(true)}
                      className="text-sm text-black mt-3 pl-24 hover:underline flex items-center gap-1"
                    >
                      Change service <span className="text-lg">🔄</span>
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-sm text-gray-600">No service selected</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {showChangeService && (
        <SelectServiceModal onClose={() => setShowChangeService(false)} />
      )}

      <Footer />
    </>
  );
};

export default QuoteForm;
