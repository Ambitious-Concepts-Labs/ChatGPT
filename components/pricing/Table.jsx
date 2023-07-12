import { data, titles } from '../../utils/data/tableData'

export default function Table () {
  return (
    <div className='w-full border-separate border-spacing-y-3'>
      <div className='h-16 flex w-full mb-6 lg:mb-3'>
        {
            titles.map((title, i) => (
              <div
                key={i} className={`w-1/3 lg:w-1/4 text-center font-semibold flex items-center justify-center lg:bg-transparent lg:text-black 
              ${i === 0
                ? 'hidden lg:block'
                : i === 1
                  ? 'text-white bg-[#009e8b] rounded-s-lg'
                  : i === 2
                  ? 'text-white bg-[#019281]'
                  : i === 3
                    ? 'text-white bg-[#024c43] rounded-e-lg'
                    : ''
              }
              `}
              >
                {title}
              </div>
            ))
          }
      </div>
      <div className='flex flex-col gap-6 lg:gap-3 w-full'>
        {
          data.map((feat, i) => (
            <div key={i}>
              <div className='text-center mb-6 text-sm font-semibold lg:hidden'>{feat.title}</div>
              <div className='h-20 flex'>
                {
                Object.values(feat).map((value, j) => (
                  <div
                    key={j}
                    className={`text-sm w-1/3 lg:w-1/4 flex items-center  
                  ${j === 0
                    ? 'hidden lg:flex font-semibold '
                    : j === 1
                    ? ' justify-center text-center text-white bg-[#009e8b] rounded-s-lg lg:rounded-none'
                    : j === 2
                    ? ' justify-center text-center text-white bg-[#019281]'
                    : j === 3
                    ? ' justify-center text-center text-white bg-[#024c43] rounded-e-lg'
                    : ''}
                    `}
                  >
                    {value}
                  </div>
                ))
              }
              </div>

            </div>
          ))
        }
      </div>
    </div>
  )
}
