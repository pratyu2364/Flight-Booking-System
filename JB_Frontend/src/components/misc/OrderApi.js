import axios from 'axios'
// import { config } from '../../Constants'
import { parseJwt } from './Helpers'
import dev from '../../development'
import docker_deploy from '../../docker_deploy'
import prod from '../../production'


export const orderApi = {
  authenticate,
  register,
  numberOfUsers,
  numberOfOrders,
  getUsers,
  deleteUser,
  getOrders,
  deleteOrder,
  createOrder,
  getUserMe,
  getAllAirplanes,
  addAirplane,
  addAirport,
  getAllAirports,
  addFlightTrip,
  getAllFlightTrips,
  searchAllFlightTrips,
  searchAllFlightTripsWithSeat,
  deleteAirplane,
  deleteAirport,
  deleteFlightTrip,
  bearerAuth,
  getAllAirportsForUser,
  getAvailableSeats,
  getAllSeats,
  bookTickets,
  getAllTickets
}

function authenticate(email, password) {
  return instance.post('/api/v1/auth/authenticate', { email, password }, {
    headers: { 'Content-type': 'application/json' }
  })
}

function register(user) {
  return instance.post('/api/v1/auth/register', user, {
    headers: { 'Content-type': 'application/json' }
  })
}

function numberOfUsers() {
  return instance.get('/public/numberOfUsers')
}

function numberOfOrders() {
  return instance.get('/public/numberOfOrders')
}


function getUsers(user, username) {
  const url = username ? `/api/users/${username}` : '/api/users'
  return instance.get(url, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function getAllAirplanes(user) {
  return instance.get('/admin/get-all-airplanes', {
    headers: { 'Authorization': bearerAuth(user) }
  })
}
function getAllAirportsForUser(user) {
  return instance.get('/user/get-all-airport', {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function getAllAirports(user) {
  return instance.get('/admin/get-all-airport', {
    headers: { 'Authorization': bearerAuth(user) }
  })
}
function addAirport(user, airport) {
  return instance.post('/admin/add-airport', airport, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': bearerAuth(user)
    }
  })
}
//Getting list of traveller booked by the user
function getAllTickets(user,email) {
  const url  = `/user/get-traveller/${email}`
  return instance.get(url, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': bearerAuth(user)
    }
  })
}
function addAirplane(user, airplane) {
  return instance.post('/admin/add-airplane', airplane, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': bearerAuth(user)
    }
  })
}
function addFlightTrip(user, flighttrip) {
  return instance.post('/admin/add-flight-trips', flighttrip, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': bearerAuth(user)
    }
  })
}
function getAllFlightTrips(user) {
  return instance.get('/admin/get-all-flight-trips', {
    headers: { 'Authorization': bearerAuth(user) }
  })
}
function deleteAirplane(user, id) {
  return instance.delete(`/admin/delete-airplane/${id}`, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}
function deleteAirport(user, id) {
  return instance.delete(`/admin/delete-airport/${id}`, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}
function deleteFlightTrip(user, id) {
  return instance.delete(`/admin/delete-flight-trip/${id}`, {
    headers: { 'Authorization': bearerAuth(user) }
  })

}
function searchAllFlightTripsWithSeat(user, paramst) {
  return instance.get(`/user/search-all-seats`, {
    params: { dept_city: paramst.deptcity, arr_city: paramst.arrcity, date: paramst.searchdate, seats_required: paramst.seat },
    headers: { 'Authorization': bearerAuth(user) }
  })
}
function searchAllFlightTrips(user, params) {
  return instance.get(`/user/search-all/${params.deptcity}/${params.arrcity}/${params.searchdate}`, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}


function deleteUser(user, username) {
  return instance.delete(`/api/users/${username}`, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function getOrders(user, text) {
  const url = text ? `/api/orders?text=${text}` : '/api/orders'
  return instance.get(url, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function deleteOrder(user, orderId) {
  return instance.delete(`/api/orders/${orderId}`, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function createOrder(user, order) {
  return instance.post('/api/orders', order, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': bearerAuth(user)
    }
  })
}

function getUserMe(user) {
  return instance.get('/api/users/me', {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

// Booking

function getAvailableSeats(user, tripId) {
  return instance.get(`/user/${tripId}/seats/available`, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function getAllSeats(user,tripId){
  return instance.get(`/user/${tripId}/seats/all`, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function bookTickets(user,bookingDetails){
  return instance.post(`/user/book`,bookingDetails, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}



// -- Axios


let config

if (process.env.NODE_ENV === 'deployment') {
  config = docker_deploy;
} else if (process.env.NODE_ENV === 'production') {
  config = prod
} else {
  config = dev
}

console.log('Value of config: ', config.url.API_BASE_URL);

const instance = axios.create({
  baseURL: config.url.API_BASE_URL
})

instance.interceptors.request.use(function (config) {
  // If token is expired, redirect user to login
  if (config.headers.Authorization) {
    const token = config.headers.Authorization.split(' ')[1]
    const data = parseJwt(token)
    if (Date.now() > data.exp * 1000) {
      window.location.href = "/login"
    }
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// -- Helper functions

function bearerAuth(user) {
  return `Bearer ${user.accessToken}`
}