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

        const getVolunteers = (x) => {
            const volunteers = x[0].volunteers.plan[0].positions.position.slice(2, 15) || [];
        
            volunteers.forEach(position => {
                position.volunteers?.volunteer?.forEach(v => {
                console.log(`${position.position_name}: ${v.person.firstname} ${v.person.lastname}`);
                });
            });
        }
        
        console.log("<----MORAYFIELD 8:30---->")
        getVolunteers(morayfield830)
        console.log("")
        console.log("<----WARNER 9:30---->")
        getVolunteers(warner930)
        console.log("")
        console.log("<----REDCLIFFE 9:30---->")
        getVolunteers(redcliffe930)
        console.log("")
        console.log("<----MORAYFIELD 10:30---->")
        getVolunteers(morayfield1030)
        console.log("")
        console.log("<----WARNER 5:30---->")
        getVolunteers(warner530)
        
    } catch (error) {
        console.error("Oopsie Error:", error)
    }
}

fetchData()


