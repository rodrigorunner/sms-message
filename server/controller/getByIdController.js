const pool = require('../config/db')

module.exports.getById = async (req, res) => {
    const id = parseInt(req.params.id)

    try {
        const result = await pool.query("SELECT mp.msg_phone, ms.sms_msg, ms.status FROM message_sms ms INNER JOIN message_phone mp ON ms.msg_id = mp.msg_id WHERE mp.msg_id = $1", [id])
      
        res.status(200).json({ update_message: result.rows[0] })
    } catch (err) {
      console.log(err)
    }
  }