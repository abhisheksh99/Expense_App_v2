import mongoose from "mongoose"

const transactionSchema = new mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,

    },
    type: {
        type:String,
        required:true,
        enum:["Income","Expense"],

    },
    category: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true,

    },
    amount: {
        type:Number,
        required:true,

    },
    date: {
        type:Date,
        required:true,

    },
    description: {
        type:String

    },

},{timestamps:true})

const Transaction = mongoose.model("User",transactionSchema)

export default Transaction