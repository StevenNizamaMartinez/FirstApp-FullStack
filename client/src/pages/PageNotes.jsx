import React from 'react'
import FormPost from '../components/form/FormPost'
import HandleComponent from '../components/HandleComponent'


function PageNotes() {

  return (
    <div>
      <h2 className='title'>Notes</h2>
      <section className="notes--container">
        <div className="post--form">
          <FormPost />
        </div>
        <div className='post--container'>
          <HandleComponent/>
        </div>
      </section>
    </div>
  )
}

export default PageNotes
