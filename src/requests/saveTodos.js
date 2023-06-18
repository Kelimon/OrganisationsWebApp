const { MongoClient } = require('mongodb');

async function saveTodos() {
  const uri =
  "mongodb+srv://panagiotisfotiadis:coleslawhammer@reactsite.zhpj3hk.mongodb.net/test?retryWrites=true&w=majority";
const client = new mongodb.MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

  try {
    await client.connect();

    const db = client.db('myDatabase');
    const collection = db.collection('ToDoList');

    const date = new Date(); // Current date and time
    const filter = { User: 1 };
    const update = {
      $push: {
        ToDos: {date: "2023-06-015",
                tasks: ["chillen", "frau schlagen"]}
      }
    };


    await collection.updateOne(filter, update);
    console.log("document added")
  } finally {
    await client.close();
  }
}

export default saveTodos;
