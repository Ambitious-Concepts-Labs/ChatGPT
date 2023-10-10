// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Image from "next/image";
import linkedin from "../assets/linkedin.png";

export default function Linkedin() {
  return (
    <Image 
      className="h-full w-auto rounded-full"
      src={linkedin}
      width={180}
      height={180}
      alt="Linkedin To logo"
    />
  );
}
