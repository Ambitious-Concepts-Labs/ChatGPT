"use client";

import { collection, DocumentData, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { GrDocument } from "react-icons/gr";
import { db } from "../firebase";

type Props = {
  document: DocumentData;
};

const Folder = ({folder}) => {
    const { data: session } = useSession();

    let [documents] = useCollection(
    session &&
      query(
        collection(
          db,
          "users",
          session?.user?.email,
          "folders",
          folder.name,
          "documents"
        ),
        orderBy("createdAt", "asc")
      )
    );    
    console.log(documents, 'huh')
    console.log(documents?.docs, 'huh')
    return (
        <>
            <div className={`text-black bg-white h-auto rounded p-8 pr-20`}>
                <div className='flex items-center'>
                    <div className='text p-3 bg-gray-200 rounded'>
                        <GrDocument className='text-black'/>
                    </div>
                    <div className="flex space-x-5 px-5 max-w-2xl mx-auto">
                        <p className="pt-1 text-l">{folder.name}</p>
                    </div>
                </div>
                <br />
                <div className='flex justify-between items-center w-80	'>
                  {documents?.empty && (
                    <>
                      <p className="pt-1  text-m">0 Document</p>
                    </>
                  )}
                  {documents?.docs.map((document) => (
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