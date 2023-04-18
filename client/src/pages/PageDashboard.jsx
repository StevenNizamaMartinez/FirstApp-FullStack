import React from 'react'
import UserCard from '../components/UserCard'

function PageDashboard() {
  return (
    <main>
      <h2 className='title'>Dashboard</h2>
      <section>
        <UserCard/>
      </section>
    </main>
  )
}

export default PageDashboard
