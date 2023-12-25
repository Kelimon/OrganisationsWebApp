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
  const { setCurrentUser, currentUser, setIsLoggedIn, setIsAdmin, isAdmin } =
    useAuth();

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
      setCurrentUser(result.username);
      setIsLoggedIn(true);
      setIsAdmin(result.isAdmin);

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
      <AppBar position="fixed" style={{ backgroundColor: "black" }}></AppBar>
      <Container>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100vh"
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // Verhindert das standardmäßige Verhalten von Enter
                  handleLogin();
                }
              }}
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
