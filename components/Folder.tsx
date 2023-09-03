// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

"use client";

import { collection, DocumentData, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { GrDocument } from "react-icons/gr";
import { db } from "../firebase";
import { UserAuth } from "../app/authContext";

type Props = {
  document: DocumentData;
};

const Folder = (props: any) => {
  const { folder } = props
  const { getFoldersDocuments } = UserAuth();
  const { data: session } = useSession();

  const documents = getFoldersDocuments(folder.name)

  return (
    <>
      <div
        className={`flex flex-col flex-start w-3/12 mr-5 text-black bg-white rounded p-8`}
      >
        <div className="flex items-center">
          <div className="text p-3 bg-gray-200 rounded">
            <GrDocument className="text-black" />
          </div>
          <div className="flex pr-3">
            <b>
              <p className="pl-3 pt-1 text-l">{folder.name}</p>
            </b>
          </div>
        </div>
        <br />
        <div className="flex justify-between items-center	">
          {documents?.empty && (
            <>
              <p className="pt-1  text-m">0 Document</p>
            </>
          )}
          {documents.map((document) => (
            <>
              <p key={document.id} className="pt-1 text-m">
                {document} Document
              </p>
            </>
          ))}
          <img
            className="h-5 w-5 rounded-full md:mx-auto"
            src={session?.user?.image}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Folder;