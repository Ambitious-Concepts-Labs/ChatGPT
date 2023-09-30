export default function JoinUs () {
  const stats = [
    {
      num: '20',
      text: 'Clients & Platforms'
    },
    {
      num: '5',
      text: 'Team Members'
    },
    {
      num: '60',
      text: 'AI Modules'
    },
    {
      num: '2',
      text: 'Languages'
    }
    // {
    //   num: '900K',
    //   text: 'People Learning'
    // },
    // {
    //   num: '40K',
    //   text: 'Discord Members'
    // },
    // {
    //   num: '60',
    //   text: 'Content Modules'
    // },
    // {
    //   num: '9',
    //   text: 'Languages'
    // }
  ]
  return (
    <section>
        <div className='text-center text-2xl md:text-5xl tracking-tighter font-semibold md:font-medium px-4 md:px-32 md:pt-15 lg:px-[200px] font-vietnam'>
          <span>Create post with our community.</span>
          <br />
          <span>Elevate your prompting skills.</span>
          <div className='text-center text-default text-sm font-vietnam font-light tracking-tight px-4 md:px-56 pt-10'>
            Become part of a AI network used for various platforms, with all levels of skills effectively increasing engagment with our AI.
          </div>
        </div>
        <div className='flex flex-col gap-8 md:gap-0 md:flex-row items-center justify-between px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-32 text-transparent bg-clip-text bg-gradient-to-r from-[#005046] to-[#027F75] pt-14 pb-10 max-w-screen-xl mx-auto'>
          {
            stats.map(stat => (
              <div key={stat.text}>
                <div className='font-bold text-7xl font-vietnam tracking-tighter'>{stat.num}+</div>
                <div className='text-slate-950 font-medium mt-1 text-center md:text-left font-vietnam tracking-tighter'>{stat.text}</div>
              </div>
            ))
          }
        </div>
      </section>
  )
}
