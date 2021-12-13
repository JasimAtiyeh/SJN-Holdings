import { ObjectID } from "bson";
import { mongoClient } from "../../../../services/api-services";

// GET /houses/[houseId]
// Returns all houses for specfic user
export default async function handler(req, res) {
  console.log(req.query);
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
  switch (method) {
    // todo Chain promises to all requests
    case "GET":
      const house = await collection.findOne(mongoFilter);
      res.status(200).json(house);
      break;
    case "POST":
      // todo Not sure what the request body will look like
      await collection.insertOne(req.body);
      res.status(201);
      break;
    case "PATCH":
      // todo Not sure what the request body will look like
      await collection.updateOne(mongoFilter, req.body);
      res.status(204);
      break;
    case "DELETE":
      await collection.deleteOne(mongoFilter);
      res.status(204);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
  client.close();
}
