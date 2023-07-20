import React, { useState } from 'react';;
import { TbFilePlus } from 'react-icons/tb';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import ProfileCard from './ProfileCard';
import ChangePswdCard from './ChangePswdCard';
import DeleteCard from './DeleteCard';

export default function Account() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, userLoading] = useAuthState(auth);
  const { data: session } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   if (!session) {
  //     router.replace("/");
  //   }
  // }), [session];

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            console.log({ uid });
        } else {
            console.log("no user");
        }
    });
  }, []);
  const handleOpenSidebar = () => {
    setIsOpen(true)
  }

  const handleCloseSidebar = () => {
    setIsOpen(false)
  }
    return (
        <>
            <div className='bg-[#f8f9fb] min-h-screen grow px-8 md:px-16 pt-7 pb-10'>
                <div className='grid items-center grid-cols-3 grid-rows-1 md:grid-cols-2 pb-10 '>
                    <h1 className='text-black/60 col-start-2 justify-self-start md:col-start-1'>Account</h1>
                    <button className='col-start-3 justify-self-end md:col-start-2 md:row-start-1 md:justify-self-end w-fit bg-black px-2 py-2 rounded-sm text-white text-xs font-light flex items-center gap-2 cursor-pointer'>
                    <div className='h-4 w-4'>
                        <TbFilePlus className='h-full w-auto' />
                    </div>
                    <span className='text-xs'>
                        New document
                    </span>
                    </button>
                    <button className='h-5 w-5 col-start-1 row-start-1 md:hidden' onClick={handleOpenSidebar}>
                    <RxHamburgerMenu className='h-full w-auto' />
                    </button>
                </div>
                <div className={`md:grid grid-cols-1 grid-rows-3 justify-self-end lg:grid-cols-2 lg:grid-rows-2 gap-5 ${isOpen ? 'hidden' : 'grid'}`}>
                    <ProfileCard user={user} session={session}/>
                    <ChangePswdCard user={user} session={session}/>
                    <DeleteCard user={user} session={session}/>
                </div>
            </div>
        </>
    )
}