import { Outlet } from 'react-router-dom'
import React from 'react'
import Navbar from '../Layout/Navbar/Navbar'
import Footer from '../Layout/Footer/Footer'

function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
    </div>
  )
}

export default Layout
