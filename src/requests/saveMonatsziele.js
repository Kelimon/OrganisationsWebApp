import axios from "axios";

async function saveMonatsziele({ currentUser, mzieleData }) {
  // Get token from local storage
  const username = currentUser;
  console.log("currentuser", currentUser);
  console.log("mzeieldata", mzieleData);
  try {
    if (currentUser.length > 1) {
      const response = await axios.post(
        "https://eu-west-1.aws.data.mongodb-api.com/app/application-3-qcyry/endpoint/savemonatsziele",
        {
          username,
          mzieleData,
        }
      );
    }
    return;
  } catch (error) {
    console.error("Login error from savemonatsziele:", error);
    throw error;
  }
}

export default saveMonatsziele;
