// Save JWT token & user to localStorage
export const saveToken = (token, user) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

// Get user from localStorage
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Remove both
export const removeToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// Check logged in
export const isLoggedIn = () => {
  return !!getToken();
};
