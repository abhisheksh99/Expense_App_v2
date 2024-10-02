import express from "express"
import dotenv from "dotenv"
import userRoutes from "./routes/userRoute.js"
import connectDb from "./DB/db.js"
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js"


// for .env config
dotenv.config()

//Databse connection
connectDb()

const app = express()

//middlewares
app.use(express.json())

//Routes
app.use("/api/users",userRoutes)

// Error Middleware
app.use(errorHandlerMiddleware)

app.listen(process.env.PORT,()=>{
    console.log(`Server listening on ${process.env.PORT}`);
    
})