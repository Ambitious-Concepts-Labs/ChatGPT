import { useContext} from 'react'
import { RxDashboard } from "react-icons/rx";
import { PiFolderSimpleThin, PiUserRectangleFill } from "react-icons/pi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { BsCreditCard2Back } from "react-icons/bs";
import { AiOutlineTrophy, AiOutlineHeart, AiTwotoneSetting, AiOutlineCloudUpload} from 'react-icons/ai'
import { LiaFileInvoiceSolid } from 'react-icons/lia'
import { MdSupport, MdClose } from 'react-icons/md'
import { SiGoogleanalytics } from 'react-icons/si'
import { FiBook } from 'react-icons/fi'
import { HiCreditCard } from 'react-icons/hi'
import { GoSignOut } from 'react-icons/go'
import NavLink from './nav-link';
import { DataContext } from '../../utils/DataContext';


const SideNav = () => {
  const { setNavIsOpen } = useContext(DataContext)

  const closeNav = () => {
    setNavIsOpen(false)
    console.log("nav closed")
  }

  return (
    <nav className='h-full'>
      <div className='flex justify-end lg:hidden mb-2 text-3xl font-extrabold text-slate-800' onClick={closeNav}>
        <MdClose/>
      </div>
      <h1 className='px-5 font-bold text-2xl mb-5'>Logo<span className='text-blue-600'>.</span></h1>
    
      <ul className='scroll-smooth'>
        <p className='uppercase font-medium text-slate-600 dark:text-slate-400 text-xs px-5 py-3'> Home </p>
       
        <NavLink
          location=''
          navIcon={<RxDashboard/>}
          href='/' 
          aTag='Dashboard'
        />

        </ul>
        <ul className='mt-5'>
          <p className='uppercase font-medium text-slate-600 dark:text-slate-400 text-xs px-5 py-3'> Doucments </p>

          <NavLink
            location='folders'
            navIcon={<PiFolderSimpleThin/>}
            href='/folders' 
            aTag='Folders'
          />

          <NavLink
            location='documents'
            navIcon={<IoDocumentTextOutline/>}
            href='/documents' 
            aTag='Documents'
          />

      </ul>
      <ul className='mt-5'>
        <p className='uppercase font-medium text-slate-600 dark:text-slate-400 text-xs px-5 py-3'> Account </p>

        <div className="flex justify-between items-center rounded-full ">
          <NavLink
            location='useage'
            navIcon={<AiOutlineCloudUpload/>}
            href='/useage' 
            aTag='Useage'
            />

          <button class="rounded-full bg-yellow-400	py-1 px-3 opacity-75">
            0%
          </button>
        </div>

        <NavLink
          location='billing'
          navIcon={<BsCreditCard2Back/>}
          href='/billing' 
          aTag='Billing'
        />

        <NavLink
          location='invoices'
          navIcon={<LiaFileInvoiceSolid/>}
          href='/invoices' 
          aTag='Invoices'
        />

        <NavLink
          location='account'
          navIcon={<PiUserRectangleFill/>}
          href='/account' 
          aTag='Account'
        />
        <NavLink
          location='rewards'
          navIcon={<AiOutlineTrophy/>}
          href='/rewards' 
          aTag='Rewards'
        />
      </ul>
      <ul className='mt-5'>
        <p className='uppercase font-medium text-slate-600 dark:text-slate-400 text-xs px-5 py-3'> Support</p>
        <NavLink
          location='Support'
          navIcon={<MdSupport/>}
          href='/support-tickets' 
          aTag='Support'
        />


        <NavLink
          location='analytics'
          navIcon={<SiGoogleanalytics/>}
          href='/analytics' 
          aTag='Analytics'
        />

        <NavLink
          location='payments'
          navIcon={<HiCreditCard/>}
          href='/payments' 
          aTag='Payments'
        />

        <NavLink
          location='settings'
          navIcon={<AiTwotoneSetting/>}
          href='/settings' 
          aTag='Settings'
        />

        <NavLink
          location='documentation'
          navIcon={<FiBook/>}
          href='/documentation' 
          aTag='Documentation'
        />
        <NavLink
          location='feedback'
          navIcon={<AiOutlineHeart/>}
          href='/feedback' 
          aTag='Feedback'
        />
      </ul>
      <ul className='py-5 mt-5'>
        <hr />
        <div className="flex flex-end items-center px-5 py-1 my-1 rounded-full ">
          <GoSignOut/>
          <p  className={`flex items-center px-3`}>Sign out</p>
        </div>
      </ul>
    </nav>
  )
}

export default SideNav