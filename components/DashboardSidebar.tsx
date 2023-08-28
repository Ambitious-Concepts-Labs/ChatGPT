"use client";

import { BiUser } from "react-icons/bi";
import { BsFolder2, BsSuitHeart, BsTrophy } from "react-icons/bs";
import { FaRegLifeRing } from "react-icons/fa6";
import { HiArrowUpTray } from "react-icons/hi2";
import { IoCardOutline, IoCloseOutline } from "react-icons/io5";
// import { LuBook } from "react-icons/lu";
import { PiSunBold } from "react-icons/pi";
import { RiUploadCloud2Line } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { TbFileDescription } from "react-icons/tb";
import NavList from "./NavList";
import Toggle from "./Toogle";
import logo from "../assets/logo.svg";
import Image from "next/image";
// import { LiaFileInvoiceSolid } from "react-icons/lia";
// import { AiTwotoneSetting } from "react-icons/ai";
import { signOut } from "next-auth/react";
import UseDarkMode from "../utils/use-dark-mode";

export default function Sidebar(props: any) {
  const {  askQuestion, isOpen, handleCloseSidebar, setAskQuestion } = props

  const home = [
    {
      title: "Dashboard",
      icon: <RxDashboard />,
      src: "/dashboard",
    },
  ];

  const documents = [
    {
      title: "Folders",
      icon: <BsFolder2 />,
      src: "/dashboard/folders",
    },
    {
      title: "Documents",
      icon: <TbFileDescription />,
      src: "/dashboard/documents",
    },
  ];
  const content = [
    {
      title: "Trash",
      icon: <BsFolder2 />,
    },
    {
      title: "Liked",
      icon: <TbFileDescription />,
    },
    {
      title: "Disliked",
      icon: <TbFileDescription />,
    },
  ];

  const account = [
    {
      title: "Usage",
      icon: <RiUploadCloud2Line />,
      badge: "0%",
      src: "/dashboard/usage",
    },
    {
      title: "Billing",
      icon: <IoCardOutline />,
      src: "/dashboard/billing",
    },
    // {
    //   title: 'Invoices',
    //   icon: <LiaFileInvoiceSolid />,
    // },
    {
      title: "Account",
      icon: (
        <div className="border border-black rounded-md overflow-hidden h-4 w-4">
          <BiUser className="h-full w-auto relative -bottom-[0.1rem]" />
        </div>
      ),
      src: "/dashboard/account",
    },
    {
      title: "Rewards",
      icon: <BsTrophy />,
      badge: "New",
      src: "/dashboard/rewards",
    },
    // {
    //   title: 'Settings',
    //   icon: <AiTwotoneSetting />,
    // }
  ];

  const support = [
    {
      title: "Support",
      icon: <FaRegLifeRing />,
    },
    // {
    //   title: 'Documentation',
    //   icon: <LuBook />
    // },
    {
      title: "Feedback",
      icon: <BsSuitHeart />,
      src: "/dashboard/feedback",
    },
  ];
  return (
    <div
      className={`${
        isOpen ? "absolute z-10 flex" : "hidden"
      } md:static overflow-y-auto w-screen md:flex bg-white md:w-1/2 lg:w-[20%] px-6 pt-6 flex-col md:max-h-screen`}
    >
      <div className="grid items-center grid-cols-3 grid-rows-1">
        <div className="col-start-1 justify-self-center row-start-1 rounded-full overflow-hidden bg-black text-white w-8 h-8 flex items-center justify-center">
          <Image src={logo} alt="Logo" className="h-6 w-6" />
        </div>
        <div className="col-start-3 justify-self-end row-start-1 flex items-center gap-2">
          <PiSunBold className="text-md text-slate-400" />
          <Toggle variant="normal" handleCheck={UseDarkMode} />
        </div>
        <div
          className="col-start-1 row-start-1 md:hidden cursor-pointer h-6 w-6 flex items-center justify-center"
          onClick={handleCloseSidebar}
        >
          <IoCloseOutline className="h-full w-auto" />
        </div>
      </div>
      <nav className="pt-10 grow flex flex-col gap-6">
        <NavList
          title="Home"
          setAskQuestion={setAskQuestion}
          askQuestion={askQuestion}
          items={home}
        />
        <NavList
          title="Documents"
          setAskQuestion={setAskQuestion}
          askQuestion={askQuestion}
          items={documents}
        />
        <NavList
          title="Account"
          setAskQuestion={setAskQuestion}
          askQuestion={askQuestion}
          items={account}
        />
        <NavList
          title="Support"
          setAskQuestion={setAskQuestion}
          askQuestion={askQuestion}
          items={support}
        />
      </nav>
      <div className="pb-4 pt-6 border-t border-[#f8f9fb]">
        <button className="flex items-center gap-3">
          <div className="rotate-90 h-5 w-5">
            <HiArrowUpTray className="h-full w-auto" />
          </div>
          <span onClick={() => signOut()} className="text-xs font-semibold">
            Sign out
          </span>
        </button>
      </div>
    </div>
  );
}