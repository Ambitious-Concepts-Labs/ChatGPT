"use client";

import React from "react";
import Title from "../../../components/Title";
import { UserAuth } from "../../authContext";
import { ChangePswdCard, DeleteCard, ProfileCard } from "./(components)/components";

export default function Account() {

  const { showModal, setShowModal, user, firebaseUser } = UserAuth();

  return (
    <div className="bg-[#f8f9fb] min-h-screen grow px-8 md:px-16 pt-7 pb-10">
        <Title
          showModal={showModal}
          setShowModal={setShowModal}
          button="Document"
          title="Account"
        />
        <div
          className="md:grid grid-cols-1 grid-rows-3 justify-self-end lg:grid-cols-2 lg:grid-rows-2 gap-5 grid"
        >
          <ProfileCard user={user} session={firebaseUser} />
          <ChangePswdCard user={user} />
          <DeleteCard user={user} />
        </div>
      </div>
  );
}