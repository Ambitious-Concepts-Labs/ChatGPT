import { PiClockClockwise } from "react-icons/pi";
import Card from "./MainCard";
import ProgressBar from "./ProgressBar";
import CardHeader from "./CardHeader";

export default function QuotaCard() {
  return (
    <Card>
      <CardHeader title="Quota Reset" icon={<PiClockClockwise />} />
      <div>
        <div className="flex items-center justify-between text-2xs text-slate-400">
          <div>August 9, 2023</div>
          <div>26 Days left</div>
        </div>
        <ProgressBar percentage="quota" />
      </div>
    </Card>
  );
}
