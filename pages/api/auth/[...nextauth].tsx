import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { auth, db } from "../../../firebase";
import {
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { delay } from "../../../utils/helperFunctions";

let uid: string = ''

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
    async signIn(props: any) {
      const { user, account } = props
      console.log(props)
      let newUser
      // Firebase Auth
      try {
        // Build Firebase credential with the Google ID token.
        const idToken = account.id_token;
        const credential = GoogleAuthProvider.credential(idToken);
        console.log('creds', credential)
        // Sign in with credential from the Google user.
        newUser = await signInWithCredential(auth, credential).catch((error) => {
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
        console.log(error, 'error yikes');
      }

      //   // Firestore DB
      try {
        if (newUser) {
          uid = newUser?.user.uid
          const docRef = doc(db, "users", newUser?.user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            return true;
          } else {
            await setDoc(doc(db, "users", newUser?.user.uid), {
              // uid: newUser?.user.uid,
              email: user.email,
              name: user.name,
              provider: account.provider,
              photoUrl: user.image,
              createdAt: serverTimestamp(),
            });
          }
        }
      } catch (error) {
        console.log(error);
      }

      //   console.log('yo link account', user, account, profile);
      return true;
    },
    async redirect(props: any) {
      const { url, baseUrl } = props
      // // Allows relative callback URLs
      // console.log(`${baseUrl}${url}`)
      // if (url.startsWith("/")) return `${baseUrl}${url}`
      // // Allows callback URLs on the same origin
      // else if (new URL(url).origin === baseUrl) return url
      // return baseUrl
      return `${baseUrl}/dashboard`;
    },
    async session (props: any) {
      const { session } = props
      console.log(props, 'sessions async')
      console.log(uid, 'uid async')
      await delay(2000)
      session.user.id = uid
      return session
    },
  },
  events: {
    async linkAccount(props: any) {
      const { user, account, profile } = props
      console.log("yo link account", user, account, profile);
    },
  },
};

export default NextAuth(authOptions);