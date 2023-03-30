import React from 'react'

function ButtonDelete({id,action}) {

  const handleDelete = (e) => {
    e.stopPropagation()
    console.log(id)
    action.mutate(id)
  }

  return (
    <button onClick={handleDelete}>Delete</button>
  )
}

export default ButtonDelete