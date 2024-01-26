//const { MongoClient } = require('mongodb');
import axios from "axios";

async function GetScheduleData({ currentUser }) {
  try {
    const response = await axios.get(
      `https://eu-west-1.aws.data.mongodb-api.com/app/application-3-qcyry/endpoint/getscheduledata?username=${currentUser}`
    );
    return response.data.scheduleData;
  } catch (error) {
    console.error("Login errorscheduledata:", error);
    throw error;
  }
}

export default GetScheduleData;
