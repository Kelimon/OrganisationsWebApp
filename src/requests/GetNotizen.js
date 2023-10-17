//const { MongoClient } = require('mongodb');
import axios from "axios";

async function GetNotizen({ currentUser }) {
  try {
    const response = await axios.get(
      `https://eu-west-1.aws.data.mongodb-api.com/app/application-3-qcyry/endpoint/getnotizen?username=${currentUser}`
    );
    console.log("responsenotizen!: ", response);
    return response;
  } catch (error) {
    console.error("Login errornotizen:", error);
    throw error;
  }
}

export default GetNotizen;
