import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-hot-toast'

function PageHome() {
  const { loginMutate } = useAuth()
  const handleClick = () => {
    loginMutate.mutate({
      email: "prueba@gmail.com",
      password: "prueba"
    })
    toast.loading(" Esto puede tomar unos segundos ...")
  }

  return (
    <main className='page--container'>
      <h2 className='title'>Home</h2>
      <section className='home--container'>
        <h3>Aún no tienes una cuenta <NavLink to="/register">Registrate</NavLink></h3>
        <h3>Ya tienes una cuenta <NavLink to="/login">Inicia Sesión</NavLink></h3>
        <span className='shake-horizontal'>Si quieres ingresar como administrador haz click <a onClick={handleClick}>aqui</a></span>
      </section>
    </main>
  )
}

export default PageHome
