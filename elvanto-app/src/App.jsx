import './App.css'
import Service from './Service'
import Login from './Login'
import Register from './Register'
import Nav from './Nav'
import { getServiceGroups } from './FetchData'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { LoaderCircle, Loader, LoaderPinwheel } from 'lucide-react'

function App() {
  const [services, setServices] = useState(null);

  useEffect(() => {
    async function fetchServices() {
        const data = await getServiceGroups();
        setServices(data)
    }
    fetchServices()
}, [])

if (!services) return (
  <div className='loading'>
    <Loader size={30} className='loader-circle'/>
    <h2>Loading</h2>
  </div> 
)

  return (
    <div>
      <Nav setServices={setServices} services={services}/>
      <div className="service-container">
        <Service service={services.m1Group} />
        <Service service={services.r1Group} />
        <Service service={services.w1Group} />
        <Service service={services.m2Group} />
        <Service service={services.w2Group} />
    </div>
    </div>
    
  )
}

export default App
