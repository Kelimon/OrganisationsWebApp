//const { MongoClient } = require('mongodb');
import axios from "axios";

async function saveScheduleData({ currentUser, scheduleData }) {
  const username = currentUser;
  try {
    if (currentUser.length > 1) {
      const response = await axios.post(
        "https://eu-west-1.aws.data.mongodb-api.com/app/application-3-qcyry/endpoint/savescheduledata",
        {
          username,
          scheduleData,
        }
      );
      console.log("responsescheuldata!: ", response);
    }
    return;
  } catch (error) {
    console.error("Login errorschedulatat:", error);
    throw error;
  }
}

export default saveScheduleData;
