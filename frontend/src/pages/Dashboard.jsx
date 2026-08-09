import DashboardLayout from "../layout/DashboardLayout.jsx";

const Dashboard = () => {
    return (
        <DashboardLayout activeMenu="Dashboard" credits={5}>
            <div>
                Dashboard Content
            </div>
        </DashboardLayout>
    )
}

export default Dashboard;