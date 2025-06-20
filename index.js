const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
const dotenv = require("dotenv");
const User_router = require("./src/Routes/User")
const Company_router = require("./src/Routes/Company")

dotenv.config();

const app = express()

app.use(cors())
app.use(express.json())

app.use("/User", User_router);
app.use("/company",Company_router)



app.listen(process.env.PORT, ()=>{
    mongoose.connect(process.env.MONGO_URl)
    console.log(process.env.PORT)
})