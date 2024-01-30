const connectTOMongo = require("./db")
const express = require('express')
var cors = require('cors')
connectTOMongo();


const app = express()
const port = 5000


// available routes
app.use(cors());

app.use(express.json())

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello deepak bhaii!')
})
 
 

app.listen(port, () => {
  console.log(`iNoteBook backend listening on port ${port}`)
})