import { configureStore } from "@reduxjs/toolkit";
import userReducer, { login } from "../features/user/userSlice";
import { getToken, getUser } from "../utils/authHelper";
import adminReducer from "../features/admin/adminSlice";
import serviceReducer from "../features/service/serviceSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    service: serviceReducer, // ✅ this key must match what you use in useSelector
  },
});

// ✅ Re-hydrate on page load
const token = getToken();
const user = getUser();

if (token && user) {
  store.dispatch(login(user));
}
