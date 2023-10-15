import 'server-only';
import React from "react";
import { IncreaseCard, RewardsTitle, StepOneCard, StepTwoCard } from "./(components)/components";

export default function Rewards() {
  return (
    <>
      <RewardsTitle />
      <div className="grid grid-cols-1 auto-rows-min lg:grid-cols-2 lg:grid-rows-[15rem_1fr] gap-5">
        <IncreaseCard />
        <StepOneCard />
        <StepTwoCard />
      </div>
    </>
  );
}