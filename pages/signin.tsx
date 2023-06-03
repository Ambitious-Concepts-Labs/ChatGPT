import * as React from "react";
import { useRouter } from "next/router";
import Login from "../components/Login";
import { SessionProvider } from "../components/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import Head from "../app/head";
import Sidebar from "../components/Sidebar";
import ClientProvider from "../components/ClientProvider";
import RightSidebar from "../components/RightSidebar";

export default function Signin() {
// ({
//   children,
// }: {
//   children: React.ReactNode;
// }) {

  // const session = await getServerSession(authOptions);
  // return (
  //   <html lang="en">
  //     <Head />
  //     <body>
  //       <SessionProvider session={session}>
  //         {!session ? (
  //           <>
  //             <Login />
  //           </>
  //         ) : null }
  //       </SessionProvider>
  //     </body>
  //   </html>
  // );
  return (
    <>
      <Login/>
    </>
  );
}
