"use client";

import PromptBar from "../../../../components/NewDocPromptBar";
import Link from "next/link";
import { CgFileDocument } from "react-icons/cg";
import { TbListSearch, TbPencilPlus } from "react-icons/tb";
import Header from "../../../../components/NewDocHeader";
import "../../../../styles/globals.css";
import { useEffect, useRef, useState } from "react";
import DropDown, { VibeType } from "../../../../components/DropDown";
import { useSession } from "next-auth/react";
import { rank } from "../../../../utils/linkedin-algorithm";
import toast, { Toaster } from "react-hot-toast";
import Popup from "../../../../components/Popup";
// import LoadingDots from "../../../../components/LoadingDots";
import CustomButton from "../../../../components/CustomButton";
import { RankResponse } from "../../../../";
import { handlePrompt } from "../../../../utils/helperFunctions";
import { UserAuth } from "../../../authContext";
import { db } from "../../../../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [optimizedPost, setOptimizedPost] = useState<string>("");
  const [ranking, setRanking] = useState<RankResponse>({
    score: 0,
    validations: [],
  });
  const [post, setPost] = useState<string>("");
  const [media, setMedia] = useState<boolean>(false);
  const [vibe, setVibe] = useState<VibeType>("Story");
  const [tone, setTone] = useState<string>("Professional")
  const [showPopup, setShowPopup] = useState(false);
  const [isCustomPrompt, setIsCustomPrompt] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");
  const [tab, setTab] = useState("vibe"); // Default to "vibe" tab
  const { data: session, status } = useSession();
  const clickCount = useRef(0);
  const { id } = UserAuth();

  const createDocument = async () => {
    const uid = uuidv4();
    await setDoc(doc(db, "users", id, "documents", uid), {
      title: "Untitled document",
      status: "Draft",
      folder: "",
      responses: [post, optimizedPost],
      createdAt: serverTimestamp(),
      lastModified: new Date(),
      id: uid,
    });
  }

  const handleButtonClick = () => {
    clickCount.current += 1; // Increment clickCount on each click
    if (status !== "authenticated" && clickCount.current >= 3) {
      setTimeout(() => {
        setShowPopup(true);
      }, 3000);
    }
  };

  useEffect(() => {
    const rankResponse = rank(post, media);
    setRanking(rankResponse);
  }, [post, media]);


  // function to send post to OpenAI and get response
  const optimizePost = async (e: any) => {
    e.preventDefault();
    setOptimizedPost("");
    setLoading(true);
    const prompt = handlePrompt(vibe, tone, post);
    setCustomPrompt(prompt)

    // Show the popup right before the API call
    handleButtonClick();

    const response = await fetch("/api/optimize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      const formattedChunk = chunkValue.replace(/\n/g, "<br>");
      setOptimizedPost((prev) => prev + formattedChunk);
    }
    setLoading(false);
  };

  if (optimizedPost && !loading) {
    createDocument()
  }
  const suggestions = [
    {
      icon: <TbListSearch className="h-full w-auto" />,
      title: "Real-Time Search",
      prompt1: "Summarize the latest news on generative AI",
      prompt2: "Write a personalized email to [insert Linkedin profile URL]",
    },
    {
      icon: <TbPencilPlus className="h-full w-auto" />,
      title: "Long Form Content",
      prompt1: "Create a blog post about search engine optimization",
      prompt2: "Write a press release about www.copy.ai",
    },
    {
      icon: <CgFileDocument className="h-full w-auto" />,
      title: "Brainstorm Ideas",
      prompt1: "Generate 10 Instagram captions for fashion week",
      prompt2:
        "Write a product description for a bicycle in the style of Hemingway",
    },
  ];
  return (
    <>
      <Header docId={""} />
      <main className="grow flex flex-col items-center mx-auto">
        <div className="grow py-2 px-8 md:py-6 md:px-16 flex flex-col justify-around">
          {!optimizedPost ? (
            <>
              <div className="flex flex-col text-center gap-2 md:gap-3">
                <h1 className="text-3xl font-bold">
                  <span className="text-c-dark-green">Welcome to </span>
                  <span className="text-c-light-green">Chat by Copy.ai</span>
                </h1>
                <p className="text-c-dark-green text-sm font-medium">
                  Get started by writing a task and Chat can do the rest. Not
                  sure where to start? Check out the Prompt Library for
                  inspiration.
                </p>
              </div>
              <ul className="grow flex flex-col justify-around md:gap-4 md:justify-between md:py-12">
                {suggestions.map((sug, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className="rounded-full h-8 w-8 flex items-center justify-center bg-slate-100 text-slate-400 p-1">
                      {sug.icon}
                    </div>
                    <div className="text-c-green font-medium">
                      <div className="text-sm mb-1 font-semibold">
                        {sug.title}
                      </div>
                      <p className="text-xs">"{sug.prompt1}"</p>
                      <p className="text-xs">"{sug.prompt2}"</p>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <div className="flex flex-colw w-full ">
                <div className="flex">
                  <Toaster
                    position="top-right"
                    reverseOrder={false}
                    toastOptions={{ duration: 2000 }}
                  />
                  {optimizedPost && (
                    <div className="">
                      <div className="flex justify-between items-center pb-2 border-b border-gray-300">
                        <h2 className="text-xl font-bold">
                          Your Generated Post
                        </h2>
                      </div>
                      <div className="max-w-2xl my-4 mx-auto">
                        <div
                          className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                          onClick={() => {
                            navigator.clipboard.write([
                              new ClipboardItem({
                                "text/html": new Blob([optimizedPost], {
                                  type: "text/html",
                                }),
                              }),
                            ]);
                            toast("Post copied to clipboard", {
                              icon: "📋",
                            });
                          }}
                          key={optimizedPost}
                        >
                          <p
                            className="text-black-700 text-left"
                            dangerouslySetInnerHTML={{
                              __html: optimizedPost,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
        <PromptBar
          handleButtonClick={handleButtonClick}
          optimizePost={optimizePost}
          setPost={setPost}
        />
        <div className="text-xs flex items-center gap-1 py-2">
          <div className="text-slate-300">Have you tried Brand Voice?</div>
          <Link href="#" className="text-c-green underline">
            Give us feedback
          </Link>
        </div>
      </main>
    </>
  );
}