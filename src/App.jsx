import * as React from "react";
import axios from "axios";
import "./App.css";
import { useState } from "react";
import {
  HashRouter,
  Route,
  Routes,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import RegisterPage from "./pages/RegisterPage";
import "typeface-roboto";
import { useMediaQuery, useTheme } from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import ToDoListPage from "./pages/mobile/ToDoListPage";
import MorgenRoutinePage from "./pages/mobile/MorgenRoutinePage";
import SchedulerPage from "./pages/mobile/SchedulerPage";
import NotizenPage from "./pages/mobile/NotizenPage";
import AktuellePriosPage from "./pages/mobile/AktuellePriosPage";
import BottomNavBar from "./components/BottomNavBar";
import jwtDecode from "jwt-decode";
import { useAuth } from "./contexts/Auth";

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

  const [priosData, setPriosData] = useState([]);
  const [mzieleData, setMzieleData] = useState([]);
  const [vergangeneTodos, setVergangeneTodos] = useState([]);
  const [toLeft, setToLeft] = React.useState(false);
  axios.defaults.withCredentials = true;
  React.useEffect(() => {
    async function checkAuthStatus() {
      try {
        // Authentifizierungstoken aus dem Local Storage abrufen

        const token = localStorage.getItem("token");

        if (!token) {
          setIsLoggedIn(false);
          return;
        }

        const baseUrl =
          "https://eu-west-1.aws.data.mongodb-api.com/app/application-3-qcyry/endpoint/checkAuthStatus";

        // Die URL mit dem Token als Query-Parameter anhängen
        const urlWithToken = `${baseUrl}?token=${encodeURIComponent(token)}`;
        // Senden einer Anfrage an den Server, um den Authentifizierungsstatus zu überprüfen
        const response = await axios.get(urlWithToken);
        // Wenn das Authentifizierungstoken gültig ist
        if (response.data.isAuthenticated) {
          setCurrentUser(response.data.username);
          setIsLoggedIn(true);
          setIsAdmin(response.data.isAdmin);
          //)
          //
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    }

    checkAuthStatus();
  }, []);
  function decodeToken(token) {
    try {
      return jwtDecode(token);
    } catch (e) {
      return null;
    }
  }
  if (!isSmallScreen) {
    return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route
              path="/home"
              element={
                isLoggedIn ? (
                  <HomePage todos={todos} setTodos={setTodos} />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
            <Route
              path="/login"
              element={
                isLoggedIn ? <Navigate replace to="/home" /> : <LoginPage />
              }
            />
            <Route
              path="/forkingsuhaib"
              element={isAdmin ? <AdminPage /> : <h1>unauthorized</h1>}
            />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/home"
              element={
                <ToDoListPage
                  vergangeneTodos={vergangeneTodos}
                  setVergangeneTodos={setVergangeneTodos}
                  toLeft={toLeft}
                />
              }
            />
            <Route
              path="/todolist"
              element={
                isLoggedIn ? (
                  <ToDoListPage
                    vergangeneTodos={vergangeneTodos}
                    setVergangeneTodos={setVergangeneTodos}
                    toLeft={toLeft}
                  />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
            <Route
              path="/login"
              element={
                isLoggedIn ? <Navigate replace to="/todolist" /> : <LoginPage />
              }
            />
            <Route
              path="/morgenroutine"
              element={<MorgenRoutinePage toLeft={toLeft} />}
            />
            <Route
              path="/scheduler"
              element={<SchedulerPage toLeft={toLeft} />}
            />
            <Route path="/notizen" element={<NotizenPage toLeft={toLeft} />} />
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
          {isLoggedIn && <BottomNavBar toLeft={toLeft} setToLeft={setToLeft} />}
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}

export default App;
