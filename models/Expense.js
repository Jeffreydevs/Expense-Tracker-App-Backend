const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  category: String,
  date: String,

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;