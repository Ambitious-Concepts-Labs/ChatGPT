'use client'

// import { revalidatePath } from "next/cache"
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase";

export async function addTokens(userId: any, rewardId: any, status: any) {
  if (status === "verified") {
    const getTokens = async () => {
      const dataArr:Array<{}> = []
      const querySnapshot = await getDocs(collection(db, "users", userId, "tokens"));
      querySnapshot.forEach((token) => {
          const obj = { ...token.data(), tokenId: token.id }
          dataArr.push(obj)
      });
      return dataArr
    }
    const tokensData: any = await getTokens()
    let approvedToken
    switch (tokensData[0].type) {
      case "tikTok":
        approvedToken = 10000
        break;
      case "linkedin":
        approvedToken = 8000
        break;
      case "facebook":
        approvedToken = 5000
        break;
      case "instagram":
        approvedToken = 3000
        break;
      case "snapchat":
        approvedToken = 1000
        break;
      default:
        approvedToken = 0
        break;
    }
    await setDoc(doc(db, "users", userId, "tokens", tokensData[0].tokenId), 
    { available: tokensData[0].available + approvedToken }, { merge: true });
  }

  try {
    let newdoc = await setDoc(doc(db, "users", userId, "rewards", rewardId), 
    { status }, { merge: true });

    console.log(newdoc)
  } catch (error) {
    console.log(error)
  }

    // revalidatePath('/admin/permissions')
}

