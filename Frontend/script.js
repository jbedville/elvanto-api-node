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

        const volunteers = warner930[0].volunteers.plan[0].positions.position.slice(2, 15) || [];

        volunteers.forEach(position => {
            console.log(`${position.position_name}`)
            position.volunteers?.volunteer?.forEach(v => {
            console.log(`${v.person.firstname} ${v.person.lastname}`);
        });
});
    } catch (error) {
        console.error("Oopsie Error:", error)
    }
}

fetchData()