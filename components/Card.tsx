import React from 'react'

const Card = (props: any) => {
  const {bgHover, textHover, heading, number, iconbg, icon} = props
  return (
        <div className={`flex w-60 rounded bg-white px-6 py-3 text-slate-800 transition-colors duration-500`}>
          <div  className='h-3/5 bg-slate-100 text-slate-500 p-2 flex items-center justify-center rounded-md '>
            <span className='flex items-center text-xl'> {icon} </span>
          </div> 
          <div className='pl-5 flex flex-col items-center flex-start'>
            <p className="uppercase text-xs"> {heading} </p>
            <p className="font-bold text-l my-2 uppercase"> {number} </p>
          </div>
        </div>  )
}

export default Card