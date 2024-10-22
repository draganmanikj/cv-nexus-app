import { createStore, applyMiddleware, compose } from "redux";
import {createBrowserHistory} from 'history'
import {  loadUser } from "redux-oidc";
import rootReducer from "./root-reducer";
import thunk from 'redux-thunk'
import {getUserManager} from "asseco-commons";
import commonsConfiguration from "asseco-commons/dist/CommonsConfiguration";
import {translate} from "./util/lang/translate-wrapper";
import {properties} from "./config/properties";
import _ from "lodash";
import {configureStore} from "@reduxjs/toolkit";
import {createReduxHistoryContext} from "redux-first-history";

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory(),
  basename: process.env.REACT_APP_ROUTER_BASE || ''
  //other options if needed
});
//const oidcMiddleware = createOidcMiddleware(userManager);


commonsConfiguration.setup({
  getToken: () => getToken(),
  translate: (text) => translate(text),
  properties: properties
});



//TODO bezveza workaround. nesto se bugnuva ako se napravi import na store vo drug js.
const getToken = function () {
  return _.get(store.getState(), "oidc.user.access_token");
};


const loggerMiddleware = store => next => action => {
  //console.log("Action type:", action.type);
  //console.log("Action payload:", action.payload);
  //console.log("State before:", store.getState());
  next(action);
  //console.log("State after:", store.getState());
};

const middleware = [
    thunk,
  loggerMiddleware,
  //oidcMiddleware,
  //routerMiddleware(history)
];


export const store = configureStore({
  reducer: rootReducer(routerReducer),
  middleware: [thunk, routerMiddleware]
});
export const history = createReduxHistory(store);

loadUser(store, getUserManager());
