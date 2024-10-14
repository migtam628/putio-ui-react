import {
  IonContent,
  IonPage,
  IonSplitPane,
} from "@ionic/react";
import "../theme/Page.css";
import Header from "./Header";
import Menu from "./Menu";

const Page: React.FC<{ children?: any; title?: any }> = ({ children }) => {
  return (
    <IonPage>
      <Header />
      <IonSplitPane contentId="main" when="md">
        <Menu />
        <IonContent id="main" fullscreen>
          <div className="m-20" />
          {children}
        </IonContent>
      </IonSplitPane>
    </IonPage>
  );
};

export default Page;


