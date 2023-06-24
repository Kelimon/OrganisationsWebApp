//const { MongoClient } = require('mongodb');
import axios from "axios";

async function GetPrios({ username}) {
  console.log("savesafegettodos")
  try {
    console.log("username priosget: ", { username});

    const response = await axios.get(
      `https://eu-west-1.aws.data.mongodb-api.com/app/application-3-qcyry/endpoint/getprios?username=${username}`
    );
    console.log("response!: ", response);
    return response.data.prios;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export default GetPrios;
