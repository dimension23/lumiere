import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loadingUser, setLoadingUser] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function signin(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function signout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoadingUser(false);
    });
    return unsubscribe;
  }, []);

  const value = { currentUser, signup, signin, signout };

  return (
    <AuthContext.Provider value={value}>
      {/* don't render the application until the user is set */}
      {!loadingUser && children}
    </AuthContext.Provider>
  );
}
