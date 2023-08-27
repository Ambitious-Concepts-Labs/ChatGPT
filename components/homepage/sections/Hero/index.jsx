import Button from "../../../SharedButton";
import Slider from "./Slider";

export default function Hero() {
  return (
    <section className="pb-10 px-4 md:px-20 lg:px-56 2xl:px-96">
      <h1 className="text-center text-3xl md:text-7xl md:font-medium font-semibold lg:px-8 2xl:px-32 pt-8 font-vietnam tracking-tighter">
        Your Guide to Communicating with Artificial Intelligence
      </h1>
      <p className="text-center custom-gray text-sm font-light px-4 md:px-10 lg:px-20 xl:px-60 pt-8 font-vietnam tracking-tighter">
        Start using ChatGPT and other AI tools to accomplish your goals using
        our free service designed for all skill levels!
      </p>
      <div className="flex items-center justify-center pt-6">
        <Button text="Start Prompting" />
      </div>
      <Slider />
    </section>
  );
}
