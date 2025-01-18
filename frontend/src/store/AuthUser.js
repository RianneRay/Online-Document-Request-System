import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLogingIn: false,
  isLoggingOut: false,
  signup: async (credentials) => {
    set({isSigningUp: true})
    try {
      const response = await axios.post("api/v1/user/signup", credentials)
      set({user:response.data.user, isSigningUp: false});
      toast.success("Signup Success")
    } catch (error) {
      toast.error(error.response.data.error || "Signup Failed");
      set({isSigningUp: false, user: null})
    }
  },
  login: async (credentials) => {
    set({isLogingIn: true})
    try {
      const response = await axios.post("api/v1/user/login", credentials)
      set({user:response.data.user, isLogingIn: false});
      toast.success("Login Success")
    } catch (error) {
      toast.error(error.response.data.error || "Login Failed");
      set({isLogingIn: false, user: null})
    }
  },
  logout: async (credentials) => {
    set({isLoggingOut: true})
    try {
      const response = await axios.post("api/v1/user/logout", credentials)
      set({user:response.data.user, isLoggingOut: false});
      toast.success("Login Success")
    } catch (error) {
      toast.error(error.response.data.error || "Logout Failed");
      set({isLoggingOut: false, user: null})
    }
  },
  authCheck: async (credentials) => {
    set({isCheckingAuth: true})
    try {
      const response = await axios.post("api/v1/user/authCheck")
      set({user:response.data.user, isCheckingAuth: false});
    } catch (error) {
      set({isCheckingAuth: false, user: null})
    }
  }
}))