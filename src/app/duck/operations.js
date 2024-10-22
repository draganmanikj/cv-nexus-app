import actions from "./actions";
//import {getUser} from "../api/userInfoApi";
import {translate} from "../util/lang/translate-wrapper";

// const getUserInfo = (formData) => {
//     return (dispatch, getState) => {
//         dispatch(duck.getUserInfoRequest());
//         return getUser(formData)
//             .then((resultData) => {
//                 dispatch(duck.getUserInfoSuccess(resultData));
//                 return Promise.resolve(resultData);
//             })
//             .catch((e) => {
//                 dispatch(duck.getUserInfoFail(e));
//                 return Promise.resolve(e);
//             });
//     };
// };

const changeHeaderTitle = (titleLabel) => {

    return (dispatch) => {
        let title = translate(titleLabel);
        dispatch(actions.headerTitleChange(title));
        document.title=title;
    };
};

const resetHeaderReducer = () => {
    return (dispatch, getState) => {
        return dispatch(actions.resetHeaderReducer());
    };
};

export default {
    //getUserInfo,
    changeHeaderTitle,
    resetHeaderReducer
}