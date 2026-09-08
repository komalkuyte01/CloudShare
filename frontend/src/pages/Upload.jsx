import { useState, useContext } from "react";
import { AlertCircle } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useCreditsContext } from "../context/UserCreditsContext.jsx";
import { apiEndpoints } from "../Util/apiEndpoints.js";
import UploadBox from "../components/ui/UploadBox.jsx";
import DashboardLayout from "../layout/DashboardLayout.jsx";

const Upload = () => {
    const [files, setFiles] = useState([]);
    const [uploading, setuploading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const { getToken } = useAuth();
    const { credits, setCredits } = useCreditsContext();
    const MAX_FILES = 10;

     const handleFileChange = (e) => {
           const selectFiles = Array.from(e.target.files);

           if(files.length + selectFiles.length > MAX_FILES){
               setMessage(`You can only upload a maximum of ${MAX_FILES} files at once`);
               setMessageType('error');
               return;
           }
           // add the new files into existing files
           setFiles( (prevFiles) => [...prevFiles, ...selectFiles]);
           setMessage("");
           setMessageType("");
     }
     const handleRemoveFile = (index) => {
           setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
           setMessageType("");
           setMessage("");
     }

     const handleUpload = async () => {
        if(files.length === 0){
            setMessage("Please select files to upload");
            setMessageType("error");
            return;
        }
        if(files.length > MAX_FILES){
            setMessage(`You can only upload a maximum of ${MAX_FILES} files at once`);
            setMessageType("error");
            return;
        }
        setuploading(true);
        setMessage("Uploading files...");
        setMessageType('info');

        const formData = new FormData();
        files.forEach(file => {formData.append('files', file);});

        try{
            const token = await getToken();
            const response = await axios.post(apiEndpoints.UPLOAD_FILES, formData, {headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'}});

            if(response.status === 200){
                if(response.data && response.data.remainingCredits !== undefined){
                    setCredits(response.data.remainingCredits);
                }
                setMessage("Files uploaded successfully");
                setMessageType("success");
                setFiles([]);
            }else{
                setMessage("Error uploading files");
                setMessageType("error");
            }

        }catch(error){
            console.error("Error", error);
            setMessage(error.response?.data?.message ||"Error uploading files. Please try again.");
            setMessageType("error");
        }finally{
            setuploading(false);
        }
     }

     const isUploadDisable = files.length === 0 || files.length > MAX_FILES || credits <= 0 || files.length > credits;

    return (
        <DashboardLayout activeMenu="Upload">
           <div className="p-6">
               {message && (
                   <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${messageType === 'error' ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400': messageType === 'success' ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'}`}>
                       {messageType === 'error' && <AlertCircle size={20} />}
                       {message}
                   </div>
               )}

               <UploadBox
                   files={files}
                   onFileChange = {handleFileChange}
                   onUpload = {handleUpload}
                   uploading = {uploading}
                   onRemoveFile = {handleRemoveFile}
                   remainingCredits = {credits}
                   isUploadDisable = {isUploadDisable}


               />

           </div>
        </DashboardLayout>
    )
}
export default Upload;