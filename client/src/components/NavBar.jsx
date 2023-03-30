import React from 'react'
import { NavLink } from 'react-router-dom'
import Logout from './Logout'

function NavBar() {
  return (
    <nav className='navbar'>
      <ul className='navbar--container'>
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
        <li>
          <NavLink to="/notes">Notes</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
      </ul>
      <div className='navbar--button'>
        <Logout/>
      </div>
    </nav>
  )
}

export default NavBar