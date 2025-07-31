const express = require('express')
const cors = require('cors')
const PORT = 3050

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/test-endpoint', (req, res)=>{
    res.send("endpoint is working")
})

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})