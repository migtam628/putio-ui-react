// import '../theme/TorrentDownloader.css';

// interface TorrentDownloaderProps {
//   name: string;
// }

// const TorrentDownloader: React.FC<TorrentDownloaderProps> = () => {

//   const onDownloadSubmit = (e: any) => {
//     e.preventDefault();
//     const magnet_link = e.target.magnet_link.value;

//     fetch('/upload-torrent', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ magnet_link })
//     })
//       .then(response => response.json())
//       .then(data => {

//       })
//       .catch(error => {

//       });
//   }

//   return (
//     <div>
//       <div className="container mx-auto p-4">
//         <video id="videoPlayer" controls preload="auto" className="w-full rounded-lg shadow-lg my-4">
//           <source src="" id="videoSource" type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//         <form onSubmit={onDownloadSubmit} className="mb-4">
//           <div className="flex">
//             <input type="text" id="magnet_link" name="magnet_link"
//               className="w-full rounded-lg p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
//               placeholder="Paste magnet link here" required />

//             <button type="submit"
//               className="ml-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-3 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24"
//                 stroke="currentColor">
//                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
//                   d="M4 16v6h16v-6M12 3v13m0 0l-4-4m4 4l4-4" />
//               </svg>
//             </button>
//           </div>
//         </form>
//       </div>
//     </div >

//   );
// };

// export default TorrentDownloader;

import { IonIcon } from "@ionic/react";
import "../theme/TorrentDownloader.css";
import { useEffect, useState } from "react";
import { downloadOutline } from "ionicons/icons";

interface TorrentDownloaderProps {
  videoRef?: any;
}

const TorrentDownloader: React.FC<TorrentDownloaderProps> = ({ videoRef }) => {
  const [downloadStatus, setDownloadStatus] = useState<string>("");

  // const onDownloadSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const magnet_link = e.currentTarget.magnet_link.value;

  //   fetch("/upload-torrent", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Access-Control-Allow-Headers": "*",
  //       "Access-Control-Allow-Origin": "*",
  //       "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE",
  //       "Access-Control-Allow-Credentials": "true",
  //     },
  //     body: JSON.stringify({ magnet_link }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setDownloadStatus("Download started successfully!");
  //     })
  //     .catch((error) => {
  //       setDownloadStatus("Failed to start download.");
  //       console.log("Error:", error);
  //     });
  // };

  const onDownloadPaste = (magnet_link: string) => {
    fetch("/upload-torrent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE",
        "Access-Control-Allow-Credentials": "true",
      },
      body: JSON.stringify({ magnet_link }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDownloadStatus("Download started successfully!");
      })
      .catch((error) => {
        setDownloadStatus("Failed to start download.");
        console.error("Error:", error);
      });
  };

  const [clipboardData, setClipboardData] = useState<string>("");
  const [magnetLinkInput, setMagnetLinkInput] = useState<string>("");

  useEffect(() => {
    document.addEventListener("paste", (event) => {
      const clipboardData: any = event.clipboardData;
      const data = clipboardData.getData("Text");
      setClipboardData(data);
    });
  }, []);

  useEffect(() => {
    if (clipboardData) {
      setMagnetLinkInput(clipboardData);
      onDownloadPaste(clipboardData);
      setClipboardData("");
      // setMagnetLinkInput("");
    }
  }, [clipboardData]);

  return (
    <div>
      <div className="container mx-auto p-4">
        {downloadStatus && (
          <div className="text-center mb-4 text-red-500">{downloadStatus}</div>
        )}

        {/* <form onSubmit={onDownloadSubmit} className="mb-4"> */}
        <div className="flex">
          <input
            value={magnetLinkInput || clipboardData}
            onChange={(e) => setMagnetLinkInput(e.target.value)}
            type="text"
            id="magnet_link"
            name="magnet_link"
            className="w-full rounded-lg p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Paste magnet link here"
            required
          />
          {/* <button
            type="submit"
            className="ml-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-3 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out space-x-2"
          >
            <IonIcon size="large" icon={downloadOutline} />
          </button> */}
        </div>
        {/* </form> */}
      </div>
    </div>
  );
};

export default TorrentDownloader;
