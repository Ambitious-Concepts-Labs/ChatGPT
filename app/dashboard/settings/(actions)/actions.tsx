'use server';

import { UserAuth } from '../../../authContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';
// import { revalidatePath } from 'next/cache';

export async function updateProfile(name: string, image?: string) {
  const { id, user } = UserAuth();
  
  await updateDoc(doc(db, "users", id), {
    name: name,
    image: image ?? user.image
  });

  // revalidatePath('/dashboard/profile');
}
