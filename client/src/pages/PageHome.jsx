import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function PageHome() {
  const { loginMutate } = useAuth()
  const handleClick = () => {
    loginMutate.mutate({
      email: "prueba@gmail.com",
      password: "prueba"
    })
  }

  return (
    <main className='page--container'>
      <h2 className='title'>PageHome</h2>
      <section className='home--container'>
        <h3>Aún no tienes una cuenta <NavLink to="/register">Registrate</NavLink></h3>
        <h3>Ya tienes una cuenta <NavLink to="/login">Inicia Sesión</NavLink></h3>
        <span className='shake-horizontal'>Si quieres ingresar como administrador haz click <a onClick={handleClick}>aqui</a></span>
      </section>
    </main>
  )
}

export default PageHome