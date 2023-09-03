// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import linkedin from "../assets/linkedin.png";
import Image from "next/image";

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
