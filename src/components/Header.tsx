import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle } from '@ionic/react';
import DropdownMenu from './DropdownMenu';

const Header: React.FC = () => {
    const stopAllDownloads = () => {
        console.log('Stopping all downloads');
    };

    const displayActiveDownloads = () => {
        console.log('Displaying active downloads');
    };

    const deleteAllFiles = () => {
        console.log('Deleting all files');
    };

    const buttons = [
        {
            name: 'Stop All Downloads',
            action: stopAllDownloads
        },
        {
            name: 'Fetch Active Downloads',
            action: displayActiveDownloads
        },
        {
            name: 'Delete All Files',
            action: deleteAllFiles
        }
    ]


    return (
        <IonHeader className="bg-blue-600 shadow-lg sticky top-0 z-50">
            <IonToolbar>
                <div className="container mx-auto flex justify-between items-center p-4">
                    <IonTitle className="text-3xl font-bold text-white">Put.io Clone</IonTitle>
                    <div className="flex items-center space-x-4">
                        <IonButtons slot="start">
                            <button className="text-white p-2 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 relative">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                                <DropdownMenu buttons={buttons} />
                            </button>
                        </IonButtons>
                        <span id="active-torrents-badge" className="hidden bg-red-500 text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                            0
                        </span>
                        <IonButtons slot="end">
                            <IonMenuButton className="text-white p-2 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300" />
                        </IonButtons>
                    </div>
                </div>
            </IonToolbar>
        </IonHeader>
    );
};

export default Header;


