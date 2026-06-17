require("dotenv").config();
require("./db");
const authRoutes = require("./routes/authRoutes");
const express = require("express");
const Expense = require("./models/Expense");
const cors = require("cors");
const authMiddleware = require("./middleware/authMiddleware");


const app = express();
app.use(cors())
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Spendifi Backend API is running"
  });
});

app.get("/api/expenses", authMiddleware, async (req, res) => {
  const expenses = await Expense.find({ userId: req.user.userId });  
  res.json(expenses);
});

app.post("/api/expenses", authMiddleware, async (req, res) => {
  console.log("POST route hit");
  console.log(req.body);  
  const expense = await Expense.create({...req.body, userId: req.user.userId });
  res.json(expense);
});

app.delete("/api/expenses/:id", authMiddleware, async (req, res) => {
  const expense = await Expense.findOneAndDelete({_id: req.params.id, userId: req.user.userId });
  if (!expense) { return res.status(404).json({ message: "Expense not found or not authorized" });}
  res.json({
    message: "Expense deleted",
  });
});

app.put("/api/expenses/:id", authMiddleware, async (req, res) => {
  const updatedExpense = await Expense.findOneAndUpdate({_id: req.params.id, userId: req.user.userId },req.body, { new: true });
  if (!updatedExpense) {return res.status(404).json({ message: "Expense not found or not authorized"});}
  res.json(updatedExpense);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
