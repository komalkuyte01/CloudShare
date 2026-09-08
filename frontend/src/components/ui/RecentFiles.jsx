import { FileText, Image, Video, Music, Archive, File as FileIcon, Lock, Globe } from "lucide-react";

const RecentFiles = ({ files }) => {

    const getFileIcon = (fileName, fileType) => {
        const ext = fileName?.split(".").pop().toLowerCase() || "";
        const type = fileType?.toLowerCase() || "";

        if (["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(ext) || type.includes("image")) {
            return <Image size={18} className="text-blue-500" />;
        }
        if (["mp4", "webm", "mov", "avi", "mkv"].includes(ext) || type.includes("video")) {
            return <Video size={18} className="text-rose-500" />;
        }
        if (["mp3", "wav", "ogg", "flac", "m4a"].includes(ext) || type.includes("audio")) {
            return <Music size={18} className="text-green-500" />;
        }
        if (["pdf", "doc", "docx", "txt", "rtf"].includes(ext) || type.includes("pdf") || type.includes("text") || type.includes("document")) {
            return <FileText size={18} className="text-amber-500" />;
        }
        if (["zip", "rar", "tar", "7z"].includes(ext)) {
            return <Archive size={18} className="text-indigo-500" />;
        }
        return <FileIcon size={18} className="text-blue-500" />;
    };

    const formatFileSize = (bytes) => {
        if (!bytes) return "0 B";
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / 1048576).toFixed(1)} MB`;
    };

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <h3 className="font-bold text-gray-800 dark:text-white text-base">Recent Files ({files.length})</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 dark:bg-gray-800/50 text-[10px] font-bold text-gray-400 uppercase border-b border-gray-200 dark:border-gray-800 tracking-wider">
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Size</th>
                            <th className="px-4 py-3">Uploaded By</th>
                            <th className="px-4 py-3">Modified</th>
                            <th className="px-4 py-3">Sharing</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {files.map((file) => (
                            <tr key={file.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                                <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300 break-all max-w-[200px]">
                                    <div className="flex items-center gap-2">
                                        {getFileIcon(file.fileName, file.fileType)}
                                        <span className="truncate" title={file.fileName}>
                                            {file.fileName}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs">
                                    {formatFileSize(file.fileSize)}
                                </td>
                                <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs">
                                    You
                                </td>
                                <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs">
                                    {formatDate(file.uploadedAt)}
                                </td>
                                <td className="px-4 py-3 text-xs">
                                    <span className="flex items-center gap-1 text-gray-500">
                                        {file.isPublic ? (
                                            <>
                                                <Globe size={14} className="text-blue-500" />
                                                <span>Public</span>
                                            </>
                                        ) : (
                                            <>
                                                <Lock size={14} className="text-gray-400" />
                                                <span>Private</span>
                                            </>
                                        )}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentFiles;
