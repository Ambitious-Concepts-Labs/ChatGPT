import Banner from './sections/Banner'
import Competition from './sections/Competition'
import FAQ from './sections/FAQ'
import Footer from './sections/Footer'
import GetStarted from './sections/GetStarted'
import Header from './sections/Header'
import Hero from './sections/Hero'
import JoinUs from './sections/JoinUs'
import Newsletter from './sections/Newsletter'

function Home () {
  return (
    <>
      <Banner />
      <main className='bg-body overflow-x-hidden'>
        <Header />
        <Hero />
        <JoinUs />
        <Competition />
        {/* eslint-disable-next-line react/jsx-pascal-case */}
        <FAQ />
        <Newsletter />
        <GetStarted />
      </main>
      <Footer />
    </>
  )
}

export default Home
