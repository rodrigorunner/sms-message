const express = require('express')
const router = express.Router()
const controller = require('../controller/messageController')

router.route('/')
.get(controller.getMessages)

router.route('/:id')
.put(controller.updateMessage)

router.route('/send')
.get(controller.getSend)

router.route('/received')
.get(controller.getReceived)

router.route('/not-send')
.get(controller.getNotSend)

module.exports = router 
