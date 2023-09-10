'use server'

// import { authOptions } from "@/auth/options";
// import { prisma } from "@saas/database/connection"
import { getServerSession } from "next-auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";

export async function makeAdmin(id: string) {

    await updateDoc(doc(db, "users", id), {
      role: 'ADMIN',
    });

}
