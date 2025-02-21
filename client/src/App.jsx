import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Certificate from "./pages/Certificate";
import ApplyPage from "./pages/ApplyPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import useAuthStore from "./store/authStore";
import toast, { Toaster } from "react-hot-toast";
const App = () => {
  const { authUser } = useAuthStore();
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={
          !authUser ? <SignupPage/> : <Navigate to="/" />
        }/>
        <Route path="/login" element={
          !authUser ?
          <LoginPage /> : <Navigate to="/"></Navigate> } />
        <Route path="/dashboard" element={
          authUser ?
          <UserDashboard />
          :
          <HomePage/>
        } />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/varify" element={<Certificate />} />

        <Route path='/apply' element={
          authUser?
          <ApplyPage/>:
          <SignupPage/>} />
          </Routes>
      <Footer />
      <Toaster/>
    </div>
  );
};

export default App;
