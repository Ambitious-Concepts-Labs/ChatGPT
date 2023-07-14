import { AiFillPlusCircle } from 'react-icons/ai'
import { BiUser } from 'react-icons/bi'
import reactLogo from '../assets/react.svg'

export default function ProfileCard () {
  return (
    <div className='bg-white py-4 px-5 rounded-sm'>
      <div>
        <div className='pb-4 flex items-center justify-between'>
          <div className='bg-slate-100 text-slate-400 p-1 h-8 w-8 flex items-center justify-center rounded-md text-xl'>
            <BiUser />
          </div>
          <div className='relative'>
            <img src={reactLogo} alt='React Logo' className='h-8 w-8 rounded-full' />
            <label htmlFor='upload-image' className='absolute -bottom-2 -right-2 cursor-pointer hover:text-amber-300'>
              <AiFillPlusCircle />
            </label>
          </div>
          <input className='hidden' type='file' name='' id='upload-image' />
        </div>
        <div>
          <h3 className='font-bold pb-5 text-xs'>Profile</h3>
          <form className='flex flex-col gap-4 w-7/12'>
            <div className='flex flex-col gap-2 text-xs text-slate-400'>
              <label htmlFor='name' className='font-semibold'>Name</label>
              <input type='text' id='name' className='border p-2 rounded-md' placeholder='Dominique Hosea' />
            </div>
            <div className='flex flex-col gap-2 text-xs text-slate-400'>
              <label htmlFor='email' className='font-semibold'>Email</label>
              <input type='text' id='email' className='border p-2 rounded-md' placeholder='dhoseadesigns@gmail.com' />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
