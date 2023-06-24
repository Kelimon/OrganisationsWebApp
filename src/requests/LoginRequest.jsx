import axios from "axios";

async function LoginRequest(username, password, setIsLoggedIn, setCurrentUser, currentUser, setIsAdmin) {
  try {
    const response = await axios.post(
      "https://eu-west-1.aws.data.mongodb-api.com/app/application-3-qcyry/endpoint/login",
      {
        username,
        password,
      }
    );
    console.log("response!: ", response);
    setCurrentUser(response.data.username);
    if(response.data.username == "suhaibking"){
      setIsAdmin(true)
    }
    console.log("Loginreqeust: ",currentUser)
    return;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export default LoginRequest;
