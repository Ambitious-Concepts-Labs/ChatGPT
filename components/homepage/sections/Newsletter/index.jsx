export default function Newsletter () {
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <section className='newsletter w-screen flex flex-col justify-center items-center text-white md:p-20 pt-16 md:pt-24 pb-28'>
      <h2 className='font-semibold text-4xl md:text-6xl tracking-tight'>Join the Newsletter</h2>
      <p className='text-center text-white opacity-60 text-sm font-vietnam tracking-tight font-light px-16 md:px-28 pt-4'>
        Stay up to date with the latest content delivered to your inbox.
      </p>
      {/* <form onSubmit={handleSubmit} className='flex pt-10'>
        <input
          className='rounded-l-md px-6 py-2 bg-white text-dark/500 text-sm font-medium tracking-tight ring-0 focus:outline-none w-[250px] md:w-[450px] focus:ring-0'
          type='email'
          placeholder='email@learnprompting.org'
        />
        <button className='rounded-r-md bg-[#2A5F66] flex items-center font-semibold justify-center px-3 py-2 hover:bg-[#1F4A52] active:bg-[#2D6370] w-[100px]'>Sign Up</button>
      </form> */}

    </section>
  )
}
