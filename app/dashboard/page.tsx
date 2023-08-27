"use client";
import { useSession } from "next-auth/react";
import Dashboard from "../../components/Dashboard";
import { AuthRequiredError } from "../../lib/exceptions";

const MainDashboard = () => {
  const { data: session } = useSession();

  if (!session) throw new AuthRequiredError();
  return <Dashboard />;
};

export default MainDashboard;
