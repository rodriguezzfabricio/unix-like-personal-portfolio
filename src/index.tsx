import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
// Import App from jsx file instead
import App from './App.jsx'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
) 