import DailyCard from "./children/DailyCard";
import Header from "./children/Header";
import QuotaCard from "./children/QuotaCard";
import TokenCard from "./children/TokenCard";

const Usage = () => {
  
  return (
    <>
      <Header title='Usage' />
      <div className='grid grid-cols-1 auto-rows-min lg:grid-cols-2 lg:grid-rows-[10rem_1fr] gap-5'>
        <TokenCard />
        <QuotaCard />
        <DailyCard />
      </div>
    </>
  );
};

export default Usage;
