// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

"use client";

import {  DocumentData } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { GrDocument } from "react-icons/gr";
import { UserAuth } from "../app/authContext";
import Link from "next/link";

type Props = {
  document: DocumentData;
};

const Folder = (props: any) => {
  const { folder, folders } = props
  const { getFoldersDocuments } = UserAuth();
  const { data: session } = useSession();
  console.log(folder)
  console.log(folder.documents)
  console.log(folder.documents.length === 0)
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
          {folder.documents.length === 0 ? (
            <>
            <Link 
            key={document.id}
            href={`/dashboard/folder/${folder.id}`}
            >
              <p className="pt-1  text-m">0 Document</p>
            </Link>
            </>
          ) : (
            folder.map((document) => (
              <>
               <Link 
                key={document.id}
                href={`/dashboard/folder/${folder.id}`}
                >
                  <p className="pt-1 text-m">
                    {folder.documents.length} Documents
                  </p>
                </Link>
              </>
            )))
          }
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