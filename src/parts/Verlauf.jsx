import React from "react";
import ReactApexChart from "react-apexcharts";
import ToDoList from "./ToDoList";
import { styled } from "@mui/system";
import {
  List,
  ListItem,
  ListItemText,
  Checkbox,
  TextField,
  Button,
  Paper,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { StyledPaper } from "./../components/StyledPaper";
import "./../components/styledpaper.css";
class Verlauf extends React.Component {
  constructor(props) {
    super(props);

    // Aktuelles Datum
    const currentDate = new Date();

    // Prozentsatz des Jahres, der vergangen ist
    const yearProgress =
      ((currentDate - new Date(currentDate.getFullYear(), 0, 1)) /
        (new Date(currentDate.getFullYear() + 1, 0, 1) -
          new Date(currentDate.getFullYear(), 0, 1))) *
      100;

    // Prozentsatz des Monats, der vergangen ist
    const monthProgress =
      ((currentDate -
        new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)) /
        (new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1) -
          new Date(currentDate.getFullYear(), currentDate.getMonth(), 1))) *
      100;

    // Prozentsatz der Woche, der vergangen ist
    const weekProgress = (currentDate.getDay() / 7) * 100;

    this.state = {
      series: [
        {
          // original data
          data: [
            yearProgress.toFixed(1),
            monthProgress.toFixed(1),
            weekProgress.toFixed(1),
          ],
        },
        {
          // added data to fill the rest of the bar to 100%
          data: [
            (100 - yearProgress).toFixed(2),
            (100 - monthProgress).toFixed(2),
            (100 - weekProgress).toFixed(2),
          ],
        },
      ],
      options: {
        tooltip: {
          enabled: false, // Tooltip beim Hover deaktivieren
        },
        chart: {
          type: "bar",
          height: 350,
          toolbar: {
            show: false,
          },
          stacked: true,
        },
        plotOptions: {
          bar: {
            borderRadius: 5,
            horizontal: true,
            backgroundColor: "#ffff", // Hintergrundfarbe der Balken
            barHeight: "65%",
          },
        },
        dataLabels: {
          enabled: true, // enable data labels
          formatter: function (val, opts) {
            // only display the label for the first series
            if (opts.seriesIndex === 0) {
              return (
                opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
                "%"
              ); // format the label as percentage
            } else {
              return ""; // do not display a label for the rest bar
            }
          },
          style: {
            colors: ["#fff"], // set the color of the labels
          },
        },
        xaxis: {
          categories: ["Jahr", "Monat", "Woche"],
          labels: {
            show: false, // Entfernt die Achsenbeschriftungen
            style: {
              colors: "black", // Macht die Beschriftungen weiß
            },
          },
          axisBorder: {
            show: false, // Entfernt die Achsenlinien
          },
          axisTicks: {
            show: false, // Entfernt die Achsenticks
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: "black", // Macht die Beschriftungen weiß
            },
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        grid: {
          show: false, // Entfernt die Gitterlinien
        },
        fill: {
          colors: ["#44CDDD", "#242424"], // set the color for the added series, // Set color for each series. First color for the first series, second color for the second series
          type: "gradient",
          hover: {
            type: "darken", // Dunkler machen beim Hover
            opacity: 0.8, // Sie können die Opazität anpassen, um die Dunkelheit zu steuern
          },
          /*gradient: {
              shade: 'light',
              type: "horizontal",
              shadeIntensity: 0.25,
              gradientToColors: undefined,
              inverseColors: true,
              opacityFrom: 0.85,
              opacityTo: 0.85,
              stops: [50, 0, 100]
            }*/
        },
        // other options
        legend: {
          show: false, // hide the legend
        },
      },
    };
  }

  render() {
    return (
      <StyledPaper className="my-container">
        <div id="chart">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="bar"
            height={450}
          />
        </div>
      </StyledPaper>
    );
  }
}

export default Verlauf;
