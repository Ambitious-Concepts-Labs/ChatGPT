import Image from "next/image";
import logo from "../assets/logo.svg";

function Logo() {
  return (
    <div className="col-start-1 justify-self-center row-start-1 rounded-full overflow-hidden bg-black text-white w-8 h-8 flex items-center justify-center">
      <Image src={logo} alt="Logo" className="h-6 w-6" />
    </div>
  );
}

export default Logo;