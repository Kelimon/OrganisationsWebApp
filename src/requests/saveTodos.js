//const { MongoClient } = require('mongodb');
import axios from "axios";

async function saveTodos({ currentUser, ownTodos, selectedDay }) {
  try {
    const dayData = ownTodos;
    const username = currentUser;
    const todosDay0 = ownTodos.filter((todo) => todo.day === 0);
    const todosDay1 = ownTodos.filter((todo) => todo.day === 1);
    const todosDay2 = ownTodos.filter((todo) => todo.day === 2);

    // Combining them into a single array
    const splitTodos = [todosDay0, todosDay1, todosDay2];
    console.log("wtf am i sending: ", dayData);
    if (currentUser.length > 1) {
      const response = await axios.post(
        "https://eu-west-1.aws.data.mongodb-api.com/app/application-3-qcyry/endpoint/savetodos",
        {
          username,
          splitTodos,
          selectedDay,
        }
      );
      console.log("response!: ", response);
    }
    return;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export default saveTodos;
