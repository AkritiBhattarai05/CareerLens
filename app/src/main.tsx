import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AppProvider } from './context/AppContext.tsx';
import {GoogleOAuthProvider} from '@react-oauth/google'

export const server = "http://localhost:5000";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <GoogleOAuthProvider clientId="560817390855-ba5tn6rst8smhed89ofmnbjo0ur7chdt.apps.googleusercontent.com">   <App/> </GoogleOAuthProvider>
   
    </AppProvider>
    
  </StrictMode>
)
