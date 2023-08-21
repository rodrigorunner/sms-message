if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const PORT = process.env.PORT

app.get('/', (req, res) => {
    res.status(200).json({ message: 'It Worked.' })
})

app.listen(PORT, () => console.log(`Server running at port: ${PORT}`))