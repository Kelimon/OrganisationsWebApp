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
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import { Login } from "@mui/icons-material";
import RegisterPage from "./pages/RegisterPage";
import AktuellePrios from "./parts/AktuellePrios";
import SimpleList from "./parts/SimpleList";
import "typeface-roboto";

import { createTheme, ThemeProvider } from "@mui/material/styles";

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

  console.log(currentUser);
  console.log("apppage ", isAdmin);
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter basename="/website">
        <Routes>
          <Route
            path="/home"
            element={<HomePage currentUser={currentUser} setCurrentUser={setCurrentUser} isAdmin={isAdmin} />}
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
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
