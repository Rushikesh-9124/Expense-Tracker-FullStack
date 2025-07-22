const Income = require("../models/income");
const Expense = require("../models/expense");
const { isValidObjectId, Types } = require("mongoose");

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    //Get income transactions in the last 60 days
    const last60DaysIncomeTransactions = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    //Get total income in the last 60 days
    const last60DaysIncome = last60DaysIncomeTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    //Get expense transactions in last 30 days
    const last30DaysExpenseTransactions = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    //Get total expense for last 30 days
    const last30DaysExpense = last30DaysExpenseTransactions.reduce(
      (sum, transactions) => sum + transactions.amount,
      0
    );

    //Fetch last 5 transactions (income + expense)
    const last5Transactions = [
      ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (item) => ({
          ...item.toObject(),
          type: "income",
        })
      ),
      ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (item) => ({
          ...item.toObject(),
          type: "expense",
        })
      ),
    ].sort((a, b) => b.date - a.date);

    res.status(200).json({
      success: true,
      data: {
        totalBalance:
          (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
        totalIncome: totalIncome[0]?.total || 0,
        totalExpense: totalExpense[0]?.total || 0,
        DaysExpenses30: {
          total: last30DaysExpense,
          transactions: last30DaysExpenseTransactions,
        },
        DaysIncome60: {
          total: last60DaysIncome,
          transactions: last60DaysIncomeTransactions,
        },
        recentTransactions: last5Transactions,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
