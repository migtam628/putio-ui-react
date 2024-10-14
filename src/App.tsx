import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Home from './pages/Home';
import './theme';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/" exact={true}>
            <Redirect to="home" />
          </Route>
          <Route path="/home" exact={true}>
            <Home />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;


// const Putio: React.FC = () => {
//   const [magnetLink, setMagnetLink] = useState('');
//   const [videoSrc, setVideoSrc] = useState('');
//   const [fileList, setFileList] = useState<any[]>([]);
//   const [activeDownloads, setActiveDownloads] = useState<any[]>([]);
//   const [directoryModalVisible, setDirectoryModalVisible] = useState(false);
//   const [directoryContents, setDirectoryContents] = useState<any[]>([]);
//   const [directoryTitle, setDirectoryTitle] = useState('');

//   useEffect(() => {
//     loadFiles();
//     displayActiveDownloads();

//     const intervalId = setInterval(() => {
//       displayActiveDownloads();
//     }, 3000);

//     const fileIntervalId = setInterval(() => {
//       loadFiles();
//     }, 5000);

//     return () => {
//       clearInterval(intervalId);
//       clearInterval(fileIntervalId);
//     };
//   }, []);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     fetch('/upload-torrent', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ magnet_link: magnetLink }),
//     })
//       .then(response => response.json())
//       .then(data => {
//         if (data.fileName) {
//           const videoUrl = `/videos/${data.fileName}`;
//           setVideoSrc(videoUrl);
//         } else {
//           alert('No .mp4 file found in the torrent.');
//         }
//       })
//       .catch(error => {
//         alert('An error occurred while downloading the torrent.');
//       });
//   };

//   const displayActiveDownloads = () => {
//     fetch('/active-downloads')
//       .then(response => response.json())
//       .then(downloads => {
//         setActiveDownloads(downloads);

//         const badge = document.getElementById('active-torrents-badge');
//         if (badge) {
//           if (downloads.length > 0) {
//             badge.textContent = downloads.length.toString();
//             badge.classList.remove('hidden');
//           } else {
//             badge.classList.add('hidden');
//           }
//         }
//       })
//       .catch(() => {
//         alert('Error fetching active downloads');
//       });
//   };

//   const loadFiles = () => {
//     fetch('/list-files')
//       .then(response => response.json())
//       .then(items => {
//         setFileList(items);
//       })
//       .catch(error => {
//         console.error('Error loading files:', error);
//       });
//   };

//   const stopDownload = (magnetLink: string) => {
//     fetch(`/stop-download?magnetLink=${encodeURIComponent(magnetLink)}`)
//       .then(response => response.json())
//       .then(data => {
//         alert(data.message);
//       })
//       .catch(error => {
//         alert('An error occurred while stopping the download.');
//       });
//   };

//   const deleteFile = (fileName: string) => {
//     fetch(`/delete-file/${fileName}`, {
//       method: 'DELETE',
//     })
//       .then(response => response.text())
//       .then(data => {
//         alert(data);
//         loadFiles();
//       })
//       .catch(() => {
//         alert('An error occurred while deleting the file.');
//       });
//   };

//   const deleteDirectory = (directoryName: string) => {
//     fetch(`/delete-directory?name=${encodeURIComponent(directoryName)}`, {
//       method: 'DELETE',
//     })
//       .then(response => response.json())
//       .then(data => {
//         alert(data.message);
//         loadFiles();
//       })
//       .catch(() => {
//         alert('An error occurred while deleting the directory.');
//       });
//   };

//   const deleteAllFiles = () => {
//     fetch('/delete-all-files', {
//       method: 'DELETE',
//     })
//       .then(response => response.json())
//       .then(data => {
//         alert(data.message);
//         loadFiles();
//       })
//       .catch(() => {
//         alert('An error occurred while deleting all files.');
//       });
//   };

//   const loadDirectory = (directoryName: string) => {
//     fetch(`/list-files?dir=${encodeURIComponent(directoryName)}`)
//       .then(response => response.json())
//       .then(data => {
//         setDirectoryTitle(`Contents of ${directoryName}`);
//         setDirectoryContents(data);
//         setDirectoryModalVisible(true);
//       })
//       .catch(() => {
//         alert('Error fetching directory contents');
//       });
//   };

//   return (
//     <IonPage>
//       <form id="torrent-form" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           id="magnet_link"
//           value={magnetLink}
//           onChange={(e) => setMagnetLink(e.target.value)}
//           placeholder="Paste Magnet Link"
//         />
//         <button type="submit">Submit</button>
//       </form>

//       <video id="videoPlayer" controls>
//         <source id="videoSource" src={videoSrc} type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>

//       <div id="active-downloads">
//         {activeDownloads.length > 0 ? (
//           activeDownloads.map((download, index) => (
//             <div key={index}>
//               <h5>
//                 <b>{download.progress}%</b> - {download.name}
//               </h5>
//               <p>Speed: {(download.downloadSpeed / 1024 / 1024).toFixed(2)} MB/s</p>
//               <p>Total: {(download.downloaded / 1024 / 1024).toFixed(2)} MB</p>
//               <button onClick={() => stopDownload(download.magnetLink)}>Cancel</button>
//             </div>
//           ))
//         ) : (
//           <p>No active downloads</p>
//         )}
//       </div>

//       <div id="fileList">
//         {fileList.length > 0 ? (
//           fileList.map((file, index) => (
//             <div key={index}>
//               {file.isDirectory ? (
//                 <div>
//                   <h4 onClick={() => loadDirectory(file.name)}>📁 {file.name}</h4>
//                   <button onClick={() => deleteDirectory(file.name)}>Delete Directory</button>
//                 </div>
//               ) : (
//                 <div>
//                   <h4 onClick={() => setVideoSrc(`/videos/${file.name}`)}>🎬 {file.name}</h4>
//                   <button onClick={() => deleteFile(file.name)}>Delete File</button>
//                 </div>
//               )}
//             </div>
//           ))
//         ) : (
//           <p>No files available</p>
//         )}
//       </div>

//       {directoryModalVisible && (
//         <div id="directoryModal">
//           <h2>{directoryTitle}</h2>
//           <ul>
//             {directoryContents.map((item, index) => (
//               <li key={index}>
//                 {item.name} {item.isDirectory ? '(Folder)' : '(File)'}
//               </li>
//             ))}
//           </ul>
//           <button id="closeModal" onClick={() => setDirectoryModalVisible(false)}>
//             Close
//           </button>
//         </div>
//       )}
//     </IonPage>
//   );
// };


