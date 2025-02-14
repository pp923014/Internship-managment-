// import axios from "axios";
// import { toast } from "react-toastify";
// import { create } from "zustand";
// import { axiosInstance } from "../lib/axios";

// const useApplyStore = create((set) => ({
//   formData: {
//     fullName: "",
//     email: "",
//     contactNumber: "",
//     internshipType: "",
//     duration: "",
//   },
//   isLoading: false,
//   error: null,

//   // Update form data
//   setFormData: (name, value) => {
//     set((state) => ({
//       formData: {
//         ...state.formData,
//         [name]: value,
//       },
//     }));
//   },

//   // Submit application
//   applyForInternship: async () => {
//     set({ isLoading: true, error: null });

//     try {
//       const response = await axiosInstance.post(
//         "api/auth/apply",
//         {
//           name: useApplyStore.getState().formData.fullName,
//           email: useApplyStore.getState().formData.email,
//           contactNo: useApplyStore.getState().formData.contactNumber,
//           internshipType: useApplyStore.getState().formData.internshipType,
//           internshipDuration: useApplyStore.getState().formData.duration,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token for authentication
//           },
//         }
//       );

//       if (response.data) {
//         toast.success("Application submitted successfully!");
//         set({ formData: { fullName: "", email: "", contactNumber: "", internshipType: "", duration: "" } }); // Reset form data
//       }
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || "Failed to submit application";
//       set({ error: errorMessage });
//       toast.error(errorMessage);
//     } finally {
//       set({ isLoading: false });
//     }
//   },
// }));

// export default useApplyStore;



import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";
const useApplyStore = create((set, get) => ({
  formData: {
    fullName: "",
    email: "",
    contactNumber: "",
    internshipType: "",
    duration: "",
  },
  isLoading: false,
  error: null,

  // Update form data
  setFormData: (name, value) => {
    set((state) => ({
      formData: {
        ...state.formData,
        [name]: value,
      },
    }));
  },

  // Submit application
  applyForInternship: async () => {
    set({ isLoading: true, error: null });

    try {
      const { formData } = get();

      const response = await axiosInstance.post(
        "api/auth/apply",
        {
          name: formData.fullName,
          email: formData.email,
          contactNo: formData.contactNumber,
          internshipType: formData.internshipType,
          internshipDuration: formData.duration,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data) {
        // Reset form data
        set({
          formData: { fullName: "", email: "", contactNumber: "", internshipType: "", duration: "" },
          error: null,
        });

        // Show success alert
    
        alert("Application submitted successfully!");
      }
    } catch (error) {
    
      const errorMessage = error.response?.data?.message || "Failed to submit application";
      set({ error: errorMessage });

      // Show error alert
      alert(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useApplyStore;