"use client";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Home from "../components/homepage/home";
import { UserAuth } from "../app/authContext";
import { useRouter } from "next/navigation";

const page = () => {
  const { user } = UserAuth();
  const router = useRouter();

  if (!user) router.push('/sign-in')
  return (
    <>
      {/* {!user && userLoading && <h1>Loading...</h1>} */}
      {/* {!user && !userLoading && <Login />} */}
      {/* {user && !userLoading && <Home />} */}
      <Home />
    </>
  );
};

export default page;