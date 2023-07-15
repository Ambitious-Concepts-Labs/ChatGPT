"use client";

import { DocumentData } from "firebase/firestore";
import React from "react";
import Image from 'next/image';
import {AiOutlineStar} from 'react-icons/ai'
import {AiFillStar} from 'react-icons/ai'

type Props = {
  document: DocumentData;
};

const Document = ({document, session}) => {

  let lastModified = document?.lastModified?.seconds;
  lastModified = new Date(lastModified * 1000).toDateString() ;
  return (
      <>
        <React.Fragment key={`doc-${document?.id}`}>
          <div className={`col-span-2 flex items-center`}>
            <span className='flex items-center text-2xl pr-2'> 
             <AiOutlineStar/>
            </span>
            {document?.title}
          </div>
          <div className={`col-start-4`}>
            <Image
              width={30}
              height={30}
              src={session?.user?.image}
              alt={`${document?.title}'s doc`}
              className='object-contain rounded-full'
            />
          </div>
          <div className={`col-start-5`}>
            <div className='flex items-start mb-1'>
              <span className={"w-4 h-4 mt-1 mr-2 rounded-full " + (document?.status == 'Draft' ? 'animate-pulse' : '')}
                style={document?.status == 'Published' ? {backgroundColor:'green'} : {backgroundColor:'gray'}}></span>
              &nbsp;
              {document?.status}
            </div>
          </div>
          <div className={`col-start-6`}>{lastModified || ''}</div>
        </React.Fragment>
      </>
  );
};

export default Document;