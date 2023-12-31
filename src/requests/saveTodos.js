//const { MongoClient } = require('mongodb');
import axios from "axios";

async function saveTodos({ username, todos }) {
  console.log("savesafe")
  try {
    console.log("Sending data: ", { username, todos });
    const dayData = todos;
    if(username.length >1){
    const response = await axios.post(
      "https://eu-west-1.aws.data.mongodb-api.com/app/application-3-qcyry/endpoint/savetodos",
      {
        username,
        dayData,
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

export default saveTodos;
