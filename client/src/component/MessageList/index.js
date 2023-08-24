import { Link } from "react-router-dom"

const MessageList = ({ msg, deletePhone }) => {

    return(
        <tr>
            <td>
                <Link to={`/message/${msg.msg_id}`}>
                    <strong>{msg.msg_phone}</strong>
                </Link>
            </td>
            <td>
                <Link  to={`/message/${msg.msg_id}/edit`}>
                    <button className="btn btn-warning"><i className="fa-solid fa-pen-to-square"></i></button>
                </Link>
            </td>
            <td>
                <button type="submit" onClick={() => deletePhone(`${msg.msg_id}`)} className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
            </td>
        </tr>
    )
}

export default MessageList