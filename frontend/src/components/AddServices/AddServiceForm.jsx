import React, { useState, useRef } from "react";
import { useSnackbar } from "notistack";
import { addService } from "../../hooks/useAddService";
import ButtonWithLoader from "../ButtonWithLoader";

const categories = [
  "Cleaning",
  "Plumbing",
  "Electrical",
  "Pest Control",
  "Gardening & Lawn Care",
  "Handyman",
  "Painting",
  "Gutter Cleaning",
  "Car Detailing",
  "Appliance Repair",
];

const AddServiceForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const parsedPrice = parseFloat(price);

    if (!title || !shortDescription || !category || price === "" || isNaN(parsedPrice)) {
      enqueueSnackbar("Please fill in all required fields correctly.", { variant: "warning" });
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("shortDescription", shortDescription);
    formData.append("fullDescription", fullDescription);
    formData.append("category", category);
    formData.append("price", parsedPrice);
    formData.append("duration", duration);
    if (thumbnail) formData.append("thumbnail", thumbnail);

    try {
      await addService(formData);
      enqueueSnackbar("Service added successfully!", { variant: "success" });
      resetForm();
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Failed to add service.", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setShortDescription("");
    setFullDescription("");
    setCategory("");
    setPrice("");
    setDuration("");
    setThumbnail(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow space-y-4 w-full"
      encType="multipart/form-data"
    >
      <h2 className="text-xl font-semibold mb-4">Add New Service</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm mb-1">Service Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            placeholder="e.g., End of Lease Cleaning"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Price (AUD)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            placeholder="e.g., 120"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Estimated Duration</label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            placeholder="e.g., 1.5 hours"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm mb-1">Short Description</label>
          <input
            type="text"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            placeholder="Brief summary shown on card"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm mb-1">
            Full Description (optional)
          </label>
          <textarea
            value={fullDescription}
            onChange={(e) => setFullDescription(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            rows={4}
            placeholder="More details shown on service detail page"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm mb-1">Thumbnail Image</label>
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 text-sm"
            >
              {thumbnail ? "Change File" : "Choose File"}
            </button>
            <span className="text-gray-600 text-sm">
              {thumbnail ? thumbnail.name : "No file chosen"}
            </span>
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={(e) => setThumbnail(e.target.files[0])}
            className="hidden"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4 mt-6">
        <button
          type="button"
          onClick={resetForm}
          className="border border-gray-500 px-6 py-2 rounded-full"
        >
          Clear
        </button>

        <ButtonWithLoader
          type="submit"
          loading={loading}
          loadingText="Adding..."
          className="bg-blue-600 text-white px-6 py-2 rounded-full"
        >
          Add Service
        </ButtonWithLoader>
      </div>
    </form>
  );
};

export default AddServiceForm;
