import { BsKey } from 'react-icons/bs'

export default function ChangePswdCard ({user, session}) {
  return (
    <div className='bg-white py-4 px-5 rounded-sm'>
      <div>
        <div className='pb-4'>
          <div className='bg-slate-100 text-slate-400 p-1 h-8 w-8 flex items-center justify-center rounded-md text-xl'>
            <BsKey className='-rotate-45' />
          </div>
        </div>
        <h3 className='font-bold pb-7 text-xs'>Change Password</h3>
        <form className='flex flex-col gap-3 w-7/12 text-xs'>
          <input type='text' className='p-2 border rounded-md' placeholder='Current password' />
          <input type='text' className='p-2 border rounded-md' placeholder='New password' />
          <input type='text' className='p-2 border rounded-md' placeholder='Re-type new password' />
        </form>
      </div>
    </div>
  )
}
