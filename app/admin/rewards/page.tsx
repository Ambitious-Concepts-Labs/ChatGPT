// @ts-nocheck

"use client"
import Card from "../../../components/MainCard";
import CardHeader from "../../../components/CardHeader";
import { MdPlaylistAddCheck } from "react-icons/md";
import { TbClockCheck } from "react-icons/tb";
import { useState, useEffect } from "react";
import { collection, doc, getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import Button from "../../../components/Button";
import { db, storage } from "../../../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { UserAuth } from "../../authContext";
import Title from "../../../components/Title";
import toast from "react-hot-toast";
import Link from "next/link";


export default function Rewards() {
  const { user, firebaseUser, rewards, users } = UserAuth()
  console.log({user, firebaseUser})
  const [selected, setSelected] = useState('tikTok')
  const [link, setLink] = useState('')
  const [image, setImage] = useState('')
  const [allRewards, setAllRewards] = useState([])
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
      imag: image,
      createdAt: serverTimestamp(),
      lastModified: new Date(),
      id: uid,
    });
    toast.success("Submitted rewards!", {
      id: notification,
    })
  }

  useEffect(() => {
    const getAllRewards = async () => {
      const dataArr:Array<{}> = []
      users.forEach(async user => {
        const querySnapshot = await getDocs(collection(db, "users", user.uid, "rewards"));
        // console.log(querySnapshot)
        querySnapshot.forEach((reward) => {
            console.log({reward: reward.data(), rewardId: reward.id, userId: user.uid})
            const obj = { ...reward.data(), rewardId: reward.id, userId: user.uid, userEmail: user.email }
            dataArr.push(obj)
        });
      });
      console.log(dataArr)
      setAllRewards(dataArr)
      // return dataArr
    }
    getAllRewards()
  }, []);

  console.log({users, allRewards})
  if (user.role !== "user") {
    return (
      <Card>
      <CardHeader
        title="Step 2"
        icon={<TbClockCheck />}
        subtitle="Once your review has been published by the platform, simply copy your post link followed by a screenshot of your review."
      />
      <div className="flex flex-col gap-2 py-4"> 
        {
          allRewards.map((reward) => {
            if (reward.status === "Not Verified") {
              return (
                <Card>
                  <p>Created: {reward.createdAt.toDate().toDateString()}</p>
                  { reward.imag ?
                    <img width={"200xrem"} src={reward.imag} />
                    : <img width={"200xrem"} src="https://i.imgur.com/FeSecjq.jpg" /> 
                  }
                  <Link href={reward.link}>Type: {reward.type}</Link>
                  <p>From: {reward.userEmail}</p>
                  <select
                    defaultValue={reward.status}
                    onChange={(e) => { console.log(e.target.value); }}
                    id="input-select"
                    className="text-xs py-2 px-1 border rounded-md text-slate-400"
                  >
                    <option value={reward.status} disabled>
                      {reward.status}
                    </option>
                    <option value="verified">Verifed</option>
                    <option value="denied">Denied</option>
                  </select>
                </Card>
              )
            }
          })
        }
        <div className="flex items-center gap-2">
          <Button
            onClick={() => handleRewards()}
            variant="white"
            icon={<MdPlaylistAddCheck className="h-full w-auto" />}
            text="Submit"
          />
        </div>
      </div>
    </Card>
    )
  }
}