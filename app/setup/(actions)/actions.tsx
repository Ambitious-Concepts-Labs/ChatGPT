'use server'

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";

export async function makeAdmin(id: string) {

    await updateDoc(doc(db, "users", id), {
      role: 'ADMIN',
    });

}
