import { LuShieldAlert } from 'react-icons/lu'
import Toggle from './Toggle'
import { useState } from 'react'

export default function DeleteCard ({user, session}) {
  const [canDelete, setCanDelete] = useState(false)

  const handleCanDelete = ({user, session}) => {
    setCanDelete(prev => !prev)
  }

  return (
    <div className='lg:col-span-2 bg-white py-4 px-5 rounded-sm'>
      <div>
        <div className='flex items-center justify-between pb-4'>
          <div className='bg-red-50 p-1 text-xl h-10 w-10 flex items-center justify-center rounded-md'>
            <LuShieldAlert className='text-red-600' />
          </div>
          <Toggle variant='danger' handleCheck={handleCanDelete} />
        </div>
        <h3 className='font-bold text-xs'>Danger Zone</h3>
        <div className='pt-8 pb-6'>
          <h4 className='text-red-600 pb-2 text-xs'>Delete account</h4>
          <p className='text-xs text-slate-400'>
            Permanent delete your account and all of your content. In order to prime the sequence. click on the toggle.
          </p>
          <p className='text-xs text-slate-400'>
            We also cancel any active subscriptions you may have and delete your payment information.
          </p>
        </div>
        <button disabled={!canDelete} className='bg-red-600 text-white text-xs px-4 py-2 rounded-sm disabled:bg-slate-400 disabled:opacity-40'>Delete account</button>
      </div>
    </div>
  )
}
