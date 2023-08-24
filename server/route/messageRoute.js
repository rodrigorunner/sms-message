const express = require('express')
const router = express.Router()
const controller = require('../controller/messageController')

router.route('/')
.get(controller.getMessages)
.post(controller.registerMessage)

router.route('/:id')
.get(controller.getMessageById)
.put(controller.updateMessage)
.delete(controller.deletePhone)

module.exports = router 
