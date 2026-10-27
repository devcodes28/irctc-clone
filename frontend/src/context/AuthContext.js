import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

/**
 * Authentication and User Context (PPT Slides 73-81: Context API & useContext Hook)
 * Solves prop-drilling by providing a centralized global store for:
 * - Current logged-in user
 * - E-Wallet balance & real-time synchronization
 * - Login & Logout methods
 */

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('current_user');
    if (saved) {
      try {
        const user = JSON.parse(saved);
        if (user.walletBalance === undefined || isNaN(user.walletBalance)) {
          user.walletBalance = 5000.00;
        }
        return user;
      } catch (e) {
        console.error("Failed to parse saved user:", e);
      }
    }
    const id = localStorage.getItem('current_user_id');
    const name = localStorage.getItem('current_user_name');
    if (id) {
      return { id, _id: id, fullName: name || 'User', walletBalance: 5000.00, email: '', mobile: '' };
    }
    return null;
  });

  const isLoggedIn = !!currentUser;
  const userId = currentUser ? (currentUser._id || currentUser.id) : null;
  const walletBalance = currentUser && currentUser.walletBalance !== undefined && !isNaN(currentUser.walletBalance)
    ? Number(currentUser.walletBalance)
    : 5000.00;

  // Refresh user details directly from database to keep wallet and profile synced
  const refreshUser = useCallback(async () => {
    if (!userId) return;
    try {
      const data = await api.getUserProfile(userId);
      if (data && data.success && data.user) {
        setCurrentUser(data.user);
        localStorage.setItem('current_user', JSON.stringify(data.user));
      }
    } catch (err) {
      console.error("Error refreshing user in AuthContext:", err);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      refreshUser();
    }
  }, [userId, refreshUser]);

  const login = (userData) => {
    if (userData) {
      const id = userData._id || userData.id;
      localStorage.setItem('current_user_id', id);
      localStorage.setItem('current_user_name', userData.fullName || '');
      localStorage.setItem('current_user', JSON.stringify(userData));
      setCurrentUser(userData);
    }
  };

  const logout = () => {
    localStorage.removeItem('current_user_id');
    localStorage.removeItem('current_user_name');
    localStorage.removeItem('current_user');
    localStorage.removeItem('redirect_to_booking');
    setCurrentUser(null);
  };

  const updateProfileState = (updatedFields) => {
    setCurrentUser((prev) => {
      const next = { ...prev, ...updatedFields };
      localStorage.setItem('current_user', JSON.stringify(next));
      return next;
    });
  };

  const updateWalletBalance = (newBalance) => {
    setCurrentUser((prev) => {
      const next = { ...prev, walletBalance: newBalance };
      localStorage.setItem('current_user', JSON.stringify(next));
      return next;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        user: currentUser,
        isLoggedIn,
        userId,
        walletBalance,
        login,
        logout,
        refreshUser,
        updateProfileState,
        updateWalletBalance
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to consume the AuthContext conveniently (PPT Slide 75 & 78)
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
