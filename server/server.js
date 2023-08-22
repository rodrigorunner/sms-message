if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const PORT = process.env.PORT
const msgRoute = require('./route/messageRoute')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/message', msgRoute)

app.listen(PORT, () => console.log(`Server running at port: ${PORT}`))