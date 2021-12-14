const { MongoClient } = require("mongodb");

export const mongoClient = () => {
  const mongoUsername = process.env.USERNAME;
  const mongoPassword = process.env.PASSWORD;
  const uri = `mongodb+srv://${mongoUsername}:${mongoPassword}@cluster0.mejsw.mongodb.net/atiyeh-llc?retryWrites=true&w=majority`;

  return new MongoClient(uri);
};
