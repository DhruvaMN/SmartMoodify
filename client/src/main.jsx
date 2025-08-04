import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {PreferenceContextProvider} from './components/PreferenceContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>  
    <PreferenceContextProvider>
      <App />
    </PreferenceContextProvider>
  </StrictMode>,
)
