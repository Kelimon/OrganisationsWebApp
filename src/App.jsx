import * as React from "react";
import axios from "axios";
import "./App.css";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Button } from "@mui/material";
import { Paper, Grid, Card, CardContent } from "@mui/material";
import { CardMedia } from "@mui/material";
import { useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import { Login, Toll } from "@mui/icons-material";
import RegisterPage from "./pages/RegisterPage";
import AktuellePrios from "./parts/AktuellePrios";
import SimpleList from "./parts/SimpleList";
import "typeface-roboto";
import { useMediaQuery, useTheme } from "@mui/material";
import Dayjs from "dayjs";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import ToDoListPage from "./pages/mobile/ToDoListPage";
import MorgenRoutinePage from "./pages/mobile/MorgenRoutinePage";
import SchedulerPage from "./pages/mobile/SchedulerPage";
import NotizenPage from "./pages/mobile/NotizenPage";
import AktuellePriosPage from "./pages/mobile/AktuellePriosPage";
import BottomNavBar from "./components/BottomNavBar";
import GetMonatziele from "./requests/GetMonatsziele";
import GetNotizen from "./requests/getNotizen";
import GetPrios from "./requests/GetPrios";
import GetRoutine from "./requests/GetRoutine";
import GetScheduleData from "./requests/GetScheduleData";
import GetTodos from "./requests/GetTodos";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#9c27b0",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, Bodoni",
  },
});

