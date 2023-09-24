import { PlusIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { db } from "../firebase";
import { UserAuth } from "../app/authContext";

type Props = {
  setShow: Dispatch<SetStateAction<boolean>>;
};

const NewChat = ({setShow} : Props) => {
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
};

export default NewChat;
