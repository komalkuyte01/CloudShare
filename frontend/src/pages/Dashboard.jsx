import DashboardLayout from "../layout/DashboardLayout.jsx";

const Dashboard = () => {
    const { getToken, GetToken } = useAuth();
    useEffect(() => {
        const displayToken = async () => {
            const token = await getToken();
            console.log("Token:", token);
        };
        displayToken();
    }, []);
    return (
        <DashboardLayout activeMenu="Dashboard" credits={5}>
            <div>
                Dashboard Content
            </div>
        </DashboardLayout>
    )
}

export default Dashboard;