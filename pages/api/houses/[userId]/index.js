import { ObjectID } from "bson";
import { mongoClient } from "../../../../services/api-services";

// GET /houses
// Index for getting all houses
// todo: Get userId from state and pass in with request
export default async function handler(req, res) {
  const db = process.env.DB;
  const client = mongoClient();

  await client.connect();
  switch (req.method) {
    case "GET":
      const collection = client.db(db).collection("houses");
      const houses = await collection
        .find({ owners: new ObjectID(req.query.userId) })
        .toArray();

      res.status(200).json(houses);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
  client.close();
}
