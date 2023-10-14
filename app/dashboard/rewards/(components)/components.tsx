// @ts-nocheck
"use client"
import { BsTrophy } from "react-icons/bs";
import Image from "next/image";
import cardWoman from "../(assets)/card-woman.png";
import { FaRegStar } from "react-icons/fa6";
import TikTok from "../../../../icons/TikTok";
import Linkedin from "../../../../icons/Linkedin";
import Card from "../../../../components/MainCard";
import CardHeader from "../../../../components/CardHeader";
import Facebook from "../../../../icons/Facebook";
import Instagram from "../../../../icons/Instagram";
import Snapchat from "../../../../icons/Snapchat";
import { MdPlaylistAddCheck } from "react-icons/md";
import { TbClockCheck } from "react-icons/tb";
import { useState, useEffect } from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import Button from "../../../../components/Button";
import { db, storage } from "../../../../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { UserAuth } from "../../../authContext";
import Title from "../../../../components/Title";
import toast from "react-hot-toast";

export function RewardsTitle() {
    const { showModal, setShowModal } = UserAuth();
  return (
      <Title
        showModal={showModal}
        setShowModal={setShowModal}
        button="Document"
        title="Rewards"
      />
  )
}

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

export function StepTwoCard() {
  const { firebaseUser } = UserAuth()
  const [selected, setSelected] = useState('tikTok')
  const [link, setLink] = useState('')
  const [image, setImage] = useState('')
  const [imageUpload, setImageUpload] = useState(null);

  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + uuidv4()}`);
    console.log('uploadFile')
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImage(url)
      });
    });
  };


  const handleRewards = async (e: any) => {
    const notification = toast.loading("Submitting rewards form...");
    await uploadFile()
    const uid = uuidv4();    
    await setDoc(doc(db, "users", firebaseUser!.uid, "rewards", uid), {
      type: selected,
      status: "Not Verified",
      link,
      image: image,
      createdAt: serverTimestamp(),
      lastModified: new Date(),
      id: uid,
    });
    toast.success("Submitted rewards!", {
      id: notification,
    })
  }

  return (
    <Card>
      <CardHeader
        title="Step 2"
        icon={<TbClockCheck />}
        subtitle="Once your review has been published by the platform, simply copy your post link followed by a screenshot of your review."
      />
      <div className="flex flex-col gap-2 py-4">
        <select
          defaultValue="none"
          onChange={(e) => { setSelected(e.target.value); }}
          id="input-select"
          className="text-xs py-2 px-1 border rounded-md text-slate-400"
        >
          <option value="none" disabled>
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
          {
            image ?
              <img width={"20rem"} src={image} />
            :
            <>
              <label
                className="appearance-none grow text-xs p-2 border rounded-md text-slate-400 cursor-pointer"
                htmlFor="input-file"
              >
                Upload your screenshot
              </label>
              <input
                onChange={(event) => {
                  setImageUpload(event.target.files[0]);
                }}
                className="hidden"
                type="file"
                id="input-file"
                placeholder="Upload your screenshot"
                />
            </>

          }
          <Button
            onClick={() => handleRewards()}
            variant="white"
            icon={<MdPlaylistAddCheck className="h-full w-auto" />}
            text="Submit"
          />
        </div>
      </div>
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

export function ViewAllImages() {
  const imagesListRef = ref(storage, "images/");
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          if (url == "https://firebasestorage.googleapis.com/v0/b/chatgpt-dfa57.appspot.com/o/images%2Fbilling.png42fa92b0-028b-4afb-9371-591fd6831db8?alt=media&token=efc5367f-5465-4fe0-8a67-1e7d8e55c3e1") setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);
  return (
    <>
      {imageUrls.map((url) => {
        return <img src={url} />;
      })}
    </>
  )
}