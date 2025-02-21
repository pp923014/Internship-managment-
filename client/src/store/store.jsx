import { create } from 'zustand';
import axios from 'axios';
import { axiosInstance } from '../lib/axios';

const useStore = create((set) => ({
  features: [],
  fetchfeatures: async () => {
    try {
      const response = await axiosInstance.get('api/feature');
      set({ features: Array.isArray(response.data) ? response.data : [] });
    } catch (error) {
      console.error("Error fetching items:", error);
      set({ features: [] });  // ✅ Set to empty array on error
    }
  },  
  title: '',
  description: '',
  image: null,
  setTitle: (title) => set({ title }),
  setDescription: (description) => set({ description }),
  setImage: (image) => set({ image }),


  // fetching Internship data
  internships:[], 
  fetchinternships: async () => {
    try {
      const response = await axiosInstance.get('api/internship');
      set({ internships: Array.isArray(response.data) ? response.data : [] });
    } catch (error) {
      console.error("Error fetching items:", error);
      set({ internships: [] });  // ✅ Set to empty array on error
    }
  },  
  title: '',
  image: null,
  setTitle: (title) => set({ title }),
  setImage: (image) => set({ image }),

// to get the data from the trainee certificate
trainee: null,      // Stores trainee details
loading: false,     // Loading state
error: null,        // Error message

// Function to fetch trainee data
fetchTraineeData: async (certificateNo) => {
  set({ loading: true, error: null, trainee: null });

  try {
    const response = await axios.get(`http://localhost:5001/api/validate`, {
      params: { certificateNo },
    });

    if (response.data.success) {
      set({ trainee: response.data.data, loading: false, error: null });
    } else {
      set({ error: response.data.message, trainee: null, loading: false }); // ✅ Shows "No trainee found"
    }
  } catch (err) {
    console.error(err);
    set({ error: "Failed to fetch data. Try again.", trainee: null, loading: false }); // ✅ Only shows if API truly fails
  }
},
  
}));

export default useStore;