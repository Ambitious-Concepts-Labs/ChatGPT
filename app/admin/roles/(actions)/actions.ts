'use server'

// import { revalidatePath } from "next/cache"
import { doc, updateDoc } from "firebase/firestore";
import { UserAuth } from "../../../authContext";
import { db } from "../../../../firebase";


export async function setRole(userId: string, role: any) {
  const { user, id } = UserAuth();

    if (user.role == "ADMIN") {
        await updateDoc(doc(db, "users", id), {
            role
        });
    }

    // revalidatePath('/admin/permissions')
}

