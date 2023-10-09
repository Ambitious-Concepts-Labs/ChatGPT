import React,{useState,useEffect} from 'react'
import {HiOutlineRefresh} from "react-icons/hi"  //HiOutlineBarsArrowDown
import {MdRefresh} from "react-icons/md"

import {HiOutlineBarsArrowDown} from "react-icons/hi2" 
import {BiSolidCircleHalf,BiLogoVk} from "react-icons/bi"
import {RiArrowRightSFill} from "react-icons/ri"
import {GiPlainCircle} from "react-icons/gi"
import {PiShirtFoldedThin,PiBrainThin} from "react-icons/pi"
import { UserAuth } from '../../app/authContext'

const Sidebar = () => {
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

export default Sidebar