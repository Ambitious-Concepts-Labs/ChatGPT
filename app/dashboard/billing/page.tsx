"use client";
import { useSession } from "next-auth/react";
import Billing from "../../../components/Billing";

const index = () => {
  const { data: session } = useSession();

  return <Billing session={session} />;
};

export default index;