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
import { UserAuth } from "../app/context/AuthContext";

const Folders = () => {
  const { showModal, setShowModal } = UserAuth();
  const [warningAlert, setWarningAlert] = React.useState(false);
  const { data: session } = useSession();

  let [folders] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email, "folders"),
        orderBy("createdAt", "asc"),
      ),
  );

  const handleClose = () => {
    setShowModal(false);
    setWarningAlert(false);
  };

  const inputRef = React.useRef();

  return (
    <>
      <Title
        showModal={showModal}
        setShowModal={setShowModal}
        button={"Folder"}
        title={"Folders"}
        session={session}
      />
      <section>
        <div className={`flex flex-col items-center {} dark:bg-night-blue p-5`}>
          <div className="flex flex-col items-center  ">
            {folders?.empty && (
              <>
                <Image
                  width={600}
                  height={600}
                  src="/folder.jpg"
                  alt="folders"
                  className="object-contain py-5 text-gray-400"
                />
                <div
                  onClick={() => setShowModal(true)}
                  className="flex items-center mt-2 bg-white	border-gray-400 border-solid border-2 rounded px-3 py-1"
                >
                  <GrDocument className="text-black" />
                  &nbsp;
                  <p className="text-gray-400">New Folders</p>
                </div>
              </>
            )}
          </div>
          <div className="flex flex-row flex-wrap w-full">
            {folders?.docs.map((folder) => (
              <Folder
                key={folder.id}
                session={session}
                folder={folder.data()}
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
