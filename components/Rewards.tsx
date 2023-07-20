import React from "react";
import Header from "./children/Header";
import IncreaseCard from "./children/IncreaseCard";
import StepOneCard from "./children/StepOneCard";
import StepTwoCard from "./children/StepTwoCard";

export default function Rewards() {
  return (
    <>
        <Header title='Rewards' />
        <div className='grid grid-cols-1 auto-rows-min lg:grid-cols-2 lg:grid-rows-[15rem_1fr] gap-5'>
          <IncreaseCard />
          <StepOneCard />
          <StepTwoCard />
        </div>
    </>
  );
}
