"use client";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Home from "../components/homepage/home";
import Login from "../components/Login";
import { UserAuth } from "../app/authContext";

const page = () => {
  const { user } = UserAuth();
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