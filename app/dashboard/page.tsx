import 'server-only';
import { DashboardCards, Documents, UpgradeCards } from "./(components)/components";
import Title from "../../components/Title";

async function Dashboard() {
  return (
    <>
      <Title
        button="Document"
        title="Dashboard" />
      <DashboardCards />
      <Documents />
      <UpgradeCards />
    </>
  );
}

export default Dashboard;