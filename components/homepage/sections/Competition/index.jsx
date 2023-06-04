import Button from '../../shared/Button'
import Slider from './Slider'

export default function Competition () {
  return (
    <section className='w-full flex items-center justify-center'>
      <div className='competition rounded-2xl w-[95%] p-10 m-10 text-white pt-20 tracking-tighter'>
        <div className='flex gap-4 justify-around flex-col md:flex-row'>
          <div className='md:w-[45%] md:pl-28 md:ml-12'>
            <div className='opacity-81 text-center md:text-left text-lg font-vietnam'>Introducing The</div>
            <div className='mt-8 text-4xl tracking-tighter text-center md:text-left font-vietnam'>
              {/* <span className='font-bold'>HackAPrompt</span> Competition */}
              <span className='font-bold'>AC Prompt</span> Aid
            </div>
            <p className='opacity-75 font-light pt-8 md:text-left text-center px-4 md:px-0 leading-6 font-vietnam'>
              A beginner-friendly to producing fast and effective content.
            </p>
            {/* <p className='opacity-75 font-light pt-8 md:text-left text-center px-4 md:px-0 leading-6 font-vietnam'>
              A beginner-friendly competition that will challenge you to beat 7 levels of prompt hacking defenses. Inject, leak and defeat the sandwich defense to claim your share of over $35,000 in prizes. Ready to trick the AI? Hack our prompts anytime between May 5th and June 3rd!
            </p> */}
            <div className='flex pt-8 justify-center md:justify-start'>
              <a href='#'>
                <Button text='Register Now' variant='white' />
              </a>
            </div>
          </div>
          <div
            className='w-[550px] h-[325px] mr-[-100px] md:flex hidden'
            style={{ paddingTop: '20px', marginTop: '-20px' }}
          >
            <img src='../lock.png' loading='lazy' alt='Lock image' />
          </div>
        </div>
        <Slider />
      </div>
    </section>
  )
}
