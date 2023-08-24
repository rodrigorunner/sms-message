const express = require('express')
const router = express.Router()
const controller = require('../controller/statusController')

router.route('/:id')
.post(controller.createMessage)

module.exports = router 