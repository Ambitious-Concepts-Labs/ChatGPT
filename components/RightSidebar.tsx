"use client";

import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import {
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import NewImage from "./NewImage";
import ImageRow from "./ImageRow";

const RightSidebar = () => {
  const { data: session } = useSession();

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
    session &&
      query(
        collection(db, "users", session?.user?.email!, "images"),
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
        {/* For small screen show Three bars*/}
        <div
          className={`text-gray-400 p-2 max-w-[42px] rounded-lg cursor-pointer ${
            show && "hidden"
          }`}
          onClick={() => setShow(true)}
        >
          <Bars3Icon className="h-6 w-6" />
        </div>
        {/* If bars are clicked show this */}
        <div className={`${!show && "hidden"}`}>
          <div
            className={`text-gray-400 p-2 max-w-[42px] rounded-lg cursor-pointer mb-3 ${
              show && window.innerWidth >= 768 && "hidden"
            }`}
            onClick={() => setShow(false)}
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
};

export default RightSidebar;
