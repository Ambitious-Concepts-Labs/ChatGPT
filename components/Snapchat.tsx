// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Image from "next/image";
import snapchat from "../assets/snapchat.png";

export default function Snapchat() {
  return (
    <Image 
      className="h-full w-auto rounded-full"
      src={snapchat}
      width={180}
      height={180}
      alt="Snapchat logo"
    />
  );
}
