import React from 'react'
import { createContext, useEffect, useState } from 'react'
import { database } from '../services/firebase/config';
import { ref, child, onValue } from "firebase/database";

export const ResultsContext = createContext()

const ResultsContextProvider = ({ children }) => {

  const [result, setResult] = useState({});

  useEffect(() => {
    const dbRef = ref(database);

    onValue((child(dbRef, 'result/')), (snapshot) => {
      const data = snapshot.val();

      const resultArray = Object.values(data);

      if (resultArray.length !== result.length) {
        setResult(resultArray);
      }
    });
  }, [])

  return <ResultsContext.Provider value={{ result, setResult }}>{children}</ResultsContext.Provider>
}

export default ResultsContextProvider
