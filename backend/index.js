const connectTOMongo = require("./db")
const express = require('express')
connectTOMongo();


const app = express()
const port = 5000


// available routes

app.use(express.json())

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello deepak bhaii!')
})
 
 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})