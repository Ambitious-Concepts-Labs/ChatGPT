"use client";
import Billing from "../../../components/Billing";
import { UserAuth } from "../../authContext";

const index = () => {
    const {session } = UserAuth();

  return <Billing session={session} />;
};

export default index;