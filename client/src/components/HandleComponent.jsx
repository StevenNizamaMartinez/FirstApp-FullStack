import React from 'react'
import { usePost } from '../context/Posts.context'
import HandleQuery from './HandleQuery'
import PostCard from './PostCard'

function HandleComponent() {

  const { getPost } = usePost()
  const { data, isLoading, isError } = getPost()


  return (
    <HandleQuery isError={isError} isLoading={isLoading}>
      <>
        {data?.length > 0 ? 
        data?.map((post) => (
         <PostCard post={post} key={post._id}/>
        )) 
        : 
        (<h4>No posts</h4>)}
      </>
    </HandleQuery>
  )
}

export default HandleComponent