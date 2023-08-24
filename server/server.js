if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const PORT = process.env.PORT
const msgRoute = require('./route/messageRoute')
const getByIdRoute = require('./route/getByIdRoute')
const cors = require('cors')

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/message', msgRoute)
app.use('/client-message', getByIdRoute)

app.listen(PORT, () => console.log(`Server running at port: ${PORT}`))