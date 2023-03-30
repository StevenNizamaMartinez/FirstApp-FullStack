import { useEffect } from 'react'
import NavBar from '../components/NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useJwt } from "react-jwt"
import { toast } from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

function PageProtected() {
  const navigate = useNavigate()
  const {token } = useAuth()
  const { decodedToken,isExpired } = useJwt(token)

  useEffect(() => {
    if (isExpired) {
      toast.error("Your session has expired")
      localStorage.removeItem("token")
      return navigate("/")
    }
  }, [isExpired])

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}

export default PageProtected