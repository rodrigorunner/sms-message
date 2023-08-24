import { useParams, useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"

const Edit = () => {
    const [data, setData] = useState({
        msg_phone: '',
        sms_msg: '',
        status: ''
    })
    const navigate = useNavigate()
    const { id } = useParams()
    const [err, setErr] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target

        setData(data => ({
            ...data,
            [name]: value
        }))
    }

    const updateMessage = async (e) => {
        e.preventDefault()

        if(data.msg_phone === '' || data.sms_msg === '' || data.status === '') {
            setErr(true)
            return
        }

        try {
            const res = await fetch(`${process.env.REACT_APP_SERVERURL}/message/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(data)
            })
            
            if(res.status === 201) {
                navigate('/', { replace: true })
                toast.success('Updated Successfully.')
            }
        } catch (err) {
            console.log(err)
            
        }
    }

    useEffect(() => {
        const getById = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_SERVERURL}/client-message/${id}`)
                const json = await res.json()
                setData(json.update_message)
            } catch (err) {
                console.log(err)
            }
        }
        getById()
    }, [id])
    
    return(
        <section>
            <Link className="d-block text-center" to="/">
                <button className="btn btn-dark mt-2"><i className="fa-solid fa-house"></i></button>
            </Link>
            <div className="row">
                <div className="col-md-6 mx-auto">
                    {err && <h4 className="alert alert-danger mt-2">All fields are required.</h4>}
                    <form onSubmit={e => updateMessage(e)}>
                        <div className="form-group">
                            <label htmlFor="msg_phone">Phone</label>
                            <input
                            type="text"
                            className="form-control"
                            name="msg_phone"
                            id="msg_phone"
                            placeholder="Ex: (DDD)00000-0000"
                            value={data.msg_phone}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="sms_msg">Message</label>
                            <textarea
                            className="form-control m-2"
                            name="sms_msg"
                            id="sms_msg"
                            value={data.sms_msg}
                            placeholder="Type a joke."
                            onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="status">Status</label>
                            <select name="status" id="status" value={data.status} onChange={handleChange} className="form-control">
                                <option defaultChecked>Status</option>
                                <option value="enviado">Enviado</option>
                                <option value="recebido">Recebido</option>
                                <option value="erro de envio">Erro de Envio</option>
                            </select>
                        </div>
                        <button className="btn btn-dark" type="submit">Update</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Edit