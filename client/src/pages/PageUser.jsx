import React from 'react'
import { useParams } from 'react-router-dom'
import { usePost } from '../context/Posts.context';
import PostCard from '../components/PostCard';
import HandleQuery from '../components/HandleQuery';

function PageUser() {
  const { id } = useParams()
  const { getPostByUserId } = usePost()
  const { data: posts, isLoading, isError } = getPostByUserId(id)
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>
  console.log(posts);

  return (
    <main>
      <h2 className='title'>User</h2>
      <HandleQuery isError={isError} isLoading={isLoading}>
        <div className="post--container">
          {posts.length === 0 ? <h3>No posts</h3> :
            posts.map((post) => (
              <PostCard post={post} />
            ))}
        </div>
      </HandleQuery>
    </main>
  )
}

export default PageUser
