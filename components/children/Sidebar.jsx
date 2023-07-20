import { HiArrowUpTray } from 'react-icons/hi2'
import { IoCloseOutline } from 'react-icons/io5'
import { PiSunBold } from 'react-icons/pi'
import NavList from './NavList'
import Toggle from './Toggle'
import logo from '../assets/logo.svg'
import { useContext } from 'react'
import { SidebarContext } from '../contexts/SidebarContext'
import {
  account,
  documents,
  home,
  support
} from '../utils/navPages'

export default function Sidebar () {
  const { isOpen, handleCloseSidebar } = useContext(SidebarContext)

  return (
    <div className={`${isOpen ? 'absolute z-20 flex' : 'hidden'} min-h-screen md:static overflow-y-auto overflow-x-hidden w-screen md:flex bg-white md:w-1/4 lg:w-[20%] px-6 pt-6 flex-col md:max-h-screen`}>
      <div className='grid items-center grid-cols-3 grid-rows-1 md:grid-cols-2'>
        <div className='col-start-2 justify-self-center row-start-1 rounded-full overflow-hidden bg-black text-white w-8 h-8 flex items-center justify-center md:col-start-1 md:justify-self-start'>
          <img src={logo} alt='Logo' className='h-6 w-6' />
        </div>
        <div className='col-start-3 md:col-start-2 justify-self-end row-start-1 flex items-center gap-2'>
          <PiSunBold className='text-md text-slate-400' />
          <Toggle variant='normal' />
        </div>
        <div className='col-start-1 row-start-1 md:hidden cursor-pointer h-6 w-6 flex items-center justify-center' onClick={handleCloseSidebar}>
          <IoCloseOutline className='h-full w-auto' />
        </div>
      </div>
      <nav className='pt-10 grow flex flex-col gap-6'>
        <NavList title='Home' items={home} />
        <NavList title='Documents' items={documents} />
        <NavList title='Account' items={account} />
        <NavList title='Support' items={support} />
      </nav>
      <div className='pb-4 pt-6 border-t border-[#f8f9fb]'>
        <button className='flex items-center gap-3'>
          <div className='rotate-90 h-5 w-5'>
            <HiArrowUpTray className='h-full w-auto' />
          </div>
          <span className='text-xs font-semibold'>Sign out</span>
        </button>
      </div>
    </div>
  )
}
