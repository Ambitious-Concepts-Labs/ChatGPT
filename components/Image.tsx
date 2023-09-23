"use client";

import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Message from "./Message";
import { UserAuth } from "../app/authContext";

type Props = {
  imageId: string;
};
const Image = ({ imageId }: Props) => {
  const { firebaseUser } = UserAuth();

  const [messages] = useCollection(
    firebaseUser &&
      query(
        collection(
          db,
          "users",
          firebaseUser.uid,
          "images",
          imageId,
          "messages"
        ),
        orderBy("createdAt", "asc")
      )
  );

  console.log(messages)

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
};

export default Image;
