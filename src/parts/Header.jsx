import React from "react";
import { AppBar, Toolbar, Typography, Box, Paper, Button } from "@mui/material";
import logo from "./../assets/Logo_2_verarbeitet.webp"; // if you're using Create React App
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../contexts/Auth";

function Header({}) {
  const navigate = useNavigate();
  const { setIsLoggedIn, isAdmin, currentUser } = useAuth();
  return (
    /* colors 
    #F5F5FA
    #F0F0F5
    #F2F2F8
    #F9F4F4
    #F5F0F0
    #FAF4F4
    */
    <AppBar
      position="static"
      sx={{ backgroundColor: "#FAF4F4", border: "2px solid black" }}
    >
      <Toolbar>
        {/* Insert your image here */}
        <div>
          <img src={logo} alt="Logo" height={"70"} />
        </div>

        {/* if you're using Create React App, you'd use <img src={logo} alt="Logo" /> instead */}
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, marginLeft: 2, color: "black" }}
        >
          Plana
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
              {currentUser}
            </Typography>
            <Button
              onClick={() => {
                localStorage.clear();
                setIsLoggedIn(false);
                navigate("/login");
              }}
            >
              Logout
            </Button>
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
}

export default Header;