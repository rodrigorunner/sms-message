if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const PORT = process.env.PORT
const msgRoute = require('./route/messageRoute')
const getByIdRoute = require('./route/getByIdRoute')
const cors = require('cors')
const AppError = require('./utils/AppError')
const ejs = require('ejs')
const path = require('path')

app.use(cors())

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/message', msgRoute)
app.use('/client-message', getByIdRoute)

app.all("*", (req, res, next) => {
    next(new AppError('Page not found', 404))
})

app.use((err, req, res, next) => {
    const { status = 500 } = err 
    if(!err.message) err.message = 'Something went wrong.'
    res.status(status).render('error', { err })
})

app.listen(PORT, () => console.log(`Server running at port: ${PORT}`))