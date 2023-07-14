import React from 'react'
import Image from 'next/image';
import { documents } from '../utils/data/douments'

const Documents = () => {

  return (
    <section>
        <div className="flex justify-between flex-wrap items-center mt-12">
            <div>
                <h2 className="font-bold text-slate-800 "> Recent Documents </h2>
            </div>
        </div>
        <div className="grid grid-cols-6 grid-flow-row gap-4 my-4 bg-white dark:bg-night-blue p-5">
          <div className="col-span-2 uppercase font-medium text-xs text-slate-600 dark:text-slate-400">Title</div>
          <div className="col-start-4 uppercase font-medium text-xs text-slate-600 dark:text-slate-400">Author</div>
          <div className="col-start-5 uppercase font-medium text-xs text-slate-600 dark:text-slate-400">Status</div>
          <div className="col-start-6 uppercase font-medium text-xs text-slate-600 dark:text-slate-400">Modified</div>

            {documents.map((item, index) => (
              
              <React.Fragment key={`doc-${index}`}>
                <div className={`col-span-2`}>{item.title}</div>
                <div className={`col-start-4`}>
                  <Image
                    width={30}
                    height={30}
                    src={item.author}
                    alt={`${item.author}'s doc`}
                    className='object-contain'
                  />
                </div>
                <div className={`col-start-5`}>
                  <div className='flex items-start mb-1'>
                    <span className={"w-4 h-4 mt-1 mr-2 rounded-full " + (item.status == 'Draft' ? 'animate-pulse' : '')}
                      style={item.status == 'Published' ? {backgroundColor:'green'} : {backgroundColor:'gray'}}></span>
                    &nbsp;
                    {item.status}
                  </div>
                </div>
                <div className={`col-start-6`}>{item.modified}</div>
              </React.Fragment>
            ))}
      </div>
    
    </section>
  )
}

export default Documents