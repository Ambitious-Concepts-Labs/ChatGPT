"use client";
import React from "react";
import { Header, Footer } from "./(components)/components";

const BaseLayout = (props: any) => {
  const { children } = props
  return (
    <>
      <div className={`flex flex-col ${"overflow-hidden"}`}>
         <Header />
         { children }
         <Footer />
      </div>
    </>
  );
};

export default BaseLayout;