import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {alertError, alertInfo, alertSuccess, alertWarn, notificationsConstants} from "asseco-commons";

const NotificationsContainer = () => {
  const dispatch = useDispatch();
  const {message} = useSelector(state=>state.notificationListener);

  useEffect(()=>{
    if (message && message.contents) {
      if (!message.level || message.level === notificationsConstants.LEVEL_ERROR) {
        dispatch(alertError(message.contents))
      }
      else if (!message.level || message.level === notificationsConstants.LEVEL_WARN) {
        dispatch(alertWarn(message.contents))
      }
      else if (!message.level || message.level === notificationsConstants.LEVEL_SUCCESS) {
        dispatch(alertSuccess(message.contents))
      }
      else {
        dispatch(alertInfo(message.contents))
      }
    }
  },[message])



    return (
        <></>
    );
};

export default NotificationsContainer;