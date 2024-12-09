import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'


import App from './App.tsx';

export const backendUrl = 'http://localhost:9000'

createRoot(document.getElementById('root')!).render(
  <StrictMode>   
    <App/>
  </StrictMode>,
)
