import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('🚨 MAIN.TSX LOADED - React should be working! 🚨');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

console.log('🚨 APP COMPONENT SHOULD BE RENDERING NOW! 🚨');
