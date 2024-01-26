import React from "react";
import AktuellePrios from "./../parts/AktuellePrios";
import Notizen from "./../parts/Notizen";
import ToDoList from "./../parts/ToDoList";
import Chart from "./../parts/Chart";
import Verlauf from "./../parts/Verlauf";
import { useState } from "react";
import VergangeneToDos from "./../parts/VergangeneToDos";
import Monatsziele from "../parts/Monatsziele";
import MorgenRoutine from "../parts/MorgenRoutine";
import Kalender from "../parts/Kalender";
import { TextField, Button } from "@mui/material";
import Header from "../parts/Header";
import Scheduler from "../parts/Scheduler";
import { Grid } from "@mui/material";
import { styled } from "@mui/system";
import { useMediaQuery, useTheme } from "@mui/material";

const ChartGridItem = styled(Grid)(({ theme }) => ({
  order: 2,
  [theme.breakpoints.up("md")]: {
    order: 0, // Order zero is equivalent to 'first'
  },
  [theme.breakpoints.up("lg")]: {
    order: 0, // Order zero is equivalent to 'first'
  },
  [theme.breakpoints.up("xl")]: {
    order: 0, // Order zero is equivalent to 'first'
  },
}));

const AktuellePriosGridItem = styled(Grid)(({ theme }) => ({
  order: 5,
  [theme.breakpoints.up("md")]: {
    order: 3, // Order zero is equivalent to 'first'
  },
  [theme.breakpoints.up("lg")]: {
    order: 0, // Order zero is equivalent to 'first'
  },
  [theme.breakpoints.up("xl")]: {
    order: 0, // Order zero is equivalent to 'first'
  },
}));

const VergangeneGridItem = styled(Grid)(({ theme }) => ({
  order: 2,
  [theme.breakpoints.up("md")]: {
    order: 0, // Order zero is equivalent to 'first'
  },
  [theme.breakpoints.up("lg")]: {
    order: 0, // Order zero is equivalent to 'first'
  },
  [theme.breakpoints.up("xl")]: {
    order: 0, // Order zero is equivalent to 'first'
  },
}));

const ToDoGridItem = styled(Grid)(({ theme }) => ({
  order: 2,
  [theme.breakpoints.up("md")]: {
    order: 0, // Order zero is equivalent to 'first'
  },
  [theme.breakpoints.up("lg")]: {
    order: 0, // Order zero is equivalent to 'first'
  },
  [theme.breakpoints.up("xl")]: {
    order: 0, // Order zero is equivalent to 'first'
  },
}));

const MZieleGridItem = styled(Grid)(({ theme }) => ({
  order: 2,
  [theme.breakpoints.up("md")]: {
    order: 3, // Order zero is equivalent to 'first'
  },
  [theme.breakpoints.up("lg")]: {
    order: 1, // Order zero is equivalent to 'first'
  },
  [theme.breakpoints.up("xl")]: {
    order: 0, // Order zero is equivalent to 'first'
  },
}));

const VerlaufGridItem = styled(Grid)(({ theme }) => ({
  order: 2,
  [theme.breakpoints.up("md")]: {
    order: 3, // Order zero is equivalent to 'first'
  },
  [theme.breakpoints.up("lg")]: {
    order: 1, // Order zero is equivalent to 'first'
  },
  [theme.breakpoints.up("xl")]: {
    order: 0, // Order zero is equivalent to 'first'
  },
}));

const NotizenGridItem = styled(Grid)(({ theme }) => ({
  order: 2,
  [theme.breakpoints.up("md")]: {
    order: 3, // Order zero is equivalent to 'first'
  },
  [theme.breakpoints.up("lg")]: {
    order: 1, // Order zero is equivalent to 'first'
  },
  [theme.breakpoints.up("xl")]: {
    order: 0, // Order zero is equivalent to 'first'
  },
}));

const KalenderGridItem = styled(Grid)(({ theme }) => ({
  order: 2,
  [theme.breakpoints.up("md")]: {
    order: 3, // Order zero is equivalent to 'first'
  },
  [theme.breakpoints.up("lg")]: {
    order: 1, // Order zero is equivalent to 'first'
  },
  [theme.breakpoints.up("xl")]: {
    order: 0, // Order zero is equivalent to 'first'
  },
}));

const MorgenRoutineGridItem = styled(Grid)(({ theme }) => ({
  order: 2,
  [theme.breakpoints.up("md")]: {
    order: 3, // Order zero is equivalent to 'first'
  },
  [theme.breakpoints.up("lg")]: {
    order: 1, // Order zero is equivalent to 'first'
  },
  [theme.breakpoints.up("xl")]: {
    order: 0, // Order zero is equivalent to 'first'
  },
}));

const useStyles = styled((theme) => ({
  first: {
    order: 1,
    [theme.breakpoints.up("md")]: {
      order: 1,
    },
  },
  second: {
    order: 2,
    [theme.breakpoints.up("md")]: {
      order: 2,
    },
  },
  third: {
    order: 3,
    [theme.breakpoints.up("md")]: {
      order: 3,
    },
  },
  chart: {
    order: 4,
    [theme.breakpoints.up("md")]: {
      order: 0, // Order zero is equivalent to 'first'
    },
    [theme.breakpoints.up("lg")]: {
      order: 0, // Order zero is equivalent to 'first'
    },
  },
  // ... and so on
}));
function MainPage({ isAdmin }) {
  const [todos, setTodos] = useState([]);
  const [routineList, setRoutineList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const wrapperStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between", // optional: add space between the components
  };

  return (
    <>
      <Header />
      <Grid container spacing={0}>
        <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
          <ToDoList todos={todos} setTodos={setTodos} />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
          <VergangeneToDos />
        </Grid>
        <AktuellePriosGridItem item xs={12} sm={12} md={6} lg={4} xl={3}>
          <AktuellePrios />
        </AktuellePriosGridItem>
        <MZieleGridItem xs={12} sm={12} md={6} lg={4} xl={3}>
          <Monatsziele />
        </MZieleGridItem>

        <ChartGridItem item xs={12} sm={12} md={12} lg={8} xl={6}>
          {matches && <Chart todos={todos} />}
        </ChartGridItem>
        <VerlaufGridItem item xs={12} sm={12} md={6} lg={4} xl={3}>
          {matches && <Verlauf />}
        </VerlaufGridItem>
        <NotizenGridItem item xs={12} sm={12} md={6} lg={4} xl={3}>
          <Notizen />
        </NotizenGridItem>

        <KalenderGridItem item xs={12} sm={12} md={12} lg={8} xl={6}>
          <Scheduler />
        </KalenderGridItem>
        <MorgenRoutineGridItem item xs={12} sm={12} md={6} lg={4} xl={3}>
          <MorgenRoutine todos={routineList} setTodos={setRoutineList} />
        </MorgenRoutineGridItem>
      </Grid>
    </>
  );

  return <></>;
}

export default MainPage;
