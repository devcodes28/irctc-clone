import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

function readUser() {
  if (!window.DB_API) {
    return null;
  }

  return window.DB_API.getCurrentUser();
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readUser);

  useEffect(() => {
    const refreshUser = () => setUser(readUser());
    window.addEventListener("irctc-auth-change", refreshUser);
    window.addEventListener("storage", refreshUser);

    return () => {
      window.removeEventListener("irctc-auth-change", refreshUser);
      window.removeEventListener("storage", refreshUser);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: Boolean(user) }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}
