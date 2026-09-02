import { useState } from "react";
import {
    X,
    Copy,
    Check,
    Image,
    Video,
    Music,
    FileText,
    File as FileIcon
} from "lucide-react";

const shareModalStyles = `
@keyframes modalFadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes modalScaleIn {
    from {
        transform: scale(0.95);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}
`;

const ShareLinkModal = ({ file, onClose }) => {
    const [copied, setCopied] = useState(false);

    if (!file) return null;

    const shareLink = `${window.location.origin}/file/${file.id}`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareLink);

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2500);
        } catch (error) {
            console.error("Failed to copy link:", error);
        }
    };

    const getFileIcon = (file) => {
        const extension =
            file.fileName?.split(".").pop().toLowerCase() || "";

        if (
            ["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(extension)
        ) {
            return <Image size={22} className="text-blue-500" />;
        }

        if (
            ["mp4", "webm", "mov", "avi", "mkv"].includes(extension)
        ) {
            return <Video size={22} className="text-blue-500" />;
        }

        if (
            ["mp3", "wav", "ogg", "flac", "m4a"].includes(extension)
        ) {
            return <Music size={22} className="text-green-500" />;
        }

        if (
            ["pdf", "doc", "docx", "txt", "rtf"].includes(extension)
        ) {
            return <FileText size={22} className="text-amber-500" />;
        }

        return <FileIcon size={22} className="text-blue-500" />;
    };

    const formatFileSize = (bytes) => {
        if (!bytes) return "0 B";

        if (bytes < 1024) {
            return `${bytes} B`;
        } else if (bytes < 1048576) {
            return `${(bytes / 1024).toFixed(1)} KB`;
        } else {
            return `${(bytes / 1048576).toFixed(1)} MB`;
        }
    };

    return (
        <div
            style={{
                animation: "modalFadeIn 0.2s ease-out forwards"
            }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
        >
            <style
                dangerouslySetInnerHTML={{
                    __html: shareModalStyles
                }}
            />

            {/* Modal Card */}
            <div
                style={{
                    animation:
                        "modalScaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards"
                }}
                className="w-full max-w-md rounded-2xl bg-white dark:bg-gray-900 shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden mx-4"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 pt-6 pb-2">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                        Share File
                    </h2>

                    <button
                        onClick={onClose}
                        className="rounded-full p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 cursor-pointer"
                        aria-label="Close modal"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="px-6 pb-6 space-y-5">

                    {/* File Preview Card */}
                    <div className="flex items-center justify-between p-3.5 bg-blue-50/40 dark:bg-blue-900/20 rounded-2xl border border-blue-100/30 dark:border-blue-800/30">
                        <div className="flex items-center gap-3 overflow-hidden">

                            <div className="flex items-center justify-center p-2.5 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-blue-100/20 dark:border-blue-800/20">
                                {getFileIcon(file)}
                            </div>

                            <div className="overflow-hidden">
                                <h4
                                    className="font-semibold text-gray-800 dark:text-gray-200 text-sm truncate max-w-[200px]"
                                    title={file.fileName}
                                >
                                    {file.fileName}
                                </h4>

                                <p className="text-xs text-gray-500 mt-0.5 font-medium">
                                    {formatFileSize(file.fileSize)}
                                </p>
                            </div>
                        </div>

                        {/* Public / Private Badge */}
                        <div
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm select-none ${
                                file.isPublic
                                    ? "bg-green-50 text-green-700 border border-green-200/50"
                                    : "bg-gray-50 text-gray-600 border border-gray-200"
                            }`}
                        >
                            <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                    file.isPublic
                                        ? "bg-green-500 animate-pulse"
                                        : "bg-gray-400"
                                }`}
                            />

                            {file.isPublic ? "Public" : "Private"}
                        </div>
                    </div>

                    {/* Copy Link Section */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider select-none">
                            Link sharing
                        </label>

                        <div className="relative flex items-center bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-1.5 focus-within:ring-2 focus-within:ring-blue-300 focus-within:border-blue-400 transition-all duration-200">

                            {/* Share Link */}
                            <input
                                type="text"
                                value={shareLink}
                                readOnly
                                className="flex-1 text-gray-700 dark:text-gray-300 bg-transparent px-3 text-sm outline-none font-medium truncate"
                                onClick={(e) => e.target.select()}
                            />

                            {/* Copy Button */}
                            <button
                                onClick={handleCopy}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 cursor-pointer shadow-sm active:scale-95 select-none ${
                                    copied
                                        ? "bg-green-600 text-white shadow-green-500/10"
                                        : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/15"
                                }`}
                            >
                                {copied ? (
                                    <>
                                        <Check
                                            size={14}
                                            className="animate-pulse"
                                        />
                                        <span>Copied!</span>
                                    </>
                                ) : (
                                    <>
                                        <Copy size={14} />
                                        <span>Copy Link</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShareLinkModal;