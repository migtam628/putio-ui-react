import { IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent } from "@ionic/react";
import '../theme/VideoPlayer.css';

export const VideoPlayer = ({
  videoSrc, videoRef, isOpen, setIsVideoModalOpen, setVideoSrc
}: {
  isOpen: boolean;
  videoSrc: string;
  videoRef?: any;
  setIsVideoModalOpen: (isOpen: boolean) => void;
  setVideoSrc: (src: string) => void;
}) => {
  return (
    <IonModal backdropDismiss={false} id="videoModal" isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Video Player</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => {
                setIsVideoModalOpen(false);
                setVideoSrc('');
            }}>
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <video
          id="videoPlayer"
          ref={videoRef}
          controls
          preload="auto"
          autoPlay
          className="w-full rounded-lg shadow-lg my-4"
        >
          <source src={videoSrc} id="videoSource" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </IonContent>
    </IonModal>
  );
};
