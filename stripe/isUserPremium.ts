import { getIdToken, getIdTokenResult, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default async function isUserPremium() {
  try {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await getIdToken(user);
        const decodedToken = await getIdTokenResult(user);
        return decodedToken?.claims?.stripeRole ? true : false;
      }
      return false;
    });
  } catch (error) {
    console.log(error)
    return false
  }
}