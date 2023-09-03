"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import Documents from "../../../../components/Documents";
import { UserAuth } from "../../../authContext";
import { useSession } from "next-auth/react";
import { db } from "../../../../firebase";

type Props = {
  params: {
    id: string;
  };
};

const FolderPage = ({}: Props) => {
  const pathname = usePathname();
  const { setShowModal, getFoldersDocuments, id } = UserAuth();
  const { data: session } = useSession();
  const [documents, setDocuments] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    fetchDocs();
  }, []);


  async function fetchDocs() {
    if (pathname) {
        const queryId = pathname.substring(pathname.lastIndexOf("/") + 1);
        const uid = id
        const docRef = await getDoc(
          doc(db, "users", uid, "folders", queryId.toString()),
        );
        const docData = docRef.data();
        if (docData) {
            setDocuments(docData);
        }
    }
        
  }

  return (
    <>
      {!isClient || !documents ? (
        "This is never prerendered"
      ) : (
        <div className="flex w-full h-full">
          <div className="grow w-full">
            <main className="flex flex-col h-full items-center mx-auto">
              <nav className="bg-grey-light p-3 rounded font-sans w-full m-4">
                <ol className="list-reset flex text-grey-dark">
                    <li><a href="/dashboard/documents" className="text-blue font-bold">Folders</a></li>
                    <li><span className="mx-2">/</span></li>
                    <li>Document: {documents.name || 'No Name'}</li>
                </ol>
              </nav>
              <div>
                <button>edit</button>
                <button>delete</button>
              </div>
              <div>Filter</div>
              <div>Pagination</div>
              <Documents
                setShowModal={setShowModal}
                documents={documents?.documents}
                session={session}
              />
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default FolderPage;