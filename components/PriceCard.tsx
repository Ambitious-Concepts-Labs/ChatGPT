import React from "react";
import professional from "../assets/professional.svg";
import Image from "next/image";
import { db } from "../firebase";
import { createCheckoutSession } from "../stripe/createCheckoutSession";
import usePremiumStatus from "../stripe/usePremiumStatus";
import { useSession } from "next-auth/react";
import { doc, getDoc } from "firebase/firestore";
import { delay } from "../utils/helperFunctions";
import { UserAuth } from "../app/authContext";

export default function PriceCard(props: any) {
  const { user } = UserAuth();
  console.log(user, 'from auth')

  const { data: session } = useSession();
  // const userIsPremium = usePremiumStatus(user);


  const getUser = async () => {
    const email = session?.user?.email
    if (session && email) {
      const docRef = doc(db, "users", email);
      const docSnap = await getDoc(docRef);
      console.log("Document data:", docSnap.data());
      if (docSnap) {
        return docSnap.data()
      }
    }
  }

  const { plan } = props

  const handlerPlan = async () => {
    try {
      const currUser = await getUser()
      await delay(1000)
      console.log(currUser, 'lol')
      if (currUser) {
        props.setLoading(true);
        console.log('----start')
        await createCheckoutSession(currUser?.email, plan.id);
      } else {
        console.log(`User info ${currUser}`)
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      {/* {user && !userLoading && (
        <div>
          <h1>Hello, {user.displayName}</h1>
          {!userIsPremium ? (
            <button onClick={() => createCheckoutSession(user.uid)}>
              Upgrade to premium!
            </button>
          ) : (
            <h2>Have a cookie 🍪 Premium customer!</h2>
          )}
        </div>
      )} */}
      <li
        className={`rounded-2xl overflow-hidden py-6 lg:py-10 px-10 lg:px-5 w-full text-black shadow-md lg:shadow-xl ${
          plan.id < 3 ? "bg-[#E3E4EC]" : "bg-white sm:col-span-2 lg:col-auto"
        } relative`}
      >
        <h3
          className={`text-2xl text-center font-bold ${
            plan.id === 3 && "text-[#024c43]"
          }`}
        >
          {plan.title}
        </h3>
        <p
          className={`text-center h-[88px] pt-4 leading-relaxed tracking-[0.2px] relative z-10 ${
            plan.id === 3 && "text-[#019281]"
          }`}
        >
          {plan.subtitle}
        </p>
        <div
          className={`pt-10 pb-14 lg:py-10 flex flex-col gap-4 relative z-10 ${
            plan.id === 3 && "text-[#024c43]"
          }`}
        >
          <div className="flex items-end justify-center font-bold">
            <span className="text-4xl">${plan.price}</span>
            <span className="text-sm">/month</span>
          </div>
          <div className="flex items-center justify-center gap-x-1 text-sm font-semibold  tracking-[0.2px]">
            <span className="">{plan.tokens}</span>
            <span className="">Tokens</span>
          </div>
        </div>
        {plan.id === 3 && (
          <div className="absolute -right-[18%] -bottom-[29%]">
            <Image src={professional} alt="Logo" />
          </div>
        )}
        <button
          className="relative z-10 text-center w-4/6 left-2/4 -translate-x-2/4 lg:left-0 lg:translate-x-0 lg:w-full py-5 rounded-md text-white text-sm bg-c-green drop-shadow-md hover:underline hover:underline-offset-2 hover:shadow-lg decoration-1 decoration-white/30  tracking-[0.2px]"
          onClick={() => handlerPlan()}
        >
          Get Started
        </button>
      </li>
    </>
  );
}