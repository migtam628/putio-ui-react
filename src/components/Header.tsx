import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonSearchbar } from '@ionic/react';
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
                    <IonTitle className="text-4xl font-bold text-blue-700">Put.io Clone</IonTitle>
                    <input type='search' className="w-1/2 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="Search for torrents" />
                    <DropdownMenu buttons={buttons} />
                    <IonButtons slot="end">
                        <IonMenuButton />
                    </IonButtons>
                </div>
            </IonToolbar>
        </IonHeader>
    );
};

export default Header;


