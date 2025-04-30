import React from 'react'
import Login from './Login'
import Browse from './Browse'
import Profile from './profile/Profile'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'


const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path:"/profile",
      element: <Profile />
    }
  ])

  

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body
