// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

"use client";
import React, { useEffect, useState } from "react";
import { BsPeopleFill } from "react-icons/bs";
import { GiCargoShip } from "react-icons/gi";
import Card from "./Card";
import DocumentContainer from "./Documents";
import { IoDocumentTextOutline } from "react-icons/io5";
import Title from "./Title";
import { UserAuth } from "../app/authContext";
import Loading from "./Loader";
import Link from 'next/link';

const Dashboard = () => {
  const { session, documents, showModal, setShowModal, user, id } = UserAuth();
  const [draft, setDraft] = useState(0);

  const docSize = documents.length || 0

  useEffect(() => {
    handleStatus();
  }, [user, documents]);

  function handleStatus() {
    let count = 0;
    documents.map((document) => {
      if (document.status === "Draft") {
        count++;
      }
    });
    setDraft(count);
  }

  return (
    <>
      {user ? 
        <>
          <Title
            setShowModal={setShowModal}
            showModal={showModal}
            button={"Document"}
            title={"Dashboard"}
            session={session}
            id={id}
          />
          {
            documents && 
            <section className="flex justify-between flex-wrap mt-2 text-black">
              <Card
                bgHover="hover:bg-blue-600 dark:hover:bg-blue-800"
                textHover="hover:text-white"
                heading="Doucments"
                number={documents ? documents.length : 0}
                iconbg="bg-blue-600 dark:bg-blue-800"
                icon={<IoDocumentTextOutline />}
              />

              <Card
                bgHover="hover:bg-teal-500 dark:hover:bg-teal-700"
                textHover="hover:text-white"
                heading="Drafts"
                number={`${(draft / docSize) * 100} %`}
                iconbg="bg-teal-500 dark:bg-teal-700"
                icon={<BsPeopleFill />}
              />

              <Card
                bgHover="hover:bg-pink-500 dark:hover:bg-pink-700"
                textHover="hover:text-white"
                heading="Published"
                number={`${((docSize - draft) / docSize) * 100} %`}
                iconbg="bg-pink-500 dark:bg-pink-700"
                icon={<GiCargoShip />}
              />

              <Card
                bgHover="hover:bg-pink-500 dark:hover:bg-pink-700"
                textHover="hover:text-white"
                heading="Token Usage"
                number="0%"
                iconbg="bg-pink-500 dark:bg-pink-700"
                icon={<GiCargoShip />}
              />
            </section>
          }

          <DocumentContainer
            user={user}
            setShowModal={setShowModal}
            documents={documents}
            session={session}
          />
          <div className='grid grid-cols-2 gap-x-8 py-8'>
        <div className='flex flex-col rounded-lg bg-gradient-to-tr from-zinc-800 to-black p-8'>
          <p className='font-display text-2xl text-white'>
            Upgrade to enchance your experience
          </p>
          <p className='py-4 text-base text-white/80'>
            Checkout out our other billing plans.
          </p>
          <Link href='/dashboard/settings/billing'>
            <button size='xs'>Upgrade</button>
          </Link>
        </div>
        <div className='flex flex-col rounded-lg bg-gradient-to-tr from-violet-800 to-violet-900 p-8'>
          <p className='font-display text-2xl text-white'>
            Join our developer community
          </p>
          <p className='py-4 text-base text-white/80'>
            Join the discord for updates and support from other developers.
          </p>
          <Link href='https://discord.gg/sAcvuQACYQ'>
            <button size='xs'>Join</button>
          </Link>
        </div>
      </div>

        </>
      :
          <Loading/>
      }
    </>
  );
};

export default Dashboard;