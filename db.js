require("dotenv").config();

const dns = require("dns");
const mongoose = require("mongoose");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

if (!process.env.MONGO_URI) {
  console.error("MongoDB connection error: MONGO_URI is not configured");
} else {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => { console.log("MongoDB Connected") })
    .catch((error) => { console.log(error) });
}
