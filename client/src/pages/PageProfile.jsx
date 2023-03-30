import React from 'react'
import ProfileCard from '../components/ProfileCard'

function PageProfile() {
  return (
    <main>
      <h2 className='title'>Welcome :</h2>
      <section className='container--grid'>
        <ProfileCard />
        <picture>
          <img src="./profile-content.svg" />
        </picture>
      </section>
    </main>
  )
}

export default PageProfile