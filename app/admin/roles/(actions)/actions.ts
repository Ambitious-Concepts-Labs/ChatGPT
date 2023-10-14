'use client'

// import { revalidatePath } from "next/cache"
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase";


export async function setRole(userId: any, role: any) {
  console.log({userId, role})
  try {
    let newdoc = await setDoc(doc(db, "users", userId)
    , { role }, { merge: true });

    console.log(newdoc)
  } catch (error) {
    console.log(error)
  }

    // revalidatePath('/admin/permissions')
}

