import React, { useState, useEffect } from "react";
import faker from "faker";
import { BiPlusCircle } from "react-icons/bi";
import { FaRegChartBar } from "react-icons/fa";
import { PiClockClockwise } from "react-icons/pi";
import { RiUploadCloud2Line } from "react-icons/ri";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import Button from "../../../../components/Button";
import Card from "../../../../components/MainCard";
import CardHeader from "../../../../components/CardHeader";
import ProgressBar from "../../../../components/ProgressBar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

function dateRange(startDate: any, endDate: any, steps = 1) {
  const dateArray = [];
  const currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    dateArray.push(
      new Date(currentDate).toLocaleString("en-us", {
        month: "short",
        day: "numeric",
      }),
    );
    // Use UTC date to prevent problems with time zones and DST
    currentDate.setUTCDate(currentDate.getUTCDate() + steps);
  }

  return dateArray;
}

const date = new Date();
const y = date.getFullYear();
const m = date.getMonth();
const firstDay = new Date(y, m, 1);
const lastDay = new Date(y, m + 1, 0);

const dates = dateRange(firstDay, lastDay);
console.log(dates);

const dailyOptions = {
  responsive: true,
  plugins: {
    // legend: {
    //   position: 'top',
    // },
    // title: {
    //   display: true,
    //   text: 'Chart.js Line Chart',
    // },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const monthlyOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
  scales: {
    y: {
      min: 0, 
      max: 9000, 
    },
  },
};

const data = {
  labels: dates,
  datasets: [
    // {
    //   label: 'Dataset 1',
    //   data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
    //   borderColor: 'rgb(255, 99, 132)',
    //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
    // },
    {
      label: "Dataset 2",
      data: dates.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ] || [],
};

function LineChart() {
  const [numbers, setnumbers] = useState([]);
  const monthlyData = {
    labels,
    datasets: [
      {
        label: "Tokens Data",
        data: numbers,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  useEffect(() => {
    let tokeninfo = localStorage.getItem("TokenInfo");
    if (tokeninfo == null || tokeninfo == undefined) {
      let tokeninformation = {
        January: 0,
        Feburary: 0,
        March: 0,
        April: 0,
        May: 0,
        June: 0,
        July: 0,
        August: 0,
        September: 0,
        October: 0,
        November: 0,
        December: 0,
      };
      localStorage.setItem("TokenInfo", JSON.stringify(tokeninformation));
      setnumbers([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    } else {
      tokeninfo = JSON.parse(tokeninfo);
      console.log(tokeninfo);
      setnumbers([
        tokeninfo["January"],
        tokeninfo["Feburary"],
        tokeninfo["March"],
        tokeninfo["April"],
        tokeninfo["May"],
        tokeninfo["June"],
        tokeninfo["July"],
        tokeninfo["August"],
        tokeninfo["September"],
        tokeninfo["October"],
        tokeninfo["November"],
        tokeninfo["December"],
      ]);
    }
  }, []);

  return (
    <>
    <Line
      className="w-full"
      style={{ width: "-webkit-fill-available", height: "auto" }}
      options={dailyOptions}
      data={data}
      />
      <br />
    <h1 className="font-bold">Monthly Token Usage</h1>
    <div className="flex w-full justify-center items-center">
      {/* <div className="w-[1200px] h-[1000px] bg-white shadow-lg p-[5rem] pt-[1.5rem]"> */}
        <Line options={monthlyOptions} data={monthlyData} />
      {/* </div> */}
    </div>
    </>
  );
}

export function DailyCard() {
  return (
    <Card span>
      <CardHeader title="Daily Token Usage" icon={<FaRegChartBar />} />
      <div>
        <LineChart />
      </div>
    </Card>
  );
}

export function QuotaCard() {
  return (
    <Card>
      <CardHeader title="Quota Reset" icon={<PiClockClockwise />} />
      <div>
        <div className="flex items-center justify-between text-2xs text-slate-400">
          <div>August 9, 2023</div>
          <div>26 Days left</div>
        </div>
        <ProgressBar percentage="quota" />
      </div>
    </Card>
  );
}

export function TokenCard() {
  return (
    <Card>
      <CardHeader icon={<RiUploadCloud2Line />} title="Token Usage">
        <div>
          <Button
            variant="white"
            icon={
              <>
                <div className='absolute border-s-[1.5px] border-black rounded-s-full h-3.5 w-2.5 top-2/4 -translate-y-2/4 -left-0.5 content-[""]' />
                <BiPlusCircle className="h-full w-auto relative z-10" />
              </>
            }
            text="Upgrade"
            href="#"
          />
        </div>
      </CardHeader>
      <div>
        <div className="flex items-center justify-between text-2xs text-slate-400">
          <div>52 TK</div>
          <div>10 000 TK</div>
        </div>
        <ProgressBar percentage="token" />
      </div>
    </Card>
  );
}