import React from 'react'
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/Register.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Errorpage from './pages/Errorpage.jsx'
import {MainContextProvider} from './context/MainContext.jsx'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <>
      <BrowserRouter>
      <MainContextProvider >
        <ToastContainer />
        <Navbar />
          <Routes>
            <Route path = '/' Component={Dashboard}/>
            <Route path = '/login' Component={LoginPage}/>
            <Route path = '/register' Component={RegisterPage}/>
            <Route path = '*' Component={Errorpage}/>
          </Routes>
          <Footer />
      </MainContextProvider>
      </BrowserRouter>

    </>
  )
}

export default App