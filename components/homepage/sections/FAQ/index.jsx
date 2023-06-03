import { BsPencilFill } from 'react-icons/bs'
import { FaBookOpen } from 'react-icons/fa'
import { FiLayers } from 'react-icons/fi'
import { RiBracesFill, RiSuitcaseFill } from 'react-icons/ri'
import { RxArrowTopRight } from 'react-icons/rx'
import { TbCertificate } from 'react-icons/tb'

// eslint-disable-next-line react-refresh/only-export-components
export default function FAQ () {
  const leftQuestions = [
    {
      id: 1,
      // q: 'Is this curriculum free?',
      q: 'Is this AI free?',
      // a: 'Yes, it is completely free and open source. We do not charge for any of the content on this website.',
      a: 'Yes, it is completely free. We do not charge for any of the content on this website.',
      icon: <FaBookOpen className='align-middle inline-block text-dark/500 text-xl' />
    },
    {
      id: 2,
      q: 'Do I need to know how to code?',
      a: 'Nope! However, coding is a great skill to learn alongside prompt engineering. We recommend learning Python, as it is a popular language for AI and machine learning.',
      icon: <RiBracesFill className='align-middle inline-block text-dark/500 text-xl mt-1' />
    },
    // {
    //   id: 3,
    //   q: 'When is the certificate being released?',
    //   a: 'It is coming soon! Be among the first to access the certification program as soon as it launches by joining our newsletter below.',
    //   icon: <TbCertificate className='align-middle inline-block text-dark/500 text-2xl mt-1' />
    // }
  ]

  const rightQuestions = [
    {
      id: 4,
      q: 'Do I need previous experience?',
      a: 'Nope! This course is designed to be accessible to everyone, regardless of prior experience.',
      icon: <FiLayers className='align-middle inline-block text-dark/500 text-xl mt-1' />
    },
    // {
    //   id: 5,
    //   q: 'Is prompt engineering a real job?',
    //   a: 'Yes, but most prompt engineering jobs require other skills such as coding and teaching. We prefer to view it as a skill that can be used in many different professions.',
    //   icon: <RiSuitcaseFill className='align-middle inline-block text-dark/500 text-2xl mt-1' />
    // },
    {
      id: 6,
      q: 'Can I help add to the site?',
      a: 'Yes, we are always looking for more contributors! You can find more information by clicking the contribute tab.',
      icon: <BsPencilFill className='align-middle inline-block text-dark/500 text-xl mt-1' />
    }
  ]
  return (
    <section className='px-4 md:px-56 2xl:px-96 pb-24'>
      <h2 className='text-left md:text-center text-3xl md:text-5xl font-vietnam font-medium tracking-tighter md:px-0 pt-6 md:pt-20'>Frequently Asked Questions</h2>
      <p className='text-left md:text-center text-[#4f536a] text-sm pt-2 font-vietnam font-extralight tracking-tight md:px-28 md:pt-4 md:text-md mb-4 md:mb-0'>
        Can't find what you are looking for? {' '}
        <span className='ml-1 underline'>
          <a href='#' className='underline text-[#808080]'>
            {' '}
            Contact Us
            <span className='ml-1'>
              <RxArrowTopRight
                className='inline-block text-default text-md text-[#4f536a]'
                // style={{ transform: 'translateY(3px)' }}
              />
            </span>
          </a>
        </span>
      </p>
      <div className='flex flex-col md:flex-row justify-around pt-4 md:pt-20 gap-8 md:gap-24'>
        <div className='gap-8 md:gap-12 flex-col flex'>
          {
            leftQuestions.map(question => (
              <div key={question.id} className='flex gap-4'>
                <div className='hidden md:flex items-center justify-center py-1 border border-gray/300 drop-shadow-lg bg-white rounded-lg px-4 w-[50px] h-[50px]'>
                  {question.icon}
                </div>
                <div>
                  <div className='font-semibold tracking-tighter text-xl text-left'>{question.q}</div>
                  <div className='text-[#4f536a] font-light tracking-tighter text-sm mt-1 text-left'>{question.a}</div>
                </div>
              </div>
            ))
          }
        </div>
        <div className='gap-8 md:gap-12 flex-col flex'>
          {
            rightQuestions.map(question => (
              <li key={question.id} className='flex gap-4'>
                <div className='hidden md:flex items-center justify-center py-1 border border-gray/300 drop-shadow-lg bg-white rounded-lg px-4 w-[50px] h-[50px]'>
                  {question.icon}
                </div>
                <div>
                  <div className='font-semibold tracking-tighter text-xl text-left'>{question.q}</div>
                  <div className='text-[#4f536a] font-light tracking-tighter text-sm mt-1 text-left'>{question.a}</div>
                </div>
              </li>
            ))
          }
        </div>
      </div>
    </section>
  )
}
