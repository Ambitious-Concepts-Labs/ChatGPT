// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

"use client";

import "../../styles/globals.css";
import ClientProvider from "../../components/ClientProvider";
import RightSidebar from "../../components/RightSidebar";
import Sidebar from "../../components/ChatSidebar";
import Home from "../../components/homepage/home";

function ChatLayout({ children }) {
  const { session } = useAuth();
  console.log(session);
  return (
    <>
      {!session && (
        <Home />
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
    </>
  );
}

export default ChatLayout;