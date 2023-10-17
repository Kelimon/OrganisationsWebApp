import React from "react";
import ReactApexChart from "react-apexcharts";
import ToDoList from "./ToDoList";
import { styled } from "@mui/system";
import GetTodos from "./../requests/GetTodos";
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

const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: 15, // Setzt die Rundung der Ecken
  backgroundColor: "#333e", // Dunklere Farbe für den Block
  maxHeight: 500, // Feste Größe für den Block
  height: 550,
  overflow: "auto", // Ermöglicht Scrollen, wenn der Inhalt zu groß ist
}));

class Chart extends React.Component {
  constructor(props) {
    super(props);
    let username = this.props.username;
    let todos = async () => {
      return await GetTodos({ username });
    };

    /*const last10Days = Array.from({length: 30}, (v, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toLocaleDateString();  // or use another format if you prefer
    }).reverse();*/

    this.state = {
      todospercentage: [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        this.calculateLastTodo(),
      ],
      todos: [],

      series: [
        {
          name: "Erledigte ToDos",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, this.calculateLastTodo()],
        },
      ],
      options: {
        stroke: {
          curve: "smooth", // this makes the line curvy
        },
        markers: {
          size: 0,
        },

        dataLabels: {
          enabled: false,
        },
        title: {
          text: "Erledigte ToDos der letzten Tage",
          align: "left",
          style: {
            color: "#FFF", // Color of the y-axis text
          },
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.1,
          },
        },
        xaxis: {
          categories: [],
          colors: ["#F44336", "#E91E63", "#9C27B0"],
          labels: {
            style: {
              colors: "#FFF", // Color of the y-axis text
            },
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.7,
            opacityTo: 0.3,
            stops: [0, 90, 100],
          },
        },

        yaxis: {
          min: 0,
          max: 100,
          labels: {
            formatter: function (value) {
              return value + "%"; // add a percentage sign after the number
            },
            style: {
              colors: "#FFF", // Color of the y-axis text
            },
          },
        },
        colors: ["white"], // This is purple.
        chart: {
          height: 500,
          type: "area",
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
          brush: {
            enabled: false,
            target: undefined,
            autoScaleYaxis: false,
          },
        },
      },
    };
    this.myRef = React.createRef();
  }

  async fetchTodos() {
    const username = this.props.username;
    const todos = (await GetTodos({ currentUser: username })).data.days;
    const days = todos;
    this.getCheckedPercentage(days);
    this.setState({ todos: todos }); // This will trigger a re-render
    const last10Days = () => {
      let array = [];

      // If days array is empty, add yesterday's and today's dates to the array
      if (todos.length === 0) {
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        array.push(yesterday.toLocaleDateString());
        array.push(today.toLocaleDateString());
      } else {
        let startDate = new Date(todos[0].date);

        for (let j = -1; j < todos.length; j++) {
          const tempDate = new Date(startDate); // Create a new Date object
          tempDate.setDate(tempDate.getDate() + j);
          array.push(tempDate.toLocaleDateString());
        }
      }
      return array; // or use another format if you prefer
    };

    this.setState({
      todos: todos,
      options: {
        ...this.state.options,
        xaxis: {
          categories: last10Days(),
          colors: ["#F44336", "#E91E63", "#9C27B0"],
          labels: {
            style: {
              colors: "#FFF", // Color of the y-axis text
            },
          },
        },
      },
    });
  }

  getCheckedPercentage = async (days) => {
    let checkedTasks = [];

    // Determine how many days are missi

    // Pre-fill the array with zero (or null) for the missing days
    checkedTasks = Array(1).fill(0); // or use null if you prefer

    for (let i = 0; i < days.length; i++) {
      let checkedTasksDaily = 0;
      let totalTasksDaily = 0;
      for (let j = 0; j < days[i].data.length; j++) {
        if (days[i].data[j].checked) {
          checkedTasksDaily++;
        }
        totalTasksDaily++;
      }

      if (totalTasksDaily > 0) {
        checkedTasks.push((checkedTasksDaily * 100) / totalTasksDaily);
      } else {
        checkedTasks.push(0);
      }
    }
    await this.setState({
      todospercentage: checkedTasks,
      series: [
        {
          name: "Erledigte ToDos",
          data: checkedTasks,
        },
      ],
    });
    return true;
  };

  componentDidMount() {
    this.fetchTodos();
  }

  componentDidUpdate(prevProps) {
    if (this.myRef.current) {
      this.myRef.current.scrollLeft = this.myRef.current.scrollWidth;
    }

    if (this.props.username !== prevProps.username) {
      this.fetchTodos();
    }
    // check if todos prop has changed
    if (this.props.todos !== prevProps.todos) {
      // recalculate your data here
      const lastToDo = this.calculateLastTodo();
      // update state
      let updatedArray = [...this.state.todospercentage];
      if (updatedArray.length == 1) {
        updatedArray.push(lastToDo);
      } else {
        updatedArray[updatedArray.length - 1] = lastToDo;
      }

      this.setState({
        todospercentage: updatedArray,
        series: [
          {
            name: "Erledigte ToDos",
            data: updatedArray,
          },
        ],
      });
    }
  }

  chartWidth = () => {
    if (this.state.todos.length * 50 < 840) {
      return 840;
    } else {
      return this.state.todos.length * 60;
    }
  };

  calculateLastTodo() {
    let result = 0;
    for (let i = 0; i < this.props.todos.length; i++) {
      if (this.props.todos[i].checked) {
        result++;
      }
    }
    return this.props.todos.length > 0
      ? (result * 100) / this.props.todos.length
      : 0;
  }
  render() {
    if (this.state.todos) {
      return (
        <StyledPaper ref={this.myRef}>
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="area"
            height={450}
            width={this.chartWidth()}
          />
        </StyledPaper>
      );
    } else {
      return <></>;
    }
  }
}

export default Chart;
