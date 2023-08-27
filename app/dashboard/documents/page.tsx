"use client";
import Documents from "../../../components/Documents";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSession } from "next-auth/react";
import { auth, db } from "../../../firebase";
import { useRouter } from "next/navigation";
import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import Filters from "../../../components/Filters";
import Title from "../../../components/Title";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { UserAuth } from "../../context/AuthContext";

const MainDocuments = () => {
  const [user] = useAuthState(auth);
  const { data: session } = useSession();
  const router = useRouter();
  const { showModal, setShowModal } = UserAuth();

  let [documents] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email, "documents"),
        orderBy("createdAt", "asc"),
      ),
  );

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
  console.log(user);
  return (
    <div>
      <Title
        showModal={showModal}
        setShowModal={setShowModal}
        button={"Document"}
        title={"Documents"}
        session={session}
      />
      <Filters />
      <Documents
        setShowModal={setShowModal}
        documents={documents}
        session={session}
      />
    </div>
  );
};

export default MainDocuments;
