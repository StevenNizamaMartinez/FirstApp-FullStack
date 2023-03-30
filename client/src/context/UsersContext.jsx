import { useContext, createContext, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom";
import { getUserRequest, getUsersRequest } from "../app/usersApi";

export const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const getUsers = () => {
    const users = useQuery({
      queryKey: ["users"],
      queryFn: getUsersRequest,
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error) => {
        console.log(error);
      }
    })
    return users
  }

  const getUser = () => {
    const users = useQuery({
      queryKey: ["users"],
      queryFn: getUserRequest,
      onSuccess: (data) => {
        setUser(data)
      },
      onError: (error) => {
        console.log(error);
      }
    })
    return users
  }


  return (
    <UserContext.Provider value={{ getUsers, getUser, user }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  return context
}

export default UserProvider