// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

"use client";

import {  type DocumentData } from "firebase/firestore";
import { GrDocument } from "react-icons/gr";
import Link from "next/link";
import { UserAuth } from "../../../authContext";

interface Props {
  document: DocumentData;
}

export function Folder(props: any) {
  const { folder, folders } = props
  const { getFoldersDocuments, firebaseUser } = UserAuth();
  console.log(folder)
  console.log(folder.documents)
  console.log(folder.documents.length === 0)
  return (
    <div
        className="flex flex-col flex-start w-3/12 mr-5 text-black bg-white rounded p-8"
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
            <Link 
            key={document.id}
            href={`/dashboard/folder/${folder.id}`}
            >
              <p className="pt-1  text-m">0 Document</p>
            </Link>
          ) : (
            folder.documents.map((document) => (
              <Link 
                key={document.id}
                href={`/dashboard/folder/${folder.id}`}
                >
                  <p className="pt-1 text-m">
                    {folder.documents.length} Documents
                  </p>
                </Link>
            )))
          }
          <img
            className="h-5 w-5 rounded-full md:mx-auto"
            src={firebaseUser.photoURL}
            alt=""
          />
        </div>
      </div>
  );
}

