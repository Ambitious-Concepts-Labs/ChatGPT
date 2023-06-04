import { RxArrowTopRight } from 'react-icons/rx'

export default function Footer () {
  const socialLinks = {
    'Discord': '', 
    'GitHub': 'https://github.com/Ambitious-Concepts-Labs', 
    'Twitter': '', 
    'Contact': ''
  }
  return (
    <footer className='px-4 md:px-56 2xl:px-96 bg-gray-100 py-12 sm:py-16 border border-black flex flex-col sm:flex-row justify-between font-vietnam tracking-tight text-[#4F536A]'>
      <div className='hidden sm:flex font-light'>
        © 2023 AC Labs - Prompting
      </div>
      <div className='flex gap-4'>
        {Object.entries(socialLinks).map(([key, link], i) => (
          <>
          <div key={i} className='group flex items-center text-black hover:text-dark/500'>
            <a href={link} className='group-hover:underline transition-all mr-1 font-vietnam tracking-tight font-light'
            target='_blank' rel='noreferrer'>
              {key}
            </a>
            <RxArrowTopRight className='inline-block text-[#4F536A] group-hover:text-black' />
          </div>
          </>
        ))}
      </div>
      <div className='flex sm:hidden mt-4 sm:mt-0 font-light'>
        © 2023 AC Labs - Prompting
      </div>
    </footer>
  )
}
