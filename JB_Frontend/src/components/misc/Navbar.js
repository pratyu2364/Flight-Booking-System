import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Menu } from 'semantic-ui-react'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { getUser, userIsAuthenticated, userLogout } = useAuth()

  const logout = () => {
    userLogout()
  }

  const enterMenuStyle = () => {
    return userIsAuthenticated() ? { "display": "none" } : { "display": "block" }
  }

  const logoutMenuStyle = () => {
    return userIsAuthenticated() ? { "display": "block" } : { "display": "none" }
  }

  const adminPageStyle = () => {
    const user = getUser()
    return user && user.data.role === 'ROLE_ADMIN' ? { "display": "block" } : { "display": "none" }
  }

  const userPageStyle = () => {
    const user = getUser()
    return user && user.data.role === 'ROLE_USER' ? { "display": "block" } : { "display": "none" }
  }

  const getUserName = () => {
    const user = getUser()
    return user ? user.data.name : ''
  }

  return (
    <Menu inverted color='blue' stackable size='massive' style={{borderRadius: 0}}>
      <Container>
        <Menu.Item header>Jahaz Booker</Menu.Item>
        <Menu.Item as={Link} exact='true' to="/">Home</Menu.Item>
        <Menu.Item as={Link} to="/airplane" style={adminPageStyle()}>Airplane</Menu.Item>
        <Menu.Item as={Link} to="/airport" style={adminPageStyle()}>Airport</Menu.Item>
        <Menu.Item as={Link} to="/flighttrip" style={adminPageStyle()}>Flight Trip</Menu.Item>
        <Menu.Item as={Link} to="/search-flight-trips" style={userPageStyle()}>Search Flights</Menu.Item>
        <Menu.Item as={Link} to="/show-tickets" style={userPageStyle()}>View Tickets</Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item as={Link} to="/login" style={enterMenuStyle()}>Login</Menu.Item>
          <Menu.Item as={Link} to="/signup" style={enterMenuStyle()}>Sign Up</Menu.Item>
          <Menu.Item header style={logoutMenuStyle()}>{`Hi ${getUserName()}`}</Menu.Item>
          <Menu.Item as={Link} to="/" style={logoutMenuStyle()} onClick={logout}>Logout</Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  )
}

export default Navbar
