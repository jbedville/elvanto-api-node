import { fetchData, getServiceGroups, CACHE_KEY } from "./FetchData"
import { useState } from "react";
import { Loader } from 'lucide-react'
import './App.css'

function Nav({ setServices, services }) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateMessage, setUpdateMessage] = useState("");
    const [isFading, setIsFading] = useState(false)
    
    async function refreshServices() {
        setIsUpdating(true)
        setUpdateMessage("")
        setIsFading(false)
        localStorage.removeItem(CACHE_KEY);
        const data = await getServiceGroups();
        setServices(data)
        setIsUpdating(false);

        if (JSON.stringify(data) === JSON.stringify(services)) {
            setUpdateMessage("Nothing to Update!")
        } else {
            setUpdateMessage("Services Updated!")
        }

        setTimeout(() => setIsFading(true), 3000)
        setTimeout(() => setUpdateMessage(''), 4000)
    }

    return (
        <div className="nav">
            <button onClick={refreshServices} disabled={isUpdating}>
                {isUpdating ? "Refreshing..." : "Refresh Services"}
                </button>
                {isUpdating && <span><Loader className="loader-circle"/></span>}
                {updateMessage && <span className={`update-message ${isFading ? "fade-out" : ""}`}>{updateMessage}</span>}
    
        </div>
    )
}

export default Nav