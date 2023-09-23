import { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { MdDoneAll } from "react-icons/md";
import { updateFirebaseUser } from "../utils/firebaseHelpers";
import Button from "./Button";

export default function ProfileCard(props: any) {
  const { user, session } = props
  // Update user info in db not auth or session
  const [displayName, setName ] = useState(user?.displayName || '')
  const [email, setEmail ] = useState(user?.email || '')
  const [photoURL, setPhotoURL ] = useState(user?.photoURL || '')
  console.log(user, 'firebase')
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
          <form onSubmit={() => updateFirebaseUser('any', {displayName, email, photoURL})} className="flex flex-col gap-4 w-7/12">
            <div className="flex flex-col gap-2 text-xs text-slate-400">
              <label htmlFor="name" className="font-semibold">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={displayName}
                onChange={(e) => setName(e.target.value)}
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
                onChange={(e) => setEmail(e.target.value)}
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