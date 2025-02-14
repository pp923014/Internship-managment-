import React from "react";
import { Route, Routes } from "react-router-dom";
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
import toast from "react-hot-toast";
const App = () => {
  const { authUser } = useAuthStore();
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={
          !authUser? 
          <SignupPage />:<HomePage/>} />
        <Route path="/login" element={
          <LoginPage />} />
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
    </div>
  );
};

export default App;
