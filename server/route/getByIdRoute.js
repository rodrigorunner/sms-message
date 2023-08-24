const express = require('express')
const router = express.Router()
const controller = require('../controller/getByIdController')

router.route('/:id')
.get(controller.getById)

module.exports = router 