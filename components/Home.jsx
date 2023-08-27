"use client";
import Banner from "./homepage/sections/Banner";
import Competition from "./homepage/sections/Competition";
import FAQ from "./homepage/sections/FAQ";
import Footer from "./homepage/sections/Footer";
import GetStarted from "./homepage/sections/GetStarted";
import Header from "./homepage/sections/Header";
import Hero from "./homepage/sections/Hero";
import JoinUs from "./homepage/sections/JoinUs";
import Newsletter from "./homepage/sections/Newsletter";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.replace("/dashboard");
    }
  }),
    [session];
  return (
    <>
      <Banner />
      <main className="bg-body overflow-x-hidden">
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
  );
}

export default Home;
