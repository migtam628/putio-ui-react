// import { c } from "vitest/dist/reporters-5f784f42";
// import Page from "./Page";
// import TorrentDownloader from "../components/TorrentDownloader";
// import { IonSegment, IonSegmentButton, IonLabel, SegmentChangeEventDetail } from "@ionic/react";
// import { useRef } from "react";
// import { IonSegmentCustomEvent } from '@ionic/core';
// import TorrentApp from "../components/TorrentApp";

// const Home = () => {

//     const activeDownloadsRef = useRef<HTMLDivElement>(null);
//     const fileListRef = useRef<any>(null);

//     const segements = [
//         {
//             name: 'torrents',
//             label: 'Active Torrents',
//             id: 'active-downloads'
//         },
//         {
//             name: 'videos',
//             label: 'Videos',
//             id: 'fileList'
//         }
//     ]

//     function handleOnSegmentChange(e: IonSegmentCustomEvent<SegmentChangeEventDetail>): void {
//         const value = e.detail.value;
//         if (value === 'torrents') {
//             activeDownloadsRef.current?.classList.remove('hidden');
//             fileListRef.current?.classList.add('hidden');
//         } else {
//             activeDownloadsRef.current?.classList.add('hidden');
//             fileListRef.current?.classList.remove('hidden');
//         }
//     }

//     return (
//         <Page title="Home">
//             <TorrentDownloader name="Home page" />

//             <IonSegment value="torrents" onIonChange={(e) => handleOnSegmentChange(e)}>
//                 {segements.map((segment, index) => (
//                     <IonSegmentButton value={segment.name} key={index}>
//                         <IonLabel>{segment.label}</IonLabel>
//                     </IonSegmentButton>
//                 ))}
//             </IonSegment>

//             {segements.map((segment, index) => (
//                 <section ref={segment.name === 'torrents' ? activeDownloadsRef : fileListRef} key={index} className={segment.name === 'torrents' ? '' : 'hidden'}>
//                     <div id={segment.id} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" />
//                 </section>
//             ))}
//         </Page>
//     );
// }

// export default Home;

import { useState, useEffect, useRef } from "react";
import Page from "../components/Page";
import { VideoPlayer } from "../components/VideoPlayer";
import TorrentDownloader from "../components/TorrentDownloader";
import {
  IonSegment,
  IonSegmentButton,
  IonLabel,
  SegmentChangeEventDetail,
} from "@ionic/react";
import { IonSegmentCustomEvent } from "@ionic/core";

