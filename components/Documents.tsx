import React from "react";
import Image from "next/image";
import Document from "./Document";

const Documents = ({ session, documents }) => {
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
          {/* <div onClick={() => setShowModal(true)} className="flex items-center mt-2 bg-white	border-gray-400 border-solid border-2 rounded px-3 py-1">
                  <GrDocument className='text-black'/>
                  &nbsp;
                  <p className='text-gray-400'>New Folders</p>
              </div> */}
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
          {documents?.docs.map((document) => (
            <Document session={session} document={document.data()} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Documents;
