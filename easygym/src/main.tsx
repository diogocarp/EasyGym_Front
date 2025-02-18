import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
'use client';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
