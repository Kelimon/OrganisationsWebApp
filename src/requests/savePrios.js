//const { MongoClient } = require('mongodb');
import axios from "axios";

async function savePrios({ username, priosData }) {
  console.log("savesafeinpriossave")
  try {
    console.log("Sending data: ", { username, priosData});
    if(username.length >1){
    const response = await axios.post(
      "https://eu-west-1.aws.data.mongodb-api.com/app/application-3-qcyry/endpoint/saveprios",
      {
        username,
        priosData,
      }
    );
    console.log("response!: ", response);
    }
    return;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export default savePrios;
