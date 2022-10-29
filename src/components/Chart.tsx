import React from "react";
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
import { useAppSelector } from "../store";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const months = [
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

const createData = (bills : any) => {
  const ans: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
  bills.forEach((bill : any)=> {
    const month = bill.date.split('-')[1];
    ans[month-1] += (+bill.amount);
  })

  return ans.filter((value) => value);
}

const Chart = () => {
  const { bills } = useAppSelector((state) => state.bills);
  const labels = new Set(bills.map((bill)=> {
    return Number(bill.date.split('-')[1])-1
  })) 
  const state = {
    labels: Array.from(labels).sort((a,b) => a - b).map((month_index) => months[month_index]),
    datasets: [
      {
        label: "Bill",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: createData(bills),
      },
    ],
  };
  return (
    <div>
      <Line
        data={state}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Bills per month",
            },
            legend: {
              display: true,
              position: "right",
            },
          },
        }}
      />
    </div>
  );
};

export default Chart;
