import axios from "axios";

async function RegisterRequest(username, password, setIsLoggedIn) {
  try {
    const response = await axios.post(
      "https://eu-west-1.aws.data.mongodb-api.com/app/application-3-qcyry/endpoint/register",
      {
        username,
        password,
      }
    );
    console.log(response);
    localStorage.setItem('username', response.data.username);
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export default RegisterRequest;
