const express = require('express')
const cors = require('cors')
const PORT = 3050
const recomendationRoutes = require('./routes/recomendationRoutes')
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/recommendations', recomendationRoutes)

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})