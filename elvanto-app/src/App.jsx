import './App.css'
import Service from './Service'
import Login from './Login'
import Register from './Register'
import Nav from './Nav'
import { getServiceGroups } from './FetchData'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { LoaderCircle, Loader, LoaderPinwheel } from 'lucide-react'

function Services({services, setServices}) {
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

function App() {
  const [services, setServices] = useState(null);
  const token = localStorage.getItem('token')

  useEffect(() => {
    async function fetchServices() {
        const data = await getServiceGroups();
        setServices(data)
    }
    if (token) fetchServices()
}, [token])

if (token && !services) return (
  <div className='loading'>
    <Loader size={30} className='loader-circle'/>
    <h2>Loading</h2>
  </div> 
)

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            token ? (
              <Services services={services} setServices={setServices} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Routes>
    </Router>
    
  )
}

export default App