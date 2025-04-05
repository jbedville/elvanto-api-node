import {getServiceGroups} from './FetchData'
import { useState, useEffect } from 'react'
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react'

function Service({ service }) {

    return (
        <div className="service-module">
            {/* <p>It's working 👍🏼</p> */}
            <h2>{service.locationName}</h2>
            {/* <p>{service.date}</p> */}
            <h3>Volunteers</h3>
            <ul className="volunteers">
                {service.volunteers.map((position, index) => 
                    position.position_name === "Backing Vocals"
                        ? position.volunteers.map((v, i) => (
                            <li key={`$index} ${i}`}>
                                <span className="position-name">
                                    {position.position_name}:{" "}
                                </span>
                                <span className='volunteer-name'>
                                    {v.firstname} {v.lastname} {getStatusIcon(v.status)}
                                </span>
                            </li>
                        ))
                
                : (
                    <li key={index}>
                        <span className='position-name'>
                            {position.position_name}:{" "}  
                        </span>
                        {position.volunteers.map((v, i) => (
                            <span className='volunteer-name' key={`${index}-${i}`}>
                            {v.firstname} {v.lastname} {getStatusIcon(v.status)}
                            {i < position.volunteers.length - 1 && ", "}
                        </span>
                        ))}
                    </li>
                ))}
            </ul>
            <h3>Songs</h3>
            <ul className="songs">
                {Array.isArray(service.songs) && service.songs.length > 0 ? (
                    service.songs.map((s, index) => (
                        <li key={index}>
                            {index + 1}. {s.title} - {s.key}
                        </li>
                    ))
                ) : (
                    <li>No songs available</li>
                )
                }
            </ul>
        </div>
    )
}


function getStatusIcon(status) {
    switch (status) {
        case "Confirmed":
            return <CheckCircle color="green" size={16} className='status-icon'/>;
        case "Unconfirmed":
            return <AlertCircle color="orange" size={16} className='status-icon'/>;
        case "Declined":
            return <XCircle color="red" size={16} className='status-icon'/>
        default:
            return null;
    }
}

export default Service