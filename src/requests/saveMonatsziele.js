import axios from "axios";

async function saveMonatsziele({ username, mzieleData }) {
  console.log("savesafeinmzielesave")

  // Get token from local storage
  const token = localStorage.getItem('token');
  console.log("tokensave is", token)

  try {
    console.log("Sending data: ", { username, mzieleData});
    if(username.length >1){
    const response = await axios.post(
      "https://eu-west-1.aws.data.mongodb-api.com/app/application-3-qcyry/endpoint/savemonatsziele",
      {
        username,
        mzieleData,
      },
      {
        headers: {
          'Authorization': token
        }
      }
    );
    console.log("responsesavemonatsziele: ", response);
    }
    return;
  } catch (error) {
    console.error("Login error from savemonatsziele:", error);
    throw error;
  }
}

export default saveMonatsziele;
