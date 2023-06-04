import Button from '../../shared/Button'

export default function GetStarted () {
  return (
    <section className='px-4 md:px-56 2xl:px-96 flex flex-col md:flex-row gap-4 justify-between items-center pt-16 md:pt-24 pb-16 md:pb-24'>
      <div className='items-center md:w-[60%]'>
        <div className='text-center md:text-left text-5xl md:text-7xl font-vietnam font-medium tracking-tighter pt-16'>
          <h2>Get Started</h2>
          {/* <p className='text-center md:text-left text-default text-2xl font-light tracking-tight pt-6 px-12 md:px-0'>
            Join 900K+ learners mastering the skill of communicating with AI
          </p> */}
          <p className='text-center md:text-left text-default text-2xl font-light tracking-tight pt-6 px-12 md:px-0'>
            Join our team and start mastering the skill of communicating with AI
          </p>
          <div className='flex justify-center md:justify-start pt-8 text-[1rem] tracking-tighter mb-12 mt-1'>
            <Button text='Start Prompting' />
          </div>
        </div>
      </div>
      <div className='w-full md:w-1/2 flex items-center'>
        <img
          src='../robot2.png'
          loading='lazy'
          alt='Robot'
          className='mx-auto md:ml-[80px] md:h-auto h-[300px]'
        />
        {/* <img
          src='../sitting_astronaut.png'
          loading='lazy'
          alt='Sitting Astronaut'
          className='mx-auto md:ml-[80px] md:h-auto h-[300px]'
        /> */}
      </div>
    </section>
  )
}
