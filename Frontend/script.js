class VolunteerGroup {
    constructor(locationName, volunteers) {
        this.locationName = locationName
        this.volunteers = volunteers
    }

    printVolunteers() {
        console.log(`<---- ${this.locationName.toUpperCase()} ---->`)
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
        console.log("Test Response: ", warner930)

        

        //         volunteers.forEach(position => {
        //             console.log(`${position.position_name}`)
        //             position.volunteers?.volunteer?.forEach(v => {
        //             console.log(`${v.person.firstname} ${v.person.lastname}`);
        //         });
        // });

        const getVolunteers = (service, locationName) => {
            const volunteers = service[0].volunteers.plan[0].positions.position.slice(2, 15) || [];
            const formattedVolunteers = volunteers.map(position => ({
                position_name: position.position_name,
                volunteers: position.volunteers?.volunteer?.map(v =>({
                    firstname: v.person.firstname,
                    lastname: v.person.lastname
                })) || []
        }))
        return new VolunteerGroup(locationName, formattedVolunteers)
    } 

    const m1Group = getVolunteers(morayfield830, "Morayfield 8:30")
    const w1Group = getVolunteers(morayfield830, "Warner 9:30")
    const r1Group = getVolunteers(morayfield830, "Redcliffe 9:30")
    const m2Group = getVolunteers(morayfield830, "Morayfield 10:30")
    const w2Group = getVolunteers(morayfield830, "Warner 5:30")

    m1Group.printVolunteers()
    w1Group.printVolunteers()
    r1Group.printVolunteers()
    m2Group.printVolunteers()
    w2Group.printVolunteers()

    } catch (error) {
        console.error("Oopsie Error:", error)
    }
}

fetchData()


