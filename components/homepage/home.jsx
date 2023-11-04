"use client";
import Banner from './sections/Banner'
import Competition from './sections/Competition'
import FAQ from './sections/FAQ'
import Footer from './sections/Footer'
import GetStarted from './sections/GetStarted'
import Header from './sections/Header'
import Hero from './sections/Hero'
import JoinUs from './sections/JoinUs'
import Newsletter from './sections/Newsletter'
import { useRouter } from "next/navigation";
import { UserAuth } from "../../app/authContext";

function Home () {
  const { user } = UserAuth();
  const router = useRouter();

  if (user) router.push('/dashboard')
  return (
    <>
      <Banner />
      <main className='bg-body overflow-x-hidden'>
        <Header />
        <Hero />
        <JoinUs />
        <Competition />
        <FAQ />
        <Newsletter />
        <GetStarted />
      </main>
      <Footer />
    </>
  )
}

export default Home
