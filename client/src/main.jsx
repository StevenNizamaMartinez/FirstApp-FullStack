import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import AuthProvider from './context/AuthContext'
import UserProvider from './context/UsersContext'
import PostProvider from './context/Posts.context'
import App from './App'
import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <PostProvider>
          <UserProvider>
            <AuthProvider>
              <Toaster />
              <App />
            </AuthProvider>
          </UserProvider>
        </PostProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
