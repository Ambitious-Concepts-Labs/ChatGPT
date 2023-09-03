import { MdPlaylistAddCheck } from "react-icons/md";
import { TbClockCheck } from "react-icons/tb";
import Card from "./MainCard";
import CardHeader from "./CardHeader";
import Button from "./Button";
import { useState } from "react";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useSession } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";

export default function StepTwoCard(props: any) {

  const { session } = props
  // const { data: session } = useSession();
  const [selected, setSelected] = useState('')
  const [link, setLink] = useState('')
  const [image, setImage] = useState('')

  const handleRewards = async () => {
    console.log({link, selected, image})
    const uid = uuidv4();
    // const allRewards = await getDoc(doc(db, "users", session?.user?.email!, "rewards"));
    
    await setDoc(doc(db, "users", session?.user?.id, "rewards", uid), {
      type: selected,
      status: "Not Verified",
      link: link,
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
          onChange={(e) => setSelected(e.target.value)}
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
          onChange={(event)=> setLink(event.target.value)} 
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
            onChange={(event)=> setImage(event.target.value)} 
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