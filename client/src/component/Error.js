import { Link, useRouteError } from "react-router-dom"

const Error = () => {
    const error = useRouteError()
    return(
        <section className="mt-2 container">
            <h1>Something went wrong</h1>
            <p>
                <small>{error.statusText || error.message}</small>
            </p>
            <Link to="/" className="btn btn-danger">Home Page</Link>
        </section>
    )
}

export default Error