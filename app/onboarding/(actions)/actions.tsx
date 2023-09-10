'use server'
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { UserAuth } from "../../authContext";

export async function updateName(name: string) {
    const { id } = UserAuth();

    await updateDoc(doc(db, "users", id), {
      name: name,
      onboarded: true
    });

}
