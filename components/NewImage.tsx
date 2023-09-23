import { PlusIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { db } from "../firebase";
import { UserAuth } from "../app/authContext";

type Props = {
  setShow: Dispatch<SetStateAction<boolean>>;
};

const NewImage = ({setShow} : Props) => {
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
};

export default NewImage;
