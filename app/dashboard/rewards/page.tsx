"use client";
import { useSession } from "next-auth/react";
import Rewards from "../../../components/Rewards";

const MainRewards = () => {
  const { data: session } = useSession();

  return <Rewards session={session} />;
};

export default MainRewards;
