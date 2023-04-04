import { useContext, createContext, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { loginRequest, logoutRequest, registerRequest } from "../app/authApi";
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const navigate = useNavigate()
  
  const loginMutate = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      console.log(data);
      localStorage.setItem("token", data)
      toast.dismiss()
      setToken(data)
      toast.success("Usuario logeado con éxito")
      navigate("/profile")
    },
    onError: (error) => {
      console.log(error.response.data);
      if (!error.response.data) return toast.error("Error al iniciar sesion")
      toast.error(error.response.data)
    }
  })

  const registerMutate = useMutation({
    mutationFn: registerRequest,
    onSuccess: (data) => {
      toast.dismiss()
      console.log(data);
      setToken(data)
      localStorage.setItem("token", data)
      toast.success("Usuario registrado con éxito")
      navigate("/profile")
    },
    onError: (error) => {
      if (!error.response.data) return toast.error("Error al registrar usuario")
      toast.error(error.response.data)
    }
  })

  const logoutMutation = useMutation({
    mutationFn: logoutRequest,
    onSuccess: (data) => {
      console.log(data);
      toast.dismiss()
      toast.success("Hasta Luego :)")
      localStorage.removeItem("token")
      navigate("/")
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error al cerrar sesión")
    }
  })


  return (
    <AuthContext.Provider value={{ loginMutate, registerMutate, logoutMutation,token }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  return context
}

export default AuthProvider