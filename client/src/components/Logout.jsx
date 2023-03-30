import { useAuth } from "../context/AuthContext"

function Logout() {

  const {logoutMutation} = useAuth()

  const handleClick = () => {
    logoutMutation.mutate()
    localStorage.removeItem('token')
  }

  return (
    <button onClick={handleClick}>
      Logout
    </button>
  )
}

export default Logout