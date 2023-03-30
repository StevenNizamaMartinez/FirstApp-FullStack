import React from 'react'
import { NavLink } from 'react-router-dom'

function PageHome() {
  return (
    <main className='page--container'>
      <h2 className='title'>PageHome</h2>
      <span>Si quieres ingresar como administrador haz click aqui</span>
      <h3>Aún no tienes una cuenta <NavLink to="/register">Registrate</NavLink></h3>
      <h3>Ya tienes una cuenta <NavLink to="/login">Inicia Sesión</NavLink></h3>
    </main>
  )
}

export default PageHome