import React from "react";
import Image from "next/image";
import Document from "./Document";
import { TbFilePlus } from "react-icons/tb";
import { RxHamburgerMenu } from "react-icons/rx";
import { v4 as uuidv4 } from "uuid";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const Documents = (props: any) => {
  const { session, documents, setShowModal } = props
  const handleOnClick = async () => {
    setShowModal(!true);
    const uid = uuidv4();
    await setDoc(doc(db, "users", session?.user?.email, "documents", uid), {
      title: "Untitled document",
      status: "Draft",
      folder: "",
      response: "Sample Response",
      createdAt: serverTimestamp(),
      lastModified: new Date(),
      id: uid,
    });
    // router.push(`/document/${uid}`);
  };
  return (
    <>
      {documents?.empty && (
        <>
          <Image
            width={600}
            height={600}
            src="/folder.jpg"
            alt="folders"
            className="object-contain py-5 text-gray-400"
          />
          <button
            className="rounded col-start-3 justify-self-end md:col-start-2 md:row-start-1 md:justify-self-end w-fit bg-black px-2 py-2 rounded-sm text-white text-xs font-light flex items-center gap-2 cursor-pointer"
            onClick={() => handleOnClick()}
          >
            <div className="h-4 w-4">
              <TbFilePlus className="h-full w-auto" />
            </div>
            <span className="text-xs">New Document</span>
          </button>
          <button className="h-5 w-5 col-start-1 row-start-1 md:hidden">
            <RxHamburgerMenu className="h-full w-auto" />
          </button>
        </>
      )}
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
          {documents?.docs.map((document: { id: any; data: () => any; }) => (
            <Document
              key={document?.id}
              session={session}
              document={document.data()}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Documents;