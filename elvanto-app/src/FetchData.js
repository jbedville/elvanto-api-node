const apiUrl = import.meta.env.VITE_API_URL;

let m1Group, w1Group, r1Group, m2Group, w2Group
let date
const CACHE_KEY = "serviceCache"

class ServiceGroup {
    constructor(locationName, date, volunteers, songs) {
        this.locationName = locationName
        this.date = date
        this.volunteers = volunteers
        this.songs = songs
    }
}

//! GET EXPIRY DAY (MONDAY 4AM)
function getNextMonday() {
    const now = new Date();
    const result = new Date(now);

    const day = now.getDay();
    const daysUntilMonday = (8 - day) % 7;
    result.setDate(now.getDate() + daysUntilMonday);

    result.setHours(4, 0, 0, 0)

    return result.getTime()
}

//! Function to Fetch the data from the backend server
async function fetchData() {
    const rebuild = (obj) => 
        obj ?
        new ServiceGroup(obj.locationName, obj.date, obj.volunteers, obj.songs)
        : undefined
     

    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
        try{
            const { expires, data } = JSON.parse(cached)
            if (Date.now() < expires) {
            console.log('Loaded from cache')
            
            m1Group = rebuild(data.m1Group);
            w1Group = rebuild(data.w1Group);
            r1Group = rebuild(data.r1Group);
            m2Group = rebuild(data.m2Group);
            w2Group = rebuild(data.w2Group);

            return
            }
        } catch (error) {
            console.error('Cache parse error, clearing cache', error)
            localStorage.removeItem(CACHE_KEY)
    }
} else

    try {
        const [morayfield830, warner930, redcliffe930, morayfield1030, warner530] = await Promise.all([
            fetch(`${apiUrl}/details/Morayfield830`).then(response => response.json()),
            fetch(`${apiUrl}/details/Warner930`).then(response => response.json()),
            fetch(`${apiUrl}/details/Redcliffe930`).then(response => response.json()),
            fetch(`${apiUrl}/details/Morayfield1030`).then(response => response.json()),
            fetch(`${apiUrl}/details/Warner530`).then(response => response.json())
            // fetch(`http://localhost:8000/details/Morayfield830`).then(response => response.json()),
            // fetch(`http://localhost:8000/details/Warner930`).then(response => response.json()),
            // fetch(`http://localhost:8000/details/Redcliffe930`).then(response => response.json()),
            // fetch(`http://localhost:8000/details/Morayfield1030`).then(response => response.json()),
            // fetch(`http://localhost:8000/details/Warner530`).then(response => response.json())
        ])

        const getDate = (apiDate) => {
            const longDate = new Date(apiDate.replace(" ", "T"))
            const options = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: "true",
                timeZone: "Australia/Brisbane"
            }
            return longDate.toLocaleString("en-AU", options)
        }

        const getVolunteers = (service, locationName) => {
            const volunteers = service[0].volunteers.plan[0].positions.position.slice(3, 16) || [];
            const formattedVolunteers = volunteers.map(position => ({
                position_name: position.position_name,
                volunteers: position.volunteers?.volunteer?.map(v =>({
                    firstname: v.person.firstname,
                    lastname: v.person.lastname,
                    status: v.status
                })) || []
        }))
        const date = getDate(service[0].date)
        const songs = service[0].songs.song?.map(s => ({
            title: s.title,
            key: s.arrangement.key
        })) || "No Songs"

        return new ServiceGroup(locationName, date, formattedVolunteers, songs)
    } 

    m1Group = getVolunteers(morayfield830, "Morayfield 8:30")
    w1Group = getVolunteers(warner930, "Warner 9:30")
    r1Group = getVolunteers(redcliffe930, "Redcliffe 9:30")
    m2Group = getVolunteers(morayfield1030, "Morayfield 10:30")
    w2Group = getVolunteers(warner530, "Warner 5:30")
 
    const data = {
        m1Group: {...m1Group},
        w1Group: {...w1Group},
        r1Group: {...r1Group},
        m2Group: {...m2Group},
        w2Group: {...w2Group}
    }
    
    localStorage.setItem(CACHE_KEY, JSON.stringify({
        expires: getNextMonday(),
        data
    }))

    console.log('Fetched from API and cached')

    } catch (error) {
        console.error("Oopsie Error:", error)
    }
}

async function main() {
    await fetchData();
    console.log(m1Group)
}

main()

export async function getServiceGroups() {
    await fetchData();
    return { m1Group, w1Group, r1Group, m2Group, w2Group }
}
