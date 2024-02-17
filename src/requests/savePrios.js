//const { MongoClient } = require('mongodb');
import axios from "axios";

async function savePrios({ currentUser, priosData }) {
  const username = currentUser;
  console.log("saving prios", priosData);
  try {
    if (currentUser.length > 1) {
      const response = await axios.post(
        "https://eu-west-1.aws.data.mongodb-api.com/app/application-3-qcyry/endpoint/saveprios",
        {
          username,
          priosData,
        }
      );
    }
    return;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export default savePrios;
