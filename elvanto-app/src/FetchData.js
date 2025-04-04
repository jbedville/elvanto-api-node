let m1Group, w1Group, r1Group, m2Group, w2Group
let date

class ServiceGroup {
    constructor(locationName, date, volunteers, songs) {
        this.locationName = locationName
        this.date = date
        this.volunteers = volunteers
        this.songs = songs
    }

    printVolunteers() {
        console.log(`<---- ${this.locationName.toUpperCase()} ${this.date}---->`)
        this.volunteers.forEach(position => {
            position.volunteers.forEach(v => {
                console.log(`${position.position_name}: ${v.firstname} ${v.lastname}`)
            })
        })
        console.log("")
    }
}


async function fetchData() {
    try {
        const [morayfield830, warner930, redcliffe930, morayfield1030, warner530] = await Promise.all([
            fetch("http://localhost:8000/details/Morayfield830").then(response => response.json()),
            fetch("http://localhost:8000/details/Warner930").then(response => response.json()),
            fetch("http://localhost:8000/details/Redcliffe930").then(response => response.json()),
            fetch("http://localhost:8000/details/Morayfield1030").then(response => response.json()),
            fetch("http://localhost:8000/details/Warner530").then(response => response.json())
        ])
        // console.log("Test Response: ", warner930) TEST TEST TEST

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
 
    // m1Group.printVolunteers()
    // w1Group.printVolunteers()
    // r1Group.printVolunteers()
    // m2Group.printVolunteers()
    // w2Group.printVolunteers()

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
