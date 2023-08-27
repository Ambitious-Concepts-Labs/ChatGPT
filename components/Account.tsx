import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import ProfileCard from "./ProfileCard";
import ChangePswdCard from "./ChangePswdCard";
import DeleteCard from "./DeleteCard";
import Title from "./Title";
import { UserAuth } from "../app/context/AuthContext";

export default function Account() {
  const [isOpen, setIsOpen] = useState(false);
  const [user] = useAuthState(auth);
  const { data: session } = useSession();
  const router = useRouter();
  const { showModal, setShowModal } = UserAuth();

  useEffect(() => {
    if (!session) {
      router.replace("/");
    }
  }),
    [session];

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log({ uid });
      } else {
        console.log("no user");
      }
    });
  }, []);
  const handleOpenSidebar = () => {
    setIsOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsOpen(false);
  };
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
          className={`md:grid grid-cols-1 grid-rows-3 justify-self-end lg:grid-cols-2 lg:grid-rows-2 gap-5 ${
            isOpen ? "hidden" : "grid"
          }`}
        >
          <ProfileCard user={user} session={session} />
          <ChangePswdCard user={user} session={session} />
          <DeleteCard user={user} session={session} />
        </div>
      </div>
    </>
  );
}
