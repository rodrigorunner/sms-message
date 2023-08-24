const pool = require('../config/db')
const path = require('path')
const fsPromises = require('fs').promises
const fs = require('fs')
const AppError = require('../utils/AppError')

const date = new Date().toLocaleDateString()
const time = new Date().toLocaleTimeString()

module.exports.getMessages = async (req, res) => {
    try {
        const result = await pool.query('SELECT mp.msg_id, mp.msg_phone, ms.sms_id, ms.sms_msg FROM message_sms ms INNER JOIN message_phone mp ON ms.msg_id = mp.msg_id ORDER BY mp.msg_id ASC')

        if(result.rowCount > 0) {
            if(!fs.existsSync(path.join(__dirname, 'files'))) {
                fsPromises.mkdir(path.join(__dirname, 'files'))
            }

            try {
                await fsPromises.appendFile(path.join(__dirname, 'files', 'messages.txt'),`${req.method} ${req.baseUrl} ${date} ${time}\n`)
            } catch (err) {
                console.log(err)
            }
        }

       res.status(200).json({ messages: result.rows })
        
    } catch (err) {
        console.log(err)
    }
}

module.exports.getMessageById = async (req, res) => {
  const id = parseInt(req.params.id)
  try {
      const result = await pool.query("SELECT mp.msg_id, ms.sms_id, ms.sms_msg, ms.status FROM message_sms ms INNER JOIN message_phone mp ON ms.msg_id = mp.msg_id WHERE mp.msg_id = $1", [id])
    
      res.status(200).json({ phone_message: result.rows })
  } catch (err) {
    console.log(err)
  }
}

module.exports.registerMessage = async (req, res) => {
    const { message, status, phone } = req.body
    const id = Math.floor(Math.random() * 2000) + 10

    if(!message || !status|| !phone) {
        return
    }

    try {
        await pool.query("INSERT INTO message_phone (msg_id, msg_phone) VALUES($1, $2)", [id, phone])
        await pool.query("INSERT INTO message_sms(sms_msg, status, msg_id) VALUES($1, $2, $3)", [message, status, id])
    } catch (err) {
        console.log(err)
    }

    res.status(201).json({ message: `Message id created: ${id}` })
}

module.exports.updateMessage = async (req, res) => {
    const { msg_phone, sms_msg, status } = req.body
    const id  = parseInt(req.params.id)

    if(!msg_phone || !sms_msg || !status) {
        res.redirect('/')
        return
    }

    try {
        await pool.query('UPDATE message_phone SET msg_phone = $1 WHERE msg_id = $2', [msg_phone, id])
        await pool.query('UPDATE message_sms SET sms_msg = $1, status = $2 WHERE msg_id = $3', [sms_msg, status, id])

        res.status(201).json({ message: `Message updated: ${id}` })
    } catch (err) {
        console.log(err)
    }
}

module.exports.deletePhone = async (req, res) => {
    const id = parseInt(req.params.id)
    
    try {
        await pool.query("DELETE FROM message_phone WHERE msg_id = $1", [id])

        res.status(200).json({ message: `PhoneID: ${id}` })
    } catch (err) {
        console.log(err)
    }
}

