import React from "react";
import { AppBar, Toolbar, Typography, Box, Paper, Button, Grid } from "@mui/material";
import logo from "./../assets/Logo.webp"; // if you're using Create React App
import { useNavigate } from "react-router-dom";

function HeaderMobile({ username, isAdmin }) {
  const navigate = useNavigate();

  if (false) {
    return (
      <AppBar position="static" sx={{ backgroundColor: "#13131A" }}>
        <Toolbar>
          {/* Insert your image here */}
          <img src={logo} alt="Logo" height={"50"} />
          {/* if you're using Create React App, you'd use <img src={logo} alt="Logo" /> instead */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft: 2 }}>
            King Website by Panaking
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", marginTop: 1 }}>
            <Paper elevation={10} sx={{ padding: 1, backgroundColor: "#333e", borderRadius: 4, marginBottom: 1 }}>
              <Typography variant="h6" component="div" color={"white"} fontSize={16} marginLeft={1} marginRight={1}>
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
            <Grid item xs={3}>
              <img src={logo} alt="Logo" height={"45"} style={{ marginTop: 12 }} />
            </Grid>
            <Grid item xs={9}>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Paper
                    elevation={10}
                    sx={{ padding: 1, backgroundColor: "#333e", borderRadius: 4, marginTop: 1, marginLeft: 3 }}
                  >
                    <Typography
                      variant="h6"
                      component="div"
                      color={"white"}
                      fontSize={16}
                      marginLeft={1}
                      marginRight={1}
                      align="right" // Right align the username
                    >
                      {username}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs></Grid>
          </Grid>
          {/* Insert your image here */}

          {/* if you're using Create React App, you'd use <img src={logo} alt="Logo" /> instead */}

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", marginTop: 1 }}>
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
  }
}

export default HeaderMobile;
