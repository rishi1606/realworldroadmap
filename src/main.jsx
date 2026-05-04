import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './context/AuthContext'
import { Provider } from 'react-redux'
import { store } from './store'
import './index.css'
import App from './App.jsx'

import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <AuthProvider>
          <Toaster
            position="bottom-right"
            toastOptions={{
              success: { style: { background: '#10B981', color: '#fff', fontWeight: '500' }, iconTheme: { primary: '#fff', secondary: '#10B981' } },
              error: { style: { background: '#EF4444', color: '#fff', fontWeight: '500' }, iconTheme: { primary: '#fff', secondary: '#EF4444' } },
              style: { borderRadius: '8px' }
            }}
          />
          <App />
        </AuthProvider>
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>,
)
