import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { toast } from "react-toastify"

const Register = () => {
    const [data, setData] = useState({
        phone: '',
        message: '',
        status: ''
    })
    const navigate = useNavigate()
    const [err, setErro] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target

        setData(data => ({
            ...data,
            [name]: value
        }))
    }

    const registerMessage = async (e) => {
        e.preventDefault()

        if(data.phone === '' || data.message === '' || data.status === '') {
            setErro(true)
            return
        }

        try {
            const res = await fetch(`${process.env.REACT_APP_SERVERURL}/message`, {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(data)
            })

            if(res.status === 201) {
                navigate('/', { replace: true })
                toast.success('Created Successfully.')
            }

        } catch (err) {
            console.log(err)
        }
    }

    return(
        <section>
            <Link className="d-block text-center" to="/">
                <button className="btn btn-dark mt-2 ml-2"><i class="fa-solid fa-house"></i></button>
            </Link>
        
            <div className="row">
                <div className="col-md-6 mx-auto">
                    {err && <h4 className="alert alert-danger mt-2">All fields are required.</h4>}
                    <form onSubmit={registerMessage}>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input
                            type="text"
                            className="form-control"
                            name="phone"
                            id="phone"
                            placeholder="Ex: (DDD)00000-0000"
                            value={data.phone}
                            onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="msg">Message</label>
                            <textarea
                            className="form-control m-2"
                            name="message"
                            id="msg"
                            value={data.message}
                            placeholder="Escreva sua mensagem"
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
                        <button className="btn btn-dark" type="submit">Create</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Register