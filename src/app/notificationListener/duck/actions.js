import constants from "./constants";

export const clearAllNotifications = () => {
    return {
        type: constants.CLEAR_ALL_NOTIFICATIONS,
        payload: {}
    };
};


