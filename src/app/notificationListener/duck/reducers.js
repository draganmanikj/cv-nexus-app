import React from "react";
import {notificationsConstants} from "asseco-commons";
import constants from "../duck/constants"
import userInfoConstants from "./../../duck/constants";
import { translate } from "../../util/lang/translate-wrapper";
import CheckIcon from "@mui/icons-material/Check";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const defaultState = {
  notifications: [],
  message: {}
};

const wrapper = {
  display: "flex",
  flexDirection: "row",
};
const icon = {
  width: "13%",
  justifyContent: "center",
  alignContent: "center",
};

const text = {
  width: "87%",
  justifyContent: "center",
  alignContent: "center",
};

//DO NOT USE, CONSULT GUIDES
export default function reducer(currentState = defaultState, action) {
  const addNotification = (level, contents, dontTranslate) => {
    if (currentState.notifications.length === 10) {
      currentState.notifications.pop();
    }
    currentState.notifications.unshift({ level, contents, dontTranslate });
    return currentState.notifications;
  };
  switch (action.type) {
  //   case dashboardConstants.SET_VERIFIED_SUCCESS:
  //     return {
  //       ...currentState,
  //       notifications: addNotification(
  //         constants.LEVEL_SUCCESS,
  //         "app.notifications.verificationSuccess"
  //       ),
  //       message: {
  //         type: constants.TYPE_TOAST,
  //         level: constants.LEVEL_SUCCESS,
  //         contents: (
  //           <div style={wrapper}>
  //             <div style={icon}>
  //               <CheckIcon />
  //             </div>
  //             <div style={text}>
  //               {translate("app.notifications.verificationSuccess")}
  //             </div>
  //           </div>
  //         ),
  //       },
  //     };

  //  case semejstvoConstants.SET_VERIFIED_FAIL:
        // return {
        //   ...currentState,
        //   notifications: addNotification(
        //     constants.LEVEL_ERROR,
        //     action.payload.data && action.payload.data.message
        //       ? action.payload.data.message
        //       : "app.notifications.verificationFail",
        //     action.payload.data && action.payload.data.message ? true : false
        //   ),
        //   message: {
        //     type: constants.TYPE_TOAST,
        //     level: constants.LEVEL_ERROR,
        //     contents: (
        //       <div style={wrapper}>
        //         <div style={icon}>
        //           <ErrorOutlineIcon />
        //         </div>
        //         <div style={text}>
        //           {action.payload.data && action.payload.data.message
        //             ? action.payload.data.message
        //             : translate("app.notifications.verificationFail")}
        //         </div>
        //       </div>
        //     ),
        //   },
        // };

    case constants.CLEAR_ALL_NOTIFICATIONS:
      return {
          ...currentState,
        notifications: [],
      };

      //DO NOT USE, CONSULT GUIDES

    default:
      return currentState;
  }
}
