"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp, orderBy, query  } from "firebase/firestore";
import { type FormEvent, useState, useEffect } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import { db, auth } from "../../../firebase";
import { UserAuth } from "../../authContext";
import Select from "react-select";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { useCollection } from "react-firebase-hooks/firestore";
import { type DocumentData } from "firebase/firestore";
import {
  ArrowRightOnRectangleIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { signOut } from "firebase/auth";

import {
  ChatBubbleLeftIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  deleteDoc,
  doc,
  DocumentSnapshot,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import Link from "next/link";
// @ts-ignore
import { usePathname } from "next/navigation";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { Message } from "../../(components)/components";

export function NewChat({setShow} : any) {
  const router = useRouter();
  const { firebaseUser } = UserAuth();
  const createNewChat = async () => {
    if(window.innerWidth < 768) {
      setShow(false);
    }
    const doc = await addDoc(
      collection(db, "users", firebaseUser.uid, "chats"),
      {
        userId: firebaseUser.uid,
        createdAt: serverTimestamp(),
        name: "New chat"
      }
    );
    router.push(`/chat/${doc.id}`);
  };
  return (
    <div onClick={() => createNewChat} className="border-gray-700 border chatRow">
      <PlusIcon className="h-4 w-4" />
      <p className="">New chat</p>
    </div>
  );
}

export function ChatRow({ id, setShow }: any) {
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

export function Sidebar() {
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

  const [chats, loading, error] = useCollection(
    firebaseUser &&
      query(
        collection(db, "users", firebaseUser.uid, "chats"),
        orderBy("createdAt", "asc"),
      ),
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
            <NewChat setShow={setShow} />
            <div>
              <ModelSelection />
            </div>

            {loading && (
              <div className="animate-pulse  text-center text-white">
                <p>Loading Chats...</p>
              </div>
            )}

            <div className="flex flex-col space-y-2 my-2">
              {chats?.docs.map((chat) => (
                <ChatRow key={chat.id} id={chat.id} setShow={setShow} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {firebaseUser && (
        <div className="flex md:flex-col md:gap-2 flex-1 md:flex-grow-0 justify-end md:items-center">
          <img
            className="h-12 w-12 rounded-full mr-3 md:mx-auto"
            src={firebaseUser.photoURL}
            alt=""
          />
          <button
            onClick={async () => { await signOut(auth); }}
            id="logout"
            className={`h-12 w-12 md:w-[100%] md:h-auto flex items-center justify-center gap-2  border font-bold p-2 text-gray-300 rounded-lg hover:bg-[#11A37F] transition duration-300 hover:border-transparent hover:text-white active:scale-90 ${
              window.innerWidth < 768 && "bg-[#11A37F] text-white border-none"
            }`}
          >
            <ArrowRightOnRectangleIcon className="h-6 w-6 rotate-180" />
            {window.innerWidth >= 768 ? "Log out" : ""}
          </button>
        </div>
      )}
    </div>
  );
}

export function Chat({ chatId }: any) {
  const {firebaseUser} = UserAuth()

  const [messages] = useCollection(
    firebaseUser &&
      query(
        collection(
          db,
          "users",
          firebaseUser.uid,
          "chats",
          chatId,
          "messages"
        ),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
      {messages?.empty && (
        <>
        <p className="mt-10 text-center text-white">Type a prompt below to get started!</p>
        <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 text-white animate-bounce" />
        </>
      )}
      {messages?.docs.map((message) => (
        <Message key={message.id} message={message.data()} />
      ))}
    </div>
  );
}

export function ChatInput({ chatId }: any) {
  const [prompt, setPrompt] = useState("");
  const { firebaseUser, user } = UserAuth();

  // TODO useSWR to get model
  const { data: model } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;

    const input = prompt.trim();
    setPrompt("");

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: firebaseUser.uid,
        name: user.displayName,
        avatar:
          firebaseUser.photoUrl ||
          `https://ui-avatar.com/api/?name=${user.displayName}`,
      },
    };

    await addDoc(
      collection(
        db,
        "users",
        firebaseUser.uid,
        "chats",
        chatId,
        "messages"
      ),
      message
    );

    // Notification toast loading
    const notification = toast.loading("ChatGPT is thinking...");

    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session: firebaseUser,
      }),
    }).then(() => {
      // Notification toast Successful
      toast.success("ChatGPT has responded!", {
        id: notification,
      });
    });
  };

  return (
    <>
      <div className="bg-gray-600/50 text-gray-200 rounded-lg text-sm w-[90%] xl:w-[70%] mx-auto mb-5 mt-5">
        <form
          onSubmit={sendMessage}
          method="post"
          className="flex p-3 md:p-4 space-x-5"
        >
          <input
            className="outline-none bg-transparent flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
            disabled={!firebaseUser}
            value={prompt}
            onChange={(e) => { setPrompt(e.target.value); }}
            type="text"
            placeholder="Get answers to your questions here..."
          />

          <button
            type="submit"
            disabled={!prompt || !firebaseUser}
            className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-2 py-1 md:px-4 md:py-2  rounded cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <PaperAirplaneIcon className="h-4 w-4 -rotate-45 " />
          </button>
        </form>
      </div>
      {/* <div className="md:hidden w-[70%] mx-auto mb-5">
        <ModelSelection />
      </div> */}
    </>
  );
}

const fetchModels = async () => await fetch("/api/getEngines").then(async (res) => await res.json());

export function ModelSelection() {
  const { data: models, isLoading } = useSWR("models", fetchModels);
  const { data: model, mutate: setModel } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });
  return (
    <div className="mt-2">
      <Select
        className="mt-2"
        options={models?.modelOptions}
        defaultValue={model}
        placeholder={model}
        isSearchable
        isLoading={isLoading}
        menuPosition="fixed"
        classNames={{
          control: (state) => "bg-[#434654] border-[#434654]",
        }}
        onChange={async e => await setModel(e.value)}
      />
    </div>
  );
}

