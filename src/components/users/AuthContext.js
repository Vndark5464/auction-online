import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAuth } from 'firebase/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return JSON.parse(localStorage.getItem('isLoggedIn') || 'false');
  });
  const [userData, setUserData] = useState(() => {
    return JSON.parse(localStorage.getItem('userData') || 'null');
  });
  
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        // Cập nhật userData với thông tin username
        setUserData({
          ...userData,
          username: user.displayName
        });
      } else {
        // Reset userData nếu không có người dùng đăng nhập
        setUserData(null);
      }
    });
  
    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);
  

  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    localStorage.setItem('userData', JSON.stringify(userData));
  }, [isLoggedIn, userData]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}