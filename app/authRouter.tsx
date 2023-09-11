"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { auth } from "../firebase";
import { User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSession } from "next-auth/react";
import { delay } from "../utils/helperFunctions";

const HOME_ROUTE = "/";
const DASHBOARD_ROUTE = "/dashboard";
const SIGNIN_ROUTE = "/sign-in";

const AuthRouter = (props: any) => {
  const [user, loading] = useAuthState(auth);
  const { data: session } = useSession();
  const router = useRouter();
  const pathName = usePathname();

  const redirect = async (
    isLoading: boolean,
    firebaseUser: User | null | undefined
  ) => {
    if (!isLoading) {
        console.log(session, 'sessionnnnnn')
        console.log(firebaseUser, 'firebaseUser')
        console.log(pathName, 'pathname')
      await delay(2000)
      if (!session) {
        // router.push(SIGNIN_ROUTE);
      }
    }
  };

  useEffect(() => {
    redirect(loading, user);
  }, [loading, user, pathName]);

  if (loading) {
    return null;
  } else {
    return <>{props.children}</>;
  }
};

export default AuthRouter;