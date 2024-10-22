import React from "react";
import { Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import {  Pie, Bar, Doughnut  } from "react-chartjs-2";
import { translate } from "../lang/translate-wrapper";
import { Typography } from "@mui/material";
import ChartDataLabels from 'chartjs-plugin-datalabels';
ChartJS.register(CategoryScale,  LinearScale,  BarElement,  Title,  Tooltip,  Legend, ArcElement, ChartDataLabels);

const StyledHeading = ({ title }) => {
  const styles = () => ({
    chartHeadingStyles: {
      textAlign: "center",
      background: "linear-gradient(to bottom, transparent 50%, #cdc098 100%)",
      width: "fit-content",
      margin: "0 auto",
      fontWeight: "bold"
    },
  })

  const classes = styles()

  return(
    <Typography variant="body2" sx={classes.chartHeadingStyles}>{title}</Typography>
  )
}

export const PublicDebatePerBodyChart = (props) => {
  
  const data = {
    labels: props.data?.map(item => item.naziv),
    datasets: [
      {  
        label: translate("app.drawer.invitations"),     
        data: props.data?.map(item => item.counterPokani),
        backgroundColor: ['rgba(182, 162, 104, 0.4)'],
      },
      {  
        label: translate("app.drawer.announcements"),
        data: props.data?.map(item => item.counterIzvestuvanje),
        backgroundColor: ["rgba(194,0,43, 0.65)"],
    }
   ],
   scales: {
    xAxes: [
      {
      ticks: {
            autoSkip: false,
            maxRotation: 0,
            minRotation: 0
        }
      }
    ]
  }
  }

  const options = {
    axisX:{
      labelMaxWidth: 100,  
      labelWrap: true
   }
  }

  return (
    <>
      <StyledHeading title={props.title}/>
      <Bar data={data} options={options}/>
    </>
  )
}
export const BarChart = (props) => {
  const data = {
    labels: props.data?.map(item => item.naziv),
    datasets: [
      {       
        data: props.data?.map(item => item.counter),
        backgroundColor: "rgba(194,0,43, 0.7)",
        barThickness: 20,
        borderWidth: 1,
    }],
  }

    const options = {
      indexAxis: 'y',
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales:{
        y: {
          ticks:{
            font:{
              size: 8.5,
              weight: "bold"
            },
            width: 200
          }
        }
      }
    }
  
  return (
    <>
      <StyledHeading title={props.title}/>
      <Bar data={data} options={options}/>
    </>
  )
}

export const PieChart = (props) => {
  const data = {
    labels: props.data?.map(item => item.naziv),
    datasets: [
      {
        data: props.data?.map(item => item.counter),
        backgroundColor: [
          'rgba(182, 162, 104, 0.3)',
          "rgba(194,0,43, 0.65)",
          'rgba(93, 165, 218, 1)',
          "rgba(222, 207, 63, 1)",
          "rgba(250, 164, 58, 1)",
        ],
        borderWidth: 1,
        fontSize: '12px'
      }],
      
  }
  const options =  {
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            size: 9,
            weight: "bold"
          }
        },
        position: "top",
      },
    }
  }
  
  return (
    <>
      <StyledHeading title={props.title}/>
      <Pie 
        data={data}
        options={options}
      />
    </>
  )
}
