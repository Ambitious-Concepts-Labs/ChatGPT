"use client";

import { DocumentData } from "firebase/firestore";
import React from "react";
import Image from "next/image";
import { AiOutlineStar } from "react-icons/ai";
import { GiArtificialHive } from "react-icons/gi";
import Link from "next/link";

type Props = {
  document: DocumentData;
};

const Document = (props: any) => {
  const { document, session } = props
  let lastModified = document?.lastModified?.seconds;
  lastModified = new Date(lastModified * 1000).toDateString();
  return (
    <>
      <React.Fragment key={`doc-${document?.id}`}>
        <Link href={`dashboard/document/${document?.id}`}>
          <div className={`col-span-2 flex items-center`}>
            <span className="flex items-center text-2xl pr-2">
              <AiOutlineStar />
            </span>
            {document?.title}
          </div>
        </Link>
        <div className={`col-start-4`}>
          {
            session?.photoURL ? 
              <Image
                width={30}
                height={30}
                src={session?.photoURL}
                alt={`${document?.title}'s doc`}
                className="object-contain rounded-full"
              />
            :
              <div className="rounded-full h-8 w-8 flex items-center justify-center bg-slate-100 text-slate-400 p-1">
                <GiArtificialHive />
              </div>
          }
        </div>
        <div className={`col-start-5`}>
          <div className="flex items-start mb-1">
            <span
              className={
                "w-4 h-4 mt-1 mr-2 rounded-full " +
                (document?.status == "Draft" ? "animate-pulse" : "")
              }
              style={
                document?.status == "Published"
                  ? { backgroundColor: "green" }
                  : { backgroundColor: "gray" }
              }
            ></span>
            &nbsp;
            {document?.status}
          </div>
        </div>
        <div className={`col-start-6`}>{lastModified || ""}</div>
      </React.Fragment>
    </>
  );
};

export default Document;