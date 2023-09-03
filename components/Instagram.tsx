// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import instagram from "../assets/instagram.png";
import Image from "next/image";

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
