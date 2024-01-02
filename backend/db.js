const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.DB_URL);

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("MongoDb connexion successful ");
});

connection.on("error", () => {
  console.log("MongoDb connexion error 💥");
});

module.exports = mongoose;
