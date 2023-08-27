import { FaRegChartBar } from "react-icons/fa";
import LineChart from "./LineChart";
import Card from "./MainCard";
import CardHeader from "./CardHeader";

export default function DailyCard() {
  return (
    <Card span>
      <CardHeader title="Daily Token Usage" icon={<FaRegChartBar />} />
      <div>
        <LineChart />
      </div>
    </Card>
  );
}
