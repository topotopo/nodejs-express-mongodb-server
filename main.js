const express = require('express')
const bodyParser = require('body-parser')

//Create express app
const app = express()

//Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

//Parse application/json
app.use(bodyParser.json())

//Configure the database
const dbConfig = require('./config/database.config.js')
//Object Database Mapping Tool for MongoDb and Node.js
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

//Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database.")
}).catch(error => {
    console.log('Could not connect to the database. Exiting now...', error)
    process.exit()
})

//Define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to Todo app" })
})

//Listen for requests
app.listen(4000, () => {
    console.log("Server is listening on port 4000")
})

require('./app/routes/todo.routes.js')(app)