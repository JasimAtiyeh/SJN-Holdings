import { mongoClient } from "../../../../services/api-services";

// GET /users/login/[username]/[password]
// Returns specific user for login
export default async function handler(req, res) {
  const db = process.env.DB;
  const client = mongoClient();

  await client.connect();
  switch (req.method) {
    case "GET":
      const collection = client.db(db).collection("users");
      // Username and password are in the request query
      const user = await collection.findOne({
        username: req.query.loginInfo[0],
        password: req.query.loginInfo[1],
      });

      if (user) {
        // todo User needs to be added to state??
        res.status(200).json({ id: user._id, username: user.username });
        break;
      } else {
        res
          .status(404)
          .end("User not found. Provide correct username and password.");
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
  client.close();
}
