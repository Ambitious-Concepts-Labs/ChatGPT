"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import PromptBar from "../../../../components/NewDocPromptBar";
import { VibeType } from "../../../../components/DropDown";
import { db } from "../../../../firebase";
import { rank } from "../../../../utils/linkedin-algorithm";
import logo from "../../../../assets/logo.svg";
import Toogle from "../../../../components/Toggle";

import { arrayUnion, doc, DocumentData, getDoc, updateDoc } from "firebase/firestore";
import Logo from "../../../../components/Logo";
// import LoadingDots from "../../../../components/LoadingDots";
import Popup from "../../../../components/Popup";
import { handlePrompt } from "../../../../utils/helperFunctions";
import Image from "next/image";
import { RankResponse } from "../../../..";
import { UserAuth } from "../../../authContext";

type Props = {
  params: {
    id: string;
  };
};

const DocumentPage = ({}: Props) => {
  const clickCount = useRef(0);
  const pathname = usePathname();
  const {session, status, id } = UserAuth();
  const [currDoc, setCurrDoc] = useState<DocumentData>({title: '', status: '', response: ''});
  const [loading, setLoading] = useState(false);
  const [doneFetching, setDoneFetching] = useState(false);
  const [optimizedPost, setOptimizedPost] = useState<string>("");
  const [ranking, setRanking] = useState<RankResponse>({
    score: 0,
    validations: [],
  });
  const [post, setPost] = useState<string>("");
  const [media, setMedia] = useState<boolean>(false);
  const [vibe, setVibe] = useState<VibeType>("Story");
  const [tone, setTone] = useState<string>("Professional");
  const [showPopup, setShowPopup] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    fetchUserDocs();
  }, []);

  useEffect(() => {
    // const rankResponse = rank(post, media);
    // setRanking(rankResponse);
  }, [post, media]);

  async function fetchUserDocs() {
    if (pathname) {
        const queryId = pathname.substring(pathname.lastIndexOf("/") + 1);
        const uid = id
        const docRef = await getDoc(
          doc(db, "users", uid, "documents", queryId.toString()),
        );
        const docData = docRef.data();
        if (docData) {
            console.log(docData, "kool");
            setCurrDoc(docData);
        }
    }
        
  }
  
  const updateDocument = async () => {
    const queryId = pathname?.substring(pathname?.lastIndexOf("/") + 1);
    const uid = id
    const docRef =  doc(db, "users", uid, "documents", queryId!.toString());
    if (optimizedPost) {
      await updateDoc(docRef, {
        responses: arrayUnion({post, optimizedPost})
      });
    }
  }

  const handleButtonClick = () => {
    clickCount.current += 1; // Increment clickCount on each click
    if (status !== "authenticated" && clickCount.current >= 3) {
      setTimeout(() => {
        setShowPopup(true);
      }, 3000);
    }
  };

  // function to send post to OpenAI and get response
  const optimizePost = async (e: any) => {
    e.preventDefault();
    setOptimizedPost("");
    setLoading(true);
    const prompt = handlePrompt(vibe, tone, post);

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
    setDoneFetching(true)

  };


  if (optimizedPost && doneFetching) {
    updateDocument()
  }

  return (
    <>
      {!isClient ? (
        "This is never prerendered"
      ) : (
        <div className="flex w-full h-full">
          <div className="grow w-full">
            <ul className="flex flex-row gap-2 md:gap-3">
              <li>
                <Logo />
              </li>
              <li>File</li>
              <li>Help</li>
              <li>Tools</li>
            </ul>
            <nav className="bg-grey-light p-3 rounded font-sans w-full m-4">
                <ol className="list-reset flex text-grey-dark">
                    <li><a href="/dashboard/documents" className="text-blue font-bold">Documents</a></li>
                    <li><span className="mx-2">/</span></li>
                    <li>Document: {currDoc.title}</li>
                </ol>
            </nav>
            <main className="flex flex-col h-full items-center mx-auto">
              <div className="grow py-2 px-8 md:py-6 md:px-16 flex flex-col justify-around">
                {/* {!optimizedPost ? ( */}
                {optimizedPost ? (
                  <>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-300">
                      <h2 className="text-xl font-bold">Your Generated Post</h2>
                    </div>
                    <ul className="grow flex flex-col justify-around md:gap-4 md:justify-between md:py-12">
                      <div className="max-w-2xl my-4 mx-auto">
                        {post}
                        <br />
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
                    </ul>
                  </>
                ) : (
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <p>{currDoc?.title}</p>
                      <p>{currDoc?.status}</p>
                    </div>
                    <p>{currDoc?.response}</p>
                    {
                      currDoc.responses ?
                        <div>
                          {currDoc.responses.map((res: { question: any; answer: any; }) => {
                            <div key={`${res.question}`}>
                              <p>{res.question}</p>
                              <p>{res.answer}</p>
                            </div>
                          })}
                        </div>
                      :
                        <>
                        </>
                    }
                    <p>Pervious Question & Response</p>
                    <div>
                      <PromptBar
                        loading={loading}
                        handleButtonClick={handleButtonClick}
                        optimizePost={optimizePost}
                        setPost={setPost}
                        post={post}
                      />
                      <Popup show={showPopup} setShowPopup={setShowPopup} />
                      <div className="text-xs flex items-center gap-1 py-2">
                        <div className="text-slate-300">
                          Have you tried Brand Voice?
                        </div>
                        <Link href="#" className="text-c-green underline">
                          Give us feedback
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </main>
          </div>
          <div className="flex flex-col justify-between h-full border">
            <div className="border">
              <div className="flex justify-between px-3 py-3 w-full border-b">
                <h2>Settings</h2>
                <Image src={logo} alt="Logo" className="h-6 w-6" />
              </div>
              <div className="flex justify-between px-3 py-3 w-full border-b">
                <div>
                  <h2>Language</h2>
                  <Image src={logo} alt="Logo" className="h-6 w-6" />
                </div>
                <p>See supported</p>
              </div>
              <div className="flex justify-between px-3 py-3 w-full border-b">
                <div>
                  <h2>Spelling</h2>
                  <p>
                    <span>
                      <Image src={logo} alt="Logo" className="h-6 w-6" />
                    </span>
                    Grammerly
                  </p>
                </div>
                <Toogle variant={"blue"} handleCheck={() => {}} />
              </div>
              <div className="flex justify-between px-3 py-3 w-full border-b">
                <div>
                  <h2>Tone</h2>
                  <p>
                    <span>
                      <Image src={logo} alt="Logo" className="h-6 w-6" />
                    </span>
                    Confident
                  </p>
                </div>
                <p>&gt;</p>
              </div>
              <div className="flex justify-between px-3 py-3 w-full border-b">
                <div>
                  <h2>Creativity</h2>
                  <p>
                    <span>
                      <Image src={logo} alt="Logo" className="h-6 w-6" />
                    </span>
                    High
                  </p>
                </div>
                <p>&gt;</p>
              </div>
              <div className="flex justify-between px-3 py-3 w-full ">
                <div>
                  <h2>Length</h2>
                  <p>
                    <span>
                      <Image src={logo} alt="Logo" className="h-6 w-6" />
                    </span>
                    Medium
                  </p>
                </div>
                <p>&gt;</p>
              </div>
            </div>
            <div className="">
              <div className="flex space-x-1 items-center justify-center">
                <p>undo</p>
                <p>redo</p>
                <p>validate completion</p>
                <button>Completion</button>
              </div>
              <div className="flex border">
                <p>Token Usage</p>
                <div>progress</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DocumentPage;