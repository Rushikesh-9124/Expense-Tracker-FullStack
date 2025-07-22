import React, { createContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getUserData = async () => {
    try {
      const res = await axiosInstance.get("/get-user");
      if (res.data.success) {
        setUser(res.data.user);
        updateUserData(res.data.user);
      }
    } catch (error) {
      console.error("Something went wrong!, Please try again!, This is userContext")
    }
  };

  const updateUserData = (userData) => {
    setUser(userData);
  };
  
  const clearUser = () => {
    setUser(null);
  };

  useEffect(()=>{
    getUserData()
  }, [])

  return (
    <UserContext.Provider value={{ user, updateUserData, clearUser, getUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
