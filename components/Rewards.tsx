import React from "react";
import IncreaseCard from "./children/IncreaseCard";
import StepOneCard from "./children/StepOneCard";
import StepTwoCard from "./children/StepTwoCard";
import Title from "./Title";

export default function Rewards({session}) {
  return (
    <>
        <Title button={"Document"} title={"Rewards"} session={session}/>
        <div className='grid grid-cols-1 auto-rows-min lg:grid-cols-2 lg:grid-rows-[15rem_1fr] gap-5'>
          <IncreaseCard />
          <StepOneCard />
          <StepTwoCard />
        </div>
    </>
  );
}
