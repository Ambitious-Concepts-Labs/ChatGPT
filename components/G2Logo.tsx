// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import g2Logo from "../assets/G2_Crowd_logo.png";

export default function G2Logo() {
  return (
    <img
      className="h-full w-auto"
      src={g2Logo}
      alt="G2 logo"
      height={180}
      width={175}
    />
  );
}