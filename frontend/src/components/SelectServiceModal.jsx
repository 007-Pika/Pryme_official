import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedService } from "../features/service/serviceSlice";

const SelectServiceModal = ({ onClose }) => {
  const { allServices } = useSelector((state) => state.service);
  const dispatch = useDispatch();

  const handleSelect = (service) => {
    dispatch(setSelectedService(service));
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target.id === "backdrop") onClose();
  };

  return (
    <div
      id="backdrop"
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-3xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold text-gray-800">Select a Service</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {allServices.map((service) => (
            <div
              key={service._id}
              onClick={() => handleSelect(service)}
              className="bg-gray-50 hover:bg-gray-100 transition border border-gray-200 rounded-xl p-4 shadow-sm cursor-pointer flex flex-col"
            >
              <div className="mb-2">
                <h4 className="text-lg font-medium text-gray-800">{service.title}</h4>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{service.shortDescription}</p>
              </div>
              <p className="text-blue-600 font-semibold mt-auto">${service.price}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2 rounded-md border border-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectServiceModal;
