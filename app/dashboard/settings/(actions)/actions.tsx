'use server';

import { doc, updateDoc } from 'firebase/firestore';
import { UserAuth } from '../../../authContext';
import { db } from '../../../../firebase';
// import { revalidatePath } from 'next/cache';

export async function updateProfile(name: string, image?: string) {
  const { id, user } = UserAuth();
  
  await updateDoc(doc(db, "users", id), {
    name,
    image: image ?? user.image
  });

  // revalidatePath('/dashboard/profile');
}
