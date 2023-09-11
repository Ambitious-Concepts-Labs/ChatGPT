import logo from "../../../assets/logo.svg";
import FacebookIcon from "../../../components/FacebookIcon";
import LinkedinIcon from "../../../components/LinkedinIcon";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex items-center justify-between py-8 px-5 lg:px-8 text-white border-t border-white/20">
      <div className="h-10 w-24 flex items-center">
        <Image src={logo} width={199} height={43} alt="Logo" />
      </div>
      <div className="hidden sm:block">
        © 2021 Writier. Made with 💖 in Paris
      </div>
      <div className="flex items-center gap-3">
        <a href="#" className="group h-9 w-9 p-2 hover:bg-white rounded-full">
          <LinkedinIcon className="fill-white h-full w-auto group-hover:fill-green-800" />
        </a>
        <a href="#" className="group h-9 w-9 p-2.5 hover:bg-white rounded-full">
          <FacebookIcon className="fill-white h-full w-auto group-hover:fill-green-800" />
        </a>
      </div>
    </footer>
  );
}