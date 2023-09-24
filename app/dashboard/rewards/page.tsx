"use client";
import Rewards from "../../../components/Rewards";
import { UserAuth } from "../../authContext";

const MainRewards = () => {
  const {session } = UserAuth();

  return <Rewards session={session} />;
};

export default MainRewards;