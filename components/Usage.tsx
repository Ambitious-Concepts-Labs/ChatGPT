import React from "react";
import DailyCard from "./DailyCard";
import QuotaCard from "./QuotaCard";
import TokenCard from "./TokenCard";
import Title from "./Title";
import { UserAuth } from "../app/authContext";

function Usage() {
  const { showModal, setShowModal } = UserAuth();

  return (
    <>
      <Title
        showModal={showModal}
        setShowModal={setShowModal}
        button="Document"
        title="Usage"
      />
      <div className="grid grid-cols-1 auto-rows-min lg:grid-cols-2 lg:grid-rows-[10rem_1fr] gap-5">
        <TokenCard />
        <QuotaCard />
        <DailyCard />
      </div>
    </>
  );
}

export default Usage;