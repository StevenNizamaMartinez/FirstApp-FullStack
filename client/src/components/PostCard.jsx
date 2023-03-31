import React from 'react'
import ButtonDelete from './ButtonDelete'
import { usePost } from '../context/Posts.context'
import { useNavigate, useParams } from 'react-router-dom'
import Toggle from 'react-toggle'
import 'react-toggle/style.css'


function PostCard({ post }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const { deletePostMutation,updatePostStateMutation } = usePost()

  const handleChange = (id,e) => {
    console.log(e.target.checked)
    updatePostStateMutation.mutate(id)
  }

  return (
    <div className='post--item' key={post?._id}>
      <h4>{post?.title}</h4>
      <h4>{post?.author}</h4>
      {
        !id && <ButtonDelete id={post._id} action={deletePostMutation} />
      }
      <div className="toggle"  onClick={(e) => e.stopPropagation()}>
        <Toggle
        className='toggle--button'
          icons={false}
          checked={post?.done}
          onChange={(e)=>handleChange(post?._id,e)}
        />
        <span>{post?.done ? "Completed" : "Pending"}</span>
      </div>

    </div>
  )
}

export default PostCard