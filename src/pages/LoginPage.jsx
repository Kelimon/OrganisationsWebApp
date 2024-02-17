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
import { useAuth } from "./../contexts/Auth";

function LoginPage({}) {
  //use states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [credentialsInvalid, setCredentialsInvalid] = useState(false);
  const navigate = useNavigate();
  const [profile, setProfile] = useState("");
  const { setCurrentUser, setIsLoggedIn, setIsAdmin } = useAuth();

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
  const handleLogin = async () => {
    try {
      const result = await LoginRequest(email, password);

      if (result.isAdmin == true) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }

      setCurrentUser(result.username);
      setIsLoggedIn(true);
      navigate("/home");
    } catch (error) {
      setCredentialsInvalid(true);
    }
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
      <AppBar
        position="fixed"
        style={{ backgroundColor: "black", width: "19px" }}
      ></AppBar>
      <Container>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100vh"
        >
          <Paper
            elevation={10}
            sx={{
              padding: "2rem",
              borderRadius: "1rem",
              maxWidth: "80%", // Maximale Breite des Login-Papers
              width: "600px", // Breite des Login-Papers als Prozentsatz des Container-Elements
              // Wenn Sie eine feste Breite möchten, ersetzen Sie '100%' durch z.B. '400px'
            }}
          >
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // Verhindert das standardmäßige Verhalten von Enter
                  handleLogin();
                }
              }}
              fullWidth
              margin="normal"
            />
            {credentialsInvalid ? (
              <Typography color="error" minWidth={"50%"}>
                Email or password incorrect.
              </Typography>
            ) : (
              <Typography minWidth={"710px"}></Typography>
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
