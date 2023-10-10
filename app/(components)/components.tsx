"use client";
import { Toaster } from "react-hot-toast";

import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp, orderBy, query  } from "firebase/firestore";
import { type FormEvent, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { db, auth } from "../../firebase";
import { UserAuth } from "../authContext";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useCollection } from "react-firebase-hooks/firestore";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useRouter, usePathname } from "next/navigation";
import { type Dispatch, type SetStateAction } from "react";
import {
  ChatBubbleLeftIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  deleteDoc,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import Link from "next/link";

interface Props {
  id: string;
  setShow: Dispatch<SetStateAction<boolean>>;
}

export function ImageRow({ id, setShow }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { firebaseUser } = UserAuth();
  const [active, setActive] = useState(false);
  const [chatName, setChatName] = useState("");
  const [editable, setEditable] = useState(false);

  const handleChatName = async () => {
    const chatDoc = await getDoc(
      doc(db, "users", firebaseUser.uid, "chats", id)
    );
    const response = chatDoc?.data();
    if (response) {
      setChatName(response.name);
    }
  };

  useEffect(() => {
    handleChatName();
  }, []);

  useEffect(() => {
    if (!pathname) return;

    setActive(pathname.includes(id));
  }, [pathname]);

  const updateChatName = async () => {
    setEditable(false);
    await updateDoc(doc(db, "users", firebaseUser.uid, "chats", id), {
      name: chatName,
    });
  };

  const deleteChat = async () => {
    await deleteDoc(doc(db, "users", firebaseUser.uid, "chats", id));
    router.replace("/");
  };

  return (
    <Link
      href={`/chat/${id}`}
      className={`chatRow justify-center ${active && "bg-[#343541]"}`}
      onClick={(e) => {
        const target = e.target as Element;
        if (window.innerWidth < 768 && target.classList.contains("close")) {
          setShow(false);
        }
      }}
    >
      <ChatBubbleLeftIcon className="h-4 w-4" />
      {editable ? (
        <input
          type="text"
          className="flex-1 outline-none bg-transparent"
          contentEditable={editable}
          onChange={(e) => { setChatName(e.target.value); }}
          onBlur={updateChatName}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateChatName();
            }
          }}
          value={chatName}
          autoFocus
        />
      ) : (
        <p className="flex-1 truncate close">{chatName}</p>
      )}

      <div className={`${!active && "hidden"} flex gap-2`}>
        <PencilSquareIcon
          onClick={() => {
            if (!editable) {
              setEditable(true);
            }
          }}
          className="h-4 w-4 text-gray-400 hover:text-orange-300"
        />
        <TrashIcon
          onClick={() => deleteChat}
          className="h-4 w-4 text-gray-400 hover:text-red-600/70 close"
        />
      </div>
    </Link>
  );
}

interface Props {
  setShow: Dispatch<SetStateAction<boolean>>;
}

export function NewImage({setShow} : any) {
  const router = useRouter();
  const { firebaseUser } = UserAuth();
  const createNewImage = async () => {
    if(window.innerWidth < 768) {
      setShow(false);
    }
    const doc = await addDoc(
      collection(db, "users", firebaseUser.uid, "images"),
      {
        userId: firebaseUser.uid,
        createdAt: serverTimestamp(),
        name: "New image"
      }
    );
    router.push(`/image/${doc.id}`);
  };
  return (
    <div onClick={() => createNewImage} className="border-gray-700 border chatRow">
      <PlusIcon className="h-4 w-4" />
      <p className="">New image</p>
    </div>
  );
}

export function RightSidebar() {
  const { firebaseUser } = UserAuth();

  const [show, setShow] = useState(false);

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    if (window.innerWidth >= 768) {
      setShow(true);
    }
    window.addEventListener("resize", handleResize);
  });

  const [images, loading, error] = useCollection(
    firebaseUser &&
      query(
        collection(db, "users", firebaseUser.uid, "images"),
        orderBy("createdAt", "asc")
      )
  );
  return (
    <div
      className={`p-2 flex gap-5 md:flex-col md:h-screen ${
        !show ? "items-center" : ""
      }`}
    >
      <div className="flex-1 w-[50%] md:w-[100%]">
        {/* For small screen show Three bars */}
        <div
          className={`text-gray-400 p-2 max-w-[42px] rounded-lg cursor-pointer ${
            show && "hidden"
          }`}
          onClick={() => { setShow(true); }}
        >
          <Bars3Icon className="h-6 w-6" />
        </div>
        {/* If bars are clicked show this */}
        <div className={`${!show && "hidden"}`}>
          <div
            className={`text-gray-400 p-2 max-w-[42px] rounded-lg cursor-pointer mb-3 ${
              show && window.innerWidth >= 768 && "hidden"
            }`}
            onClick={() => { setShow(false); }}
          >
            <XMarkIcon className="h-6 w-6" />
          </div>
          <div>
            <NewImage setShow={setShow} />

            {loading && (
              <div className="animate-pulse  text-center text-white">
                <p>Loading Images...</p>
              </div>
            )}

            <div className="flex flex-col space-y-2 my-2">
              {images?.docs.map((image) => (
                <ImageRow key={image.id} id={image.id} setShow={setShow} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ClientProvider() {
  return (
    <Toaster position="top-right" />
  );
}

export function Message({ message }: any) {
  const isChatGPT = message.user.name === "ChatGPT"
  return (
    <div className={`py-5 text-white ${isChatGPT && "bg-[#434654]"}`}>
      <div className="flex space-x-5 px-10 max-w-2xl mx-auto">
        <img src={message.user.avatar} alt="" className="h-8 w-8" />
        <p className="pt-1 text-sm">{message.text}</p>
      </div>
    </div>
  );
}