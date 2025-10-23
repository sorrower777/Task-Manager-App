import React, { useEffect } from 'react'
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/Register.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Errorpage from './pages/Errorpage.jsx'
import {MainContextProvider} from './context/MainContext.jsx'
import { ToastContainer } from 'react-toastify'
import ProtectedLayout from './layout/ProtectedLayout.jsx'
import AddTaskPage from './pages/AddTaskPage.jsx'
import Aos from 'aos'
import 'aos/dist/aos.css'

const App = () => {
  useEffect(() => {
    Aos.init();
    Aos.refresh();
  }, []);
  return (
    <>
      <BrowserRouter>
      <MainContextProvider >
        <ToastContainer />
        <Navbar />
          <Routes>
            <Route Component={ProtectedLayout}>
              <Route path = '/' Component={Dashboard}/>
              <Route path = '/add-task' Component={AddTaskPage}/>
            </Route>
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