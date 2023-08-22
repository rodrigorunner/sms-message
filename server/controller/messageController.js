const pool = require('../config/db')
const path = require('path')
const fsPromises = require('fs').promises
const fs = require('fs')

module.exports.getMessages = async (req, res) => {
    try {
        const result = await pool.query('SELECT mp.msg_id, mp.msg_phone, ms.sms_msg, ms.status FROM message_sms ms INNER JOIN message_phone mp ON ms.msg_id = mp.msg_id ORDER BY mp.msg_id ASC')

        if(result.rowCount > 0) {
            if(!fs.existsSync(path.join(__dirname, 'files'))) {
                fsPromises.mkdir(path.join(__dirname, 'files'))
            }

            try {
                await fsPromises.writeFile(path.join(__dirname, 'files', 'messages.json'), JSON.stringify({ messages: result.rows }))
            } catch (err) {
                console.log(err)
            }
        }

       res.status(200).json({ messages: result.rows })
        
    } catch (err) {
        console.log(err)
    }
}

module.exports.updateMessage = async (req, res) => {
    const { message, status, phone } = req.body
    const { id } = req.params

    try {
        await pool.query('UPDATE message_phone SET msg_phone = $1 WHERE msg_id = $2', [phone, id])
        await pool.query('UPDATE message_sms SET sms_msg = $1, status = $2 WHERE sms_id = $3', [message, status, id])

        res.status(201).json({ message: `Message updated: ${id}` })
    } catch (err) {
        console.log(err)
    }
}

module.exports.getSend = async (req, res) => {
    const result = await pool.query("SELECT mp.msg_phone, ms.sms_msg, ms.status FROM message_sms ms INNER JOIN message_phone mp ON ms.msg_id = mp.msg_id WHERE ms.status = 'enviado'")

    res.status(200).json({ enviado: result.rows })

    try {
        if(!fs.existsSync(path.join(__dirname, 'files'))) {
            fsPromises.mkdir(path.join(__dirname, 'files'))
        }
        await fsPromises.writeFile(path.join(__dirname, 'files', 'enviado.json'), JSON.stringify({ enviado: result.rows }))
    } catch (err) {
        console.log(err)
    }
}

module.exports.getReceived = async (req, res) => {
    const result = await pool.query("SELECT mp.msg_phone, ms.sms_msg, ms.status FROM message_sms ms INNER JOIN message_phone mp ON ms.msg_id = mp.msg_id WHERE ms.status = 'recebido'")
    
    res.status(200).json({ recebido: result.rows })
 
    try {
        if(!fs.existsSync(path.join(__dirname, 'files'))) {
            fsPromises.mkdir(path.join(__dirname, 'files'))
        }
        await fsPromises.writeFile(path.join(__dirname, 'files', 'recebido.json'), JSON.stringify({ recebido: result.rows }))
    } catch (err) {
        console.log(err)
    }
}

module.exports.getNotSend = async (req, res) => {
    const result = await pool.query("SELECT mp.msg_phone, ms.sms_msg, ms.status FROM message_sms ms INNER JOIN message_phone mp ON ms.msg_id = mp.msg_id WHERE ms.status = 'erro de envio'")

    res.status(200).json({ erroEnvio: result.rows })

    try {
        if(!fs.existsSync(path.join(__dirname, 'files'))) {
            fsPromises.mkdir(path.join(__dirname, 'files'))
        }
        await fsPromises.writeFile(path.join(__dirname, 'files', 'erro-de-envio.json'), JSON.stringify({ erroEnvio: result.rows }))
    } catch (err) {
        console.log(err)
    }
}