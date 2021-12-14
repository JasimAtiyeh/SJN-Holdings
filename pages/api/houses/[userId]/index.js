import { ObjectID } from "bson";
import { mongoClient } from "../../../../services/api-services";

// GET /houses/[userId]
// Index for getting all houses
// todo: Get userId from state and pass in with request
export default async function handler(req, res) {
  const db = process.env.DB;
  const client = mongoClient();

  await client.connect();
  const collection = client.db(db).collection("houses");

  switch (req.method) {
    case "GET":
      const houses = await collection
        .find({ owners: new ObjectID(req.query.userId) })
        .toArray();

      if (houses.length !== 0) {
        res.status(200).json(houses);
      } else {
        res.status(404).end("No houses for given user");
      }

      break;
    case "POST":
      // Changing ownerId to BSON ObjectID here so that Mongo can find it
      req.body.owners = req.body.owners.map((owner) => new ObjectID(owner));
      await collection.insertOne(req.body);
      res.status(201).end();
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
  client.close();
}
