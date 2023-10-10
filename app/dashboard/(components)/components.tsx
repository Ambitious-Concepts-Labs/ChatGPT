// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { db } from "../../../firebase";
import { delay } from "../../../utils/helperFunctions";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/20/solid";
import { Fragment, type Dispatch, type SetStateAction } from "react";
import { CgFileDocument } from "react-icons/cg";
import { FaLocationArrow } from "react-icons/fa6";
import { LuStars } from "react-icons/lu";
import { AiTwotoneAudio } from "react-icons/ai";
import { RiVoiceprintLine } from "react-icons/ri";
import { BiSearch } from 'react-icons/bi'
import { BsInfoCircle } from 'react-icons/bs'
import { IoClose } from 'react-icons/io5';
import {
  GrammarlyButton,
  GrammarlyEditorPlugin,
} from "@grammarly/editor-sdk-react";
import { formatPrompt, HTMLBreak, setFocus } from "../../../constants/parse";
import { categories, prompts } from '../../../constants/data'
import { AiTwotoneSetting } from "react-icons/ai";
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
import { signOut } from "firebase/auth";
import NavList from "../../../components/NavList";
import Toggle from "../../../components/Toggle";
import logo from "../../../assets/logo.svg";
// import { LiaFileInvoiceSolid } from "react-icons/lia";
// import { AiTwotoneSetting } from "react-icons/ai";
import UseDarkMode from "../../../utils/use-dark-mode";
import { auth } from "../../../firebase";
import { type DocumentData } from "firebase/firestore";
import { AiOutlineStar } from "react-icons/ai";
import { GiArtificialHive } from "react-icons/gi";

interface Props {
  document: DocumentData;
}

export function Document(props: any) {
  const { document, session } = props
  let lastModified = document?.lastModified?.seconds;
  lastModified = new Date(lastModified * 1000).toDateString();
  return (
    <React.Fragment key={`doc-${document?.id}`}>
        <Link href={`dashboard/document/${document?.id}`}>
          <div className="col-span-2 flex items-center">
            <span className="flex items-center text-2xl pr-2">
              <AiOutlineStar />
            </span>
            {document?.title}
          </div>
        </Link>
        <div className="col-start-4">
          {
            session?.photoURL ? 
              <Image
                width={30}
                height={30}
                src={session?.photoURL}
                alt={`${document?.title}'s doc`}
                className="object-contain rounded-full"
              />
            :
              <div className="rounded-full h-8 w-8 flex items-center justify-center bg-slate-100 text-slate-400 p-1">
                <GiArtificialHive />
              </div>
          }
        </div>
        <div className="col-start-5">
          <div className="flex items-start mb-1">
            <span
              className={
                `w-4 h-4 mt-1 mr-2 rounded-full ${ 
                document?.status == "Draft" ? "animate-pulse" : ""}`
              }
              style={
                document?.status == "Published"
                  ? { backgroundColor: "green" }
                  : { backgroundColor: "gray" }
              }
             />
            &nbsp;
            {document?.status}
          </div>
        </div>
        <div className="col-start-6">{lastModified || ""}</div>
      </React.Fragment>
  );
}

export function Sidebar(props: any) {
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
    {
      title: 'Settings',
      icon: <AiTwotoneSetting />,
      src: "/dashboard/settings",
    }
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
          onClick={() => handleCloseSidebar}
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
          <span onClick={async () => { await signOut(auth); }} className="text-xs font-semibold">
            Sign out
          </span>
        </button>
      </div>
    </div>
  );
}

