//const { MongoClient } = require('mongodb');
import axios from "axios";

async function GetPrios({ currentUser }) {
  try {
    const response = await axios.get(
      `https://eu-west-1.aws.data.mongodb-api.com/app/application-3-qcyry/endpoint/getprios?username=${currentUser}`
    );
    console.log("response!: ", response);
    return response.data.prios;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export default GetPrios;
