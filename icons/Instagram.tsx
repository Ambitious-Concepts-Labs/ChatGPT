// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Image from "next/image";
import instagram from "../assets/instagram.png";

export default function Instagram() {
  return (
    <Image 
      className="h-full w-auto rounded-full"
      src={instagram}
      width={180}
      height={180}
      alt="Instagram logo"
    />
  );
}
