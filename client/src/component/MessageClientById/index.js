const MessageClientById = ({ msg }) => {
    return(
        <tr>
            <td>
               <strong> {msg.sms_msg[0].toUpperCase() + msg.sms_msg.slice(1)}</strong>
            </td>
            <td>
                <small className="text-muted">{msg.status[0].toUpperCase() + msg.status.slice(1)}</small>
            </td>
        </tr>
    )
}

export default MessageClientById