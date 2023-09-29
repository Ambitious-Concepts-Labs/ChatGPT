"use client";
import Rewards from "../../../components/Rewards";
import { requireUserLoggedIn } from "../../../utils/helperFunctions";

const MainRewards = () => {
  requireUserLoggedIn();
  return <Rewards />;
};

export default MainRewards;