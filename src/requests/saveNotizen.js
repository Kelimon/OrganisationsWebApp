//const { MongoClient } = require('mongodb');
import axios from "axios";

async function saveNotizen({ username, note }) {
  console.log("savenotizen")
  try {
    console.log("Sending datasavenotizen: ", { username, note});
    if(username.length >1){
    
    const response = await axios.post(
      "https://eu-west-1.aws.data.mongodb-api.com/app/application-3-qcyry/endpoint/savenotizen",
      {
        username,
        notizen: note,
      }
    );
    console.log("responsesavenotizen!: ", response);
    }
    return;
  } catch (error) {
    console.error("Login errorsavenotizen:", error);
    throw error;
  }
}

export default saveNotizen;
