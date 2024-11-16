import { combineReducers } from "redux";
import { reducer as oidcReducer } from "redux-oidc";
import infoReducer from "./duck/reducers";
import {authReducer, dialogsReducer,notificationsReducer} from "asseco-commons";
import {notificationListenerReducer} from "./notificationListener";
import dosieReducer from "../../src/app/domain/dosie/duck/reducers"
import documentReducer from "../app/domain/documents/duck/reducers"
import documentTypesReducer from "../app/domain/documentType/duck/reducers"
import educationReducer from "../app/domain/education/EducationComponent/duck/reducers"
import trainingsReducer from "../app/domain/education/TrainingsComponent/duck/reducers"
import projectsReducer from "../app/domain/education/ProjectsComponent/duck/reducers"
import languagesReducer from "../app/domain/education/LanguageComponent/duck/reducers"

const rootReducer = (routerReducer) => {
  return combineReducers({
    oidc: oidcReducer,
    router: routerReducer,
    info: infoReducer,
    authorization: authReducer,
    dialogs: dialogsReducer,
    notifications: notificationsReducer,
    notificationListener: notificationListenerReducer,
    dosie: dosieReducer,
    documents: documentReducer,
    documentTypes: documentTypesReducer,
    education: educationReducer,
    trainings: trainingsReducer,
    projects: projectsReducer,
    languages: languagesReducer,
  });
};

export default rootReducer;
