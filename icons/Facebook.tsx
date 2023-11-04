// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Image from "next/image";
import facebook from "../assets/facebook.png";

export default function Facebook() {
  return (
    <Image 
      className="h-full w-auto rounded-full"
      src={facebook}
      width={180}
      height={175}
      alt="facebook To logo"
    />
  );
}
