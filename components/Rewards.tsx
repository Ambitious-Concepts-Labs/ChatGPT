import React, { useState } from "react";
import { UserAuth } from "../app/authContext";
import IncreaseCard from "./IncreaseCard";
import StepOneCard from "./StepOneCard";
import StepTwoCard from "./StepTwoCard";
import Title from "./Title";
import { getAuth } from "firebase/auth";
import router from "next/router";

export default function Rewards(props: any) {
  const { session } = props
  const { showModal, setShowModal } = UserAuth();
  const auth = getAuth();
  const user = auth.currentUser;
  return (
    <>
      <Title
        showModal={showModal}
        setShowModal={setShowModal}
        button={"Document"}
        title={"Rewards"}
        session={session}
      />
      <div className="grid grid-cols-1 auto-rows-min lg:grid-cols-2 lg:grid-rows-[15rem_1fr] gap-5">
        <IncreaseCard />
        <StepOneCard />
        <StepTwoCard user={user} />
      </div>
    </>
  );
}