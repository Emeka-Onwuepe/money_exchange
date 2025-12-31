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
import Header from './components/header.tsx'
import Analytics from './analytics.tsx'
import SignUpForm from './components/forms/signUpForm.tsx'
import LoginForm from './components/forms/loginForm.tsx'
import Loading from './components/loading.tsx'
import Footer from './components/footer.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      
    <BrowserRouter>
        <Alert_System />

        <Header/>
        <Loading/>

    <Routes>

      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/login" element={<LoginForm />} />

      <Route path="/" element={<App />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/payments/:transactionId" element={<Payments />} />
      {/* <Route path="/" element={<App />} /> */}
    </Routes>
    <Footer/>

    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
