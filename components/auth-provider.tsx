"use client";

import React, { useEffect } from "react";
import { auth } from "@/firebase/config"; // Import your Firebase auth
import { useAuthState } from "react-firebase-hooks/auth"; // Import the hook to get the authenticated user
import { useAuthStore } from "@/hooks/use-store"; // Import the Zustand store

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, loading, error] = useAuthState(auth); // Get the user from Firebase Auth

  const { setUser } = useAuthStore(); // Get the setUser function from Zustand store

  // Sync the user from Firebase Auth to Zustand store
  useEffect(() => {
    if (!loading && !error) {
      setUser(user ?? null); // Update Zustand store with the user
    }
  }, [user, loading, error, setUser]);

  return <>{children}</>; // Render the children once user is set
};

export default AuthProvider;
