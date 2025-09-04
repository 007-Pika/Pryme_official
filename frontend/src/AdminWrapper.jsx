import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "./utils/axiosInstance";
import { setAdmin, logoutAdmin } from "./features/admin/adminSlice";

const AdminWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        const { data } = await axios.get("/admin/me", { withCredentials: true });
        dispatch(setAdmin(data.admin));
      } catch (error) {
        dispatch(logoutAdmin());
      } finally {
        setLoading(false);
      }
    };

    checkAdminAuth();
  }, [dispatch]);

  if (loading) return <div>Loading...</div>; // or spinner

  return children;
};

export default AdminWrapper;
