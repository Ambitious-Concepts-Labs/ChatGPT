"use client";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Home from "../components/homepage/home";
import Login from "../components/Login";
import { auth } from "../firebase";
// import { UserAuth } from "./context/AuthContext";

const page = () => {
  const [user] = useAuthState(auth);
  // const { user } = UserAuth();
  return (
    <>
      {/* {!user && userLoading && <h1>Loading...</h1>} */}
      {/* {!user && !userLoading && <Login />} */}
      {/* {user && !userLoading && <Home />} */}
      {!user ? <Login /> : <Home />}
    </>
  );
};

export default page;