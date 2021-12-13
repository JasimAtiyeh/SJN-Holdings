import { mongoClient } from "../../../services/api-services";

// GET /users
// Returns all users, minus password
export default async function handler(req, res) {
  const db = process.env.DB;
  const client = mongoClient();

  await client.connect();
  switch (req.method) {
    case "GET":
      const collection = client.db(db).collection("users");
      const users = await collection.find().toArray();

      const trimmerUsers = users.map((user) => {
        return { id: user._id, username: user.username };
      });

      res.status(200).json(trimmerUsers);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
  client.close();
}
