"use client";
import { useEffect, useRef, useState } from "react";
import { arrayUnion, doc, type DocumentData, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { handlePrompt } from "../../../../utils/helperFunctions";
import { type RankResponse } from "../../../..";
import { UserAuth } from "../../../authContext";
import Link from 'next/link'
// @ts-ignore
import { usePathname } from 'next/navigation';
import {HiOutlineRefresh} from "react-icons/hi"  //HiOutlineBarsArrowDown
import {MdRefresh} from "react-icons/md"
import {HiOutlineBarsArrowDown} from "react-icons/hi2" 
import {BiSolidCircleHalf,BiLogoVk} from "react-icons/bi"
import {RiArrowRightSFill} from "react-icons/ri"
import {GiPlainCircle} from "react-icons/gi"
import {PiShirtFoldedThin,PiBrainThin} from "react-icons/pi"
import toast from "react-hot-toast";
import { PromptBar, type VibeType } from "../../(components)/components";
import Popup from "../../../../components/Popup";

export const NewDocument = () => {
  const [originalTokendata, setoriginalTokenData] = useState<any>({});
  const [showModal, setshowModal] = useState(false);
  const [defaultToken, setdefaultToken] = useState(0);
  const [totalTokens] = useState(9000);
  const [originalToken, setoriginalToken] = useState(0);
  const { myState, updateMyState } = UserAuth(); 
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [currentMonthName, setcurrentMonthName] = useState<any>(
    monthNames[currentMonth - 1]
  );
   const[currentMonthToken,setcurrentMonthToken]=useState(myState || 0)
    
   useEffect(()=>{
      
     setcurrentMonthToken(myState)
   },[myState])

  const SplitString = (value: string) => {
    let resultArray = value.split(/[\s|/,;:]+/);
    let filteredArray = resultArray.filter((item: string) => item !== "");

    let count = originalToken + filteredArray.length || 0;
    setdefaultToken(count);
    originalTokendata[currentMonthName] = count;
    localStorage.setItem("TokenInfo", JSON.stringify(originalTokendata));
    updateMyState(count)
    setshowModal(count <= totalTokens ? false : true);
  };
  console.log({originalToken}, {originalTokendata}, {currentMonth})
  
  return (
    <>
        <div className="grow">
          <Header />
          <Compose defaultToken={defaultToken} showModal={showModal}
          originalToken={originalToken} totalTokens={totalTokens}
          SplitString={SplitString} setcurrentMonthName={setcurrentMonthName} 
          setshowModal={setshowModal} updateMyState={updateMyState}
          setoriginalToken={setoriginalToken} setdefaultToken={setdefaultToken}
          setoriginalTokenData={setoriginalTokenData} currentMonthName={currentMonthName} 
          monthNames={monthNames} currentMonth={currentMonth}
          />
        </div>
        <div>
          <Sidebar currentMonthToken={currentMonthToken} defaultToken={defaultToken} />
        </div>
    </>
  )
}

export const Sidebar = (props: any) => {
  const { currentMonthToken, defaultToken } = props
   const totalToken = 9000

  return (
    <div className='h-full border border-l-[2px] border-[#F5F5F5] relative'>
        <div className='flex items-center px-2 pl-[20px] py-4 border border-b-[2px] !border-l-[0px] border-[#F5F5F5] justify-between'>
            <p className='text-[15px] text-gray-400'>Settings</p>
            <BiLogoVk  size={'2em'}/>
        </div>
        <div className='flex px-2 pl-[20px] py-4 border border-b-[2px] border-t-[0px] !border-l-[0px] border-[#F5F5F5] justify-between'>
           <div className='flex flex-col w-full'>
           <p className='text-[15px] text-gray-400'>Language</p>
            <div className='flex items-center mt-[10px] justify-between w-full'>
            <div className='flex items-center gap-2'>
               <div className='w-[30px] flex justify-center items-center h-[30px] bg-green-300 rounded-[50px]'>
                  <PiBrainThin color='white'/>
               </div>
            <p className='text-[13px] text-gray-400'>Auto Detect</p>
            </div>
            <p className='text-[13px] text-gray-400'>See Supported</p>
            </div>
           </div>
        </div>
        <div className='flex px-2 pl-[20px] py-4 border border-b-[2px] border-t-[0px] !border-l-[0px] border-[#F5F5F5] justify-between'>
           <div className='flex flex-col w-full'>
           <p className='text-[15px] text-gray-400'>Tone</p>
            <div className='flex mt-[0px] justify-between w-full'>
            <div className='flex  justify-between items-center mt-[10px]  w-full'>
           <div className='flex items-center w-full gap-2'>
           <PiShirtFoldedThin color="#DEDEDE"/>
            <p className='text-[13px] text-gray-400'>Formal</p>
           </div>
           <RiArrowRightSFill color='gray'/>
            </div>
           
            </div>
           </div>
        </div>
        <div className='flex px-2 pl-[20px] py-4 border border-b-[2px] border-t-[0px] !border-l-[0px] border-[#F5F5F5] justify-between'>
           <div className='flex flex-col w-full'>
           <p className='text-[15px] text-gray-400'>Creativity</p>
            <div className='flex  justify-between items-center mt-[10px]  w-full'>
           <div className='flex items-center w-full gap-2'>
           <div className='w-[30px] h-[30px] rotate-180 rounded-[50px] flex justify-center items-center bg-orange-50'>
           <GiPlainCircle color='orange'/>
               </div>
            <p className='text-[13px] text-gray-400'>Normal</p>
           </div>
           <RiArrowRightSFill color='gray'/>
            </div>
           </div>
        </div>
        <div className='flex px-2 pl-[20px] py-4 border border-b-[2px] border-t-[0px] !border-l-[0px] border-[#F5F5F5] justify-between'>
           <div className='flex flex-col w-full'>
           <p className='text-[15px] text-gray-400'>Length</p>
            <div className='flex items-center justify-between'>
            <div className='flex items-center mt-[10px] gap-2 w-full'>
               <div className='w-[30px] h-[30px] rotate-180 rounded-[50px] flex justify-center items-center bg-orange-50'>
               <BiSolidCircleHalf color='orange'/>
               </div>
            <p className='text-[13px] text-gray-400'>Medium</p>
           
            </div>
            <RiArrowRightSFill color='gray'/>
            </div>
           </div>
        </div>
        <div className='absolute bottom-0 w-full'>
        <div className='flex   w-full px-2 pl-[20px] py-4 border border-b-[2px] border-t-[0px] !border-l-[0px] border-[#F5F5F5] justify-between'>
           <div className='flex items-center w-full gap-2'>
            <div className='bg-gray-200 w-[35px] flex justify-center items-center h-[35px] rounded-[2px]'>
               <MdRefresh/>
            </div>
            <div className='bg-gray-200 w-[35px] flex justify-center items-center h-[35px] rounded-[2px]'>
               <HiOutlineRefresh/>
            </div>
            <div className='bg-gray-200 w-[35px] h-[35px] flex justify-center items-center rounded-[2px]'>
           <HiOutlineBarsArrowDown/>
            </div>
           <button className="text-white bg-black text-[13px] px-[15px] rounded-[5px] py-[8px]">Completion</button>
           </div>
        </div>
        <div className='flex px-2 pl-[20px] py-4 border border-b-[2px] border-t-[0px] !border-l-[0px] border-[#F5F5F5] justify-between'>
           <div className='flex flex-col w-full'>
              <p className='text-[13px] text-gray-400'>Token Usage</p>
              <div className='flex items-center mt-[10px] justify-between w-full'>
              <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-200">
                <div className="h-2 bg-gray-400 rounded-full" style={{width:`${((currentMonthToken/totalToken)*100).toFixed(2)}%`}}></div>
              </div>
              <p className='text-gray-400 text-[10px] ml-[20px]'> {((currentMonthToken/totalToken)*100).toFixed(2)}%</p>           
            </div>
           </div>
        </div>
        </div>
    </div>
  )
}

export const Header = () => {
  const pathname = usePathname();
  return (
    <div className='h-[70px]  flex justify-start items-center '>
        <div className='items-center ml-[30px] flex gap-8 '>
          <div className="w-[40px] h-[40px] bg-[black] !font-['Young Serif'] rounded-[50px] flex justify-center items-center text-[16px] text-[white]">W</div>
          <Link className={` ${pathname=="/file" ? 'font-bold':'text-gray-400'}`} href="/">File</Link>
          <Link className={` ${pathname=="/help" ? 'font-bold':'text-gray-400'}`} href="/">Help</Link>
          <Link className={` ${pathname=="/tools" ? 'font-bold':'text-gray-400'}`} href="/">tools</Link>
          <Link className={` ${pathname=="/tokenchart" ? 'font-bold':'text-gray-400'}`} href="/tokenchart">Usage</Link>
          <Link className={` ${pathname=="/" ? 'font-bold':'text-gray-500'}`} href="/">Editor</Link>
        </div>
    </div>
  )
}

export const Model = (props: any) => {
  const { showModal, CloseModal } = props;
  
  return (
    <>
      {showModal && (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10 transition-all">
          <div className="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
            <div className="w-full">
              <div className="m-8 my-20 max-w-[400px] mx-auto">
                <div className="mb-8">
                  <p className="text-gray-600">Do not have enough token</p>
                </div>
                <div className="space-y-4">
                  <button
                    className="p-3 bg-white border rounded-full w-full font-semibold"
                    onClick={CloseModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export function Compose(props: any) {
  const { defaultToken, showModal, originalToken, totalTokens, SplitString,
   setcurrentMonthName, setshowModal, updateMyState, setoriginalToken, 
   setdefaultToken, setoriginalTokenData, currentMonthName, monthNames, currentMonth } = props
  
  const [currDoc, setCurrDoc] = useState<DocumentData>({title: '', status: '', responses: []});
  const [userName, setUserName] = useState("");
  const clickCount = useRef(0);
  const pathname = usePathname();
  const { status, id } = UserAuth();
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
    let username = localStorage.getItem("UserName");
    let originalTokeninfo: any = localStorage.getItem("TokenInfo");
    if (username) {
      setUserName(username);
    }

    if (originalTokeninfo == null || originalTokeninfo == undefined) {
      let originalTokeninformation = {
        January: 0,
        Feburary: 0,
        March: 0,
        April: 0,
        May: 0,
        June: 0,
        July: 0,
        August: 0,
        September: 0,
        October: 0,
        November: 0,
        December: 0,
      };
      setdefaultToken(0);
      updateMyState(0)
      setoriginalTokenData(originalTokeninformation);
      localStorage.setItem(
        "TokenInfo",
        JSON.stringify(originalTokeninformation)
      );
    } else {
      originalTokeninfo = JSON.parse(originalTokeninfo);
      if (originalTokeninfo) {
        setoriginalToken(originalTokeninfo[currentMonthName]);
        setdefaultToken(originalTokeninfo[currentMonthName]);
        setoriginalTokenData(originalTokeninfo);
        
        updateMyState(originalTokeninfo[currentMonthName])
        setshowModal(
          originalTokeninfo[currentMonthName] <= totalTokens ? false : true
        );
      }
    }
    setcurrentMonthName(monthNames[currentMonth - 1]);
  }, []);

  const CloseModal = () => {
    setshowModal(false);
  };
  
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
        responses: arrayUnion({question: post, answer: optimizedPost, createdAt: new Date()})
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
    <div className="w-full max-w-[1000px] mx-auto mt-[50px]">
      <Model CloseModal={CloseModal} showModal={showModal} />
      <div className="flex justify-center flex-row">
        {currDoc.title} 
         &nbsp; &nbsp;
        <div className={`w-4 h-4 mt-1 mr-2 rounded-full 
            ${currDoc?.status == "Draft" ? "animate-pulse" : ""}`}
            style={currDoc?.status == "Published"
                ? { backgroundColor: "green" }
                : { backgroundColor: "gray" }
              }
          />
        {currDoc?.status}
        &nbsp; &nbsp;
        <div>Tokens Used: <span style={defaultToken > 8000
                ? { color: "red" } : defaultToken > 4500 ?
                { color: "orange" } : { color: "black" }
              }>{defaultToken}</span></div>
      </div>
      <div className="flex pr-8">
        <p className="text-gray-500">
          {
            currDoc.responses &&
              <div>
                <br />
                <p><strong>Pervious Q&As</strong></p>
                <br />
                {currDoc.responses?.map((res: any) => {
                  return (
                    <div key={`${res.question}`}>
                      <p><strong>Question:</strong> {res.question}</p>
                      <p><strong>Answer:</strong> {res.answer}</p>
                    </div>
                  )
                })}
              </div>
          }
          <br />
        </p>
      </div>
      {originalToken <= totalTokens && (
        <div className="flex flex-col w-full h-full items-center mx-auto">
          {optimizedPost && (
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
          )}
          <div className="grow flex flex-col items-center w-full pr-8">    
            <div className="w-full pr-8">
              <PromptBar
                loading={loading}
                SplitString={SplitString}
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
        </div>
      )}
      
    </div>
    
    </>
  );
}
