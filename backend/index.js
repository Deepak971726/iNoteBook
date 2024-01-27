const express = require('express')
const connectTOMongo = require("./db")
connectTOMongo();


const app = express()
const port = 5000


// available routes

app.use(express.json())

app.use('/api/auth',require('./routes/auth.js'))
app.use('/api/notes',require('./routes/notes.js'))

app.get('/', (req, res) => {
  res.send('Hello deepak bhaii!')
})
 
 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})