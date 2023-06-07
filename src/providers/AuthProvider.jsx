import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.init";
// import axios from "axios";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //   create user with email and password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   login with email and password
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   update user name and photoURL
  const updateUser = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  //   logout
  const logout = () => {
    localStorage.removeItem("access-token");
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      //   if (currentUser?.email) {
      //     axios
      //       .post("http://localhost:5000/jwt", { email: currentUser.email })
      //       .then((data) => {
      //         localStorage.setItem("access-token", data.data.token);
      //         setLoading(false);
      //       });
      //   } else {
      //     localStorage.removeItem("access-token");
      //     setLoading(false);
      //   }
    });
    return () => {
      return unsubscribe();
    };
  });

  const authInfo = {
    user,
    loading,
    createUser,
    login,
    logout,
    updateUser,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
