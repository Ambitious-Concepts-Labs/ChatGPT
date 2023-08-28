// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

"use client";
import { onAuthStateChanged } from "firebase/auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsPeopleFill } from "react-icons/bs";
import { GiCargoShip } from "react-icons/gi";
import { auth, db } from "../firebase";
import Card from "./Card";
import DocumentContainer from "./Documents";
import { IoDocumentTextOutline } from "react-icons/io5";
import Title from "./Title";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
// import { UserAuth } from "../app/context/AuthContext";

const Dashboard = () => {
  const [user] = useAuthState(auth);
//   const { showModal, setShowModal } = UserAuth();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState([]);
  const { data: session } = useSession();
  const [draft, setDraft] = useState(0);

  useEffect(() => {
    // if (!session) {
    //   router.replace("/");
    // }
  }),
    [session];

  let [documents] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email, "documents"),
        orderBy("createdAt", "asc"),
      ),
  );

  const docSize = documents?.size || 0

  // useEffect(() => {
  //   try {
  //     const q = query(
  //       collection(db, "users", session?.user?.email, "documents"),
  //       orderBy("createdAt", "asc")
  //     );
  //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //       let itemsArr = [];

  //       querySnapshot.forEach((doc) => {
  //         itemsArr.push({ ...doc.data(), id: doc.id });
  //       });
  //       setItems(itemsArr);
  //       return () => unsubscribe();
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

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

  console.log(items, "popopop");
  return (
    <>
      <Title
        setShowModal={setShowModal}
        showModal={showModal}
        button={"Document"}
        title={"Dashboard"}
        session={session}
      />
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
          number={`${(draft / docSize) * 100} %`}
          iconbg="bg-teal-500 dark:bg-teal-700"
          icon={<BsPeopleFill />}
        />

        <Card
          bgHover="hover:bg-pink-500 dark:hover:bg-pink-700"
          textHover="hover:text-white"
          heading="Published"
          number={`${((docSize - draft) / docSize) * 100} %`}
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

      <DocumentContainer
        setShowModal={setShowModal}
        documents={documents}
        session={session}
      />
    </>
  );
};

export default Dashboard;