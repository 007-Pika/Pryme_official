import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useSnackbar } from "notistack"; // ✅ Import notistack
import { getServices, deleteService } from "../../hooks/useGetServices";

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar(); // ✅ Use snackbar

  const fetchServices = async () => {
    try {
      const res = await getServices();
      setServices(Array.isArray(res) ? res : []);
    } catch (err) {
      console.error("Error fetching services:", err);
      enqueueSnackbar("Failed to load services.", { variant: "error" });
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteService(id);
      setServices((prev) => prev.filter((s) => s._id !== id));
      enqueueSnackbar("Service deleted successfully!", { variant: "success" });
    } catch (err) {
      console.error("Error deleting service:", err);
      enqueueSnackbar("Failed to delete service.", { variant: "error" });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md space-y-6 overflow-hidden">
      <h2 className="text-xl font-semibold p-6 border-b border-gray-100">
        Service List
      </h2>

      <div className="rounded-md border border-gray-200 mx-6 mb-6 overflow-x-auto">
        {loading ? (
          <p className="p-6">Loading...</p>
        ) : services.length === 0 ? (
          <p className="p-6">No services found.</p>
        ) : (
          <>
            <div className="flex justify-between items-center px-4 py-3 bg-blue-100">
              <span className="text-sm font-semibold">
                Total Services: {services.length}
              </span>
              <button className="text-blue-600 px-4 py-2 rounded-full text-sm border border-blue-600 hover:bg-blue-50">
                Export to Excel
              </button>
            </div>

            <table className="w-full text-sm text-left min-w-[700px]">
              <thead className="bg-gray-300 text-gray-800">
                <tr>
                  <th className="p-3 font-semibold whitespace-nowrap">Title</th>
                  <th className="p-3 font-semibold whitespace-nowrap">Short Description</th>
                  <th className="p-3 font-semibold whitespace-nowrap">Category</th>
                  <th className="p-3 font-semibold whitespace-nowrap">Price</th>
                  <th className="p-3 font-semibold whitespace-nowrap text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {services.map((service, i) => (
                  <tr
                    key={service._id || i}
                    className={i % 2 === 0 ? "bg-white" : "bg-gray-100"}
                  >
                    <td className="p-3">{service.title}</td>
                    <td className="p-3">{service.shortDescription}</td>
                    <td className="p-3">{service.category}</td>
                    <td className="p-3">${service.price}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleDelete(service._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <MdDelete size={20} />
                      </button>
                    </td>
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

export default ServicesList;
