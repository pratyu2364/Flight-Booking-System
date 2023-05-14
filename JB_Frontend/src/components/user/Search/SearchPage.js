import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../context/AuthContext';
import SearchForm from './SearchForm';
import SearchList from './SearchList';
import { orderApi } from '../../misc/OrderApi';
import { handleLogError } from '../../misc/Helpers';
import SortFilter from './SortFilter';
import FilterForm from './FilterForm';

export default function SearchPage() {
  // const classes = useStyles();
  const Mycontext = useContext(AuthContext);
  const options = ['Departure Time','Arrival Time','Price']
  const priceOptions = ['Any','Below 2000','2000 - 5000','5000 - 8000','8000 - 10,000','Above 10,000']
  const airlinesOption = ['Any','Spice Jet','Indigo','Air Asia','Qatar Airline']
  const [state, setState] = 
  useState({ flighttrips:[],
      deptcity:'',
      arrcity:'',
      searchdate:null,
      seat:'',
      airportlist:[],
   })
   const [orginalFlightList, setOriginalFlightList] = useState([])
   const [filter, setFilter] = useState({priceRange:'',airlineType:''})
   useEffect(() => {
      console.log('Component mounted');
      const Auth = Mycontext
      const user = Auth.getUser()
      orderApi.getAllAirportsForUser(user)
      .then(response =>{setState(prevState => ({ ...prevState, airportlist:response.data }))})

  },[])
  const handleInputChangeForFilter = (event) =>{
    const {name, value} = event.target;
    setFilter(prevState => ({ ...prevState, [name]: value }));
  }
  const handleInputChange = (event) => {
      const { name, value } = event.target;
      setState(prevState => ({ ...prevState, [name]: value }));
      }
  const handleInputChangeForDate = (date,name)=>{
          setState(prevState => ({ ...prevState, [name]: date }));
        }
  const sortByPrice = () => {
          const sortedflighttrips = [...state.flighttrips].sort((a, b) => a.price - b.price);
          setState(prevState => ({ ...prevState,flighttrips:sortedflighttrips}));
    } 
    // arrivalTime, departTime
    const sortByDeptTime= () =>{
      const sortedflighttrips = [...state.flighttrips].sort((a, b) => new Date(a.departTime) -  new Date(b.departTime));
      setState(prevState => ({ ...prevState,flighttrips:sortedflighttrips}));
    }   
    const sortByArrivalTime= () =>{
      const sortedflighttrips = [...state.flighttrips].sort((a, b) => new Date(a.arrivalTime) -  new Date(b.arrivalTime));
      setState(prevState => ({ ...prevState,flighttrips:sortedflighttrips}));
    } 
  const onSortChange = (value) =>{
    if(value==='Price'){
      sortByPrice()
    }
    if(value==='Departure Time'){
      sortByDeptTime()
    }
    if(value==='Arrival Time'){
      sortByArrivalTime()
    }

  }      
  // const navigate = useNavigate()
  const fliterFlightTripsByPrinceRange = ()=>{
    if(filter.priceRange==='Below 2000'){
       const filteredData = state.flighttrips.filter((flighttrip) => {
        return flighttrip.price <2000; });
        setState(prevState => ({ ...prevState,flighttrips:filteredData}));
    }
     if(filter.priceRange==='2000 - 5000'){
      const filteredData = state.flighttrips.filter((flighttrip) => {
        return flighttrip.price >=2000 && flighttrip.price<5000;})
        setState(prevState => ({ ...prevState,flighttrips:filteredData}));
    }
     if(filter.priceRange==='5000 - 8000'){
      const filteredData = state.flighttrips.filter((flighttrip) => {
        return flighttrip.price >=5000 && flighttrip.price<8000;})
        setState(prevState => ({ ...prevState,flighttrips:filteredData}));
    }
    if(filter.priceRange==='8000 - 10,000'){
      const filteredData = state.flighttrips.filter((flighttrip) => {
        return flighttrip.price >=8000 && flighttrip.price<10000;})
        setState(prevState => ({ ...prevState,flighttrips:filteredData}));
    }
    if(filter.priceRange==='Above 10,000'){
      const filteredData = state.flighttrips.filter((flighttrip) => {
        return flighttrip.price >=10000;})
        setState(prevState => ({ ...prevState,flighttrips:filteredData}));
    }
  }
  const filterFlightTripsByAirlines = ()=>{

  }
  const fliterFlightTrips = (e) => {
    const Auth = Mycontext
    const user = Auth.getUser()
    e.preventDefault()
    setState(prevState => ({ ...prevState,flighttrips:orginalFlightList}));
    fliterFlightTripsByPrinceRange()
    filterFlightTripsByAirlines()
  }   
  const handleSearchFlightTrips = (e)=>{
      const Auth = Mycontext
      const user = Auth.getUser()
      e.preventDefault()
      const dateString = state.searchdate.toISOString().slice(0, -1);
      const params = {deptcity:state.deptcity,arrcity:state.arrcity,searchdate:dateString,seat:state.seat}
      console.log(params)
      orderApi.searchAllFlightTripsWithSeat(user,params)
          .then(response => {
              setState(prevState=>({...prevState ,flighttrips: response.data}))
              console.log(state.flighttrips)
              setOriginalFlightList(response.data)
              // if(state.flighttrips.length > 0){
              //    navigate('/display-flight-trips', { state: state.flighttrips});
              // }
          })
          .catch(error => {
          handleLogError(error)
          })

      }
  return (
    <div>
      <SearchForm handleInputChange = {handleInputChange}
      handleInputChangeForDate = {handleInputChangeForDate}
      handleSearchFlightTrips = {handleSearchFlightTrips}
      state = {state}
      />
      <SortFilter options={options}
      onSortChange={onSortChange}
      />
      <FilterForm handleInputChangeForFilter={handleInputChangeForFilter} 
      priceOptions = {priceOptions}
      airlinesOption = {airlinesOption}
      fliterFlightTrips={fliterFlightTrips}
      filter={filter}
      />
      <SearchList flighttrips={state.flighttrips} numSeats={state.seat}/>
    </div>
  )
}
