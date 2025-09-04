import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import AdminProtectedRoute from "./components/ProtectedRoutes/AdminProtectedRoute";

import HomePage from "./pages/HomePage";
import Services from "./pages/Services";
import QuoteForm from "./pages/QuoteForm";
import AboutUs from "./pages/AboutUs";
import ContactPage from "./pages/ContactPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecoverPassword from "./pages/RecoverPassword";
import RecoverPassword2 from "./pages/RecoverPassword2";
import CreateNewPassword from "./pages/CreateNewPassword";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./pages/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import TimeSheet from "./pages/TimeSheet";
import AddServices from "./pages/AddServices";
import Feedback from "./pages/Feedback";
import AllServices from "./pages/AllServices";
import BookingList from "./components/AddServices/BookingList";
import AppWrapper from "./AppWrapper";
import AdminWrapper from "./AdminWrapper";
import RateUs from "./pages/RateUs";

const App = () => {
  return (
    <Router>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={3000}
      >
        <Routes>
          {/* Public and User Routes (wrapped in AppWrapper) */}
          <Route
            path="/"
            element={
              <AppWrapper>
                <HomePage />
              </AppWrapper>
            }
          />
          <Route
            path="/services"
            element={
              <AppWrapper>
                <Services />
              </AppWrapper>
            }
          />
          <Route
            path="/quote-form"
            element={
              <AppWrapper>
                <QuoteForm />
              </AppWrapper>
            }
          />
          <Route
            path="/about-us"
            element={
              <AppWrapper>
                <AboutUs />
              </AppWrapper>
            }
          />
          <Route
            path="/contact-us"
            element={
              <AppWrapper>
                <ContactPage />
              </AppWrapper>
            }
          />
          <Route
            path="/login"
            element={
              <AppWrapper>
                <Login />
              </AppWrapper>
            }
          />
          <Route
            path="/signup"
            element={
              <AppWrapper>
                <Register />
              </AppWrapper>
            }
          />
          <Route
            path="/recoverpassword"
            element={
              <AppWrapper>
                <RecoverPassword />
              </AppWrapper>
            }
          />
          <Route
            path="/recoverpassword2"
            element={
              <AppWrapper>
                <RecoverPassword2 />
              </AppWrapper>
            }
          />
           <Route
            path="/review-us"
            element={
              <AppWrapper>
                <RateUs />
              </AppWrapper>
            }
          />
          <Route
            path="/newpassword"
            element={
              <AppWrapper>
                <CreateNewPassword />
              </AppWrapper>
            }
          />
          <Route path="/adminlogin" element={<AdminLogin />} />

          {/* Admin Protected Routes (wrapped in AdminWrapper) */}
          <Route
            path="/admin"
            element={
              <AdminWrapper>
                <AdminProtectedRoute />
              </AdminWrapper>
            }
          >
            <Route element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="timesheet" element={<TimeSheet />} />
              <Route path="add-services" element={<AddServices />} />
              <Route path="reviews" element={<Feedback />} />
              <Route path="allservices" element={<AllServices />} />
              <Route path="bookings" element={<BookingList />} />
            </Route>
          </Route>
        </Routes>
      </SnackbarProvider>
    </Router>
  );
};

export default App;
