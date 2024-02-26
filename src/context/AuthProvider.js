import React, { createContext, useState, useEffect } from "react";

import Swal from "sweetalert2";
import { logoutAction } from "../actions/action";
import { useDispatch } from "react-redux";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const [isPremiumUser, setIsPremiumUser] = useState(false);

  useEffect(() => {
    // Check if user is logged in or session is expired on component mount
    checkLoggedIn();
  }, []);

  const checkLoggedIn = () => {
    const profile = JSON.parse(localStorage.getItem("Profile"));
    if (profile) {
      const token = profile.token;
      if (token) {
        const currentTime = Date.now();
        const tokenExpiration = JSON.parse(localStorage.getItem("ExpiryTime"));
        if (currentTime < tokenExpiration) {
          // Token is valid
          setIsLoggedIn(true);
        } else {
          // Token has expired
          setIsSessionExpired(true);
          // Perform automatic logout
          forceLogout();
        }
      }
    } else {
      setIsLoggedIn(false);
    }
  };

  const dispatch = useDispatch();
  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    dispatch(logoutAction());
    window.location.reload();
  };

  const forceLogout = () => {
    Swal.fire({
      icon: "error",
      title: "Token Expired",
      text: "Your session has expired. Please log in again.",
      showConfirmButton: false,
      timer: 2000,
    });
    localStorage.clear();
    setIsLoggedIn(false);
    window.location.reload();
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isSessionExpired,
        isAdmin,
        isPremiumUser,
        setIsLoggedIn,
        setIsAdmin,
        logout,
        checkLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
