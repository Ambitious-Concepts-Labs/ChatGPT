// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

"use client";
import "../../styles/globals.css";
import ClientProvider from "../../components/ClientProvider";
import RightSidebar from "../../components/RightSidebar";
import { SessionProvider } from "../../components/SessionProvider";
import Sidebar from "../../components/ChatSidebar";
import Home from "../../components/homepage/home";
import { useSession } from "next-auth/react";

const ChatLayout = ({ children }) => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <SessionProvider session={session}>
      {!session && (
        <>
          <Home />
        </>
      )}

      {session && (
        <div className="flex flex-col md:flex-row">
          <div className="sticky top-0 md:relative bg-[#202123] md:h-screen overflow-y-auto md:w-[260px] z-50">
            <Sidebar />
          </div>

          {/* ClientProvider - Notification */}
          <ClientProvider />

          <div className="bg-[#343541] flex-1">{children}</div>
          <div className="sticky top-0 md:relative bg-[#202123] md:h-screen overflow-y-auto md:w-[260px] z-50">
            <RightSidebar />
          </div>
        </div>
      )}
    </SessionProvider>
  );
};

export default ChatLayout;