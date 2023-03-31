import React from 'react'
import { useUser } from '../context/UsersContext'
import HandleQuery from './HandleQuery'

function ProfileCard() {
  const { getUser } = useUser()
  const { data, isLoading, isError } = getUser()

  return (
    <HandleQuery isLoading={isLoading} isError={isError}>
      <section className='profile--card-container'>
        <div className='profile--card'>
          <h3>Name:</h3>
          <h2>{data?.name}</h2>
          <h3>Email</h3>
          <h2>{data?.email}</h2>
          <h3>Rol</h3>
          <h2>{data?.rol ==="admin" ? "Administrator" : "User"}</h2>
        </div>
      </section>
    </HandleQuery>
  )
}

export default ProfileCard