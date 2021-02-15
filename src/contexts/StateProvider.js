import { createContext, useState, useEffect, useContext } from "react";
import db, { auth } from "../adapters/firebase";

export const StateContext = createContext();

export function StateProvider(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);
  const [currentDate, setCurrentDate] = useState("");

  const getCurrentDate = () => {
    var today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    setCurrentDate(today);
  };

  const signUp = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  const signIn = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  }

  const signOut = () => {
    return auth.signOut();
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });
    getCurrentDate();
  }, []);

  if (pending) {
    return <>Loading...</>;
  }

  const value = {
    currentUser, 
    currentDate,
    signUp,
    signIn,
    signOut
  }

  return (
    <StateContext.Provider value={value}>
      {!pending && props.children}
    </StateContext.Provider>
  );
}

export const useStateValue = () => useContext(StateContext);
