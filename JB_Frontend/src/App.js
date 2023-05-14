import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './components/context/AuthContext'
import PrivateRoute from './components/misc/PrivateRoute'
import Navbar from './components/misc/Navbar'
import Home from './components/home/Home'
import Login from './components/home/Login'
import Signup from './components/home/Signup'
import AdminPage from './components/admin/AdminPage'
import UserPage from './components/user/UserPage'
import AirplanePage from './components/admin/Airplane/AirplanePage'
import AirportPage from './components/admin/Airport/AirportPage'
import FlightTripPage from './components/admin/Flight Trip/FlightTripPage'
import SearchPage from './components/user/Search/SearchPage'
import BookPage from './components/user/Book/BookPage'
import SearchForm from './components/user/Search/SearchForm'
import SearchList from './components/user/Search/SearchList'
import ShowTicketsPage from './components/user/ShowTickets/ShowTicketsPage'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/adminpage" element={<PrivateRoute><AdminPage/></PrivateRoute> }/>
          <Route path="/airplane" element={<PrivateRoute><AirplanePage/></PrivateRoute> }/>
          <Route path="/airport" element={<PrivateRoute><AirportPage/></PrivateRoute> }/>
          <Route path="/flighttrip" element={<PrivateRoute><FlightTripPage/></PrivateRoute> }/>
          <Route path="/userpage" element={<PrivateRoute><UserPage /></PrivateRoute>}/>
          <Route path = "/search-flight-trips"element={<PrivateRoute><SearchPage/></PrivateRoute>}/>
          <Route path = "/book"element={<PrivateRoute><BookPage/></PrivateRoute>}/>
          <Route path = "/show-tickets"element={<PrivateRoute><ShowTicketsPage/></PrivateRoute>}/>
          <Route path="*" element={<Navigate to="/" />}/>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
