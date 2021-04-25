const express = require('express') ;
const app = express() ;
const request = require('request')
const dataRouter = require('./routes/data')


app.use(express.json())

 app.use(dataRouter)

let PORT = 5000 || env.port
app.listen(PORT,() => {
    console.log(" le serveur est bien demarre")
})
 //module.exports = app
