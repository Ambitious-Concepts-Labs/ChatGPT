import { onAuthStateChanged } from "firebase/auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsPeopleFill, BsPersonFill } from "react-icons/bs";
import { GiCargoShip } from "react-icons/gi";
import { GrDocument } from "react-icons/gr";
import { auth, db } from "../firebase";
import Card from "./Card";
import DocumentContainer from "./Documents";
import { IoDocumentTextOutline } from "react-icons/io5";
import Title from "./Title";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";

const Dashboard = () => {
  const [user, userLoading] = useAuthState(auth);
  const { data: session } = useSession();
  const router = useRouter();
  const [draft, setDraft] = useState(0);

  // useEffect(() => {
  //   if (!session) {
  //     router.replace("/");
  //   }
  // }), [session];
  let [documents] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email, "documents"),
        orderBy("createdAt", "asc"),
      ),
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log({ uid });
      } else {
        console.log("no user");
      }
    });
    handleStatus();
  }, [user, documents]);

  function handleStatus() {
    let count = 0;
    documents?.docs.map((document) => {
      const data = document.data();
      if (data.status === "Draft") {
        count++;
      }
    });
    setDraft(count);
  }

  return (
    <>
      <Title button={"Document"} title={"Dashboard"} session={session} />
      <section className="flex justify-between flex-wrap mt-2 text-black">
        <Card
          bgHover="hover:bg-blue-600 dark:hover:bg-blue-800"
          textHover="hover:text-white"
          heading="Doucments"
          number={documents ? documents.size : 0}
          iconbg="bg-blue-600 dark:bg-blue-800"
          icon={<IoDocumentTextOutline />}
        />

        <Card
          bgHover="hover:bg-teal-500 dark:hover:bg-teal-700"
          textHover="hover:text-white"
          heading="Drafts"
          number={`${(draft / documents?.size) * 100} %`}
          iconbg="bg-teal-500 dark:bg-teal-700"
          icon={<BsPeopleFill />}
        />

        <Card
          bgHover="hover:bg-pink-500 dark:hover:bg-pink-700"
          textHover="hover:text-white"
          heading="Published"
          number={`${((documents?.size - draft) / documents?.size) * 100} %`}
          iconbg="bg-pink-500 dark:bg-pink-700"
          icon={<GiCargoShip />}
        />

        <Card
          bgHover="hover:bg-pink-500 dark:hover:bg-pink-700"
          textHover="hover:text-white"
          heading="Token Usage"
          number="0%"
          iconbg="bg-pink-500 dark:bg-pink-700"
          icon={<GiCargoShip />}
        />
      </section>

      <DocumentContainer documents={documents} session={session} />
    </>
  );
};

export default Dashboard;
