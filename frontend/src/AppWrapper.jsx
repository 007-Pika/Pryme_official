import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "./utils/axiosInstance";
import { login, logout, setLoading } from "./features/user/userSlice";

const AppWrapper = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get("/auth/me", { withCredentials: true });
        dispatch(login(data.user));
      } catch (error) {
        dispatch(logout());
      }
    };

    checkAuth();
  }, [dispatch]);

  return children;
};

export default AppWrapper;
