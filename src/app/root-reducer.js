import { combineReducers } from "redux";
import { reducer as oidcReducer } from "redux-oidc";
import infoReducer from "./duck/reducers";
import {authReducer, dialogsReducer,notificationsReducer} from "asseco-commons";
import {notificationListenerReducer} from "./notificationListener";

const rootReducer = (routerReducer) => {
  return combineReducers({
    oidc: oidcReducer,
    router: routerReducer,
    info: infoReducer,
    authorization: authReducer,
    dialogs: dialogsReducer,
    notifications: notificationsReducer,
    notificationListener: notificationListenerReducer,
  });
};

export default rootReducer;
