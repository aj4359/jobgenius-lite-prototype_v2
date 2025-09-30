
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import Demo from './pages/Demo'
import Onboarding from './pages/Onboarding'
import AppShell from './pages/AppShell'
import Status from './pages/Status'

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/demo', element: <Demo /> },
  { path: '/onboarding', element: <Onboarding /> },
  { path: '/app', element: <AppShell /> },
  { path: '/status', element: <Status /> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
