if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index') //reference to index router

app.set('view engine', 'ejs') //sets what view engine is being used   
app.set('views', __dirname + '/views') //tell where views are
app.set('layout', 'layouts/layout') //tell where layouts are
app.use(expressLayouts) //tell express application to use 
app.use(express.static('public'))//tell express where public files are (html, css javascript)

const mongoose = require('mongoose') //set up mongoDB data base
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
 }) //setting up and connecting mongodb within the appliation
const db = mongoose.connection 
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to mongoose'))

app.use('/', indexRouter) //index router handling the root

app.listen(process.env.PORT || 3000) //location of server is stored in variable PORT, and if not, just on localhost port 3000

