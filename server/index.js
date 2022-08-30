require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const loadRoutes = require('./routes/index')
const errorHandler = require('./middleware/errorHandler')

const PORT = process.env.PORT || 3010

app.use(express.json())
app.use(cors())

loadRoutes(app)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))