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

    return {
      username: response.data.username,
      isAdmin: response.data.isAdmin,
    };
  } catch (error) {
    throw error;
  }
}

export default LoginRequest;
