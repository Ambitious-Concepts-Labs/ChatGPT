"use client";
import { useState } from 'react'

export default function Slider () {
  const categories = [
    {
      id: 1,
      name: 'Beginner',
      color: 'bg-green-400',
      mobile: '../beginnermobile.png',
      web: '../beginnerweb.png'
    },
    {
      id: 2,
      name: 'Intermediate',
      color: 'bg-yellow-500',
      mobile: '../intermediatemobile.png',
      web: '../intermediateweb.png'
    },
    {
      id: 3,
      name: 'Advanced',
      color: 'bg-red-500',
      mobile: '../advancedmobile.png',
      web: '../advancedweb.png'
    },
    {
      id: 4,
      name: 'Applications',
      color: 'bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500',
      mobile: '../applicationsmobile.png',
      web: '../applicationsweb.png'
    }
  ]
  const [curr, setCurr] = useState(0)

  const chooseCategory = (id) => {
    setCurr(id - 1)
  }
  return (
    <div className='pt-16'>
      <div className='flex flex-wrap gap-4 md:gap-4 justify-center'>
        {
          categories.map(cat => (
            <div
              key={cat.id}
              className={`
              z-[2] category-shadow flex items-center tracking-tight rounded-full gap-1 justify-center px-7 py-2 cursor-pointer transition-all hover:shadow-md font-semibold

                ${curr + 1 === cat.id
                ? ' bg-white text-[#00082B]'
                : ' bg-[#E3E4EC]'} `}
              onClick={() => chooseCategory(cat.id)}
            >
              <div className={
                curr + 1 === cat.id
                  ? `rounded-full w-[10px] h-[10px] mr-2 ${cat.color}`
                  : 'rounded-full w-[10px] h-[10px] mr-2 bg-[#979AAC]'
              }
              />
              <div className='font-medium'>{cat.name}</div>
            </div>
          ))
        }
      </div>
      <div className='relative h-[650px] md:h-[700px]'>
        <div
          className='mt-[-25px] flex absolute h-full w-fit transition-transform ease-out duration-500 top-0 -left-8 md:-left-24'
          style={{ transform: `translateX(-${curr * 25}%)` }}
        >
          {
            categories.map(cat => (
              <div key={cat.color} className='h-full w-max flex items-center justify-center md:mr-[-1rem]'>
                <img
                  className='block md:hidden h-full'
                  src={cat.mobile}
                  alt={cat.name}
                />
                <img
                  className='hidden md:block h-full w-full'
                  src={cat.web}
                  alt={cat.name}
                />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
