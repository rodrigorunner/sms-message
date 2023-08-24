import { Link } from "react-router-dom"

const Header = () => {
    return (
        <nav className="bg-dark p-3 text-center">
            <Link className="text-white display-4 text-decoration-none" to='/'>JokeSMS</Link>
        </nav>
    )
}

export default Header 