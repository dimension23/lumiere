import React, { useContext, useEffect, useState } from "react";
import {
  auth,
  googleAuthProvider,
  twitterAuthProvider,
  githubAuthProvider,
} from "../firebase";

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

  function signInWithGoogle() {
    return auth.signInWithPopup(googleAuthProvider);
  }

  function signInWithTwitter() {
    return auth.signInWithPopup(twitterAuthProvider);
  }

  function signInWithGithub() {
    return auth.signInWithPopup(githubAuthProvider);
  }

  function signout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoadingUser(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    signin,
    signInWithGoogle,
    signInWithTwitter,
    signInWithGithub,
    signout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* don't render the application until the user is set */}
      {!loadingUser && children}
    </AuthContext.Provider>
  );
}
