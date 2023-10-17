//const { MongoClient } = require('mongodb');
import axios from "axios";

async function saveRoutine({ currentUser, todos }) {
  const username = currentUser;
  try {
    const dayData = todos;
    if (currentUser.length > 1) {
      const response = await axios.post(
        "https://eu-west-1.aws.data.mongodb-api.com/app/application-3-qcyry/endpoint/saveroutine",
        {
          username,
          dayData,
        }
      );
      console.log("responsesaveroutine!: ", response);
    }
    return;
  } catch (error) {
    console.error("Login errorsaveroutine:", error);
    throw error;
  }
}

export default saveRoutine;
