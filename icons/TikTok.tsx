// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Image from "next/image";
import tikTok from "../assets/tikTok.png";

export default function TikTok() {
  return (
    <Image 
    className="h-full w-auto"
    src={tikTok} 
    alt="TikTok"
    height={180}
    width={175}
    />
  );
}