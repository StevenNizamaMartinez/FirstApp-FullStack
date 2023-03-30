import React from 'react'
import { useUser } from '../context/UsersContext'

function ProfileCard() {
  const {getUser} = useUser()
  const {data, isLoading, isError} = getUser()
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>
  return (
    <section className='profile--card-container'>
      <div className='profile--card'>
        <h3>Name:</h3>
        <h2>{data.name}</h2>
        <h3>Email</h3>
        <h2>{data.email}</h2>
      </div>
    </section>
  )
}

export default ProfileCard