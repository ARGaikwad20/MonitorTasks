const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');

//to have env variables into our dotenv file
require('dotenv').config()

//Creating express server
const app = express()
const port = process.env.PORT || 5000

//cores middeware
app.use(cors())
app.use(express.json())

//Starting connection with the DB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true}
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//Create API end point routes
//So server can be used to perform CRUD operations
const tasksRouter = require('./routes/tasks')
app.use('/tasks', tasksRouter)

//Starting the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})
