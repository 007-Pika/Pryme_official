import axiosInstance from "../utils/axiosInstance";

export const addService = async (serviceData) => {
  try {
    console.log("📦 Adding service with the following FormData:");
    for (const [key, value] of serviceData.entries()) {
      console.log(`${key}:`, value);
    }

    const response = await axiosInstance.post("/services", serviceData);
    return response.data;
  } catch (error) {
    console.error("❌ Error in addService:", error);
    throw error;
  }
};
