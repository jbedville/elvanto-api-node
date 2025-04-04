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