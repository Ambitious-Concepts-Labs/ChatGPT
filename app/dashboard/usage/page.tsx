"use client";
import Usage from "../../../components/Usage";
import { UserAuth } from "../../authContext";

const MainUsage = () => {
  const { session } = UserAuth();
  return <Usage session={session} />;
};

export default MainUsage;