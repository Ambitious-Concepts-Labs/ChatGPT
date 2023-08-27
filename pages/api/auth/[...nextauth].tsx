import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "../../../firebase";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      //   // Firebase Auth
      try {
        const auth = await getAuth();
        //     // Build Firebase credential with the Google ID token.
        const idToken = account.id_token;
        const credential = GoogleAuthProvider.credential(idToken);
        //     // Sign in with credential from the Google user.
        await signInWithCredential(auth, credential).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The credential that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          console.log({
            errorCode,
            errorMessage,
            email,
            credential,
          });
        });
      } catch (error) {
        console.log(error);
      }

      //   // Firestore DB
      try {
        const docRef = doc(db, "users", user.email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          return true;
        } else {
          await setDoc(doc(db, "users", user.email), {
            uid: user.id,
            email: user.email,
            name: user.name,
            provider: account.provider,
            photoUrl: user.image,
            createdAt: serverTimestamp(),
          });
        }
      } catch (error) {
        console.log(error);
      }

      //   console.log('yo link account', user, account, profile);
      return true;
    },
    async redirect({ url, baseUrl }) {
      // // Allows relative callback URLs
      // console.log(`${baseUrl}${url}`)
      // if (url.startsWith("/")) return `${baseUrl}${url}`
      // // Allows callback URLs on the same origin
      // else if (new URL(url).origin === baseUrl) return url
      // return baseUrl
      return `${baseUrl}/dashboard`;
    },
  },
  events: {
    async linkAccount({ user, account, profile }) {
      console.log("yo link account", user, account, profile);
    },
  },
};

export default NextAuth(authOptions);
