import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Error from './component/Error'
import Home from './pages/Home'
import Edit from './pages/Edit'
import Register from './pages/Register'
import MessageById from './pages/MessageById'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/message/:id/edit',
        element: <Edit />
      },
      {
        path: '/message/:id',
        element: <MessageById />
      },
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
