//const { MongoClient } = require('mongodb');
import axios from "axios";

async function GetRoutine({ currentUser }) {
  try {
    const response = await axios.get(
      `https://eu-west-1.aws.data.mongodb-api.com/app/application-3-qcyry/endpoint/getroutine?username=${currentUser}`
    );
    console.log("responsegetroutine!: ", response);
    return response;
  } catch (error) {
    console.error("Login errorgetroutine:", error);
    throw error;
  }
}

export default GetRoutine;
