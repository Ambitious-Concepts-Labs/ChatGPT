import 'server-only';
import { BiChevronLeft } from 'react-icons/bi'
import Link from 'next/link';
import Button from '../../components/Button';
import { AuthSignin } from './(components)/components';



export default function Page() {
  return (
    <div className='grid min-h-screen grid-cols-2'>
      <div className='flex flex-col'>
        <Link href="/" className='px-4 py-2'>
          <Button 
          variant="white"
          icon={<BiChevronLeft size={18} />}
          text="Home"
          />
        </Link>
        <div className='my-auto grid place-items-center px-4 py-10'>
          <div className='flex w-full max-w-md flex-col'>
            <div className='flex flex-col pb-2'>
              <p className='text-2xl font-medium'>Sign in</p>
              <p>Choose a social provider to sign in with.</p>
            </div>
            <AuthSignin />
          </div>
        </div>
      </div>
      <div className='grid place-items-center bg-black'>
        <div className='invert rounded-md'>
          <img src='/vercel.svg' className='h-14 w-14 ' />
        </div>
      </div>
    </div>
  );
}
