import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import Customers from './customers.tsx'
import { Provider } from 'react-redux'
import { store } from './integrations/store.ts'
import Alert_System from './integrations/features/alert/Alert.tsx'
import { BrowserRouter, Route, Routes } from "react-router";
import Payments from './payments.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <Alert_System />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/payments/:transactionId" element={<Payments />} />

      {/* <Route path="/" element={<App />} /> */}
    </Routes>
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
