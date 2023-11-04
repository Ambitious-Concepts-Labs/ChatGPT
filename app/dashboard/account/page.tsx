import 'server-only'
import React from "react";
import Title from "../../../components/Title";
import { ChangePswdCard, DeleteCard, ProfileCard } from "./(components)/components";

export default function Account() {

  return (
    <div className="bg-[#f8f9fb] min-h-screen grow px-8 md:px-16 pt-7 pb-10">
        <Title
          button="Document"
          title="Account"
        />
        <div
          className="md:grid grid-cols-1 grid-rows-3 justify-self-end lg:grid-cols-2 lg:grid-rows-2 gap-5 grid"
        >
          <ProfileCard />
          <ChangePswdCard />
          <DeleteCard />
        </div>
      </div>
  );
}