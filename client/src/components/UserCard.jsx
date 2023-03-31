import React from 'react'
import { useUser } from '../context/UsersContext'
import HandleQuery from './HandleQuery'
import { useNavigate } from 'react-router-dom'

function UserCard() {
  const navigate = useNavigate()
  const { getUsers } = useUser()
  const { data: Users, isLoading, isError } = getUsers()

  const handleClick = (id) => {
    navigate(`/user/${id}`)
  }

  return (
    <HandleQuery isLoading={isLoading} isError={isError}>
      <section className='users--card-container'>
        {
          Users?.length > 0 ?
            Users?.map((user) => (
              <div className='profile--card' key={user._id} onClick={() => handleClick(user._id)}>
                <h3>Name:</h3>
                <h2>{user.name}</h2>
                <h3>Email</h3>
                <h2>{user.email}</h2>
                <h3>Rol</h3>
                <h2>{user?.rol === "admin" ? "Administrator" : "User"}</h2>
              </div>
            ))
            : <h2>There is not a users</h2>
        }
      </section>

    </HandleQuery>
  )
}

export default UserCard