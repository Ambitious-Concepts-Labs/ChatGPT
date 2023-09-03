// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import React from "react";
import Image from "next/image";
import { GrDocument } from "react-icons/gr";
import { collection, query, orderBy } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Folder from "./Folder";
import Title from "./Title";
import NewModal from "./NewModal";
import { UserAuth } from "../app/authContext";

const Folders = () => {
  const { showModal, setShowModal, session, folders, id } = UserAuth();
  const [warningAlert, setWarningAlert] = React.useState(false);

  const handleClose = () => {
    setShowModal(false);
    setWarningAlert(false);
  };

  const inputRef = React.useRef();

  return (
    <>
      <Title
        id={id}
        showModal={showModal}
        setShowModal={setShowModal}
        button={"Folder"}
        title={"Folders"}
        session={session}
      />
      <section>
        <div className={`flex flex-col items-center {} dark:bg-night-blue p-5`}>
          <div className="flex flex-col items-center  ">
            {folders.length === 0 && (
              <>
                <Image
                  width={600}
                  height={600}
                  src="/folder.jpg"
                  alt="folders"
                  className="object-contain py-5 text-gray-400"
                />
              </>
            )}
          </div>
          <div className="flex flex-row flex-wrap w-full">
            {folders.map((folder) => (
              <Folder
                folders={folders}
                key={folder.id}
                session={session}
                folder={folder}
              />
            ))}
          </div>
        </div>
      </section>
      <>
        {showModal ? (
          <NewModal
            session={session}
            inputRef={inputRef}
            handleClose={handleClose}
            showModal={showModal}
            setShowModal={setShowModal}
            warningAlert={warningAlert}
            setWarningAlert={setWarningAlert}
          />
        ) : null}
      </>
    </>
  );
};

export default Folders;