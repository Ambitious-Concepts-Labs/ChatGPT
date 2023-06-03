import { RxArrowTopRight } from 'react-icons/rx'

export default function Header () {
  const innerLinks = ['Learn', 'Competition', 'Contribute', 'Newsletter', 'Blog']
  const socialLinks = {
    'Discord': '', 
    'GitHub': 'https://github.com/Ambitious-Concepts-Labs', 
    'Twitter': '', 
    'Contact': ''
  }
  return (
    <header className='px-4 md:px-56 2xl:px-96'>
      <nav className='md:flex hidden justify-between py-12'>
        <div className='flex'>
          {
            innerLinks.map(link => (
              <a key={link} href='#' className='custom-gray hover:text-dark/500 transition-all text-sm tracking-tight font-extralight mr-8 font-vietnam'>{link}</a>
            ))
          }
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
              </div>`
            </>
          ))}
        </div>
      </nav>
    </header>
  )
}