const Home = () => {
  const [activeDownloads, setActiveDownloads] = useState<any[]>([]);
  const [files, setFiles] = useState<any[]>([]);
  const [selectedSegment, setSelectedSegment] = useState<any>("torrents");

  const activeDownloadsRef = useRef<HTMLDivElement>(null);
  const fileListRef = useRef<HTMLDivElement>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState("");
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const segments = [
    {
      name: "torrents",
      label: "Active Torrents",
      id: "active-downloads",
    },
    {
      name: "videos",
      label: "Videos",
      id: "fileList",
    },
  ];

  // Function to play a video file
  const playVideo = (fileName: string) => {
    const videoUri = `/videos/${fileName}`;
    setVideoSrc(videoUri);
    console.log(videoUri);
  };

  useEffect(() => {
    if (videoSrc.includes(".mp4") || videoSrc.includes(".mkv")) {
      setVideoSrc(videoSrc);
      setIsVideoModalOpen(!isVideoModalOpen);
    }
  }, [videoSrc]);

  // Function to load active downloads from the server
  const displayActiveDownloads = () => {
    fetch("/active-downloads")
      .then((response) => response.json())
      .then((downloads) => setActiveDownloads(downloads))
      .catch((error) => {
        // console.error("Error loading active downloads", error);
      });
  };

  // Function to load file list from the server
  const loadFiles = () => {
    fetch("/list-files")
      .then((response) => response.json())
      .then((items) => setFiles(items))
      .catch((error) => {
        /* console.error("Error loading files", error) */
      });
  };

  // Fetch active downloads and file list on mount
  useEffect(() => {
    displayActiveDownloads();
    loadFiles();

    const downloadInterval = setInterval(() => {
      displayActiveDownloads();
    }, 1500);

    const fileInterval = setInterval(() => {
      loadFiles();
    }, 3000);

    // Clear intervals on component unmount
    return () => {
      clearInterval(downloadInterval);
      clearInterval(fileInterval);
    };
  }, []);

  // Handle segment change
  const handleOnSegmentChange = (
    e: IonSegmentCustomEvent<SegmentChangeEventDetail>
  ) => {
    const value = e.detail.value;
    setSelectedSegment(value || "torrents");
  };

  // Function to stop all downloads
  const stopAllDownloads = () => {
    fetch("/stop-all-downloads")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        displayActiveDownloads(); // Refresh the active downloads list
      })
      .catch((error) =>
        console.log(error)
      );
  };

  // Function to stop a specific download
  const stopDownload = (magnetLink: string) => {
    console.log(magnetLink);
    fetch(`/stop-download?magnet_link=${magnetLink}`)
      .then((response) => response.json())
      .then((data) => {
        // alert(data.message);
        console.log(data);
        displayActiveDownloads(); // Refresh after stopping the download
      })
      .catch((error) =>
        console.log(error)
      );
  };

  // Render the active downloads
  const ActiveDownloads = () => {
    if (activeDownloads.length === 0) {
      return <h6 className="text-gray-500 m-4">No active downloads.</h6>;
    }

    return activeDownloads.map((download) => {
        console.log(download);
      return (
      <div
        key={download.magnetLink}
        className="bg-slate-800 border border-slate-600 rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300 flex flex-col justify-between cursor-pointer mb-2"
      >
        <div>
          <h5 className="font-bold text-lg text-blue-600 mb-2">
            <b>{download.progress}%</b> - {download.name}
          </h5>
          <div className="text-gray-500 text-sm">
            <p>
              Speed: {(download.downloadSpeed / 1024 / 1024).toFixed(2)} MB/s
            </p>
            <p>Total: {(download.downloaded / 1024 / 1024).toFixed(2)} MB</p>
          </div>
          <div className="mt-2">
            <div className="bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${download.progress}%` }}
              ></div>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            {download.status === "completed"
              ? "✅ Completed"
              : download.status === "failed"
              ? "❌ Failed"
              : "⬇️ Downloading"}
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            className="bg-red-500 text-white rounded-md px-3 py-1 text-sm hover:bg-red-600 transition duration-200"
            onClick={() => stopDownload(download.magnetLink)}
          >
            Cancel
          </button>
        </div>
      </div>
    )});
  };

  function deleteFile(fileName: string) {
    fetch(`/delete-file/${fileName}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // alert(data.message);
        loadFiles(); // Refresh the file list
      })
      .catch((error) =>
        console.log({
          error,
        })
      );
  }

  // Render the list of files
  const FileList = () => {
    if (files.length === 0) {
      return <h6 className="text-gray-500 m-4">No files available.</h6>;
    }

    return files.map((file: any) => (
      <div
        key={file.name}
        className="bg-slate-800 border border-slate-600 rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300 flex flex-col justify-between cursor-pointer mb-2"
        // className="bg-white border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300 flex flex-col justify-between"
      >
        <div>
          <h4
            className={`text-blue-600 font-semibold cursor-pointer`}
            onClick={() => playVideo(file.name)}
          >
            {file.isDirectory ? `📁 ${file.name}` : `🎬 ${file.name}`}
          </h4>
        </div>
        <div className="mt-4 flex justify-end mx-3 my-3">
          <button
            className="bg-blue-500 text-white p-1 rounded-lg hover:bg-blue-400 transition duration-200 mx-1"
            onClick={() => playVideo(file.name)}
          >
            Play
          </button>
          <button
            className="bg-red-500 text-white p-1 rounded-lg hover:bg-red-400 transition duration-200 mx-1"
            onClick={() => deleteFile(file.name)}
          >
            Delete {file.isDirectory ? "Directory" : "File"}
          </button>
        </div>
      </div>
    ));
  };

  return (
    <Page title="Home">
      <TorrentDownloader videoRef={videoRef} />

      <VideoPlayer
        videoRef={videoRef}
        videoSrc={videoSrc}
        isOpen={isVideoModalOpen}
        setIsVideoModalOpen={setIsVideoModalOpen}
        setVideoSrc={setVideoSrc}
      />

      <IonSegment
        value={selectedSegment}
        onIonChange={(e) => handleOnSegmentChange(e)}
      >
        {segments.map((segment, index) => (
          <IonSegmentButton value={segment.name} key={index}>
            <IonLabel>{segment.label}</IonLabel>
          </IonSegmentButton>
        ))}
      </IonSegment>

      <section
        ref={activeDownloadsRef}
        className={
          selectedSegment === "torrents"
            ? "my-4 mx-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-4"
            : "hidden"
        }
      >
        <ActiveDownloads />
      </section>

      <section
        ref={fileListRef}
        className={
          selectedSegment === "videos"
            ? "my-4 mx-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-4"
            : "hidden"
        }
      >
        <FileList />
      </section>
    </Page>
  );
};

export default Home;
