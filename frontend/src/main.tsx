
import React from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios'

const api = import.meta.env.VITE_API_BASE || 'http://localhost:10000/api'

function App(){
  return <div>CEE Front (placeholder) – API: {api}</div>
}
createRoot(document.getElementById('root')!).render(<App />)
