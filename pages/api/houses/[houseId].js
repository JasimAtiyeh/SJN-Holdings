const { MongoClient } = require("mongodb");

export default async function handler(req, res) {
  const {
    query: { houseId },
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
      const collection = client.db(db).collection("houses");
      const house = await collection.findOne({ houseId: houseId });

      res.status(200).json({ id: house._id, houseId: house.houseId });
      break;
    case "PUT":
      // Update or create data in your database
      res.status(200).json({});
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }

  client.close();
}
