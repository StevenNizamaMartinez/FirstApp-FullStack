import React from 'react'
import { NavLink } from 'react-router-dom'
import Logout from './Logout'
import { useUser } from '../context/UsersContext'
import { useJwt } from 'react-jwt'
import { useAuth } from '../context/AuthContext'

function NavBar() {
  const { token } = useAuth()
  localStorage.getItem("token")
  const { decodedToken, isExpired } = useJwt(token)

  return (
    <nav className='navbar'>
      <ul className='navbar--container'>
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
        <li>
          <NavLink to="/notes">Notes</NavLink>
        </li>
        {
          decodedToken?.rol === "admin" &&
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>

        }


      </ul>
      <div className='navbar--button'>
        <Logout />
      </div>
    </nav>
  )
}

export default NavBar