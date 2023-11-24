import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import router from './Router/Router/router.jsx'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './Context/AuthProvider/AuthProvider.jsx'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
)