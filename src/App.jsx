import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */
/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
// import '@ionic/react/css/palettes/dark.system.css';
/* Theme variables */
import "./theme/variables.scss";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router";
import OnboardingScreen from "./onboarding/OnboardingScreen/OnboardingScreen.jsx";
import React from "react";
import { AppContext } from "./util/context.js";
import CheckQRCodeScreen from "./onboarding/CheckQRCodeScreen/CheckQRCodeScreen.jsx";
import { LoginOkScreen } from "./onboarding/LoginOk/LoginOkScreen.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MainScreen } from "./onboarding/Home/MainScreen.jsx";

setupIonicReact();
const queryClient = new QueryClient();

const App = () => {
  const [userInfo, setUserInfo] = React.useState({
    name: undefined,
    token: undefined,
    instance: null,
    axiosClient: null,
  });
  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={{ userInfo, setUserInfo }}>
        <IonApp>
          <IonReactRouter>
            <IonRouterOutlet>
              <Route exact path="/onboarding">
                <OnboardingScreen />
              </Route>
              <Route path="/check-creds">
                <CheckQRCodeScreen />
              </Route>
              <Route path="/login-ok">
                <LoginOkScreen />
              </Route>
              <Route path="/app">
                <MainScreen />
              </Route>
              <Route exact path="/">
                <Redirect to="/onboarding" />
              </Route>
            </IonRouterOutlet>
          </IonReactRouter>
        </IonApp>
      </AppContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
