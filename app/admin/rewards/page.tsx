
"use client"
import Card from "../../../components/MainCard";
import CardHeader from "../../../components/CardHeader";
import { MdPlaylistAddCheck } from "react-icons/md";
import { TbClockCheck } from "react-icons/tb";
import { useState } from "react";
import Button from "../../../components/Button";
import { UserAuth } from "../../authContext";
import Link from "next/link";
import { addTokens } from "./(actions)/actions";


export default function Rewards() {
  const { user, firebaseUser, allRewards, users } = UserAuth()
  console.log({user, firebaseUser})
  const [status, setStatus] = useState()
  const [userId, setUserId] = useState()
  const [rewardId, setRewardId] = useState()

  const handleSelectedRewards =async (rewards: any, e: any) => {
    setUserId(rewards.userId)
    setRewardId(rewards.rewardId)
    setStatus(e)
  }

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
          allRewards.map((reward: any) => {
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
                    onChange={(e) => { handleSelectedRewards(reward, e.target.value); }}
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
            onClick={() => addTokens(userId, rewardId, status)}
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