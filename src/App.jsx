import * as React from "react";
import axios from "axios";
import "./App.css";
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
import GetNotizen from "./requests/GetNotizen";
import GetPrios from "./requests/GetPrios";
import GetRoutine from "./requests/GetRoutine";
import GetScheduleData from "./requests/GetScheduleData";
import GetTodos from "./requests/GetTodos";
import jwtDecode from "jwt-decode";
import { useAuth } from "./contexts/Auth";

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
  const {
    currentUser,
    setCurrentUser,
    isAdmin,
    setIsAdmin,
    isLoggedIn,
    setIsLoggedIn,
  } = useAuth();
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

  React.useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      try {
        setCurrentUser(username);
        setIsLoggedIn(true);
        setIsAdmin(localStorage.getItem("isAdmin"));
      } catch (e) {
        // If there's an error decoding the token, handle it here.
        console.error(e);
      }
    }
  }, []);
  function decodeToken(token) {
    try {
      return jwtDecode(token);
    } catch (e) {
      console.error("Failed to decode token", e);
      return null;
    }
  }
  if (!isSmallScreen) {
    return (
      <ThemeProvider theme={theme}>
        <HashRouter>
          <Routes>
            <Route
              path="/home"
              element={
                isLoggedIn ? (
                  <HomePage
                    todos={todos}
                    setTodos={setTodos}
                    routineList={routineList}
                    setRoutineList={setRoutineList}
                  />
                ) : (
                  <LoginPage />
                )
              }
            />
            <Route
              path="/login"
              element={
                isLoggedIn ? (
                  <HomePage
                    todos={todos}
                    setTodos={setTodos}
                    routineList={routineList}
                    setRoutineList={setRoutineList}
                  />
                ) : (
                  <LoginPage />
                )
              }
            />
            <Route
              path="/forkingsuhaib"
              element={isAdmin ? <AdminPage /> : <h1>unauthorized</h1>}
            />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </HashRouter>
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
        <HashRouter>
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/home"
              element={
                <ToDoListPage
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
                isLoggedIn ? (
                  <ToDoListPage
                    todos={todos}
                    setTodos={setTodos}
                    vergangeneTodos={vergangeneTodos}
                    setVergangeneTodos={setVergangeneTodos}
                    toLeft={toLeft}
                  />
                ) : (
                  <LoginPage />
                )
              }
            />
            <Route
              path="/morgenroutine"
              element={
                <MorgenRoutinePage
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
                  meetings={meetings}
                  setMeetings={setMeetings}
                  toLeft={toLeft}
                />
              }
            />
            <Route
              path="/notizen"
              element={
                <NotizenPage note={note} setNote={setNote} toLeft={toLeft} />
              }
            />
            <Route
              path="/aktuelleprios"
              element={
                <AktuellePriosPage
                  priosData={priosData}
                  setPriosData={setPriosData}
                  mzieleData={mzieleData}
                  setMzieleData={setMzieleData}
                  toLeft={toLeft}
                />
              }
            />
          </Routes>
          {currentUser && (
            <BottomNavBar toLeft={toLeft} setToLeft={setToLeft} />
          )}
        </HashRouter>
      </ThemeProvider>
    );
  }
}

export default App;