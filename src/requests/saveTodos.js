//const { MongoClient } = require('mongodb');
import axios from "axios";

async function saveTodos({ currentUser, todos, selectedDay }) {
  try {
    const { localDateTime1, localDateTime2, localDateTime3 } = dateformatter();
    const dayData = todos;
    const username = currentUser;
    const todosDay0 = todos.filter((todo) => todo.date === localDateTime1);
    const todosDay1 = todos.filter((todo) => todo.date === localDateTime2);
    const todosDay2 = todos.filter((todo) => todo.date === localDateTime3);

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

function dateformatter() {
  const heute1 = new Date();
  heute1.setHours(0, 0, 0, 0);
  heute1.setDate(heute1.getDate()); // Addiert selectedDay zum aktuellen Datum
  const jahr1 = heute1.getFullYear();
  const monat1 = (heute1.getMonth() + 1).toString().padStart(2, "0"); // Monate sind 0-indiziert
  const tag1 = heute1.getDate().toString().padStart(2, "0");
  const stunden1 = heute1.getHours().toString().padStart(2, "0");
  const minuten1 = heute1.getMinutes().toString().padStart(2, "0");
  const sekunden1 = heute1.getSeconds().toString().padStart(2, "0");
  const localDateTime1 = `${jahr1}-${monat1}-${tag1}T${stunden1}:${minuten1}:${sekunden1}Z`;

  const heute2 = new Date();
  heute2.setHours(0, 0, 0, 0);
  heute2.setDate(heute2.getDate() + 1); // Addiert selectedDay zum aktuellen Datum
  const jahr2 = heute2.getFullYear();
  const monat2 = (heute2.getMonth() + 1).toString().padStart(2, "0"); // Monate sind 0-indiziert
  const tag2 = heute2.getDate().toString().padStart(2, "0");
  const stunden2 = heute2.getHours().toString().padStart(2, "0");
  const minuten2 = heute2.getMinutes().toString().padStart(2, "0");
  const sekunden2 = heute2.getSeconds().toString().padStart(2, "0");
  const localDateTime2 = `${jahr2}-${monat2}-${tag2}T${stunden2}:${minuten2}:${sekunden2}Z`;

  const heute3 = new Date();
  heute3.setHours(0, 0, 0, 0);
  heute3.setDate(heute3.getDate() + 2); // Addiert selectedDay zum aktuellen Datum
  const jahr3 = heute3.getFullYear();
  const monat3 = (heute3.getMonth() + 1).toString().padStart(2, "0"); // Monate sind 0-indiziert
  const tag3 = heute3.getDate().toString().padStart(2, "0");
  const stunden3 = heute3.getHours().toString().padStart(2, "0");
  const minuten3 = heute3.getMinutes().toString().padStart(2, "0");
  const sekunden3 = heute3.getSeconds().toString().padStart(2, "0");
  const localDateTime3 = `${jahr3}-${monat3}-${tag3}T${stunden3}:${minuten3}:${sekunden3}Z`;
  return { localDateTime1, localDateTime2, localDateTime3 };
}
