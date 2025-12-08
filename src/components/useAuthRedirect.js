"use client";

// hooks/useAuthRedirect.js
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const useAuthRedirect = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // For controlling the loading state
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken");

      if (token) {
        // If token exists, consider the user authenticated
        setIsAuthenticated(true);
      } else {
        // If no token, keep the user unauthenticated


  
        setIsAuthenticated(false);
      }

      setIsLoading(false); // Stop loading when the check is complete
    };

    checkAuth(); // Perform the auth check when the component mounts
  }, []);

  return { isAuthenticated, isLoading };
};
