import Table from '../components/pricing/Table'
import appointment from '../assets/appointment.svg'
import PriceCard from '../components/PriceCard'
import Footer from '../components/pricing/Footer'
import Header from '../components/pricing/Header'
import plans from '../utils/data/plans'
import faqs from '../utils/data/faqs'
import Image from 'next/image';
import '../styles/loader.css'
import React from 'react'

export default function Pricing () {
  const [loading, setLoading] = React.useState(false);

  return (
    <>
      { loading &&
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          <h2 className="text-center text-white text-xl font-semibold">Loading...</h2>
          <p className="w-1/3 text-center text-white">This may take a few seconds, please don't close this page.</p>
        </div>
      }
      <div className='relative '>
        <div className='bg-c-green text-white min-h-full custom-height relative'>
          <Header />
          <div className='py-10 px-5 lg:px-8 lg:py-14'>
            <h1 className='text-center text-3xl lg:text-4xl font-bold'>
              Pricing & plans
            </h1>
            <p className='text-center text-lg pt-3 font-light'>
              Whether you're a Student, Freelancer or an Agency, we have the plan that's right for you.
            </p>
          </div>
          <div className='hidden lg:block absolute top-[18%]'>
            <Image
              src={appointment} 
              alt='appointment'
            />
          </div>
        </div>
        <div className='relative h-[1200px] sm:h-[800px] lg:h-[416px]'>
          <ul className='grid grid-rows-3 sm:grid-rows-2 lg:grid-rows-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-x-8 lg:gap-7 px-5 lg:px-8 absolute -top-[20%] sm:-top-1/4 lg:-top-2/4'>
            {
              plans.map(plan => (
                <PriceCard loading={loading} setLoading={setLoading} key={plan.id} plan={plan} />
              ))
            }
          </ul>
        </div>
      </div>
      <div className='px-5 lg:px-8 pb-20'>
        <Table />
      </div>
      <div className='bg-c-green'>
        <div className='flex flex-col lg:flex-row px-5 lg:px-8 py-20 text-white'>
          <div className='w-2/4 pb-12 lg:pb-0'>
            <h2 className='text-3xl lg:text-4xl font-bold'>FAQ</h2>
          </div>
          <div className='flex flex-col gap-9'>
            {
              faqs.map(faq => (
                <div key={faq.id}>
                  <div className='font-semibold mt-2 text-lg'>{faq.question}</div>
                  <div className='mt-2'>{faq.answer}</div>
                </div>
              ))
            }
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
