const { MongoClient } = require("mongodb");

export default async function handler(req, res) {
  const {
    query: { username },
    method,
  } = req;

  const mongoUsername = process.env.USERNAME;
  const password = process.env.PASSWORD;
  const db = process.env.DB;

  const uri = `mongodb+srv://${mongoUsername}:${password}@cluster0.mejsw.mongodb.net/users?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();

  switch (method) {
    case "GET":
      const collection = client.db(db).collection("users");
      const user = await collection.findOne({ username: username });

      res.status(200).json({ id: user._id, username: user.username });
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }

  client.close();
}
