const IncomeSchema = require("../models/IncomeModel");

exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body;
    
    const income = IncomeSchema({
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
        await income.save();
        res.status(200).json({
            message: "Income added successfully"
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Server error"
        });
    }
}

exports.getIncomes = async (req, res) => {
    try {
        const incomes = await IncomeSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
}

exports.deleteIncome = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedIncome = await IncomeSchema.findByIdAndDelete(id);
        if (!deletedIncome) {
            return res.status(404).json({
                message: "Income not found"
            });
        }
        res.status(200).json({
            message: "Income deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};
