const pool = require('../config/db')

module.exports.createMessage = async (req, res) => {
    const {sms_msg, status} = req.body
    const id = parseInt(req.params.id)

    try {
        await pool.query("INSERT INTO message_sms(sms_msg, status, msg_id) VALUES($1, $2, $3)", [sms_msg, status, id])
        
    } catch (err) {
        console.log(err)
    }

    res.status(200).json({ message: `MessageID: ${id}` })
}