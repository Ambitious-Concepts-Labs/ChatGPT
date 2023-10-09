import { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { BsKey } from 'react-icons/bs';
import { MdDoneAll } from "react-icons/md";
import { LuShieldAlert } from 'react-icons/lu';
import { updateFirebaseUser } from "../../../../utils/firebaseHelpers";
import Button from "../../../../components/Button";
import Toggle from '../../../../components/Toggle';

export function ProfileCard(props: any) {
  const { user, session } = props
  // Update user info in db not auth or session
  const [displayName, setName ] = useState(user?.displayName || '')
  const [email, setEmail ] = useState(user?.email || '')
  const [photoURL, setPhotoURL ] = useState(user?.photoURL || '')
  const updateUser = updateFirebaseUser('any', {displayName, email, photoURL})
  console.log(updateUser)
  return (
    <div className="bg-white py-4 px-5 rounded-sm">
      <div>
        <div className="pb-4 flex items-center justify-between">
          <div className="bg-slate-100 text-slate-400 p-1 h-8 w-8 flex items-center justify-center rounded-md text-xl">
            <BiUser />
          </div>
          <div className="relative">
            <img
              src={session?.photoURL}
              alt="React Logo"
              className="h-8 w-8 rounded-full"
            />
            <label
              htmlFor="upload-image"
              className="absolute -bottom-2 -right-2 cursor-pointer hover:text-amber-300"
            >
              <AiFillPlusCircle />
            </label>
          </div>
          <input className="hidden" type="file" name="" id="upload-image" />
        </div>
        <div>
          <h3 className="font-bold pb-5 text-xs">Profile</h3>
          <form onSubmit={() => { updateFirebaseUser('any', {displayName, email, photoURL}); }} className="flex flex-col gap-4 w-7/12">
            <div className="flex flex-col gap-2 text-xs text-slate-400">
              <label htmlFor="name" className="font-semibold">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={displayName}
                onChange={(e) => { setName(e.target.value); }}
                className="border p-2 rounded-md"
                placeholder={session.displayName}
              />
            </div>
            <div className="flex flex-col gap-2 text-xs text-slate-400">
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); }}
                className="border p-2 rounded-md"
                placeholder={session.email}
              />
            </div>
            <Button
            variant="white"
            icon={<MdDoneAll className="h-full w-auto" />}
            text="Submit"
          />
          </form>
        </div>
      </div>
    </div>
  );
}

export function ChangePswdCard (props: any) {
  const [password, setPassword ] = useState('')
  return (
    <div className='bg-white py-4 px-5 rounded-sm'>
      <div>
        <div className='pb-4'>
          <div className='bg-slate-100 text-slate-400 p-1 h-8 w-8 flex items-center justify-center rounded-md text-xl'>
            <BsKey className='-rotate-45' />
          </div>
        </div>
        <h3 className='font-bold pb-7 text-xs'>Change Password</h3>
        <form onSubmit={() => { updateFirebaseUser('password', {password}); }} className='flex flex-col gap-3 w-7/12 text-xs'>
          <input type='text' className='p-2 border rounded-md' placeholder='Current password' />
          <input type='text' className='p-2 border rounded-md' placeholder='New password' />
          <input 
          value={password}
          onChange={(e) => { setPassword(e.target.value); }} 
          type='text' className='p-2 border rounded-md' 
          placeholder='Re-type new password' />
        </form>
      </div>
    </div>
  )
}


export function DeleteCard (props: any) {
  const [canDelete, setCanDelete] = useState(false)

  const handleCanDelete = () => {
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