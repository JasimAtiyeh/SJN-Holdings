const { MongoClient } = require("mongodb");

export default async function handler(req, res) {
  const { method } = req;

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
      const collection = client.db(db).collection("houses");
      const houses = await collection.find().toArray();

      res.status(200).json(houses);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }

  client.close();
}
