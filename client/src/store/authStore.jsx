import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-toastify";
import { axiosInstance } from "../lib/axios";

const useAuthStore = create(
  persist(
    (set) => ({
      authUser: null,
      isSigningUp: false,
      isLoggingIn: false,
      isCheckingAuth: true,

      checkAuth: async () => {
        try {
          const res = await axiosInstance.get("api/auth/check");
          set({ authUser: res.data });
        } catch (error) {
          console.log("Error in checkAuth:", error);
          set({ authUser: null });
        } finally {
          set({ isCheckingAuth: false });
        }
      },

      signup: async (fullName, email, password) => {
        set({ isSigningUp: true });
        try {
          const response = await axiosInstance.post("api/auth/signup", {
            fullName,
            email,
            password,
          });

          if (response.data) {
            set({ authUser: response.data });
            toast.success("Signup successful!");
          }
        } catch (error) {
          const errorMessage = error.response?.data?.message || "Signup failed";
          toast.error(errorMessage);
        } finally {
          set({ isSigningUp: false });
        }
      },

      login: async (email, password) => {

        set({ isLoggingIn: true });
        try {
          const response = await axiosInstance.post("api/auth/login", {
            email,
            password,
          });

          if (response.data) {
            set({ authUser: response.data });
            toast.success("Login successful!");
          }
        } catch (error) {
          const errorMessage = error.response?.data?.message || "Login failed";
          toast.error(errorMessage);
        } finally {
          set({ isLoggingIn: false });
        }
      },

      logout: async () => {
        try {
          await axiosInstance.post("api/auth/logout");
          set({ authUser: null });
          toast.success("Logged out successfully");
        } catch (error) {
          toast.error(error.response?.data?.message || "Logout failed");
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage), // ✅ Persists authUser in LocalStorage
    }
  )
);

export default useAuthStore;
