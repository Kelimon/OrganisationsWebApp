//const { MongoClient } = require('mongodb');
import axios from "axios";

async function saveNotizen({ currentUser, note }) {
  const username = currentUser;
  try {
    if (currentUser.length > 1) {
      const response = await axios.post(
        "https://eu-west-1.aws.data.mongodb-api.com/app/application-3-qcyry/endpoint/savenotizen",
        {
          username,
          notizen: note,
        }
      );
    }
    return;
  } catch (error) {
    throw error;
  }
}

export default saveNotizen;
