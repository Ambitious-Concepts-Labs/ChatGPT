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

export const getAllNestedCollection = async (collection: string) => {
  const allCollection = await getDocs(collectionGroup(db, collection));
  return allCollection;
};

export const setDocument = async (
  session: { user: { email: string; }; },
  primaryCol: string,
  secondaryCol: string,
  docName: string,
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