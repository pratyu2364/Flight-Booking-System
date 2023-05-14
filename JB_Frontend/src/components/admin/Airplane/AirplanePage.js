import React, { useContext, useEffect, useState } from 'react'
import { orderApi } from '../../misc/OrderApi';
import AirplaneForm from './AirplaneForm';
import AirplaneList from './AirplaneList';
import AuthContext from '../../context/AuthContext';
import { handleLogError } from '../../misc/Helpers';

export default function AirplanePage() {
    const Mycontext = useContext(AuthContext);
    const [state, setState] =
    useState({
        name:'',
        seatingCapacity:'',
        companyName:'',
        airplanes:[]
    })
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    }
    useEffect(() => {
        console.log('Component mounted');
        handleGetAirplane()
      },[]);
      const handleCreateAirplane = (e) => {
        const Auth = Mycontext
        const user = Auth.getUser()
        e.preventDefault();
        if (state.companyName === "" || state.seatingCapacity=== "") {
          alert("All the fields are mandatory!");
          return;
        }
        const air = {name:state.name,companyName:state.companyName,seatingCapacity:state.seatingCapacity}
        orderApi.addAirplane(user,air)
          .then(() => {
            setState(Prevstate => ({...Prevstate,name:'',seatingCapacity:'',companyName:''}))
            handleGetAirplane();
          })
          .catch(error => {
            handleLogError(error)
          })
      }
      const handleDeleteAirplane = (id) =>{
        const Auth = Mycontext
        const user = Auth.getUser()
        orderApi.deleteAirplane(user,id)
        .then(()=>{ 
          setState(Prevstate => ({...Prevstate,name:'',seatingCapacity:'',companyName:''}))
          handleGetAirplane()}) 
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
      <AirplaneForm 
      state ={state}
      handleInputChange={handleInputChange}
      handleCreateAirplane={handleCreateAirplane}
      />
      <AirplaneList airplanes ={state.airplanes}
      handleDeleteAirplane = {handleDeleteAirplane}/>
    </div>
  )
}
