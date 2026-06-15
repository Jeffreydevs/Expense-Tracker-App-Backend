require("dotenv").config();
require("./db");
const express = require("express");
const Expense = require("./models/Expense");
const cors = require("cors")

const app = express();
app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Jeffrey");
});

app.get("/api/expenses", async (req, res) => {
  const expenses = await Expense.find();  
  res.json(expenses);
});

app.post("/api/expenses", async (req, res) => {
  console.log("POST route hit");
  console.log(req.body);  
  const expense = await Expense.create(req.body);
  res.json(expense);
});

app.delete("/api/expenses/:id", async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({
    message: "Expense deleted",
  });
});

app.put("/api/expenses/:id", async (req, res) => {
  const updatedExpense = await Expense.findByIdAndUpdate( req.params.id, req.body, { new: true } );
  res.json(updatedExpense);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});