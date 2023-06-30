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
    console.log("tokenbelow")
    console.log("token; ", response.data.token)
    // Save token in local storage
    localStorage.setItem('token', response.data.token);
    var token = localStorage.getItem('token');
    console.log("token2: ", token)
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
