import React from 'react'
import { createContext, useEffect, useState } from 'react'
import { ref, set } from "firebase/database";
import { database } from '../services/firebase/config';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {

  const [user, setUser] = useState({})

  const saveUser = (user) => {
    setUser(user)
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'))
    if (userData) {
      setUser(userData)
    }
  }, []);

  return <UserContext.Provider value={{ user, saveUser }}>{children}</UserContext.Provider>
}

export default UserContextProvider
