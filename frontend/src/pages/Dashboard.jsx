import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import DashboardLayout from "../layout/DashboardLayout.jsx";

const Dashboard = () => {
    const { getToken } = useAuth();

    useEffect(() => {
        const displayToken = async () => {
            const token = await getToken();
        };
        displayToken();
    }, []);

    return (
        <DashboardLayout activeMenu="Dashboard" credits={5}>
            <div>
                Dashboard Content
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;