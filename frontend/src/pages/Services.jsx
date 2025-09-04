import React, { useEffect, useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { getServices } from "../hooks/useGetServices";
import { useDispatch } from "react-redux";
import { setAllServices, setSelectedService } from "../features/service/serviceSlice";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
        dispatch(setAllServices(data));
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
  }, [dispatch]);

  const filteredServices = useCallback(() => {
    return services.filter((service) =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, services]);

  const totalItems = filteredServices().length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const paginatedServices = filteredServices().slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 md:px-16 py-8 min-h-screen">
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-100 text-[15px] rounded-3xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedServices.length > 0 ? (
                paginatedServices.map((service, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-300 rounded-2xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1"
                  >
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48 flex items-center justify-center">
                      <img
                        src={`http://localhost:9700/uploads/${service.thumbnail}`}
                        alt={service.title}
                        className="h-48 w-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    <div className="p-4 flex flex-col justify-between h-full">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{service.shortDescription}</p>
                      </div>

                      <button
                        onClick={() => {
                          dispatch(setSelectedService(service));
                          navigate("/quote-form");
                        }}
                        className="w-full border border-blue-600 text-blue-700 bg-white rounded-lg px-4 py-2 hover:bg-blue-600 hover:text-white transition-colors duration-300"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <h3 className="text-xl font-semibold text-gray-700">No services found</h3>
                  <p className="text-gray-500 mt-2">Try adjusting your search term</p>
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="w-full border-t border-b border-gray-200 py-4 mt-10">
                <div className="flex justify-center items-center">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-full ${
                        currentPage === 1
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      <IoIosArrowBack className="text-lg" />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded ${
                          currentPage === page
                            ? "bg-blue-500 text-white font-medium"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-full ${
                        currentPage === totalPages
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      <IoIosArrowForward className="text-lg" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Services;
