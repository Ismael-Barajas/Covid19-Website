import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";

const Chart = ({
  data: { confirmed, recovered, deaths },
  country,
  timeline,
}) => {
  const [dailyData, setDailyData] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };
    fetchAPI();
  }, []);

  const timelineChart = country ? (
    <Line
      data={{
        labels: Object.keys(timeline.cases),
        datasets: [
          {
            data: Object.values(timeline.cases),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: Object.values(timeline.deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255,0,0,0.5)",
            fill: true,
          },
        ],
      }}
      options={{
        title: {
          display: true,
          text: `Historical data in ${country}`,
          fontSize: 25,
        },
      }}
    />
  ) : null;

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255,0,0,0.5)",
            fill: true,
          },
        ],
      }}
      options={{
        title: { display: true, text: `Global Historical data`, fontSize: 25 },
      }}
    />
  ) : null;

  const projectedBarChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Deaths"],
        datasets: [
          {
            label: "Current Reported",
            backgroundColor: ["rgba(0, 255, 0, 0.5)", "rgba(0, 255, 0, 0.5)"],
            hoverBackgroundColor: ["rgba(0, 77, 153)", "rgba(30, 102, 49)"],
            data: [confirmed.value, deaths.value],
          },
          {
            label: "Current Projected",
            backgroundColor: ["rgba(0, 0, 255, 1)", "rgba(0, 0, 255, 1)"],
            hoverBackgroundColor: ["rgba(0, 77, 153)", "rgba(30, 102, 49)"],
            data: [confirmed.value * 10, deaths.value * 1000],
          },
        ],
      }}
      options={{
        title: {
          display: true,
          text: `Projected state in ${country}`,
          fontSize: 25,
        },
        scales: {
          yAxes: [
            {
              type: "logarithmic",
              position: "left",
            },
          ],
        },
      }}
    />
  ) : null;

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths", "Active"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
              "rgba(242, 234, 0, 0.5)",
            ],
            hoverBackgroundColor: [
              "rgba(0, 77, 153)",
              "rgba(30, 102, 49)",
              "rgba(255, 51, 51)",
              "rgba(204, 153, 0)",
            ],
            data: [
              confirmed.value,
              recovered.value,
              deaths.value,
              confirmed.value - (recovered.value + deaths.value),
            ],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: {
          display: true,
          text: `Current state in ${country}`,
          fontSize: 25,
        },
      }}
    />
  ) : null;

  return [
    <div key="1" className={styles.container}>
      {country ? barChart : ""}{" "}
    </div>,
    <div key="2" className={styles.container}>
      {country ? timelineChart : lineChart}{" "}
    </div>,
    <div key="3" className={styles.container}>
      {country ? projectedBarChart : ""}{" "}
    </div>,
  ];
};

export default Chart;
