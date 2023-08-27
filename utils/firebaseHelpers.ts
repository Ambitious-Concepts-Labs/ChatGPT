import {
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase";

export const getAllNestedCollection = async (collection) => {
  const allCollection = await getDocs(collectionGroup(db, collection));
  return allCollection;
};

export const setDocument = async (
  session,
  primaryCol,
  secondaryCol,
  docName,
) => {
  await setDoc(
    doc(db, primaryCol, session?.user?.email, secondaryCol, docName),
    {
      name: docName,
      createdAt: serverTimestamp(),
      id: uuidv4(),
    },
  );
};
