const express = require('express') ;
const app = express() ;
const dataRouter = require('./routes/router')


app.use(express.json())

 app.use(dataRouter)

let PORT = 5000 || env.port
app.listen(PORT,() => {
    console.log(" le serveur est bien demarre")
})
 //module.exports = app
