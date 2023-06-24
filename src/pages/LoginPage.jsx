import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  AppBar,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoginRequest from "./../requests/LoginRequest";

/**
 * Login page component.
 *
 * @param {Dispatch<SetStateAction<boolean>>} setIsLoggedIn - function om login status zu setten
 * @returns {JSX.Element} jsx elements von loginpage.
 */
function LoginPage({ setIsLoggedIn, setCurrentUser, currentUser, setIsAdmin }) {
  //use states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [credentialsInvalid, setCredentialsInvalid] = useState(false);
  const navigate = useNavigate();
  const [profile, setProfile] = useState("");

  /**
   * email input ändern
   *
   * @param {Object} e - Event object.
   */
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  /**
   * password input ändern.
   *
   * @param {Object} e - Event object.
   */
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  /**
   * function für login
   */
  const handleLogin = () => {
    LoginRequest(email, password, setIsLoggedIn, setCurrentUser, currentUser, setIsAdmin)
      .then((result) => {
        console.log("Logged in:", result);
        console.log("loginpage: ",currentUser)
        if(currentUser == "suhaibking"){
          console.log("entered setadmin")
          setIsAdmin(true)
        }
        navigate("/home");
      })
      .catch((error) => {
        console.error("Login error:", error);
        setCredentialsInvalid(true);
      });
  };

  /**
   * function für register
   */
  const handleRegister = () => {
    navigate("/register");
  };

  /**
   * profile change ändern.
   *
   * @param {Object} e - Event object.
   */
  const handleProfileChange = (e) => {
    setProfile(e.target.value);
  };

  return (
    <>
      <AppBar position="fixed" style={{ backgroundColor: "black" }}></AppBar>
      <Container minWidth="lg">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100vh"
          width={1200}
        >
          <Paper elevation={10} sx={{ padding: "2rem", borderRadius: "1rem" }}>
            <Typography variant="h4" gutterBottom>
              Login
            </Typography>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              fullWidth
              margin="normal"
            />
            {credentialsInvalid && (
              <Typography color="error" sx={{ minWidth: "100%" }}>
                Email or password incorrect.
              </Typography>
            )}

            <Button
              variant="contained"
              color="primary"
              onClick={handleLogin}
              fullWidth
              size="large"
              sx={{ marginTop: "1rem" }}
            >
              Login
            </Button>

            <Grid container spacing={0} sx={{ marginTop: "1rem" }}>
              <Grid item xs={12} textAlign="right">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleRegister}
                  size="large"
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>
    </>
  );
}

export default LoginPage;
