import { PlusIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { db } from "../firebase";

type Props = {
  setShow: Dispatch<SetStateAction<boolean>>;
};

const NewImage = ({setShow} : Props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const createNewImage = async () => {
    if(window.innerWidth < 768) {
      setShow(false);
    }
    const doc = await addDoc(
      collection(db, "users", session?.user?.id!, "images"),
      {
        userId: session?.user?.id!,
        createdAt: serverTimestamp(),
        name: "New image"
      }
    );
    router.push(`/image/${doc.id}`);
  };
  return (
    <div onClick={createNewImage} className="border-gray-700 border chatRow">
      <PlusIcon className="h-4 w-4" />
      <p className="">New image</p>
    </div>
  );
};

export default NewImage;
