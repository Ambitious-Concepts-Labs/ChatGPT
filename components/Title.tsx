import { addDoc, collection, CollectionReference, doc, DocumentData, serverTimestamp, setDoc } from "firebase/firestore";
import { RxHamburgerMenu } from "react-icons/rx";
import { TbFilePlus } from "react-icons/tb";
import { db } from "../firebase";
import { v4 as uuidv4 } from 'uuid';

export default function index ({ title, button, session }) {
    const handleOnClick = async () => {
        const uid = uuidv4()
         await setDoc(doc(db, "users", session?.user?.email, "documents", uid),
            {
                title: "Untitled document",
                status: "Draft",
                folder: "",
                response: "Sample Response",
                createdAt: serverTimestamp(),
                lastModified: new Date(),
                id: uid
            }
        );
    }

    return (
        <div className='grid items-center grid-cols-3 grid-rows-1 md:grid-cols-2 pb-10 '>
            <h2 className='text-black/60 col-start-2 justify-self-start md:col-start-1'>
                <b>
                    {title}
                </b>
            </h2>
            <button 
            className='rounded col-start-3 justify-self-end md:col-start-2 md:row-start-1 md:justify-self-end w-fit bg-black px-2 py-2 rounded-sm text-white text-xs font-light flex items-center gap-2 cursor-pointer'
            onClick={() => handleOnClick()}
             >
                <div className='h-4 w-4'>
                    <TbFilePlus className='h-full w-auto' />
                </div>
                <span className='text-xs'>
                    New {button}
                </span>
            </button>
            <button className='h-5 w-5 col-start-1 row-start-1 md:hidden'>
                <RxHamburgerMenu className='h-full w-auto' />
            </button>
        </div>
    )
}


