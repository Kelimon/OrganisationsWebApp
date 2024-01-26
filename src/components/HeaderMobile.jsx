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
import logo from "./../assets/Logo.webp"; // if you're using Create React App
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../contexts/Auth";

function HeaderMobile({}) {
  const navigate = useNavigate();
  const { setIsLoggedIn, setIsAdmin, currentUser, isAdmin } = useAuth();

  if (false) {
    return (
      <AppBar position="static" sx={{ backgroundColor: "#13131A" }}>
        <Toolbar>
          {/* Insert your image here */}
          <img src={logo} alt="Logo" height={"50"} />
          {/* if you're using Create React App, you'd use <img src={logo} alt="Logo" /> instead */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, marginLeft: 2 }}
          >
            King Website by Panaking
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              marginTop: 1,
            }}
          >
            <Paper
              elevation={10}
              sx={{
                padding: 1,
                backgroundColor: "#333e",
                borderRadius: 4,
                marginBottom: 1,
              }}
            >
              <Typography
                variant="h6"
                component="div"
                color={"white"}
                fontSize={16}
                marginLeft={1}
                marginRight={1}
              >
                {username}
              </Typography>
            </Paper>
            {isAdmin && (
              <Button
                onClick={() => navigate("/forkingsuhaib")}
                variant="contained"
                color="warning"
                style={{ height: 35, borderRadius: 15 }}
              >
                View Users
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    );
  } else {
    return (
      <AppBar position="static" sx={{ backgroundColor: "#13131A" }}>
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
                    color={"white"}
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
}

export default HeaderMobile;
