import { ObjectID } from "bson";
import { mongoClient } from "../../../../services/api-services";

// GET /houses/[userId]/[houseId]
// Returns all houses for specfic user
export default async function handler(req, res) {
  const db = process.env.DB;
  const client = mongoClient();
  const collection = client.db(db).collection("houses");

  const userObjectId = new ObjectID(req.query.userId);
  const houseObjectId = new ObjectID(req.query.houseId);
  const mongoFilter = {
    _id: houseObjectId,
    owners: userObjectId,
  };

  await client.connect();
  switch (req.method) {
    case "GET":
      const house = await collection.findOne(mongoFilter);
      res.status(200).json(house);
      break;
    case "PATCH":
      await collection.updateOne(mongoFilter, { $set: req.body });
      res.status(204).end();
      break;
    case "DELETE":
      await collection.deleteOne(mongoFilter);
      res.status(204).end();
      break;
    default:
      res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
  client.close();
}
