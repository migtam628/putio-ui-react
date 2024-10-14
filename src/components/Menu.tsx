import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonProgressBar,
  IonToolbar,
} from '@ionic/react';
import { useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, folderOpenOutline, folderOpenSharp, homeOutline, homeSharp, mailOutline, mailSharp, warningOutline, warningSharp } from 'ionicons/icons';
import '../theme/Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Home',
    url: '/home',
    iosIcon: homeOutline,
    mdIcon: homeSharp
  },
  {
    title: 'Files',
    url: '/files',
    iosIcon: folderOpenOutline,
    mdIcon: folderOpenSharp,
  },
  {
    title: 'Downloads',
    url: '/downloads',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp,
  },
  {
    title: 'Settings',
    url: '/settings',
    iosIcon: mailOutline,
    mdIcon: mailSharp,
  },
  {
    title: 'About',
    url: '/about',
    iosIcon: warningOutline,
    mdIcon: warningSharp,
  }
];

const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonHeader>
        <IonToolbar>

        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList id="inbox-list">
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem style={{
                  fontSize: '0.8rem',
                }} className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        <IonList id="labels-list" />

        <IonProgressBar value={0.5}></IonProgressBar>
        <IonLabel>
          <IonNote>50% used</IonNote>
        </IonLabel>
        {/* </IonItemDivider> */}
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
