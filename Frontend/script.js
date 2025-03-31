async function fetchData() {
    try {
        const [morayfield830, warner930, redcliffe930, morayfield1030, warner530] = await Promise.all([
            fetch("http://localhost:8000/details/Morayfield830").then(response => response.json()),
            fetch("http://localhost:8000/details/Warner930").then(response => response.json()),
            fetch("http://localhost:8000/details/Redcliffe930").then(response => response.json()),
            fetch("http://localhost:8000/details/Morayfield1030").then(response => response.json()),
            fetch("http://localhost:8000/details/Warner530").then(response => response.json())
        ])
        // console.log("Test Response: ", warner930)
        // console.log(JSON.stringify(warner930, null, 2))
        // console.log(warner930[0].volunteers.plan[0].positions.position[5].volunteers.volunteer[0].person.firstname)
        const volunteers = warner530[0].volunteers.plan[0].positions.position || [];

        volunteers.forEach(position => {
            position.volunteers?.volunteer?.forEach(v => {
            console.log(`${v.person.firstname} ${v.person.lastname}`);
        });
});
    } catch (error) {
        console.error("Error:", error)
    }
}

fetchData()