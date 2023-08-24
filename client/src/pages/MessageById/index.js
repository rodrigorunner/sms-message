import { useState, useEffect, useMemo } from "react"
import { useParams, Link } from "react-router-dom"
import MessageClientById from "../../component/MessageClientById"

const MessageById = () => {
    const [data, setData] = useState([])
    const { id } = useParams()

    useEffect(() => {

        const getById = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_SERVERURL}/message/${id}`)
                const json = await res.json()
                setData(json.phone_message)
            } catch (err) {
                console.log(err) 
            }
        }
        getById()

    }, [id])

    const cachedResult = useMemo(() => data, [data])

    return(
        <section>
            <Link to="/">
                <button className="btn btn-dark mt-2"><i className="fa-solid fa-house"></i></button>
            </Link>
            <div className="responsive-table">
                <table className="table mt-2">
                    <thead className="table-dark">
                        <tr>
                            <th>Message</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {cachedResult?.map(msg => <MessageClientById key={msg.sms_id} msg={msg} />)}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default MessageById