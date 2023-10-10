// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { BsTrophy } from "react-icons/bs";
import Image from "next/image";
import cardWoman from "../(assets)/card-woman.png";
import { FaRegStar } from "react-icons/fa6";
import TikTok from "../../../../icons/TikTok";
import ProductHuntLogo from "../../../../icons/ProductHuntLogo";
import Linkedin from "../../../../icons/Linkedin";
import Card from "../../../../components/MainCard";
import CardHeader from "../../../../components/CardHeader";
import Facebook from "../../../../icons/Facebook";
import Instagram from "../../../../icons/Instagram";
import Snapchat from "../../../../icons/Snapchat";
import { MdPlaylistAddCheck } from "react-icons/md";
import { TbClockCheck } from "react-icons/tb";
import { useState } from "react";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import Button from "../../../../components/Button";
import { db } from "../../../../firebase";

export function StepOneCard() {
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

export function StepTwoCard(props: any) {
  const { user } = props
  const [selected, setSelected] = useState('')
  const [link, setLink] = useState('')
  const [image, setImage] = useState('')

  const handleRewards = async () => {
    console.log({link, selected, image})
    const uid = uuidv4();
    // const allRewards = await getDoc(doc(db, "users", session?.user?.email!, "rewards"));
    
    await setDoc(doc(db, "users", user.uid, "rewards", uid), {
      type: selected,
      status: "Not Verified",
      link,
      imag: image,
      createdAt: serverTimestamp(),
      lastModified: new Date(),
      id: uid,
    });
  }

  return (
    <Card>
      <CardHeader
        title="Step 2"
        icon={<TbClockCheck />}
        subtitle="Once your review has been published by the platform, simply copy your post link followed by a screenshot of your review."
      />
      <form onSubmit={handleRewards} className="flex flex-col gap-2 py-4">
        <select
          onChange={(e) => { setSelected(e.target.value); }}
          id="input-select"
          className="text-xs py-2 px-1 border rounded-md text-slate-400"
        >
          <option selected disabled>
            Select a platform
          </option>
          <option value="tikTok">Tik Tok</option>
          <option value="linkedin">LinkedIn</option>
          <option value="facebook">Facebook</option>
          <option value="instagram">Instagram</option>
          <option value="snapchat">Snapchat</option>
        </select>
        <input
          value={link}
          onChange={(event)=> { setLink(event.target.value); }} 
          className="text-xs p-2 border rounded-md"
          type="text"
          placeholder="Paste your review link"
        />
        <div className="flex items-center gap-2">
          <label
            className="appearance-none grow text-xs p-2 border rounded-md text-slate-400 cursor-pointer"
            htmlFor="input-file"
          >
            Upload your screenshot
          </label>
          <input
            onChange={(event)=> { setImage(event.target.value); }} 
            className="hidden"
            type="file"
            id="input-file"
            placeholder="Upload your screenshot"
          />
          <Button
            variant="white"
            icon={<MdPlaylistAddCheck className="h-full w-auto" />}
            text="Submit"
          />
        </div>
      </form>
    </Card>
  );
}

export function IncreaseCard() {
  return (
    <Card row span>
      <CardHeader
        title="Want to increase your monthly quota?"
        icon={<BsTrophy />}
        subtitle={
          <>
            If you are looking to increase your monthly token limit we offer
            generous rewards for your loyalty. By simply pubblishing a review
            about your experience with Writier, you can earn up to{" "}
            <span className="font-bold text-black">
              51,000 free tokens per month!
            </span>
          </>
        }
        className="sm:w-3/4"
      />
      <div className="h-40 lg:h-48 flex justify-center">
        <Image 
          className="h-full w-auto"
          src={cardWoman}
          width={491}
          height={491}
          alt="Woman with a gift card"
    />
      </div>
    </Card>
  );
}