import React from 'react'
import { Outlet } from 'react-router-dom'

function LoginProtected() {
  return <Outlet/>
}

export default LoginProtected