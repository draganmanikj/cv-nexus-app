import React, { Component } from "react";
import { Provider } from "react-redux";
import "./App.css";
import { store, history } from "./init";
import { OidcProvider } from "redux-oidc";
import { LocalizationProvider } from "@mui/x-date-pickers";
import "moment/locale/mk";
import { properties } from "./config/properties";
import {VersionInfo, VersionInfoItem, AuthorizationLoader, getUserManager, InactivityDetector} from "asseco-commons";
import Routes from "./Routes";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import ThemeManager from "./ThemeManager";
import SrollToTopButton from "./util/components/SrollToTopButton";


const App = (props) => {
  return (
    <Provider store={store}>
      <ThemeManager>
        <LocalizationProvider adapterLocale={"mk"} dateAdapter={AdapterMoment} >
          <OidcProvider store={store} userManager={getUserManager()}>
            <>
              <Routes history={history}/>
              <SrollToTopButton />
              {/* <AuthorizationLoader/> dokolku ima user-management  */}
              <VersionInfo>
                <VersionInfoItem title={"app"} infoUrl={`${properties.urlRoot}/info.json`} />
                <VersionInfoItem
                  title={"api"}
                  infoUrl={`${properties.api.root}/actuator/info`}
                />
              </VersionInfo>
            </>
          </OidcProvider>
        </LocalizationProvider>
      </ThemeManager>
      <InactivityDetector/>
    </Provider>
  );
}

export default App;
