import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './ErrorPage.jsx'
import About from './pages/About/About.jsx'
import Events from './pages/Events/Events.jsx'
import Blog from './pages/Blog/Blog.jsx'
import Shop from './pages/Shop/Shop.jsx'

const router = createBrowserRouter([
  {
    path: '/',
<<<<<<< HEAD
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/events',
        element: <Events />,
      },
      {
        path: '/blog',
        element: <Blog />,
      },
      {
        path: '/shop',
        element: <Shop />,
      },
    ],
  },
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
=======
    element:
      <App />
  },
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
>>>>>>> 6cf97eeb084ef24cdf2b242e2244ea01eb5889e8
)
