const connectToMongo=require("./db");
connectToMongo();
const express = require('express')
const app = express()
const port = 3000
var cors=require('cors')
app.use(cors())
app.use(express.json())
app.use('/api/auth',require('./routes/auth'))
// app.use('/api/notes',require('./routes/notes'))
app.listen(port, () => {
  console.log(`quizer backend listening on port http://localhost:${port}`)
})