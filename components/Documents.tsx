import React, { useEffect, useState } from "react";
import Image from "next/image";
import Document from "./Document";
import { v4 as uuidv4 } from "uuid";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useRouter } from "next/navigation";
import { delay } from "../utils/helperFunctions";

const Documents = (props: any) => {
  const { id, session, documents, setShowModal } = props
  const router = useRouter();

  const handleOnClick = async () => {
    setShowModal(!true);
    const uid = uuidv4();
    await setDoc(doc(db, "users", id, "documents", uid), {
      title: "Untitled document",
      status: "Draft",
      folder: "",
      response: "Sample Response",
      createdAt: serverTimestamp(),
      lastModified: new Date(),
      id: uid,
    });
    router.push(`dashboard/document/${uid}`);
  };

  return (
    <>
      {!documents || documents.length === 0 ? (
        <>
          <Image
            width={600}
            height={600}
            src="/folder.jpg"
            alt="folders"
            className="object-contain py-5 text-gray-400"
          />
        </>
      ) : (
        <section>
          <div className="flex justify-between flex-wrap items-center mt-12">
            <div>
              <h2 className="font-bold text-slate-800 "> Recent Documents </h2>
            </div>
          </div>
          <div className="grid grid-cols-6 grid-flow-row gap-4 my-4 bg-white dark:bg-night-blue p-5 h-full">
            <div className="col-span-2 uppercase font-medium text-xs text-slate-600 dark:text-slate-400">
              Title
            </div>
            <div className="col-start-4 uppercase font-medium text-xs text-slate-600 dark:text-slate-400">
              Author
            </div>
            <div className="col-start-5 uppercase font-medium text-xs text-slate-600 dark:text-slate-400">
              Status
            </div>
            <div className="col-start-6 uppercase font-medium text-xs text-slate-600 dark:text-slate-400">
              Modified
            </div>
            {documents.map((document: { id: any; data: () => any; }) => (
              <Document
                key={document?.id}
                session={session}
                document={document}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default Documents;