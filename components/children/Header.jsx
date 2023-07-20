import { RxHamburgerMenu } from 'react-icons/rx'
import Button from './Button'
import { TbFilePlus } from 'react-icons/tb'
import { useContext } from 'react'
// import { SidebarContext } from '../contexts/SidebarContext'

export default function Header ({ title }) {
  // const { handleOpenSidebar } = useContext(SidebarContext)
  return (
    <header className='grid items-center grid-cols-3 grid-rows-1 md:grid-cols-2 pb-10'>
      <h1 className='font-bold col-start-2 justify-self-start md:col-start-1'>
        {title}
      </h1>
      <Button
        variant='black'
        icon={<TbFilePlus className='h-full w-auto' />}
        text='New Document'
      />
      <button className='h-5 w-5 col-start-1 row-start-1 md:hidden'>
        <RxHamburgerMenu className='h-full w-auto' />
      </button>
    </header>
  )
}
