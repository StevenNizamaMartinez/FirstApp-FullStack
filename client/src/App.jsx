import { Routes, Route, NavLink,useNavigate } from "react-router-dom"
import PageHome from "./pages/PageHome"
import PageNotFound from "./pages/PageNotFound"
import PageRegister from "./pages/PageRegister"
import PageLogin from "./pages/PageLogin"
import PageProfile from "./pages/PageProfile"
import PageDashboard from "./pages/PageDashboard"
import "./App.css"
import PageProtected from "./pages/PageProtected"
import PageNotes from "./pages/PageNotes"
import { useEffect } from "react"
import { useAuth } from "./context/AuthContext"

function App() {
  const navigate  = useNavigate()
  const {token} = useAuth()
  useEffect(()=>{
    if (!token) return navigate("/")
  },[token])

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<PageHome />} />
        <Route path="/register" element={<PageRegister />} />
        <Route path="/login" element={<PageLogin />} />
        <Route>
          <Route element={<PageProtected />}>
            <Route path="/profile" element={<PageProfile />} />
            <Route path="/notes" element={<PageNotes />} />
            <Route path="/dashboard" element={<PageDashboard />} />
          </Route>
        </Route>
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </div>
  )
}

export default App