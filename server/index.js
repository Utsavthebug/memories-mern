const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cors = require("cors")
require('dotenv').config()


const postsRoute = require("./routes/posts")
const userRoutes = require("./routes/users")

const app = express()

app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors())

app.use("/posts",postsRoute)
app.use("/user",userRoutes)

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL,{ useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>app.listen(PORT,()=>console.log(`Sever running at port : ${PORT}`)))
.catch((error)=>console.log(error.message))

