import Link from 'next/link';
import Button from '../../../components/Button';
import { AiFillGithub, AiFillTwitterCircle, AiFillInstagram } from 'react-icons/ai'
import { MdOutlineNotStarted } from 'react-icons/md'

export function Header() {
  return (
    <nav className=''>
      <div className='m-auto flex w-full max-w-7xl items-center gap-8 px-4 py-4'>
        <Link href='/'>
          <img src='/vercel.svg' className='h-8 w-8 shrink-0' />
        </Link>
        <div className='flex flex-row items-center gap-8'>
          <Link
            href='/pricing'
            className='border-b-2 border-transparent py-2 text-base text-sm duration-100 hover:border-rose-400 hover:text-rose-500 '
          >
            Pricing
          </Link>
          <Link
            href='/about'
            className='hidden border-b-2 border-transparent py-2 text-base text-sm duration-100 hover:border-rose-400 hover:text-rose-500 sm:flex'
          >
            About
          </Link>
          <Link
            href='/contact'
            className='hidden border-b-2 border-transparent py-2 text-base text-sm duration-100 hover:border-rose-400 hover:text-rose-500 sm:flex'
          >
            Contact
          </Link>
        </div>
        <div className='ml-auto flex items-center gap-4'>
            <Link href='/sign-in'>
              <Button variant={"black"} text={"Get started"} icon={<MdOutlineNotStarted/>}  />
            </Link>

        </div>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <div className='m-auto max-w-7xl px-4 py-20'>
      <div className='grid gap-x-8 gap-y-12 sm:grid-cols-5'>
        <div className='col-span-2 flex flex-col gap-6'>
          <Link href='/'>
            <img src='/vercel.svg' className='h-10 w-10' />
          </Link>
          <div className='flex items-center gap-2'>
            <Link
              href='https://www.example.com'
              className='hover:text-rose-400'
            >
              <AiFillGithub size={18} />
            </Link>
            <Link
              href='https://www.example.com'
              className='hover:text-rose-400'
            >
              <AiFillTwitterCircle size={18} />
            </Link>
            <Link
              href='https://www.example.com'
              className='hover:text-rose-400'
            >
              <AiFillInstagram size={18} />
            </Link>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='text-sm font-medium text-neutral-600'> PRODUCT</p>
          <Link
            href='/pricing'
            className='text-base text-neutral-800 hover:underline'
          >
            <p>Pricing</p>
          </Link>
          <Link
            href='/#features'
            className='text-base text-neutral-800 hover:underline'
          >
            <p>Features</p>
          </Link>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='text-sm font-medium text-neutral-600'> COMPANY</p>
          <Link
            href='/about'
            className='text-base text-neutral-800 hover:underline'
          >
            <p>About</p>
          </Link>
          <Link
            href='/contact'
            className='text-base text-neutral-800 hover:underline'
          >
            <p>Contact</p>
          </Link>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='text-sm font-medium text-neutral-600'>LEGAL</p>
          <Link
            href='/terms'
            className='text-base text-neutral-800 hover:underline'
          >
            <p>Terms of Service</p>
          </Link>
          <Link
            href='/privacy'
            className='text-base text-neutral-800 hover:underline'
          >
            <p>Privacy Policy</p>
          </Link>
        </div>
      </div>
    </div>
  );
  
}