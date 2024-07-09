const ExpenseSchema = require("../models/ExpenseModel");

exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;
    
    const expense = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    })

    try {
        //validations
        if (!title || !category || !description || !date) {
            return res.status(400).json({ 
                message: "All fields are required" });
        }
        if (isNaN(amount) || Number(amount) <= 0) {
            return res.status(400).json({
                message: "Amount must be a positive number"
            });
        }
        //save to database
        await expense.save();
        res.status(200).json({
            message: "Expense added successfully"
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Server error"
        });
    }
}

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
}

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedExpense = await ExpenseSchema.findByIdAndDelete(id);
        if (!deletedExpense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }
        res.status(200).json({
            message: "Expense deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};
