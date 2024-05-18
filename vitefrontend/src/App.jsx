import react from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Not_Found from './pages/Not_Found'
import Register from './pages/Register'
import Protected_Route from './components/Protected_Route'

function Logout(){
  localStorage.clear()
  return <Navigate to="/login" />
  
}

function RegisterAndLogout(){
  localStorage.clear()
  return <Register />

}


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Protected_Route>
              <Home />
            </Protected_Route>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<Not_Found />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
