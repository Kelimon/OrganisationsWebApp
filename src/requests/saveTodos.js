//const { MongoClient } = require('mongodb');
import axios from "axios";

async function saveTodos({ currentUser, todos, selectedDay }) {
  try {
    const dayData = todos;
    const username = currentUser;
    const todosDay0 = todos.filter((todo) => todo.day === 0);
    const todosDay1 = todos.filter((todo) => todo.day === 1);
    const todosDay2 = todos.filter((todo) => todo.day === 2);

    // Combining them into a single array
    const splitTodos = [todosDay0, todosDay1, todosDay2];
    if (currentUser.length > 1) {
      const response = await axios.post(
        "https://eu-west-1.aws.data.mongodb-api.com/app/application-3-qcyry/endpoint/savetodos",
        {
          username,
          splitTodos,
          selectedDay,
        }
      );
    }
    return;
  } catch (error) {
    throw error;
  }
}

export default saveTodos;
