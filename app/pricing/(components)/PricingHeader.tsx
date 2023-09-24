import logo from "../../../assets/logo.svg";
import Image from "next/image";
import { UserAuth } from "../../authContext";

export default function Header() {
  const {firebaseUser} = UserAuth()
  return (
    <>
      {!firebaseUser ? (
        <header className="flex items-center justify-between px-5 py-8 lg:px-8">
          <div className="h-10 w-24">
            <Image src={logo} width={199} height={43} alt="Logo" />
          </div>
          <button className="px-8 py-2.5 bg-white text-[#024c43] rounded-sm text-sm font-semibold hover:opacity-90">
            Log In
          </button>
        </header>
      ) : (
        <header className="flex items-center justify-between px-5 py-8 lg:px-8">
          <div className="h-10 w-24">
            <Image src={logo} width={199} height={43} alt="Logo" />
          </div>
          <div className="h-10 w-24">
            <Image
              className="rounded-full"
              src={firebaseUser.photoURL || ""}
              width={40}
              height={40}
              alt={firebaseUser.email || ""}
            />
          </div>
        </header>
      )}
    </>
  );
}