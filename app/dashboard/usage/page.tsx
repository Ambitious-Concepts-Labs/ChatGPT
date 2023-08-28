"use client";
import { useSession } from "next-auth/react";
import Usage from "../../../components/Usage";

const MainUsage = () => {
  const { data: session } = useSession();

  return <Usage session={session} />;
};

export default MainUsage;