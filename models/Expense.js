const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  date: String,
  amount: Number,
  description: String,
  comment: String,

}, { timestamps: true });

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
