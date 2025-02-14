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
  
}));

export default useStore;