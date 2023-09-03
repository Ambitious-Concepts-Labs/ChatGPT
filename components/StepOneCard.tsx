import { FaRegStar } from "react-icons/fa6";
import TikTok from "./TikTok";
import ProductHuntLogo from "./ProductHuntLogo";
import Linkedin from "./Linkedin";
import Card from "./MainCard";
import CardHeader from "./CardHeader";
import Facebook from "./Facebook";
import Instagram from "./Instagram";
import Snapchat from "./Snapchat";

export default function StepOneCard() {
  const appsList = [
    {
      logo: <TikTok />,
      name: "Tik Tok",
      tokens: "20,000",
    },
    {
      logo: <Linkedin />,
      name: "LinkedIn",
      tokens: "15,000",
    },
    {
      logo: <Facebook />,
      name: "Facebook",
      tokens: "10,000",
    },
    {
      logo: <Instagram />,
      name: "Instagram",
      tokens: "5,000",
    },
    {
      logo: <Snapchat />,
      name: "Snapchat",
      tokens: "1,000",
    },
  ];
  return (
    <Card>
      <CardHeader
        title="Step 1"
        subtitle="Pubblish an honest review about our app on one (or all) of the platforms below."
        icon={<FaRegStar />}
      />
      <ul className="flex flex-col gap-4 py-4">
        {appsList.map((app) => (
          <li
            key={app.name}
            className="text-xs grid items-center grid-cols-[2.5rem_repeat(3,1fr)] cursor-pointer"
          >
            <div className="h-7 w-7">{app.logo}</div>
            <div>{app.name}</div>
            <div className="justify-self-center">{app.tokens} Tokens</div>
            <div className="justify-self-end flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-green-400" />
              <div>Available</div>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}