import React, { useState } from "react";
import DailyCard from "./DailyCard";
import QuotaCard from "./QuotaCard";
import TokenCard from "./TokenCard";
import Title from "./Title";
import { UserAuth } from "../app/authContext";

const Usage = (props: any) => {
  const { showModal, setShowModal } = UserAuth();
  const { session } = props

  return (
    <>
      <Title
        showModal={showModal}
        setShowModal={setShowModal}
        button={"Document"}
        title={"Usage"}
        session={session}
      />
      <div className="grid grid-cols-1 auto-rows-min lg:grid-cols-2 lg:grid-rows-[10rem_1fr] gap-5">
        <TokenCard />
        <QuotaCard />
        <DailyCard />
      </div>
    </>
  );
};

export default Usage;