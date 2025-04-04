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


//! TESTING

"songs": {
				"song": [
					{
						"id": "86119758-cb53-4999-91df-6e8ce327a554",
						"ccli_number": "7214412",
						"title": "Fall Like Rain",
						"artist": "Beau Maddox, Bede Benjamin-Korporaal, Brett Younker, Zahriya Zachary",
						"album": "",
						"arrangement": {
							"id": "0eed03fa-4ef2-426f-9411-562339db4370",
							"title": "Standard Arrangement",
							"bpm": "0",
							"duration": "00:00",
							"sequence": [
								"Verse 1",
								"Chorus 1",
								"Verse 2",
								"Misc 1"
							],
							"key_id": "80961678-2446-4868-aad2-3ae1e06f9cac",
							"key_name": "Male Key",
							"key": "A"
						}
					}
				]
			}