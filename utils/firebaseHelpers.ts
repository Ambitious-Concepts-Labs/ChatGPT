import { collectionGroup, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const getAllNestedCollection = async (collection) => {
    const allCollection = await getDocs(collectionGroup(db, collection))
    return allCollection    
}