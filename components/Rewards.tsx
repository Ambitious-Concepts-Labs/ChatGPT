import React from "react";
import { UserAuth } from "../app/context/AuthContext";
import IncreaseCard from "./IncreaseCard";
import StepOneCard from "./StepOneCard";
import StepTwoCard from "./StepTwoCard";
import Title from "./Title";

export default function Rewards({ session }) {
  const { showModal, setShowModal } = UserAuth();

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
        <StepTwoCard />
      </div>
    </>
  );
}