export function Modal (props: any) {
  const { handleCloseModal, addPrompt } = props
  const [actual, setActual] = useState({
    categoryId: null,
    promptId: null,
    promptValue: ''
  })

  const chooseCategory = (id: any) => {
    setActual({
      categoryId: id,
      promptId: null,
      promptValue: ''

    })
  }

  const choosePrompt = (id: any, value: any) => {
    setActual(prev => ({
      ...prev,
      promptId: id,
      promptValue: value
    }))
  }

  const handlePrompt = () => {
    const pr = prompts.find((prompt: { id: any }) => prompt.id === actual.promptId)
    addPrompt(pr!.value)
    handleCloseModal()
  }

  return (
    <div className='fixed w-screen h-screen inset-0 flex items-center justify-center bg-black/20 z-20 md:justify-start'>
      <div className='w-11/12 h-[95%] bg-white px-4 flex flex-col overflow-hidden md:px-8 md:w-4/5 md:h-3/4'>
        <div className='flex items-center justify-between py-4 md:py-6'>
          <div className='flex items-center justify-between md:w-1/2'>
            <div className='font-semibold text-xl'>Prompts</div>
            <div className='border p-1 hidden md:flex items-center gap-2 md:py-1.5 md:ps-2 md:pe-4'>
              <span>
                <BiSearch />
              </span>
              <input type='text' placeholder='Try "Sales" or "Email"' className='px-2 outline-none rounded-md text-sm' />
            </div>
          </div>
          <button onClick={handleCloseModal} className='h-6 w-6 flex items-center justify-center'>
            <IoClose className='h-full w-auto' />
          </button>
        </div>
        <div className='flex flex-col gap-2 grow overflow-auto md:flex-row md:border-t'>
          <div className='h-1/4 p-2 overflow-y-auto md:h-full md:w-1/4'>
            <ul className='flex flex-col gap-1 md:gap-2 overflow-hidden'>
              {
                categories.map((cat: { id: any; name: any; }) => (
                  <li
                    key={cat.id}
                    className={`font-semibold text-sm cursor-pointer p-2 rounded-md hover:bg-slate-100 md:py-3 ${actual.categoryId === cat.id ? 'bg-slate-100' : 'bg-white'} ${cat.id === 2 && 'mb-8'}`}
                    onClick={() => { chooseCategory(cat.id); }}
                  >
                    {cat.name}
                  </li>
                ))
              }
            </ul>
          </div>
          <div className='h-1/4 border-y p-2 overflow-y-auto md:border-x md:border-y-0 md:w-1/3 md:h-full'>
            <ul className='flex flex-col gap-1 md:gap-2 overflow-hidden'>
              {
                actual.categoryId !== null &&
                prompts
                  .filter((prompt: { categoryId: any; }) => prompt.categoryId === actual.categoryId)
                  .map((prompt: { id: any; value: any; title: any; }) => (
                    <li
                      key={prompt.id}
                      className={`font-semibold cursor-pointer text-sm p-2 rounded-md md:py-3 ${actual.promptId === prompt.id ? 'bg-[#93e1cf] hover:bg-[#93e1cf]' : 'hover:bg-slate-100'}`}
                      onClick={() => {
                        const formattedValue = prompt.value === null || prompt.value.length < 1 ? null : prompt.value
                        choosePrompt(prompt.id, formattedValue)
                      }}
                    >
                      {prompt.title}
                    </li>
                  ))
              }
            </ul>
          </div>
          <div className='h-1/5 px-2 py-4 grow flex flex-col gap-4 items-end md:w-1/3 md:h-full'>
            <div className='grow bg-slate-100 w-full text-slate-400 p-3 md:p-2'>
              <div className='uppercase text-xs flex items-center gap-1.5 mb-2'>
                <span>Preview (workspace prompt)</span>
                <span><BsInfoCircle /></span>
              </div>
              {
                actual.promptValue !== null &&
                  <div className='text-slate-500'>
                    {actual.promptValue.split('\n').map((par: any, i: any) => (
                      <div key={i}>
                        <p>{par}</p>
                        <br />
                      </div>
                    ))}
                  </div>
                }
            </div>
            <button
              className='px-4 py-2 bg-c-green text-white text-sm rounded-md w-max disabled:opacity-30'
              onClick={() => handlePrompt}
              disabled={actual.categoryId === null || actual.promptId === null || actual.promptValue === null}
            >
              Use Prompt
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function PromptBar(props: any) {
  const { post, loading, handleButtonClick, setPost, optimizePost } = props
  const [isClient, setIsClient] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const ref = useRef();

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const addPrompt = (prompt: any) => {
    const formattedPrompt = formatPrompt(prompt);
    const prev = ref.current.innerHTML;
    if (prev.length < 1) {
      ref.current.innerHTML = formattedPrompt;
    } else {
      ref.current.innerHTML = prev + HTMLBreak + formattedPrompt;
    }

    setFocus(ref.current);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleText = (e) => {
    console.log(e.target.value)
    setPost(e.target.value)
    setIsDisabled(false)
  }

  return (
    <>
      <div className="border rounded-xl w-full grow">
        <div className="flex items-end gap-4 py-2 px-4 ">
          <GrammarlyEditorPlugin
            clientId={process.env.NEXT_PUBLIC_GRAMMARLY_CLIENT_ID}
            maxLength={2000}
            // onChange={(e) => console.log(e.target.value)}
            placeholder="Type or copy your post or idea here "
            className="grow max-h-20"
            config={{ activation: "immediate", underlines: "on" }}
          >
            {/* To avoid hydration errors, render the editable component after hydration ends */}
            {isClient ? (
              <input
                maxLength={2000}
                onChange={(e) => { handleText(e); }}
                 onFocus={(e) => { e.target.value.length < 1 ? setIsDisabled(true) : setIsDisabled(false); }}
                  onKeyUp={(e) => { e.target.value.length < 1 ? setIsDisabled(true) : setIsDisabled(false); }}
                className='bg-inherit h-fit w-full p-2 outline-none max-h-20 overflow-y-auto'
                placeholder="Type or copy your post or idea here "
              />
              //  <div
              //       onFocus={(e) => e.target.innerText.length < 1 ? setIsDisabled(true) : setIsDisabled(false)}
              //       onKeyUp={(e) => e.target.innerText.length < 1 ? setIsDisabled(true) : setIsDisabled(false)}
              //       ref={ref}
              //       onChange={(e) => console.log(e.target.value)}
              //       // onChange={(e) => handleText(e)}
              //       contentEditable
              //       className='h-fit w-full p-2 outline-none max-h-20 overflow-y-auto'
              //     />
            ) : (
              <input
                maxLength={2000}
                onChange={(e) => { handleText(e); }}
                className='bg-inherit h-10 w-full p-2 outline-none overflow-y-auto'	
                placeholder="Type or copy your post or idea here "
              />
              // <div className='h-10 w-full p-2 outline-none overflow-y-auto' />
            )}
          </GrammarlyEditorPlugin>
          <GrammarlyButton />
        </div>
        <div className="flex items-center justify-between bg-slate-100 p-2">
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-1 hover:bg-slate-200 py-1 px-2 rounded-md"
              onClick={() => handleOpenModal}
            >
              <span className="text-slate-400">
                <CgFileDocument />
              </span>
              <span className="text-xs font-bold">Browse Prompts</span>
            </button>
            <button className="flex items-center gap-1 hover:bg-slate-200 py-1 px-2 rounded-md">
              <span className="text-slate-400">
                <RiVoiceprintLine />
              </span>
              <span className="text-xs font-bold">No Brand Voice</span>
            </button>
             <button className="flex items-center gap-1 hover:bg-slate-200 py-1 px-2 rounded-md">
              <span className="text-slate-400">
                <AiTwotoneAudio />
              </span>
              <span className="text-xs font-bold">Add Tone</span>
            </button>
          </div>
          <div className="flex items-center gap-2">
            {/* <button
              disabled={isDisabled}
              className="flex items-center gap-1 hover:bg-slate-200 py-1 px-2 rounded-md disabled:text-slate-400 disabled:hover:bg-transparent"
            >
              <span className="text-slate-400">
                <LuStars />
              </span>
              <span className="text-xs font-bold">Improve</span>
            </button> */}
            <button
              disabled={isDisabled}
              onClick={(e) => {
                optimizePost(e);
                handleButtonClick();
              }}
              className="h-6 w-6 ps-1 pe-2 bg-c-green rounded-full flex items-center justify-center text-white disabled:bg-slate-300"
            >
              {/* {loading && <LoadingDots color="white" style="large" />} */}
              {!loading && (
                <FaLocationArrow className="rotate-45 h-full w-auto" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <Modal addPrompt={addPrompt} handleCloseModal={handleCloseModal} />
      )}
    </>
  );
}

interface CustomButtonProps {
  currentTab: string | number;
}

export function Documents(props: any) {
  const { id, session, documents, setShowModal } = props
  const router = useRouter();

  const handleOnClick = async () => {
    setShowModal(!true);
    const uid = uuidv4();
    await setDoc(doc(db, "users", id, "documents", uid), {
      title: "Untitled document",
      status: "Draft",
      folder: "",
      response: "Sample Response",
      createdAt: serverTimestamp(),
      lastModified: new Date(),
      id: uid,
    });
    router.push(`dashboard/document/${uid}`);
  };

  return (
    <>
      {!documents || documents.length === 0 ? (
        <Image
            width={600}
            height={600}
            src="/folder.jpg"
            alt="folders"
            className="object-contain py-5 text-gray-400"
          />
      ) : (
        <section>
          <div className="flex justify-between flex-wrap items-center mt-12">
            <div>
              <h2 className="font-bold text-slate-800 "> Recent Documents </h2>
            </div>
          </div>
          <div className="grid grid-cols-6 grid-flow-row gap-4 my-4 bg-white dark:bg-night-blue p-5 h-full">
            <div className="col-span-2 uppercase font-medium text-xs text-slate-600 dark:text-slate-400">
              Title
            </div>
            <div className="col-start-4 uppercase font-medium text-xs text-slate-600 dark:text-slate-400">
              Author
            </div>
            <div className="col-start-5 uppercase font-medium text-xs text-slate-600 dark:text-slate-400">
              Status
            </div>
            <div className="col-start-6 uppercase font-medium text-xs text-slate-600 dark:text-slate-400">
              Modified
            </div>
            {documents.map((document: { id: any; data: () => any; }) => (
              <Document
                key={document?.id}
                session={session}
                document={document}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}


export function CustomButton({ currentTab }: CustomButtonProps) {
  const buttons = [
    {
      link: "/linkedin",
      text: "Styles💃",
      tooltip: "Generate posts using styles from top LinkedIn creators.",
      tabName: "vibe",
    },
    {
      link: "/linkedin/custom",
      text: "Custom 🏗️",
      tooltip: "Use your custom prompt to generate post",
      tabName: "custom",
    },
    {
      link: "/linkedin/template",
      text: "Template 📋",
      tooltip: "Generate post based on example",
      tabName: "template",
    },
    {
      link: "/linkedin/enhancer",
      text: "Enhancer 💫",
      tooltip: "Enchance your post, make it shorter, longer, correct gramamr",
      tabName: "enhancer",
    },
    {
      link: "/linkedin/ideas",
      text: "Ideas💡",
      tooltip: "Generate ideas for your post",
      tabName: "ideas",
    },
  ];

  return (
    <>
      {buttons.map((button, index) => (
        <Link href={button.link} key={index}>
          <div className="relative group">
            <button
              className={`px-3 py-2 rounded-md text-xs font-medium ${
                currentTab === button.tabName
                  ? "bg-gray-300 text-black"
                  : "border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50"
              }`}
            >
              {button.text}
            </button>
            <span
              className="tooltip-text text-sm bg-gray-100 text-gray-700 p-1 rounded-md absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition duration-300"
              style={{ width: "150px" }}
            >
              {button.tooltip}
            </span>
          </div>
        </Link>
      ))}
    </>
  );
}


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export type VibeType =
  | "Story"
  | "Crisp"
  | "List"
  | "Unpopular opinion"
  | "Case Study";

interface DropDownProps {
  vibe: VibeType;
  setVibe: Dispatch<SetStateAction<VibeType>>;
}

const vibes: VibeType[] = [
  "Story",
  "Crisp",
  "List",
  "Unpopular opinion",
  "Case Study",
];

export function DropDown({ vibe, setVibe }: DropDownProps) {
  return (
    <Menu as="div" className="relative block text-left w-full">
      <div>
        <Menu.Button className="inline-flex w-full justify-between items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue">
          {vibe}
          <ChevronUpIcon
            className="-mr-1 ml-2 h-5 w-5 ui-open:hidden"
            aria-hidden="true"
          />
          <ChevronDownIcon
            className="-mr-1 ml-2 h-5 w-5 hidden ui-open:block"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute left-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          key={vibe}
        >
          <div className="">
            {vibes.map((vibeItem) => (
              <Menu.Item key={vibeItem}>
                {({ active }) => (
                  <button
                    onClick={() => { setVibe(vibeItem); }}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      vibe === vibeItem ? "bg-gray-200" : "",
                      "px-4 py-2 text-sm w-full text-left flex items-center space-x-2 justify-between",
                    )}
                  >
                    <span>{vibeItem}</span>
                    {vibe === vibeItem ? (
                      <CheckIcon className="w-4 h-4 text-bold" />
                    ) : null}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export function Header(props: any) {
  const { docId } = props
  return (
    <header className="flex items-center justify-between px-8 py-2 md:py-4 border-b">
      <div className="font-bold text-sm md:text-xl">2023-07-19 Untitled</div>
      <button className="px-4 py-2 rounded-md bg-c-light-green text-white text-xs font-bold">
        New Project
      </button>
    </header>
  );
}

