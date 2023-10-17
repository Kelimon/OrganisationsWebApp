import axios from "axios";

async function LoginRequest(username, password) {
  try {
    const response = await axios.post(
      "https://eu-west-1.aws.data.mongodb-api.com/app/application-3-qcyry/endpoint/login",
      {
        username,
        password,
      }
    );
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("username", response.data.username);
    localStorage.setItem("isAdmin", response.data.isAdmin);
    return {
      username: response.data.username,
      isAdmin: response.data.isAdmin,
    };
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export default LoginRequest;
