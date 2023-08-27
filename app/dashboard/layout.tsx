"use client";
import React from "react";
import Chatbot from "../../components/Chatbot";
import Sidebar from "../../components/DashboardSidebar";
import "../../styles/globals.css";
import "tailwindcss/tailwind.css";
import { Rubik } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

const DashboardLayout = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [askQuestion, setAskQuestion] = React.useState(false);

  const handleOpenSidebar = () => {
    setIsOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className={`${rubik.className} flex ${isOpen && "overflow-hidden"}`}>
        <Sidebar
          setAskQuestion={setAskQuestion}
          askQuestion={askQuestion}
          isOpen={isOpen}
          handleCloseSidebar={handleCloseSidebar}
        />
        <div className="bg-[#f8f9fb] min-h-screen grow px-8 md:px-16 pt-7 pb-10 static">
          {children}
          {askQuestion && <Chatbot />}
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
