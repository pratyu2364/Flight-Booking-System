import React, { useContext, useEffect, useState } from 'react'
import FligtTripForm from './FligtTripForm'
import AuthContext from '../../context/AuthContext';
import { orderApi } from '../../misc/OrderApi';
import { handleLogError } from '../../misc/Helpers';
import FlightTripList from './FlightTripList';

export default function FlightTripPage() {
    const Mycontext = useContext(AuthContext);
    const [state, setState] =useState({airports:[],airplanes:[],flighttrips:[]})
    const [flighttrip, setFlighttrip] = useState({
        airportDepartureId:'',
        airportArrivalId:'',
        flightId:'',
        departTime:null,
        arrivalTime:null,
        price:''
    })
    useEffect(() => {
        handleGetAirport()
        handleGetAirplane()
        handleGetFlightTrip()
        console.log('Component mounted');
    },[]);
      const handleInputChange = (event) => {
        const target = event.target;
        const value = target.value; 
        const name = target.name;
        setFlighttrip(prevState => ({ ...prevState, [name]: value }));
      }  
      const handleInputChangeForDate = (date,name)=>{
        setFlighttrip(prevState => ({ ...prevState, [name]: date }));
      }
 
    const handleCreateFlightTrip =(e) =>{
        const Auth = Mycontext
        const user = Auth.getUser()
        e.preventDefault();
        console.log("flight Id "+flighttrip.flightId)
        const arrivalTime =flighttrip.arrivalTime.toISOString();
        const departTime = flighttrip.departTime.toISOString();
        // console.log("Arrival Time "+arrivalTime)
        //  console.log("Departure Time "+departTime)
        //  console.log("Arriva Date "+flighttrip.arrivalTime.toString())
        const flightTrip = {
            airportArrivalId:flighttrip.airportArrivalId,
            airportDepartureId:flighttrip.airportDepartureId,
            flightId:flighttrip.flightId,
            departTime:departTime,
            arrivalTime:arrivalTime,
            price:flighttrip.price
        }
        console.log("price: "+flightTrip.price)
        orderApi.addFlightTrip(user,flightTrip)
          .then(() => {
            setFlighttrip(Prevstate => ({...Prevstate,airportDepartureId:'',  airportArrivalId:'',flightId:'',price:'',departTime:null,arrivalTime:null}))
           handleGetFlightTrip()
    
          })
          .catch(error => {
            handleLogError(error)
          })
      }

    const handleGetAirport = ()=>{
        const Auth = Mycontext
        const user = Auth.getUser()
        orderApi.getAllAirports(user)
          .then(response => {
            setState(Prevstate => ({...Prevstate,airports:response.data}))
          })
          .catch(error => {
            handleLogError(error)
          })
      }
      const handleDeleteFlightTrip = (id) =>{
        const Auth = Mycontext
        const user = Auth.getUser()
        orderApi.deleteFlightTrip(user,id)
        .then(()=>{ 
          handleGetFlightTrip()}) 
      }
      const handleGetFlightTrip= ()=>{
        const Auth = Mycontext
        const user = Auth.getUser()
        orderApi.getAllFlightTrips(user)
          .then(response => {
            setState(Prevstate => ({...Prevstate,flighttrips:response.data}))
          })
          .catch(error => {
            handleLogError(error)
          })
      }


      const handleGetAirplane = () => {
        const Auth = Mycontext
        const user = Auth.getUser()
        orderApi.getAllAirplanes(user)
          .then(response => {
            setState(Prevstate => ({...Prevstate,airplanes:response.data}))
          })
          .catch(error => {
            handleLogError(error)
          })
      }  
  return (
    <div>
      <FligtTripForm 
      airplanes = {state.airplanes}
      airports = {state.airports}
      flighttrip ={flighttrip}
      handleCreateFlightTrip = {handleCreateFlightTrip}
      handleInputChangeForDate ={handleInputChangeForDate}
      handleInputChange = {handleInputChange}
      />
      <FlightTripList flighttrips = {state.flighttrips} handleDeleteFlightTrip={handleDeleteFlightTrip}/>

    </div>
  )
}
