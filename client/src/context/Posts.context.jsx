import { useContext, createContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom";
import { createPostRequest, deletePostRequest, getPostByIdRequest, getPostRequest, getPostsRequest, updatePostStatusRequest } from "../app/postApi";

export const PostContext = createContext()

const PostProvider = ({ children }) => {
  const queryClient = useQueryClient()
  const [post, setPost] = useState(null)
  const navigate = useNavigate()

  const getPosts = () => {
    const users = useQuery({
      queryKey: ["posts"],
      queryFn: getPostsRequest,
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error) => {
        console.log(error);
      }
    })
    return users
  }

  const getPost = () => {
    const users = useQuery({
      queryKey: ["post"],
      queryFn: getPostRequest,
      onSuccess: (data) => {
        setPost(data)
      },
      onError: (error) => {
        console.log(error);
      }
    })
    return users
  }

  const getPostById = (id) => {
    const users = useQuery({
      queryKey: ["post",id],
      queryFn: getPostByIdRequest,
      onSuccess: (data) => {
        setPost(data)
      },
      onError: (error) => {
        console.log(error);
      }
    })
    return users
  }

  const createPostMutation = useMutation(
    {
      mutationFn: createPostRequest,
      onSuccess: (data) => {
        console.log(data)
        toast.success("Post created")
        navigate("/notes")
      },
      onError: (error) => {
        console.log(error)
        toast.error("Error creating post")
      },
    },
    queryClient.invalidateQueries(["post"])
  )

  const deletePostMutation = useMutation({
    mutationFn: deletePostRequest,
    onSuccess: (data) => {
      console.log(data)
      toast.dismiss()
      toast.success("Post deleted")
      navigate("/notes")
    },
    onError: (error) => {
      console.log(error)
      toast.error("Error deleting post")
    }
  },
  queryClient.invalidateQueries(["post"])
  )

  const updatePostStateMutation = useMutation({
    mutationFn: updatePostStatusRequest,
    onSuccess: (data) => {
      console.log(data)
      toast.dismiss()
      toast.success("Post updated")
      navigate("/notes")
    },
    onError: (error) => {
      console.log(error)
      toast.error("Error updating post")
    }
  },
  queryClient.invalidateQueries(["post"])
  )



  return (
    <PostContext.Provider value={{ getPosts, getPost,getPostById, createPostMutation, deletePostMutation, updatePostStateMutation,post }}>
      {children}
    </PostContext.Provider>
  )
}

export const usePost = () => {
  const context = useContext(PostContext)
  return context
}

export default PostProvider