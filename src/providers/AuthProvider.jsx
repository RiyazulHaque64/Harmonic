import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../firebase/firebase.init";
import axios from "axios";
// import { getUserRole } from "../API/auth";
// import axios from "axios";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  useEffect(() => {
    if (user) {
      fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/users/${user.email}`)
        .then((res) => res.json())
        .then((data) => setRole(data.role));
    }
  }, [user]);

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

  // login or signup with google provider
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  //   logout
  const logout = () => {
    localStorage.removeItem("access-token");
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email) {
        axios
          .post(`${import.meta.env.VITE_SERVER_BASE_URL}/jwt`, {
            email: currentUser?.email,
          })
          .then((data) => {
            console.log(data.data.token);
            localStorage.setItem("access-token", data.data.token);
            setLoading(false);
          });
      } else {
        localStorage.removeItem("access-token");
        setLoading(false);
      }
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, [loading]);

  const authInfo = {
    user,
    loading,
    createUser,
    login,
    logout,
    updateUser,
    signInWithGoogle,
    role,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
