import DashboardLayout from "../layout/DashboardLayout.jsx";
import { useState, useEffect } from "react";
import { List, Grid } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";


const MyFiles = () => {
    const [files, setFiles] = useState([]);
    const [viewMode, setViewMode] = useState("list");

    const { getToken } = useAuth();

    const fetchFiles = async () => {
        try {
            const token = await getToken();

            const response = await axios.get(
                "http://localhost:8080/api/v1.0/files/my",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.status === 200) {
                setFiles(response.data);
            }

        } catch (error) {
            console.log("Error fetching files:", error);
            toast.error("Failed to fetch files. Please try again later.", error.message);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, [getToken]);

    return (
        <DashboardLayout activeMenu="My Files">
            <div className="p-6">

                <div className="flex justify-between items-center mb-6">

                    <h2 className="text-2xl font-bold">
                        My Files ({files?.length ?? 0})
                    </h2>

                    <div className="flex items-center gap-3">

                        <List
                            onClick={() => setViewMode("list")}
                            size={24}
                            className={`cursor-pointer transition-colors ${viewMode === "list"
                                ? "text-blue-600"
                                : "text-gray-400 hover:text-gray-600"
                                }`}
                        />

                        <Grid
                            onClick={() => setViewMode("grid")}
                            size={24}
                            className={`cursor-pointer transition-colors ${viewMode === "grid"
                                ? "text-blue-600"
                                : "text-gray-400 hover:text-gray-600"
                                }`}
                        />

                    </div>
                </div>
                {files.length === 0 ? (
                    <div className=><div/>
                ) : ()}
            </div>
        </DashboardLayout>
    );
};

export default MyFiles;