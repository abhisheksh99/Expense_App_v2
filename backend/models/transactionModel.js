import mongoose from "mongoose"

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ["Income", "Expense"],
    },
    category: {
        type: String,
        required: true,
        default: "Uncategorized",
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    description: {
        type: String
    },
}, { timestamps: true })

const Transaction = mongoose.model("Transaction", transactionSchema)

export default Transaction