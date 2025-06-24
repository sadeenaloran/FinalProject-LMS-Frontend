// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "@services/authService";

// const AuthContext = createContext();
const AuthContext = createContext({
  user: null,
  setUser: () => {
    console.warn('setUser called without provider');
  }
});

export const DEFAULT_REDIRECTS = {
  student: "/student/dashboard",
  instructor: "/instructor/dashboard",
  admin: "/admin/dashboard",
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.user?.role,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        role: null,
        error: action.payload,
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        role: null,
        error: null,
      };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
  loading: true,
  error: null,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        dispatch({ type: "SET_LOADING", payload: false });
        return;
      }
      try {
        const user = await authService.getProfile();
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user, token },
        });
      } catch (error) {
        console.error(error);
        localStorage.removeItem("token");
        dispatch({ type: "LOGOUT" });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };
    checkAuth();
  }, []);

  const login = async (credentials) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const response = await authService.login(credentials);
      localStorage.setItem("token", response.token);
       if (response.refreshToken) {
        localStorage.setItem("refresh-token", response.refreshToken);
      }
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response,
      });
      navigate(DEFAULT_REDIRECTS[response.user.role]);
    } catch (error) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: error.message || "Login failed",
      });
      throw error;
    }
  };

  const register = async (userData) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const response = await authService.register({
        ...userData,
        role: "student",
      });
      dispatch({ type: "REGISTER_SUCCESS" });
      navigate("/login");
      return response;
    } catch (error) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: error.message || "Registration failed",
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh-token");

      dispatch({ type: "LOGOUT" });
      navigate("/login");
    }
  };

  // Add setToken function
  const setToken = (token, user = null) => {
    localStorage.setItem("token", token);
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: {
        user: user || state.user,
        token,
      },
    });
  };
// Google OAuth login function
  const loginWithGoogle = () => {
    const baseUrl =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
    window.location.href = `${baseUrl}/auth/google`;
  };
  const value = {
    ...state,
    login,
    logout,
    register,
    setToken,
    loginWithGoogle,
    DEFAULT_REDIRECTS,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
