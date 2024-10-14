import { IonContent, IonPage, IonSplitPane, } from '@ionic/react';
import '../theme/Page.css';
import Header from '../components/Header';
import Menu from '../components/Menu';

const Page: React.FC<{ children?: any; title?: any }> = ({ children }) => {


  return (
    <IonPage>
      <Header />
      <IonSplitPane contentId="main" when="md">
        <Menu />
        <IonContent id="main" fullscreen>
          {children}
        </IonContent>
      </IonSplitPane>
    </IonPage>
  );
};

export default Page;
