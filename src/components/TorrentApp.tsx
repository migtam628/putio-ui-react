import React, { useEffect, useRef, useState } from 'react';

interface Download {
    magnetLink: string;
    name: string;
    progress: number;
    downloadSpeed: number;
    downloaded: number;
    status: string;
}

const TorrentApp: React.FC = () => {
    const [magnetLink, setMagnetLink] = useState('');
    const [activeDownloads, setActiveDownloads] = useState<Download[]>([]);
    const [files, setFiles] = useState<any[]>([]);
    const videoPlayer = useRef<HTMLVideoElement>(null);
    const videoSource = useRef<HTMLSourceElement>(null);

    // Load files and active downloads periodically
    useEffect(() => {
        const loadFilesInterval = setInterval(() => {
            loadFiles();
        }, 5000);

        const activeDownloadsInterval = setInterval(() => {
            fetchActiveDownloads();
        }, 3000);

        return () => {
            clearInterval(loadFilesInterval);
            clearInterval(activeDownloadsInterval);
        };
    }, []);

    // Fetch active downloads
    const fetchActiveDownloads = () => {
        fetch('/active-downloads')
            .then((response) => response.json())
            .then((downloads: Download[]) => setActiveDownloads(downloads))
            .catch((error) => console.error('Error fetching active downloads:', error));
    };

    // Load files
    const loadFiles = () => {
        fetch('/list-files')
            .then((response) => response.json())
            .then((items) => setFiles(items))
            .catch((error) => console.error('Error loading files:', error));
    };

    // Handle form submission
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        fetch('/upload-torrent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ magnet_link: magnetLink }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.fileName) {
                    const videoUrl = `/videos/${data.fileName}`;
                    if (videoSource.current && videoPlayer.current) {
                        videoSource.current.src = videoUrl;
                        videoPlayer.current.load();
                        videoPlayer.current.play();
                    }
                } else {
                    alert('No .mp4 file found in the torrent.');
                }
            })
            .catch(() => alert('An error occurred while downloading the torrent.'));
    };

    // Stop a download
    const stopDownload = (magnetLink: string) => {
        fetch(`/stop-download?magnetLink=${encodeURIComponent(magnetLink)}`)
            .then((response) => response.json())
            .then((data) => alert(data.message))
            .catch(() => alert('An error occurred while stopping the download.'));
    };

    function deleteFile(fileName: string) {
        fetch(`/delete-file?fileName=${encodeURIComponent(fileName)}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert('File deleted successfully.');
                } else {
                    alert('An error occurred while deleting the file.');
                }
            })
            .catch(() => alert('An error occurred while deleting the file.'));
    }

    function deleteDirectory(directoryName: string) {
        fetch(`/delete-directory?directoryName=${encodeURIComponent(directoryName)}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert('Directory deleted successfully.');
                } else {
                    alert('An error occurred while deleting the directory.');
                }
            })
            .catch(() => alert('An error occurred while deleting the directory.'));
    }

    return (
        <div className="container mx-auto p-4">
            <form onSubmit={handleSubmit} id="torrent-form">
                <input
                    type="text"
                    id="magnet_link"
                    className="p-2 border"
                    value={magnetLink}
                    onChange={(e) => setMagnetLink(e.target.value)}
                    placeholder="Enter magnet link"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 ml-2">
                    Download
                </button>
            </form>

            <div id="videoPlayerWrapper" className="mt-4">
                <video controls ref={videoPlayer} className="w-full max-w-lg rounded-lg shadow-lg">
                    <source ref={videoSource} id="videoSource" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            <div className="mt-4">
                <h3 className="font-semibold text-xl">Active Downloads</h3>
                {activeDownloads.length > 0 ? (
                    activeDownloads.map((download) => (
                        <div
                            key={download.magnetLink}
                            className="bg-white border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300 flex flex-col justify-between mt-2"
                        >
                            <div>
                                <h5 className="font-bold text-lg text-blue-600 mb-2">
                                    <b>{download.progress}%</b> - {download.name}
                                </h5>
                                <p>Speed: {(download.downloadSpeed / 1024 / 1024).toFixed(2)} MB/s</p>
                                <p>Total: {(download.downloaded / 1024 / 1024).toFixed(2)} MB</p>
                                <div className="bg-gray-200 rounded-full h-2 mt-2">
                                    <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${download.progress}%` }}></div>
                                </div>
                                <div className="mt-2 text-sm text-gray-500">
                                    {download.status === 'completed' ? '✅ Completed' : download.status === 'failed' ? '❌ Failed' : '⬇️ Downloading'}
                                </div>
                            </div>
                            <button
                                className="bg-red-500 text-white rounded-md px-3 py-1 text-sm hover:bg-red-600 transition duration-200 mt-4"
                                onClick={() => stopDownload(download.magnetLink)}
                            >
                                Cancel
                            </button>
                        </div>
                    ))
                ) : (
                    <h6 className="text-gray-500">No active downloads.</h6>
                )}
            </div>

            <div className="mt-4" id="fileList">
                <h3 className="font-semibold text-xl">Files</h3>
                {files.length > 0 ? (
                    files.map((file) => (
                        <div
                            key={file.name}
                            className="bg-white border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300 flex justify-between mt-2"
                        >
                            <h4 className={file.isDirectory ? 'text-green-600 font-semibold' : 'text-blue-600 font-semibold'}>
                                {file.isDirectory ? '📁 ' : '🎬 '}
                                {file.name}
                            </h4>
                            <button
                                className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-400 transition duration-200"
                                onClick={() => (file.isDirectory ? deleteDirectory(file.name) : deleteFile(file.name))}
                            >
                                Delete
                            </button>
                        </div>
                    ))
                ) : (
                    <h6 className="text-gray-500">No files available.</h6>
                )}
            </div>
        </div>
    );
};

export default TorrentApp;