function App() {
  //use states das weitergegeben wird
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [todos, setTodos] = useState([]);

  const [routineList, setRoutineList] = useState([]);

  const [priosData, setPriosData] = useState([]);
  const [mzieleData, setMzieleData] = useState([]);
  const [note, setNote] = useState("");
  const [meetings, setMeetings] = React.useState([]);
  const [vergangeneTodos, setVergangeneTodos] = useState([]);
  const [toLeft, setToLeft] = React.useState(false);

  console.log(currentUser);
  console.log("apppage ", isAdmin);

  React.useEffect(() => {
    const fetchTodos = async () => {
      console.log("getprios:", currentUser);
      if (currentUser) {
        const response = await GetPrios({ username: currentUser });
        console.log("response from aktuelleprios: ", response);
        if (response) {
          setPriosData(response);
        }
      }
    };

    fetchTodos();
  }, [currentUser]);

  React.useEffect(() => {
    const fetchTodos = async () => {
      console.log("getprios:", currentUser);
      const response = await GetMonatziele({ username: currentUser });
      console.log("response from monatsziele: ", response);
      if (response) {
        setMzieleData(response);
      }
    };

    fetchTodos();
  }, [currentUser]);

  React.useEffect(() => {
    const fetchTodos = async () => {
      console.log("getprios:", currentUser);
      const response = await GetRoutine({ username: currentUser });
      console.log("getroutine in morgenrotuine: ", response);
      if (response.data.days.length > 0) {
        setRoutineList(response.data.days);
      }
    };

    fetchTodos();
  }, [currentUser]);

  React.useEffect(() => {
    const fetchTodos = async () => {
      console.log("getprios:", currentUser);
      const response = await GetNotizen({ username: currentUser });
      console.log("notizen data: ", response.data.notizen);
      if (response.data.notizen.length > 0) {
        setNote(response.data.notizen);
      }
    };

    fetchTodos();
  }, [currentUser]);

  React.useEffect(() => {
    console.log("React.useeffect entered");
    const fetchTodos = async () => {
      console.log("getprios:", currentUser);
      console.log("fetchtodosentered");
      const response = await GetScheduleData({ username: currentUser });
      console.log("schedule length and data", response);
      if (response.length > 0) {
        const meetingsWithDayjsDates = response.map((meeting) => ({
          ...meeting,
          date: Dayjs(meeting.date), // convert date string or number to Dayjs object
          start: Dayjs(meeting.start), // convert start time string or number to Dayjs object
          end: Dayjs(meeting.end), // convert end time string or number to Dayjs object
        }));
        setMeetings(meetingsWithDayjsDates);
      }
    };

    fetchTodos();
  }, [currentUser]);

  React.useEffect(() => {
    const fetchTodos = async () => {
      console.log("getprios:", currentUser);
      const response = await GetTodos({ username: currentUser });
      const latestDayData = response.data.days[response.data.days.length - 1];
      console.log(latestDayData.data);
      if (latestDayData.data.length > 0) {
        setTodos(latestDayData.data);
      }
    };

    fetchTodos();
  }, [currentUser]);

  React.useEffect(() => {
    const fetchTodos = async () => {
      console.log("getprios:", currentUser);
      const response = (await GetTodos({ username: currentUser })).data.days.slice(0, -1);
      setVergangeneTodos(response);
    };

    fetchTodos();
  }, [currentUser]); // The empty array makes this useEffect act like componentDidMount - it runs once after the component mounts.
  console.log("appjs :", meetings);
  if (!isSmallScreen) {
    return (
      <ThemeProvider theme={theme}>
        <HashRouter>
          <Routes>
            <Route
              path="/home"
              element={
                <HomePage
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  isAdmin={isAdmin}
                  todos={todos}
                  setTodos={setTodos}
                  routineList={routineList}
                  setRoutineList={setRoutineList}
                />
              }
            />
            <Route
              path="/login"
              element={
                <LoginPage
                  setIsLoggedIn={setIsLoggedIn}
                  setCurrentUser={setCurrentUser}
                  currentUser={currentUser}
                  setIsAdmin={setIsAdmin}
                />
              }
            />
            <Route
              path="/forkingsuhaib"
              element={
                isAdmin ? (
                  <AdminPage currentUser={currentUser} setCurrentUser={setCurrentUser} isAdmin={isAdmin} />
                ) : (
                  <h1>unauthorized</h1>
                )
              }
            />
            <Route
              path="/register"
              element={
                <RegisterPage
                  setIsLoggedIn={setIsLoggedIn}
                  setCurrentUser={setCurrentUser}
                  currentUser={currentUser}
                  setIsAdmin={setIsAdmin}
                />
              }
            />
          </Routes>
        </HashRouter>
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
        <HashRouter>
          <Routes>
            <Route
              path="/register"
              element={
                <RegisterPage
                  setIsLoggedIn={setIsLoggedIn}
                  setCurrentUser={setCurrentUser}
                  currentUser={currentUser}
                  setIsAdmin={setIsAdmin}
                />
              }
            />
            <Route
              path="/home"
              element={
                <ToDoListPage
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  isAdmin={isAdmin}
                  todos={todos}
                  setTodos={setTodos}
                  vergangeneTodos={vergangeneTodos}
                  setVergangeneTodos={setVergangeneTodos}
                  toLeft={toLeft}
                />
              }
            />
            <Route
              path="/todolist"
              element={
                <ToDoListPage
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  isAdmin={isAdmin}
                  todos={todos}
                  setTodos={setTodos}
                  vergangeneTodos={vergangeneTodos}
                  setVergangeneTodos={setVergangeneTodos}
                  toLeft={toLeft}
                />
              }
            />
            <Route
              path="/login"
              element={
                <LoginPage
                  setIsLoggedIn={setIsLoggedIn}
                  setCurrentUser={setCurrentUser}
                  currentUser={currentUser}
                  setIsAdmin={setIsAdmin}
                />
              }
            />
            <Route
              path="/morgenroutine"
              element={
                <MorgenRoutinePage
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  isAdmin={isAdmin}
                  todos={routineList}
                  setTodos={setRoutineList}
                  toLeft={toLeft}
                />
              }
            />
            <Route
              path="/scheduler"
              element={
                <SchedulerPage
                  currentUser={currentUser}
                  meetings={meetings}
                  setMeetings={setMeetings}
                  toLeft={toLeft}
                />
              }
            />
            <Route
              path="/notizen"
              element={<NotizenPage currentUser={currentUser} note={note} setNote={setNote} toLeft={toLeft} />}
            />
            <Route
              path="/aktuelleprios"
              element={
                <AktuellePriosPage
                  currentUser={currentUser}
                  priosData={priosData}
                  setPriosData={setPriosData}
                  mzieleData={mzieleData}
                  setMzieleData={setMzieleData}
                  toLeft={toLeft}
                />
              }
            />
          </Routes>
          {currentUser && <BottomNavBar toLeft={toLeft} setToLeft={setToLeft} />}
        </HashRouter>
      </ThemeProvider>
    );
  }
}

export default App;
