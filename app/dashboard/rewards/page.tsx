"use client";
import Rewards from "../../../components/Rewards";
import { requireUserLoggedIn } from "../../../utils/helperFunctions";
import { UserAuth } from "../../authContext";

const MainRewards = () => {
  const {session } = UserAuth();
  requireUserLoggedIn();
  return <Rewards session={session} />;
};

export default MainRewards;