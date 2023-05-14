import React, { useContext, useState } from 'react'
import AuthContext, { useAuth } from '../../context/AuthContext';
import { orderApi } from '../../misc/OrderApi';
import { useEffect } from 'react';
import { handleLogError } from '../../misc/Helpers';

export default function ShowTicketsPage() {
    const Mycontext = useContext(AuthContext);
    const [state, setState] =useState({travellers:[]})
    useEffect(() => {
        console.log('Component mounted');
        handleGetAllTickets()
      },[]);
      const handleGetAllTickets = () => {
        const Auth = Mycontext
        const user = Auth.getUser()
        orderApi.getAllTickets(user,user.data.name)
          .then(response => {
            setState(Prevstate => ({...Prevstate,travellers:response.data}))
          })
          .catch(error => {
            handleLogError(error)
          })
      } 

  return (

    <div>
      
    </div>
  )
}
