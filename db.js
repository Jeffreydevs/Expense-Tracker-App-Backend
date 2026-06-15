require("dotenv").config();

const dns = require("dns");
const mongoose = require("mongoose");
const Expense = require("./models/Expense");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => { console.log("MongoDB Connected") })
  .catch((error) => { console.log(error) });