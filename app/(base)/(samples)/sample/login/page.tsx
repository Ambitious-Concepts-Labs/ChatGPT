"use client";

import { signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { GoogleProvider, auth } from "../../../../../firebase";

function Login() {
  return (
    <div className="bg-[#11A37F] h-screen flex flex-col items-center justify-center text-center">
      <Image
        src="https://links.papareact.com/2i6"
        width={300}
        height={300}
        alt="chatgpt logo"
      />
      <button onClick={async () => await signInWithPopup(auth, GoogleProvider)} className="text-white font-bold text-3xl animate-pulse">Sign In to use ChatGPT</button>
    </div>
  );
}

export default Login;
