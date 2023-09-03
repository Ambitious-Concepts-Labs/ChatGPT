import React from "react";
import { useSession } from "next-auth/react";
import ProfileCard from "./ProfileCard";
import ChangePswdCard from "./ChangePswdCard";
import DeleteCard from "./DeleteCard";
import Title from "./Title";
import { UserAuth } from "../app/authContext";

export default function Account() {
  const { data: session } = useSession();
  const { showModal, setShowModal, user } = UserAuth();

  return (
    <>
      <div className="bg-[#f8f9fb] min-h-screen grow px-8 md:px-16 pt-7 pb-10">
        <Title
          showModal={showModal}
          setShowModal={setShowModal}
          button={"Document"}
          title={"Account"}
          session={session}
        />
        <div
          className={`md:grid grid-cols-1 grid-rows-3 justify-self-end lg:grid-cols-2 lg:grid-rows-2 gap-5 grid`}
        >
          <ProfileCard user={user} session={session} />
          <ChangePswdCard user={user} session={session} />
          <DeleteCard user={user} session={session} />
        </div>
      </div>
    </>
  );
}