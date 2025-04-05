// LOCAL STORAGE
const [cachedService, setCachedService] = useState(null)

    useEffect(() => {
        const loadServiceData = async () => {
            const cachedData = localStorage.getItem('serviceData')
            if (cachedData) {
                setCachedService(JSON.parse(cachedData))
            } else {
                const fetchedData = await getServiceGroups();
                localStorage.setItem('serviceData', JSON.stringify(fetchedData));
                setCachedService(fetchedData)
            }
        }
        loadServiceData();
    }, []);

    if (!cachedService) {
        return <p>Loading...</p>
    }

    //! APP.JSX WITH LOGIN AND REGISTER

    import './App.css'
import Service from './Service'
import Login from './Login'
import Register from './Register'
import { getServiceGroups } from './FetchData'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  const [services, setServices] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function fetchServices() {
        const data = await getServiceGroups();
        setServices(data)
    }
    fetchServices()
}, [])

if (!services) return <p>Loading...</p>

  return (
    <Router>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login onLogin={() => setIsLoggedIn(true)} />} />

        <Route 
          path='/'
          element={
            isLoggedIn ? (
              <div className="service-container">
                <Service service={services.m1Group} />
                <Service service={services.w1Group} />
                <Service service={services.r1Group} />
                <Service service={services.m2Group} />
                <Service service={services.w2Group} />
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  )
}

export default App

