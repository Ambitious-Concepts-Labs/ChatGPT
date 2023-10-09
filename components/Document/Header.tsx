import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
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
