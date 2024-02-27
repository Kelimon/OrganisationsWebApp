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
        // Senden einer Anfrage an den Server, um den Authentifizierungsstatus zu überprüfen
        const response = await axios.get(
          "https://eu-west-1.aws.data.mongodb-api.com/app/application-3-qcyry/endpoint/checkAuthStatus"
        );
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
    return <h1>not small screen</h1>;
  } else {
    return <h1>small screen</h1>;
  }
}

export default App;
