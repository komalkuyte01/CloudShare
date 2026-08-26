import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import DashboardLayout from "../layout/DashboardLayout.jsx";

const Dashboard = () => {
    const { getToken } = useAuth();

    useEffect(() => {
        const displayToken = async () => {
            const token = await getToken();
            console.log(token);
        };
        displayToken();
    }, []);

    return (
        <DashboardLayout activeMenu="Dashboard">
            <div>
                Dashboard Content
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;