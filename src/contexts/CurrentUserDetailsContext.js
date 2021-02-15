import { useState, useEffect, createContext, useContext } from "react";
import { useStateValue } from "./StateProvider";
import db from "../adapters/firebase";

export const CurrentUserDetailsContext = createContext();

export function CurrentUserDetailsProvider(props) {
  const [currentUserDetails, setCurrentUserDetails] = useState([]);
  const { currentUser } = useStateValue();

  useEffect(() => {
    if (currentUser) {
    db.collection("users")
      .doc(currentUser.email)
      .get()
      .then((doc) =>
        setCurrentUserDetails({
          currentUserName: doc.data().userName,
          currentUserEmail: doc.data().userEmail,
          currentUserRole: doc.data().userRole,
          currentUserUUId: doc.data().userUUId,
          currentUserBusinessName: doc.data().userBusinessName,
          currentUserCreatedAt: doc.data().createdAt
        })
      )
      .catch((error) => console.log(error));
    }
  }, []);

  return (
    <CurrentUserDetailsContext.Provider value={currentUserDetails}>
      {props.children}
    </CurrentUserDetailsContext.Provider>
  );
}

export const useCurrentUserDetails = () =>
  useContext(CurrentUserDetailsContext);
