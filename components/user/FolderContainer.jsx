import React from 'react'
import Image from 'next/image';
import {GrDocument} from 'react-icons/gr';

const FolderContainer = () => {

  return (
    <>
        <section className="flex justify-between flex-wrap mt-2 py-5">
            <p className="my-1 text-slate-600 text-sm ">
              Folders
            </p>
            <div className="flex justify-between items-center mt-2 bg-black	 rounded px-3 py-1">
              <GrDocument className='text-white'/>
              &nbsp;
              <p className='text-white'>New Folders</p>
            </div>
        </section>
        <section>
            <div className="flex flex-col items-center bg-white dark:bg-night-blue p-5">
                <div  className="flex flex-col items-center  ">
                    <Image
                        width={600}
                        height={600}
                        src="/folder.jpg"
                        className='object-contain py-5 text-gray-400'
                        />
                    <div className="flex items-center mt-2 bg-white	border-gray-400 border-solid border-2 rounded px-3 py-1">
                        <GrDocument className='text-black'/>
                        &nbsp;
                        <p className='text-gray-400'>New Folders</p>
                    </div>
                </div>
            </div>
        
        </section>
    </>

  )
}

export default FolderContainer;