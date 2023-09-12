const express = require("express")
const cors = require("cors")
const userRoutes = require("./routes/userRoutes")
require('dotenv').config()
const {errorHandler,notFound} = require("./middleware/errorMiddleware")

// CONNECT EXPRESS APP
const app  = express()

// GETTING RID OF CORS ERRORS
const corsOptions ={
    origin:'*', 
    credentials:true,         
    optionSuccessStatus:200,
 }
app.use(cors(corsOptions)) 

// ACCEPT JSON DATA
app.use(express.json())


// CONNECT TO MONGO-DB ATLAS
const {chats} = require("./data/data")
const connectDb = require("./configs/db")
connectDb()

// HOME ROUTE
app.get("/",(req,res) =>{
    res.send("Server Up and Running on 5000");
})

// USER ROUTES
app.use('/api/user',userRoutes)

// DATA ROUTE
app.get("/api/chats",(req,res) =>{
    res.send(chats);
})

// ERROR HANDLING
app.use(errorHandler)
app.all('*',notFound)

app.listen(
    process.env.PORT,
    console.log("started")
    )