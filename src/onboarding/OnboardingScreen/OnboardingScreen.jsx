import { IonContent, IonPage } from "@ionic/react";
import OnboardingUpper from "../OnboardingUpper/OnboardingUpper.jsx";
import OnboardingLower from "../OnboardingLower/OnboardingLower.jsx";
import "./OnboardingScreen.scss";
import { useState } from "react";

const OnboardingScreen = () => {
  const [page, setPage] = useState("welcome");
  return (
    <IonPage>
      <IonContent class="content">
        <div className="container">
          <OnboardingUpper page={page} />
          <OnboardingLower page={page} setPage={setPage} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default OnboardingScreen;
