import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Paper,
  Button,
  Grid,
  Accordion,
} from "@mui/material";
import logo from "./../assets/Logo_2_verarbeitet.webp"; // if you're using Create React App
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../contexts/Auth";

function HeaderMobile({}) {
  const navigate = useNavigate();
  const { setIsLoggedIn, setIsAdmin, currentUser, isAdmin, setCurrentUser } =
    useAuth();

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "white", borderRadius: 3 }}
    >
      <Toolbar>
        <Grid container>
          <Grid item xs={2}>
            <img
              src={logo}
              alt="Logo"
              height={"45"}
              style={{ marginTop: 12 }}
            />
          </Grid>
          <Grid item xs={10}>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography
                  variant="h6"
                  component="div"
                  color={"black"}
                  fontSize={16}
                  marginLeft={1}
                  marginRight={1}
                  align="right" // Right align the username
                >
                  {currentUser}
                </Typography>
                <Button
                  onClick={() => {
                    localStorage.clear();
                    setIsLoggedIn(false);
                    navigate("/login");
                  }}
                  fontSize={10}
                  sx={{
                    marginTop: "-10px",
                    marginLeft: "200px",
                    paddingBottom: "0px",
                  }}
                >
                  Logout
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs></Grid>
        </Grid>
        {/* Insert your image here */}

        {/* if you're using Create React App, you'd use <img src={logo} alt="Logo" /> instead */}

        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </AppBar>
  );
}

export default HeaderMobile;
