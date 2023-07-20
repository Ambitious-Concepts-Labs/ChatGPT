import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};


export default function LineChart () {
  // const dates = getFormattedDates()

  // const data = [
  //   {
  //     id: 'day',
  //     data: dates
  //   }]

  // const COLOR = '#cbd5e1'
  // const COLOR2 = '#94a3b8'
  // const PRIMARY = '#fcd495'
  // const theme = {
  //   axis: {
  //     domain: {
  //       line: {
  //         stroke: COLOR,
  //         strokeWidth: 1
  //       }
  //     },
  //     legend: {
  //       text: {
  //         fontSize: 12,
  //         fill: COLOR,
  //         outlineWidth: 0,
  //         outlineColor: 'transparent'
  //       }
  //     },
  //     ticks: {
  //       line: {
  //         stroke: COLOR,
  //         strokeWidth: 1
  //       },
  //       text: {
  //         fontSize: 11,
  //         fill: COLOR2,
  //         outlineWidth: 0,
  //         outlineColor: 'transparent'
  //       }
  //     }
  //   }
  // }

  return (
    // <ResponsiveLine
    //   data={data}
    //   theme={theme}
    //   margin={{ top: 15, right: 5, bottom: 40, left: 25 }}
    //   xScale={{ type: 'point' }}
    //   yScale={{
    //     type: 'linear',
    //     min: 'auto',
    //     max: 60,
    //     stacked: true,
    //     reverse: false
    //   }}
    //   yFormat=' >-.2f'
    //   axisTop={null}
    //   axisRight={null}
    //   colors={[PRIMARY]}
    //   colorBy='index'
    //   axisBottom={{
    //     tickSize: 0,
    //     tickPadding: 10,
    //     tickRotation: -45,
    //     legend: '',
    //     legendOffset: 0,
    //     legendPosition: 'middle'
    //   }}
    //   axisLeft={{
    //     tickSize: 5,
    //     tickPadding: 5,
    //     tickRotation: 0,
    //     legend: '',
    //     legendOffset: 0,
    //     legendPosition: 'middle',
    //     tickValues: [0, 10, 20, 30, 40, 50, 60]
    //   }}
    //   curve='monotoneX'
    //   enableGridX={false}
    //   enableGridY={false}
    //   isInteractive={false}
    //   pointColor={{ from: 'color', modifiers: [] }}
    //   pointBorderWidth={1}
    //   pointBorderColor={{ from: 'serieColor', modifiers: [] }}
    //   pointLabelYOffset={-6}
    //   enableArea
    //   enableCrosshair={false}
    //   useMesh
    //   legends={[]}
    // />
    <Line className='m-auto w-10/12 h-auto'
    style={{width: "-webkit-fill-available", height: "auto"}} options={options} data={data} />
  )
}
