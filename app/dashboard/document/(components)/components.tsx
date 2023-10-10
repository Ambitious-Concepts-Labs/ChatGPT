// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import { UserAuth } from "../../../authContext";
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import {HiOutlineRefresh} from "react-icons/hi"  //HiOutlineBarsArrowDown
import {MdRefresh} from "react-icons/md"
import {HiOutlineBarsArrowDown} from "react-icons/hi2" 
import {BiSolidCircleHalf,BiLogoVk} from "react-icons/bi"
import {RiArrowRightSFill} from "react-icons/ri"
import {GiPlainCircle} from "react-icons/gi"
import {PiShirtFoldedThin,PiBrainThin} from "react-icons/pi"

export const Sidebar = () => {
   const totalToken = 9000
   const { myState } = UserAuth();
   const[currentMonthToken,setcurrentMonthToken]=useState(myState || 0)
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
   const [currentMonthName, setcurrentMonthName] = useState(
     monthNames[currentMonth - 1]
   )
 
  
  
   useEffect(()=>{
      
     setcurrentMonthToken(myState)
   },[myState])
  return (
    <div className='w-[380px] min-h-[100vh] border border-l-[2px] border-[#F5F5F5] relative'>
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
    <div className='w-full h-[70px]  flex justify-start items-center '>
        <div className='w-full items-center ml-[30px] flex gap-8 '>
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

const inter = Inter({ subsets: ["latin"] });

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

export function Compose() {
  const { myState, updateMyState } = UserAuth();
  const [originalToken, setoriginalToken] = useState(0);
  const [defaultToken, setdefaultToken] = useState(0);
  const [totalTokens] = useState(9000);
  const [originalTokendata, setoriginalTokenData] = useState<any>({});
  const [showModal, setshowModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [value, setvalue] = useState("");
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
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const [currentMonthName, setcurrentMonthName] = useState(
    monthNames[currentMonth - 1]
  );

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

  useEffect(() => {
    let username = localStorage.getItem("UserName");
    let originalTokeninfo = localStorage.getItem("TokenInfo");
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
  
  return (
    <>
    <div className="w-full max-w-[1000px] mx-auto mt-[50px]">
      <Model CloseModal={CloseModal} showModal={showModal} />
      <div className="flex justify-center">
        <input
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
            localStorage.setItem("UserName", e.target.value);
          }}
          className="w-full max-w-[30%] rounded-[10px] h-[50px] border-[2px] pl-[10px] !border-gray-200 outline-none "
          placeholder="Enter User Name"
        />
      </div>
      {/* <div className="flex justify-end">
        <p className="text-gray-500" style={{ fontFamily: inter }}>
          Total {currentMonthName} Tokens Usage:
          <span className="text-black font-bold">{defaultToken}</span>
        </p>
      </div> */}
     
      {originalToken <= totalTokens && (
        <div className="mt-6 w-full  ">
           <h1 className="text-[28px] text-gray-400">Untitled document</h1>
          <div className="py-2  bg-white ">
            <textarea
              value={value}
              onChange={(e) => {
                setvalue(e.target.value);
                SplitString(e.target.value);
              }}
              // style={{ fontFamily: inter }}
              id="editor"
              rows={8}
              className="block w-[70%] outline-none text-sm !text-[black] bg-white border-0  focus:ring-0 "
              placeholder="Write an article..."
              required
            ></textarea>
          </div>
        </div>
      )}
    </div>
    
    </>
  );
}
