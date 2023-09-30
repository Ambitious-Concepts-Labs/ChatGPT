"use client";

import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import Home from "../components/homepage/home";
import { UserAuth } from "../app/authContext";

const page = () => {
  const { user } = UserAuth();
  const router = useRouter();

  if (!user) router.push('/sign-in')
  return (
      <Home />
  );
};

export default page;