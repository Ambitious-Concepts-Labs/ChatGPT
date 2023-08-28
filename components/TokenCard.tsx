import { RiUploadCloud2Line } from "react-icons/ri";
import ProgressBar from "./ProgressBar";
import Button from "./Button";
import Card from "./MainCard";
import CardHeader from "./CardHeader";
import { BiPlusCircle } from "react-icons/bi";

export default function TokenCard() {
  return (
    <Card>
      <CardHeader icon={<RiUploadCloud2Line />} title="Token Usage">
        <div>
          <Button
            variant="white"
            icon={
              <>
                <div className='absolute border-s-[1.5px] border-black rounded-s-full h-3.5 w-2.5 top-2/4 -translate-y-2/4 -left-0.5 content-[""]' />
                <BiPlusCircle className="h-full w-auto relative z-10" />
              </>
            }
            text="Upgrade"
            href="#"
          />
        </div>
      </CardHeader>
      <div>
        <div className="flex items-center justify-between text-2xs text-slate-400">
          <div>52 TK</div>
          <div>10 000 TK</div>
        </div>
        <ProgressBar percentage="token" />
      </div>
    </Card>
  );
}