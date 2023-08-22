CREATE TABLE message_phone (
	msg_id SERIAL NOT NULL PRIMARY KEY,
	msg_phone VARCHAR(50) NOT NULL
);

CREATE TYPE status_sms AS ENUM ('enviado', 'recebido', 'erro de envio');
CREATE TABLE message_sms (
	sms_id SERIAL NOT NULL PRIMARY KEY,
	sms_msg VARCHAR(100) NOT NULL,
	status status_sms,
	msg_id SERIAL NOT NULL REFERENCES message_phone(msg_id) ON DELETE CASCADE
);

INSERT INTO message_phone (msg_phone) VALUES ('2798125-6986'), ('2198321-5324'), ('2899201-2368');

INSERT INTO message_sms (msg_id, sms_msg, status) 
VALUES (1, 'Gostaria de saber quanto tempo falta ?', 'recebido'),
	   (2, 'E aí ?', 'erro de envio'),
	   (3, 'wow!!', 'enviado');
	   
SELECT * FROM message_phone;

SELECT * FROM message_sms;


SELECT mp.msg_phone, ms.sms_msg, ms.status
FROM message_sms ms 
INNER JOIN message_phone mp
ON ms.msg_id = mp.msg_id

SELECT mp.msg_phone, ms.sms_msg, ms.status
FROM message_sms ms 
INNER JOIN message_phone mp
ON ms.msg_id = mp.msg_id
WHERE mp.msg_id = 3













