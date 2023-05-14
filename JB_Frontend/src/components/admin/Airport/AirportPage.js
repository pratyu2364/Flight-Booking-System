import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/AuthContext';
import { orderApi } from '../../misc/OrderApi';
import AirportForm from './AirportForm';
import { handleLogError } from '../../misc/Helpers';
import AirportList from './AirportList';

export default function AirportPage() {
  const Mycontext = useContext(AuthContext);
  const [state, setState] = 
  useState({ name: '',
  location: '',
  city: '',
  state: '',
  country: '',
  pincode: '',
  airports:[],
val:false })

// const handleInputChange = (e) => {
//   this.setState({ [e.target.name]: e.target.value })
// }
const handleInputChange = (event) => {
  const { name, value } = event.target;
  setState(prevState => ({ ...prevState, [name]: value }));
}
  useEffect(() => {
    handleGetAirport()
    console.log('Component mounted');
  },[]);

  // useEffect(() => {
  //   console.log('Component updated');
  //   handleGetAirport()
  //   setState({val:false})
  // },[state.val===true]);

  const handleCreateAirport =(e) =>{
    const Auth = Mycontext
    const user = Auth.getUser()
    e.preventDefault();
    console.log("name: "+state.name)
    const airport = {name:state.name,location:state.location,city:state.city,state:state.state,country:state.country,pincode:state.pincode}
    orderApi.addAirport(user,airport)
      .then(() => {
        setState(Prevstate => ({...Prevstate,name:'',location:'',city:'',state:'',country:'',pincode:''}))
        handleGetAirport();

      })
      .catch(error => {
        handleLogError(error)
      })

 
  }
  const handleDeleteAirport = (id) =>{
    const Auth = Mycontext
    const user = Auth.getUser()
    orderApi.deleteAirport(user,id)
    .then(()=>{ 
      handleGetAirport()}) 
  }
  const handleGetAirport = ()=>{
    const Auth = Mycontext
    const user = Auth.getUser()
    orderApi.getAllAirports(user)
      .then(response => {
        setState({ airports: response.data })
      })
      .catch(error => {
        handleLogError(error)
      })
  }
  return (
    <div>
      <AirportForm
        state={state}
        handleInputChange={handleInputChange}
        handleCreateAirport={handleCreateAirport}
        />
        <AirportList airports = {state.airports} handleDeleteAirport ={handleDeleteAirport}/>
    </div>
  )
}
