import { useState, useEffect, useMemo } from "react"
import MessageList from "../../component/MessageList"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Home = () => {
    const [data, setData] = useState()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        const getData = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_SERVERURL}/message`)
                setLoading(true)
                const json = await res.json()
                setData(json.messages)
            } catch (err) {
                console.log(err)
            }
        }
        getData()

    }, [])

    const deletePhone =  async (id) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVERURL}/message/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({ id })
            })

            if(res.status === 200) {
                const findId = data?.filter(p => p.msg_id !== parseInt(id))
                setData(findId)
                navigate(`/`, { replace: true })
                toast.success('Deleted Successfully.')
            }
        } catch (err) {
            console.log(err)
        }
    }

    const cachedMessages = useMemo(() => data, [data])

    if(!loading) {
        return <h3 className="mt-2 text-center">Loading...</h3>
    }

    return(
       <div className="responsive-table">

        <Link to='/register'>
            <button className="btn btn-dark mt-2">Joke <i className="fa-solid fa-plus"></i></button>
        </Link>
        <table className="table table-stripped mt-2">
            <thead className="table-dark">
                <tr>
                    <th>Phone</th>
                    <th>#</th>
                    <th>#</th>
                </tr>
            </thead>
            <tbody>              
                {cachedMessages?.map((msg) => 
                <MessageList 
                key={msg.sms_id}
                msg={msg}
                deletePhone={deletePhone}
                />)}  
            </tbody>
        </table>
       </div>
    )
}

export default Home 