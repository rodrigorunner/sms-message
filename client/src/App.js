import { Outlet } from "react-router-dom"
import Header from "./component/Header"

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <section>
     <Header />
      <div  className="container">
          <Outlet />
          <ToastContainer />
      </div>
    </section>
  );
}

export default App
