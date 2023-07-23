import { onAuthStateChanged } from 'firebase/auth'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BsPeopleFill, BsPersonFill } from 'react-icons/bs'
import { GiCargoShip } from 'react-icons/gi'
import { GrDocument } from 'react-icons/gr'
import { auth } from '../firebase'
import Card from './Card'
import DocumentContainer from "./Documents";
import { IoDocumentTextOutline } from 'react-icons/io5'
import Title from './Title'

const Dashboard = () => {
    const [user, userLoading] = useAuthState(auth);
    const { data: session } = useSession();
    const router = useRouter();

    // useEffect(() => {
    //   if (!session) {
    //     router.replace("/");
    //   }
    // }), [session];

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                console.log({ uid });
            } else {
                console.log("no user");
            }
        });
    }, []);
    console.log(user)
    return (
            <>
                <Title button={"Document"} title={"Dashboard"} session={session}/>
                <section className="flex justify-between flex-wrap mt-2 text-black">
                    <Card 
                    bgHover='hover:bg-blue-600 dark:hover:bg-blue-800'
                    textHover='hover:text-white'
                    heading='Doucments'
                    number='1'
                    iconbg='bg-blue-600 dark:bg-blue-800'
                    icon={<IoDocumentTextOutline/>} 
                    />

                    <Card 
                    bgHover='hover:bg-teal-500 dark:hover:bg-teal-700'
                    textHover='hover:text-white'
                    heading='Drafts'
                    number='100%'
                    iconbg='bg-teal-500 dark:bg-teal-700'
                    icon={<BsPeopleFill/>}
                    />

                    <Card 
                    bgHover='hover:bg-pink-500 dark:hover:bg-pink-700'
                    textHover='hover:text-white'
                    heading='Published'
                    number='0%'
                    iconbg='bg-pink-500 dark:bg-pink-700'
                    icon={<GiCargoShip/>}
                    />

                    <Card 
                    bgHover='hover:bg-pink-500 dark:hover:bg-pink-700'
                    textHover='hover:text-white'
                    heading='Token Usage'
                    number='0%'
                    iconbg='bg-pink-500 dark:bg-pink-700'
                    icon={<GiCargoShip/>}
                    />
                </section>

                <DocumentContainer user={user} session={session}/>
            </>
        )
}

export default Dashboard