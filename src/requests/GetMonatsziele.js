//const { MongoClient } = require('mongodb');
import axios from "axios";

async function GetMonatziele({ currentUser }) {
  try {
    const response = await axios.get(
      `https://eu-west-1.aws.data.mongodb-api.com/app/application-3-qcyry/endpoint/getmonatsziele?username=${currentUser}`
    );
    return response.data.mziele;
  } catch (error) {
    throw error;
  }
}

export default GetMonatziele;
