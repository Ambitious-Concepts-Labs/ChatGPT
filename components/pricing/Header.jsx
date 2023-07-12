import logo from '../../assets/logo.svg'
import Image from 'next/image';

export default function Header () {
  return (
    <header className='flex items-center justify-between px-5 py-8 lg:px-8'>
      <div className='h-10 w-24'>
        <Image
          src={logo} 
          width={199} 
          height={43} 
          alt='Logo'
        />
      </div>
      <button className='px-8 py-2.5 bg-white text-[#024c43] rounded-sm text-sm font-semibold hover:opacity-90'>Log In</button>
    </header>
  )
}
