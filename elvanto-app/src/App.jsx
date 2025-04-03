import './App.css'
import Service from './Service'
import { getServiceGroups } from './FetchData'
import { useState, useEffect } from 'react'

function App() {
  const [services, setServices] = useState(null)

  useEffect(() => {
    async function fetchServices() {
        const data = await getServiceGroups();
        setServices(data)
    }
    fetchServices()
}, [])

if (!services) return <p>Loading...</p>

  return (
    <>
      <div className="service-container">
        <Service service={services.m1Group} />
        <Service service={services.w1Group} />
        <Service service={services.r1Group} />
        <Service service={services.m2Group} />
        <Service service={services.w2Group} />
      </div>
    </>
  )
}

export default App
